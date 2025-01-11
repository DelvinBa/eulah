<template>
  <section class="bg-black text-white min-h-screen flex flex-col items-center">
    <div class="container mx-auto px-6 py-12">
      <h1 class="text-5xl font-bold mb-6 text-center">Kontakt</h1>
      <p class="text-lg text-gray-400 text-center mb-12">
        Sitz in Deutschland, Projekte auf der ganzen Welt.
      </p>

      <div class="flex flex-col md:flex-row items-start justify-center gap-12">
        <!-- Globe container slightly higher -->
        <div class="relative w-full md:w-1/2 mt-4">
          <Globe 
            ref="globeRef"
            @ready="onGlobeReady"
          />
        </div>

        <form @submit.prevent="submitForm" class="max-w-lg w-full md:w-2/3 mx-auto space-y-6 mt-8">
          <div>
            <label for="name" class="block text-sm text-gray-400 mb-2">Ihr Name</label>
            <input
              v-model="form.name"
              id="name"
              type="text"
              placeholder="Max Mustermann"
              class="w-full p-4 bg-black text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <p v-if="errors.name" class="text-red-500 text-sm mt-1">Bitte geben Sie Ihren Namen ein.</p>
          </div>
          
          <div>
            <label for="email" class="block text-sm text-gray-400 mb-2">Ihre E-Mail-Adresse</label>
            <input
              v-model="form.email"
              id="email"
              type="email"
              placeholder="example@domain.com"
              class="w-full p-4 bg-black text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <p v-if="errors.email" class="text-red-500 text-sm mt-1">Bitte geben Sie eine gültige E-Mail-Adresse ein.</p>
          </div>
          
          <div>
            <label for="message" class="block text-sm text-gray-400 mb-2">Ihre Nachricht</label>
            <textarea
              v-model="form.message"
              id="message"
              rows="5"
              placeholder="Ihre Nachricht..."
              class="w-full p-4 bg-black text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
            ></textarea>
            <p v-if="errors.message" class="text-red-500 text-sm mt-1">Bitte geben Sie eine Nachricht ein.</p>
          </div>

          <button
            type="submit"
            class="w-full py-3 px-6 rounded-full border-2 border-gray-500 text-white transition-all shadow-lg
                   hover:border-accent hover:bg-black hover:text-accent"
          >
            Nachricht senden
          </button>
          
          <div v-if="successMessage" class="text-center text-green-400 mt-4">
            {{ successMessage }}
          </div>
        </form>
      </div>

      <div class="mt-12 text-center">
        <p class="text-gray-400">Wir melden uns in der Regel innerhalb von 72 Stunden.</p>
      </div>
    </div>
  </section>
</template>

<script>
import Header from '~/components/shared/Header.vue';
import Footer from '~/components/shared/Footer.vue';
import Globe from '~/components/contact/Globe.client.vue';

export default {
  name: 'ContactPage',
  components: {
    Header,
    Footer,
    Globe
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: '',
      },
      successMessage: '',
      errors: {
        name: false,
        email: false,
        message: false,
      },
      globeInstance: null,
      markers: [
        {
          name: 'Deutschland',
          lat: 51.1657,
          lng: 10.4515
        }
      ],
    };
  },
  mounted() {
    console.log("Contact page mounted");
    window.addEventListener('mousemove', this.handleMouseMove);
  },
  beforeDestroy() {
    console.log("Contact page being destroyed");
    window.removeEventListener('mousemove', this.handleMouseMove);
  },
  methods: {
    onGlobeReady(instance) {
      console.log("Globe instance received");
      this.globeInstance = instance;
    },
    handleMouseMove(e) {
      if (!this.globeInstance) {
        console.log("No globe instance available");
        return;
      }

      const globeEl = this.$refs.globeRef.$el;
      const rect = globeEl.getBoundingClientRect();

      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        const rotationSpeed = 0.002;
        this.globeInstance.controls().rotateLeft(e.movementX * rotationSpeed);
        this.globeInstance.controls().rotateUp(e.movementY * rotationSpeed);
        this.globeInstance.controls().update();
      }
    },
    submitForm() {
      this.errors = {
        name: !this.form.name,
        email: !this.form.email,
        message: !this.form.message,
      };

      if (this.errors.name || this.errors.email || this.errors.message) {
        return;
      }

      this.successMessage = 'Vielen Dank! Ihre Nachricht wurde erfolgreich übermittelt.';
      this.form.name = '';
      this.form.email = '';
      this.form.message = '';
    }
  }
};
</script>
