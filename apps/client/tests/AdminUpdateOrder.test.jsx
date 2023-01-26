import { describe, expect, it } from "vitest";
import { screen, waitFor } from '@testing-library/react';
import { renderWithQueryClientBrowserRouter } from "./setup/renderFunctions";
import AdminUpdateOrder from "../src/pages/AdminUpdateOrder";

describe("AdminUpdateOrder component", () => {
    it('renders order id', async () => {
        renderWithQueryClientBrowserRouter(<AdminUpdateOrder />)
        
        await waitFor(() => {
            expect(screen.getByText(/Order id:/)).toBeInTheDocument()
        })
    })
    it('renders Payment pending button', async () => {

        renderWithQueryClientBrowserRouter(<AdminUpdateOrder />)
        
        await waitFor(() => {
          const buttons = screen.getAllByRole('button')
          expect(buttons[0]).toHaveTextContent(/Payment pending/)
        }) 
    }) 
})