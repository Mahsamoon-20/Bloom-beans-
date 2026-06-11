import { useState } from "react";

const S = 20;       // 1 meter = 20 px
const DW = S * 0.9; // door width in pixels

// ── Color palette ────────────────────────────────────────────────────
const C = {
  corridor: { bg: "#E8E2D4", border: "#B5A98E" },
  atrium:   { bg: "#C6F0DA", border: "#16A34A" },
  patio:    { bg: "#BBF7D0", border: "#15803D" },
  cafe:     { bg: "#FEF3C7", border: "#D97706" },
  kitchen:  { bg: "#FFEDD5", border: "#EA580C" },
  inst:     { bg: "#DBEAFE", border: "#2563EB" },
  therapy:  { bg: "#FCE7F3", border: "#DB2777" },
  sensory:  { bg: "#FEF9C3", border: "#A16207" },
  admin:    { bg: "#EDE9FE", border: "#7C3AED" },
  wc:       { bg: "#E0F2FE", border: "#0284C7" },
  stairs:   { bg: "#E2E8F0", border: "#475569" },
  storage:  { bg: "#F1F5F9", border: "#94A3B8" },
};

// ── Layout constants ─────────────────────────────────────────────────
// Ring-corridor layout (all meters):
//   North rooms:   y 0–5
//   North corridor:y 5–7   (2 m wide, full 30 m)
//   West corridor: x 8–10  y 7–13 (2 m wide)
//   Atrium:        x 10–20 y 7–13
//   East corridor: x 20–22 y 7–13 (2 m wide)
//   South corridor:y 13–15 (2 m wide, full 30 m)
//   South rooms:   y 15–20

const RING_CORRIDORS = [
  { id:"corrN", label:"North Hallway",  x:0,  y:5,  w:30, h:2 },
  { id:"corrS", label:"South Hallway",  x:0,  y:13, w:30, h:2 },
  { id:"corrW", label:"West Corridor",  x:8,  y:7,  w:2,  h:6 },
  { id:"corrE", label:"East Corridor",  x:20, y:7,  w:2,  h:6 },
];

// ── Ground Floor rooms ───────────────────────────────────────────────
const GF = [
  // North wing (y 0-5) — accessed from North Hallway
  { id:"kitchen",  label:"Kitchen",           sub:"Full commercial kitchen",     icon:"🍳", x:0,  y:0, w:9,  h:5, c:C.kitchen,
    doors:[{ wall:"S", off:3.5 }] },
  { id:"stairsGF", label:"Stairs & Lift",     sub:"Fire stairs · accessible lift", icon:"🛗", x:9,  y:0, w:3,  h:5, c:C.stairs,
    doors:[{ wall:"S", off:1 }] },
  { id:"cooking",  label:"Cooking Class",     sub:"Group cooking workshops",     icon:"👨‍🍳",x:12, y:0, w:10, h:5, c:C.kitchen,
    doors:[{ wall:"S", off:4 }] },
  { id:"storageN", label:"Storage & Utility", sub:"HVAC · supplies · electrical", icon:"📦", x:22, y:0, w:8,  h:5, c:C.storage,
    doors:[{ wall:"S", off:3 }] },

  // West wing (x 0-8, y 7-13) — accessed from West Corridor
  { id:"cafeSeating", label:"Café Seating",   sub:"40-cover accessible dining",  icon:"☕", x:0,  y:7, w:8,  h:6, c:C.cafe,
    doors:[{ wall:"E", off:2.5 }] },

  // East wing (x 22-30, y 7-13) — accessed from East Corridor
  { id:"wcGF",     label:"Accessible WC",     sub:"Fully accessible · family",   icon:"🚻", x:22, y:7, w:8,  h:3, c:C.wc,
    doors:[{ wall:"W", off:1 }] },
  { id:"storageE", label:"Storage Room",      sub:"Café & event supplies",       icon:"📦", x:22, y:10,w:8,  h:3, c:C.storage,
    doors:[{ wall:"W", off:1 }] },

  // South wing (y 15-20) — accessed from South Hallway
  { id:"reception",label:"Reception & Waiting",sub:"Main entrance · info desk",  icon:"🛎️", x:0,  y:15,w:9,  h:5, c:C.admin,
    doors:[{ wall:"N", off:3.5 }] },
  { id:"cafebar",  label:"Café Counter",      sub:"Order & payment counter",     icon:"🧋", x:9,  y:15,w:13, h:5, c:C.cafe,
    doors:[{ wall:"N", off:5 }] },
  { id:"washroomsS",label:"Washrooms",        sub:"Male · female · neutral",     icon:"🚿", x:22, y:15,w:8,  h:5, c:C.wc,
    doors:[{ wall:"N", off:3 }] },
];

const GF_ATRIUM = { x:10, y:7, w:10, h:6,
  label:"Open Atrium", sub:"Glass-roof courtyard · living wall" };

// ── Upper Floor rooms ────────────────────────────────────────────────
const UF = [
  // North wing (y 0-5)
  { id:"class1",   label:"Classroom 1",       sub:"Group learning · 15 students", icon:"📚", x:0,  y:0, w:8,  h:5, c:C.inst,
    doors:[{ wall:"S", off:3 }] },
  { id:"staffOff", label:"Staff Office",      sub:"Teachers & coordinators",      icon:"💼", x:8,  y:0, w:6,  h:5, c:C.admin,
    doors:[{ wall:"S", off:2 }] },
  { id:"stairsUF", label:"Stairs & Lift",     sub:"Connected to ground floor",    icon:"🛗", x:14, y:0, w:2,  h:5, c:C.stairs,
    doors:[{ wall:"S", off:0.5 }] },
  { id:"class2",   label:"Classroom 2",       sub:"Group learning · 15 students", icon:"📚", x:16, y:0, w:7,  h:5, c:C.inst,
    doors:[{ wall:"S", off:3 }] },
  { id:"resource", label:"Resource Room",     sub:"Library · learning materials", icon:"📖", x:23, y:0, w:7,  h:5, c:C.inst,
    doors:[{ wall:"S", off:3 }] },

  // West wing (x 0-8, y 7-13)
  { id:"therapy1", label:"Therapy Room 1",    sub:"1-on-1 sessions",              icon:"🧠", x:0,  y:7, w:8,  h:3, c:C.therapy,
    doors:[{ wall:"E", off:1 }] },
  { id:"therapy2", label:"Therapy Room 2",    sub:"Speech · OT · PT therapy",     icon:"🗣️", x:0,  y:10,w:8,  h:3, c:C.therapy,
    doors:[{ wall:"E", off:1 }] },

  // East wing (x 22-30, y 7-13)
  { id:"sensory",  label:"Sensory & Play",    sub:"Sensory tools · calm zone",    icon:"🎨", x:22, y:7, w:8,  h:6, c:C.sensory,
    doors:[{ wall:"W", off:2.5 }] },

  // South wing (y 15-20)
  { id:"admin",    label:"Admin Office",      sub:"Director · records · meetings", icon:"🗂️", x:0,  y:15,w:7,  h:5, c:C.admin,
    doors:[{ wall:"N", off:3 }] },
  { id:"staffLng", label:"Staff Lounge",      sub:"Break room · kitchen · lockers",icon:"🛋️", x:7,  y:15,w:6,  h:5, c:C.admin,
    doors:[{ wall:"N", off:2 }] },
  { id:"wcUF",     label:"Washrooms",         sub:"Staff · accessible bathrooms", icon:"🚿", x:13, y:15,w:4,  h:5, c:C.wc,
    doors:[{ wall:"N", off:1.5 }] },
  { id:"physio",   label:"Physiotherapy",     sub:"PT equipment · treatment",     icon:"🏃", x:17, y:15,w:6,  h:5, c:C.therapy,
    doors:[{ wall:"N", off:2 }] },
  { id:"artRoom",  label:"Art Room",          sub:"Arts · crafts · creative",     icon:"🖌️", x:23, y:15,w:7,  h:5, c:C.sensory,
    doors:[{ wall:"N", off:3 }] },
];

const UF_ATRIUM = { x:10, y:7, w:10, h:6,
  label:"Atrium Void", sub:"Open below — sees GF courtyard ↓" };

// ── Door indicator component ─────────────────────────────────────────
function Door({ room, door }) {
  const { x, y, w, h } = room;
  const { wall, off } = door;
  const px = x*S, py = y*S, pw = w*S, ph = h*S;

  // Hinge position (pixels)
  let hx, hy;
  if (wall === "S") { hx = px + off*S; hy = py + ph; }
  if (wall === "N") { hx = px + off*S; hy = py; }
  if (wall === "E") { hx = px + pw;    hy = py + off*S; }
  if (wall === "W") { hx = px;         hy = py + off*S; }

  // White gap erasing the wall line at door opening
  const gapW = 4, gapH = DW;
  const gap = (wall === "N" || wall === "S")
    ? <rect x={hx} y={hy - gapW/2} width={DW} height={gapW} fill="#FDFCFA"/>
    : <rect x={hx - gapW/2} y={hy} width={gapW} height={DW} fill="#FDFCFA"/>;

  // Door leaf line + swing arc
  let leafX2 = hx, leafY2 = hy, arcD = "";
  if (wall === "S") {
    leafX2 = hx; leafY2 = hy - DW;
    arcD = `M ${hx+DW} ${hy} A ${DW} ${DW} 0 0 0 ${hx} ${hy-DW}`;
  } else if (wall === "N") {
    leafX2 = hx; leafY2 = hy + DW;
    arcD = `M ${hx+DW} ${hy} A ${DW} ${DW} 0 0 1 ${hx} ${hy+DW}`;
  } else if (wall === "E") {
    leafX2 = hx - DW; leafY2 = hy;
    arcD = `M ${hx} ${hy+DW} A ${DW} ${DW} 0 0 0 ${hx-DW} ${hy}`;
  } else if (wall === "W") {
    leafX2 = hx + DW; leafY2 = hy;
    arcD = `M ${hx} ${hy+DW} A ${DW} ${DW} 0 0 1 ${hx+DW} ${hy}`;
  }

  return (
    <>
      {gap}
      <line x1={hx} y1={hy} x2={leafX2} y2={leafY2} stroke="#64748B" strokeWidth={1.5}/>
      <path d={arcD} fill="none" stroke="#94A3B8" strokeWidth={1} strokeDasharray="2 1.5"/>
    </>
  );
}

// ── Room component ───────────────────────────────────────────────────
function Room({ r, hov, setHov }) {
  const { id, x, y, w, h, c, doors = [], label, icon } = r;
  const px = x*S, py = y*S, pw = w*S, ph = h*S;
  const cx = px + pw/2, cy = py + ph/2;
  const area = w * h;
  const isHov = hov === id;
  const fs    = area > 60 ? 11 : area > 30 ? 10 : area > 15 ? 9 : 8;
  const ifs   = area > 40 ? 15 : area > 20 ? 12 : 9;

  return (
    <g onMouseEnter={() => setHov(id)} onMouseLeave={() => setHov(null)} style={{ cursor: "pointer" }}>
      <rect x={px} y={py} width={pw} height={ph}
        fill={isHov ? c.border + "28" : c.bg}
        stroke={isHov ? c.border : c.border + "AA"}
        strokeWidth={isHov ? 2.5 : 1.5}/>
      {area >= 12 && (
        <text x={cx} y={cy - (area > 20 ? 9 : 5)} textAnchor="middle"
          fontSize={ifs} style={{ userSelect: "none" }}>
          {icon}
        </text>
      )}
      <text x={cx} y={cy + (area > 20 ? 5 : 5)} textAnchor="middle"
        fontSize={fs} fontWeight={700} fill={isHov ? "#111" : "#1A2B1A"}
        style={{ userSelect: "none" }}>
        {label}
      </text>
      {area >= 20 && (
        <text x={cx} y={cy + (area > 30 ? 16 : 15)} textAnchor="middle"
          fontSize={6.5} fill="#7C8B7A" style={{ userSelect: "none" }}>
          {w}m×{h}m · {w*h}m²
        </text>
      )}
      {doors.map((d, i) => <Door key={i} room={r} door={d}/>)}
    </g>
  );
}

// ── Atrium component ─────────────────────────────────────────────────
function Atrium({ a, isUpper }) {
  const px = a.x*S, py = a.y*S, pw = a.w*S, ph = a.h*S;
  const cx = px + pw/2, cy = py + ph/2;
  return (
    <g>
      <rect x={px} y={py} width={pw} height={ph}
        fill={C.atrium.bg} stroke={C.atrium.border} strokeWidth={2}/>
      <rect x={px+8} y={py+8} width={pw-16} height={ph-16}
        fill="none" stroke={C.atrium.border} strokeWidth={1.5} strokeDasharray="6 4" rx={5}/>
      <text x={cx} y={cy-10} textAnchor="middle" fontSize={18} style={{ userSelect: "none" }}>
        {isUpper ? "⬇️" : "🌿"}
      </text>
      <text x={cx} y={cy+5} textAnchor="middle" fontSize={9} fontWeight={700} fill="#065F46"
        style={{ userSelect: "none" }}>{a.label}</text>
    </g>
  );
}

// ── Legend data ───────────────────────────────────────────────────────
const LEGEND = [
  { c: C.corridor, label: "Corridor / Hallway" },
  { c: C.atrium,   label: "Atrium / Courtyard" },
  { c: C.cafe,     label: "Café / Dining"      },
  { c: C.kitchen,  label: "Kitchen / Cooking"  },
  { c: C.inst,     label: "Classrooms"         },
  { c: C.therapy,  label: "Therapy Rooms"      },
  { c: C.sensory,  label: "Sensory / Art"      },
  { c: C.admin,    label: "Admin / Staff"      },
  { c: C.wc,       label: "Washrooms"          },
  { c: C.storage,  label: "Storage / Utility"  },
];

// ── Main component ───────────────────────────────────────────────────
export default function FloorPlan() {
  const [floor, setFloor] = useState(0);
  const [hov,   setHov]   = useState(null);

  const rooms   = floor === 0 ? GF   : UF;
  const atrium  = floor === 0 ? GF_ATRIUM : UF_ATRIUM;
  const bW = 30*S, bH = 20*S;
  const patioH  = 96;
  const totalSvgH = bH + (floor === 0 ? patioH + 20 : 0);

  const hovRoom = rooms.find(r => r.id === hov);

  return (
    <div style={{
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      background: "#F5F4F0", minHeight: "100vh", padding: "18px 18px 40px"
    }}>
      {/* Header */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#8A9E88", marginBottom: 3 }}>
          ARCHITECTURAL FLOOR PLAN · DUPLEX · 1,200 M²
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <span style={{ fontSize: 23, fontWeight: 900, color: "#1C3B1A", letterSpacing: -1 }}>🌸 Bloom Beans</span>
          <span style={{ fontSize: 13, color: "#6B8B69" }}>Special Needs Institute & Café</span>
        </div>
        <div style={{ fontSize: 11, color: "#8A9E88", marginTop: 2 }}>
          30 m × 20 m footprint · 2 floors · Ring-corridor access · Every room has its own hallway entrance
        </div>
      </div>

      {/* Floor tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        {[["🏪", "Ground Floor", "Café & Support"], ["🏫", "Upper Floor", "Institute"]].map(([e, t, s], i) => (
          <button key={i} onClick={() => { setFloor(i); setHov(null); }} style={{
            padding: "7px 16px", borderRadius: 20, border: "none", cursor: "pointer",
            background: floor === i ? "#2D5A2B" : "#DDE8DC",
            color: floor === i ? "#fff" : "#3B6B39",
            fontWeight: 700, fontSize: 13,
            boxShadow: floor === i ? "0 2px 8px rgba(45,90,43,.3)" : "none",
            transition: "all .15s"
          }}>{e} {t} <span style={{ fontWeight: 400, opacity: .85 }}>— {s}</span></button>
        ))}
      </div>

      {/* Info card */}
      <div style={{
        height: 50, marginBottom: 10, display: "flex", alignItems: "center", padding: "0 14px",
        background: hovRoom ? hovRoom.c.bg : "#ECEAE6",
        border: `2px solid ${hovRoom ? hovRoom.c.border : "#D4D0CA"}`,
        borderRadius: 8, transition: "all .15s"
      }}>
        {hovRoom ? (
          <>
            <span style={{ fontSize: 20, marginRight: 10 }}>{hovRoom.icon}</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: "#1C3B1A" }}>{hovRoom.label}</div>
              <div style={{ fontSize: 11, color: "#4A6B48" }}>
                {hovRoom.sub} · <b>{hovRoom.w * hovRoom.h} m²</b>
              </div>
            </div>
          </>
        ) : (
          <div style={{ fontSize: 11, color: "#9AA896" }}>
            Hover any room to see details · Small arc = door swing · All rooms enter off a corridor
          </div>
        )}
      </div>

      {/* SVG floor plan */}
      <div style={{ overflowX: "auto" }}>
        <svg width={bW + 52} height={totalSvgH + 52}
          style={{ background: "#FDFCFA", border: "2px solid #C5D4C3", borderRadius: 10, display: "block" }}>
          <g transform="translate(30,24)">

            {/* Building shell */}
            <rect x={0} y={0} width={bW} height={bH}
              fill="#EAE8E3" stroke="#2D5A2B" strokeWidth={3}/>

            {/* Subtle 5m grid */}
            {[5, 10, 15, 20, 25].map(m => (
              <line key={"v"+m} x1={m*S} y1={0} x2={m*S} y2={bH}
                stroke="#D0CCC5" strokeWidth={0.5} strokeDasharray="3 5"/>
            ))}
            {[5, 10, 15].map(m => (
              <line key={"h"+m} x1={0} y1={m*S} x2={bW} y2={m*S}
                stroke="#D0CCC5" strokeWidth={0.5} strokeDasharray="3 5"/>
            ))}

            {/* Ring corridors */}
            {RING_CORRIDORS.map(c => (
              <g key={c.id}>
                <rect x={c.x*S} y={c.y*S} width={c.w*S} height={c.h*S}
                  fill={C.corridor.bg} stroke={C.corridor.border} strokeWidth={1}/>
                {(c.w >= 4) && (
                  <text x={c.x*S + c.w*S/2} y={c.y*S + c.h*S/2 + 4}
                    textAnchor="middle" fontSize={7.5} fill="#8A7E6A" fontWeight={600}
                    style={{ userSelect: "none" }}>{c.label}</text>
                )}
              </g>
            ))}

            {/* Corridor label for narrow ones */}
            <text x={8*S + S} y={7*S + 3*S} textAnchor="middle"
              fontSize={6} fill="#8A7E6A" fontWeight={600}
              transform={`rotate(-90, ${8*S + S}, ${7*S + 3*S})`}
              style={{ userSelect: "none" }}>Corridor</text>
            <text x={20*S + S} y={7*S + 3*S} textAnchor="middle"
              fontSize={6} fill="#8A7E6A" fontWeight={600}
              transform={`rotate(-90, ${20*S + S}, ${7*S + 3*S})`}
              style={{ userSelect: "none" }}>Corridor</text>

            {/* Atrium */}
            <Atrium a={atrium} isUpper={floor === 1}/>

            {/* Rooms */}
            {rooms.map(r => <Room key={r.id} r={r} hov={hov} setHov={setHov}/>)}

            {/* Main entrance arrow (GF) */}
            {floor === 0 && (
              <g>
                <rect x={12*S} y={bH} width={6*S} height={5} fill="#2D5A2B"/>
                <text x={15*S} y={bH + 16} textAnchor="middle"
                  fontSize={9} fontWeight={700} fill="#2D5A2B" style={{ userSelect: "none" }}>
                  ▲ MAIN ENTRANCE
                </text>
              </g>
            )}

            {/* Patio (GF only) */}
            {floor === 0 && (
              <g>
                <rect x={0} y={bH + 22} width={bW} height={patioH - 10}
                  fill={C.patio.bg} stroke={C.patio.border} strokeWidth={2}
                  strokeDasharray="9 5" rx={4}/>
                <text x={bW/2} y={bH + 22 + 26} textAnchor="middle"
                  fontSize={15} style={{ userSelect: "none" }}>🌱</text>
                <text x={bW/2} y={bH + 22 + 46} textAnchor="middle"
                  fontSize={11} fontWeight={700} fill="#065F46" style={{ userSelect: "none" }}>
                  Outdoor Patio & Gardening Area · 30 m × 5 m
                </text>
                <text x={bW/2} y={bH + 22 + 61} textAnchor="middle"
                  fontSize={8.5} fill="#047857" style={{ userSelect: "none" }}>
                  Raised beds · accessible paths · shaded seating · herb garden
                </text>
              </g>
            )}

            {/* North arrow */}
            <g transform={`translate(${bW - 20}, 18)`}>
              <circle cx={0} cy={0} r={14} fill="white" stroke="#2D5A2B" strokeWidth={1.5} opacity={0.92}/>
              <polygon points="0,-10 -3.5,4 0,1.5 3.5,4" fill="#2D5A2B"/>
              <text x={0} y={22} textAnchor="middle" fontSize={8} fontWeight={800} fill="#2D5A2B"
                style={{ userSelect: "none" }}>N</text>
            </g>

            {/* Scale bar */}
            <g transform={`translate(8, ${totalSvgH - 10})`}>
              <rect x={0} y={0} width={50} height={5} fill="#2D5A2B"/>
              <rect x={50} y={0} width={50} height={5} fill="#A3C4A1"/>
              <text x={0} y={14} fontSize={7.5} fill="#4A6B48" style={{ userSelect: "none" }}>0</text>
              <text x={44} y={14} fontSize={7.5} fill="#4A6B48" style={{ userSelect: "none" }}>2.5m</text>
              <text x={94} y={14} fontSize={7.5} fill="#4A6B48" style={{ userSelect: "none" }}>5m</text>
            </g>

            {/* Dimension labels */}
            <text x={bW/2} y={-8} textAnchor="middle" fontSize={9.5} fill="#9AA896"
              style={{ userSelect: "none" }}>← 30 meters →</text>
            <text x={-14} y={bH/2} textAnchor="middle" fontSize={9.5} fill="#9AA896"
              transform={`rotate(-90,-14,${bH/2})`} style={{ userSelect: "none" }}>← 20 m →</text>
          </g>
        </svg>
      </div>

      {/* Legend */}
      <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: "5px 14px" }}>
        {LEGEND.map(({ c, label }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#4A6B48" }}>
            <div style={{ width: 13, height: 13, background: c.bg, border: `1.5px solid ${c.border}`, borderRadius: 3 }}/>
            {label}
          </div>
        ))}
      </div>

      {/* Design notes */}
      <div style={{
        marginTop: 14, padding: "12px 16px",
        background: "#fff", border: "1px solid #D4D0CA", borderRadius: 10,
        fontSize: 11.5, color: "#4A6B48", lineHeight: 1.8
      }}>
        <div style={{ fontWeight: 700, marginBottom: 4, color: "#1C3B1A", fontSize: 13 }}>
          {floor === 0 ? "🏪 Ground Floor — Circulation Notes" : "🏫 Upper Floor — Circulation Notes"}
        </div>
        {floor === 0 ? (
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            <li>A <b>ring of corridors</b> (2m wide) surrounds the central atrium — North Hallway, South Hallway, West & East Corridors</li>
            <li>Every single room has a private door opening directly off a hallway — <b>zero room-through-room access</b></li>
            <li>Main entrance comes in through the South Hallway; Reception & Waiting is the first room you reach</li>
            <li>Kitchen and Cooking Class share the north wall for ventilation/extraction efficiency</li>
            <li>Café Seating (west) and Café Counter (south) both open independently off their respective corridors</li>
            <li>Outdoor Patio & Gardening Area extends 5 m south — raised beds, herb garden, accessible path</li>
          </ul>
        ) : (
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            <li>Same ring-corridor layout as ground floor — stairs & lift aligned in same structural core</li>
            <li>Atrium void in center is open to the GF courtyard below — natural light to all surrounding rooms</li>
            <li>Therapy Room 1 & 2 are on the quiet West Corridor, away from busier classrooms to the north</li>
            <li>Sensory & Play Room sits on the East Corridor — 48 m² quiet zone with independent access</li>
            <li>All 5 south-wing rooms (Admin, Lounge, WC, Physio, Art) each have their own door off the South Hallway</li>
          </ul>
        )}
      </div>
    </div>
  );
}
