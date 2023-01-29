import { createWrapper } from "./setup/renderFunctions";
import { renderHook, waitFor, act } from '@testing-library/react';
import useLogin from '../src/hooks/useLogin';
import { login } from './setup/mockDataUser';
import { server, rest } from './setup/server'

describe("useLogin hook", () => {
    it("Logs in", async () => {
        const { result } = renderHook(() => useLogin({setError: null}), {
            wrapper: createWrapper(),
        });
        // server.resetHandlers(
        //     rest.post(
        //         'http://localhost:3000/api/user/login',
        //         (req, res, ctx) => {
        //         return res(ctx.status(200), ctx.json(login));
        //         },
        //     ),
        // );
        act(() => {
            result.current({
                mobile: "91234567",
                password: "password",
            });
        });
        await waitFor(() => {
            console.log(result.current)
            return result.current;
        });
        console.log(result.current)
        expect(result.current).toBe(200);
    })
})