<template>
  <!-- <Containers/> -->

  <!-- <CardVue :Descripcion="'Karlotos'" :NombreDelProceso="'Karlotos'" :Tiempo="1" />
    <CardVue :Descripcion="'Karlotos'" :NombreDelProceso="'Karlotos'" :Tiempo="1" />
    <CardVue :Descripcion="'Karlotos'" :NombreDelProceso="'Karlotos'" :Tiempo="1" /> -->
    <div class="h-screen relative">
      <div class="sticky h-full">
        <FormVue/>
      </div>
      <div class="sticky h-screen">
        <Containers class="h-1/2"/>
        <TableVue class="h-1/2" />
      </div>
    </div>
</template>

<script>
import CardVue from "../components/Card.vue";
import Containers from "../components/Containers.vue";
import TableVue from "../components/Table.vue";
import FormVue from "../components/Form.vue";
import axios from "axios";

export default {
  components: {
    TableVue,
    Containers,
    CardVue,
    FormVue
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
