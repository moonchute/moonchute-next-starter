"use client";
import { usePrepareUserOperation, useSendUserOperation } from "moonchute";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import SampleNFTABI from "../SampleNFT.json";
import Loader from "./Loader";

export default function AccountDetails({
  account,
  index,
}: {
  account: any;
  index: number;
}) {
  const { address } = useAccount();
  const {
    config,
    error,
    isLoading: isPreparing,
    isError: puoIsError,
  } = usePrepareUserOperation({
    address: "0x34bE7f35132E97915633BC1fc020364EA5134863",
    account: account.address as `0x${string}`,
    abi: SampleNFTABI.abi,
    functionName: "mint",
    args: [account.address || address],
  });

  const {
    data: userOpHash,
    write,
    isLoading: isUserOpLoading,
    isError: suoIsError,
  } = useSendUserOperation(config);

  useEffect(() => {
    if (userOpHash) {
      console.log(userOpHash);
      alert(`Mint successfully! userOp hash: ${userOpHash.userOpHash}`);
    }
  }, [userOpHash]);

  return (
    <div className="w-full h-full flex flex-col gap-2 justify-between">
      <div className="p-4">
        <div className="font-semibold">{`Smart Account ${index + 1}`}</div>
        <div>
          {`address: ${account.address.slice(0, 6)}...${account.address.slice(
            -4
          )}`}
        </div>
        <div>{`provider: ${account.provider}`}</div>
      </div>
      <button
        className="flex justify-center rounded-b-xl w-full bg-black hover:bg-transparent  text-white font-semibold hover:text-black py-2 px-4 border-t-2 border-black"
        onClick={() => {
          if (write) write();
        }}
      >
        {isPreparing ? (
          "Prepare your userop"
        ) : isUserOpLoading ? (
          <Loader />
        ) : (
          "Mint! (with userop)"
        )}
      </button>
    </div>
  );
}
