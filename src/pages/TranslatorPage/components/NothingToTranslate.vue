<template>
    <q-card color="negative" class="q-pa-md" flat>
      <q-card-section>
        <div class="text-h4 text-center">
          <q-icon name="warning" color="negative"></q-icon> Oops...
        </div>
      </q-card-section>
      <q-card-section>
        <div class="text-subtitle1 text-center">
          Seems like you have problem with project settings, please check them and try again.
        </div>
      </q-card-section>
      <q-card-section>
        <div class="text-center">
          <q-btn
            unelevated
            rounded
            color="primary"
            label="Back To Projects"
            to="/"
          />
        </div>
      </q-card-section>
    </q-card>
</template>