<script>
  import MobileHeader from "$lib/components/MobileHeader.svelte";
  import ForumsItem from "$lib/components/ForumsItem.svelte";
  import { onMount } from "svelte";
  import { supabase } from "../../main";




  /**
   * @type {any[]}
   */
  let forums = []; 

  async function fetchForums() {
    const { data, error } = await supabase.from('forums').select('*');
    if (error) {
        console.error('Error fetching forums:', error.message);
        return [];
    } else {
        return data;
    }
}

  onMount(async () => {
    forums = await fetchForums();
  });

</script>

<svelte:head>
  <title>Forums</title>
</svelte:head>

<div>
  <div>
    <h2 class="my-2 text-3xl font-bold">Forums</h2>
  </div>

  <div>
    {#each forums as forum}
      <a href="forums/{forum.id}">
        <ForumsItem
          itemThumbnail={forum.thumbnail}
          itemTitle={forum.title}
          itemDescription={forum.description}
          itemId = {forum.id}
        ></ForumsItem>
      </a>
    {/each}
  </div>
</div>
