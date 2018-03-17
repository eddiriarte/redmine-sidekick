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
    <video style="display:none;" autoplay></video>
    <canvas style="display:none;"></canvas>
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
    capturer () { return this.$electron.desktopCapturer },
    videoEl () { return this.$el.querySelector('video') },
    canvasEl () { return this.$el.querySelector('canvas') },
    homeDir () { return this.$electron.remote.app.getPath('desktop') }
  },
  methods: {
    loadScreenSources () {
      const self = this
      self.capturer.getSources(self.capturerOptions, (e, sources) => {
        self.screens = sources || []
      })
    },
    captureScreen (source) {
      const scope = this
      window.navigator.webkitGetUserMedia({
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: source.id,
            minWidth: 1280,
            maxWidth: 1280,
            minHeight: 900,
            maxHeight: 900
          }
        }
      }, (stream) => {
        scope.videoEl.src = URL.createObjectURL(stream)
        setTimeout(scope.saveImage.bind(scope), 300)
      }, (error) => { console.error('webkitGetUserMedia failed', error) })
    },
    saveImage () {
      this.canvasEl.width = 1280
      this.canvasEl.height = 900
      const context = this.canvasEl.getContext('2d')
      context.drawImage(this.videoEl, 0, 0, 1280, 900)
      const dataURL = this.canvasEl.toDataURL('image/png')
      const image = this.$electron.nativeImage.createFromDataURL(dataURL)
      const path = `${this.homeDir}/redmine-test-123.png`
      this.$fs.writeFile(path, image.toPng(), () => {
        console.log('image was saved')
      })
    }
  },
  mounted () {
    this.loadScreenSources()
  }
}
</script>
