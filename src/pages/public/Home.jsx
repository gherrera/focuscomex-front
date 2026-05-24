import { Link } from 'react-router-dom'

const features = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Calculadora inteligente',
    desc: 'Simulaciones precisas de costos de importación y exportación al instante.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    title: 'Tracking de cargas',
    desc: 'Rastrea tus envíos en tiempo real con información actualizada y centralizada.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: 'Validación documental',
    desc: 'Revisa y valida documentos con IA para evitar errores y retrasos.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: 'Biblioteca COMEX',
    desc: 'Accede a guías, normativas y recursos actualizados para tu operación.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    ),
    title: 'Consultoría experta',
    desc: 'Asesoría personalizada de especialistas en comercio exterior.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Seguridad y confianza',
    desc: 'Tus datos y operaciones siempre protegidos con estándares internacionales.',
  },
]

const partners = ['MAERSK', 'DHL', 'KUEHNE+NAGEL', 'Hapag-Lloyd', 'CMA CGM', 'LATAM CARGO']

const stats = [
  { value: '+25.000', label: 'Operaciones calculadas', sub: 'Simulaciones completadas con éxito' },
  { value: '18%', label: 'Ahorro promedio', sub: 'En costos operacionales para nuestros clientes' },
  { value: '+40 hrs', label: 'Tiempo ahorrado', sub: 'Mensuales en gestión y validación documental' },
  { value: '99%', label: 'Precisión', sub: 'De precisión en cálculos y validaciones' },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-dark">
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">

        {/* ─── Background photo ───────────────────────────────────────────
            Para usar tu foto real: reemplaza public/hero.svg con public/hero.jpg
            y cambia la URL abajo a: url('/hero.jpg')
        ─────────────────────────────────────────────────────────────────── */}
        <div
          className="absolute inset-0 bg-no-repeat bg-contain"
          style={{
            backgroundImage: "url('/hero.png')",
            backgroundPosition: 'center right',
            marginTop: 60,
          }}
        />

        {/* Dark overlay from left (solid) → right (transparent) so text is readable
            and the photo shines through on the right half */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#07070a] from-[30%] via-[#07070a]/30 via-[50%] to-transparent" />

        {/* Soft top + bottom vignette to blend with the page */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#07070a]/70 via-transparent to-[#07070a]" />

        {/* Subtle amber glow behind the globe area */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_72%_52%,rgba(201,168,76,0.07),transparent)]" />

        {/* ─── Content ─────────────────────────────────────────────────── */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 w-full">
          <div className="max-w-[560px]">
            <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-bold text-white leading-[1.08] tracking-tight mb-5">
              Tu operación<br />
              internacional,<br />
              <span className="text-gold">con foco total.</span>
            </h1>
            <p className="text-white/55 text-[17px] leading-relaxed mb-10 max-w-md">
              Plataforma inteligente que simplifica tus operaciones de comercio exterior
              con precisión, transparencia y acompañamiento experto.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/register"
                className="inline-flex items-center gap-2.5 bg-gold hover:bg-gold-light text-[#07070a] font-semibold px-7 py-3 rounded-md transition-colors duration-200 text-[15px]"
              >
                Comenzar cálculo
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <button className="inline-flex items-center gap-3 border border-white/25 hover:border-white/50 text-white px-7 py-3 rounded-md transition-colors duration-200 text-[15px]">
                <span className="w-8 h-8 rounded-full border border-white/25 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                Ver cómo funciona
              </button>
            </div>
          </div>
        </div>

      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-14 bg-dark-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Todo lo que tu operación<br />
              internacional necesita,{' '}
              <span className="text-gold">en un solo lugar</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div key={f.title} className="card-dark hover:border-gold/20 transition-colors group">
                <div className="text-gold mb-4 group-hover:scale-110 transition-transform inline-block">
                  {f.icon}
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUE PROP ── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-2">
                Visibilidad. Precisión. Control.
              </h2>
              <h3 className="text-3xl font-bold text-gold mb-6">Así de simple.</h3>
              <p className="text-white/50 text-lg leading-relaxed mb-8">
                Un ecosistema digital diseñado para importadores, exportadores y agentes
                de carga que buscan eficiencia y tranquilidad en cada operación.
              </p>
              <ul className="space-y-3">
                {[
                  'Cálculos basados en normativas vigentes',
                  'Actualizaciones constantes',
                  'Interfaz intuitiva y moderna',
                  'Soporte experto siempre disponible',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white/60">
                    <div className="w-5 h-5 rounded-full border border-gold/50 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Mock dashboard */}
            <div className="bg-dark-200 rounded-2xl border border-white/5 p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-white font-medium">Resumen de operación</span>
                <span className="text-gold text-xs border border-gold/30 rounded px-2 py-0.5">Importación aérea</span>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { label: 'Costo total estimado', value: '$13.563.170 CLP' },
                  { label: 'Equivalente en USD', value: '$15.136,96' },
                  { label: 'Tiempo estimado', value: '5 - 7 días' },
                ].map((item) => (
                  <div key={item.label} className="bg-dark-300 rounded-lg p-3">
                    <p className="text-white/30 text-xs mb-1">{item.label}</p>
                    <p className="text-white font-semibold text-sm">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="mb-4">
                <p className="text-white/40 text-xs mb-3">Desglose de costos</p>
                <div className="space-y-2">
                  {[
                    { label: 'FOB (Valor Mercancía)', pct: 63, color: 'bg-gold' },
                    { label: 'Flete Internacional', pct: 9, color: 'bg-gold/60' },
                    { label: 'Impuestos y Tasas', pct: 16, color: 'bg-gold/40' },
                    { label: 'Otros costos', pct: 14, color: 'bg-gold/20' },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: row.color === 'bg-gold' ? '#c9a84c' : undefined, opacity: row.pct / 63 + 0.3 }}>
                        <div className={`w-2 h-2 rounded-full ${row.color}`} />
                      </div>
                      <div className="flex-1 bg-dark-400 rounded-full h-1.5">
                        <div className={`h-1.5 rounded-full ${row.color}`} style={{ width: `${row.pct}%` }} />
                      </div>
                      <span className="text-white/40 text-xs w-8 text-right">{row.pct}%</span>
                      <span className="text-white/50 text-xs">{row.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section id="stats" className="py-24 bg-dark-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Tecnología que trabaja <span className="text-gold">para ti</span>
            </h2>
            <p className="text-white/40 max-w-xl mx-auto">
              Automatizamos lo complejo para que tomes decisiones rápidas, informadas y sin margen de error.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-gold mb-2">{s.value}</div>
                <div className="text-white font-medium mb-1">{s.label}</div>
                <div className="text-white/30 text-xs">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-dark-200 rounded-2xl border border-white/5 p-10 sm:p-16 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                ¿Listo para optimizar<br />
                tus <span className="text-gold">operaciones?</span>
              </h2>
              <p className="text-white/40">
                Únete a empresas que ya están simplificando su comercio exterior con Focus Comex.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <Link to="/register" className="btn-gold text-center whitespace-nowrap">
                Crear cuenta gratis
              </Link>
              <a href="#" className="btn-outline text-center whitespace-nowrap">
                Hablar con un asesor
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
