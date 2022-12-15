import { describe, expect, it } from "vitest";
import { render, screen, renderHook, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient, useQuery } from "react-query";
import AdminCategory, { useCountProductsByCategory } from '../src/pages/AdminCategory'


const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // ✅ turns retries off
        retry: false,
      },
    },
    logger: {
        log: console.log,
        warn: console.warn,
        error: () => {},
    }
  })

const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
        {children}
        <AdminCategory />
    </BrowserRouter>
    </QueryClientProvider>
)

describe("AdminCategory component", () => {
    it('renders listings', async () => {

        render(<AdminCategory />, {wrapper})   
        
        
        
        
        // await waitFor(() => expect(result.current).toBe(null), )
        // expect(screen.getByText(/Listings/)).toBeInTheDocument()
        // expect(result.current.data).toEqual({ count: 0 })
        
        screen.debug()
        
    })
     
})