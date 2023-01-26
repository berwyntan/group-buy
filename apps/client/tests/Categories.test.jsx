import { describe, expect, it } from "vitest";
import { screen, waitFor } from '@testing-library/react';
import { renderWithQueryClientBrowserRouter } from "./setup/renderFunctions";
import Categories from "../src/pages/Categories";

describe("Categories component", () => {
    it('renders mock data', async () => {

        renderWithQueryClientBrowserRouter(<Categories />)
        
        await waitFor(() => {
          const category = screen.getByText(/Fruits/)
          expect(category).toBeInTheDocument()
        }) 
    })    
})