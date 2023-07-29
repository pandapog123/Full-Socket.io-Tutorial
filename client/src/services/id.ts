import { browser } from "$app/environment";
import { writable } from "svelte/store";
import { v4 as uuid } from "uuid";

export const idStore = writable<string | undefined>(undefined, (set) => {
  if (!browser) {
    return;
  }

  const cachedId = localStorage.getItem("id");

  if (cachedId) {
    set(cachedId);

    return;
  }

  const newId = uuid();

  localStorage.setItem("id", newId);

  set(newId);
});
