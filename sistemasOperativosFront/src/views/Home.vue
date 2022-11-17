<template>
  <TableVue />
</template>

<script>
//import CardVue from '../components/Card.vue';
import TableVue from "../components/Table.vue";
import axios from "axios";

export default {
  components: {
    TableVue,
  },
  methods: {
    getProcesos() {
      axios({
        method: "get",
        url: "http://bit.ly/2mTM3nY",
      }).then((response) => {
          console.log(response);
          this.Procesos = response.data;
        })
        .catch((e) => console.log(e));
    },
  },
  mounted() {
    axios({
      method: "post",
      url: "http://localhost:3600/crearDocumento",
      data: {},
    });
    this.getProcesos;
  },
};
</script>


