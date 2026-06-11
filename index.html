import { useState } from "react";

const S = 22;        // px per meter
const BX = 55;       // left/right padding
const TY = 45;       // top padding
const OD = 14;       // outdoor depth (meters)
const BW = 30;       // building width (meters)
const BH = 20;       // building height (meters)

const OUTDOOR_TOP  = TY;
const BUILDING_TOP = TY + OD * S;
const SVG_W = BX * 2 + BW * S;          // 770px
const SVG_H = TY + (OD + BH) * S + 80;  // 873px

const P = {
  cafe:     { bg:"#D4E8C2", bd:"#5A9E3A", tx:"#1E5A0A" },
  kitchen:  { bg:"#FDDCB5", bd:"#D87030", tx:"#6A2800" },
  studio:   { bg:"#D5DCEE", bd:"#4858A8", tx:"#101A60" },
  sensory:  { bg:"#E8D8F0", bd:"#7838A0", tx:"#380868" },
  reception:{ bg:"#FFF0BB", bd:"#C89800", tx:"#504800" },
  wc:       { bg:"#C8E8E4", bd:"#208898", tx:"#084858" },
  office:   { bg:"#C8DDD8", bd:"#287068", tx:"#083030" },
  storage:  { bg:"#E0DDDA", bd:"#887870", tx:"#303028" },
  lounge:   { bg:"#F8D5DF", bd:"#C02858", tx:"#580018" },
  corridor: { bg:"#EFEEEC", bd:"#A89888", tx:"#484038" },
  patio:    { bg:"#C8E0A0", bd:"#4A8820", tx:"#183808" },
  garden:   { bg:"#A8CE80", bd:"#387818", tx:"#103000" },
  sGarden:  { bg:"#D8EEC8", bd:"#589838", tx:"#183808" },
  shed:     { bg:"#D8CFCA", bd:"#785848", tx:"#301808" },
  path:     { bg:"#F5E5BF", bd:"#C09840", tx:"#503800" },
};

const INDOOR = [
  { id:"kitchen",   label:"Kitchen &\nCooking Lessons", icon:"🍳", x:0,  y:0,  w:10, h:7,  c:"kitchen",   area:70,
    desc:"Accessible worktops at wheelchair height. Cooking lesson space for 12 participants. Direct garden access for harvesting fresh produce for the café." },
  { id:"studio",    label:"Art & Design\nStudio",        icon:"🎨", x:10, y:0,  w:10, h:7,  c:"studio",    area:70,
    desc:"Creative workspace with adaptive tools and extra-wide aisles. Dedicated wall storage for art supplies. Participants display and sell their work in the café." },
  { id:"sensory",   label:"Sensory\nQuiet Room",         icon:"🌿", x:20, y:0,  w:10, h:7,  c:"sensory",   area:70,
    desc:"Calming retreat space with adjustable soft lighting, sound-absorbing panels, and tactile wall features. Direct door to the outdoor sensory garden walk." },
  { id:"office",    label:"Staff\nOffice",               icon:"🏢", x:0,  y:7,  w:6,  h:6,  c:"office",    area:36,
    desc:"Admin hub and care coordination. Government-funded staff base with private meeting room and observation window to main corridor." },
  { id:"storage",   label:"Storage &\nUtility",          icon:"📦", x:6,  y:7,  w:4,  h:6,  c:"storage",   area:24,
    desc:"Adaptive equipment, café supplies, garden tools and cleaning. Accessible shelving and utility sink." },
  { id:"cafe",      label:"Café & Dining Area",          icon:"☕", x:10, y:7,  w:20, h:6,  c:"cafe",      area:120,
    desc:"The heart of the institute! 40+ fully accessible seats. Run by participants — open to the public, families, supporters and the community. Features participant artwork on the walls." },
  { id:"reception", label:"Reception\n& Entry Hall",     icon:"🚪", x:0,  y:13, w:9,  h:7,  c:"reception", area:63,
    desc:"Welcoming accessible street entrance. Information desk, sign-in area, and display of participant artwork and fresh garden produce for sale." },
  { id:"corridor",  label:"Accessible\nCorridor",        icon:"♿", x:9,  y:13, w:5,  h:7,  c:"corridor",  area:35,
    desc:"Extra-wide central corridor with tactile floor guide strips. Connects all ground-floor spaces. Emergency-accessible throughout." },
  { id:"wc",        label:"Accessible\nWashrooms",       icon:"🚻", x:14, y:13, w:6,  h:7,  c:"wc",        area:42,
    desc:"3 large accessible stalls with ceiling hoist track, adult change table, full wheelchair turning radius, and family cubicle." },
  { id:"lounge",    label:"Family\nLounge",              icon:"❤️", x:20, y:13, w:10, h:7,  c:"lounge",    area:70,
    desc:"Dedicated rest space for families and carers while participants are in program. Comfortable seating, small kitchenette, quiet and welcoming." },
];

const OUTDOOR = [
  { id:"patio",   label:"Covered Patio",         icon:"⛱️", x:0,  y:0,  w:20, h:5,  c:"patio",   area:100,
    desc:"All-weather shaded outdoor dining extending the café. Pergola roof with climbing plants. Accessible tables at varied heights, heated for colder months." },
  { id:"shed",    label:"Garden Shed",            icon:"🛖",  x:20, y:0,  w:5,  h:5,  c:"shed",    area:25,
    desc:"Accessible garden shed with wheelchair-height potting bench. Organized tool storage, seed station, and participant project storage." },
  { id:"sGarden", label:"Sensory Garden\nWalk",  icon:"🌸", x:25, y:0,  w:5,  h:14, c:"sGarden", area:70,
    desc:"Winding accessible path lined with fragrant and textured plants — lavender, mint, rosemary. Seating alcoves and small water feature throughout." },
  { id:"bed1",    label:"Raised Beds\nVegetables",icon:"🥕", x:0,  y:5,  w:8,  h:5,  c:"garden",  area:40,
    desc:"Wheelchair-height raised beds growing seasonal vegetables and herbs. Harvested by participants and used fresh in the café kitchen." },
  { id:"bed2",    label:"Raised Beds\nFlowers",  icon:"🌻", x:8,  y:5,  w:9,  h:5,  c:"garden",  area:45,
    desc:"Pollinator garden with sunflowers, marigolds and wildflowers. A cut-flower station — participants arrange and sell bouquets in the café." },
  { id:"bed3",    label:"Raised Beds\nFruit",    icon:"🍓", x:17, y:5,  w:8,  h:5,  c:"garden",  area:40,
    desc:"Dwarf fruit trees and berry bushes in accessible containers. Strawberries, blueberries and seasonal fruit used in café baking lessons." },
  { id:"path",    label:"Accessible Path Loop",  icon:"👣", x:0,  y:10, w:25, h:4,  c:"path",    area:100,
    desc:"Wide smooth paved loop connecting all garden zones. Anti-slip surface, gentle gradient. A therapeutic walking and sensory route for participants." },
];

export default function FloorPlan() {
  const [selected, setSelected] = useState(null);

  const toggle = (r) => setSelected(s => s?.id === r.id ? null : r);

  const Rooms = ({ list, yBase }) =>
    list.map(r => {
      const px = BX + r.x * S, py = yBase + r.y * S;
      const pw = r.w * S,      ph = r.h * S;
      const col = P[r.c];
      const cx = px + pw / 2,  cy = py + ph / 2;
      const lines = r.label.split("\n");
      const active = selected?.id === r.id;
      const tyOffset = -(lines.length - 1) * 7;

      return (
        <g key={r.id} onClick={() => toggle(r)} style={{ cursor: "pointer" }}>
          <rect x={px} y={py} width={pw} height={ph}
            fill={active ? col.bd : col.bg}
            stroke={col.bd} strokeWidth={active ? 3 : 1.5} rx={2} />
          {pw > 55 && ph > 45 && (
            <text x={px + 9} y={py + 18} fontSize={14} fontFamily="sans-serif">{r.icon}</text>
          )}
          {lines.map((line, i) => (
            <text key={i} x={cx} y={cy + tyOffset + i * 14}
              textAnchor="middle" dominantBaseline="middle"
              fontSize={pw > 100 ? 11 : 9} fontWeight="600"
              fill={active ? "#fff" : col.tx}
              fontFamily="Georgia, 'Times New Roman', serif">
              {line}
            </text>
          ))}
          {ph > 48 && pw > 55 && (
            <text x={cx} y={py + ph - 10} textAnchor="middle" fontSize={9}
              fill={active ? "rgba(255,255,255,0.75)" : col.tx} opacity={0.7}
              fontFamily="sans-serif">{r.area}m²</text>
          )}
        </g>
      );
    });

  return (
    <div style={{ background:"#F5F0EA", minHeight:"100vh", padding:"16px",
      fontFamily:"Georgia,'Times New Roman',serif" }}>
      <div style={{ maxWidth:800, margin:"0 auto" }}>

        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:12 }}>
          <h1 style={{ fontSize:19, color:"#3D2B1F", margin:"0 0 3px", letterSpacing:"0.5px" }}>
            Special Needs Institute & Café
          </h1>
          <p style={{ fontSize:13, color:"#7A6050", margin:0 }}>
            Suggested Floor Plan — Toronto, Canada
          </p>
          <p style={{ fontSize:11, color:"#9A8878", margin:"3px 0 0",
            fontFamily:"sans-serif", fontStyle:"italic" }}>
            Tap any room or space to see details
          </p>
        </div>

        {/* SVG Plan */}
        <div style={{ overflowX:"auto", WebkitOverflowScrolling:"touch", borderRadius:8 }}>
          <svg width={SVG_W} height={SVG_H}
            style={{ display:"block", background:"#F9F6F0",
              border:"1px solid #D5C8B8", borderRadius:8 }}>

            {/* Outdoor background */}
            <rect x={BX} y={OUTDOOR_TOP} width={BW*S} height={OD*S}
              fill="#EAF4E0" stroke="#4A8820" strokeWidth={2} />
            {/* Indoor background */}
            <rect x={BX} y={BUILDING_TOP} width={BW*S} height={BH*S}
              fill="#FAF7F2" stroke="#4A3C30" strokeWidth={3.5} />

            {/* Zone labels */}
            <text x={BX+8} y={OUTDOOR_TOP+16} fontSize={9.5} fill="#3A7018"
              fontWeight="bold" fontFamily="sans-serif" letterSpacing={1}>
              🌿  OUTDOOR GARDEN ZONE  —  NORTH ↑
            </text>
            <text x={BX+8} y={BUILDING_TOP+16} fontSize={9.5} fill="#4A3C30"
              fontWeight="bold" fontFamily="sans-serif" letterSpacing={1}>
              🏠  INDOOR BUILDING
            </text>

            {/* Rooms */}
            <Rooms list={OUTDOOR} yBase={OUTDOOR_TOP} />
            <Rooms list={INDOOR}  yBase={BUILDING_TOP} />

            {/* Entrance arrow */}
            <text x={BX + 4.5*S} y={BUILDING_TOP + BH*S + 22}
              textAnchor="middle" fontSize={11} fill="#CC3300"
              fontFamily="sans-serif" fontWeight="bold">
              ▲  MAIN ENTRANCE  ▲
            </text>
            <text x={BX + 4.5*S} y={BUILDING_TOP + BH*S + 38}
              textAnchor="middle" fontSize={10} fill="#999"
              fontFamily="sans-serif">
              South — Street-facing
            </text>

            {/* Width label top */}
            <text x={BX + BW*S/2} y={OUTDOOR_TOP - 12}
              textAnchor="middle" fontSize={10} fill="#5A5040"
              fontFamily="sans-serif">
              ←————————————  30 metres  ————————————→
            </text>

            {/* Height labels on left (rotated) */}
            {[
              { label:"14m outdoor", y: OUTDOOR_TOP + OD*S/2, fill:"#3A7018" },
              { label:"20m indoor",  y: BUILDING_TOP + BH*S/2, fill:"#4A3C30" },
            ].map(l => (
              <text key={l.label}
                x={BX - 14} y={l.y}
                textAnchor="middle" fontSize={9}
                fill={l.fill} fontFamily="sans-serif"
                transform={`rotate(-90, ${BX-14}, ${l.y})`}>
                {l.label}
              </text>
            ))}

            {/* Scale bar */}
            <g transform={`translate(${BX + BW*S - 5*S - 8}, ${BUILDING_TOP + BH*S + 20})`}>
              <line x1={0} y1={0} x2={5*S} y2={0} stroke="#7A6050" strokeWidth={2} />
              <line x1={0} y1={-5} x2={0} y2={5} stroke="#7A6050" strokeWidth={1.5} />
              <line x1={5*S} y1={-5} x2={5*S} y2={5} stroke="#7A6050" strokeWidth={1.5} />
              <text x={5*S/2} y={18} textAnchor="middle"
                fontSize={9} fill="#7A6050" fontFamily="sans-serif">5 metres</text>
            </g>
          </svg>
        </div>

        {/* Selected room panel */}
        {selected && (
          <div style={{
            marginTop:10,
            background: P[selected.c].bg,
            border:`2px solid ${P[selected.c].bd}`,
            borderRadius:8, padding:"12px 14px",
          }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
              <div>
                <p style={{ margin:"0 0 2px", fontSize:14, fontWeight:"bold",
                  color: P[selected.c].tx }}>
                  {selected.icon}  {selected.label.replace("\n"," ")}
                </p>
                <p style={{ margin:"0 0 6px", fontSize:11,
                  color: P[selected.c].tx, opacity:0.75,
                  fontFamily:"sans-serif" }}>
                  Floor area: {selected.area} m²
                </p>
                <p style={{ margin:0, fontSize:12.5, color: P[selected.c].tx,
                  lineHeight:1.55, fontFamily:"sans-serif" }}>
                  {selected.desc}
                </p>
              </div>
              <button onClick={() => setSelected(null)}
                style={{ background:"none", border:"none", fontSize:20,
                  cursor:"pointer", color: P[selected.c].tx,
                  padding:"0 0 0 14px", flexShrink:0, lineHeight:1 }}>
                ×
              </button>
            </div>
          </div>
        )}

        {/* Legend grid */}
        <div style={{ marginTop:10, display:"grid",
          gridTemplateColumns:"1fr 1fr", gap:8 }}>
          {[
            { title:"🏠 Indoor Spaces", list: INDOOR },
            { title:"🌿 Outdoor Spaces", list: OUTDOOR },
          ].map(sec => (
            <div key={sec.title} style={{
              background:"white", border:"1px solid #E0D5CC",
              borderRadius:8, padding:"10px 12px",
            }}>
              <p style={{ margin:"0 0 7px", fontWeight:"bold",
                fontSize:12, color:"#3D2B1F" }}>{sec.title}</p>
              {sec.list.map(r => (
                <div key={r.id} onClick={() => toggle(r)}
                  style={{ display:"flex", alignItems:"center",
                    gap:6, marginBottom:5, cursor:"pointer" }}>
                  <div style={{
                    width:11, height:11, flexShrink:0,
                    background: P[r.c].bg,
                    border:`1.5px solid ${P[r.c].bd}`,
                    borderRadius:2,
                  }} />
                  <span style={{ fontSize:10.5, color:"#5A4A3A",
                    fontFamily:"sans-serif" }}>
                    {r.icon} {r.label.replace("\n"," ")} — {r.area}m²
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Summary bar */}
        <div style={{
          marginTop:10, background:"white",
          border:"1px solid #E0D5CC", borderRadius:8,
          padding:"10px 16px",
          display:"grid", gridTemplateColumns:"1fr 1fr 1fr",
          gap:8, textAlign:"center",
        }}>
          {[
            { val:"~530m²", label:"Indoor",  sub:"10 rooms" },
            { val:"~420m²", label:"Outdoor", sub:"7 zones" },
            { val:"~950m²", label:"Total",   sub:"Full grounds" },
          ].map(s => (
            <div key={s.label}>
              <p style={{ margin:0, fontSize:18, fontWeight:"bold",
                color:"#3D2B1F" }}>{s.val}</p>
              <p style={{ margin:0, fontSize:11, color:"#7A6050",
                fontFamily:"sans-serif" }}>{s.label}</p>
              <p style={{ margin:0, fontSize:10, color:"#A09080",
                fontFamily:"sans-serif" }}>{s.sub}</p>
            </div>
          ))}
        </div>

        <p style={{ textAlign:"center", fontSize:10, color:"#B0A090",
          marginTop:8, fontFamily:"sans-serif" }}>
          Conceptual layout only — consult an architect & occupational therapist for final design
        </p>
      </div>
    </div>
  );
}
