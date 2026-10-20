<script setup>
import { Reveal } from "@awesome-reveal/vue";
</script>

<template>
  <Reveal v-slot="{ revealed }" as="article">
    {{ revealed ? "Hello" : "Waiting" }}
  </Reveal>
</template>
