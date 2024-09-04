<script lang="ts">
  export let taskMission: String;
  export let isCompleted: boolean;
  export let experiencePoints: number;
</script>

<div class="flex bg-transparent backdrop-blur-lg rounded-full w-full px-7 py-2 my-2">
  <div class="flex-1 w-[60%] flex-row my-auto">
    <p class="font-bold text-lg text-[var(--color-text)] truncate">
      {taskMission}
    </p>
    <p class="truncate text-[var(--color-text-inactive)]">
      {isCompleted ? "Completed" : "Incomplete"}
    </p>
  </div>
  <div class="flex text-lg m-auto font-bold	{isCompleted ? "text-green-600" : "text-red-600"}"><h3>{experiencePoints} XP</h3></div>
</div>
