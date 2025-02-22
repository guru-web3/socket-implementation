import {
  TokenCardProps,
  useVisibleAssets,
} from "@/app/composibles/useAssetsBalance";
import React, { useState } from "react";
import { TokenCard } from "../molecules/TokenCard";
import { Loader } from "../molecules/Loader";
import { TokenTransfer } from "./TokenTransfer";

const TokenList: React.FC = ({
}) => {
  const { visibleAssets, loading } = useVisibleAssets();
  const [selectedToken, setSelectedToken] = useState<TokenCardProps>()

  const handleTokenDetails = (token: TokenCardProps) => {
    setSelectedToken(token);
  };

  return (
    <>
    {
      selectedToken ? (
        <TokenTransfer selectedToken={selectedToken} />
      ) : (
        <div
          className={`overflow-auto w-full h-[calc(100vh_-_330px)] @xs/root:h-[calc(100vh_-_410px)] ${
            visibleAssets.length <= 0
              ? "flex flex-col items-center justify-center"
              : ""
          }`}
          aria-label="Token List Container"
        >
          <div
            className={`grid gap-2 grid-cols-1 @sm/root:grid-cols-2 @md/root:grid-cols-4 @lg/root:grid-cols-6 @2xl/root:grid-cols-8 ${
              visibleAssets.length <= 0 ? "!grid-cols-1" : ""
            }`}
            aria-label="Token Grid"
          >
            {visibleAssets.length > 0 ? (
              <>
                {visibleAssets.map((token) => (
                  <div
                    key={token.assetId}
                    className="hover:cursor-pointer appearance-none bg-app-light-surface3 dark:bg-app-dark-surface3 rounded-2xl p-4 flex @md/root:flex-col items-center justify-between @md/root:items-start gap-x-8 @md/root:gap-y-8"
                    onClick={() => handleTokenDetails(token)}
                    aria-label={`Token Card ${token.name}`}
                  >
                    <TokenCard {...token} />
                  </div>
                ))}
                {visibleAssets.length >= 5 && <div className="h-20 w-full" aria-label="Spacer" />}
              </>
            ) : loading ? (
              <Loader aria-label="Loading Tokens" />
            ) : (
              <p aria-label="No Tokens Found"> </p>
            )}
          </div>
        </div>
      )
    }
    </>
  );
};

export default TokenList;
