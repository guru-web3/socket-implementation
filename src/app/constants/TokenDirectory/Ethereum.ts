import { AssetInfo } from "@/app/constants/asset.interface";

export const ethereumTokens: AssetInfo[] = [
  {
    assetId: "ethereum.0x0",
    network: "ethereum",
    chainId: 1,
    address: "0x0",
    name: "ETH",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    symbol: "ETH",
    decimals: 18,
    logoURI: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    extensions: {
      link: "https://www.binance.com/",
      description:
        "As the native coin of Binance Chain, BNB has multiple use cases: fueling transactions on the Chain, paying for transaction fees on Binance Exchange, making in-store payments, and many more.",
      originChainId: 56,
      originAddress: "0x0000000000000000000000000000000000000000",
    },
  },
  {
    assetId: "ethereum.0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
    network: "ethereum",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 1,
    address: "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
    name: "BNB",
    symbol: "BNB",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1644979850",
    extensions: {
      link: "https://www.binance.com/",
      description:
        "As the native coin of Binance Chain, BNB has multiple use cases: fueling transactions on the Chain, paying for transaction fees on Binance Exchange, making in-store payments, and many more.",
      originChainId: 56,
      originAddress: "0x0000000000000000000000000000000000000000",
    },
  },
  {
    assetId: "ethereum.0xdac17f958d2ee523a2206206994597c13d831ec7",
    network: "ethereum",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 1,
    address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    name: "Tether",
    symbol: "USDT",
    decimals: 6,
    logoURI:
      "https://assets.coingecko.com/coins/images/325/large/Tether-logo.png?1598003707",
    extensions: {
      link: "https://tether.to/",
      description:
        'Tether (USDT) is a cryptocurrency with a value meant to mirror the value of the U.S. dollar. The idea was to create a stable cryptocurrency that can be used like digital dollars. Coins that serve this purpose of being a stable dollar substitute are called “stable coins.” Tether is the most popular stable coin and even acts as a dollar replacement on many popular exchanges! According to their site, Tether converts cash into digital currency, to anchor or “tether” the value of the coin to the price of national currencies like the US dollar, the Euro, and the Yen. Like other cryptos it uses blockchain. Unlike other cryptos, it is [according to the official Tether site] “100% backed by USD” (USD is held in reserve). The primary use of Tether is that it offers some stability to the otherwise volatile crypto space and offers liquidity to exchanges who can’t deal in dollars and with banks (for example to the sometimes controversial but leading exchange <a href="https://www.coingecko.com/en...',
      ogImage:
        "https://tether.to/wp-content/uploads/2020/09/tether-preview.png",
    },
  },
  {
    assetId: "ethereum.0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    network: "ethereum",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 1,
    address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    name: "Tether",
    symbol: "USDC",
    decimals: 6,
    logoURI:
      "https://assets.coingecko.com/coins/images/6319/standard/usdc.png?1696506694",
    extensions: {
      link: "https://www.circle.com/en/usdc",
      description:
        "USDC is a fully collateralized US dollar stablecoin. USDC is the bridge between dollars and trading on cryptocurrency exchanges. The technology behind CENTRE makes it possible to exchange value between people, businesses and financial institutions just like email between mail services and texts between SMS providers. We believe by removing artificial economic borders, we can create a more inclusive global economy",
      ogImage:
        "https://tether.to/wp-content/uploads/2020/09/tether-preview.png",
    },
  },
  {
    assetId: "ethereum.0x6810e776880c02933d47db1b9fc05908e5386b96",
    network: "ethereum",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 1,
    address: "0x6810e776880c02933d47db1b9fc05908e5386b96",
    name: "Gnosis",
    symbol: "GNO",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/662/large/logo_square_simple_300px.png?1609402668",
    extensions: {
      link: "https://gnosis.io/",
      description:
        "Gnosis is a prediction market platform built as a decentralized application (dapp) on the Ethereum network. The platform includes a multisig wallet as well as a Dutch Exchange, but we’re just going to focus on their flagship product, the prediction market, for this guide. More than just building a prediction market, though, Gnosis is creating an entire infrastructure layer that you can use to build your own prediction market app. A prediction market utilizes user predictions to aggregate information about future events. \r\n\r\nUsers in the market trade tokens that represent the outcome of a certain event. Because some outcomes are more likely to occur than others, these tokens end up having different values in the open market.Olympia is Gnosis’s test version of their prediction market app. They host free tournaments in this product, so you get a chance to try it out without having to spend money. Every two days, the team allocates you a certain amount of Olympia (OLY) tokens that you u...",
      ogImage: "https://gnosis.io/wp-content/uploads/2020/11/banner-gnosis.png",
    },
  },
  {
    assetId: "ethereum.0xade00c28244d5ce17d72e40330b1c318cd12b7c3",
    network: "ethereum",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 1,
    address: "0xade00c28244d5ce17d72e40330b1c318cd12b7c3",
    name: "AdEx",
    symbol: "ADX",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/847/large/adex.png?1547034643",
    extensions: {
      link: "https://www.adex.network/",
      description:
        'AdEx (ADX) stands for “advertising exchange.” AdEx Coin is a blockchain-based marketplace for ads that aims to change the existing online advertising landscape and solve its major problems: ad fraud, privacy and consent to receive sponsored messages, etc. AdEx is fully transparent and built on the <a href="https://www.coingecko.com/en/coins/ethereum">Ethereum</a> Smart Contracts.\r\n\r\nAdEx is still in development, so it’s difficult to say much yet about it at this point. The original roadmap anticipated a beta release in February 2018. It remains to be seen if the team will meet that deadline. Future plans for version two of AdEx after launch focus on improving the user experience and scalability. AdEx has also expressed an interest in implementing a real-time bidding solution that could take place off-chain or on a high throughput network, like IOTA. AdEx raised $10 million in the first three hours of token sale.\r\n\r\nAdEx as a platform has room for a good amount of growth since digita...',
      ogImage: "https://www.adex.network/assets/img/og-adex-network.jpg",
    },
  },
  {
    assetId: "ethereum.0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
    network: "ethereum",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 1,
    address: "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
    name: "SHIBA INU",
    symbol: "SHIB",
    decimals: 18,
    logoURI: "https://assets.coingecko.com/coins/images/11939/thumb/shiba.png",
    extensions: {
      link: "https://shibatoken.com/",
      description:
        "Shiba Inu is a decentralized cryptocurrency created in 2020 on the Ethereum blockchain. Originally seen as a memecoin with no value, Shiba Inu has grown to establish itself in the crypto space with the help of its faithful supporters, the ShibArmy. The project's goal is to be a successful decentralized spontaneous community building and revolutionize against centralization. Shiba Inu has developed a DEX called ShibaSwap, which allows users to stake their SHIB tokens for BONES, the governance token for the exchange, and an NFT marketplace. The project's foundation is based on a decentralized community, which gives it its purpose...",
    },
  },
  {
    assetId: "ethereum.0x32353A6C91143bfd6C7d363B546e62a9A2489A20",
    network: "ethereum",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 1,
    address: "0x32353A6C91143bfd6C7d363B546e62a9A2489A20",
    name: "Adventure Gold",
    symbol: "AGLD",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/18125/thumb/lpgblc4h_400x400.jpg?1630570955",
    extensions: {
      link: "https://www.lootproject.com/",
      description:
        "Adventure Gold is an open-source in-game currency for Loot NFT holders. Users are able to vote on important upgrades and changes to the Loot ecosystem with AGLD. Loot is an NFT project released by Dom Hoffman, who previously created the social media app Vine. There are 8,000 NFTs in this Loot series and they do not contain any “images or stats,” but just words on top of a black background....",
    },
  },
  {
    assetId: "ethereum.0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    network: "ethereum",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 1,
    address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    name: "Wrapped BTC",
    symbol: "WBTC",
    decimals: 8,
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png",
    extensions: {
      link: "https://wbtc.network/",
      description:
        "WBTC is a community-focused initiative to bring bitcoin to Ethereum as a 1:1 backed token. The custody of the bitcoin reserves is taken care of by BitGo. Wrapped Bitcoin (WBTC) is an Ethereum token that is intended to represent Bitcoin (BTC) on the Ethereum blockchain. It is not Bitcoin, but rather a separate ERC-20 token that’s designed to track Bitcoin’s value. WBTC was created to allow ....",
    },
  },
  {
    assetId: "ethereum.0xae7ab96520de3a18e5e111b5eaab095312d7fe84",
    network: "ethereum",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 1,
    address: "0xae7ab96520de3a18e5e111b5eaab095312d7fe84",
    name: "Liquid staked Ether 2.0",
    symbol: "stETH",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/13442/standard/steth_logo.png?1696513206",
    extensions: {
      link: "https://lido.fi/",
      description:
        "Lido Staked Ether (stETH) is a token that represents your staked ether in Lido, combining the value of initial deposit and staking rewards. stETH tokens are minted upon deposit and burned when redeemed. While the price of stETH to ETH is based on the market demand, stETH token balances are pegged 1:1 to the ethers that are staked by Lido and the token’s balances are updated daily to reflect earnings and rewards. At this moment, stETH price can deviate from 1 ETH as it is currently not possible to claim the underlying ETH until Ethereum 2.0 fully merges. stETH tokens can be used as one would use ether, allowing...",
    },
  },
  {
    assetId: "ethereum.0x514910771af9ca656af840dff83e8264ecf986ca",
    network: "ethereum",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 1,
    address: "0x514910771af9ca656af840dff83e8264ecf986ca",
    name: "ChainLink Token",
    symbol: "LINK",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/877/standard/chainlink-new-logo.png?1696502009",
    extensions: {
      link: "https://chain.link/",
      description:
        "Chainlink is a framework for building Decentralized Oracle Networks (DONs) that bring real-world data onto blockchain networks, enabling the creation of hybrid smart contracts. These DONs provide decentralized services such as Price Feeds, Proof of Reserve, Verifiable Randomness, Keepers, and the ability to connect to any web API. It aims to ensure that the external information (pricing, weather data, event outcomes, etc.) and off-chain computations (randomness, transaction automation, fair ordering, etc.) fed to on-chain smart contracts are reliable and tamper-proof....",
    },
  },
  {
    assetId: "ethereum.0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    network: "ethereum",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 1,
    address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    name: "Uniswap",
    symbol: "UNI",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/12504/standard/uniswap-logo.png?1720676669",
    extensions: {
      link: "https://uniswap.org/",
      description:
        "UNI is the governance token for Uniswap. UNI was introduced on 16th September 2020 through a retrospective airdrop to users who have interacted with the protocol either by swapping tokens or by providing liquidity. The UNI token allows token holders to participate in the governance of the protocol. Key decisions such as usage of the treasury or future upgrades can be decided through a governance vote.....",
    },
  },
  {
    assetId: "ethereum.0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
    network: "ethereum",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 1,
    address: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
    name: "Matic Token",
    symbol: "MATIC",
    decimals: 18,
    logoURI: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=032",
    extensions: {
      link: "https://polygon.technology/",
      description:
        "Polygon (Previously Matic Network) is the first well-structured, easy-to-use platform for Ethereum scaling and infrastructure development. Its core component is Polygon SDK, a modular, flexible framework that supports building multiple types of applications. Using Polygon, one can create Optimistic Rollup chains, ZK Rollup chains, stand alone chains or any other kind of infra required by the developer...",
    },
  },
  {
    assetId: "ethereum.0x6b175474e89094c44da98b954eedeac495271d0f",
    network: "ethereum",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 1,
    address: "0x6b175474e89094c44da98b954eedeac495271d0f",
    name: "Dai Stablecoin",
    symbol: "DAI",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/9956/standard/Badge_Dai.png?1696509996",
    extensions: {
      link: "https://makerdao.com/",
      description:
        "Dai is a stablecoin issued by Maker Protocol. Its first stablecoin iteration was known as the Single Collateral Dai (SAI), which used Ether (ETH) as collateral. Two years later in 2019, the Foundation released the Multi-Collateral Dai (DAI), phasing out SAI. The platform has enjoyed widespread adoption and is the largest decentralized lending platform with around $2.58 billion in total value locked (TVL), as of December 2020.",
    },
  },
  {
    assetId: "ethereum.0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",
    network: "ethereum",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 1,
    address: "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",
    name: "Maker",
    symbol: "MKR",
    decimals: 18,
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2/logo.png",
    extensions: {
      link: "https://makerdao.com/",
      description:
        "The Maker token (MRK) is a governance token that is used to govern and recapitalize the Maker protocol. Holders of the token can participate and vote on changes to the protocol’s smart contract and system parameters such as Stability Fees and the Dai Savings Rate (DSR)...",
    },
  },
  {
    assetId: "ethereum.0x85f17cf997934a597031b2e18a9ab6ebd4b9f6a4",
    network: "ethereum",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 1,
    address: "0x85f17cf997934a597031b2e18a9ab6ebd4b9f6a4",
    name: "NEAR",
    symbol: "NEAR",
    decimals: 24,
    logoURI:
      "https://assets.coingecko.com/coins/images/10365/standard/near.jpg?1696510367",
    extensions: {
      link: "https://near.org/",
      description:
        "Near Protocol is a Proof-of-Stake Layer-1 blockchain for building decentralized applications. Its technology, Nightshade, was designed for faster transactions, lower costs, and higher transaction volume. Nightshade splits the blockchains into smaller sub-chains, each with its own validators to process transactions more efficiently. Additionally, Near focuses on user-friendliness with its human-readable account names and building apps using Web 2.0 programming languages like Javascript....",
    },
  },
  {
    assetId: "ethereum.0xF57e7e7C23978C3cAEC3C3548E3D615c346e79fF",
    network: "ethereum",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 1,
    address: "0xF57e7e7C23978C3cAEC3C3548E3D615c346e79fF",
    name: "Immutable X",
    symbol: "IMX",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/17233/standard/immutableX-symbol-BLK-RGB.png?1696516787",
    extensions: {
      link: "https://imx.community/",
      description:
        "Immutable X is a way to make Ethereum work better for things like unique digital items (NFTs). It was started in 2018 by James Ferguson, Robbie Ferguson, and Alex Connolly. It helps transactions happen quickly and with very low fees when people create or trade NFTs. People can also make and trade other types of tokens at lower costs without worrying about the safety of what they own...",
    },
  },
  {
    assetId: "ethereum.0x75231f58b43240c9718dd58b4967c5114342a86c",
    network: "ethereum",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 1,
    address: "0x75231f58b43240c9718dd58b4967c5114342a86c",
    name: "OKB",
    symbol: "OKB",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/4463/standard/WeChat_Image_20220118095654.png?1696505053",
    extensions: {
      link: "https://www.okx.com/okb",
      description:
        "OKB is a cryptocurrency used on the OKX crypto exchange, based in Malta. OKB holders can use it to purchase, hold and perform cryptocurrency transactions on the OKX platform. OKB operates on OKX's blockchain and provides several options for users beyond just holding it as a form of investment. OKB holders can also benefit from lower trading fees, access to exclusive features, earn passive income, gain voting rights on future proposals within OKX's ecosystem, and invest in new cryptocurrency projects. Holding OKB tokens in OKX accounts can lead to discounted trading fees, access to OKX Earn, and appreciation of price trends...",
    },
  },
  {
    assetId: "ethereum.0x3c3a81e81dc49a522a592e7622a7e711c06bf354",
    network: "ethereum",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 1,
    address: "0x3c3a81e81dc49a522a592e7622a7e711c06bf354",
    name: "Mantle",
    symbol: "MNT",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/30980/standard/token-logo.png?1696529819",
    extensions: {
      link: "https://www.mantle.xyz/",
    },
  },
  {
    assetId: "ethereum.0x6de037ef9ad2725eb40118bb1702ebb27e4aeb24",
    network: "ethereum",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 1,
    address: "0x6de037ef9ad2725eb40118bb1702ebb27e4aeb24",
    name: "Render Token",
    symbol: "RNDR",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/11636/standard/rndr.png?1696511529",
    extensions: {
      link: "http://renderfoundation.com/",
      description:
        "Render Network Foundation (The Render Network®) is the leading provider of decentralized GPU based rendering solutions, revolutionizing the digital creation process. The network connects node operators looking to monetize their idle GPU compute power with artists looking to scale intensive 3D rendering work and applications to the cloud. Through a decentralized peer-to-peer network, the Render Network achieves unprecedented levels of scale, speed, and economic efficiency. On top of a decentralized GPU computing network, Render provides a platform for artists and developers to build services and applications for the emerging digital economy, including next generation digital rights management (DRM), artificial intelligence (AI), and virtual assets (NFTs)...",
    },
  },
  {
    assetId: "ethereum.0x2af5d2ad76741191d15dfe7bf6ac92d4bd912ca3",
    network: "ethereum",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 1,
    address: "0x2af5d2ad76741191d15dfe7bf6ac92d4bd912ca3",
    name: "Bitfinex LEO Token",
    symbol: "LEO",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/8418/standard/leo-token.png?1696508607",
    extensions: {
      link: "https://www.bitfinex.com/",
    },
  },
  {
    assetId: "ethereum.0xaea46a60368a7bd060eec7df8cba43b7ef41ad85",
    network: "ethereum",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 1,
    address: "0xaea46a60368a7bd060eec7df8cba43b7ef41ad85",
    name: "Fetch.AI",
    symbol: "FET",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/5681/standard/ASI.png?1719827289",
    extensions: {
      link: "https://fetch.ai/",
      description:
        "Fetch.ai is building an open access, tokenized, decentralized machine learning network to enable smart infrastructure built around a decentralized digital economy. At Fetch.ai they build tools and infrastructure to enable a decentralized digital economy. Fetch.ai, a Cambridge-based artificial intelligence lab, is building a decentralized machine learning platform based on a distributed ledger, that enables secure sharing, connection and transactions based on any data globally...",
    },
  },
  {
    assetId: "ethereum.0xa0b73e1ff0b80914ab6fe0444e65848c4c34450b",
    network: "ethereum",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 1,
    address: "0xa0b73e1ff0b80914ab6fe0444e65848c4c34450b",
    name: "Cronos",
    symbol: "CRO",
    decimals: 8,
    logoURI:
      "https://assets.coingecko.com/coins/images/7310/standard/cro_token_logo.png?1696507599",
    extensions: {
      link: "https://cronos-pos.org/",
      description:
        "CRO coin is the token for the Crypto.com platform. It has 3 main functionalities, trading, payment, and financial services. CRO coin holders will be able to enjoy benefits such as discounted fees, higher earnings for lending, and priority services. Card holders having CRO will also be entitled to additional perks such as airport lounge and rewards. It also has its own blockchain where it acts as a cross-asset intermediary settlement layer using CRO...",
    },
  },
  {
    assetId: "ethereum.0xe28b3b32b6c345a34ff64674606124dd5aceca30",
    network: "ethereum",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 1,
    address: "0xe28b3b32b6c345a34ff64674606124dd5aceca30",
    name: "Injective Token",
    symbol: "INJ",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/12882/standard/Secondary_Symbol.png?1696512670",
    extensions: {
      link: "https://injective.com/",
      description:
        "Injective is an interoperable Layer 1 blockchain designed for DeFi applications. It provides developers with on-chain financial infrastructure modules to build dApps such as decentralized exchanges, prediction markets, and lending protocols. Its decentralized cross-chain bridging infrastructure offers compatibility with most blockchains, including EVM chains like Ethereum and non-EVM chains like Solana...",
    },
  },
  {
    assetId: "ethereum.0xb50721bcf8d664c30412cfbc6cf7a15145234ad1",
    network: "ethereum",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 1,
    address: "0xb50721bcf8d664c30412cfbc6cf7a15145234ad1",
    name: "Arbitrum",
    symbol: "ARB",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/16547/standard/photo_2023-03-29_21.47.00.jpeg?1696516109",
    extensions: {
      link: "https://arbitrum.io/",
      description:
        "Arbitrum is a rollup chain designed to improve the scalability of Ethereum. It achieves this by bundling multiple transactions into a single transaction, thereby reducing the load on the Ethereum network. In simple terms, a rollup chain is a layer 2 solution that aggregates and processes transactions off-chain, before submitting a single transaction to the Ethereum mainnet. This means that users can enjoy faster and cheaper transactions, while still benefiting from the security and decentralization of the Ethereum network....",
    },
  },
  {
    assetId: "ethereum.0xc944e90c64b2c07662a292be6244bdf05cda44a7",
    network: "ethereum",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 1,
    address: "0xc944e90c64b2c07662a292be6244bdf05cda44a7",
    name: "Graph Token",
    symbol: "GRT",
    decimals: 8,
    logoURI:
      "https://assets.coingecko.com/coins/images/13397/standard/Graph_Token.png?1696513159",
    extensions: {
      link: "https://thegraph.com/",
      description:
        "It is an indexing protocol and a global API aimed at organizing blockchain data, while making it easily accessible via GraphQL. Developers can use Graph Explorer to search, find, and publish all the public data they need to build decentralized applications. This makes it possible for developers build serverless dApps that run entirely on public infrastructures...",
    },
  },
  {
    assetId: "ethereum.0xc5f0f7b66764f6ec8c8dff7ba683102295e16409",
    network: "ethereum",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 1,
    address: "0xc5f0f7b66764f6ec8c8dff7ba683102295e16409",
    name: "First Digital USD",
    symbol: "FDUSD",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/31079/standard/firstfigital.jpeg?1696529912",
    extensions: {
      link: "https://firstdigitallabs.com/",
      description: "FDUSD is a 1:1 USD-backed Stablecoin.",
    },
  },
  {
    assetId: "ethereum.0xcf0c122c6b73ff809c693db761e7baebe62b6a2e",
    network: "ethereum",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 1,
    address: "0xcf0c122c6b73ff809c693db761e7baebe62b6a2e",
    name: "FLOKI",
    symbol: "FLOKI",
    decimals: 9,
    logoURI:
      "https://assets.coingecko.com/coins/images/16746/standard/PNG_image.png?1696516318",
    extensions: {
      link: "https://www.floki.com/",
      description:
        "Floki Inu is birthed by fans & members of the Shiba Inu community. The project goals to be a deflationary token that rewards holders simply for holding...",
    },
  },
  {
    assetId: "ethereum.0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9",
    network: "ethereum",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 1,
    address: "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9",
    name: "Aave Token",
    symbol: "AAVE",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/12645/standard/aave-token-round.png?1720472354",
    extensions: {
      link: "https://app.aave.com/?referral=93",
      description:
        "Aave is a decentralized money market protocol where users can lend and borrow cryptocurrency across 20 different assets as collateral. The protocol has a native token called AAVE, which is also a governance token that lets the community decide the direction of the protocol in a collective manner...",
    },
  },
  {
    assetId: "ethereum.0xfaba6f8e4a5e8ab82f62fe7c39859fa577269be3",
    network: "ethereum",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 1,
    address: "0xfaba6f8e4a5e8ab82f62fe7c39859fa577269be3",
    name: "Ondo",
    symbol: "ONDO",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/26580/standard/ONDO.png?1696525656",
    extensions: {
      link: "https://ondo.finance/",
      description:
        "ONDO is the governance token for Flux Finance and the Ondo DAO.",
    },
  },
  {
    assetId: "ethereum.0xbf5495efe5db9ce00f80364c8b423567e58d2110",
    network: "ethereum",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 1,
    address: "0xbf5495efe5db9ce00f80364c8b423567e58d2110",
    name: "Renzo Restaked ETH",
    symbol: "ezETH",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/34753/standard/Ezeth_logo_circle.png?1713496404",
    extensions: {
      link: "https://www.renzoprotocol.com/",
    },
  },
  {
    assetId: "ethereum.0x1151cb3d861920e07a38e03eead12c32178567f6",
    network: "ethereum",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 1,
    address: "0x1151cb3d861920e07a38e03eead12c32178567f6",
    name: "Bonk",
    symbol: "Bonk",
    decimals: 5,
    logoURI:
      "https://assets.coingecko.com/coins/images/28600/standard/bonk.jpg?1696527587",
    extensions: {
      link: "https://www.bonkcoin.com/",
      description:
        "Bonk is the first Solana dog coin for the people, by the people with 50% of the total supply airdropped to the Solana community. The Bonk contributors were tired of toxic “Alameda” tokenomics and wanted to make a fun memecoin where everyone gets a fair shot.",
    },
  },
  {
    assetId: "ethereum.0x925206b8a707096ed26ae47c84747fe0bb734f59",
    network: "ethereum",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 1,
    address: "0x925206b8a707096ed26ae47c84747fe0bb734f59",
    name: "WhiteBIT Coin",
    symbol: "WBT",
    decimals: 8,
    logoURI:
      "https://assets.coingecko.com/coins/images/27045/standard/wbt_token.png?1696526096",
    extensions: {
      link: "https://whitebit.com/wbt",
      description:
        "WBT is a native coin of the WhiteBIT blockchain. WhiteBIT’s goal is to contribute to the mass adoption and popularization of blockchain technologies by implementing the most effective trading and staking tools on the most convenient terms...",
    },
  },
  {
    assetId: "ethereum.0xca14007eff0db1f8135f4c25b34de49ab0d42766",
    network: "ethereum",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 1,
    address: "0xca14007eff0db1f8135f4c25b34de49ab0d42766",
    name: "StarkNet Token",
    symbol: "STRK",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/26433/standard/starknet.png?1696525507",
    extensions: {
      link: "https://starknet.io/",
      description:
        "StarkNet is a permissionless decentralized Layer 2 (L2) validity rollup, built to allow Ethereum to scale via cryptographic protocols called STARKs, without compromising Ethereum’s core principles of decentralization, transparency, inclusivity and security. The StarkNet Token is needed to operate the ecosystem, maintain and secure it, decide on its values and strategic goals, and direct its evolution. This token will be required for (i) governance, (ii) payment of transaction fees on StarkNet, and (iii) participation in StarkNet’s consensus mechanism.",
    },
  },
  {
    assetId: "ethereum.0x967da4048cd07ab37855c090aaf366e4ce1b9f48",
    network: "ethereum",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 1,
    address: "0x967da4048cd07ab37855c090aaf366e4ce1b9f48",
    name: "Ocean Token",
    symbol: "OCEAN",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/3687/standard/ocean-protocol-logo.jpg?1696504363",
    extensions: {
      link: "https://oceanprotocol.com/",
      description:
        "Ocean Protocol is an ecosystem for sharing data and associated services. It provides a tokenized service layer that exposes data, storage, compute and algorithms for consumption with a set of deterministic proofs on availability and integrity that serve as verifiable service agreements. There is staking on services to signal quality, reputation and ward against Sybil Attacks.",
    },
  },
  {
    assetId: "ethereum.0x6982508145454ce325ddbe47a25d4ec3d2311933",
    network: "ethereum",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 1,
    address: "0x6982508145454ce325ddbe47a25d4ec3d2311933",
    name: "Pepe",
    symbol: "PEPE",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/29850/standard/pepe-token.jpeg?1696528776",
    extensions: {
      link: "https://www.pepe.vip/",
    },
  },
  {
    assetId: "ethereum.0xd31a59c85ae9d8edefec411d448f90841571b89c",
    network: "ethereum",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 1,
    address: "0xd31a59c85ae9d8edefec411d448f90841571b89c",
    name: "Wrapped SOL",
    symbol: "SOL",
    decimals: 9,
    logoURI:
      "https://assets.coingecko.com/coins/images/22876/standard/SOL_wh_small.png?1696522175",
    extensions: {
      link: "https://wormholenetwork.com/",
      description:
        "Wormhole is a communication bridge between Solana and other top decentralized finance (DeFi) networks. Existing projects, platforms, and communities are able to move tokenized assets seamlessly across blockchains and benefit from Solana’s high speed and low cost.",
    },
  },
  {
    assetId: "ethereum.0x6B3595068778DD592e39A122f4f5a5cF09C90fE2",
    network: "ethereum",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 1,
    address: "0x6B3595068778DD592e39A122f4f5a5cF09C90fE2",
    name: "SushiToken",
    symbol: "SUSHI",
    decimals: 8,
    logoURI:
      "https://assets.coingecko.com/coins/images/12271/thumb/512x512_Logo_no_chop.png?1606986688",
    extensions: {
      link: "https://sushi.com/",
      description:
        "Sushi is a DeFi protocol that is completely community-driven, serving up delicious interest for your held crypto assets. On Sushi, you can take advantage of passive-income providing DeFi tools such as liquidity providing, yield farming and staking. Furthermore, due to the decentralized nature of being an AMM (Automated Market Maker), Sushi has fewer hurdles to execute your cryptocurrency trades and all fees are paid to the users who provided liquidity, just as it should be!",
    },
  },
  {
    assetId: "ethereum.0xe66747a101bff2dba3697199dcce5b743b454759",
    network: "ethereum",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 1,
    address: "0xe66747a101bff2dba3697199dcce5b743b454759",
    name: "GateChainToken",
    symbol: "GT",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/8183/standard/gate.png?1696508395",
    extensions: {
      link: "https://gatechain.io/",
      description:
        "GateToken is the native token of cryptocurrency exchange Gate.io. It became the exchange token of Gate.io officially on March 2, 2020. GateToken can be used in VIP tier escalation, trading fee debit, exclusive activities participation, and more. Gate.io claims to increasingly empower GT with more and more applications and use cases to improve its intrinsic value.",
    },
  },
  {
    assetId: "ethereum.0x62d0a8458ed7719fdaf978fe5929c6d342b0bfce",
    network: "ethereum",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 1,
    address: "0x62d0a8458ed7719fdaf978fe5929c6d342b0bfce",
    name: "Beam",
    symbol: "BEAM",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/32417/standard/chain-logo.png?1698114384",
    extensions: {
      link: "https://meritcircle.io/",
      description:
        "The $BEAM token serves as the native crypto asset for the Beam network, a gaming network empowered by the Merit Circle DAO. Beam is an ecosystem where gamers and developers come together to shape the future of the gaming industry. One of its core components is the Beam SDK, which is a flexible software development kit that enables game developers to choose between a variety of tools that can be used to fuel and structure their in-game blockchain elements.",
    },
  },
  {
    assetId: "ethereum.0xbb0e17ef65f82ab018d8edd776e8dd940327b28b",
    network: "ethereum",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 1,
    address: "0xbb0e17ef65f82ab018d8edd776e8dd940327b28b",
    name: "Axie Infinity Shard",
    symbol: "AXS",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/13029/standard/axie_infinity_logo.png?1696512817",
    extensions: {
      link: "https://axieinfinity.com/",
      description:
        "Axie Infinity is a digital game that fuses NFT collectibles and blockchain. The game allows users to discover, collect, combine, and battle fantasy creatures called Axies. Players can earn Smooth Love Potion (SLP) tokens by winning challenges against their opponents in Ranked PvP mode. With its ever-expanding world of characters and unique storytelling and art direction, Axie Infinity has become a hit for gamers around the world.",
    },
  },
  {
    assetId: "ethereum.0x163f8c2467924be0ae7b5347228cabf260318753",
    network: "ethereum",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 1,
    address: "0x163f8c2467924be0ae7b5347228cabf260318753",
    name: "Worldcoin",
    symbol: "WLD",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/31069/standard/worldcoin.jpeg?1696529903",
    extensions: {
      link: "https://worldcoin.org/",
    },
  },
  {
    assetId: "ethereum.0x582d872a1b094fc48f5de31d3b73f2d9be47def1",
    network: "ethereum",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 1,
    address: "0x582d872a1b094fc48f5de31d3b73f2d9be47def1",
    name: "Wrapped TON Coin",
    symbol: "TONCOIN",
    decimals: 9,
    logoURI:
      "https://assets.coingecko.com/coins/images/17980/standard/ton_symbol.png?1696517498",
    extensions: {
      link: "https://ton.org/",
      description:
        "TON (The Open Network) is a Layer 1 smart contract network specializing in financial applications. It was first developed by Telegram’s co-founder Nikolai Durov known as “Telegram Open Network” but has been relaunched as “The Open Network” under the TON Foundation.",
    },
  },
  {
    assetId: "ethereum.0x5a98fcbea516cf06857215779fd812ca3bef1b32",
    network: "ethereum",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 1,
    address: "0x5a98fcbea516cf06857215779fd812ca3bef1b32",
    name: "Lido DAO Token",
    symbol: "LDO",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/13573/standard/Lido_DAO.png?1696513326",
    extensions: {
      link: "https://stake.lido.fi/",
      description:
        "Lido DAO is a community that builds liquid staking services for Ethereum. Lido allows users to earn staking rewards without locking assets or maintaining staking infrastructure. Lido aims to allow users to stake ether without losing the ability to trade or otherwise use their tokens. Lido will be a decentralized infrastructure for issuing a liquid token that is safer than exchange staking and has incredible flexibility compared to self-staking.",
    },
  },
  {
    assetId: "ethereum.0x6985884c4392d348587b19cb9eaaf157f13271cd",
    network: "ethereum",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 1,
    address: "0x6985884c4392d348587b19cb9eaaf157f13271cd",
    name: "LayerZero",
    symbol: "ZRO",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/28206/standard/ftxG9_TJ_400x400.jpeg?1696527208",
    extensions: {
      link: "https://layerzero.network/",
      description:
        "LayerZero is an interoperability protocol that connects blockchains for developers to build omnichain applications, tokens, and experiences. The protocol relies on immutable on-chain endpoints, a configurable Security Stack, and a permissionless set of Executors to transfer censorship-resistant messages between chains.",
    },
  },
  {
    assetId: "ethereum.0xae78736cd615f374d3085123a210448e74fc6393",
    network: "ethereum",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 1,
    address: "0xae78736cd615f374d3085123a210448e74fc6393",
    name: "Rocket Pool ETH",
    symbol: "rETH",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/20764/standard/reth.png?1696520159",
    extensions: {
      link: "https://rocketpool.net/",
    },
  },
  // start
  {
    assetId: "ethereum.0x54d2252757e1672eead234d27b1270728ff90581",
    network: "ethereum",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 1,
    address: "0x54d2252757e1672eead234d27b1270728ff90581",
    name: "BitgetToken",
    symbol: "BGB",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/11610/standard/icon_colour.png?1696511504",
    extensions: {
      link: "https://partner.bitget.com/bg/2LAE9K",
    },
  },
  {
    assetId: "ethereum.0xd1d2eb1b1e90b638588728b4130137d262c87cae",
    network: "ethereum",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 1,
    address: "0xd1d2eb1b1e90b638588728b4130137d262c87cae",
    name: "Gala",
    symbol: "GALA",
    decimals: 8,
    logoURI:
      "https://assets.coingecko.com/coins/images/12493/standard/GALA_token_image_-_200PNG.png?1709725869",
    extensions: {
      link: "https://gala.com/",
      description:
        "Gala is a blockchain gaming ecosystem. Gamers can explore different type of games and have their experiences interact across each other on the Gala platform. The GALA token is the utility token and primary medium of exchange of the ecosystem. Game items are represented as NFTs on the Ethereum blockchain and users can trade them on all marketplaces.",
    },
  },
  {
    assetId: "ethereum.0xac57de9c1a09fec648e93eb98875b212db0d460b",
    network: "ethereum",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 1,
    address: "0xac57de9c1a09fec648e93eb98875b212db0d460b",
    name: "Baby Doge Coin",
    symbol: "BabyDoge",
    decimals: 9,
    logoURI:
      "https://assets.coingecko.com/coins/images/16125/standard/babydoge.jpg?1696515731",
    extensions: {
      link: "https://babydoge.com/",
      description:
        "Baby Doge Coin is BSC meme token for a community of Doge lovers.",
    },
  },
  {
    assetId: "ethereum.0x8f9b4525681f3ea6e43b8e0a57bfff86c0a1dd2e",
    network: "ethereum",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 1,
    address: "0x8f9b4525681f3ea6e43b8e0a57bfff86c0a1dd2e",
    name: "ZEEBU",
    symbol: "ZBU",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/31145/standard/200x200_Front_token.png?1696529974",
    extensions: {
      link: "https://www.zeebu.com/",
    },
  },
  {
    assetId: "ethereum.0x7420b4b9a0110cdc71fb720908340c03f9bc03ec",
    network: "ethereum",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 1,
    address: "0x7420b4b9a0110cdc71fb720908340c03f9bc03ec",
    name: "JasmyCoin",
    symbol: "JASMY",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/13876/standard/JASMY200x200.jpg?1696513620",
    extensions: {
      link: "https://www.jasmy.co.jp/",
      description:
        "JasmyCoin is the native token of the Jasmy platform, a Japan-based project that allows users to control the use of their personal data and get paid for sharing it. In a nutshell, data generated from IoT devices, like smartphones and tech wearables, is securely stored in data lockers on the Jasmy platform. Merchants pay to access these data lockers using JasmyCoin.",
    },
  },
];
