<script setup>
import { Reveal, vReveal } from "@awesome-reveal/vue";

const log = (element) => console.log("Revealed", element);
</script>

<template>
  <Reveal @reveal="log"><h2>Pricing</h2></Reveal>
  <p v-reveal="{ onReveal: log }">No wrapper element</p>
</template>
