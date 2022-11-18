
import { defineStore } from 'pinia';

export const useProcessStore = defineStore("procesos", {
 
    state: () => ({
        EnEjecucion: [],
        Terminados: [],
    }),
    actions: {
        pushExec(list){
            this.EnEjecucion = list;
        },
     
        pushTerminados(i){
            let proc = this.EnEjecucion.splice(i, 1);
            this.Terminados.push(proc);
            console.log("store: " + this.Terminados.length);
        },
    },
});