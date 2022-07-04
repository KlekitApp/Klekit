<template>
    <q-card class="q-pa-md" flat>
      <q-card-section>
        <div class="text-h4 text-center">
            Welcome to KLEKIT!
        </div>
      </q-card-section>
      <q-card-section>
        <div class="text-subtitle1 text-center">
            You need to choose file first. Or you can go to first untranslated file by clicking on button below
        </div>
      </q-card-section>
      <q-card-section>
        <q-btn class="absolute-center" unelevated rounded color="primary" @click="goToFirstUntranslatedFile">Go To First Untranslated File</q-btn>
      </q-card-section>
    </q-card>
</template>

<script>
import { mapActions } from 'pinia'
import { useStructureStore } from 'src/stores/structure'
export default {
    methods: {
        ...mapActions(useStructureStore, ['goToFirstUntranslatedFile']),
    }
}
</script>