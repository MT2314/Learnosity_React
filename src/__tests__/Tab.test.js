import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TabsMain, {} from '../components/Tabs/TabsMain';
import {layoutReducer} from '../components/Tabs/TabContext'

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

const testLayout = [
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
    components: [{"componentName":"Text","componentProps":{"body":null}},{"componentName":"Text","componentProps":{"body":null}}]
  },
];

const defaultProps = {
  layoutState: [
    {
      type: "TAB",
      id: 0,
      title: "",
      components: [],
    },
    {
      type: "TAB",
      id: 1,
      title: "",
      components: [],
    },
  ],
};


describe("Tabs", () => {
   it('Renders Tab Component with default 2 tabs', async () => {
    render(<TabsMain layoutState={testLayout}/>)

      expect(screen.getByText(/polkaroo/i)).toBeInTheDocument();
      expect(screen.getByText(/juno/i)).toBeInTheDocument();
   }) 

   it('Displays placeholder text', async () => {
    render(<TabsMain layoutState={testLayout}/>)
    expect(screen.getByText(/accepted components/i)).toBeInTheDocument();
   })

   it('On click displays active tab', async () => {
    render(<TabsMain layoutState={testLayout}/>)
      const tabLabel = screen.getByRole('tab', {name:/juno/i});
      const placeholder = screen.getByText(/accepted components/i)
      
      expect(tabLabel).toBeInTheDocument();
      expect(placeholder).toBeInTheDocument();

      fireEvent.click(tabLabel);
      expect(placeholder).not.toBeInTheDocument(); 
   })

   it('On drop adds a component to the tab', async () => {
    const { layoutState } = defaultProps
    const newState = layoutReducer( layoutState , {
      func: "ADD_COMPONENT",
      tabIndex: 0,
      component: {
        componentName: 'testy mctesterson',
      },
    })

    expect(newState[0].components).toHaveLength(1)

   })
});
