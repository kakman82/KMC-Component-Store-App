<template>
  <div class="card m-5" style="width: 250px">
    <header class="card-header">
      <p class="card-header-title">
        <b-radio
          v-model="selected"
          :native-value="address"
          name="name"
          class="has-text-primary"
          @input="$store.commit('setSelectedAddress', selected)"
        >
          {{ address.title }}
        </b-radio>
      </p>
      <div class="buttons is-flex-wrap-nowrap is-justify-content-flex-end">
        <button
          class="button is-white p-2"
          @click="$store.commit('setAddressModalStatus', 'update')"
        >
          <span class="icon">
            <i class="fas fa-edit has-text-primary"></i>
          </span>
        </button>
        <button class="button is-white p-2">
          <span class="icon">
            <i class="far fa-trash-alt has-text-danger"></i>
          </span>
        </button>
      </div>
    </header>

    <div class="card-content">
      <b>{{ address.companyName }}</b>
      <p>{{ address.firstName }} {{ address.lastName }}</p>
      <p>{{ address.phone }}</p>
      <p class="is-text-overflow">
        {{ address.neighbourhood }} {{ address.fullAddress }}
      </p>
      <p>{{ address.district }}/ {{ address.province }}</p>
    </div>
    <div
      class="modal"
      :class="{ 'is-active': $store.state.openUpdateAddressModal }"
    >
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head has-text-centered">
          <p class="modal-card-title is-size-5 has-text-weight-bold">
            Adresi Düzenle
          </p>

          <button
            class="delete"
            aria-label="close"
            @click="$store.commit('resetAddressModalStatus', 'update')"
          ></button>
        </header>
        <section class="modal-card-body">
          <!-- Update Address -->
          <UpdateAddress />
        </section>
        <footer class="modal-card-foot is-justify-content-flex-end">
          <button
            class="button is-small"
            @click="$store.commit('resetAddressModalStatus', 'update')"
          >
            Kapat
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import UpdateAddress from './UpdateAddress.vue'
export default {
  name: 'DeliveryAddresses',
  components: { UpdateAddress },
  props: ['address'],
  data() {
    return {
      selected: [],
    }
  },
}
</script>

<style scoped>
.card {
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5px; /* 5px rounded corners */
}

/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
.is-text-overflow {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
