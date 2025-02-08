<template>
  <div class="min-h-screen flex items-center justify-center p-4 md:p-6">
    <div
      class="w-full max-w-lg md:max-w-3xl bg-[#000000] rounded-2xl border-2 border-[#00d4ff]/20 shadow-2xl overflow-hidden">
      <div class="text-center py-6 md:py-10 px-4 md:px-6 bg-[#111111] border-b border-[#00d4ff]/10">
        <h1 class="text-2xl md:text-4xl font-bold mb-3 md:mb-4 text-white">Lass uns gemeinsam starten</h1>
        <p class="text-gray-400 text-lg md:text-xl">
          Beantworte ein paar kurze Fragen, damit wir deine Anforderungen besser verstehen.
        </p>
      </div>

      <div class="p-6 md:p-8">
        <!-- Progress Bar -->
        <div class="relative w-full h-2 md:h-3 bg-gray-800 rounded-full overflow-hidden shadow-md mb-6 md:mb-8">
          <div :style="{ width: `${progress}%` }"
            class="absolute h-full bg-gradient-to-r from-[#00d4ff] to-[#0099ff] transition-all duration-500 ease-out">
          </div>
        </div>

        <!-- Schritt 1 -->
        <div v-if="step === 1" class="text-center">
          <h2 class="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-white">Bist du ein Unternehmen oder ein
            Gründer?</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div class="choice" @click="selectType('Unternehmen')">
              <div class="text-3xl md:text-4xl text-[#00d4ff] mb-3 md:mb-4">🏢</div>
              <h3 class="text-lg md:text-xl font-bold text-white">Unternehmen</h3>
              <p class="text-gray-400 mt-1 md:mt-2">Ich suche professionelle digitale Lösungen.</p>
            </div>
            <div class="choice" @click="selectType('Startup')">
              <div class="text-3xl md:text-4xl text-[#00d4ff] mb-3 md:mb-4">🚀</div>
              <h3 class="text-lg md:text-xl font-bold text-white">Startup-Gründer</h3>
              <p class="text-gray-400 mt-1 md:mt-2">Ich habe eine Idee und suche einen Tech-Partner.</p>
            </div>
          </div>
        </div>

        <!-- Schritt 2 -->
        <div v-else-if="step === 2" class="space-y-4 md:space-y-6 text-center">
          <h2 class="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-white">Was genau suchst du?</h2>
          <div v-if="form.userType === 'Unternehmen'" class="space-y-3 md:space-y-4">
            <button v-for="option in businessOptions" :key="option" class="choice w-full text-lg md:text-xl"
              @click="selectDetail('businessNeed', option)">
              {{ option }}
            </button>
          </div>
          <div v-if="form.userType === 'Startup'" class="space-y-3 md:space-y-4">
            <button v-for="option in startupOptions" :key="option" class="choice w-full text-lg md:text-xl"
              @click="selectDetail('startupNeed', option)">
              {{ option }}
            </button>
          </div>
          <button class="mt-3 md:mt-4 py-2 px-4 rounded-lg bg-[#2a2a2a] text-white font-semibold hover:bg-[#00d4ff]/20"
            @click="goBack">Zurück</button>
        </div>

        <!-- Schritt 3: Kontaktformular -->
        <div v-else-if="step === 3" class="space-y-4 md:space-y-6 text-center">
          <h2 class="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-white">Gib uns deine Kontaktdaten</h2>
          <form class="space-y-3 md:space-y-4" @submit.prevent="submitForm">
            <input v-model="form.name" type="text" placeholder="Dein Name *" class="input-field text-lg md:text-xl" />
            <p v-if="errors.name" class="error-message">Bitte gib deinen Namen ein.</p>

            <input v-model="form.phone" type="tel" placeholder="Telefonnummer (Optional)"
              class="input-field text-lg md:text-xl" />
            <p v-if="errors.phone" class="error-message">Bitte gib eine gültige Telefonnummer ein.</p>

            <input v-model="form.email" type="email" placeholder="E-Mail *" class="input-field text-lg md:text-xl" />
            <p v-if="errors.email" class="error-message">Bitte gib eine gültige E-Mail-Adresse ein.</p>

            <button type="submit" class="submit-button">Absenden</button>
          </form>
          <div v-if="successMessage" class="text-center text-green-400 mt-3 md:mt-4 text-lg md:text-xl font-medium">
            {{ successMessage }}
          </div>
        </div>

        <!-- Schritt 4: Danke-Seite -->
        <div v-if="step === 4" class="text-center p-4 md:p-6">
          <h2 class="text-2xl md:text-3xl font-bold text-white">🎉 Vielen Dank!</h2>
          <p class="text-lg md:text-xl mt-3 md:mt-4 text-gray-400">Wir haben deine Anfrage erhalten und melden uns bald
            bei dir.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const step = ref(1);
const progress = ref(33);
const successMessage = ref('');
const errors = ref({ name: false, email: false, phone: false });

const form = ref({
  userType: '',
  businessNeed: '',
  startupNeed: '',
  name: '',
  phone: '',
  email: '',
});

const businessOptions = ['Website & Online-Shop', 'Software-App', 'Digitales Marketing'];
const startupOptions = ['MVP Entwicklung', 'Technischer Co-Founder', 'App- & Plattformentwicklung'];

const selectType = (type) => {
  form.value.userType = type;
  step.value = 2;
  progress.value = 66;
};

const selectDetail = (key, value) => {
  form.value[key] = value;
  step.value = 3;
  progress.value = 100;
};

const goBack = () => {
  step.value -= 1;
  progress.value -= 33;
};

const submitForm = () => {
  errors.value = {
    name: !form.value.name,
    email: !form.value.email || !/\S+@\S+\.\S+/.test(form.value.email),
    phone: form.value.phone && isNaN(form.value.phone),
  };

  if (errors.value.name || errors.value.email || errors.value.phone) {
    return;
  }

  successMessage.value = 'Vielen Dank! Wir melden uns in Kürze bei dir.';
  form.value = { userType: '', businessNeed: '', startupNeed: '', name: '', phone: '', email: '' };
  step.value = 4;
};
</script>

<style scoped>
.choice {
  position: relative;
  padding: 1.5rem;
  background: #111111;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
}

.choice:hover {
  transform: scale(1.03);
  box-shadow: 0 0 15px rgba(0, 212, 255, 0.7),
    0 0 25px rgba(0, 176, 232, 0.5),
    inset 0 0 15px rgba(0, 212, 255, 0.3);
  border-color: #00d4ff;
}

.input-field {
  width: 100%;
  padding: 12px;
  background: #111111;
  color: white;
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  outline: none;
  transition: 0.3s;
}

.input-field:focus {
  border-color: #00d4ff;
  box-shadow: 0 0 5px #00d4ff;
}

.error-message {
  color: red;
  background: #1a1a1a;
  padding: 6px;
  border-radius: 4px;
  margin-top: 4px;
}

.submit-button {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  background: #00d4ff;
  color: black;
  font-weight: bold;
  transition: 0.3s;
}

.submit-button:hover {
  background: #008fb3;
}
</style>