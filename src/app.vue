<template>
  <main class="p-10">
    <section>
      <h2 class="mb-2 text-xs text-subtle font-medium uppercase tracking-wider">
        Current
      </h2>

      <p
        v-if="modes"
        class="text-3xl font-semibold"
        :class="
          modes.currentRankedMode.name == 'Splat Zones' ? 'text-primary' : null
        "
      >
        {{ modes.currentRankedMode.name }}
      </p>
    </section>

    <div class="h-10" />

    <section>
      <h2 class="mb-2 text-xs text-subtle font-medium uppercase tracking-wider">
        Upcoming
      </h2>

      <ul class="space-y-2">
        <li
          v-for="mode in modes.upcomingRankedModes"
          :key="mode.startTime"
          class="px-3 h-10 sm:max-w-xs text-sm dark:bg-surface bg-gray-50 rounded-lg flex items-center justify-between"
          :class="mode.name == 'Splat Zones' ? 'text-primary' : null"
        >
          <span>{{ mode.name }}</span>
          <time
            class="text-xs tracking-wider font-medium"
            :class="mode.name == 'Splat Zones' ? 'text-primary' : 'text-subtle'"
          >
            {{ format(mode.startTime * 1000, "HH:mm") }}
          </time>
        </li>
      </ul>
    </section>
  </main>
</template>

<script setup lang="ts">
import { onUnmounted, ref } from "vue";
import { getTime, endOfHour, format } from "date-fns";
import { getRankedModes } from "./util/get-ranked-modes";

let modes = ref<Modes>({
  currentRankedMode: {} as ModeDetail,
  upcomingRankedModes: [] as ModeDetail[],
});

let initialTime = Date.now();
// update once the hour changes
let timeToUpdate = getTime(endOfHour(initialTime));

getRankedModes().then((res) => (modes.value = res));

const interval = setInterval(() => {
  let currentTime = Date.now();
  let shouldFetch = currentTime > timeToUpdate;

  if (shouldFetch) {
    getRankedModes().then((res) => (modes.value = res));

    // prepare for a new hour
    initialTime = currentTime;
    timeToUpdate = getTime(endOfHour(initialTime));
  }
}, 1000);

onUnmounted(() => clearInterval(interval));
</script>
