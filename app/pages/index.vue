<script setup lang="ts">
import { company, whatsappUrl, defaultWhatsappText } from '~/data/company'
import { services, serviceUrl } from '~/data/services'
import { media, photo, photos, servicePhotos } from '~/data/media'
import { reviews } from '~/data/reviews'

const hero = photos(media.home.hero)
const recent = photos(media.home.recent)
const about = photos(media.home.about)
const homeVideos = media.home.videos.map((id) => media.videos.find((v) => v.id === id)).filter((v) => !!v)
const projectTitle = (id: string) => media.projects.find((p) => p.id === id)?.title ?? ''
const projectSvc = (id: string) => media.projects.find((p) => p.id === id)?.services[0]

const cards = services.map((s) => ({ ...s, cover: servicePhotos(s.slug).cover }))
const { track } = useTracking()
const recentOpen = ref<number | null>(null)

usePageSeo({
  title: 'M-CRAFT – renovări și amenajări în Suceava, Iași și București',
  rawTitle: true,
  description: 'Renovări, amenajări și mobilă pentru case, apartamente și spații comerciale din județul Suceava, Iași și București.',
  image: hero[0],
})
</script>

<template>
  <div>
    <!-- Primul ecran: mesaj clar, proiecte reale și acces direct la servicii -->
    <section class="hero">
      <div class="wrap hero__grid">
        <div class="hero__text">
          <span class="hero__eyebrow"><i /> M—CRAFT / CONSTRUCȚII & AMENAJĂRI</span>
          <h1>Din plan,<br><em>acasă.</em></h1>
          <p class="lead">
            Pornim de la spațiul pe care îl ai și ajungem la cel în care vrei să locuiești.
            Renovări, finisaje și mobilă în Suceava, Iași și București.
          </p>
          <div class="hero__cta">
            <NuxtLink to="/contact/#oferta" class="btn btn--primary">Începe un proiect ↗</NuxtLink>
            <NuxtLink to="/proiecte/" class="btn btn--outline">Vezi lucrări reale</NuxtLink>
          </div>
          <div class="hero__meta">
            <span><strong>{{ String(services.length).padStart(2, '0') }}</strong> servicii, un singur partener</span>
            <a :href="whatsappUrl(defaultWhatsappText)" target="_blank" rel="noopener" @click="track('whatsapp')">Discută pe WhatsApp ↗</a>
          </div>
        </div>
        <div class="hero__photos">
          <Pic v-if="hero[0]" :photo="hero[0]" priority sizes="(max-width: 860px) 100vw, 40vw" ratio="4 / 5" class="hero__main" />
          <Pic v-if="hero[1]" :photo="hero[1]" sizes="(max-width: 860px) 50vw, 20vw" ratio="4 / 5" class="hero__side" />
          <Pic v-if="hero[2]" :photo="hero[2]" sizes="(max-width: 860px) 50vw, 20vw" ratio="4 / 5" class="hero__side" />
          <div class="hero__photo-label">DIN LUCRĂRILE NOASTRE <span>↗</span></div>
        </div>
      </div>
      <div class="wrap hero__links" aria-label="Servicii populare">
        <NuxtLink to="/servicii/interioare/">01 <strong>Renovări interioare</strong> ↗</NuxtLink>
        <NuxtLink to="/servicii/mobila/">02 <strong>Mobilă la comandă</strong> ↗</NuxtLink>
        <NuxtLink to="/servicii/fatade/">03 <strong>Fațade și izolații</strong> ↗</NuxtLink>
      </div>
    </section>

    <!-- Servicii: rezumat vizual -->
    <section class="section">
      <div class="wrap">
        <div class="section-head">
          <div>
            <h2>Servicii</h2>
            <p>Fiecare serviciu are o pagină cu detalii despre lucrare, ce influențează oferta și întrebări frecvente.</p>
          </div>
          <NuxtLink to="/servicii/" class="more-link">Toate serviciile →</NuxtLink>
        </div>
        <div class="svc-grid">
          <NuxtLink v-for="s in cards" :key="s.slug" v-reveal :to="serviceUrl(s.slug)" class="svc-card" :data-svc="s.slug">
            <Pic v-if="s.cover" :photo="s.cover" sizes="(max-width: 640px) 50vw, 25vw" ratio="3 / 2" alt="" />
            <div v-else-if="s.slug === 'mobila'" class="svc-card__concept concept-cover" aria-hidden="true" />
            <div v-else class="svc-card__ph" aria-hidden="true"><span /></div>
            <div class="svc-card__body">
              <h3>{{ s.name }}</h3>
              <p>{{ s.summary }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Despre + zona deservită -->
    <section class="section section--verde">
      <div class="wrap about">
        <div v-reveal class="about__text">
          <h2>M-CRAFT, din Vicov de Sus</h2>
          <p>
            Firmă de construcții și renovări din Vicov de Sus. Lucrăm în case, apartamente și spații comerciale mici:
            compartimentări și tavane din gips-carton, finisaje, placări și instalații. Fotografiile din portofoliu sunt din lucrările noastre.
          </p>
          <div class="area band band--left">
            <h3>Unde lucrăm</h3>
            <p>
              În județul Suceava, Iași și București, cu sediul în Vicov de Sus. Spuneți-ne unde este lucrarea
              și despre ce este vorba.
            </p>
          </div>
          <NuxtLink to="/despre-noi/" class="more-link">Despre noi →</NuxtLink>
        </div>
        <div class="about__photos">
          <Pic v-for="p in about" :key="p.id" :photo="p" sizes="(max-width: 860px) 33vw, 18vw" ratio="3 / 4" />
        </div>
      </div>
    </section>

    <!-- Lucrări recente -->
    <section class="section">
      <div class="wrap">
        <div class="section-head">
          <div>
            <h2>Lucrări recente</h2>
            <p>Imagini din lucrările noastre, în diferite etape de execuție.</p>
          </div>
          <NuxtLink to="/proiecte/" class="more-link">Toate proiectele →</NuxtLink>
        </div>
        <div class="recent">
          <button v-for="(p, i) in recent" :key="p.id" v-reveal type="button" class="recent__item" :data-svc="projectSvc(p.project)" @click="recentOpen = i">
            <Pic :photo="p" sizes="(max-width: 640px) 50vw, 25vw" ratio="1 / 1" :alt="p.alt" />
            <span class="recent__cap">{{ projectTitle(p.project) }}</span>
          </button>
        </div>
        <Lightbox v-model="recentOpen" :photos="recent" />
      </div>
    </section>

    <!-- Animație 3D + proces -->
    <section class="section section--otel">
      <div class="wrap">
        <div class="section-head">
          <div>
            <h2>Cum se construiește o încăpere, strat cu strat</h2>
            <p>Ordinea lucrărilor contează: fiecare strat are nevoie de un suport pregătit corect.</p>
          </div>
        </div>
        <RoomAssembly />
        <h2 class="process-title">Cum lucrăm</h2>
        <ProcessSteps />
      </div>
    </section>

    <!-- Video -->
    <section class="section">
      <div class="wrap video-row">
        <div class="video-row__text">
          <h2>De la structură la finisaj</h2>
          <p>Clipuri scurte filmate pe șantier: glet, vopsire, compartimentări și tavane din gips-carton.</p>
          <NuxtLink to="/video/" class="more-link">Toate clipurile →</NuxtLink>
        </div>
        <VideoCard v-for="v in homeVideos" :key="v!.id" :video="v!" />
      </div>
    </section>

    <!-- Recenzii: doar dacă există recenzii reale -->
    <section v-if="reviews.length" class="section section--teracota">
      <div class="wrap">
        <div class="section-head">
          <h2>Recenzii</h2>
          <NuxtLink to="/recenzii/" class="more-link">Toate recenziile →</NuxtLink>
        </div>
        <ReviewList :reviews="reviews.slice(0, 3)" />
      </div>
    </section>

    <!-- Cerere de ofertă -->
    <section id="oferta" class="section section--chihlimbar">
      <div class="wrap quote">
        <div>
          <h2>Cere o ofertă</h2>
          <p class="muted">Lăsați-ne numele, localitatea și un telefon sau email. Vă contactăm pentru detalii.</p>
          <QuoteForm />
        </div>
        <aside class="quote__side band band--top">
          <h3>Preferați să vorbim direct?</h3>
          <ContactActions :show-quote="false" />
          <h3 class="quote__next">Ce urmează</h3>
          <NextSteps compact />
          <p class="muted">Pe WhatsApp puteți trimite și fotografii ale spațiului.</p>
          <p class="muted">Email: <a :href="`mailto:${company.email}`">{{ company.email }}</a></p>
        </aside>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  padding-block: 24px 8px;
}

.hero__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
  gap: 24px;
  align-items: stretch;
}

.hero__text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 28px;
  background: var(--paper);
  border: 1px solid var(--line);
  border-left: 6px solid var(--amber);
  border-radius: var(--r-lg);
}

.hero__text h1 {
  margin-bottom: 14px;
}

.hero__cta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 18px;
}

.hero__contact {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 22px;
  margin-top: 18px;
  padding-top: 14px;
  border-top: 1px solid var(--line);
}

.hero__contact a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--ink);
  font-weight: 550;
  text-decoration: none;
}

.hero__contact a:hover {
  text-decoration: underline;
}

.hero__contact svg {
  width: 20px;
  height: 20px;
}

.hero__contact .wa {
  color: var(--wa);
}

.hero__photos {
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 8px;
  max-height: 470px;
}

.hero__main {
  grid-row: 1 / 3;
  height: 100% !important;
  border-radius: var(--r-lg);
}

.hero__side {
  height: 100% !important;
  min-height: 0;
  border-radius: var(--r-lg);
}

.svc-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.svc-card {
  display: flex;
  flex-direction: column;
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  overflow: hidden;
  color: var(--ink);
  text-decoration: none;
  transition: border-color 0.15s ease;
}

.svc-card:hover {
  border-color: var(--amber);
  color: var(--ink);
}

.svc-card:hover h3 {
  text-decoration: underline;
  text-decoration-color: var(--amber);
}

.svc-card__concept, .svc-card__ph {
  aspect-ratio: 3 / 2;
}

.svc-card__ph {
  background: var(--concrete);
  display: grid;
  place-items: center;
}

.svc-card__ph span {
  width: 52px;
  height: 52px;
  border-left: 7px solid var(--amber);
  border-bottom: 7px solid var(--amber);
}

.svc-card__body {
  padding: 12px 14px 14px;
}

.svc-card h3 {
  font-size: 1.2rem;
  margin-bottom: 4px;
}

.svc-card p {
  font-size: 0.9rem;
  color: var(--ink-2);
  margin: 0;
}

.about {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 32px;
  align-items: center;
}

.about__text h2 {
  margin-bottom: 12px;
}

.area {
  margin: 16px 0;
  padding: 12px 16px 12px 20px;
  background: var(--paper);
  --band: var(--rust);
  border-radius: var(--r-md);
}

.area h3 {
  font-size: 1.15rem;
  margin-bottom: 4px;
}

.about__photos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.about__photos > * {
  border-radius: var(--r-md);
}

.recent {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.recent__item {
  position: relative;
  padding: 0;
  border: 0;
  background: none;
  cursor: zoom-in;
  overflow: hidden;
  border-radius: var(--r-md);
  isolation: isolate;
  text-align: left;
}

.recent__item :deep(img) {
  transition: transform 0.3s ease;
}

.recent__item:hover :deep(img) {
  transform: scale(1.03);
}

.recent__cap {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 6px 8px;
  background: var(--paper);
  color: var(--ink);
  font-size: 0.8rem;
  line-height: 1.3;
  border-top: 2px solid var(--amber);
}

.process-title {
  margin: 36px 0 22px;
}

.video-row {
  display: grid;
  grid-template-columns: 1.2fr repeat(3, 1fr);
  gap: 16px;
  align-items: start;
}

.video-row__text h2 {
  margin-bottom: 10px;
}

.video-row__text p {
  color: var(--ink-2);
}

.quote {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
  gap: 32px;
}

.quote h2 {
  margin-bottom: 6px;
}

.quote__side {
  align-self: start;
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  padding: 20px;
}

.quote__side h3 {
  margin-bottom: 12px;
}

.quote__side p {
  margin-top: 12px;
  font-size: 0.925rem;
}

@media (max-width: 1024px) {
  .svc-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .video-row {
    grid-template-columns: repeat(3, 1fr);
  }

  .video-row__text {
    grid-column: 1 / -1;
  }
}

@media (max-width: 860px) {
  .hero__grid,
  .about,
  .quote {
    grid-template-columns: 1fr;
  }

  .hero__text {
    padding: 20px;
  }

  .hero__photos {
    max-height: 360px;
  }

  .svc-grid,
  .recent {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .video-row {
    grid-template-columns: 1fr 1fr;
  }

  .video-row > :last-child {
    display: none;
  }

  .svc-card__body {
    padding: 10px;
  }

  .svc-card h3 {
    font-size: 1.05rem;
  }
}

.quote__next {
  margin: 18px 0 8px;
}

/* Culoare (docs/design/culoare.md) */
.hero__text { background: var(--amber); border: 0; }
.hero__contact { border-top: 1px solid var(--amber-line); }
.hero__contact .wa { color: var(--ink); }

.svc-card { background: var(--svc-t); border: 1px solid var(--svc-t); }
.svc-card > :first-child { border-bottom: 5px solid var(--svc-d); }
.svc-card:hover { border-color: var(--svc-d); }
.svc-card:hover h3 { text-decoration-color: var(--svc-d); }
.svc-card__ph { background: var(--svc-m); }
.svc-card__ph span { border-color: var(--svc-d); }

.area { background: var(--paper); --band: var(--verde-d); }
.recent__cap { background: var(--svc-t); border-top: 4px solid var(--svc-d); }
.quote__side { border: 1px solid var(--line); border-top-color: var(--wa-d); --band: var(--wa-d); --band-w: 3px; padding-top: 23px; }

/* Primul ecran: contrast puternic, fotografii reale și scurtături către servicii. */
.hero { padding: 34px 0 0; background: #111713; color: #f5f1e8; overflow: hidden; }
.hero__grid { gap: clamp(24px, 4vw, 62px); grid-template-columns: minmax(0, 1fr) minmax(0, .91fr); align-items: center; }
.hero__text { padding: 28px 0 36px; border: 0; border-radius: 0; background: transparent; }
.hero__eyebrow { display: flex; align-items: center; gap: 12px; color: #e4ae5d; font-size: 11px; font-weight: 700; letter-spacing: .15em; }
.hero__eyebrow i { width: 34px; height: 1px; background: #e4ae5d; }
.hero__text h1 { color: #fff; font-size: clamp(64px, 7.5vw, 126px); line-height: .91; letter-spacing: -.055em; margin: 32px 0 28px; }
.hero__text h1 em { color: #e7ae5a; font-style: normal; }
.hero__text .lead { color: #e4e5dc; max-width: 49ch; font-size: clamp(17px, 1.45vw, 21px); line-height: 1.55; }
.hero__cta { margin-top: 32px; }
.hero__cta .btn--outline { background: transparent; color: #fff; border-color: #e4e5dc88; }
.hero__cta .btn--outline:hover { background: #ffffff20; color: #fff; }
.hero__meta { display: flex; flex-wrap: wrap; gap: 18px 34px; align-items: center; margin-top: 50px; padding-top: 18px; border-top: 1px solid #ffffff3c; color: #ccd1c9; font-size: 13px; }
.hero__meta strong { color: #e7ae5a; font-size: 21px; margin-right: 6px; }
.hero__meta a { color: #fff; text-decoration-color: #e7ae5a; }
.hero__photos { position: relative; max-height: none; height: min(590px, 49vw); gap: 10px; transform: rotate(1.4deg); }
.hero__main, .hero__side { border-radius: 4px; }
.hero__photo-label { position: absolute; bottom: 18px; left: 18px; padding: 12px 16px; color: #fff; background: #111713da; border-left: 3px solid #e7ae5a; font-size: 10px; letter-spacing: .12em; font-weight: 700; }
.hero__photo-label span { color: #e7ae5a; margin-left: 12px; }
.hero__links { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; margin-top: 24px; border-top: 1px solid #ffffff3c; }
.hero__links a { display: flex; align-items: center; gap: 10px; padding: 20px 18px 22px; color: #d9dacf; border-right: 1px solid #ffffff2b; text-decoration: none; font-size: 11px; }
.hero__links a:first-child { padding-left: 0; }.hero__links a:last-child { border-right: 0; }
.hero__links strong { margin-right: auto; color: #fff; font-size: 14px; font-weight: 550; }.hero__links a:hover strong { color: #e7ae5a; }
@media(max-width:860px){.hero{padding-top:18px}.hero__grid{grid-template-columns:1fr}.hero__text{padding:24px 0 0}.hero__text h1{font-size:clamp(66px,13vw,110px)}.hero__meta{margin-top:32px}.hero__photos{height:340px;transform:none}.hero__links{margin-top:18px}}
@media(max-width:600px){.hero__text h1{font-size:clamp(66px,16vw,88px);margin:24px 0}.hero__photos{height:280px}.hero__links{grid-template-columns:1fr}.hero__links a{border-right:0;border-bottom:1px solid #ffffff2b;padding:13px 0}.hero__links a:last-child{border-bottom:0}.hero__meta{font-size:12px}.hero__cta .btn{flex:1 1 auto}}
</style>
