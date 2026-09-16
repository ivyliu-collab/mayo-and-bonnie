'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import {
  ArrowLeft,
  Archive,
  Barcode,
  ChevronRight,
  Edit3,
  LogOut,
  Plus,
  Search,
  X,
} from 'lucide-react'
import type { IdentityColor } from '@/lib/mock-data'
import {
  archivedPetProfiles,
  catalogProducts,
  householdSettings,
  identityColorOptions,
  inventorySections,
  petProfiles,
  type CatalogProduct,
  type CategoryConfig,
  type PetProfile,
  type SectionConfig,
} from '@/lib/settings-data'

const identityDot: Record<IdentityColor, string> = {
  lavender: 'bg-lavender',
  sage: 'bg-sage',
  apricot: 'bg-apricot',
  'slate-blue': 'bg-slate-blue',
}

const identityChip: Record<IdentityColor, string> = {
  lavender: 'bg-lavender/20 text-lavender-foreground',
  sage: 'bg-sage/20 text-sage-foreground',
  apricot: 'bg-apricot/25 text-apricot-foreground',
  'slate-blue': 'bg-slate-blue/20 text-slate-blue-foreground',
}

type GroupKey = 'household' | 'pets' | 'inventory' | 'catalog'

const groups: { key: GroupKey; label: string; hint: string }[] = [
  { key: 'household', label: '家庭', hint: '名称与账户' },
  { key: 'pets', label: '宠物', hint: '资料与档案' },
  { key: 'inventory', label: '库存分类', hint: '分区与类别' },
  { key: 'catalog', label: '商品库', hint: '历史商品档案' },
]

export function SettingsScreen() {
  const [group, setGroup] = useState<GroupKey>('household')

  return (
    <div className="min-h-dvh bg-background pb-16">
      <header className="border-b border-border/45 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-5 md:px-8 md:py-6">
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="size-4" />
            返回
          </Link>
          <h1 className="ml-1 text-lg font-medium text-foreground">设置</h1>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 pt-5 md:px-8 md:pt-7">
        <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {groups.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setGroup(item.key)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm transition-colors ${
                group === item.key
                  ? 'bg-foreground text-background'
                  : 'bg-card text-muted-foreground ring-1 ring-border/70 hover:bg-secondary'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-5">
          {group === 'household' && <HouseholdGroup />}
          {group === 'pets' && <PetsGroup />}
          {group === 'inventory' && <InventoryGroup />}
          {group === 'catalog' && <CatalogGroup />}
        </div>
      </main>
    </div>
  )
}

function SettingsCard({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[24px] bg-card p-5 ring-1 ring-border/60">
      <div className="mb-4">
        <h2 className="text-base font-medium text-foreground">{title}</h2>
        {hint ? <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p> : null}
      </div>
      {children}
    </section>
  )
}

function Row({
  label,
  value,
  onClick,
  tone,
}: {
  label: string
  value?: string
  onClick?: () => void
  tone?: 'default' | 'destructive'
}) {
  const clickable = Boolean(onClick)
  const Comp = clickable ? 'button' : 'div'
  return (
    <Comp
      type={clickable ? 'button' : undefined}
      onClick={onClick}
      className={`flex w-full items-center justify-between border-b border-border/60 py-3.5 text-left last:border-0 ${clickable ? 'transition-colors hover:opacity-70' : ''}`}
    >
      <span className={`text-sm ${tone === 'destructive' ? 'text-expired' : 'text-foreground'}`}>{label}</span>
      <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
        {value}
        {clickable ? <ChevronRight className="size-4" /> : null}
      </span>
    </Comp>
  )
}

/* ---------------- Household ---------------- */

function HouseholdGroup() {
  const [name, setName] = useState(householdSettings.name)
  const [editingName, setEditingName] = useState(false)
  const [sheet, setSheet] = useState<'password' | 'leave' | null>(null)

  return (
    <>
      <SettingsCard title="家庭" hint="所有家人共享同一个库存与宠物档案">
        <div className="flex flex-col">
          {editingName ? (
            <div className="flex items-center justify-between gap-3 border-b border-border/60 py-3.5 last:border-0">
              <span className="text-sm text-foreground">家庭名称</span>
              <div className="flex items-center gap-2">
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-36 rounded-xl bg-background px-3 py-1.5 text-right text-sm text-foreground ring-1 ring-border/70 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setEditingName(false)}
                  className="rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground"
                >
                  保存
                </button>
              </div>
            </div>
          ) : (
            <Row label="家庭名称" value={name} onClick={() => setEditingName(true)} />
          )}
          <Row label="家庭 ID" value={householdSettings.id} />
          <Row label="修改密码" onClick={() => setSheet('password')} />
          <Row label="退出家庭" onClick={() => setSheet('leave')} tone="destructive" />
        </div>
      </SettingsCard>

      {sheet && (
        <Sheet onClose={() => setSheet(null)} title={sheet === 'password' ? '修改密码' : '退出家庭'}>
          {sheet === 'password' ? (
            <div className="grid gap-3">
              <Field label="当前密码" type="password" />
              <Field label="新密码" type="password" />
              <button
                type="button"
                onClick={() => setSheet(null)}
                className="mt-2 rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground"
              >
                保存新密码
              </button>
            </div>
          ) : (
            <div>
              <p className="text-sm text-muted-foreground">
                退出后，你将无法访问 {name} 的库存与宠物档案，直到重新使用家庭 ID 和密码登录。
              </p>
              <button
                type="button"
                onClick={() => setSheet(null)}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-expired-soft py-3 text-sm font-medium text-expired"
              >
                <LogOut className="size-4" />
                确认退出家庭
              </button>
            </div>
          )}
        </Sheet>
      )}
    </>
  )
}

/* ---------------- Pets ---------------- */

function PetsGroup() {
  const [pets, setPets] = useState<PetProfile[]>(petProfiles)
  const [editing, setEditing] = useState<PetProfile | null>(null)
  const [showArchived, setShowArchived] = useState(false)

  return (
    <>
      <SettingsCard title="宠物档案" hint="每只宠物独立管理身份颜色与资料">
        <div className="flex flex-col gap-3">
          {pets.map((pet) => (
            <div key={pet.id} className="flex items-center gap-3 rounded-2xl bg-background/60 p-3">
              <img src={pet.photo} alt={`${pet.name}的照片`} className="size-14 rounded-2xl object-cover" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground">{pet.name}</p>
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] ${identityChip[pet.color]}`}>
                    <span className={`size-1.5 rounded-full ${identityDot[pet.color]}`} />
                    {pet.type}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{pet.breed}</p>
              </div>
              <button
                type="button"
                onClick={() => setEditing(pet)}
                className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary"
              >
                <Edit3 className="size-3.5" />
                编辑
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setEditing({ id: `new-${Date.now()}`, name: '', type: '猫', breed: '', sex: '母', birthday: '', color: 'apricot', photo: '/pets/orange.png' })}
            className="flex items-center gap-1.5 text-sm font-medium text-primary"
          >
            <Plus className="size-4" />
            添加宠物
          </button>
          <button
            type="button"
            onClick={() => setShowArchived((value) => !value)}
            className="flex items-center gap-1.5 text-sm text-muted-foreground"
          >
            <Archive className="size-4" />
            查看已归档宠物
          </button>
        </div>

        {showArchived && (
          <div className="mt-3 rounded-2xl bg-background/60 p-4 text-center text-sm text-muted-foreground">
            {archivedPetProfiles.length === 0 ? '暂无已归档宠物' : null}
          </div>
        )}
      </SettingsCard>

      {editing && (
        <Sheet onClose={() => setEditing(null)} title={editing.name ? '编辑宠物' : '添加宠物'}>
          <div className="grid gap-3">
            <div className="flex items-center gap-3">
              <img src={editing.photo} alt="宠物照片" className="size-16 rounded-2xl object-cover ring-1 ring-border/60" />
              <button type="button" className="rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-foreground">
                更换照片
              </button>
            </div>
            <Field label="名字" defaultValue={editing.name} />
            <div className="grid grid-cols-2 gap-3">
              <label className="text-sm text-muted-foreground">
                类型
                <select defaultValue={editing.type} className="mt-1 w-full rounded-xl bg-background p-3 text-foreground ring-1 ring-border/70">
                  <option value="猫">猫</option>
                  <option value="狗">狗</option>
                </select>
              </label>
              <label className="text-sm text-muted-foreground">
                性别
                <select defaultValue={editing.sex} className="mt-1 w-full rounded-xl bg-background p-3 text-foreground ring-1 ring-border/70">
                  <option value="母">母</option>
                  <option value="公">公</option>
                </select>
              </label>
            </div>
            <Field label="品种" defaultValue={editing.breed} />
            <Field label="生日" type="date" defaultValue={editing.birthday} />
            <div>
              <p className="text-sm text-muted-foreground">身份颜色</p>
              <div className="mt-2 flex gap-2">
                {identityColorOptions.map((color) => (
                  <span
                    key={color}
                    className={`size-8 rounded-full ${identityDot[color]} ${editing.color === color ? 'ring-2 ring-foreground ring-offset-2 ring-offset-card' : ''}`}
                  />
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setPets((current) => {
                  const exists = current.some((pet) => pet.id === editing.id)
                  return exists ? current.map((pet) => (pet.id === editing.id ? editing : pet)) : [...current, editing]
                })
                setEditing(null)
              }}
              className="mt-2 rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground"
            >
              保存
            </button>
          </div>
        </Sheet>
      )}
    </>
  )
}

/* ---------------- Inventory Setup ---------------- */

function InventoryGroup() {
  const [sections, setSections] = useState<SectionConfig[]>(inventorySections)
  const [editingCategory, setEditingCategory] = useState<{ sectionKey: string; category: CategoryConfig } | null>(null)

  return (
    <>
      <div className="flex flex-col gap-4">
        {sections.map((section) => (
          <SettingsCard key={section.key} title={`${section.name} 分区`} hint="分类决定库存卡片如何分组展示">
            <div className="flex items-center gap-2 pb-3">
              <span className={`size-2.5 rounded-full ${identityDot[section.color]}`} />
              <span className="text-xs text-muted-foreground">身份配色</span>
              <button type="button" className="ml-auto text-xs text-muted-foreground hover:text-foreground">重命名</button>
              <button type="button" className="text-xs text-muted-foreground hover:text-foreground">排序</button>
            </div>
            <div className="flex flex-col divide-y divide-border/60">
              {section.categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setEditingCategory({ sectionKey: section.key, category })}
                  className="flex items-center justify-between py-3 text-left transition-colors hover:opacity-70"
                >
                  <span className="flex items-center gap-2.5 text-sm text-foreground">
                    <span className="flex size-8 items-center justify-center rounded-xl bg-background text-base">{category.icon}</span>
                    {category.name}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    默认单位 · {category.unit}
                    <ChevronRight className="size-4" />
                  </span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() =>
                setEditingCategory({
                  sectionKey: section.key,
                  category: { id: `new-${Date.now()}`, name: '', icon: '✨', unit: '件', expiryRequired: true, supportsProgress: false },
                })
              }
              className="mt-3 flex items-center gap-1.5 text-sm font-medium text-primary"
            >
              <Plus className="size-4" />
              添加分类
            </button>
          </SettingsCard>
        ))}

        <button
          type="button"
          className="flex items-center justify-center gap-1.5 rounded-[24px] border border-dashed border-border py-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/60"
        >
          <Plus className="size-4" />
          添加分区
        </button>
      </div>

      {editingCategory && (
        <Sheet onClose={() => setEditingCategory(null)} title={editingCategory.category.name ? '编辑分类' : '添加分类'}>
          <div className="grid gap-3">
            <Field label="分类名称" defaultValue={editingCategory.category.name} />
            <div className="grid grid-cols-2 gap-3">
              <Field label="图标" defaultValue={editingCategory.category.icon} />
              <Field label="默认单位" defaultValue={editingCategory.category.unit} />
            </div>
            <ToggleRow label="需要记录效期" defaultChecked={editingCategory.category.expiryRequired} />
            <ToggleRow label="支持开袋进度" defaultChecked={editingCategory.category.supportsProgress} />
            <div className="mt-1 flex gap-3">
              <button
                type="button"
                onClick={() => setEditingCategory(null)}
                className="flex-1 rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground"
              >
                保存
              </button>
              <button
                type="button"
                onClick={() => setEditingCategory(null)}
                className="flex items-center gap-1.5 rounded-full bg-background px-4 py-3 text-sm text-muted-foreground ring-1 ring-border/70"
              >
                <Archive className="size-4" />
                归档
              </button>
            </div>
          </div>
        </Sheet>
      )}
    </>
  )
}

/* ---------------- Product Catalog ---------------- */

function CatalogGroup() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<CatalogProduct | null>(null)

  const filtered = useMemo(
    () => catalogProducts.filter((product) => `${product.name}${product.brand}`.toLowerCase().includes(query.toLowerCase())),
    [query],
  )

  return (
    <>
      <SettingsCard title="商品库" hint="维护类工具 · 包含所有历史商品档案，含零库存商品">
        <label className="flex h-11 items-center gap-2 rounded-2xl bg-background px-3.5 ring-1 ring-border/70">
          <Search className="size-4 text-muted-foreground" />
          <span className="sr-only">搜索商品</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索商品或品牌"
            className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/70"
          />
        </label>

        <div className="mt-3 flex flex-col divide-y divide-border/60">
          {filtered.map((product) => (
            <button
              key={product.id}
              type="button"
              onClick={() => setSelected(product)}
              className="flex items-center gap-3 py-3 text-left transition-colors hover:opacity-70"
            >
              <img src={product.image} alt={`${product.name} 包装`} className="size-12 rounded-xl bg-secondary object-cover" />
              <div className="min-w-0 flex-1">
                <p className="text-sm text-foreground">{product.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {product.brand} · {product.specification} · {product.category}
                </p>
              </div>
              <span className={`text-xs ${product.stock === 0 ? 'text-muted-foreground/70' : 'text-muted-foreground'}`}>
                {product.stock === 0 ? '零库存' : `${product.stock} 件`}
              </span>
            </button>
          ))}
          {filtered.length === 0 && <p className="py-8 text-center text-sm text-muted-foreground">没有找到匹配的商品</p>}
        </div>
      </SettingsCard>

      {selected && (
        <Sheet onClose={() => setSelected(null)} title={selected.name}>
          <div className="flex items-center gap-3">
            <img src={selected.image} alt={`${selected.name} 包装`} className="size-16 rounded-2xl bg-secondary object-cover" />
            <div>
              <p className="text-sm text-foreground">{selected.brand} · {selected.specification}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{selected.category}</p>
            </div>
          </div>
          <div className="mt-5 flex flex-col gap-2">
            <button type="button" className="flex items-center gap-2 rounded-2xl bg-background px-4 py-3 text-sm text-foreground ring-1 ring-border/70">
              <Edit3 className="size-4 text-muted-foreground" />
              编辑商品
            </button>
            <button type="button" className="flex items-center gap-2 rounded-2xl bg-background px-4 py-3 text-sm text-foreground ring-1 ring-border/70">
              <Barcode className="size-4 text-muted-foreground" />
              管理条码
            </button>
            <button type="button" className="flex items-center gap-2 rounded-2xl bg-expired-soft px-4 py-3 text-sm text-expired">
              <Archive className="size-4" />
              归档
            </button>
          </div>
        </Sheet>
      )}
    </>
  )
}

/* ---------------- Shared bits ---------------- */

function Sheet({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/20 p-3 backdrop-blur-[2px] md:items-center">
      <div className="max-h-[85vh] w-full max-w-md overflow-y-auto rounded-[28px] bg-card p-5 shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-foreground">{title}</h2>
          <button type="button" aria-label="关闭" onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="size-5" />
          </button>
        </div>
        <div className="mt-5">{children}</div>
      </div>
    </div>
  )
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="text-sm text-muted-foreground">
      {label}
      <input {...props} className="mt-1 w-full rounded-xl bg-background p-3 text-sm text-foreground ring-1 ring-border/70 outline-none" />
    </label>
  )
}

function ToggleRow({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(Boolean(defaultChecked))
  return (
    <button
      type="button"
      onClick={() => setChecked((value) => !value)}
      className="flex items-center justify-between rounded-2xl bg-background px-4 py-3 ring-1 ring-border/70"
    >
      <span className="text-sm text-foreground">{label}</span>
      <span className={`flex h-6 w-10 items-center rounded-full p-0.5 transition-colors ${checked ? 'bg-primary' : 'bg-secondary'}`}>
        <span className={`size-5 rounded-full bg-card shadow-sm transition-transform ${checked ? 'translate-x-4' : 'translate-x-0'}`} />
      </span>
    </button>
  )
}
