<template>
  <div
    class="
      flex flex-col
      justify-center
      items-center
      outline-none
      h-full
      bg-slate-600
    "
  >
    <form
      class="
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
      "
    >
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
        <input
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
          name="text"
          type="number"
          min="1"
          placeholder="Ingrese el numero de procesos"
          v-model="Numero"
        />
        <ErrorMessage name="text" />
      </div>
      <div class="relative w-full">
        <select
          class="
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
          "
          v-model="Orden"
        >
          <option selected disabled>Ordenar Por:</option>
          <option>Nombre(A-Z)</option>
          <option>Nombre(Z-A)</option>
          <option>CPU(Mayor uso)</option>
          <option>CPU(Menor uso)</option>
          <option>PID(Mayor a menor)</option>
          <option>PID(Menor a mayor)</option>
        </select>
        <div
          class="
            pointer-events-none
            absolute
            inset-y-0
            right-0
            flex
            items-center
            px-2
            text-gray-700
          "
        >
          <svg
            class="fill-current h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
            />
          </svg>
        </div>
      </div>
      <button
        class="
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
        "
        type="button"
        v-on:click="getProcesos()"
      >
        Aceptar
      </button>
    </form>
  </div>
</template>

<script>
//import { Form, Field, ErrorMessage } from "vee-validate";
import axios from 'axios';
export default {
  methods: {
    onSubmit() {
      console.log("Funciona");
    },
    getProcesos() {
      if (this.Orden == "Nombre(A-Z)" && !this.Numero == "") {
        axios({
          method: "get",
          url: `http://localhost:3600/getProcesos?cantidad=${this.Numero}&atributo=ProcessName&categoria=ascendente`,
        })
          .then((response) => {
            console.log(response);
            this.enEspera = response.data.info;
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
