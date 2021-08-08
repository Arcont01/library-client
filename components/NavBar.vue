<template>
  <div id="navbar-wrapper">
    <b-navbar toggleable="sm" type="light" variant="light" class="border shadow-sm">
      <b-navbar-toggle target="nav-library"></b-navbar-toggle>

      <b-navbar-brand>Library</b-navbar-brand>

      <b-collapse id="nav-library" is-nav>
        <b-navbar-nav>
          <b-nav-text>Books</b-nav-text>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-text>Categories</b-nav-text>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "NavBar"
}
</script>
