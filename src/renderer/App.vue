<template>
<v-app id="inspire">
  <v-navigation-drawer class="no-drag" fixed v-model="drawer" app>
    <v-list dense>
      <v-list-tile v-for="tile in sidebarDemo" :key="tile.label" @click.stop="to(tile.route)">
        <v-list-tile-action>
          <v-icon>{{tile.icon}}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{tile.label}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
  <main-toolbar @drawer="drawer = !drawer"></main-toolbar>
  <v-content>
    <v-container fluid fill-height id="app-wrapper">
      <v-layout justify-center align-center>
        <v-flex text-xs-center>
          <router-view></router-view>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</v-app>
</template>

<script>
import MainToolbar from './components/MainToolbar'

export default {
  name: 'redmine-sidekick',
  components: { MainToolbar },
  data: () => ({
    drawer: null,
    sidebarDemo: [
      { icon: 'home', label: 'Home', route: '#/' },
      { icon: 'view_headline', label: 'Projects', route: '#/projects' },
      { icon: 'insert_drive_file', label: 'Issue Form', route: '#/issue' },
      { icon: 'camera', label: 'Screen Sources', route: '#/screens' },
      { icon: 'wallpaper', label: 'Image Editor', route: '#/editor' }
    ]
  }),
  methods: {
    echo (msg) { console.log(msg) },
    to (route) {
      console.log('goto', route)
      location.hash = route
    }
  }
}
</script>

<style>
#app-wrapper, .no-drag {
  -webkit-app-region: no-drag;
}
</style>
