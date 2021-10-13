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

          <SearchBar />

          <p class="help is-white ml-4">Ürün kodu ile arama yapabilirsiniz.</p>
        </div>
      </div>
    </div>
    <!-- Icon ve Kısa Başlıkların Olduğu Bölüm  -->
    <section class="hero is-medium has-background-white pb-0 mb-0">
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
import SearchBar from '../components/search-result/SearchBar.vue'
export default {
  name: 'HomePage',
  head: {
    title: 'Ana Sayfa | KMC Elektronik',
  },
  components: { SearchBar },
}
</script>

<style scoped>
.hero-body {
  padding: 2rem -0.5rem;
}
</style>
