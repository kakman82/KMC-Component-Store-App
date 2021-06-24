<template>
  <section class="hero is-medium">
    <!-- Search Bar Bölümü -->
    <div class="hero-body has-background-info py-7 px-0 mt-6">
      <div class="columns is-mobile is-centered">
        <div class="column is-6-desktop is-10-mobile is-9-tablet">
          <p
            class="
              title
              has-text-white has-text-weight-light
              is-size-2
              has-text-centered
              is-size-3-mobile
            "
          >
            ARROW ELECTRONICS'in <br />
            tüm dünya stoklarına erişim sağlayın...
          </p>

          <div class="control has-icons-left">
            <input
              class="input is-rounded is-large"
              type="text"
              placeholder="Ara..."
              v-model="search_token"
              @keyup.enter="getApiProducts($event)"
            />
            <span class="icon is-medium is-left">
              <i class="fas fa-search"></i>
            </span>
          </div>
          <p class="help is-white ml-4">Ürün kodu ile arama yapabilirsiniz.</p>
          <!-- Loading -->
          <b-loading :is-full-page="isFullPage" v-model="isLoading" :can-cancel="true"></b-loading>
        </div>
      </div>
    </div>
    <!-- Icon ve Kısa Başlıkların Olduğu Bölüm  -->
    <section class="hero is-medium has-background-grey-lighter pb-0 mb-0">
      <div class="hero-body">
        <div class="columns">
          <div class="column has-text-centered">
            <p class="title has-text-weight-light has-text-centered">
              Arrow.com Türkiye Tek Yetkili İş Ortağı
            </p>
            <span class="icon-text mt-2">
              <span class="icon has-text-black">
                <i class="fas fa-handshake fa-3x"></i>
              </span>
            </span>
          </div>
          <div class="column has-text-centered">
            <p class="title has-text-weight-light has-text-centered">
              Arrow.com Dünya Stoklarına Erişim
            </p>
            <span class="icon-text mt-2">
              <span class="icon has-text-black">
                <i class="fas fa-dolly-flatbed fa-3x"></i>
              </span>
            </span>
          </div>

          <div class="column has-text-centered">
            <p class="title has-text-weight-light has-text-centered">
              Hızlı <br />
              Teslimat
            </p>
            <span class="icon-text mt-2">
              <span class="icon has-text-black">
                <i class="fas fa-stopwatch fa-3x"></i>
              </span>
            </span>
          </div>
          <div class="column has-text-centered">
            <p class="title has-text-weight-light has-text-centered">
              TL Cinsinden Sipariş Oluşturma
            </p>
            <span class="icon-text mt-2">
              <span class="icon has-text-black">
                <i class="fas fa-lira-sign fa-3x"></i>
              </span>
            </span>
          </div>
          <div class="column has-text-centered">
            <p class="title has-text-weight-light has-text-centered">
              Garantili ve Güvenilir Teslimat
            </p>
            <span class="icon-text mt-2">
              <span class="icon has-text-black">
                <i class="fas fa-truck fa-3x"></i>
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  name: 'HomePage',
  head: {
    title: 'Ana Sayfa | KMC Elektronik',
  },
  data() {
    return {
      search_token: '',
      isFullPage: true,
      isLoading: false,
    }
  },
  methods: {
    async getApiProducts(e) {
      this.$store.commit('products/resetValuesForNewSeach')
      try {
        this.isLoading = true
        this.search_token = e.target.value
        const response = await this.$axios.$get(`/products/${this.search_token}`)
        console.log('api response: ', response);
        if(response.success){
          this.$store.commit('products/setApiProducts', response.apiProducts)
          this.isLoading = false
          this.$router.push(`/search_result/${this.search_token}`)
          this.search_token = ''
        }
      } catch (error) {
        this.isLoading = false
        this.search_token = ''
        this.alertError()
        console.log(error);

      }
    },
    alertError() {
      this.$buefy.dialog.alert({
        title: 'Hata',
        message: 'Aradığınız kriterlere uygun ürün bulunamamıştır. <br /> Lütfen tekrar deneyin.',
        type: 'is-danger',
        hasIcon: true,
        icon: 'times-circle',
        iconPack: 'fa',
        ariaRole: 'alertdialog',
        ariaModal: true,
        confirmText: 'Tamam'
      })
    }
  }
  
}
</script>

<style scoped>
.hero-body {
  padding: 2rem -0.5rem;
}
</style>
