<script lang="ts">
  import { incomeCategories, expenseCategories } from "$lib/utils/utils";

  let selectOptions: typeof incomeCategories | typeof expenseCategories;
  export let isIncome: boolean = false;

  $: {
    if (isIncome) {
      selectOptions = incomeCategories;
    } else {
      selectOptions = expenseCategories;
    }
  }
  import CurrencyInput from "@canutin/svelte-currency-input";
</script>

<h1 class="my-2 text-3xl font-bold">Add new transaction</h1>
<div class="p-5 cardGradientBackground rounded-3xl shadowEffect mt-10">
  <form action="?/transactionNew" method="POST">
    <div class="flex flex-col mb-8">
      <div class="my-1">
        <label for="transactionDateTime" class="text-2xl font-bold">Date</label>
        <input
          type="datetime-local"
          value={new Date(Date.now() + 8 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 16)}
          name="transactionDateTime"
          class="mx-auto my-2 p-4 w-[100%] rounded-lg bg-transparent border-2 border-[white]] appearance-none focus:outline-none focus:shadow-outline text-bg "
        />
      </div>
      <div class="my-2">
        <div class="text-2xl font-bold my-2">Type of transaction</div>
        <div class="my-1 flex items-center ps-4 border-2 border-gray-200  dark:border-[white] rounded-full">
          <input 
            type="radio"
            class="checkbox appearance-none focus:opacity-100 focus:ring-2 focus:ring-offset-2 focus:white focus:outline-[black] border rounded-full border-gray-400 cursor-pointer w-5 h-5 focus:color-white"
            name="transactionType"
            bind:group={isIncome}
            value={true}
            required
          />
          <label for="income" class="w-full py-4 ms-2 font-medium text-gray-900 dark:text-gray-300 text-xl">Income</label><br />
        </div>
        <div class=" my-1 flex items-center ps-4 border-2 border-[white] rounded rounded-full">
          <input
            type="radio"
            class="checkbox appearance-none focus:opacity-100 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:outline-[black]] border rounded-full border-gray-400 cursor-pointer w-5 h-5"
            name="transactionType"
            bind:group={isIncome}
            value={false}
            required
          />
          <label for="expense" class="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 text-xl">Expense</label><br />
        </div>
      </div>

      <div class="my-2">
        <label for="transactionCategory" class="text-2xl font-bold ">Transaction Category</label>
        <select name="transactionCategory" class="text-sm rounded-lg p-2.5 dark:bg-[white] text-black rounded-2xl mt-1 focus:rounded-xl w-[40%]">
          {#each Object.entries(selectOptions) as [category, label]}
            <option value={category}>{label}</option>
          {/each}
        </select>
      </div>
  
      <div class="flex justify-start items-center mt-1 ">
        <div class="text-2xl font-bold my-2">Amount</div>
        <CurrencyInput
          name="transactionAmount"
          value={0.0}
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
        <div class="text-2xl font-bold ">Transaction Description:</div>
        <input type="text" name="transactionDescription" class="text-black p-1 px-3 rounded-lg w-[100%] my-2 " />
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
