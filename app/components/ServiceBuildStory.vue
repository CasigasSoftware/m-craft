<script setup lang="ts">
import type { Service } from '~/data/types'

const props = defineProps<{ service: Service }>()
const atlas = computed(() => `/demo/services/${props.service.slug}.webp`)
const root = ref<HTMLElement | null>(null)
const progress = ref(0)
const playing = ref(false)
let frame = 0
let last = 0

const names = ['Schița', 'Șantierul', 'Structura', 'Execuția', 'Finisajele', 'Rezultatul']
const labels = computed(() => {
  const variants: Record<string, string[]> = {
    interioare: ['Ideea', 'Spațiul brut', 'Instalațiile', 'Placarea', 'Finisajele', 'Amenajarea'],
    'pardoseli-placari': ['Proiectul', 'Suportul', 'Pregătirea', 'Placarea', 'Rosturile', 'Amenajarea'],
    'sape-autonivelante': ['Proiectul', 'Suportul', 'Amorsarea', 'Turnarea', 'Uscarea', 'Pardoseala'],
    'instalatii-sanitare': ['Proiectul', 'Spațiul brut', 'Traseele', 'Închiderea', 'Placarea', 'Dotările'],
    exterioare: ['Proiectul', 'Terenul', 'Pregătirea', 'Pavarea', 'Detaliile', 'Peisajul'],
    fatade: ['Proiectul', 'Zidăria', 'Izolația', 'Armarea', 'Tencuiala', 'Rezultatul'],
    mentenanta: ['Evaluarea', 'Starea inițială', 'Protejarea', 'Reparația', 'Curățarea', 'Rezultatul'],
  }
  return variants[props.service.slug] ?? names
})
const finalHeadline = computed(() => ({
  interioare: 'Un interior, complet transformat.',
  'pardoseli-placari': 'Pardoseala care schimbă totul.',
  'sape-autonivelante': 'Baza perfectă pentru finisaj.',
  'instalatii-sanitare': 'Confort în fiecare detaliu.',
  exterioare: 'Un exterior de care te bucuri.',
  fatade: 'O fațadă cu totul nouă.',
  mentenanta: 'Frumusețea, adusă înapoi.',
}[props.service.slug] ?? 'Din schiță, un spațiu nou.'))
const phase = computed(() => Math.min(5, Math.floor(progress.value * 5 + .15)))
const smooth = (n: number) => { const t = Math.min(1, Math.max(0, n)); return t * t * (3 - 2 * t) }
function layer(index: number) {
  const reveal = smooth((progress.value * 5 - index + 1 - .13) / .74)
  const offset = `${(index % 3) * 50}% ${index < 3 ? 0 : 100}%`
  const masks = [undefined, `inset(${(1-reveal)*100}% 0 0)`, `inset(0 ${(1-reveal)*100}% 0 0)`, `inset(0 0 ${(1-reveal)*100}% 0)`, `inset(${(1-reveal)*100}% 0 0)`]
  return { backgroundImage: `url('${atlas.value}')`, backgroundPosition: offset, clipPath: masks[index] ?? 'none', opacity: index === 0 ? 1 : index === 5 ? reveal : reveal > 0 ? 1 : 0 }
}
function sync() {
  if (!root.value || playing.value) return
  const r = root.value.getBoundingClientRect()
  progress.value = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - innerHeight)))
}
function seek(value: number) {
  progress.value = Math.min(1, Math.max(0, value))
  if (!root.value) return
  const top = root.value.getBoundingClientRect().top + scrollY
  scrollTo({ top: top + progress.value * (root.value.offsetHeight - innerHeight), behavior: 'instant' })
}
function stop() { playing.value = false; cancelAnimationFrame(frame); last = 0 }
function tick(time: number) {
  if (!playing.value) return
  if (last) seek(progress.value + (time - last) / 9500)
  last = time
  if (progress.value >= 1) { stop(); return }
  frame = requestAnimationFrame(tick)
}
function toggle() {
  if (playing.value) { stop(); return }
  if (progress.value > .98) seek(0)
  playing.value = true
  frame = requestAnimationFrame(tick)
}
function jump(index: number) { stop(); seek(index / 5) }
function scrub(event: Event) { stop(); seek(Number((event.target as HTMLInputElement).value) / 1000) }
onMounted(() => {
  sync()
  addEventListener('scroll', sync, { passive: true })
  addEventListener('resize', sync)
  addEventListener('wheel', stop, { passive: true })
  addEventListener('touchstart', stop, { passive: true })
})
onBeforeUnmount(() => {
  stop()
  removeEventListener('scroll', sync)
  removeEventListener('resize', sync)
  removeEventListener('wheel', stop)
  removeEventListener('touchstart', stop)
})
</script>

<template>
  <section ref="root" class="build" :aria-label="`Transformarea vizuală: ${service.name}`">
    <div class="build__sticky">
      <div class="build__scene" aria-hidden="true"><div v-for="(_, i) in labels" :key="i" class="build__layer" :style="layer(i)"></div></div>
      <div class="build__shade"></div>
      <div class="build__top"><span>M—CRAFT <i>/</i> {{ service.shortName }}</span><span>DE LA SCHIȚĂ LA REALITATE</span></div>
      <div class="build__headline" :key="phase">
        <p>0{{ phase + 1 }} <span>/ 06</span> · {{ labels[phase] }}</p>
        <h2>{{ phase === 0 ? 'Orice lucrare începe cu o idee.' : phase === 5 ? finalHeadline : labels[phase] }}</h2>
        <span>{{ service.name }} · o vizualizare a etapelor de lucru</span>
      </div>
      <div class="build__controls">
        <div class="build__actions"><button type="button" @click="toggle">{{ playing ? 'Ⅱ Pauză' : progress > .98 ? '▶ Reia animația' : '▶ Vezi animația' }}</button><span>DERULEAZĂ PENTRU A CONSTRUI ↓</span><NuxtLink to="#oferta">Cere o ofertă ↗</NuxtLink></div>
        <input type="range" min="0" max="1000" :value="Math.round(progress * 1000)" :style="{ '--value': `${progress * 100}%` }" :aria-label="`Progresul animației pentru ${service.name}`" @input="scrub" />
        <nav aria-label="Etapele animației"><button v-for="(label, i) in labels" :key="i" type="button" :class="{ active: phase === i }" @click="jump(i)"><small>0{{ i + 1 }}</small>{{ label }}</button></nav>
        <p>Vizualizare de concept generată · fotografiile reale ale M-CRAFT sunt mai jos.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.build{height:360svh;background:#111612;color:#fff}.build__sticky{position:sticky;top:0;height:100svh;min-height:500px;overflow:hidden;isolation:isolate}.build__scene{position:absolute;inset:0;z-index:-2}.build__layer{position:absolute;inset:0;background-size:300% 200%;background-repeat:no-repeat;will-change:clip-path,opacity}.build__shade{position:absolute;inset:0;z-index:-1;background:linear-gradient(#090d0ba6,transparent 30%,transparent 52%,#090d0beb),linear-gradient(90deg,#080c0baa,transparent 68%);pointer-events:none}.build__top{position:absolute;top:0;left:0;right:0;display:flex;justify-content:space-between;gap:20px;padding:25px 5vw;font-size:10px;font-weight:700;letter-spacing:.15em}.build__top i{font-style:normal;color:#e5b768;padding:0 9px}.build__headline{position:absolute;top:26%;left:5vw;max-width:600px;animation:up .25s ease}.build__headline p{font-size:11px;letter-spacing:.2em;color:#e5b768;text-transform:uppercase}.build__headline p span{color:#ddd}.build__headline h2{color:#fff;font:400 clamp(44px,6vw,88px)/1.03 Georgia,serif;letter-spacing:-.04em;margin:19px 0;text-shadow:0 2px 20px #0005}.build__headline>span{color:#eee;font-size:13px;text-shadow:0 1px 8px #000}.build__controls{position:absolute;bottom:10px;left:5vw;right:5vw}.build__actions{display:flex;align-items:center;gap:30px;margin-bottom:14px;font-size:10px;letter-spacing:.15em}.build__actions button{padding:11px 17px;border:1px solid #e5b768;background:#141b18a8;border-radius:30px;color:#fff;font:600 11px Arial;cursor:pointer;letter-spacing:0}.build__actions button:hover{background:#e5b768;color:#121713}.build__actions a{margin-left:auto;color:#e5b768;text-decoration:none;letter-spacing:0;font-weight:700;font-size:12px}.build input{appearance:none;-webkit-appearance:none;width:100%;height:22px;margin:0;background:transparent;cursor:ew-resize}.build input::-webkit-slider-runnable-track{height:2px;background:linear-gradient(90deg,#e5b768 var(--value),#ffffff70 var(--value))}.build input::-webkit-slider-thumb{appearance:none;width:12px;height:12px;border-radius:50%;background:#e5b768;margin-top:-5px}.build input::-moz-range-track{height:2px;background:#fff7}.build input::-moz-range-progress{height:2px;background:#e5b768}.build input::-moz-range-thumb{width:12px;height:12px;border:0;border-radius:50%;background:#e5b768}.build nav{display:grid;grid-template-columns:repeat(6,1fr);gap:8px;margin-top:7px}.build nav button{background:none;border:0;text-align:left;color:#d0d0c8;display:flex;gap:8px;align-items:center;font-size:11px;cursor:pointer;padding:4px 0}.build nav button small{color:#9d9f98}.build nav button.active,.build nav button.active small,.build nav button:hover{color:#e5b768}.build__controls>p{font-size:9px;color:#acb0a8;margin:15px 0 0}@keyframes up{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}@media(min-aspect-ratio:16/9){.build__scene{height:56.25vw;top:50%;transform:translateY(-50%)}}@media(max-aspect-ratio:16/9){.build__scene{width:177.78svh;left:50%;transform:translateX(-50%)}}@media(max-width:700px){.build__top{padding:20px 5vw}.build__top>span:last-child{display:none}.build__headline{top:23%}.build__headline h2{font-size:clamp(37px,9vw,58px)}.build__actions{gap:10px}.build__actions>span{display:none}.build nav button{font-size:9px;display:block}.build nav button small{display:block;margin-bottom:5px}.build__controls>p{font-size:8px}}@media(max-height:580px) and (min-width:700px){.build__headline{top:19%}.build__headline h2{font-size:47px}.build__controls{bottom:5px}.build__actions{margin-bottom:5px}}@media(prefers-reduced-motion:reduce){.build__headline{animation:none}}
.build__sticky{overflow:clip}
</style>
