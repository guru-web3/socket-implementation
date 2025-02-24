import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import WrapUnwrapCard from "../../app/components/templates/WrapEth";
import { ToastProvider } from "@/context/ToastContex"; // Import the ToastProvider
import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock wagmi hooks using Jest
jest.mock("wagmi", () => ({
  useAccount: jest.fn(() => ({
    address: "0x123",
    chain: { id: 11155111 },
  })),
  useBalance: jest.fn(({ token }) => ({
    data: token
      ? { value: BigInt(5e18), formatted: "5.0" }
      : { value: BigInt(10e18), formatted: "10.0" },
  })),
  useWriteContract: jest.fn(() => ({
    writeContractAsync: jest.fn().mockResolvedValue("0x"),
  })),
  usePublicClient: jest.fn(() => ({
    getGasPrice: jest.fn().mockResolvedValue(BigInt(1000000000)), // Mocked gas price
  })),
  useSwitchChain: jest.fn(() => ({
    switchChain: jest.fn().mockResolvedValue(true),
  })),
  useWaitForTransactionReceipt: jest.fn(() => ({
    status: "success",
  })),
  useConnectorClient: jest.fn(() => ({
    data: { mock: "mockedData" },
  })),
  useEstimateGas: jest.fn(() => ({
    estimateGas: jest.fn().mockResolvedValue(BigInt(21000)), // Mocked gas estimation
  })),
}));

describe("WrapUnwrapCard Component", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(), // Mock the `push` method
      pathname: "/",
    });
    jest.clearAllMocks();
  });

  const renderWithProviders = (ui: React.ReactNode) => {
    return render(<ToastProvider>{ui}</ToastProvider>);
  };

  it("renders wrap and unwrap buttons", () => {
    renderWithProviders(<WrapUnwrapCard />);

    // Debug the DOM to see what is rendered
    screen.debug();

    expect(screen.getByTestId("wrap-button")).toBeInTheDocument();
    expect(screen.getByTestId("unwrap-button")).toBeInTheDocument();
  });

  it("wraps ETH successfully", async () => {
    renderWithProviders(<WrapUnwrapCard />);
    const input = screen.getByTestId("wrap-input");
    fireEvent.change(input, { target: { value: "1" } });

    const wrapButton = screen.getByTestId("wrap-button"); // Adjust index if needed
    fireEvent.click(wrapButton);

    await waitFor(() =>
      expect(
        screen.getByText(/Transaction confirmed successfully!/i),
      ).toBeInTheDocument(),
    );
  });

  it("unwraps WETH successfully", async () => {
    renderWithProviders(<WrapUnwrapCard />);

    const input = screen.getByTestId("unwrap-input");
    fireEvent.change(input, { target: { value: "1" } });

    const unwrapButton = screen.getByTestId("unwrap-button"); // Adjust index if needed
    fireEvent.click(unwrapButton);

    await waitFor(() =>
      expect(
        screen.getByText(/Transaction confirmed successfully!/i),
      ).toBeInTheDocument(),
    );
  });

  it("disables wrap button when input is empty", () => {
    renderWithProviders(<WrapUnwrapCard />);

    const wrapButton = screen.getByTestId("wrap-button"); // Adjust index if needed
    expect(wrapButton).toBeDisabled();
  });

  it("shows an error when balance is insufficient", async () => {
    const { useBalance } = await import("wagmi");
    useBalance.mockImplementation(({ token }) => ({
      data: token
        ? { value: BigInt(1e18), formatted: "1.0" }
        : { value: BigInt(0.5e18), formatted: "0.5" },
    }));

    renderWithProviders(<WrapUnwrapCard />);

    const input = screen.getByTestId("wrap-input");
    fireEvent.change(input, { target: { value: "2" } });

    await waitFor(() => {
      expect(screen.getByText("Insufficient Balance")).toBeInTheDocument();
    });
  });
});
