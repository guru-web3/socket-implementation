import React from "react";
import Image from "next/image";
import Dropdown from "../atoms/DropDown";
import Button from "../atoms/Button";
import useSwapStore from "@/store/swapStore";
import useSwapTransactionStore from "@/store/swapTransactionStore";

interface ToTokenSelectionProps {
  changeNetwork: (chainId: string, option: "from" | "to") => void;
}

const ToTokenSelection: React.FC<ToTokenSelectionProps> = ({
  changeNetwork,
}) => {
  const {
    supportedChains,
    selectedToChain,
    selectedToToken,
    setSelectedTokenType,
  } = useSwapStore();

  const { toAmount } = useSwapTransactionStore();
  return (
    <>
      <div className="bg-[#1c1c28] rounded bg-socket-layers-2 mb-4 mt-7" aria-label="To Token Container">
        <div className="border-b-2 border-b-zinc-800 flex items-center justify-between px-3 py-2.5 sm:p-3 max-h-12" aria-label="To Token Header">
          <div className="flex items-center" aria-label="To Token Dropdown">
            <p className="text-sm text-app-gray-50 sm:text-base" aria-label="To Label">To</p>
            <Dropdown
              options={
                supportedChains?.length
                  ? supportedChains.map((chain) => ({
                      value: chain.chainId.toString(),
                      name: chain.name,
                      icon: (
                        <Image
                          src={chain?.icon}
                          alt={chain.name}
                          width={20}
                          height={20}
                          className="rounded-full h-5 w-5"
                          aria-label={`${chain.name} Icon`}
                        />
                      ),
                    }))
                  : []
              }
              onChange={(e) => changeNetwork(e, "to")}
              inputSize="lg"
              defaultValue={selectedToChain?.chainId.toString()}
              classes={{
                container: "w-40",
              }}
              aria-label="To Chain Dropdown"
            />
          </div>
          <div className="flex items-center text-sm font-semibold text-socket-primary sm:text-base" aria-label="To Token Balance">
            <span className="pr-1 text-app-gray-50" aria-label="Balance Label">Bal:</span>
            {Number(selectedToToken?.balance)?.toFixed(4)} {selectedToToken?.symbol}
          </div>
        </div>
        <div className="flex items-center justify-between px-3 py-[14px] sm:py-3 max-h-16" aria-label="To Token Input">
          <input
            type="number"
            placeholder="0.0"
            className="w-full bg-transparent text-lg font-bold leading-7 text-socket-primary focus:outline-none sm:text-xl"
            value={toAmount?.toFixed(4)}
            aria-label="To Amount Input"
          />
          <span className="text-sm text-app-gray-50" aria-label="To Token Button">
            <Button
              onClick={() => {
                setSelectedTokenType("to");
              }}
              variant="primary"
              className="foucs:outline-none m-2 bg-gray-800 hover:bg-gray-800"
              aria-label="Select To Token Button"
            >
              {selectedToToken ? (
                <>
                  <Image
                    src={
                      selectedToToken.logoURI ||
                      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png"
                    }
                    alt={selectedToToken.name}
                    height={24}
                    width={24}
                    unoptimized
                    aria-label={`${selectedToToken.name} Icon`}
                  />
                  <p aria-label="Selected To Token Symbol"> {selectedToToken.symbol} </p>
                </>
              ) : (
                <p aria-label="Select Token Text"> Select </p>
              )}
              <Image
                src="/icons/drop-down.svg"
                alt="Arrow Up"
                color="white"
                width={18}
                height={18}
                aria-label="Dropdown Icon"
              />
            </Button>
          </span>
        </div>
      </div>
    </>
  );
};

export default ToTokenSelection;
