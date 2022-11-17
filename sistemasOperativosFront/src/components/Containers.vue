<template>
  <div>
    <div class="flex w-full bg-slate-600 h-28 justify-around items-center">
      <div class="w-20 h-20 bg-red-600 flex justify-center items-center text-white">
        {{list1[0]}}
      </div>
      <div class="w-20 h-20 bg-red-600 flex justify-center items-center text-white">
        {{list2[0]}}
      </div>
      <div class="w-20 h-20 bg-red-600 flex justify-center items-center text-white">
        {{list3[0]}}
      </div>
    </div>

    <button v-on:click="increment()">Pa ve</button>
  </div>
</template>

<script>
import { sleep } from "../scripts/sleepFunction.js";

export default {
  data: () => {
    return {
      list1: ['aa'],
      list2: [],
      list3: [],
    };
  },
  methods: {
    methods1: async function (milis) {
      sleep(milis);
    },

    async increment() {
      for (let index = 0; index < 16; index++) {
        if(index%2 == 0){
            this.list2[0] = "aa";
            this.list1 = [];
        }else{
            this.list1[0] = "aa";
            this.list2 = [];
        }
        await sleep(1000);
      }
    } /* async increment(){
        await sleep(100);
        this.count++;
    } */,
  },
};
</script>
