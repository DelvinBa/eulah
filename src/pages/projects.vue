<template>
  <section class="bg-black text-white min-h-screen py-12">
    <div class="container mx-auto px-6">
      <!-- Titel -->
      <header class="text-center mb-12">
        <h1 class="text-4xl font-bold mb-4">Unsere Projekte</h1>
        <p class="text-gray-400 text-lg">
          Ein Blick auf unsere innovativen und erfolgreichen Umsetzungen.
        </p>
      </header>

      <!-- Projekt-Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="project in projects"
          :key="project.id"
          class="relative bg-black-glossy rounded-lg overflow-hidden shadow-lg 
                 group transition-all duration-500 transform 
                 hover:scale-110 hover:shadow-glow"
        >
          <!-- Hintergrund-Leuchteffekt -->
          <div 
            class="absolute inset-0 bg-accent opacity-0 
                   group-hover:opacity-20 transition-opacity duration-500"
          ></div>

          <!-- Bild -->
          <div class="overflow-hidden relative z-10">
            <img
              :src="project.image"
              :alt="project.title"
              class="w-full h-64 object-cover transform 
                     group-hover:scale-110 transition-transform 
                     duration-500 ease-in-out"
            />
          </div>

          <!-- Inhalt -->
          <div class="p-6 relative z-20">
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-xl font-semibold text-white">
                {{ project.title }}
              </h3>
              <span class="text-accent text-2xl">
                {{ project.icon }}
              </span>
            </div>
            <p class="text-gray-400 text-sm mb-4">
              {{ project.description }}
            </p>
            <a
              :href="project.link"
              target="_blank"
              rel="noopener noreferrer"
              class="gradient-border-button"
            >
              Zur Webseite
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Image1 from "@/assets/images/1.jpg";
import Image2 from "@/assets/images/2.jpg";
import Image3 from "@/assets/images/3.jpg";

export default {
  name: "ProjectsPage",
  data() {
    return {
      projects: [
        {
          id: 1,
          title: "Projekt Alpha",
          description:
            "Eine innovative Plattform, die die Benutzererfahrung revolutioniert.",
          image: Image1,
          icon: "💡",
          link: "https://example.com",
        },
        {
          id: 2,
          title: "Beta Marketing",
          description:
            "Strategisches digitales Marketing, das Ergebnisse liefert.",
          image: Image2,
          icon: "📊",
          link: "https://example.com",
        },
        {
          id: 3,
          title: "Gamma Scraping",
          description:
            "Eine leistungsstarke Web-Scraping-Lösung für Datenextraktion.",
          image: Image3,
          icon: "🔍",
          link: "https://example.com",
        },
      ],
    };
  },
};
</script>

<style scoped>
/* Glänzender schwarzer Hintergrund */
.bg-black-glossy {
  background: linear-gradient(145deg, #0a0a0a, #1a1a1a);
  box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.05);
}

/* Hover-Shadows */
.hover\:shadow-glow:hover {
  box-shadow: 0 4px 20px rgba(0, 212, 255, 0.5);
}

/* Button mit Gradient-Umrandung */
.gradient-border-button {
  display: inline-block;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  color: white;
  background: black;
  border: 2px solid transparent;
  border-radius: 30px;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
}

.gradient-border-button::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border-radius: 30px;
  background: linear-gradient(to right, #38bdf8, #8b5cf6);
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gradient-border-button:hover::before {
  opacity: 1;
}
</style>
