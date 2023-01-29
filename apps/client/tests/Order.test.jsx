import { describe, expect, it } from "vitest";
import { screen, waitFor } from '@testing-library/react';
import { renderWithQueryClientBrowserRouter } from "./setup/renderFunctions";
import Order from "../src/pages/Order";

describe("Order component", () => {
    it('renders mock data', async () => {
        renderWithQueryClientBrowserRouter(<Order />)
        
        await waitFor(() => {
            expect(screen.getByText(/Valencia Orange/)).toBeInTheDocument()
        })
    })
    it('renders title', async () => {
        renderWithQueryClientBrowserRouter(<Order />)
        
        await waitFor(() => {
            expect(screen.getByText(/Order Detail/)).toBeInTheDocument()
        })
    })
})