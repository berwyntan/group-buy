import { describe, expect, it } from "vitest";
import { render, screen } from '@testing-library/react';

import Account from '../src/pages/Account';

describe("Account component", () => {
    it('renders greeting', () => {
        render(<Account />)
        screen.debug()
        // expect(screen.getByRole('button', { name: /My Orders/})).toHaveClass('btn-primary')
    })
})