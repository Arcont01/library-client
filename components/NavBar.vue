<template>
  <header id="navbar-wrapper">
    <client-only>
      <b-navbar toggleable="sm" type="light" variant="light" class="border shadow-sm">
        <b-navbar-toggle target="nav-library"></b-navbar-toggle>
        <nuxt-link
          v-slot="{ isActive, navigate, href }"
          :to="{ name: 'books' }"
          custom
        >
        <b-navbar-brand :active="isActive" :href="href" @click="navigate">Library</b-navbar-brand>
        </nuxt-link>

        <b-collapse id="nav-library" is-nav>
          <b-navbar-nav>
            <nuxt-link
              v-slot="{ isActive, navigate, href }"
              :to="{ name: 'books' }"
              custom
            >
              <b-nav-item :active="isActive" :href="href" @click="navigate">Books</b-nav-item>
            </nuxt-link>
            <nuxt-link
              v-slot="{ isActive, navigate, href }"
              :to="{ name: 'categories' }"
              custom
            >
              <b-nav-item :active="isActive" :href="href" @click="navigate">Categories</b-nav-item>
            </nuxt-link>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item @click="logOut">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </client-only>
  </header>
</template>

<script>
export default {
  name: "NavBar",
  methods: {
    async logOut() {
      try {
        await this.$auth.logout()
        this.$toast.success('See you again')
      } catch (e) {
        this.$toast.error('Error')
      }
    },
  },
}
</script>
