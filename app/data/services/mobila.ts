import type { Service } from '../types'

const service: Service = {
  slug: 'mobila',
  name: 'Mobilă la comandă și montaj',
  shortName: 'Mobilă la comandă',
  h1: 'Mobilă la comandă pentru spațiul tău',
  seoTitle: 'Mobilă la comandă și montaj',
  seoDescription: 'Mobilă adaptată spațiului, de la măsurători și alegerea materialelor la montaj. Bucătării, dressinguri și mobilier pentru living în Suceava, Iași și București.',
  intro: 'Mobilierul bine gândit folosește eficient spațiul și se potrivește cu finisajele locuinței. Discutăm dimensiunile, compartimentarea, materialele și detaliile de montaj înainte de ofertă. Lucrăm în județul Suceava, Iași și București.',
  summary: 'Bucătării, dressinguri și mobilier pentru living, adaptate spațiului și montate cu atenție la detalii.',
  sections: [
    {
      title: 'De la idee la mobilier montat',
      paragraphs: ['Pornim de la dimensiunile reale ale încăperii și de la modul în care folosiți spațiul. Stabilim împreună configurația, locurile de depozitare, materialele și finisajele înainte de execuție.'],
      bullets: ['măsurători și stabilirea configurației', 'alegerea materialelor, a fronturilor și a feroneriei', 'pregătirea spațiului și coordonarea cu prizele și instalațiile', 'montaj, reglaje și verificarea detaliilor'],
    },
    {
      title: 'Mobilă pentru bucătărie',
      paragraphs: ['În bucătărie contează poziția electrocasnicelor, a chiuvetei și a prizelor. Corpurile și blatul se dimensionează după spațiul disponibil, astfel încât depozitarea și circulația să funcționeze firesc.'],
    },
    {
      title: 'Dressinguri și mobilier de living',
      paragraphs: ['Un dressing poate folosi și zonele dificile ale camerei, iar mobilierul de living poate integra depozitare, zona TV și iluminat. Dimensiunile și finisajul se aleg în acord cu restul amenajării.'],
    },
  ],
  options: [
    { title: 'Mobilă de bucătărie', text: 'Corpuri inferioare și suspendate, spații pentru electrocasnice și soluții de depozitare adaptate încăperii.' },
    { title: 'Dressinguri și dulapuri', text: 'Compartimentări pentru haine și obiecte, stabilite după spațiul disponibil și nevoile de depozitare.' },
    { title: 'Mobilier de living', text: 'Corpuri pentru zona TV, rafturi și depozitare integrate în amenajarea camerei.' },
    { title: 'Montaj și reglaje', text: 'Poziționarea corpurilor, alinierea fronturilor și reglajele finale.' },
  ],
  quoteFactors: ['dimensiunile încăperii și configurația mobilierului', 'numărul de corpuri și compartimentarea interioară', 'materialele, fronturile și feroneria alese', 'integrarea electrocasnicelor sau a iluminatului', 'starea pereților și a pardoselii în zona de montaj', 'localitatea și accesul pentru transport și montaj'],
  faq: [
    { q: 'Ce informații sunt necesare pentru o ofertă?', a: 'Dimensiunile aproximative ale spațiului, câteva fotografii, tipul mobilierului dorit și localitatea. Configurația și prețul final se stabilesc după măsurători și alegerea materialelor.' },
    { q: 'Când se fac măsurătorile?', a: 'Măsurătorile finale se fac după ce pereții și pardoseala au ajuns la forma lor definitivă, pentru ca mobilierul să se potrivească la montaj.' },
    { q: 'Puteți integra mobilierul într-o renovare completă?', a: 'Da. Pozițiile prizelor, ale racordurilor și ale corpurilor de iluminat se stabilesc din timp, înainte de finisaje și de montajul mobilierului.' },
  ],
  related: ['interioare', 'pardoseli-placari', 'instalatii-sanitare'],
  whatsappText: 'Bună ziua! Mă interesează o ofertă pentru mobilă la comandă. Lucrarea este în [localitate].',
  keywords: ['mobilă', 'mobilier la comandă', 'mobilă de bucătărie', 'dressing', 'dulap', 'mobilier living', 'montaj mobilă', 'Suceava', 'Iași', 'București'],
}

export default service
