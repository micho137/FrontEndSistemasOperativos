<template>
  <div class="overflow-x-auto relative shadow-md">
    <table
      class="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-spacing-2 border-separate"
    >
      <thead
        class="text-md text-gray-700 uppercase dark:text-gray-400 text-center"
      >
        <tr>
          <th class="py-3 px-6 bg-gray-50 dark:bg-gray-800">PID</th>
          <th class="py-3 px-6 dark:bg-gray-800">Nombre</th>
          <th class="py-3 px-6 bg-gray-50 dark:bg-gray-800">Descripcion</th>
          <th class="py-3 px-6 dark:bg-gray-800">CPU</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="proceso in Procesos"
          :key="proceso.id"
          class="text-black font-semibold text-center uppercase"
        >
          <td class="py-4">{{ proceso.Id[0] }}</td>
          <td class="py-4">{{ proceso.ProcessName[0] }}</td>
          <td class="py-4">{{ proceso.ProcessName[0] }}</td>
          <td class="py-4">{{ proceso["CPU(s)"][0] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import { storeToRefs } from "pinia";
import { useProcessStore } from "../stores/process.store";

export default {
  setup(){
    const processStore = useProcessStore();
    //let { Terminados } = storeToRefs(processStore);
    let   {Procesos}  = storeToRefs(processStore);
    //let  {getProcesos}  = processStore.getProcesos;
    //Procesos = JSON.parse(JSON.stringify(Procesos));
    console.log(Procesos);
    return { Procesos};
  },
  data: () => {
    return {
      process: [],
    };
  },
  methods: {
    async getProcesos() {
      await axios({
        method: "get",
        url: "http://localhost:3600/getProcesos?cantidad=20&atributo=CPU(s)&categoria=descendente",
      })
        .then((response) => {
          console.log(response);
          this.procesos = response.data.info;
        })
        .catch((e) => console.log(e));
    },
  },
  async mounted() {
  /*   await axios({
      method: "post",
      url: "http://localhost:3600/crearDocumento",
      data: {},
    }); 
    this.getProcesos(); */
  },
};
</script>
