<template>
  <div class="container pt-3">
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
      <div class="col" v-for="vax in vaccines" :key="vax.id">
        <div class="card text-center shadow">
          <div class="card-header fs-5">
            {{ vax.name }}
          </div>
          <div class="card-body">
            <p class="text-secondary">Active Trials: {{ vax.activeTrials }}</p>
            <p class="text-success">
              Completed Trials: {{ vax.completedTrials }}
            </p>
            <a href="#" class="btn btn-link">Details</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['vaccines'],
  setup(props) {
    const vaccines = []
    for (let i = 0; i < sessionStorage.length; i++) {
      vaccines.push(JSON.parse(sessionStorage.getItem(props.vaccines[i].name)))
    }

    return { vaccines }
  }
}
</script>

<style></style>
