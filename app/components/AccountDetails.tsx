export default function AccountDetails({
  account,
  index,
}: {
  account: any;
  index: number;
}) {
  return (
    <div className="w-full h-full flex flex-col gap-2">
      <div className="font-semibold">{`Smart Account ${index + 1}`}</div>
      <div>
        {`address: ${account.address.slice(0, 6)}...${account.address.slice(
          -4
        )}`}
      </div>
      <div>{`provider: ${account.provider}`}</div>
    </div>
  );
}
