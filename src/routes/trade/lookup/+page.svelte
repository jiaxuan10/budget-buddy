<script lang="ts">
  import { onMount } from "svelte";
  export let data;

  let { symbol, stonks } = data;
  let stonksData = [];
  let currentStonksPrice: number;
  let totalStonksAmountBuy: number = 0;
  let totalStonksAmountSell: number = 0;
  let totalStonksPriceBuy: number = 0;
  let totalStonksPriceSell: number = 0;

  $: {
    currentStonksPrice,
      totalStonksAmountBuy,
      totalStonksAmountSell,
      (totalStonksPriceBuy = totalStonksAmountBuy * currentStonksPrice),
      (totalStonksPriceSell = totalStonksAmountSell * currentStonksPrice);
    chart;
  }
  if (stonks["Time Series (Daily)"]) {
    for (const date in stonks["Time Series (Daily)"]) {
      stonksData.push({
        x: date,
        y: [
          stonks["Time Series (Daily)"][date]["1. open"],
          stonks["Time Series (Daily)"][date]["2. high"],
          stonks["Time Series (Daily)"][date]["3. low"],
          stonks["Time Series (Daily)"][date]["4. close"],
        ],
      });
    }

    currentStonksPrice =
      stonks["Time Series (Daily)"][
        Object.keys(stonks["Time Series (Daily)"])[0]
      ]["4. close"];
  }

  var options = {
    series: [
      {
        data: stonksData,
      },
    ],
    chart: {
      type: "candlestick",
      height: 350,
    },
    title: {
      text: "CandleStick Chart",
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  const chart = (node, options) => {
    let myChart = new ApexCharts(node, options);
    myChart.render();

    return {
      update(options) {
        myChart.updateOptions(options);
      },
      destroy() {
        myChart.destroy();
      },
    };
  };

  onMount(async () => {
    const ApexCharts = (await import("apexcharts")).default;

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
  });
</script>

<svelte:head
  ><script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
</svelte:head>

{#if stonks["Time Series (Daily)"]}
  <h1 class="text-2xl my-8">{symbol}'s Price :</h1>
  <h1 class="text-center text-4xl my-8 font-bold">
    {Number(currentStonksPrice).toFixed(2)} USD
  </h1>
  <div use:chart={options}></div>
  <div class="flex gap-x-5">
    <div class="m-auto">
      <form action="?/stonksBuy" method="post">
        <input type="hidden" name="symbol" bind:value={symbol} />
        <input
          type="hidden"
          name="currentStonksPrice"
          bind:value={currentStonksPrice}
        />
        <input
          class="text-black px-2 block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="number"
          name="buyAmount"
          bind:value={totalStonksAmountBuy}
        />
        Costs : {totalStonksPriceBuy} USD
        <br />
        <button
          type="submit"
          class="mt-5 w-full p-3 rounded-3xl shadowEffect bg-[--color-theme-2] bg-gradient-to-b from-indigo-800 from-100% via-indigo-900 from-20% to-violet-950 from-100%"
          >BUY</button
        >
      </form>
    </div>

    <div class="m-auto">
      <form action="?/stonksSell" method="post">
        <input type="hidden" name="symbol" bind:value={symbol} />
        <input
          type="hidden"
          name="currentStonksPrice"
          bind:value={currentStonksPrice}
        />
        <input
          class="text-black px-2 block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="number"
          name="sellAmount"
          bind:value={totalStonksAmountSell}
        />
        Costs : {totalStonksPriceSell} USD
        <br />
        <button
          type="submit"
          class="mt-5 w-full p-3 rounded-3xl shadowEffect bg-[--color-theme-2] bg-gradient-to-b from-indigo-800 from-100% via-indigo-900 from-20% to-violet-950 from-100%"
          >SELL</button
        >
      </form>
    </div>
  </div>
{:else}
  <p>An error has occured! Symbol not found! (or API limit reached)</p>
{/if}
