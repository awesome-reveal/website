<script setup>
import { vReveal } from "@awesome-reveal/vue";

defineProps({ posts: { type: Array, required: true } });
</script>

<template>
  <ul class="posts">
    <li v-for="post in posts" :key="post.id" v-reveal>{{ post.title }}</li>
  </ul>
</template>
