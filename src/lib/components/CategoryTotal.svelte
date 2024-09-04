<script lang="ts">
  import { incomeCategories, expenseCategories } from "$lib/utils/utils";
  export let category: String;
  export let amount: String;
  let isIncome: boolean = false;

  for (const incomeCategory in incomeCategories) {
    if (category === incomeCategory.toLowerCase()) {
      isIncome = true;
    }
  }
</script>

<div
  class="bg-[#104c85] rounded-lg my-1 cardGradientBackground shadowEffect p-4"
>
  <div class="flex flex-wrap">
    <p
      class="{isIncome
        ? 'text-green-500'
        : 'text-red-500'} font-semibold text-xl m-auto"
    >
      {String(category).toUpperCase()}
    </p>
    <div
      class="{isIncome
        ? 'text-green-500'
        : 'text-red-500'} font-semibold text-xl m-auto"
    >
      MYR {amount}
    </div>
  </div>
</div>
