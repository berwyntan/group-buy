import { describe, expect, it } from "vitest";
import { screen, waitFor } from '@testing-library/react';
import { renderWithQueryClientBrowserRouter } from "./setup/renderFunctions";
import Checkout from "../src/pages/Checkout";

describe("Checkout component", () => {
    it('renders mock data', async () => {

        renderWithQueryClientBrowserRouter(<Checkout />)
        
        await waitFor(() => {
          const item = screen.getByText(/Fried Whole Chicken/)
          expect(item).toBeInTheDocument()
        }) 
    })    
})