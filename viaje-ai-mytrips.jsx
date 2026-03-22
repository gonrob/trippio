import { useState, useEffect, useRef } from "react";

// ─── COLORES ──────────────────────────────────────────────────────────────────
const P = {
  black:"#0D0D0D", card:"#141414", card2:"#1A1A1A", card3:"#252525",
  border:"#2A2A2A", muted:"#6B6B6B", sub:"#A0A0A0",
  white:"#FFFFFF", gold:"#C9A96E",
  goldDim:"rgba(201,169,110,.18)", goldBorder:"rgba(201,169,110,.25)",
};
const GG = "linear-gradient(135deg,#C9A96E,#E8C98A)";

// ─── IMÁGENES ─────────────────────────────────────────────────────────────────
const DEST_IMGS = {
  default:"https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=900&q=80",
  tokyo:"https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=900&q=80",
  tokio:"https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=900&q=80",
  paris:"https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=900&q=80",
  roma:"https://images.unsplash.com/photo-1529260830199-42c24126f198?w=900&q=80",
  rome:"https://images.unsplash.com/photo-1529260830199-42c24126f198?w=900&q=80",
  bangkok:"https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=900&q=80",
  bali:"https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&q=80",
  berlin:"https://images.unsplash.com/photo-1560969184-10fe8719e047?w=900&q=80",
  dubai:"https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&q=80",
  london:"https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=900&q=80",
  barcelona:"https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=900&q=80",
  nueva:"https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=900&q=80",
  new:"https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=900&q=80",
  lisboa:"https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=900&q=80",
  amsterdam:"https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=900&q=80",
};
const HOTEL_IMGS = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=75",
  "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&q=75",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=75",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&q=75",
];
const REST_IMGS = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=75",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=75",
  "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&q=75",
  "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=400&q=75",
];

// ─── TRADUCCIONES ─────────────────────────────────────────────────────────────
const T = {
  es: {
    flag:"🇪🇸", name:"Español", lp:"Responde en español.",
    newSearch:"Nueva búsqueda",
    h1a:"Tu próximo viaje,", h1b:"en un clic.",
    sub:"Elige tu estilo, destino y presupuesto.",
    stepType:"¿Qué tipo de viaje?", stepTypeSub:"Elige uno o varios",
    stepStyle:"¿Cómo prefieres viajar?", stepDetails:"Cuéntanos más",
    tripNames:{adventure:"Aventura",culture:"Cultura",beach:"Playa",gastro:"Gastronomía",
      nature:"Naturaleza",city:"Ciudad",wellness:"Bienestar",nightlife:"Vida Nocturna",retreat:"Retiro"},
    styleNames:{backpacker:"Mochilero",comfort:"Confort",luxury:"Lujo"},
    styleDesc:{backpacker:"Hostels 1★, auténtico",comfort:"Hoteles 2-3★, equilibrio",luxury:"Hoteles 4-5★, VIP"},
    originL:"Origen", destL:"Destino *", budgetL:"Presupuesto (€)",
    originPh:"Madrid, España", destPh:"Tokio, París, Bangkok...", budgetPh:"1500",
    arrivalL:"Llegada", departureL:"Salida",
    travelersL:"Viajeros", t1:"1 viajero", tN:n=>`${n} viajeros`,
    searchBtn:"Buscar mi viaje ✦", nextBtn:"Siguiente →", backBtn:"← Atrás",
    loadTitle:"Preparando tu aventura…", loadSub:"Buscando las mejores opciones",
    loadSteps:["Creando itinerario","Vuelos","Hoteles","Restaurantes","Clima","¡Listo!"],
    flightsT:"Vuelos disponibles",
    flightsSub:(d,n,o)=>`${o||"Madrid"} → ${d} · ${n} viajero${n>1?"s":""}`,
    direct:"✈ Directo", stops:n=>`${n} escala${n>1?"s":""}`, pp:"por persona",
    hotelsT:"Hoteles", hotelsSub:n=>`${n} noches`, pn:"/ noche",
    restsT:"Dónde comer", restsSub:"Mejores restaurantes", vegT:"Opciones vegetarianas",
    itinT:"Itinerario día a día", itinSub:"Tu plan personalizado",
    morning:"☀️ Mañana", afternoon:"🌤 Tarde", evening:"🌙 Noche", transport:"🚇 Transporte",
    tipsT:"Tips del viaje", transportT:"Transporte",
    pkgT:"Resumen", totalL:"Total estimado", demoSmall:"Precios orientativos",
    bookFlight:"✈️ Reservar vuelo", bookHotel:"🏨 Reservar hotel", bookRest:"🍽️ Reservar mesa",
    mapBtn:"🗺 Ver en mapa", shareBtn:"Compartir", shareCopied:"¡Copiado!",
    errorMsg:"Error al generar. Inténtalo de nuevo.",
    days:n=>`${n} días`,
    guideHi:"¡Hola! Soy Marco, tu guía. ¿En qué te ayudo?",
    guidePh:"Pregúntame sobre este destino...",
    sofiaTalking:"🔊 Hablando...", sofiaListen:"▶️ Escuchar de nuevo",
  },
  en: {
    flag:"🇬🇧", name:"English", lp:"Respond in English.",
    newSearch:"New search",
    h1a:"Your next trip,", h1b:"in one click.",
    sub:"Choose your style, destination and budget.",
    stepType:"What kind of trip?", stepTypeSub:"Choose one or more",
    stepStyle:"How do you travel?", stepDetails:"Tell us more",
    tripNames:{adventure:"Adventure",culture:"Culture",beach:"Beach",gastro:"Gastronomy",
      nature:"Nature",city:"City Break",wellness:"Wellness",nightlife:"Nightlife",retreat:"Retreat"},
    styleNames:{backpacker:"Backpacker",comfort:"Comfort",luxury:"Luxury"},
    styleDesc:{backpacker:"Hostels 1★, authentic",comfort:"2-3★ hotels, value",luxury:"4-5★ hotels, VIP"},
    originL:"Origin", destL:"Destination *", budgetL:"Budget (€)",
    originPh:"London, UK", destPh:"Tokyo, Paris, Bangkok...", budgetPh:"1500",
    arrivalL:"Check-in", departureL:"Check-out",
    travelersL:"Travelers", t1:"1 traveler", tN:n=>`${n} travelers`,
    searchBtn:"Find my trip ✦", nextBtn:"Next →", backBtn:"← Back",
    loadTitle:"Preparing your adventure…", loadSub:"Searching best options",
    loadSteps:["Creating itinerary","Flights","Hotels","Restaurants","Weather","All ready!"],
    flightsT:"Available flights",
    flightsSub:(d,n,o)=>`${o||"Madrid"} → ${d} · ${n} traveler${n>1?"s":""}`,
    direct:"✈ Direct", stops:n=>`${n} stop${n>1?"s":""}`, pp:"per person",
    hotelsT:"Hotels", hotelsSub:n=>`${n} nights`, pn:"/ night",
    restsT:"Where to eat", restsSub:"Best restaurants", vegT:"Vegetarian options",
    itinT:"Day by day itinerary", itinSub:"Your personalized plan",
    morning:"☀️ Morning", afternoon:"🌤 Afternoon", evening:"🌙 Evening", transport:"🚇 Transport",
    tipsT:"Travel tips", transportT:"Transport",
    pkgT:"Summary", totalL:"Estimated total", demoSmall:"Estimated prices",
    bookFlight:"✈️ Book flight", bookHotel:"🏨 Book hotel", bookRest:"🍽️ Book table",
    mapBtn:"🗺 View on map", shareBtn:"Share", shareCopied:"Copied!",
    errorMsg:"Error generating. Please try again.",
    days:n=>`${n} days`,
    guideHi:"Hi! I'm Marco, your guide. How can I help?",
    guidePh:"Ask me about this destination...",
    sofiaTalking:"🔊 Speaking...", sofiaListen:"▶️ Listen again",
  },
};

const TRIP_TYPES = {
  adventure:{icon:"🏔️"}, culture:{icon:"🏛️"}, beach:{icon:"🏖️"},
  gastro:{icon:"🍜"}, nature:{icon:"🌿"}, city:{icon:"🏙️"},
  wellness:{icon:"🧘"}, nightlife:{icon:"🎉"}, retreat:{icon:"🌀"},
};
const TRAVELER_STYLES = {
  backpacker:{icon:"🎒",pct:0.15},
  comfort:{icon:"🛎️",pct:0.35},
  luxury:{icon:"💎",pct:0.60},
};

// ─── UTILIDADES ───────────────────────────────────────────────────────────────
function getImg(dest="") {
  const d = dest.toLowerCase();
  for (const [k,v] of Object.entries(DEST_IMGS)) if (d.includes(k)) return v;
  return DEST_IMGS.default;
}
const diffDays = (a,b) => (!a||!b) ? 7 :
  Math.max(1, Math.round((new Date(b+"T12:00:00") - new Date(a+"T12:00:00")) / 86400000) + 1);

function safeJson(txt) {
  try {
    const clean = txt.replace(/```json\n?/g,"").replace(/```\n?/g,"").trim();
    return JSON.parse(clean);
  } catch { return null; }
}

// ─── CSS GLOBAL ───────────────────────────────────────────────────────────────
const CSS = `
  @keyframes dot  { 0%,80%,100%{transform:scale(0.6);opacity:.4} 40%{transform:scale(1);opacity:1} }
  @keyframes spin { to{transform:rotate(360deg)} }
  @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
  * { box-sizing:border-box; -webkit-tap-highlight-color:transparent; }
  body { margin:0; background:#0D0D0D; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; }
  ::-webkit-scrollbar { width:3px; } ::-webkit-scrollbar-thumb { background:#333; border-radius:3px; }
  input,button { font-family:inherit; }
  .fade { animation:fadeUp .3s ease both; }
`;

function GlobalCSS() { return <style dangerouslySetInnerHTML={{__html:CSS}}/>; }

// ─── LOGO ─────────────────────────────────────────────────────────────────────
function Logo({size=32}) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none"
      style={{flexShrink:0,filter:`drop-shadow(0 2px 6px rgba(201,169,110,0.4))`}}>
      <defs>
        <linearGradient id="lg" x1="15%" y1="15%" x2="85%" y2="85%">
          <stop offset="0%" stopColor="#E8C98A"/><stop offset="100%" stopColor="#B8935A"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="45" stroke="url(#lg)" strokeWidth="2.5" opacity="0.6"/>
      <path d="M 24 72 L 68 20 L 76 54 Z" fill="url(#lg)" opacity="0.95"/>
      <path d="M 24 72 L 76 54 L 52 68 Z" fill="#B8935A" opacity="0.7"/>
    </svg>
  );
}

// ─── MAPA LEAFLET ─────────────────────────────────────────────────────────────
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

function TravelMap({places, active, onSelect}) {
  const ref = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const leafletReady = useLeaflet();

  useEffect(() => {
    if (!leafletReady || !ref.current || mapRef.current) return;
    const L = window.L;
    const map = L.map(ref.current, {zoomControl:false, attributionControl:false});
    L.control.zoom({position:"bottomright"}).addTo(map);
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {maxZoom:19}).addTo(map);
    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, [leafletReady]);

  useEffect(() => {
    const L = window.L, map = mapRef.current;
    if (!L || !map || !places?.length) return;
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];
    const bounds = [];
    places.forEach((p, i) => {
      if (!p.lat || !p.lng) return;
      const isA = active === i;
      const em = p.type==="hotel" ? "🏨" : p.type==="restaurant" ? "🍽️" : "◆";
      const sz = isA ? 44 : 34;
      const html = `<div style="width:${sz}px;height:${sz}px;background:${isA?P.gold:"#2C2C2E"};border:2.5px solid ${P.gold};border-radius:${p.type==="hotel"?"12px":"50%"};display:flex;align-items:center;justify-content:center;font-size:${isA?18:12}px;cursor:pointer">${isA?em:i+1}</div>`;
      const icon = L.divIcon({className:"", html, iconSize:[sz,sz], iconAnchor:[sz/2,sz/2]});
      const mk = L.marker([p.lat,p.lng], {icon}).addTo(map)
        .bindPopup(`<b>${p.name}</b>${p.desc?`<br><small>${p.desc}</small>`:""}`)
        .on("click", () => onSelect(i));
      markersRef.current.push(mk);
      bounds.push([p.lat, p.lng]);
    });
    if (bounds.length) map.fitBounds(bounds, {padding:[44,44], maxZoom:14, animate:true});
  }, [places, leafletReady]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || active == null || !places?.[active]) return;
    const p = places[active];
    if (p.lat && p.lng) {
      map.flyTo([p.lat, p.lng], 15, {animate:true, duration:1});
      markersRef.current[active]?.openPopup();
    }
  }, [active]);

  return (
    <div style={{borderRadius:16, overflow:"hidden", boxShadow:"0 8px 32px rgba(0,0,0,.5)"}}>
      <div ref={ref} style={{height:320}}/>
    </div>
  );
}

// ─── MARCO (chat IA) ──────────────────────────────────────────────────────────
function Marco({plan, places, lang, onClose}) {
  const t = T[lang];
  const [msgs, setMsgs] = useState([{r:"a", txt:t.guideHi}]);
  const [inp, setInp] = useState("");
  const [load, setLoad] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({behavior:"smooth"}); }, [msgs]);

  async function send() {
    if (!inp.trim() || load) return;
    const q = inp.trim();
    setInp(""); setLoad(true);
    setMsgs(prev => [...prev, {r:"u", txt:q}]);
    const ctx = plan
      ? `Destino: ${plan.destination}. Dias: ${plan.days}. Presupuesto: ${plan.budget}EUR. Lugares: ${(places||[]).slice(0,6).map(p=>p.name).join(", ")}.`
      : "";
    try {
      const r = await fetch("/api/anthropic", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-haiku-4-5", max_tokens:600,
          system:`Eres Marco, guia turistico virtual. ${t.lp} ${ctx} Se conciso, max 4 frases.`,
          messages:[
            ...msgs.slice(-8).map(m => ({role:m.r==="a"?"assistant":"user", content:m.txt})),
            {role:"user", content:q}
          ]
        })
      });
      if (!r.ok) throw new Error("HTTP " + r.status);
      const d = await r.json();
      const txt = (d.content||[]).map(b=>b.text||"").join("") || t.errorMsg;
      setMsgs(prev => [...prev, {r:"a", txt}]);
    } catch {
      setMsgs(prev => [...prev, {r:"a", txt:t.errorMsg}]);
    }
    setLoad(false);
  }

  return (
    <div style={{position:"fixed",bottom:88,right:16,width:308,background:"#1C1C1E",
      border:`1px solid ${P.border}`,borderRadius:20,boxShadow:"0 20px 60px rgba(0,0,0,.8)",
      zIndex:500,display:"flex",flexDirection:"column",maxHeight:"58vh",overflow:"hidden"}}>
      <div style={{background:"#1E1E20",padding:"12px 14px",display:"flex",alignItems:"center",
        gap:9,borderBottom:`1px solid ${P.border}`,borderRadius:"20px 20px 0 0"}}>
        <span style={{fontSize:28}}>🧭</span>
        <div style={{flex:1}}>
          <div style={{fontSize:14,fontWeight:700,color:"#fff"}}>Marco</div>
          <div style={{fontSize:11,color:P.gold}}>AI Guide · {plan?.destination||"..."}</div>
        </div>
        <button onClick={onClose} style={{background:"#2C2C2E",border:"none",color:P.muted,
          borderRadius:8,width:26,height:26,cursor:"pointer",fontSize:14}}>✕</button>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:10,display:"flex",flexDirection:"column",gap:7}}>
        {msgs.map((m,i) => (
          <div key={i} style={{display:"flex",gap:6,flexDirection:m.r==="u"?"row-reverse":"row"}}>
            <div style={{
              background:m.r==="u"?GG:"#2C2C2E", color:m.r==="u"?"#0D0D0D":"#fff",
              borderRadius:m.r==="u"?"14px 14px 3px 14px":"14px 14px 14px 3px",
              padding:"8px 12px",fontSize:12,lineHeight:1.5,maxWidth:"80%"
            }}>{m.txt}</div>
          </div>
        ))}
        {load && (
          <div style={{display:"flex",gap:4,padding:"8px 12px",background:"#2C2C2E",
            borderRadius:"14px 14px 14px 3px",width:"fit-content"}}>
            {[0,1,2].map(i=><div key={i} style={{width:5,height:5,background:P.gold,borderRadius:"50%",
              animation:`dot .8s ${i*.2}s ease-in-out infinite`}}/>)}
          </div>
        )}
        <div ref={endRef}/>
      </div>
      <div style={{padding:9,borderTop:`1px solid ${P.border}`,display:"flex",gap:6}}>
        <input value={inp} onChange={e=>setInp(e.target.value)}
          onKeyDown={e=>e.key==="Enter"&&send()} placeholder={t.guidePh}
          style={{flex:1,background:"#2C2C2E",border:`1px solid ${P.border}`,borderRadius:9,
            padding:"8px 11px",fontSize:12,color:"#fff",outline:"none"}}
          onFocus={e=>e.target.style.borderColor=P.gold}
          onBlur={e=>e.target.style.borderColor=P.border}/>
        <button onClick={send} disabled={!inp.trim()||load}
          style={{background:GG,border:"none",borderRadius:9,width:36,height:36,
            cursor:"pointer",fontSize:14,opacity:!inp.trim()||load?.5:1}}>↑</button>
      </div>
    </div>
  );
}

// ─── SOFIA (audio de lugares) ─────────────────────────────────────────────────
function Sofia({place, plan, lang, onClose}) {
  const t = T[lang];
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const audioRef = useRef(null);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      if (audioRef.current) { audioRef.current.pause(); audioRef.current.src = ""; }
    };
  }, []);

  useEffect(() => {
    async function loadStory() {
      try {
        const r = await fetch("/api/anthropic", {
          method:"POST", headers:{"Content-Type":"application/json"},
          body: JSON.stringify({
            model:"claude-haiku-4-5", max_tokens:400,
            system:`Eres Sofia, guia turistica experta y apasionada. ${t.lp} Primera persona. Max 4 frases emocionantes.`,
            messages:[{role:"user",content:`Historia y curiosidades de: ${place.name}. Estamos en ${plan?.destination||"este destino"}.`}]
          })
        });
        if (!r.ok) throw new Error("HTTP "+r.status);
        const d = await r.json();
        const txt = (d.content||[]).map(b=>b.text||"").join("");
        if (!mounted.current) return;
        setStory(txt); setLoading(false);
        setSpeaking(true);
        try {
          const ar = await fetch("/api/elevenlabs", {
            method:"POST", headers:{"Content-Type":"application/json"},
            body: JSON.stringify({text:txt, voiceId:"yiWEefwu5z3DQCM79clN"})
          });
          if (ar.ok && mounted.current) {
            const blob = await ar.blob();
            const audio = new Audio(URL.createObjectURL(blob));
            audioRef.current = audio;
            audio.onended = () => { if (mounted.current) setSpeaking(false); };
            audio.play();
          } else { if (mounted.current) setSpeaking(false); }
        } catch { if (mounted.current) setSpeaking(false); }
      } catch {
        if (mounted.current) { setLoading(false); setStory(t.errorMsg); }
      }
    }
    loadStory();
  }, []);

  async function replay() {
    if (!story || speaking) return;
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.src = ""; }
    setSpeaking(true);
    try {
      const ar = await fetch("/api/elevenlabs", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({text:story, voiceId:"yiWEefwu5z3DQCM79clN"})
      });
      if (ar.ok) {
        const blob = await ar.blob();
        const audio = new Audio(URL.createObjectURL(blob));
        audioRef.current = audio;
        audio.onended = () => { if (mounted.current) setSpeaking(false); };
        audio.play();
      } else { setSpeaking(false); }
    } catch { setSpeaking(false); }
  }

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.93)",zIndex:2000,
      display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-end"}}
      onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div style={{width:"100%",maxWidth:500,padding:"0 20px 48px"}}>
        <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:20}}>
          <div style={{width:64,height:64,borderRadius:"50%",overflow:"hidden",
            border:`3px solid ${P.gold}`,flexShrink:0}}>
            <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&q=80"
              alt="Sofia" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:18,fontWeight:800,color:"#fff"}}>Sofia</div>
            <div style={{fontSize:12,color:P.gold}}>Guia · {place.name}</div>
          </div>
          <button onClick={onClose} style={{background:"rgba(255,255,255,.1)",border:"none",
            color:"#fff",borderRadius:"50%",width:36,height:36,cursor:"pointer",fontSize:18}}>✕</button>
        </div>
        <div style={{background:"rgba(0,0,0,.6)",backdropFilter:"blur(20px)",borderRadius:16,
          padding:20,border:`1px solid ${P.goldBorder}`,marginBottom:16,minHeight:90}}>
          {loading ? (
            <div style={{display:"flex",gap:5,justifyContent:"center",padding:"16px 0"}}>
              {[0,1,2].map(i=><div key={i} style={{width:8,height:8,background:P.gold,
                borderRadius:"50%",animation:`dot .8s ${i*.2}s ease-in-out infinite`}}/>)}
            </div>
          ) : (
            <p style={{margin:0,fontSize:14,color:"#fff",lineHeight:1.7,fontStyle:"italic"}}>
              "{story}"
            </p>
          )}
        </div>
        <div style={{display:"flex",gap:10}}>
          <button onClick={replay} disabled={loading||!story||speaking}
            style={{flex:1,padding:12,background:loading||!story?P.card2:GG,
              color:loading||!story?P.muted:"#0D0D0D",border:"none",borderRadius:12,
              fontSize:14,fontWeight:700,cursor:"pointer"}}>
            {speaking ? t.sofiaTalking : t.sofiaListen}
          </button>
          <button onClick={onClose}
            style={{padding:"12px 18px",background:"rgba(255,255,255,.1)",color:"#fff",
              border:"1px solid rgba(255,255,255,.2)",borderRadius:12,fontSize:14,cursor:"pointer"}}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── LOADING (solo visual) ────────────────────────────────────────────────────
function Loading({lang, step}) {
  const t = T[lang];
  return (
    <div style={{position:"fixed",inset:0,background:P.black,zIndex:900,
      display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:32}}>
      <Logo size={60}/>
      <div style={{marginTop:20,fontSize:22,fontWeight:800,color:P.white,textAlign:"center"}}>{t.loadTitle}</div>
      <div style={{marginTop:8,fontSize:13,color:P.muted,textAlign:"center"}}>{t.loadSub}</div>
      <div style={{marginTop:36,display:"flex",flexDirection:"column",gap:10,width:"100%",maxWidth:260}}>
        {t.loadSteps.map((s,i) => {
          const done = i < step, active = i === step;
          return (
            <div key={i} style={{display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:28,height:28,borderRadius:"50%",flexShrink:0,
                background:done?P.gold:active?"transparent":P.card2,
                border:active?`2px solid ${P.gold}`:done?"none":`2px solid ${P.border}`,
                display:"flex",alignItems:"center",justifyContent:"center"}}>
                {done && <span style={{color:P.black,fontSize:12,fontWeight:900}}>✓</span>}
                {active && <div style={{width:10,height:10,borderRadius:"50%",
                  border:`2px solid ${P.gold}`,borderTopColor:"transparent",
                  animation:"spin .8s linear infinite"}}/>}
              </div>
              <span style={{fontSize:13,color:done?P.gold:active?P.white:P.muted,
                fontWeight:active||done?600:400}}>{s}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function Hdr({title, sub, style:s}) {
  return (
    <div style={{marginBottom:12,...s}}>
      <div style={{fontSize:18,fontWeight:800,color:P.white}}>{title}</div>
      {sub && <div style={{fontSize:13,color:P.muted,marginTop:2}}>{sub}</div>}
    </div>
  );
}
function Empty() {
  return <div style={{padding:"28px",textAlign:"center",color:P.muted,fontSize:14}}>No hay datos disponibles.</div>;
}
function RestCard({r, i, t, setSofia}) {
  return (
    <div style={{background:P.card2,border:`1px solid ${P.border}`,
      borderRadius:14,overflow:"hidden",marginBottom:10}}>
      <img src={REST_IMGS[i%REST_IMGS.length]} alt={r.name}
        style={{width:"100%",height:120,objectFit:"cover"}}/>
      <div style={{padding:"11px 13px"}}>
        <div style={{fontSize:14,fontWeight:700,color:P.white}}>{r.name}</div>
        <div style={{fontSize:12,color:P.muted,marginTop:2}}>{r.cuisine} · {r.area} · {r.price}</div>
        <div style={{fontSize:12,color:P.gold,marginTop:2}}>⭐ {r.rating}</div>
        {r.desc && <p style={{margin:"7px 0 0",fontSize:12,color:P.sub,lineHeight:1.5}}>{r.desc}</p>}
        <div style={{display:"flex",gap:8,marginTop:9}}>
          <button onClick={()=>setSofia(r)}
            style={{flex:1,padding:8,background:P.card3,border:`1px solid ${P.border}`,
              borderRadius:10,color:P.sub,fontSize:12,fontWeight:600,cursor:"pointer"}}>
            🎙 Historia
          </button>
          <a href={r.bookUrl||"https://www.tripadvisor.es/"} target="_blank" rel="noopener noreferrer"
            style={{flex:1,padding:8,background:GG,color:P.black,borderRadius:10,
              fontSize:12,fontWeight:700,textAlign:"center",textDecoration:"none",
              display:"flex",alignItems:"center",justifyContent:"center"}}>
            {t.bookRest}
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState("es");
  const t = T[lang];

  // Wizard state
  const [wizStep, setWizStep] = useState(0);
  const [tripTypes, setTripTypes] = useState([]);
  const [travelStyle, setTravelStyle] = useState(null);
  const [origin, setOrigin] = useState("");
  const [dest, setDest] = useState("");
  const [budget, setBudget] = useState("");
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [travelers, setTravelers] = useState(1);

  // Results state — plan is single source of truth
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadStep, setLoadStep] = useState(0);
  const [error, setError] = useState(null);

  // UI state
  const [tab, setTab] = useState("flights");
  const [showMap, setShowMap] = useState(false);
  const [activePlace, setActivePlace] = useState(null);
  const [showMarco, setShowMarco] = useState(false);
  const [sofia, setSofia] = useState(null);
  const [shareCopied, setShareCopied] = useState(false);

  const nights = diffDays(arrival, departure);

  const allPlaces = plan ? [
    ...(plan.hotels||[]).map(h=>({...h,type:"hotel"})),
    ...(plan.restaurants||[]).map(r=>({...r,type:"restaurant"})),
    ...(plan.places||[]).map(p=>({...p,type:"place"})),
  ] : [];

  function reset() {
    setPlan(null); setError(null); setLoading(false); setLoadStep(0);
    setWizStep(0); setTripTypes([]); setTravelStyle(null);
    setDest(""); setBudget(""); setArrival(""); setDeparture("");
    setTravelers(1); setTab("flights"); setShowMap(false);
    setShowMarco(false); setSofia(null);
  }

  function share() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setShareCopied(true); setTimeout(() => setShareCopied(false), 2000);
    });
  }

  function toggleType(k) {
    setTripTypes(prev => prev.includes(k) ? prev.filter(x=>x!==k) : [...prev,k]);
  }

  // ── BÚSQUEDA ────────────────────────────────────────────────────────────────
  async function search() {
    if (!dest.trim()) return;
    setError(null); setPlan(null); setLoading(true); setLoadStep(0);

    // Visual timer — independent of API call
    const timer = setInterval(() => {
      setLoadStep(prev => { if (prev >= 4) { clearInterval(timer); return prev; } return prev+1; });
    }, 900);

    const budgetNum = parseInt(budget) || 1500;
    const prompt = `Eres experto planificador de viajes. Genera plan COMPLETO en JSON valido sin markdown.

Datos:
- Origen: ${origin||"Madrid"}
- Destino: ${dest}
- Presupuesto: ${budgetNum}EUR para ${travelers} persona(s)
- Fechas: ${arrival||"flexible"} a ${departure||"flexible"} (${nights} noches)
- Estilo: ${travelStyle||"comfort"}
- Tipos: ${tripTypes.join(", ")||"city"}
- Idioma respuesta: ${lang==="es"?"espanol":"ingles"}

Responde SOLO el JSON:
{
  "destination": "nombre destino",
  "days": ${nights},
  "budget": ${budgetNum},
  "travelStyle": "${travelStyle||"comfort"}",
  "weather": {"temp": "22C", "desc": "Soleado"},
  "flights": [
    {"airline": "nombre real", "code": "XX1234", "dep": "08:30", "arr": "16:45", "duration": "5h 15m", "stops": 0, "price": ${Math.round(budgetNum*0.35)}, "bookUrl": "https://www.skyscanner.es/"},
    {"airline": "nombre real 2", "code": "YY5678", "dep": "14:00", "arr": "23:30", "duration": "6h 30m", "stops": 1, "price": ${Math.round(budgetNum*0.25)}, "bookUrl": "https://www.skyscanner.es/"}
  ],
  "hotels": [
    {"name": "hotel nombre real", "stars": 4, "area": "zona", "price": ${Math.round(budgetNum*0.3/nights)}, "rating": 4.5, "desc": "descripcion", "lat": 35.6762, "lng": 139.6503, "bookUrl": "https://www.booking.com/searchresults.html?ss=${encodeURIComponent(dest)}"},
    {"name": "hotel nombre 2", "stars": 3, "area": "zona 2", "price": ${Math.round(budgetNum*0.2/nights)}, "rating": 4.2, "desc": "descripcion", "lat": 35.6580, "lng": 139.7016, "bookUrl": "https://www.booking.com/searchresults.html?ss=${encodeURIComponent(dest)}"}
  ],
  "restaurants": [
    {"name": "rest nombre", "cuisine": "tipo", "price": "EU", "rating": 4.7, "desc": "descripcion", "area": "zona", "lat": 35.6762, "lng": 139.6503, "bookUrl": "https://www.tripadvisor.es/"},
    {"name": "rest 2", "cuisine": "tipo", "price": "EUEU", "rating": 4.5, "desc": "descripcion", "area": "zona", "lat": 35.6580, "lng": 139.7016, "bookUrl": "https://www.tripadvisor.es/"},
    {"name": "rest vegano", "cuisine": "vegetariano", "price": "EU", "rating": 4.4, "desc": "descripcion", "area": "zona", "lat": 35.6700, "lng": 139.7100, "bookUrl": "https://www.tripadvisor.es/", "vegetarian": true}
  ],
  "places": [
    {"name": "lugar 1 real", "desc": "descripcion", "lat": 35.6762, "lng": 139.6503},
    {"name": "lugar 2 real", "desc": "descripcion", "lat": 35.6895, "lng": 139.6917}
  ],
  "itinerary": [
    {"day": 1, "title": "titulo dia", "morning": "actividad manana", "afternoon": "actividad tarde", "evening": "actividad noche", "transport": "metro/taxi"}
  ],
  "tips": ["tip 1 util", "tip 2 util", "tip 3 util"],
  "transport": {"main": "Metro", "app": "Google Maps", "pass": "Tourist card", "price": "~15EUR/dia"},
  "totalEstimate": ${budgetNum}
}
USA coordenadas REALES de ${dest}. Itinerario de ${Math.min(nights,7)} dias.`;

    try {
      const r = await fetch("/api/anthropic", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-5", max_tokens:4000,
          system:"Experto planificador de viajes. Responde SOLO JSON valido sin markdown ni texto adicional.",
          messages:[{role:"user", content:prompt}]
        })
      });
      clearInterval(timer);
      if (!r.ok) throw new Error("HTTP "+r.status);
      const d = await r.json();
      const raw = (d.content||[]).map(b=>b.text||"").join("");
      const parsed = safeJson(raw);
      if (!parsed) throw new Error("JSON invalido");
      setLoadStep(5);
      await new Promise(res => setTimeout(res, 400));
      setPlan(parsed);    // ← resultados aparecen AQUI
      setLoading(false);  // ← loading desaparece AQUI
      setTab("flights");
    } catch(e) {
      clearInterval(timer);
      setError(t.errorMsg + " (" + e.message + ")");
      setLoading(false);
    }
  }

  // ── RENDER ──────────────────────────────────────────────────────────────────
  if (loading) return (<><GlobalCSS/><Loading lang={lang} step={loadStep}/></>);
  if (plan) return (<><GlobalCSS/><Results {...{plan,lang,t,nights,origin,travelers,allPlaces,
    tab,setTab,showMap,setShowMap,activePlace,setActivePlace,
    showMarco,setShowMarco,sofia,setSofia,shareCopied,share,reset}}/></>);

  // WIZARD
  const W = {width:"100%",maxWidth:520,padding:"0 20px"};
  const INP = {background:P.card2,border:`1.5px solid ${P.border}`,borderRadius:12,
    padding:"11px 14px",fontSize:14,color:P.white,outline:"none",width:"100%",
    transition:"border-color .2s",colorScheme:"dark"};

  return (
    <><GlobalCSS/>
    <div style={{minHeight:"100vh",background:P.black,display:"flex",
      flexDirection:"column",alignItems:"center",paddingBottom:40}}>

      <div style={{...W,display:"flex",alignItems:"center",justifyContent:"space-between",paddingTop:24}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <Logo size={30}/>
          <span style={{fontSize:20,fontWeight:900,color:P.white,letterSpacing:-.5}}>trippio</span>
        </div>
        <div style={{display:"flex",background:P.card2,borderRadius:10,overflow:"hidden",border:`1px solid ${P.border}`}}>
          {Object.entries(T).map(([k,v]) => (
            <button key={k} onClick={()=>setLang(k)}
              style={{padding:"6px 12px",background:lang===k?P.gold:"transparent",
                color:lang===k?P.black:P.muted,border:"none",cursor:"pointer",fontSize:13,fontWeight:600}}>
              {v.flag} {v.name}
            </button>
          ))}
        </div>
      </div>

      {wizStep === 0 && (
        <div style={{...W,textAlign:"center",padding:"36px 20px 0"}}>
          <h1 style={{margin:0,fontSize:38,fontWeight:900,color:P.white,lineHeight:1.1}}>
            {t.h1a}<br/>
            <span style={{background:GG,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
              {t.h1b}
            </span>
          </h1>
          <p style={{margin:"12px 0 0",fontSize:15,color:P.sub}}>{t.sub}</p>
        </div>
      )}

      <div style={{display:"flex",gap:6,margin:"24px 0 4px"}}>
        {[0,1,2].map(i => (
          <div key={i} style={{width:i===wizStep?24:8,height:8,borderRadius:4,
            background:i<=wizStep?P.gold:P.border,transition:"all .3s"}}/>
        ))}
      </div>

      <div style={{...W}}>
        {/* PASO 0: TIPOS */}
        {wizStep === 0 && (
          <div className="fade">
            <div style={{fontSize:17,fontWeight:700,color:P.white,marginBottom:4}}>{t.stepType}</div>
            <div style={{fontSize:13,color:P.muted,marginBottom:16}}>{t.stepTypeSub}</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
              {Object.entries(TRIP_TYPES).map(([k,v]) => {
                const sel = tripTypes.includes(k);
                return (
                  <button key={k} onClick={()=>toggleType(k)}
                    style={{padding:"14px 8px",background:sel?P.goldDim:P.card2,
                      border:`1.5px solid ${sel?P.gold:P.border}`,borderRadius:14,
                      cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
                    <span style={{fontSize:24}}>{v.icon}</span>
                    <span style={{fontSize:12,fontWeight:600,color:sel?P.gold:P.sub}}>{t.tripNames[k]}</span>
                  </button>
                );
              })}
            </div>
            <button onClick={()=>setWizStep(1)} disabled={!tripTypes.length}
              style={{width:"100%",marginTop:20,padding:15,background:tripTypes.length?GG:P.card3,
                color:tripTypes.length?P.black:P.muted,border:"none",borderRadius:14,
                fontSize:16,fontWeight:700,cursor:tripTypes.length?"pointer":"not-allowed"}}>
              {t.nextBtn}
            </button>
          </div>
        )}

        {/* PASO 1: ESTILO */}
        {wizStep === 1 && (
          <div className="fade">
            <div style={{fontSize:17,fontWeight:700,color:P.white,marginBottom:16}}>{t.stepStyle}</div>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {Object.entries(TRAVELER_STYLES).map(([k,v]) => {
                const sel = travelStyle===k;
                return (
                  <button key={k} onClick={()=>setTravelStyle(k)}
                    style={{padding:"16px 18px",background:sel?P.goldDim:P.card2,
                      border:`1.5px solid ${sel?P.gold:P.border}`,borderRadius:14,
                      cursor:"pointer",display:"flex",alignItems:"center",gap:14}}>
                    <span style={{fontSize:28}}>{v.icon}</span>
                    <div style={{textAlign:"left",flex:1}}>
                      <div style={{fontSize:15,fontWeight:700,color:sel?P.gold:P.white}}>{t.styleNames[k]}</div>
                      <div style={{fontSize:12,color:P.muted,marginTop:2}}>{t.styleDesc[k]}</div>
                    </div>
                    {sel && <span style={{color:P.gold,fontSize:18}}>✓</span>}
                  </button>
                );
              })}
            </div>
            <div style={{display:"flex",gap:10,marginTop:20}}>
              <button onClick={()=>setWizStep(0)}
                style={{flex:1,padding:15,background:P.card2,color:P.sub,
                  border:`1px solid ${P.border}`,borderRadius:14,fontSize:15,fontWeight:600,cursor:"pointer"}}>
                {t.backBtn}
              </button>
              <button onClick={()=>setWizStep(2)} disabled={!travelStyle}
                style={{flex:2,padding:15,background:travelStyle?GG:P.card3,
                  color:travelStyle?P.black:P.muted,border:"none",borderRadius:14,
                  fontSize:16,fontWeight:700,cursor:travelStyle?"pointer":"not-allowed"}}>
                {t.nextBtn}
              </button>
            </div>
          </div>
        )}

        {/* PASO 2: DETALLES */}
        {wizStep === 2 && (
          <div className="fade">
            <div style={{fontSize:17,fontWeight:700,color:P.white,marginBottom:16}}>{t.stepDetails}</div>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                <label style={{display:"flex",flexDirection:"column",gap:6}}>
                  <span style={{fontSize:12,color:P.muted,fontWeight:600}}>{t.originL}</span>
                  <input value={origin} onChange={e=>setOrigin(e.target.value)}
                    placeholder={t.originPh} style={INP}
                    onFocus={e=>e.target.style.borderColor=P.gold}
                    onBlur={e=>e.target.style.borderColor=P.border}/>
                </label>
                <label style={{display:"flex",flexDirection:"column",gap:6}}>
                  <span style={{fontSize:12,color:P.muted,fontWeight:600}}>{t.destL}</span>
                  <input value={dest} onChange={e=>setDest(e.target.value)}
                    placeholder={t.destPh} style={{...INP,borderColor:dest?P.gold:P.border}}
                    onFocus={e=>e.target.style.borderColor=P.gold}
                    onBlur={e=>e.target.style.borderColor=dest?P.gold:P.border}/>
                </label>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                <label style={{display:"flex",flexDirection:"column",gap:6}}>
                  <span style={{fontSize:12,color:P.muted,fontWeight:600}}>{t.arrivalL}</span>
                  <input type="date" value={arrival} onChange={e=>setArrival(e.target.value)}
                    style={INP} onFocus={e=>e.target.style.borderColor=P.gold}
                    onBlur={e=>e.target.style.borderColor=P.border}/>
                </label>
                <label style={{display:"flex",flexDirection:"column",gap:6}}>
                  <span style={{fontSize:12,color:P.muted,fontWeight:600}}>{t.departureL}</span>
                  <input type="date" value={departure} onChange={e=>setDeparture(e.target.value)}
                    style={INP} onFocus={e=>e.target.style.borderColor=P.gold}
                    onBlur={e=>e.target.style.borderColor=P.border}/>
                </label>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                <label style={{display:"flex",flexDirection:"column",gap:6}}>
                  <span style={{fontSize:12,color:P.muted,fontWeight:600}}>{t.budgetL}</span>
                  <input type="number" value={budget} onChange={e=>setBudget(e.target.value)}
                    placeholder={t.budgetPh} min="200" step="100" style={INP}
                    onFocus={e=>e.target.style.borderColor=P.gold}
                    onBlur={e=>e.target.style.borderColor=P.border}/>
                </label>
                <label style={{display:"flex",flexDirection:"column",gap:6}}>
                  <span style={{fontSize:12,color:P.muted,fontWeight:600}}>{t.travelersL}</span>
                  <div style={{...INP,display:"flex",alignItems:"center",gap:8,padding:"8px 14px"}}>
                    <button onClick={()=>setTravelers(v=>Math.max(1,v-1))}
                      style={{width:28,height:28,background:P.card3,border:`1px solid ${P.border}`,
                        borderRadius:"50%",color:P.white,cursor:"pointer",fontSize:16}}>−</button>
                    <span style={{flex:1,textAlign:"center",fontSize:13,color:P.white,fontWeight:600}}>
                      {travelers===1?t.t1:t.tN(travelers)}
                    </span>
                    <button onClick={()=>setTravelers(v=>Math.min(10,v+1))}
                      style={{width:28,height:28,background:P.card3,border:`1px solid ${P.border}`,
                        borderRadius:"50%",color:P.white,cursor:"pointer",fontSize:16}}>+</button>
                  </div>
                </label>
              </div>
              {error && (
                <div style={{padding:"12px 14px",background:"rgba(239,68,68,.1)",
                  border:"1px solid rgba(239,68,68,.3)",borderRadius:10,fontSize:13,color:"#ef4444"}}>
                  {error}
                </div>
              )}
            </div>
            <div style={{display:"flex",gap:10,marginTop:20}}>
              <button onClick={()=>setWizStep(1)}
                style={{flex:1,padding:15,background:P.card2,color:P.sub,
                  border:`1px solid ${P.border}`,borderRadius:14,fontSize:15,fontWeight:600,cursor:"pointer"}}>
                {t.backBtn}
              </button>
              <button onClick={search} disabled={!dest.trim()}
                style={{flex:2,padding:15,background:dest.trim()?GG:P.card3,
                  color:dest.trim()?P.black:P.muted,border:"none",borderRadius:14,
                  fontSize:16,fontWeight:700,cursor:dest.trim()?"pointer":"not-allowed"}}>
                {t.searchBtn}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}

// ─── RESULTADOS ───────────────────────────────────────────────────────────────
function Results({plan,lang,t,nights,origin,travelers,allPlaces,
  tab,setTab,showMap,setShowMap,activePlace,setActivePlace,
  showMarco,setShowMarco,sofia,setSofia,shareCopied,share,reset}) {

  const heroImg = getImg(plan.destination||"");
  const tabs = [
    {k:"flights",   l:"✈️ "+t.flightsT},
    {k:"hotels",    l:"🏨 "+t.hotelsT},
    {k:"food",      l:"🍽 "+t.restsT},
    {k:"itinerary", l:"📅 "+t.itinT},
    {k:"tips",      l:"💡 "+t.tipsT},
  ];

  return (
    <div style={{background:P.black,minHeight:"100vh",paddingBottom:100}}>

      {/* Hero */}
      <div style={{position:"relative",height:250,overflow:"hidden"}}>
        <img src={heroImg} alt={plan.destination}
          style={{width:"100%",height:"100%",objectFit:"cover"}}/>
        <div style={{position:"absolute",inset:0,
          background:"linear-gradient(to bottom,rgba(0,0,0,.3) 0%,rgba(13,13,13,1) 100%)"}}/>
        <div style={{position:"absolute",top:16,left:16,right:16,
          display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <button onClick={reset}
            style={{background:"rgba(0,0,0,.5)",border:"1px solid rgba(255,255,255,.2)",
              color:P.white,borderRadius:10,padding:"8px 14px",fontSize:13,
              fontWeight:600,cursor:"pointer",backdropFilter:"blur(8px)"}}>
            ← {t.newSearch}
          </button>
          <button onClick={share}
            style={{background:"rgba(0,0,0,.5)",border:"1px solid rgba(255,255,255,.2)",
              color:shareCopied?P.gold:P.white,borderRadius:10,padding:"8px 14px",
              fontSize:13,fontWeight:600,cursor:"pointer",backdropFilter:"blur(8px)"}}>
            {shareCopied ? t.shareCopied : "🔗 "+t.shareBtn}
          </button>
        </div>
        <div style={{position:"absolute",bottom:18,left:20}}>
          <h2 style={{margin:0,fontSize:28,fontWeight:900,color:P.white,
            textShadow:"0 2px 12px rgba(0,0,0,.6)"}}>{plan.destination}</h2>
          <div style={{fontSize:13,color:"rgba(255,255,255,.7)",marginTop:4}}>
            {t.days(plan.days)} · {travelers===1?t.t1:t.tN(travelers)}
            {plan.weather && ` · ${plan.weather.temp}`}
          </div>
        </div>
      </div>

      {/* Mapa toggle */}
      <div style={{padding:"10px 14px"}}>
        <button onClick={()=>setShowMap(v=>!v)}
          style={{width:"100%",padding:11,background:showMap?P.goldDim:P.card2,
            border:`1.5px solid ${showMap?P.gold:P.border}`,borderRadius:12,
            color:showMap?P.gold:P.sub,fontSize:14,fontWeight:600,cursor:"pointer"}}>
          {t.mapBtn} {showMap?"▲":"▼"}
        </button>
        {showMap && allPlaces.length > 0 && (
          <div style={{marginTop:10}}>
            <TravelMap places={allPlaces} active={activePlace} onSelect={setActivePlace}/>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div style={{padding:"0 14px",overflowX:"auto",display:"flex",gap:8,
        scrollbarWidth:"none",WebkitOverflowScrolling:"touch"}}>
        {tabs.map(tb => (
          <button key={tb.k} onClick={()=>setTab(tb.k)}
            style={{flexShrink:0,padding:"9px 14px",
              background:tab===tb.k?P.goldDim:P.card2,
              border:`1.5px solid ${tab===tb.k?P.gold:P.border}`,
              borderRadius:20,color:tab===tb.k?P.gold:P.sub,
              fontSize:13,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap"}}>
            {tb.l}
          </button>
        ))}
      </div>

      <div style={{padding:"14px 14px 0"}}>

        {/* VUELOS */}
        {tab==="flights" && (
          <div className="fade">
            <Hdr title={t.flightsT} sub={t.flightsSub(plan.destination,travelers,origin)}/>
            {!(plan.flights?.length) ? <Empty/> : plan.flights.map((f,i) => (
              <div key={i} style={{background:P.card2,border:`1px solid ${P.border}`,
                borderRadius:14,padding:16,marginBottom:10}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div>
                    <div style={{fontSize:15,fontWeight:700,color:P.white}}>
                      {f.airline}
                      <span style={{fontSize:11,color:P.muted,marginLeft:8,
                        background:P.card3,padding:"2px 6px",borderRadius:6}}>{f.code}</span>
                    </div>
                    <div style={{fontSize:13,color:P.muted,marginTop:4}}>
                      {f.dep} → {f.arr} · {f.duration} ·{" "}
                      <span style={{color:f.stops===0?"#22C55E":P.gold}}>
                        {f.stops===0?t.direct:t.stops(f.stops)}
                      </span>
                    </div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:20,fontWeight:900,background:GG,
                      WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
                      {f.price}€
                    </div>
                    <div style={{fontSize:11,color:P.muted}}>{t.pp}</div>
                  </div>
                </div>
                <a href={f.bookUrl||"https://www.skyscanner.es/"} target="_blank" rel="noopener noreferrer"
                  style={{display:"block",marginTop:10,padding:10,background:GG,color:P.black,
                    borderRadius:10,fontSize:14,fontWeight:700,textAlign:"center",textDecoration:"none"}}>
                  {t.bookFlight}
                </a>
              </div>
            ))}
          </div>
        )}

        {/* HOTELES */}
        {tab==="hotels" && (
          <div className="fade">
            <Hdr title={t.hotelsT} sub={t.hotelsSub(nights)}/>
            {!(plan.hotels?.length) ? <Empty/> : plan.hotels.map((h,i) => (
              <div key={i} style={{background:P.card2,border:`1px solid ${P.border}`,
                borderRadius:14,overflow:"hidden",marginBottom:10}}>
                <img src={HOTEL_IMGS[i%HOTEL_IMGS.length]} alt={h.name}
                  style={{width:"100%",height:150,objectFit:"cover"}}/>
                <div style={{padding:"12px 14px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                    <div style={{flex:1}}>
                      <div style={{fontSize:15,fontWeight:700,color:P.white}}>{h.name}</div>
                      <div style={{fontSize:12,color:P.muted,marginTop:2}}>{h.area}</div>
                      <div style={{fontSize:13,color:P.gold,marginTop:3}}>
                        {"★".repeat(Math.min(5,h.stars||3))} · ⭐ {h.rating}
                      </div>
                    </div>
                    <div style={{textAlign:"right",marginLeft:12}}>
                      <div style={{fontSize:20,fontWeight:900,background:GG,
                        WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
                        {h.price}€
                      </div>
                      <div style={{fontSize:11,color:P.muted}}>{t.pn}</div>
                    </div>
                  </div>
                  {h.desc && <p style={{margin:"8px 0 0",fontSize:13,color:P.sub,lineHeight:1.5}}>{h.desc}</p>}
                  <div style={{display:"flex",gap:8,marginTop:10}}>
                    {h.lat && h.lng && (
                      <button onClick={()=>{setActivePlace(allPlaces.findIndex(p=>p.name===h.name));setShowMap(true);}}
                        style={{flex:1,padding:9,background:P.card3,border:`1px solid ${P.border}`,
                          borderRadius:10,color:P.sub,fontSize:13,fontWeight:600,cursor:"pointer"}}>
                        📍 Mapa
                      </button>
                    )}
                    <a href={h.bookUrl||"https://www.booking.com/"} target="_blank" rel="noopener noreferrer"
                      style={{flex:2,padding:9,background:GG,color:P.black,borderRadius:10,
                        fontSize:13,fontWeight:700,textAlign:"center",textDecoration:"none",
                        display:"flex",alignItems:"center",justifyContent:"center"}}>
                      {t.bookHotel}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* COMIDA */}
        {tab==="food" && (
          <div className="fade">
            <Hdr title={t.restsT} sub={t.restsSub}/>
            {(plan.restaurants||[]).filter(r=>!r.vegetarian).map((r,i) => (
              <RestCard key={i} r={r} i={i} t={t} setSofia={setSofia}/>
            ))}
            {(plan.restaurants||[]).some(r=>r.vegetarian) && (
              <>
                <Hdr title={t.vegT} sub="" style={{marginTop:20}}/>
                {(plan.restaurants||[]).filter(r=>r.vegetarian).map((r,i) => (
                  <RestCard key={"v"+i} r={r} i={i} t={t} setSofia={setSofia}/>
                ))}
              </>
            )}
          </div>
        )}

        {/* ITINERARIO */}
        {tab==="itinerary" && (
          <div className="fade">
            <Hdr title={t.itinT} sub={t.itinSub}/>
            {!(plan.itinerary?.length) ? <Empty/> : plan.itinerary.map((day,i) => (
              <div key={i} style={{background:P.card2,border:`1px solid ${P.border}`,
                borderRadius:14,padding:16,marginBottom:10}}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
                  <div style={{width:34,height:34,borderRadius:"50%",background:GG,
                    display:"flex",alignItems:"center",justifyContent:"center",
                    fontSize:14,fontWeight:900,color:P.black,flexShrink:0}}>{day.day}</div>
                  <div style={{fontSize:15,fontWeight:700,color:P.white}}>{day.title}</div>
                </div>
                {[[t.morning,day.morning],[t.afternoon,day.afternoon],
                  [t.evening,day.evening],[t.transport,day.transport]].map(([label,val]) => val && (
                  <div key={label} style={{display:"flex",gap:10,marginBottom:7}}>
                    <div style={{fontSize:12,color:P.muted,minWidth:68}}>{label}</div>
                    <div style={{fontSize:13,color:P.white,flex:1}}>{val}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* TIPS */}
        {tab==="tips" && (
          <div className="fade">
            <Hdr title={t.tipsT} sub=""/>
            {(plan.tips||[]).map((tip,i) => (
              <div key={i} style={{background:P.card2,border:`1px solid ${P.border}`,
                borderRadius:12,padding:"12px 14px",marginBottom:8,
                display:"flex",gap:10,alignItems:"flex-start"}}>
                <div style={{width:26,height:26,borderRadius:"50%",background:P.goldDim,
                  border:`1px solid ${P.goldBorder}`,flexShrink:0,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:12,color:P.gold,fontWeight:900}}>{i+1}</div>
                <div style={{fontSize:13,color:P.white,lineHeight:1.5}}>{tip}</div>
              </div>
            ))}
            {plan.transport && (
              <>
                <Hdr title={t.transportT} sub="" style={{marginTop:20}}/>
                <div style={{background:P.card2,border:`1px solid ${P.border}`,borderRadius:12,padding:14}}>
                  {[["Principal",plan.transport.main],["App",plan.transport.app],
                    ["Bono",plan.transport.pass],["Precio",plan.transport.price]].map(([l,v]) => v && (
                    <div key={l} style={{display:"flex",justifyContent:"space-between",
                      padding:"7px 0",borderBottom:`1px solid ${P.border}`}}>
                      <span style={{fontSize:13,color:P.muted}}>{l}</span>
                      <span style={{fontSize:13,color:P.white,fontWeight:600}}>{v}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
            <Hdr title={t.pkgT} sub="" style={{marginTop:20}}/>
            <div style={{background:P.card2,border:`1px solid ${P.border}`,borderRadius:12,padding:14}}>
              {plan.hotels?.[0]?.price && (
                <div style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid ${P.border}`}}>
                  <span style={{fontSize:13,color:P.muted}}>{t.hotelsT}</span>
                  <span style={{fontSize:13,color:P.white}}>{plan.hotels[0].price * nights}€</span>
                </div>
              )}
              {plan.flights?.[0]?.price && (
                <div style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid ${P.border}`}}>
                  <span style={{fontSize:13,color:P.muted}}>{t.flightsT}</span>
                  <span style={{fontSize:13,color:P.white}}>{plan.flights[0].price}€</span>
                </div>
              )}
              <div style={{display:"flex",justifyContent:"space-between",padding:"10px 0 4px"}}>
                <span style={{fontSize:15,fontWeight:800,color:P.white}}>{t.totalL}</span>
                <span style={{fontSize:18,fontWeight:900,background:GG,
                  WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
                  ~{plan.totalEstimate||plan.budget}€
                </span>
              </div>
              <div style={{fontSize:11,color:P.muted,textAlign:"right"}}>{t.demoSmall}</div>
            </div>
          </div>
        )}
      </div>

      {/* Marco flotante */}
      <div style={{position:"fixed",bottom:20,right:16,zIndex:400}}>
        <button onClick={()=>setShowMarco(v=>!v)}
          style={{width:56,height:56,borderRadius:"50%",background:GG,border:"none",
            cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",
            fontSize:24,boxShadow:"0 4px 20px rgba(201,169,110,.5)"}}>
          🧭
        </button>
      </div>

      {showMarco && <Marco plan={plan} places={allPlaces} lang={lang} onClose={()=>setShowMarco(false)}/>}
      {sofia && <Sofia place={sofia} plan={plan} lang={lang} onClose={()=>setSofia(null)}/>}
    </div>
  );
}
