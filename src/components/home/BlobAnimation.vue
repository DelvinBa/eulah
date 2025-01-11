<template>
  <div class="blob-container">
    <!-- Gooey-Filter (unsichtbar, wird aber per CSS angewendet) -->
    <svg width="0" height="0">
      <defs>
        <filter id="goo">
          <!-- Je höher das stdDeviation, desto "flüssiger" wirkt das Ganze -->
          <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 15 -5
            "
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </defs>
    </svg>

    <!-- Blobs -->
    <div
      v-for="blob in blobs"
      :key="blob.id"
      class="blob"
      :style="{
        width: blob.size + 'px',
        height: blob.size + 'px',
        top: blob.y + 'px',
        left: blob.x + 'px',
      }"
    ></div>
  </div>
</template>

<script>
export default {
  name: "BlobAnimation",
  data() {
    return {
      blobs: [],
    };
  },
  mounted() {
    this.generateBlobs(15); // Anzahl der Blobs
    this.startAnimation();
  },
  methods: {
    generateBlobs(count) {
      // Einheitliche Geschwindigkeit und zufällige Richtung
      const speed = 1; // je kleiner, desto langsamer

      for (let i = 0; i < count; i++) {
        const size = Math.random() * 100 + 150; // 150px bis 250px
        const directionX = Math.random() < 0.5 ? 1 : -1;
        const directionY = Math.random() < 0.5 ? 1 : -1;

        this.blobs.push({
          id: i,
          size,
          x: Math.random() * (window.innerWidth - size),
          y: Math.random() * (window.innerHeight - size),
          vx: directionX * speed,
          vy: directionY * speed,
        });
      }
    },
    startAnimation() {
      const animate = () => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        this.blobs.forEach((blob) => {
          // Bewegung aktualisieren
          blob.x += blob.vx;
          blob.y += blob.vy;

          // Ränder abprallen
          if (blob.x <= 0 || blob.x + blob.size >= screenWidth) {
            blob.vx *= -1;
          }
          if (blob.y <= 0 || blob.y + blob.size >= screenHeight) {
            blob.vy *= -1;
          }
        });

        // Re-Render erzwingen
        this.blobs = [...this.blobs];

        requestAnimationFrame(animate);
      };

      animate();
    },
  },
};
</script>

<style scoped>
.blob-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* Gooey-Effekt aktivieren */
  filter: url(#goo);
  overflow: hidden;
  z-index: -1;
}

/*
  Hintergrundfarbe mit Transparenz (radialer Gradient):
  - Mitte komplett transparent
  - Außen opaker Farbton
  Du kannst hier mit den Werten herumspielen, um mehr oder weniger Transparenz zu erhalten.
*/
.blob {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(59, 130, 246, 0) 30%,
    rgba(59, 130, 246, 0.7) 100%
  );
  /* Weiche Übergänge bei Farb-/Gradientwechseln */
  transition: background 0.3s ease;
}
</style>
