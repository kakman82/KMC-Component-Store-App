<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title has-text-primary-dark">Siparişlerim</p>
    </header>
    <div class="card-content">
      <h2 class="subtitle is-size-7">
        *Sipariş içeriğindeki ürünleri ve detay bilgilerini görmek için "
        <i class="fas fa-chevron-right has-text-primary"></i>
        " simgesine tıkla
      </h2>
      <div class="content">
        <b-table
          :data="isEmpty ? [] : orders"
          :bordered="isBordered"
          :striped="isStriped"
          :narrowed="isNarrowed"
          :hoverable="isHoverable"
          :loading="isLoading"
          :focusable="isFocusable"
          :mobile-cards="hasMobileCards"
          :opened-detailed="defaultOpenedDetails"
          detailed
          detail-key="_id"
          show-detail-icon
          :detail-transition="transitionName"
          ref="table"
          paginated
          pagination-size="is-small"
          pagination-position="both"
          per-page="5"
          aria-next-label="Next page"
          aria-previous-label="Previous page"
          aria-page-label="Page"
          aria-current-label="Current page"
        >
          <b-table-column
            field="orderNo"
            label="Sipariş #"
            width="50"
            v-slot="props"
          >
            {{ props.row.orderNo }}
          </b-table-column>

          <b-table-column
            field="createdAt"
            label="Tarih"
            numeric
            centered
            v-slot="props"
          >
            {{ niceDateFormat(props.row.createdAt) }}
          </b-table-column>

          <b-table-column
            field="sumTotal"
            label="Sipariş Toplamı"
            numeric
            centered
            v-slot="props"
          >
            {{ niceFormat(props.row.sumTotal, 2) }} TL
          </b-table-column>

          <b-table-column field="status" label="Durum" centered v-slot="props">
            {{ props.row.status }}
          </b-table-column>

          <b-table-column label="Yenile Butonu" centered>
            <b-button icon-pack="fas" icon-right="sync-alt"></b-button>
          </b-table-column>

          <template #empty>
            <div class="has-text-centered has-text-primary-dark">
              <b>Henüz verilmiş bir sipariş bulunmuyor.</b> <br />
              Ana sayfamızdan istenilen ürünün kod numarası ile <br />
              arama yaparak sepete ekleme yapabilir ve sipariş verebilirsin.
            </div>
          </template>
          <!-- <template #detail="props">
            <article class="media">
              <figure class="media-left mt-1">
                <p class="image is-96x96">
                  <img class="zoom p-1" :src="props.row.productImage" />
                </p>
              </figure>
              <div class="media-content">
                <div class="content">
                  <p>
                    <b class="has-text-primary-dark">{{
                      props.row.productName
                    }}</b>
                    <br />
                    <strong>{{ props.row.productManufacturer }}</strong>
                    <br />
                    <b
                      ><small
                        ><i class="fas fa-truck-moving"></i>
                        {{ props.row.productSupplier }}</small
                      ></b
                    >
                    <br />
                    {{ props.row.productDescription }}
                  </p>
                </div>
              </div>
            </article>
          </template> -->
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
import * as module from '../../../plugins/formatHelper'
export default {
  layout: 'usermenu',
  middleware: 'authenticated',
  head: {
    title: 'Şiparişlerim | KMC Elektronik',
  },
  data() {
    return {
      orders: [],
      orderProducts: [],

      isEmpty: false,
      isBordered: true,
      isStriped: true,
      isNarrowed: false,
      isHoverable: true,
      isFocusable: true,
      isLoading: false,
      hasMobileCards: true,
      defaultOpenedDetails: [0],
    }
  },
  computed: {
    sessionUserId() {
      return this.$store.getters['getUser'].id
    },
    transitionName() {
      if (this.useTransition) {
        return 'fade'
      }
    },
  },
  created() {
    this.getUserOrders()
  },
  methods: {
    niceFormat(val, digit) {
      return module.formatNumber(val, digit)
    },
    niceDateFormat(value) {
      return module.formatDate(value)
    },
    async getUserOrders() {
      try {
        const response = await this.$axios.$get(
          `/users/orders/${this.sessionUserId}`
        )
        if (response.success) {
          this.orders = response.orders
          this.orderProducts = response.orders.map((el) => el.products)
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style></style>
