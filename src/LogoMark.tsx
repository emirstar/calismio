export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="lm-edge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
        <linearGradient id="lm-ribbon" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5eead4" />
          <stop offset="100%" stopColor="#14b8a6" />
        </linearGradient>
        <filter
          id="lm-drop"
          x="-30%"
          y="-30%"
          width="160%"
          height="160%"
          colorInterpolationFilters="sRGB"
        >
          <feDropShadow
            dx="0"
            dy="2"
            stdDeviation="2.8"
            floodOpacity="0.13"
            floodColor="#1e3a8a"
          />
        </filter>
        <clipPath id="lm-card">
          <rect x="3" y="3" width="42" height="42" rx="11.5" />
        </clipPath>
      </defs>

      <g filter="url(#lm-drop)">
        <rect
          x="3"
          y="3"
          width="42"
          height="42"
          rx="11.5"
          fill="#f5f2eb"
          stroke="#e7e2d9"
          strokeWidth="1"
        />
      </g>

      <g clipPath="url(#lm-card)">
        <rect x="33" y="3" width="14" height="42" fill="url(#lm-edge)" opacity="0.62" />
      </g>

      <path
        d="M31 4h11.5a1.5 1.5 0 0 1 1.5 1.5v10l-6.5-4.5L31 15.5V5.5A1.5 1.5 0 0 1 31 4z"
        fill="url(#lm-ribbon)"
        stroke="#0d9488"
        strokeWidth="0.75"
        strokeLinejoin="round"
      />

      <text
        x="23"
        y="31"
        textAnchor="middle"
        dominantBaseline="middle"
        style={{
          fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
          fontWeight: 800,
          fontSize: '21px',
          letterSpacing: '-0.02em',
          fill: '#0f2744',
        }}
      >
        Ç
      </text>
    </svg>
  )
}
