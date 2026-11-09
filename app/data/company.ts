// Datele firmei: singura sursă. Componentele le citesc de aici.

export const company = {
  brand: 'M-CRAFT',
  legalName: 'M CRAFT CONSTRUCTII SRL',
  cui: '55628151',
  regCom: 'J2026055606006',
  address: {
    street: 'Str. George Călinescu nr. 10',
    locality: 'Vicov de Sus',
    county: 'județul Suceava',
    region: 'Suceava',
    postalCode: '727610',
    country: 'RO',
  },
  phone: {
    display: '+40 773 266 220',
    href: 'tel:+40773266220',
  },
  whatsapp: {
    display: '+40 773 266 220',
    number: '40773266220',
  },
  email: 'mcraftconstruct@gmail.com',
  area: 'județul Suceava, Iași și București',
  /** Prezentare scurtă, folosită în footer și meta */
  tagline: 'Renovări, mobilă și amenajări pentru case, apartamente și spații comerciale din județul Suceava, Iași și București.',
} as const

export const fullAddress = `${company.address.street}, ${company.address.locality}, ${company.address.county}, ${company.address.postalCode}`

export function whatsappUrl(text?: string) {
  const base = `https://wa.me/${company.whatsapp.number}`
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}

export const defaultWhatsappText = 'Bună ziua! Aș dori o ofertă pentru o lucrare. Lucrarea este în [localitate].'
