import { Scale, Bath, Scissors, Pill, Bug } from 'lucide-react'
import {
  pets,
  type Pet,
  type PetCareStatus,
  type IdentityColor,
} from '@/lib/mock-data'

const identityStyles: Record<IdentityColor, { chip: string; dot: string }> = {
  lavender: { chip: 'bg-lavender/20 text-lavender-foreground', dot: 'bg-lavender' },
  sage: { chip: 'bg-sage/20 text-sage-foreground', dot: 'bg-sage' },
  apricot: { chip: 'bg-apricot/25 text-apricot-foreground', dot: 'bg-apricot' },
  'slate-blue': {
    chip: 'bg-slate-blue/20 text-slate-blue-foreground',
    dot: 'bg-slate-blue',
  },
}

const careStatusColor: Record<PetCareStatus, string> = {
  ok: 'text-safe',
  soon: 'text-urgent',
  due: 'text-expired',
}

function PetCard({ pet }: { pet: Pet }) {
  const identity = identityStyles[pet.color]

  return (
    <button
      type="button"
      className="group w-[264px] shrink-0 snap-start overflow-hidden rounded-[22px] bg-card text-left shadow-[0_12px_30px_-22px_rgba(80,60,40,0.45)] transition-transform hover:-translate-y-1"
    >
      <div className="relative">
        <img
          src={pet.photo || '/placeholder.svg'}
          alt={`${pet.name}的照片`}
          className="h-40 w-full object-cover"
        />
        <span
          className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium backdrop-blur-sm ${identity.chip}`}
        >
          <span className={`size-2 rounded-full ${identity.dot}`} />
          {pet.type}
        </span>
      </div>

      <div className="p-4">
        <div className="flex items-baseline justify-between">
          <h3 className="text-lg font-medium text-foreground">{pet.name}</h3>
          <span className="text-xs text-muted-foreground">{pet.age}</span>
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">{pet.breed}</p>

        <div className="mt-3 flex items-center gap-2 rounded-2xl bg-background/60 px-3 py-2.5">
          <Scale className="size-4 text-muted-foreground" strokeWidth={1.75} />
          <span className="font-mono text-sm font-medium tabular-nums text-foreground">
            {pet.weight.value}
          </span>
          <span className="text-xs text-muted-foreground">kg</span>
          <span className="ml-auto text-[11px] text-muted-foreground">
            {pet.weight.agoDays} 天前
          </span>
        </div>

        <div className="mt-2.5 flex flex-col gap-1.5 text-xs">
          <div className="flex items-center gap-2">
            <Pill className="size-3.5 text-muted-foreground" strokeWidth={1.75} />
            <span className="text-muted-foreground">内驱</span>
            <span
              className={`ml-auto font-medium ${careStatusColor[pet.deworming.internal.status]}`}
            >
              {pet.deworming.internal.label}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Bug className="size-3.5 text-muted-foreground" strokeWidth={1.75} />
            <span className="text-muted-foreground">外驱</span>
            <span
              className={`ml-auto font-medium ${careStatusColor[pet.deworming.external.status]}`}
            >
              {pet.deworming.external.label}
            </span>
          </div>
        </div>

        {pet.grooming ? (
          <div className="mt-2.5 flex items-center gap-3 border-t border-border pt-2.5 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Bath className="size-3.5" strokeWidth={1.75} />
              洗澡 {pet.grooming.bath}
            </span>
            <span className="flex items-center gap-1.5">
              <Scissors className="size-3.5" strokeWidth={1.75} />
              美容 {pet.grooming.trim}
            </span>
          </div>
        ) : null}
      </div>
    </button>
  )
}

export function MyPets() {
  return (
    <section>
      <header className="mb-3 flex items-baseline justify-between px-1">
        <h2 className="text-base font-medium text-foreground">My Pets</h2>
        <span className="text-xs text-muted-foreground">{pets.length} 只毛孩</span>
      </header>

      <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3.5 overflow-x-auto px-4 pb-1 md:mx-0 md:px-0 md:flex-wrap">
        {pets.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
    </section>
  )
}
