import React, { useState } from "react";
import Image from "next/image";
import Button from "../atoms/Button";
import { Token } from "@/app/services/api/socket.interface";
import { TokenType } from "@/store/swapStore";

interface TokenFilterProps {
  tokens: Token[];
  onSelect: (token: Token) => void;
  setIsSelection: (isSelection: TokenType | null) => void;
  tokenImage?: boolean;
}

const TokenFilter: React.FC<TokenFilterProps> = ({
  tokens,
  onSelect,
  setIsSelection,
  tokenImage,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTokens = searchQuery
    ? tokens.filter(
        (token) =>
          token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          token.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : tokens;
  console.log({ filteredTokens });

  return (
    <div
      className={`max-h-[560px] overflow-y-auto space-y-[8px]`}
      data-testid="token-filter-container"
    >
      <div
        className="flex gap-x-4 items-center justify-between"
        data-testid="search-and-close-button"
      >
        <input
          type="text"
          placeholder="Search by name or paste address"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 bg- bg-app-dark-surface2 border border-neutral-800 rounded-lg text-app-gray-50 focus:outline-none focus:ring-0 focus:border-transparent"
          data-testid="search-input"
        />
        <Button
          onClick={() => setIsSelection(null)}
          className="bg- bg-app-dark-surface2 !w-10 h-10 !p-0 rounded-md"
          data-testid="close-button"
        >
          <Image
            className="cursor-pointer rotate-90"
            src="/icons/close.svg"
            alt="Close"
            width={12}
            height={12}
            data-testid="close-icon"
          />
        </Button>
      </div>
      {filteredTokens && filteredTokens.length > 0 ? (
        filteredTokens.map((token, index) => (
          <div
            key={`${token.address}-${index}`}
            role="listitem"
            className={`flex items-center justify-between p-[12px] bg- bg-app-dark-surface2 hover:bg-app-dark-surface4 transition-all rounded-lg`}
            onClick={() => {
              onSelect(token);
              setIsSelection(null);
            }}
            data-testid={`token-${token.name}`}
          >
            {/* Token Logo and Details */}
            <div
              className="flex items-center gap-[12px]"
              data-testid="token-details"
            >
              {tokenImage ? (
                token.tokenImage
              ) : token.logoURI ? (
                <Image
                  src={token.logoURI}
                  alt={token.name}
                  width={32}
                  height={32}
                  className={`rounded-full`}
                  unoptimized
                  data-testid={`${token.name}-logo`}
                />
              ) : (
                <div
                  className={`w-[32px] h-[32px] bg-neutral rounded-full`}
                  data-testid="token-placeholder"
                />
              )}
              <div className="flex flex-col">
                <p
                  className={`text-app-gray-50 font-medium`}
                  data-testid="token-name"
                >
                  {token.name}
                </p>
                <p
                  className={`text-app-gray-300 text-sm`}
                  data-testid="token-symbol"
                >
                  {token.symbol}
                </p>
              </div>
            </div>

            {/* Token Balance */}
            <p
              className={`text-app-gray-50 font-medium`}
              data-testid="token-balance"
            >
              {Number(token.balance).toFixed(4)}
            </p>
          </div>
        ))
      ) : (
        <p className="text-app-gray-300 text-sm" data-testid="no-tokens-found">
          No tokens found.
        </p>
      )}
    </div>
  );
};

export default TokenFilter;
