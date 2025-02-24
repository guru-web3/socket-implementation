import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import TokenFilter from "../../app/components/organisms/TokenFilter";
import "@testing-library/jest-dom";

describe("TokenFilter Component", () => {
  const mockTokens = [
    {
      address: "0x1",
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
      logoURI: "/icons/eth.png",
      balance: 0.0249,
    },
    {
      address: "0x2",
      name: "USDCoin",
      decimals: 6,
      logoURI: "/icons/usdc.png",
      balance: 421.79,
      symbol: "ETH",
    },
  ];

  const mockOnSelect = jest.fn();

  it("renders tokens correctly", () => {
    render(
      <TokenFilter
        tokens={mockTokens}
        onSelect={mockOnSelect}
        setIsSelection={() => {}}
      />,
    );

    // Check if all tokens are rendered
    expect(screen.getAllByRole("listitem")).toHaveLength(mockTokens.length);

    // Check token details
    expect(screen.getByTestId("token-Ethereum")).toBeInTheDocument();
    expect(screen.getByTestId("token-USDCoin")).toBeInTheDocument();

    const ethereumToken = screen.getByTestId("token-Ethereum");
    expect(
      within(ethereumToken).getByTestId("token-balance"),
    ).toHaveTextContent("0.0249");
  });

  it("filters tokens based on search query", () => {
    render(
      <TokenFilter
        tokens={mockTokens}
        onSelect={mockOnSelect}
        setIsSelection={() => {}}
      />,
    );

    const searchInput = screen.getByTestId("search-input");

    // Type in search input
    fireEvent.change(searchInput, { target: { value: "Ethereum" } });

    // Only Ethereum should be visible
    expect(screen.queryByTestId("token-Ethereum")).toBeInTheDocument();
    expect(screen.queryByTestId("token-USDCoin")).not.toBeInTheDocument();
  });

  it("triggers onSelect when a token is clicked", () => {
    render(
      <TokenFilter
        tokens={mockTokens}
        onSelect={mockOnSelect}
        setIsSelection={() => {}}
      />,
    );

    const ethereumCard = screen.getByTestId("token-Ethereum");

    fireEvent.click(ethereumCard);

    expect(mockOnSelect).toHaveBeenCalledWith(mockTokens[0]);
  });

  it("displays 'No tokens found' when no tokens match the search query", () => {
    render(
      <TokenFilter
        tokens={mockTokens}
        onSelect={mockOnSelect}
        setIsSelection={() => {}}
      />,
    );

    const searchInput = screen.getByTestId("search-input");

    // Type in search input with no matching results
    fireEvent.change(searchInput, { target: { value: "nonexistent" } });

    // Check for "No tokens found" text
    expect(screen.getByTestId("no-tokens-found")).toBeInTheDocument();
  });
});
