import { describe, expect, it } from "vitest";
import { render, screen, renderHook, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient, useQuery } from "react-query";
import AdminCategory, { useCountProductsByCategory } from '../src/pages/AdminCategory'
import nock from 'nock';


const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // ✅ turns retries off
        // retry: false,
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

// nock('http://localhost:3000')
//     .get(`/api/product/cat/count/123`)
//     .reply(200, {
//         "count": 0,
//         "rows": []
//     })

describe("AdminCategory component", () => {
    it('renders listings', async () => {
        
        nock('http://localhost:3000')
        .get(`/api/product/cat/count/undefined`)
        .reply(200, {
            "count": 0,
            "rows": []
        })

        render(<AdminCategory />, {wrapper})   
        
        
        // const { result } = renderHook(() => useCountProductsByCategory('123'), {wrapper})        
        
        
        // await waitFor(() => expect(result.current).toBe(null), )
        // await waitFor(() => result.current.isSuccess, {timeout:1000})
        // await waitFor(() => result.current.isError)
        // expect(screen.getByText(/Listings/)).toBeInTheDocument()
        // expect(result.current.data).toEqual({ count: 0 })
        // await waitFor(() => result.toBe(null))
        
        // screen.debug()
        
    })
    // it('renders Create Listing button', async () => {
    //     render(<AdminCategory />, {wrapper})
    //     const { result } = renderHook(() => useQuery(), 
    //         {wrapper})
    //     await waitFor(() => expect(result.current.isSuccess).toBe(false))

    //     screen.debug()
    //     expect(screen.getByRole('button', { name: "Create Listing" })).toBeInTheDocument()
    // })    
})