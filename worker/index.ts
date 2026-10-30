interface Env { ASSETS: { fetch(request: Request): Promise<Response> } }

// Salted digest only. The unlock password is not committed in source or built assets.
const SALT = 'f86677dfaeb4300482b4f34ebd5dfa32'
const DIGEST = 'bd18a3b7361fbb02af4feb71b4de91374d61af266447523020248a0168d0b181'
const COOKIE = 'mcraft_maintenance'

async function valid(password: string): Promise<boolean> {
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(SALT + password))
  const actual = Array.from(new Uint8Array(bytes), b => b.toString(16).padStart(2, '0')).join('')
  let difference = 0
  for (let i = 0; i < DIGEST.length; i++) difference |= actual.charCodeAt(i) ^ DIGEST.charCodeAt(i)
  return difference === 0
}

function page(error = false): Response {
  const html = `<!doctype html><html lang="ro"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow,noarchive"><title>M-CRAFT · Revenim curând</title><style>
  *{box-sizing:border-box}html,body{min-height:100%;margin:0}body{font-family:Arial,sans-serif;background:#101413;color:#f7f2e8;display:grid;place-items:center;padding:24px;background-image:radial-gradient(circle at 70% 20%,#473a25 0,transparent 45%)}main{width:min(100%,630px);padding:clamp(26px,6vw,65px);border:1px solid #d4ae6b55;background:#0c1110b8;box-shadow:0 20px 80px #0005}.brand{font-weight:700;font-size:29px;letter-spacing:.07em}.brand span{color:#dbad62}.kicker{margin-top:70px;color:#dbad62;font-size:11px;letter-spacing:.2em}h1{font:normal clamp(46px,8vw,84px)/.98 Georgia,serif;letter-spacing:-.05em;margin:20px 0}p{line-height:1.6;color:#cecfc8;max-width:440px}.rule{width:60px;height:2px;background:#dbad62;margin:32px 0}form{display:flex;gap:10px;margin-top:26px}input{flex:1;min-width:0;padding:14px;background:#181e1b;color:white;border:1px solid #ffffff80;font:inherit}button{background:#dbad62;border:0;color:#171713;padding:14px 18px;cursor:pointer;font-weight:700}button:hover{background:#f0c982}.error{color:#ffb3a9}.foot{margin-top:46px;font-size:11px;letter-spacing:.12em;color:#9eaa9d}@media(max-width:500px){form{flex-direction:column}}
  </style></head><body><main><div class="brand">M<span>—</span>CRAFT</div><div class="kicker">CONSTRUCȚII & RENOVĂRI · VICOV DE SUS</div><h1>Construim<br>ce urmează.</h1><div class="rule"></div><p>Site-ul se află în mentenanță. Revenim în curând cu o experiență nouă pentru fiecare serviciu.</p><p>Ai acces la previzualizare? Introdu parola mai jos.</p><form action="/__maintenance/login" method="post"><input type="password" name="password" aria-label="Parolă de acces" autocomplete="current-password" required><button type="submit">Intră pe site →</button></form>${error ? '<p class="error" role="alert">Parola nu este corectă. Încearcă din nou.</p>' : ''}<div class="foot">M-CRAFT · LUCRĂM LA DETALII</div></main></body></html>`
  return new Response(html, { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'Retry-After': '3600', 'X-Robots-Tag': 'noindex, nofollow', 'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'" } })
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    if (url.pathname === '/__maintenance/login' && request.method === 'POST') {
      const body = await request.formData()
      const password = String(body.get('password') ?? '')
      if (password.length > 128 || !(await valid(password))) return page(true)
      const encoded = btoa(password)
      return new Response(null, { status: 303, headers: {
        Location: '/',
        'Set-Cookie': `${COOKIE}=${encoded}; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=28800`,
        'Cache-Control': 'no-store',
      } })
    }
    if (url.pathname === '/__maintenance/logout') {
      return new Response(null, { status: 303, headers: { Location: '/', 'Set-Cookie': `${COOKIE}=; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=0`, 'Cache-Control': 'no-store' } })
    }
    const raw = request.headers.get('Cookie')?.match(/(?:^|;\s*)mcraft_maintenance=([^;]+)/)?.[1]
    let password = ''
    try { if (raw && raw.length < 256) password = atob(raw) } catch { /* malformed cookie */ }
    if (!(await valid(password))) {
      if (request.method !== 'GET' && request.method !== 'HEAD') return new Response('Unauthorized', { status: 401, headers: { 'Cache-Control': 'no-store' } })
      const acceptsHtml = request.headers.get('Accept')?.includes('text/html')
      return acceptsHtml || url.pathname === '/' ? page() : new Response('Unauthorized', { status: 401, headers: { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' } })
    }
    return env.ASSETS.fetch(request)
  },
}
