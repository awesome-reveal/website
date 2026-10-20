<script setup>
import { Reveal } from "@awesome-reveal/vue";

const bounceIn = [
  { opacity: 0, scale: 0.8, easing: "cubic-bezier(0.34, 1.56, 0.64, 1)" },
  { opacity: 1, scale: 1 },
];
</script>

<template>
  <Reveal :keyframes="bounceIn">
    <img src="/logo.svg" alt="Awesome Reveal" />
  </Reveal>
</template>
