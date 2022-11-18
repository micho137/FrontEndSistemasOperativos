<template>
  <div>
    <div class="flex w-full bg-slate-600 h-72 justify-around items-center">
      <div
        class="w-20 h-fit bg-red-600 flex flex-col justify-center items-center text-white"
      >
        <p>En espera</p>
        <div class="bg-indigo-800" v-for="(proceso, index) in enEspera" :key="index">
          <CardVue
            :Descripcion="proceso.ProcessName[0]"
            :NombreDelProceso="proceso.ProcessName[0]"
            :Tiempo="proceso['CPU(s)'][0]"
          />
        </div>
      </div>
      <div
        class="w-20 h-20 bg-red-600 flex flex-col justify-center items-center text-white"
      >
        <p>En Ejecucion</p>
        <div class="bg-indigo-800" v-for="(proceso, index) in EnEjecucion" :key="index">
          <CardVue
            :Descripcion="proceso.ProcessName[0]"
            :NombreDelProceso="proceso.ProcessName[0]"
            :Tiempo="proceso['CPU(s)'][0]"
          />
        </div>
      </div>
      <div
        class="w-auto h-52 bg-red-600 flex flex-col justify-center items-center text-white overflow-y-auto"
      >
        <p>Terminado</p>
        <div class="bg-indigo-800" v-for="(proceso, index) in Terminados" :key="index">
        
            
          <CardVue
            :Descripcion="proceso[0].ProcessName[0]"
            :NombreDelProceso="proceso[0].ProcessName[0]"
            :Tiempo="proceso[0]['CPU(s)'][0]"
          />
        </div>
      </div>
    </div>

    <button v-on:click="Procesar()">Pa ve</button>
  </div>
</template>

<script>
import { sleep } from "../scripts/sleepFunction.js";
import { RoundRobin } from "../scripts/roundRobin.js";
import CardVue from "../components/Card.vue";
import axios from "axios";
import { storeToRefs } from "pinia";
import { useProcessStore } from "../stores/process.store";


export default {
  setup() {
    const processStore = useProcessStore();
    let { Terminados } = storeToRefs(processStore);
    const {EnEjecucion} = storeToRefs(processStore);
    //Terminados = JSON.parse(JSON.stringify(Terminados));
    return { processStore, EnEjecucion, Terminados };
  },
  components: {
    CardVue,
  },
  data: () => {
    return {
      enEspera: [],
      term: null,
      //      EnEjecucion: [],
      //    Terminados: [],
    };
  },
  methods: {
    async function(milis) {
      sleep(milis);
    },

    async function(qu, procesos, th) {
      RoundRobin(qu, procesos, th);
    },

    /*  async increment() {
      for (let index = 0; index < 16; index++) {
        if (index % 2 == 0) {
          this.EnEjecucion = this.enEspera;
          this.enEspera = [];

        } else {
          this.enEspera = this.EnEjecucion;
          this.EnEjecucion = [];
        }
        console.log(index);
        //this.$forceUpdate();
        await sleep(1000);
      }
    }, */
    refresh(){
        this.term = JSON.parse(JSON.stringify(this.processStore.Terminados));
        console.log(this.term);
    },

    async Procesar() {
      //this.EnEjecucion = this.enEspera;
      this.processStore.pushExec(this.enEspera);
      this.enEspera = [];
      await sleep(1000);
      await RoundRobin(2, 10);
      this.refresh();
    },

    async getProcesos() {
      await axios({
        method: "get",
        url:
          "http://localhost:3600/getProcesos?cantidad=15&atributo=CPU(s)&categoria=descendente",
      })
        .then((response) => {
          console.log(response);
          this.enEspera = response.data.info;
        })
        .catch((e) => console.log(e));
    },
  },
  mounted() {
    this.getProcesos();
  },
};
</script>
