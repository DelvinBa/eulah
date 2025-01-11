<template>
  <header class="flex items-center justify-between px-6 py-4 bg-black sticky top-0 z-50 shadow-md">
    <!-- Logo -->
    <div class="text-3xl font-bold">
      <img
        v-if="logo"
        :src="logo"
        alt="Eulah Logo"
        class="h-8"
      />
      <a v-else href="/" class="text-white hover:text-accent transition">Eulah</a>
    </div>

    <!-- Navigation Links -->
    <nav class="hidden md:flex space-x-6">
      <a href="/" class="hover:text-accent transition">Home</a>
      <a href="/projects" class="hover:text-accent transition">Projects</a>
      <a href="/contact" class="hover:text-accent transition">Contact</a>
    </nav>

    <!-- Burger Menu for Mobile -->
    <button class="md:hidden text-accent hover:text-opacity-80" @click="toggleMenu">
      <i class="pi pi-bars text-2xl"></i>
    </button>

    <!-- Mobile Menu -->
    <div
      v-if="isMenuOpen"
      class="absolute top-16 right-6 bg-black text-white rounded-lg shadow-lg p-6 flex flex-col space-y-4 md:hidden"
    >
      <a href="/" class="hover:text-accent transition" @click="toggleMenu">Home</a>
      <a href="/projects" class="hover:text-accent transition" @click="toggleMenu">Projects</a>
      <a href="/contact" class="hover:text-accent transition" @click="toggleMenu">Contact</a>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: {
    logo: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>
