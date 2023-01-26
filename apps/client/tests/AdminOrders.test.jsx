import { describe, expect, it } from "vitest";
import { screen, waitFor } from '@testing-library/react';
import { renderWithQueryClientBrowserRouter } from "./setup/renderFunctions";
import AdminOrders from "../src/pages/AdminOrders";
import { server } from "./setup/server";
import {rest} from 'msw'

describe("AdminOrders component", () => {
    it('renders Product Orders title', async () => {
        renderWithQueryClientBrowserRouter(<AdminOrders />)
        
        await waitFor(() => {
            expect(screen.getByText(/Product Orders/)).toBeInTheDocument()
        })
    })
    it('renders mock data', async () => {

        renderWithQueryClientBrowserRouter(<AdminOrders />)
        
        await waitFor(() => {
          const product = screen.getAllByText(/Kinohimitsu Bird's Nest With Collagen/)
          expect(product[0]).toBeInTheDocument()
        }) 
    }) 
    // it('handles error', async () => {
    //     server.resetHandlers(
    //         rest.get(
    //           'http://localhost:3000/api/order/admin/product/undefined',
    //           (req, res, ctx) => {
    //             return res(ctx.status(400), ctx.json({message: 'Bad Request'}));
    //           },
    //         ),
    //     );
    //     renderWithQueryClientBrowserRouter(<AdminOrders />)
    //     screen.debug()
    //     expect(screen.getByText(/Bad Request/)).toBeInTheDocument()
    // })   
})