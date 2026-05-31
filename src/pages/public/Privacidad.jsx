const sections = [
  {
    title: '1. Responsable del tratamiento',
    content:
      'FocusComex es responsable del tratamiento de los datos personales recabados a traves de la plataforma y sus canales oficiales de contacto.',
  },
  {
    title: '2. Datos que recopilamos',
    content:
      'Podemos recopilar datos de identificacion y contacto, datos de acceso y uso de la plataforma, informacion tecnica del dispositivo y datos necesarios para la prestacion del servicio.',
  },
  {
    title: '3. Finalidades del tratamiento',
    content:
      'Utilizamos los datos para crear y administrar cuentas, prestar funcionalidades del servicio, mejorar la experiencia de uso, brindar soporte, cumplir obligaciones legales y prevenir fraude o usos indebidos.',
  },
  {
    title: '4. Base legal',
    content:
      'El tratamiento se basa en la ejecucion de la relacion contractual, el consentimiento cuando corresponda y el cumplimiento de obligaciones legales aplicables.',
  },
  {
    title: '5. Conservacion de la informacion',
    content:
      'Conservamos los datos durante el tiempo necesario para cumplir las finalidades indicadas y por los plazos exigidos por normativa vigente.',
  },
  {
    title: '6. Comparticion con terceros',
    content:
      'Podemos compartir datos con proveedores que prestan servicios en nuestro nombre, bajo acuerdos de confidencialidad y seguridad adecuados, y con autoridades cuando exista obligacion legal.',
  },
  {
    title: '7. Seguridad',
    content:
      'Aplicamos medidas tecnicas y organizativas razonables para proteger la informacion frente a accesos no autorizados, perdida, alteracion o divulgacion indebida.',
  },
  {
    title: '8. Derechos del titular',
    content:
      'Puedes solicitar acceso, rectificacion, actualizacion, supresion, oposicion y, cuando corresponda, portabilidad de tus datos, conforme a la normativa aplicable.',
  },
  {
    title: '9. Cookies y tecnologias similares',
    content:
      'Utilizamos cookies y tecnologias similares para el funcionamiento del sitio, analitica y mejora del servicio. Puedes gestionar tus preferencias desde el navegador.',
  },
  {
    title: '10. Cambios a esta politica',
    content:
      'Podemos actualizar esta politica para reflejar cambios normativos o funcionales. La version vigente se publicara en esta misma pagina.',
  },
]

export default function Privacidad() {
  return (
    <main className="min-h-screen bg-dark text-white pt-28 pb-20">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gold mb-4">Politica de Privacidad</h1>
        <p className="text-white/70 mb-10 leading-relaxed">
          En FocusComex valoramos tu privacidad. Esta politica describe como recopilamos, usamos, protegemos y compartimos tus
          datos personales cuando utilizas nuestros servicios.
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
