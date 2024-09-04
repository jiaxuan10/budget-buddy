<script lang="ts">
  import { enhance } from "$app/forms";
  import AvatarUpload from "$lib/components/AvatarUpload.svelte";
  import type { SubmitFunction } from "@sveltejs/kit";

  export let data;

  let { session, supabase, user, profile } = data;
  $: ({ session, supabase, user, profile } = data);

  let profileForm: HTMLFormElement;
  let loading = false;

  const handleSubmit: SubmitFunction = () => {
    loading = true;
    return async () => {
      loading = false;
    };
  };
</script>

<div class="form-widget rounded-xl cardGradientBackgroundSecond shadowEffect   mt-[20%] p-10">
  <form
    method="POST"
    action="?/profileUpdate"
    use:enhance={handleSubmit}
    bind:this={profileForm}
  >
  <div class="flex justify-center">
    <AvatarUpload
      {supabase}
      url={profile?.avatar_url}
      size={15}
      on:upload={() => {
        profileForm.requestSubmit();
      }}
    />
  </div>
  <br>
  <br>  
  <div class="text-2xl flex flex-col gap-y-5">
    <div>
      <label for="email">Email</label>
      <input class= "w-[100%] " id="email" type="text" value={user?.email} disabled />
    </div>

    <div>
      <label for="username">Username</label>
      <input class= "w-[100%] text-black p-1 px-3 rounded-lg" name="username" type="text" value={profile?.username} placeholder="Username"/>
    </div> 

    <div>
      <label for="phoneNumber">Phone Number</label>
      <input class= "w-[100%] text-black p-1 px-3 rounded-lg" name="phoneNumber" type="text" value={profile?.phone_number} placeholder="Phone Number"/>
    </div>

    <div>
      <button type="submit" class="shadowEffect button block primary w-full bg-indigo-800 rounded-3xl py-3 my-5" disabled={loading}
        >{loading ? "Loading..." : "Update"}</button
      >
    </div>
  </div>


  </form>
</div>
