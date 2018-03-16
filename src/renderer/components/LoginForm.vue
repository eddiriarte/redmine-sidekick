<template>
<v-card>
    <v-card-title><h3>Credentials</h3></v-card-title>
    <v-card-text>
        <v-text-field label="Redmine-URL" v-model="url" required></v-text-field>
        <template v-if="loginByUsernameAndPassword">
            <v-text-field label="Username" v-model="auth.username" required></v-text-field>
            <v-text-field label="Password" v-model="auth.password" type="password" required></v-text-field>
        </template>
        <template v-else-if="loginByApiKey">
            <v-text-field label="API-Key" v-model="auth.apiKey" required></v-text-field>
        </template>
    </v-card-text>
    <v-card-actions>
        <v-btn @click="setAuthType('username-password')" v-if="!loginByUsernameAndPassword" flat>login with Username/Password</v-btn>
        <v-btn @click="setAuthType('api-key')" v-if="!loginByApiKey" flat>login with API-Key</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="$emit('add', { url, auth })" color="indigo" dark>Save & Login</v-btn>
    </v-card-actions>
</v-card>
</template>

<script>
import { RedmineApiKey, RedmineUsernamePassword } from '@/libs/Redmine/Credentials'

export default {
  name: 'login-form',
  data: () => ({
    auth: new RedmineUsernamePassword(),
    url: null
  }),
  computed: {
    loginByApiKey () { return this.auth instanceof RedmineApiKey },
    loginByUsernameAndPassword () { return this.auth instanceof RedmineUsernamePassword }
  },
  methods: {
    setAuthType (type) {
      if (type === 'username-password') {
        this.auth = new RedmineUsernamePassword()
      } else if (type === 'api-key') {
        this.auth = new RedmineApiKey()
      }
    }
  }
}
</script>
