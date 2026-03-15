import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "./supabase.js";

const P = {
  black:"#0D0D0D",card:"#141414",card2:"#1A1A1A",card3:"#252525",
  border:"#2A2A2A",border2:"#333333",muted:"#6B6B6B",sub:"#A0A0A0",
  white:"#FFFFFF",gold:"#C9A96E",goldDim:"rgba(201,169,110,.18)",
  goldBorder:"rgba(201,169,110,.25)",
};
const GOLD_GRAD="linear-gradient(135deg,#C9A96E,#E8C98A)";
const GOLD_GRAD2="linear-gradient(135deg,#B8935A,#C9A96E)";

function TrippioLogo({size=34}){
  return(
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{flexShrink:0,filter:`drop-shadow(0 ${size*.06}px ${size*.18}px rgba(201,169,110,0.4))`}}>
      <defs><linearGradient id="lg" x1="15%" y1="15%" x2="85%" y2="85%"><stop offset="0%" stopColor="#E8C98A"/><stop offset="100%" stopColor="#B8935A"/></linearGradient></defs>
      <circle cx="50" cy="50" r="45" stroke="url(#lg)" strokeWidth="2.5" opacity="0.6"/>
      <path d="M 24 72 L 68 20 L 76 54 Z" fill="url(#lg)" opacity="0.95"/>
      <path d="M 24 72 L 76 54 L 52 68 Z" fill="#B8935A" opacity="0.7"/>
      <line x1="24" y1="72" x2="76" y2="54" stroke="#0D0D0D" strokeWidth="1" opacity="0.3"/>
    </svg>
  );
}

const TRIP_TYPES={
  adventure:{icon:"🏔️"},culture:{icon:"🏛️"},beach:{icon:"🏖️"},
  gastro:{icon:"🍜"},nature:{icon:"🌿"},city:{icon:"🏙️"},
  wellness:{icon:"🧘"},nightlife:{icon:"🎉"},retreat:{icon:"🌀"},
};
const TRAVELER_STYLES={
  backpacker:{icon:"🎒",stars:"1",pct:0.15},
  comfort:{icon:"🛎️",stars:"2-3",pct:0.35},
  luxury:{icon:"💎",stars:"4-5",pct:0.60},
};

const T={
  es:{flag:"🇪🇸",name:"Español",locale:"es-ES",lp:"Responde en español.",
    newSearch:"Nueva búsqueda",
    h1a:"Tu próximo viaje,",h1b:"en un clic.",
    sub:"Elige tu estilo, destino y presupuesto.",
    stepTripType:"¿Qué tipo de viaje?",stepSub:"Elige uno o varios",
    stepStyle:"¿Cómo prefieres viajar?",stepDetails:"Cuéntanos más",
    tripNames:{adventure:"Aventura",culture:"Cultura",beach:"Playa",gastro:"Gastronomía",nature:"Naturaleza",city:"Ciudad",wellness:"Bienestar",nightlife:"Vida Nocturna",retreat:"Retiro"},
    styleNames:{backpacker:"Mochilero",comfort:"Confort",luxury:"Lujo"},
    styleDesc:{backpacker:"Hostels 1★, auténtico",comfort:"Hoteles 2-3★, equilibrio",luxury:"Hoteles 4-5★, VIP"},
    originL:"Origen",destL:"Destino",budgetL:"Presupuesto (€)",
    originPh:"Madrid, España",destPh:"Tokio, París, Bangkok...",budgetPh:"1000",
    arrival:"Llegada",departure:"Salida",
    travelersL:"Viajeros",t1:"1 viajero",tN:n=>`${n} viajeros`,
    searchBtn:"Buscar mi viaje ✦",nextBtn:"Siguiente →",backBtn:"← Atrás",
    loadTitle:"Preparando tu aventura…",loadSub:"Buscando las mejores opciones",
    steps:["Creando itinerario","Vuelos","Hoteles","Restaurantes","Clima","¡Listo!"],
    flightsT:"Vuelos disponibles",flightsSub:(d,n,o)=>`${o||"Madrid"} → ${d} · ${n} viajero${n>1?"s":""}`,
    direct:"✈ Directo",stops:n=>`${n} escala${n>1?"s":""}`,pp:"por persona",
    hotelsT:"Hoteles",hotelsSub:n=>`${n} noches`,pn:"/ noche",mapBtn:"🗺 Mapa",
    mapT:"Mapa del viaje",mapSub:"Hoteles · Restaurantes · Lugares",
    restsT:"Dónde comer",restsSub:"Mejores restaurantes",
    vegT:"Opciones vegetarianas",vegSub:"Restaurantes plant-based",
    itinT:"Itinerario día a día",itinSub:"Tu plan personalizado",
    morning:"☀️ Mañana",afternoon:"🌤 Tarde",evening:"🌙 Noche",transport:"🚇 Transporte",
    tipsT:"Tips del viaje",transportT:"Transporte",transportSub:"Movilidad local",
    weatherT:"Previsión del tiempo",weatherSub:"Durante tu viaje",
    promoT:"Promociones",promoSub:"Ofertas activas",promoCode:"Código",
    pkgT:"Resumen",taxes:"Tasas",totalL:"Total estimado",
    bookBtn:"🔒 Reservar paquete",bookFlight:"✈️ Reservar vuelo",bookHotel:"🏨 Reservar hotel",bookRest:"🍽️ Reservar mesa",bookTour:"🎟️ Ver tours",
    demoNote:"Demo · Sin cargos reales",demoSmall:"Precios orientativos",
    affiliateT:"Reserva con socios",affiliateSub:"Comisión incluida",
    shareBtn:"Compartir",shareCopied:"Enlace copiado",
    errorTitle:"Algo salió mal",errorMsg:"Error al generar. Inténtalo de nuevo.",
    loginBtn:"Entrar",logoutBtn:"Salir",
    days:n=>`${n} días`,
    guideName:"Marco",guideHi:"¡Hola! Soy Marco, tu guía personal. ¿En qué te ayudo?",
    guideNear:"Estás cerca de",guidePh:"Pregúntame sobre este destino...",
  },
  en:{flag:"🇬🇧",name:"English",locale:"en-GB",lp:"Respond in English.",
    newSearch:"New search",
    h1a:"Your next trip,",h1b:"in one click.",
    sub:"Choose your style, destination and budget.",
    stepTripType:"What kind of trip?",stepSub:"Choose one or more",
    stepStyle:"How do you travel?",stepDetails:"Tell us more",
    tripNames:{adventure:"Adventure",culture:"Culture",beach:"Beach",gastro:"Gastronomy",nature:"Nature",city:"City Break",wellness:"Wellness",nightlife:"Nightlife",retreat:"Retreat"},
    styleNames:{backpacker:"Backpacker",comfort:"Comfort",luxury:"Luxury"},
    styleDesc:{backpacker:"Hostels 1★, authentic",comfort:"2-3★ hotels, value",luxury:"4-5★ hotels, VIP"},
    originL:"Origin",destL:"Destination",budgetL:"Budget (€)",
    originPh:"London, UK",destPh:"Tokyo, Paris, Bangkok...",budgetPh:"1000",
    arrival:"Check-in",departure:"Check-out",
    travelersL:"Travelers",t1:"1 traveler",tN:n=>`${n} travelers`,
    searchBtn:"Find my trip ✦",nextBtn:"Next →",backBtn:"← Back",
    loadTitle:"Preparing your adventure…",loadSub:"Searching best options",
    steps:["Creating itinerary","Flights","Hotels","Restaurants","Weather","All ready!"],
    flightsT:"Available flights",flightsSub:(d,n,o)=>`${o||"Madrid"} → ${d} · ${n} traveler${n>1?"s":""}`,
    direct:"✈ Direct",stops:n=>`${n} stop${n>1?"s":""}`,pp:"per person",
    hotelsT:"Hotels",hotelsSub:n=>`${n} nights`,pn:"/ night",mapBtn:"🗺 Map",
    mapT:"Trip map",mapSub:"Hotels · Restaurants · Places",
    restsT:"Where to eat",restsSub:"Best restaurants",
    vegT:"Vegetarian options",vegSub:"Plant-based restaurants",
    itinT:"Day by day itinerary",itinSub:"Your personalized plan",
    morning:"☀️ Morning",afternoon:"🌤 Afternoon",evening:"🌙 Evening",transport:"🚇 Transport",
    tipsT:"Travel tips",transportT:"Transport",transportSub:"Local mobility",
    weatherT:"Weather forecast",weatherSub:"During your trip",
    promoT:"Promotions",promoSub:"Active deals",promoCode:"Code",
    pkgT:"Summary",taxes:"Taxes",totalL:"Estimated total",
    bookBtn:"🔒 Book package",bookFlight:"✈️ Book flight",bookHotel:"🏨 Book hotel",bookRest:"🍽️ Book table",bookTour:"🎟️ View tours",
    demoNote:"Demo · No real charges",demoSmall:"Estimated prices",
    affiliateT:"Book with partners",affiliateSub:"Commission included",
    shareBtn:"Share",shareCopied:"Link copied",
    errorTitle:"Something went wrong",errorMsg:"Error generating. Please try again.",
    loginBtn:"Sign in",logoutBtn:"Sign out",
    days:n=>`${n} days`,
    guideName:"Marco",guideHi:"Hi! I'm Marco, your personal guide. How can I help?",
    guideNear:"You are near",guidePh:"Ask me about this destination...",
  },
};

const DEST_IMGS={
  default:"https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=900&q=85",
  tokio:"https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=900&q=85",
  tokyo:"https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=900&q=85",
  roma:"https://images.unsplash.com/photo-1529260830199-42c24126f198?w=900&q=85",
  rome:"https://images.unsplash.com/photo-1529260830199-42c24126f198?w=900&q=85",
  paris:"https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=900&q=85",
  bangkok:"https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=900&q=85",
  bali:"https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&q=85",
  nueva:"https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=900&q=85",
  new:"https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=900&q=85",
  lisboa:"https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=900&q=85",
  berlin:"https://images.unsplash.com/photo-1560969184-10fe8719e047?w=900&q=85",
  dubai:"https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&q=85",
};
const HOTEL_IMGS=["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=75","https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&q=75","https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=75","https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&q=75","https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&q=75","https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&q=75"];
const REST_IMGS=["https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=75","https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=75","https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&q=75","https://images.unsplash.com/photo-1544148103-0773bf10d330?w=400&q=75","https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=75","https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=400&q=75"];

function getImg(dest=""){const d=dest.toLowerCase();for(const[k,v]of Object.entries(DEST_IMGS))if(d.includes(k))return v;return DEST_IMGS.default;}
const diffDays=(a,b)=>(!a||!b)?null:Math.round((new Date(b+"T12:00:00")-new Date(a+"T12:00:00"))/86400000)+1;
const fmtDate=(s,o,loc)=>!s?"":new Date(s+"T12:00:00").toLocaleDateString(loc||"es-ES",o||{day:"numeric",month:"short"});
const haversine=(a,b,c,d)=>{const R=6371e3,p=Math.PI/180,x=Math.sin((c-a)*p/2)**2+Math.cos(a*p)*Math.cos(c*p)*Math.sin((d-b)*p/2)**2;return R*2*Math.atan2(Math.sqrt(x),Math.sqrt(1-x));};

async function fetchWeather(lat,lon,start){
  try{const r=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weathercode&timezone=auto&start_date=${start}&forecast_days=7`);const d=await r.json();return d.daily;}catch{return null;}
}
const WX={0:"☀️",1:"🌤",2:"⛅",3:"☁️",45:"🌫",51:"🌦",61:"🌧",71:"❄️",80:"🌦",95:"⛈️"};
const wxI=c=>WX[c]||"🌡";

function useLeaflet(){
  const[r,setR]=useState(!!window.L);
  useEffect(()=>{
    if(window.L){setR(true);return;}
    const css=document.createElement("link");css.rel="stylesheet";css.href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";document.head.appendChild(css);
    const js=document.createElement("script");js.src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";js.onload=()=>setR(true);document.head.appendChild(js);
  },[]);return r;
}

function TravelMap({places,active,onSelect,userPos}){
  const nRef=useRef(null),lRef=useRef(null),mRef=useRef([]),uRef=useRef(null);
  useEffect(()=>{
    if(!nRef.current||lRef.current)return;
    const L=window.L;if(!L)return;
    const map=L.map(nRef.current,{zoomControl:false,attributionControl:false});
    L.control.zoom({position:"bottomright"}).addTo(map);
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",{maxZoom:19}).addTo(map);
    lRef.current=map;return()=>{map.remove();lRef.current=null;};
  },[]);
  useEffect(()=>{
    const L=window.L,map=lRef.current;if(!L||!map||!places?.length)return;
    mRef.current.forEach(m=>m.remove());mRef.current=[];
    const bounds=[];
    places.forEach((p,i)=>{
      if(!p.lat||!p.lng)return;
      const isA=active===i,isH=p.type==="hotel";
      const em=isH?"🏨":p.type==="restaurant"?"🍽️":"◆";
      const sz=isA?44:34;
      const html=`<div style="width:${sz}px;height:${sz}px;background:${isA?P.gold:"#2C2C2E"};border:2.5px solid ${P.gold};border-radius:${isH?"12px":"50%"};display:flex;align-items:center;justify-content:center;font-size:${isA?18:13}px;cursor:pointer">${isA?em:i+1}</div>`;
      const icon=L.divIcon({className:"",html,iconSize:[sz,sz],iconAnchor:[sz/2,sz/2]});
      const mk=L.marker([p.lat,p.lng],{icon}).addTo(map).bindPopup(`<b>${em} ${p.name}</b>${p.desc?`<p style="font-size:11px;color:#555;margin:4px 0 0">${p.desc}</p>`:""}`).on("click",()=>onSelect(i));
      mRef.current.push(mk);bounds.push([p.lat,p.lng]);
    });
    if(bounds.length)map.fitBounds(bounds,{padding:[44,44],maxZoom:14,animate:true});
  },[places]);
  useEffect(()=>{
    const map=lRef.current;if(!map||active==null||!places?.[active])return;
    const p=places[active];if(p.lat&&p.lng){map.flyTo([p.lat,p.lng],15,{animate:true,duration:1});mRef.current[active]?.openPopup();}
  },[active]);
  useEffect(()=>{
    const L=window.L,map=lRef.current;if(!L||!map||!userPos)return;
    if(uRef.current)uRef.current.remove();
    const html=`<div style="width:18px;height:18px;background:#3B82F6;border:3px solid #fff;border-radius:50%;box-shadow:0 0 0 6px rgba(59,130,246,.3)"></div>`;
    const icon=L.divIcon({className:"",html,iconSize:[18,18],iconAnchor:[9,9]});
    uRef.current=L.marker([userPos.lat,userPos.lng],{icon}).addTo(map).bindPopup("Tu posición");
  },[userPos]);
  return(
    <div style={{borderRadius:20,overflow:"hidden",boxShadow:"0 8px 32px rgba(0,0,0,.4)"}}>
      <div ref={nRef} style={{height:340}}/>
    </div>
  );
}

function GuideChar({mood,speaking,size}){
  mood=mood||"happy";size=size||60;
  const[blink,setBlink]=useState(false);
  useEffect(()=>{const i=setInterval(()=>{setBlink(true);setTimeout(()=>setBlink(false),150);},3500);return()=>clearInterval(i);},[]);
  const c={happy:{b:"#F4A261",f:"#E76F51"},thinking:{b:"#7ECBA1",f:"#52B788"},excited:{b:"#C9A96E",f:"#B8935A"},nearby:{b:"#8B7CF8",f:"#7C3AED"}}[mood]||{b:"#F4A261",f:"#E76F51"};
  return(
    <div style={{width:size,height:size,flexShrink:0,animation:speaking?"wiggle .3s ease infinite":"float 3s ease-in-out infinite"}}>
      <svg width={size} height={size} viewBox="0 0 80 80">
        <circle cx="40" cy="50" r="22" fill={c.b} opacity="0.9"/>
        <circle cx="40" cy="28" r="18" fill={c.f}/>
        <ellipse cx="34" cy="26" rx="3" ry={blink?.5:3} fill="#fff"/>
        <ellipse cx="46" cy="26" rx="3" ry={blink?.5:3} fill="#fff"/>
        <circle cx="34" cy="27" r="1.5" fill="#1a1a1a"/>
        <circle cx="46" cy="27" r="1.5" fill="#1a1a1a"/>
        {mood==="happy"||mood==="excited"?<path d="M34 33Q40 38 46 33" stroke="#1a1a1a" strokeWidth="2" fill="none" strokeLinecap="round"/>:<path d="M34 35Q40 32 46 35" stroke="#1a1a1a" strokeWidth="2" fill="none" strokeLinecap="round"/>}
        <rect x="24" y="12" width="32" height="4" rx="2" fill="#0D0D0D" opacity="0.7"/>
        <rect x="29" y="6" width="22" height="8" rx="3" fill="#0D0D0D" opacity="0.7"/>
        <rect x="24" y="12" width="32" height="2" rx="1" fill="#C9A96E" opacity="0.8"/>
        <line x1="18" y1="48" x2="26" y2="55" stroke={c.b} strokeWidth="5" strokeLinecap="round"/>
        <line x1="62" y1="48" x2="54" y2="55" stroke={c.b} strokeWidth="5" strokeLinecap="round"/>
        <line x1="34" y1="70" x2="32" y2="78" stroke={c.b} strokeWidth="5" strokeLinecap="round"/>
        <line x1="46" y1="70" x2="48" y2="78" stroke={c.b} strokeWidth="5" strokeLinecap="round"/>
        {speaking&&<><circle cx="58" cy="14" r="4" fill="#C9A96E" opacity=".9"/><circle cx="65" cy="10" r="3" fill="#C9A96E" opacity=".7"/><circle cx="70" cy="7" r="2" fill="#C9A96E" opacity=".5"/></>}
      </svg>
    </div>
  );
}

function VirtualGuide({plan,places,userPos,lang,onClose}){
  const t=T[lang||"es"];
  const[msgs,setMsgs]=useState([{r:"a",txt:t.guideHi,mood:"happy"}]);
  const[inp,setInp]=useState("");
  const[load,setLoad]=useState(false);
  const[mood,setMood]=useState("happy");
  const[speak,setSpeak]=useState(false);
  const[near,setNear]=useState(null);
  const endRef=useRef(null);
  useEffect(()=>{endRef.current?.scrollIntoView({behavior:"smooth"});},[msgs]);
  useEffect(()=>{
    if(!userPos||!places?.length)return;
    const n=places.find(p=>p.lat&&p.lng&&haversine(userPos.lat,userPos.lng,p.lat,p.lng)<200);
    if(n&&n.name!==near?.name){setNear(n);setMood("nearby");setSpeak(true);setTimeout(()=>setSpeak(false),2000);setMsgs(prev=>[...prev,{r:"a",txt:t.guideNear+" "+n.name+"! "+(n.desc||""),mood:"nearby"}]);}
  },[userPos,places]);
  async function send(){
    if(!inp.trim()||load)return;
    const q=inp.trim();setInp("");setMsgs(prev=>[...prev,{r:"u",txt:q}]);setLoad(true);setMood("thinking");
    const ctx=plan?`Destino: ${plan.destination}. Dias: ${plan.days}. Lugares: ${places?.slice(0,5).map(p=>p.name).join(",")||""}.`:"";
    try{
      const r=await fetch("/api/anthropic",{method:"POST",headers:{"Content-Type":"application/json","anthropic-version":"2023-06-01"},body:JSON.stringify({model:"claude-haiku-4-5-20251001",max_tokens:300,system:`Eres Marco, guia turistico virtual amigable y experto. ${t.lp} ${ctx} Responde conciso. Max 3 frases.`,messages:[...msgs.slice(-6).map(m=>({role:m.r==="a"?"assistant":"user",content:m.txt})),{role:"user",content:q}]})});
      const d=await r.json();
      const txt=(d.content||[]).map(b=>b.text||"").join("")||"Error. Intenta de nuevo.";
      setMsgs(prev=>[...prev,{r:"a",txt,mood:"happy"}]);setMood("happy");setSpeak(true);setTimeout(()=>setSpeak(false),2000);
    }catch{setMsgs(prev=>[...prev,{r:"a",txt:"Error de conexion.",mood:"happy"}]);}
    setLoad(false);
  }
  return(
    <div style={{position:"fixed",bottom:90,right:20,width:310,background:"#1C1C1E",border:`1px solid ${P.border}`,borderRadius:22,boxShadow:"0 20px 60px rgba(0,0,0,.7)",zIndex:500,display:"flex",flexDirection:"column",maxHeight:"60vh",overflow:"hidden"}}>
      <div style={{background:"#1E1E20",padding:"13px 15px",borderRadius:"22px 22px 0 0",display:"flex",alignItems:"center",gap:9,borderBottom:`1px solid ${P.border}`}}>
        <div style={{position:"relative"}}><GuideChar mood={mood} speaking={speak} size={48}/><div style={{position:"absolute",bottom:2,right:2,width:10,height:10,background:"#22C55E",borderRadius:"50%",border:"2px solid #1C1C1E"}}/></div>
        <div style={{flex:1}}><div style={{fontSize:14,fontWeight:700,color:"#fff"}}>{t.guideName}</div><div style={{fontSize:11,color:P.gold}}>AI Guide · {plan?.destination||"..."}</div></div>
        <button onClick={onClose} style={{background:"#2C2C2E",border:"none",color:P.muted,borderRadius:8,width:26,height:26,cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
      </div>
      {near&&<div style={{background:"rgba(139,124,248,.15)",border:"1px solid rgba(139,124,248,.3)",margin:"8px 8px 0",borderRadius:10,padding:"7px 11px",display:"flex",gap:7,alignItems:"center"}}><span>📍</span><div><div style={{fontSize:10,fontWeight:700,color:"#8B7CF8"}}>{t.guideNear}</div><div style={{fontSize:12,color:"#fff",fontWeight:600}}>{near.name}</div></div></div>}
      <div style={{flex:1,overflowY:"auto",padding:"10px",display:"flex",flexDirection:"column",gap:7}}>
        {msgs.map((m,i)=>(
          <div key={i} style={{display:"flex",gap:6,alignItems:"flex-end",flexDirection:m.r==="u"?"row-reverse":"row"}}>
            {m.r==="a"&&<GuideChar mood={m.mood||"happy"} size={26}/>}
            <div style={{background:m.r==="u"?GOLD_GRAD:"#2C2C2E",color:m.r==="u"?"#0D0D0D":"#fff",borderRadius:m.r==="u"?"14px 14px 3px 14px":"14px 14px 14px 3px",padding:"8px 12px",fontSize:12,lineHeight:1.5,maxWidth:"76%"}}>{m.txt}</div>
          </div>
        ))}
        {load&&<div style={{display:"flex",gap:6,alignItems:"flex-end"}}><GuideChar mood="thinking" size={26}/><div style={{background:"#2C2C2E",borderRadius:"14px 14px 14px 3px",padding:"10px 12px",display:"flex",gap:3}}>{[0,1,2].map(i=><div key={i} style={{width:5,height:5,background:P.gold,borderRadius:"50%",animation:`dot .8s ${i*.2}s ease-in-out infinite`}}/>)}</div></div>}
        <div ref={endRef}/>
      </div>
      <div style={{padding:"9px",borderTop:`1px solid ${P.border}`,display:"flex",gap:6}}>
        <input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder={t.guidePh} style={{flex:1,background:"#2C2C2E",border:`1px solid ${P.border}`,borderRadius:9,padding:"8px 11px",fontSize:12,color:"#fff",outline:"none",fontFamily:"-apple-system,sans-serif"}} onFocus={e=>e.target.style.borderColor=P.gold} onBlur={e=>e.target.style.borderColor=P.border}/>
        <button onClick={send} disabled={!inp.trim()||load} style={{background:GOLD_GRAD,border:"none",borderRadius:9,width:36,height:36,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,opacity:!inp.trim()||load?.5:1}}>↑</button>
      </div>
    </div>
  );
}


const VOICE_ID = "yiWEefwu5z3DQCM79clN";

async function speakText(text, lang) {
  try {
    const r = await fetch("/api/elevenlabs", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({text, voiceId: VOICE_ID})
    });
    const blob = await r.blob();
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.play();
    return audio;
  } catch { return null; }
}

function GuideModal({place,plan,lang,onClose}){
  const t=T[lang||"es"];
  const[story,setStory]=useState("");
  const[loading,setLoading]=useState(true);
  const[speaking,setSpeaking]=useState(false);
  const[audio,setAudio]=useState(null);
  const[photos,setPhotos]=useState([]);
  const[photoIdx,setPhotoIdx]=useState(0);

  useEffect(()=>{
    // Get photos from Unsplash
    const q=encodeURIComponent(place.name);
    fetch(`https://api.unsplash.com/search/photos?query=${q}&per_page=4&client_id=yDqpMxCkCWDRSRJAXRRR0pBJyLdQUXfTTMjvTdA_3Yw`)
      .then(r=>r.json())
      .then(d=>setPhotos(d.results?.map(p=>p.urls?.regular)||[]))
      .catch(()=>{});
    // Generate story with Claude
    fetch("/api/anthropic",{
      method:"POST",
      headers:{"Content-Type":"application/json","anthropic-version":"2023-06-01"},
      body:JSON.stringify({
        model:"claude-haiku-4-5-20251001",
        max_tokens:400,
        system:`Eres Sofia, una guia turistica experta, carismática y apasionada. ${t.lp} Habla en primera persona como si estuvieras ahi con el turista. Maximo 4 frases cortas y emocionantes.`,
        messages:[{role:"user",content:`Cuenta la historia y curiosidades de: ${place.name}. Contexto: estamos en ${plan?.destination||"este destino"}.`}]
      })
    })
    .then(r=>r.json())
    .then(d=>{
      const txt=(d.content||[]).map(b=>b.text||"").join("");
      setStory(txt);setLoading(false);
      // Auto speak
      setSpeaking(true);
      speakText(txt,lang).then(a=>{
        setAudio(a);
        if(a)a.onended=()=>setSpeaking(false);
      });
    })
    .catch(()=>setLoading(false));
    return()=>{if(audio){audio.pause();audio.src="";}};
  },[]);

  useEffect(()=>{
    if(!photos.length)return;
    const i=setInterval(()=>setPhotoIdx(x=>(x+1)%photos.length),3000);
    return()=>clearInterval(i);
  },[photos]);

  function replay(){
    if(audio){audio.pause();audio.src="";}
    setSpeaking(true);
    speakText(story,lang).then(a=>{
      setAudio(a);
      if(a)a.onended=()=>setSpeaking(false);
    });
  }

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.92)",zIndex:2000,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-end"}} onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      {/* Photo background */}
      {photos.length>0&&(
        <div style={{position:"absolute",inset:0,overflow:"hidden"}}>
          <img src={photos[photoIdx]} alt={place.name} style={{width:"100%",height:"100%",objectFit:"cover",opacity:.35,transition:"opacity .5s"}}/>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.95) 40%,rgba(0,0,0,.3) 100%)"}}/>
        </div>
      )}
      
      {/* Content */}
      <div style={{position:"relative",width:"100%",maxWidth:500,padding:"0 20px 48px",zIndex:1}}>
        {/* Guide avatar */}
        <div style={{display:"flex",alignItems:"flex-end",gap:16,marginBottom:20}}>
          <div style={{position:"relative",flexShrink:0}}>
            <div style={{width:72,height:72,borderRadius:"50%",overflow:"hidden",border:`3px solid ${P.gold}`,boxShadow:`0 0 20px ${P.goldGlow}`}}>
              <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&q=80" alt="Sofia" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
            </div>
            {speaking&&<div style={{position:"absolute",bottom:2,right:2,width:16,height:16,background:"#22C55E",borderRadius:"50%",border:"2px solid #0D0D0D",animation:"pulse 1s ease infinite"}}/>}
          </div>
          <div>
            <div style={{fontSize:18,fontWeight:900,color:"#fff"}}>Sofia</div>
            <div style={{fontSize:12,color:P.gold}}>Guía · {place.name}</div>
          </div>
          <button onClick={onClose} style={{marginLeft:"auto",background:"rgba(255,255,255,.1)",border:"none",color:"#fff",borderRadius:"50%",width:36,height:36,cursor:"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
        </div>

        {/* Story */}
        <div style={{background:"rgba(0,0,0,.6)",backdropFilter:"blur(20px)",borderRadius:20,padding:"20px",border:`1px solid ${P.goldBorder}`,marginBottom:16,minHeight:100}}>
          {loading?(
            <div style={{display:"flex",gap:5,justifyContent:"center",padding:"20px 0"}}>
              {[0,1,2].map(i=><div key={i} style={{width:8,height:8,background:P.gold,borderRadius:"50%",animation:`dot .8s ${i*.2}s ease-in-out infinite`}}/>)}
            </div>
          ):(
            <p style={{margin:0,fontSize:15,color:"#fff",lineHeight:1.7,fontStyle:"italic"}}>"{story}"</p>
          )}
        </div>

        {/* Controls */}
        <div style={{display:"flex",gap:10}}>
          <button onClick={replay} disabled={loading||!story} style={{flex:1,padding:"13px",background:GOLD_GRAD,color:"#0D0D0D",border:"none",borderRadius:12,fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"-apple-system,sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
            {speaking?"🔊 Hablando...":"▶️ Escuchar de nuevo"}
          </button>
          <button onClick={onClose} style={{padding:"13px 18px",background:"rgba(255,255,255,.1)",color:"#fff",border:"1px solid rgba(255,255,255,.2)",borderRadius:12,fontSize:14,cursor:"pointer"}}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}


function MyTrips({user,onClose,onLoad}){
  const[trips,setTrips]=useState([]);
  const[loading,setLoading]=useState(true);

  useEffect(()=>{
    if(!user)return;
    supabase.from('trips').select('*').eq('user_id',user.id).order('created_at',{ascending:false})
      .then(({data})=>{setTrips(data||[]);setLoading(false);});
  },[user]);

  async function deleteTrip(id){
    await supabase.from('trips').delete().eq('id',id);
    setTrips(prev=>prev.filter(t=>t.id!==id));
  }

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.85)",zIndex:1000,display:"flex",alignItems:"flex-end",justifyContent:"center",backdropFilter:"blur(12px)"}} onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div style={{background:"#1C1C1E",borderRadius:"26px 26px 0 0",width:"100%",maxWidth:600,maxHeight:"80vh",display:"flex",flexDirection:"column",boxShadow:"0 -8px 60px rgba(0,0,0,.6)"}}>
        <div style={{padding:"20px 22px",borderBottom:"1px solid #2A2A2A",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div>
            <div style={{fontSize:20,fontWeight:900,color:"#fff"}}>✈️ Mis viajes</div>
            <div style={{fontSize:12,color:"#6B6B6B",marginTop:2}}>{trips.length} viaje{trips.length!==1?"s":""} guardado{trips.length!==1?"s":""}</div>
          </div>
          <button onClick={onClose} style={{background:"#2C2C2E",border:"none",color:"#6B6B6B",borderRadius:"50%",width:32,height:32,cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"12px"}}>
          {loading&&<div style={{textAlign:"center",padding:"40px",color:"#6B6B6B"}}>Cargando...</div>}
          {!loading&&trips.length===0&&(
            <div style={{textAlign:"center",padding:"40px"}}>
              <div style={{fontSize:40,marginBottom:12}}>🗺️</div>
              <div style={{fontSize:16,fontWeight:600,color:"#fff",marginBottom:6}}>No tienes viajes guardados</div>
              <div style={{fontSize:13,color:"#6B6B6B"}}>Busca un destino y guarda tu viaje</div>
            </div>
          )}
          {trips.map(trip=>(
            <div key={trip.id} style={{background:"#252525",borderRadius:16,padding:"16px",marginBottom:10,display:"flex",gap:14,alignItems:"center"}}>
              <div style={{width:52,height:52,borderRadius:12,overflow:"hidden",flexShrink:0}}>
                <img src={`https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=200&q=60`} alt={trip.destination} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:15,fontWeight:700,color:"#fff",marginBottom:2}}>{trip.destination}</div>
                <div style={{fontSize:11,color:"#6B6B6B"}}>Desde {trip.origin||"?"} · {trip.budget||"?"}€</div>
                <div style={{fontSize:10,color:"#48484A",marginTop:2}}>{new Date(trip.created_at).toLocaleDateString()}</div>
              </div>
              <div style={{display:"flex",gap:7,flexShrink:0}}>
                <button onClick={()=>{onLoad(trip);onClose();}} style={{background:"linear-gradient(135deg,#C9A96E,#E8C98A)",color:"#0D0D0D",border:"none",borderRadius:8,padding:"7px 12px",fontSize:11,fontWeight:700,cursor:"pointer"}}>Ver</button>
                <button onClick={()=>deleteTrip(trip.id)} style={{background:"rgba(224,90,78,.15)",color:"#E05A4E",border:"1px solid rgba(224,90,78,.3)",borderRadius:8,padding:"7px 12px",fontSize:11,fontWeight:700,cursor:"pointer"}}>🗑</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


function ExploreMode({lang,onClose}){
  const t=T[lang||"es"];
  const[city,setCity]=useState("");
  const[userPos,setUserPos]=useState(null);
  const[places,setPlaces]=useState([]);
  const[loading,setLoading]=useState(false);
  const[activePlace,setActivePlace]=useState(null);
  const[gpsActive,setGpsActive]=useState(false);
  const lastNearRef=useRef(null);

  function enableGPS(){
    if(!navigator.geolocation)return;
    setGpsActive(true);
    navigator.geolocation.watchPosition(
      p=>{
        const pos={lat:p.coords.latitude,lng:p.coords.longitude};
        setUserPos(pos);
        if(places.length){
          const nearby=places.find(pl=>pl.lat&&pl.lng&&haversine(pos.lat,pos.lng,pl.lat,pl.lng)<200);
          if(nearby&&nearby.name!==lastNearRef.current){
            lastNearRef.current=nearby.name;
            setActivePlace(nearby);
          }
        }
      },
      ()=>{},{enableHighAccuracy:true,maximumAge:3000}
    );
  }

  async function explore(){
    if(!city.trim())return;
    setLoading(true);setPlaces([]);setActivePlace(null);
    try{
      const r=await fetch("/api/anthropic",{
        method:"POST",
        headers:{"Content-Type":"application/json","anthropic-version":"2023-06-01"},
        body:JSON.stringify({
          model:"claude-haiku-4-5-20251001",
          max_tokens:1500,
          system:`Expert local guide. ${t.lp} Reply ONLY raw JSON array, no backticks:
[{"name":"...","type":"monument|church|park|museum|statue|building","description":"...","lat":0.0,"lng":0.0,"curiosity":"one fascinating fact"}]
Return 10 interesting places in the city with real GPS coordinates.`,
          messages:[{role:"user",content:`Most interesting monuments, statues, churches, parks and historic buildings in ${city}`}]
        })
      });
      const d=await r.json();
      const raw=(d.content||[]).map(b=>b.text||"").join("").trim();
      const m=raw.match(/\[[\s\S]*\]/);
      if(m){const ps=JSON.parse(m[0]);setPlaces(ps);}
    }catch{}
    setLoading(false);
  }

  const typeIcon=t=>t==="church"?"⛪":t==="park"?"🌳":t==="museum"?"🏛️":t==="statue"?"🗿":t==="monument"?"🏛️":"📍";

  return(
    <div style={{position:"fixed",inset:0,background:"#0D0D0D",zIndex:1000,display:"flex",flexDirection:"column",overflow:"hidden"}}>
      {/* Header */}
      <div style={{background:"rgba(13,13,13,.96)",backdropFilter:"blur(20px)",borderBottom:"1px solid #2A2A2A",padding:"14px 18px",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={onClose} style={{background:"#2C2C2E",border:"none",color:"#fff",borderRadius:"50%",width:34,height:34,cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>←</button>
        <div>
          <div style={{fontSize:16,fontWeight:900,color:"#fff"}}>🔍 Explorar ciudad</div>
          <div style={{fontSize:11,color:"#C9A96E"}}>Sofia te guía por donde estés</div>
        </div>
        {gpsActive&&<div style={{marginLeft:"auto",background:"rgba(34,197,94,.15)",border:"1px solid rgba(34,197,94,.3)",color:"#22C55E",borderRadius:8,padding:"4px 10px",fontSize:11,fontWeight:600}}>📍 GPS activo</div>}
      </div>

      {/* Search */}
      <div style={{padding:"16px 18px",borderBottom:"1px solid #2A2A2A"}}>
        <div style={{display:"flex",gap:9}}>
          <input value={city} onChange={e=>setCity(e.target.value)} onKeyDown={e=>e.key==="Enter"&&explore()} placeholder="Barcelona, Bangkok, Roma..." style={{flex:1,background:"#2C2C2E",border:"1.5px solid #3A3A3C",borderRadius:12,color:"#fff",fontSize:14,padding:"11px 14px",outline:"none",fontFamily:"-apple-system,sans-serif"}} onFocus={e=>e.target.style.borderColor="#C9A96E"} onBlur={e=>e.target.style.borderColor="#3A3A3C"}/>
          <button onClick={explore} disabled={!city.trim()||loading} style={{background:"linear-gradient(135deg,#C9A96E,#E8C98A)",color:"#0D0D0D",border:"none",borderRadius:12,padding:"11px 18px",fontSize:14,fontWeight:700,cursor:"pointer"}}>
            {loading?"...":"Explorar"}
          </button>
        </div>
        {!gpsActive&&places.length>0&&(
          <button onClick={enableGPS} style={{width:"100%",marginTop:9,background:"rgba(59,130,246,.15)",border:"1px solid rgba(59,130,246,.3)",color:"#60A5FA",borderRadius:10,padding:"9px",fontSize:12,fontWeight:600,cursor:"pointer"}}>
            📍 Activar GPS para detección automática
          </button>
        )}
      </div>

      {/* Places list */}
      <div style={{flex:1,overflowY:"auto",padding:"12px"}}>
        {loading&&(
          <div style={{textAlign:"center",padding:"40px"}}>
            <div style={{fontSize:36,marginBottom:12,animation:"float 2s ease-in-out infinite"}}>🔍</div>
            <div style={{color:"#C9A96E",fontWeight:600}}>Buscando lugares interesantes...</div>
          </div>
        )}
        {!loading&&places.length===0&&city&&(
          <div style={{textAlign:"center",padding:"40px",color:"#6B6B6B"}}>Escribe una ciudad y pulsa Explorar</div>
        )}
        {places.map((place,i)=>(
          <div key={i} onClick={()=>setActivePlace(place)} style={{background:"#1C1C1E",border:`1px solid ${activePlace?.name===place.name?"#C9A96E":"#2A2A2A"}`,borderRadius:14,padding:"14px 16px",marginBottom:9,cursor:"pointer",transition:"all .2s"}}
            onMouseEnter={e=>e.currentTarget.style.borderColor="#C9A96E"}
            onMouseLeave={e=>{if(activePlace?.name!==place.name)e.currentTarget.style.borderColor="#2A2A2A";}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:40,height:40,background:"rgba(201,169,110,.15)",border:"1px solid rgba(201,169,110,.25)",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{typeIcon(place.type)}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:14,fontWeight:700,color:"#fff",marginBottom:2}}>{place.name}</div>
                <div style={{fontSize:11,color:"#6B6B6B",lineHeight:1.4,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{place.description}</div>
              </div>
              <div style={{fontSize:12,color:"#C9A96E",fontWeight:600,flexShrink:0}}>Sofia →</div>
            </div>
          </div>
        ))}
      </div>

      {/* Sofia appears when place selected */}
      {activePlace&&<GuideModal place={activePlace} plan={{destination:city}} lang={lang} onClose={()=>setActivePlace(null)}/>}
    </div>
  );
}

function GuideBubble({onClick,mood,speak}){
  return(
    <button onClick={onClick} style={{position:"fixed",bottom:20,right:20,width:64,height:64,background:"#1E1E20",border:`2px solid ${P.goldBorder}`,borderRadius:"50%",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 8px 32px rgba(0,0,0,.5),0 0 0 4px rgba(201,169,110,.08)",zIndex:499,padding:0}}>
      <GuideChar mood={mood||"happy"} speaking={speak} size={54}/>
    </button>
  );
}

function Spin({size=20,color}){return<div style={{width:size,height:size,border:`2.5px solid rgba(255,255,255,.1)`,borderTop:`2.5px solid ${color||P.gold}`,borderRadius:"50%",animation:"spin .7s linear infinite",flexShrink:0}}/>;}
const Stars=({n=4,sz=11})=><span>{[1,2,3,4,5].map(i=><span key={i} style={{color:i<=n?P.gold:P.border2,fontSize:sz}}>★</span>)}</span>;

function IBtn({children,onClick,disabled,color,size="md",outline,full,style:ex}){
  const[hov,setHov]=useState(false);
  const pad=size==="sm"?"7px 14px":size==="lg"?"15px 26px":"10px 20px";
  const fz=size==="sm"?12:size==="lg"?16:14;
  const bg=outline?(hov?(color||P.gold)+"18":"transparent"):GOLD_GRAD;
  const col=outline?(color||P.gold):"#0D0D0D";
  const border=outline?`1.5px solid ${color||P.gold}`:"none";
  return(
    <button onClick={onClick} disabled={disabled} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{background:bg,color:col,border,borderRadius:12,padding:pad,fontSize:fz,fontWeight:700,cursor:disabled?"not-allowed":"pointer",fontFamily:"-apple-system,sans-serif",display:"inline-flex",alignItems:"center",justifyContent:"center",gap:6,opacity:disabled?.4:1,transition:"all .2s",width:full?"100%":undefined,transform:hov&&!disabled?"translateY(-2px)":"none",...ex}}>
      {children}
    </button>
  );
}

function SHdr({icon,title,sub}){
  return(
    <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
      <div style={{width:38,height:38,background:P.card3,border:`1px solid ${P.border2}`,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0}}>{icon}</div>
      <div>
        <div style={{fontSize:17,fontWeight:700,color:P.white}}>{title}</div>
        {sub&&<div style={{fontSize:12,color:"rgba(235,235,245,.4)",marginTop:1}}>{sub}</div>}
      </div>
    </div>
  );
}

function LangSel({lang,setLang}){
  const[open,setOpen]=useState(false);
  return(
    <div style={{position:"relative"}}>
      <button onClick={()=>setOpen(!open)} style={{background:"#2C2C2E",border:"0.5px solid #3A3A3C",borderRadius:10,padding:"6px 12px",display:"flex",alignItems:"center",gap:6,cursor:"pointer",color:"#fff",fontSize:13,fontWeight:600,fontFamily:"-apple-system,sans-serif"}}>
        <span style={{fontSize:15}}>{T[lang].flag}</span><span>{lang.toUpperCase()}</span><span style={{fontSize:9,color:P.muted}}>▾</span>
      </button>
      {open&&(
        <div style={{position:"absolute",right:0,top:"calc(100% + 6px)",background:"#1C1C1E",border:"0.5px solid #3A3A3C",borderRadius:14,overflow:"hidden",zIndex:999,boxShadow:"0 12px 40px rgba(0,0,0,.7)",minWidth:140}}>
          {Object.entries(T).map(([k,l])=>(
            <button key={k} onClick={()=>{setLang(k);setOpen(false);}} style={{width:"100%",background:lang===k?"#2C2C2E":"transparent",border:"none",padding:"10px 15px",display:"flex",alignItems:"center",gap:9,cursor:"pointer",color:lang===k?P.gold:"#fff",fontSize:13,fontFamily:"-apple-system,sans-serif",fontWeight:lang===k?700:400,textAlign:"left"}}>
              <span style={{fontSize:18}}>{l.flag}</span><span>{l.name}</span>{lang===k&&<span style={{marginLeft:"auto",fontSize:11}}>✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function AuthModal({onClose,onAuth}){
  const[mode,setMode]=useState("login");
  const[email,setEmail]=useState("");
  const[pw,setPw]=useState("");
  const[load,setLoad]=useState(false);
  const[err,setErr]=useState(null);
  const[ok,setOk]=useState(null);
  async function submit(){
    setLoad(true);setErr(null);setOk(null);
    try{
      if(mode==="reg"){const{error:e}=await supabase.auth.signUp({email,password:pw});if(e)throw e;setOk("Cuenta creada. Revisa tu email.");}
      else{const{data,error:e}=await supabase.auth.signInWithPassword({email,password:pw});if(e)throw e;onAuth(data.user);onClose();}
    }catch(e){setErr(e.message);}
    setLoad(false);
  }
  const inp={width:"100%",padding:"12px 15px",border:"1.5px solid #3A3A3C",borderRadius:12,fontSize:14,fontFamily:"-apple-system,sans-serif",color:"#fff",background:"#2C2C2E",boxSizing:"border-box",outline:"none"};
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.75)",zIndex:1000,display:"flex",alignItems:"flex-end",justifyContent:"center",backdropFilter:"blur(12px)"}} onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div style={{background:"#1C1C1E",borderRadius:"26px 26px 0 0",width:"100%",maxWidth:460,padding:"22px 26px 44px",boxShadow:"0 -8px 60px rgba(0,0,0,.6)"}}>
        <div style={{width:38,height:5,background:"#3A3A3C",borderRadius:3,margin:"0 auto 22px"}}/>
        <div style={{fontSize:22,fontWeight:900,color:"#fff",marginBottom:5}}>{mode==="login"?"Bienvenido de nuevo":"Crea tu cuenta"}</div>
        <p style={{fontSize:13,color:"#6B6B6B",marginBottom:22}}>{mode==="login"?"Accede para guardar tus viajes":"Guarda y comparte tus viajes"}</p>
        <button onClick={()=>supabase.auth.signInWithOAuth({provider:"google",options:{redirectTo:window.location.origin}})} style={{width:"100%",background:"#2C2C2E",border:"1.5px solid #3A3A3C",borderRadius:12,padding:"12px",color:"#fff",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"-apple-system,sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:9,marginBottom:14}}>🔍 Continuar con Google</button>
        <div style={{display:"flex",alignItems:"center",gap:10,margin:"14px 0"}}><div style={{flex:1,height:"0.5px",background:"#3A3A3C"}}/><span style={{fontSize:11,color:"#6B6B6B"}}>o con email</span><div style={{flex:1,height:"0.5px",background:"#3A3A3C"}}/></div>
        <div style={{marginBottom:10}}><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="tu@email.com" type="email" style={inp} onFocus={e=>e.target.style.borderColor=P.gold} onBlur={e=>e.target.style.borderColor="#3A3A3C"}/></div>
        <div style={{marginBottom:18}}><input value={pw} onChange={e=>setPw(e.target.value)} placeholder="Contrasena" type="password" style={inp} onFocus={e=>e.target.style.borderColor=P.gold} onBlur={e=>e.target.style.borderColor="#3A3A3C"} onKeyDown={e=>e.key==="Enter"&&submit()}/></div>
        {err&&<div style={{background:"rgba(224,90,78,.12)",border:"1px solid rgba(224,90,78,.3)",borderRadius:9,padding:"9px 13px",fontSize:12,color:"#E05A4E",marginBottom:12}}>{err}</div>}
        {ok&&<div style={{background:"rgba(201,169,110,.12)",border:"1px solid rgba(201,169,110,.3)",borderRadius:9,padding:"9px 13px",fontSize:12,color:P.gold,marginBottom:12}}>{ok}</div>}
        <button onClick={submit} disabled={load||!email||!pw} style={{width:"100%",padding:"14px",background:load?"#333":GOLD_GRAD,color:load?"#888":"#0D0D0D",border:"none",borderRadius:12,fontSize:15,fontWeight:800,cursor:"pointer",fontFamily:"-apple-system,sans-serif",marginBottom:12,opacity:(!email||!pw)?.5:1}}>{load?"...":(mode==="login"?"Iniciar sesion":"Crear cuenta")}</button>
        <button onClick={()=>{setMode(mode==="login"?"reg":"login");setErr(null);setOk(null);}} style={{width:"100%",background:"none",border:"none",color:"#6B6B6B",fontSize:13,cursor:"pointer",fontFamily:"-apple-system,sans-serif"}}>{mode==="login"?"No tienes cuenta? Registrate":"Ya tienes cuenta? Inicia sesion"}</button>
      </div>
    </div>
  );
}

function TripTypeStep({t,value,onChange}){
  return(
    <div>
      <div style={{fontSize:21,fontWeight:800,color:P.white,marginBottom:4}}>{t.stepTripType}</div>
      <p style={{fontSize:13,color:P.muted,marginBottom:18}}>{t.stepSub}</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:9}}>
        {Object.entries(TRIP_TYPES).map(([k,tt])=>{
          const sel=value.includes(k);
          return(
            <button key={k} onClick={()=>onChange(k)} style={{background:sel?P.goldDim:P.card,border:`1.5px solid ${sel?P.goldBorder:P.border}`,borderRadius:14,padding:"14px 8px",cursor:"pointer",textAlign:"center",transition:"all .2s",transform:sel?"translateY(-2px)":"none",position:"relative"}}>
              {sel&&<div style={{position:"absolute",top:7,right:7,width:16,height:16,background:P.gold,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,color:"#0D0D0D",fontWeight:900}}>✓</div>}
              <div style={{fontSize:22,marginBottom:5}}>{tt.icon}</div>
              <div style={{fontSize:10,fontWeight:700,color:sel?P.gold:P.white}}>{t.tripNames[k]}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StyleStep({t,value,onChange}){
  return(
    <div>
      <div style={{fontSize:21,fontWeight:900,color:"#fff",marginBottom:5}}>{t.stepStyle}</div>
      <p style={{fontSize:13,color:P.muted,marginBottom:18}}>{t.stepDetails}</p>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {Object.entries(TRAVELER_STYLES).map(([k,ts])=>{
          const sel=value===k;
          return(
            <button key={k} onClick={()=>onChange(k)} style={{background:sel?P.goldDim:P.card,border:`1px solid ${sel?P.goldBorder:P.border}`,borderRadius:16,padding:"15px 17px",cursor:"pointer",textAlign:"left",transition:"all .2s",display:"flex",alignItems:"center",gap:13}}>
              <div style={{width:42,height:42,background:sel?P.goldDim:P.card3,border:`1px solid ${sel?P.goldBorder:P.border}`,borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",fontSize:19,flexShrink:0}}>{ts.icon}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:14,fontWeight:700,color:sel?P.gold:P.white,marginBottom:2}}>{t.styleNames[k]}</div>
                <div style={{fontSize:12,color:P.muted}}>{t.styleDesc[k]}</div>
              </div>
              {sel&&<span style={{color:P.gold,fontSize:20,fontWeight:900}}>✓</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DateInput({start,end,onChange,t}){
  const today=new Date().toISOString().split("T")[0];
  const base={background:"#2C2C2E",border:"1.5px solid #3A3A3C",borderRadius:12,color:"#fff",padding:"11px 13px",fontSize:13,fontFamily:"-apple-system,sans-serif",colorScheme:"dark",outline:"none",width:"100%",boxSizing:"border-box",cursor:"pointer"};
  return(
    <div style={{display:"flex",gap:11,flexWrap:"wrap"}}>
      {[{label:t.arrival,field:"start",min:today,val:start},{label:t.departure,field:"end",min:start||today,val:end}].map(({label,field,min,val})=>(
        <div key={field} style={{flex:1,minWidth:120}}>
          <div style={{fontSize:10,fontWeight:600,color:P.muted,letterSpacing:".05em",textTransform:"uppercase",marginBottom:5}}>{label}</div>
          <input type="date" min={min} value={val} onChange={e=>onChange(field,e.target.value)} style={base} onFocus={e=>e.target.style.borderColor=P.gold} onBlur={e=>e.target.style.borderColor="#3A3A3C"}/>
        </div>
      ))}
    </div>
  );
}

const Sk=({w="100%",h=14,r=8,mb=0})=><div style={{width:w,height:h,borderRadius:r,background:`linear-gradient(90deg,${P.card2} 25%,${P.card3} 50%,${P.card2} 75%)`,backgroundSize:"200% 100%",animation:"shimmer 1.4s infinite",marginBottom:mb,flexShrink:0}}/>;



function BookingFlow({flight,hotel,dest,travelers,nights,t,onClose}){
  const[step,setStep]=useState(0);
  const fT=flight?flight.price*travelers:0;
  const hT=hotel?hotel.price_per_night*nights:0;
  const tax=Math.round((fT+hT)*.10);
  const total=fT+hT+tax;
  const steps=[
    {icon:"✈️",title:"Paso 1: Reserva tu vuelo",sub:flight?`${flight.airline} · ${flight.price}€ × ${travelers} = ${fT}€`:"Sin vuelo",url:`https://www.skyscanner.es/transporte/vuelos/?query=${encodeURIComponent(dest||"")}`,btn:"Ir a Skyscanner →"},
    {icon:"🏨",title:"Paso 2: Reserva tu hotel",sub:hotel?`${hotel.name} · ${hotel.price_per_night}€ × ${nights}n = ${hT}€`:"Sin hotel",url:`https://www.booking.com/search.html?ss=${encodeURIComponent((hotel?.name||"")+" "+dest)}`,btn:"Ir a Booking.com →"},
  ];
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.8)",zIndex:1000,display:"flex",alignItems:"flex-end",justifyContent:"center",backdropFilter:"blur(12px)"}} onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div style={{background:"#1C1C1E",borderRadius:"26px 26px 0 0",width:"100%",maxWidth:500,padding:"22px 24px 44px",boxShadow:"0 -8px 60px rgba(0,0,0,.6)"}}>
        <div style={{width:38,height:5,background:"#3A3A3C",borderRadius:3,margin:"0 auto 20px"}}/>
        {step<2?(
          <>
            <div style={{display:"flex",gap:8,marginBottom:20}}>
              {[0,1].map(s=><div key={s} style={{flex:1,height:4,borderRadius:2,background:s<=step?"#C9A96E":"#2A2A2A",transition:"all .3s"}}/>)}
            </div>
            <div style={{fontSize:22,fontWeight:900,color:"#fff",marginBottom:6}}>{steps[step].icon} {steps[step].title}</div>
            <div style={{fontSize:14,color:"#A0A0A0",marginBottom:24}}>{steps[step].sub}</div>
            <div style={{background:"rgba(201,169,110,.1)",border:"1px solid rgba(201,169,110,.2)",borderRadius:14,padding:"16px 18px",marginBottom:20}}>
              <div style={{fontSize:12,color:"#C9A96E",marginBottom:4}}>💡 Cómo funciona</div>
              <div style={{fontSize:13,color:"#fff",lineHeight:1.6}}>{step===0?"Haz clic para ir a Skyscanner. Busca el vuelo y completa la reserva. Luego vuelve aquí para reservar el hotel.":"Haz clic para ir a Booking.com. Busca el hotel y completa la reserva. ¡Tu paquete estará listo!"}</div>
            </div>
            <button onClick={()=>{window.open(steps[step].url,"_blank");setStep(step+1);}} style={{width:"100%",padding:"15px",background:"linear-gradient(135deg,#C9A96E,#E8C98A)",color:"#0D0D0D",border:"none",borderRadius:13,fontSize:15,fontWeight:800,cursor:"pointer",fontFamily:"-apple-system,sans-serif",marginBottom:10}}>{steps[step].btn}</button>
            <button onClick={onClose} style={{width:"100%",padding:"12px",background:"transparent",color:"#6B6B6B",border:"1px solid #2A2A2A",borderRadius:13,fontSize:14,cursor:"pointer",fontFamily:"-apple-system,sans-serif"}}>Cancelar</button>
          </>
        ):(
          <div style={{textAlign:"center",padding:"20px 0"}}>
            <div style={{width:70,height:70,background:"linear-gradient(135deg,#C9A96E,#E8C98A)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 18px",fontSize:32}}>✓</div>
            <div style={{fontSize:22,fontWeight:900,color:"#fff",marginBottom:8}}>¡Paquete completado!</div>
            <div style={{fontSize:14,color:"#A0A0A0",marginBottom:6}}>Vuelo + Hotel reservados en</div>
            <div style={{fontSize:28,fontWeight:700,color:"#C9A96E",marginBottom:24}}>{total}€</div>
            <button onClick={onClose} style={{width:"100%",padding:"14px",background:"linear-gradient(135deg,#C9A96E,#E8C98A)",color:"#0D0D0D",border:"none",borderRadius:13,fontSize:15,fontWeight:800,cursor:"pointer",fontFamily:"-apple-system,sans-serif"}}>Cerrar</button>
          </div>
        )}
      </div>
    </div>
  );
}

function DayCard({day,i,t}){
  const[open,setOpen]=useState(i===0);
  return(
    <div style={{background:"#1C1C1E",border:`1px solid ${open?P.goldBorder:P.border}`,borderRadius:18,marginBottom:9,overflow:"hidden",transition:"all .3s"}}>
      <button onClick={()=>setOpen(!open)} style={{width:"100%",background:"none",border:"none",padding:"15px 18px",cursor:"pointer",display:"flex",alignItems:"center",gap:13}}>
        <div style={{width:34,height:34,background:open?P.goldDim:P.card3,border:`1px solid ${open?P.goldBorder:P.border}`,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:900,color:open?P.gold:P.muted,flexShrink:0}}>{i+1}</div>
        <div style={{flex:1,textAlign:"left"}}>
          <div style={{fontSize:14,fontWeight:700,color:"#fff"}}>{day.day?.replace(/^(Día|Day|Jour) \d+ [-–] /,"")||day.title||"Día "+(i+1)}</div>
          {day.theme&&<div style={{fontSize:11,color:P.muted,marginTop:1}}>{day.theme}</div>}
        </div>
        <span style={{color:P.muted,fontSize:18,transform:open?"rotate(90deg)":"none",transition:".2s"}}>›</span>
      </button>
      {open&&(
        <div style={{padding:"2px 17px 17px",borderTop:"0.5px solid rgba(255,255,255,.06)"}}>
          {[{k:"morning",l:t.morning},{k:"afternoon",l:t.afternoon},{k:"evening",l:t.evening},{k:"transport",l:t.transport}].map(({k,l})=>day[k]&&(
            <div key={k} style={{marginTop:12}}>
              <div style={{fontSize:10,fontWeight:700,color:P.gold,textTransform:"uppercase",letterSpacing:".06em",marginBottom:4}}>{l}</div>
              <p style={{margin:0,fontSize:12,color:"rgba(255,255,255,.7)",lineHeight:1.65}}>{day[k]}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AffiliatePanel({t}){
  const[open,setOpen]=useState(false);
  return(
    <div style={{background:P.card,borderRadius:14,padding:"16px",border:`1px solid ${P.border}`}}>
      <button onClick={()=>setOpen(!open)} style={{width:"100%",background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:9,color:"#fff",fontFamily:"-apple-system,sans-serif"}}>
        <div style={{width:26,height:26,background:P.goldDim,border:`1px solid ${P.goldBorder}`,borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>💰</div>
        <div style={{flex:1,textAlign:"left"}}><div style={{fontSize:12,fontWeight:600,color:P.white}}>{t.affiliateT}</div><div style={{fontSize:10,color:P.muted}}>{t.affiliateSub}</div></div>
        <span style={{color:P.muted,fontSize:14,transform:open?"rotate(180deg)":"none",transition:".2s"}}>▾</span>
      </button>
      {open&&(
        <div style={{marginTop:12,display:"flex",flexDirection:"column",gap:8}}>
          {[{name:"Booking.com",icon:"🏨",grad:"linear-gradient(135deg,#003580,#0057B8)",url:"https://www.booking.com",cta:"~€50/booking"},{name:"Skyscanner",icon:"✈️",grad:"linear-gradient(135deg,#0770E3,#0557B0)",url:"https://www.skyscanner.es",cta:"CPA/flight"},{name:"GetYourGuide",icon:"🎟️",grad:"linear-gradient(135deg,#FF5533,#CC3311)",url:"https://www.getyourguide.es",cta:"8% commission"}].map((al,i)=>(
            <a key={i} href={al.url} target="_blank" rel="noopener noreferrer" style={{background:"#2C2C2E",borderRadius:11,padding:"11px 13px",textDecoration:"none",display:"flex",alignItems:"center",gap:10,transition:"all .2s"}} onMouseEnter={e=>{e.currentTarget.style.background="#38383A";}} onMouseLeave={e=>{e.currentTarget.style.background="#2C2C2E";}}>
              <div style={{width:30,height:30,background:al.grad,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>{al.icon}</div>
              <div style={{flex:1}}><div style={{fontSize:12,fontWeight:700,color:"#fff"}}>{al.name}</div></div>
              <span style={{fontSize:9,fontWeight:600,color:P.gold,background:P.goldDim,border:`1px solid ${P.goldBorder}`,borderRadius:4,padding:"2px 7px"}}>{al.cta}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ViajeIA(){
  const[lang,setLang]=useState("es");
  const t=T[lang];
  const locale=t.locale;

  const[user,setUser]=useState(null);
  const[authOpen,setAuthOpen]=useState(false);
  const[guideOpen,setGuideOpen]=useState(false);
  const[guideMood,setGuideMood]=useState("happy");
  const[guideSpeak,setGuideSpeak]=useState(false);
  const[userPos,setUserPos]=useState(null);

  const[step,setStep]=useState(0);
  const[tripTypes,setTripTypes]=useState([]);
  const[tStyle,setTStyle]=useState(null);
  const toggle=k=>setTripTypes(prev=>prev.includes(k)?prev.filter(x=>x!==k):[...prev,k]);

  const[origin,setOrigin]=useState("Madrid, España");
  const[dest,setDest]=useState("");
  const[budget,setBudget]=useState("");
  const[start,setStart]=useState("");
  const[end,setEnd]=useState("");
  const[travelers,setTravelers]=useState(1);

  const[loading,setLoading]=useState(false);
  const[loadStep,setLoadStep]=useState(-1);
  const[apiErr,setApiErr]=useState(null);
  const[plan,setPlan]=useState(null);
  const[flights,setFlights]=useState([]);
  const[hotels,setHotels]=useState([]);
  const[rests,setRests]=useState([]);
  const[weather,setWeather]=useState(null);
  const[selF,setSelF]=useState(null);
  const[selH,setSelH]=useState(null);
  const[places,setPlaces]=useState([]);
  const[activeMap,setActiveMap]=useState(null);
  const[toast,setToast]=useState(false);
  const[bookingOpen,setBookingOpen]=useState(false);
  const[nearbyModal,setNearbyModal]=useState(null);
  const[myTripsOpen,setMyTripsOpen]=useState(false);
  const[exploreOpen,setExploreOpen]=useState(false);
  const leafReady=useLeaflet();
  const days=diffDays(start,end);
  const nights=days?days-1:plan?.days||5;

  useEffect(()=>{
    supabase.auth.getSession().then(({data:{session}})=>setUser(session?.user||null));
    const{data:{subscription}}=supabase.auth.onAuthStateChange((_,s)=>setUser(s?.user||null));
    return()=>subscription.unsubscribe();
  },[]);

  const lastNearRef = useRef(null);
  useEffect(()=>{
    if(!navigator.geolocation||!plan)return;
    const id=navigator.geolocation.watchPosition(
      p=>{
        const pos={lat:p.coords.latitude,lng:p.coords.longitude};
        setUserPos(pos);
        // Check nearby places
        if(places.length){
          const nearby=places.find(pl=>pl.lat&&pl.lng&&haversine(pos.lat,pos.lng,pl.lat,pl.lng)<150);
          if(nearby&&nearby.name!==lastNearRef.current){
            lastNearRef.current=nearby.name;
            setNearbyModal(nearby);
          }
        }
      },
      ()=>{},{enableHighAccuracy:true,maximumAge:5000}
    );
    return()=>navigator.geolocation.clearWatch(id);
  },[plan,places]);

  function buildPlaces(p,hs,rs){
    const out=[];
    p.map_places?.forEach(x=>{if(x.lat&&x.lng)out.push({name:x.name,lat:+x.lat,lng:+x.lng,desc:x.description,type:"place"});});
    hs.forEach(h=>{if(h.lat&&h.lng)out.push({name:h.name,lat:+h.lat,lng:+h.lng,desc:h.description,type:"hotel"});});
    rs.forEach(r=>{if(r.lat&&r.lng)out.push({name:r.name,lat:+r.lat,lng:+r.lng,desc:r.description,type:"restaurant"});});
    return out;
  }

  function flyTo(h){
    const i=places.findIndex(p=>p.name===h.name&&p.type==="hotel");
    if(i>=0){setActiveMap(i);document.getElementById("mapsec")?.scrollIntoView({behavior:"smooth",block:"center"});}
  }

  const pJ=async r=>{try{const d=await r.json();const txt=(d.content||[]).map(b=>b.text||"").join("").trim();const m=txt.match(/\[[\s\S]*\]|\{[\s\S]*\}/);return m?JSON.parse(m[0]):[];}catch{return[];}};

  async function generate(){
    if(!dest.trim())return;
    setApiErr(null);setLoading(true);setPlan(null);setFlights([]);setHotels([]);setRests([]);setWeather(null);setSelF(null);setSelH(null);setPlaces([]);
    const dctx=start&&end?`Dates: ${start} to ${end} (${days} days). Travelers: ${travelers}.`:"";
    const lp=t.lp;
    const ts=TRAVELER_STYLES[tStyle||"comfort"];
    const types=tripTypes.length?tripTypes.join(", "):"culture";
    const bNum=budget?parseInt(budget):800;

    setLoadStep(0);
    const sys=`You are a travel planner. ${lp} YOU MUST reply with ONLY a raw JSON object. NO backticks. NO markdown. NO explanation. Just the JSON. ${dctx}
Format: {"destination":"city, country","days":5,"budget":"1000€","summary":"short summary","map_places":[{"name":"place","lat":35.6,"lng":139.7,"description":"desc"}],"itinerary":[{"day":"Day 1 - Name","theme":"theme","morning":"activities","afternoon":"activities","evening":"activities","transport":"how to get around","budget":"~50€"}],"tips":["tip1","tip2"],"lat":35.6,"lng":139.7}
IMPORTANT: Start your response with { and end with }. Nothing else.`;

    let planData=null;
    try{
      const r=await fetch("/api/anthropic",{method:"POST",headers:{"Content-Type":"application/json","anthropic-version":"2023-06-01"},body:JSON.stringify({model:"claude-haiku-4-5-20251001",max_tokens:4000,system:sys,messages:[{role:"user",content:`${dest}${budget?" · "+budget+"€":""}${dctx?" · "+dctx:""}`}]})});
      const d=await r.json();
      if(d.error){throw new Error(d.error.message||"API error");}
      const raw=(d.content||[]).map(b=>b.text||"").join("").trim();
      const m=raw.match(/\{[\s\S]*\}/);
      if(!m)throw new Error("No JSON in response");
      planData=JSON.parse(m[0]);
      setPlan(planData);setLoading(false);
      setGuideMood("excited");setGuideSpeak(true);setTimeout(()=>{setGuideMood("happy");setGuideSpeak(false);},3000);
    }catch(e){
      setLoading(false);setLoadStep(-1);setApiErr(t.errorMsg+" ("+e.message+")");return;
    }

    const destination=planData.destination;
    const hBudget=Math.round(bNum*ts.pct/(nights||5));

    setLoadStep(1);
    const[r1,r2,r3]=await Promise.all([
      fetch("/api/anthropic",{method:"POST",headers:{"Content-Type":"application/json","anthropic-version":"2023-06-01"},body:JSON.stringify({model:"claude-haiku-4-5-20251001",max_tokens:900,system:`3 flights ${origin||"Madrid"}→${destination}. ${lp} ONLY raw JSON array:\n[{"airline":"...","departure":"HH:MM","arrival":"HH:MM","duration":"XhYm","stops":0,"price":XXX}]`,messages:[{role:"user",content:`Flights to ${destination}`}]})}),
      fetch("/api/anthropic",{method:"POST",headers:{"Content-Type":"application/json","anthropic-version":"2023-06-01"},body:JSON.stringify({model:"claude-haiku-4-5-20251001",max_tokens:1400,system:`3 ${ts.stars}-star hotels in ${destination}. ~${hBudget}€/night. ${lp} ONLY raw JSON array:\n[{"name":"...","stars":3,"neighborhood":"...","description":"...","highlights":["..."],"price_per_night":XX,"lat":0.0,"lng":0.0}]`,messages:[{role:"user",content:`Hotels in ${destination}`}]})}),
      fetch("/api/anthropic",{method:"POST",headers:{"Content-Type":"application/json","anthropic-version":"2023-06-01"},body:JSON.stringify({model:"claude-haiku-4-5-20251001",max_tokens:1100,system:`5 restaurants in ${destination}. Style: ${types}. ${lp} ONLY raw JSON array:\n[{"name":"...","cuisine":"...","rating":4.2,"price_range":"€€","description":"...","neighborhood":"...","lat":0.0,"lng":0.0}]`,messages:[{role:"user",content:`Restaurants in ${destination}`}]})}),
    ]);

    setLoadStep(2);
    let hs=[],rs=[];
    pJ(r1).then(fl=>{if(fl?.length){setFlights(fl);setSelF(0);}});
    pJ(r2).then(h=>{
      if(!h?.length)return;
      const sorted=tStyle==="luxury"?h.sort((a,b)=>b.price_per_night-a.price_per_night):h.sort((a,b)=>a.price_per_night-b.price_per_night);
      hs=sorted.map((x,i)=>({...x,_i:i}));setHotels(hs);setSelH(0);setPlaces(buildPlaces(planData,hs,rs));
    });
    pJ(r3).then(r=>{if(!r?.length)return;rs=r;setRests(rs);setPlaces(buildPlaces(planData,hs,rs));});

    setLoadStep(3);
    if(planData.lat&&planData.lng&&start){const wx=await fetchWeather(planData.lat,planData.lng,start);setWeather(wx);}
    setLoadStep(-1);
  }

  function reset(){
    setPlan(null);setFlights([]);setHotels([]);setRests([]);setWeather(null);
    setSelF(null);setSelH(null);setPlaces([]);setApiErr(null);
    setDest("");setBudget("");setStart("");setEnd("");setTravelers(1);
    setStep(0);setTripTypes([]);setTStyle(null);setGuideOpen(false);setUserPos(null);
  }

  async function saveTrip(){
    if(!plan||!user){setAuthOpen(true);return;}
    try{
      await supabase.from('trips').insert({
        user_id:user.id,
        destination:plan.destination,
        origin:origin,
        budget:budget,
        plan:plan,
      });
      setToast(true);setTimeout(()=>setToast(false),2500);
    }catch(e){console.error(e);}
  }

  function share(){
    if(!plan)return;
    const txt=`✈️ ${plan.destination} · ${plan.days} dias · ${plan.budget}\nhttps://trippio.travel`;
    if(navigator.share)navigator.share({title:`Trippio - ${plan.destination}`,text:txt,url:window.location.href}).catch(()=>{});
    else{navigator.clipboard?.writeText(txt);setToast(true);setTimeout(()=>setToast(false),2500);}
  }

  const fSel=selF!=null?flights[selF]:null;
  const hSel=selH!=null?hotels[selH]:null;

  return(
    <div style={{minHeight:"100vh",background:P.black,color:P.white,fontFamily:"-apple-system,'SF Pro Rounded',sans-serif"}}>
      <style>{`
        @keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
        @keyframes up{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pop{0%{opacity:0;transform:scale(.9)}100%{opacity:1;transform:scale(1)}}
        @keyframes pulse{0%,100%{opacity:.4;transform:scale(.78)}50%{opacity:1;transform:scale(1)}}
        @keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes wiggle{0%,100%{transform:rotate(0)}25%{transform:rotate(-5deg)}75%{transform:rotate(5deg)}}
        @keyframes dot{0%,80%,100%{transform:scale(.8);opacity:.5}40%{transform:scale(1.2);opacity:1}}
        .fade{animation:up .4s cubic-bezier(.16,1,.3,1) both}
        .fade2{animation:up .4s .07s cubic-bezier(.16,1,.3,1) both}
        .fade3{animation:up .4s .14s cubic-bezier(.16,1,.3,1) both}
        .fade4{animation:up .4s .21s cubic-bezier(.16,1,.3,1) both}
        .pop{animation:pop .45s cubic-bezier(.16,1,.3,1) both}
        .pop2{animation:pop .45s .07s cubic-bezier(.16,1,.3,1) both}
        .pop3{animation:pop .45s .14s cubic-bezier(.16,1,.3,1) both}
        .pop4{animation:pop .45s .21s cubic-bezier(.16,1,.3,1) both}
        .hov{transition:transform .2s,border-color .2s}
        .hov:hover{transform:translateY(-3px)}
        .rl{display:grid;grid-template-columns:1fr 290px;gap:24px;align-items:start}
        @media(max-width:860px){.rl{grid-template-columns:1fr}}
        input:focus,textarea:focus{outline:none!important}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-thumb{background:#3A3A3C;border-radius:2px}
        *{-webkit-font-smoothing:antialiased}
        button,input,select{font-family:-apple-system,sans-serif}
      `}</style>

      {/* NAV */}
      <nav style={{background:"rgba(13,13,13,.96)",backdropFilter:"blur(20px)",borderBottom:`1px solid ${P.border}`,padding:"0 20px",height:58,display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:200}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <TrippioLogo size={30}/>
          <div style={{lineHeight:1}}>
            <div style={{fontSize:16,fontWeight:700,color:P.white}}>Trippio</div>
            <div style={{fontSize:8,color:P.gold,letterSpacing:".12em",textTransform:"uppercase",marginTop:1,opacity:.8}}>AI Travel</div>
          </div>
        </div>
        <div style={{display:"flex",gap:7,alignItems:"center"}}>
          <LangSel lang={lang} setLang={setLang}/>
          {plan&&<button onClick={share} style={{background:P.card2,border:`1px solid ${P.border}`,color:P.sub,borderRadius:8,padding:"5px 11px",fontSize:12,cursor:"pointer",fontWeight:600}}>↑ {t.shareBtn}</button>}
          <button onClick={()=>setExploreOpen(true)} style={{background:"rgba(201,169,110,.15)",border:"1px solid rgba(201,169,110,.25)",color:"#C9A96E",borderRadius:8,padding:"5px 11px",fontSize:12,cursor:"pointer",fontWeight:600}}>🔍 Explorar ciudad</button>
          {user&&<button onClick={()=>setMyTripsOpen(true)} style={{background:P.card2,border:`1px solid ${P.border}`,color:P.sub,borderRadius:8,padding:"5px 11px",fontSize:12,cursor:"pointer",fontWeight:600}}>📚 Mis viajes</button>}
          {plan&&<button onClick={saveTrip} style={{background:P.goldDim,border:`1px solid ${P.goldBorder}`,color:P.gold,borderRadius:8,padding:"5px 11px",fontSize:12,cursor:"pointer",fontWeight:600}}>🔖 Guardar</button>}
          {plan&&<IBtn size="sm" outline color={P.muted} onClick={reset}>{t.newSearch}</IBtn>}
          {!user
            ?<button onClick={()=>setAuthOpen(true)} style={{background:GOLD_GRAD,color:"#0D0D0D",border:"none",borderRadius:9,padding:"7px 13px",fontSize:12,fontWeight:700,cursor:"pointer"}}>{t.loginBtn}</button>
            :<button onClick={()=>supabase.auth.signOut()} style={{background:P.card2,border:`1px solid ${P.border}`,color:P.muted,borderRadius:9,padding:"7px 13px",fontSize:12,fontWeight:600,cursor:"pointer"}}>👤 {t.logoutBtn}</button>
          }
        </div>
      </nav>

      {authOpen&&<AuthModal onClose={()=>setAuthOpen(false)} onAuth={u=>setUser(u)}/>}
  {exploreOpen&&<ExploreMode lang={lang} onClose={()=>setExploreOpen(false)}/> }
  {myTripsOpen&&user&&<MyTrips user={user} onClose={()=>setMyTripsOpen(false)} onLoad={trip=>{setPlan(trip.plan);setOrigin(trip.origin||'');setDest(trip.destination||'');setBudget(trip.budget||'');}} />}
  {nearbyModal&&<GuideModal place={nearbyModal} plan={plan} lang={lang} onClose={()=>setNearbyModal(null)}/> }
  {bookingOpen&&fSel&&hSel&&<BookingFlow flight={fSel} hotel={hSel} dest={plan?.destination} travelers={travelers} nights={nights} t={t} onClose={()=>setBookingOpen(false)}/>}
      {plan&&guideOpen&&<VirtualGuide plan={plan} places={places} userPos={userPos} lang={lang} onClose={()=>setGuideOpen(false)}/>}
      {plan&&!guideOpen&&<GuideBubble onClick={()=>setGuideOpen(true)} mood={guideMood} speak={guideSpeak}/>}
      {toast&&<div style={{position:"fixed",bottom:30,left:"50%",transform:"translateX(-50%)",background:P.card2,border:`1px solid ${P.goldBorder}`,color:P.gold,borderRadius:11,padding:"11px 20px",fontSize:13,fontWeight:600,zIndex:999}}>✓ {t.shareCopied||'Enlace copiado'}</div>}

      <main style={{maxWidth:1080,margin:"0 auto",padding:"0 18px 100px"}}>

        {apiErr&&(
          <div style={{background:"rgba(224,90,78,.12)",border:"1px solid rgba(224,90,78,.3)",borderRadius:12,padding:"15px 18px",margin:"20px 0",display:"flex",gap:12,alignItems:"center"}}>
            <span style={{fontSize:20}}>⚠️</span>
            <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:"#E05A4E",marginBottom:2}}>{t.errorTitle}</div><div style={{fontSize:12,color:P.sub}}>{apiErr}</div></div>
            <button onClick={()=>setApiErr(null)} style={{background:"none",border:"none",color:P.muted,cursor:"pointer",fontSize:17}}>✕</button>
          </div>
        )}

        {/* ONBOARDING */}
        {!plan&&!loading&&(
          <div style={{maxWidth:580,margin:"0 auto",padding:"55px 0 40px"}}>
            <div style={{display:"flex",justifyContent:"center",gap:7,marginBottom:30}} className="fade">
              {[0,1,2].map(s=><div key={s} style={{height:4,borderRadius:2,background:s<=step?P.gold:P.border,width:s===step?38:18,transition:"all .4s"}}/>)}
            </div>

            {step===0&&(
              <>
                <div style={{textAlign:"center",marginBottom:26}} className="fade">
                  <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:13,marginBottom:20}}>
                    <TrippioLogo size={52}/>
                    <div style={{textAlign:"left"}}>
                      <div style={{fontSize:34,fontWeight:700,color:P.white,lineHeight:1}}>Trippio</div>
                      <div style={{fontSize:10,color:P.gold,letterSpacing:".15em",textTransform:"uppercase",marginTop:3}}>Your trip. One click.</div>
                    </div>
                  </div>
                  <h1 style={{fontSize:"clamp(26px,5vw,44px)",fontWeight:700,lineHeight:1.1,margin:"0 0 2px",color:P.white}} className="fade2">{t.h1a}</h1>
                  <h1 style={{fontSize:"clamp(26px,5vw,44px)",fontWeight:700,lineHeight:1.1,margin:"0 0 14px",color:P.gold}} className="fade3">{t.h1b}</h1>
                  <p style={{fontSize:14,color:"rgba(235,235,245,.5)",margin:"0 0 24px",lineHeight:1.7}} className="fade4">{t.sub}</p>
                </div>
                <TripTypeStep t={t} value={tripTypes} onChange={toggle}/>
                <div style={{marginTop:18,display:"flex",justifyContent:"flex-end"}}>
                  <IBtn onClick={()=>setStep(1)} disabled={tripTypes.length===0}>{t.nextBtn}</IBtn>
                </div>
              </>
            )}

            {step===1&&(
              <>
                <StyleStep t={t} value={tStyle} onChange={setTStyle}/>
                <div style={{marginTop:18,display:"flex",gap:9,justifyContent:"space-between"}}>
                  <IBtn outline color={P.muted} onClick={()=>setStep(0)}>{t.backBtn}</IBtn>
                  <IBtn onClick={()=>setStep(2)} disabled={!tStyle}>{t.nextBtn}</IBtn>
                </div>
              </>
            )}

            {step===2&&(
              <div className="fade">
                <div style={{display:"flex",gap:7,marginBottom:18,flexWrap:"wrap"}}>
                  {tripTypes.map(k=><span key={k} style={{background:P.goldDim,color:P.gold,border:`1px solid ${P.goldBorder}`,borderRadius:7,padding:"4px 11px",fontSize:11,fontWeight:600}}>{TRIP_TYPES[k].icon} {t.tripNames[k]}</span>)}
                  {tStyle&&<span style={{background:GOLD_GRAD,color:"#fff",borderRadius:9,padding:"5px 13px",fontSize:12,fontWeight:800}}>{TRAVELER_STYLES[tStyle].icon} {t.styleNames[tStyle]}</span>}
                </div>
                <div style={{background:P.card,borderRadius:18,padding:"22px 24px",boxShadow:"0 20px 60px rgba(0,0,0,.7)",border:`1px solid ${P.border}`}}>
                  {/* 3 CAMPOS SEPARADOS */}
                  <div style={{display:"flex",flexDirection:"column",gap:13,marginBottom:15}}>
                    <div>
                      <div style={{fontSize:10,fontWeight:700,color:"rgba(235,235,245,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:5}}>✈️ {t.originL}</div>
                      <input value={origin} onChange={e=>setOrigin(e.target.value)} placeholder={t.originPh} style={{width:"100%",background:"#2C2C2E",border:"1.5px solid #3A3A3C",borderRadius:11,color:"#fff",fontSize:14,padding:"11px 13px",boxSizing:"border-box",outline:"none"}} onFocus={e=>e.target.style.borderColor=P.gold} onBlur={e=>e.target.style.borderColor="#3A3A3C"}/>
                    </div>
                    <div>
                      <div style={{fontSize:10,fontWeight:700,color:"rgba(235,235,245,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:5}}>🌍 {t.destL}</div>
                      <input value={dest} onChange={e=>setDest(e.target.value)} placeholder={t.destPh} style={{width:"100%",background:"#2C2C2E",border:"1.5px solid #3A3A3C",borderRadius:11,color:"#fff",fontSize:14,padding:"11px 13px",boxSizing:"border-box",outline:"none"}} onFocus={e=>e.target.style.borderColor=P.gold} onBlur={e=>e.target.style.borderColor="#3A3A3C"}/>
                    </div>
                    <div>
                      <div style={{fontSize:10,fontWeight:700,color:"rgba(235,235,245,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:5}}>💰 {t.budgetL}</div>
                      <input value={budget} onChange={e=>setBudget(e.target.value)} placeholder={t.budgetPh} type="number" min="100" style={{width:"100%",background:"#2C2C2E",border:"1.5px solid #3A3A3C",borderRadius:11,color:"#fff",fontSize:14,padding:"11px 13px",boxSizing:"border-box",outline:"none"}} onFocus={e=>e.target.style.borderColor=P.gold} onBlur={e=>e.target.style.borderColor="#3A3A3C"}/>
                    </div>
                  </div>
                  <div style={{height:"0.5px",background:"rgba(255,255,255,.07)",margin:"14px 0"}}/>
                  <div style={{marginBottom:14}}><DateInput start={start} end={end} onChange={(f,v)=>{if(f==="start"){setStart(v);if(end&&v>end)setEnd("");}else setEnd(v);}} t={t}/></div>
                  <div style={{marginBottom:14}}>
                    <div style={{fontSize:10,fontWeight:700,color:"rgba(235,235,245,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:7}}>{t.travelersL}</div>
                    <div style={{display:"flex",alignItems:"center",gap:13}}>
                      <button onClick={()=>setTravelers(Math.max(1,travelers-1))} style={{width:32,height:32,background:"#2C2C2E",border:"1.5px solid #3A3A3C",borderRadius:"50%",cursor:"pointer",fontSize:19,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>−</button>
                      <span style={{fontSize:16,fontWeight:800,minWidth:20,textAlign:"center"}}>{travelers}</span>
                      <button onClick={()=>setTravelers(Math.min(8,travelers+1))} style={{width:32,height:32,background:"#2C2C2E",border:"1.5px solid #3A3A3C",borderRadius:"50%",cursor:"pointer",fontSize:19,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>+</button>
                      <span style={{fontSize:12,color:P.muted}}>{travelers===1?t.t1:t.tN(travelers)}</span>
                    </div>
                  </div>
                  {days&&days>0&&(
                    <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:13,padding:"9px 13px",background:P.goldDim,borderRadius:9,border:`1px solid ${P.goldBorder}`}}>
                      <span style={{width:6,height:6,background:P.gold,borderRadius:"50%",animation:"pulse 1.6s ease infinite",display:"inline-block"}}/>
                      <span style={{fontSize:11,color:P.gold,fontWeight:600}}>{days} dias · {fmtDate(start,{day:"numeric",month:"long"},locale)} - {fmtDate(end,{day:"numeric",month:"long",year:"numeric"},locale)}</span>
                    </div>
                  )}
                  <IBtn full size="lg" onClick={generate} disabled={!dest.trim()}>{t.searchBtn}</IBtn>
                </div>
                <div style={{marginTop:11}}>
                  <IBtn outline color={P.muted} size="sm" onClick={()=>setStep(1)}>{t.backBtn}</IBtn>
                </div>
              </div>
            )}
          </div>
        )}

        {/* LOADING */}
        {loading&&!plan&&(
          <div style={{maxWidth:460,margin:"55px auto 0",padding:"0 18px"}} className="fade">
            <div style={{textAlign:"center",marginBottom:26}}>
              <div style={{margin:"0 auto 18px",width:68,display:"flex",justifyContent:"center",animation:"float 3s ease-in-out infinite"}}><TrippioLogo size={68}/></div>
              <h2 style={{fontSize:21,fontWeight:800,margin:"0 0 5px"}}>{t.loadTitle}</h2>
              <p style={{fontSize:12,color:P.muted}}>{t.loadSub}</p>
            </div>
            <div style={{background:P.card,borderRadius:16,padding:"7px 16px 9px",border:`1px solid ${P.border}`,marginBottom:20}}>
              {t.steps.map((label,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:11,padding:"8px 0",opacity:loadStep>=i?1:.3,transition:"opacity .3s",borderBottom:i<t.steps.length-1?`1px solid ${P.border}`:"none"}}>
                  <div style={{width:28,height:28,borderRadius:"50%",background:loadStep>i?P.goldDim:loadStep===i?P.goldDim:P.card3,border:`1px solid ${loadStep>=i?P.goldBorder:P.border}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    {loadStep>i?<span style={{color:P.gold,fontSize:12,fontWeight:700}}>✓</span>:loadStep===i?<Spin size={13} color={P.gold}/>:<span style={{fontSize:11}}>{["🗺️","✈️","🏨","🍽️","🌤","✅"][i]}</span>}
                  </div>
                  <span style={{fontSize:12,fontWeight:loadStep>=i?600:400,color:loadStep>=i?P.white:P.muted}}>{label}</span>
                </div>
              ))}
            </div>
            <Sk w="100%" h={70} r={14} mb={10}/><Sk w="100%" h={70} r={14}/>
          </div>
        )}

        {/* RESULTS */}
        {plan&&(
          <div className="fade">
            {/* Hero */}
            <div style={{position:"relative",height:300,borderRadius:"0 0 28px 28px",overflow:"hidden",marginBottom:24,boxShadow:"0 16px 48px rgba(0,0,0,.7)"}}>
              <img src={getImg(plan.destination)} alt={plan.destination} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.85) 0%,rgba(0,0,0,.3) 50%,transparent 75%)"}}/>
              {/* Guide banner */}
              <div style={{position:"absolute",top:14,right:14,background:"rgba(0,0,0,.7)",backdropFilter:"blur(12px)",border:`1px solid ${P.goldBorder}`,borderRadius:14,padding:"9px 13px",display:"flex",alignItems:"center",gap:9,cursor:"pointer"}} onClick={()=>setGuideOpen(true)}>
                <GuideChar mood="happy" size={34}/>
                <div><div style={{fontSize:11,fontWeight:700,color:P.gold}}>Marco</div><div style={{fontSize:10,color:P.sub}}>Tu guia IA</div></div>
              </div>
              {userPos&&<div style={{position:"absolute",top:14,left:14,background:"rgba(59,130,246,.2)",border:"1px solid rgba(59,130,246,.3)",borderRadius:10,padding:"5px 11px",fontSize:11,fontWeight:600,color:"#60A5FA"}}>📍 GPS activo</div>}
              <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"20px 22px"}}>
                <div style={{fontSize:"clamp(28px,5vw,48px)",fontWeight:900,color:"#fff",letterSpacing:"-.04em",lineHeight:1.0,marginBottom:10}}>{plan.destination}</div>
                <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
                  {[t.days(plan.days),plan.budget,start&&end?`${fmtDate(start,null,locale)} → ${fmtDate(end,null,locale)}`:null,travelers===1?t.t1:t.tN(travelers)].filter(Boolean).map((v,i)=>(
                    <span key={i} style={{background:i===0?P.goldDim:"rgba(255,255,255,.06)",color:i===0?P.gold:P.sub,border:`1px solid ${i===0?P.goldBorder:"rgba(255,255,255,.1)"}`,borderRadius:18,padding:"3px 12px",fontSize:10,fontWeight:i===0?600:400}}>{v}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="rl" style={{gap:20,alignItems:"start"}}>
              <div>
                {/* Weather */}
                {weather&&start&&(
                  <div style={{marginBottom:28}} className="pop4">
                    <SHdr icon="🌤" title={t.weatherT} sub={t.weatherSub}/>
                    <div style={{display:"flex",gap:7,overflowX:"auto",paddingBottom:3}}>
                      {weather.temperature_2m_max.slice(0,7).map((maxT,i)=>{
                        const d=new Date(start+"T12:00:00");d.setDate(d.getDate()+i);
                        const rain=weather.precipitation_probability_max[i];
                        return(
                          <div key={i} style={{background:P.card,border:`1px solid ${P.border}`,borderRadius:11,padding:"12px 10px",minWidth:74,textAlign:"center",flexShrink:0}}>
                            <div style={{fontSize:9,color:P.muted,marginBottom:5,fontWeight:600}}>{d.toLocaleDateString(locale||"es-ES",{weekday:"short"})}</div>
                            <div style={{fontSize:26,marginBottom:5}}>{wxI(weather.weathercode[i])}</div>
                            <div style={{fontSize:13,fontWeight:700,color:P.white}}>{Math.round(maxT)}°</div>
                            <div style={{fontSize:10,color:P.muted,marginBottom:5}}>{Math.round(weather.temperature_2m_min[i])}°</div>
                            <div style={{fontSize:9,color:rain>50?P.gold:P.muted}}>💧{rain}%</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Flights */}
                {flights.length>0&&(
                  <div style={{marginBottom:28}} className="pop">
                    <SHdr icon="✈️" title={t.flightsT} sub={t.flightsSub(plan.destination,travelers,origin)}/>
                    {flights.map((fl,i)=>(
                      <div key={i} onClick={()=>setSelF(i)} className="hov" style={{background:selF===i?P.goldDim:"#1C1C1E",border:`1px solid ${selF===i?P.goldBorder:P.border}`,borderRadius:20,padding:"18px 20px",marginBottom:10,cursor:"pointer",transition:"all .2s"}}>
                        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
                          <div style={{display:"flex",alignItems:"center",gap:13}}>
                            <div style={{width:44,height:44,background:selF===i?P.goldDim:P.card3,border:`1px solid ${selF===i?P.goldBorder:P.border}`,borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>✈️</div>
                            <div>
                              <div style={{fontSize:15,fontWeight:700,color:"#fff",marginBottom:2}}>{fl.airline}</div>
                              <div style={{fontSize:12,color:P.muted,marginBottom:3}}>{fl.departure} → {fl.arrival} · {fl.duration}</div>
                              <span style={{background:"rgba(201,169,110,.2)",color:P.gold,borderRadius:7,padding:"2px 9px",fontSize:10,fontWeight:700}}>{fl.stops===0?t.direct:t.stops(fl.stops)}</span>
                            </div>
                          </div>
                          <div style={{textAlign:"right"}}>
                            <div style={{fontSize:24,fontWeight:700,color:selF===i?P.gold:P.white}}>{fl.price}€</div>
                            <div style={{fontSize:10,color:P.muted,marginBottom:7}}>{t.pp}</div>
                            <button onClick={e=>{e.stopPropagation();window.open(`https://www.skyscanner.es/transporte/vuelos/?query=${encodeURIComponent(plan.destination)}`,"_blank");}} style={{background:GOLD_GRAD,color:"#0D0D0D",border:"none",borderRadius:7,padding:"5px 12px",fontSize:11,fontWeight:700,cursor:"pointer"}}>{t.bookFlight}</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Hotels */}
                {hotels.length>0&&(
                  <div style={{marginBottom:28}} className="pop2">
                    <SHdr icon="🏨" title={t.hotelsT} sub={t.hotelsSub(nights)}/>
                    {hotels.map((h,i)=>{
                      const sel=selH===i;
                      return(
                        <div key={i} onClick={()=>setSelH(i)} className="hov" style={{background:sel?P.goldDim:"#1C1C1E",border:`1px solid ${sel?P.goldBorder:P.border}`,borderRadius:20,overflow:"hidden",marginBottom:10,cursor:"pointer",transition:"all .2s"}}>
                          <div style={{display:"flex",height:120}}>
                            <div style={{width:120,flexShrink:0,overflow:"hidden"}}><img src={HOTEL_IMGS[(h._i||0)%HOTEL_IMGS.length]} alt={h.name} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"}/></div>
                            <div style={{flex:1,padding:"13px 15px",display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
                              <div>
                                <div style={{display:"flex",justifyContent:"space-between",gap:7,marginBottom:3}}>
                                  <div style={{fontSize:14,fontWeight:700,color:"#fff",lineHeight:1.2}}>{h.name}</div>
                                  <div style={{textAlign:"right",flexShrink:0}}><div style={{fontSize:19,fontWeight:700,color:sel?P.gold:P.white}}>{h.price_per_night}€</div><div style={{fontSize:9,color:P.muted}}>{t.pn}</div></div>
                                </div>
                                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}><Stars n={h.stars||3} sz={9}/><span style={{fontSize:10,color:P.muted}}>📍 {h.neighborhood}</span></div>
                                <p style={{fontSize:11,color:P.muted,margin:0,lineHeight:1.4,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{h.description}</p>
                              </div>
                              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:5}}>
                                <div style={{display:"flex",gap:7,alignItems:"center"}}>
                                  {h.lat&&h.lng&&<button onClick={e=>{e.stopPropagation();flyTo(h);}} style={{background:"none",border:`1px solid ${P.border2}`,color:P.muted,borderRadius:7,padding:"2px 8px",fontSize:9,cursor:"pointer"}}>{t.mapBtn}</button>}
                                  {nights&&<span style={{fontSize:11,color:sel?P.gold:P.muted,fontWeight:600}}>{h.price_per_night*nights}€</span>}
                                </div>
                                <button onClick={e=>{e.stopPropagation();window.open(`https://www.booking.com/search.html?ss=${encodeURIComponent(h.name+" "+plan.destination)}`,"_blank");}} style={{background:GOLD_GRAD,color:"#0D0D0D",border:"none",borderRadius:7,padding:"4px 11px",fontSize:11,fontWeight:700,cursor:"pointer"}}>{t.bookHotel}</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Map */}
                {leafReady&&places.length>0&&(
                  <div id="mapsec" style={{marginBottom:28}} className="pop3">
                    <SHdr icon="🗺️" title={t.mapT} sub={t.mapSub}/>
                    <TravelMap places={places} active={activeMap} onSelect={setActiveMap} userPos={userPos}/>
                  </div>
                )}

                {/* Restaurants */}
                {rests.length>0&&(
                  <div style={{marginBottom:28}} className="pop4">
                    <SHdr icon="🍽️" title={t.restsT} sub={t.restsSub}/>
                    <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                      {rests.map((r,i)=>(
                        <div key={i} className="hov" style={{background:"#1C1C1E",border:`1px solid ${P.border}`,borderRadius:18,overflow:"hidden",flex:"1 1 180px",minWidth:0,transition:"all .25s"}}>
                          <div style={{height:110,overflow:"hidden",position:"relative"}}>
                            <img src={REST_IMGS[i%REST_IMGS.length]} alt={r.name} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"}/>
                            <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.7),transparent)"}}/>
                            {r.price_range&&<div style={{position:"absolute",top:7,right:7,background:"rgba(0,0,0,.65)",color:"#fff",borderRadius:7,padding:"2px 7px",fontSize:9,fontWeight:700}}>{r.price_range}</div>}
                          </div>
                          <div style={{padding:"11px 13px"}}>
                            <div style={{fontSize:12,fontWeight:700,color:"#fff",marginBottom:3}}>{r.name}</div>
                            <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:7}}><Stars n={r.rating||4} sz={9}/><span style={{fontSize:9,color:P.muted}}>{r.cuisine}</span></div>
                            <button onClick={()=>window.open(`https://www.google.com/search?q=${encodeURIComponent(r.name+" "+plan.destination+" reservar")}`,"_blank")} style={{background:GOLD_GRAD,color:"#0D0D0D",border:"none",borderRadius:7,padding:"5px 10px",fontSize:10,fontWeight:700,cursor:"pointer",width:"100%"}}>{t.bookRest}</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tours */}
                <div style={{marginBottom:28}} className="pop">
                  <SHdr icon="🎟️" title="Tours & Actividades" sub="Experiencias únicas en destino"/>
                  <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                    {["Visita guiada","Tour gastronómico","Excursión de día","Experiencia local","Aventura"].map((tour,i)=>(
                      <button key={i} onClick={()=>window.open(`https://www.getyourguide.es/s/?q=${encodeURIComponent((plan.destination||"")+" "+tour)}`,"_blank")}
                        style={{background:P.card,border:`1px solid ${P.border}`,borderRadius:12,padding:"12px 14px",cursor:"pointer",textAlign:"left",flex:"1 1 150px",transition:"all .2s"}}
                        onMouseEnter={e=>{e.currentTarget.style.borderColor=P.gold;e.currentTarget.style.transform="translateY(-2px)";}}
                        onMouseLeave={e=>{e.currentTarget.style.borderColor=P.border;e.currentTarget.style.transform="none";}}>
                        <div style={{fontSize:18,marginBottom:5}}>{"🗺️🍽️🚌🤝🏔️"[i]}</div>
                        <div style={{fontSize:12,fontWeight:600,color:"#fff",marginBottom:3}}>{tour}</div>
                        <div style={{fontSize:10,color:P.gold,fontWeight:600}}>Ver tours ↗</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Transport */}
                <div style={{marginBottom:28}} className="pop">
                  <SHdr icon="🚗" title={t.transportT} sub={t.transportSub}/>
                  <div style={{display:"flex",gap:9,flexWrap:"wrap"}}>
                    {[
                      {name:"Uber",icon:"🚗",url:`https://m.uber.com/ul/?dropoff[formatted_address]=${encodeURIComponent(plan.destination)}`},
                      {name:"Cabify",icon:"🟣",url:"https://cabify.com/"},
                      {name:"Metro",icon:"🚇",url:`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(plan.destination)}&travelmode=transit`},
                      {name:"Bike",icon:"🚲",url:`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(plan.destination)}&travelmode=bicycling`},
                    ].map(lk=>(
                      <a key={lk.name} href={lk.url} target="_blank" rel="noopener noreferrer" style={{background:"#1C1C1E",border:`1px solid ${P.border}`,borderRadius:14,padding:"12px 15px",textDecoration:"none",display:"flex",alignItems:"center",gap:10,flex:"1 1 130px",transition:"all .2s"}}
                        onMouseEnter={e=>{e.currentTarget.style.borderColor=P.goldBorder;e.currentTarget.style.transform="translateY(-2px)";}}
                        onMouseLeave={e=>{e.currentTarget.style.borderColor=P.border;e.currentTarget.style.transform="none";}}>
                        <span style={{fontSize:20}}>{lk.icon}</span>
                        <span style={{fontSize:13,fontWeight:700,color:"#fff"}}>{lk.name}</span>
                        <span style={{marginLeft:"auto",color:P.muted,fontSize:12}}>↗</span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Itinerary */}
                {plan.itinerary?.length>0&&(
                  <div style={{marginBottom:28}} className="pop">
                    <SHdr icon="📅" title={t.itinT} sub={t.itinSub}/>
                    {plan.itinerary.map((day,i)=><DayCard key={i} day={day} i={i} t={t}/>)}
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div style={{position:"sticky",top:70}}>
                {/* Package summary */}
                {(fSel||hSel)&&(
                  <div style={{background:"#1E1E20",borderRadius:20,padding:20,boxShadow:"0 12px 40px rgba(0,0,0,.5)",border:"0.5px solid rgba(255,255,255,.07)",marginBottom:14}}>
                    <div style={{fontSize:14,fontWeight:900,marginBottom:14,color:"#fff"}}>{t.pkgT}</div>
                    {fSel&&<div style={{display:"flex",justifyContent:"space-between",marginBottom:9,fontSize:12}}><span style={{color:P.sub}}>✈️ {fSel.airline} × {travelers}</span><span style={{fontWeight:700,color:"#fff"}}>{fSel.price*travelers}€</span></div>}
                    {hSel&&nights&&<div style={{display:"flex",justifyContent:"space-between",marginBottom:9,fontSize:12}}><span style={{color:P.sub}}>🏨 {hSel.name} × {nights}n</span><span style={{fontWeight:700,color:"#fff"}}>{hSel.price_per_night*nights}€</span></div>}
                    <div style={{height:"0.5px",background:"rgba(255,255,255,.07)",margin:"11px 0"}}/>
                    {(()=>{const fT=fSel?fSel.price*travelers:0;const hT=hSel?hSel.price_per_night*nights:0;const tax=Math.round((fT+hT)*.10);const total=fT+hT+tax;return(<>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:9,fontSize:12}}><span style={{color:P.muted}}>🧾 {t.taxes}</span><span style={{fontWeight:700,color:P.muted}}>{tax}€</span></div>
                      <div style={{background:P.goldDim,borderRadius:11,padding:"12px 14px",margin:"12px 0 14px",border:`1px solid ${P.goldBorder}`}}>
                        <div style={{fontSize:9,fontWeight:600,color:P.gold,textTransform:"uppercase",letterSpacing:".1em",marginBottom:3}}>{t.totalL}</div>
                        <span style={{fontSize:28,fontWeight:700,color:P.gold}}>{total}€</span>
                      </div>
                      <button onClick={()=>setBookingOpen(true)} style={{width:"100%",padding:"13px",background:GOLD_GRAD,color:"#0D0D0D",border:"none",borderRadius:11,fontSize:13,fontWeight:800,cursor:"pointer",fontFamily:"-apple-system,sans-serif",marginBottom:7}}>{t.bookBtn}</button>
                      <div style={{fontSize:9,color:"#48484A",textAlign:"center",marginBottom:10}}>{t.demoSmall}</div>
                      <div style={{display:"flex",gap:7}}>
                        <button onClick={()=>window.open(`https://www.skyscanner.es/transporte/vuelos/?query=${encodeURIComponent(plan.destination)}`,"_blank")} style={{flex:1,padding:"9px",background:"transparent",color:P.gold,border:`1px solid ${P.goldBorder}`,borderRadius:9,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"-apple-system,sans-serif"}}>✈️ Solo vuelo</button>
                        <button onClick={()=>window.open(`https://www.booking.com/search.html?ss=${encodeURIComponent(plan.destination)}`,"_blank")} style={{flex:1,padding:"9px",background:"transparent",color:P.gold,border:`1px solid ${P.goldBorder}`,borderRadius:9,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"-apple-system,sans-serif"}}>🏨 Solo hotel</button>
                      </div>
                    </>);})()}
                  </div>
                )}

                {/* Tips */}
                {plan.tips?.length>0&&(
                  <div style={{background:P.card,borderRadius:14,padding:"16px",marginBottom:14,border:`1px solid ${P.border}`}}>
                    <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:11}}>
                      <div style={{width:26,height:26,background:P.goldDim,border:`1px solid ${P.goldBorder}`,borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>💡</div>
                      <span style={{fontSize:13,fontWeight:800}}>{t.tipsT}</span>
                    </div>
                    {plan.tips.slice(0,4).map((tip,i)=>(
                      <div key={i} style={{display:"flex",gap:7,marginBottom:9}}>
                        <span style={{width:5,height:5,background:P.gold,borderRadius:"50%",flexShrink:0,marginTop:5}}/>
                        <p style={{margin:0,fontSize:11,color:P.muted,lineHeight:1.6}}>{tip}</p>
                      </div>
                    ))}
                  </div>
                )}

                <AffiliatePanel t={t}/>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
