<template>
  <div class="row" style="margin-left: 30px">
    <span class="tab_title">Stocks</span>
    <lottie
      :options="stocks_anim"
      :height="30"
      :width="30"
      style="margin-top: 17px; margin-left: 10px; margin-right: 0"
      loop
      autoplay
    />
  </div>
  <div class="q-pa-md" sc>
    <q-list class="rounded-borders currency_list">
      <q-scroll-area style="height: 800px">
        <CurrencyInfo v-for="(coin, i) in coins" :key="i" :coin="coin" />
        <div style="height: 200px"></div>
      </q-scroll-area>
    </q-list>
  </div>
</template>

<script>
import CurrencyInfo from "./CurrencyInfo.vue";
import Lottie from "vue-lottie";
import { Coins } from "@/data/currency_list";
import * as stocksAnimData from "../../../public/icon1.json";

export default {
  name: "CurrencyTab",
  components: { CurrencyInfo, lottie: Lottie },
  setup() {
    return {
      coins: Coins,
      stocks_anim: {
        animationData: stocksAnimData,
        animationSpeed: 1,
      },
    };
  },
};
</script>
