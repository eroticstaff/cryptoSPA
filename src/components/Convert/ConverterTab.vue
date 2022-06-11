<template>
  <div style="margin-left: 30px">
    <div class="row">
      <span class="tab_title">Currency convert</span>
      <lottie
        :options="convert_anim"
        :height="30"
        :width="30"
        style="margin-top: 17px; margin-left: 10px; margin-right: 0"
        loop
        autoplay
      />
    </div>
    <div class="row justify-between converter-container">
      <div class="row">
        <q-input
          v-model="convert_text"
          @update:model-value="
            async (val) => {
              convert_value();
            }
          "
          dense
          color="secondary"
          label="Amount"
        />
        <q-select
          borderless
          v-model="convert_from"
          :options="currency_list"
          style="width: 40px"
          @update:model-value="
            async (val) => {
              convert_value();
            }
          "
        >
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section avatar>
                <q-icon
                  v-if="scope.opt.icon != 'fabEthereum'"
                  :name="scope.opt.icon"
                ></q-icon>
                <q-icon
                  v-if="scope.opt.icon == 'fabEthereum'"
                  :name="fabEthereum"
                ></q-icon>
              </q-item-section>
            </q-item>
          </template>

          <template v-slot:selected-item="scope">
            <q-chip
              dense
              :tabindex="scope.tabindex"
              color="white"
              text-color="secondary"
              class="q-ma-none"
            >
              <q-icon
                v-if="scope.opt.icon != 'fabEthereum'"
                :name="scope.opt.icon"
                size="20px"
              ></q-icon>
              <q-icon
                v-if="scope.opt.icon == 'fabEthereum'"
                :name="fabEthereum"
                size="20px"
              ></q-icon>
            </q-chip>
          </template>
        </q-select>
      </div>
      <div>
        <q-icon
          name="east"
          size="30px"
          color="secondary"
          style="margin-top: 15px"
        />
      </div>
      <div class="row">
        <q-input
          v-model="convert_res"
          dense
          filled
          disable
          style="margin-top: 8px"
          color="secondary"
        />
        <q-select
          borderless
          v-model="convert_to"
          :options="currency_list"
          style="width: 40px"
          @update:model-value="
            async (val) => {
              convert_value();
            }
          "
        >
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section avatar>
                <q-icon
                  v-if="scope.opt.icon != 'fabEthereum'"
                  :name="scope.opt.icon"
                ></q-icon>
                <q-icon
                  v-if="scope.opt.icon == 'fabEthereum'"
                  :name="fabEthereum"
                ></q-icon>
              </q-item-section>
            </q-item>
          </template>

          <template v-slot:selected-item="scope">
            <q-chip
              dense
              :tabindex="scope.tabindex"
              color="white"
              text-color="secondary"
              class="q-ma-none"
            >
              <q-icon
                v-if="scope.opt.icon != 'fabEthereum'"
                :name="scope.opt.icon"
                size="20px"
              ></q-icon>
              <q-icon
                v-if="scope.opt.icon == 'fabEthereum'"
                :name="fabEthereum"
                size="20px"
              ></q-icon>
            </q-chip>
          </template>
        </q-select>
      </div>
    </div>
  </div>
</template>

<script>
import { CurrencyList } from "@/data/currency_list";
import { ref } from "vue";
import { fabEthereum } from "@quasar/extras/fontawesome-v6";
import getCoinChart from "@/helpers/api.service";
import Lottie from "vue-lottie";
import * as convertAnimData from "../../../public/icon2.json";

export default {
  name: "ConverterTab",
  components: { lottie: Lottie },
  created() {
    this.fabEthereum = fabEthereum;
  },
  setup() {
    return {
      convert_from: ref(null),
      convert_to: ref(null),
      convert_text: ref(""),
      convert_res: ref(""),
      currency_list: CurrencyList,
      convert_anim: {
        animationData: convertAnimData,
        animationSpeed: 1,
      },
    };
  },
  methods: {
    async convert_value() {
      if (this.convert_text.length === 0) this.convert_res = "";
      if (this.convert_to && this.convert_from) {
        let cur_to = this.convert_to.short_name.toLowerCase();
        let cur_from = this.convert_from.short_name.toLowerCase();
        let data = await getCoinChart(this.convert_from);
        let result = this.convert_text;
        if (cur_to == cur_from) this.convert_res = result;
        else {
          result = parseFloat(this.convert_text) * data[cur_to];
          if (isNaN(result)) this.convert_res = "";
          else this.convert_res = result;
        }
      }
    },
  },
};
</script>
