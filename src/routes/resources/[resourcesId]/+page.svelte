<script lang="ts">
  import { onMount } from "svelte";
  import { supabase } from "../../../main";
  import leftarrow from "$lib/images/arrow.png";
  import { page } from "$app/stores";

  const resourcesId = $page.params.resourcesId;
  let isLoading = true;
  let resources: any;

  async function fetchResources() {
    const { data, error } = await supabase
      .from("resources")
      .select("*")
      .eq("id", resourcesId)
      .single();

    if (error) {
      console.error("Error fetching resources:", error.message);
    } else {
      if (data) {
        resources = data;
      } else {
        console.error("Resources not found.");
      }
      isLoading = false;
    }
  }
  function formatDate(timestamp: string | number | Date) {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }

  onMount(fetchResources);
</script>

{#if isLoading}
  <div>Loading...</div>
{:else}
  <div class="-m-4 md:-m-6">
    <div
      class="flex items-center bg-[#060047] h-[8vh] justify-start px-[15px] w-[100%] md:hidden fixed"
    >
      <a href="/resources" class="w-[35px] h-[35px]">
        <img src={leftarrow} alt="" />
      </a>
    </div>
  </div>

  <section class="mt-[10vh]">
    <h1 class="text-3xl font-bold tracking-wide mb-3">{resources.itemTitle}</h1>
    <div class="flex flex-row justify-between mt-5">
      <p>{resources.author}</p>
      <p class="text-right">{formatDate(resources.created_at)}</p>
    </div>
    <img src={resources.itemThumbnail} alt="" class="rounded-lg mt-3" />
    <div class="mt-5 text-l tracking-wide" style="white-space: pre-line;">
      {resources.content}
    </div>
  </section>
{/if}
