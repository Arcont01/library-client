<template>
  <div>
    <h1 class="font-weight-bold text-center">Sign Up</h1>
    <validation-observer v-slot="{ invalid }">
      <b-form @submit.prevent="submitForm">
        <b-form-group>
          <validation-provider
            v-slot="{ valid, errors }"
            name="name"
            rules="required|alpha_spaces"
          >
            <b-input
              id="name"
              v-model="form.name"
              :state="errors[0] ? false : valid ? true : null"
              placeholder="Name"
            ></b-input>
            <b-form-invalid-feedback :state="valid">
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </validation-provider>
        </b-form-group>
        <b-form-group>
          <validation-provider
            v-slot="{ valid, errors }"
            name="e-mail"
            rules="required|email"
          >
            <b-input
              v-model="form.email"
              :state="errors[0] ? false : valid ? true : null"
              placeholder="E-mail"
              type="email"
            ></b-input>
            <b-form-invalid-feedback :state="valid">
              {{ errors[0] }}
            </b-form-invalid-feedback>
          </validation-provider>
        </b-form-group>
        <b-form-row>
          <b-form-group class="col-lg-6">
            <validation-provider
              v-slot="{ valid, errors }"
              name="password"
              rules="required|min:8|confirmed:confirmation"
            >
              <b-form-input
                id="password"
                v-model="form.password"
                :state="errors[0] ? false : valid ? true : null"
                type="password"
                placeholder="Password"
              ></b-form-input>
              <b-form-invalid-feedback :state="valid">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </validation-provider>
          </b-form-group>
          <b-form-group class="col-lg-6">
            <validation-provider
              v-slot="{ valid, errors }"
              name="confirmation"
              rules="required"
              vid="confirmation"
            >
              <b-form-input
                id="password_confirmation"
                v-model="form.password_confirmation"
                :state="errors[0] ? false : valid ? true : null"
                type="password"
                placeholder="Password confirmation"
              ></b-form-input>
              <b-form-invalid-feedback :state="valid">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </validation-provider>
          </b-form-group>
        </b-form-row>
        <b-button
          type="submit"
          :disabled="invalid"
          variant="primary"
          block
        >Sign Up</b-button
        >
        <NuxtLink v-slot="{isActive, href, navigate}" :to="{ name: 'index' }" custom>
          <b-button variant="link" block :active="isActive" :href="href" @click="navigate"
          >I have account, login</b-button
          >
        </NuxtLink>
      </b-form>
    </validation-observer>
  </div>
</template>

<script>
export default {
  name: "Register",
  layout: 'auth',
  auth: 'guest',
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
    }
  },
  methods: {
    async submitForm() {
      try {
        await this.$axios.post('register', this.form)
        await this.$auth.loginWith('local', {
          data: {
            email: this.form.email,
            password: this.form.password,
          },
        })
      } catch ({ response }) {
        this.$toast.error(response.data.message)
      }
    },
  },

}
</script>

<style scoped>

</style>
