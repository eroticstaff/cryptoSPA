<template>
  <Line
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
import { Line } from "vue-chartjs";
import { onMounted, ref } from "vue";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
);

export default {
  name: "CurrencyChart",
  components: { Line },
  props: {
    coin: {
      type: Object,
      default: () => {},
    },
    chartId: {
      type: String,
      default: "line-chart",
    },
    width: {
      type: Number,
      default: 100,
    },
    height: {
      type: Number,
      default: 10,
    },
    cssClasses: {
      default: "",
      type: String,
    },

    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  setup(props) {
    let chartData = ref({
      labels: [],
      datasets: [
        {
          label: `${props.coin.name} 14 days currency`,
          backgroundColor: "#f87979",
          data: [],
        },
      ],
    });
    onMounted(async () => {
      const url = `https://api.coingecko.com/api/v3/coins/${props.coin.api_id}/market_chart?vs_currency=usd&days=14&interval=daily`;
      let data = await fetch(url);
      data = await data.json();
      console.log(data);
      let chart = [];
      data["prices"].forEach((data, i) => {
        var today = new Date();
        today.setDate(today.getDate() - 14 + i);
        var date =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate();
        chartData.value.labels.push(date);
        chart.push(data[1]);
      });
      chartData.value.datasets[0].data = chart;
      console.log(chartData);
    });
    return { chartData };
  },
};
</script>
