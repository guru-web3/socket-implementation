import { AssetInfo } from "@/app/constants/asset.interface";

export const polygonTokens: AssetInfo[] = [
  {
    assetId: "polygon.0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
    network: "polygon",
    networkImage: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=032",
    chainId: 137,
    address: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
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
      originChainId: 1,
      originAddress: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    },
  },
  {
    assetId: "polygon.0x84000b263080bc37d1dd73a29d92794a6cf1564e",
    network: "polygon",
    networkImage: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=032",
    chainId: 137,
    address: "0x84000b263080bc37d1dd73a29d92794a6cf1564e",
    name: "Dai",
    symbol: "DAI",
    decimals: 18,
    logoURI:
      "https://assets.sequence.info/YBzz5Q_O/images/tokens/dai-token.png",
    extensions: {
      link: "https://makerdao.com/",
      description:
        "Dai is the native stablecoin for the Maker protocol. It is the world’s first crypto-collateralized and decentralized stablecoin, whose value is soft pegged to the US Dollar. The collateralized assets backing Dai are other cryptocurrencies instead of fiat and are held within smart contracts rather than in institutions.",
      ogImage: "https://makerdao.com/dai.png",
      originChainId: 1,
      originAddress: "0x6b175474e89094c44da98b954eedeac495271d0f",
    },
  },
  {
    assetId: "polygon.0x3BA4c387f786bFEE076A58914F5Bd38d668B42c3",
    network: "polygon",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 137,
    address: "0x3BA4c387f786bFEE076A58914F5Bd38d668B42c3",
    name: "BNB (PoS)",
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
    assetId: "polygon.0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    network: "polygon",
    networkImage: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=032",
    chainId: 137,
    address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    name: "(PoS) Tether USD",
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
    assetId: "polygon.0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6",
    network: "polygon",
    networkImage: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=032",
    chainId: 137,
    address: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6",
    name: "(PoS) Wrapped BTC",
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
    assetId: "polygon.0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39",
    network: "polygon",
    networkImage: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=032",
    chainId: 137,
    address: "0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39",
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
    assetId: "polygon.0xb33EaAd8d922B1083446DC23f610c2567fB5180f",
    network: "polygon",
    networkImage: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=032",
    chainId: 137,
    address: "0xb33EaAd8d922B1083446DC23f610c2567fB5180f",
    name: "Uniswap (POS)",
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
    assetId: "polygon.0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
    network: "polygon",
    networkImage: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=032",
    chainId: 137,
    address: "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
    name: "(POS) Dai Stablecoin",
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
    assetId: "polygon.0x6f7c932e7684666c9fd1d44527765433e01ff61d",
    network: "polygon",
    networkImage: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=032",
    chainId: 137,
    address: "0x6f7c932e7684666c9fd1d44527765433e01ff61d",
    name: "MAKER (PoS)",
    symbol: "MKR",
    decimals: 18,
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/assets/0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2/logo.png",
    extensions: {
      link: "https://makerdao.com/",
      description:
        "The Maker token (MRK) is a governance token that is used to govern and recapitalize the Maker protocol. Holders of the token can participate and vote on changes to the protocol’s smart contract and system parameters such as Stability Fees and the Dai Savings Rate (DSR)...",
    },
  },
  {
    assetId: "polygon.0x589503e30e29454D98D59A34F2058A5AA4e38730",
    network: "polygon",
    networkImage: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=032",
    chainId: 137,
    address: "0x589503e30e29454D98D59A34F2058A5AA4e38730",
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
    assetId: "polygon.0x61299774020da444af134c82fa83e3810b309991",
    network: "polygon",
    networkImage: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=032",
    chainId: 137,
    address: "0x61299774020da444af134c82fa83e3810b309991",
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
    assetId: "polygon.0x4E8dc2149EaC3f3dEf36b1c281EA466338249371",
    network: "polygon",
    networkImage: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=032",
    chainId: 137,
    address: "0x4E8dc2149EaC3f3dEf36b1c281EA466338249371",
    name: "Injective Token (POS)",
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
    assetId: "polygon.0x5fe2b58c013d7601147dcdd68c143a77499f5531",
    network: "polygon",
    networkImage: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=032",
    chainId: 137,
    address: "0x5fe2b58c013d7601147dcdd68c143a77499f5531",
    name: "Graph Token (POS)",
    symbol: "GRT",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/13397/standard/Graph_Token.png?1696513159",
    extensions: {
      link: "https://thegraph.com/",
      description:
        "It is an indexing protocol and a global API aimed at organizing blockchain data, while making it easily accessible via GraphQL. Developers can use Graph Explorer to search, find, and publish all the public data they need to build decentralized applications. This makes it possible for developers build serverless dApps that run entirely on public infrastructures...",
    },
  },
  {
    assetId: "polygon.0xd6df932a45c0f255f85145f286ea0b292b21c90b",
    network: "polygon",
    networkImage: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=032",
    chainId: 137,
    address: "0xd6df932a45c0f255f85145f286ea0b292b21c90b",
    name: "Aave (POS)",
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
    assetId: "polygon.0xe5b49820e5a1063f6f4ddf851327b5e8b2301048",
    network: "polygon",
    networkImage: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=032",
    chainId: 137,
    address: "0xe5b49820e5a1063f6f4ddf851327b5e8b2301048",
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
    assetId: "polygon.0xc3c7d422809852031b44ab29eec9f1eff2a58756",
    network: "polygon",
    networkImage: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=032",
    chainId: 137,
    address: "0xc3c7d422809852031b44ab29eec9f1eff2a58756",
    name: "Lido DAO Token (Pos)",
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
    assetId: "polygon.0x6985884c4392d348587b19cb9eaaf157f13271cd",
    network: "polygon",
    networkImage: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=032",
    chainId: 137,
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
    assetId: "polygon.0x0266f4f08d82372cf0fcbccc0ff74309089c74d1",
    network: "polygon",
    networkImage: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=032",
    chainId: 137,
    address: "0x0266f4f08d82372cf0fcbccc0ff74309089c74d1",
    name: "Rocket Pool ETH (PoS)",
    symbol: "rETH",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/20764/standard/reth.png?1696520159",
    extensions: {
      link: "https://rocketpool.net/",
    },
  },
  //
  //
  //
  {
    assetId: "polygon.0xc3ec80343d2bae2f8e680fdadde7c17e71e114ea",
    network: "polygon",
    networkImage: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=032",
    chainId: 137,
    address: "0xc3ec80343d2bae2f8e680fdadde7c17e71e114ea",
    name: "MANTRA DAO (PoS)",
    symbol: "OM",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/12151/standard/OM_Token.png?1696511991",
    extensions: {
      link: "https://www.mantrachain.io/",
      description:
        "MANTRA is a Security first RWA Layer 1 Blockchain, capable of adherence and enforcement of real world regulatory requirements. Built for Institutions and Developers, MANTRA offers a Permissionless Blockchain for Permissioned applications...",
    },
  },
  {
    assetId: "polygon.0xbbba073c31bf03b8acf7c28ef0738decf3695683",
    network: "polygon",
    networkImage: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=032",
    chainId: 137,
    address: "0xbbba073c31bf03b8acf7c28ef0738decf3695683",
    name: "SAND",
    symbol: "SAND",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/12129/standard/sandbox_logo.jpg?1696511971",
    extensions: {
      link: "https://www.sandbox.game/en/",
      description:
        "Sandbox is a decentralized community owned virtual world. Creators can host custom games and events on the virtual world. Analysts like to compare Sandbox with Roblox due to their similarity in concepts. However the key difference with Sandbox is that players have true ownership of the virtual world assets in the form of NFTs. By doing so, LAND owners can host contests and events, stake SAND to earn and customize assets, monetize assets and experiences, vote in the metaverse governance, play games, and more.",
    },
  },
  {
    assetId: "polygon.0x66Dc5A08091d1968e08C16aA5b27BAC8398b02Be",
    network: "polygon",
    networkImage: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=032",
    chainId: 137,
    address: "0x66Dc5A08091d1968e08C16aA5b27BAC8398b02Be",
    name: "Civic",
    symbol: "CVC",
    decimals: 8,
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png",
  },
  {
    assetId: "polygon.0xbD7A5Cf51d22930B8B3Df6d834F9BCEf90EE7c4f",
    network: "polygon",
    networkImage: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=032",
    chainId: 137,
    address: "0xbD7A5Cf51d22930B8B3Df6d834F9BCEf90EE7c4f",
    name: "Ethereum Name Service",
    symbol: "ENS",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/19785/thumb/acatxTm8_400x400.jpg?1635850140",
  },
  {
    assetId: "polygon.0x5FFD62D3C3eE2E81C00A7b9079FB248e7dF024A8",
    network: "polygon",
    networkImage: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=032",
    name: "Gnosis Token (PoS)",
    address: "0x5FFD62D3C3eE2E81C00A7b9079FB248e7dF024A8",
    symbol: "GNO",
    decimals: 18,
    chainId: 137,
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6810e776880C02933D47DB1b9fc05908e5386b96/logo.png",
  },
  {
    assetId: "polygon.0x42f37A1296b2981F7C3cAcEd84c5096b2Eb0C72C",
    network: "polygon",
    networkImage: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=032",
    chainId: 137,
    address: "0x42f37A1296b2981F7C3cAcEd84c5096b2Eb0C72C",
    name: "Keep Network (PoS)",
    symbol: "KEEP",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/3373/thumb/IuNzUb5b_400x400.jpg?1589526336",
  },
  {
    assetId: "polygon.0x324b28d6565f784d596422B0F2E5aB6e9CFA1Dc7",
    network: "polygon",
    networkImage: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=032",
    name: "Kyber Network Crystal (PoS)",
    address: "0x324b28d6565f784d596422B0F2E5aB6e9CFA1Dc7",
    symbol: "KNC",
    decimals: 18,
    chainId: 137,
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdd974D5C2e2928deA5F71b9825b8b646686BD200/logo.png",
  },
  {
    assetId: "polygon.0x66EfB7cC647e0efab02eBA4316a2d2941193F6b3",
    network: "polygon",
    networkImage: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=032",
    name: "Loom Network",
    address: "0x66EfB7cC647e0efab02eBA4316a2d2941193F6b3",
    symbol: "LOOM",
    decimals: 18,
    chainId: 137,
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA4e8C3Ec456107eA67d3075bF9e3DF3A75823DB0/logo.png",
  },
  {
    assetId: "polygon.0x84e1670F61347CDaeD56dcc736FB990fBB47ddC1",
    network: "polygon",
    networkImage: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=032",
    name: "LoopringCoin V2 (PoS)",
    address: "0x84e1670F61347CDaeD56dcc736FB990fBB47ddC1",
    symbol: "LRC",
    decimals: 18,
    chainId: 137,
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xBBbbCA6A901c926F240b89EacB641d8Aec7AEafD/logo.png",
  },
  {
    assetId: "polygon.0xA1c57f48F0Deb89f569dFbE6E2B7f46D33606fD4",
    network: "polygon",
    networkImage: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=032",
    chainId: 137,
    address: "0xA1c57f48F0Deb89f569dFbE6E2B7f46D33606fD4",
    name: "(PoS) Decentraland MANA",
    symbol: "MANA",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/878/thumb/decentraland-mana.png?1550108745",
  },
  {
    assetId: "polygon.0x0Bf519071b02F22C17E7Ed5F4002ee1911f46729",
    network: "polygon",
    networkImage: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=032",
    name: "Numeraire (PoS)",
    address: "0x0Bf519071b02F22C17E7Ed5F4002ee1911f46729",
    symbol: "NMR",
    decimals: 18,
    chainId: 137,
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x1776e1F26f98b1A5dF9cD347953a26dd3Cb46671/logo.png",
  },
  {
    assetId: "polygon.0x9880e3dDA13c8e7D4804691A45160102d31F6060",
    network: "polygon",
    networkImage: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=032",
    name: "Orchid (PoS)",
    address: "0x9880e3dDA13c8e7D4804691A45160102d31F6060",
    symbol: "OXT",
    decimals: 18,
    chainId: 137,
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x4575f41308EC1483f3d399aa9a2826d74Da13Deb/logo.png",
  },
  {
    assetId: "polygon.0x19782D3Dc4701cEeeDcD90f0993f0A9126ed89d0",
    network: "polygon",
    networkImage: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=032",
    name: "REN (PoS)",
    address: "0x19782D3Dc4701cEeeDcD90f0993f0A9126ed89d0",
    symbol: "REN",
    decimals: 18,
    chainId: 137,
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x408e41876cCCDC0F92210600ef50372656052a38/logo.png",
  },
  {
    assetId: "polygon.0x6563c1244820CfBd6Ca8820FBdf0f2847363F733",
    network: "polygon",
    networkImage: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=032",
    name: "Reputation Augur v2",
    address: "0x6563c1244820CfBd6Ca8820FBdf0f2847363F733",
    symbol: "REPv2",
    decimals: 18,
    chainId: 137,
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x221657776846890989a759BA2973e427DfF5C9bB/logo.png",
  },
  {
    assetId: "polygon.0x50B728D8D964fd00C2d0AAD81718b71311feF68a",
    network: "polygon",
    networkImage: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=032",
    name: "Synthetix Network Token",
    address: "0x50B728D8D964fd00C2d0AAD81718b71311feF68a",
    symbol: "SNX",
    decimals: 18,
    chainId: 137,
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F/logo.png",
  },
  {
    assetId: "polygon.0xd72357dAcA2cF11A5F155b9FF7880E595A3F5792",
    network: "polygon",
    networkImage: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=032",
    name: "Storj Token",
    address: "0xd72357dAcA2cF11A5F155b9FF7880E595A3F5792",
    symbol: "STORJ",
    decimals: 8,
    chainId: 137,
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xB64ef51C888972c908CFacf59B47C1AfBC0Ab8aC/logo.png",
  },
  {
    assetId: "polygon.0xF81b4Bec6Ca8f9fe7bE01CA734F55B2b6e03A7a0",
    network: "polygon",
    networkImage: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=032",
    name: "Synth sUSD",
    address: "0xF81b4Bec6Ca8f9fe7bE01CA734F55B2b6e03A7a0",
    symbol: "sUSD",
    decimals: 18,
    chainId: 137,
    logoURI:
      "https://assets.coingecko.com/coins/images/5013/thumb/sUSD.png?1616150765",
  },
  {
    assetId: "polygon.0x4b4327db1600b8b1440163f667e199cef35385f5",
    network: "polygon",
    networkImage: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=032",
    chainId: 137,
    address: "0x4b4327db1600b8b1440163f667e199cef35385f5",
    name: "Coinbase Wrapped Staked ETH (FXERC20)",
    symbol: "fxcbETH",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/27008/standard/cbeth.png?1709186989",
    extensions: {
      link: "https://www.coinbase.com/cbeth",
    },
  },
  {
    assetId: "polygon.0xb7b31a6bc18e48888545ce79e83e06003be70930",
    network: "polygon",
    networkImage: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=032",
    chainId: 137,
    address: "0xb7b31a6bc18e48888545ce79e83e06003be70930",
    name: "ApeCoin (PoS)",
    symbol: "APE",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/24383/standard/apecoin.jpg?1696523566",
    extensions: {
      link: "https://apecoin.com/",
    },
  },
  {
    assetId: "polygon.0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
    network: "polygon",
    networkImage: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=032",
    name: "USDCoin",
    address: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
    symbol: "USDC",
    decimals: 6,
    chainId: 137,
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
  },
  {
    assetId: "polygon.0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
    network: "polygon",
    networkImage: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=032",
    name: "Wrapped Ether",
    address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
    symbol: "WETH",
    decimals: 18,
    chainId: 137,
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
  },
  {
    assetId: "polygon.0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
    network: "polygon",
    networkImage: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=032",
    name: "Wrapped Matic",
    address: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
    symbol: "WMATIC",
    decimals: 18,
    chainId: 137,
    logoURI:
      "https://assets.coingecko.com/coins/images/4713/thumb/matic-token-icon.png?1624446912",
  },
  {
    assetId: "polygon.0xDC3326e71D45186F113a2F448984CA0e8D201995",
    network: "polygon",
    networkImage: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=032",
    chainId: 137,
    address: "0xDC3326e71D45186F113a2F448984CA0e8D201995",
    name: "XSGD",
    symbol: "XSGD",
    decimals: 6,
    logoURI:
      "https://assets.coingecko.com/coins/images/12832/standard/StraitsX_Singapore_Dollar_%28XSGD%29_Token_Logo.png?1696512623",
  },
  {
    assetId: "polygon.0x5559Edb74751A0edE9DeA4DC23aeE72cCA6bE3D5",
    network: "polygon",
    networkImage: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=032",
    name: "0x Protocol Token (PoS)",
    address: "0x5559Edb74751A0edE9DeA4DC23aeE72cCA6bE3D5",
    symbol: "ZRX",
    decimals: 18,
    chainId: 137,
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xE41d2489571d322189246DaFA5ebDe1F4699F498/logo.png",
  },
  {
    assetId: "polygon.0xE0B52e49357Fd4DAf2c15e02058DCE6BC0057db4",
    network: "polygon",
    networkImage: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=032",
    chainId: 137,
    address: "0xE0B52e49357Fd4DAf2c15e02058DCE6BC0057db4",
    name: "agEur",
    symbol: "agEUR",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/19479/standard/agEUR.png?1696518915",
  },
  {
    assetId: "polygon.0x0621d647cecbFb64b79E44302c1933cB4f27054d",
    network: "polygon",
    networkImage: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=032",
    chainId: 137,
    address: "0x0621d647cecbFb64b79E44302c1933cB4f27054d",
    name: "Amp Token (PoS)",
    symbol: "AMP",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/12409/thumb/amp-200x200.png?1599625397",
  },
  {
    assetId: "polygon.0x9a71012B13CA4d3D0Cdc72A177DF3ef03b0E76A3",
    network: "polygon",
    networkImage: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=032",
    name: "Balancer",
    address: "0x9a71012B13CA4d3D0Cdc72A177DF3ef03b0E76A3",
    symbol: "BAL",
    decimals: 18,
    chainId: 137,
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xba100000625a3754423978a60c9317c58a424e3D/logo.png",
  },
  {
    assetId: "polygon.0xA8b1E0764f85f53dfe21760e8AfE5446D82606ac",
    network: "polygon",
    networkImage: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=032",
    chainId: 137,
    address: "0xA8b1E0764f85f53dfe21760e8AfE5446D82606ac",
    name: "BandProtocol (PoS)",
    symbol: "BAND",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/9545/thumb/band-protocol.png?1568730326",
  },
  {
    assetId: "polygon.0xc26D47d5c33aC71AC5CF9F776D63Ba292a4F7842",
    network: "polygon",
    networkImage: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=032",
    name: "Bancor Network Token (PoS)",
    address: "0xc26D47d5c33aC71AC5CF9F776D63Ba292a4F7842",
    symbol: "BNT",
    decimals: 18,
    chainId: 137,
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x1F573D6Fb3F13d689FF844B4cE37794d79a7FF1C/logo.png",
  },
  {
    assetId: "polygon.0x8505b9d2254A7Ae468c0E9dd10Ccea3A837aef5c",
    network: "polygon",
    networkImage: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=032",
    name: "(PoS) Compound",
    address: "0x8505b9d2254A7Ae468c0E9dd10Ccea3A837aef5c",
    symbol: "COMP",
    decimals: 18,
    chainId: 137,
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xc00e94Cb662C3520282E6f5717214004A7f26888/logo.png",
  },
  {
    assetId: "polygon.0x172370d5Cd63279eFa6d502DAB29171933a610AF",
    network: "polygon",
    networkImage: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=032",
    name: "Curve DAO Token (PoS)",
    address: "0x172370d5Cd63279eFa6d502DAB29171933a610AF",
    symbol: "CRV",
    decimals: 18,
    chainId: 137,
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xD533a949740bb3306d119CC777fa900bA034cd52/logo.png",
  },
  {
    assetId: "polygon.0x1b815d120b3ef02039ee11dc2d33de7aa4a8c603",
    network: "polygon",
    networkImage: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=032",
    name: "Wootrade Network (PoS)",
    address: "0x1b815d120b3ef02039ee11dc2d33de7aa4a8c603",
    symbol: "WOO",
    decimals: 18,
    chainId: 137,
    logoURI:
      "https://assets.coingecko.com/coins/images/12921/standard/WOO_Logos_2023_Profile_Pic_WOO.png?1696512709",
  },
];
