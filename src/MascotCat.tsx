/** Attığın referans PNG — izole kedi görseli (public/mascot.png). */
export function MascotCat({ className }: { className?: string }) {
  return (
    <img
      src="/mascot.png"
      alt=""
      draggable={false}
      decoding="async"
      fetchPriority="high"
      className={className}
    />
  )
}
