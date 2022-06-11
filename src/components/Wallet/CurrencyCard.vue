<template>
  <div class="currency_card">
    <q-card bordered flat class="currency_card__content">
      <q-card-section>
        <div class="row justify-between">
          <div class="row">
            <q-avatar>
              <img
                :src="coin.short_name == 'BTC' ? bitcoin_img : ethereum_img"
              />
            </q-avatar>
            <div class="text-h6" style="margin-top: 8px; margin-left: 8px">
              {{ coin.short_name }}
            </div>
          </div>
          <div class="text-h6" style="margin-top: 8px; margin-left: 8px">
            {{ wallet }}
            <q-icon
              :name="coin.short_name === 'ETH' ? fabEthereum : coin.icon"
              style="margin-bottom: 5px"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import bitcoin_img from "../../../public/bitcoin.png";
import ethereum_img from "../../../public/ethereum.png";
import { fabEthereum } from "@quasar/extras/fontawesome-v6";

export default {
  name: "CurrencyCard",
  created() {
    this.bitcoin_img = bitcoin_img;
    this.ethereum_img = ethereum_img;
    this.fabEthereum = fabEthereum;
  },
  props: {
    coin: {
      type: Object,
      default: () => {},
    },
    wallet: {
      type: Number,
      default: 0,
    },
    img_src: {
      type: String,
      default: "",
    },
  },
};
</script>
