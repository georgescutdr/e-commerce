import { lazy } from 'react'

export const form = {
  category: lazy(() => import('./form/category-form')),
  option: lazy(() => import('./form/option-form')),
  brand: lazy(() => import('./form/brand-form')),
  promotion: lazy(() => import('./form/promotion-form')),
  voucher: lazy(() => import('./form/voucher-form')),
  product: lazy(() => import('./form/product-form')),
  page: lazy(() => import('./form/page-form')),
  user: lazy(() => import('./form/user-form')),
};