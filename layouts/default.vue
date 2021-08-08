<template>
  <div>
    <NavBar/>
    <b-container>
      <Nuxt/>
    </b-container>
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
