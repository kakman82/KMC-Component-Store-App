<template>
  <div class="columns mt-6 has-background-white-ter has-text-centered-mobile">
    <div class="column is-8">
      <h1 class="title is-size-5-mobile">Sepet Detayları</h1>
      <h2 class="subtitle is-size-6-mobile mb-2">
        TL fiyatlama günlük TCMB Döviz Satış Kuru üzerinden yapılmaktadır.
      </h2>
      <h2 class="subtitle is-size-7">
        *Ürün detay bilgilerini ">" simgesine tıklayarak görebilirsiniz.
      </h2>
    </div>
    <div class="column is-4 is-justify-items-flex-end">
      <p class="title is-size-5-mobile">Günün tarihi</p>
      <h2 class="subtitle is-size-6-mobile">USD: TCMB & EUR: TCMB</h2>
    </div>
  </div>
</template>

<script>
import tcmbdoviz from 'tcmb-doviz'

export default {
  name: 'CurrencyRates',
  data() {
    return {
      date: '',
    }
  },

  // async created() {
  //   const data = await tcmbdoviz.getData()
  //   console.log(data.date)
  //   this.date = data.date
  // },
}
</script>
