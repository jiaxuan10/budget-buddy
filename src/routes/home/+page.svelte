<script lang="ts">
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
  import type { PageData } from "./$types";
  import CategoryTotal from "$lib/components/CategoryTotal.svelte";
  import NoRecords from "$lib/components/NoRecords.svelte";

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // Months are zero-indexed

  let startDate = new Date(year, month - 1, 1);
  let endDate = new Date(year, month, 0);

  export let data: PageData;
  let { profile, transactions, advice } = data;
  $: ({ profile, transactions, advice } = data);

  let balance: number = 0;
  let incomeHistory: number[] = [];
  let incomeTotal: number = 0;
  let expenseHistory: number[] = [];
  let expenseTotal: number = 0;
  let categoryTotals: { [category: string]: number } = {};

  let incomeGraph: any;
  let expenseGraph: any;
  let incomeGraphData: {
    labels: number[];
    datasets: {
      label: string;
      fill: boolean;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  };
  let expenseGraphData: {
    labels: number[];
    datasets: {
      label: string;
      fill: boolean;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  };

  $: {
    balance = 0;
    incomeHistory = [];
    incomeTotal = 0;
    expenseHistory = [];
    expenseTotal = 0;
    categoryTotals = {
      paycheck: 0,
      investments: 0,
      savings: 0,
      food: 0,
      shopping: 0,
      entertainment: 0,
      rent: 0,
      utilities: 0,
      others: 0,
    };

    for (const transaction of transactions!) {
      const transactionDateTime = new Date(transaction.transaction_datetime);
      if (transaction.transaction_is_income) {
        balance += transaction.transaction_amount;
        if (
          transactionDateTime >= new Date(startDate) &&
          transactionDateTime <= new Date(endDate)
        ) {
          incomeTotal += transaction.transaction_amount;
          incomeHistory.push(transaction.transaction_amount);
        }
      } else if (!transaction.transaction_is_income) {
        balance -= transaction.transaction_amount;
        if (
          transactionDateTime >= new Date(startDate) &&
          transactionDateTime <= new Date(endDate)
        ) {
          expenseTotal += transaction.transaction_amount;
          expenseHistory.push(transaction.transaction_amount);
        }
      }
      if (transaction.transaction_category in categoryTotals) {
        categoryTotals[transaction.transaction_category] +=
          transaction.transaction_amount;
      }
    }
    incomeGraphData = {
      labels:
        incomeHistory.length > 0
          ? [...Array(incomeHistory?.length).keys()].map((x) => ++x)
          : [0, 0],
      datasets: [
        {
          label: "Income",
          fill: true,
          data: incomeHistory.length > 0 ? incomeHistory : [0, 0],
          borderColor: "#00FF00",
          backgroundColor: "#00FF00",
        },
      ],
    };

    expenseGraphData = {
      labels:
        expenseHistory?.length > 0
          ? [...Array(expenseHistory?.length).keys()].map((x) => ++x)
          : [0, 0],
      datasets: [
        {
          label: "Expense",
          fill: true,
          data: expenseHistory?.length > 0 ? expenseHistory : [0, 0],
          borderColor: "#FF0000",
          backgroundColor: "#FF0000",
        },
      ],
    };
  }
</script>

<svelte:head>
  <title>Dashboard</title>
  <meta name="description" />
</svelte:head>

<div>
  <div>
    <h2 class="my-2 text-3xl font-bold">{profile?.username}'s Dashboard</h2>
  </div>

  <div
    class="flex flex-col cardGradientBackground border-b-4 border-violet-700 rounded-[30px] px-6 py-2 my-3"
  >
    <h2 class="mb-3 text-3xl font-bold">Available Balance</h2>
    {#if advice}
    <div class="mb-3 russo-one-regular">{advice}</div>
    {/if}
    <h1 class="text-4xl font-bold">
      MYR <span class="text-5xl">{balance?.toFixed(2)}</span>
    </h1>


    <div class="flex flex-row mx-2">
      <a href="transactions" class="flex-1 my-auto">See details</a>
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
  <h2 class="my-2 text-xl font-bold">Filter by Date:</h2>
  <div class="mb-3 text-m flex items-center space-x-2 justify-between">
    <div>
      <label for="startDate">From:</label>
      <input
        type="date"
        id="startDate"
        name="startDate"
        class="filter-input"
        bind:value={startDate}
      />
    </div>
    <div>
      <label for="endDate">To:</label>
      <input
        type="date"
        id="endDate"
        name="endDate"
        class="filter-input"
        bind:value={endDate}
      />
    </div>
  </div>


  {#if transactions && transactions.length > 0}
    <div>
      <div class="flex flex-col md:flex-row">
        <div
          class="flex flex-1 flex-col cardGradientBackgroundIncome border-b-4 border-blue-700 rounded-[30px] px-6 py-2 my-2 md:mx-1"
        >
          <h2 class="mb-8 text-xl font-bold">MYR {incomeTotal?.toFixed(2)}</h2>
          <h1 class="font-bold">Income</h1>
          <Line
            data={incomeGraphData}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                y: {
                  display: false,
                },
                x: {
                  display: false,
                },
              },
              responsive: true,
            }}
            bind:chart={incomeGraph}
          />
        </div>

        <div
          class="flex flex-1 flex-col cardGradientBackgroundExpense border-b-4 border-blue-700 rounded-[30px] px-6 py-2 my-2 md:mx-1"
        >
          <h2 class="mb-8 text-xl font-bold">MYR {expenseTotal?.toFixed(2)}</h2>
          <h1 class="font-bold">Expenses</h1>
          <Line
            data={expenseGraphData}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                y: {
                  display: false,
                },
                x: {
                  display: false,
                },
              },
              responsive: true,
            }}
            bind:chart={expenseGraph}
          />
        </div>
      </div>
      <h2 class="my-4 text-3xl font-bold">Categories</h2>
      {#each Object.entries(categoryTotals) as [category, categoryTotal]}
        {#if categoryTotal > 0}
          <CategoryTotal {category} amount={Number(categoryTotal).toFixed(2)} />
        {/if}{/each}
    </div>
  {:else}
    <NoRecords />{/if}
</div>

<style>
  input[type="date"] {
    border: none;
    outline: none;
    border-radius: 5px;
    color: #ecf0f1;
    appearance: none;
    -webkit-appearance: none;
    font-size: 16px;
    border: 1px solid black;
    background: rgb(46, 61, 129);
    text-align: center;
    font-size: 14px;
    padding: 4px;
    padding-right: 8px;
  }

  ::-webkit-calendar-picker-indicator {
    padding: 3px;
    background-color: white;
    cursor: pointer;
    border-radius: 50%;
    background-color: #ecf0f1;
  }
  .filter-input {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 2px;
    outline: none;
  }

  .filter-input:focus {
    border-color: #007bff; /* Example color for focus */
  }
</style>
