<template>
  <div class="flex justify-center px-4 relative z-20">
    <div
      class="w-full max-w-md md:max-w-2xl backdrop-blur-sm bg-white/95 text-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-white/20 transition-all duration-300">
      <!-- Header with Glass Effect -->
      <div
        class="text-center py-5 md:py-8 px-4 md:px-6 bg-gradient-to-br from-primary/10 via-primary-300/20 to-primary-500/30 backdrop-blur-md border-b border-white/20">
        <h2 text-black id="lead-funnel-heading" class="text-xl md:text-3xl font-bold mb-2 md:mb-3 text-gray-900">
          Jetzt Kontakt aufnehmen
        </h2>
        <p class="text-gray-700 text-base md:text-lg font-medium">
          Sichern Sie sich ein<span class="font-semibold text-primary-600">kostenloses Erstgespräch</span>
        </p>
      </div>

      <!-- Form Content -->
      <div class="p-5 md:p-6 space-y-4 bg-gradient-to-br from-white via-gray-50 to-white">
        <form class="space-y-4" @submit.prevent="submitForm" aria-labelledby="lead-funnel-heading">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="name" class="block text-sm font-semibold mb-2 text-gray-800">Dein Name *</label>
              <input id="name" v-model="form.name" type="text" required aria-required="true" :aria-invalid="errors.name"
                :aria-describedby="errors.name ? 'name-error' : null" class="input-field text-sm" />
              <p v-if="errors.name" id="name-error" class="error-message" role="alert">Bitte geben Sie Ihren Namen ein.</p>
            </div>
            <div>
              <label for="company" class="block text-sm font-semibold mb-2 text-gray-800">Unternehmen (Optional)</label>
              <input id="company" v-model="form.company" type="text" class="input-field text-sm" />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="email" class="block text-sm font-semibold mb-2 text-gray-800">E-Mail *</label>
              <input id="email" v-model="form.email" type="email" required aria-required="true"
                :aria-invalid="errors.email" :aria-describedby="errors.email ? 'email-error' : null"
                class="input-field text-sm" />
              <p v-if="errors.email" id="email-error" class="error-message" role="alert">Bitte geben Sie eine gültige
                E-Mail-Adresse an.</p>
            </div>
            <div>
              <label for="phone" class="block text-sm font-semibold mb-2 text-gray-800">Telefonnummer *</label>
              <input id="phone" v-model="form.phone" type="tel" required aria-required="true"
                :aria-invalid="errors.phone" :aria-describedby="errors.phone ? 'phone-error' : null"
                class="input-field text-sm" />
              <p v-if="errors.phone" id="phone-error" class="error-message" role="alert">Bitte geben Sie eine gültige
                Telefonnummer ein.</p>
            </div>
          </div>

          <div>
            <label for="category" class="block text-sm font-semibold mb-2 text-gray-800">Kategorie *</label>
            <select id="category" v-model="form.category" required aria-required="true" :aria-invalid="errors.category"
              :aria-describedby="errors.category ? 'category-error' : null" class="input-field text-sm">
              <option value="" disabled>Kategorie auswählen *</option>
              <option value="Software & Apps">Software & Apps</option>
              <option value="Webseiten">Webseiten</option>
              <option value="IT-Services">IT-Services</option>
              <option value="Digitales Marketing & Leads">Digitales Marketing & Leads</option>
              <option value="KI">KI</option>
              <option value="Sonstiges">Sonstiges</option>
            </select>
            <p v-if="errors.category" id="category-error" class="error-message" role="alert">Bitte wählen Sie eine Kategorie
              aus.</p>
          </div>

          <div>
            <label for="message" class="block text-sm font-semibold mb-2 text-gray-800">Deine Nachricht *</label>
            <textarea id="message" v-model="form.message" required aria-required="true" :aria-invalid="errors.message"
              :aria-describedby="errors.message ? 'message-error' : null"
              class="input-field text-sm h-24 resize-none"></textarea>
            <p v-if="errors.message" id="message-error" class="error-message" role="alert">Bitte geben Sie eine Nachricht ein.
            </p>
          </div>

          <div class="flex flex-col sm:flex-row justify-between gap-3 pt-3">
            <BaseButton type="submit" class="w-full group" variant="primary" aria-label="Formular absenden">
              <span class="relative z-10">Absenden</span>
            </BaseButton>
            <BaseButton type="button" @click="redirectToBooking" class="w-full group" variant="cta"
              aria-label="Termin vereinbaren">
              <span class="relative z-10">Terminbuchung</span>
            </BaseButton>
          </div>
        </form>

        <div v-if="successMessage"
          class="text-center text-green-600 mt-4 text-sm font-semibold bg-green-50 rounded-lg p-3 border border-green-200"
          role="status">
          {{ successMessage }}
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import BaseButton from './BaseButton.vue';
const form = ref({
  name: '',
  company: '',
  email: '',
  phone: '',
  category: '',
  message: '',
});

const errors = ref({
  name: false,
  email: false,
  phone: false,
  category: false,
  message: false,
});

const successMessage = ref('');

const submitForm = () => {
  errors.value = {
    name: !form.value.name,
    email: !form.value.email || !/\S+@\S+\.\S+/.test(form.value.email),
    phone: !form.value.phone || isNaN(form.value.phone),
    category: !form.value.category,
    message: !form.value.message,
  };

  if (Object.values(errors.value).some((error) => error)) {
    return;
  }

  successMessage.value = 'Vielen Dank! Wir melden uns in Kürze bei dir.';
  form.value = { name: '', company: '', email: '', phone: '', category: '', message: '' };
};

const redirectToBooking = () => {
  window.location.href = '/terminbuchung';
};
</script>

<style scoped>
.input-field {
  width: 100%;
  padding: 14px 16px;
  background: linear-gradient(145deg, #ffffff, #f8fafc);
  color: #1f2937;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  outline: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 500;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.input-field:focus {
  border-color: #00d4ff;
  box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.1), 0 4px 6px rgba(0, 0, 0, 0.1);
  background: #ffffff;
  transform: translateY(-1px);
}

.input-field:hover:not(:focus) {
  border-color: #9ca3af;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.error-message {
  color: #dc2626;
  background: linear-gradient(145deg, #fee2e2, #fef2f2);
  padding: 8px 12px;
  border-radius: 8px;
  margin-top: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  border-left: 3px solid #dc2626;
}
</style>
