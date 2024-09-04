<script lang="ts">
  import type { SupabaseClient } from "@supabase/supabase-js";
  import { createEventDispatcher } from "svelte";

  export let size = 10;
  export let url: string;
  export let supabase: SupabaseClient;

  let avatarUrl: string | null = null;
  let uploading = false;
  let files: FileList;

  const dispatch = createEventDispatcher();

  const downloadImage = async (path: string) => {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);

      if (error) {
        throw error;
      }

      const url = URL.createObjectURL(data);
      avatarUrl = url;
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error downloading image: ", error.message);
      }
    }
  };

  const uploadAvatar = async () => {
    try {
      uploading = true;

      if (!files || files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${Math.random()}.${fileExt}`;

      const { error } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (error) {
        throw error;
      }

      url = filePath;
      setTimeout(() => {
        dispatch("upload");
      }, 100);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      uploading = false;
    }
  };

  $: if (url) downloadImage(url);
</script>

<div>
  {#if avatarUrl}
    <img
      src={avatarUrl}
      alt={avatarUrl ? "Avatar" : "No image"}
      class="avatar image rounded-full object-cover"
      style="height: {size}em; width: {size}em;" 
    />
  {:else}
    <div class="avatar no-image" style="height: {size}em; width: {size}em;" />
  {/if}
  <input type="hidden" name="avatarUrl" value={url} />

  <div class="flex items-center justify-center mt-2"  >
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera-fill" viewBox="0 0 16 16">
      <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
      <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0"/>
    </svg>
      <label class="button primary block text-center ml-2" for="single">
      {uploading ? "Uploading ..." : "Upload"}
    </label>
    <input
      style="visibility: hidden; position:absolute;"
      type="file"
      id="single"
      accept="image/*"
      bind:files
      on:change={uploadAvatar}
      disabled={uploading}
    />
  </div>
</div>
