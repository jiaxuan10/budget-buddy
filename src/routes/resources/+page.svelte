<script lang="ts">
  import { onMount } from 'svelte';
  import ResourceItem from "$lib/components/ResourcesItem.svelte";
  import { supabase } from "../../main";

  let resources: any[] = [];

  onMount(async () => {
    const { data, error } = await supabase.from('resources').select('*');
    if (error) {
      console.error('Error fetching resources:', error.message);
    } else {
      resources = data;
    }
  });
</script>

<svelte:head>
  <title>Resources</title>
</svelte:head>

<div>
  <div>
    <h2 class="my-2 text-3xl font-bold">Resources</h2>
  </div>

  <div class="flex flex-col gap-y-4">
    {#each resources as resource}
    <a href="resources/{resource.id}">
      <ResourceItem
      itemThumbnail = {resource.itemThumbnail}
      itemTitle= {resource.itemTitle}
      itemTags= {resource.itemTags}
      views={resource.views}
      likes={resource.likes}
      comments={resource.comments}
      author = {resource.author}
      />
    </a>
    {/each}
  </div>
</div>
