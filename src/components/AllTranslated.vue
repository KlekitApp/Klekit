<template>
    <q-card class="q-pa-md" flat>
      <q-card-section>
        <div class="text-h2 text-center">
            Hooray!!!
        </div>
      </q-card-section>
      <q-card-section>
        <div class="text-h4 text-center">
            This file has full translation!!!
        </div>
      </q-card-section>
      <q-card-section>
        <div class="text-grey text-caption text-center">
          If you want to change some key in this file - just click on "key" icon in top right corner and choose key you want to change.
        </div>
      </q-card-section>
    </q-card>
</template>

<script>
export default {
  mounted() {
    this.$confetti.start({  
        particles: [
      {
        type: 'rect',
      },
      {
        type: 'circle',
      },
    ],
    particlesPerFrame: 0.25,
    defaultDropRate: 4,
    defaultSize: 10,
    windSpeedMax: 0
  });
  },
  unmounted() {
    this.$confetti.stop();
  },
}
</script>