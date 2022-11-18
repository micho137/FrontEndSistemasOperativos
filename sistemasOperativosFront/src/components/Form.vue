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
    <Form
      @submit="onSubmit()"
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
        <Field
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
          type="text"
          :rules="validateEmail"
          placeholder="Ingrese el numero de procesos"
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
        >
          <option>Ordenar Por:</option>
          <option>Nombre</option>
          <option>CPU</option>
          <option>PID</option>
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
      <div>
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
          v-on:click="onSubmit()"
        >
          Aceptar
        </button>
      </div>
    </Form>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  methods: {
    onSubmit(values) {
      console.log("Funciona");
    },
    validateNumber(value) {
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
    },
  },
  components: {
    Form,
    Field,
    ErrorMessage
  },
};
</script>
