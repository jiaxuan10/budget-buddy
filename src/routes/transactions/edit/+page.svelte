<script lang="ts">
  import { incomeCategories, expenseCategories } from "$lib/utils/utils";
  export let data;
  let { transactions } = data;
  let selectOptions: typeof incomeCategories | typeof expenseCategories;

  export let isIncome: boolean = transactions[0].transaction_is_income;

  $: {
    if (isIncome) {
      selectOptions = incomeCategories;
    } else {
      selectOptions = expenseCategories;
    }
  }

  import CurrencyInput from "@canutin/svelte-currency-input";
</script>

<h1 class="my-2 text-3xl font-bold">Edit transaction</h1>
{#if transactions}
<div class="p-5 cardGradientBackground rounded-3xl shadowEffect mt-10">
  <form action="?/transactionEdit" method="POST">
    <div class="flex flex-col mb-8">
      <div class="my-1">
        <label for="transactionDateTime" class="text-2xl font-bold">Date</label>
        <input type="hidden" name="transactionId" value={transactions[0].id} />
        <input
          type="datetime-local"
          value={new Date(transactions[0].transaction_datetime)
            .toISOString()
            .slice(0, 16)}
          name="transactionDateTime"
          class="mx-auto my-2 p-4 w-[100%] rounded-lg bg-transparent border-2 border-[white]] appearance-none focus:outline-none focus:shadow-outline text-bg"
        />
      </div>
      <div>
        <div class="text-2xl font-bold">Type of transaction</div>
        <div class="flex"></div>
        <div class="my-1 flex items-center ps-4 border-2 dark:border-[white] rounded-full">
          <input
            type="radio"
            name="transactionType"
            class="checkbox appearance-none focus:opacity-100 focus:ring-2 focus:ring-offset-2 focus:white focus:outline-[white] border rounded-full border-gray-400 cursor-pointer w-5 h-5 "
            bind:group={isIncome}
            value={true}
            required
          />
          <label for="income" class="w-full py-4 ms-2 font-medium text-gray-900 dark:text-gray-300 text-xl">Income</label><br />
        </div>
        <div class="my-1 flex items-center ps-4 border-2 border-gray-200  dark:border-[white] rounded-full">
          <input
            type="radio"
            name="transactionType"
            class="checkbox appearance-none focus:opacity-100 focus:ring-2 focus:ring-offset-2 focus:white focus:outline-[black] border rounded-full border-gray-400 cursor-pointer w-5 h-5 focus:color-white"
            bind:group={isIncome}
            value={false}
            required
          />
          <label for="expense" class="w-full py-4 ms-2 font-medium text-gray-900 dark:text-gray-300 text-xl">Expense</label><br />
        </div>
      </div>

      <div class="my-2 flex flex-col">
        <label for="transactionCategory" class="text-2xl font-bold">Transaction Category: </label>
        <select name="transactionCategory" class="text-sm rounded-lg p-2.5 dark:bg-[white] text-black rounded-2xl mt-1 focus:rounded-xl w-[40%]">
          {#each Object.entries(selectOptions) as [category, label]}
            <option value={category}>{label}</option>
          {/each}
        </select>
      </div>

      <div class="flex justify-start items-center my-2">
        <div class="text-2xl font-bold">Amount:</div>
        <CurrencyInput
          name="transactionAmount"
          value={transactions[0].transaction_amount}
          locale="nl-NL"
          currency="MYR"
          required
          isNegativeAllowed={false}
          inputClasses={
            { 
              wrapper: "form-control block",
              formatted: 'text-black p-1 px-3 rounded-lg ml-5',
              formattedPositive: 'text-green-700',
              formattedNegative: 'text-red-700'
            }
          }
        />
      </div>

      <div class="my-2">
        <div class="text-2xl font-bold">Transaction Description:</div>
        <input
          type="text"
          name="transactionDescription"
          class="text-black p-1 px-3 rounded-lg w-[100%] my-2"
          value={transactions[0].transaction_description}
        />
      </div>
      <button
        type="submit"
        class="shadowEffect button block primary w-full bg-indigo-800 rounded-3xl py-3 my-5"
      >
        Record Transaction
      </button>
    </div>
  </form>
</div>
{:else}
  <h1>You are not authorized to do this!</h1>
{/if}
