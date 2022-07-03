<template>
    <q-card class="q-pa-md" flat>
      <q-card-section>
        <div class="text-h2">
            Welcome
        </div>

        <div class="text-h4">
            You need to choose file first. Or you can go to first untranslated file by clicking on button below
        </div>
        <q-btn @click="goToFirstUntranslatedFile">Go To First Untranslated File</q-btn>
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