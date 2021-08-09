<template>
  <div class="box">
    <b-steps
      v-model="activeStep"
      :animated="isAnimated"
      :rounded="isRounded"
      :has-navigation="hasNavigation"
      :icon-prev="prevIcon"
      :icon-next="nextIcon"
      :label-position="labelPosition"
      :mobile-mode="mobileMode"
      size="is-medium"
    >
      <b-step-item
        step="1"
        label="Adres Seçimi"
        icon-pack="fas"
        icon="map-marked-alt"
        :clickable="isStepsClickable"
      >
        <article class="message is-info is-small">
          <div class="message-body">
            Kayıtlı teslimat adreslerinden birini seçerek onay kısmına
            ilerleyebilirsin.
          </div>
        </article>
        <button
          class="button mt-2 is-primary is-small"
          @click="isAddressModalActive = true"
        >
          <span class="icon">
            <i class="fas fa-edit"></i>
          </span>
          <span>Yeni Adres Ekle</span>
        </button>
        <section class="hero mt-3">
          <div class="hero-body">
            <article class="message is-warning">
              <div class="message-header">
                <p>Dikkat!</p>
              </div>
              <div class="message-body">
                Kayıtlı teslimat adresi bulunmamaktadır. <br />
                <strong>Yeni Adres Ekle</strong> butonu yardımıyla teslimat
                adresi ekleyebilirsin.
              </div>
            </article>
          </div>
        </section>
        <div class="card my-3">
          <header class="card-header">
            <p class="card-header-title">
              <b-radio v-model="radio" name="name" native-value="Flint">
                Ev Adresi
              </b-radio>
            </p>
            <button class="button is-white">
              <span class="icon">
                <i class="fas fa-edit has-text-primary"></i>
              </span>
            </button>
          </header>
          <div class="card-content">
            <p>Feyza Ak</p>
            <p>530*****59</p>
            <p class="ellipsis">
              Eyüp Sultan Mah Ekol - Eyüp Sultan Mah. Mehmet Akif Ersoy cad.
              No:3/A Hyundai plaza
            </p>
            <p>Sancaktepe/ İstanbul</p>
          </div>
        </div>

        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              <b-radio v-model="radio" name="name" native-value="Flint">
                İş Adresi
              </b-radio>
            </p>
            <button class="button is-white">
              <span class="icon">
                <i class="fas fa-edit"></i>
              </span>
            </button>
          </header>
          <div class="card-content">
            <p>Feyza Ak</p>
            <p>530*****59</p>
            <p class="ellipsis">
              Eyüp Sultan Mah Ekol - Eyüp Sultan Mah. Mehmet Akif Ersoy cad.
              No:3/A Hyundai plaza
            </p>
            <p>Sancaktepe/ İstanbul</p>
          </div>
        </div>

        <p class="content">
          <b>Selection:</b>
          {{ radio }}
        </p>
      </b-step-item>

      <b-step-item
        step="2"
        label="Sipariş Onayı"
        con-pack="fas"
        icon="check-circle"
        :clickable="isStepsClickable"
        :type="{ 'is-success': isProfileSuccess }"
      >
        <h1 class="title has-text-centered">Profile</h1>
        Lorem ipsum dolor sit amet.
      </b-step-item>

      <template v-if="customNavigation" #navigation="{ previous, next }">
        <b-button
          outlined
          type="is-danger"
          icon-pack="fas"
          icon-left="backward"
          :disabled="previous.disabled"
          @click.prevent="previous.action"
        >
          Previous
        </b-button>
        <b-button
          outlined
          type="is-success"
          icon-pack="fas"
          icon-right="forward"
          :disabled="next.disabled"
          @click.prevent="next.action"
        >
          Next
        </b-button>
      </template>
    </b-steps>
    <div class="modal" :class="{ 'is-active': isAddressModalActive }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head has-text-centered">
          <p class="modal-card-title is-size-5 has-text-weight-bold">
            Yeni Adres Oluştur
          </p>

          <button
            class="delete"
            aria-label="close"
            @click="isAddressModalActive = false"
          ></button>
        </header>
        <section class="modal-card-body">
          <AddAddress @closeAddAddressModal="closeModal" />
        </section>
        <footer class="modal-card-foot is-justify-content-flex-end">
          <button class="button is-small" @click="isAddressModalActive = false">
            Kapat
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import AddAddress from './AddAddress.vue'
export default {
  name: 'Steps',
  components: { AddAddress },
  data() {
    return {
      activeStep: 0,

      isAnimated: true,
      isRounded: true,
      isStepsClickable: false,

      hasNavigation: true,
      customNavigation: false,
      isProfileSuccess: false,

      prevIcon: 'chevron-left',
      nextIcon: 'chevron-right',
      labelPosition: 'bottom',
      mobileMode: 'minimalist',

      radio: null,
      isAddressModalActive: false,
    }
  },
  methods: {
    closeModal() {
      this.isAddressModalActive = false
    },
  },
}
</script>
