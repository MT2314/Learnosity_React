import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TextComponent from '../components/TextComponent/TextComponent'

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

describe("<Text/>", () => {
  test('Text component renders to the page', () => {
    render(<TextComponent/>)

    expect(screen.getByTestId('text-component')).toBeInTheDocument()
  })

  test('Default lorem ipsum renders', () => {
    render(<TextComponent/>)

    expect(screen.getByText(/Lorem ipsum/i)).toBeInTheDocument()
  })

  test('On click text editor renders', () => {
    render(<TextComponent/>)

    const editorContainer = screen.getByTestId('text-component')

    expect(editorContainer).toBeInTheDocument()

    fireEvent.click(editorContainer)
    
    expect(screen.getByTestId('text-editor-component')).toBeInTheDocument()
    
  })

})