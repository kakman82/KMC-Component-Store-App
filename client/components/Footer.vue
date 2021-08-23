<template>
  <!-- style="height: 750px" -->
  <footer class="footer has-background-info-dark">
    <div class="columns">
      <!-- Firma adı ve copyright bölümü -->
      <div class="column is-4 has-text-left has-text-centered-mobile">
        <p class="title has-text-white">KMC Elektronik.</p>
        <p class="subtitle has-text-white mb-1">Copyright &copy; 2021</p>
        <p class="has-text-white is-italic is-size-7">Her hakkı saklıdır.</p>
      </div>
      <!-- Firma iletişim bilgileri bölümü-->
      <div
        class="
          column
          is-4
          has-text-white has-text-left-desktop has-text-centered-mobile
        "
      >
        <div class="columns is-1 m-0 p-0">
          <div class="column">
            <i class="fas fa-at"></i>
          </div>
          <div class="column is-11">
            <a class="has-text-white" href="mailto:info@kmc-grup.com"
              >info@kmc-grup.com</a
            >
          </div>
        </div>
        <div class="columns is-1 m-0 p-0">
          <div class="column">
            <i class="fas fa-phone-volume"></i>
          </div>
          <div class="column is-11">
            <p>+90 216 527 36 41</p>
          </div>
        </div>
        <div class="columns is-1 m-0 p-0">
          <div class="column">
            <i class="fas fa-map-marker-alt"></i>
          </div>
          <div class="column is-11">
            <p>Y.Dudullu Mh. Tavukçuyolu Cd. No:235 Ümraniye/İstanbul</p>
          </div>
        </div>
      </div>
      <!-- Sosyal medya icon bölümü -->
      <div
        class="
          column
          is-4
          has-text-primary has-text-right has-text-centered-mobile
        "
      >
        <a href="http://www.kmcelektronik.com.tr/">
          <span class="icon has-text-white is-large">
            <i class="fab fa-linkedin fa-2x ml-1"></i>
          </span>
        </a>
        <a href="http://www.kmcelektronik.com.tr/">
          <span class="icon has-text-white is-large">
            <i class="fab fa-instagram fa-2x ml-1"></i>
          </span>
        </a>
        <a href="http://www.kmcelektronik.com.tr/">
          <span class="icon has-text-white is-large">
            <i class="fab fa-facebook fa-2x ml-1"></i>
          </span>
        </a>
        <a href="http://www.kmcelektronik.com.tr/">
          <span class="icon has-text-white is-large">
            <i class="fab fa-twitter fa-2x ml-1"></i>
          </span>
        </a>
        <a href="http://www.kmcelektronik.com.tr/">
          <span class="icon has-text-white is-large">
            <i class="fab fa-youtube fa-2x ml-1"></i>
          </span>
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
}
</script>
