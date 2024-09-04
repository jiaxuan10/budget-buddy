<script lang="ts">
  import type { SupabaseClient } from "@supabase/supabase-js";
  export let supabase: SupabaseClient;
  import { page } from "$app/stores";
  import Profile from "./Profile.svelte";
  export let profile: any;
</script>

<nav
  class="py-1 flex fixed bottom-[-4px] md:relative md:top-0 bg-[#000F1F] text-white w-full h-50 md:flex md:justify-between md:items-center z-10 rounded-t-xl md:rounded-xl md:rounded-t-none"
>
  <div class="px-4 py-5 flex justify-between invisible md:visible">
    <a href="/home" class="text-white font-bold invisible">Brand</a>
  </div>

  <div
    class={`flex fixed md:flex items-center md:flex-row  md:pb-0 md:static bottom-0 w-full md:filter-none`}
  >
    <a
      href="/home"
      class="flex-1 w-10 md:flex-auto pt-4 md:py-2 px-4 text-sm md:border-0 text-[color:var(--color-text-inactive)] block text-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 md:hidden m-auto {$page.url.pathname == '/home'
          ? 'glowEffect'
          : ''}"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        />
      </svg>
      <p class="invisible md:visible">Home</p>
    </a>

    <a
      href="../news"
      class="flex-1 w-10 md:flex-auto pt-4 md:py-2 px-4 text-sm md:border-0 text-[color:var(--color-text-inactive)] block text-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 md:hidden m-auto {$page.url.pathname == '/news'
          ? 'glowEffect'
          : ''}"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
        />
      </svg>
      <p class="invisible md:visible">News</p></a
    >
    <a
      href="../forums"
      class="flex-1 w-10 md:flex-auto pt-4 md:py-2 px-4 text-sm md:border-0 text-[color:var(--color-text-inactive)] block text-center"
    >
      <svg
        class="opacity-75 w-6 h-6 md:hidden m-auto {$page.url.pathname ==
        '/forums'
          ? 'glowEffect'
          : ''}"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M3.559 4.544c.355-.35.834-.544 1.33-.544H19.11c.496 0 .975.194 1.33.544.356.35.559.829.559 1.331v9.25c0 .502-.203.981-.559 1.331-.355.35-.834.544-1.33.544H15.5l-2.7 3.6a1 1 0 0 1-1.6 0L8.5 17H4.889c-.496 0-.975-.194-1.33-.544A1.868 1.868 0 0 1 3 15.125v-9.25c0-.502.203-.981.559-1.331ZM7.556 7.5a1 1 0 1 0 0 2h8a1 1 0 0 0 0-2h-8Zm0 3.5a1 1 0 1 0 0 2H12a1 1 0 1 0 0-2H7.556Z"
          clip-rule="evenodd"
        />
      </svg>

      <p class="invisible md:visible">Forums</p></a
    >
    <a
      href="../resources"
      class="flex-1 w-10 md:flex-auto pt-4 md:py-2 px-4 text-sm md:border-0 text-[color:var(--color-text-inactive)] block text-center"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 md:hidden m-auto {$page.url.pathname == '/resources'
          ? 'glowEffect'
          : ''}"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
        />
      </svg>
      <p class="invisible md:visible">Resources</p></a
    >

    <a
      href="/trade"
      class="flex-1 w-10 md:flex-auto pt-4 md:py-2 px-4 text-sm md:border-0 text-[color:var(--color-text-inactive)] block text-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 md:hidden m-auto {$page.url.pathname == '/trade'
          ? 'glowEffect'
          : ''}"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4 4.5V19a1 1 0 0 0 1 1h15M7 14l4-4 4 4 5-5m0 0h-3.207M20 9v3.207"
        />
      </svg>
      <p class="invisible md:visible">Trade</p></a
    >

    <a
      href="../tasks"
      class="flex-1 w-10 md:flex-auto pt-4 md:py-2 px-4 text-sm md:border-0 text-[color:var(--color-text-inactive)] block text-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 md:hidden m-auto {$page.url.pathname == '/tasks'
          ? 'glowEffect'
          : ''}"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
        />
      </svg>
      <p class="invisible md:visible">Tasks</p></a
    >
  </div>
  <div class="invisible md:visible mx-4">
    <Profile {supabase} {profile} />
  </div>
</nav>
