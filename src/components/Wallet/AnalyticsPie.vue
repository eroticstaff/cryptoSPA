<template>
  <Pie
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
import { Pie } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export default {
  name: "AnalyticsPie",
  components: {
    Pie,
  },
  props: {
    BTC: {
      type: Number,
      default: 0,
    },
    ETH: {
      type: Number,
      default: 0,
    },
    chartId: {
      type: String,
      default: "pie-chart",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
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
      type: Array,
      default: () => [],
    },
  },
  computed: {
    chartData(props) {
      return {
        labels: ["BTC", "ETH"],
        datasets: [
          {
            backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
            data: [props.BTC, props.ETH],
          },
        ],
      };
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
      };
    },
  },
};
</script>
