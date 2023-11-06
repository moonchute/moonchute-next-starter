"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useCreateSmartAccount, useSmartAccounts } from "moonchute";
import { useAccount, useNetwork } from "wagmi";
import SampleNFTABI from "../SampleNFT.json";
import AccountDetails from "../components/AccountDetails";
import CardLayout from "../components/CardLayout";
import Loader from "../components/Loader";

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

  return (
    <>
      <h1 className="text-2xl font-bold">Retrieve your smart accounts:</h1>
      <button
        onClick={() => {
          if (createWrite) createWrite();
        }}
      >
        Create Smart Account
      </button>
      {createUserOp && <p>UserOp Hash: {createUserOp.userOpHash}</p>}
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
