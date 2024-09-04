
<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import NewsItem from "$lib/components/NewsItem.svelte";
  import { supabase } from "../../main";

  let news: any[] = [];
  let activeButton = "All";
  let buttons = [
    { label: "All" },
    { label: "Trading" },
    { label: "Crypto" },
    { label: "Banking" },
    { label: "Real Estate" },
  ];
  let randomNewsId:number;
  let randomNewsTitle: string = ""; 
  let randomNewsThumbnail:string = ""
  let interval: NodeJS.Timeout | null = null; 

  onMount(async () => {
    await updateNews(activeButton);
    getRandomNews();
    interval = setInterval(getRandomNews, 3000);
  });

  onDestroy(() => {
    if (interval) {
      clearInterval(interval);
    }
  });

  async function updateNews(type: string) {
    activeButton = type;
    news = await filterNews(type);
  }

  async function getRandomNews() {
    let randomNews = await fetchRandomNews(); 
    if (randomNews) {
      randomNewsId = randomNews.id;
      randomNewsTitle = randomNews.itemTitle; 
      randomNewsThumbnail = randomNews.itemThumbnail; 
    }
  }
  async function fetchNews() {
    const { data, error } = await supabase.from('news').select('*');
    if (error) {
        console.error('Error fetching news:', error.message);
        return [];
    } else {
        return data;
    }
}

async function filterNews(type: string) {
    if (type === 'All') {
        return await fetchNews(); 
    } else {
        const { data, error } = await supabase.from('news').select('*').eq('type', type);
        if (error) {
            console.error('Error fetching news:', error.message);
            return [];
        } else {
            return data;
        }
    }
}

async function fetchRandomNews() {
    const { data: allNews, error } = await supabase.from('news').select('*');
    if (error) {
        console.error('Error fetching news:', error.message);
        return null;
    } else {
        const randomIndex = Math.floor(Math.random() * allNews.length);
        const randomNews = allNews[randomIndex];
        return randomNews || null;
    }
}
</script>

<svelte:head>
  <title>News</title>
</svelte:head>

<div>
  <div>
    <h2 class="my-2 text-3xl font-bold">News</h2>
  </div>
  <section class="mb-15 md:text-left">
    <a href="news/{randomNewsId}">
    <div
      class="relative mb-6 p-2 overflow-hidden min-h-[35vh] rounded-lg shadow-lg dark:shadow-black/20"
      data-te-ripple-init
    >
      <div
        class="absolute inset-0 bg-cover bg-no-repeat"
        style="background-image: url({randomNewsThumbnail}); opacity: 0.65;"
      ></div>
      <div class="flex flex-col relative z-10">
        <div
          class="flex-1 text-3xl text-white font-semibold text-wrap py-2 my-2 overflow-hidden"
        >
          {randomNewsTitle}
        </div>

      </div>
    </div>
    </a>
  </section>

  <section class="mb-[10vh]">
    <div class="info">
      <div class="flex justify-between text-base">
        <div class="font-semibold">Latest</div>
        <div>See all</div>
      </div>
      <ul
        class="flex text-nowrap shrink-0 space-x-20 overflow-auto text-base py-2 my-2"
      >
        {#each buttons as { label }}
          <li>
            <button
              class={activeButton == label
                ? "font-semibold underline underline-offset-8"
                : ""}
              on:click={() => updateNews(label)}>{label}</button
            >
          </li>
        {/each}
      </ul>
    </div>

    <div class="flex flex-col">
      {#each news as article}
        <a href="news/{article.id}">
          <NewsItem
            itemThumbnail={article.itemThumbnail}
            itemCountry={article.itemCountry}
            itemTitle={article.itemTitle}
            authorThumbnail={article.authorThumbnail}
            authorTitle={article.authorTitle}
            authoredAgo={article.authoredAgo}
          />
        </a>
      {/each}
    </div>
  </section>

</div>