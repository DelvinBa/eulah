<template>
  <section class="bg-primary text-background">
    <!-- Lead Funnel -->
    <div id="lead-funnel" class="container mx-auto px-4 md:px-6 -mt-20 mb-8">
      <LeadFunnel />
    </div>

    <footer class="py-8 md:py-12">
      <div class="container mx-auto px-4 md:px-6 text-center space-y-6 md:space-y-8">
        <!-- Links -->
        <div class="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-6">
        <a href="/impressum" class="text-sm md:text-base text-white hover:text-accent transition">Impressum</a>
        <a href="/datenschutz" class="text-sm md:text-base text-white hover:text-accent transition">Datenschutz</a>
      </div>

        <!-- Social Links -->
        <div class="flex justify-center space-x-6 text-white">
        <a href="https://www.tiktok.com/@eulah.de" target="_blank" rel="noopener" aria-label="TikTok"
          class="hover:text-orange-500 transition">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6" fill="white">
            <path
              d="M19 10.5594C17.6237 10.5623 16.2813 10.1327 15.1625 9.33125V14.9187C15.1622 15.9536 14.8459 16.9636 14.256 17.8139C13.6661 18.6641 12.8306 19.3139 11.8613 19.6764C10.8921 20.0389 9.83525 20.0969 8.83217 19.8425C7.82909 19.5881 6.92759 19.0335 6.24825 18.2529C5.5689 17.4723 5.14409 16.5029 5.03064 15.4743C4.91718 14.4457 5.12049 13.407 5.61336 12.497C6.10624 11.5871 6.86519 10.8494 7.78871 10.3825C8.71223 9.9156 9.75629 9.74182 10.7813 9.88438V12.6938C10.3126 12.5462 9.80929 12.5505 9.34322 12.7061C8.87715 12.8616 8.47215 13.1605 8.18603 13.5599C7.89992 13.9593 7.74732 14.439 7.75004 14.9303C7.75276 15.4216 7.91064 15.8996 8.20115 16.2958C8.49167 16.6921 8.89995 16.9864 9.36771 17.1368C9.83547 17.2872 10.3388 17.2859 10.8058 17.1332C11.2728 16.9805 11.6796 16.6842 11.9682 16.2865C12.2567 15.8888 12.4122 15.4101 12.4125 14.9187V4H15.1625C15.161 4.23258 15.1808 4.46481 15.2219 4.69375C15.3175 5.20406 15.5162 5.68951 15.8058 6.12044C16.0954 6.55136 16.4699 6.91869 16.9063 7.2C17.5274 7.61026 18.2556 7.82871 19 7.82812V10.5594Z" />
          </svg>
        </a>
        <a href="https://www.linkedin.com/company/107174661/" target="_blank" rel="noopener" aria-label="LinkedIn"
          class="hover:text-orange-500 transition">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6" fill="white">
            <path
              d="M18.72,4H5.37A1.31,1.31,0,0,0,4,5.25V18.63A1.41,1.41,0,0,0,5.37,20H18.72A1.34,1.34,0,0,0,20,18.63V5.25A1.23,1.23,0,0,0,18.72,4ZM9,17.34H6.67V10.21H9ZM7.89,9.13h0A1.18,1.18,0,0,1,6.67,7.9,1.18,1.18,0,0,1,7.91,6.67,1.18,1.18,0,0,1,9.13,7.9,1.18,1.18,0,0,1,7.89,9.13Zm9.45,8.21H15v-3.9c0-.93-.33-1.57-1.16-1.57a1.25,1.25,0,0,0-1.17.84,1.43,1.43,0,0,0-.08.57v4.06h-2.3V10.21h2.3v1A2.32,2.32,0,0,1,14.69,10c1.51,0,2.65,1,2.65,3.13Z" />
          </svg>
        </a>
        <a href="https://www.instagram.com/eulah_it" target="_blank" rel="noopener" aria-label="Instagram"
          class="hover:text-orange-500 transition">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6" fill="white">
            <path
              d="M12,7.9A4.1,4.1,0,1,0,16.1,12,4.09,4.09,0,0,0,12,7.9Zm0,6.77A2.67,2.67,0,1,1,14.67,12,2.67,2.67,0,0,1,12,14.67Zm5.23-6.94a1,1,0,1,1-1-1A1,1,0,0,1,17.23,7.73Zm2.71,1a4.71,4.71,0,0,0-1.29-3.35A4.71,4.71,0,0,0,15.3,4.06C14,4,10,4,8.7,4.06A4.73,4.73,0,0,0,5.35,5.35,4.71,4.71,0,0,0,4.06,8.7C4,10,4,14,4.06,15.3a4.71,4.71,0,0,0,1.29,3.35A4.73,4.73,0,0,0,8.7,19.94c1.32.08,5.28.08,6.6,0a4.71,4.71,0,0,0,3.35-1.29,4.71,4.71,0,0,0,1.29-3.35C20,14,20,10,19.94,8.7Zm-1.7,8a2.7,2.7,0,0,1-1.52,1.52,18,18,0,0,1-4.72.32,17.91,17.91,0,0,1-4.71-.32,2.7,2.7,0,0,1-1.52-1.52c-.42-1.06-.33-3.56-.33-4.72s-.09-3.67.33-4.72A2.65,2.65,0,0,1,7.29,5.76,17.91,17.91,0,0,1,12,5.44a18,18,0,0,1,4.72.32,2.7,2.7,0,0,1,1.52,1.52c.42,1.06.32,3.56.32,4.72S18.66,15.67,18.24,16.72Z" />
          </svg>
        </a>
      </div>

        <!-- Footer Note -->
        <p class="text-surface text-xs md:text-sm">
          All rights reserved © Eulah {{ currentYear }}
        </p>
      </div>
    </footer>
  </section>
</template>

<script setup>
import LeadFunnel from './LeadFunnel.vue';
import { ref } from 'vue';

const currentYear = ref(new Date().getFullYear());
</script>

