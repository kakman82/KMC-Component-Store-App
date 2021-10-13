<template>
  <section>
    <div class="card">
      <header class="card-header">
        <p
          class="
            card-header-title
            has-text-primary
            is-capitalized is-marginless
          "
        >
          Banka Havalesi
        </p>
      </header>

      <div class="card-content">
        <article
          class="message is-info is-small"
          v-show="$route.path === '/checkout'"
        >
          <div class="message-body">
            Şimdilik ödemeleri yalnızca banka havalesi olarak kabul ediyoruz.
            <br />
            <strong
              >Aşağıda belirtilen banka hesaplarımızdan birine ödeme geldikten
              sonra ürün tedariğine başlanacaktır. <br />
              Ödeme onay bilgisi e-posta ile bildirilecektir.</strong
            >
          </div>
        </article>

        <p class="">Banka hesap numaralarımız;</p>
        <div class="table-container">
          <table class="table is-striped is-narrow is-bordered">
            <thead>
              <tr>
                <th>Banka Adı</th>
                <th>IBAN No</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>X Bankası</td>
                <td>TR56 0006 2000 0001 2990 0226 04</td>
              </tr>
              <tr>
                <td>Y Bankası</td>
                <td>TR 68 00062 0 0000222990028402</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {}
</script>

<style></style>
