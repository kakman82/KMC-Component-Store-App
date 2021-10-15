<template>
  <div class="modal" :class="{ 'is-active': showUpdateUserModal }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head has-text-centered">
        <p class="modal-card-title is-size-5 has-text-weight-bold">
          Kullanıcı Bilgilerini Düzenle
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

            <div class="columns">
              <div class="column">
                <ValidationProvider rules="required" v-slot="{ errors, valid }">
                  <b-field
                    label="Ad"
                    :type="{ 'is-danger': errors[0], 'is-success': valid }"
                    :message="errors"
                  >
                    <b-input v-model="user.firstName"></b-input>
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
                    <b-input v-model="user.lastName"></b-input>
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
                <b-input v-model="user.email" type="email"> </b-input>
              </b-field>
            </ValidationProvider>

            <div class="columns">
              <div class="column">
                <ValidationProvider rules="required" v-slot="{ errors, valid }">
                  <b-field
                    label="Rol"
                    :type="{ 'is-danger': errors[0], 'is-success': valid }"
                    :message="errors"
                  >
                    <b-select v-model="user.role" expanded>
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
              </div>
              <div class="column">
                <ValidationProvider rules="required" v-slot="{ errors, valid }">
                  <b-field
                    label="Durum"
                    :type="{ 'is-danger': errors[0], 'is-success': valid }"
                    :message="errors"
                  >
                    <b-select v-model="user.active" expanded>
                      <option
                        v-for="(status, index) in statusNames"
                        :key="index"
                        :value="status.key"
                      >
                        {{ status.value }}
                      </option>
                    </b-select>
                  </b-field>
                </ValidationProvider>
              </div>
            </div>
            <b-button
              class="mt-6 is-primary has-text-weight-bold"
              expanded
              :loading="isLoading"
              @click="handleSubmit(updateUser)"
              >Kaydet</b-button
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
  name: 'UpdateUser',
  components: { ValidationObserver, ValidationProvider },
  props: {
    showUpdateUserModal: { type: Boolean },
    user: { type: Object },
  },
  emits: ['close-update-user-modal', 'refresh-users'],
  data() {
    return {
      serverErrMsg: '',
      isLoading: false,
      roleNames: [
        { key: 'customer', value: 'Müşteri' },
        { key: 'admin', value: 'Admin' },
        { key: 'employee', value: 'Personel' },
      ],
      statusNames: [
        { key: true, value: 'Aktif' },
        { key: false, value: 'Pasif' },
      ],
    }
  },
  methods: {
    close() {
      this.$emit('close-update-user-modal')
    },
    async updateUser() {
      const reqDataForUpdateUser = {
        id: this.user._id,
        firstName: capitalizeEachWord(this.user.firstName),
        lastName: capitalizeEachWord(this.user.lastName),
        email: this.user.email.toLowerCase(),
        role: this.user.role,
        active: this.user.active,
      }
      let response = ''
      try {
        this.isLoading = true
        response = await this.$axios.$patch('/users', reqDataForUpdateUser)
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
          return (this.serverErrMsg = error.response.data.messageTR)
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
