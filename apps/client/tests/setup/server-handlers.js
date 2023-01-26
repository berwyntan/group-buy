import {rest} from 'msw'; // msw supports graphql too!
import { 
  getAllCategory,
  getCategoryById
} from './mockDataCategory';
import { 
  countProductsByCategory,
  getProductsByCategory
} from './mockDataProduct';
import {
  getOrdersByProductId,
  getOrderByIdAdmin
} from './mockDataOrder';
import {
  getCartByUserId,
  updateCart
} from './mockDataCart';

const handlers = [
 
  rest.get('http://localhost:3000/api/product/cat/count/undefined', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(countProductsByCategory))
  }),
  rest.get('http://localhost:3000/api/category', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getAllCategory))
  }),
  rest.get('http://localhost:3000/api/category/undefined', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getCategoryById))
  }),
  rest.get('http://localhost:3000/api/order/admin/product/undefined', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getOrdersByProductId))
  }),
  rest.get('http://localhost:3000/api/order/admin/admin/undefined', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getOrderByIdAdmin))
  }),
  rest.get('http://localhost:3000/api/cart/user/undefined', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getCartByUserId))
  }),
  rest.patch('http://localhost:3000/api/cart', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(updateCart))
  }),
  rest.get('http://localhost:3000/api/product/cat/undefined', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getProductsByCategory))
  }),
]

export {handlers}
