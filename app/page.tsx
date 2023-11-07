"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useCreateSmartAccount, useSmartAccounts } from "moonchute";
import { useEffect, useState } from "react";
import { useAccount, useNetwork } from "wagmi";
import SampleNFTABI from "./SampleNFT.json";
import AccountDetails from "./components/AccountDetails";
import CardLayout from "./components/CardLayout";
import Loader from "./components/Loader";

export default function RetrieveAccounts() {
  const [hydration, setHydration] = useState<boolean>(false);
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

  const {
    data: createUserOp,
    write: createWrite,
    isLoading: createIsLoading,
    isError: createIsError,
  } = useCreateSmartAccount({
    abi: SampleNFTABI.abi,
    address: "0x34bE7f35132E97915633BC1fc020364EA5134863",
    functionName: "mint",
    args: ["0x6136b647C9971f1EDc7641e14a9E0Ca7b2626080"],
  });

  useEffect(() => {
    setHydration(true);
  }, []);

  useEffect(() => {
    if (createUserOp) {
      console.log(createUserOp);
      alert(`Create successfully! userOp hash: ${createUserOp.userOpHash}`);
    }
  }, [createUserOp]);

  if (!hydration) return null;
  return (
    <div className="flex flex-col gap-4 items-center miw-w-full md:min-w-3/4 bg-[#F6BD41] border-zinc-900 dark:border-0 border-2 rounded-lg p-4 md:p-6 mt-2">
      <h1 className="text-2xl font-bold">Small smart account manager</h1>
      <ConnectButton />
      <button
        className={`min-w-[200px] flex justify-center rounded-xl ${
          !createIsLoading ? "bg-white" : "bg-zinc-200"
        } shadow-sm shadow-zinc-300 hover:scale-105 transition-all font-semibold text-black py-2 px-4`}
        onClick={() => {
          if (createWrite) createWrite();
        }}
        disabled={createIsLoading}
      >
        {createIsLoading ? <Loader /> : "Create Smart Account"}
      </button>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
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
  );
}
