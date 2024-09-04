<script lang="ts">
  import type { LayoutData } from "./$types";
  import Navbar from "$lib/components/Navbar.svelte";
  import "./styles.css";
  import "../app.css";
  import { invalidate } from "$app/navigation";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import MobileHeader from "$lib/components/MobileHeader.svelte";
  import { getContext } from "svelte";

  let showMobileHeader: boolean;

  export let data: LayoutData;
  let { supabase, session, profile } = data;
  $: ({ supabase, session, profile } = data);

  $: {
    const currentPath = $page.url.pathname;
    const isNotNumericEnd = /[^\d]+$/.test(currentPath);
    showMobileHeader = isNotNumericEnd;
  }

  onMount(() => {
    const { data } = supabase.auth.onAuthStateChange((event, _session) => {
      if (_session?.expires_at !== session?.expires_at) {
        invalidate("supabase:auth");
      }
    });

    return () => data.subscription.unsubscribe();
  });
</script>

<svelte:head>
  <title>BudgetBuddy - {$page.data.title}</title>
</svelte:head>

<div class="app">
  <Navbar {supabase} {profile} />

  <main
    class="md:px-6 p-4 bg-gradient-to-b from-indigo-950 from-100% via-indigo-900 from-20% to-violet-950 from-100%"
  >
    {#if showMobileHeader}
      <MobileHeader {supabase} {profile} />
    {/if}
    <slot />
  </main>

  <footer><div class="h-[70px] md:h-[0px]"></div></footer>
</div>
