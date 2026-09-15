import { PetDetailScreen } from '@/components/pets/pet-detail-screen'

export default async function PetDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <PetDetailScreen id={id} />
}
