<template>
  <div class="card">
    <div class="card-content">
      <div class="content">
        <b-message :title="titleMsg" type="is-info" has-icon :closable="false">
          Sol taraftaki menüde listenen alanlardan seçimler yaparak <br />
          kullanıcı bilgilerini güncelleyebilir, şifreni değiştirebilirsin.
          <br />
          <br />
          Henüz teslim edilmemiş siparişlerinin durumunu ve geçmiş tüm
          siparişlerini görüntüleyebilirsin.
        </b-message>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'usermenu',
  middleware: 'authenticated',
  head: {
    title: 'Hesabım | KMC Elektronik',
  },
  computed: {
    titleMsg() {
      return `Merhaba ${this.$store.state.user.firstName},`
    },
  },
}
</script>

<style></style>
