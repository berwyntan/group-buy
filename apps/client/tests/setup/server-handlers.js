import {rest} from 'msw' // msw supports graphql too!
import { 
  getAllCategory,
  getCategoryById
} from './mockDataCategory'
import { 
  countProductsByCategory,
} from './mockDataProduct'

const handlers = [
 
  rest.get('http://localhost:3000/api/product/cat/count/undefined', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(countProductsByCategory))
  }),
  rest.get('http://localhost:3000/api/category', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getAllCategory))
  }),
  rest.get('http://localhost:3000/api/category/undefined', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getCategoryById))
  })
]

export {handlers}
