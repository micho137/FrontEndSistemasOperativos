<template>
  <!-- <Containers/> -->

  <!-- <CardVue :Descripcion="'Karlotos'" :NombreDelProceso="'Karlotos'" :Tiempo="1" />
    <CardVue :Descripcion="'Karlotos'" :NombreDelProceso="'Karlotos'" :Tiempo="1" />
    <CardVue :Descripcion="'Karlotos'" :NombreDelProceso="'Karlotos'" :Tiempo="1" /> -->
  <div class="h-screen">
    <Containers class="h-1/2"/>
    <TableVue class="h-1/2" />
  </div>
</template>

<script>
import CardVue from "../components/Card.vue";
import Containers from "../components/Containers.vue";
import TableVue from "../components/Table.vue";
import axios from "axios";

export default {
  components: {
    TableVue,
    Containers,
    CardVue,
  },
  methods: {},
  async mounted()  {
   /*   await axios({
      method: "post",
      url: "http://localhost:3600/crearDocumento",
      data: {},
    });  */
  },
};
</script>
