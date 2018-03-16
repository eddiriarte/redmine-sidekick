<template>
<v-card>
  <v-container grid-list-md fluid>
    <v-layout wrap>
      <v-flex xs12 sm6>
        <v-text-field label="First name" required v-model="issue.first"></v-text-field>
      </v-flex>
      <v-flex xs12 sm6>
        <v-text-field label="Last name" v-model="issue.last" required></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field multi-line v-model="issue.bio">
          <div slot="label">
            Bio <small>(optional)</small>
          </div>
        </v-text-field>
      </v-flex>
      <v-flex xs12 sm6>
        <v-select label="Favorite animal" v-model="issue.favoriteAnimal" required :items="['a', 'b', 'c']"></v-select>
      </v-flex>
      <v-flex xs12 sm6>
        <v-slider label="Age" hint="Be honest" min="1" max="100" thumb-label v-model="issue.age"></v-slider>
      </v-flex>
      <v-flex xs12>
        <v-checkbox v-model="issue.terms">
          <div slot="label" @click.stop="">
            Do you accept the
            <a href="javascript:;" @click.stop="terms = true">terms</a>
            and
            <a href="javascript:;" @click.stop="conditions = true">conditions?</a>
          </div>
        </v-checkbox>
      </v-flex>
    </v-layout>
  </v-container>
  <v-card-actions class="indigo" dark>
    <v-btn flat dark>Cancel</v-btn>
    <v-spacer></v-spacer>
    <v-btn outline dark>Create Issue</v-btn>
  </v-card-actions>
</v-card>
</template>

<script>
export default {
  name: 'issue-form-page',
  data: () => ({
    issue: {}
  }),
  mounted () {
    console.log(this.$router.currentRoute)
    const projectId = this.$router.currentRoute.params.id
    this.$store.dispatch('Redmine/LOAD_SELECTED_PROJECT', { projectId })
  }
}
</script>
