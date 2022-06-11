<template>
  <div style="margin-left: 20px; margin-top: 15px">
    <q-scroll-area style="height: 800px">
      <div class="row">
        <span class="tab_title">Wallet</span>
        <lottie
          :options="wallet_anim"
          :height="60"
          :width="60"
          style="padding-bottom: 6px; margin-left: 2px; margin-right: 0"
          loop
          autoplay
        />
      </div>

      <CurrencyCard
        v-for="coin in coins"
        :key="coin.short_name"
        :wallet="coin.short_name == 'ETH' ? wallet_eth : wallet_btc"
        :coin="coin"
      />

      <div class="currency_card">
        <q-card flat class="currency_card__content">
          <q-card-section>
            <div class="row justify-between">
              <div class="row">
                <div class="text-h6" style="margin-top: 8px; margin-left: 8px">
                  TOTAL
                </div>
              </div>
              <div class="text-h6" style="margin-top: 8px; margin-left: 8px">
                {{ wallet_total }}
                <q-icon
                  name="attach_money"
                  size="22px"
                  style="margin-bottom: 5px"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="row justify-between" style="margin-top: 20px">
        <q-btn
          label="DEPOSIT"
          color="secondary"
          @click="put = true"
          style="width: 45%"
        >
          <q-icon name="arrow_upward" size="20px" style="margin-bottom: 2px" />
        </q-btn>
        <q-btn
          label="WITHDRAW"
          color="secondary"
          @click="withdraw = true"
          style="width: 45%"
        >
          <q-icon name="arrow_downward" size="20px" style="margin-bottom: 2px"
        /></q-btn>
      </div>
      <div style="margin-top: 30px">
        <div class="row">
          <span class="tab_title">Analytics</span>
          <lottie
            :options="analytics_anim"
            :height="50"
            :width="50"
            style="margin-top: 5px; margin-left: 10px; margin-right: 0"
            loop
            autoplay
          />
        </div>
        <AnalyticsPie :BTC="wallet_btc_usd" :ETH="wallet_eth_usd" ref="pie" />
        <div style="height: 200px"></div>
      </div>

      <!-- DIALOGS -->
      <q-dialog v-model="put" persistent>
        <q-card style="width: 300px">
          <q-card-section class="row justify-center">
            <q-input v-model="deposit" dense color="secondary" label="Amount" />
            <q-select
              borderless
              v-model="deposit_select"
              :options="coins"
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
          </q-card-section>

          <q-card-actions align="center">
            <q-btn
              flat
              label="CANCEL"
              color="secondary"
              @click="deposit = ''"
              v-close-popup
            ></q-btn>
            <q-btn
              flat
              label="DEPOSIT"
              @click="async () => await deposit_money()"
              color="secondary"
              v-close-popup
            ></q-btn>
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="withdraw" persistent>
        <q-card style="width: 300px">
          <q-card-section class="row justify-center">
            <q-input
              v-model="withdraw_text"
              dense
              color="secondary"
              label="Amount"
            />
            <q-select
              borderless
              v-model="withdraw_select"
              :options="coins"
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
          </q-card-section>

          <q-card-actions align="center">
            <q-btn
              flat
              label="CANCEL"
              color="secondary"
              @click="deposit = ''"
              v-close-popup
            ></q-btn>
            <q-btn
              flat
              label="WITHDRAW"
              @click="async () => await withdraw_money()"
              color="secondary"
              v-close-popup
            ></q-btn>
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-scroll-area>
  </div>
</template>

<script>
import Lottie from "vue-lottie";
import { ref } from "vue";
import getCoinChart from "@/helpers/api.service";
import AnalyticsPie from "./AnalyticsPie.vue";
import { Coins } from "@/data/currency_list";
import { fabEthereum } from "@quasar/extras/fontawesome-v6";
import * as analyticsAnimData from "../../../public/icon_analytics.json";
import * as walletAnimData from "../../../public/icon_wallet.json";

import CurrencyCard from "./CurrencyCard.vue";
export default {
  name: "WalletTab",
  components: { CurrencyCard, AnalyticsPie, lottie: Lottie },
  created() {
    this.fabEthereum = fabEthereum;
  },
  setup() {
    return {
      put: ref(false),
      withdraw: ref(false),
      deposit: ref(""),
      deposit_select: ref(null),
      withdraw_text: ref(""),
      withdraw_select: ref(null),
      coins: Coins,
      wallet_btc: ref(0),
      wallet_eth: ref(0),
      wallet_btc_usd: ref(0),
      wallet_eth_usd: ref(0),
      wallet_total: ref(0),
      wallet_anim: {
        animationData: walletAnimData,
        animationSpeed: 1,
      },
      analytics_anim: {
        animationData: analyticsAnimData,
        animationSpeed: 1,
      },
    };
  },
  methods: {
    async deposit_money() {
      if (this.deposit_select) {
        let currency = this.deposit_select;
        let data = await getCoinChart(currency);
        if (currency.name == "Bitcoin") {
          this.wallet_btc += parseFloat(this.deposit);
          this.wallet_btc_usd = parseFloat(this.wallet_btc) * data["usd"];
        } else {
          this.wallet_eth += parseFloat(this.deposit);
          this.wallet_eth_usd = parseFloat(this.wallet_eth) * data["usd"];
        }
        console.log(data);
        let dollars = parseFloat(this.deposit) * data["usd"];
        this.wallet_total += dollars;
      }
      this.deposit = "";
      this.$refs.pie.updateChart();
    },
    async withdraw_money() {
      if (this.withdraw_select) {
        let currency = this.withdraw_select;
        let data = await getCoinChart(currency);
        if (currency.name == "Bitcoin") {
          this.wallet_btc -= parseFloat(this.withdraw_text);
          this.wallet_btc_usd = parseFloat(this.wallet_btc) * data["usd"];
        } else {
          this.wallet_eth -= parseFloat(this.withdraw_text);
          this.wallet_eth_usd = parseFloat(this.wallet_eth) * data["usd"];
        }
        let dollars = parseFloat(this.withdraw_text) * data["usd"];
        this.wallet_total -= dollars;
      }
      this.withdraw_text = "";
      this.$refs.pie.updateChart();
    },
  },
};
</script>
