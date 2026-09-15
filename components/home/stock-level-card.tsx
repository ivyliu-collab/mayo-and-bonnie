import { ChevronRight, Boxes } from 'lucide-react'
import { stockSections, type StockCategory } from '@/lib/mock-data'

function CategoryRow({ category }: { category: StockCategory }) {
  return (
    <button
      type="button"
      className="group flex w-full items-center justify-between gap-3 rounded-2xl bg-background/60 px-3.5 py-3 text-left transition-colors hover:bg-accent/60"
    >
      <span className="text-sm font-medium text-foreground">
        {category.name}
      </span>
      <span className="flex items-center gap-1.5">
        <span className="font-mono text-base font-medium tabular-nums text-foreground">
          {category.quantity}
        </span>
        <span className="text-xs text-muted-foreground">{category.unit}</span>
        {category.opened ? (
          <span className="ml-1 rounded-full bg-apricot-soft px-2 py-0.5 text-[11px] font-medium text-apricot-foreground">
            {category.opened} 已开
          </span>
        ) : null}
        <ChevronRight className="size-4 text-muted-foreground/50 transition-transform group-hover:translate-x-0.5" />
      </span>
    </button>
  )
}

export function StockLevelCard() {
  return (
    <section className="rounded-[24px] bg-card p-5 shadow-[0_12px_30px_-22px_rgba(80,60,40,0.45)] sm:p-6">
      <header className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-secondary text-foreground">
            <Boxes className="size-5" strokeWidth={1.75} />
          </span>
          <div>
            <h2 className="text-base font-medium leading-none text-foreground">
              库存水位
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Stock Level · 按分区分类
            </p>
          </div>
        </div>
      </header>

      <div className="grid gap-5 sm:grid-cols-2">
        {stockSections.map((section) => (
          <div key={section.key}>
            <div className="mb-2 flex items-center gap-2 px-1">
              <span className="text-sm font-medium text-foreground">
                {section.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {section.categories.length} 类
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              {section.categories.map((category) => (
                <CategoryRow key={category.name} category={category} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
