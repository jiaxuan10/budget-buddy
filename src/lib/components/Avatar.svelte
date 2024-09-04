<script lang="ts">
  import type { SupabaseClient } from "@supabase/supabase-js";
  export let supabase: SupabaseClient;
  export let size = 10;
  export let url: string;

  let avatarUrl: string | null = null;

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

  $: if (url) downloadImage(url);
</script>

<div>
<img
  src={avatarUrl ||
    "https://ihiyzkhbmnwmirtcmbva.supabase.co/storage/v1/object/sign/avatars/BudgetBuddy.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzL0J1ZGdldEJ1ZGR5LnBuZyIsImlhdCI6MTcxMzAwOTA1NCwiZXhwIjoxOTY1Mjk3MDU0fQ.B88Wr0Lg95jGIAlstu2gt4pfcfFnkArnYjQqfHbJe30&t=2024-04-13T11%3A50%3A54.376Z"}
  alt={avatarUrl ? "Avatar" : "No image"}
  class="object-cover border-2 border-indigo-500	"
  style="height: {size}px; width: {size}px; border-radius: 50%"
/>
</div>
