import { describe, expect, it } from "vitest";
import { screen, waitFor } from '@testing-library/react';
import { renderWithQueryClientMemoryRouter } from "./setup/renderFunctions";
import Cart from "../src/pages/Cart";

describe("Cart component", () => {
    it('renders mock data', async () => {
        renderWithQueryClientMemoryRouter(
            <Cart />,
            '/api/cart/user/12345',
            '/api/cart/user/:id'
        )
        
        await waitFor(() => {
            expect(screen.getByText(/Fried Whole Chicken/)).toBeInTheDocument()
        })
    })
    it('renders Checkout button', async () => {

        renderWithQueryClientMemoryRouter(
            <Cart />,
            '/api/cart/user/12345',
            '/api/cart/user/:id'
        )
        
        await waitFor(() => {
          const buttons = screen.getAllByRole('button')
          expect(buttons[0]).toHaveTextContent(/Checkout/)
        }) 
    }) 
    it('handles error 400', async () => {
        renderWithQueryClientMemoryRouter(
            <Cart />,
            '/api/cart/user/sadcase',
            '/api/cart/user/:id'
        )
        
        await waitFor(() => {
            expect(screen.getByText(/Server error/)).toBeInTheDocument()
        })
    })
})