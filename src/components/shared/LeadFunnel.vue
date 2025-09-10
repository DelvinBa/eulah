<template>
  <div class="flex justify-center p-4">
    <div
      class="w-full max-w-lg md:max-w-3xl bg-primary text-background rounded-t-3xl border-2 border-primary-200 shadow-2xl overflow-hidden">
      <div class="text-center py-6 md:py-10 px-4 md:px-6 bg-primary-700">
        <h2 class="text-2xl md:text-4xl font-bold mb-3 md:mb-4">Kontaktiere uns</h2>
        <p class="text-primary-100 text-lg md:text-xl">
          Fülle das Formular aus, und wir melden uns bei dir.
        </p>
      </div>

      <div class="p-6 md:p-8 space-y-4">
        <form class="space-y-4" @submit.prevent="submitForm">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input v-model="form.name" type="text" placeholder="Dein Name *"
                class="input-field text-sm md:text-base" />
              <p v-if="errors.name" class="error-message">Bitte gib deinen Namen ein.</p>
            </div>
            <div>
              <input v-model="form.company" type="text" placeholder="Unternehmen (Optional)"
                class="input-field text-sm md:text-base" />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input v-model="form.email" type="email" placeholder="E-Mail *"
                class="input-field text-sm md:text-base" />
              <p v-if="errors.email" class="error-message">Bitte gib eine gültige E-Mail-Adresse ein.</p>
            </div>
            <div>
              <input v-model="form.phone" type="tel" placeholder="Telefonnummer *"
                class="input-field text-sm md:text-base" />
              <p v-if="errors.phone" class="error-message">Bitte gib eine gültige Telefonnummer ein.</p>
            </div>
          </div>

          <select v-model="form.category" class="input-field text-sm md:text-base">
            <option value="" disabled>Wähle eine Kategorie *</option>
            <option value="Software & Apps">Software & Apps</option>
            <option value="Webseiten">Webseiten</option>
            <option value="IT-Services">IT-Services</option>
            <option value="Digitales Marketing & Leads">Digitales Marketing & Leads</option>
            <option value="KI">KI</option>
            <option value="Sonstiges">Sonstiges</option>
          </select>
          <p v-if="errors.category" class="error-message">Bitte wähle eine Kategorie aus.</p>

          <textarea v-model="form.message" placeholder="Deine Nachricht *"
            class="input-field text-sm md:text-base h-24"></textarea>
          <p v-if="errors.message" class="error-message">Bitte gib eine Nachricht ein.</p>

          <div class="flex justify-between space-x-4">
            <button type="submit" class="submit-button w-full">Absenden</button>
            <button type="button" @click="redirectToBooking" class="booking-button w-full">Terminbuchung</button>
          </div>
        </form>

        <div v-if="successMessage" class="text-center text-green-400 mt-3 text-sm md:text-base font-medium">
          {{ successMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
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
  window.location.href = '/terminbuchung'; // Replace with the actual booking URL
};
</script>

<style scoped>
.input-field {
  width: 100%;
  padding: 10px;
  background: #ffffff;
  color: #333333;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  outline: none;
  transition: 0.3s;
}

.input-field:focus {
  border-color: #00d4ff;
  box-shadow: 0 0 4px #00d4ff;
}

.error-message {
  color: red;
  background: #ffe6e6;
  padding: 4px;
  border-radius: 4px;
  margin-top: 2px;
  font-size: 0.875rem;
}

.submit-button {
  padding: 10px;
  border-radius: 6px;
  background: #00d4ff;
  color: black;
  font-weight: bold;
  transition: 0.3s;
}

.submit-button:hover {
  background: #008fb3;
}

.booking-button {
  padding: 10px;
  border-radius: 6px;
  background: #ffffff;
  color: black;
  font-weight: bold;
  transition: 0.3s;
  border: 1px solid #00d4ff;
}

.booking-button:hover {
  background: #00d4ff;
  color: black;
}
</style>
