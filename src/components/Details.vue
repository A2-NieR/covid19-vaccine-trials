<template>
  <div class="container px-0">
    <div class="d-flex justify-content-center">
      <button class="btn btn-primary mb-2" @click="toTrials">Go back</button>
    </div>
    <div class="d-flex p-3 mt-4 justify-content-evenly alert alert-secondary">
      <div>
        <span class="fw-bold">Vaccine Name: </span><span>{{ vax.name }}</span>
      </div>
      <div>
        <span class="fw-bold">Tradename: </span>
        <span>{{ vax.tradeName }}</span>
      </div>
      <div>
        <span class="fw-bold">Vaccine Type: </span>
        <span>{{ vax.type }}</span>
      </div>
    </div>
    <div class="table-responsive-sm">
      <table class="table table-hover text-start">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Phase</th>
            <th>Start Date</th>
            <th>Completion Date</th>
            <th>Last Update</th>
            <th>Participants</th>
            <th>NCTId</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="trial in vax.trials"
            :key="trial.NCTId"
            :class="setRowColor(trial.CompletionDate[0])"
          >
            <th scope="row">{{ trial.Rank }}</th>
            <td>{{ trial.OfficialTitle[0] }}</td>
            <td>{{ trial.Phase[0] }}</td>
            <td>{{ trial.StartDate[0] }}</td>
            <td>{{ trial.CompletionDate[0] }}</td>
            <td>{{ trial.LastUpdatePostDate[0] }}</td>
            <td>{{ trial.EnrollmentCount[0] }}</td>
            <td>
              <a
                :href="`https://clinicaltrials.gov/ct2/show/study/${trial.NCTId[0]}`"
                target="_blank"
                >{{ trial.NCTId[0] }}</a
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  props: ['vax'],
  setup(props) {
    const router = useRouter()
    const vax = JSON.parse(props.vax)

    const toTrials = () => {
      router.push('/trials')
    }

    const setRowColor = (compDate) => {
      if (new Date(compDate) < new Date()) {
        return 'table-success'
      } else {
        return ''
      }
    }

    return { vax, toTrials, setRowColor }
  }
}
</script>

<style></style>
