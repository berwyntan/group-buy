import { describe, expect, it } from "vitest";
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'
import Account from '../src/pages/Account';

describe("Account component", () => {
    it('renders greeting', () => {
        render(<Account />, {wrapper: BrowserRouter})
        expect(screen.getByText(/Hello/)).toBeInTheDocument()
    })
    it('renders Orders button', () => {
        render(<Account />, {wrapper: BrowserRouter})
        // screen.debug()
        expect(screen.getByRole('button', { name: "My Orders" })).toBeInTheDocument()
    })
    it('renders Update Details button', () => {
        render(<Account />, {wrapper: BrowserRouter})
        // screen.debug()
        expect(screen.getByRole('button', { name: "Update Account Details" })).toHaveClass('my-2')
    })
})