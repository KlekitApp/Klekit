<template>
    <q-select
        dense
        use-input
        dark
        standout
        fill-input
        class="q-mr-sm"
        :model-value="''"
        :options="options"
        @filter="filterFn">
        <template v-slot:prepend>
            <q-icon name="search" />
        </template>
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section>
              <q-item-label>{{ scope.opt }}</q-item-label>
              <q-item-label v-for="language in sourceLanguages" :key="language" caption>{{ dataByKeys[scope.opt].language[language] }}</q-item-label>
              <q-item-label caption>{{ dataByKeys[scope.opt].language[language] }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator dark />
        </template>
    </q-select>
</template>
<script>
import { mapState } from 'pinia';
import { useStructureStore } from 'src/stores/structure';
import { useProjectsStore } from 'src/stores/projects';
export default {
    data() {
        return {
            select: null,
            options: []
        }
    },
    computed: {
        ...mapState(useStructureStore, ['dataByKeys']),
        ...mapState(useProjectsStore, ['sourceLanguages', 'language']),
    
    },
    methods: {
        filterFn(val, update, abort) {
            update(() => {
                let stringOptions = Object.keys(this.dataByKeys);
                if (val === '' || val.length < 2) {
                    this.options = [];
                }
                else {
                    const needle = val.toLowerCase()
                    this.options = stringOptions.filter(v => v.toLowerCase().startsWith(needle))
                }
            })
        }
    },
}
</script>