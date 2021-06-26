<template>
  <section class="mb-6 section is-medium">
    <div class="has-text-centered">
      <i class="m-6 has-text-primary fas fa-exclamation-circle fa-5x"></i>
      <h1 class="title is-size-2 is-size-4-mobile" v-if="error.statusCode === 404">
        {{ pageNotFound }}
      </h1>
      <h1 class="title is-size-2 is-size-4-mobile" v-else>
        {{ otherError }}
      </h1>
      <h2 class="subtitle mt-1 is-size-6-mobile">
        <NuxtLink to="/"> Ana Sayfa'ya Dön </NuxtLink>
      </h2>
    </div>
    <br />
  </section>
</template>

<script>
export default {
  layout: 'error',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Sayfa bulunamadı...',
      otherError: 'Bir hata oluştu',
    }
  },
  head() {
    const title = this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
