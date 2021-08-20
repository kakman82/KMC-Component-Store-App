<template>
  <section class="section is-medium">
    <div class="container mt-6">
      <b-tabs
        :position="atRight ? 'is-right' : ''"
        :size="size"
        :type="type"
        vertical
        :expanded="expanded"
      >
        <b-tab-item label="Hesabım" icon-pack="fas" icon="user">
          Lorem ipsum dolor sit amet. <br />
          Lorem ipsum dolor sit amet. <br />
          Lorem ipsum dolor sit amet. <br />
          Lorem ipsum dolor sit amet. <br />
          Lorem ipsum dolor sit amet. <br />
          Lorem ipsum dolor sit amet.
        </b-tab-item>

        <b-tab-item label="Siparişlerim" icon-pack="fas" icon="shopping-bag">
          What light is light, if Silvia be not seen? <br />
          What joy is joy, if Silvia be not by— <br />
          Unless it be to think that she is by <br />
          And feed upon the shadow of perfection? <br />
          Except I be by Silvia in the night, <br />
          There is no music in the nightingale.
        </b-tab-item>

        <b-tab-item label="Admin Paneli" icon-pack="fas" icon="users-cog">
          Nunc nec velit nec libero vestibulum eleifend. Curabitur pulvinar
          congue luctus. Nullam hendrerit iaculis augue vitae ornare. Maecenas
          vehicula pulvinar tellus, id sodales felis lobortis eget.
        </b-tab-item>
        <b-tab-item label="Çıkış Yap" icon-pack="fas" icon="sign-out-alt">
          Logout buton şeklinde olacak
        </b-tab-item>
      </b-tabs>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      expanded: true,
      atRight: false,
      size: 'is-medium',
      type: 'is-boxed',
    }
  },
}
</script>

<style></style>
