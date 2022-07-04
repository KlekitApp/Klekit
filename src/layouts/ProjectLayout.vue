<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
    <settings-dialog />
  </q-layout>
</template>

<script>
import SettingsDialog from 'src/components/SettingsDialog.vue'

export default {
  components: { SettingsDialog },
  name: 'ProjectLayout',
}
</script>
