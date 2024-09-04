<script lang="ts">
  import person_picture from "$lib/images/Person.png";
  export let itemThumbnail: string | undefined = undefined;
  export let itemTitle: string;
  export let itemDescription: string;
</script>

<div
  class="rounded-[var(--card-border-radius)] my-[var(--y-margin-cards)] shadowEffect"
>
  <div class="flex flex-col sm:flex-row my-[var(--y-margin-cards)]">
    {#if itemThumbnail}
      <img
        src={itemThumbnail}
        alt="article Thumbnail"
        class="object-contain h-50 w-96"
      />
    {/if}
    <div
      class="flex cardGradientBackground {itemThumbnail
        ? 'rounded-b-[var(--card-border-radius)] sm:rounded-bl-none sm:rounded-r-[var(--card-border-radius)] '
        : 'rounded-[var(--card-border-radius)]'} w-full px-[var(--x-padding-cards)] py-[var(--y-padding-cards)]"
    >
      <div
        class="flex flex-row w-full px-[var(--x-padding-cards)] py-[var(--y-padding-cards)]"
      >
        <div class="flex-1">
          <h1 class="font-bold text-xl max-h-[90px] overflow-hidden">
            {itemTitle}
          </h1>
          <h2>{itemDescription}</h2>
          <div class="flex -space-x-4 rtl:space-x-reverse">
            <img
              class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
              src={person_picture}
              alt=""
            />
            <img
              class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
              src="https://www.morganstanley.com/content/dam/msdotcom/people/tiles/isaiah-dwuma.jpg.img.490.medium.jpg/1594668408164.jpg"
              alt=""
            />
            <img
              class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
              src="https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg"
              alt=""
            />
            <div
              class="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
            >
              +99
            </div>
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-10 h-10"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
    </div>
  </div>
</div>
