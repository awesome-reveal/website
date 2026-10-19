<script setup>
import { Reveal } from "@awesome-reveal/vue";
</script>

<template>
  <Reveal :from="{ opacity: 0 }">Fade only</Reveal>
  <Reveal :from="{ scale: 0.9 }">Scale only</Reveal>
  <Reveal :from="{ opacity: 0, x: '-100%', rotate: '-5deg', blur: 8 }">
    All together
  </Reveal>
</template>
