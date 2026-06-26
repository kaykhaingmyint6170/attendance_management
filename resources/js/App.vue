<template>
    <router-view />
</template>

<script setup>
import { useTheme } from './composables/useTheme';
// Initialize theme on app mount — ensures .dark class is synced
useTheme();
</script>
