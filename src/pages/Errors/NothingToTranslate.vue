<template>  
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div class="text-h4 text-center q-pa-md">
        <q-icon name="warning" color="negative"></q-icon> Oops...
      </div>
      <div class="text-subtitle1 text-center q-pa-md">
        Seems like you have problem with project settings. Try to check project settings and try again.
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