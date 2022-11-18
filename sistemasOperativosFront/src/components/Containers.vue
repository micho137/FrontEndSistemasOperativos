<template>
  <div class="bg-slate-600 flex justify-center items-center flex-col h-screen">
    <div class="flex w-full h-full justify-around items-center">
      <div class="flex flex-col justify-center items-center">
        <label class="uppercase text-white font-semibold m-2">En espera</label>
        <div
          class="
            w-80
            max-h-96
            bg-gray-800
            p-4
            rounded
            ring ring-gray-900
            flex flex-col
            justify-start
            items-start
            text-white
            overflow-y-scroll overflow-x-hidden
          "
        >
          <div class="" v-for="(proceso, index) in enEspera" :key="index">
            <CardVue
              :Descripcion="proceso.ProcessName[0]"
              :NombreDelProceso="proceso.ProcessName[0]"
              :Tiempo="proceso['CPU(s)'][0]"
            />
          </div>
        </div>
      </div>

      <div class="flex flex-col justify-center items-center">
        <label class="uppercase text-white font-semibold m-2"
          >En Ejecucion</label
        >
        <div
          class="
            w-80
            max-h-96
            bg-gray-800
            p-4
            rounded
            ring ring-gray-900
            flex flex-col
            justify-start
            items-start
            text-white
            overflow-y-scroll overflow-x-hidden
          "
        >
          <div class="" v-for="(proceso, index) in EnEjecucion" :key="index">
            <CardVue
              :Descripcion="proceso.desc"
              :NombreDelProceso="proceso.ProcessName[0]"
              :Tiempo="proceso['CPU(s)'][0]"
            />
          </div>
        </div>
        <!--  <p class="text-white">Ejecutado: {{Ejecutado}}</P> -->
      </div>
      <div class="flex flex-col justify-center items-center">
        <label class="uppercase text-white font-semibold m-2">terminado</label>
        <div
          class="
            w-80
            max-h-96
            bg-gray-800
            p-4
            rounded
            ring ring-gray-900
            flex flex-col
            justify-start
            items-start
            text-white
            overflow-y-scroll overflow-x-hidden
          "
        >
          <div class="" v-for="(proceso, index) in Terminados" :key="index">
            <CardVue
              :Descripcion="proceso[0].ProcessName[0]"
              :NombreDelProceso="proceso[0].ProcessName[0]"
              :Tiempo="proceso[0]['CPU(s)'][0]"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="pb-2">
      <button
        class="
          bg-gray-800
          text-gray-400
          uppercase
          font-bold
          text-sm
          px-4
          py-2
          rounded-md
          border-2 border-double border-white
        "
        v-on:click="Procesar()"
      >
        Iniciar
      </button>
    </div>
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
    const { EnEjecucion, Ejecutado } = storeToRefs(processStore);
    //Terminados = JSON.parse(JSON.stringify(Terminados));
    return { processStore, EnEjecucion, Terminados, Ejecutado };
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

    async function(qu, th) {
      RoundRobin(qu, th);
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
    refresh() {
      this.term = JSON.parse(JSON.stringify(this.processStore.Terminados));
      console.log(this.term);
    },

    async Procesar() {
      //this.EnEjecucion = this.enEspera;
      this.processStore.pushExec(this.enEspera);
      this.enEspera = [];
      await sleep(1000);
      await RoundRobin(4, 20);
      this.refresh();
    },

    async getProcesos() {
      await axios({
        method: "get",
        url: "http://localhost:3600/getProcesos?cantidad=10&atributo=CPU(s)&categoria=ascendente",
      })
        .then((response) => {
          console.log(response);
          this.enEspera = response.data.info;
        })
        .catch((e) => console.log(e));
    },
  },
  async mounted() {
    await axios({
      method: "post",
      url: "http://localhost:3600/crearDocumento",
      data: {},
    });
    this.getProcesos();
  },
};
</script>
