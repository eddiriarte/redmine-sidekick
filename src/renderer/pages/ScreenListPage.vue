<template>
  <v-container style="text-align: left" grid-list-md>
    <v-layout row wrap>
      <v-flex md6 v-for="display in screens" :key="display.id">
        <v-card dark color="indigo darken-5">
          <v-card-media height="240px" :src="display.thumbnail.toDataURL()"></v-card-media>
          <v-card-actions>
              {{ display.name }}
              <v-spacer></v-spacer>
              <v-btn flat fab small @click.stop="captureScreen(display)">
                <v-icon>add_a_photo</v-icon>
              </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'screen-list-page',
  data: () => ({
    screens: [],
    capturerOptions: {
      types: ['window', 'screen'],
      thumbnailSize: {
        width: 640,
        height: 480
      }
    }
  }),
  computed: {
    capturer () { return this.$electron.desktopCapturer }
  },
  methods: {
    loadScreenSources () {
      const self = this
      self.capturer.getSources(self.capturerOptions, (e, sources) => {
        self.screens = sources || []
      })
    }
  },
  mounted () {
    this.loadScreenSources()
  }
}
</script>
