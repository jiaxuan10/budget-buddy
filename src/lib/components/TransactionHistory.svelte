<script>
  // @ts-nocheck
  export let id;
  export let category;
  export let title;
  export let date;
  export let isIncome;
  const dateTime = new Date(date);
  export let amount;
</script>

<div
  class="bg-[#104c85] p-4 rounded-lg my-2 cardGradientBackground shadowEffect p-[5px]"
>
  <div class="flex flex-wrap">
    <!-- <img src={icon} class=" mx-2 rounded-lg w-20 h-20" alt="" /> -->
    <p
      class="{isIncome
        ? 'text-green-500'
        : 'text-red-500'} font-semibold text-xl m-auto"
    >
      {String(category).toUpperCase()}
    </p>
    <div class="m-auto">
      <p class="text-xl truncate w-[30vw]">{title}</p>
      <p class="text-[gainsboro] text-[0.9rem]">
        {dateTime.toLocaleDateString()}
      </p>
      <p class="text-[gainsboro] text-[0.9rem]">
        {dateTime.toLocaleTimeString()}
      </p>
    </div>
    <div
      class="{isIncome
        ? 'text-green-500'
        : 'text-red-500'} font-semibold text-xl m-auto"
    >
      MYR {amount}
    </div>
    <div class="m-auto flex">
      <a href="transactions/edit/?Id={id}"
        ><button
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-edit m-auto"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#00abfb"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
              d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"
            />
            <path
              d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"
            />
            <path d="M16 5l3 3" />
          </svg></button
        ></a
      >
      <form
        action="?/transactionDelete"
        method="post"
        onsubmit={"return confirm('Do you really want to delete this transaction?');"}
      >
        <input type="hidden" name="transactionId" value={id} />
        <button type="submit"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-edit"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#ff2825"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 7l16 0" />
            <path d="M10 11l0 6" />
            <path d="M14 11l0 6" />
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
          </svg></button
        >
      </form>
    </div>
  </div>
</div>
