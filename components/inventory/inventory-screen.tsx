'use client'

import { useMemo, useState } from 'react'
import { ArrowDownUp, Boxes, ChevronRight, Clock3, Download, Filter, History, MoreHorizontal, PackagePlus, Search, SlidersHorizontal } from 'lucide-react'
import { inventoryCategories, inventoryProducts, type InventoryProduct } from '@/lib/inventory-data'

const accents = {
  lavender: 'bg-lavender/15 text-lavender-foreground',
  sage: 'bg-sage/15 text-sage-foreground',
  apricot: 'bg-apricot/20 text-apricot-foreground',
  'slate-blue': 'bg-slate-blue/15 text-slate-blue-foreground',
}

export function InventoryScreen() {
  const [category, setCategory] = useState('全部')
  const [query, setQuery] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [sortOpen, setSortOpen] = useState(false)

  const products = useMemo(() => inventoryProducts.filter((product) => {
    const matchesCategory = category === '全部' || product.category === category
    const matchesQuery = `${product.name}${product.category}`.toLowerCase().includes(query.toLowerCase())
    return matchesCategory && matchesQuery
  }), [category, query])

  return (
    <div className="min-h-dvh bg-background pb-24 md:pb-8">
      <header className="border-b border-border/45 bg-background/75 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 md:px-8 md:py-6">
          <div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Boxes className="size-4" />
              <span className="text-xs font-medium uppercase tracking-[0.16em]">Inventory</span>
            </div>
            <h1 className="mt-2 text-2xl font-medium tracking-tight text-foreground md:text-3xl">库存清单</h1>
            <p className="mt-1 text-sm text-muted-foreground">家里的每一份照料，都有迹可循</p>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary sm:flex"><History className="size-4" />历史记录</button>
            <button type="button" className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary sm:flex"><Download className="size-4" />导出</button>
            <button type="button" aria-label="更多操作" className="flex size-9 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary sm:hidden"><MoreHorizontal className="size-5" /></button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pt-5 md:px-8 md:pt-7">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {inventoryCategories.map((item) => (
            <button key={item} type="button" onClick={() => setCategory(item)} className={`shrink-0 rounded-full px-4 py-2 text-sm transition-colors ${category === item ? 'bg-foreground text-background' : 'bg-card text-muted-foreground ring-1 ring-border/70 hover:bg-secondary'}`}>{item}</button>
          ))}
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex h-11 flex-1 items-center gap-2 rounded-2xl bg-card px-3.5 ring-1 ring-border/70 sm:max-w-md">
            <Search className="size-4 text-muted-foreground" />
            <span className="sr-only">搜索库存</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索商品名称或类别" className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/70" />
          </label>
          <div className="relative flex gap-2">
            <button type="button" onClick={() => setFilterOpen((open) => !open)} className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-card px-4 py-3 text-sm text-foreground ring-1 ring-border/70 sm:flex-none"><Filter className="size-4 text-muted-foreground" />筛选</button>
            <button type="button" onClick={() => setSortOpen((open) => !open)} className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-card px-4 py-3 text-sm text-foreground ring-1 ring-border/70 sm:flex-none"><ArrowDownUp className="size-4 text-muted-foreground" />排序</button>
            {(filterOpen || sortOpen) && <div className="absolute right-0 top-14 z-10 rounded-2xl bg-card p-3 text-sm text-muted-foreground shadow-[0_16px_34px_-18px_rgba(80,60,40,0.5)] ring-1 ring-border"><p>{filterOpen ? '显示：全部库存' : '排序：最近更新'}</p></div>}
          </div>
        </div>

        <div className="mt-7 flex items-baseline justify-between">
          <div><h2 className="text-base font-medium text-foreground">全部库存</h2><p className="mt-1 text-xs text-muted-foreground">{products.length} 个商品 · 按宠物家庭整理</p></div>
          <button type="button" className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground">管理分类<ChevronRight className="size-3.5" /></button>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
          {products.length === 0 && <div className="rounded-3xl bg-card px-5 py-12 text-center text-sm text-muted-foreground ring-1 ring-border/60">没有找到匹配的库存</div>}
        </div>
      </main>
      <div className="fixed bottom-5 right-5 z-20 md:bottom-7 md:right-8"><button type="button" className="flex items-center gap-2 rounded-full bg-apricot/90 px-4 py-3 text-sm font-medium text-apricot-foreground shadow-[0_12px_25px_-14px_rgba(80,60,40,0.65)]"><PackagePlus className="size-4" />添加库存</button></div>
    </div>
  )
}

function ProductCard({ product }: { product: InventoryProduct }) {
  return <article className="group flex gap-4 rounded-3xl bg-card p-3.5 ring-1 ring-border/60 transition-transform hover:-translate-y-0.5 md:p-4">
    <div className={`flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl ${accents[product.accent]} sm:size-28`}><img src={product.image} alt="" className="size-full object-cover mix-blend-multiply" /></div>
    <div className="min-w-0 flex-1 py-0.5">
      <div className="flex items-start justify-between gap-2"><div><p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{product.section} · {product.category}</p><h3 className="mt-1 truncate text-sm font-medium text-foreground">{product.name}</h3></div><button type="button" aria-label={`${product.name} 更多操作`} className="text-muted-foreground/60 hover:text-foreground"><MoreHorizontal className="size-4" /></button></div>
      <div className="mt-3 flex items-end justify-between gap-2"><div><span className="font-mono text-2xl font-semibold leading-none text-foreground">{product.quantity}</span><span className="ml-1 text-xs text-muted-foreground">{product.unit}</span></div><span className={`rounded-full px-2 py-1 text-[11px] font-medium ${accents[product.accent]}`}>{product.statusLabel}</span></div>
      {product.progress ? <div className="mt-3"><div className="mb-1 flex justify-between text-[11px] text-muted-foreground"><span>已开封余量</span><span>{product.progress}%</span></div><div className="h-1.5 overflow-hidden rounded-full bg-secondary"><div className="h-full rounded-full bg-primary" style={{ width: `${product.progress}%` }} /></div></div> : <p className="mt-3 flex items-center gap-1 text-xs text-muted-foreground"><Clock3 className="size-3.5" />{product.expiry ? `效期 ${product.expiry}` : '无需记录效期'}</p>}
    </div>
  </article>
}
