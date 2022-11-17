<template>
  <TableVue />
</template>

<script>
import CardVue from '../components/Card.vue';
import TableVue from "../components/Table.vue";
import axios from "axios";

export default {
  components: {
    TableVue,
  },
  methods: {
    
  },
  mounted() {
    axios({
      method: "post",
      url: "http://localhost:3600/crearDocumento",
      data: {},
    });
  },
};
</script>


