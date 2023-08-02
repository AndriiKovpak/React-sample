export class Environment {
  static isProd = process.env.NEXT_PUBLIC_ENV === "production";
  static isStagisPreviewing = process.env.NEXT_PUBLIC_ENV === "preview";
  static isDev = process.env.NEXT_PUBLIC_ENV === "dev";
  static port = parseInt(process.env.NEXT_PUBLIC_PORT!);
  static govinfoUrl = "https://www.govinfo.gov";

  static backendHost = process.env.NEXT_PUBLIC_BACKEND_HOST;

  static isServer() {
    return typeof window === "undefined";
  }

  static isBrowser() {
    return !Environment.isServer();
  }
}
