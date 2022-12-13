import { describe, expect, it } from "vitest";
import { render, screen, renderHook, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient, useQuery } from "react-query";
import AdminCategory from '../../src/pages/AdminCategory'

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // ✅ turns retries off
        retry: false,
      },
    },
  })
const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
        {/* {children} */}
        <AdminCategory />
    </BrowserRouter>
    </QueryClientProvider>
)

describe("AdminCategory component", () => {
    it('renders listings', async () => {
        render(<AdminCategory />, {wrapper})
        const { result } = renderHook(() => useQuery(), 
            {wrapper})
        // await waitFor(() => expect(result.current.isSuccess).toBe(false))
        await waitFor(() => result.current)
        console.log(result)
        // expect(screen.getByText(/Listings/)).toBeInTheDocument()
    })
    it('renders Create Listing button', async () => {
        render(<AdminCategory />, {wrapper})
        const { result } = renderHook(() => useQuery(), 
            {wrapper})
        await waitFor(() => expect(result.current.isSuccess).toBe(false))

        // screen.debug()
        // expect(screen.getByRole('button', { name: "Create Listing" })).toBeInTheDocument()
    })
    
})