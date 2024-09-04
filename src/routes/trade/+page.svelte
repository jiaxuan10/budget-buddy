<script lang="ts">
  import type { PageData } from "../$types";
  import restart from "$lib/images/restart.png";

  export let data: PageData;

  let symbol: string;
  let { stonks } = data;
  let counter: number = 0;
  let balance: number = 100000.0;
  $: {
    stonks, balance;
  }
  for (const stonk in stonks) {
    console.log(stonks[counter]);
    if (String(stonks[counter].transaction_is_buy).toLowerCase() === "true") {
      balance -=
        Number(stonks[counter].transaction_amount) *
        Number(stonks[counter].transaction_price_per_stock);
      counter += 1;
    } else {
      balance +=
        Number(stonks[counter].transaction_amount) *
        Number(stonks[counter].transaction_price_per_stock);
      counter += 1;
    }
  }
</script>

<h2 class="font-bold" style="font-size:40px">Current Portfolio</h2>
<div
  class="text-3xl mt-10 text-center font-semibold {balance >= 0
    ? 'text-green-400'
    : 'text-[red]'}"
>
  Balance : {balance.toFixed(2)} USD
  <form action="?/clear" method="POST">
    <div class="flex items-center justify-center mt-3">
      <button class="text-xl text-white" type="submit"> Restart </button>
      <img class="w-6 pt-1 color-[white]" src={restart} alt="Restart" />
    </div>
  </form>
</div>

<div
  class="elative overflow-x-auto shadow-md sm:rounded-lg mx-[-4px] md:mx-[0px]"
>
  <table class="w-full text-left m-[-2px]">
    <thead class="text-xs text-center text-white uppercase bg-blue-800">
      <tr>
        <!-- <th class="px-5">DATE & TIME</th> -->
        <th class="px-5">SYMBOL</th>
        <th class="px-5">SHARES</th>
        <th class="px-5">BOUGHT/SOLD AT (USD)</th>
        <th class="px-5">TOTAL VALUE (USD)</th>
      </tr>
    </thead>
    <tbody>
      {#each stonks as stonk}
        <tr
          class="text-center border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-500"
        >
          <!-- <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >{stonk.transaction_datetime.slice(0, 19)}
          </th> -->
          <td> ${stonk.transaction_symbol} </td>
          <td> {stonk.transaction_amount} </td>
          <td>
            {#if String(stonk.transaction_is_buy) === "true"}
              <div class="text-red-500">
                {stonk.transaction_price_per_stock}
              </div>
            {:else}
              <div class="text-green-500">
                {stonk.transaction_price_per_stock}
              </div>
            {/if}</td
          >
          <td class="font-bold">
            {Number(
              stonk.transaction_price_per_stock * stonk.transaction_amount
            ).toFixed(2)}
          </td>
        </tr>
      {/each}

      <tr class="uppercase bg-blue-900">
        <th colspan="3"> PORTFOLIO TOTAL (USD) </th>
        <td> {balance.toFixed(2)} USD</td>
      </tr>
    </tbody>
  </table>
</div>
<div>
  <div class="mt-5 flex flex-col">
    <div class="w-full text-xl mx-5">
      Symbol : <input
        type="text"
        class="text-black py-1 px-3 mx-2 rounded-2xl"
        name="symbol"
        placeholder="Symbol"
        bind:value={symbol}
      />
    </div>
    <a href="/trade/lookup?symbol={symbol}"
      ><button
        class="mt-5 w-full p-3 rounded-3xl shadowEffect bg-[--color-theme-2] bg-gradient-to-b from-indigo-800 from-100% via-indigo-900 from-20% to-violet-950 from-100%"
        >Lookup</button
      ></a
    >
  </div>
</div>
