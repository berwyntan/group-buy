import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from "react-query";
import AdminCategory from '../src/pages/AdminCategory'

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retryDelay: 1,
        retry: 0,
      },
    },      
  })

const Wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
        {children}        
    </BrowserRouter>
    </QueryClientProvider>
)

describe("AdminCategory component", () => {
    it('renders listings', async () => {

        render(<Wrapper><AdminCategory /></Wrapper>)   
        
        await waitFor(() => {
          const listings = screen.getByText(/Create Listing/)
          expect(listings).toBeInTheDocument()
        }) 
    })     
})