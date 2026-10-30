<script setup lang="ts">
import type { Service } from '~/data/types'

const props = defineProps<{ service: Service }>()
const atlas = computed(() => `/demo/services/${props.service.slug}.webp`)
const progress = ref(0)
const playing = ref(false)
const labels = computed(() => ({
  interioare: ['Ideea', 'Spațiul brut', 'Instalațiile', 'Placarea', 'Finisajele', 'Amenajarea'],
  mobila: ['Schița', 'Măsurătorile', 'Structura', 'Montajul', 'Detaliile', 'Mobilierul final'],
  'pardoseli-placari': ['Proiectul', 'Suportul', 'Pregătirea', 'Placarea', 'Rosturile', 'Amenajarea'],
  'sape-autonivelante': ['Proiectul', 'Suportul', 'Amorsarea', 'Turnarea', 'Uscarea', 'Pardoseala'],
  'instalatii-sanitare': ['Proiectul', 'Spațiul brut', 'Traseele', 'Închiderea', 'Placarea', 'Dotările'],
  exterioare: ['Proiectul', 'Terenul', 'Pregătirea', 'Pavarea', 'Detaliile', 'Peisajul'],
  fatade: ['Proiectul', 'Zidăria', 'Izolația', 'Armarea', 'Tencuiala', 'Rezultatul'],
  mentenanta: ['Evaluarea', 'Starea inițială', 'Protejarea', 'Reparația', 'Curățarea', 'Rezultatul'],
}[props.service.slug] ?? ['Schița', 'Șantierul', 'Structura', 'Execuția', 'Finisajele', 'Rezultatul']))
const phase = computed(() => Math.min(5, Math.floor(progress.value * 5 + .12)))
let frame = 0
let previous = 0
let endPause = 0
const duration = 8000
const smooth = (n: number) => { const t = Math.min(1, Math.max(0, n)); return t * t * (3 - 2 * t) }

function layer(index: number) {
  const reveal = smooth((progress.value * 5 - index + 1 - .12) / .75)
  const position = `${(index % 3) * 50}% ${index < 3 ? 0 : 100}%`
  const masks = [undefined, `inset(${(1-reveal)*100}% 0 0)`, `inset(0 ${(1-reveal)*100}% 0 0)`, `inset(0 0 ${(1-reveal)*100}% 0)`, `inset(${(1-reveal)*100}% 0 0)`]
  return {
    backgroundImage: `url('${atlas.value}')`,
    backgroundPosition: position,
    clipPath: masks[index] ?? 'none',
    opacity: index === 0 ? 1 : index === 5 ? reveal : reveal > 0 ? 1 : 0,
  }
}

function tick(time: number) {
  if (!playing.value) return
  if (document.hidden) { previous = time; frame = requestAnimationFrame(tick); return }
  if (progress.value >= 1) {
    if (!endPause) endPause = time
    if (time - endPause > 1600) { progress.value = 0; endPause = 0 }
  } else if (previous) progress.value = Math.min(1, progress.value + (time - previous) / duration)
  previous = time
  frame = requestAnimationFrame(tick)
}

function toggle() {
  if (playing.value) { playing.value = false; cancelAnimationFrame(frame); previous = 0; return }
  if (progress.value >= 1) progress.value = 0
  endPause = 0
  previous = 0
  playing.value = true
  frame = requestAnimationFrame(tick)
}

function jump(index: number) {
  playing.value = false
  cancelAnimationFrame(frame)
  previous = 0
  progress.value = index / 5
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) progress.value = 1
  else toggle()
})
onBeforeUnmount(() => cancelAnimationFrame(frame))
</script>

<template>
  <div class="build-bg" :aria-label="`Transformarea vizuală: ${service.name}`">
    <div class="build-bg__scene" aria-hidden="true">
      <div v-for="(_, i) in labels" :key="i" class="build-bg__layer" :style="layer(i)" />
    </div>
    <div class="build-bg__shade" aria-hidden="true" />
    <div class="build-bg__controls">
      <div class="build-bg__current"><span>0{{ phase + 1 }} / 06</span><strong>{{ labels[phase] }}</strong></div>
      <nav aria-label="Etapele animației">
        <button v-for="(label, i) in labels" :key="i" type="button" :class="{ active: phase === i }" :aria-label="`Etapa ${i + 1}: ${label}`" @click="jump(i)"><span /></button>
      </nav>
      <button type="button" class="build-bg__play" :aria-label="playing ? 'Pauză animație' : 'Pornește animația'" @click="toggle">{{ playing ? 'Ⅱ' : '▶' }}</button>
    </div>
  </div>
</template>

<style scoped>
.build-bg{position:absolute;inset:0;z-index:0;overflow:hidden;pointer-events:none;background:#f2eee5}
.build-bg__scene{position:absolute;top:0;right:0;width:min(62vw,720px);aspect-ratio:1;overflow:hidden}
.build-bg__layer{position:absolute;inset:0;background-size:300% 200%;background-repeat:no-repeat;will-change:clip-path,opacity}
.build-bg__shade{position:absolute;inset:0;background:linear-gradient(90deg,#f2eee5 8%,#f2eee5f2 31%,#f2eee550 68%,#f2eee508 100%),linear-gradient(0deg,#f2eee5 0%,transparent 28%)}
.build-bg__controls{position:absolute;right:max(24px,calc((100vw - 1200px)/2));bottom:24px;display:flex;align-items:center;gap:16px;color:#fff;pointer-events:auto;background:#0b110dcc;border:1px solid #ffffff35;border-radius:100px;padding:8px 11px 8px 17px;backdrop-filter:blur(8px)}
.build-bg__current{display:flex;align-items:center;gap:9px;white-space:nowrap;font-size:12px}.build-bg__current span{color:#e6ad57;font-size:10px;letter-spacing:.1em}.build-bg__current strong{font-weight:600}
.build-bg nav{display:flex;gap:5px}.build-bg nav button{width:18px;height:26px;padding:0;border:0;background:transparent;cursor:pointer}.build-bg nav button span{display:block;height:3px;background:#ffffff80;border-radius:10px}.build-bg nav button.active span{background:#e6ad57}
.build-bg__play{width:31px;height:31px;flex:none;border:1px solid #e6ad57;border-radius:50%;background:#e6ad57;color:#101613;cursor:pointer;font-size:13px}
@media(max-width:860px){.build-bg__scene{width:100%;max-width:580px;left:50%;right:auto;transform:translateX(-50%)}.build-bg__shade{background:linear-gradient(0deg,#f2eee5 12%,#f2eee5bb 42%,transparent 76%)}.build-bg__controls{top:min(100vw,580px);bottom:auto;right:16px;transform:translateY(-100%);gap:9px}.build-bg__current{font-size:10px}.build-bg nav button{width:11px}}
@media(max-width:420px){.build-bg__controls{right:10px;padding:6px 8px 6px 11px}.build-bg__current{gap:5px}.build-bg nav{gap:3px}}
</style>
