import { useEffect, useRef } from 'react'

const TRACK_SRC = '/audio/site-entry-theme.mp3'

/** Sayfa açılışında bir kez çalar (tarayıcı izin vermezse ilk dokunuşta başlar). */
export function BackgroundMusic() {
  const ref = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.loop = false
    el.volume = 0.88

    const tryPlay = () => {
      void el.play().catch(() => {})
    }

    tryPlay()

    const unlock = () => {
      tryPlay()
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('keydown', unlock)
    }
    window.addEventListener('pointerdown', unlock)
    window.addEventListener('keydown', unlock)

    return () => {
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('keydown', unlock)
      el.pause()
    }
  }, [])

  return (
    <audio
      ref={ref}
      src={TRACK_SRC}
      preload="auto"
      playsInline
      className="pointer-events-none fixed h-px w-px overflow-hidden opacity-0"
      aria-hidden
    />
  )
}
