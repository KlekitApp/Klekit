<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>

      <div class="text-h2" style="opacity:.4">
        <q-icon name="warning" color="negative"></q-icon> Oops. Something went wrong. Try to select Project again.
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/projects"
        label="Go to Project list"
        no-caps
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ErrorNotFound'
})
</script>
