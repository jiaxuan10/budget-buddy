<script>
  import { Line } from "svelte-chartjs";
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
    scales,
  } from "chart.js";

  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale
  );
  import TransactionHistory from "$lib/components/TransactionHistory.svelte";
  import amazon_icon from "$lib/images/amazon.jpg";
  import NoRecords from "$lib/components/NoRecords.svelte";

  export let data;
  let { profile, balanceHistory, transactions } = data;

  export const balanceGraphData = {
    labels: balanceHistory
      ? [...Array(balanceHistory?.length).keys()].map((x) => ++x)
      : [0, 0],
    datasets: [
      {
        label: "Balance",
        fill: true,
        data: balanceHistory ? balanceHistory.reverse() : [0, 0],
        borderColor: "#00FF00",
        backgroundColor: "#00FF00",
      },
    ],
  };
</script>

<svelte:head>
  <title>Transactions</title>
</svelte:head>

<div>
  <div>
    <div>
      <h2 class="my-2 text-3xl font-bold">
        {profile?.username}'s Transactions
      </h2>
    </div>
    {#if transactions && transactions.length > 0}
      <div
        class="flex flex-1 flex-col cardGradientBackground border-b-4 border-blue-700 rounded-[30px] px-6 py-2 mx-1"
      >
        <Line
          data={balanceGraphData}
          options={{
            plugins: {
              legend: {
                display: false,
              },
            },
            responsive: true,
          }}
        />
        <div class="flex">
          <div class="flex-1"></div>
          <a href="/transactions/new"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="w-14 h-14"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>

      <div class="p-4">
        <h3 class="text-lg">History</h3>

        {#each transactions as transaction}
          <TransactionHistory
            id={transaction.id}
            icon={amazon_icon}
            category={transaction.transaction_category}
            isIncome={transaction.transaction_is_income}
            title={transaction.transaction_description}
            date={transaction.transaction_datetime}
            amount={Number(transaction.transaction_amount).toFixed(2)}
          />{/each}
      </div>
    {:else}
      <NoRecords />
    {/if}
  </div>
</div>
