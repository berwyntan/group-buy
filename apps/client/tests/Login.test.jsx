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
        

        render(<Login />, {wrapper})   
        
        
        expect(screen.getAllByText(/Log In/)).toBeInTheDocument()
        
        screen.debug()
        
    })
})