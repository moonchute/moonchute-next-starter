"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  usePrepareUserOperation,
  useSendUserOperation,
  useSmartAccounts,
} from "moonchute";
import { useAccount, useNetwork } from "wagmi";
import SampleNFTABI from "./SampleNFT.json";
import AccountDetails from "./components/AccountDetails";
import CardLayout from "./components/CardLayout";
import Loader from "./components/Loader";

export default function RetrieveAccounts() {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { data: accounts, isLoading } = useSmartAccounts({
    address: address,
    chainId: chain?.id,
  });
  const { config, isError: puoIsError } = usePrepareUserOperation({
    address: "0x34bE7f35132E97915633BC1fc020364EA5134863",
    account: accounts?.smartAccount?.[0]?.address as `0x${string}`,
    abi: SampleNFTABI.abi,
    functionName: "mint",
    args: [accounts?.smartAccount?.[0]?.address || address],
  });

  const {
    data: userOpHash,
    write,
    isError: suoIsError,
  } = useSendUserOperation(config);

  return (
    <>
      <h1 className="text-2xl font-bold">Retrieve your smart accounts:</h1>
      <button
        onClick={() => {
          if (write) write();
        }}
      >
        Send UserOperation
      </button>
      {userOpHash && <p>UserOp Hash: {userOpHash.userOpHash}</p>}
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
