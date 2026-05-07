import {
  Bell,
  BookMarked,
  BookOpen,
  Calendar,
  Clock,
  FileText,
  Flame,
  Gift,
  Home,
  Megaphone,
  MessageCircle,
  Play,
  Settings,
  Star,
  Target,
  Trophy,
  User,
  Users,
} from 'lucide-react'

import { BackgroundMusic } from './BackgroundMusic'
import { MascotCat } from './MascotCat'
import { LogoMark } from './LogoMark'

function RingProgress({
  percent,
  size = 112,
  stroke = 7,
}: {
  percent: number
  size?: number
  stroke?: number
}) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c - (Math.min(100, Math.max(0, percent)) / 100) * c
  const half = size / 2
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="rotate-[-90deg]">
        <circle
          cx={half}
          cy={half}
          r={r}
          fill="none"
          className="stroke-white/25"
          strokeWidth={stroke}
        />
        <circle
          cx={half}
          cy={half}
          r={r}
          fill="none"
          stroke="white"
          strokeWidth={stroke}
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-white">
        <span className="text-xl font-bold tracking-tight">%{percent}</span>
      </div>
    </div>
  )
}

const navItems = [
  { label: 'Panel', icon: Home, active: true },
  { label: 'Görevler', icon: Target },
  { label: 'Mesajlar', icon: MessageCircle },
  { label: 'Çalışma', icon: BookOpen },
  { label: 'Takvim', icon: Calendar },
  { label: 'Ödevlerim', icon: BookMarked },
  { label: 'Denemelerim', icon: FileText },
  { label: 'Sosyal', icon: Users },
  { label: 'Duyurular', icon: Megaphone },
  { label: 'Profil', icon: User },
  { label: 'Ayarlar', icon: Settings },
]

/** Decorative heights for the last-14-days chart (placeholder). */
const historyBars = [12, 28, 8, 40, 22, 35, 18, 45, 30, 25, 38, 15, 32, 20]

function App() {
  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans text-slate-800 antialiased">
      <BackgroundMusic />
      {/* Sidebar */}
      <aside className="sticky top-0 flex h-screen w-[228px] shrink-0 flex-col border-r border-slate-200/80 bg-white px-4 py-6 shadow-[2px_0_24px_-12px_rgba(15,23,42,0.08)]">
        <div className="mb-8 flex items-center gap-2 px-2">
          <LogoMark className="h-10 w-10 shrink-0" />
          <span className="text-xl font-extrabold tracking-tight text-[#1e3a8a]">
            Çalışmıyo
          </span>
        </div>
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
          {navItems.map(({ label, icon: Icon, active }) => (
            <a
              key={label}
              href="#"
              className={
                active
                  ? 'flex items-center gap-3 rounded-xl bg-[#eff6ff] px-3 py-2.5 text-[15px] font-semibold text-[#2563eb]'
                  : 'flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900'
              }
            >
              <Icon
                className="h-[22px] w-[22px] shrink-0 stroke-[1.75]"
                aria-hidden
              />
              {label}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="min-w-0 flex-1 px-6 py-8 lg:px-10">
        {/* Header */}
        <header className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex min-w-0 flex-1 flex-wrap items-start gap-5">
            <MascotCat className="h-[156px] w-auto shrink-0 object-contain object-bottom pointer-events-none select-none drop-shadow-[0_10px_24px_rgba(30,64,175,0.15)]" />
            <div className="min-w-0 pt-1">
              <h1 className="text-[1.65rem] font-bold tracking-tight text-slate-900 lg:text-[1.85rem]">
                Merhaba, Ahmet! 👋
              </h1>
              <p className="mt-1 text-[15px] text-slate-500">
                Bugünün hedeflerine ulaşmaya hazır mısın?
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <div className="flex min-w-[200px] items-center gap-3 rounded-xl border border-slate-200/80 bg-white px-4 py-3 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.07)]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                    <Star className="h-5 w-5 fill-amber-400 text-amber-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold uppercase tracking-wide text-slate-400">
                        LEVEL 2
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        250 / 500
                      </span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-[#2563eb]"
                        style={{ width: '50%' }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-orange-100 bg-gradient-to-br from-orange-50 to-amber-50 px-4 py-3 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.06)]">
                  <Flame className="h-9 w-9 shrink-0 text-orange-500" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-orange-800/80">
                      Günlük Seri
                    </p>
                    <p className="text-sm font-bold text-orange-950">0 Gün</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="flex h-11 w-11 shrink-0 items-center justify-center self-start rounded-xl border border-slate-200 bg-white text-slate-600 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.07)] transition hover:border-slate-300 hover:bg-slate-50 lg:self-auto"
            aria-label="Bildirimler"
          >
            <Bell className="h-5 w-5" strokeWidth={2} />
          </button>
        </header>

        {/* Grid */}
        <div className="grid gap-6 lg:grid-cols-[1fr_340px] lg:items-start">
          {/* Left column */}
          <div className="flex flex-col gap-6">
            {/* Daily goal */}
            <section className="overflow-hidden rounded-[1.25rem] bg-[#2563eb] p-6 text-white shadow-[0_10px_40px_-12px_rgba(37,99,235,0.55)]">
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-white/95">
                    <Target className="h-5 w-5 shrink-0" strokeWidth={2} />
                    <h2 className="text-lg font-bold">Günlük Hedef & Çalışma</h2>
                  </div>
                  <p className="mt-6 text-4xl font-extrabold tracking-tight lg:text-[2.75rem]">
                    0 / 120 dk
                  </p>
                  <p className="mt-1 text-sm font-medium text-white/80">
                    Çalışma süresi
                  </p>
                </div>
                <RingProgress percent={0} />
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-[15px] font-semibold text-[#2563eb] shadow-sm transition hover:bg-slate-50 min-[420px]:flex-none"
                >
                  <Play className="h-5 w-5" strokeWidth={2.25} fill="currentColor" />
                  Sayacı Başlat
                </button>
                <button
                  type="button"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-white/15 px-5 py-3 text-[15px] font-semibold text-white ring-1 ring-white/30 backdrop-blur-sm transition hover:bg-white/25 min-[420px]:flex-none"
                >
                  + Soru Ekle
                </button>
              </div>
            </section>

            {/* Stat row */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.25rem] bg-sky-100/90 p-5 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.08)] ring-1 ring-sky-200/50">
                <div className="flex items-center gap-2 text-sky-900">
                  <Clock className="h-5 w-5" strokeWidth={2} />
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-800/80">
                    Çalışma Süresi
                  </span>
                </div>
                <p className="mt-4 text-3xl font-extrabold tracking-tight text-sky-950">
                  0 sa 0 dk
                </p>
                <p className="mt-1 text-sm font-medium text-sky-700/90">Bugün</p>
              </div>
              <div className="rounded-[1.25rem] bg-emerald-100/90 p-5 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.08)] ring-1 ring-emerald-200/50">
                <div className="flex items-center gap-2 text-emerald-900">
                  <Trophy className="h-5 w-5" strokeWidth={2} />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800/80">
                    Çözülen Soru
                  </span>
                </div>
                <p className="mt-4 text-3xl font-extrabold tracking-tight text-emerald-950">
                  0
                </p>
                <p className="mt-1 text-sm font-medium text-emerald-700/90">
                  Bugün
                </p>
              </div>
            </div>

            {/* XP banner */}
            <section className="relative overflow-hidden rounded-[1.25rem] bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#ec4899] p-6 text-white shadow-[0_12px_40px_-16px_rgba(124,58,237,0.55)]">
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-10 left-1/3 h-36 w-36 rounded-full bg-pink-400/20 blur-3xl" />
              <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex gap-1 pt-1">
                    <Gift className="h-6 w-6 shrink-0 text-amber-200" />
                    <span className="text-lg" aria-hidden>
                      🎁
                    </span>
                  </div>
                  <p className="max-w-xl text-[15px] font-semibold leading-snug text-white/95">
                    XP ve Kutu Kazan! Bekleyen 3 görevin var. Hadi bitirelim!
                  </p>
                </div>
                <button
                  type="button"
                  className="inline-flex shrink-0 items-center gap-2 self-start rounded-xl bg-white/20 px-5 py-2.5 text-sm font-bold text-white ring-1 ring-white/30 backdrop-blur-sm transition hover:bg-white/30 sm:self-auto"
                >
                  Keşfet
                  <span aria-hidden>›</span>
                </button>
              </div>
            </section>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6">
            <section className="rounded-[1.25rem] bg-white p-5 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.1)] ring-1 ring-slate-100">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-base font-bold text-slate-900">
                  Bekleyen Görevler (0)
                </h2>
                <a
                  href="#"
                  className="text-sm font-semibold text-[#2563eb] hover:underline"
                >
                  Tümü ›
                </a>
              </div>
              <div className="mt-4 rounded-xl bg-[#eff6ff] px-4 py-8 text-center">
                <p className="text-sm font-medium text-slate-600">
                  Harika! Bekleyen görevin yok.
                </p>
              </div>
            </section>

            <section className="rounded-[1.25rem] bg-white p-5 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.1)] ring-1 ring-slate-100">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-100">
                  <FileText className="h-5 w-5 text-orange-600" strokeWidth={2} />
                </div>
                <h2 className="text-base font-bold text-slate-900">
                  Son Denemeler
                </h2>
              </div>
              <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50/80 p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="min-w-0">
                    <span className="inline-block rounded-md bg-emerald-500 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white">
                      LGS
                    </span>
                    <p className="mt-2 font-semibold text-slate-900">
                      Özdebir Tyt-2
                    </p>
                    <p className="mt-0.5 text-sm text-slate-500">8 Mayıs 2024</p>
                  </div>
                  <p className="text-lg font-extrabold text-[#2563eb]">50.00 NET</p>
                </div>
              </div>
              <button
                type="button"
                className="mt-4 w-full rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                Tüm Denemeleri Gör
              </button>
            </section>
          </div>
        </div>

        {/* Study history */}
        <section className="mt-8 rounded-[1.25rem] bg-white p-6 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.1)] ring-1 ring-slate-100">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-base font-bold text-slate-900">
              Çalışma Geçmişi (Son 14 Gün)
            </h2>
            <a
              href="#"
              className="text-sm font-semibold text-[#2563eb] hover:underline"
            >
              Takvim ›
            </a>
          </div>
          <div className="mt-8 flex h-40 items-end justify-between gap-1.5 pt-2 sm:gap-2">
            {historyBars.map((h, i) => (
              <div key={i} className="flex flex-1 justify-center">
                <div
                  className="w-full max-w-[32px] rounded-md bg-slate-200 transition-colors hover:bg-slate-300"
                  style={{ height: `${Math.max(10, h * 2.2)}px` }}
                  title={`Gün ${i + 1}`}
                />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
