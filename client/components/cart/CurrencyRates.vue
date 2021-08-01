<template>
  <div class="columns mt-6 has-background-white-ter has-text-centered-mobile">
    <div class="column is-8">
      <h1 class="title is-size-5-mobile">Sepet Detayları</h1>
      <h2 class="subtitle is-size-6-mobile mb-2">
        TL fiyatlama günlük TCMB Döviz Satış Kuru üzerinden yapılmaktadır.
      </h2>
      <h2 class="subtitle is-size-7">
        *Ürün detay bilgilerini "
        <i class="fas fa-chevron-right has-text-primary"></i>
        " simgesine tıklayarak görebilirsiniz.
      </h2>
    </div>
    <div class="column is-4 is-justify-items-flex-end">
      <p class="title is-size-5-mobile">{{ date }}</p>
      <h2 class="subtitle is-size-6-mobile">
        <b>USD: </b>{{ usdRate }} <b>|</b> <b>EUR: </b> {{ euroRate }}
      </h2>
    </div>
  </div>
</template>

<script>
import * as module from '../formatHelper'
export default {
  name: 'CurrencyRates',
  props: ['dateTodayForCurrency', 'reRenderTimes'],
  data() {
    return {
      exchanges: [],
    }
  },
  computed: {
    date() {
      return this.dateTodayForCurrency
    },
    usdRate() {
      if (this.exchanges.length > 0) {
        const usd = this.exchanges.filter((el) => el.code === 'USD')
        return module.formatNumber(usd[0].selling, 4)
      }
    },
    euroRate() {
      if (this.exchanges.length > 0) {
        const euro = this.exchanges.filter((el) => el.code === 'EUR')
        return module.formatNumber(euro[0].selling, 4)
      }
    },
  },
  created() {
    this.getExchangeRates()
    //console.log('curr componente gelen tarih: ', this.dateTodayForCurrency)
  },
  methods: {
    async getExchangeRates() {
      try {
        const response = await this.$axios.$get('/daily_rates')
        if (response.success) {
          //console.log('kaç kere re-render edildi: ', this.reRenderTimes)
          this.currDate = response.currDate
          this.exchanges = response.exchanges
          this.$store.commit('cart/setExchanges', response)
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
