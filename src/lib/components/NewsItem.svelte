<!-- <script lang="ts">
  export let itemThumbnail: string;
  export let itemCountry: string;
  export let itemTitle: string;
  export let authorThumbnail: string;
  export let authorTitle: string;
  export let authoredAgo: string;
</script>

<div
  class="rounded-[var(--card-border-radius)] my-[var(--y-margin-cards)] shadowEffect"
>
  <div class="flex flex-col sm:flex-row">
    {#if itemThumbnail}
      <img
        src={itemThumbnail}
        alt="article Thumbnail"
        class="object-cover rounded-t-[var(--card-border-radius)] max-h-[200px] sm:rounded-tr-none sm:rounded-l-[var(--card-border-radius)]"
      />
    {/if}

    <div
      class="flex flex-col cardGradientBackground {itemThumbnail
        ? 'rounded-b-[var(--card-border-radius)] sm:rounded-bl-none sm:rounded-r-[var(--card-border-radius)] '
        : 'rounded-[var(--card-border-radius)]'} w-full px-[var(--x-padding-cards)] py-[var(--y-padding-cards)]"
    >
      <div
        class="flex-1 px-[var(--x-padding-cards)] py-[var(--y-padding-cards)] w-full"
      >
        <div class="text-[gray] text-[15px]">{itemCountry}</div>
        <h1 class="flex-1 text-xl max-h-[90px] overflow-hidden">
          {itemTitle}
        </h1>
      </div>
      <div class="flex items-center justify-between mt-0.5">
        <div class="flex items-center gap-x-2.5">
          <img
            class="w-[25px] h-[25px] rounded-[50%]"
            src={authorThumbnail}
            alt=""
          />
          <div class="name">{authorTitle}</div>
        </div>
        <div class="time">
          <i class="fa-solid fa-clock"></i>
          <p class="clock-time">{authoredAgo}</p>
        </div>
      </div>
    </div>
  </div>
</div> -->


<script>
  export let itemThumbnail = '';
  export let itemCountry = '';
  export let itemTitle = '';
  export let authorThumbnail = '';
  export let authorTitle = '';
  export let authoredAgo = '';
</script>

<div class="rounded-[var(--card-border-radius)] my-[var(--y-margin-cards)] shadowEffect">
  <div class="flex flex-col sm:flex-row">
    {#if itemThumbnail}
      <img
        src={itemThumbnail}
        alt="article Thumbnail"
        class="object-contain h-50 w-96"
      />
    {/if}

    <div
      class="flex flex-col cardGradientBackground {itemThumbnail
        ? 'rounded-b-[var(--card-border-radius)] sm:rounded-bl-none sm:rounded-r-[var(--card-border-radius)] '
        : 'rounded-[var(--card-border-radius)]'} w-full px-[var(--x-padding-cards)] py-[var(--y-padding-cards)]"
    >
      <div
        class="flex-1 px-[var(--x-padding-cards)] py-[var(--y-padding-cards)] w-full"
      >
        <div class="text-[gray] text-[15px]">{itemCountry}</div>
        <h1 class="flex-1 text-xl max-h-[90px] overflow-hidden">
          {itemTitle}
        </h1>
      </div>
      <div class="flex items-center justify-between mt-0.5">
        <div class="flex items-center gap-x-2.5">
          <img
            class="w-[25px] h-[25px] rounded-[50%]"
            src={authorThumbnail}
            alt=""
          />
          <div class="name">{authorTitle}</div>
        </div>
        <div class="time">
          <i class="fa-solid fa-clock"></i>
          <p class="clock-time">{authoredAgo}</p>
        </div>
      </div>
    </div>
  </div>
</div>