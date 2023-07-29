export interface Message {
  content: string;
  userid: string;
  id: string;
}

export function validateMessage(message: any): Message | undefined {
  if (typeof message !== "object") {
    return;
  }

  const content = message.content;
  const userid = message.userid;
  const id = message.id;

  if (
    typeof content !== "string" ||
    typeof userid !== "string" ||
    typeof id !== "string"
  ) {
    return;
  }

  return {
    content,
    userid,
    id,
  };
}
