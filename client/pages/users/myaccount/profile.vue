<template>
  <div class="card ml-6" style="width: 600px">
    <header class="card-header">
      <p class="card-header-title has-text-primary-dark">Profilim</p>
    </header>
    <div class="card-content">
      <div class="content">
        <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
          <section>
            <b-message
              v-if="serverErrMsg"
              type="is-danger"
              has-icon
              icon-size="is-medium"
            >
              {{ serverErrMsg }}
            </b-message>

            <ValidationProvider rules="required" v-slot="{ errors, valid }">
              <b-field
                label="Ad"
                :type="{ 'is-danger': errors[0], 'is-success': valid }"
                :message="errors"
              >
                <b-input v-model="firstName"></b-input>
              </b-field>
            </ValidationProvider>

            <ValidationProvider rules="required" v-slot="{ errors, valid }">
              <b-field
                label="Soyad"
                :type="{ 'is-danger': errors[0], 'is-success': valid }"
                :message="errors"
              >
                <b-input v-model="lastName"></b-input>
              </b-field>
            </ValidationProvider>

            <ValidationProvider
              rules="required|email"
              v-slot="{ errors, valid }"
            >
              <b-field
                label="E-posta"
                :type="{ 'is-danger': errors[0], 'is-success': valid }"
                :message="errors"
              >
                <b-input v-model="email" type="email"> </b-input>
              </b-field>
            </ValidationProvider>

            <b-button
              class="mt-6 is-primary has-text-weight-bold"
              @click="handleSubmit(updateUser)"
              >Güncelle</b-button
            >
          </section>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import * as module from '../../../plugins/formatHelper'
export default {
  layout: 'usermenu',
  middleware: 'authenticated',
  head: {
    title: 'Bilgilerim | KMC Elektronik',
  },
  components: { ValidationObserver, ValidationProvider },
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      serverErrMsg: '',
    }
  },
  computed: {
    sessionUser() {
      return this.$store.getters['getUser']
    },
  },
  created() {
    this.getUser()
  },
  methods: {
    async getUser() {
      try {
        const response = await this.$axios.$get(
          `/users/profile/${this.sessionUser.id}`
        )
        if (response.success) {
          this.firstName = response.user.firstName
          this.lastName = response.user.lastName
          this.email = response.user.email
        }
      } catch (error) {
        console.log(error.message)
        this.serverErrMsg = error.message
      }
    },
    async updateUser() {
      try {
        const dataToUpdate = {
          firstName: module.capitalizeEachWord(this.firstName),
          lastName: module.capitalizeEachWord(this.lastName),
          email: this.email.toLowerCase(),
        }
        const response = await this.$axios.$patch(
          `/users/profile/${this.sessionUser.id}`,
          dataToUpdate
        )
        if (response.success) {
          this.$store.commit('setUser', response.user)
          this.getUser()

          this.$router.push('/users/myaccount')

          this.$buefy.toast.open({
            duration: 5000,
            message: response.message,
            type: 'is-success',
          })
        }
      } catch (error) {
        console.log(error.message)
        this.serverErrMsg = error.message
      }
    },
  },
}
</script>

<style></style>
