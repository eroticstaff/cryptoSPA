<template>
  <div class="main centered">
    <q-toolbar class="toolbar">
      <q-toolbar-title>
        CryptoSPA
        <q-icon class="t_icon" name="face_5" size="32px" />
      </q-toolbar-title>
    </q-toolbar>
    <q-splitter v-model="splitterModel" style="">
      <template v-slot:before>
        <q-tabs v-model="tab" vertical class="text-teal">
          <q-tab name="currency" icon="currency_bitcoin" label="Currency" />
          <q-tab name="converter" icon="currency_exchange" label="Converter" />
          <q-tab name="wallet" icon="wallet" label="Wallet" />
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="currency">
            <CurrencyTab />
          </q-tab-panel>

          <q-tab-panel class="converter" name="converter">
            <ConverterTab />
          </q-tab-panel>

          <q-tab-panel name="wallet"> <WalletTab /></q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </div>
</template>

<script>
import { ref } from "vue";
import CurrencyTab from "./components/Currency/CurrencyTab.vue";
import ConverterTab from "./components/Convert/ConverterTab.vue";
import WalletTab from "./components/Wallet/WalletTab.vue";
export default {
  name: "App",
  components: { CurrencyTab, ConverterTab, WalletTab },

  setup() {
    return {
      tab: ref("wallet"),
      splitterModel: ref(20),
    };
  },
};
</script>

<style src="./styles/app.css"></style>
