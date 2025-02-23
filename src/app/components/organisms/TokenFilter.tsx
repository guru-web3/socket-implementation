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
          token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : tokens;
  console.log({filteredTokens});

  return (
    <div
      className={`max-h-[560px] overflow-y-auto space-y-[8px]`}
      aria-label="Token Filter Container"
    >
      <div
        className="flex gap-x-4 items-center justify-between"
        aria-label="Search and Close Button"
      >
        <input
          type="text"
          placeholder="Search by name or paste address"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 bg- bg-app-dark-surface2 border border-neutral-800 rounded-lg text-app-gray-50 focus:outline-none focus:ring-0 focus:border-transparent"
          aria-label="Search Input"
        />
        <Button
          onClick={() => setIsSelection(null)}
          className="bg- bg-app-dark-surface2 !w-10 h-10 !p-0 rounded-md"
          aria-label="Close Button"
        >
          <Image
            className="cursor-pointer rotate-90"
            src="/icons/close.svg"
            alt="Close"
            width={12}
            height={12}
            aria-label="Close Icon"
          />
        </Button>
      </div>
      {filteredTokens && filteredTokens.length > 0 ? (
        filteredTokens.map((token, index) => (
          <div
            key={`${token.address}-${index}`}
            className={`flex items-center justify-between p-[12px] bg- bg-app-dark-surface2 hover:bg-app-dark-surface4 transition-all rounded-lg`}
            onClick={() => {
              onSelect(token);
              setIsSelection(null);
            }}
            aria-label={`Token ${token.name}`}
          >
            {/* Token Logo and Details */}
            <div
              className="flex items-center gap-[12px]"
              aria-label="Token Details"
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
                  aria-label={`${token.name} Logo`}
                />
              ) : (
                <div
                  className={`w-[32px] h-[32px] bg-neutral rounded-full`}
                  aria-label="Token Placeholder"
                />
              )}
              <div className="flex flex-col">
                <p
                  className={`text-app-gray-50 font-medium`}
                  aria-label="Token Name"
                >
                  {token.name}
                </p>
                <p
                  className={`text-app-gray-300 text-sm`}
                  aria-label="Token Symbol"
                >
                  {token.symbol}
                </p>
              </div>
            </div>

            {/* Token Balance */}
            <p
              className={`text-app-gray-50 font-medium`}
              aria-label="Token Balance"
            >
              {Number(token.balance).toFixed(4)}
            </p>
          </div>
        ))
      ) : (
        <p className="text-app-gray-300 text-sm" aria-label="No Tokens Found">
          No tokens found.
        </p>
      )}
    </div>
  );
};

export default TokenFilter;
