import { describe, expect, it } from "vitest";
import { screen, waitFor } from '@testing-library/react';
import { renderWithQueryClientBrowserRouter } from "./setup/renderFunctions";
import AdminOrders from "../src/pages/AdminOrders";

describe("AdminOrders component", () => {
    it('renders Add Category button', async () => {
        // renderWithQueryClientBrowserRouter(<AdminListings />)
        
        // await waitFor(() => {
        //     expect(screen.getByRole('button', { name: "Add Category" })).toBeInTheDocument()
        // })
    })
    it('renders mock data', async () => {

        // renderWithQueryClientBrowserRouter(<AdminListings />)
        
        // await waitFor(() => {
        //   const category = screen.getByText(/Health & Beauty/)
        //   expect(category).toBeInTheDocument()
        // }) 
    })    
})