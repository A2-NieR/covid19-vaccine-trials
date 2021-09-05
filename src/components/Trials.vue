<template>
  <div class="container pt-3">
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
      <div class="col" v-for="vax in vaccines" :key="vax.id">
        <div class="card text-center shadow">
          <div class="card-header fs-5 bg-primary text-white">
            {{ vax.name }}
          </div>
          <div class="card-body">
            <span>Active Trials: {{ vax.activeTrials }}</span>
            <p class="text-success pt-1">
              Completed Trials: {{ vax.completedTrials }}
            </p>
            <router-link
              :to="{
                name: 'details',
                params: { id: vax.id, vax: JSON.stringify(vax) }
              }"
              >Details</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import data from '../assets/vaccines.json'

export default {
  setup() {
    const vaccines = []

    // Extract data from sessionStorage
    for (let i = 0; i < sessionStorage.length; i++) {
      vaccines.push(JSON.parse(sessionStorage.getItem(data.vaccines[i].name)))
    }

    return { vaccines }
  }
}
</script>

<style></style>
