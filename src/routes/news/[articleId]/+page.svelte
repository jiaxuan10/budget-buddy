<script lang="ts">
  import { onMount } from "svelte";
  import { supabase } from "../../../main";
  import leftarrow from "$lib/images/arrow.png";
  import { page } from "$app/stores";
  export let data;
  let { session } = data;
  
  const articleId = $page.params.articleId;
  let article: Article;
  let isLoading = true;

  interface Article {
    id: number;
    itemTitle: string;
    created_at: string;
    itemThumbnail: string;
    itemCountry: string;
    authorThumbnail: string;
    authorTitle: string;
    content:string;
}


  async function fetchArticle() {
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .eq("id", articleId)
      .single();

    if (error) {
      console.error("Error fetching article:", error.message);
    } else {
      if (data) {
        article = data;
      } else {
        console.error("Article not found.");
      }
      isLoading = false;
    }
  }
  const handleClick = async () => {
    const { error } = await supabase
        .from('tasks')
        .update({ 'isCompleted': true })
        .eq('taskuser', session?.user.id)
        .eq('taskid', 2);

    if (error) {
        console.error(error);
    }else {
      window.location.href = "/tasks";
    }
}

  onMount(fetchArticle);


</script>

{#if isLoading}
  <div>Loading...</div>
{:else}
  <div class="-m-4 md:-m-6">
    <div
      class="flex items-center bg-[#060047] h-[8vh] justify-start px-[15px] w-[100%] md:hidden fixed"
    >
      <a href="/news" class="w-[35px] h-[35px]">
        <img src={leftarrow} alt="" />
      </a>
    </div>
  </div>

  <section class="mt-[10vh]">
    <h1 class="text-3xl font-bold tracking-wide mb-3">{article.itemTitle}</h1>
    <div class="flex flex-row justify-between mt-5">
      <div class="flex flex-row">
        <img
          src={article.authorThumbnail}
          alt=""
          class="w-[25px] h-[25px] rounded-[50%] mr-2"
        />
        <p>{article.authorTitle}</p>
      </div>
      <p class="text-right">{article.itemCountry}</p>
    </div>
    <img src={article.itemThumbnail} alt="" class="rounded-lg mt-3" />
    <div class="mt-5 text-l tracking-wide" style="white-space: pre-line;">
      {article.content}
    </div>
    <br />
    <div class="flex justify-center">
      <button
        class="px-6 py-2 min-w-[120px] text-center text-violet-600 border border-violet-600 rounded hover:bg-violet-600 hover:text-white active:bg-indigo-500 focus:outline-none focus:ring"
        on:click={() => {
          handleClick();
        }}
      >
        Mark as Read
      </button>
    </div>
  </section>
{/if}
