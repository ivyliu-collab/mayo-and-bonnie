import Link from 'next/link'
import { ArrowLeft, PackagePlus } from 'lucide-react'

export default function StockInPage() {
  return (
    <main className="min-h-dvh bg-background px-4 pb-24 pt-6 md:px-8 md:pb-10 md:pt-10">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> 返回 Home
        </Link>
        <section className="mt-8 rounded-[28px] bg-card p-8 text-center shadow-[0_18px_38px_-26px_rgba(80,60,40,0.42)] ring-1 ring-border/60 md:p-14">
          <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-apricot/25 text-apricot-foreground"><PackagePlus className="size-7" /></span>
          <p className="mt-6 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Stock-in</p>
          <h1 className="mt-2 text-2xl font-medium tracking-tight text-foreground">入库</h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">入库流程将在这里展开。当前先保留为空白占位，方便继续完善多屏原型。</p>
          <div className="mt-7 flex justify-center gap-3">
            <Link href="/inventory" className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background">查看库存</Link>
            <Link href="/" className="rounded-full bg-background px-4 py-2 text-sm text-foreground ring-1 ring-border/70">回到 Home</Link>
          </div>
        </section>
      </div>
    </main>
  )
}
