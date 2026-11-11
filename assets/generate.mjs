// Generates animated SVGs for the GitHub profile README.
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const OUT = process.argv[2];
mkdirSync(OUT, { recursive: true });

const BG = '#0a0e19', PANEL = '#0d1322', INK = '#f0f4ff', MUTED = '#8391b3', DIM = '#55617f', LINE = '#1c2742', BLUE = '#a8bbff', OK = '#7ee0a1';
const MONO = `ui-monospace,SFMono-Regular,'Cascadia Code',Consolas,Menlo,monospace`;
const SANS = `'Segoe UI',Inter,Helvetica,Arial,sans-serif`;
const SERIF = `Georgia,'Times New Roman',serif`;
const S_PATH = 'M32 0H144V32H48V64H112L144 96V144L112 176H0V144H96V112H32L0 80V32Z';
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

const svg = (w, h, body, label) =>
  `<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}">\n${body}\n</svg>\n`;

const grid = (id, size, color, op) =>
  `<pattern id="${id}" width="${size}" height="${size}" patternUnits="userSpaceOnUse"><path d="M${size} 0H0V${size}" fill="none" stroke="${color}" stroke-width=".7" opacity="${op}"/></pattern>`;

// typing reveal: discrete width steps on a clip rect
function typed(id, x, y, chars, begin, cw = 8.43, speed = 0.012) {
  const vals = [];
  for (let i = 0; i <= chars; i++) vals.push((i * cw).toFixed(1));
  const dur = Math.max(chars * speed, 0.1).toFixed(2);
  return {
    def: `<clipPath id="${id}"><rect x="${x - 2}" y="${y - 16}" height="22" width="0"><animate attributeName="width" values="${vals.join(';')}" calcMode="discrete" dur="${dur}s" begin="${begin}s" fill="freeze"/></rect></clipPath>`,
    end: begin + chars * speed,
  };
}

/* ------------------------------------------------------------------ hero */
function hero() {
  const W = 1000, H = 360;
  const lines = [
    ['[    0.000000]', 'Booting salimov/kernel on x86_64 ...', null],
    ['[    0.000412]', 'cpu0: C++ · C# · TypeScript', 'ok'],
    ['[    0.001337]', 'locale: Tashkent, Uzbekistan (UTC+05:00)', 'ok'],
    ['[    0.004096]', 'first_driver.sys: DriverEntry() -> 0', 'ok'],
    ['[    0.008192]', 'ipc: ring buffer mapped at 0x7FFE0000', 'ok'],
  ];
  const defs = [], body = [];
  let t = 0.4;
  lines.forEach(([ts, msg, tag], i) => {
    const y = 92 + i * 24;
    const full = `${ts} ${msg}`;
    const tp = typed(`l${i}`, 40, y, full.length, t);
    defs.push(tp.def);
    body.push(`<text x="40" y="${y}" clip-path="url(#l${i})" font-family="${MONO}" font-size="14"><tspan fill="${DIM}">${ts}</tspan> <tspan fill="${INK}">${esc(msg)}</tspan></text>`);
    if (tag) body.push(`<text x="548" y="${y}" font-family="${MONO}" font-size="14" fill="${DIM}" opacity="0">[ <tspan fill="${OK}">${tag}</tspan> ]<set attributeName="opacity" to="1" begin="${(tp.end + 0.12).toFixed(2)}s" fill="freeze"/></text>`);
    t = tp.end + 0.14;
  });
  const nameAt = (t + 0.2).toFixed(2);
  const subAt = (t + 0.9).toFixed(2);

  // extruded S monogram
  let mono = '';
  for (let d = 16; d >= 1; d--) mono += `<path d="${S_PATH}" transform="translate(${d} ${d})" fill="#3d4c93" stroke="#2c3a75" stroke-width="1.4"/>`;
  mono += `<path d="${S_PATH}" fill="url(#metal)" stroke="#475791" stroke-width="1.6"/>`;

  return svg(W, H, `<defs>
<radialGradient id="plate" cx="78%" cy="30%" r="90%"><stop stop-color="#1a2547"/><stop offset=".55" stop-color="#0d1322"/><stop offset="1" stop-color="${BG}"/></radialGradient>
<linearGradient id="metal" x2="85%" y2="100%"><stop stop-color="#e2faff"/><stop offset=".48" stop-color="#a5caff"/><stop offset="1" stop-color="#897de6"/></linearGradient>
<linearGradient id="nameInk" x2="100%"><stop stop-color="#f0f4ff"/><stop offset=".6" stop-color="#bcd0ff"/><stop offset="1" stop-color="#a59cff"/></linearGradient>
<radialGradient id="glow"><stop stop-color="#7f8cff" stop-opacity=".45"/><stop offset="1" stop-color="#7f8cff" stop-opacity="0"/></radialGradient>
${grid('g', 24, '#2a3a63', 0.55)}
<clipPath id="frame"><rect width="${W}" height="${H}" rx="18"/></clipPath>
${defs.join('\n')}
</defs>
<g clip-path="url(#frame)">
<rect width="${W}" height="${H}" fill="url(#plate)"/>
<rect width="${W}" height="${H}" fill="url(#g)"/>
<rect width="${W}" height="38" fill="#0a0f1d" opacity=".85"/>
<line x1="0" y1="38" x2="${W}" y2="38" stroke="${LINE}"/>
<circle cx="24" cy="19" r="6" fill="#ff6b6b" opacity=".85"/><circle cx="44" cy="19" r="6" fill="#ffd166" opacity=".85"/><circle cx="64" cy="19" r="6" fill="#7ee0a1" opacity=".85"/>
<text x="${W / 2}" y="24" text-anchor="middle" font-family="${MONO}" font-size="12" fill="${MUTED}">sardor@tashkent: ~ — dmesg | tail</text>
<rect y="-60" width="${W}" height="60" fill="#a8bbff" opacity=".035"><animate attributeName="y" values="-60;${H}" dur="7s" repeatCount="indefinite"/></rect>
${body.join('\n')}
<g opacity="0"><set attributeName="opacity" to="1" begin="${nameAt}s" fill="freeze"/>
  <animateTransform attributeName="transform" type="translate" values="0 14;0 0" dur=".7s" begin="${nameAt}s" fill="freeze" calcMode="spline" keySplines=".2 .8 .2 1"/>
  <animate attributeName="opacity" values="0;1" dur=".7s" begin="${nameAt}s" fill="freeze"/>
  <text x="36" y="268" font-family="${SERIF}" font-style="italic" font-size="62" fill="url(#nameInk)">Sardor Salimov.</text>
</g>
<g opacity="0"><animate attributeName="opacity" values="0;1" dur=".6s" begin="${subAt}s" fill="freeze"/>
  <text x="40" y="310" font-family="${SANS}" font-size="19" fill="${INK}">Systems developer — <tspan fill="${BLUE}">I read what Windows keeps quiet.</tspan></text>
  <text x="40" y="338" font-family="${MONO}" font-size="13" fill="${MUTED}">C:\\Users\\sardor&gt; </text><rect x="174" y="327" width="8" height="15" fill="${BLUE}"><animate attributeName="opacity" values="1;0" calcMode="discrete" dur="1.1s" repeatCount="indefinite"/></rect>
</g>
<circle cx="800" cy="190" r="180" fill="url(#glow)"><animate attributeName="r" values="165;190;165" dur="6s" repeatCount="indefinite"/></circle>
<g transform="translate(800 196)">
  <ellipse rx="170" ry="52" fill="none" stroke="#a8bbff" stroke-opacity=".22" stroke-dasharray="3 7" transform="rotate(-18)"/>
  <ellipse rx="130" ry="150" fill="none" stroke="#a59cff" stroke-opacity=".14" stroke-dasharray="2 9" transform="rotate(24)"/>
  <g transform="rotate(-18)"><circle r="4.5" fill="${BLUE}"><animateMotion dur="9s" repeatCount="indefinite" path="M170 0A170 52 0 1 1 -170 0A170 52 0 1 1 170 0"/></circle></g>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 6;0 -8;0 6" dur="6s" repeatCount="indefinite" calcMode="spline" keySplines=".45 0 .55 1;.45 0 .55 1"/>
    <g transform="rotate(-10) scale(1.05) translate(-80 -96)">${mono}</g>
  </g>
</g>
<text x="${W - 20}" y="${H - 16}" text-anchor="end" font-family="${MONO}" font-size="11" fill="${DIM}">@SALIMOVONE · S/S</text>
</g>
<rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="18" fill="none" stroke="#2a3a63"/>`, 'Sardor Salimov — systems developer, Tashkent, Uzbekistan');
}

/* ----------------------------------------------------------- project card */
function card({ id, accent, tag, title, desc, foot, art, label }) {
  const W = 1000, H = 230;
  return svg(W, H, `<defs>
<linearGradient id="wash" x2="1" y2=".4"><stop stop-color="${PANEL}"/><stop offset=".55" stop-color="${PANEL}"/><stop offset="1" stop-color="${accent}" stop-opacity=".16"/></linearGradient>
${grid('g', 16, accent, 0.09)}
<clipPath id="frame"><rect width="${W}" height="${H}" rx="16"/></clipPath>
</defs>
<g clip-path="url(#frame)">
<rect width="${W}" height="${H}" fill="${BG}"/>
<rect width="${W}" height="${H}" fill="url(#wash)"/>
<rect x="540" width="${W - 540}" height="${H}" fill="url(#g)"/>
<rect width="4" height="${H}" fill="${accent}"/>
<text x="40" y="56" font-family="${MONO}" font-size="13" letter-spacing="2" fill="${accent}">${tag}</text>
<text x="38" y="100" font-family="${SANS}" font-weight="700" font-size="34" fill="${INK}">${title}</text>
${desc.map((d, i) => `<text x="40" y="${138 + i * 24}" font-family="${SANS}" font-size="16" fill="${MUTED}">${esc(d)}</text>`).join('\n')}
<text x="40" y="206" font-family="${MONO}" font-size="12" fill="${DIM}">${esc(foot)}</text>
${art}
</g>
<rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="16" fill="none" stroke="${accent}" stroke-opacity=".28"/>`, label);
}

function sharedMemory() {
  const A = '#5fd4d8', cx = 770, cy = 115, r = 64, N = 12, step = 0.75, D = N * step, lag = 4;
  let slots = '';
  for (let i = 0; i < N; i++) {
    const on = lag / N;
    slots += `<g transform="rotate(${i * 30} ${cx} ${cy})"><rect x="${cx - 13}" y="${cy - r - 11}" width="26" height="22" rx="5" fill="#16233a" stroke="${A}" stroke-opacity=".35">
<animate attributeName="fill" values="#16233a;${A};#2a8f95;#16233a;#16233a" keyTimes="0;.01;${(on - 0.01).toFixed(3)};${on.toFixed(3)};1" dur="${D}s" begin="${(i * step).toFixed(2)}s" repeatCount="indefinite"/></rect></g>`;
  }
  const pointer = (lab, color, from) => `<g><animateTransform attributeName="transform" type="rotate" from="${from} ${cx} ${cy}" to="${from + 360} ${cx} ${cy}" dur="${D}s" repeatCount="indefinite"/>
<path d="M${cx} ${cy - r + 16}l-6 10h12z" fill="${color}"/></g>`;
  const box = (x, name, sub) => `<rect x="${x}" y="${cy - 26}" width="104" height="52" rx="8" fill="#0f1a2c" stroke="${A}" stroke-opacity=".55"/>
<text x="${x + 52}" y="${cy - 3}" text-anchor="middle" font-family="${MONO}" font-size="12" fill="${INK}">${name}</text>
<text x="${x + 52}" y="${cy + 14}" text-anchor="middle" font-family="${MONO}" font-size="10" fill="${MUTED}">${sub}</text>`;
  const flow = (x1, x2) => `<line x1="${x1}" y1="${cy}" x2="${x2}" y2="${cy}" stroke="${A}" stroke-width="2" stroke-dasharray="4 6"><animate attributeName="stroke-dashoffset" values="20;0" dur=".8s" repeatCount="indefinite"/></line>`;
  const art = `${flow(674, 694)}${flow(846, 866)}
${box(570, 'producer', 'write(head)')}${box(866, 'consumer', 'read(tail)')}
${slots}
${pointer('W', A, 0)}${pointer('R', '#c7f3f4', -lag * 30)}
<text x="${cx}" y="${cy + 4}" text-anchor="middle" font-family="${MONO}" font-size="11" fill="${MUTED}">0x7FFE</text>`;
  return card({
    id: 'shm', accent: A, tag: 'PROCESS COMMUNICATION · C#', title: 'Shared memory',
    desc: ['Two processes, one memory-mapped ring buffer.', 'The producer writes at the head, the consumer chases the tail.'],
    foot: '→ salimovone/Inter-process-communication', art,
    label: 'Shared memory: a producer and a consumer process exchanging messages through a ring buffer',
  });
}

function kernelDriver() {
  const A = '#a59cff';
  const loop = 'M712 70H806V170H850V182H784V82H712Z';
  const art = `<rect x="560" y="36" width="410" height="68" rx="10" fill="#151a33" stroke="${A}" stroke-opacity=".25"/>
<rect x="560" y="132" width="410" height="68" rx="10" fill="#1d1838" stroke="${A}" stroke-opacity=".4"/>
<text x="958" y="56" text-anchor="end" font-family="${MONO}" font-size="10" letter-spacing="1.5" fill="${MUTED}">USER MODE · RING 3</text>
<text x="958" y="194" text-anchor="end" font-family="${MONO}" font-size="10" letter-spacing="1.5" fill="${A}">KERNEL MODE · RING 0</text>
<line x1="548" y1="118" x2="982" y2="118" stroke="${A}" stroke-width="1.5" stroke-dasharray="8 6"><animate attributeName="stroke-dashoffset" values="0;-28" dur="1.4s" repeatCount="indefinite"/></line>
<rect x="580" y="52" width="132" height="36" rx="7" fill="#0f1426" stroke="${A}" stroke-opacity=".7"/>
<text x="646" y="75" text-anchor="middle" font-family="${MONO}" font-size="12" fill="${INK}">main.cpp</text>
<rect x="850" y="148" width="104" height="36" rx="7" fill="#0f1426" stroke="${A}"/>
<text x="902" y="171" text-anchor="middle" font-family="${MONO}" font-size="12" fill="${INK}">DriverEntry</text>
<path d="${loop}" fill="none" stroke="${A}" stroke-opacity=".3" stroke-width="1.5"/>
<text x="814" y="112" font-family="${MONO}" font-size="10" fill="${MUTED}">DeviceIoControl ↓</text>
<text x="776" y="140" text-anchor="end" font-family="${MONO}" font-size="10" fill="${MUTED}">↑ IoCompleteRequest</text>
<g><animateMotion dur="3.6s" repeatCount="indefinite" path="${loop}"/>
<rect x="-14" y="-8" width="28" height="16" rx="4" fill="${A}"/><text y="4" text-anchor="middle" font-family="${MONO}" font-size="9" font-weight="700" fill="#14112b">IRP</text></g>`;
  return card({
    id: 'kd', accent: A, tag: 'WINDOWS KERNEL · C++', title: 'First kernel driver',
    desc: ['A user-mode program talks to my first kernel-mode driver.', 'One request goes down through the boundary and comes back.'],
    foot: '→ salimovone/first_driver', art,
    label: 'First kernel driver: an I/O request packet travelling from user mode into kernel mode and back',
  });
}

function memoryMonitor() {
  const A = '#8fd18a';
  const x0 = 580, x1 = 956, yTop = 58, yBot = 196;
  const pts = [];
  for (let i = 0; i <= 47; i++) {
    const x = x0 + (i * (x1 - x0)) / 47;
    const v = 0.5 + 0.22 * Math.sin(i * 0.45) + 0.13 * Math.sin(i * 1.3 + 1) + (i > 30 && i < 35 ? 0.18 : 0);
    pts.push(`${x.toFixed(1)},${(yBot - v * (yBot - yTop) * 0.9).toFixed(1)}`);
  }
  const len = 900;
  const readings = ['2.84', '3.12', '2.97', '3.41', '3.05'];
  const rd = readings.map((v, i) => {
    const kt = readings.map((_, j) => (j === i ? 1 : 0)).join(';');
    return `<text x="956" y="48" text-anchor="end" font-family="${MONO}" font-size="20" font-weight="700" fill="${A}" opacity="${i ? 0 : 1}">${v} MB<animate attributeName="opacity" values="${kt};${i === 0 ? 1 : 0}" calcMode="discrete" dur="5s" repeatCount="indefinite"/></text>`;
  });
  const art = `<text x="580" y="34" font-family="${MONO}" font-size="11" fill="${MUTED}">notepad.exe · private working set</text>
${rd.join('\n')}
<line x1="${x0}" y1="${yBot}" x2="${x1}" y2="${yBot}" stroke="${A}" stroke-opacity=".35"/>
${[0.25, 0.5, 0.75].map((f) => `<line x1="${x0}" x2="${x1}" y1="${yBot - f * (yBot - yTop)}" y2="${yBot - f * (yBot - yTop)}" stroke="${A}" stroke-opacity=".1"/>`).join('')}
<polyline points="${x0},${yBot} ${pts.join(' ')} ${x1},${yBot}" fill="${A}" fill-opacity=".07"/>
<polyline points="${pts.join(' ')}" fill="none" stroke="${A}" stroke-width="2.2" stroke-linejoin="round" stroke-dasharray="${len}" stroke-dashoffset="${len}"><animate attributeName="stroke-dashoffset" values="${len};0;0;${-len}" keyTimes="0;.55;.8;1" dur="5s" repeatCount="indefinite"/></polyline>
<line y1="${yTop - 8}" y2="${yBot}" stroke="${A}" stroke-opacity=".5"><animate attributeName="x1" values="${x0};${x1}" dur="2.75s" repeatCount="indefinite"/><animate attributeName="x2" values="${x0};${x1}" dur="2.75s" repeatCount="indefinite"/></line>`;
  return card({
    id: 'mm', accent: A, tag: 'MEMORY DIAGNOSTICS · C#', title: 'Process Resource Monitor',
    desc: ['How much private memory is Notepad using right now?', 'A Windows performance counter knows — this reads it in MB.'],
    foot: '→ salimovone/ProcessResourceMonitor', art,
    label: 'Process Resource Monitor: a live graph of Notepad private working set in megabytes',
  });
}

/* ---------------------------------------------------------- address space */
function addressSpace() {
  const W = 1000, H = 200, x0 = 40, x1 = 960, y = 78, h = 50;
  const segs = [
    ['C++', 20, '#a59cff'], ['C#', 20, '#8f9dff'], ['Win32 API', 15, '#5fd4d8'], ['WDK', 11, '#7fb8e8'],
    ['TypeScript', 13, '#f0b86e'], ['React', 12, '#e89aa8'], ['Redux', 9, '#c99ae8'],
  ];
  const total = segs.reduce((a, s) => a + s[1], 0);
  let x = x0, out = '', ticks = '';
  const bounds = [];
  segs.forEach(([name, w, c], i) => {
    const sw = ((x1 - x0) * w) / total;
    const b = (0.25 + i * 0.18).toFixed(2);
    out += `<g opacity="0"><animate attributeName="opacity" values="0;1" dur=".4s" begin="${b}s" fill="freeze"/>
<rect x="${(x + 2).toFixed(1)}" y="${y}" width="${(sw - 4).toFixed(1)}" height="${h}" rx="6" fill="${c}" fill-opacity=".16" stroke="${c}" stroke-opacity=".75"/>
<text x="${(x + sw / 2).toFixed(1)}" y="${y + 30}" text-anchor="middle" font-family="${MONO}" font-size="13" fill="${c}">${name}</text></g>`;
    bounds.push(x);
    x += sw;
  });
  bounds.push(x1);
  bounds.forEach((bx, i) => {
    const addr = '0x' + Math.round((i / segs.length) * 0xffff).toString(16).toUpperCase().padStart(4, '0');
    ticks += `<line x1="${bx.toFixed(1)}" x2="${bx.toFixed(1)}" y1="${y + h + 6}" y2="${y + h + 14}" stroke="${DIM}"/><text x="${bx.toFixed(1)}" y="${y + h + 30}" text-anchor="${i === 0 ? 'start' : i === bounds.length - 1 ? 'end' : 'middle'}" font-family="${MONO}" font-size="10" fill="${DIM}">${addr}</text>`;
  });
  const sys = bounds[4];
  const bracket = (a, b, text, color) => `<path d="M${a + 2} ${y - 8}v-8H${b - 2}v8" fill="none" stroke="${color}" stroke-opacity=".6"/><text x="${(a + b) / 2}" y="${y - 24}" text-anchor="middle" font-family="${MONO}" font-size="11" fill="${color}">${text}</text>`;
  return svg(W, H, `<rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="16" fill="${PANEL}" stroke="#2a3a63"/>
<text x="40" y="34" font-family="${MONO}" font-size="12" fill="${DIM}">// !address  —  layout of this developer's address space</text>
${bracket(x0, sys, 'systems · where I live', BLUE)}
${bracket(sys, x1, 'interfaces · where I visit', '#f0b86e')}
${out}
${ticks}
<rect x="${x0}" y="${y - 2}" width="3" height="${h + 4}" fill="${INK}"><animate attributeName="x" values="${x0};${x1 - 3};${x0}" dur="8s" repeatCount="indefinite"/><animate attributeName="opacity" values=".9;.2;.9" dur="1.2s" repeatCount="indefinite"/></rect>`, 'Tech stack laid out as a memory map: C++, C#, Win32 API, WDK, TypeScript, React, Redux');
}

/* -------------------------------------------------------- small side cards */
function small({ accent, tag, title, desc, art, label }) {
  const W = 490, H = 170;
  return svg(W, H, `<defs>${grid('g', 14, accent, 0.1)}<clipPath id="f"><rect width="${W}" height="${H}" rx="14"/></clipPath></defs>
<g clip-path="url(#f)"><rect width="${W}" height="${H}" fill="${PANEL}"/><rect x="300" width="190" height="${H}" fill="url(#g)"/>
<text x="26" y="44" font-family="${MONO}" font-size="11" letter-spacing="1.6" fill="${accent}">${tag}</text>
<text x="24" y="82" font-family="${SANS}" font-weight="700" font-size="28" fill="${INK}">${title}</text>
${desc.map((d, i) => `<text x="26" y="${114 + i * 21}" font-family="${SANS}" font-size="14" fill="${MUTED}">${esc(d)}</text>`).join('')}
${art}</g>
<rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="14" fill="none" stroke="${accent}" stroke-opacity=".3"/>`, label);
}

function chess() {
  const A = '#f0b86e', s = 24, bx = 330, by = 25, n = 5;
  let board = '';
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++)
    board += `<rect x="${bx + c * s}" y="${by + r * s}" width="${s}" height="${s}" fill="${(r + c) % 2 ? '#3a2e1d' : '#e9d6b4'}" fill-opacity="${(r + c) % 2 ? 1 : 0.85}"/>`;
  // knight tour (L moves) on 5x5
  const tour = [[0, 0], [1, 2], [0, 4], [2, 3], [4, 4], [3, 2], [4, 0], [2, 1], [0, 0]];
  const pos = tour.map(([c, r]) => `${bx + c * s + s / 2} ${by + r * s + s / 2}`);
  const vals = [], kt = [];
  const m = tour.length - 1;
  for (let i = 0; i < m; i++) { vals.push(pos[i], pos[i]); kt.push((i / m).toFixed(3), ((i + 0.6) / m).toFixed(3)); }
  vals.push(pos[m]); kt.push('1');
  const art = `<rect x="${bx - 4}" y="${by - 4}" width="${n * s + 8}" height="${n * s + 8}" rx="6" fill="none" stroke="${A}" stroke-opacity=".5"/>${board}
<g><animateTransform attributeName="transform" type="translate" values="${vals.join(';')}" keyTimes="${kt.join(';')}" dur="8s" repeatCount="indefinite"/>
<circle r="10" fill="${A}" opacity=".25"/><text y="7" text-anchor="middle" font-family="'Segoe UI Symbol','DejaVu Sans',sans-serif" font-size="21" fill="#14100a" stroke="${A}" stroke-width=".8">♞</text></g>
<text x="${bx + (n * s) / 2}" y="${by + n * s + 20}" text-anchor="middle" font-family="${MONO}" font-size="10" fill="${MUTED}">dispatch({ type: 'MOVE' })</text>`;
  return small({ accent: A, tag: 'REACT · REDUX', title: 'Chess', desc: ['Every move is an action;', 'the board lives in a Redux store.'], art, label: 'Chess: a knight hopping across a board' });
}

function weather() {
  const A = '#7fc4f0', cx = 395, cy = 72;
  let rays = '';
  for (let i = 0; i < 8; i++) rays += `<line x1="0" y1="-30" x2="0" y2="-40" transform="rotate(${i * 45})" stroke="#ffd166" stroke-width="3" stroke-linecap="round"/>`;
  const cloud = (x, y, sc, op, dur, from, to) => `<g opacity="${op}"><animateTransform attributeName="transform" type="translate" values="${from} ${y};${to} ${y};${from} ${y}" dur="${dur}s" repeatCount="indefinite" calcMode="spline" keySplines=".45 0 .55 1;.45 0 .55 1"/>
<g transform="scale(${sc})"><path d="M-30 10a16 16 0 0 1 4-31 22 22 0 0 1 42-4 15 15 0 0 1 16 25z" fill="#dbe8f7" stroke="#9fb6d4"/></g></g>`;
  const art = `<g transform="translate(${cx} ${cy})"><circle r="22" fill="#ffd166"/><g>${rays}<animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="18s" repeatCount="indefinite"/></g></g>
${cloud(0, 92, 1, 0.95, 7, 400, 430)}${cloud(0, 60, 0.6, 0.6, 9, 450, 420)}
${[0, 1, 2].map((i) => `<line x1="${388 + i * 16}" x2="${384 + i * 16}" y1="112" y2="124" stroke="${A}" stroke-width="2" stroke-linecap="round"><animate attributeName="opacity" values="0;1;0" dur="1.4s" begin="${i * 0.35}s" repeatCount="indefinite"/><animateTransform attributeName="transform" type="translate" values="0 -4;-2 8" dur="1.4s" begin="${i * 0.35}s" repeatCount="indefinite"/></line>`).join('')}
<text x="405" y="150" text-anchor="middle" font-family="${MONO}" font-size="12" fill="${MUTED}">Tashkent <tspan fill="${INK}">+18°</tspan></text>`;
  return small({ accent: A, tag: 'REACT · TYPESCRIPT', title: 'Weather', desc: ['Current conditions and the', 'forecast, in one view.'], art, label: 'Weather: a sun turning behind a drifting cloud' });
}

/* ----------------------------------------------------------------- footer */
function footer() {
  const W = 1000, H = 120;
  const cmd = 'shutdown /s /t 0 /c "thanks for reading — see you in ring 0"';
  const tp = typed('c', 172, 52, cmd.length, 0.6, 7.83, 0.025);
  let wave = '';
  for (let i = 0; i < 60; i++) {
    const x = 40 + i * 15.5, h = 4 + Math.abs(Math.sin(i * 0.7) * 16) + (i % 7) * 1.5;
    wave += `<rect x="${x.toFixed(1)}" y="${92 - h / 2}" width="5" height="${h.toFixed(1)}" rx="2.5" fill="${BLUE}" fill-opacity=".35"><animate attributeName="fill-opacity" values=".12;.6;.12" dur="2.4s" begin="${(i * 0.04).toFixed(2)}s" repeatCount="indefinite"/></rect>`;
  }
  return svg(W, H, `<defs>${tp.def}</defs>
<rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="16" fill="${PANEL}" stroke="#2a3a63"/>
<text x="40" y="52" font-family="${MONO}" font-size="13" fill="${MUTED}">C:\\Users\\sardor&gt;</text>
<text x="172" y="52" clip-path="url(#c)" font-family="${MONO}" font-size="13" fill="${INK}">${esc(cmd)}</text>
<rect x="${(172 + cmd.length * 7.83 + 4).toFixed(0)}" y="41" width="8" height="14" fill="${BLUE}" opacity="0"><set attributeName="opacity" to="1" begin="${tp.end.toFixed(2)}s"/><animate attributeName="opacity" values="1;0" calcMode="discrete" dur="1.1s" begin="${tp.end.toFixed(2)}s" repeatCount="indefinite"/></rect>
${wave}`, 'Thanks for reading — see you in ring 0');
}

const files = {
  'hero.svg': hero(),
  'shared-memory.svg': sharedMemory(),
  'kernel-driver.svg': kernelDriver(),
  'memory-monitor.svg': memoryMonitor(),
  'address-space.svg': addressSpace(),
  'chess.svg': chess(),
  'weather.svg': weather(),
  'footer.svg': footer(),
};
for (const [n, c] of Object.entries(files)) writeFileSync(join(OUT, n), c);
console.log(Object.keys(files).join('\n'));
