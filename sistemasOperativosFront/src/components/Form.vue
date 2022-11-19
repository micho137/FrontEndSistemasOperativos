<template>
  <div class="
      flex flex-col
      justify-center
      items-center
      outline-none
      h-full
      bg-slate-600
    ">
    <form class="
        w-full
        max-w-sm
        shadow-lg
        p-5
        outline-none
        bg-white
        shadow-white
        rounded-lg
        flex flex-col
        gap-y-5
        justify-center
        items-center
      ">
      <div class="flex items-center border-b border-slate-800 py-2 w-full">
        <!-- <input
          class="
            appearance-none
            bg-transparent
            border-none
            font-bold
            text-center
            w-full
            uppercase
            text-gray-700
            mr-3
            py-1
            px-2
            leading-tight
            focus:outline-none
          "
          type="text"
          placeholder="Ingrese el numero de procesos"
        /> -->
        <input class="
            appearance-none
            bg-transparent
            border-none
            font-bold
            text-center
            w-full
            uppercase
            text-gray-700
            mr-3
            py-1
            px-2
            leading-tight
            focus:outline-none
          " name="text" type="number" min="1" placeholder="Ingrese el numero de procesos" v-model="Numero" />
        <ErrorMessage name="text" />
      </div>
      <div class="relative w-full">
        <select class="
            block
            appearance-none
            text-center
            w-full
            text-white
            font-bold
            bg-gray-600
            ring ring-gray-900
            hover:border-gray-500
            px-4
            py-2
            pr-8
            rounded
            shadow
            uppercase
            leading-tight
            focus:outline-none focus:shadow-outline
          " v-model="Orden">
          <option selected disabled>Ordenar Por:</option>
          <option>CPU(Mayor uso)</option>
          <option>CPU(Menor uso)</option>
          <option>PID(Mayor a menor)</option>
          <option>PID(Menor a mayor)</option>
        </select>
        <div class="
            pointer-events-none
            absolute
            inset-y-0
            right-0
            flex
            items-center
            px-2
            text-gray-700
          ">
          <svg class="fill-current h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      <button class="
          flex-shrink-0
          bg-slate-800
          hover:bg-gray-700
          border-slate-800
          hover:border-gray-700
          text-sm
          border-4
          text-white
          py-1
          px-2
          rounded
          uppercase
          font-bold
        " type="button" v-on:click="onSubmit( )">
        Aceptar
      </button>
    </form>
  </div>
</template>

<script>
//import { Form, Field, ErrorMessage } from "vee-validate";
import axios from 'axios';
import { storeToRefs } from "pinia";
import { useProcessStore } from "../stores/process.store";

export default {
  setup() {
    let opciones = {
      "CPU(Mayor uso)": ["CPU(s)", "descendente"],
      "CPU(Menor uso)": ["CPU(s)", "ascendente"],
      "PID(Mayor a menor)": ["Id", "descendente"],
      "PID(Menor a mayor)": ["Id", "ascendente"]
    };
    const processStore = useProcessStore();
    let { Terminados, EnEspera } = storeToRefs(processStore);
    const { EnEjecucion } = storeToRefs(processStore);
    return { opciones, processStore, EnEjecucion, Terminados, EnEspera };
  },
  data: () => {
    return {
      Orden: "CPU(Mayor uso)",
      Numero: 0,

    };
  },
  methods: {


    onSubmit() {
      console.log("Funciona");
      console.log(this.Numero);
      console.log(this.Orden);
      console.log(this.opciones[`${this.Orden}`][0]);
      console.log(this.opciones[`${this.Orden}`][1]);
      this.getProcesos();
    },
    async getProcesos() {
      /* if (this.Orden == "Nombre(A-Z)" && !this.Numero == "") { */
      if (!this.Numero == "") {
        await axios({
          method: "post",
          url: "http://localhost:3600/crearDocumento",
          data: {},
        });

        await axios({
          method: "get",
          url: `http://localhost:3600/getProcesos?cantidad=${this.Numero}&atributo=${this.opciones[`${this.Orden}`][0]}&categoria=${this.opciones[`${this.Orden}`][1]}`,
        })
          .then((response) => {

            this.processStore.pushEnEspera(response.data.info);
            this.processStore.pushProcesos(response.data.info);

            console.log(JSON.parse(JSON.stringify(this.EnEspera)));
            console.log("Completed");
          })
          .catch((e) => console.log(e));
      }
    },
    /* validateNumber(value) {
      // if the field is empty
      if (!value) {
        return "Es necesario digitar un numero entero";
      }
      // if the field is not a valid email
      const regex = /^\d+$/i;
      if (!regex.test(value)) {
        return "Este campo solo permite numeros enteros";
      }
      // All is good
      return true;
    }, */
  },
  /* components: {
    Form,
    Field,
    ErrorMessage
  }, */
};
</script>
