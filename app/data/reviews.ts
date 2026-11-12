// Recenzii reale ale clienților. Se adaugă doar recenzii furnizate de clienți sau preluate
// dintr-o sursă verificabilă (cu link). Nu se inventează nume, texte sau note.
export interface Review {
  author: string
  text: string
  /** de ex. 'Google', 'Facebook', 'Primită pe email' */
  source: string
  /** link către recenzia publică, dacă există */
  url?: string
  /** AAAA-LL */
  date?: string
  service?: string
}

const googleReviews = 'https://www.google.com/maps/place/?q=place_id:ChIJ-aSO0ck8aywRoXNtcoSsPng'

export const reviews: Review[] = [
  { author: 'Casian Gocan', text: 'Servicii de nota 10! Lucrarea de montaj rigips a fost executata impecabil si conform specificatiilor. Multumim!', source: 'Google', url: googleReviews, date: '2026-11', service: 'interioare' },
  { author: 'Bujdei Iulian', text: 'Preț bun și calitate superioară. Recomand cu încredere!!', source: 'Google', url: googleReviews, date: '2026-11' },
  { author: 'Maria Calancea', text: 'Recomand cu încredere! Super calitate!', source: 'Google', url: googleReviews, date: '2026-11' },
  { author: 'Sebastian Strugari', text: 'Super multumit!!', source: 'Google', url: googleReviews, date: '2026-11' },
  { author: 'd0duww KTMS', text: 'Cel mai bun serviciu vreodată', source: 'Google', url: googleReviews, date: '2026-11' },
  { author: 'Burla Mihaela', text: 'Recomand cu încredere !', source: 'Google', url: googleReviews, date: '2026-11' },
  { author: 'Ioan Schipor', text: 'Recomand cu încredere!', source: 'Google', url: googleReviews, date: '2026-11' },
  { author: 'Daniela Isopescu', text: 'Recomand!', source: 'Google', url: googleReviews, date: '2026-11' },
]
