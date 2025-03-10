# socket-implementation

Features

1. ETH to WETH Wrapping/Unwrapping(Sepolia)

- Wrap ETH into WETH or unwrap WETH back to ETH.
- Gas estimation using EIP-1559 for accurate fee calculations.
- Support for Safe Wallet transactions via dynamic imports.

2. Token Management and Transfer(Across Chains)

- View token balances across chains.
- Search and filter tokens by name or address.
- Select tokens for transfers.

3. Socket.tech Multi-Chain Token Bridging

- Fetch routes for token bridging using the Socket API.
- Display the best return route and quickest route dynamically.
- Enable Refuel to recieve native token on target/to chain for easy transaction in target chain

4. Transaction Management

- Post transactions to Redis with a 10-minute expiry for caching.
- Fetch transaction activity from Redis or on-chain explorers.
- Format transaction details for display in the activity feed.

# Tech Stack

## Frontend:

- React: Component-based UI development.
- Next.js: Server-side rendering and routing.
- TailwindCSS: Styling framework for consistent design.
- RainbowKit: Wallet connection and management.
- Viem, wagmi: Blockchain interaction library for gas estimation and contract calls.
- Safe global packages: to submit a transaction from safe signer
  p.s(safe wallet is down currently haven't tested e2e flow, but have integrated the flows)

## State Management:

- Zustand: Lightweight state management for managing swap transactions, token balances, and user selections.

## Backend:

- Redis: Caching transactions with expiry to reduce API calls.
- zod: for request body validation

## npm install

use `npm i`

## npm run dev

for running locally, copy env.local into .env and populate the values and test out

```NEXT_PUBLIC_S3_ASSETS=
NEXT_PUBLIC_SOCKET_API_KEY=
ETHERSCAN_API =
KV_URL=
INFURA_KEY=

CRYPTOCOMPARE_API_KEY=
ARBISCAN_API_KEY=
POLYGONSCAN_API_KEY=
```

## npm test

for testing the unit tests inside `src/__tests__/app`

## Screenshots

<img width="1719" alt="Screenshot 2025-02-23 at 4 01 10 PM" src="https://github.com/user-attachments/assets/26fd439d-7bcb-4b4f-bf6f-28d79bde81d3" />

### Wrap Ether

<img width="644" alt="wrap-eth" src="https://github.com/user-attachments/assets/a8900149-a79d-4fcc-b1aa-5867cd9ec514" />

### Socket.tech Swap

<img width="724" alt="bungee-swap" src="https://github.com/user-attachments/assets/641c6446-5a08-4626-a76c-4ac6511c95f5" />

### Across Token List

<img width="582" alt="across-chain-token-viewer" src="https://github.com/user-attachments/assets/498d6a85-a760-4f32-bf85-82c6d4ce3aec" />

### Token Transfer

<img width="622" alt="transfer-token" src="https://github.com/user-attachments/assets/35eef0af-2db4-4a1b-813f-bd3576643471" />

### Transaction Activity

<img width="1029" alt="bungee-transaction-activity" src="https://github.com/user-attachments/assets/23a5d672-3b2c-46f9-a52f-49b45e939b67" />

## Best Practices Followed

- Dynamic imports for heavy libraries (e.g., Safe Protocol Kit).
- Done Package `Bundle Analyzis` and `Lighthouse` Performance testing and improved web app performance
- `Zustand` for lightweight state management.
- `TailwindCSS` for consistent styling across components.
- Accessibility improvements using ARIA labels.
- Optimized performance by caching data in `Redis`.

## Future Enhancements

- Add pagination support to the token list.
- Implement transaction history filtering by date and type.
- Add support for additional chains beyond Sepolia.
