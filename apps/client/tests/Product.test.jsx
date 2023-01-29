import { describe, expect, it } from "vitest";
import { screen, waitFor } from '@testing-library/react';
import { renderWithQueryClientBrowserRouter } from "./setup/renderFunctions";
import Product from "../src/pages/Product";

describe("Product component", () => {
    it('renders product', async () => {
        renderWithQueryClientBrowserRouter(<Product />)
        
        await waitFor(() => {
            expect(screen.getByText(/Valencia Orange/)).toBeInTheDocument()
        })
    })
    it('renders category', async () => {
        renderWithQueryClientBrowserRouter(<Product />)
        
        await waitFor(() => {
            expect(screen.getByText(/Fruits/)).toBeInTheDocument()
        })
    })
})