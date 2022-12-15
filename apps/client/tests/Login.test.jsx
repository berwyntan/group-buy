import { describe, expect, it } from "vitest";
import { render, screen, renderHook, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient, useQuery } from "react-query";
import Login from '../src/pages/Login'


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
        <Login />
    </BrowserRouter>
    </QueryClientProvider>
)


describe("Login component", () => {
    it('renders', async () => {
        
        // nock('http://localhost:3000')
        // .get(`/api/product/cat/count/undefined`)
        // .reply(200, {
        //     "count": 0,
        //     "rows": []
        // })

        render(<Login />, {wrapper})   
        
        
        // const { result } = renderHook(() => useCountProductsByCategory('123'), {wrapper})        
        
        
        // await waitFor(() => expect(result.current).toBe(null), )
        // await waitFor(() => result.current.isSuccess, {timeout:1000})
        // await waitFor(() => result.current.isError)
        expect(screen.getAllByText(/Log In/)).toBeInTheDocument()
        // expect(result.current.data).toEqual({ count: 0 })
        // await waitFor(() => result.toBe(null))
        
        screen.debug()
        
    })
})