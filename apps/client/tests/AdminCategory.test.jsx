import { describe, expect, it } from "vitest";
import { screen, waitFor } from '@testing-library/react';
import { renderWithQueryClientBrowserRouter } from "./setup/renderFunctions";
import AdminCategory from '../src/pages/AdminCategory'

describe("AdminCategory component", () => {
    it('renders Create Listing button', async () => {

        renderWithQueryClientBrowserRouter(<AdminCategory />)
        
        await waitFor(() => {
          const listings = screen.getByText(/Create Listing/)
          expect(listings).toBeInTheDocument()
        }) 
    })     
    it('renders mock data', async () => {

        renderWithQueryClientBrowserRouter(<AdminCategory />)
        
        await waitFor(() => {
          const product = screen.getByText(/Creator Expert 10280 Flower Bouquet/)
          expect(product).toBeInTheDocument()
        }) 
    })     
})