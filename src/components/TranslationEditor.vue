<template>
    <q-card class="q-pa-md" flat>
        <div class="row">
            <div class="col">
                .col
            </div>
            <div class="col">
                .col
            </div>
            </div>

            <div class="row">
            <div class="col">
                .col
            </div>
            <div class="col">
                .col
            </div>
            <div class="col">
                .col
            </div>
        </div>
    </q-card>
</template>

<script>
import { mapState } from 'pinia';
import { useSettingsStore } from 'src/stores/settings';
import { useStructureStore } from 'src/stores/structure';
import { useTranslatorStore } from 'src/stores/translator';
export default {
    data: () => {
        return {
        }
    },
    computed: {
        ...mapState(useTranslatorStore, ['activeKey']),
        ...mapState(useSettingsStore, ['language']),
        ...mapState(useStructureStore, ['activeFileData', 'activeFileDataKeys', 'activeFile'])
    },
    methods: {
        toggleDrawer () {
            this.drawerOpen = !this.drawerOpen;
        },
    },
}
</script>