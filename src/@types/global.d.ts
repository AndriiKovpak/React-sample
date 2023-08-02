declare global {
  interface Window {
    dataLayer: any[];
  }
  namespace NodeJS {
    interface ProcessEnv {
      // server itself
      NEXT_PUBLIC_ENV: "dev" | "preview" | "production"; // is prod only when deployed to prod
      NODE_ENV: "development" | "production"; // is prod anytime app is built

      NEXT_PUBLIC_BACKEND_HOST: string;

      NEXT_PUBLIC_PORT: string;
      NEXT_PUBLIC_GQL_URL: string;
      NEXT_PUBLIC_SUBSCRIPTION_URL: string;
      NEXT_PUBLIC_API_URL: string;

      NEXT_PUBLIC_GTAG_ID: string;

      OPENAI_KEY: string;
      ANTHROPIC_API_KEY: string;
    }
  }
}

export {};
