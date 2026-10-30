<script setup lang="ts">
import { services, serviceUrl } from '~/data/services'
import { servicePhotos } from '~/data/media'

const rows = services.map((s) => ({ ...s, cover: servicePhotos(s.slug).cover }))

usePageSeo({
  title: 'Servicii de renovare și mobilă în Suceava, Iași și București',
  description: 'Renovări, amenajări, mobilă la comandă, fațade, pardoseli și instalații sanitare în județul Suceava, Iași și București.',
  image: rows[0]?.cover,
})
</script>

<template>
  <div>
  <div class="wrap page">
    <Breadcrumbs :items="[{ name: 'Servicii' }]" />
    <header class="head">
      <h1>Servicii</h1>
      <p class="lead">
        Lucrări de renovare, amenajare și mobilă pentru case, apartamente și spații comerciale din județul Suceava, Iași și București.
        Alegeți serviciul pentru detalii despre lucrare, materiale, ce influențează oferta și întrebări frecvente.
      </p>
    </header>

    <ul class="list">
      <li v-for="s in rows" :key="s.slug" v-reveal :data-svc="s.slug">
        <NuxtLink :to="serviceUrl(s.slug)" class="row">
          <span class="row__img" aria-hidden="true">
            <Pic v-if="s.cover" :photo="s.cover" sizes="(max-width: 700px) 100vw, 260px" ratio="4 / 3" alt="" />
            <span v-else-if="s.slug === 'mobila'" class="row__concept concept-cover" />
            <span v-else class="row__ph"><span /></span>
          </span>
          <div class="row__body">
            <h2>{{ s.name }}</h2>
            <span class="row__summary">{{ s.summary }}</span>
            <span class="row__topics">
              <span v-for="sec in s.sections.slice(0, 4)" :key="sec.title">{{ sec.title }}</span>
            </span>
          </div>
          <span class="row__cta" aria-hidden="true">Vezi serviciul <span>↗</span></span>
        </NuxtLink>
      </li>
    </ul>

  </div>
  <section class="section section--otel">
    <div class="wrap">
      <h2 class="steps-title">Cum lucrăm</h2>
      <ProcessSteps />
    </div>
  </section>
  </div>
</template>

<style scoped>
.page {
  padding-top: 20px;
  padding-bottom: var(--section);
}

.head {
  margin-bottom: 22px;
}

.head h1 {
  margin-bottom: 8px;
}

.list {
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 3px solid var(--ink);
}

.row {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr) auto;
  gap: 20px;
  align-items: center;
  margin: 0;
  padding: 14px 0;
  border-bottom: 1px solid var(--line);
  color: var(--ink);
  text-decoration: none;
}

.row:focus-visible { outline: 3px solid var(--svc-d); outline-offset: -3px; }

.row__img {
  display: block;
  overflow: hidden;
  border-radius: var(--r-md);
}

.row__concept, .row__ph {
  display: block;
  aspect-ratio: 4 / 3;
}

.row__ph {
  display: grid;
  place-items: center;
  aspect-ratio: 4 / 3;
  background: var(--concrete);
}

.row__ph span {
  width: 44px;
  height: 44px;
  border-left: 6px solid var(--amber);
  border-bottom: 6px solid var(--amber);
}

.row__body h2 {
  font-size: 1.5rem;
  margin-bottom: 4px;
}

.row:hover h2 {
  text-decoration: underline;
  text-decoration-color: var(--svc-d);
}

.row__summary {
  display: block;
  color: var(--ink-2);
  margin-bottom: 6px;
}

.row__topics {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 14px;
  font-size: 0.85rem;
  color: var(--ink-2);
}

.row__topics span {
  display: inline;
}

.row__topics span + span::before {
  content: '·';
  margin-right: 14px;
  color: var(--amber);
  font-weight: 600;
}

.row__cta {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  color: var(--svc-d);
  font-weight: 700;
  white-space: nowrap;
}
.row__cta span { font-size: 1.5rem; }

.steps-title {
  margin-bottom: 22px;
}

@media (max-width: 900px) {
  .row {
    grid-template-columns: 160px minmax(0, 1fr);
  }

  .row__cta {
    grid-column: 2;
  }
}

@media (max-width: 560px) {
  .row {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .row__cta {
    grid-column: auto;
  }

}

/* Culoare (docs/design/culoare.md) */
.list { border-top: 4px solid var(--amber); }
.row { border-left: 6px solid var(--svc-m); padding-left: 14px; transition: background-color 0.15s ease; }
.row:hover { background: var(--svc-t); border-left-color: var(--svc-d); }
.row__ph { background: var(--svc-m); }
.row__ph span { border-color: var(--svc-d); }
.row__topics span + span::before { color: var(--svc-d); }
</style>
