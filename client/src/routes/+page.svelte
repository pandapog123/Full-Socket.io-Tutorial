<script lang="ts">
  import { idStore } from "../services/id";
  import { sendMessage } from "../socket";
  import { messagesStore } from "../state/messages";

  let messageInput = "";

  function handleSubmit() {
    if ($idStore) {
      sendMessage(messageInput, $idStore);
    }

    messageInput = "";
  }

  let listRef: HTMLElement | undefined;

  $: {
    console.log("hello?");

    if (listRef) {
      listRef.scrollTo({
        behavior: "smooth",
        top: 0,
      });
    }
  }
</script>

<header>
  <h1>Full Socket.io tutorial</h1>
</header>

<main>
  <div class="list-wrapper">
    <ul bind:this={listRef}>
      {#each $messagesStore.reverse() as message}
        <li class="message-wrapper">
          {#if message.userid === $idStore}
            <div />
          {/if}

          <p class="message" class:user-message={message.userid === $idStore}>
            {message.content}
          </p>

          {#if message.userid !== $idStore}
            <div />
          {/if}
        </li>
      {/each}
    </ul>
  </div>

  <form class="input-container" on:submit|preventDefault={handleSubmit}>
    <input type="text" bind:value={messageInput} />

    <button type="submit">Submit</button>
  </form>
</main>

<style>
  header {
    height: 10vh;
    display: grid;
    place-items: center;
    background-color: bisque;
  }

  main {
    height: 90vh;
    display: grid;
    grid-template-rows: auto 80px;
  }

  button {
    background-color: deepskyblue;
    border: none;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    color: white;
  }

  input {
    padding: 0.2rem;
    font-size: 1rem;
  }

  .list-wrapper {
    overflow-y: scroll;
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: cornsilk;
  }

  ul {
    width: 50%;
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .message-wrapper {
    display: flex;
    justify-content: space-between;
  }

  .message {
    padding: 0.5rem 1rem;
    max-width: 50vmin;
    width: fit-content;
    color: white;
    font-size: 1.25rem;
    border-radius: 1.25rem;
    overflow-wrap: break-word;
    background-color: dimgray;
    margin: 0;
  }

  .user-message {
    background-color: deepskyblue;
  }

  .input-container {
    width: 100vw;
    background-color: bisque;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
</style>
