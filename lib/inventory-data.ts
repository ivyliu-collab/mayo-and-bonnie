import type { IdentityColor } from './mock-data'

export type InventoryProduct = {
  id: string
  name: string
  category: string
  section: '猫' | '狗'
  image: string
  quantity: number
  unit: string
  status: 'opened' | 'attention' | 'safe' | 'no-expiry'
  statusLabel: string
  expiry?: string
  progress?: number
  accent: IdentityColor
}

export const inventoryProducts: InventoryProduct[] = [
  { id: 'cat-food', name: '鲜肉全价猫粮', category: '猫粮', section: '猫', image: '/products/cat-food.png', quantity: 3, unit: '包', status: 'opened', statusLabel: '已开 1 包', progress: 58, expiry: '2026.12.18', accent: 'lavender' },
  { id: 'wet-food', name: '深海鱼肉主食罐', category: '罐头', section: '猫', image: '/products/wet-food.png', quantity: 24, unit: '罐', status: 'attention', statusLabel: '关注', expiry: '2026.04.02', accent: 'sage' },
  { id: 'dog-food', name: '低敏鸡肉犬粮', category: '狗粮', section: '狗', image: '/products/dog-food.png', quantity: 2, unit: '包', status: 'opened', statusLabel: '已开 1 包', progress: 32, expiry: '2026.10.26', accent: 'slate-blue' },
  { id: 'treats', name: '冻干鸡肉小零食', category: '零食', section: '狗', image: '/products/treats.png', quantity: 6, unit: '袋', status: 'safe', statusLabel: '安全', expiry: '2027.01.12', accent: 'apricot' },
  { id: 'dental-chews', name: '洁齿磨牙棒', category: '其他', section: '狗', image: '/products/treats.png', quantity: 3, unit: '件', status: 'no-expiry', statusLabel: '无效期', accent: 'sage' },
]

export const inventoryCategories = ['全部', '猫粮', '罐头', '狗粮', '零食', '其他']
