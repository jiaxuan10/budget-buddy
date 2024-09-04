<script lang="ts">
  import { truncateNumber } from "$lib/utils/utils";
  export let itemThumbnail: string;
  export let itemTitle: string;
  export let itemTags: string[];
  export let views: number;
  export let likes: number;
  export let comments: number;
</script>

<div class="rounded-[var(--card-border-radius)] shadowEffect">
  <div class="flex flex-col sm:flex-row">
    {#if itemThumbnail}
      <img
        src={itemThumbnail}
        alt="article Thumbnail"
        class="object-contain h-50 w-96 rounded-t md:rounded-l md:rounded-tr-[0px]"
      />
    {/if}

    <div
      class="flex flex-col cardGradientBackground {itemThumbnail
        ? 'rounded-b-[var(--card-border-radius)] sm:rounded-bl-none sm:rounded-r-[var(--card-border-radius)] '
        : 'rounded-[var(--card-border-radius)]'} w-full px-[var(--x-padding-cards)] py-[var(--y-padding-cards)] overflow-hidden"
    >
      <div
        class="flex flex-col w-full px-[var(--x-padding-cards)] py-[var(--y-padding-cards)]"
      >
        <h1 class="flex-1 font-bold text-xl max-h-[80px] overflow-hidden">
          {itemTitle}
        </h1>
        <div class="flex py-2 items-center text-sm mb-[15px] overflow-auto">
          {#each itemTags as tag}
            <div
              class="border-[3px] shadow-[rgba(0,0,0,0.15)_1.95px_1.95px_2.6px] px-2.5 py-[5px] m-1 rounded-[40px]"
            >
              {tag}
            </div>
          {/each}
        </div>
        <div
          class="container flex items-center pr-[50px] justify-between mt-0.5 mt-[7px]"
        >
          <p class="text-[11px]">{truncateNumber(views)} Views</p>
          <p class="text-[11px]">{truncateNumber(likes)} Likes</p>
          <p class="text-[11px]">{truncateNumber(comments)} Comments</p>
        </div>
      </div>
    </div>
  </div>
</div>
