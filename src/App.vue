<template>
  <div>
    <h1>Covid-19 Vaccine Trials</h1>
    <p>Test</p>
  </div>
</template>

<script>
import data from './assets/vaccines.json'

export default {
  setup() {
    const getTrials = async () => {
      try {
        for (let i = 0; i < data.vaccines.length; i++) {
          const rawData = await fetch(
            `https://clinicaltrials.gov/api/query/study_fields?expr=${data.vaccines[i].id}&fields=Condition,OfficialTitle,Phase,StartDate,CompletionDate,LastUpdatePostDate,EnrollmentCount,NCTId&fmt=json`
          ).then((res) => res.json())

          const trialData = rawData.StudyFieldsResponse.StudyFields

          // Check active/completed status
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
        }
      } catch (error) {
        console.error(error.message)
      }
    }

    // TODO: Check sessionStorage content
    if (sessionStorage.length === 0) {
      console.log('Get data from API...')
      getTrials()
      console.log(window.sessionStorage)
    } else {
      console.log('Data in session storage: ')
      console.log(window.sessionStorage)
    }

    return {}
  }
}
</script>

<style></style>
