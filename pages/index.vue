<template>
  <div>
    <h1 class="font-weight-bold text-center">Login</h1>
    <validation-observer v-slot="{ invalid }">
      <b-form @submit.prevent="login">
        <b-form-group description="Use: test@test.com">
          <validation-provider
            v-slot="{ valid, errors }"
            name="correo electrónico"
            rules="required|email"
          >
            <b-input v-model="form.email" :state="errors[0] ? false : valid ? true : null" type="email"
                     placeholder="E-Mail"/>
            <b-form-invalid-feedback :state="valid">
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </validation-provider>
        </b-form-group>
        <b-form-group description="Use: password">
          <validation-provider
            v-slot="{ valid, errors }"
            name="contraseña"
            rules="required"
          >
            <b-input v-model="form.password" :state="errors[0] ? false : valid ? true : null" type="password"
                     placeholder="Password"/>
            <b-form-invalid-feedback :state="valid">
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </validation-provider>
        </b-form-group>
        <b-button variant="primary" block type="submit" :disabled="invalid">Login</b-button>
        <nuxt-link v-slot="{href, isActive, navigate}" :to="{name: 'register'}" custom>
          <b-button variant="link" block :href="href" :active="isActive" @click="navigate">
            You dont have account?, click here!
          </b-button>
        </nuxt-link>
      </b-form>
    </validation-observer>
  </div>
</template>

<script>
export default {
  name: 'Index',
  layout: 'auth',
  auth: 'guest',
  data() {
    return {
      form: {
        email: '',
        password: '',
      }
    }
  },
  methods: {
    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: this.form,
        })
      } catch ({response}) {
        this.$toast.error(response.data.message)
      }
    }
  }
}
</script>
