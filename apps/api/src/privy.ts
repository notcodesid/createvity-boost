import { PrivyClient } from "@privy-io/server-auth";

let client: PrivyClient | null = null;

export function getPrivyAppId(): string {
  return (
    process.env.PRIVY_APP_ID ??
    process.env.NEXT_PUBLIC_PRIVY_APP_ID ??
    "cmrriqmv8001i0cl13t8hrtuv"
  );
}

export function getPrivyClient(): PrivyClient {
  const appId = getPrivyAppId();
  const appSecret = process.env.PRIVY_APP_SECRET;

  if (!appSecret) {
    throw new Error(
      "PRIVY_APP_SECRET is not set. Add it from https://dashboard.privy.io/ (App settings → Secrets).",
    );
  }

  if (!client) {
    client = new PrivyClient(appId, appSecret);
  }
  return client;
}

export function isPrivyConfigured(): boolean {
  return Boolean(process.env.PRIVY_APP_SECRET);
}
