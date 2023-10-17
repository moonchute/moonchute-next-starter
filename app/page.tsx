"use client";

import {
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { createMoonChuteConfig, MoonChuteConfig } from "moonchute";
import { useEffect, useState } from "react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum, base, optimism, polygon, polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import RetrieveAccounts from "./RetrieveAccounts";

const { chains, publicClient } = configureChains(
  [polygonMumbai, polygon, optimism, arbitrum, base],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  projectId: "90ac76822bf02af9e25215888f547e70",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const config = createMoonChuteConfig({
  apiKey: process.env.NEXT_PUBLIC_MOONCHUTE_API_KEY || "",
});

export default function Home() {
  const [hydrate, setHydrate] = useState(false);
  useEffect(() => {
    setHydrate(true);
  }, []);

  if (!hydrate) {
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-6 py-24 bg-cyan-50">
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider
          chains={chains}
          theme={lightTheme({
            accentColor: "#15aabf",
          })}
        >
          <MoonChuteConfig config={config}>
            <RetrieveAccounts />
          </MoonChuteConfig>
        </RainbowKitProvider>
      </WagmiConfig>
    </main>
  );
}