"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useSmartAccounts } from "moonchute";
import { useAccount, useNetwork } from "wagmi";
import AccountDetails from "./components/AccountDetails";
import Loader from "./components/Loader";

function CardLayout({ children }: { children: any }) {
  return (
    <div className="flex flex-col justify-around items-center min-w-48 w-full h-40 p-2 rounded-2xl border-2 border-zinc-900 m-auto xs:p-4 sm:p-5">
      {children}
    </div>
  );
}
export default function RetrieveAccounts() {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const {
    data: accounts,
    isLoading,
    isError,
  } = useSmartAccounts({
    address: address,
    chainId: chain?.id,
  });

  return (
    <>
      <h1 className="text-2xl font-bold">Retrieve your smart accounts:</h1>
      <div className="flex flex-col items-center miw-w-full md:min-w-3/4 bg-[#F6BD41] border-zinc-900 dark:border-0 border-2 rounded-lg p-6 md:p-10 mt-2">
        <ConnectButton />
        <div className="grid grid-cols-1 my-12 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
          {isLoading
            ? [...Array(3)].map((_, index) => (
                <CardLayout key={index}>
                  <Loader />
                </CardLayout>
              ))
            : accounts?.smartAccount?.map((account: any, index: number) => (
                <CardLayout key={index}>
                  <AccountDetails account={account} index={index} />
                </CardLayout>
              ))}
        </div>
      </div>
    </>
  );
}
