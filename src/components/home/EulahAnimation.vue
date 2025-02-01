<template>
  <div class="particle-container">
    <!-- Canvas für die Partikelanimation -->
    <canvas ref="canvas" class="particle-canvas"></canvas>
    <!-- Overlay mit Tagline und Call-to-Action -->
    <div class="overlay">
      <div class="tagline">Innovative Softwarelösungen für eine vernetzte Welt.</div>
      <button class="cta-button">Erfahre mehr →</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

// Referenz zum Canvas-Element
const canvas = ref(null);

// Globale Variablen für Canvas und Partikel
let ctx;
let canvasWidth, canvasHeight;
let particlesArray = [];

// Globale Variablen für Explosionseffekt
const explosionDuration = 2000; // Dauer der Explosionsphase in ms
let explosionStartTime;
let explosionComplete = false;

// Mausobjekt zur Speicherung der aktuellen Position und des Einflussbereichs
const mouse = {
  x: undefined,
  y: undefined,
  radius: 100 // Einfluss-Radius der Maus
};

// Event-Listener für Mausbewegungen: Berechnet die relative Position
function handleMouseMove(event) {
  const rect = canvas.value.getBoundingClientRect();
  mouse.x = event.clientX - rect.left;
  mouse.y = event.clientY - rect.top;
}

/*
  =============================================================================
  Particle-Klasse
  =============================================================================
  Jedes Particle repräsentiert einen Punkt, der Teil des Textes "Eulah Software" ist.
  Neben der Basisposition (baseX, baseY) speichert es auch die Startposition (in der Mitte)
  und eine Anfangsgeschwindigkeit, die für den Explosionseffekt sorgt.
  =============================================================================
*/
class Particle {
  constructor(x, y) {
    // Speichere die Zielposition (Basisposition) anhand der Text-Pixel
    this.baseX = x;
    this.baseY = y;
    // Initial alle Partikel in der Mitte des Canvas platzieren
    this.x = canvasWidth / 2;
    this.y = canvasHeight / 2;
    this.size = 2; // Größe des Partikels
    // Zufälliger Dichtewert, um die Bewegung variiert erscheinen zu lassen
    this.density = Math.random() * 30 + 1;

    // Berechne den Vektor von der Mitte zur Basisposition
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    const dx = this.baseX - centerX;
    const dy = this.baseY - centerY;
    let angle = Math.atan2(dy, dx);
    // Optional: Leichte zufällige Abweichung des Winkels
    const randomAngleOffset = (Math.random() - 0.5) * Math.PI / 8;
    angle += randomAngleOffset;
    // Zufällige Geschwindigkeit (explosionsartiger Impuls)
    const speed = Math.random() * 5 + 3; // zwischen 3 und 8
    this.velocityX = Math.cos(angle) * speed;
    this.velocityY = Math.sin(angle) * speed;
  }

  // Zeichnet das Particle als Kreis
  draw() {
    ctx.fillStyle = '#00d4ff';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }

  // Normaler Update-Mechanismus: Mausinteraktion + Rückkehr zur Basisposition
  update() {
    // Berechne den Abstand zwischen Maus und Partikel
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Berechne Richtungsvektor und relative Stärke der Abstoßung
    const forceDirectionX = dx / distance;
    const forceDirectionY = dy / distance;
    const maxDistance = mouse.radius;
    const force = (maxDistance - distance) / maxDistance;

    // Wenn der Mauszeiger in Reichweite ist, wehre das Partikel ab
    if (distance < mouse.radius) {
      const directionX = forceDirectionX * force * this.density;
      const directionY = forceDirectionY * force * this.density;
      this.x -= directionX;
      this.y -= directionY;
    } else {
      // Andernfalls kehre sanft zur Basisposition zurück
      if (this.x !== this.baseX) {
        const dx = this.x - this.baseX;
        this.x -= dx / 10;
      }
      if (this.y !== this.baseY) {
        const dy = this.y - this.baseY;
        this.y -= dy / 10;
      }
    }
  }

  // Update-Methode für die Explosionsphase: Partikel bewegen sich anhand ihrer
  // Anfangsgeschwindigkeit, welche langsam abgebaut wird.
  explosionUpdate() {
    this.x += this.velocityX;
    this.y += this.velocityY;
    // Langsames Abbremsen (Friction)
    this.velocityX *= 0.95;
    this.velocityY *= 0.95;
  }
}

/*
  =============================================================================
  Funktion init()
  =============================================================================
  Diese Funktion erstellt einen Offscreen-Canvas, auf dem der Text "Eulah Software"
  in weißer Farbe und in einem fetten Font gerendert wird. Anschließend werden alle
  Pixel des Offscreen-Canvas ausgelesen, und für jeden Pixel, der eine ausreichende
  Deckkraft aufweist, wird ein Particle-Objekt in particlesArray gespeichert.
  =============================================================================
*/
function init() {
  // Erstelle einen Offscreen-Canvas zur Textgenerierung
  const textCanvas = document.createElement('canvas');
  const textCtx = textCanvas.getContext('2d');

  // Setze die Abmessungen beider Canvas (Offscreen und Haupt-Canvas)
  canvasWidth = canvas.value.width = window.innerWidth;
  canvasHeight = canvas.value.height = window.innerHeight;
  textCanvas.width = canvasWidth;
  textCanvas.height = canvasHeight;

  // Konfiguriere den Textstil für den Offscreen-Canvas
  textCtx.fillStyle = 'white';
  textCtx.font = 'bold 120px Arial';
  textCtx.textAlign = 'center';
  textCtx.textBaseline = 'middle';

  // Definiere den Text und dessen Position (zentriert)
  const text = 'Eulah Software';
  const posX = canvasWidth / 2;
  const posY = canvasHeight / 2;
  textCtx.fillText(text, posX, posY);

  // Hole die Bilddaten des gesamten Offscreen-Canvas
  const textCoordinates = textCtx.getImageData(0, 0, canvasWidth, canvasHeight);

  // Lösche vorherige Partikel (falls vorhanden)
  particlesArray = [];

  // Durchlaufe die Bilddaten und erstelle Partikel für Pixel mit ausreichender Deckkraft.
  // Wir überspringen einige Pixel (z. B. alle 6 Pixel), um die Partikelanzahl zu reduzieren.
  for (let y = 0; y < canvasHeight; y += 6) {
    for (let x = 0; x < canvasWidth; x += 6) {
      const index = (y * canvasWidth + x) * 4;
      if (textCoordinates.data[index + 3] > 128) {
        particlesArray.push(new Particle(x, y));
      }
    }
  }
}

/*
  =============================================================================
  Funktion animate()
  =============================================================================
  Diese Funktion wird in einer Endlosschleife mittels requestAnimationFrame
  aufgerufen. Während der ersten explosionDuration ms wird der Explosionseffekt
  ausgeführt, danach erfolgt die normale Animation (inklusive Mausinteraktion).
  =============================================================================
*/
function animate() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  const elapsed = performance.now() - explosionStartTime;

  if (elapsed < explosionDuration) {
    // Explosionsphase
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].explosionUpdate();
      particlesArray[i].draw();
    }
  } else {
    // Explosionsphase abgeschlossen – normale Animation
    explosionComplete = true;
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();
    }
  }
  requestAnimationFrame(animate);
}

/*
  =============================================================================
  Funktion handleResize()
  =============================================================================
  Bei einer Größenänderung des Fensters werden Canvas-Dimensionen neu gesetzt und
  die Partikel neu initialisiert, um das Layout beizubehalten.
  =============================================================================
*/
function handleResize() {
  canvasWidth = canvas.value.width = window.innerWidth;
  canvasHeight = canvas.value.height = window.innerHeight;
  init();
}

onMounted(() => {
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
  ctx = canvas.value.getContext('2d');

  // Starte den Timer für den Explosionseffekt
  explosionStartTime = performance.now();

  // Event-Listener für Mausbewegungen hinzufügen
  canvas.value.addEventListener('mousemove', handleMouseMove);

  // Partikel aus dem Text initialisieren
  init();
  // Animation starten
  animate();
  // Fenstergrößenänderungen überwachen
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
  canvas.value.removeEventListener('mousemove', handleMouseMove);
});
</script>

<style scoped>
/* =============================================================================
    Basis-Styles & Globaler Reset
    ============================================================================= */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* =============================================================================
    Container für die Partikelanimation
    ============================================================================= */
.particle-container {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #000;
  overflow: hidden;
}

/* =============================================================================
    Canvas für die Partikel
    ============================================================================= */
.particle-canvas {
  display: block;
  width: 100%;
  height: 100%;
}

/* =============================================================================
    Overlay für Tagline und Call-to-Action
    ============================================================================= */
.overlay {
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #fff;
  z-index: 10;
}
.overlay .tagline {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
.overlay .cta-button {
  background-color: #00d4ff;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  color: #000;
  cursor: pointer;
  border-radius: 8px;
  animation: sine 2s infinite;
  /* Optional: sanfter Hover-Effekt */
  transition: transform 0.3s ease;
}
.overlay .cta-button:hover {
  transform: scale(1.05);
}

/* Sinusförmige Animation für den Button */
@keyframes sine {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}

/* =============================================================================
    Utility-Klassen und weitere Styles (wie zuvor)
    ============================================================================= */
/* Flexbox */
.flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}

.flex-center {
  justify-content: center;
  align-items: center;
}

.flex-between {
  justify-content: space-between;
}

/* Textausrichtung und Transformation */
.text-center {
  text-align: center;
}

.text-uppercase {
  text-transform: uppercase;
}

.text-lowercase {
  text-transform: lowercase;
}

.text-bold {
  font-weight: bold;
}

.text-italic {
  font-style: italic;
}

.text-shadow {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

/* Margin- und Padding-Utilities */
.mt-1 {
  margin-top: 1rem;
}

.mt-2 {
  margin-top: 2rem;
}

.mb-1 {
  margin-bottom: 1rem;
}

.mb-2 {
  margin-bottom: 2rem;
}

.pt-1 {
  padding-top: 1rem;
}

.pt-2 {
  padding-top: 2rem;
}

.pb-1 {
  padding-bottom: 1rem;
}

.pb-2 {
  padding-bottom: 2rem;
}

.p-1 {
  padding: 1rem;
}

.p-2 {
  padding: 2rem;
}

/* Background-Farben */
.bg-dark {
  background-color: #000;
}

.bg-light {
  background-color: #fff;
}

.bg-primary {
  background-color: #00d4ff;
}

.bg-secondary {
  background-color: #222;
}

/* Border-Utilities */
.border {
  border: 1px solid #00d4ff;
}

.border-rounded {
  border-radius: 8px;
}

.border-rounded-full {
  border-radius: 50%;
}

/* Animationen */
.animate-fade-in {
  animation: fadeIn 1s ease-in-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

/* Spacing */
.m-0 {
  margin: 0;
}

.p-0 {
  padding: 0;
}

/* Breite und Höhe */
.w-100 {
  width: 100%;
}

.h-100 {
  height: 100%;
}

.min-h-100 {
  min-height: 100vh;
}

/* Positionierung */
.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

.fixed {
  position: fixed;
}

.top-0 {
  top: 0;
}

.left-0 {
  left: 0;
}

.right-0 {
  right: 0;
}

.bottom-0 {
  bottom: 0;
}

/* Z-Index */
.z-0 {
  z-index: 0;
}

.z-1 {
  z-index: 1;
}

.z-2 {
  z-index: 2;
}

.z-3 {
  z-index: 3;
}

.z-4 {
  z-index: 4;
}

.z-5 {
  z-index: 5;
}

/* =============================================================================
    Zusätzliche Placeholder-Styles für Erweiterungen
    ============================================================================= */
.loader {
  border: 4px solid rgba(0, 212, 255, 0.3);
  border-top: 4px solid #00d4ff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: auto;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.shadow-small {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.shadow-medium {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.shadow-large {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.hover-scale:hover {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}

.hover-shadow:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
  transition: box-shadow 0.3s ease;
}

/* =============================================================================
    Responsive Design: Anpassungen für verschiedene Bildschirmgrößen
    ============================================================================= */
@media (max-width: 768px) {
  .text-large {
    font-size: 1.5rem;
  }
  .text-medium {
    font-size: 1.2rem;
  }
  .text-small {
    font-size: 1rem;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .text-large {
    font-size: 2rem;
  }
  .text-medium {
    font-size: 1.5rem;
  }
  .text-small {
    font-size: 1.2rem;
  }
}

@media (min-width: 1025px) {
  .text-large {
    font-size: 3rem;
  }
  .text-medium {
    font-size: 2rem;
  }
  .text-small {
    font-size: 1.5rem;
  }
}

/* =============================================================================
    Extra Placeholder-Klassen für zukünftige Features
    ============================================================================= */
.placeholder-bg {
  background-image: url('https://via.placeholder.com/150');
  background-size: cover;
  background-position: center;
}

.placeholder-text {
  color: #ccc;
  font-size: 1rem;
}

.placeholder-border {
  border: 2px dashed #00d4ff;
}

.extra-margin {
  margin: 2rem;
}

.extra-padding {
  padding: 2rem;
}

.extra-rounded {
  border-radius: 10px;
}

.extra-shadow {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

.extra-gradient {
  background: linear-gradient(45deg, #000, #222, #000);
}

.extra-transform {
  transform: translate(0, 0);
}

.extra-transition {
  transition: all 0.3s ease-in-out;
}

.extra-opacity {
  opacity: 0.9;
}

.extra-filter {
  filter: brightness(1.1);
}

.extra-backdrop {
  backdrop-filter: blur(5px);
}

/* =============================================================================
    Ende der Styles
    ============================================================================= */
</style>
