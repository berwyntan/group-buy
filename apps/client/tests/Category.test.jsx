import { describe, expect, it } from "vitest";
import { screen, waitFor } from '@testing-library/react';
import { renderWithQueryClientBrowserRouter } from "./setup/renderFunctions";
import Category from "../src/pages/Category";

describe("Category component", () => {
    it('renders mock data', async () => {
        renderWithQueryClientBrowserRouter(<Category />)
        
        await waitFor(() => {
            expect(screen.getByText(/Valencia Orange/)).toBeInTheDocument()
        })
    })
    it('renders 4 cards', async () => {
        renderWithQueryClientBrowserRouter(<Category />)
        
        await waitFor(() => {
            const cards = screen.getAllByRole('figure')
            expect(cards).toHaveLength(4)
        })
    })
})