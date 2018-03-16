<template>
  <v-container style="text-align: left" grid-list-md>
    <h2>Select a project:</h2>
    <v-layout row wrap>
      <v-flex xs12 sm6 v-for="project in projects" :key="project.id">
        <v-card color="indigo lighten-5">
          <v-card-title primary-title>
            <div>
              <div class="headline">{{ project.name }}</div>
              <span>{{ project | json }}</span>
            </div>
          </v-card-title>
          <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat fab small @click.stop="openProject(project.id)">
                <v-icon>forward</v-icon>
              </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'project-list-page',
  computed: {
    projects () {
      return this.$store.state['Redmine'].projects
    }
  },
  methods: {
    openProject (id) {
      this.$router.push({ name: 'issue-form-page', params: { id } })
    }
  },
  mounted () {
    this.$store.dispatch('Redmine/LOAD_PROJECTS')
  }
}
</script>

<style>
.project-wrapper {
    padding-left: 0;
    padding-right: 5px;
    margin-bottom: 10px;
}

.project-wrapper:nth-child(2n) {
    padding-left: 5px;
    padding-right: 0;
}
</style>
