<template>
  <div class="overflow-x-auto relative shadow-md">
    <table
      class="
        w-full
        text-sm text-left text-gray-500
        dark:text-gray-400
        border-spacing-2 border-separate
      "
    >
      <thead class="text-md text-gray-700 uppercase dark:text-gray-400 text-center">
        <tr>
          <th class="py-3 px-6 bg-gray-50 dark:bg-gray-800">PID</th>
          <th class="py-3 px-6 dark:bg-gray-800">Nombre</th>
          <th class="py-3 px-6 bg-gray-50 dark:bg-gray-800">Descripcion</th>
          <th class="py-3 px-6 dark:bg-gray-800">CPU</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="proceso in 5" :key="proceso.id" class="text-black font-semibold text-center uppercase">
          <td class="py-4">{}</td>
          <td class="py-4">{}</td>
          <td class="py-4">{}</td>
          <td class="py-4">{}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default{
  data: () => {
    return {
      //procesos: null,
    }
  }}
</script>
