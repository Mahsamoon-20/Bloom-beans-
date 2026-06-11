import { useState } from "react";

const S = 20; // 1 meter = 20px

// ── Color tokens ──────────────────────────────────────────────
const C = {
  cafe:    { bg: "#FEF3C7", border: "#D97706" },
  kitchen: { bg: "#FFEDD5", border: "#EA580C" },
  inst:    { bg: "#DBEAFE", border: "#2563EB" },
  therapy: { bg: "#FCE7F3", border: "#DB2777" },
  sensory: { bg: "#FEF9C3", border: "#CA8A04" },
  admin:   { bg: "#EDE9FE", border: "#7C3AED" },
  wc:      { bg: "#E0F2FE", border: "#0284C7" },
  atrium:  { bg: "#D1FAE5", border: "#059669" },
  stairs:  { bg: "#E2E8F0", border: "#64748B" },
  storage: { bg: "#F1F5F9", border: "#94A3B8" },
  patio:   { bg: "#A7F3D0", border: "#059669" },
};

// ── Ground Floor rooms ─────────────────────────────────────────
// Full 30×20 m coverage, no overlaps
const GF = [
  // North strip (y 0–5)
  { id:"kitchen",   label:"Kitchen",           sub:"Full commercial kitchen + prep",      icon:"🍳", x:0,  y:0,  w:9,  h:5,  c:C.kitchen },
  { id:"stairsGF",  label:"Stairs & Lift",     sub:"Fire stairs + accessible lift",       icon:"🛗", x:9,  y:0,  w:3,  h:5,  c:C.stairs  },
  { id:"cooking",   label:"Cooking Class",     sub:"Group cooking workshops",             icon:"👨‍🍳",x:12, y:0,  w:9,  h:5,  c:C.kitchen },
  { id:"storageGF", label:"Storage & Utility", sub:"HVAC, electrical, supplies",          icon:"📦", x:21, y:0,  w:9,  h:5,  c:C.storage },
  // Middle band (y 5–15)
  { id:"cafeSeating",label:"Café Seating",     sub:"Accessible dining — 40 covers",      icon:"☕", x:0,  y:5,  w:10, h:10, c:C.cafe    },
  { id:"atriumGF",  label:"Open Atrium",       sub:"Glass-roof courtyard · living wall",  icon:"🌿", x:10, y:5,  w:10, h:10, c:C.atrium, isAtrium:true },
  { id:"restroomsGF",label:"Accessible WC",   sub:"Fully accessible + family rooms",     icon:"🚻", x:20, y:5,  w:10, h:5,  c:C.wc     },
  { id:"storageGF2",label:"Storage Room",      sub:"Café & event supplies",               icon:"📦", x:20, y:10, w:10, h:5,  c:C.storage },
  // South strip (y 15–20)
  { id:"reception", label:"Reception & Waiting",sub:"Entrance, info desk, lounge",       icon:"🛎️", x:0,  y:15, w:9,  h:5,  c:C.admin  },
  { id:"cafebar",   label:"Café Counter",       sub:"Order & payment counter",            icon:"🧋", x:9,  y:15, w:12, h:5,  c:C.cafe   },
  { id:"wcGF",      label:"Washrooms",          sub:"Male, female, gender-neutral",       icon:"🚿", x:21, y:15, w:9,  h:5,  c:C.wc     },
];

// ── Upper Floor rooms ──────────────────────────────────────────
const UF = [
  // North strip (y 0–6)
  { id:"class1",    label:"Classroom 1",        sub:"Group learning · 15 students max",   icon:"📚", x:0,  y:0,  w:8,  h:6,  c:C.inst    },
  { id:"staffOff",  label:"Staff Office",        sub:"Teachers & coordinators",            icon:"💼", x:8,  y:0,  w:5,  h:6,  c:C.admin   },
  { id:"stairsUF",  label:"Stairs & Lift",       sub:"Connected to ground floor",          icon:"🛗", x:13, y:0,  w:3,  h:6,  c:C.stairs  },
  { id:"class2",    label:"Classroom 2",         sub:"Group learning · 15 students max",   icon:"📚", x:16, y:0,  w:7,  h:6,  c:C.inst    },
  { id:"resource",  label:"Resource Room",       sub:"Library, learning materials",        icon:"📖", x:23, y:0,  w:7,  h:6,  c:C.inst    },
  // Middle band (y 6–16)
  { id:"therapy1",  label:"Therapy Room 1",      sub:"1-on-1 / small group sessions",     icon:"🧠", x:0,  y:6,  w:10, h:5,  c:C.therapy },
  { id:"therapy2",  label:"Therapy Room 2",      sub:"Speech / OT / PT therapy",          icon:"🗣️", x:0,  y:11, w:10, h:5,  c:C.therapy },
  { id:"atriumUF",  label:"Atrium Void",         sub:"Open to ground-floor courtyard ↓",  icon:"⬇️", x:10, y:6,  w:10, h:10, c:C.atrium, isAtrium:true },
  { id:"sensory",   label:"Sensory & Play Room", sub:"Sensory tools, soft play, calm zone",icon:"🎨", x:20, y:6,  w:10, h:10, c:C.sensory },
  // South strip (y 16–20)
  { id:"admin",     label:"Admin Office",        sub:"Director, records, meetings",        icon:"🗂️", x:0,  y:16, w:7,  h:4,  c:C.admin  },
  { id:"staffLng",  label:"Staff Lounge",        sub:"Break room, kitchen, lockers",       icon:"🛋️", x:7,  y:16, w:6,  h:4,  c:C.admin  },
  { id:"wcUF",      label:"Washrooms",           sub:"Staff + accessible bathrooms",       icon:"🚿", x:13, y:16, w:5,  h:4,  c:C.wc     },
  { id:"physio",    label:"Physiotherapy Room",  sub:"PT equipment, treatment tables",     icon:"🏃", x:18, y:16, w:6,  h:4,  c:C.therapy},
  { id:"artRoom",   label:"Art Room",            sub:"Arts, crafts & creative therapy",    icon:"🖌️", x:24, y:16, w:6,  h:4,  c:C.sensory},
];

const LEGEND = [
  { c:C.cafe,    label:"Café / Dining"      },
  { c:C.kitchen, label:"Kitchen / Cooking"  },
  { c:C.inst,    label:"Classrooms"         },
  { c:C.therapy, label:"Therapy Rooms"      },
  { c:C.sensory, label:"Sensory / Art"      },
  { c:C.admin,   label:"Admin / Staff"      },
  { c:C.wc,      label:"Washrooms"          },
  { c:C.atrium,  label:"Atrium / Outdoor"   },
  { c:C.storage, label:"Storage / Utility"  },
];

function Room({ r, hov, setHov }) {
  const px = r.x*S, py = r.y*S, pw = r.w*S, ph = r.h*S;
  const cx = px + pw/2, cy = py + ph/2;
  const area = r.w * r.h;
  const isHov = hov === r.id;
  const fs = area > 80 ? 12 : area > 40 ? 10 : area > 20 ? 9 : 8;
  const iconFs = area > 60 ? 20 : area > 30 ? 15 : 11;

  return (
    <g onMouseEnter={()=>setHov(r.id)} onMouseLeave={()=>setHov(null)} style={{cursor:"pointer"}}>
      <rect
        x={px} y={py} width={pw} height={ph}
        fill={isHov ? r.c.border+"22" : r.c.bg}
        stroke={isHov ? r.c.border : r.c.border+"99"}
        strokeWidth={isHov ? 2.5 : 1.5}
      />
      {r.isAtrium && (
        <rect x={px+8} y={py+8} width={pw-16} height={ph-16}
          fill="none" stroke={r.c.border} strokeWidth={1.5} strokeDasharray="7 4" rx={5} />
      )}
      <text x={cx} y={cy - (area>25 ? 12 : 6)} textAnchor="middle" fontSize={iconFs} style={{userSelect:"none"}}>
        {r.icon}
      </text>
      <text x={cx} y={cy + (area>25 ? 6 : 6)} textAnchor="middle"
        fontSize={fs} fontWeight={700} fill={isHov?"#111":"#1C3B1A"} style={{userSelect:"none"}}>
        {r.label}
      </text>
      {area > 20 && (
        <text x={cx} y={cy + (area>25 ? 18 : 17)} textAnchor="middle"
          fontSize={7} fill="#6B7B69" style={{userSelect:"none"}}>
          {r.w}m × {r.h}m · {r.w*r.h}m²
        </text>
      )}
    </g>
  );
}

export default function FloorPlan() {
  const [floor, setFloor] = useState(0);
  const [hov, setHov] = useState(null);

  const rooms = floor === 0 ? GF : UF;
  const bW = 30*S, bH = 20*S;
  const patioH = 110;
  const svgH = bH + (floor===0 ? patioH : 0);
  const hovRoom = rooms.find(r=>r.id===hov);

  // grid lines every 5m
  const vLines = [5,10,15,20,25].map(m => m*S);
  const hLines = [5,10,15].map(m => m*S);

  return (
    <div style={{
      fontFamily:"'Segoe UI',system-ui,sans-serif",
      background:"#F5F4F0",
      minHeight:"100vh",
      padding:"20px 20px 40px"
    }}>
      {/* ── Header ── */}
      <div style={{marginBottom:18}}>
        <div style={{fontSize:10,letterSpacing:3,textTransform:"uppercase",color:"#8A9E88",marginBottom:3}}>
          ARCHITECTURAL FLOOR PLAN · DUPLEX · 1,200 M²
        </div>
        <div style={{display:"flex",alignItems:"baseline",gap:10}}>
          <span style={{fontSize:26,fontWeight:900,color:"#1C3B1A",letterSpacing:-1}}>🌸 Bloom Beans</span>
          <span style={{fontSize:13,color:"#6B8B69"}}>Special Needs Institute & Café</span>
        </div>
        <div style={{fontSize:12,color:"#8A9E88",marginTop:2}}>30 m × 20 m footprint · 2 floors · Mall-style open corridor access</div>
      </div>

      {/* ── Tabs ── */}
      <div style={{display:"flex",gap:8,marginBottom:14}}>
        {[["🏪","Ground Floor","Café & Support"],["🏫","Upper Floor","Institute"]].map(([emoji,title,sub],i)=>(
          <button key={i} onClick={()=>{setFloor(i);setHov(null)}} style={{
            padding:"8px 16px", borderRadius:24, border:"none", cursor:"pointer",
            background: floor===i ? "#2D5A2B" : "#DDE8DC",
            color: floor===i ? "#fff" : "#3B6B39",
            fontWeight:700, fontSize:13,
            boxShadow: floor===i ? "0 3px 10px rgba(45,90,43,.3)" : "none",
            transition:"all .2s"
          }}>
            {emoji} {title} <span style={{fontWeight:400,opacity:.85}}>— {sub}</span>
          </button>
        ))}
      </div>

      {/* ── Hover info card ── */}
      <div style={{
        height:56, marginBottom:10, display:"flex", alignItems:"center",
        padding:"0 16px",
        background: hovRoom ? hovRoom.c.bg : "#ECEAE6",
        border: `2px solid ${hovRoom ? hovRoom.c.border : "#D4D0CA"}`,
        borderRadius:10,
        transition:"background .2s, border .2s"
      }}>
        {hovRoom ? (
          <>
            <span style={{fontSize:22,marginRight:12}}>{hovRoom.icon}</span>
            <div>
              <div style={{fontWeight:700,fontSize:14,color:"#1C3B1A"}}>{hovRoom.label}</div>
              <div style={{fontSize:12,color:"#4A6B48"}}>{hovRoom.sub} · <strong>{hovRoom.w*hovRoom.h} m²</strong></div>
            </div>
          </>
        ) : (
          <div style={{fontSize:12,color:"#9AA896"}}>Hover over any room to see details</div>
        )}
      </div>

      {/* ── Floor Plan SVG ── */}
      <div style={{overflowX:"auto"}}>
        <svg width={bW+60} height={svgH+50}
          style={{background:"#FDFCFA",border:"2px solid #C5D4C3",borderRadius:12,display:"block"}}>
          <g transform="translate(30,20)">

            {/* Building shell */}
            <rect x={0} y={0} width={bW} height={bH}
              fill="#EAE8E3" stroke="#2D5A2B" strokeWidth={3} />

            {/* Subtle grid */}
            {vLines.map(x=>(
              <line key={x} x1={x} y1={0} x2={x} y2={bH}
                stroke="#D0CCC5" strokeWidth={.6} strokeDasharray="3 5"/>
            ))}
            {hLines.map(y=>(
              <line key={y} x1={0} y1={y} x2={bW} y2={y}
                stroke="#D0CCC5" strokeWidth={.6} strokeDasharray="3 5"/>
            ))}

            {/* Rooms */}
            {rooms.map(r=>(
              <Room key={r.id} r={r} hov={hov} setHov={setHov} />
            ))}

            {/* Main entrance arrow (GF south) */}
            {floor===0 && (
              <g transform={`translate(${15*S},${20*S+14})`}>
                <polygon points="0,-10 -8,0 8,0" fill="#2D5A2B" opacity={.7}/>
                <text x={0} y={22} textAnchor="middle" fontSize={9} fill="#2D5A2B" fontWeight={700}>
                  MAIN ENTRANCE
                </text>
              </g>
            )}

            {/* Patio (GF only) */}
            {floor===0 && <>
              <rect x={0} y={bH} width={bW} height={patioH}
                fill={C.patio.bg} stroke={C.patio.border} strokeWidth={2} strokeDasharray="9 5" />
              <text x={bW/2} y={bH+38} textAnchor="middle" fontSize={18} style={{userSelect:"none"}}>🌱</text>
              <text x={bW/2} y={bH+62} textAnchor="middle" fontSize={12} fontWeight={700} fill="#065F46">
                Outdoor Patio & Gardening Area
              </text>
              <text x={bW/2} y={bH+78} textAnchor="middle" fontSize={9} fill="#047857">
                30m × 6m · raised garden beds · accessible paths · shaded seating
              </text>
              <text x={bW/2} y={bH+93} textAnchor="middle" fontSize={8} fill="#6EE7B7">
                (External — ground level)
              </text>
            </>}

            {/* North arrow */}
            <g transform={`translate(${bW-22},22)`}>
              <circle cx={0} cy={0} r={16} fill="white" stroke="#2D5A2B" strokeWidth={1.5} opacity={.92}/>
              <polygon points="0,-11 -4,5 0,1 4,5" fill="#2D5A2B"/>
              <text x={0} y={24} textAnchor="middle" fontSize={8} fontWeight={800} fill="#2D5A2B">N</text>
            </g>

            {/* Scale bar */}
            <g transform={`translate(6,${svgH-14})`}>
              <rect x={0} y={0} width={50} height={5} fill="#2D5A2B"/>
              <rect x={50} y={0} width={50} height={5} fill="#A3C4A1"/>
              <text x={0} y={14} fontSize={8} fill="#4A6B48">0</text>
              <text x={44} y={14} fontSize={8} fill="#4A6B48">2.5m</text>
              <text x={94} y={14} fontSize={8} fill="#4A6B48">5m</text>
            </g>

            {/* Dimension labels */}
            <text x={bW/2} y={-6} textAnchor="middle" fontSize={10} fill="#9AA896">← 30 meters →</text>
            <text x={-16} y={bH/2} textAnchor="middle" fontSize={10} fill="#9AA896"
              transform={`rotate(-90,-16,${bH/2})`}>← 20 m →</text>
          </g>
        </svg>
      </div>

      {/* ── Legend ── */}
      <div style={{marginTop:14, display:"flex", flexWrap:"wrap", gap:"6px 12px"}}>
        {LEGEND.map(({c,label})=>(
          <div key={label} style={{display:"flex",alignItems:"center",gap:5,fontSize:11,color:"#4A6B48"}}>
            <div style={{width:13,height:13,background:c.bg,border:`1.5px solid ${c.border}`,borderRadius:3}}/>
            {label}
          </div>
        ))}
      </div>

      {/* ── Design Notes ── */}
      <div style={{
        marginTop:20, padding:"14px 18px",
        background:"#fff", border:"1px solid #D4D0CA", borderRadius:10,
        fontSize:12, color:"#4A6B48", lineHeight:1.8
      }}>
        <div style={{fontWeight:700,marginBottom:6,color:"#1C3B1A"}}>
          {floor===0 ? "🏪 Ground Floor — Design Notes" : "🏫 Upper Floor — Design Notes"}
        </div>
        {floor===0 ? (
          <ul style={{margin:0,paddingLeft:18}}>
            <li>Every room opens directly onto the central atrium corridor — <strong>no room-through-room access</strong></li>
            <li>Glass-roof atrium brings natural light to all surrounding spaces and acts as the social heart of the café</li>
            <li>Kitchen and Cooking Class share the north wall for shared ventilation / extraction</li>
            <li>Café Counter faces Reception — visibility from entrance to ordering point is immediate</li>
            <li>Accessible WC block (east) + Washrooms (south-east) serve both café guests and institute visitors</li>
            <li>Outdoor Patio extends 6m south with raised garden beds linked to the Gardening programme</li>
          </ul>
        ) : (
          <ul style={{margin:0,paddingLeft:18}}>
            <li>Atrium void in the center <strong>looks down into the ground-floor courtyard</strong> — bright and airy</li>
            <li>All rooms face the internal circulation corridor — mall-style independent access</li>
            <li>Therapy Rooms 1 & 2 are on the quieter west wing, away from the busier north classrooms</li>
            <li>Sensory & Play Room is on the quieter east side, with 100 m² for stimulation & calm-down zones</li>
            <li>Art Room and Physiotherapy are in the south wing, accessible directly from the corridor</li>
            <li>Stairs & Lift aligned vertically with ground floor — same core position for structural efficiency</li>
          </ul>
        )}
      </div>
    </div>
  );
}
