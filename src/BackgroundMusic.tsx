import { useEffect, useRef } from 'react'

const TRACK_SRC = '/audio/site-entry-theme.mp3'

/**
 * Müzik tek tur çalar. Tarayıcılar sesli autoplay’i çoğu zaman engeller;
 * birkaç kez deneriz; olmazsa yalnızca o zaman ilk tıklamada devreye girer.
 */
export function BackgroundMusic() {
  const ref = useRef<HTMLAudioElement>(null)
  const detachUnlockRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const audio = el
    audio.loop = false
    audio.volume = 0.88

    let cancelled = false

    async function tryPlay(): Promise<boolean> {
      try {
        await audio.play()
        return true
      } catch {
        return false
      }
    }

    async function run(): Promise<void> {
      if (await tryPlay()) return
      await new Promise<void>((r) => requestAnimationFrame(() => r()))
      if (cancelled || (await tryPlay())) return
      await new Promise<void>((r) => setTimeout(r, 80))
      if (cancelled || (await tryPlay())) return
      await new Promise<void>((r) => setTimeout(r, 350))
      if (cancelled || (await tryPlay())) return

      const unlock = () => {
        void tryPlay().then((ok) => {
          if (ok && detachUnlockRef.current) {
            detachUnlockRef.current()
            detachUnlockRef.current = null
          }
        })
      }
      window.addEventListener('pointerdown', unlock)
      window.addEventListener('keydown', unlock)
      detachUnlockRef.current = () => {
        window.removeEventListener('pointerdown', unlock)
        window.removeEventListener('keydown', unlock)
      }
    }

    void run()

    return () => {
      cancelled = true
      detachUnlockRef.current?.()
      detachUnlockRef.current = null
      audio.pause()
    }
  }, [])

  return (
    <audio
      ref={ref}
      src={TRACK_SRC}
      preload="auto"
      playsInline
      autoPlay
      className="pointer-events-none fixed h-px w-px overflow-hidden opacity-0"
      aria-hidden
    />
  )
}
