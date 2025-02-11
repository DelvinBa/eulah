<template>
    <div class="particle-container">
        <!-- Canvas für die Partikelanimation -->
        <canvas ref="canvas" class="particle-canvas"></canvas>
        <!-- Overlay mit Typewriter-Text und Call-to-Action -->
        <div class="overlay">
            <div class="typewriter">{{ typedText }}<span class="cursor">|</span></div>
            <button class="button" @click="scrollToFunnel">Jetzt Projekt starten</button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

// Prüfe, ob es sich um ein mobiles Gerät handelt:
const isMobile = window.innerWidth < 768;

/* =============================================================================
   GLOBALE VARIABLEN & SETUP
   ============================================================================= */
let canvasWidth, canvasHeight;
const canvas = ref(null);
let ctx;
let particlesArray = [];
// Phasen: "initial" (Wortformation), "explosion" (Partikel explodieren), "final" (finaler Text "Eulah Software")
let phase = "initial";
const explosionDuration = 2000; // Dauer der Explosion in ms
let explosionStartTime;

// Raster für Partikel im initialen Zustand
let particleStep = 6;

// Mausobjekt (optional)
const mouse = {
    x: undefined,
    y: undefined,
    radius: 100
};

function handleMouseMove(event) {
    const rect = canvas.value.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
}

/* =============================================================================
   PARTICLE-KLASSE
   ============================================================================= */
class Particle {
    constructor(x, y) {
        this.baseX = x;
        this.baseY = y;
        this.x = x;
        this.y = y;
        this.size = 1.5; // Reduced from 2 to 1.5 to accommodate higher density
        this.density = Math.random() * 30 + 1;
        const centerX = canvasWidth / 2;
        const centerY = canvasHeight / 2;
        const dx = this.x - centerX;
        const dy = this.y - centerY;
        let angle = Math.atan2(dy, dx);
        const randomAngleOffset = (Math.random() - 0.5) * Math.PI / 8;
        angle += randomAngleOffset;
        const speed = Math.random() * 10 + 8;
        this.velocityX = Math.cos(angle) * speed;
        this.velocityY = Math.sin(angle) * speed;
    }

    // Zeichnet den Partikel
    draw() {
        ctx.fillStyle = '#00d4ff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    // Bewegt den Partikel sanft zurück zur Basisposition
    update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const maxDistance = mouse.radius;
        const force = (maxDistance - distance) / maxDistance;
        if (distance < mouse.radius) {
            const directionX = forceDirectionX * force * this.density;
            const directionY = forceDirectionY * force * this.density;
            this.x -= directionX;
            this.y -= directionY;
        } else {
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

    // Für die Explosionsphase
    explosionUpdate() {
        this.x += this.velocityX;
        this.y += this.velocityY;
        // Leichte Reibung
        this.velocityX *= 0.95;
        this.velocityY *= 0.95;
    }
}

/* =============================================================================
   INITIALISIERUNG DER ERSTEN PHASE (Wortformation)
   =============================================================================
   Mithilfe eines Offscreen-Canvas werden die Wörter gerendert, aus denen
   Partikel erstellt werden. Auf mobilen Geräten wird nur ein einziges Wort
   ("Exzellenz") mittig angezeigt.
   ============================================================================= */
function initInitial() {
    const textCanvas = document.createElement('canvas');
    const textCtx = textCanvas.getContext('2d');
    canvasWidth = canvas.value.width = window.innerWidth;
    canvasHeight = canvas.value.height = window.innerHeight;
    particleStep = 6;
    textCanvas.width = canvasWidth;
    textCanvas.height = canvasHeight;

    textCtx.fillStyle = 'white';

    let initialWords;
    const currentWidth = window.innerWidth;
    const isLaptop = currentWidth >= 768 && currentWidth <= 1200;

    if (isMobile) {
        textCtx.font = 'bold 50px Arial';
        // Damit "Exzellenz" zentriert erscheint:
        textCtx.textAlign = 'center';
        textCtx.textBaseline = 'middle';
        // Nur ein Wort "Exzellenz" in der Mitte
        initialWords = [
            { word: "Exzellenz", x: canvasWidth / 2, y: canvasHeight / 2 }
        ];
    } else if (isLaptop) {
        textCtx.font = 'bold 50px Arial';  // Leicht kleinere Schrift
        initialWords = [
            { word: "Erfolg", x: canvasWidth * 0.2, y: canvasHeight * 0.3 },
            { word: "Exponentiell", x: canvasWidth * 0.8, y: canvasHeight * 0.3 },
            { word: "Effizienz", x: canvasWidth * 0.35, y: canvasHeight * 0.5 },
            { word: "Energie", x: canvasWidth * 0.65, y: canvasHeight * 0.5 },
            { word: "Evolution", x: canvasWidth * 0.2, y: canvasHeight * 0.7 },
            { word: "Engagement", x: canvasWidth * 0.8, y: canvasHeight * 0.7 },
            { word: "Exzellenz", x: canvasWidth * 0.9, y: canvasHeight * 0.2 }
        ];
    } else {
        textCtx.font = 'bold 60px Arial';
        // Desktop-Initialpositionen
        initialWords = [
            { word: "Erfolg", x: canvasWidth * 0.15, y: canvasHeight * 0.3 },
            { word: "Exponentiell", x: canvasWidth * 0.75, y: canvasHeight * 0.3 },
            { word: "Effizienz", x: canvasWidth * 0.25, y: canvasHeight * 0.5 },
            { word: "Energie", x: canvasWidth * 0.65, y: canvasHeight * 0.5 },
            { word: "Evolution", x: canvasWidth * 0.15, y: canvasHeight * 0.7 },
            { word: "Engagement", x: canvasWidth * 0.75, y: canvasHeight * 0.7 },
            { word: "Exzellenz", x: canvasWidth * 0.45, y: canvasHeight * 0.2 }
        ];
    }

    initialWords.forEach(item => {
        textCtx.fillText(item.word, item.x, item.y);
    });

    const textCoordinates = textCtx.getImageData(0, 0, canvasWidth, canvasHeight);
    particlesArray = [];
    for (let y = 0; y < canvasHeight; y += particleStep) {
        for (let x = 0; x < canvasWidth; x += particleStep) {
            const index = (y * canvasWidth + x) * 4;
            if (textCoordinates.data[index + 3] > 128) {
                particlesArray.push(new Particle(x, y));
            }
        }
    }
}

/* =============================================================================
   FINAL TEXT FORMATION ("Eulah Software")
   =============================================================================
   Mithilfe eines Offscreen-Canvas wird der finale Text gerendert.
   Um das Wort weniger dicht zu machen, wird ein gröberes Raster (finalStep = 4)
   verwendet. Wichtig: Der Text wird exakt mittig (y = canvasHeight/2) gezeichnet,
   sodass die untere Hälfte genauso vollständig ist wie die obere.
   ============================================================================= */
function getFinalPositions() {
    const finalPositions = [];
    const textCanvas = document.createElement('canvas');
    textCanvas.width = canvasWidth;
    textCanvas.height = canvasHeight;
    const textCtx = textCanvas.getContext('2d');
    textCtx.fillStyle = 'white';

    let font, text, posY;
    if (isMobile) {
        font = 'bold 60px Arial';
        text = "Eulah\nSoftware";
        posY = canvasHeight / 2;
    } else {
        font = 'bold 120px Arial';
        text = "Eulah Software";
        posY = canvasHeight / 2;
    }

    textCtx.font = font;
    textCtx.textAlign = 'center';
    textCtx.textBaseline = 'middle';
    const posX = canvasWidth / 2;

    // Clear the canvas before drawing
    textCtx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw the text
    if (text.includes("\n")) {
        const lines = text.split("\n");
        const fontSize = isMobile ? 60 : 120;
        const lineHeight = fontSize * 1.2;
        for (let i = 0; i < lines.length; i++) {
            textCtx.fillText(
                lines[i],
                posX,
                posY - (lines.length - 1) * lineHeight / 2 + i * lineHeight
            );
        }
    } else {
        textCtx.fillText(text, posX, posY);
    }

    // Get image data
    const textCoordinates = textCtx.getImageData(0, 0, canvasWidth, canvasHeight);
    // Reduced step size for higher density
    const finalStep = 2; // Changed from 4 to 2 for more sampling points

    // First pass: Count total available positions
    let availablePositions = 0;
    for (let y = 0; y < canvasHeight; y += finalStep) {
        for (let x = 0; x < canvasWidth; x += finalStep) {
            const index = (y * canvasWidth + x) * 4;
            if (textCoordinates.data[index + 3] > 128) {
                availablePositions++;
            }
        }
    }

    // Increased desired particles for better readability
    const desiredParticles = Math.min(availablePositions, 4000); // Increased from 2000 to 4000
    const samplingRate = availablePositions / desiredParticles;
    let currentSample = 0;

    // Second pass: Sample positions based on calculated rate
    for (let y = 0; y < canvasHeight; y += finalStep) {
        for (let x = 0; x < canvasWidth; x += finalStep) {
            const index = (y * canvasWidth + x) * 4;
            if (textCoordinates.data[index + 3] > 128) {
                currentSample++;
                if (currentSample % Math.ceil(samplingRate) === 0) {
                    // Reduced random offset for tighter text formation
                    const offsetX = (Math.random() - 0.5) * finalStep * 0.8;
                    const offsetY = (Math.random() - 0.5) * finalStep * 0.8;
                    finalPositions.push({
                        x: x + offsetX,
                        y: y + offsetY
                    });
                }
            }
        }
    }

    // Additional particles for enhanced density
    const basePositions = [...finalPositions];
    basePositions.forEach(basePos => {
        // Add cluster particles around base positions
        const clusterCount = Math.floor(Math.random() * 2) + 1; // 1-2 additional particles per base
        for (let i = 0; i < clusterCount; i++) {
            finalPositions.push({
                x: basePos.x + (Math.random() - 0.5) * finalStep,
                y: basePos.y + (Math.random() - 0.5) * finalStep
            });
        }
    });

    // Ensure minimum particle density
    if (finalPositions.length < desiredParticles) {
        const additionalParticles = Math.floor(desiredParticles - finalPositions.length);
        for (let i = 0; i < additionalParticles; i++) {
            const basePos = finalPositions[Math.floor(Math.random() * finalPositions.length)];
            if (basePos) {
                finalPositions.push({
                    x: basePos.x + (Math.random() - 0.5) * finalStep,
                    y: basePos.y + (Math.random() - 0.5) * finalStep
                });
            }
        }
    }

    return finalPositions;
}

/* =============================================================================
   TRANSITION ZUM FINALEN TEXT
   =============================================================================
   Allen Partikeln werden neue Basispositionen (basierend auf den finalen Text-Pixeln)
   zugewiesen. Falls es weniger Partikel gibt als finale Positionen, werden zusätzliche
   Partikel erzeugt.
   ============================================================================= */
function transitionToFinal() {
    const finalPositions = getFinalPositions();

    // Adjust existing particles
    particlesArray.forEach((particle, index) => {
        if (index < finalPositions.length) {
            particle.baseX = finalPositions[index].x;
            particle.baseY = finalPositions[index].y;
        } else {
            // Remove excess particles
            particlesArray.splice(index);
        }
    });

    // Add new particles if needed
    while (particlesArray.length < finalPositions.length) {
        const pos = finalPositions[particlesArray.length];
        const centerX = canvasWidth / 2;
        const centerY = canvasHeight / 2;
        const newParticle = new Particle(centerX, centerY);
        newParticle.baseX = pos.x;
        newParticle.baseY = pos.y;
        particlesArray.push(newParticle);
    }
}

/* =============================================================================
   ANIMATION
   =============================================================================
   Je nach Phase werden die Partikel animiert:
   - "initial": Partikel bilden die Anfangswörter.
   - "explosion": Partikel explodieren.
   - "final": Partikel formen den finalen Text.
   ============================================================================= */
function animate() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    if (phase === "initial") {
        particlesArray.forEach(particle => particle.draw());
    } else if (phase === "explosion") {
        const elapsed = performance.now() - explosionStartTime;
        if (elapsed < explosionDuration) {
            particlesArray.forEach(particle => {
                particle.explosionUpdate();
                particle.draw();
            });
        } else {
            transitionToFinal();
            phase = "final";
        }
    } else if (phase === "final") {
        particlesArray.forEach(particle => {
            particle.update();
            particle.draw();
        });
    }
    requestAnimationFrame(animate);
}

function handleResize() {
    canvasWidth = canvas.value.width = window.innerWidth;
    canvasHeight = canvas.value.height = window.innerHeight;
    if (phase === "initial") {
        initInitial();
    }
}

/* =============================================================================
   TYPEWRITER-EFFEKT
   ============================================================================= */
// Auf mobilen Geräten ein verkürzter Text mit Zeilenumbruch
const finalTypewriterText = isMobile
    ? "Von Code zu Cashflow –\nwir bauen dein Business."
    : "Von Code zu Cashflow – wir bauen Geschäftsmodelle, die wachsen.";
const typedText = ref("");
let typeIndex = 0;
function typeWriter() {
    if (typeIndex < finalTypewriterText.length) {
        typedText.value += finalTypewriterText.charAt(typeIndex);
        typeIndex++;
        setTimeout(typeWriter, 50);
    }
}

/* =============================================================================
   SCROLL TO LEADFUNNEL
   =============================================================================
   Beim Klick scrollt der Button zum Element mit der ID "lead-funnel".
   ============================================================================= */
function scrollToFunnel() {
    const funnelSection = document.getElementById('lead-funnel');
    if (funnelSection) {
        funnelSection.scrollIntoView({ behavior: 'smooth' });
    }
}

/* =============================================================================
   LIFECYCLE
   ============================================================================= */
onMounted(() => {
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
    ctx = canvas.value.getContext('2d');
    canvas.value.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    // Initialphase starten
    initInitial();
    animate();
    // Nach 2 Sekunden in die Explosionsphase wechseln
    setTimeout(() => {
        phase = "explosion";
        explosionStartTime = performance.now();
    }, 2000);
    // Typewriter-Effekt starten
    typeWriter();
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
    canvas.value.removeEventListener('mousemove', handleMouseMove);
});
</script>

<style scoped>
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

.particle-container {
    position: relative;
    width: 100%;
    height: 100vh;
    background: transparent;
    overflow: hidden;
}

.particle-canvas {
    display: block;
    width: 100%;
    height: 100%;
}

.overlay {
    position: absolute;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #fff;
    z-index: 10;
    padding: 1rem;
}

.typewriter {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    /* Auf Desktop ohne Zeilenumbruch */
    white-space: nowrap;
    overflow: hidden;
}

.cursor {
    display: inline-block;
    animation: blink 1s infinite;
}

@keyframes blink {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

.button {
    position: relative;
    padding: 1.5rem;
    background: transparent;
    border: 1px solid #ffffff;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    overflow: hidden;
    color: #ffffff;
    font-size: 1.2rem;
}

.button:hover {
    transform: scale(1.03);
    box-shadow: 0 0 15px rgba(0, 212, 255, 0.7),
        0 0 25px rgba(0, 176, 232, 0.5),
        inset 0 0 15px rgba(0, 212, 255, 0.3);
    border-color: #00d4ff;
}

/* Mobile Anpassungen */
@media (max-width: 768px) {
    .typewriter {
        font-size: 1.2rem;
        white-space: pre-line;
    }

    .button {
        padding: 1rem;
        font-size: 0.9rem;
    }
}
</style>
