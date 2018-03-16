<template>
  <v-content style="padding: 0">
    <div id="image-editor">
      <canvas ref="canvas"></canvas>
    </div>
    <v-speed-dial 
      v-model="fab"
      right
      bottom
      fixed
      direction="left"
      transition="slide-x-reverse-transition"
    >
      <v-btn slot="activator" color="indigo" dark fab v-model="fab">
        <v-icon>menu</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
      <v-btn fab dark small color="blue darken-2">
        <v-icon>crop_landscape</v-icon>
      </v-btn>
      <v-btn fab dark small color="blue darken-2">
        <v-icon>panorama_fish_eye</v-icon>
      </v-btn>
      <v-btn fab dark small color="blue darken-2">
        <v-icon>text_fields</v-icon>
      </v-btn>
      <v-btn fab dark small color="green">
        <v-icon>save</v-icon>
      </v-btn>
      <v-btn fab dark small color="red">
        <v-icon>delete</v-icon>
      </v-btn>
    </v-speed-dial>
  </v-content>
</template>

<script>
import { fabric } from 'fabric'

export default {
  name: 'image-editor-page',
  data: () => ({
    fabric: null,
    fab: null
  }),
  computed: {
    width () { return (this.$el ? this.$el.clientWidth : 800) },
    height () { return (this.$el ? (this.$el.clientHeight) : 600) },
    context () {
      return this.$refs.canvas ? this.$refs.canvas.getContext('2d') : null
    }
  },
  methods: {
    init () {
      this.fabric = new fabric.Canvas(this.$refs.canvas)

      console.log('width', this.$el.clientWidth)
      this.fabric.setWidth(this.$el.clientWidth)
      console.log('height', this.$el.clientHeight)
      this.fabric.setHeight(this.$el.clientHeight)

      const rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: 'red',
        width: 20,
        height: 20
      })

      this.fabric.add(rect)
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style>
#image-editor {
  width: 100%;
  height: 50vh;
  max-height: 90vh;
  border: 1px solid #888888;
  box-shadow: 3px 4px #888888;
}
</style>
