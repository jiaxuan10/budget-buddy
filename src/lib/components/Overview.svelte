<script>
  // @ts-nocheck

  export let graphSrc;
  export let message;
</script>

<div class="p-4">
  <h3 class="text-lg">Overview</h3>
  <div class="relative rounded-lg my-2 rounded-[20px]">
    <img
      src={graphSrc}
      alt=""
      class="shadowEffect rounded-[20px]"
    />
    <p
      class="absolute text-[13px] w-[200px] text-center bg-gradient-to-b from-purple-700 to-fuchsia-700 opacity-80 shadowEffect -translate-x-2/4 p-[7px] rounded-[var(--card-border-radius)] left-[55%] top-[70%] ; text-wrap: wrap"
    >
      {message}
    </p>
  </div>
</div>
