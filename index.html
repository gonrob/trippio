import { useState, useEffect, useRef, useCallback } from "react";

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
const P = {
  black: "#0D0D0D", card: "#141414", card2: "#1A1A1A", card3: "#252525",
  border: "#2A2A2A", border2: "#333333", muted: "#6B6B6B", sub: "#A0A0A0",
  white: "#FFFFFF", gold: "#C9A96E", goldDim: "rgba(201,169,110,.18)",
  goldBorder: "rgba(201,169,110,.25)", goldGlow: "rgba(201,169,110,0.3)",
};
const GOLD_GRAD  = "linear-gradient(135deg,#C9A96E,#E8C98A)";
const GOLD_GRAD2 = "linear-gradient(135deg,#B8935A,#C9A96E)";

// ─── STATIC DATA ─────────────────────────────────────────────────────────────
const TRIP_TYPES = {
  adventure: { icon: "🏔️" }, culture:   { icon: "🏛️" }, beach:   { icon: "🏖️" },
  gastro:    { icon: "🍜" }, nature:    { icon: "🌿" }, city:    { icon: "🏙️" },
  wellness:  { icon: "🧘" }, nightlife: { icon: "🎉" }, retreat: { icon: "🌀" },
};
const TRAVELER_STYLES = {
  backpacker: { icon: "🎒", stars: "1",   pct: 0.15 },
  comfort:    { icon: "🛎️", stars: "2-3", pct: 0.35 },
  luxury:     { icon: "💎", stars: "4-5", pct: 0.60 },
};

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────
const T = {
  es: {
    flag: "🇪🇸", name: "Español", locale: "es-ES", lp: "Responde en español.",
    newSearch: "Nueva búsqueda",
    h1a: "Tu próximo viaje,", h1b: "en un clic.",
    sub: "Elige tu estilo, destino y presupuesto.",
    stepTripType: "¿Qué tipo de viaje?", stepSub: "Elige uno o varios",
    stepStyle: "¿Cómo prefieres viajar?", stepDetails: "Cuéntanos más",
    tripNames: { adventure:"Aventura", culture:"Cultura", beach:"Playa", gastro:"Gastronomía",
      nature:"Naturaleza", city:"Ciudad", wellness:"Bienestar", nightlife:"Vida Nocturna", retreat:"Retiro" },
    styleNames: { backpacker:"Mochilero", comfort:"Confort", luxury:"Lujo" },
    styleDesc:  { backpacker:"Hostels 1★, auténtico", comfort:"Hoteles 2-3★, equilibrio", luxury:"Hoteles 4-5★, VIP" },
    originL: "Origen", destL: "Destino", budgetL: "Presupuesto (€)",
    originPh: "Madrid, España", destPh: "Tokio, París, Bangkok...", budgetPh: "1000",
    arrival: "Llegada", departure: "Salida",
    travelersL: "Viajeros", t1: "1 viajero", tN: n => `${n} viajeros`,
    searchBtn: "Buscar mi viaje ✦", nextBtn: "Siguiente →", backBtn: "← Atrás",
    loadTitle: "Preparando tu aventura…", loadSub: "Buscando las mejores opciones",
    steps: ["Creando itinerario","Vuelos","Hoteles","Restaurantes","Clima","¡Listo!"],
    flightsT: "Vuelos disponibles",
    flightsSub: (d, n, o) => `${o || "Madrid"} → ${d} · ${n} viajero${n > 1 ? "s" : ""}`,
    direct: "✈ Directo", stops: n => `${n} escala${n > 1 ? "s" : ""}`, pp: "por persona",
    hotelsT: "Hoteles", hotelsSub: n => `${n} noches`, pn: "/ noche", mapBtn: "🗺 Mapa",
    mapT: "Mapa del viaje", mapSub: "Hoteles · Restaurantes · Lugares",
    restsT: "Dónde comer", restsSub: "Mejores restaurantes",
    vegT: "Opciones vegetarianas", vegSub: "Restaurantes plant-based",
    itinT: "Itinerario día a día", itinSub: "Tu plan personalizado",
    morning: "☀️ Mañana", afternoon: "🌤 Tarde", evening: "🌙 Noche", transport: "🚇 Transporte",
    tipsT: "Tips del viaje", transportT: "Transporte", transportSub: "Movilidad local",
    weatherT: "Previsión del tiempo", weatherSub: "Durante tu viaje",
    pkgT: "Resumen", taxes: "Tasas", totalL: "Total estimado",
    bookBtn: "🔒 Reservar paquete", bookFlight: "✈️ Reservar vuelo",
    bookHotel: "🏨 Reservar hotel", bookRest: "🍽️ Reservar mesa", bookTour: "🎟️ Ver tours",
    demoNote: "Demo · Sin cargos reales", demoSmall: "Precios orientativos",
    shareBtn: "Compartir", shareCopied: "Enlace copiado",
    errorTitle: "Algo salió mal", errorMsg: "Error al generar. Inténtalo de nuevo.",
    days: n => `${n} días`,
    guideName: "Marco", guideHi: "¡Hola! Soy Marco, tu guía personal. ¿En qué te ayudo?",
    guideNear: "Estás cerca de", guidePh: "Pregúntame sobre este destino...",
    saveTrip: "Guardar viaje", myTrips: "Mis viajes", tripSaved: "¡Viaje guardado!",
  },
  en: {
    flag: "🇬🇧", name: "English", locale: "en-GB", lp: "Respond in English.",
    newSearch: "New search",
    h1a: "Your next trip,", h1b: "in one click.",
    sub: "Choose your style, destination and budget.",
    stepTripType: "What kind of trip?", stepSub: "Choose one or more",
    stepStyle: "How do you travel?", stepDetails: "Tell us more",
    tripNames: { adventure:"Adventure", culture:"Culture", beach:"Beach", gastro:"Gastronomy",
      nature:"Nature", city:"City Break", wellness:"Wellness", nightlife:"Nightlife", retreat:"Retreat" },
    styleNames: { backpacker:"Backpacker", comfort:"Comfort", luxury:"Luxury" },
    styleDesc:  { backpacker:"Hostels 1★, authentic", comfort:"2-3★ hotels, value", luxury:"4-5★ hotels, VIP" },
    originL: "Origin", destL: "Destination", budgetL: "Budget (€)",
    originPh: "London, UK", destPh: "Tokyo, Paris, Bangkok...", budgetPh: "1000",
    arrival: "Check-in", departure: "Check-out",
    travelersL: "Travelers", t1: "1 traveler", tN: n => `${n} travelers`,
    searchBtn: "Find my trip ✦", nextBtn: "Next →", backBtn: "← Back",
    loadTitle: "Preparing your adventure…", loadSub: "Searching best options",
    steps: ["Creating itinerary","Flights","Hotels","Restaurants","Weather","All ready!"],
    flightsT: "Available flights",
    flightsSub: (d, n, o) => `${o || "Madrid"} → ${d} · ${n} traveler${n > 1 ? "s" : ""}`,
    direct: "✈ Direct", stops: n => `${n} stop${n > 1 ? "s" : ""}`, pp: "per person",
    hotelsT: "Hotels", hotelsSub: n => `${n} nights`, pn: "/ night", mapBtn: "🗺 Map",
    mapT: "Trip map", mapSub: "Hotels · Restaurants · Places",
    restsT: "Where to eat", restsSub: "Best restaurants",
    vegT: "Vegetarian options", vegSub: "Plant-based restaurants",
    itinT: "Day by day itinerary", itinSub: "Your personalized plan",
    morning: "☀️ Morning", afternoon: "🌤 Afternoon", evening: "🌙 Evening", transport: "🚇 Transport",
    tipsT: "Travel tips", transportT: "Transport", transportSub: "Local mobility",
    weatherT: "Weather forecast", weatherSub: "During your trip",
    pkgT: "Summary", taxes: "Taxes", totalL: "Estimated total",
    bookBtn: "🔒 Book package", bookFlight: "✈️ Book flight",
    bookHotel: "🏨 Book hotel", bookRest: "🍽️ Book table", bookTour: "🎟️ View tours",
    demoNote: "Demo · No real charges", demoSmall: "Estimated prices",
    shareBtn: "Share", shareCopied: "Link copied",
    errorTitle: "Something went wrong", errorMsg: "Error generating. Please try again.",
    days: n => `${n} days`,
    guideName: "Marco", guideHi: "Hi! I'm Marco, your personal guide. How can I help?",
    guideNear: "You are near", guidePh: "Ask me about this destination...",
    saveTrip: "Save trip", myTrips: "My trips", tripSaved: "Trip saved!",
  },
};

// ─── DESTINATION IMAGES ───────────────────────────────────────────────────────
const DEST_IMGS = {
  default:  "https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=900&q=85",
  tokio:    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=900&q=85",
  tokyo:    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=900&q=85",
  roma:     "https://images.unsplash.com/photo-1529260830199-42c24126f198?w=900&q=85",
  rome:     "https://images.unsplash.com/photo-1529260830199-42c24126f198?w=900&q=85",
  paris:    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=900&q=85",
  bangkok:  "https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=900&q=85",
  bali:     "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&q=85",
  nueva:    "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=900&q=85",
  new:      "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=900&q=85",
  lisboa:   "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=900&q=85",
  berlin:   "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=900&q=85",
  dubai:    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&q=85",
  barcelona:"https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=900&q=85",
  madrid:   "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=900&q=85",
  london:   "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=900&q=85",
  amsterdam:"https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=900&q=85",
};
const HOTEL_IMGS = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=75",
  "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&q=75",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=75",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&q=75",
  "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&q=75",
  "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&q=75",
];
const REST_IMGS = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=75",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=75",
  "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&q=75",
  "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=400&q=75",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=75",
];

// ─── UTILITIES ────────────────────────────────────────────────────────────────
function getImg(dest = "") {
  const d = dest.toLowerCase();
  for (const [k, v] of Object.entries(DEST_IMGS)) if (d.includes(k)) return v;
  return DEST_IMGS.default;
}
const diffDays = (a, b) =>
  !a || !b ? null : Math.round((new Date(b + "T12:00:00") - new Date(a + "T12:00:00")) / 86400000) + 1;
const fmtDate = (s, o, loc) =>
  !s ? "" : new Date(s + "T12:00:00").toLocaleDateString(loc || "es-ES", o || { day: "numeric", month: "short" });
const haversine = (a, b, c, d) => {
  const R = 6371e3, p = Math.PI / 180;
  const x = Math.sin((c - a) * p / 2) ** 2 + Math.cos(a * p) * Math.cos(c * p) * Math.sin((d - b) * p / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
};

// Safe JSON parse — never throws
function safeJson(text) {
  try {
    const clean = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    return JSON.parse(clean);
  } catch {
    return null;
  }
}

// ─── WEATHER ──────────────────────────────────────────────────────────────────
async function fetchWeather(lat, lon, start) {
  try {
    const r = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
      `&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weathercode` +
      `&timezone=auto&start_date=${start}&forecast_days=7`
    );
    const d = await r.json();
    return d.daily;
  } catch { return null; }
}
const WX = { 0:"☀️",1:"🌤",2:"⛅",3:"☁️",45:"🌫",51:"🌦",61:"🌧",71:"❄️",80:"🌦",95:"⛈️" };
const wxI = c => WX[c] || "🌡";

// ─── LEAFLET HOOK ─────────────────────────────────────────────────────────────
function useLeaflet() {
  const [ready, setReady] = useState(!!window.L);
  useEffect(() => {
    if (window.L) { setReady(true); return; }
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
    document.head.appendChild(css);
    const js = document.createElement("script");
    js.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
    js.onload = () => setReady(true);
    document.head.appendChild(js);
  }, []);
  return ready;
}

// ─── GLOBAL CSS ───────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  @keyframes float   { 0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)} }
  @keyframes wiggle  { 0%,100%{transform:rotate(-5deg)}50%{transform:rotate(5deg)} }
  @keyframes dot     { 0%,80%,100%{transform:scale(0.6);opacity:.4}40%{transform:scale(1);opacity:1} }
  @keyframes pulse   { 0%,100%{opacity:1}50%{opacity:.4} }
  @keyframes fadeIn  { from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)} }
  @keyframes shimmer { 0%{background-position:-200% 0}100%{background-position:200% 0} }
  @keyframes spin    { to{transform:rotate(360deg)} }
  * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
  body { margin: 0; background: #0D0D0D; font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif; }
  ::-webkit-scrollbar { width: 4px; height: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
  input, button, textarea { font-family: inherit; }
  .card-enter { animation: fadeIn .35s ease both; }
`;
function GlobalStyle() {
  return <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />;
}

// ─── LOGO ─────────────────────────────────────────────────────────────────────
function TrippioLogo({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0, filter: `drop-shadow(0 ${size * .06}px ${size * .18}px rgba(201,169,110,0.4))` }}>
      <defs>
        <linearGradient id="lg" x1="15%" y1="15%" x2="85%" y2="85%">
          <stop offset="0%" stopColor="#E8C98A" /><stop offset="100%" stopColor="#B8935A" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="45" stroke="url(#lg)" strokeWidth="2.5" opacity="0.6" />
      <path d="M 24 72 L 68 20 L 76 54 Z" fill="url(#lg)" opacity="0.95" />
      <path d="M 24 72 L 76 54 L 52 68 Z" fill="#B8935A" opacity="0.7" />
      <line x1="24" y1="72" x2="76" y2="54" stroke="#0D0D0D" strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

// ─── MAP COMPONENT ────────────────────────────────────────────────────────────
function TravelMap({ places, active, onSelect, userPos }) {
  const nRef = useRef(null), lRef = useRef(null), mRef = useRef([]), uRef = useRef(null);
  const leafletReady = useLeaflet();

  // Init map once Leaflet is loaded and container is ready
  useEffect(() => {
    if (!leafletReady || !nRef.current || lRef.current) return;
    const L = window.L;
    const map = L.map(nRef.current, { zoomControl: false, attributionControl: false });
    L.control.zoom({ position: "bottomright" }).addTo(map);
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", { maxZoom: 19 }).addTo(map);
    lRef.current = map;
    return () => { map.remove(); lRef.current = null; };
  }, [leafletReady]);

  // Update markers when places change
  useEffect(() => {
    const L = window.L, map = lRef.current;
    if (!L || !map || !places?.length) return;
    mRef.current.forEach(m => m.remove());
    mRef.current = [];
    const bounds = [];
    places.forEach((p, i) => {
      if (!p.lat || !p.lng) return;
      const isA = active === i, isH = p.type === "hotel";
      const em = isH ? "🏨" : p.type === "restaurant" ? "🍽️" : "◆";
      const sz = isA ? 44 : 34;
      const html = `<div style="width:${sz}px;height:${sz}px;background:${isA ? P.gold : "#2C2C2E"};border:2.5px solid ${P.gold};border-radius:${isH ? "12px" : "50%"};display:flex;align-items:center;justify-content:center;font-size:${isA ? 18 : 13}px;cursor:pointer">${isA ? em : i + 1}</div>`;
      const icon = L.divIcon({ className: "", html, iconSize: [sz, sz], iconAnchor: [sz / 2, sz / 2] });
      const mk = L.marker([p.lat, p.lng], { icon })
        .addTo(map)
        .bindPopup(`<b>${em} ${p.name}</b>${p.desc ? `<p style="font-size:11px;color:#555;margin:4px 0 0">${p.desc}</p>` : ""}`)
        .on("click", () => onSelect(i));
      mRef.current.push(mk);
      bounds.push([p.lat, p.lng]);
    });
    if (bounds.length) map.fitBounds(bounds, { padding: [44, 44], maxZoom: 14, animate: true });
  }, [places, leafletReady]); // NOTE: removing 'active' from here prevents re-render flicker

  // Fly to active marker separately
  useEffect(() => {
    const map = lRef.current;
    if (!map || active == null || !places?.[active]) return;
    const p = places[active];
    if (p.lat && p.lng) {
      map.flyTo([p.lat, p.lng], 15, { animate: true, duration: 1 });
      mRef.current[active]?.openPopup();
    }
  }, [active]);

  // User position marker
  useEffect(() => {
    const L = window.L, map = lRef.current;
    if (!L || !map || !userPos) return;
    if (uRef.current) uRef.current.remove();
    const html = `<div style="width:18px;height:18px;background:#3B82F6;border:3px solid #fff;border-radius:50%;box-shadow:0 0 0 6px rgba(59,130,246,.3)"></div>`;
    const icon = L.divIcon({ className: "", html, iconSize: [18, 18], iconAnchor: [9, 9] });
    uRef.current = L.marker([userPos.lat, userPos.lng], { icon }).addTo(map).bindPopup("Tu posición");
  }, [userPos]);

  return (
    <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,.4)" }}>
      <div ref={nRef} style={{ height: 340 }} />
    </div>
  );
}

// ─── GUIDE CHARACTER (animated SVG) ──────────────────────────────────────────
function GuideChar({ mood, speaking, size }) {
  mood = mood || "happy"; size = size || 60;
  const [blink, setBlink] = useState(false);
  useEffect(() => {
    const i = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150);
    }, 3500);
    return () => clearInterval(i);
  }, []);
  const c = { happy: { b: "#F4A261", f: "#E76F51" }, thinking: { b: "#7ECBA1", f: "#52B788" },
    excited: { b: "#C9A96E", f: "#B8935A" }, nearby: { b: "#8B7CF8", f: "#7C3AED" } }[mood]
    || { b: "#F4A261", f: "#E76F51" };
  return (
    <div style={{ width: size, height: size, flexShrink: 0,
      animation: speaking ? "wiggle .3s ease infinite" : "float 3s ease-in-out infinite" }}>
      <svg width={size} height={size} viewBox="0 0 80 80">
        <circle cx="40" cy="50" r="22" fill={c.b} opacity="0.9" />
        <circle cx="40" cy="28" r="18" fill={c.f} />
        <ellipse cx="34" cy="26" rx="3" ry={blink ? .5 : 3} fill="#fff" />
        <ellipse cx="46" cy="26" rx="3" ry={blink ? .5 : 3} fill="#fff" />
        <circle cx="34" cy="27" r="1.5" fill="#1a1a1a" />
        <circle cx="46" cy="27" r="1.5" fill="#1a1a1a" />
        {mood === "happy" || mood === "excited"
          ? <path d="M34 33Q40 38 46 33" stroke="#1a1a1a" strokeWidth="2" fill="none" strokeLinecap="round" />
          : <path d="M34 35Q40 32 46 35" stroke="#1a1a1a" strokeWidth="2" fill="none" strokeLinecap="round" />}
        <rect x="24" y="12" width="32" height="4" rx="2" fill="#0D0D0D" opacity="0.7" />
        <rect x="29" y="6" width="22" height="8" rx="3" fill="#0D0D0D" opacity="0.7" />
        <rect x="24" y="12" width="32" height="2" rx="1" fill="#C9A96E" opacity="0.8" />
        <line x1="18" y1="48" x2="26" y2="55" stroke={c.b} strokeWidth="5" strokeLinecap="round" />
        <line x1="62" y1="48" x2="54" y2="55" stroke={c.b} strokeWidth="5" strokeLinecap="round" />
        <line x1="34" y1="70" x2="32" y2="78" stroke={c.b} strokeWidth="5" strokeLinecap="round" />
        <line x1="46" y1="70" x2="48" y2="78" stroke={c.b} strokeWidth="5" strokeLinecap="round" />
        {speaking && <>
          <circle cx="58" cy="14" r="4" fill="#C9A96E" opacity=".9" />
          <circle cx="65" cy="10" r="3" fill="#C9A96E" opacity=".7" />
          <circle cx="70" cy="7" r="2" fill="#C9A96E" opacity=".5" />
        </>}
      </svg>
    </div>
  );
}

// ─── VIRTUAL GUIDE (Marco chatbot) ────────────────────────────────────────────
function VirtualGuide({ plan, places, userPos, lang, onClose }) {
  const t = T[lang || "es"];
  const [msgs, setMsgs] = useState([{ r: "a", txt: t.guideHi, mood: "happy" }]);
  const [inp, setInp] = useState("");
  const [load, setLoad] = useState(false);
  const [mood, setMood] = useState("happy");
  const [speak, setSpeak] = useState(false);
  const [near, setNear] = useState(null);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  // Proximity detection
  useEffect(() => {
    if (!userPos || !places?.length) return;
    const n = places.find(p => p.lat && p.lng && haversine(userPos.lat, userPos.lng, p.lat, p.lng) < 200);
    if (n && n.name !== near?.name) {
      setNear(n);
      setMood("nearby");
      setSpeak(true);
      setTimeout(() => setSpeak(false), 2000);
      setMsgs(prev => [...prev, { r: "a", txt: t.guideNear + " " + n.name + "! " + (n.desc || ""), mood: "nearby" }]);
    }
  }, [userPos, places]);

  async function send() {
    if (!inp.trim() || load) return;
    const q = inp.trim();
    setInp("");
    setMsgs(prev => [...prev, { r: "u", txt: q }]);
    setLoad(true);
    setMood("thinking");

    // Provide full plan context to Marco
    const ctx = plan
      ? `Destino: ${plan.destination}. Duración: ${plan.days} días. ` +
        `Presupuesto: ${plan.budget}€. Estilo: ${plan.travelStyle}. ` +
        `Lugares clave: ${(places || []).slice(0, 8).map(p => p.name).join(", ")}.`
      : "";

    try {
      const r = await fetch("/api/anthropic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-3-haiku-20240307", // Haiku stable
          max_tokens: 600,              // FIX: was 300, too short
          system: `Eres Marco, guía turístico virtual amigable y experto. ${t.lp} ${ctx} Responde de forma concisa pero completa. Máximo 4 frases.`,
          messages: [
            ...msgs.slice(-8).map(m => ({ role: m.r === "a" ? "assistant" : "user", content: m.txt })),
            { role: "user", content: q }
          ]
        })
      });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const d = await r.json();
      const txt = (d.content || []).map(b => b.text || "").join("") || t.errorMsg;
      setMsgs(prev => [...prev, { r: "a", txt, mood: "happy" }]);
      setMood("happy");
      setSpeak(true);
      setTimeout(() => setSpeak(false), 2000);
    } catch (e) {
      console.error("Marco error:", e);
      setMsgs(prev => [...prev, { r: "a", txt: t.errorMsg, mood: "happy" }]);
    }
    setLoad(false);
  }

  return (
    <div style={{ position: "fixed", bottom: 90, right: 20, width: 310, background: "#1C1C1E",
      border: `1px solid ${P.border}`, borderRadius: 22,
      boxShadow: "0 20px 60px rgba(0,0,0,.7)", zIndex: 500,
      display: "flex", flexDirection: "column", maxHeight: "60vh", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ background: "#1E1E20", padding: "13px 15px", borderRadius: "22px 22px 0 0",
        display: "flex", alignItems: "center", gap: 9, borderBottom: `1px solid ${P.border}` }}>
        <div style={{ position: "relative" }}>
          <GuideChar mood={mood} speaking={speak} size={48} />
          <div style={{ position: "absolute", bottom: 2, right: 2, width: 10, height: 10,
            background: "#22C55E", borderRadius: "50%", border: "2px solid #1C1C1E" }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{t.guideName}</div>
          <div style={{ fontSize: 11, color: P.gold }}>AI Guide · {plan?.destination || "..."}</div>
        </div>
        <button onClick={onClose} style={{ background: "#2C2C2E", border: "none", color: P.muted,
          borderRadius: 8, width: 26, height: 26, cursor: "pointer", fontSize: 14,
          display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
      </div>

      {/* Proximity alert */}
      {near && (
        <div style={{ background: "rgba(139,124,248,.15)", border: "1px solid rgba(139,124,248,.3)",
          margin: "8px 8px 0", borderRadius: 10, padding: "7px 11px", display: "flex", gap: 7, alignItems: "center" }}>
          <span>📍</span>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#8B7CF8" }}>{t.guideNear}</div>
            <div style={{ fontSize: 12, color: "#fff", fontWeight: 600 }}>{near.name}</div>
          </div>
        </div>
      )}

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "10px", display: "flex", flexDirection: "column", gap: 7 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: "flex", gap: 6, alignItems: "flex-end",
            flexDirection: m.r === "u" ? "row-reverse" : "row" }}>
            {m.r === "a" && <GuideChar mood={m.mood || "happy"} size={26} />}
            <div style={{
              background: m.r === "u" ? GOLD_GRAD : "#2C2C2E",
              color: m.r === "u" ? "#0D0D0D" : "#fff",
              borderRadius: m.r === "u" ? "14px 14px 3px 14px" : "14px 14px 14px 3px",
              padding: "8px 12px", fontSize: 12, lineHeight: 1.5, maxWidth: "76%"
            }}>{m.txt}</div>
          </div>
        ))}
        {load && (
          <div style={{ display: "flex", gap: 6, alignItems: "flex-end" }}>
            <GuideChar mood="thinking" size={26} />
            <div style={{ background: "#2C2C2E", borderRadius: "14px 14px 14px 3px",
              padding: "10px 12px", display: "flex", gap: 3 }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ width: 5, height: 5, background: P.gold, borderRadius: "50%",
                  animation: `dot .8s ${i * .2}s ease-in-out infinite` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div style={{ padding: "9px", borderTop: `1px solid ${P.border}`, display: "flex", gap: 6 }}>
        <input
          value={inp}
          onChange={e => setInp(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          placeholder={t.guidePh}
          style={{ flex: 1, background: "#2C2C2E", border: `1px solid ${P.border}`, borderRadius: 9,
            padding: "8px 11px", fontSize: 12, color: "#fff", outline: "none" }}
          onFocus={e => e.target.style.borderColor = P.gold}
          onBlur={e => e.target.style.borderColor = P.border}
        />
        <button onClick={send} disabled={!inp.trim() || load}
          style={{ background: GOLD_GRAD, border: "none", borderRadius: 9, width: 36, height: 36,
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, opacity: !inp.trim() || load ? .5 : 1 }}>↑</button>
      </div>
    </div>
  );
}

// ─── ELEVENLABS AUDIO ─────────────────────────────────────────────────────────
const VOICE_ID = "yiWEefwu5z3DQCM79clN";
async function speakText(text) {
  try {
    const r = await fetch("/api/elevenlabs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, voiceId: VOICE_ID })
    });
    if (!r.ok) throw new Error(`ElevenLabs HTTP ${r.status}`);
    const blob = await r.blob();
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.play();
    return audio;
  } catch (e) {
    console.error("speakText error:", e);
    return null;
  }
}

// ─── GUIDE MODAL (place storyteller with audio) ───────────────────────────────
function GuideModal({ place, plan, lang, onClose }) {
  const t = T[lang || "es"];
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [speaking, setSpeaking] = useState(false);
  const audioRef = useRef(null);
  const [photos, setPhotos] = useState([]);
  const [photoIdx, setPhotoIdx] = useState(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (audioRef.current) { audioRef.current.pause(); audioRef.current.src = ""; }
    };
  }, []);

  // Photo slideshow
  useEffect(() => {
    if (!photos.length) return;
    const i = setInterval(() => setPhotoIdx(x => (x + 1) % photos.length), 3500);
    return () => clearInterval(i);
  }, [photos]);

  // Load story from Claude
  useEffect(() => {
    async function load() {
      try {
        const r = await fetch("/api/anthropic", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "claude-3-haiku-20240307", // Haiku stable
            max_tokens: 400,
            system: `Eres Sofia, guía turística experta, carismática y apasionada. ${t.lp} Habla en primera persona como si estuvieras ahí con el turista. Máximo 4 frases cortas y emocionantes.`,
            messages: [{ role: "user", content: `Cuenta la historia y curiosidades de: ${place.name}. Contexto: estamos en ${plan?.destination || "este destino"}.` }]
          })
        });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const d = await r.json();
        const txt = (d.content || []).map(b => b.text || "").join("");
        if (!mountedRef.current) return;
        setStory(txt);
        setLoading(false);
        // Auto-speak
        setSpeaking(true);
        const audio = await speakText(txt);
        if (!mountedRef.current) { audio?.pause(); return; }
        audioRef.current = audio;
        if (audio) audio.onended = () => { if (mountedRef.current) setSpeaking(false); };
        else setSpeaking(false);
      } catch (e) {
        console.error("GuideModal error:", e);
        if (!mountedRef.current) return;
        setError(t.errorMsg);
        setLoading(false);
      }
    }
    load();
  }, []);

  function replay() {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.src = ""; }
    if (!story) return;
    setSpeaking(true);
    speakText(story).then(audio => {
      if (!mountedRef.current) { audio?.pause(); return; }
      audioRef.current = audio;
      if (audio) audio.onended = () => { if (mountedRef.current) setSpeaking(false); };
      else setSpeaking(false);
    });
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.92)", zIndex: 2000,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      {/* Background photo */}
      {photos.length > 0 && (
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <img src={photos[photoIdx]} alt={place.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: .35 }} />
          <div style={{ position: "absolute", inset: 0,
            background: "linear-gradient(to top,rgba(0,0,0,.95) 40%,rgba(0,0,0,.3) 100%)" }} />
        </div>
      )}
      <div style={{ position: "relative", width: "100%", maxWidth: 500, padding: "0 20px 48px", zIndex: 1 }}>
        {/* Avatar */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 16, marginBottom: 20 }}>
          <div style={{ position: "relative", flexShrink: 0 }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", overflow: "hidden",
              border: `3px solid ${P.gold}`, boxShadow: `0 0 20px ${P.goldGlow}` }}>
              <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&q=80"
                alt="Sofia" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            {speaking && (
              <div style={{ position: "absolute", bottom: 2, right: 2, width: 16, height: 16,
                background: "#22C55E", borderRadius: "50%", border: "2px solid #0D0D0D",
                animation: "pulse 1s ease infinite" }} />
            )}
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 900, color: "#fff" }}>Sofia</div>
            <div style={{ fontSize: 12, color: P.gold }}>Guía · {place.name}</div>
          </div>
          <button onClick={onClose}
            style={{ marginLeft: "auto", background: "rgba(255,255,255,.1)", border: "none",
              color: "#fff", borderRadius: "50%", width: 36, height: 36, cursor: "pointer",
              fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        </div>
        {/* Story */}
        <div style={{ background: "rgba(0,0,0,.6)", backdropFilter: "blur(20px)", borderRadius: 20,
          padding: "20px", border: `1px solid ${P.goldBorder}`, marginBottom: 16, minHeight: 100 }}>
          {loading ? (
            <div style={{ display: "flex", gap: 5, justifyContent: "center", padding: "20px 0" }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ width: 8, height: 8, background: P.gold, borderRadius: "50%",
                  animation: `dot .8s ${i * .2}s ease-in-out infinite` }} />
              ))}
            </div>
          ) : error ? (
            <p style={{ margin: 0, fontSize: 14, color: "#ef4444", textAlign: "center" }}>{error}</p>
          ) : (
            <p style={{ margin: 0, fontSize: 15, color: "#fff", lineHeight: 1.7, fontStyle: "italic" }}>
              "{story}"
            </p>
          )}
        </div>
        {/* Controls */}
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={replay} disabled={loading || !story}
            style={{ flex: 1, padding: "13px", background: loading || !story ? "#2A2A2A" : GOLD_GRAD,
              color: loading || !story ? P.muted : "#0D0D0D", border: "none", borderRadius: 12,
              fontSize: 14, fontWeight: 700, cursor: loading || !story ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            {speaking ? "🔊 Hablando..." : "▶️ Escuchar de nuevo"}
          </button>
          <button onClick={onClose}
            style={{ padding: "13px 18px", background: "rgba(255,255,255,.1)", color: "#fff",
              border: "1px solid rgba(255,255,255,.2)", borderRadius: 12, fontSize: 14, cursor: "pointer" }}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── LOADING SCREEN ───────────────────────────────────────────────────────────
// FIX: Loading screen is now purely visual — it does NOT control when results appear.
// Results display is controlled only by the `plan` state being set.
function LoadingScreen({ lang, stepIdx }) {
  const t = T[lang || "es"];
  const steps = t.steps;
  return (
    <div style={{ position: "fixed", inset: 0, background: P.black, zIndex: 900,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: "0 32px" }}>
      <TrippioLogo size={64} />
      <div style={{ marginTop: 24, fontSize: 22, fontWeight: 800, color: P.white, textAlign: "center" }}>
        {t.loadTitle}
      </div>
      <div style={{ marginTop: 8, fontSize: 14, color: P.muted, textAlign: "center" }}>
        {t.loadSub}
      </div>
      {/* Steps list */}
      <div style={{ marginTop: 36, display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 280 }}>
        {steps.map((step, i) => {
          const done = i < stepIdx;
          const active = i === stepIdx;
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                background: done ? P.gold : active ? "transparent" : "#1A1A1A",
                border: active ? `2px solid ${P.gold}` : done ? "none" : `2px solid ${P.border}`,
                display: "flex", alignItems: "center", justifyContent: "center" }}>
                {done ? (
                  <span style={{ color: "#0D0D0D", fontSize: 13, fontWeight: 900 }}>✓</span>
                ) : active ? (
                  <div style={{ width: 10, height: 10, borderRadius: "50%",
                    border: `2px solid ${P.gold}`, borderTopColor: "transparent",
                    animation: "spin .8s linear infinite" }} />
                ) : null}
              </div>
              <div style={{ fontSize: 14, color: done ? P.gold : active ? P.white : P.muted,
                fontWeight: active || done ? 600 : 400 }}>{step}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── MAIN APP COMPONENT ───────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState("es");
  const t = T[lang];

  // Form state
  const [step, setStep] = useState(0);           // wizard step (0=types, 1=style, 2=details)
  const [tripTypes, setTripTypes] = useState([]); // selected trip types
  const [travelStyle, setTravelStyle] = useState(null);
  const [origin, setOrigin] = useState("");
  const [dest, setDest] = useState("");
  const [budget, setBudget] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [travelers, setTravelers] = useState(1);

  // Result state — FIX: plan is the ONLY source of truth for showing results
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadStep, setLoadStep] = useState(0);
  const [error, setError] = useState(null);

  // UI state
  const [activeTab, setActiveTab] = useState("flights");
  const [showMap, setShowMap] = useState(false);
  const [activePlace, setActivePlace] = useState(null);
  const [showGuide, setShowGuide] = useState(false);
  const [guidePlace, setGuidePlace] = useState(null);
  const [showMarco, setShowMarco] = useState(false);
  const [userPos, setUserPos] = useState(null);
  const [shareCopied, setShareCopied] = useState(false);

  // Geolocation
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      pos => setUserPos({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => {}
    );
  }, []);

  // ── All map places combined ──
  const allPlaces = plan ? [
    ...(plan.hotels || []).map(h => ({ ...h, type: "hotel" })),
    ...(plan.restaurants || []).map(r => ({ ...r, type: "restaurant" })),
    ...(plan.places || []).map(p => ({ ...p, type: "place" })),
  ] : [];

  // ── Nights count ──
  const nights = diffDays(arrivalDate, departureDate) || 7;

  // ── Toggle trip type ──
  function toggleType(key) {
    setTripTypes(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
  }

  // ── Reset to home ──
  function reset() {
    setPlan(null);
    setError(null);
    setLoading(false);
    setLoadStep(0);
    setStep(0);
    setTripTypes([]);
    setTravelStyle(null);
    setDest("");
    setBudget("");
    setArrivalDate("");
    setDepartureDate("");
    setTravelers(1);
    setActiveTab("flights");
    setShowMap(false);
    setShowMarco(false);
    setShowGuide(false);
  }

  // ── Share ──
  function share() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    });
  }

  // ─── SEARCH ──────────────────────────────────────────────────────────────────
  // FIX: The loading animation runs independently from the API call.
  // Results ONLY appear when setPlan() is called successfully — never on a timer.
  async function search() {
    if (!dest.trim()) return;
    setError(null);
    setPlan(null);                // clear any previous results
    setLoading(true);
    setLoadStep(0);

    // Visual step animation — independent of API
    const stepInterval = setInterval(() => {
      setLoadStep(prev => {
        if (prev >= 4) { clearInterval(stepInterval); return prev; }
        return prev + 1;
      });
    }, 900);

    const stylePct = TRAVELER_STYLES[travelStyle || "comfort"].pct;
    const budgetNum = parseInt(budget) || 1500;
    const flightBudget = Math.round(budgetNum * 0.4);
    const hotelBudget = Math.round(budgetNum * 0.35);
    const activityBudget = Math.round(budgetNum * 0.25);

    const prompt = `
Eres un experto planificador de viajes. Genera un plan de viaje COMPLETO y REALISTA en formato JSON.

DATOS DEL VIAJE:
- Origen: ${origin || "Madrid"}
- Destino: ${dest}
- Presupuesto total: ${budgetNum}€ para ${travelers} persona(s)
- Fechas: ${arrivalDate || "próximamente"} a ${departureDate || "próximamente"} (${nights} noches)
- Estilo: ${travelStyle || "comfort"}
- Tipos de viaje: ${tripTypes.join(", ") || "city"}
- Idioma respuesta: ${lang === "es" ? "español" : "inglés"}

Devuelve SOLO JSON válido, sin markdown, sin explicaciones, con esta estructura exacta:
{
  "destination": "nombre del destino",
  "days": ${nights},
  "budget": ${budgetNum},
  "travelStyle": "${travelStyle || "comfort"}",
  "heroImage": "url de imagen unsplash del destino",
  "weather": {"temp": "temperatura media", "desc": "descripción clima", "best": "mejor época"},
  "flights": [
    {"airline": "nombre aerolínea", "code": "código vuelo", "dep": "HH:MM", "arr": "HH:MM",
     "duration": "Xh Ym", "stops": 0, "price": ${flightBudget}, "bookUrl": "https://www.skyscanner.es/"},
    {"airline": "nombre aerolínea 2", "code": "código vuelo 2", "dep": "HH:MM", "arr": "HH:MM",
     "duration": "Xh Ym", "stops": 1, "price": ${Math.round(flightBudget * 0.8)}, "bookUrl": "https://www.skyscanner.es/"}
  ],
  "hotels": [
    {"name": "nombre hotel", "stars": 4, "area": "barrio/zona", "price": ${Math.round(hotelBudget / nights)},
     "rating": 4.5, "desc": "descripción breve", "lat": 0.0, "lng": 0.0,
     "bookUrl": "https://www.booking.com/searchresults.html?ss=${encodeURIComponent(dest)}"},
    {"name": "nombre hotel 2", "stars": 3, "area": "barrio/zona 2", "price": ${Math.round(hotelBudget / nights * 0.7)},
     "rating": 4.2, "desc": "descripción breve 2", "lat": 0.0, "lng": 0.0,
     "bookUrl": "https://www.booking.com/searchresults.html?ss=${encodeURIComponent(dest)}"}
  ],
  "restaurants": [
    {"name": "nombre restaurante", "cuisine": "tipo cocina", "price": "€€", "rating": 4.7,
     "desc": "descripción", "area": "zona", "lat": 0.0, "lng": 0.0,
     "bookUrl": "https://www.tripadvisor.es/Search?q=${encodeURIComponent(dest)}+restaurants"},
    {"name": "nombre restaurante 2", "cuisine": "tipo cocina 2", "price": "€€€", "rating": 4.5,
     "desc": "descripción 2", "area": "zona 2", "lat": 0.0, "lng": 0.0,
     "bookUrl": "https://www.tripadvisor.es/Search?q=${encodeURIComponent(dest)}+restaurants"},
    {"name": "nombre restaurante 3", "cuisine": "vegetariano", "price": "€€", "rating": 4.4,
     "desc": "descripción 3", "area": "zona 3", "lat": 0.0, "lng": 0.0,
     "bookUrl": "https://www.tripadvisor.es/Search?q=${encodeURIComponent(dest)}+vegetarian", "vegetarian": true}
  ],
  "places": [
    {"name": "lugar destacado 1", "desc": "descripción", "lat": 0.0, "lng": 0.0, "type": "place"},
    {"name": "lugar destacado 2", "desc": "descripción", "lat": 0.0, "lng": 0.0, "type": "place"}
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "título del día",
      "morning": "actividad mañana",
      "afternoon": "actividad tarde",
      "evening": "actividad noche",
      "transport": "cómo moverse"
    }
  ],
  "tips": ["tip 1", "tip 2", "tip 3", "tip 4"],
  "transport": {"main": "medio transporte principal", "app": "app recomendada", "pass": "bono transporte", "price": "precio orientativo"},
  "totalEstimate": ${budgetNum}
}

IMPORTANTE: 
- Las coordenadas lat/lng deben ser REALES y correctas para ${dest}
- Los precios deben ser realistas para ${dest}
- El itinerary debe tener ${Math.min(nights, 7)} días
`.trim();

    try {
      const r = await fetch("/api/anthropic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-3-5-sonnet-20241022",  // Sonnet with fallback
          max_tokens: 4000,
          system: "Eres un experto planificador de viajes. Responde SOLO con JSON válido, sin markdown, sin texto adicional.",
          messages: [{ role: "user", content: prompt }]
        })
      });

      clearInterval(stepInterval);

      if (!r.ok) throw new Error(`HTTP ${r.status}: ${await r.text()}`);

      const d = await r.json();
      const raw = (d.content || []).map(b => b.text || "").join("");
      const parsed = safeJson(raw);

      if (!parsed) throw new Error("JSON parse failed: " + raw.slice(0, 200));

      // FIX: Set plan FIRST, then stop loading — no timers involved
      setLoadStep(5);
      await new Promise(resolve => setTimeout(resolve, 400)); // brief "listo" moment
      setPlan(parsed);   // ← this is what shows the results
      setLoading(false); // ← this is what hides the loader
      setActiveTab("flights");
    } catch (e) {
      clearInterval(stepInterval);
      console.error("Search error:", e);
      // Show specific error to help diagnose
      const msg = e.message?.includes("HTTP 4") 
        ? "Error de API. Verifica que ANTHROPIC_API_KEY esté configurada en Vercel."
        : e.message?.includes("JSON parse")
        ? "La IA no devolvió un formato válido. Intenta de nuevo."
        : t.errorMsg;
      setError(msg);
      setLoading(false);
    }
  }

  // ─── RENDER ───────────────────────────────────────────────────────────────────

  // Loading overlay — shown ONLY while loading, disappears when plan is ready
  if (loading) {
    return (
      <>
        <GlobalStyle />
        <LoadingScreen lang={lang} stepIdx={loadStep} />
      </>
    );
  }

  // Results page
  if (plan) {
    return (
      <>
        <GlobalStyle />
        <ResultsPage
          plan={plan} lang={lang} t={t}
          allPlaces={allPlaces} nights={nights}
          origin={origin} dest={dest} travelers={travelers}
          showMap={showMap} setShowMap={setShowMap}
          activePlace={activePlace} setActivePlace={setActivePlace}
          activeTab={activeTab} setActiveTab={setActiveTab}
          showMarco={showMarco} setShowMarco={setShowMarco}
          showGuide={showGuide} setShowGuide={setShowGuide}
          guidePlace={guidePlace} setGuidePlace={setGuidePlace}
          userPos={userPos}
          shareCopied={shareCopied} share={share}
          reset={reset}
        />
      </>
    );
  }

  // Search wizard
  return (
    <>
      <GlobalStyle />
      <SearchWizard
        lang={lang} setLang={setLang} t={t}
        step={step} setStep={setStep}
        tripTypes={tripTypes} toggleType={toggleType}
        travelStyle={travelStyle} setTravelStyle={setTravelStyle}
        origin={origin} setOrigin={setOrigin}
        dest={dest} setDest={setDest}
        budget={budget} setBudget={setBudget}
        arrivalDate={arrivalDate} setArrivalDate={setArrivalDate}
        departureDate={departureDate} setDepartureDate={setDepartureDate}
        travelers={travelers} setTravelers={setTravelers}
        error={error}
        onSearch={search}
      />
    </>
  );
}

// ─── SEARCH WIZARD ────────────────────────────────────────────────────────────
function SearchWizard({ lang, setLang, t, step, setStep, tripTypes, toggleType,
  travelStyle, setTravelStyle, origin, setOrigin, dest, setDest,
  budget, setBudget, arrivalDate, setArrivalDate, departureDate, setDepartureDate,
  travelers, setTravelers, error, onSearch }) {

  const canNext0 = tripTypes.length > 0;
  const canNext1 = travelStyle !== null;
  const canSearch = dest.trim().length > 0;

  return (
    <div style={{ minHeight: "100vh", background: P.black, display: "flex",
      flexDirection: "column", alignItems: "center", padding: "0 0 40px" }}>

      {/* Header */}
      <div style={{ width: "100%", maxWidth: 520, padding: "24px 20px 0",
        display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <TrippioLogo size={32} />
          <span style={{ fontSize: 20, fontWeight: 900, color: P.white, letterSpacing: -0.5 }}>trippio</span>
        </div>
        {/* Language toggle */}
        <div style={{ display: "flex", background: P.card2, borderRadius: 10, overflow: "hidden",
          border: `1px solid ${P.border}` }}>
          {Object.entries(T).map(([k, v]) => (
            <button key={k} onClick={() => setLang(k)}
              style={{ padding: "6px 12px", background: lang === k ? P.gold : "transparent",
                color: lang === k ? P.black : P.muted, border: "none", cursor: "pointer",
                fontSize: 13, fontWeight: 600, transition: "all .2s" }}>
              {v.flag} {v.name}
            </button>
          ))}
        </div>
      </div>

      {/* Hero text */}
      {step === 0 && (
        <div style={{ width: "100%", maxWidth: 520, padding: "36px 20px 0", textAlign: "center" }}>
          <h1 style={{ margin: 0, fontSize: 38, fontWeight: 900, color: P.white, lineHeight: 1.1 }}>
            {t.h1a}<br />
            <span style={{ background: GOLD_GRAD, WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent" }}>{t.h1b}</span>
          </h1>
          <p style={{ margin: "12px 0 0", fontSize: 15, color: P.sub }}>{t.sub}</p>
        </div>
      )}

      {/* Step indicator */}
      <div style={{ display: "flex", gap: 6, marginTop: 28, marginBottom: 4 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{ width: i === step ? 24 : 8, height: 8, borderRadius: 4,
            background: i <= step ? P.gold : P.border, transition: "all .3s" }} />
        ))}
      </div>

      {/* Step content */}
      <div style={{ width: "100%", maxWidth: 520, padding: "16px 20px 0" }}>

        {/* STEP 0: Trip types */}
        {step === 0 && (
          <div className="card-enter">
            <div style={{ fontSize: 17, fontWeight: 700, color: P.white, marginBottom: 4 }}>{t.stepTripType}</div>
            <div style={{ fontSize: 13, color: P.muted, marginBottom: 16 }}>{t.stepSub}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
              {Object.entries(TRIP_TYPES).map(([k, v]) => {
                const sel = tripTypes.includes(k);
                return (
                  <button key={k} onClick={() => toggleType(k)}
                    style={{ padding: "14px 8px", background: sel ? P.goldDim : P.card2,
                      border: `1.5px solid ${sel ? P.gold : P.border}`,
                      borderRadius: 14, cursor: "pointer",
                      display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                      transition: "all .2s" }}>
                    <span style={{ fontSize: 24 }}>{v.icon}</span>
                    <span style={{ fontSize: 12, fontWeight: 600,
                      color: sel ? P.gold : P.sub }}>{t.tripNames[k]}</span>
                  </button>
                );
              })}
            </div>
            <button onClick={() => setStep(1)} disabled={!canNext0}
              style={{ width: "100%", marginTop: 20, padding: "15px",
                background: canNext0 ? GOLD_GRAD : P.card3,
                color: canNext0 ? P.black : P.muted,
                border: "none", borderRadius: 14, fontSize: 16, fontWeight: 700,
                cursor: canNext0 ? "pointer" : "not-allowed", transition: "all .2s" }}>
              {t.nextBtn}
            </button>
          </div>
        )}

        {/* STEP 1: Travel style */}
        {step === 1 && (
          <div className="card-enter">
            <div style={{ fontSize: 17, fontWeight: 700, color: P.white, marginBottom: 16 }}>{t.stepStyle}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {Object.entries(TRAVELER_STYLES).map(([k, v]) => {
                const sel = travelStyle === k;
                return (
                  <button key={k} onClick={() => setTravelStyle(k)}
                    style={{ padding: "16px 18px", background: sel ? P.goldDim : P.card2,
                      border: `1.5px solid ${sel ? P.gold : P.border}`,
                      borderRadius: 14, cursor: "pointer",
                      display: "flex", alignItems: "center", gap: 14,
                      transition: "all .2s" }}>
                    <span style={{ fontSize: 28 }}>{v.icon}</span>
                    <div style={{ textAlign: "left", flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 700,
                        color: sel ? P.gold : P.white }}>{t.styleNames[k]}</div>
                      <div style={{ fontSize: 12, color: P.muted, marginTop: 2 }}>{t.styleDesc[k]}</div>
                    </div>
                    {sel && <div style={{ width: 20, height: 20, borderRadius: "50%",
                      background: GOLD_GRAD, display: "flex", alignItems: "center",
                      justifyContent: "center", fontSize: 11, color: P.black, fontWeight: 900 }}>✓</div>}
                  </button>
                );
              })}
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button onClick={() => setStep(0)}
                style={{ flex: 1, padding: "15px", background: P.card2, color: P.sub,
                  border: `1px solid ${P.border}`, borderRadius: 14, fontSize: 15,
                  fontWeight: 600, cursor: "pointer" }}>{t.backBtn}</button>
              <button onClick={() => setStep(2)} disabled={!canNext1}
                style={{ flex: 2, padding: "15px",
                  background: canNext1 ? GOLD_GRAD : P.card3,
                  color: canNext1 ? P.black : P.muted,
                  border: "none", borderRadius: 14, fontSize: 16, fontWeight: 700,
                  cursor: canNext1 ? "pointer" : "not-allowed" }}>{t.nextBtn}</button>
            </div>
          </div>
        )}

        {/* STEP 2: Details */}
        {step === 2 && (
          <div className="card-enter">
            <div style={{ fontSize: 17, fontWeight: 700, color: P.white, marginBottom: 16 }}>{t.stepDetails}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

              {/* Origin + Dest */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <span style={{ fontSize: 12, color: P.muted, fontWeight: 600 }}>{t.originL}</span>
                  <input value={origin} onChange={e => setOrigin(e.target.value)}
                    placeholder={t.originPh}
                    style={{ background: P.card2, border: `1.5px solid ${P.border}`,
                      borderRadius: 12, padding: "11px 14px", fontSize: 14, color: P.white,
                      outline: "none", transition: "border-color .2s" }}
                    onFocus={e => e.target.style.borderColor = P.gold}
                    onBlur={e => e.target.style.borderColor = P.border} />
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <span style={{ fontSize: 12, color: P.muted, fontWeight: 600 }}>{t.destL} *</span>
                  <input value={dest} onChange={e => setDest(e.target.value)}
                    placeholder={t.destPh}
                    style={{ background: P.card2, border: `1.5px solid ${dest ? P.gold : P.border}`,
                      borderRadius: 12, padding: "11px 14px", fontSize: 14, color: P.white,
                      outline: "none", transition: "border-color .2s" }}
                    onFocus={e => e.target.style.borderColor = P.gold}
                    onBlur={e => e.target.style.borderColor = dest ? P.gold : P.border} />
                </label>
              </div>

              {/* Dates */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <span style={{ fontSize: 12, color: P.muted, fontWeight: 600 }}>{t.arrival}</span>
                  <input type="date" value={arrivalDate} onChange={e => setArrivalDate(e.target.value)}
                    style={{ background: P.card2, border: `1.5px solid ${P.border}`,
                      borderRadius: 12, padding: "11px 14px", fontSize: 14, color: P.white,
                      outline: "none", colorScheme: "dark" }}
                    onFocus={e => e.target.style.borderColor = P.gold}
                    onBlur={e => e.target.style.borderColor = P.border} />
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <span style={{ fontSize: 12, color: P.muted, fontWeight: 600 }}>{t.departure}</span>
                  <input type="date" value={departureDate} onChange={e => setDepartureDate(e.target.value)}
                    style={{ background: P.card2, border: `1.5px solid ${P.border}`,
                      borderRadius: 12, padding: "11px 14px", fontSize: 14, color: P.white,
                      outline: "none", colorScheme: "dark" }}
                    onFocus={e => e.target.style.borderColor = P.gold}
                    onBlur={e => e.target.style.borderColor = P.border} />
                </label>
              </div>

              {/* Budget + Travelers */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <span style={{ fontSize: 12, color: P.muted, fontWeight: 600 }}>{t.budgetL}</span>
                  <input type="number" value={budget} onChange={e => setBudget(e.target.value)}
                    placeholder={t.budgetPh} min="200" step="100"
                    style={{ background: P.card2, border: `1.5px solid ${P.border}`,
                      borderRadius: 12, padding: "11px 14px", fontSize: 14, color: P.white,
                      outline: "none" }}
                    onFocus={e => e.target.style.borderColor = P.gold}
                    onBlur={e => e.target.style.borderColor = P.border} />
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <span style={{ fontSize: 12, color: P.muted, fontWeight: 600 }}>{t.travelersL}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 8,
                    background: P.card2, border: `1.5px solid ${P.border}`,
                    borderRadius: 12, padding: "8px 14px" }}>
                    <button onClick={() => setTravelers(v => Math.max(1, v - 1))}
                      style={{ width: 28, height: 28, background: P.card3, border: `1px solid ${P.border}`,
                        borderRadius: "50%", color: P.white, cursor: "pointer", fontSize: 16,
                        display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                    <span style={{ flex: 1, textAlign: "center", fontSize: 14, color: P.white, fontWeight: 600 }}>
                      {travelers === 1 ? t.t1 : t.tN(travelers)}
                    </span>
                    <button onClick={() => setTravelers(v => Math.min(10, v + 1))}
                      style={{ width: 28, height: 28, background: P.card3, border: `1px solid ${P.border}`,
                        borderRadius: "50%", color: P.white, cursor: "pointer", fontSize: 16,
                        display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                  </div>
                </label>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{ marginTop: 12, padding: "12px 14px", background: "rgba(239,68,68,.1)",
                border: "1px solid rgba(239,68,68,.3)", borderRadius: 10,
                fontSize: 13, color: "#ef4444" }}>{error}</div>
            )}

            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button onClick={() => setStep(1)}
                style={{ flex: 1, padding: "15px", background: P.card2, color: P.sub,
                  border: `1px solid ${P.border}`, borderRadius: 14, fontSize: 15,
                  fontWeight: 600, cursor: "pointer" }}>{t.backBtn}</button>
              <button onClick={onSearch} disabled={!canSearch}
                style={{ flex: 2, padding: "15px",
                  background: canSearch ? GOLD_GRAD : P.card3,
                  color: canSearch ? P.black : P.muted,
                  border: "none", borderRadius: 14, fontSize: 16, fontWeight: 700,
                  cursor: canSearch ? "pointer" : "not-allowed" }}>{t.searchBtn}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── RESULTS PAGE ─────────────────────────────────────────────────────────────
function ResultsPage({ plan, lang, t, allPlaces, nights, origin, dest, travelers,
  showMap, setShowMap, activePlace, setActivePlace, activeTab, setActiveTab,
  showMarco, setShowMarco, showGuide, setShowGuide, guidePlace, setGuidePlace,
  userPos, shareCopied, share, reset }) {

  const heroImg = getImg(plan.destination || dest);
  const starsArr = n => "★".repeat(Math.min(5, Math.max(0, Math.round(n))));

  function openGuide(place) {
    setGuidePlace(place);
    setShowGuide(true);
  }

  const tabs = [
    { key: "flights",  label: "✈️ " + t.flightsT },
    { key: "hotels",   label: "🏨 " + t.hotelsT },
    { key: "food",     label: "🍽 " + t.restsT },
    { key: "itinerary",label: "📅 " + t.itinT },
    { key: "tips",     label: "💡 " + t.tipsT },
  ];

  return (
    <div style={{ background: P.black, minHeight: "100vh", paddingBottom: 100 }}>

      {/* Hero */}
      <div style={{ position: "relative", height: 260, overflow: "hidden" }}>
        <img src={heroImg} alt={plan.destination}
          style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0,
          background: "linear-gradient(to bottom,rgba(0,0,0,.35) 0%,rgba(13,13,13,1) 100%)" }} />
        <div style={{ position: "absolute", top: 16, left: 16, right: 16,
          display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={reset}
            style={{ background: "rgba(0,0,0,.5)", border: "1px solid rgba(255,255,255,.2)",
              color: P.white, borderRadius: 10, padding: "8px 14px", fontSize: 13,
              fontWeight: 600, cursor: "pointer", backdropFilter: "blur(8px)" }}>
            ← {t.newSearch}
          </button>
          <button onClick={share}
            style={{ background: "rgba(0,0,0,.5)", border: "1px solid rgba(255,255,255,.2)",
              color: shareCopied ? P.gold : P.white, borderRadius: 10, padding: "8px 14px",
              fontSize: 13, fontWeight: 600, cursor: "pointer", backdropFilter: "blur(8px)" }}>
            {shareCopied ? t.shareCopied : "🔗 " + t.shareBtn}
          </button>
        </div>
        <div style={{ position: "absolute", bottom: 20, left: 20 }}>
          <h2 style={{ margin: 0, fontSize: 30, fontWeight: 900, color: P.white,
            textShadow: "0 2px 12px rgba(0,0,0,.6)" }}>{plan.destination}</h2>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,.75)", marginTop: 4 }}>
            {t.days(plan.days)} · {travelers === 1 ? t.t1 : t.tN(travelers)}
            {plan.weather && ` · ${plan.weather.temp}`}
          </div>
        </div>
      </div>

      {/* Map toggle */}
      <div style={{ padding: "12px 16px" }}>
        <button onClick={() => setShowMap(v => !v)}
          style={{ width: "100%", padding: "12px", background: showMap ? P.goldDim : P.card2,
            border: `1.5px solid ${showMap ? P.gold : P.border}`,
            borderRadius: 14, color: showMap ? P.gold : P.sub,
            fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all .2s" }}>
          {t.mapBtn} {showMap ? "▲" : "▼"}
        </button>
        {showMap && allPlaces.length > 0 && (
          <div style={{ marginTop: 12 }}>
            <TravelMap
              places={allPlaces} active={activePlace}
              onSelect={setActivePlace} userPos={userPos} />
          </div>
        )}
      </div>

      {/* Tabs */}
      <div style={{ padding: "0 16px", overflowX: "auto", display: "flex", gap: 8,
        scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
        {tabs.map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            style={{ flexShrink: 0, padding: "9px 16px",
              background: activeTab === tab.key ? P.goldDim : P.card2,
              border: `1.5px solid ${activeTab === tab.key ? P.gold : P.border}`,
              borderRadius: 20, color: activeTab === tab.key ? P.gold : P.sub,
              fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap",
              transition: "all .2s" }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div style={{ padding: "16px 16px 0" }}>

        {/* FLIGHTS */}
        {activeTab === "flights" && (
          <div className="card-enter">
            <SectionHeader title={t.flightsT}
              sub={t.flightsSub(plan.destination, travelers, origin)} />
            {(plan.flights || []).length === 0 ? (
              <EmptyState msg="No hay vuelos disponibles para este destino." />
            ) : (plan.flights || []).map((f, i) => (
              <div key={i} style={{ background: P.card2, border: `1px solid ${P.border}`,
                borderRadius: 16, padding: "16px", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: P.white }}>
                      {f.airline}
                      <span style={{ fontSize: 11, color: P.muted, marginLeft: 8,
                        background: P.card3, padding: "2px 7px", borderRadius: 6 }}>{f.code}</span>
                    </div>
                    <div style={{ fontSize: 13, color: P.muted, marginTop: 4 }}>
                      {f.dep} → {f.arr} · {f.duration} ·{" "}
                      <span style={{ color: f.stops === 0 ? "#22C55E" : P.gold }}>
                        {f.stops === 0 ? t.direct : t.stops(f.stops)}
                      </span>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 20, fontWeight: 900,
                      background: GOLD_GRAD, WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent" }}>
                      {f.price}€
                    </div>
                    <div style={{ fontSize: 11, color: P.muted }}>{t.pp}</div>
                  </div>
                </div>
                <a href={f.bookUrl || "https://www.skyscanner.es/"} target="_blank" rel="noopener noreferrer"
                  style={{ display: "block", width: "100%", marginTop: 12, padding: "10px",
                    background: GOLD_GRAD, color: P.black, borderRadius: 10, fontSize: 14,
                    fontWeight: 700, textAlign: "center", textDecoration: "none" }}>
                  {t.bookFlight}
                </a>
              </div>
            ))}
          </div>
        )}

        {/* HOTELS */}
        {activeTab === "hotels" && (
          <div className="card-enter">
            <SectionHeader title={t.hotelsT} sub={t.hotelsSub(nights)} />
            {(plan.hotels || []).length === 0 ? (
              <EmptyState msg="No hay hoteles disponibles." />
            ) : (plan.hotels || []).map((h, i) => (
              <div key={i} style={{ background: P.card2, border: `1px solid ${P.border}`,
                borderRadius: 16, overflow: "hidden", marginBottom: 12 }}>
                <img src={HOTEL_IMGS[i % HOTEL_IMGS.length]} alt={h.name}
                  style={{ width: "100%", height: 160, objectFit: "cover" }} />
                <div style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: P.white }}>{h.name}</div>
                      <div style={{ fontSize: 12, color: P.muted, marginTop: 2 }}>{h.area}</div>
                      <div style={{ fontSize: 13, color: P.gold, marginTop: 4 }}>
                        {starsArr(h.stars)} · ⭐ {h.rating}
                      </div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 12 }}>
                      <div style={{ fontSize: 20, fontWeight: 900,
                        background: GOLD_GRAD, WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent" }}>{h.price}€</div>
                      <div style={{ fontSize: 11, color: P.muted }}>{t.pn}</div>
                    </div>
                  </div>
                  {h.desc && (
                    <p style={{ margin: "10px 0 0", fontSize: 13, color: P.sub, lineHeight: 1.5 }}>{h.desc}</p>
                  )}
                  <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                    <button onClick={() => {
                      setActivePlace(allPlaces.findIndex(p => p.name === h.name));
                      setShowMap(true);
                    }} style={{ flex: 1, padding: "9px", background: P.card3,
                      border: `1px solid ${P.border}`, borderRadius: 10,
                      color: P.sub, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                      📍 {t.mapBtn}
                    </button>
                    <a href={h.bookUrl || "https://www.booking.com/"} target="_blank" rel="noopener noreferrer"
                      style={{ flex: 2, padding: "9px", background: GOLD_GRAD, color: P.black,
                        borderRadius: 10, fontSize: 13, fontWeight: 700, textAlign: "center",
                        textDecoration: "none", display: "flex", alignItems: "center",
                        justifyContent: "center" }}>
                      {t.bookHotel}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* FOOD */}
        {activeTab === "food" && (
          <div className="card-enter">
            {/* Regular restaurants */}
            <SectionHeader title={t.restsT} sub={t.restsSub} />
            {(plan.restaurants || []).filter(r => !r.vegetarian).map((r, i) => (
              <RestaurantCard key={i} r={r} i={i} t={t} allPlaces={allPlaces}
                setActivePlace={setActivePlace} setShowMap={setShowMap} openGuide={openGuide} />
            ))}
            {/* Vegetarian */}
            {(plan.restaurants || []).some(r => r.vegetarian) && (
              <>
                <SectionHeader title={t.vegT} sub={t.vegSub} style={{ marginTop: 24 }} />
                {(plan.restaurants || []).filter(r => r.vegetarian).map((r, i) => (
                  <RestaurantCard key={"v" + i} r={r} i={i} t={t} allPlaces={allPlaces}
                    setActivePlace={setActivePlace} setShowMap={setShowMap} openGuide={openGuide} />
                ))}
              </>
            )}
          </div>
        )}

        {/* ITINERARY */}
        {activeTab === "itinerary" && (
          <div className="card-enter">
            <SectionHeader title={t.itinT} sub={t.itinSub} />
            {(plan.itinerary || []).length === 0 ? (
              <EmptyState msg="No hay itinerario disponible." />
            ) : (plan.itinerary || []).map((day, i) => (
              <div key={i} style={{ background: P.card2, border: `1px solid ${P.border}`,
                borderRadius: 16, padding: "16px", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: GOLD_GRAD,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14, fontWeight: 900, color: P.black, flexShrink: 0 }}>
                    {day.day}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: P.white }}>{day.title}</div>
                </div>
                {[
                  { key: "morning",   label: t.morning },
                  { key: "afternoon", label: t.afternoon },
                  { key: "evening",   label: t.evening },
                  { key: "transport", label: t.transport },
                ].map(({ key, label }) => day[key] && (
                  <div key={key} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                    <div style={{ fontSize: 12, color: P.muted, minWidth: 70 }}>{label}</div>
                    <div style={{ fontSize: 13, color: P.white, flex: 1 }}>{day[key]}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* TIPS */}
        {activeTab === "tips" && (
          <div className="card-enter">
            <SectionHeader title={t.tipsT} sub="" />
            {(plan.tips || []).map((tip, i) => (
              <div key={i} style={{ background: P.card2, border: `1px solid ${P.border}`,
                borderRadius: 14, padding: "14px 16px", marginBottom: 10,
                display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: P.goldDim,
                  border: `1px solid ${P.goldBorder}`, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, color: P.gold, fontWeight: 900 }}>{i + 1}</div>
                <div style={{ fontSize: 14, color: P.white, lineHeight: 1.5 }}>{tip}</div>
              </div>
            ))}
            {/* Transport section */}
            {plan.transport && (
              <>
                <SectionHeader title={t.transportT} sub={t.transportSub} style={{ marginTop: 20 }} />
                <div style={{ background: P.card2, border: `1px solid ${P.border}`,
                  borderRadius: 14, padding: "16px" }}>
                  {[
                    { k: "main",  label: "Principal" },
                    { k: "app",   label: "App" },
                    { k: "pass",  label: "Bono" },
                    { k: "price", label: "Precio" },
                  ].map(({ k, label }) => plan.transport[k] && (
                    <div key={k} style={{ display: "flex", justifyContent: "space-between",
                      padding: "8px 0", borderBottom: `1px solid ${P.border}` }}>
                      <span style={{ fontSize: 13, color: P.muted }}>{label}</span>
                      <span style={{ fontSize: 13, color: P.white, fontWeight: 600 }}>{plan.transport[k]}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
            {/* Summary / totals */}
            <SectionHeader title={t.pkgT} sub="" style={{ marginTop: 20 }} />
            <div style={{ background: P.card2, border: `1px solid ${P.border}`,
              borderRadius: 14, padding: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between",
                padding: "8px 0", borderBottom: `1px solid ${P.border}` }}>
                <span style={{ fontSize: 14, color: P.muted }}>{t.hotelsT}</span>
                <span style={{ fontSize: 14, color: P.white }}>
                  {plan.hotels?.[0]?.price ? `${plan.hotels[0].price * nights}€` : "—"}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between",
                padding: "8px 0", borderBottom: `1px solid ${P.border}` }}>
                <span style={{ fontSize: 14, color: P.muted }}>{t.flightsT}</span>
                <span style={{ fontSize: 14, color: P.white }}>
                  {plan.flights?.[0]?.price ? `${plan.flights[0].price}€` : "—"}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0 4px" }}>
                <span style={{ fontSize: 16, fontWeight: 800, color: P.white }}>{t.totalL}</span>
                <span style={{ fontSize: 18, fontWeight: 900,
                  background: GOLD_GRAD, WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent" }}>~{plan.totalEstimate || plan.budget}€</span>
              </div>
              <div style={{ fontSize: 11, color: P.muted, textAlign: "right" }}>{t.demoSmall}</div>
            </div>
          </div>
        )}
      </div>

      {/* Floating buttons */}
      <div style={{ position: "fixed", bottom: 20, right: 16, display: "flex",
        flexDirection: "column", gap: 10, zIndex: 400 }}>
        {/* Marco guide button */}
        <button onClick={() => setShowMarco(v => !v)}
          style={{ width: 56, height: 56, borderRadius: "50%", background: GOLD_GRAD,
            border: "none", cursor: "pointer", display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 24, boxShadow: "0 4px 20px rgba(201,169,110,.4)",
            transition: "transform .2s" }}
          onMouseEnter={e => e.target.style.transform = "scale(1.1)"}
          onMouseLeave={e => e.target.style.transform = "scale(1)"}>
          🧭
        </button>
      </div>

      {/* Marco chatbot */}
      {showMarco && (
        <VirtualGuide plan={plan} places={allPlaces} userPos={userPos}
          lang={lang} onClose={() => setShowMarco(false)} />
      )}

      {/* Guide modal */}
      {showGuide && guidePlace && (
        <GuideModal place={guidePlace} plan={plan} lang={lang}
          onClose={() => { setShowGuide(false); setGuidePlace(null); }} />
      )}
    </div>
  );
}

// ─── RESTAURANT CARD ──────────────────────────────────────────────────────────
function RestaurantCard({ r, i, t, allPlaces, setActivePlace, setShowMap, openGuide }) {
  return (
    <div style={{ background: P.card2, border: `1px solid ${P.border}`,
      borderRadius: 16, overflow: "hidden", marginBottom: 12 }}>
      <img src={REST_IMGS[i % REST_IMGS.length]} alt={r.name}
        style={{ width: "100%", height: 120, objectFit: "cover" }} />
      <div style={{ padding: "12px 14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: P.white }}>{r.name}</div>
            <div style={{ fontSize: 12, color: P.muted, marginTop: 2 }}>
              {r.cuisine} · {r.area} · {r.price}
            </div>
            <div style={{ fontSize: 12, color: P.gold, marginTop: 2 }}>⭐ {r.rating}</div>
          </div>
        </div>
        {r.desc && <p style={{ margin: "8px 0 0", fontSize: 12, color: P.sub, lineHeight: 1.5 }}>{r.desc}</p>}
        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          <button onClick={() => openGuide(r)}
            style={{ flex: 1, padding: "8px", background: P.card3, border: `1px solid ${P.border}`,
              borderRadius: 10, color: P.sub, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
            🎙 Historia
          </button>
          <a href={r.bookUrl || "https://www.tripadvisor.es/"} target="_blank" rel="noopener noreferrer"
            style={{ flex: 1, padding: "8px", background: GOLD_GRAD, color: P.black,
              borderRadius: 10, fontSize: 12, fontWeight: 700, textAlign: "center",
              textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {t.bookRest}
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── SMALL HELPERS ────────────────────────────────────────────────────────────
function SectionHeader({ title, sub, style: extraStyle }) {
  return (
    <div style={{ marginBottom: 14, ...extraStyle }}>
      <div style={{ fontSize: 18, fontWeight: 800, color: P.white }}>{title}</div>
      {sub && <div style={{ fontSize: 13, color: P.muted, marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

function EmptyState({ msg }) {
  return (
    <div style={{ padding: "32px 20px", textAlign: "center", color: P.muted, fontSize: 14 }}>
      {msg}
    </div>
  );
}
