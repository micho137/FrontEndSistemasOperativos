import { defineStore } from "pinia";

export const useProcessStore = defineStore("procesos", {
  state: () => ({
    EnEjecucion: [],
    Terminados: [],
    Ejecutado: "",
  }),
  actions: {
    pushExec(list) {
      this.EnEjecucion = list;
    },

    setEjecutado(i, word) {
      if (this.EnEjecucion[i].desc == undefined) {
        Object.assign(this.EnEjecucion[i], { desc: this.EnEjecucion[i].ProcessName[0] });
      }
      this.EnEjecucion[i].desc = word;

      this.Ejecutado = word;
    },

    pushTerminados(i) {
      let proc = this.EnEjecucion.splice(i, 1);
      this.Terminados.push(proc);
      console.log("store: " + this.Terminados.length);
    },
  },
});
