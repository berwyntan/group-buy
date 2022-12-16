// server-handlers.js
// this is put into here so I can share these same handlers between my tests
// as well as my development in the browser. Pretty sweet!
import {rest} from 'msw' // msw supports graphql too!
import * as users from '../src/api/user'
import * as products from '../src/api/product'

const handlers = [
  rest.post('http://localhost:3000/api/user/login', async (req, res, ctx) => {
    const user = await users.login(JSON.parse(req.body))
    return res(ctx.json({user}))
  }),
//   rest.post('/checkout', async (req, res, ctx) => {
//     const user = await users.login(JSON.parse(req.body))
//     const isAuthorized = user.authorize(req.headers.Authorization)
//     if (!isAuthorized) {
//       return res(ctx.status(401), ctx.json({message: 'Not authorized'}))
//     }
//     const shoppingCart = JSON.parse(req.body)
//     // do whatever other things you need to do with this shopping cart
//     return res(ctx.json({success: true}))
//   }),
  rest.get('http://localhost:3000/api/product/cat/count/:id', async (req, res, ctx) => {
    
    // const result = await products.countProductsByCategory()
    
    return res(ctx.status(200), ctx.json({count: 0, rows: []}))
  }),
]

export {handlers}
