<template>
  <div class="box m-3">
    <article class="media">
      <div class="media-left">
        <figure class="image is-96x96 p-1">
          <img class="zoom" v-if="prod.resources[2]" :src="prod.resources[2].uri" alt="Image" />
          <div v-else class="mt-3 has-text-centered">
            <i class="far fa-image fa-4x has-text-centered"></i>
          </div>
        </figure>
      </div>
      <div class="media-content">
        <div class="content">
          <p>
            <strong>{{ prod.manufacturer.mfrName }}</strong>
            <br />
            <strong class="has-text-primary">{{ prod.partNum }}</strong>
            <br />
            <span>{{ prod.desc }}</span>
            <br />
            <strong>Kategori: </strong>
            {{ prod.categoryName ? prod.categoryName : 'Bilgi mevcut değil' }}
          </p>
        </div>
      </div>
      <div class="media-right">
        <a
          v-if="prod.hasDatasheet"
          :href="prod.resources[0].uri"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="icon">
            <i class="far fa-file-pdf fa-3x"></i>
          </span>
        </a>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: 'ProductInfoCard',

  props: {
    prod: {
      type: Object,
    },
  },
}
</script>

<style scoped>
.box {
  border: 1px solid #7957d5;
}

.image.is-96x96 {
  border: 1px solid #7957d5;
}

/* ürün fotosunun üzerinde gelindiğindeki zoom hover ref: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_zoom_hover */
.zoom:hover {
  transform: scale(
    1.8
  ); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
}
</style>
