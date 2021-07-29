<template>
  <section class="section is-medium mt-6">
    <h1>Placeorder Page</h1>
    <h1>Order Confirm Bulma Steps will be added</h1>
  </section>
</template>

<script>
export default {
  // sadece login olmuş kullanıcıların bu sayfaya erişebilmesi için;
  middleware: 'authenticated',
  head: {
    title: 'Sipariş Onay | KMC Elektronik',
  },
}
</script>
