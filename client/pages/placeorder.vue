<template>
  <section class="section is-medium mt-6">
    <h1>Placeholder Page</h1>
  </section>
</template>

<script>
export default {
  // sadece login olmuş kullanıcıların bu sayfaya erişebilmesi için;
  middleware: 'authenticated',
}
</script>
