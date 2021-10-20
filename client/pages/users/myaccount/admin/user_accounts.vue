<template>
  <div class="card" style="width: 95%">
    <header class="card-header">
      <p class="card-header-title has-text-primary-dark">Kullanıcı Listesi</p>
    </header>
    <div class="card-content">
      <div class="content">
        <b-message
          v-if="serverErrMsg"
          type="is-danger"
          has-icon
          icon-size="is-medium"
        >
          {{ serverErrMsg }}
        </b-message>
        <button class="button is-primary is-small" @click="openAddUserModal">
          <span class="icon">
            <i class="fas fa-user-plus"></i>
          </span>
          <span>Yeni Kullanıcı Ekle</span>
        </button>
        <!-- Add a User Form Component -->
        <AddUser
          :isOpen="showAddUserModal"
          @close-add-user-modal="closeAddUserModal"
          @refresh-users="getAllUsers"
        />
        <!-- Update a User Form Component -->
        <UpdateUser
          :showUpdateUserModal="showUpdateUserModal"
          :user="userToUpdate"
          @refresh-users="getAllUsers"
          @close-update-user-modal="closeUpdateUserModal"
        />

        <b-table
          :data="users"
          :bordered="isBordered"
          :striped="isStriped"
          :narrowed="isNarrowed"
          :hoverable="isHoverable"
          :loading="isLoading"
          :focusable="isFocusable"
          :mobile-cards="hasMobileCards"
          :detail-transition="transitionName"
          :default-sort-direction="defaultSortDirection"
          :sort-icon="sortIcon"
          :sort-icon-size="sortIconSize"
          ref="table"
          paginated
          :pagination-simple="isSimple"
          pagination-size="is-small"
          pagination-position="both"
          per-page="7"
          aria-next-label="Next page"
          aria-previous-label="Previous page"
          aria-page-label="Page"
          aria-current-label="Current page"
        >
          <b-table-column
            field="firstName"
            label="Ad"
            width="120px"
            searchable
            sortable
            v-slot="props"
          >
            {{ props.row.firstName }}
          </b-table-column>
          <b-table-column
            field="lastName"
            label="Soyad"
            width="120px"
            searchable
            sortable
            v-slot="props"
          >
            {{ props.row.lastName }}
          </b-table-column>
          <b-table-column
            field="email"
            label="E-posta"
            width="120px"
            searchable
            sortable
            v-slot="props"
          >
            {{ props.row.email }}
          </b-table-column>
          <b-table-column
            field="createdAt"
            label="Kayıt Tarihi"
            centered
            width="40px"
            searchable
            sortable
            v-slot="props"
          >
            {{ niceDate(props.row.createdAt) }}
          </b-table-column>
          <b-table-column
            field="role"
            label="Rol"
            width="20px"
            centered
            sortable
            v-slot="props"
          >
            <span class="tag" :class="tagRoleType(props.row.role)">
              {{ roleName(props.row.role) }}
            </span>
          </b-table-column>
          <b-table-column
            field="active"
            label="Durum"
            width="10px"
            centered
            sortable
            v-slot="props"
          >
            <span class="tag" :class="tagStatusType(props.row.active)">
              {{ userStatus(props.row.active) }}
            </span>
          </b-table-column>
          <b-table-column label="Düzenle" centered v-slot="props" width="10px">
            <b-button
              size="is-small"
              type="is-info"
              icon-pack="fas"
              icon-right="user-edit"
              @click="handleUpdateUser(props.row)"
            ></b-button>
          </b-table-column>

          <template #empty>
            <div class="has-text-centered has-text-primary-dark">
              <b>Kayıtlı kullanıcı bulunmuyor!</b>
            </div>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
import * as module from '../../../../plugins/formatHelper.js'
import AddUser from '../../../../components/admin/AddUser.vue'
import UpdateUser from '../../../../components/admin/UpdateUser.vue'

export default {
  layout: 'usermenu',
  middleware: 'authenticated',
  components: { AddUser, UpdateUser },
  head: {
    title: 'Kullanıcı Yön. | KMC Elektronik',
  },
  data() {
    return {
      users: [],
      serverErrMsg: '',
      showAddUserModal: false,
      showUpdateUserModal: false,
      userToUpdate: {},

      isEmpty: false,
      isBordered: true,
      isStriped: true,
      isNarrowed: true,
      isHoverable: true,
      isFocusable: true,
      isLoading: false,
      hasMobileCards: true,
      isSimple: true,
      defaultSortDirection: 'asc',
      sortIcon: 'arrow-up',
      sortIconSize: 'is-small',
    }
  },
  computed: {
    transitionName() {
      if (this.useTransition) {
        return 'fade'
      }
    },
  },
  created() {
    this.getAllUsers()
  },
  methods: {
    niceDate(value) {
      return module.formatDateWithoutDay(value)
    },
    roleName(value) {
      if (value === 'customer') {
        return 'Müşteri'
      } else if (value === 'employee') {
        return 'Personel'
      } else if (value === 'admin') {
        return 'Admin'
      } else {
        return 'Hata var!'
      }
    },
    userStatus(value) {
      return value ? 'Aktif' : 'Pasif'
    },
    tagStatusType(value) {
      return value ? 'is-success' : 'is-danger'
    },
    tagRoleType(value) {
      if (value === 'admin') {
        return 'is-primary is-light'
      } else if (value === 'employee') {
        return 'is-warning is-light'
      } else {
        return 'is-success is-light'
      }
    },
    openAddUserModal() {
      this.showAddUserModal = true
    },
    closeAddUserModal() {
      this.showAddUserModal = false
    },
    closeUpdateUserModal() {
      this.showUpdateUserModal = false
    },

    async getAllUsers() {
      try {
        const response = await this.$axios.$get('/users')
        if (response.success) {
          this.users = response.users
        }
      } catch (error) {
        if (error.response) {
          this.serverErrMsg = error.response.data.message
        } else {
          console.log(error.response)
          this.serverErrMsg = error.message
        }
      }
    },
    handleUpdateUser(userInfo) {
      this.showUpdateUserModal = true
      this.userToUpdate = userInfo
    },
  },
}
</script>

<style></style>
