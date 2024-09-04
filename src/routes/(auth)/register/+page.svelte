<script lang="ts">
  import Logo from "$lib/images/BudgetBuddyFull.png";
  import AvatarUpload from "$lib/components/AvatarUpload.svelte";
  import { enhance } from "$app/forms";
  import type { SubmitFunction } from "@sveltejs/kit";
  export let data;
  let { supabase, profile } = data;

  let profileForm: HTMLFormElement;
  let loading = false;

  const handleSubmit: SubmitFunction = () => {
    loading = true;
    return async () => {
      loading = false;
    };
  };
</script>

<svelte:head>
  <title>Register</title>
</svelte:head>

<div>
  <div class="flex mx-2 my-2 py-6">
    <img src={Logo} width="300" alt="Logo" class="mx-auto my-8" />
  </div>
  <div class="flex flex-col mx-2">
    <h1 class="font-bold text-4xl my-1 py-4">Sign Up</h1>
    <form
      action="?/register"
      method="POST"
      use:enhance={handleSubmit}
      bind:this={profileForm}
    >
      <div class="flex flex-col mb-8">
        <div class="my-1">
          <label for="userEmail" class="text-xl">Email</label>
          <input
            type="text"
            placeholder="Email"
            name="userEmail"
            class="mx-auto my-2 p-4 w-[100%] rounded-lg bg-transparent border border-[var(--color-theme-1))] appearance-none focus:outline-none focus:shadow-outline text-bg"
            required
          />
        </div>
        <div>
          <label for="userPassword" class="text-xl">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="userPassword"
            class="mx-auto my-2 p-4 w-[100%] rounded-lg bg-transparent border border-[var(--color-theme-1))] shadow appearance-none focus:outline-none focus:shadow-outline text-bg"
            required
          />
        </div>
        <div>
          <label for="userPhone" class="text-xl">Phone</label>
          <input
            type="text"
            placeholder="Phone"
            name="userPhone"
            class="mx-auto my-2 p-4 w-[100%] rounded-lg bg-transparent border border-[var(--color-theme-1))] shadow appearance-none focus:outline-none focus:shadow-outline text-bg"
            required
          />
        </div>
        <div>
          <label for="userName" class="text-xl">Display Name</label>
          <input
            type="text"
            placeholder="Display Name"
            name="userName"
            class="mx-auto my-2 p-4 w-[100%] rounded-lg bg-transparent border border-[var(--color-theme-1))] shadow appearance-none focus:outline-none focus:shadow-outline text-bg"
            required
          />
        </div>
        <div>
          <AvatarUpload
            {supabase}
            url={profile?.avatar_url}
            size={10}
            on:upload={() => {
              profileForm.requestSubmit();
            }}
          />
        </div>
        <button
          type="submit"
          class="bg-[var(--color-theme-1)] gradientBackground font-medium rounded-lg w-full my-6 py-4 text-center"
          disabled={loading}>{loading ? "Loading..." : "Sign Up"}</button
        >
      </div>
    </form>
  </div>
</div>
