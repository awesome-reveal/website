<script setup>
import { Cascade } from "@awesome-reveal/vue";

defineProps({ text: { type: String, required: true } });
</script>

<template>
  <Cascade as="h2" :aria-label="text" :from="{ opacity: 0 }" :interval="40">
    <span
      v-for="(letter, index) in Array.from(text)"
      :key="index"
      aria-hidden="true"
      v-text="letter"
    />
  </Cascade>
</template>
