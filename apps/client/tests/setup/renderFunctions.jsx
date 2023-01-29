import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

setLogger({
    
    log: console.log,
    warn: console.warn,
    error: () => {},
});

const generateQueryClient = () => {
    return new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },      
    })
}

export const renderWithQueryClient = (ui) => {
    const queryClient = generateQueryClient()
    return render(
        <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    )
}

export const renderWithQueryClientBrowserRouter = (ui) => {
    const queryClient = generateQueryClient()
    return render(
        <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            {ui}
        </BrowserRouter>
        </QueryClientProvider>
    )
}

export const createWrapper = () => {
    const queryClient = generateQueryClient()
    return ({ children }) => (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
            {children}
            </BrowserRouter>
        </QueryClientProvider>
      )
}