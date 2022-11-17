<template>
  <!-- <TableVue /> -->
  <Containers/>
  
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
  },
  methods: {},
  mounted() {
    axios({
      method: "post",
      url: "http://localhost:3600/crearDocumento",
      data: {},
    });
  },
};
</script>
