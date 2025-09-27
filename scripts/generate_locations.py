import csv, re, textwrap, requests, yaml, os
from pathlib import Path
from rapidfuzz.distance.JaroWinkler import normalized_similarity as jw

OLLAMA_MODEL = "llama3.1:8b"   # oder "mistral:7b"
OLLAMA_URL = "http://localhost:11434/api/generate"

BASE = Path(__file__).resolve().parent.parent
CONTENT_DIR = BASE / "content" / "standorte"
TEMPLATE_PATH = CONTENT_DIR / "bielefeld.md"
CSV_PATH = BASE / "data" / "cities.csv"

# --- Helpers -----------------------------------------------------------------
def slugify(s): return re.sub(r"[^a-z0-9\-]+", "", re.sub(r"\s+", "-", s.strip().lower()))
def read_text(p: Path): return p.read_text(encoding="utf-8")
def write_text(p: Path, s: str): p.parent.mkdir(parents=True, exist_ok=True); p.write_text(s, encoding="utf-8")

def call_ollama(prompt: str, temperature=0.6):
    payload = {"model": OLLAMA_MODEL, "prompt": prompt, "temperature": temperature, "stream": False}
    r = requests.post(OLLAMA_URL, json=payload, timeout=120)
    r.raise_for_status()
    return r.json()["response"]

def extract_frontmatter(md: str) -> dict:
    m = re.match(r"^---\n(.*?)\n---\s*$", md.strip(), flags=re.S)
    if not m:
        # evtl. nur YAML zurück? Dann als Ganzes interpretieren
        return yaml.safe_load(md)
    return yaml.safe_load(m.group(1))

def to_frontmatter(y: dict) -> str:
    return "---\n" + yaml.safe_dump(y, sort_keys=False, allow_unicode=True) + "---\n"

def word_count_from_fields(y: dict) -> int:
    text = " ".join([
        str(y.get("longIntro","")), 
        str(y.get("longDeepDive",""))
    ])
    return len(re.findall(r"\w+", text))

def similarity(a_text: str, b_text: str) -> float:
    return jw(a_text, b_text)  # 1.0 = sehr ähnlich

def compose_text_for_sim(y: dict) -> str:
    fields = [y.get("hero",{}).get("subtitle",""), y.get("longIntro",""), y.get("longDeepDive","")]
    return "\n\n".join([t for t in fields if t])

# --- Prompts -----------------------------------------------------------------
SYSTEM_RULES = """Du bist Texter:in für lokale Unternehmensseiten. Schreibe klar, konkret, ohne Keyword-Stopferei.
Ziele:
- 650–950 Wörter insgesamt (longIntro + longDeepDive).
- Gleichgewicht: klassische IT (Betrieb, Infrastruktur, Security, Cloud, Support) UND Software/Apps, Webseiten/Leadgen, Automatisierung, KI.
- Kein Floskel-Overload, keine Listen voller Keywords. Echte Hilfestellung & richtiger Intent.
- Markenname sparsam (2–3×).
- Strukturiere EXAKT wie die Vorlage (nur Frontmatter/YAML). Keine zusätzlichen Felder erfinden, aber Inhalte auf Stadt anpassen.
- Fülle auch 'nearby' (3 Slugs, realistische Nachbarstädte) und 'resources' (3 lokale Anlaufstellen) sinnvoll aus.
- Keine externen Bilder/URLs außer in resources.href. hero.image NICHT setzen.
Ausgabe: NUR ein Frontmatter-Block (--- YAML ---), keine weiteren Texte."""
USER_TMPL = """VORLAGE (Frontmatter von Bielefeld):
{template}

ZIEL:
- Stadt: {city}
- Region: {region}

WICHTIG:
- Passe Titel/hero/subtitle/longIntro/longDeepDive/local/nearby/resources an {city} an.
- Schreibe eigenständig, sinngleich, aber nicht ähnlich (keine Phrasen-Recycling).
- Services gleichwertig: IT + Software/Apps + Webseiten/Leadgen + Automatisierung + KI.
- Wörter gesamt: 650–950 (nur longIntro + longDeepDive).
- Keine Services-Chips hinzufügen (dieser Block existiert nicht).
- nearby.slugs: 3 realistische Slugs (kleinbuchstaben, mit Bindestrich).
- resources: 3 lokale Institutionen (Label + URL + kurzer Blurb).

ANTWORT:
Gib ausschließlich den Frontmatter-Block zurück.
"""

# --- Main --------------------------------------------------------------------
def main():
    template_md = read_text(TEMPLATE_PATH)
    ref_yaml = extract_frontmatter(template_md)
    ref_text = compose_text_for_sim(ref_yaml)

    rows = []
    with open(CSV_PATH, newline="", encoding="utf-8") as f:
        for r in csv.DictReader(f):
            rows.append({"city": r["city"].strip(), "region": r.get("region","").strip()})

    for row in rows:
        city, region = row["city"], row["region"] or "NRW"
        out_path = CONTENT_DIR / f"{slugify(city)}.md"
        if out_path.exists():
            print(f"skip {city}: exists")
            continue

        prompt = USER_TMPL.format(template=template_md.strip(), city=city, region=region)
        response = call_ollama(f"{SYSTEM_RULES}\n\n{prompt}", temperature=0.65)

        # YAML parsen & Gatekeeping
        try:
            y = extract_frontmatter(response)
            # minimale Validierung
            for k in ["slug","city","region","title","hero","longIntro","longDeepDive","intro","trust","local","resources","nearby","cta"]:
                if k not in y:
                    raise ValueError(f"missing key: {k}")

            # Wortzahl
            wc = word_count_from_fields(y)
            if not (650 <= wc <= 950):
                raise ValueError(f"word count {wc} outside range")

            # Ähnlichkeit zur Vorlage begrenzen
            sim = similarity(compose_text_for_sim(y), ref_text)
            if sim >= 0.90:
                raise ValueError(f"too similar to template (sim={sim:.2f})")

            # OK → schreiben
            write_text(out_path, to_frontmatter(y))
            print(f"✓ {city} -> {out_path.name} (wc={wc}, sim={sim:.2f})")

        except Exception as e:
            print(f"✗ {city}: {e}")
            # Optional: 2. Versuch mit leicht anderer Temperatur
            try:
                response2 = call_ollama(f"{SYSTEM_RULES}\n\n{prompt}", temperature=0.8)
                y2 = extract_frontmatter(response2)
                wc2 = word_count_from_fields(y2)
                sim2 = similarity(compose_text_for_sim(y2), ref_text)
                if all(k in y2 for k in ["slug","city","region","title","hero","longIntro","longDeepDive","intro","trust","local","resources","nearby","cta"]) and 650 <= wc2 <= 950 and sim2 < 0.90:
                    write_text(out_path, to_frontmatter(y2))
                    print(f"✓ (retry) {city} -> {out_path.name} (wc={wc2}, sim={sim2:.2f})")
                else:
                    print(f"✗ (retry failed) {city} – wc={wc2}, sim={sim2:.2f}")
            except Exception as e2:
                print(f"✗ (retry err) {city}: {e2}")

if __name__ == "__main__":
    main()
