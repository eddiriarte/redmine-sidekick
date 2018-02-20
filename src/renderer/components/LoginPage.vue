<template>
  <v-card>
    <v-card-title>
      <h3>Login</h3>
    </v-card-title>
    <v-card-text>
      <v-text-field label="Name" v-model="name" :counter="10" required></v-text-field>
      <v-text-field label="E-mail" v-model="email" required></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn>Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    name: 'login-page',
    data () {
      return {
        name: '',
        email: ''
      }
    }
  }
</script>
