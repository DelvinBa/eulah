<template>
  <section class="bg-background text-dark min-h-screen flex flex-col items-center">
    <div class="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <h1 class="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-center">Kontakt</h1>
      <p class="text-2xl text-dark text-center mb-8 md:mb-12">
        Sitz in Bielefeld, Deutschland – Projekte auf der ganzen Welt.
      </p>

      <div class="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 lg:gap-12">
        <!-- Globe container -->
        <div class="relative w-[280px] h-[180px] sm:w-[400px] sm:h-[250px] lg:w-[500px] lg:h-[400px]">
          <ClientOnly>
            <ContactGlobe ref="globeEl" class="w-full h-full rounded-2xl sm:rounded-3xl lg:rounded-4xl" />
          </ClientOnly>
        </div>

        <form @submit.prevent="submitForm" class="w-full max-w-lg lg:w-2/3 space-y-4 md:space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="name" class="block text-xl text-dark mb-2">Ihr Name</label>
              <input v-model="form.name" id="name" type="text" placeholder="Max Mustermann"
                class="w-full p-3 md:p-4 bg-surface text-dark rounded-lg border border-surface focus:outline-none focus:ring-2 focus:ring-accent" />
              <p v-if="errors.name"
                class="flex items-center gap-2 text-sm text-red-500 mt-2 bg-surface p-2 rounded-lg border border-red-500">
                <span class="material-icons"></span> Bitte geben Sie Ihren Namen ein.
              </p>
            </div>
            <div>
              <label for="company" class="block text-xl text-dark mb-2">Unternehmen (optional)</label>
              <input v-model="form.company" id="company" type="text" placeholder="Firmenname"
                class="w-full p-3 md:p-4 bg-surface text-dark rounded-lg border border-surface focus:outline-none focus:ring-2 focus:ring-accent" />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="email" class="block text-xl text-dark mb-2">Ihre E-Mail-Adresse</label>
              <input v-model="form.email" id="email" type="email" placeholder="example@domain.com"
                class="w-full p-3 md:p-4 bg-surface text-dark rounded-lg border border-surface focus:outline-none focus:ring-2 focus:ring-accent" />
              <p v-if="errors.email"
                class="flex items-center gap-2 text-sm text-red-500 mt-2 bg-surface p-2 rounded-lg border border-red-500">
                <span class="material-icons"></span> Bitte geben Sie eine gültige E-Mail-Adresse ein.
              </p>
            </div>
            <div>
              <label for="phone" class="block text-xl text-dark mb-2">Ihre Telefonnummer</label>
              <input v-model="form.phone" id="phone" type="tel" placeholder="0123456789"
                class="w-full p-3 md:p-4 bg-surface text-dark rounded-lg border border-surface focus:outline-none focus:ring-2 focus:ring-accent" />
              <p v-if="errors.phone"
                class="flex items-center gap-2 text-sm text-red-500 mt-2 bg-surface p-2 rounded-lg border border-red-500">
                <span class="material-icons"></span> Bitte geben Sie eine gültige Telefonnummer ein.
              </p>
            </div>
          </div>

          <div>
            <label for="category" class="block text-xl text-dark mb-2">Kategorie</label>
            <select v-model="form.category" id="category"
              class="w-full p-3 md:p-4 bg-surface text-dark rounded-lg border border-surface focus:outline-none focus:ring-2 focus:ring-accent">
              <option value="" disabled>Wähle eine Kategorie *</option>
              <option value="Software & Apps">Software & Apps</option>
              <option value="Webseiten">Webseiten</option>
              <option value="IT-Services">IT-Services</option>
              <option value="Digitales Marketing & Leads">Digitales Marketing & Leads</option>
              <option value="KI">KI</option>
              <option value="Sonstiges">Sonstiges</option>
            </select>
            <p v-if="errors.category"
              class="flex items-center gap-2 text-sm text-red-500 mt-2 bg-surface p-2 rounded-lg border border-red-500">
              <span class="material-icons"></span> Bitte wählen Sie eine Kategorie aus.
            </p>
          </div>

          <div>
            <label for="message" class="block text-xl text-dark mb-2">Ihre Nachricht</label>
            <textarea v-model="form.message" id="message" rows="4" placeholder="Ihre Nachricht..."
              class="w-full p-3 md:p-4 bg-surface text-dark rounded-lg border border-surface focus:outline-none focus:ring-2 focus:ring-accent"></textarea>
            <p v-if="errors.message"
              class="flex items-center gap-2 text-sm text-red-500 mt-2 bg-surface p-2 rounded-lg border border-red-500">
              <span class="material-icons"></span> Bitte geben Sie eine Nachricht ein.
            </p>
          </div>

          <button type="submit"
            class="w-full py-3 px-6 rounded-full bg-primary border-2 border-primary text-background text-xl font-semibold transition-all shadow-lg hover:bg-accent hover:border-accent">
            Nachricht senden
          </button>

          <div v-if="successMessage" class="text-center text-secondary mt-4 text-xl font-medium">
            {{ successMessage }}
          </div>
        </form>
      </div>

      <div class="mt-8 md:mt-12 text-center space-y-2">
        <p class="text-xl text-dark">Wir melden uns in der Regel innerhalb von 72 Stunden.</p>
        <p class="text-xl text-dark">E-Mail: <a href="mailto:info@eulah.de" class="text-accent hover:underline">info@eulah.de</a></p>
        <p class="text-xl text-dark">Telefon: <a href="tel:+495211234567" class="text-accent hover:underline">+49 521 1234567</a></p>
        <p class="text-xl text-dark">Standort: Bielefeld, Deutschland</p>
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
  company: '',
  email: '',
  phone: '',
  category: '',
  message: '',
});

const successMessage = ref('');
const errors = ref({
  name: false,
  email: false,
  phone: false,
  category: false,
  message: false,
});

const submitForm = () => {
  errors.value = {
    name: !form.value.name,
    email: !form.value.email || !/\S+@\S+\.\S+/.test(form.value.email), // Regex for email validation
    phone: !form.value.phone || isNaN(form.value.phone),
    category: !form.value.category,
    message: !form.value.message,
  };

  if (Object.values(errors.value).some((error) => error)) {
    return;
  }

  mail.send({
    from: form.value.name,
    subject: `Eulah Kontaktformular ausgefüllt von ${form.value.name}`,
    text: `Name: ${form.value.name}\nCompany: ${form.value.company}\nEmail: ${form.value.email}\nPhone: ${form.value.phone}\nCategory: ${form.value.category}\nMessage: ${form.value.message}`,
  });

  successMessage.value = 'Vielen Dank! Ihre Nachricht wurde erfolgreich übermittelt.';
  form.value = { name: '', company: '', email: '', phone: '', category: '', message: '' };
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
  -webkit-box-shadow: 0 0 0 30px var(--color-surface) inset !important;
  -webkit-text-fill-color: var(--color-dark) !important;
  box-shadow: 0 0 0 30px var(--color-surface) inset !important;
  caret-color: var(--color-dark) !important;
}

/* Für Firefox und andere Browser */
input[data-autocompleted],
input[data-autocompleted]:focus {
  background-color: transparent !important;
  color: var(--color-dark) !important;
}

/* Zusätzliche Sicherheit für moderne Browser */
input:-webkit-autofill::first-line {
  color: var(--color-dark) !important;
}

textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
textarea:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px var(--color-surface) inset !important;
  -webkit-text-fill-color: var(--color-dark) !important;
  box-shadow: 0 0 0 30px var(--color-surface) inset !important;
}
</style>