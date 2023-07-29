import type { PageLoad } from "./$types";

export const ssr = false;

export const load = (async () => {
  return {
    socket: await import("../socket"),
  };
}) satisfies PageLoad;
