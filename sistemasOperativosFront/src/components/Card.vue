<template>
  <div class="w-auto rounded overflow-hidden ">
    <!--   <div class="px-6 py-4"> -->
    <div>
      <div class="font-bold text-xl mb-2 gap-x-10 flex">
        <label>{{ NombreDelProceso }}</label>
        <label>{{ Tiempo }}</label>
      </div>
      <!-- <p class="text-gray-700 text-base"> -->
      <p>
        {{ Descripcion }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    NombreDelProceso: String,
    Tiempo: Number,
    Descripcion: String,
  },
};
</script>
