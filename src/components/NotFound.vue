<template>
  <div class="alert alert-danger">
    <h2 class="display-5">404</h2>
    <p>
      This page not found. Go directly to
      <a href="" @click="toTrials">Trials</a> or head back
      <a href @click="toHome">Home</a>.
    </p>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()

    const toHome = () => {
      router.push('/')
    }

    const toTrials = () => {
      router.push('/trials')
    }

    return { toHome, toTrials }
  }
}
</script>

<style></style>
