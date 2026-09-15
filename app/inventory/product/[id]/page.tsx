import { ProductDetailScreen } from '@/components/inventory/product-detail-screen'

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <ProductDetailScreen id={id} />
}
