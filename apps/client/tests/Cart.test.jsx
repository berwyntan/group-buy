import { describe, expect, it } from "vitest";
import { screen, waitFor } from '@testing-library/react';
import { renderWithQueryClientBrowserRouter } from "./setup/renderFunctions";
import Cart from "../src/pages/Cart";

describe("AdminUpdateOrder component", () => {
    it('renders mock data', async () => {
        renderWithQueryClientBrowserRouter(<Cart />)
        
        await waitFor(() => {
            expect(screen.getByText(/Fried Whole Chicken/)).toBeInTheDocument()
        })
    })
    it('renders Checkout button', async () => {

        renderWithQueryClientBrowserRouter(<Cart />)
        
        await waitFor(() => {
          const buttons = screen.getAllByRole('button')
          expect(buttons[0]).toHaveTextContent(/Checkout/)
        }) 
    }) 
})