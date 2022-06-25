<template>
  <router-view />
</template>

<script>
import { mapActions } from 'pinia';
import { defineComponent } from 'vue'
import { useStructureStore } from './stores/structure';

export default defineComponent({
  name: 'App',
  methods: {
    ...mapActions(useStructureStore, ['fetch']),
  },
  mounted() {
    this.fetch();
  }
})
</script>
