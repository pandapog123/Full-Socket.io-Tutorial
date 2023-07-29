import { writable } from "svelte/store";
import type { Message } from "../models/message";

export const messagesStore = writable<Message[]>([]);
