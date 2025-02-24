import React from "react";
import {
  render,
  screen,
  waitFor,
  fireEvent,
  within,
} from "@testing-library/react";
import { useAccount } from "wagmi";
import useTransactionStore from "@/store/activityStore";
import "@testing-library/jest-dom";
import ActivityFeed from "@/app/components/templates/ActivityFeed";

// Mock wagmi hooks
jest.mock("wagmi", () => ({
  useAccount: jest.fn(),
}));

// Mock useTransactionStore
jest.mock("@/store/activityStore", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockUseAccount = useAccount as jest.Mock;
const mockUseTransactionStore = useTransactionStore as unknown as jest.Mock;

describe("ActivityFeed Component", () => {
  const mockTransactions = [
    {
      hash: "0x1",
      type: "ETH",
      from: "0xFromAddress1",
      to: "0xToAddress1",
      value: "1000000000000000000",
      timestamp: Date.now(),
      status: "confirmed",
    },
    {
      hash: "0x2",
      type: "ERC20",
      from: "0xFromAddress2",
      to: "0xToAddress2",
      tokenSymbol: "USDC",
      tokenValue: "1000000",
      tokenDecimal: 6,
      timestamp: Date.now(),
      status: "failed",
    },
  ];

  const mockFetchTransactions = jest.fn();

  beforeEach(() => {
    mockUseAccount.mockReturnValue({
      address: "0xUserAddress",
      chain: { id: 1 },
    });

    mockUseTransactionStore.mockReturnValue({
      fetchTransactions: mockFetchTransactions,
      isLoading: false,
      transactions: mockTransactions,
      error: null,
      filters: { days: 7, type: "all" },
      setFilters: jest.fn(),
    });
  });

  it("renders the activity feed correctly", async () => {
    render(<ActivityFeed />);

    expect(screen.getByTestId("transaction-history-title")).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByTestId("days-filter")).toBeInTheDocument(),
    );
    await waitFor(() =>
      expect(screen.getByTestId("type-filter")).toBeInTheDocument(),
    );
    expect(screen.getByTestId("transaction-list")).toBeInTheDocument();
  });

  it("displays transactions correctly", async () => {
    render(<ActivityFeed />);

    await waitFor(() =>
      expect(screen.getByTestId("transaction-0x1")).toBeInTheDocument(),
    );
    await waitFor(() =>
      expect(screen.getByTestId("transaction-0x2")).toBeInTheDocument(),
    );

    const transaction1 = screen.getByTestId("transaction-0x1");
    expect(
      within(transaction1).getByTestId("transaction-title"),
    ).toHaveTextContent("ETH Transfer");
    expect(
      within(transaction1).getByTestId("transaction-status"),
    ).toHaveTextContent("Confirmed");

    const transaction2 = screen.getByTestId("transaction-0x2");
    expect(
      within(transaction2).getByTestId("transaction-title"),
    ).toHaveTextContent("USDC Transfer");
    expect(
      within(transaction2).getByTestId("transaction-status"),
    ).toHaveTextContent("Failed");
  });

  it("displays loader when loading", () => {
    mockUseTransactionStore.mockReturnValueOnce({
      fetchTransactions: mockFetchTransactions,
      isLoading: true,
      transactions: [],
      error: null,
      filters: { days: 7, type: "all" },
      setFilters: jest.fn(),
    });

    render(<ActivityFeed />);

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("displays error message when there is an error", () => {
    mockUseTransactionStore.mockReturnValueOnce({
      fetchTransactions: mockFetchTransactions,
      isLoading: false,
      transactions: [],
      error: "Error fetching transactions",
      filters: { days: 7, type: "all" },
      setFilters: jest.fn(),
    });

    render(<ActivityFeed />);

    expect(
      screen.getByTestId("error-fetching-transactions"),
    ).toBeInTheDocument();
  });

  it("displays 'No transactions found' when there are no transactions", () => {
    mockUseTransactionStore.mockReturnValueOnce({
      fetchTransactions: mockFetchTransactions,
      isLoading: false,
      transactions: [],
      error: null,
      filters: { days: 7, type: "all" },
      setFilters: jest.fn(),
    });

    render(<ActivityFeed />);

    expect(screen.getByTestId("no-transactions")).toBeInTheDocument();
  });

  it("changes filters correctly", async () => {
    const setFiltersMock = jest.fn();
    mockUseTransactionStore.mockReturnValueOnce({
      fetchTransactions: mockFetchTransactions,
      isLoading: false,
      transactions: mockTransactions,
      error: null,
      filters: { days: 7, type: "all" },
      setFilters: setFiltersMock,
    });

    render(<ActivityFeed />);

    const daysFilter = await screen.findByTestId("days-filter-input");
    fireEvent.click(daysFilter);
    const daysOption = await screen.findByTestId("days-filter-option-30");
    fireEvent.click(daysOption);

    expect(setFiltersMock).toHaveBeenCalledWith(30, "all");

    const typeFilter = await screen.findByTestId("type-filter-input");
    fireEvent.click(typeFilter);
    const typeOption = await screen.findByTestId("type-filter-option-ETH");
    fireEvent.click(typeOption);

    expect(setFiltersMock).toHaveBeenCalledWith(7, "ETH");
  });
});
