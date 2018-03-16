<template>
  <v-toolbar color="indigo" dark fixed app>
    <v-toolbar-side-icon class="no-drag" @click.stop="$emit('drawer')"></v-toolbar-side-icon>
    <v-toolbar-title>Redmine Sidekick</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn class="no-drag" icon @click.stop="minimize"><v-icon>minimize</v-icon></v-btn>
    <v-btn class="no-drag" icon @click.stop="close"><v-icon>close</v-icon></v-btn>
  </v-toolbar>
</template>

<script>
export default {
  name: 'main-toolbar',
  methods: {
    minimize () {
      this.$electron.remote.getCurrentWindow().minimize()
    },
    close () {
      window.close()
    }
  }
}
</script>
