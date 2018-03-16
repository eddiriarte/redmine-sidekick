<template>
  <v-container>
    <login-form @add="addNewCredentials"></login-form>
  </v-container>
</template>

<script>
import LoginForm from '@/components/LoginForm'
import RedmineClient from '@/libs/Redmine/Client'

export default {
  name: 'login-page',
  components: { LoginForm },
  data () {
    return {
      credentials: []
    }
  },
  methods: {
    addNewCredentials (credentials) {
      const redmine = new RedmineClient(credentials.url)
      redmine.login(credentials.auth)
        .then((user) => {
          this.$store.commit('Redmine/SET_CONNECTION', { connection: redmine })
          this.$store.commit('Redmine/SET_USER', { user })

          this.$router.push('projects')
        })
        .catch((e) => {
          console.error(e)
        })
    }
  }
}
</script>
