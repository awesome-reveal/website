<script setup>
import { ref } from "vue";
import { Reveal } from "@awesome-reveal/vue";

const open = ref(false);
</script>

<template>
  <button :aria-expanded="open" @click="open = !open">Details</button>
  <Reveal :when="open" :hidden="!open" :from="{ opacity: 0 }">
    The details.
  </Reveal>
</template>
