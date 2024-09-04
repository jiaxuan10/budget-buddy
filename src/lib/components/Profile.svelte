<script lang="ts">
  import type { SupabaseClient } from "@supabase/supabase-js";
  import Avatar from "./Avatar.svelte";
  export let supabase: SupabaseClient;
  export let profile: any;
</script>

<a
  class="flex cardGradientBackgroundSecond shadowEffect rounded-full py-1"
  href="/profile"
>
  {#if profile}
    <div class="flex-1 w-[100px] flex-row mx-2 my-auto">
      <p class="font-bold text-sm text-[var(--color-text)] truncate">
        {profile.username}
      </p>
      <p class="truncate text-xs text-[var(--color-text-inactive)]">
        View Profile
      </p>
    </div>
    <div class="mx-2 justify-end">
      <Avatar {supabase} url={profile?.avatar_url} size={50}></Avatar>
    </div>
  {:else}
    <div class="flex-1 flex-row mx-2 my-auto">
      <p>Login</p>
    </div>
  {/if}
</a>
