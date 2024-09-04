<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { supabase } from "../../main";
  import TaskItem from "$lib/components/TaskItem.svelte";

  let dailyMissions: any[] = [];
  let weeklyMissions: any[] = [];
  let monthlyMissions: any[] = [];
  
  // Object to store task statuses
  let taskStatuses: { [key: number]: boolean } = {};

  export let data;
  let { session } = data;
  



  onMount(async () => {
    await fetchmission();
    // Fetch statuses for all tasks
    await fetchTaskStatuses();

  });

  onDestroy(() => {
    // Clean up if needed
  });


  async function fetchmission() {
    const { data: dailyData, error: dailyError } = await supabase
      .from("mission")
      .select("*")
      .eq("category", "daily");
    if (dailyError) {
      console.error("Error fetching daily tasks:", dailyError.message);
    } else {
      dailyMissions = dailyData;
    }
    const { data: weeklyData, error: weeklyError } = await supabase
      .from("mission")
      .select("*")
      .eq("category", "weekly");
    if (weeklyError) {
      console.error("Error fetching weekly tasks:", weeklyError.message);
    } else {
      weeklyMissions = weeklyData;
    }
    const { data: monthlyData, error: monthlyError } = await supabase
      .from("mission")
      .select("*")
      .eq("category", "monthly");
    if (monthlyError) {
      console.error("Error fetching monthly tasks:", monthlyError.message);
    } else {
      monthlyMissions= monthlyData;
    }
  }

  async function fetchTaskStatuses() {
  try {
    const { data, error } = await supabase
      .from("tasks")
      .select('taskid , isCompleted')
      .eq("taskuser", session?.user.id);

    if (error) {
      console.error("Error fetching tasks:", error.message);
    } else {
      // Iterate over fetched data and append to taskStatuses object
      data.forEach(task => {
        taskStatuses[task.taskid] = task.isCompleted;
      });
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
    
</script>

<svelte:head>
  <title>Tasks</title>
</svelte:head>

<div>
  <div>
    <h2 class="my-2 text-3xl font-bold">Tasks</h2>
  </div>

  <div class="flex flex-col gap-y-4">
    <div>
      <h2 class="text-2xl font-bold">Daily</h2>
      <div class="flex flex-col mx-2 my-2 px-2 py-6 cardGradientBackground shadowEffect rounded-[var(--card-border-radius)]">
        {#each dailyMissions as mission,i}
          <TaskItem
            taskMission={mission.mission}
            isCompleted={taskStatuses[i+1]}
            experiencePoints={mission.experiencePoints}
          />
        {/each}
      </div>
    </div>

    <div>
      <h2 class="text-2xl font-bold">Weekly</h2>
      <div class="flex flex-col mx-2 my-2 px-2 py-6 cardGradientBackground shadowEffect rounded-[var(--card-border-radius)]">
        {#each weeklyMissions as mission,i}
          <TaskItem
            taskMission={mission.mission}
            isCompleted={taskStatuses[i+4]}
            experiencePoints={mission.experiencePoints}
          />
        {/each}
      </div>
    </div>

    <div>
      <h2 class="text-2xl font-bold">Monthly</h2>
      <div class="flex flex-col mx-2 my-2 px-2 py-6 cardGradientBackground shadowEffect rounded-[var(--card-border-radius)]">
        {#each monthlyMissions as mission,i}
          <TaskItem
            taskMission={mission.mission}
            isCompleted={taskStatuses[i+7]}
            experiencePoints={mission.experiencePoints}
          />
        {/each}
      </div>
    </div>
  </div>
</div>
