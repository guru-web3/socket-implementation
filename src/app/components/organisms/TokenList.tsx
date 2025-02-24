import {
  TokenCardProps,
  useVisibleAssets,
} from "@/app/composibles/useAssetsBalance";
import React, { useState } from "react";
import { Loader } from "../molecules/Loader";
import dynamic from "next/dynamic";
import { Token } from "@/app/services/api/socket.interface";

const TokenTransfer = dynamic(
  () => import("./TokenTransfer").then((module) => module.TokenTransfer),
  { ssr: false },
);
const TokenImage = dynamic(
  () => import("../molecules/TokenImage").then((module) => module.TokenImage),
  { ssr: false },
);
const TokenFilter = dynamic(
  () => import("./TokenFilter").then((module) => module.default),
  { ssr: false },
);

const TokenList: React.FC = ({}) => {
  const { visibleAssets, loading } = useVisibleAssets();
  const [selectedToken, setSelectedToken] = useState<TokenCardProps>();

  const handleTokenDetails = (token: Token) => {
    const tokenMapped = visibleAssets.find(
      (asset) => asset.address == token.address,
    );
    if (tokenMapped) {
      setSelectedToken(tokenMapped);
    }
  };

  const formatVisibleAssets = (assets: TokenCardProps[]): Token[] => {
    return assets.map((asset) => ({
      address: asset.address,
      name: asset.name,
      symbol: asset.crypto,
      decimals: asset.decimals,
      logoURI: asset.icon || "",
      balance: asset.balance ? parseFloat(asset.balance) : 0,
      tokenImage: (
        <TokenImage
          name={asset.name}
          icon={asset.icon}
          networkImage={asset.networkImage}
        />
      ),
    }));
  };

  const formattedAssets = formatVisibleAssets(visibleAssets);

  return (
    <>
      {selectedToken ? (
        <TokenTransfer selectedToken={selectedToken} />
      ) : (
        <div
          className={`overflow-auto w-full h-[560px] @xs/root:h-[calc(100vh_-_510px)] ${
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
                <TokenFilter
                  tokens={formattedAssets}
                  onSelect={handleTokenDetails}
                  setIsSelection={() => {}}
                  tokenImage={true}
                />
              </>
            ) : loading ? (
              <Loader aria-label="Loading Tokens" />
            ) : (
              <p aria-label="No Tokens Found"> </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TokenList;
