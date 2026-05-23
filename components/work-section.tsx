'use client'

import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { SectionHeader } from './section-header'
import { motion } from 'framer-motion'

type Photo = {
  id: number
  title: string
  cat: string
  img: string
  aspect: 'portrait' | 'landscape' | 'square'
}

const photos: Photo[] = [
  {
    id: 1,
    title: 'Nebula',
    cat: 'Art',
    img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80',
    aspect: 'portrait',
  },
  {
    id: 2,
    title: 'Decay',
    cat: 'Photo',
    img: 'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?auto=format&fit=crop&w=900&q=80',
    aspect: 'landscape',
  },
  {
    id: 3,
    title: 'Oceanic',
    cat: 'Nature',
    img: 'https://images.unsplash.com/photo-1468581264429-2548ef9eb732?auto=format&fit=crop&w=900&q=80',
    aspect: 'square',
  },
  {
    id: 4,
    title: 'Neon',
    cat: 'Tech',
    img: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=900&q=80',
    aspect: 'portrait',
  },
  {
    id: 5,
    title: 'Desert',
    cat: 'Travel',
    img: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&w=900&q=80',
    aspect: 'landscape',
  },
]

const aspectClass: Record<Photo['aspect'], string> = {
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  square: 'aspect-square',
}

function PhotoCard({ photo, index }: { photo: Photo; index: number }) {
  return (
    <motion.figure
      className="group relative overflow-hidden border border-border bg-muted/20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={`relative ${aspectClass[photo.aspect]} overflow-hidden`}>
        <img
          src={photo.img}
          alt={photo.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105 grayscale-[20%] group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <figcaption className="absolute top-3 left-3 right-3 flex items-start justify-between pointer-events-none">
        <span className="text-[10px] uppercase tracking-[0.25em] text-background mix-blend-difference font-[family-name:var(--font-space-grotesk)]">
          fig. {String(index + 1).padStart(2, '0')} — {photo.cat}
        </span>
        <ArrowUpRight className="w-4 h-4 text-background mix-blend-difference opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </figcaption>

      <figcaption className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
        <h3 className="text-xl sm:text-2xl font-bold text-white leading-none tracking-tight">
          {photo.title}
        </h3>
      </figcaption>
    </motion.figure>
  )
}

export function WorkSection() {
  const { language } = useLanguage()

  return (
    <section id="work" className="relative overflow-hidden pt-16 md:pt-32 pb-16 md:pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader
          index="01"
          kicker={language === 'kh' ? 'ការងារ' : 'Selected Work'}
          title={language === 'kh' ? 'ស្នាដៃរបស់ខ្ញុំ' : 'Photographs I have taken.'}
        />

        {/* Mobile: simple vertical stack — no carousel */}
        <div className="md:hidden flex flex-col gap-5">
          {photos.map((photo, i) => (
            <PhotoCard key={photo.id} photo={photo} index={i} />
          ))}
        </div>

        {/* Desktop: editorial asymmetric grid */}
        <div className="hidden md:grid grid-cols-12 gap-5 lg:gap-6">
          <div className="col-span-5"><PhotoCard photo={photos[0]} index={0} /></div>
          <div className="col-span-7 flex flex-col gap-5 lg:gap-6">
            <PhotoCard photo={photos[1]} index={1} />
            <div className="grid grid-cols-2 gap-5 lg:gap-6">
              <PhotoCard photo={photos[2]} index={2} />
              <PhotoCard photo={photos[3]} index={3} />
            </div>
          </div>
          <div className="col-span-12"><PhotoCard photo={photos[4]} index={4} /></div>
        </div>
      </div>
    </section>
  )
}
