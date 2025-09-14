<template>
  <component :is="to ? 'NuxtLink' : 'button'" :to="to" :type="to ? undefined : type"
    :class="[baseClasses, variantClasses, $attrs.class]" v-bind="$attrs">
    <slot />
  </component>
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false })

interface Props {
  to?: string | object
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'cta'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: 'primary',
})

const baseClasses =
  'inline-flex items-center justify-center rounded-full px-6 py-3 font-medium transition-all duration-300'

const variantClasses = computed(() =>
  props.variant === 'cta'
    ? 'bg-gradient-to-r from-accent to-accent-dark text-background hover:shadow-lg hover:scale-105'
    : 'bg-primary text-background hover:bg-secondary'
)
</script>
