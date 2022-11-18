import { sleep } from "../scripts/sleepFunction.js";
import { storeToRefs } from "pinia";
import { useProcessStore } from "../stores/process.store";

const getTam = (list) => {
  return list.length;
};

const init = () => {
  const processStore = useProcessStore();
  //let {EnEjecucion}  = storeToRefs(processStore);
  let EnEjecucion = processStore.EnEjecucion;
  EnEjecucion = JSON.parse(JSON.stringify(EnEjecucion));

  return {
    processStore,
    EnEjecucion,
  };
};

async function RoundRobin2(qu, th) {
  //qu = 5;
  let ite = 1;
  const store = init();
  while (true) {
    console.log("**** Iteración **** #: " + ite);

    for (let i = 0; i < getTam(store.EnEjecucion); i++) {
      const proc = store.EnEjecucion[i];
      //console.log(`inicio ${proc.nombre}, ${proc.t}`);

      //console.log(getTam());

      for (let j = 0; j < qu; j++) {
        //console.log(Object.keys(proc)[0]);
        //proc.text += getChar( proc.text.length, proc.nombre);
        //proc.text +=  proc.text.length>=proc.nombre.length ? '' : proc.nombre[proc.text.length] ;
        if (proc.desc == undefined) {
          Object.assign(proc, { desc: "" });
        }
        proc.desc +=
          proc.desc.length >= proc.ProcessName[0].length
            ? ""
            : proc.ProcessName[0][proc.desc.length];

        store.processStore.setEjecutado(i, proc.desc);

        //        await writeOnFile(`./${proc.nombre}.txt`, proc.text);

        /* if (proc.t == 0) break;
  
          proc.t = proc.t - 1;
  
          console.log(proc.t); */

        await sleep(th * proc.ProcessName[0].length);
        //await sleep(100);
      }

      console.log(proc.ProcessName[0].length - proc.desc.length);

      //if (proc.t == 0) {

      if (proc.desc.length >= proc.ProcessName[0].length) {
        store.processStore.pushTerminados(i);
        store.EnEjecucion.splice(i, 1);
        console.log(store.processStore.Terminados);
      }
    }

    if (getTam(store.EnEjecucion) == 0) break;

    //if(ite===20) break;

    /* if (sumaDeRestantes() == 0) {
        break;
      } */
    ite++;
  }
}

async function RoundRobin(qu, th) {
  //qu = 5;
  let ite = 1;
  const store = init();
  let i = 0;
  while (true) {
    console.log("**** Iteración **** #: " + ite);

    while (i < getTam(store.EnEjecucion)) {
      const proc = store.EnEjecucion[i];
      //console.log(`inicio ${proc.nombre}, ${proc.t}`);

      //console.log(getTam());

      for (let j = 0; j < qu; j++) {
        //console.log(Object.keys(proc)[0]);
        //proc.text += getChar( proc.text.length, proc.nombre);
        //proc.text +=  proc.text.length>=proc.nombre.length ? '' : proc.nombre[proc.text.length] ;
        if (proc.desc == undefined) {
          Object.assign(proc, { desc: "" });
        }
        proc.desc +=
          proc.desc.length >= proc.ProcessName[0].length
            ? ""
            : proc.ProcessName[0][proc.desc.length];

        store.processStore.setEjecutado(i, proc.desc);

        //        await writeOnFile(`./${proc.nombre}.txt`, proc.text);

        /* if (proc.t == 0) break;
  
          proc.t = proc.t - 1;
  
          console.log(proc.t); */

        await sleep(th * proc.ProcessName[0].length);
        //await sleep(100);
      }

      console.log(proc.ProcessName[0].length - proc.desc.length);

      //if (proc.t == 0) {

      if (proc.desc.length >= proc.ProcessName[0].length) {
        store.processStore.pushTerminados(i);
        store.EnEjecucion.splice(i, 1);
        console.log(store.processStore.Terminados);
      }else{
        i++
      }
    }

    if (getTam(store.EnEjecucion) == 0) break;
    
    i=0;
    if(ite===20) break;

    /* if (sumaDeRestantes() == 0) {
        break;
      } */
    ite++;
  }
}


export { RoundRobin };
