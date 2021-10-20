<template>
  <div class="modal" :class="{ 'is-active': isOpen }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head has-text-centered">
        <p class="modal-card-title is-size-5 has-text-weight-bold">
          Yeni Kullanıcı Ekle
        </p>

        <button class="delete" aria-label="close" @click="close"></button>
      </header>
      <section class="modal-card-body">
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
                label="Rol"
                :type="{ 'is-danger': errors[0], 'is-success': valid }"
                :message="errors"
              >
                <b-select v-model="role" expanded>
                  <option
                    v-for="(roleName, index) in roleNames"
                    :key="index"
                    :value="roleName.key"
                  >
                    {{ roleName.value }}
                  </option>
                </b-select>
              </b-field>
            </ValidationProvider>

            <div class="columns">
              <div class="column">
                <ValidationProvider rules="required" v-slot="{ errors, valid }">
                  <b-field
                    label="Ad"
                    :type="{ 'is-danger': errors[0], 'is-success': valid }"
                    :message="errors"
                  >
                    <b-input v-model="firstName"></b-input>
                  </b-field>
                </ValidationProvider>
              </div>
              <div class="column">
                <ValidationProvider rules="required" v-slot="{ errors, valid }">
                  <b-field
                    label="Soyad"
                    :type="{ 'is-danger': errors[0], 'is-success': valid }"
                    :message="errors"
                  >
                    <b-input v-model="lastName"></b-input>
                  </b-field>
                </ValidationProvider>
              </div>
            </div>
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

            <ValidationProvider
              rules="required|passwordLength"
              v-slot="{ errors, valid }"
            >
              <b-field
                label="Şifre"
                :type="{ 'is-danger': errors[0], 'is-success': valid }"
                :message="errors"
              >
                <b-input
                  v-model="password"
                  type="password"
                  password-reveal
                  minlength="6"
                  maxlength="10"
                >
                </b-input>
              </b-field>
            </ValidationProvider>
            <b-button
              class="mt-6 is-primary has-text-weight-bold"
              expanded
              :loading="isLoading"
              @click="handleSubmit(createUser)"
              >Ekle</b-button
            >
          </section>
        </ValidationObserver>
      </section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <button class="button is-small" @click="close">Kapat</button>
      </footer>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { capitalizeEachWord } from '../../plugins/formatHelper'
export default {
  name: 'AddUser',
  components: { ValidationObserver, ValidationProvider },
  props: ['isOpen'],
  emits: ['close-add-user-modal', 'refresh-users'],
  data() {
    return {
      firstName: '',
      lastName: '',
      role: '',
      email: '',
      password: '',
      serverErrMsg: '',
      isLoading: false,
      roleNames: [
        { key: 'customer', value: 'Müşteri' },
        { key: 'admin', value: 'Admin' },
        { key: 'employee', value: 'Personel' },
      ],
    }
  },
  methods: {
    close() {
      this.$emit('close-add-user-modal')
    },
    async createUser() {
      try {
        this.isLoading = true
        const reqData = {
          role: this.role,
          firstName: capitalizeEachWord(this.firstName),
          lastName: capitalizeEachWord(this.lastName),
          email: this.email.toLowerCase(),
          password: this.password,
        }
        const response = await this.$axios.$post('/auth/signup', reqData)

        if (response.success) {
          this.isLoading = false
          this.close()
          this.$emit('refresh-users')

          this.$buefy.toast.open({
            duration: 5000,
            message: response.message,
            type: 'is-success',
          })
        }
      } catch (error) {
        this.isLoading = false
        if (error.response) {
          return (this.serverErrMsg = error.response.data.message)
        } else {
          this.serverErrMsg = error.message
          console.log(error)
        }
      }
    },
  },
}
</script>

<style></style>
