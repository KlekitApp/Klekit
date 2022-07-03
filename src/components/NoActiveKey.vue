<template>
    <q-card class="q-pa-md" flat>
      <q-card-section>
        <div class="text-subtitle1 text-center">
            You need to choose key. Or you can go to first untranslated key by clicking on button below
        </div>
        <q-btn class="absolute-center" unelevated rounded color="primary" @click="goToFirstUntranslatedFile">Go To First Untranslated Key</q-btn>
      </q-card-section>
    </q-card>
</template>

<script>
import { mapActions } from 'pinia'
import { useTranslatorStore } from 'src/stores/translator'
export default {
    methods: {
        ...mapActions(useTranslatorStore, ['goToFirstUntranslatedKey']),
    }
}
</script>