import { io } from "socket.io-client";
import { validateMessage, type Message } from "../models/message";
import { messagesStore } from "../state/messages";

const socket = io("ws://localhost:3000");

socket.on("connect", () => {
  console.log("Successfully connected to socket");
});

socket.on("messages", (messages) => {
  if (!Array.isArray(messages)) {
    return;
  }

  let validatedMessages: Message[] = [];

  let limitedMessages = messages.filter((_, index) => {
    return index < 25;
  });

  for (const message of limitedMessages) {
    const validatedMessage = validateMessage(message);

    if (validatedMessage) {
      validatedMessages.push(validatedMessage);
    }
  }

  messagesStore.set(validatedMessages);
});

interface SendSuccess {
  message: string;
}

interface SendError {
  error: string;
}

export function sendMessage(content: string, id: string) {
  return new Promise(
    (
      resolve: (value: SendSuccess) => void,
      reject: (value: SendError) => void
    ) => {
      socket.emit("message", content, id, (response: any) => {
        const error = response.error;

        if (error) {
          if (typeof error !== "string") {
            reject({ error: "Error sending message" });

            return;
          }

          reject({ error });

          return;
        }

        const message = response.message;

        if (!message || typeof message !== "string") {
          reject({ error: "Unexpected result from server" });

          return;
        }

        resolve({ message });
      });
    }
  );
}
