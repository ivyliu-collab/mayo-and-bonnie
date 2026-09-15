import { HistoryScreen } from '@/components/history/history-screen'

type HistoryPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function HistoryPage({ searchParams }: HistoryPageProps) {
  const params = await searchParams
  const tab = typeof params.tab === 'string' ? params.tab : undefined
  const section = typeof params.section === 'string' ? params.section : undefined
  const product = typeof params.product === 'string' ? params.product : undefined
  return <HistoryScreen initialTab={tab} initialSection={section} initialProduct={product} />
}
