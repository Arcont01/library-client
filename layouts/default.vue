<template>
  <div>
    <NavBar/>
    <main>
      <b-container>
        <Nuxt/>
      </b-container>
    </main>
  </div>
</template>

<script>
export default {
  name: "Default",
  components:{
    NavBar: () => import('@/components/NavBar')
  }
}
</script>
