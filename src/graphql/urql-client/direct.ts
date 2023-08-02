import { createClient } from "@urql/core";
import { fetchExchange } from "urql";

export const directUrqlClient = (cookie: string = "") =>
  createClient({
    url: process.env.NEXT_PUBLIC_GQL_URL,
    fetchOptions: { credentials: "include" as const, headers: { cookie } },
    exchanges: [fetchExchange],
  });
