<template>
  <div>
    <div class="alert alert-secondary">
      <p class="pt-3">
        This tools is intended to give an overview of clinical trials of current
        Covid-19 vaccines.
      </p>
      <p class="px-3">
        The data is gathered directly from
        <a href="https://www.clinicaltrials.gov">clinicaltrials.gov</a> using
        their API. Visiting the Details of each vaccine reveals a table with the
        clinical trial data. Each trial can be visited by clicking the link at
        the end of each row in the table.
      </p>
    </div>
    <button class="btn btn-primary mt-3" @click="toTrials">Show Trials</button>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()

    const toTrials = () => {
      router.push('trials')
    }

    return { toTrials }
  }
}
</script>

<style></style>
