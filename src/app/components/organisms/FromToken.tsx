import React from "react";
import Image from "next/image";
import Dropdown from "../atoms/DropDown";
import Button from "../atoms/Button";
import useSwapStore from "@/store/swapStore";
import useSwapTransactionStore from "@/store/swapTransactionStore";

interface FromTokenSelectionProps {
  changeNetwork: (chainId: string, option: "from" | "to") => void;
}

const FromTokenSelection: React.FC<FromTokenSelectionProps> = ({
  changeNetwork,
}) => {
  const {
    supportedChains,
    selectedFromChain,
    selectedFromToken,
    setSelectedTokenType,
  } = useSwapStore();

  const {fromAmount, setFromAmount} = useSwapTransactionStore();

  return (
    <>
      <div className="bg- bg-app-dark-surface2 rounded bg-socket-layers-2 mb-[-1]" aria-label="From Token Container">
        <div className="border-b-2 border-b-zinc-800 flex items-center justify-between px-3 py-2.5 sm:p-3 max-h-12" aria-label="From Token Header">
          <div className="flex items-center" aria-label="From Token Dropdown">
            <p className="text-sm text-app-gray-50 sm:text-base" aria-label="From Label">From</p>
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
              onChange={(e) => changeNetwork(e, "from")}
              inputSize="lg"
              defaultValue={selectedFromChain?.chainId.toString()}
              classes={{
                container: "w-40",
              }}
              aria-label="From Chain Dropdown"
            />
          </div>
          <div className="flex items-center text-sm font-semibold text-socket-primary sm:text-base" aria-label="From Token Balance">
            <span className="pr-1 text-app-gray-50" aria-label="Balance Label">Bal:</span>
            {Number(selectedFromToken?.balance).toFixed(4)} {selectedFromToken?.symbol}
          </div>
        </div>
        <div className="flex items-center justify-between px-3 py-[14px] sm:py-3 max-h-16" aria-label="From Token Input">
          <input
            type="number"
            placeholder="0.0"
            className="w-full bg-transparent text-lg font-bold leading-7 text-socket-primary focus:outline-none sm:text-xl"
            onChange={(e) => setFromAmount(Number(e.target.value))}
            value={fromAmount}
            aria-label="From Amount Input"
          />
          <span className="text-sm text-app-gray-50" aria-label="From Token Button">
            <Button
              onClick={() => {
                setSelectedTokenType("from");
              }}
              variant="primary"
              className="foucs:outline-none m-2 bg-gray-800 hover:bg-gray-800"
              aria-label="Select From Token Button"
            >
              {selectedFromToken ? (
                <>
                  <Image
                    src={
                      selectedFromToken.logoURI ||
                      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png"
                    }
                    alt={selectedFromToken.name}
                    height={24}
                    width={24}
                    unoptimized
                    aria-label={`${selectedFromToken.name} Icon`}
                  />
                  <p aria-label="Selected From Token Symbol"> {selectedFromToken.symbol} </p>
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

export default FromTokenSelection;
