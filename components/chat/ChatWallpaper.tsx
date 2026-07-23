/** Minimal Telegram-like chat wallpaper — tiny inline SVG, no images/filters. */
export default function ChatWallpaper() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.55] dark:opacity-[0.35]"
      style={{
        backgroundColor: 'transparent',
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
          `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'>
            <g fill='none' stroke='%237c3aed' stroke-width='1' stroke-opacity='0.14'>
              <circle cx='20' cy='24' r='3'/>
              <circle cx='58' cy='18' r='2'/>
              <circle cx='96' cy='28' r='2.5'/>
              <path d='M14 70h18M88 62h16'/>
              <path d='M40 96l8-6 8 6'/>
              <rect x='72' y='88' width='10' height='10' rx='2'/>
              <path d='M28 48c4-6 12-6 16 0'/>
            </g>
          </svg>`,
        )}")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '120px 120px',
      }}
    />
  );
}
