import{useState,useEffect,useRef}from"react";
import{supabase}from"./supabase.js";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const GOLD="linear-gradient(135deg,#C9A96E,#E8C98A)";
const VOICE="yiWEefwu5z3DQCM79clN";
const C={black:"#0D0D0D",card:"#141414",card2:"#1A1A1A",card3:"#252525",border:"#2A2A2A",border2:"#333",muted:"#6B6B6B",sub:"#A0A0A0",white:"#FFF",gold:"#C9A96E",goldDim:"rgba(201,169,110,.18)",goldBorder:"rgba(201,169,110,.25)"};
const HOTEL_IMGS=["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=70","https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&q=70","https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=70","https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&q=70","https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&q=70"];
const REST_IMGS=["https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=70","https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=70","https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&q=70","https://images.unsplash.com/photo-1544148103-0773bf10d330?w=400&q=70","https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=70"];
const DEST_IMGS={default:"https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=900&q=80",tokyo:"https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=900&q=80",rome:"https://images.unsplash.com/photo-1529260830199-42c24126f198?w=900&q=80",paris:"https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=900&q=80",bangkok:"https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=900&q=80",bali:"https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&q=80",london:"https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=900&q=80",berlin:"https://images.unsplash.com/photo-1560969184-10fe8719e047?w=900&q=80",dubai:"https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&q=80",buenos:"https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=900&q=80",barcelona:"https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=900&q=80"};
const TRIPS={adventure:"🏔️",culture:"🏛️",beach:"🏖️",gastro:"🍜",nature:"🌿",city:"🏙️",wellness:"🧘",nightlife:"🎉",retreat:"🌀"};
const STYLES={backpacker:{icon:"🎒",pct:.15},comfort:{icon:"🛎️",pct:.35},luxury:{icon:"💎",pct:.60}};
const CITIES=["Bangkok","Madrid","Roma","Paris","Tokyo","Barcelona","London","Berlin","Amsterdam","Lisboa","Dubai","Singapore","Buenos Aires","Istanbul","Athens","Prague","Vienna","Budapest","Bali","Hong Kong","Seoul","Sydney","Cape Town","Cairo","Mumbai","Rio de Janeiro","Mexico City","New York","Toronto","Vancouver"];
const T={
  es:{flag:"🇪🇸",name:"Español",lp:"Responde en español.",h1:"Tu próximo viaje,",h2:"en un clic.",sub:"Elige tu estilo, destino y presupuesto.",tripType:"¿Qué tipo de viaje?",pickOne:"Elige uno o varios",styleQ:"¿Cómo prefieres viajar?",originL:"Origen",destL:"Destino",budgetL:"Presupuesto (€)",originPh:"Madrid, España",destPh:"Tokio, París, Bangkok...",budgetPh:"1000",arrival:"Llegada",departure:"Salida",travelersL:"Viajeros",t1:"1 viajero",tN:n=>`${n} viajeros`,searchBtn:"Buscar mi viaje ✦",nextBtn:"Siguiente →",backBtn:"← Atrás",loadTitle:"Preparando tu aventura…",loadSub:"Buscando las mejores opciones",loadWait:"Puede tardar hasta 1 minuto...",newSearch:"Nueva búsqueda",loginBtn:"Entrar",logoutBtn:"Salir",saveBtn:"🔖 Guardar",savedOk:"¡Guardado!",myTrips:"📚 Mis viajes",noTrips:"No tienes viajes guardados",shareBtn:"Compartir",shareCopied:"¡Copiado!",exploreBtn:"🔍 Explorar ciudad",exploreTitle:"Explorar ciudad o monumento",exploreSub:"Sofia te cuenta la historia de cada lugar",explorePh:"Bangkok, Roma, Madrid...",exploreSearch:"Buscar",exploreLoading:"Buscando lugares...",exploreEmpty:"¿Dónde estás hoy?",exploreTip:"Escribe tu ciudad y Sofia te guiará",activateGPS:"📍 GPS",showMap:"🗺️ Mapa",audioguide:"🎧 Audioguía",startGuide:"▶️ Iniciar",stopGuide:"⏹ Detener",sofiaSpeaking:"Sofia está hablando...",sofiaWalking:"Caminando... Sofia te avisará",sofiaPut:"Ponte los auriculares y pulsa Iniciar",flightsT:"Vuelos",hotelsT:"Hoteles",restsT:"Dónde comer",mapT:"Mapa",toursT:"Tours",transportT:"Transporte",itinT:"Itinerario",tipsT:"Tips",weatherT:"Clima",bookFlight:"✈️ Vuelo",bookHotel:"🏨 Hotel",bookRest:"🍽️ Mesa",bookTour:"🎟️ Tours",bookPkg:"🔒 Reservar paquete",onlyFlight:"Solo vuelo",onlyHotel:"Solo hotel",pkgTitle:"Resumen",total:"Total estimado",taxes:"Tasas",step1:"Creando itinerario",step2:"Vuelos",step3:"Hoteles",step4:"Restaurantes",step5:"Clima",step6:"¡Listo!",direct:"✈ Directo",stops:n=>`${n} escala${n>1?"s":""}`,pp:"por persona",pn:"/ noche",days:n=>`${n} días`,morning:"☀️ Mañana",afternoon:"🌤 Tarde",evening:"🌙 Noche",transport:"🚇 Transporte",tripNames:{adventure:"Aventura",culture:"Cultura",beach:"Playa",gastro:"Gastronomía",nature:"Naturaleza",city:"Ciudad",wellness:"Bienestar",nightlife:"Vida Nocturna",retreat:"Retiro"},styleNames:{backpacker:"Mochilero",comfort:"Confort",luxury:"Lujo"},styleDesc:{backpacker:"Hostels 1★, auténtico",comfort:"Hoteles 2-3★, equilibrio",luxury:"Hoteles 4-5★, VIP"},bookStep1:"Paso 1: Vuelo",bookStep2:"Paso 2: Hotel",bookHint1:"Abre Skyscanner, reserva el vuelo y vuelve aquí.",bookHint2:"Abre Booking, reserva el hotel. ¡Listo!",goSky:"Ir a Skyscanner →",goBook:"Ir a Booking →",pkgDone:"¡Paquete completo!",pkgBooked:"Vuelo + Hotel reservados",close:"Cerrar",cancel:"Cancelar",guideHi:"¡Hola! Soy Marco, tu guía. ¿En qué te ayudo?",guidePh:"Pregúntame algo...",errorMsg:"Error al generar. Inténtalo de nuevo."},
  en:{flag:"🇬🇧",name:"English",lp:"Respond in English.",h1:"Your next trip,",h2:"in one click.",sub:"Choose your style, destination and budget.",tripType:"What kind of trip?",pickOne:"Choose one or more",styleQ:"How do you travel?",originL:"Origin",destL:"Destination",budgetL:"Budget (€)",originPh:"London, UK",destPh:"Tokyo, Paris, Bangkok...",budgetPh:"1000",arrival:"Check-in",departure:"Check-out",travelersL:"Travelers",t1:"1 traveler",tN:n=>`${n} travelers`,searchBtn:"Find my trip ✦",nextBtn:"Next →",backBtn:"← Back",loadTitle:"Preparing your adventure…",loadSub:"Searching best options",loadWait:"This may take up to 1 minute...",newSearch:"New search",loginBtn:"Sign in",logoutBtn:"Sign out",saveBtn:"🔖 Save",savedOk:"Saved!",myTrips:"📚 My trips",noTrips:"No saved trips",shareBtn:"Share",shareCopied:"Copied!",exploreBtn:"🔍 Explore city",exploreTitle:"Explore city or monument",exploreSub:"Sofia tells you the history of each place",explorePh:"Bangkok, Rome, Madrid...",exploreSearch:"Search",exploreLoading:"Searching places...",exploreEmpty:"Where are you today?",exploreTip:"Type your city and Sofia will guide you",activateGPS:"📍 GPS",showMap:"🗺️ Map",audioguide:"🎧 Audio guide",startGuide:"▶️ Start",stopGuide:"⏹ Stop",sofiaSpeaking:"Sofia is speaking...",sofiaWalking:"Walking... Sofia will notify you",sofiaPut:"Put on earphones and press Start",flightsT:"Flights",hotelsT:"Hotels",restsT:"Where to eat",mapT:"Map",toursT:"Tours",transportT:"Transport",itinT:"Itinerary",tipsT:"Tips",weatherT:"Weather",bookFlight:"✈️ Flight",bookHotel:"🏨 Hotel",bookRest:"🍽️ Table",bookTour:"🎟️ Tours",bookPkg:"🔒 Book package",onlyFlight:"Flight only",onlyHotel:"Hotel only",pkgTitle:"Summary",total:"Estimated total",taxes:"Taxes",step1:"Creating itinerary",step2:"Flights",step3:"Hotels",step4:"Restaurants",step5:"Weather",step6:"All ready!",direct:"✈ Direct",stops:n=>`${n} stop${n>1?"s":""}`,pp:"per person",pn:"/ night",days:n=>`${n} days`,morning:"☀️ Morning",afternoon:"🌤 Afternoon",evening:"🌙 Evening",transport:"🚇 Transport",tripNames:{adventure:"Adventure",culture:"Culture",beach:"Beach",gastro:"Gastronomy",nature:"Nature",city:"City Break",wellness:"Wellness",nightlife:"Nightlife",retreat:"Retreat"},styleNames:{backpacker:"Backpacker",comfort:"Comfort",luxury:"Luxury"},styleDesc:{backpacker:"Hostels 1★, authentic",comfort:"2-3★ hotels, value",luxury:"4-5★ hotels, VIP"},bookStep1:"Step 1: Book flight",bookStep2:"Step 2: Book hotel",bookHint1:"Open Skyscanner, book the flight and come back.",bookHint2:"Open Booking, book the hotel. Done!",goSky:"Go to Skyscanner →",goBook:"Go to Booking →",pkgDone:"Package complete!",pkgBooked:"Flight + Hotel booked",close:"Close",cancel:"Cancel",guideHi:"Hi! I'm Marco, your guide. How can I help?",guidePh:"Ask me anything...",errorMsg:"Error generating. Please try again."},
};

// ─── UTILS ────────────────────────────────────────────────────────────────────
const getImg=d=>{const k=d?.toLowerCase()||"";for(const[n,v]of Object.entries(DEST_IMGS))if(k.includes(n))return v;return DEST_IMGS.default;};
const diffDays=(a,b)=>(!a||!b)?null:Math.round((new Date(b+"T12:00:00")-new Date(a+"T12:00:00"))/86400000)+1;
const fmtD=(s,o,lc)=>!s?"":new Date(s+"T12:00:00").toLocaleDateString(lc||"es-ES",o||{day:"numeric",month:"short"});
const hav=(a,b,c,d)=>{const R=6371e3,p=Math.PI/180,x=Math.sin((c-a)*p/2)**2+Math.cos(a*p)*Math.cos(c*p)*Math.sin((d-b)*p/2)**2;return R*2*Math.atan2(Math.sqrt(x),Math.sqrt(1-x));};
const getBearing=(a,b,c,d)=>{const p=Math.PI/180,y=Math.sin((d-b)*p)*Math.cos(c*p),x=Math.cos(a*p)*Math.sin(c*p)-Math.sin(a*p)*Math.cos(c*p)*Math.cos((d-b)*p);return((Math.atan2(y,x)/p)+360)%360;};
const getDirES=br=>{const d=["norte","noreste","este","sureste","sur","suroeste","oeste","noroeste"];return d[Math.round(br/45)%8];};
const WX={0:"☀️",1:"🌤",2:"⛅",3:"☁️",45:"🌫",51:"🌦",61:"🌧",71:"❄️",80:"🌦",95:"⛈"};

// Parse JSON safely - handles backticks and partial responses
function safeJSON(raw){
  if(!raw)return null;
  // Remove markdown code fences
  let s=raw.trim().replace(/^```(?:json)?\s*/i,"").replace(/\s*```\s*$/,"").trim();
  // Try direct parse
  try{const r=JSON.parse(s);return r;}catch{}
  // Find array
  const ai=s.indexOf("["),aj=s.lastIndexOf("]");
  if(ai>=0&&aj>ai){try{return JSON.parse(s.slice(ai,aj+1));}catch{}}
  // Find object
  const oi=s.indexOf("{"),oj=s.lastIndexOf("}");
  if(oi>=0&&oj>oi){try{return JSON.parse(s.slice(oi,oj+1));}catch{}}
  return null;
}

// AI call
async function ai(system,user,tokens=1000){
  const r=await fetch("/api/anthropic",{method:"POST",headers:{"Content-Type":"application/json","anthropic-version":"2023-06-01"},body:JSON.stringify({model:"claude-haiku-4-5-20251001",max_tokens:tokens,system,messages:[{role:"user",content:user}]})});
  const d=await r.json();
  if(d.error)throw new Error(d.error.message||"API error");
  return(d.content||[]).map(b=>b.text||"").join("").trim();
}

// Voice
async function speak(text){
  try{
    const r=await fetch("/api/elevenlabs",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text,voiceId:VOICE})});
    if(!r.ok)return null;
    const blob=await r.blob();
    const url=URL.createObjectURL(blob);
    const a=new Audio(url);
    a.play();
    return a;
  }catch{return null;}
}

// Weather
async function fetchWeather(lat,lon,date){
  try{const r=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weathercode&timezone=auto&start_date=${date}&forecast_days=7`);const d=await r.json();return d.daily;}catch{return null;}
}

// Leaflet hook
function useLeaflet(){
  const[ok,setOk]=useState(!!window.L);
  useEffect(()=>{if(window.L){setOk(true);return;}
    const css=document.createElement("link");css.rel="stylesheet";css.href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";document.head.appendChild(css);
    const js=document.createElement("script");js.src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";js.onload=()=>setOk(true);document.head.appendChild(js);
  },[]);return ok;
}

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function Logo({size=32}){return<svg width={size} height={size} viewBox="0 0 100 100" fill="none" style={{flexShrink:0,filter:`drop-shadow(0 ${size*.05}px ${size*.15}px rgba(201,169,110,.4))`}}><defs><linearGradient id="lg" x1="15%" y1="15%" x2="85%" y2="85%"><stop offset="0%" stopColor="#E8C98A"/><stop offset="100%" stopColor="#B8935A"/></linearGradient></defs><circle cx="50" cy="50" r="45" stroke="url(#lg)" strokeWidth="2.5" opacity=".6"/><path d="M24 72L68 20L76 54Z" fill="url(#lg)" opacity=".95"/><path d="M24 72L76 54L52 68Z" fill="#B8935A" opacity=".7"/></svg>;}

function Spin({size=18,color="#C9A96E"}){return<div style={{width:size,height:size,border:`2.5px solid rgba(255,255,255,.1)`,borderTop:`2.5px solid ${color}`,borderRadius:"50%",animation:"spin .7s linear infinite",flexShrink:0}}/>;}

function Stars({n=4,sz=10}){return<span>{[1,2,3,4,5].map(i=><span key={i} style={{color:i<=n?C.gold:C.border2,fontSize:sz}}>★</span>)}</span>;}

function SHdr({icon,title,sub}){return<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:13}}><div style={{width:34,height:34,background:C.card3,border:`1px solid ${C.border2}`,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,flexShrink:0}}>{icon}</div><div><div style={{fontSize:15,fontWeight:700,color:C.white}}>{title}</div>{sub&&<div style={{fontSize:11,color:"rgba(235,235,245,.4)",marginTop:1}}>{sub}</div>}</div></div>;}

function Sk({w="100%",h=14,r=8}){return<div style={{width:w,height:h,borderRadius:r,background:`linear-gradient(90deg,${C.card2} 25%,${C.card3} 50%,${C.card2} 75%)`,backgroundSize:"200% 100%",animation:"shimmer 1.4s infinite"}}/>;}

function WikiImg({name}){
  const[src,setSrc]=useState(null);
  useEffect(()=>{
    fetch("https://en.wikipedia.org/w/api.php?action=query&titles="+encodeURIComponent(name)+"&prop=pageimages&format=json&pithumbsize=400&origin=*")
      .then(r=>r.json()).then(d=>{const pages=d?.query?.pages;if(pages){const p=Object.values(pages)[0];if(p?.thumbnail?.source)setSrc(p.thumbnail.source);}}).catch(()=>{});
  },[name]);
  return src?<img src={src} alt={name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<div style={{width:"100%",height:"100%",background:C.card3,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>🏛️</div>;
}

function TravelMap({places,active,onSelect,userPos,height=300}){
  const nRef=useRef(null),lRef=useRef(null),mRef=useRef([]),uRef=useRef(null);
  useEffect(()=>{if(!nRef.current||lRef.current)return;const L=window.L;if(!L)return;const map=L.map(nRef.current,{zoomControl:false,attributionControl:false});L.control.zoom({position:"bottomright"}).addTo(map);L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",{maxZoom:19}).addTo(map);lRef.current=map;return()=>{map.remove();lRef.current=null;};},[]);
  useEffect(()=>{const L=window.L,map=lRef.current;if(!L||!map||!places?.length)return;mRef.current.forEach(m=>m.remove());mRef.current=[];const bounds=[];places.forEach((p,i)=>{if(!p.lat||!p.lng)return;const isA=active===i,sz=isA?42:32,em=p.type==="hotel"?"🏨":p.type==="restaurant"?"🍽️":"◆";const html=`<div style="width:${sz}px;height:${sz}px;background:${isA?C.gold:"#2C2C2E"};border:2px solid ${C.gold};border-radius:${p.type==="hotel"?"10px":"50%"};display:flex;align-items:center;justify-content:center;font-size:${isA?16:12}px;cursor:pointer">${isA?em:i+1}</div>`;const icon=L.divIcon({className:"",html,iconSize:[sz,sz],iconAnchor:[sz/2,sz/2]});const mk=L.marker([p.lat,p.lng],{icon}).addTo(map).bindPopup(`<b>${p.name}</b>${p.description?`<br><small>${p.description.slice(0,70)}</small>`:""}`).on("click",()=>onSelect(i));mRef.current.push(mk);bounds.push([p.lat,p.lng]);});if(bounds.length)map.fitBounds(bounds,{padding:[40,40],maxZoom:14});},[places]);
  useEffect(()=>{const map=lRef.current;if(!map||active==null||!places?.[active])return;const p=places[active];if(p.lat&&p.lng){map.flyTo([p.lat,p.lng],15);mRef.current[active]?.openPopup();}},[active]);
  useEffect(()=>{const L=window.L,map=lRef.current;if(!L||!map||!userPos)return;if(uRef.current)uRef.current.remove();const html=`<div style="width:14px;height:14px;background:#3B82F6;border:3px solid #fff;border-radius:50%;box-shadow:0 0 0 5px rgba(59,130,246,.3)"></div>`;const icon=L.divIcon({className:"",html,iconSize:[14,14],iconAnchor:[7,7]});uRef.current=L.marker([userPos.lat,userPos.lng],{icon}).addTo(map);},[userPos]);
  return<div ref={nRef} style={{height,borderRadius:14,overflow:"hidden"}}/>;
}

function DayCard({day,i,t}){
  const[open,setOpen]=useState(i===0);
  const title=day.day?.replace(/^(Día|Day)\s*\d+\s*[-–]\s*/,"")||day.title||`Día ${i+1}`;
  return<div style={{background:"#1C1C1E",border:`1px solid ${open?C.goldBorder:C.border}`,borderRadius:14,marginBottom:7,overflow:"hidden"}}>
    <button onClick={()=>setOpen(!open)} style={{width:"100%",background:"none",border:"none",padding:"12px 15px",cursor:"pointer",display:"flex",alignItems:"center",gap:10}}>
      <div style={{width:30,height:30,background:open?C.goldDim:C.card3,border:`1px solid ${open?C.goldBorder:C.border}`,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:900,color:open?C.gold:C.muted,flexShrink:0}}>{i+1}</div>
      <div style={{flex:1,textAlign:"left"}}><div style={{fontSize:13,fontWeight:700,color:"#fff"}}>{title}</div>{day.theme&&<div style={{fontSize:10,color:C.muted,marginTop:1}}>{day.theme}</div>}</div>
      <span style={{color:C.muted,fontSize:15,transform:open?"rotate(90deg)":"none",transition:".2s"}}>›</span>
    </button>
    {open&&<div style={{padding:"2px 15px 15px",borderTop:"0.5px solid rgba(255,255,255,.06)"}}>
      {[{k:"morning",l:t.morning},{k:"afternoon",l:t.afternoon},{k:"evening",l:t.evening},{k:"transport",l:t.transport}].map(({k,l})=>day[k]&&<div key={k} style={{marginTop:10}}><div style={{fontSize:9,fontWeight:700,color:C.gold,textTransform:"uppercase",letterSpacing:".06em",marginBottom:3}}>{l}</div><p style={{margin:0,fontSize:12,color:"rgba(255,255,255,.7)",lineHeight:1.65}}>{day[k]}</p></div>)}
    </div>}
  </div>;
}

function LangSel({lang,setLang}){
  const[open,setOpen]=useState(false);
  return<div style={{position:"relative"}}><button onClick={()=>setOpen(!open)} style={{background:"#2C2C2E",border:"0.5px solid #3A3A3C",borderRadius:8,padding:"5px 10px",display:"flex",alignItems:"center",gap:5,cursor:"pointer",color:"#fff",fontSize:11,fontWeight:600,fontFamily:"-apple-system,sans-serif"}}><span style={{fontSize:13}}>{T[lang].flag}</span><span>{lang.toUpperCase()}</span><span style={{fontSize:8,color:C.muted}}>▾</span></button>
  {open&&<div style={{position:"absolute",right:0,top:"calc(100% + 5px)",background:"#1C1C1E",border:`0.5px solid ${C.border2}`,borderRadius:10,overflow:"hidden",zIndex:999,boxShadow:"0 12px 40px rgba(0,0,0,.7)",minWidth:120}}>{Object.entries(T).map(([k,l])=><button key={k} onClick={()=>{setLang(k);setOpen(false);}} style={{width:"100%",background:lang===k?"#2C2C2E":"transparent",border:"none",padding:"8px 12px",display:"flex",alignItems:"center",gap:7,cursor:"pointer",color:lang===k?C.gold:"#fff",fontSize:12,fontFamily:"-apple-system,sans-serif",fontWeight:lang===k?700:400,textAlign:"left"}}><span style={{fontSize:15}}>{l.flag}</span><span>{l.name}</span>{lang===k&&<span style={{marginLeft:"auto",fontSize:10}}>✓</span>}</button>)}</div>}
  </div>;
}

function AuthModal({onClose,onAuth}){
  const[mode,setMode]=useState("login");
  const[email,setEmail]=useState("");
  const[pw,setPw]=useState("");
  const[load,setLoad]=useState(false);
  const[err,setErr]=useState(null);
  const[msg,setMsg]=useState(null);
  const inp={width:"100%",padding:"11px 13px",border:"1.5px solid #3A3A3C",borderRadius:10,fontSize:13,fontFamily:"-apple-system,sans-serif",color:"#fff",background:"#2C2C2E",boxSizing:"border-box",outline:"none"};
  async function submit(){
    setLoad(true);setErr(null);setMsg(null);
    try{
      if(mode==="reg"){const{error:e}=await supabase.auth.signUp({email,password:pw});if(e)throw e;setMsg("Cuenta creada. Revisa tu email.");}
      else{const{data,error:e}=await supabase.auth.signInWithPassword({email,password:pw});if(e)throw e;onAuth(data.user);onClose();}
    }catch(e){setErr(e.message);}
    setLoad(false);
  }
  return<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.75)",zIndex:1000,display:"flex",alignItems:"flex-end",justifyContent:"center",backdropFilter:"blur(12px)"}} onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
    <div style={{background:"#1C1C1E",borderRadius:"24px 24px 0 0",width:"100%",maxWidth:440,padding:"20px 22px 44px"}}>
      <div style={{width:34,height:4,background:"#3A3A3C",borderRadius:2,margin:"0 auto 18px"}}/>
      <div style={{fontSize:19,fontWeight:900,color:"#fff",marginBottom:3}}>{mode==="login"?"Bienvenido de nuevo":"Crea tu cuenta"}</div>
      <p style={{fontSize:12,color:C.muted,marginBottom:16}}>Guarda y accede a tus viajes</p>
      <button onClick={()=>supabase.auth.signInWithOAuth({provider:"google",options:{redirectTo:window.location.origin}})} style={{width:"100%",background:"#2C2C2E",border:"1.5px solid #3A3A3C",borderRadius:10,padding:"11px",color:"#fff",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"-apple-system,sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:12}}>🔍 Continuar con Google</button>
      <div style={{display:"flex",alignItems:"center",gap:8,margin:"11px 0"}}><div style={{flex:1,height:"0.5px",background:"#3A3A3C"}}/><span style={{fontSize:10,color:C.muted}}>o con email</span><div style={{flex:1,height:"0.5px",background:"#3A3A3C"}}/></div>
      <div style={{marginBottom:8}}><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="tu@email.com" type="email" style={inp} onFocus={e=>e.target.style.borderColor=C.gold} onBlur={e=>e.target.style.borderColor="#3A3A3C"}/></div>
      <div style={{marginBottom:14}}><input value={pw} onChange={e=>setPw(e.target.value)} placeholder="Contraseña" type="password" style={inp} onFocus={e=>e.target.style.borderColor=C.gold} onBlur={e=>e.target.style.borderColor="#3A3A3C"} onKeyDown={e=>e.key==="Enter"&&submit()}/></div>
      {err&&<div style={{background:"rgba(224,90,78,.12)",border:"1px solid rgba(224,90,78,.3)",borderRadius:8,padding:"8px 12px",fontSize:11,color:"#E05A4E",marginBottom:10}}>{err}</div>}
      {msg&&<div style={{background:"rgba(201,169,110,.12)",border:`1px solid ${C.goldBorder}`,borderRadius:8,padding:"8px 12px",fontSize:11,color:C.gold,marginBottom:10}}>{msg}</div>}
      <button onClick={submit} disabled={load||!email||!pw} style={{width:"100%",padding:"13px",background:GOLD,color:"#0D0D0D",border:"none",borderRadius:10,fontSize:14,fontWeight:800,cursor:"pointer",fontFamily:"-apple-system,sans-serif",marginBottom:9,opacity:(!email||!pw)?.4:1}}>{load?"...":(mode==="login"?"Iniciar sesión":"Crear cuenta")}</button>
      <button onClick={()=>{setMode(m=>m==="login"?"reg":"login");setErr(null);setMsg(null);}} style={{width:"100%",background:"none",border:"none",color:C.muted,fontSize:12,cursor:"pointer",fontFamily:"-apple-system,sans-serif"}}>{mode==="login"?"¿No tienes cuenta? Regístrate":"¿Ya tienes? Inicia sesión"}</button>
    </div>
  </div>;
}

function BookingFlow({flight,hotel,dest,travelers,nights,t,onClose}){
  const[step,setStep]=useState(0);
  const fT=flight?flight.price*travelers:0;
  const hT=hotel?hotel.price_per_night*nights:0;
  const total=fT+hT+Math.round((fT+hT)*.10);
  const steps=[{title:t.bookStep1,hint:t.bookHint1,url:`https://www.skyscanner.es/transporte/vuelos/?query=${encodeURIComponent(dest||"")}`,btn:t.goSky,sub:flight?`${flight.airline} · ${fT}€`:""},
    {title:t.bookStep2,hint:t.bookHint2,url:`https://www.booking.com/search.html?ss=${encodeURIComponent((hotel?.name||"")+" "+dest)}`,btn:t.goBook,sub:hotel?`${hotel.name} · ${hT}€`:""}];
  return<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.8)",zIndex:1000,display:"flex",alignItems:"flex-end",justifyContent:"center",backdropFilter:"blur(12px)"}} onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
    <div style={{background:"#1C1C1E",borderRadius:"22px 22px 0 0",width:"100%",maxWidth:460,padding:"18px 20px 44px"}}>
      <div style={{width:34,height:4,background:"#3A3A3C",borderRadius:2,margin:"0 auto 16px"}}/>
      {step<2?<>
        <div style={{display:"flex",gap:6,marginBottom:16}}>{[0,1].map(s=><div key={s} style={{flex:1,height:4,borderRadius:2,background:s<=step?C.gold:C.border,transition:"all .3s"}}/>)}</div>
        <div style={{fontSize:18,fontWeight:900,color:"#fff",marginBottom:4}}>{steps[step].title}</div>
        <div style={{fontSize:12,color:C.sub,marginBottom:16}}>{steps[step].sub}</div>
        <div style={{background:"rgba(201,169,110,.1)",border:`1px solid ${C.goldBorder}`,borderRadius:11,padding:"13px 15px",marginBottom:16}}><div style={{fontSize:10,color:C.gold,marginBottom:2}}>💡 Cómo funciona</div><div style={{fontSize:12,color:"#fff",lineHeight:1.6}}>{steps[step].hint}</div></div>
        <button onClick={()=>{window.open(steps[step].url,"_blank");setStep(step+1);}} style={{width:"100%",padding:"13px",background:GOLD,color:"#0D0D0D",border:"none",borderRadius:11,fontSize:13,fontWeight:800,cursor:"pointer",fontFamily:"-apple-system,sans-serif",marginBottom:8}}>{steps[step].btn}</button>
        <button onClick={onClose} style={{width:"100%",padding:"10px",background:"transparent",color:C.muted,border:`1px solid ${C.border}`,borderRadius:11,fontSize:12,cursor:"pointer",fontFamily:"-apple-system,sans-serif"}}>{t.cancel}</button>
      </>:<div style={{textAlign:"center",padding:"12px 0"}}>
        <div style={{width:60,height:60,background:GOLD,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",fontSize:26}}>✓</div>
        <div style={{fontSize:19,fontWeight:900,color:"#fff",marginBottom:5}}>{t.pkgDone}</div>
        <div style={{fontSize:12,color:C.sub,marginBottom:4}}>{t.pkgBooked}</div>
        <div style={{fontSize:24,fontWeight:700,color:C.gold,marginBottom:20}}>{total}€</div>
        <button onClick={onClose} style={{width:"100%",padding:"13px",background:GOLD,color:"#0D0D0D",border:"none",borderRadius:11,fontSize:13,fontWeight:800,cursor:"pointer",fontFamily:"-apple-system,sans-serif"}}>{t.close}</button>
      </div>}
    </div>
  </div>;
}

function MyTrips({user,onClose,onLoad}){
  const[trips,setTrips]=useState([]);
  const[loading,setLoading]=useState(true);
  useEffect(()=>{supabase.from("trips").select("*").eq("user_id",user.id).order("created_at",{ascending:false}).then(({data})=>{setTrips(data||[]);setLoading(false);});},[]);
  async function del(id){await supabase.from("trips").delete().eq("id",id);setTrips(p=>p.filter(t=>t.id!==id));}
  return<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.85)",zIndex:1000,display:"flex",alignItems:"flex-end",justifyContent:"center",backdropFilter:"blur(12px)"}} onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
    <div style={{background:"#1C1C1E",borderRadius:"22px 22px 0 0",width:"100%",maxWidth:560,maxHeight:"80vh",display:"flex",flexDirection:"column"}}>
      <div style={{padding:"16px 18px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div><div style={{fontSize:17,fontWeight:900,color:"#fff"}}>✈️ Mis viajes</div><div style={{fontSize:11,color:C.muted,marginTop:2}}>{trips.length} guardado{trips.length!==1?"s":""}</div></div>
        <button onClick={onClose} style={{background:"#2C2C2E",border:"none",color:C.muted,borderRadius:"50%",width:28,height:28,cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"9px"}}>
        {loading&&<div style={{textAlign:"center",padding:"36px",color:C.muted}}>Cargando...</div>}
        {!loading&&trips.length===0&&<div style={{textAlign:"center",padding:"36px"}}><div style={{fontSize:32,marginBottom:8}}>🗺️</div><div style={{fontSize:13,color:C.muted}}>No tienes viajes guardados</div></div>}
        {trips.map(trip=><div key={trip.id} style={{background:"#252525",borderRadius:12,padding:"12px",marginBottom:7,display:"flex",gap:11,alignItems:"center"}}>
          <div style={{width:44,height:44,borderRadius:9,overflow:"hidden",flexShrink:0}}><img src={getImg(trip.destination)} alt={trip.destination} style={{width:"100%",height:"100%",objectFit:"cover"}}/></div>
          <div style={{flex:1,minWidth:0}}><div style={{fontSize:13,fontWeight:700,color:"#fff"}}>{trip.destination}</div><div style={{fontSize:10,color:C.muted}}>{trip.origin||"?"} · {trip.budget||"?"}€</div><div style={{fontSize:9,color:"#48484A",marginTop:2}}>{new Date(trip.created_at).toLocaleDateString()}</div></div>
          <div style={{display:"flex",gap:5}}>
            <button onClick={()=>{onLoad(trip);onClose();}} style={{background:GOLD,color:"#0D0D0D",border:"none",borderRadius:6,padding:"5px 10px",fontSize:11,fontWeight:700,cursor:"pointer"}}>Ver</button>
            <button onClick={()=>del(trip.id)} style={{background:"rgba(224,90,78,.15)",color:"#E05A4E",border:"1px solid rgba(224,90,78,.3)",borderRadius:6,padding:"5px 10px",fontSize:11,fontWeight:700,cursor:"pointer"}}>🗑</button>
          </div>
        </div>)}
      </div>
    </div>
  </div>;
}

function SofiaModal({place,dest,lang,onClose}){
  const t=T[lang||"es"];
  const[story,setStory]=useState("");
  const[loading,setLoading]=useState(true);
  const[speaking,setSpeaking]=useState(false);
  const audioRef=useRef(null);
  useEffect(()=>{
    ai(`Eres Sofia, guia turistica. ${t.lp} Habla en primera persona. Max 2 frases emocionantes.`,`Cuenta algo fascinante sobre ${place.name} en ${dest||"este lugar"}.`,200)
      .then(txt=>{setStory(txt);setLoading(false);setSpeaking(true);speak(txt).then(a=>{audioRef.current=a;if(a)a.onended=()=>setSpeaking(false);else setSpeaking(false);});})
      .catch(()=>setLoading(false));
    return()=>{if(audioRef.current)audioRef.current.pause();};
  },[]);
  function replay(){if(audioRef.current)audioRef.current.pause();setSpeaking(true);speak(story).then(a=>{audioRef.current=a;if(a)a.onended=()=>setSpeaking(false);else setSpeaking(false);});}
  return<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.92)",zIndex:2000,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-end"}}>
    <div style={{position:"absolute",inset:0,overflow:"hidden"}}><WikiImg name={place.name}/><div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.95) 35%,rgba(0,0,0,.3) 100%)"}}/></div>
    <div style={{position:"relative",width:"100%",maxWidth:460,padding:"0 16px 44px",zIndex:1}}>
      <div style={{display:"flex",alignItems:"flex-end",gap:12,marginBottom:16}}>
        <div style={{position:"relative",flexShrink:0}}><div style={{width:62,height:62,borderRadius:"50%",overflow:"hidden",border:`3px solid ${speaking?"#22C55E":C.gold}`,transition:"border-color .3s"}}><img src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&q=80" alt="Sofia" style={{width:"100%",height:"100%",objectFit:"cover"}}/></div>{speaking&&<div style={{position:"absolute",bottom:2,right:2,width:12,height:12,background:"#22C55E",borderRadius:"50%",border:"2px solid #0D0D0D",animation:"pulse 1s ease infinite"}}/>}</div>
        <div><div style={{fontSize:16,fontWeight:900,color:"#fff"}}>Sofia</div><div style={{fontSize:10,color:C.gold}}>Guía · {place.name}</div></div>
        <button onClick={onClose} style={{marginLeft:"auto",background:"rgba(255,255,255,.1)",border:"none",color:"#fff",borderRadius:"50%",width:32,height:32,cursor:"pointer",fontSize:15,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
      </div>
      <div style={{background:"rgba(0,0,0,.6)",backdropFilter:"blur(20px)",borderRadius:16,padding:"16px",border:`1px solid ${C.goldBorder}`,marginBottom:12,minHeight:72}}>
        {loading?<div style={{display:"flex",gap:4,justifyContent:"center",padding:"14px 0"}}>{[0,1,2].map(i=><div key={i} style={{width:6,height:6,background:C.gold,borderRadius:"50%",animation:`dot .8s ${i*.2}s ease-in-out infinite`}}/>)}</div>:<p style={{margin:0,fontSize:13,color:"#fff",lineHeight:1.7,fontStyle:"italic"}}>"{story}"</p>}
      </div>
      <div style={{display:"flex",gap:8}}>
        <button onClick={replay} disabled={loading||!story} style={{flex:1,padding:"11px",background:GOLD,color:"#0D0D0D",border:"none",borderRadius:10,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"-apple-system,sans-serif"}}>{speaking?"🔊 Hablando...":"▶️ Escuchar"}</button>
        <button onClick={onClose} style={{padding:"11px 14px",background:"rgba(255,255,255,.1)",color:"#fff",border:"1px solid rgba(255,255,255,.15)",borderRadius:10,fontSize:12,cursor:"pointer"}}>{t.close}</button>
      </div>
    </div>
  </div>;
}

function AudioGuide({places,userPos,lang,city,onClose}){
  const t=T[lang||"es"];
  const[active,setActive]=useState(false);
  const[speaking,setSpeaking]=useState(false);
  const[log,setLog]=useState([]);
  const lastRef=useRef(null);
  const audioRef=useRef(null);
  async function announce(text){if(audioRef.current)audioRef.current.pause();setSpeaking(true);const a=await speak(text);audioRef.current=a;if(a)a.onended=()=>setSpeaking(false);setLog(p=>[{text,time:new Date().toLocaleTimeString()},...p.slice(0,2)]);}
  useEffect(()=>{
    if(!active||!userPos||!places.length)return;
    const sorted=[...places].filter(p=>p.lat&&p.lng).map(p=>({...p,dist:hav(userPos.lat,userPos.lng,p.lat,p.lng)})).sort((a,b)=>a.dist-b.dist);
    if(!sorted.length)return;
    const near=sorted[0];
    if(near.dist<150&&near.name!==lastRef.current){
      lastRef.current=near.name;
      const next=sorted[1];
      ai(`Eres Sofia, audioguia. ${t.lp} Max 2 frases.`,`Turista llega a ${near.name} en ${city}.`,150)
        .then(txt=>{let msg=txt;if(next&&next.dist<600){const br=getBearing(userPos.lat,userPos.lng,next.lat,next.lng);const dir=getDirES(br);msg+=` ${next.name} está a ${Math.round(next.dist)} metros hacia el ${dir}.`;}announce(msg);}).catch(()=>{});
    }
  },[userPos,active]);
  return<div style={{position:"fixed",inset:0,background:"#0D0D0D",zIndex:1100,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"24px"}}>
    <button onClick={onClose} style={{position:"absolute",top:18,right:18,background:"#2C2C2E",border:"none",color:"#fff",borderRadius:"50%",width:32,height:32,cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
    <div style={{width:84,height:84,borderRadius:"50%",overflow:"hidden",border:`3px solid ${speaking?"#22C55E":C.gold}`,boxShadow:`0 0 ${speaking?40:16}px ${speaking?"rgba(34,197,94,.5)":"rgba(201,169,110,.3)"}`,marginBottom:18,transition:"all .3s"}}><img src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&q=80" alt="Sofia" style={{width:"100%",height:"100%",objectFit:"cover"}}/></div>
    <div style={{fontSize:19,fontWeight:900,color:"#fff",marginBottom:2}}>Sofia</div>
    <div style={{fontSize:11,color:C.gold,marginBottom:24}}>Guía · {city}</div>
    <div style={{background:"#1C1C1E",borderRadius:16,padding:"16px 20px",width:"100%",maxWidth:300,marginBottom:20,textAlign:"center",minHeight:70,display:"flex",alignItems:"center",justifyContent:"center"}}>
      {speaking?<div><div style={{display:"flex",gap:3,justifyContent:"center",marginBottom:7}}>{[0,1,2,3,4].map(i=><div key={i} style={{width:3,background:"#22C55E",borderRadius:2,animation:`sw .6s ${i*.1}s ease-in-out infinite`}}/>)}</div><div style={{fontSize:11,color:"#22C55E",fontWeight:600}}>{t.sofiaSpeaking}</div></div>:active?<div style={{fontSize:11,color:C.sub}}>{t.sofiaWalking}</div>:<div><div style={{fontSize:22,marginBottom:5}}>🎧</div><div style={{fontSize:11,color:C.sub}}>{t.sofiaPut}</div></div>}
    </div>
    {log.map((l,i)=><div key={i} style={{background:"#1C1C1E",borderRadius:8,padding:"7px 11px",marginBottom:5,width:"100%",maxWidth:300,opacity:1-i*.25}}><div style={{fontSize:8,color:"#48484A",marginBottom:1}}>{l.time}</div><div style={{fontSize:10,color:C.sub,lineHeight:1.4}}>{l.text.slice(0,80)}...</div></div>)}
    <button onClick={()=>setActive(!active)} style={{marginTop:8,background:active?"rgba(224,90,78,.2)":GOLD,color:active?"#E05A4E":"#0D0D0D",border:active?"1px solid rgba(224,90,78,.4)":"none",borderRadius:50,padding:"14px 32px",fontSize:14,fontWeight:800,cursor:"pointer",fontFamily:"-apple-system,sans-serif"}}>{active?t.stopGuide:t.startGuide}</button>
    <style>{`@keyframes sw{0%,100%{height:5px}50%{height:18px}}`}</style>
  </div>;
}

function ExploreMode({lang,onClose}){
  const t=T[lang||"es"];
  const[city,setCity]=useState("");
  const[sugs,setSugs]=useState([]);
  const[places,setPlaces]=useState([]);
  const[loading,setLoading]=useState(false);
  const[err,setErr]=useState(null);
  const[sel,setSel]=useState(null);
  const[userPos,setUserPos]=useState(null);
  const[gps,setGps]=useState(false);
  const[showMap,setShowMap]=useState(false);
  const[showAudio,setShowAudio]=useState(false);
  const[activeMap,setActiveMap]=useState(null);
  const lastRef=useRef(null);
  const leafReady=useLeaflet();

  function handleInput(v){setCity(v);if(v.length>1)setSugs(CITIES.filter(c=>c.toLowerCase().startsWith(v.toLowerCase())).slice(0,5));else setSugs([]);}

  function enableGPS(){
    if(!navigator.geolocation)return;setGps(true);
    navigator.geolocation.watchPosition(p=>{
      const pos={lat:p.coords.latitude,lng:p.coords.longitude};setUserPos(pos);
      if(places.length){const n=places.find(pl=>pl.lat&&pl.lng&&hav(pos.lat,pos.lng,pl.lat,pl.lng)<200);if(n&&n.name!==lastRef.current){lastRef.current=n.name;setSel(n);}}
    },()=>{},{enableHighAccuracy:true,maximumAge:3000});
  }

  async function search(q){
    const query=(q||city).trim();if(!query)return;
    setCity(query);setSugs([]);setLoading(true);setPlaces([]);setSel(null);setErr(null);setShowMap(false);
    try{
      const raw=await ai(
        'Local guide expert. Reply ONLY a valid JSON array. Strip any markdown. Start with [ end with ]. Format: [{"name":"Wat Pho","type":"temple","description":"Two sentences about history.","curiosity":"One fascinating fact.","lat":13.74,"lng":100.49}]',
        `List the 15 most interesting monuments, temples, churches, statues, museums and parks in ${query}. Include real GPS coordinates. Return JSON array only.`,
        2000
      );
      const parsed=safeJSON(raw);
      if(parsed&&Array.isArray(parsed)&&parsed.length>0){
        setPlaces(parsed);
        setShowMap(true);
      } else {
        setErr("No se encontraron lugares. Intenta con otra ciudad.");
      }
    }catch(e){setErr("Error: "+e.message);}
    setLoading(false);
  }

  const icons={church:"⛪",park:"🌳",museum:"🏛️",statue:"🗿",monument:"🏛️",temple:"🕌",building:"🏢",palace:"🏰"};

  return<div style={{position:"fixed",inset:0,background:"#0D0D0D",zIndex:1000,display:"flex",flexDirection:"column"}}>
    {/* Header */}
    <div style={{background:"rgba(13,13,13,.96)",backdropFilter:"blur(20px)",borderBottom:`1px solid ${C.border}`,padding:"11px 14px",display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
      <button onClick={onClose} style={{background:"#2C2C2E",border:"none",color:"#fff",borderRadius:"50%",width:30,height:30,cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>←</button>
      <div style={{flex:1}}><div style={{fontSize:14,fontWeight:900,color:"#fff"}}>{t.exploreTitle}</div><div style={{fontSize:9,color:C.gold}}>{t.exploreSub}</div></div>
      {gps&&<div style={{background:"rgba(34,197,94,.15)",border:"1px solid rgba(34,197,94,.3)",color:"#22C55E",borderRadius:6,padding:"2px 7px",fontSize:9,fontWeight:600}}>📍 GPS</div>}
    </div>

    {/* Search */}
    <div style={{padding:"10px 12px",borderBottom:`1px solid ${C.border}`,flexShrink:0,position:"relative",zIndex:10}}>
      <div style={{display:"flex",gap:6}}>
        <div style={{flex:1,position:"relative"}}>
          <input value={city} onChange={e=>handleInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&search()} placeholder={t.explorePh}
            style={{width:"100%",background:"#2C2C2E",border:"1.5px solid #3A3A3C",borderRadius:9,color:"#fff",fontSize:13,padding:"9px 12px",outline:"none",fontFamily:"-apple-system,sans-serif",boxSizing:"border-box"}}
            onFocus={e=>e.target.style.borderColor=C.gold} onBlur={e=>{e.target.style.borderColor="#3A3A3C";setTimeout(()=>setSugs([]),200);}}/>
          {sugs.length>0&&<div style={{position:"absolute",top:"100%",left:0,right:0,background:"#1C1C1E",border:`1px solid ${C.border2}`,borderRadius:9,overflow:"hidden",zIndex:100,marginTop:3,boxShadow:"0 8px 24px rgba(0,0,0,.6)"}}>
            {sugs.map((s,i)=><button key={i} onClick={()=>search(s)} style={{width:"100%",background:"transparent",border:"none",borderBottom:i<sugs.length-1?`1px solid ${C.border}`:"none",padding:"9px 12px",color:"#fff",fontSize:12,cursor:"pointer",textAlign:"left",fontFamily:"-apple-system,sans-serif",display:"flex",alignItems:"center",gap:7}}
              onMouseEnter={e=>e.currentTarget.style.background="#2C2C2E"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>🌍 {s}</button>)}
          </div>}
        </div>
        <button onClick={()=>search()} disabled={!city.trim()||loading}
          style={{background:GOLD,color:"#0D0D0D",border:"none",borderRadius:9,padding:"9px 14px",fontSize:12,fontWeight:700,cursor:"pointer",flexShrink:0,opacity:!city.trim()||loading?.5:1,display:"flex",alignItems:"center",gap:5}}>
          {loading?<Spin size={13} color="#0D0D0D"/>:t.exploreSearch}
        </button>
      </div>
      {places.length>0&&<div style={{display:"flex",gap:5,marginTop:7}}>
        {!gps&&<button onClick={enableGPS} style={{flex:1,background:"rgba(59,130,246,.1)",border:"1px solid rgba(59,130,246,.2)",color:"#60A5FA",borderRadius:7,padding:"6px",fontSize:10,fontWeight:600,cursor:"pointer"}}>{t.activateGPS}</button>}
        <button onClick={()=>setShowMap(!showMap)} style={{flex:1,background:showMap?"rgba(201,169,110,.18)":"rgba(201,169,110,.06)",border:`1px solid ${C.goldBorder}`,color:C.gold,borderRadius:7,padding:"6px",fontSize:10,fontWeight:600,cursor:"pointer"}}>{t.showMap}</button>
        <button onClick={()=>setShowAudio(true)} style={{flex:1,background:"rgba(34,197,94,.08)",border:"1px solid rgba(34,197,94,.2)",color:"#22C55E",borderRadius:7,padding:"6px",fontSize:10,fontWeight:600,cursor:"pointer"}}>{t.audioguide}</button>
      </div>}
      {err&&<div style={{marginTop:7,background:"rgba(224,90,78,.1)",border:"1px solid rgba(224,90,78,.25)",borderRadius:8,padding:"8px 11px",fontSize:11,color:"#E05A4E"}}>{err}</div>}
    </div>

    {/* Map */}
    {showMap&&leafReady&&places.length>0&&<div style={{height:190,flexShrink:0,borderBottom:`1px solid ${C.border}`}}>
      <TravelMap places={places.map(p=>({...p,type:"place"}))} active={activeMap} onSelect={i=>{setActiveMap(i);setSel(places[i]);}} userPos={userPos} height={190}/>
    </div>}

    {/* Loading */}
    {loading&&<div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:10}}>
      <div style={{fontSize:34,animation:"float 2s ease-in-out infinite"}}>🔍</div>
      <div style={{color:C.gold,fontWeight:600,fontSize:13}}>{t.exploreLoading}</div>
    </div>}

    {/* Empty state */}
    {!loading&&places.length===0&&!err&&<div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:9,padding:"20px",textAlign:"center"}}>
      <div style={{fontSize:42}}>🌍</div>
      <div style={{fontSize:15,fontWeight:700,color:"#fff"}}>{t.exploreEmpty}</div>
      <div style={{fontSize:12,color:C.muted,maxWidth:240}}>{t.exploreTip}</div>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",justifyContent:"center",marginTop:6}}>
        {["Bangkok","Roma","Barcelona","París","Buenos Aires"].map(c=><button key={c} onClick={()=>search(c)} style={{background:"rgba(201,169,110,.08)",border:`1px solid ${C.goldBorder}`,color:C.gold,borderRadius:16,padding:"6px 11px",fontSize:11,cursor:"pointer",fontFamily:"-apple-system,sans-serif"}}>🌍 {c}</button>)}
      </div>
    </div>}

    {/* Grid */}
    {!loading&&places.length>0&&<div style={{flex:1,overflowY:"auto",padding:"9px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
      {places.map((p,i)=><div key={i} onClick={()=>setSel(p)} style={{background:"#1C1C1E",border:`1px solid ${sel?.name===p.name?C.gold:C.border}`,borderRadius:11,overflow:"hidden",cursor:"pointer",transition:"border-color .2s"}}>
        <div style={{height:85,background:C.card3,position:"relative",overflow:"hidden"}}>
          <WikiImg name={p.name}/>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.9) 0%,rgba(0,0,0,.3) 60%,transparent 100%)"}}/>
          <div style={{position:"absolute",bottom:4,left:6,right:6,display:"flex",alignItems:"flex-end",gap:4}}>
            <span style={{fontSize:12,flexShrink:0}}>{icons[p.type]||"📍"}</span>
            <span style={{fontSize:9,fontWeight:700,color:"#fff",lineHeight:1.2,overflow:"hidden",textOverflow:"ellipsis",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>{p.name}</span>
          </div>
        </div>
        <div style={{padding:"7px 8px"}}>
          <div style={{fontSize:9,color:C.muted,lineHeight:1.4,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{p.curiosity||p.description}</div>
          <div style={{fontSize:9,color:C.gold,fontWeight:600,marginTop:4}}>Sofia te cuenta →</div>
        </div>
      </div>)}
    </div>}

    {showAudio&&<AudioGuide places={places} userPos={userPos} lang={lang} city={city} onClose={()=>setShowAudio(false)}/>}
    {sel&&<SofiaModal place={sel} dest={city} lang={lang} onClose={()=>setSel(null)}/>}
  </div>;
}

function MarcoChat({plan,places,userPos,lang,onClose}){
  const t=T[lang||"es"];
  const[msgs,setMsgs]=useState([{r:"a",txt:t.guideHi}]);
  const[inp,setInp]=useState("");
  const[load,setLoad]=useState(false);
  const endRef=useRef(null);
  useEffect(()=>{endRef.current?.scrollIntoView({behavior:"smooth"});},[msgs]);
  async function send(){
    if(!inp.trim()||load)return;
    const q=inp.trim();setInp("");setMsgs(p=>[...p,{r:"u",txt:q}]);setLoad(true);
    try{const reply=await ai(`Eres Marco, guia turistico. ${t.lp} ${plan?`Destino: ${plan.destination}.`:""} Max 2 frases.`,q,200);setMsgs(p=>[...p,{r:"a",txt:reply}]);}
    catch{setMsgs(p=>[...p,{r:"a",txt:"Error."}]);}
    setLoad(false);
  }
  return<div style={{position:"fixed",bottom:86,right:16,width:290,background:"#1C1C1E",border:`1px solid ${C.border}`,borderRadius:18,boxShadow:"0 20px 60px rgba(0,0,0,.7)",zIndex:500,display:"flex",flexDirection:"column",maxHeight:"52vh",overflow:"hidden"}}>
    <div style={{background:"#1E1E20",padding:"11px 13px",borderRadius:"18px 18px 0 0",display:"flex",alignItems:"center",gap:8,borderBottom:`1px solid ${C.border}`}}>
      <div style={{width:32,height:32,borderRadius:"50%",background:GOLD,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>🧑‍🌾</div>
      <div style={{flex:1}}><div style={{fontSize:12,fontWeight:700,color:"#fff"}}>Marco</div><div style={{fontSize:9,color:C.gold}}>{plan?.destination||"AI Guide"}</div></div>
      <button onClick={onClose} style={{background:"#2C2C2E",border:"none",color:C.muted,borderRadius:6,width:23,height:23,cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
    </div>
    <div style={{flex:1,overflowY:"auto",padding:"8px",display:"flex",flexDirection:"column",gap:6}}>
      {msgs.map((m,i)=><div key={i} style={{display:"flex",gap:5,alignItems:"flex-end",flexDirection:m.r==="u"?"row-reverse":"row"}}>
        {m.r==="a"&&<div style={{width:20,height:20,borderRadius:"50%",background:GOLD,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,flexShrink:0}}>🧑‍🌾</div>}
        <div style={{background:m.r==="u"?GOLD:"#2C2C2E",color:m.r==="u"?"#0D0D0D":"#fff",borderRadius:m.r==="u"?"12px 12px 3px 12px":"12px 12px 12px 3px",padding:"7px 10px",fontSize:11,lineHeight:1.5,maxWidth:"78%"}}>{m.txt}</div>
      </div>)}
      {load&&<div style={{display:"flex",gap:4,padding:"6px 10px",background:"#2C2C2E",borderRadius:"12px 12px 12px 3px",width:"fit-content"}}>{[0,1,2].map(i=><div key={i} style={{width:5,height:5,background:C.gold,borderRadius:"50%",animation:`dot .8s ${i*.2}s ease-in-out infinite`}}/>)}</div>}
      <div ref={endRef}/>
    </div>
    <div style={{padding:"7px",borderTop:`1px solid ${C.border}`,display:"flex",gap:5}}>
      <input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder={t.guidePh} style={{flex:1,background:"#2C2C2E",border:`1px solid ${C.border}`,borderRadius:7,padding:"7px 9px",fontSize:11,color:"#fff",outline:"none",fontFamily:"-apple-system,sans-serif"}} onFocus={e=>e.target.style.borderColor=C.gold} onBlur={e=>e.target.style.borderColor=C.border}/>
      <button onClick={send} disabled={!inp.trim()||load} style={{background:GOLD,border:"none",borderRadius:7,width:30,height:30,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,opacity:!inp.trim()||load?.5:1}}>↑</button>
    </div>
  </div>;
}

function DatePicker({start,end,onChange,t,lc}){
  const today=new Date().toISOString().split("T")[0];
  const s={background:"#2C2C2E",border:"1.5px solid #3A3A3C",borderRadius:9,color:"#fff",padding:"9px 11px",fontSize:12,fontFamily:"-apple-system,sans-serif",colorScheme:"dark",outline:"none",width:"100%",boxSizing:"border-box",cursor:"pointer"};
  return<div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
    {[{label:t.arrival,field:"start",min:today,val:start},{label:t.departure,field:"end",min:start||today,val:end}].map(({label,field,min,val})=><div key={field} style={{flex:1,minWidth:100}}>
      <div style={{fontSize:9,fontWeight:600,color:C.muted,letterSpacing:".05em",textTransform:"uppercase",marginBottom:4}}>{label}</div>
      <input type="date" min={min} value={val} onChange={e=>onChange(field,e.target.value)} style={s} onFocus={e=>e.target.style.borderColor=C.gold} onBlur={e=>e.target.style.borderColor="#3A3A3C"}/>
    </div>)}
  </div>;
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App(){
  const[lang,setLang]=useState("es");
  const t=T[lang];
  const lc=lang==="es"?"es-ES":"en-GB";

  // Auth
  const[user,setUser]=useState(null);
  const[authOpen,setAuthOpen]=useState(false);

  // Modals
  const[exploreOpen,setExploreOpen]=useState(false);
  const[myTripsOpen,setMyTripsOpen]=useState(false);
  const[bookingOpen,setBookingOpen]=useState(false);
  const[marcoOpen,setMarcoOpen]=useState(false);
  const[nearbyModal,setNearbyModal]=useState(null);
  const[toast,setToast]=useState(null);

  // Onboarding
  const[step,setStep]=useState(0);
  const[tripTypes,setTripTypes]=useState([]);
  const[tStyle,setTStyle]=useState(null);
  const toggle=k=>setTripTypes(p=>p.includes(k)?p.filter(x=>x!==k):[...p,k]);

  // Form
  const[origin,setOrigin]=useState("Madrid, España");
  const[dest,setDest]=useState("");
  const[budget,setBudget]=useState("");
  const[start,setStart]=useState("");
  const[end,setEnd]=useState("");
  const[travelers,setTravelers]=useState(1);

  // Results
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
  const[mapPlaces,setMapPlaces]=useState([]);
  const[activeMap,setActiveMap]=useState(null);
  const[userPos,setUserPos]=useState(null);
  const lastNearRef=useRef(null);
  const leafReady=useLeaflet();

  const days=diffDays(start,end);
  const nights=days?days-1:plan?.days||5;

  useEffect(()=>{
    supabase.auth.getSession().then(({data:{session}})=>setUser(session?.user||null));
    const{data:{subscription}}=supabase.auth.onAuthStateChange((_,s)=>setUser(s?.user||null));
    return()=>subscription.unsubscribe();
  },[]);

  useEffect(()=>{
    if(!navigator.geolocation||!plan)return;
    const id=navigator.geolocation.watchPosition(p=>{
      const pos={lat:p.coords.latitude,lng:p.coords.longitude};setUserPos(pos);
      if(mapPlaces.length){const n=mapPlaces.find(pl=>pl.lat&&pl.lng&&hav(pos.lat,pos.lng,pl.lat,pl.lng)<150);if(n&&n.name!==lastNearRef.current){lastNearRef.current=n.name;setNearbyModal(n);}}
    },()=>{},{enableHighAccuracy:true,maximumAge:5000});
    return()=>navigator.geolocation.clearWatch(id);
  },[plan,mapPlaces]);

  function showToast(msg){setToast(msg);setTimeout(()=>setToast(null),2500);}

  async function generate(){
    if(!dest.trim())return;
    setApiErr(null);setLoading(true);setPlan(null);setFlights([]);setHotels([]);setRests([]);setWeather(null);setSelF(null);setSelH(null);setMapPlaces([]);
    const lp=t.lp;
    const dctx=start&&end?`Dates: ${start} to ${end} (${days} days). Travelers: ${travelers}. Origin: ${origin||"Madrid"}.`:"";
    const types=tripTypes.length?tripTypes.join(","):"culture";
    const pct=STYLES[tStyle||"comfort"].pct;
    const bNum=parseInt(budget)||800;
    const hBudget=Math.round(bNum*pct/Math.max(nights,1));

    setLoadStep(0);
    try{
      const planRaw=await ai(
        `Expert travel planner. ${lp} ${dctx} Reply ONLY a raw JSON object. No backticks. Start with { end with }. Format: {"destination":"City, Country","days":5,"budget":"1000€","summary":"2 sentences","map_places":[{"name":"...","lat":0.0,"lng":0.0,"description":"..."}],"itinerary":[{"day":"Day 1 - Name","theme":"...","morning":"...","afternoon":"...","evening":"...","transport":"..."}],"tips":["..."],"lat":0.0,"lng":0.0}`,
        `${dest}. Budget: ${bNum}€. Style: ${types}. ${dctx}`,
        4000
      );
      const planData=safeJSON(planRaw);
      if(!planData?.destination)throw new Error("No plan data");
      setPlan(planData);setLoading(false);

      setLoadStep(1);
      const[flRaw,htRaw,rsRaw]=await Promise.all([
        ai(`3 flights from ${origin||"Madrid"} to ${planData.destination}. Travel style: ${tStyle==="backpacker"?"BUDGET - cheap airlines Ryanair EasyJet Wizz low cost, price under 120€, 1-2 stops":tStyle==="luxury"?"LUXURY - business class Emirates Lufthansa Qatar Airways price over 600€ direct":"COMFORT - economy class regular airlines price 150-400€"}. ${lp} Reply ONLY a JSON array no backticks: [{"airline":"...","departure":"HH:MM","arrival":"HH:MM","duration":"Xh Ym","stops":0,"price":NNN}]`,"Flights",600),
        ai(`3 ${tStyle||"comfort"} style hotels in ${planData.destination}, budget ~${hBudget}€/night. ${lp} Reply ONLY a JSON array. No backticks. Format: [{"name":"...","stars":3,"neighborhood":"...","description":"...","highlights":["..."],"price_per_night":NN,"lat":0.0,"lng":0.0}]`,"Hotels",900),
        ai(`5 restaurants in ${planData.destination}. Style: ${tStyle==="backpacker"?"BUDGET street food local markets cheap eats under 8 euros per meal":tStyle==="luxury"?"LUXURY fine dining michelin rooftop upscale expensive":"MID-RANGE casual bistro good quality"}. ${lp} Reply ONLY a JSON array no backticks: [{"name":"...","cuisine":"...","rating":4.2,"price_range":"€€","description":"...","neighborhood":"...","lat":0.0,"lng":0.0}]`,"Restaurants",800),
      ]);

      setLoadStep(2);
      const fl=safeJSON(flRaw);const ht=safeJSON(htRaw);const rs=safeJSON(rsRaw);
      if(fl?.length){setFlights(fl);setSelF(0);}
      if(ht?.length){const sorted=tStyle==="luxury"?[...ht].sort((a,b)=>b.price_per_night-a.price_per_night):[...ht].sort((a,b)=>a.price_per_night-b.price_per_night);setHotels(sorted);setSelH(0);}
      if(rs?.length)setRests(rs);

      // Build map places
      const mp=[];
      planData.map_places?.forEach(p=>{if(p.lat&&p.lng)mp.push({...p,type:"place"});});
      ht?.forEach(h=>{if(h.lat&&h.lng)mp.push({...h,type:"hotel"});});
      rs?.forEach(r=>{if(r.lat&&r.lng)mp.push({...r,type:"restaurant"});});
      setMapPlaces(mp);

      setLoadStep(3);
      if(planData.lat&&planData.lng&&start){const wx=await fetchWeather(planData.lat,planData.lng,start);setWeather(wx);}
      setLoadStep(-1);
    }catch(e){setLoading(false);setLoadStep(-1);setApiErr(t.errorMsg+" ("+e.message+")");}
  }

  async function saveTrip(){
    if(!plan||!user){setAuthOpen(true);return;}
    try{await supabase.from("trips").insert({user_id:user.id,destination:plan.destination,origin,budget,plan});showToast(t.savedOk);}catch(e){console.error(e);}
  }

  function share(){
    if(!plan)return;
    const txt=`✈️ ${plan.destination} · ${plan.days} días\nhttps://trippio.travel`;
    if(navigator.share)navigator.share({title:"Trippio",text:txt}).catch(()=>{});
    else{navigator.clipboard?.writeText(txt);showToast(t.shareCopied);}
  }

  function reset(){
    setPlan(null);setFlights([]);setHotels([]);setRests([]);setWeather(null);setSelF(null);setSelH(null);setMapPlaces([]);setApiErr(null);
    setDest("");setBudget("");setStart("");setEnd("");setTravelers(1);setStep(0);setTripTypes([]);setTStyle(null);setMarcoOpen(false);setUserPos(null);
  }

  const fSel=selF!=null?flights[selF]:null;
  const hSel=selH!=null?hotels[selH]:null;

  const CSS=`
    @keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
    @keyframes up{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
    @keyframes pop{from{opacity:0;transform:scale(.93)}to{opacity:1;transform:scale(1)}}
    @keyframes pulse{0%,100%{opacity:.4;transform:scale(.8)}50%{opacity:1;transform:scale(1)}}
    @keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
    @keyframes dot{0%,80%,100%{transform:scale(.8);opacity:.5}40%{transform:scale(1.2);opacity:1}}
    .fa{animation:up .4s cubic-bezier(.16,1,.3,1) both}
    .fa2{animation:up .4s .06s cubic-bezier(.16,1,.3,1) both}
    .fa3{animation:up .4s .12s cubic-bezier(.16,1,.3,1) both}
    .pa{animation:pop .4s cubic-bezier(.16,1,.3,1) both}
    .pa2{animation:pop .4s .05s cubic-bezier(.16,1,.3,1) both}
    .pa3{animation:pop .4s .1s cubic-bezier(.16,1,.3,1) both}
    .pa4{animation:pop .4s .15s cubic-bezier(.16,1,.3,1) both}
    .hv{transition:transform .2s,border-color .2s}.hv:hover{transform:translateY(-3px)}
    input:focus{outline:none!important}
    ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:#3A3A3C;border-radius:2px}
    *{-webkit-font-smoothing:antialiased}
    button,input,select{font-family:-apple-system,sans-serif}
    .g2{display:grid;grid-template-columns:1fr 272px;gap:18px;align-items:start}
    @media(max-width:780px){.g2{grid-template-columns:1fr}}
  `;

  return<div style={{minHeight:"100vh",background:C.black,color:C.white,fontFamily:"-apple-system,'SF Pro Display',sans-serif"}}>
    <style>{CSS}</style>

    {/* NAV */}
    <nav style={{background:"rgba(13,13,13,.96)",backdropFilter:"blur(20px)",borderBottom:`1px solid ${C.border}`,padding:"0 14px",height:52,display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:200}}>
      <div style={{display:"flex",alignItems:"center",gap:8}}><Logo size={26}/><div><div style={{fontSize:14,fontWeight:700,color:C.white}}>Trippio</div><div style={{fontSize:7,color:C.gold,letterSpacing:".12em",textTransform:"uppercase",opacity:.8}}>AI Travel</div></div></div>
      <div style={{display:"flex",gap:5,alignItems:"center",flexWrap:"wrap"}}>
        <LangSel lang={lang} setLang={setLang}/>
        <button onClick={()=>setExploreOpen(true)} style={{background:"rgba(201,169,110,.1)",border:`1px solid ${C.goldBorder}`,color:C.gold,borderRadius:7,padding:"4px 9px",fontSize:10,cursor:"pointer",fontWeight:600}}>{t.exploreBtn}</button>
        {plan&&<><button onClick={share} style={{background:C.card2,border:`1px solid ${C.border}`,color:C.sub,borderRadius:7,padding:"4px 9px",fontSize:10,cursor:"pointer",fontWeight:600}}>↑ {t.shareBtn}</button>
        <button onClick={saveTrip} style={{background:C.goldDim,border:`1px solid ${C.goldBorder}`,color:C.gold,borderRadius:7,padding:"4px 9px",fontSize:10,cursor:"pointer",fontWeight:600}}>{t.saveBtn}</button>
        <button onClick={reset} style={{background:C.card2,border:`1px solid ${C.border}`,color:C.muted,borderRadius:7,padding:"4px 9px",fontSize:10,cursor:"pointer",fontWeight:600}}>{t.newSearch}</button></>}
        {user&&<button onClick={()=>setMyTripsOpen(true)} style={{background:C.card2,border:`1px solid ${C.border}`,color:C.sub,borderRadius:7,padding:"4px 9px",fontSize:10,cursor:"pointer",fontWeight:600}}>{t.myTrips}</button>}
        {!user?<button onClick={()=>setAuthOpen(true)} style={{background:GOLD,color:"#0D0D0D",border:"none",borderRadius:7,padding:"5px 11px",fontSize:10,fontWeight:700,cursor:"pointer"}}>{t.loginBtn}</button>
        :<button onClick={()=>supabase.auth.signOut()} style={{background:C.card2,border:`1px solid ${C.border}`,color:C.muted,borderRadius:7,padding:"5px 11px",fontSize:10,fontWeight:600,cursor:"pointer"}}>👤 {t.logoutBtn}</button>}
      </div>
    </nav>

    {/* OVERLAYS */}
    {authOpen&&<AuthModal onClose={()=>setAuthOpen(false)} onAuth={u=>setUser(u)}/>}
    {exploreOpen&&<ExploreMode lang={lang} onClose={()=>setExploreOpen(false)}/>}
    {myTripsOpen&&user&&<MyTrips user={user} onClose={()=>setMyTripsOpen(false)} onLoad={trip=>{setPlan(trip.plan);setOrigin(trip.origin||"");setDest(trip.destination||"");setBudget(trip.budget||"");setMyTripsOpen(false);}}/>}
    {bookingOpen&&fSel&&hSel&&<BookingFlow flight={fSel} hotel={hSel} dest={plan?.destination} travelers={travelers} nights={nights} t={t} onClose={()=>setBookingOpen(false)}/>}
    {plan&&marcoOpen&&<MarcoChat plan={plan} places={mapPlaces} userPos={userPos} lang={lang} onClose={()=>setMarcoOpen(false)}/>}
    {plan&&!marcoOpen&&<button onClick={()=>setMarcoOpen(true)} style={{position:"fixed",bottom:16,right:16,width:56,height:56,background:"#1E1E20",border:`2px solid ${C.goldBorder}`,borderRadius:"50%",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 8px 32px rgba(0,0,0,.5)",zIndex:499,fontSize:22}}>🧑‍🌾</button>}
    {nearbyModal&&<SofiaModal place={nearbyModal} dest={plan?.destination} lang={lang} onClose={()=>setNearbyModal(null)}/>}
    {toast&&<div style={{position:"fixed",bottom:26,left:"50%",transform:"translateX(-50%)",background:C.card2,border:`1px solid ${C.goldBorder}`,color:C.gold,borderRadius:9,padding:"9px 16px",fontSize:11,fontWeight:600,zIndex:999,whiteSpace:"nowrap"}}>✓ {toast}</div>}

    <main style={{maxWidth:1040,margin:"0 auto",padding:"0 14px 90px"}}>

      {apiErr&&<div style={{background:"rgba(224,90,78,.1)",border:"1px solid rgba(224,90,78,.3)",borderRadius:10,padding:"12px 15px",margin:"16px 0",display:"flex",gap:9,alignItems:"center"}}><span style={{fontSize:17}}>⚠️</span><div style={{flex:1}}><div style={{fontSize:12,fontWeight:700,color:"#E05A4E",marginBottom:1}}>Error</div><div style={{fontSize:11,color:C.sub}}>{apiErr}</div></div><button onClick={()=>setApiErr(null)} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:15}}>✕</button></div>}

      {/* ONBOARDING */}
      {!plan&&!loading&&<div style={{maxWidth:540,margin:"0 auto",padding:"44px 0 32px"}}>
        <div style={{display:"flex",justifyContent:"center",gap:5,marginBottom:26}} className="fa">
          {[0,1,2].map(s=><div key={s} style={{height:3,borderRadius:2,background:s<=step?C.gold:C.border,width:s===step?34:14,transition:"all .4s"}}/>)}
        </div>

        {step===0&&<>
          <div style={{textAlign:"center",marginBottom:22}} className="fa">
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:16}}><Logo size={44}/><div style={{textAlign:"left"}}><div style={{fontSize:29,fontWeight:700,color:C.white,lineHeight:1}}>Trippio</div><div style={{fontSize:8,color:C.gold,letterSpacing:".15em",textTransform:"uppercase",marginTop:2}}>Your trip. One click.</div></div></div>
            <h1 style={{fontSize:"clamp(22px,5vw,38px)",fontWeight:700,lineHeight:1.1,margin:"0 0 1px",color:C.white}} className="fa2">{t.h1}</h1>
            <h1 style={{fontSize:"clamp(22px,5vw,38px)",fontWeight:700,lineHeight:1.1,margin:"0 0 12px",color:C.gold}} className="fa3">{t.h2}</h1>
            <p style={{fontSize:13,color:"rgba(235,235,245,.5)",margin:"0 0 20px"}}>{t.sub}</p>
          </div>
          <div style={{fontSize:16,fontWeight:800,color:C.white,marginBottom:2}}>{t.tripType}</div>
          <p style={{fontSize:11,color:C.muted,marginBottom:14}}>{t.pickOne}</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:7,marginBottom:16}}>
            {Object.entries(TRIPS).map(([k,icon])=>{const sel=tripTypes.includes(k);return<button key={k} onClick={()=>toggle(k)} style={{background:sel?C.goldDim:C.card,border:`1.5px solid ${sel?C.goldBorder:C.border}`,borderRadius:11,padding:"11px 6px",cursor:"pointer",textAlign:"center",transition:"all .2s",transform:sel?"translateY(-2px)":"none",position:"relative"}}>
              {sel&&<div style={{position:"absolute",top:5,right:5,width:13,height:13,background:C.gold,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:7,color:"#0D0D0D",fontWeight:900}}>✓</div>}
              <div style={{fontSize:19,marginBottom:3}}>{icon}</div>
              <div style={{fontSize:9,fontWeight:700,color:sel?C.gold:C.white}}>{t.tripNames[k]}</div>
            </button>;})}
          </div>
          <div style={{display:"flex",justifyContent:"flex-end"}}><button onClick={()=>setStep(1)} disabled={tripTypes.length===0} style={{background:GOLD,color:"#0D0D0D",border:"none",borderRadius:10,padding:"10px 20px",fontSize:13,fontWeight:700,cursor:"pointer",opacity:tripTypes.length===0?.4:1}}>{t.nextBtn}</button></div>
        </>}

        {step===1&&<>
          <div style={{fontSize:17,fontWeight:900,color:"#fff",marginBottom:2}}>{t.styleQ}</div>
          <p style={{fontSize:11,color:C.muted,marginBottom:14}}>Esto determina el presupuesto en hoteles</p>
          <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:16}}>
            {Object.entries(STYLES).map(([k,s])=>{const sel=tStyle===k;return<button key={k} onClick={()=>setTStyle(k)} style={{background:sel?C.goldDim:C.card,border:`1px solid ${sel?C.goldBorder:C.border}`,borderRadius:12,padding:"12px 14px",cursor:"pointer",textAlign:"left",transition:"all .2s",display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:36,height:36,background:sel?C.goldDim:C.card3,border:`1px solid ${sel?C.goldBorder:C.border}`,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{s.icon}</div>
              <div style={{flex:1}}><div style={{fontSize:12,fontWeight:700,color:sel?C.gold:C.white,marginBottom:1}}>{t.styleNames[k]}</div><div style={{fontSize:10,color:C.muted}}>{t.styleDesc[k]}</div></div>
              {sel&&<span style={{color:C.gold,fontSize:16,fontWeight:900}}>✓</span>}
            </button>;})}
          </div>
          <div style={{display:"flex",gap:7,justifyContent:"space-between"}}>
            <button onClick={()=>setStep(0)} style={{background:"transparent",color:C.muted,border:`1px solid ${C.border}`,borderRadius:10,padding:"9px 16px",fontSize:12,fontWeight:700,cursor:"pointer"}}>{t.backBtn}</button>
            <button onClick={()=>setStep(2)} disabled={!tStyle} style={{background:GOLD,color:"#0D0D0D",border:"none",borderRadius:10,padding:"9px 18px",fontSize:13,fontWeight:700,cursor:"pointer",opacity:!tStyle?.4:1}}>{t.nextBtn}</button>
          </div>
        </>}

        {step===2&&<div className="fa">
          <div style={{display:"flex",gap:5,marginBottom:14,flexWrap:"wrap"}}>
            {tripTypes.map(k=><span key={k} style={{background:C.goldDim,color:C.gold,border:`1px solid ${C.goldBorder}`,borderRadius:5,padding:"2px 8px",fontSize:9,fontWeight:600}}>{TRIPS[k]} {t.tripNames[k]}</span>)}
            {tStyle&&<span style={{background:GOLD,color:"#fff",borderRadius:7,padding:"3px 10px",fontSize:10,fontWeight:800}}>{STYLES[tStyle].icon} {t.styleNames[tStyle]}</span>}
          </div>
          <div style={{background:C.card,borderRadius:14,padding:"18px 20px",boxShadow:"0 20px 60px rgba(0,0,0,.7)",border:`1px solid ${C.border}`}}>
            <div style={{display:"flex",flexDirection:"column",gap:11,marginBottom:13}}>
              {[{l:`✈️ ${t.originL}`,ph:t.originPh,v:origin,sv:setOrigin},{l:`🌍 ${t.destL}`,ph:t.destPh,v:dest,sv:setDest},{l:`💰 ${t.budgetL}`,ph:t.budgetPh,v:budget,sv:setBudget,type:"number"}].map(({l,ph,v,sv,type})=><div key={l}>
                <div style={{fontSize:9,fontWeight:700,color:"rgba(235,235,245,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:4}}>{l}</div>
                <input value={v} onChange={e=>sv(e.target.value)} placeholder={ph} type={type||"text"} style={{width:"100%",background:"#2C2C2E",border:"1.5px solid #3A3A3C",borderRadius:9,color:"#fff",fontSize:13,padding:"9px 11px",boxSizing:"border-box",outline:"none"}} onFocus={e=>e.target.style.borderColor=C.gold} onBlur={e=>e.target.style.borderColor="#3A3A3C"}/>
              </div>)}
            </div>
            <div style={{height:"0.5px",background:"rgba(255,255,255,.07)",margin:"12px 0"}}/>
            <div style={{marginBottom:12}}><DatePicker start={start} end={end} onChange={(f,v)=>{if(f==="start"){setStart(v);if(end&&v>end)setEnd("");}else setEnd(v);}} t={t} lc={lc}/></div>
            <div style={{marginBottom:12}}>
              <div style={{fontSize:9,fontWeight:700,color:"rgba(235,235,245,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:5}}>{t.travelersL}</div>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <button onClick={()=>setTravelers(Math.max(1,travelers-1))} style={{width:28,height:28,background:"#2C2C2E",border:"1.5px solid #3A3A3C",borderRadius:"50%",cursor:"pointer",fontSize:15,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>−</button>
                <span style={{fontSize:14,fontWeight:800,minWidth:16,textAlign:"center"}}>{travelers}</span>
                <button onClick={()=>setTravelers(Math.min(8,travelers+1))} style={{width:28,height:28,background:"#2C2C2E",border:"1.5px solid #3A3A3C",borderRadius:"50%",cursor:"pointer",fontSize:15,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>+</button>
                <span style={{fontSize:11,color:C.muted}}>{travelers===1?t.t1:t.tN(travelers)}</span>
              </div>
            </div>
            {days&&days>0&&<div style={{display:"flex",alignItems:"center",gap:5,marginBottom:11,padding:"7px 11px",background:C.goldDim,borderRadius:7,border:`1px solid ${C.goldBorder}`}}><span style={{width:5,height:5,background:C.gold,borderRadius:"50%",animation:"pulse 1.6s ease infinite",display:"inline-block"}}/><span style={{fontSize:10,color:C.gold,fontWeight:600}}>{days} días · {fmtD(start,{day:"numeric",month:"long"},lc)} → {fmtD(end,{day:"numeric",month:"long",year:"numeric"},lc)}</span></div>}
            <button onClick={generate} disabled={!dest.trim()} style={{width:"100%",padding:"13px",background:GOLD,color:"#0D0D0D",border:"none",borderRadius:10,fontSize:14,fontWeight:800,cursor:"pointer",fontFamily:"-apple-system,sans-serif",opacity:!dest.trim()?.4:1}}>{t.searchBtn}</button>
          </div>
          <div style={{marginTop:8}}><button onClick={()=>setStep(1)} style={{background:"transparent",color:C.muted,border:`1px solid ${C.border}`,borderRadius:8,padding:"7px 13px",fontSize:11,fontWeight:700,cursor:"pointer"}}>{t.backBtn}</button></div>
        </div>}
      </div>}

      {/* LOADING */}
      {loading&&!plan&&<div style={{maxWidth:420,margin:"44px auto 0",padding:"0 14px"}} className="fa">
        <div style={{textAlign:"center",marginBottom:20}}>
          <div style={{margin:"0 auto 14px",width:54,display:"flex",justifyContent:"center",animation:"float 3s ease-in-out infinite"}}><Logo size={54}/></div>
          <h2 style={{fontSize:18,fontWeight:800,margin:"0 0 3px"}}>{t.loadTitle}</h2>
          <p style={{fontSize:11,color:C.muted,margin:"0 0 2px"}}>{t.loadSub}</p>
          <p style={{fontSize:11,color:C.gold,fontWeight:600,margin:0}}>{t.loadWait}</p>
        </div>
        <div style={{background:C.card,borderRadius:12,padding:"5px 13px 7px",border:`1px solid ${C.border}`,marginBottom:16}}>
          {[t.step1,t.step2,t.step3,t.step4,t.step5,t.step6].map((label,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:9,padding:"6px 0",opacity:loadStep>=i?1:.3,transition:"opacity .3s",borderBottom:i<5?`1px solid ${C.border}`:"none"}}>
            <div style={{width:24,height:24,borderRadius:"50%",background:loadStep>=i?C.goldDim:C.card3,border:`1px solid ${loadStep>=i?C.goldBorder:C.border}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              {loadStep>i?<span style={{color:C.gold,fontSize:10,fontWeight:700}}>✓</span>:loadStep===i?<Spin size={11}/>:<span style={{fontSize:9}}>{"🗺✈🏨🍽🌤✅"[i]}</span>}
            </div>
            <span style={{fontSize:11,fontWeight:loadStep>=i?600:400,color:loadStep>=i?C.white:C.muted}}>{label}</span>
          </div>)}
        </div>
        <Sk h={60} r={11}/><div style={{height:7}}/><Sk h={60} r={11}/>
      </div>}

      {/* RESULTS */}
      {plan&&<div className="fa">
        {/* Hero */}
        <div style={{position:"relative",height:270,borderRadius:"0 0 22px 22px",overflow:"hidden",marginBottom:20,boxShadow:"0 16px 48px rgba(0,0,0,.7)"}}>
          <img src={getImg(plan.destination)} alt={plan.destination} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.85) 0%,rgba(0,0,0,.3) 50%,transparent 75%)"}}/>
          <div style={{position:"absolute",top:12,right:12,background:"rgba(0,0,0,.7)",backdropFilter:"blur(12px)",border:`1px solid ${C.goldBorder}`,borderRadius:11,padding:"7px 11px",display:"flex",alignItems:"center",gap:7,cursor:"pointer"}} onClick={()=>setMarcoOpen(true)}>
            <div style={{width:26,height:26,borderRadius:"50%",background:GOLD,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12}}>🧑‍🌾</div>
            <div><div style={{fontSize:10,fontWeight:700,color:C.gold}}>Marco</div><div style={{fontSize:8,color:C.sub}}>Tu guía IA</div></div>
          </div>
          {userPos&&<div style={{position:"absolute",top:12,left:12,background:"rgba(59,130,246,.2)",border:"1px solid rgba(59,130,246,.3)",borderRadius:7,padding:"3px 8px",fontSize:9,fontWeight:600,color:"#60A5FA"}}>📍 GPS activo</div>}
          <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"16px 18px"}}>
            <div style={{fontSize:"clamp(24px,5vw,44px)",fontWeight:900,color:"#fff",letterSpacing:"-.04em",lineHeight:1.0,marginBottom:8}}>{plan.destination}</div>
            <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
              {[t.days(plan.days),plan.budget,start&&end?`${fmtD(start,null,lc)} → ${fmtD(end,null,lc)}`:null,travelers===1?t.t1:t.tN(travelers)].filter(Boolean).map((v,i)=><span key={i} style={{background:i===0?C.goldDim:"rgba(255,255,255,.06)",color:i===0?C.gold:C.sub,border:`1px solid ${i===0?C.goldBorder:"rgba(255,255,255,.1)"}`,borderRadius:14,padding:"2px 9px",fontSize:9,fontWeight:i===0?600:400}}>{v}</span>)}
            </div>
          </div>
        </div>

        <div className="g2">
          <div>
            {/* Weather */}
            {weather&&start&&<div style={{marginBottom:22}} className="pa4">
              <SHdr icon="🌤" title={t.weatherT} sub={t.days(7)}/>
              <div style={{display:"flex",gap:5,overflowX:"auto",paddingBottom:2}}>
                {weather.temperature_2m_max.slice(0,7).map((maxT,i)=>{const d=new Date(start+"T12:00:00");d.setDate(d.getDate()+i);return<div key={i} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:9,padding:"9px 7px",minWidth:62,textAlign:"center",flexShrink:0}}>
                  <div style={{fontSize:8,color:C.muted,marginBottom:3,fontWeight:600}}>{d.toLocaleDateString(lc,{weekday:"short"})}</div>
                  <div style={{fontSize:20,marginBottom:3}}>{WX[weather.weathercode[i]]||"🌡"}</div>
                  <div style={{fontSize:11,fontWeight:700,color:C.white}}>{Math.round(maxT)}°</div>
                  <div style={{fontSize:9,color:C.muted,marginBottom:3}}>{Math.round(weather.temperature_2m_min[i])}°</div>
                  <div style={{fontSize:8,color:weather.precipitation_probability_max[i]>50?C.gold:C.muted}}>💧{weather.precipitation_probability_max[i]}%</div>
                </div>;})}
              </div>
            </div>}

            {/* Flights */}
            {flights.length>0&&<div style={{marginBottom:22}} className="pa">
              <SHdr icon="✈️" title={t.flightsT} sub={`${origin||"Madrid"} → ${plan.destination}`}/>
              {flights.map((fl,i)=><div key={i} onClick={()=>setSelF(i)} className="hv" style={{background:selF===i?C.goldDim:"#1C1C1E",border:`1px solid ${selF===i?C.goldBorder:C.border}`,borderRadius:16,padding:"14px 16px",marginBottom:7,cursor:"pointer",transition:"all .2s"}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:7}}>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <div style={{width:38,height:38,background:selF===i?C.goldDim:C.card3,border:`1px solid ${selF===i?C.goldBorder:C.border}`,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>✈️</div>
                    <div><div style={{fontSize:13,fontWeight:700,color:"#fff",marginBottom:1}}>{fl.airline}</div><div style={{fontSize:10,color:C.muted,marginBottom:2}}>{fl.departure} → {fl.arrival} · {fl.duration}</div><span style={{background:"rgba(201,169,110,.2)",color:C.gold,borderRadius:5,padding:"1px 7px",fontSize:9,fontWeight:700}}>{fl.stops===0?t.direct:t.stops(fl.stops)}</span></div>
                  </div>
                  <div style={{textAlign:"right"}}><div style={{fontSize:20,fontWeight:700,color:selF===i?C.gold:C.white}}>{fl.price}€</div><div style={{fontSize:9,color:C.muted,marginBottom:4}}>{t.pp}</div><button onClick={e=>{e.stopPropagation();window.open(`https://www.skyscanner.es/transporte/vuelos/?query=${encodeURIComponent(plan.destination)}`,"_blank");}} style={{background:GOLD,color:"#0D0D0D",border:"none",borderRadius:6,padding:"4px 9px",fontSize:9,fontWeight:700,cursor:"pointer"}}>{t.bookFlight}</button></div>
                </div>
              </div>)}
            </div>}

            {/* Hotels */}
            {hotels.length>0&&<div style={{marginBottom:22}} className="pa2">
              <SHdr icon="🏨" title={t.hotelsT} sub={`${nights} ${lang==="es"?"noches":"nights"}`}/>
              {hotels.map((h,i)=><div key={i} onClick={()=>setSelH(i)} className="hv" style={{background:selH===i?C.goldDim:"#1C1C1E",border:`1px solid ${selH===i?C.goldBorder:C.border}`,borderRadius:16,overflow:"hidden",marginBottom:7,cursor:"pointer",transition:"all .2s"}}>
                <div style={{display:"flex",height:100}}>
                  <div style={{width:100,flexShrink:0,overflow:"hidden"}}><img src={HOTEL_IMGS[i%HOTEL_IMGS.length]} alt={h.name} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"}/></div>
                  <div style={{flex:1,padding:"11px 13px",display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
                    <div><div style={{display:"flex",justifyContent:"space-between",gap:5,marginBottom:2}}><div style={{fontSize:12,fontWeight:700,color:"#fff",lineHeight:1.2}}>{h.name}</div><div style={{textAlign:"right",flexShrink:0}}><div style={{fontSize:16,fontWeight:700,color:selH===i?C.gold:C.white}}>{h.price_per_night}€</div><div style={{fontSize:8,color:C.muted}}>{t.pn}</div></div></div><div style={{display:"flex",alignItems:"center",gap:4,marginBottom:2}}><Stars n={h.stars||3} sz={8}/><span style={{fontSize:9,color:C.muted}}>📍 {h.neighborhood}</span></div><p style={{fontSize:10,color:C.muted,margin:0,lineHeight:1.4,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{h.description}</p></div>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:4}}><span style={{fontSize:10,color:selH===i?C.gold:C.muted,fontWeight:600}}>{h.price_per_night*nights}€ total</span><button onClick={e=>{e.stopPropagation();window.open(`https://www.booking.com/search.html?ss=${encodeURIComponent(h.name)}`,"_blank");}} style={{background:GOLD,color:"#0D0D0D",border:"none",borderRadius:6,padding:"3px 8px",fontSize:9,fontWeight:700,cursor:"pointer"}}>{t.bookHotel}</button></div>
                  </div>
                </div>
              </div>)}
            </div>}

            {/* Map */}
            {leafReady&&mapPlaces.length>0&&<div style={{marginBottom:22}} className="pa3">
              <SHdr icon="🗺️" title={t.mapT} sub={`${mapPlaces.length} lugares`}/>
              <TravelMap places={mapPlaces} active={activeMap} onSelect={setActiveMap} userPos={userPos} height={300}/>
            </div>}

            {/* Restaurants */}
            {rests.length>0&&<div style={{marginBottom:22}} className="pa4">
              <SHdr icon="🍽️" title={t.restsT} sub={plan.destination}/>
              <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
                {rests.map((r,i)=><div key={i} className="hv" style={{background:"#1C1C1E",border:`1px solid ${C.border}`,borderRadius:14,overflow:"hidden",flex:"1 1 160px",transition:"all .25s"}}>
                  <div style={{height:95,overflow:"hidden",position:"relative"}}><img src={REST_IMGS[i%REST_IMGS.length]} alt={r.name} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"}/><div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.7),transparent)"}}/>{r.price_range&&<div style={{position:"absolute",top:5,right:5,background:"rgba(0,0,0,.65)",color:"#fff",borderRadius:5,padding:"2px 5px",fontSize:8,fontWeight:700}}>{r.price_range}</div>}</div>
                  <div style={{padding:"9px 10px"}}><div style={{fontSize:11,fontWeight:700,color:"#fff",marginBottom:2}}>{r.name}</div><div style={{display:"flex",alignItems:"center",gap:4,marginBottom:5}}><Stars n={r.rating||4} sz={8}/><span style={{fontSize:8,color:C.muted}}>{r.cuisine}</span></div><button onClick={()=>window.open(`https://www.google.com/search?q=${encodeURIComponent(r.name+" "+plan.destination)}`,"_blank")} style={{background:GOLD,color:"#0D0D0D",border:"none",borderRadius:6,padding:"4px 9px",fontSize:9,fontWeight:700,cursor:"pointer",width:"100%"}}>{t.bookRest}</button></div>
                </div>)}
              </div>
            </div>}

            {/* Tours */}
            <div style={{marginBottom:22}} className="pa">
              <SHdr icon="🎟️" title={t.toursT} sub={plan.destination}/>
              <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
                {(lang==="es"?[{n:"Visita guiada",i:"🗺️"},{n:"Tour gastronómico",i:"🍽️"},{n:"Excursión",i:"🚌"},{n:"Experiencia local",i:"🤝"},{n:"Aventura",i:"🏔️"}]:[{n:"Guided tour",i:"🗺️"},{n:"Food tour",i:"🍽️"},{n:"Day trip",i:"🚌"},{n:"Local experience",i:"🤝"},{n:"Adventure",i:"🏔️"}]).map((tour,i)=><button key={i} onClick={()=>window.open(`https://www.getyourguide.es/s/?partner_id=YYAW5I0&q=${encodeURIComponent(plan.destination+" "+tour.n)}`,"_blank")} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"10px 12px",cursor:"pointer",textAlign:"left",flex:"1 1 130px",transition:"all .2s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=C.gold;e.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.transform="none";}}>
                  <div style={{fontSize:15,marginBottom:3}}>{tour.i}</div>
                  <div style={{fontSize:10,fontWeight:600,color:"#fff",marginBottom:2}}>{tour.n}</div>
                  <div style={{fontSize:9,color:C.gold,fontWeight:600}}>Ver ↗</div>
                </button>)}
              </div>
            </div>

            {/* Transport */}
            <div style={{marginBottom:22}} className="pa">
              <SHdr icon="🚗" title={t.transportT} sub={plan.destination}/>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                {[{name:"Uber",icon:"🚗",url:`https://m.uber.com/ul/?dropoff[formatted_address]=${encodeURIComponent(plan.destination)}`},{name:"Cabify",icon:"🟣",url:"https://cabify.com/"},{name:"Metro",icon:"🚇",url:`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(plan.destination)}&travelmode=transit`},{name:"Bike",icon:"🚲",url:`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(plan.destination)}&travelmode=bicycling`}].map(lk=><a key={lk.name} href={lk.url} target="_blank" rel="noopener noreferrer" style={{background:"#1C1C1E",border:`1px solid ${C.border}`,borderRadius:11,padding:"10px 12px",textDecoration:"none",display:"flex",alignItems:"center",gap:7,flex:"1 1 110px",transition:"all .2s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=C.goldBorder;e.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.transform="none";}}>
                  <span style={{fontSize:16}}>{lk.icon}</span><span style={{fontSize:11,fontWeight:700,color:"#fff"}}>{lk.name}</span><span style={{marginLeft:"auto",color:C.muted,fontSize:10}}>↗</span>
                </a>)}
              </div>
            </div>

            {/* Itinerary */}
            {plan.itinerary?.length>0&&<div style={{marginBottom:22}} className="pa">
              <SHdr icon="📅" title={t.itinT} sub={`${plan.itinerary.length} ${lang==="es"?"días":"days"}`}/>
              {plan.itinerary.map((day,i)=><DayCard key={i} day={day} i={i} t={t}/>)}
            </div>}
          </div>

          {/* SIDEBAR */}
          <div style={{position:"sticky",top:60}}>
            {(fSel||hSel)&&<div style={{background:"#1E1E20",borderRadius:16,padding:"16px",boxShadow:"0 12px 40px rgba(0,0,0,.5)",border:"0.5px solid rgba(255,255,255,.07)",marginBottom:11}}>
              <div style={{fontSize:12,fontWeight:900,marginBottom:11,color:"#fff"}}>{t.pkgTitle}</div>
              {fSel&&<div style={{display:"flex",justifyContent:"space-between",marginBottom:6,fontSize:11}}><span style={{color:C.sub}}>✈️ {fSel.airline} × {travelers}</span><span style={{fontWeight:700,color:"#fff"}}>{fSel.price*travelers}€</span></div>}
              {hSel&&nights&&<div style={{display:"flex",justifyContent:"space-between",marginBottom:6,fontSize:11}}><span style={{color:C.sub}}>🏨 {hSel.name} × {nights}n</span><span style={{fontWeight:700,color:"#fff"}}>{hSel.price_per_night*nights}€</span></div>}
              <div style={{height:"0.5px",background:"rgba(255,255,255,.07)",margin:"9px 0"}}/>
              {(()=>{const fT=fSel?fSel.price*travelers:0;const hT=hSel?hSel.price_per_night*nights:0;const tax=Math.round((fT+hT)*.10);const total=fT+hT+tax;return<>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:6,fontSize:11}}><span style={{color:C.muted}}>🧾 {t.taxes}</span><span style={{fontWeight:700,color:C.muted}}>{tax}€</span></div>
                <div style={{background:C.goldDim,borderRadius:9,padding:"10px 12px",margin:"9px 0 11px",border:`1px solid ${C.goldBorder}`}}><div style={{fontSize:8,fontWeight:600,color:C.gold,textTransform:"uppercase",letterSpacing:".1em",marginBottom:2}}>{t.total}</div><span style={{fontSize:24,fontWeight:700,color:C.gold}}>{total}€</span></div>
                <button onClick={()=>setBookingOpen(true)} style={{width:"100%",padding:"11px",background:GOLD,color:"#0D0D0D",border:"none",borderRadius:9,fontSize:12,fontWeight:800,cursor:"pointer",fontFamily:"-apple-system,sans-serif",marginBottom:6}}>{t.bookPkg}</button>
                <div style={{display:"flex",gap:5,marginBottom:5}}>
                  <button onClick={()=>window.open(`https://www.skyscanner.es/transporte/vuelos/?query=${encodeURIComponent(plan.destination)}`,"_blank")} style={{flex:1,padding:"6px",background:"transparent",color:C.gold,border:`1px solid ${C.goldBorder}`,borderRadius:7,fontSize:9,fontWeight:700,cursor:"pointer"}}>✈️ {t.onlyFlight}</button>
                  <button onClick={()=>window.open(`https://www.booking.com/search.html?ss=${encodeURIComponent(plan.destination)}`,"_blank")} style={{flex:1,padding:"6px",background:"transparent",color:C.gold,border:`1px solid ${C.goldBorder}`,borderRadius:7,fontSize:9,fontWeight:700,cursor:"pointer"}}>🏨 {t.onlyHotel}</button>
                </div>
                <div style={{fontSize:8,color:"#48484A",textAlign:"center"}}>Demo · Precios orientativos</div>
              </>;}())()}
            </div>}

            {plan.tips?.length>0&&<div style={{background:C.card,borderRadius:12,padding:"13px",marginBottom:11,border:`1px solid ${C.border}`}}>
              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:9}}><div style={{width:22,height:22,background:C.goldDim,border:`1px solid ${C.goldBorder}`,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11}}>💡</div><span style={{fontSize:12,fontWeight:800}}>{t.tipsT}</span></div>
              {plan.tips.slice(0,4).map((tip,i)=><div key={i} style={{display:"flex",gap:5,marginBottom:7}}><span style={{width:4,height:4,background:C.gold,borderRadius:"50%",flexShrink:0,marginTop:5}}/><p style={{margin:0,fontSize:10,color:C.muted,lineHeight:1.6}}>{tip}</p></div>)}
            </div>}
          </div>
        </div>
      </div>}
    </main>
  </div>;
}
