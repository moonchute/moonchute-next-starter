"use client";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { createMoonChuteConfig, MoonChuteConfig } from "moonchute";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum, base, optimism, polygon, polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

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

export default function Providers({ children }: { children: React.ReactNode }) {
  const config = createMoonChuteConfig({
    appId: process.env.NEXT_PUBLIC_MOONCHUTE_APP_ID || "",
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-6 py-24 bg-cyan-50">
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <MoonChuteConfig config={config}>{children}</MoonChuteConfig>
        </RainbowKitProvider>
      </WagmiConfig>
    </main>
  );
}
