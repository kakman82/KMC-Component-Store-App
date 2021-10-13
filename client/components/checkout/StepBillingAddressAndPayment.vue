<template>
  <div class="box">
    <article class="message is-info" v-show="$route.path === '/checkout'">
      <div class="message-body">
        Kayıtlı fatura adresi yoksa yenisi oluşturarak ve ödeme yöntemini de
        belirleyerek ilerleyebilirsin.
      </div>
    </article>

    <b-collapse class="card" animation="slide" aria-id="contentIdForA11y3">
      <template #trigger="props">
        <div
          class="card-header"
          role="button"
          aria-controls="contentIdForA11y3"
        >
          <p class="card-header-title">Fatura Adresi</p>
          <a class="card-header-icon">
            <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon>
          </a>
        </div>
      </template>

      <div class="card-content">
        <div class="content">
          <div
            v-if="Object.keys($store.state.addresses.billingAddress).length > 0"
          >
            <BillAddressInfo />
          </div>
          <div v-else>
            <article class="message is-warning">
              <div class="message-header">
                <p>Dikkat!</p>
              </div>
              <div class="message-body">
                Kayıtlı fatura adresi bulunmamaktadır. <br />
              </div>
            </article>
            <b-button
              type="is-primary"
              @click="
                $store.commit('addresses/showModal', {
                  type: 'showAddBillingAddress',
                  action: true,
                })
              "
            >
              Fatura Adresi Oluştur
            </b-button>
            <AddBillAddress />
          </div>
        </div>
      </div>
    </b-collapse>

    <b-collapse class="card mt-6" animation="slide" aria-id="contentIdForA11y3">
      <template #trigger="props">
        <div
          class="card-header"
          role="button"
          aria-controls="contentIdForA11y3"
        >
          <p class="card-header-title">Ödeme Türü</p>
          <a class="card-header-icon">
            <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon>
          </a>
        </div>
      </template>

      <div class="card-content">
        <div class="content">
          <PaymentInfo />
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script>
import AddBillAddress from './billing-address/AddBillAddress.vue'
import BillAddressInfo from './billing-address/BillAddressInfo.vue'
import PaymentInfo from './billing-address/PaymentInfo.vue'
export default {
  name: 'StepBillAddressAndPayment',
  components: { AddBillAddress, BillAddressInfo, PaymentInfo },
}
</script>
