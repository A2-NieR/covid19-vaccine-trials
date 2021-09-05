<template>
  <div class="container">
    <div class="row row-cols-1 row-md-cols-2 g-5">
      <div class="col col-md-7 col-lg-8 col-xl-9 d-flex flex-column">
        <p class="py-3 fs-5">
          This tools is intended to give an overview of clinical trials of
          current Covid-19 vaccines.
        </p>
        <p class="py-3 fs-5">
          The data is gathered directly from
          <a href="https://www.clinicaltrials.gov">clinicaltrials.gov</a> using
          their API. Visiting the Details of each vaccine reveals a table with
          the clinical trial data. Each trial can be visited by clicking the
          link at the end of each row in the table.
        </p>
        <div class="visually-hidden">{{ reqCounter }}</div>
        <button
          type="button"
          v-if="store.length === vaccines.length"
          class="btn btn-primary align-self-center shadow-sm w-25 mt-3"
          @click="toTrials"
        >
          Show Trials
        </button>
        <button
          type="button"
          v-else
          class="btn btn-primary align-self-center shadow-sm w-25 mt-3"
          @click="toTrials"
          disabled
        >
          Loading...
        </button>
      </div>
      <div class="col col-md-5 col-lg-4 col-xl-3">
        <h5 class="mt-3 mb-4">Current vaccines & trials:</h5>
        <ul class="list-group shadow">
          <li
            v-for="vax in vaccines"
            :key="vax.id"
            class="
              d-flex
              justify-content-between
              list-group-item list-group-item-primary
            "
          >
            {{ vax.name }}
            <span
              v-if="vaccines.length === store.length"
              class="badge bg-primary rounded-pill"
              >{{ setBadge(vax.name) }}</span
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import data from '../assets/vaccines.json'

export default {
  setup() {
    const router = useRouter()
    const vaccines = data.vaccines
    const store = sessionStorage
    let reqCounter = ref(0)

    const getTrials = async () => {
      try {
        for (let i = 0; i < data.vaccines.length; i++) {
          // API requests for each vaccine
          const rawData = await fetch(
            `https://clinicaltrials.gov/api/query/study_fields?expr=${data.vaccines[i].id}&fields=Condition,OfficialTitle,Phase,StartDate,CompletionDate,LastUpdatePostDate,EnrollmentCount,NCTId&fmt=json`
          ).then((res) => res.json())

          const trialData = rawData.StudyFieldsResponse.StudyFields

          // Check active/completed status of each trial in res data
          let active = 0
          let completed = 0

          for (let i = 0; i < trialData.length; i++) {
            if (new Date(trialData[i].CompletionDate) - new Date() >= 0) {
              active++
            } else {
              completed++
            }
          }

          data.vaccines[i].trials = trialData
          data.vaccines[i].activeTrials = active
          data.vaccines[i].completedTrials = completed

          sessionStorage.setItem(
            data.vaccines[i].name,
            JSON.stringify(data.vaccines[i])
          )

          // sessionStorage.setItem('counter', JSON.stringify(i + 1))
          reqCounter.value = i + 1
        }
      } catch (error) {
        console.error(error.message)
      }
    }

    // Send requests only when not in sessionStorage
    if (sessionStorage.length < data.vaccines.length) {
      console.log('Get data from API...')
      getTrials()
    } else {
      console.log('Data already in session storage')
    }

    // Go to trials
    const toTrials = () => {
      router.push('trials')
    }

    // Trial counter in overview list
    const setBadge = (vaxName) => {
      const vaxData = JSON.parse(store.getItem(vaxName))
      return vaxData.trials.length
    }

    return { toTrials, vaccines, store, setBadge, reqCounter }
  }
}
</script>

<style></style>
