<template>
  <main>
    <b-container>
      <b-row align-h="center" align-v="center" class="vh-100">
        <b-col lg="6">
          <b-card class="shadow-sm">
            <Nuxt />
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </main>
</template>

<script>
export default {
  name: "Auth"
}
</script>
