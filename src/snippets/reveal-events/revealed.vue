<script setup>
import { Reveal } from "@awesome-reveal/vue";
</script>

<template>
  <Reveal v-slot="{ revealed }">
    {{ revealed ? "Hello" : "Waiting" }}
  </Reveal>
</template>
