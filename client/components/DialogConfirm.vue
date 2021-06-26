<template>
  <section>
    <b-button type="is-danger" size="is-small" @click="confirmCustomDelete">
      <b-icon pack="fas" icon="sync-alt" custom-class="fa-trash"> </b-icon>
    </b-button>
  </section>
</template>

<script>
export default {
  name: 'DialogConfirm',
  props: ['prodCartId'],
  methods: {
    confirmCustomDelete() {
      this.$buefy.dialog.confirm({
        title: 'Sepetten Silme',
        message:
          'Ürünü sepetinizden <b>silmek</b> istediğinize emin misiniz? <br/>  <small>Bu işlem geri alınamaz!</small>',
        cancelText: 'Vazgeç',
        confirmText: 'Sil',
        type: 'is-danger',
        hasIcon: true,
        // onConfirm: () => this.$buefy.toast.open('Ürün sepetten silindi!'),
        onConfirm: this.handleConfirm,
      })
    },
    handleConfirm() {
      this.$store.commit('cart/deleteProductFromCart', this.prodCartId)
      this.$buefy.toast.open({
        message: 'Ürün sepetten silindi!',
        type: 'is-success',
      })
    },
  },
}
</script>
