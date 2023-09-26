<template>
  <div>
    <button type="button" @click="createCounterHandler">Create Counter</button>

    <div v-for="(counter) in counters" :key="counter.id">
      <h3>{{ counter.label }}</h3>
      <p>Count: {{ counter.currentCount }}</p>
      <button type="button" @click="counterDecreaseHandler(counter)">Decrease</button>
      <button type="button" @click="counterIncreaseHandler(counter)">Increase</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Counter } from './core';
const [createCounter, getAllCounters, counterIncrease, counterDecrease] = useCounter()

let counters: Counter[] = reactive([]);
onMounted(() => {
  Object.assign(counters, getAllCounters())
})

const createCounterHandler = () => {
  const counter = createCounter()

  counters.push(counter)
}

const counterIncreaseHandler = (counter: Counter) => Object.assign(counter, counterIncrease(counter))


const counterDecreaseHandler = (counter: Counter) => Object.assign(counter, counterDecrease(counter))
</script>
