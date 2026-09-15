'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowLeft, Camera, Check, ChevronRight, PackagePlus, Pencil, Plus, Search, X } from 'lucide-react'

type Step = 'scan' | 'results' | 'confirm' | 'manual' | 'success'
type ResultMode = 'household' | 'external' | 'none'
type ExpiryRow = { date: string; quantity: string }

const householdProducts = [
  { name: 'Ziwi Peak Air-Dried', meta: '猫粮 · 1kg', quantity: '3', unit: '包', expiry: '2027/04/16' },
  { name: 'Ziwi Peak Wet Food', meta: '罐头 · 85g × 12', quantity: '2', unit: '盒', expiry: '2027/02/08' },
]

export default function StockInPage() {
  const [step, setStep] = useState<Step>('scan')
  const [resultMode, setResultMode] = useState<ResultMode>('household')
  const [selected, setSelected] = useState(householdProducts[0])
  const [productName, setProductName] = useState('')
  const [category, setCategory] = useState('猫粮')
  const [quantity, setQuantity] = useState('1')
  const [unit, setUnit] = useState('包')
  const [expiryRows, setExpiryRows] = useState<ExpiryRow[]>([{ date: '', quantity: '1' }])
  const [message, setMessage] = useState('')

  useEffect(() => {
    const mode = new URLSearchParams(window.location.search).get('mode')
    if (mode === 'manual') setStep('manual')
    if (mode === 'scan') openResults('household')
  }, [])

  const isManual = step === 'manual'
  const currentName = isManual ? productName : selected.name
  const currentMeta = isManual ? `${category} · ${unit}` : selected.meta

  function openResults(mode: ResultMode) {
    setResultMode(mode)
    setStep('results')
  }

  function chooseProduct(item: typeof householdProducts[number]) {
    setSelected(item)
    setQuantity(item.quantity)
    setUnit(item.unit)
    setExpiryRows([{ date: item.expiry, quantity: item.quantity }])
    setStep('confirm')
  }

  function updateExpiry(index: number, key: keyof ExpiryRow, value: string) {
    setExpiryRows((rows) => rows.map((row, rowIndex) => rowIndex === index ? { ...row, [key]: value } : row))
  }

  function submit() {
    if (!currentName.trim() || Number(quantity) <= 0 || expiryRows.some((row) => !row.date || Number(row.quantity) <= 0)) {
      setMessage('请填写商品名称、正数量和每个批次的效期')
      return
    }
    setMessage('')
    setStep('success')
  }

  if (step === 'success') {
    return <main className="min-h-dvh bg-background px-4 pb-24 pt-6 md:px-8 md:pt-10"><div className="mx-auto max-w-xl"><Link href="/inventory" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" />返回库存</Link><section className="mt-8 rounded-[28px] bg-card p-8 text-center shadow-[0_18px_38px_-26px_rgba(80,60,40,0.42)] ring-1 ring-border/60 md:p-14"><span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-sage/20 text-sage-foreground"><Check className="size-7" /></span><p className="mt-6 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Stock-in complete</p><h1 className="mt-2 text-2xl font-medium text-foreground">已添加到库存</h1><p className="mt-3 text-sm text-muted-foreground">{currentName} · {quantity}{unit}</p><div className="mt-7 flex justify-center gap-3"><Link href="/inventory" className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background">查看库存</Link><button type="button" onClick={() => { setStep('scan'); setProductName(''); setExpiryRows([{ date: '', quantity: '1' }]) }} className="rounded-full bg-background px-4 py-2 text-sm text-foreground ring-1 ring-border/70">继续入库</button></div></section></div></main>
  }

  return <main className="min-h-dvh bg-background px-4 pb-24 pt-6 md:px-8 md:pt-10"><div className="mx-auto max-w-3xl"><div className="flex items-center justify-between"><Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" />返回 Home</Link><span className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Stock-in</span></div><header className="mt-8"><p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">入库</p><h1 className="mt-2 text-3xl font-medium tracking-tight text-foreground">把新物品放进家里</h1><p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">扫一扫包装，或手动添加一件库存。所有信息都可以在确认前修改。</p></header>
    {step === 'scan' && <section className="mt-8 space-y-4"><button type="button" onClick={() => openResults('household')} className="flex w-full items-center gap-4 rounded-[24px] bg-card p-5 text-left shadow-[0_18px_38px_-26px_rgba(80,60,40,0.42)] ring-1 ring-border/60 transition-transform hover:-translate-y-0.5"><span className="flex size-12 items-center justify-center rounded-2xl bg-lavender/20 text-lavender-foreground"><Camera className="size-6" /></span><span><span className="block font-medium text-foreground">扫描商品条码</span><span className="mt-1 block text-sm text-muted-foreground">从包装读取商品和效期信息</span></span><ChevronRight className="ml-auto size-4 text-muted-foreground" /></button><button type="button" onClick={() => setStep('manual')} className="flex w-full items-center gap-4 rounded-[24px] bg-card p-5 text-left ring-1 ring-border/60"><span className="flex size-12 items-center justify-center rounded-2xl bg-apricot/20 text-apricot-foreground"><Pencil className="size-5" /></span><span><span className="block font-medium text-foreground">手动创建商品</span><span className="mt-1 block text-sm text-muted-foreground">适合没有条码或需要自定义的物品</span></span><ChevronRight className="ml-auto size-4 text-muted-foreground" /></button><div className="flex items-center gap-3 py-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />或<span className="h-px flex-1 bg-border" /></div><button type="button" onClick={() => openResults('none')} className="flex w-full items-center justify-center gap-2 rounded-full bg-background py-3 text-sm text-foreground ring-1 ring-border/70"><Search className="size-4" />输入条码 / 商品名</button></section>}
    {step === 'results' && <section className="mt-8 rounded-[26px] bg-card p-5 ring-1 ring-border/60 md:p-7"><div className="flex items-center justify-between"><div><p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">识别结果</p><h2 className="mt-2 text-xl font-medium text-foreground">{resultMode === 'none' ? '没有找到完全匹配' : resultMode === 'external' ? '找到一个外部商品' : '家庭库存中找到'}</h2></div><button type="button" onClick={() => setStep('scan')} aria-label="关闭" className="rounded-full p-2 text-muted-foreground hover:bg-secondary"><X className="size-4" /></button></div>{resultMode === 'none' ? <div className="mt-6 rounded-2xl bg-secondary/55 p-4"><p className="text-sm text-foreground">可以继续手动创建，不会丢失刚才的识别输入。</p><button type="button" onClick={() => setStep('manual')} className="mt-4 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background">手动创建</button></div> : <div className="mt-6 space-y-3">{(resultMode === 'external' ? [{ name: 'Orijen Original', meta: '狗粮 · 2kg', quantity: '1', unit: '袋', expiry: '' }] : householdProducts).map((item) => <button type="button" key={item.name} onClick={() => chooseProduct(item)} className="flex w-full items-center gap-3 rounded-2xl bg-background/70 p-4 text-left ring-1 ring-border/60"><span className="flex size-10 items-center justify-center rounded-xl bg-sage/15 text-sage-foreground"><PackagePlus className="size-4" /></span><span className="min-w-0"><span className="block font-medium text-foreground">{item.name}</span><span className="mt-1 block text-xs text-muted-foreground">{item.meta}</span></span><ChevronRight className="ml-auto size-4 text-muted-foreground" /></button>)}</div>}</section>}
    {(step === 'confirm' || step === 'manual') && <section className="mt-8 rounded-[26px] bg-card p-5 ring-1 ring-border/60 md:p-7"><div className="flex items-start justify-between"><div><p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{isManual ? '手动创建' : '确认入库'}</p><h2 className="mt-2 text-xl font-medium text-foreground">{isManual ? '建立一个新商品' : currentName}</h2><p className="mt-1 text-sm text-muted-foreground">{isManual ? '填写基础信息和批次效期' : currentMeta}</p></div><PackagePlus className="size-5 text-apricot-foreground" /></div><div className="mt-6 grid gap-4 md:grid-cols-2"><label className="text-sm text-foreground">商品名称<input value={currentName} onChange={(event) => setProductName(event.target.value)} disabled={!isManual} placeholder="例如：Ziwi Peak Air-Dried" className="mt-2 w-full rounded-2xl bg-background px-4 py-3 outline-none ring-1 ring-border/70 focus:ring-primary" /></label>{isManual && <label className="text-sm text-foreground">分类<select value={category} onChange={(event) => setCategory(event.target.value)} className="mt-2 w-full rounded-2xl bg-background px-4 py-3 outline-none ring-1 ring-border/70"><option>猫粮</option><option>狗粮</option><option>罐头</option><option>零食</option><option>其他</option></select></label>}<label className="text-sm text-foreground">数量<input type="number" min="1" value={quantity} onChange={(event) => setQuantity(event.target.value)} className="mt-2 w-full rounded-2xl bg-background px-4 py-3 outline-none ring-1 ring-border/70 focus:ring-primary" /></label><label className="text-sm text-foreground">单位<input value={unit} onChange={(event) => setUnit(event.target.value)} className="mt-2 w-full rounded-2xl bg-background px-4 py-3 outline-none ring-1 ring-border/70 focus:ring-primary" /></label></div><div className="mt-6"><div className="flex items-center justify-between"><div><h3 className="text-sm font-medium text-foreground">效期批次</h3><p className="mt-1 text-xs text-muted-foreground">每一行代表一组相同效期的库存</p></div><button type="button" onClick={() => setExpiryRows((rows) => [...rows, { date: '', quantity: '1' }])} className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-foreground"><Plus className="size-3.5" />添加批次</button></div><div className="mt-3 space-y-2">{expiryRows.map((row, index) => <div className="grid grid-cols-[1fr_88px_auto] gap-2" key={index}><input type="date" value={row.date} onChange={(event) => updateExpiry(index, 'date', event.target.value)} className="min-w-0 rounded-xl bg-background px-3 py-2.5 text-sm outline-none ring-1 ring-border/70" /><input type="number" min="1" value={row.quantity} onChange={(event) => updateExpiry(index, 'quantity', event.target.value)} className="rounded-xl bg-background px-3 py-2.5 text-sm outline-none ring-1 ring-border/70" /><button type="button" aria-label="删除批次" disabled={expiryRows.length === 1} onClick={() => setExpiryRows((rows) => rows.filter((_, rowIndex) => rowIndex !== index))} className="rounded-xl px-2 text-muted-foreground disabled:opacity-30"><X className="size-4" /></button></div>)}</div></div>{message && <p className="mt-4 text-sm text-expired">{message}</p>}<div className="mt-7 flex justify-end gap-3"><button type="button" onClick={() => setStep('scan')} className="rounded-full bg-background px-4 py-2.5 text-sm text-foreground ring-1 ring-border/70">取消</button><button type="button" onClick={submit} className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground">确认入库</button></div></section>}
  </div></main>
}
