const sections = [
  {
    title: '1. Aceptacion',
    content:
      'Al acceder o utilizar la plataforma FocusComex, aceptas estas Condiciones de Uso. Si no estas de acuerdo, debes abstenerte de usar el servicio.',
  },
  {
    title: '2. Registro y cuenta',
    content:
      'Para acceder a determinadas funcionalidades debes crear una cuenta con informacion veraz y mantener la confidencialidad de tus credenciales.',
  },
  {
    title: '3. Uso permitido',
    content:
      'Te comprometes a utilizar la plataforma de manera licita, sin vulnerar derechos de terceros ni realizar actividades que afecten la seguridad o disponibilidad del servicio.',
  },
  {
    title: '4. Propiedad intelectual',
    content:
      'El contenido, software, marcas y elementos de la plataforma son propiedad de FocusComex o de sus licenciantes y estan protegidos por la normativa aplicable.',
  },
  {
    title: '5. Planes y pagos',
    content:
      'Algunas funcionalidades pueden estar sujetas a planes pagos. Los precios, alcances y condiciones de facturacion se informan en la plataforma.',
  },
  {
    title: '6. Limitacion de responsabilidad',
    content:
      'FocusComex presta el servicio con esfuerzos razonables de continuidad y calidad, pero no garantiza disponibilidad ininterrumpida ni ausencia absoluta de errores.',
  },
  {
    title: '7. Suspencion o cancelacion',
    content:
      'Podemos suspender o cancelar cuentas ante incumplimientos de estas condiciones, uso abusivo o requerimientos legales.',
  },
  {
    title: '8. Enlaces y servicios de terceros',
    content:
      'La plataforma puede incluir integraciones o enlaces externos. FocusComex no controla ni asume responsabilidad por contenidos o politicas de terceros.',
  },
  {
    title: '9. Modificaciones',
    content:
      'Podemos modificar estas condiciones en cualquier momento. Publicaremos la version vigente y, cuando corresponda, notificaremos cambios relevantes.',
  },
  {
    title: '10. Ley aplicable y jurisdiccion',
    content:
      'Estas condiciones se rigen por la normativa aplicable en la jurisdiccion correspondiente al domicilio legal de FocusComex, salvo disposicion imperativa en contrario.',
  },
]

export default function Condiciones() {
  return (
    <main className="min-h-screen bg-dark text-white pt-28 pb-20">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gold mb-4">Condiciones de Uso</h1>
        <p className="text-white/70 mb-10 leading-relaxed">
          Estas condiciones regulan el acceso y uso de FocusComex. Te recomendamos leerlas detenidamente antes de utilizar la
          plataforma.
        </p>

        <div className="space-y-6">
          {sections.map((section) => (
            <article key={section.title} className="rounded-xl border border-white/10 bg-dark-200/80 p-5 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">{section.title}</h2>
              <p className="text-white/70 leading-relaxed">{section.content}</p>
            </article>
          ))}
        </div>

        <p className="text-white/40 text-sm mt-10">Ultima actualizacion: 31/05/2026</p>
      </section>
    </main>
  )
}
