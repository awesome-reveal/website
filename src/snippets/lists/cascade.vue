<script setup>
import { Cascade } from "@awesome-reveal/vue";

defineProps(["cards"]);
</script>

<template>
  <Cascade as="ul" class="cards" :interval="80">
    <li v-for="card in cards" :key="card.id">{{ card.title }}</li>
  </Cascade>
</template>
