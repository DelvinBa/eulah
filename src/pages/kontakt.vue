<template>
  <section class="bg-black text-white min-h-screen flex flex-col items-center">
    <div class="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <h1 class="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-center">Kontakt</h1>
      <p class="text-2xl md:  text-gray-400 text-center mb-8 md:mb-12">
        Sitz in Deutschland, Projekte auf der ganzen Welt.
      </p>

      <div class="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 lg:gap-12">
        <!-- Globe container -->
        <div class="relative w-[280px] h-[180px] sm:w-[400px] sm:h-[250px] lg:w-[500px] lg:h-[400px]">
          <ClientOnly>
            <ContactGlobe ref="globeEl" class="w-full h-full rounded-2xl sm:rounded-3xl lg:rounded-4xl" />
          </ClientOnly>
        </div>

        <form @submit.prevent="submitForm" class="w-full max-w-lg lg:w-2/3 space-y-4 md:space-y-6">
          <div>
            <label for="name" class="block  text-xl text-gray-400 mb-2">Ihr Name</label>
            <input v-model="form.name" id="name" type="text" placeholder="Max Mustermann"
              class="w-full p-3 md:p-4 bg-black text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent " />
            <p v-if="errors.name"
              class="flex items-center gap-2  text-xl  text-red-500 mt-2 bg-gray-800 p-2 rounded-lg border border-red-500">
              <span class="material-icons">error</span> Bitte geben Sie Ihren Namen ein.
            </p>
          </div>

          <div>
            <label for="email" class="block  text-xl text-gray-400 mb-2">Ihre E-Mail-Adresse</label>
            <input v-model="form.email" id="email" type="email" placeholder="example@domain.com"
              class="w-full p-3 md:p-4 bg-black text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent " />
            <p v-if="errors.email"
              class="flex items-center gap-2  text-xl text-red-500 mt-2 bg-gray-800 p-2 rounded-lg border border-red-500">
              <span class="material-icons">error</span> Bitte geben Sie eine gültige E-Mail-Adresse ein.
            </p>
          </div>

          <div>
            <label for="message" class="block  text-xl text-gray-400 mb-2">Ihre Nachricht</label>
            <textarea v-model="form.message" id="message" rows="4" placeholder="Ihre Nachricht..."
              class="w-full p-3 md:p-4 bg-black text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"></textarea>
            <p v-if="errors.message"
              class="flex items-center gap-2  text-xl text-red-500 mt-2 bg-gray-800 p-2 rounded-lg border border-red-500">
              <span class="material-icons">error</span> Bitte geben Sie eine Nachricht ein.
            </p>
          </div>

          <button type="submit"
            class="w-full py-3 px-6 rounded-full border-2 border-gray-500 text-white text-xl   font-semibold transition-all shadow-lg hover:border-accent hover:bg-black hover:text-accent">
            Nachricht senden
          </button>

          <div v-if="successMessage" class="text-center text-green-400 mt-4 text-xl  font-medium">
            {{ successMessage }}
          </div>
        </form>
      </div>

      <div class="mt-8 md:mt-12 text-center">
        <p class="   text-xl text-gray-400">Wir melden uns in der Regel innerhalb von 72 Stunden.</p>
      </div>
    </div>
  </section>
</template>

<script setup>

useSeoMeta({
  title: 'Kontakt – Eulah',
  description: 'Kontaktiere uns für digitale Lösungen in Softwareentwicklung, Marketing & Automatisierung. Sitz in Deutschland, Projekte weltweit.',
  ogTitle: 'Kontakt – Eulah',
  ogDescription: 'Lass uns zusammenarbeiten! Wir entwickeln digitale Lösungen für Unternehmen & Startups weltweit.',
  canonical: 'https://www.eulah.de/kontakt'
})

const mail = useMail();

// Form data and state
const form = ref({
  name: '',
  email: '',
  message: '',
});

const successMessage = ref('');
const errors = ref({
  name: false,
  email: false,
  message: false,
});

const submitForm = () => {
  errors.value = {
    name: !form.value.name,
    email: !form.value.email || !/\S+@\S+\.\S+/.test(form.value.email), // Regex for email validation
    message: !form.value.message,
  };

  if (errors.value.name || errors.value.email || errors.value.message) {
    return;
  }

  mail.send({
    from: form.value.name,
    subject: `Eulah Kontaktformular ausgefüllt von ${form.value.name}`,
    text: `Name: ${form.value.name}\nEmail: ${form.value.email}\nMessage: ${form.value.message}`,
  });

  successMessage.value = 'Vielen Dank! Ihre Nachricht wurde erfolgreich übermittelt.';
  form.value.name = '';
  form.value.email = '';
  form.value.message = '';
};
</script>
<style scoped>
.globe-container {
  border-radius: 20px;

  @media (min-width: 640px) {
    border-radius: 30px;
  }

  @media (min-width: 1024px) {
    border-radius: 40px;
  }
}

/* Verhindert den weißen Autofill-Hintergrund */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px black inset !important;
  -webkit-text-fill-color: white !important;
  box-shadow: 0 0 0 30px black inset !important;
  caret-color: white !important;
}

/* Für Firefox und andere Browser */
input[data-autocompleted],
input[data-autocompleted]:focus {
  background-color: transparent !important;
  color: white !important;
}

/* Zusätzliche Sicherheit für moderne Browser */
input:-webkit-autofill::first-line {
  color: white !important;
}

textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
textarea:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px black inset !important;
  -webkit-text-fill-color: white !important;
  box-shadow: 0 0 0 30px black inset !important;
}
</style>