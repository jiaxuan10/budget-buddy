<script lang="ts">
  // Imports
  import MessageItem from "$lib/components/MessageItem.svelte"; // Importing MessageItem component
  import leftarrow from "$lib/images/arrow.png"; // Importing left arrow image
  import send from "$lib/images/send.png"; // Importing send image
  import personProfile from "$lib/images/Person.png"; // Importing default profile image
  import { supabase } from "../../../main"; // Importing supabase client instance
  import { page } from "$app/stores";
  import { onMount, setContext } from "svelte";

  export let data;
  let {session} = data;
  const channelId = $page.params.channelId;

  // Array to store fetched messages
  let messages: Message[] = [];
  let userIdToUsernameMap: Map<any, string> = new Map();
  let userIdToUserProfileMap: Map<any, string> = new Map();

  // Variable to store new message input
  let newMessageText = "";

  setContext('showMobileHeader', false);
  
  // Interface for message object
  interface Message {
    user_id: string | undefined;
    id: number;
    text: string;
    user_name: string;
    created_at: string;
    profile?: string;
  }
  
  // Function to scroll to the bottom of messages container
  async function scrollToBottom() {
    try {
      const messagesContainer = document.querySelector('.messages-container');
      if (messagesContainer) {
        // Wait for a short delay to ensure messages are rendered before scrolling
        await new Promise(resolve => setTimeout(resolve, 100));
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    } catch (error) {
      console.error('Error scrolling to bottom:', error);
    }
  }
  
  // Function to format message timestamp
  function formatTime(timestamp: string): string {
    const messageTime = new Date(timestamp);
    const currentTime = new Date();
    const diff = Math.floor((currentTime.getTime() - messageTime.getTime()) / 1000); 
    
    if (diff < 60) {
      return 'just now';
    } else if (diff < 3600) {
      const minutes = Math.floor(diff / 60);
      return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
    } else if (diff < 24 * 3600) {
      const hours = Math.floor(diff / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const day = messageTime.getDate();
      const month = messageTime.getMonth() + 1;
      const year = messageTime.getFullYear() % 100;
      const hours = messageTime.getHours();
      const minutes = messageTime.getMinutes() < 10 ? '0' + messageTime.getMinutes() : messageTime.getMinutes();
      const ampm = hours >= 12 ? 'pm' : 'am';
      const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
      return `${month}/${day}/${year} ${formattedHours}:${minutes}${ampm}`;
    }
  }

  // Function to fetch messages from database
  async function fetchMessages() {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("channel_id", channelId)
      .order("msg_id", { ascending: true });
    if (error) {
      console.error("Error fetching messages:", error.message);
    } else {
      messages = data;
    }
  }

  // Function to post a new message to the database
  async function postMessage(text: string, user_id: any) {
    const { data, error } = await supabase
      .from("messages")
      .insert([{ channel_id: channelId, text, user_id: user_id }]);
    if (error) {
      console.error("Error posting message:", error.message);
    } else {
      fetchMessages().then(async () => {
        newMessageText = ""; // Clear new message input
        await scrollToBottom(); // Scroll to bottom after messages are fetched
      });
    }
  }

  // Function to fetch forum title
  async function fetchForumTitle() {
    try {
      const { data, error } = await supabase
        .from("forums")
        .select("title")
        .eq("id", channelId)
        .single();
      if (error) {
        throw new Error("Error fetching forum title");
      } else {
        return data ? data.title : null;
      }
    } catch (error) {
      console.error("Error fetching forum title:",error);
      throw error;
    }
  }

  // Fetch messages when the component mounts
  onMount(async () => {
    try {
      await fetchMessages();
      await Promise.all([
        Promise.all(messages.map(message => getUserName(message.user_id))),
        Promise.all(messages.map(message => getUserProfile(message.user_id)))
      ]);
      await scrollToBottom(); // Scroll to bottom after messages, usernames, and user profiles are fetched
    } catch (error) {
      console.error("Error mounting component:", error);
    }
  });

  // Function to fetch username
  async function getUserName(user_id: any): Promise<string | null> {
    try {
      if (userIdToUsernameMap.has(user_id)) {
        return userIdToUsernameMap.get(user_id) || null;
      }
      const { data, error } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", user_id)
        .single();
      if (error) {
        throw new Error("Error fetching username");
      } else {
        const username = data?.username || "Unknown";
        userIdToUsernameMap.set(user_id, username);
        return username;
      }
    } catch (error) {
      console.error("Error fetching username:", error);
      throw error;
    }
  }

  // Function to fetch user profile
  async function getUserProfile(user_id: any): Promise<string | null> {
    try {
      if (userIdToUserProfileMap.has(user_id)) {
        return userIdToUserProfileMap.get(user_id) || null;
      }
      const { data, error } = await supabase
        .from("profiles")
        .select("avatar_url")
        .eq("id", user_id)
        .single();
      if (error) {
        throw new Error("Error fetching profile");
      } else {
        const userProfile = data?.avatar_url || "Unknown";
        userIdToUserProfileMap.set(user_id, userProfile);
        return userProfile;
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      throw error;
    }
  }
</script>

<div class="-m-4 md:-m-6">
  <!-- Top bar -->
  <div class="flex bg-[#060047] h-[8vh] justify-start px-[15px] w-[100%] md:hidden">
    <a href="/forums" class="m-auto w-[35px] h-[35px]">
      <img src={leftarrow} alt="" />
    </a>
    <h2 class="flex-1 text-2xl font-bold text-white m-auto ml-2">
      {#await fetchForumTitle()}
        <p>Loading...</p>
      {:then title}
        {title}
      {:catch error}
        <p>Error: {error.message}</p>
      {/await}
    </h2>
  </div>

  <!-- Messages container -->
  <div class="flex flex-col h-[80vh] bg-gray-100 justify-between md:h-[82vh] pb-10">
    <div class="p-4 space-y-4 bg-gray-100 overflow-auto messages-container">
      {#each messages as message}
        {#await Promise.all([getUserName(message.user_id), getUserProfile(message.user_id)]) then [username, userProfile]}
          <MessageItem
            text={message.text}
            user={message.user_id !== session?.user.id}
            time={formatTime(message.created_at)}
            profile={userProfile}
            username={username}
          />
        {:catch error}
          <p>Error: {error.message}</p>
        {/await}
      {/each}
    </div>
  </div>

  <!-- New message input and send button -->
  <div class="flex justify-between items-start p-4 bg-white bg-[#bdbebf] fixed w-[100%] bottom-16 md:bottom-0">
    <input
      bind:value={newMessageText}
      class="flex-1 mx-2 border-2 w-[80%] rounded p-3 text-sm shadow-inner text-[black] rounded-[20px]"
      type="text"
      placeholder="Type your message…"
    />
    {#if newMessageText !== ""}
      <button
        on:click={() => {
          postMessage(newMessageText, session?.user.id);
        }}
        class="h-[45px] w-[45px] bg-blue-600 p-2.5 rounded-[50%]"
      >
        <img src={send} alt="" class="bg-center" />
      </button>
    {/if}
  </div>
</div>