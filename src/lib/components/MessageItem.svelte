<script lang="ts">
  export let text: string;
  export let user: boolean;
  export let time: string;
  export let profile: any;
  export let username:any;
  import { supabase } from "../../main";
  import Avatar from "./Avatar.svelte"

</script>

<div class="{user ? 'justify-start' : 'justify-end'} flex w-full mt-2 space-x-3">
  {#if user}
  <div class="flex-shrink-0 h-10 w-10 rounded-full object-cover">
    <Avatar {supabase} url={profile} size={42}></Avatar>

  </div>
  {/if}
  <div class="flex flex-col max-w-xl">
    <p class="text-xs text-black {user ? '' : 'text-right'}">{username}</p>
    <div class="{user ? 'bg-gray-300' : 'bg-blue-600 text-white'} {user ? 'mr-12' : ''} p-3 rounded-lg ">
      <p class="text-sm {user ? 'text-black' : ''}">{text}</p>
    </div>
    <span class="text-xs text-gray-500 {user ? '' : 'text-right'}">{time}</span>
  </div>
  {#if !user}
    <div class="flex-shrink-0 h-10 w-10 rounded-full object-cover">
      <Avatar {supabase} url={profile} size={42}></Avatar>
    </div>
  {/if}
</div>
