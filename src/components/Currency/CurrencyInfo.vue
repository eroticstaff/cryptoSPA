<template>
  <q-expansion-item dense dense-toggle class="currency_item">
    <template v-slot:header>
      <q-item-section> 1 {{ coin.short_name }} </q-item-section>
      <q-item-section v-if="current_currency.length === 0">
        <q-spinner-bars color="secondary" size="1em" />
        <q-tooltip :offset="[0, 8]">QSpinnerBars</q-tooltip>
      </q-item-section>
      <q-item-section v-if="current_currency.length === 0">
        <q-spinner-bars color="secondary" size="1em" />
        <q-tooltip :offset="[0, 8]">QSpinnerBars</q-tooltip>
      </q-item-section>
      <TransitionGroup name="list">
        <q-item-section v-for="(currency, id) in current_currency" :key="id">
          {{ currency[0] }} {{ currency[1] }}</q-item-section
        >
      </TransitionGroup>
    </template>
    <q-card>
      <q-card-section>
        <CurrencyChart :coin="coin" />
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script>
import CurrencyChart from "./CurrencyChart.vue";

import { ref } from "vue";
import getCoinChart from "@/helpers/api.service";

export default {
  name: "CurrencyInfo",
  props: ["coin"],
  components: { CurrencyChart },
  setup(props) {
    let current_currency = ref([]);
    setInterval(async () => {
      current_currency.value = [];
      let data = await getCoinChart(props.coin);
      Object.keys(data).forEach((key) => {
        current_currency.value.push([
          data[key] > 1 ? data[key].toFixed(2) : data[key].toPrecision(2),
          key.toUpperCase(),
        ]);
      });
    }, 3000);
    return { current_currency };
  },
};
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-enter-from,
.list-leave-to {
  background-color: rgba(16, 178, 100, 0.315);
  opacity: 0;
}
</style>
