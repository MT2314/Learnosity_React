import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ActiveTabProvider } from "../components/Tabs/TabsMain";
import { LayoutProvider } from "../components/Tabs/TabsMain";
import Tabs from "../components/Tabs/subcomponents/Tabs";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("Tabs", () => {
  const TestLayout = [
    {
      type: "TAB",
      id: 0,
      title: "Polkaroo",
      components: [],
    },
    {
      type: "TAB",
      id: 1,
      title: "Juno",
      components: [],
    },
  ];

  it("renders tab component with two tabs", async () => {
    render(
      <LayoutProvider
        layoutState={TestLayout}
        setProp={() => {
          console.log("set props function");
        }}
      >
        <ActiveTabProvider>
          <Tabs />
        </ActiveTabProvider>
      </LayoutProvider>
    );

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Tab 1/gi)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Tab 2/gi)).toBeInTheDocument();
    });
  });

  it("renders the tab component with placeholder text if no components are added tab", async () => {
    render(
      <LayoutProvider layoutState={TestLayout} setProp={() => {}}>
        <ActiveTabProvider>
          <Tabs />
        </ActiveTabProvider>
      </LayoutProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/add a component here/gi)).toBeInTheDocument();
    });
  });
});
