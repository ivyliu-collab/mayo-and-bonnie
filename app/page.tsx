import { TopBar } from '@/components/home/top-bar'
import { Hero } from '@/components/home/hero'
import { StockLevelCard } from '@/components/home/stock-level-card'
import { ThisMonthCard } from '@/components/home/this-month-card'
import { ExpiryCard } from '@/components/home/expiry-card'
import { MyPets } from '@/components/home/my-pets'
import { BottomNav } from '@/components/home/bottom-nav'

export default function HomePage() {
  return (
    <div className="min-h-dvh bg-background">
      <TopBar />

      <main className="mx-auto max-w-6xl px-4 pb-28 pt-4 md:px-8 md:pb-12 md:pt-6">
        <Hero />

        {/* Inventory Dashboard — primary content */}
        <div className="mt-5 md:mt-6">
          <div className="mb-3 flex items-baseline gap-2 px-1">
            <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              Inventory
            </h2>
            <span className="text-xs text-muted-foreground">库存概览</span>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <StockLevelCard />
            </div>
            <div className="flex flex-col gap-4">
              <ThisMonthCard />
              <ExpiryCard />
            </div>
          </div>
        </div>

        {/* My Pets */}
        <div className="mt-7 md:mt-8">
          <MyPets />
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
