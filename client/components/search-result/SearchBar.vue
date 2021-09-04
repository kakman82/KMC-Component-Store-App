<template>
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
    <!-- Loading -->
    <b-loading :is-full-page="isFullPage" v-model="isLoading"></b-loading>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search_token: '',
      isFullPage: true,
      isLoading: false,
    }
  },
  methods: {
    async getApiProducts(e) {
      try {
        this.$store.commit('products/resetValuesForNewSeach')
        this.isLoading = true
        this.search_token = e.target.value
        const response = await this.$axios.$get(
          `/products/${this.search_token}`
        )

        if (response.success) {
          this.$store.commit('products/setApiProducts', response.apiProducts)
          this.$store.commit('products/setSearch', this.search_token)
          this.isLoading = false
          this.$router.push(`/search_result/${this.search_token}`)
          this.search_token = ''
        }
      } catch (error) {
        this.isLoading = false
        this.search_token = ''
        this.$store.commit('products/setSearch', this.search_token)
        this.$router.push('/')
        this.alertError()
        console.log(error)
      }
    },
    alertError() {
      this.$buefy.dialog.alert({
        title: 'Hata',
        message: 'Aranılan kriterlere uygun ürün bulunamamıştır.',
        type: 'is-danger',
        hasIcon: true,
        icon: 'times-circle',
        iconPack: 'fa',
        ariaRole: 'alertdialog',
        ariaModal: true,
        confirmText: 'Tamam',
      })
    },
  },
}
</script>

<style></style>
