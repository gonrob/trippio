import { useState, useEffect, useRef } from "react";
import { supabase } from "./supabase.js";

const P = {
  black:"#0D0D0D",card:"#141414",card2:"#1A1A1A",card3:"#252525",
  border:"#2A2A2A",border2:"#333",muted:"#6B6B6B",sub:"#A0A0A0",
  white:"#FFFFFF",gold:"#C9A96E",goldDim:"rgba(201,169,110,.18)",
  goldBorder:"rgba(201,169,110,.25)",
};
const GOLD="linear-gradient(135deg,#C9A96E,#E8C98A)";
const VOICE_ID="yiWEefwu5z3DQCM79clN";

const T={
  es:{flag:"🇪🇸",name:"Español",lp:"Responde en español.",
    h1:"Tu próximo viaje,",h2:"en un clic.",sub:"Elige tu estilo, destino y presupuesto.",
    tripType:"¿Qué tipo de viaje?",pickOne:"Elige uno o varios",
    styleQ:"¿Cómo prefieres viajar?",formTitle:"Cuéntanos más",
    originL:"Origen",destL:"Destino",budgetL:"Presupuesto (€)",
    originPh:"Madrid, España",destPh:"Tokio, París, Bangkok...",budgetPh:"1000",
    arrival:"Llegada",departure:"Salida",
    travelers:"Viajeros",t1:"1 viajero",tN:n=>`${n} viajeros`,
    searchBtn:"Buscar mi viaje ✦",nextBtn:"Siguiente →",backBtn:"← Atrás",
    loadTitle:"Preparando tu aventura…",loadSub:"Buscando las mejores opciones",
    loadWait:"Puede tardar hasta 1 minuto...",
    flightsT:"Vuelos",hotelsT:"Hoteles",restsT:"Dónde comer",
    mapT:"Mapa del viaje",toursT:"Tours y actividades",transportT:"Transporte",
    itinT:"Itinerario día a día",tipsT:"Tips",weatherT:"Clima",
    bookFlight:"✈️ Reservar vuelo",bookHotel:"🏨 Reservar hotel",
    bookRest:"🍽️ Reservar mesa",bookTour:"🎟️ Ver tours",
    bookPkg:"🔒 Reservar paquete",onlyFlight:"Solo vuelo",onlyHotel:"Solo hotel",
    pkgTitle:"Resumen del viaje",total:"Total estimado",taxes:"Tasas",
    shareBtn:"Compartir",shareCopied:"¡Copiado!",
    saveBtn:"🔖 Guardar",savedOk:"¡Viaje guardado!",
    myTrips:"📚 Mis viajes",noTrips:"No tienes viajes guardados",
    exploreBtn:"🔍 Explorar ciudad",exploreTitle:"Explorar ciudad o monumento",
    exploreSub:"Sofia te cuenta la historia de cada lugar",
    explorePh:"Bangkok, Roma, Madrid...",exploreSearch:"Buscar",
    exploreLoading:"Buscando lugares...",exploreEmpty:"¿Dónde estás hoy?",
    exploreTip:"Escribe tu ciudad y Sofia te cuenta la historia",
    activateGPS:"📍 Activar GPS",showMap:"🗺️ Ver mapa",hideMap:"🗺️ Ocultar mapa",
    audioguide:"🎧 Audioguía",startGuide:"▶️ Iniciar audioguía",stopGuide:"⏹ Detener",
    sofiaGuide:"Guía · ",sofiaWalking:"Caminando... Sofia te avisará al llegar",
    sofiaSpeaking:"Sofia está hablando...",sofiaPut:"Ponte los auriculares y pulsa Iniciar",
    newSearch:"Nueva búsqueda",loginBtn:"Entrar",logoutBtn:"Salir",
    step1:"Creando itinerario",step2:"Vuelos",step3:"Hoteles",step4:"Restaurantes",step5:"Clima",step6:"¡Listo!",
    direct:"✈ Directo",stops:n=>`${n} escala${n>1?"s":""}`,pp:"por persona",pn:"/ noche",
    morning:"☀️ Mañana",afternoon:"🌤 Tarde",evening:"🌙 Noche",transport:"🚇 Transporte",
    days:n=>`${n} días`,
    tripNames:{adventure:"Aventura",culture:"Cultura",beach:"Playa",gastro:"Gastronomía",nature:"Naturaleza",city:"Ciudad",wellness:"Bienestar",nightlife:"Vida Nocturna",retreat:"Retiro"},
    styleNames:{backpacker:"Mochilero",comfort:"Confort",luxury:"Lujo"},
    styleDesc:{backpacker:"Hostels 1★, auténtico",comfort:"Hoteles 2-3★, equilibrio",luxury:"Hoteles 4-5★, VIP"},
    bookStep1:"Paso 1: Reserva tu vuelo",bookStep2:"Paso 2: Reserva tu hotel",
    bookHint1:"Haz clic para ir a Skyscanner. Completa la reserva y vuelve aquí para el hotel.",
    bookHint2:"Haz clic para ir a Booking. Completa la reserva. ¡Tu viaje estará listo!",
    goSkyscanner:"Ir a Skyscanner →",goBooking:"Ir a Booking.com →",
    pkgDone:"¡Paquete completado!",pkgBooked:"Vuelo + Hotel reservados",close:"Cerrar",cancel:"Cancelar",
    guideHi:"¡Hola! Soy Marco, tu guía personal. ¿En qué te ayudo?",
    guideNear:"Estás cerca de",guidePh:"Pregúntame sobre este destino...",
    errorTitle:"Algo salió mal",errorMsg:"Error al generar. Inténtalo de nuevo.",
  },
  en:{flag:"🇬🇧",name:"English",lp:"Respond in English.",
    h1:"Your next trip,",h2:"in one click.",sub:"Choose your style, destination and budget.",
    tripType:"What kind of trip?",pickOne:"Choose one or more",
    styleQ:"How do you travel?",formTitle:"Tell us more",
    originL:"Origin",destL:"Destination",budgetL:"Budget (€)",
    originPh:"London, UK",destPh:"Tokyo, Paris, Bangkok...",budgetPh:"1000",
    arrival:"Check-in",departure:"Check-out",
    travelers:"Travelers",t1:"1 traveler",tN:n=>`${n} travelers`,
    searchBtn:"Find my trip ✦",nextBtn:"Next →",backBtn:"← Back",
    loadTitle:"Preparing your adventure…",loadSub:"Searching best options",
    loadWait:"This may take up to 1 minute...",
    flightsT:"Flights",hotelsT:"Hotels",restsT:"Where to eat",
    mapT:"Trip map",toursT:"Tours & activities",transportT:"Transport",
    itinT:"Day by day itinerary",tipsT:"Tips",weatherT:"Weather",
    bookFlight:"✈️ Book flight",bookHotel:"🏨 Book hotel",
    bookRest:"🍽️ Book table",bookTour:"🎟️ View tours",
    bookPkg:"🔒 Book package",onlyFlight:"Flight only",onlyHotel:"Hotel only",
    pkgTitle:"Trip summary",total:"Estimated total",taxes:"Taxes",
    shareBtn:"Share",shareCopied:"Copied!",
    saveBtn:"🔖 Save",savedOk:"Trip saved!",
    myTrips:"📚 My trips",noTrips:"No saved trips",
    exploreBtn:"🔍 Explore city",exploreTitle:"Explore city or monument",
    exploreSub:"Sofia tells you the history of each place",
    explorePh:"Bangkok, Rome, Madrid...",exploreSearch:"Search",
    exploreLoading:"Searching places...",exploreEmpty:"Where are you today?",
    exploreTip:"Type your city and Sofia will tell you the history",
    activateGPS:"📍 Enable GPS",showMap:"🗺️ Show map",hideMap:"🗺️ Hide map",
    audioguide:"🎧 Audio guide",startGuide:"▶️ Start audio guide",stopGuide:"⏹ Stop",
    sofiaGuide:"Guide · ",sofiaWalking:"Walking... Sofia will notify you when nearby",
    sofiaSpeaking:"Sofia is speaking...",sofiaPut:"Put on earphones and press Start",
    newSearch:"New search",loginBtn:"Sign in",logoutBtn:"Sign out",
    step1:"Creating itinerary",step2:"Flights",step3:"Hotels",step4:"Restaurants",step5:"Weather",step6:"All ready!",
    direct:"✈ Direct",stops:n=>`${n} stop${n>1?"s":""}`,pp:"per person",pn:"/ night",
    morning:"☀️ Morning",afternoon:"🌤 Afternoon",evening:"🌙 Evening",transport:"🚇 Transport",
    days:n=>`${n} days`,
    tripNames:{adventure:"Adventure",culture:"Culture",beach:"Beach",gastro:"Gastronomy",nature:"Nature",city:"City Break",wellness:"Wellness",nightlife:"Nightlife",retreat:"Retreat"},
    styleNames:{backpacker:"Backpacker",comfort:"Comfort",luxury:"Luxury"},
    styleDesc:{backpacker:"Hostels 1★, authentic",comfort:"2-3★ hotels, value",luxury:"4-5★ hotels, VIP"},
    bookStep1:"Step 1: Book your flight",bookStep2:"Step 2: Book your hotel",
    bookHint1:"Click to go to Skyscanner. Complete booking and come back for the hotel.",
    bookHint2:"Click to go to Booking. Complete booking. Your trip will be ready!",
    goSkyscanner:"Go to Skyscanner →",goBooking:"Go to Booking.com →",
    pkgDone:"Package complete!",pkgBooked:"Flight + Hotel booked",close:"Close",cancel:"Cancel",
    guideHi:"Hi! I'm Marco, your personal guide. How can I help?",
    guideNear:"You are near",guidePh:"Ask me about this destination...",
    errorTitle:"Something went wrong",errorMsg:"Error generating. Please try again.",
  },
};

const TRIP_TYPES={adventure:"🏔️",culture:"🏛️",beach:"🏖️",gastro:"🍜",nature:"🌿",city:"🏙️",wellness:"🧘",nightlife:"🎉",retreat:"🌀"};
const STYLES={backpacker:{icon:"🎒",pct:.15},comfort:{icon:"🛎️",pct:.35},luxury:{icon:"💎",pct:.60}};
const DEST_IMGS={default:"https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=900&q=80",tokyo:"https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=900&q=80",rome:"https://images.unsplash.com/photo-1529260830199-42c24126f198?w=900&q=80",paris:"https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=900&q=80",bangkok:"https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=900&q=80",bali:"https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&q=80",london:"https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=900&q=80",berlin:"https://images.unsplash.com/photo-1560969184-10fe8719e047?w=900&q=80",dubai:"https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&q=80",lisbon:"https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=900&q=80"};
const HOTEL_IMGS=["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=70","https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&q=70","https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=70","https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&q=70","https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&q=70","https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&q=70"];
const REST_IMGS=["https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=70","https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=70","https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&q=70","https://images.unsplash.com/photo-1544148103-0773bf10d330?w=400&q=70","https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=70","https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=400&q=70"];

function getDestImg(dest=""){const d=dest.toLowerCase();for(const[k,v]of Object.entries(DEST_IMGS))if(d.includes(k))return v;return DEST_IMGS.default;}
const diffDays=(a,b)=>(!a||!b)?null:Math.round((new Date(b+"T12:00:00")-new Date(a+"T12:00:00"))/86400000)+1;
const fmt=(s,o,lc)=>!s?"":new Date(s+"T12:00:00").toLocaleDateString(lc||"es-ES",o||{day:"numeric",month:"short"});
const hav=(a,b,c,d)=>{const R=6371e3,p=Math.PI/180,x=Math.sin((c-a)*p/2)**2+Math.cos(a*p)*Math.cos(c*p)*Math.sin((d-b)*p/2)**2;return R*2*Math.atan2(Math.sqrt(x),Math.sqrt(1-x));};
const bearing=(a,b,c,d)=>{const p=Math.PI/180,y=Math.sin((d-b)*p)*Math.cos(c*p),x=Math.cos(a*p)*Math.sin(c*p)-Math.sin(a*p)*Math.cos(c*p)*Math.cos((d-b)*p);return((Math.atan2(y,x)/p)+360)%360;};
const dirName=(br,es)=>{const d=es?["norte","noreste","este","sureste","sur","suroeste","oeste","noroeste"]:["north","northeast","east","southeast","south","southwest","west","northwest"];return d[Math.round(br/45)%8];};

async function callAI(system,user,tokens=1000){
  const r=await fetch("/api/anthropic",{method:"POST",headers:{"Content-Type":"application/json","anthropic-version":"2023-06-01"},body:JSON.stringify({model:"claude-haiku-4-5-20251001",max_tokens:tokens,system,messages:[{role:"user",content:user}]})});
  const d=await r.json();
  if(d.error)throw new Error(d.error.message);
  return (d.content||[]).map(b=>b.text||"").join("").trim();
}

function parseJSON(raw){
  let r=raw.trim();
  try{return JSON.parse(r);}catch{}
  const a=r.indexOf("["),b=r.lastIndexOf("]");
  if(a>=0&&b>a){try{return JSON.parse(r.slice(a,b+1));}catch{}}
  const c=r.indexOf("{"),e=r.lastIndexOf("}");
  if(c>=0&&e>c){try{return JSON.parse(r.slice(c,e+1));}catch{}}
  try{return JSON.parse(r.replace(/```json|```/g,"").trim());}catch{}
  return null;
}

async function speakText(text){
  try{
    const r=await fetch("/api/elevenlabs",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text,voiceId:VOICE_ID})});
    if(!r.ok)return null;
    const blob=await r.blob();
    const url=URL.createObjectURL(blob);
    const audio=new Audio(url);
    audio.play();
    return audio;
  }catch{return null;}
}

async function fetchWeather(lat,lon,start){
  try{const r=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weathercode&timezone=auto&start_date=${start}&forecast_days=7`);const d=await r.json();return d.daily;}catch{return null;}
}
const WX={0:"☀️",1:"🌤",2:"⛅",3:"☁️",45:"🌫",51:"🌦",61:"🌧",71:"❄️",80:"🌦",95:"⛈"};
const wxI=c=>WX[c]||"🌡";

function useLeaflet(){
  const[ok,setOk]=useState(!!window.L);
  useEffect(()=>{if(window.L){setOk(true);return;}const css=document.createElement("link");css.rel="stylesheet";css.href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";document.head.appendChild(css);const js=document.createElement("script");js.src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";js.onload=()=>setOk(true);document.head.appendChild(js);},[]);return ok;
}

function TravelMap({places,active,onSelect,userPos,height=300}){
  const nRef=useRef(null),lRef=useRef(null),mRef=useRef([]),uRef=useRef(null);
  useEffect(()=>{if(!nRef.current||lRef.current)return;const L=window.L;if(!L)return;const map=L.map(nRef.current,{zoomControl:false,attributionControl:false});L.control.zoom({position:"bottomright"}).addTo(map);L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",{maxZoom:19}).addTo(map);lRef.current=map;return()=>{map.remove();lRef.current=null;};},[]);
  useEffect(()=>{const L=window.L,map=lRef.current;if(!L||!map||!places?.length)return;mRef.current.forEach(m=>m.remove());mRef.current=[];const bounds=[];places.forEach((p,i)=>{if(!p.lat||!p.lng)return;const isA=active===i;const sz=isA?44:34;const em=p.type==="hotel"?"🏨":p.type==="restaurant"?"🍽️":"◆";const html=`<div style="width:${sz}px;height:${sz}px;background:${isA?P.gold:"#2C2C2E"};border:2px solid ${P.gold};border-radius:${p.type==="hotel"?"12px":"50%"};display:flex;align-items:center;justify-content:center;font-size:${isA?18:13}px;cursor:pointer">${isA?em:i+1}</div>`;const icon=L.divIcon({className:"",html,iconSize:[sz,sz],iconAnchor:[sz/2,sz/2]});const mk=L.marker([p.lat,p.lng],{icon}).addTo(map).bindPopup(`<b>${p.name}</b>${p.description?`<br><small>${p.description.slice(0,80)}</small>`:""}`).on("click",()=>onSelect(i));mRef.current.push(mk);bounds.push([p.lat,p.lng]);});if(bounds.length)map.fitBounds(bounds,{padding:[40,40],maxZoom:14});},[places]);
  useEffect(()=>{const map=lRef.current;if(!map||active==null||!places?.[active])return;const p=places[active];if(p.lat&&p.lng){map.flyTo([p.lat,p.lng],15,{animate:true,duration:1});mRef.current[active]?.openPopup();}},[active]);
  useEffect(()=>{const L=window.L,map=lRef.current;if(!L||!map||!userPos)return;if(uRef.current)uRef.current.remove();const html=`<div style="width:16px;height:16px;background:#3B82F6;border:3px solid #fff;border-radius:50%;box-shadow:0 0 0 6px rgba(59,130,246,.3)"></div>`;const icon=L.divIcon({className:"",html,iconSize:[16,16],iconAnchor:[8,8]});uRef.current=L.marker([userPos.lat,userPos.lng],{icon}).addTo(map);},[userPos]);
  return <div ref={nRef} style={{height,borderRadius:16,overflow:"hidden"}}/>;
}

function WikiImg({name,style}){
  const[src,setSrc]=useState(null);
  useEffect(()=>{fetch("https://en.wikipedia.org/w/api.php?action=query&titles="+encodeURIComponent(name)+"&prop=pageimages&format=json&pithumbsize=400&origin=*").then(r=>r.json()).then(d=>{const pages=d?.query?.pages;if(pages){const p=Object.values(pages)[0];if(p?.thumbnail?.source)setSrc(p.thumbnail.source);}}).catch(()=>{});},[name]);
  if(src)return<img src={src} alt={name} style={{width:"100%",height:"100%",objectFit:"cover",...style}}/>;
  return<div style={{width:"100%",height:"100%",background:"#252525",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,...style}}>🏛️</div>;
}

function Stars({n=4,sz=11}){return<span>{[1,2,3,4,5].map(i=><span key={i} style={{color:i<=n?P.gold:P.border2,fontSize:sz}}>★</span>)}</span>;}
function Spin({size=18,color}){return<div style={{width:size,height:size,border:`2.5px solid rgba(255,255,255,.1)`,borderTop:`2.5px solid ${color||P.gold}`,borderRadius:"50%",animation:"spin .7s linear infinite",flexShrink:0}}/>;}

function Btn({children,onClick,disabled,outline,full,size,color,style:ex}){
  const[h,setH]=useState(false);
  const p=size==="sm"?"6px 12px":size==="lg"?"15px 28px":"10px 20px";
  const fz=size==="sm"?11:size==="lg"?16:13;
  return<button onClick={onClick} disabled={disabled} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
    style={{background:outline?(h?(color||P.gold)+"22":"transparent"):GOLD,color:outline?(color||P.gold):"#0D0D0D",border:outline?`1.5px solid ${color||P.gold}`:"none",borderRadius:11,padding:p,fontSize:fz,fontWeight:700,cursor:disabled?"not-allowed":"pointer",fontFamily:"-apple-system,sans-serif",display:"inline-flex",alignItems:"center",justifyContent:"center",gap:6,opacity:disabled?.4:1,transition:"all .2s",width:full?"100%":undefined,transform:h&&!disabled?"translateY(-2px)":"none",...ex}}>
    {children}
  </button>;
}

function SHdr({icon,title,sub}){return<div style={{display:"flex",alignItems:"center",gap:11,marginBottom:14}}><div style={{width:36,height:36,background:P.card3,border:`1px solid ${P.border2}`,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{icon}</div><div><div style={{fontSize:16,fontWeight:700,color:P.white}}>{title}</div>{sub&&<div style={{fontSize:11,color:"rgba(235,235,245,.4)",marginTop:1}}>{sub}</div>}</div></div>;}

function Logo({size=32}){return<svg width={size} height={size} viewBox="0 0 100 100" fill="none" style={{flexShrink:0,filter:`drop-shadow(0 ${size*.05}px ${size*.15}px rgba(201,169,110,.4))`}}><defs><linearGradient id="lg" x1="15%" y1="15%" x2="85%" y2="85%"><stop offset="0%" stopColor="#E8C98A"/><stop offset="100%" stopColor="#B8935A"/></linearGradient></defs><circle cx="50" cy="50" r="45" stroke="url(#lg)" strokeWidth="2.5" opacity=".6"/><path d="M24 72L68 20L76 54Z" fill="url(#lg)" opacity=".95"/><path d="M24 72L76 54L52 68Z" fill="#B8935A" opacity=".7"/></svg>;}

function LangSel({lang,setLang}){
  const[open,setOpen]=useState(false);
  return<div style={{position:"relative"}}><button onClick={()=>setOpen(!open)} style={{background:"#2C2C2E",border:"0.5px solid #3A3A3C",borderRadius:9,padding:"5px 11px",display:"flex",alignItems:"center",gap:5,cursor:"pointer",color:"#fff",fontSize:12,fontWeight:600,fontFamily:"-apple-system,sans-serif"}}><span style={{fontSize:14}}>{T[lang].flag}</span><span>{lang.toUpperCase()}</span><span style={{fontSize:9,color:P.muted}}>▾</span></button>
  {open&&<div style={{position:"absolute",right:0,top:"calc(100% + 5px)",background:"#1C1C1E",border:"0.5px solid #3A3A3C",borderRadius:12,overflow:"hidden",zIndex:999,boxShadow:"0 12px 40px rgba(0,0,0,.7)",minWidth:130}}>{Object.entries(T).map(([k,l])=><button key={k} onClick={()=>{setLang(k);setOpen(false);}} style={{width:"100%",background:lang===k?"#2C2C2E":"transparent",border:"none",padding:"9px 13px",display:"flex",alignItems:"center",gap:8,cursor:"pointer",color:lang===k?P.gold:"#fff",fontSize:12,fontFamily:"-apple-system,sans-serif",fontWeight:lang===k?700:400,textAlign:"left"}}><span style={{fontSize:16}}>{l.flag}</span><span>{l.name}</span>{lang===k&&<span style={{marginLeft:"auto",fontSize:10}}>✓</span>}</button>)}</div>}
  </div>;
}

function AuthModal({onClose,onAuth}){
  const[mode,setMode]=useState("login");
  const[email,setEmail]=useState("");
  const[pw,setPw]=useState("");
  const[load,setLoad]=useState(false);
  const[err,setErr]=useState(null);
  const[ok,setOk]=useState(null);
  const inp={width:"100%",padding:"11px 14px",border:"1.5px solid #3A3A3C",borderRadius:11,fontSize:13,fontFamily:"-apple-system,sans-serif",color:"#fff",background:"#2C2C2E",boxSizing:"border-box",outline:"none"};
  async function submit(){setLoad(true);setErr(null);setOk(null);try{if(mode==="reg"){const{error:e}=await supabase.auth.signUp({email,password:pw});if(e)throw e;setOk("Cuenta creada. Revisa tu email.");}else{const{data,error:e}=await supabase.auth.signInWithPassword({email,password:pw});if(e)throw e;onAuth(data.user);onClose();}}catch(e){setErr(e.message);}setLoad(false);}
  return<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.75)",zIndex:1000,display:"flex",alignItems:"flex-end",justifyContent:"center",backdropFilter:"blur(12px)"}} onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
    <div style={{background:"#1C1C1E",borderRadius:"24px 24px 0 0",width:"100%",maxWidth:450,padding:"20px 24px 44px",boxShadow:"0 -8px 60px rgba(0,0,0,.6)"}}>
      <div style={{width:36,height:4,background:"#3A3A3C",borderRadius:2,margin:"0 auto 20px"}}/>
      <div style={{fontSize:20,fontWeight:900,color:"#fff",marginBottom:4}}>{mode==="login"?"Bienvenido de nuevo":"Crea tu cuenta"}</div>
      <p style={{fontSize:12,color:"#6B6B6B",marginBottom:18}}>Guarda y accede a tus viajes</p>
      <button onClick={()=>supabase.auth.signInWithOAuth({provider:"google",options:{redirectTo:window.location.origin}})} style={{width:"100%",background:"#2C2C2E",border:"1.5px solid #3A3A3C",borderRadius:11,padding:"11px",color:"#fff",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"-apple-system,sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:13}}>🔍 Continuar con Google</button>
      <div style={{display:"flex",alignItems:"center",gap:9,margin:"12px 0"}}><div style={{flex:1,height:"0.5px",background:"#3A3A3C"}}/><span style={{fontSize:10,color:"#6B6B6B"}}>o con email</span><div style={{flex:1,height:"0.5px",background:"#3A3A3C"}}/></div>
      <div style={{marginBottom:9}}><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="tu@email.com" type="email" style={inp} onFocus={e=>e.target.style.borderColor=P.gold} onBlur={e=>e.target.style.borderColor="#3A3A3C"}/></div>
      <div style={{marginBottom:16}}><input value={pw} onChange={e=>setPw(e.target.value)} placeholder="Contraseña" type="password" style={inp} onFocus={e=>e.target.style.borderColor=P.gold} onBlur={e=>e.target.style.borderColor="#3A3A3C"} onKeyDown={e=>e.key==="Enter"&&submit()}/></div>
      {err&&<div style={{background:"rgba(224,90,78,.12)",border:"1px solid rgba(224,90,78,.3)",borderRadius:8,padding:"8px 12px",fontSize:11,color:"#E05A4E",marginBottom:10}}>{err}</div>}
      {ok&&<div style={{background:"rgba(201,169,110,.12)",border:"1px solid rgba(201,169,110,.3)",borderRadius:8,padding:"8px 12px",fontSize:11,color:P.gold,marginBottom:10}}>{ok}</div>}
      <button onClick={submit} disabled={load||!email||!pw} style={{width:"100%",padding:"13px",background:GOLD,color:"#0D0D0D",border:"none",borderRadius:11,fontSize:14,fontWeight:800,cursor:"pointer",fontFamily:"-apple-system,sans-serif",marginBottom:10,opacity:(!email||!pw)?.5:1}}>{load?"...":(mode==="login"?"Iniciar sesión":"Crear cuenta")}</button>
      <button onClick={()=>{setMode(mode==="login"?"reg":"login");setErr(null);setOk(null);}} style={{width:"100%",background:"none",border:"none",color:"#6B6B6B",fontSize:12,cursor:"pointer",fontFamily:"-apple-system,sans-serif"}}>{mode==="login"?"¿No tienes cuenta? Regístrate":"¿Ya tienes cuenta? Inicia sesión"}</button>
    </div>
  </div>;
}

function DayCard({day,i,t}){
  const[open,setOpen]=useState(i===0);
  return<div style={{background:"#1C1C1E",border:`1px solid ${open?P.goldBorder:P.border}`,borderRadius:16,marginBottom:8,overflow:"hidden",transition:"all .3s"}}>
    <button onClick={()=>setOpen(!open)} style={{width:"100%",background:"none",border:"none",padding:"13px 16px",cursor:"pointer",display:"flex",alignItems:"center",gap:11}}>
      <div style={{width:32,height:32,background:open?P.goldDim:P.card3,border:`1px solid ${open?P.goldBorder:P.border}`,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:900,color:open?P.gold:P.muted,flexShrink:0}}>{i+1}</div>
      <div style={{flex:1,textAlign:"left"}}><div style={{fontSize:13,fontWeight:700,color:"#fff"}}>{day.day?.replace(/^(Día|Day)\s*\d+\s*[-–]\s*/,"")||"Día "+(i+1)}</div>{day.theme&&<div style={{fontSize:11,color:P.muted,marginTop:1}}>{day.theme}</div>}</div>
      <span style={{color:P.muted,fontSize:16,transform:open?"rotate(90deg)":"none",transition:".2s"}}>›</span>
    </button>
    {open&&<div style={{padding:"2px 16px 16px",borderTop:"0.5px solid rgba(255,255,255,.06)"}}>
      {[{k:"morning",l:t.morning},{k:"afternoon",l:t.afternoon},{k:"evening",l:t.evening},{k:"transport",l:t.transport}].map(({k,l})=>day[k]&&<div key={k} style={{marginTop:11}}><div style={{fontSize:9,fontWeight:700,color:P.gold,textTransform:"uppercase",letterSpacing:".06em",marginBottom:3}}>{l}</div><p style={{margin:0,fontSize:12,color:"rgba(255,255,255,.7)",lineHeight:1.65}}>{day[k]}</p></div>)}
    </div>}
  </div>;
}

function BookingFlow({flight,hotel,dest,travelers,nights,t,onClose}){
  const[step,setStep]=useState(0);
  const fT=flight?flight.price*travelers:0;
  const hT=hotel?hotel.price_per_night*nights:0;
  const tax=Math.round((fT+hT)*.10);
  const total=fT+hT+tax;
  const steps=[
    {title:t.bookStep1,sub:flight?`${flight.airline} · ${flight.price}€ × ${travelers} = ${fT}€`:"",hint:t.bookHint1,url:`https://www.skyscanner.es/transporte/vuelos/?query=${encodeURIComponent(dest||"")}`,btn:t.goSkyscanner},
    {title:t.bookStep2,sub:hotel?`${hotel.name} · ${hotel.price_per_night}€ × ${nights}n = ${hT}€`:"",hint:t.bookHint2,url:`https://www.booking.com/search.html?ss=${encodeURIComponent((hotel?.name||"")+" "+dest)}`,btn:t.goBooking},
  ];
  return<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.8)",zIndex:1000,display:"flex",alignItems:"flex-end",justifyContent:"center",backdropFilter:"blur(12px)"}} onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
    <div style={{background:"#1C1C1E",borderRadius:"24px 24px 0 0",width:"100%",maxWidth:480,padding:"20px 22px 44px"}}>
      <div style={{width:36,height:4,background:"#3A3A3C",borderRadius:2,margin:"0 auto 18px"}}/>
      {step<2?<>
        <div style={{display:"flex",gap:7,marginBottom:18}}>{[0,1].map(s=><div key={s} style={{flex:1,height:4,borderRadius:2,background:s<=step?P.gold:P.border,transition:"all .3s"}}/>)}</div>
        <div style={{fontSize:20,fontWeight:900,color:"#fff",marginBottom:5}}>{steps[step].title}</div>
        <div style={{fontSize:13,color:P.sub,marginBottom:20}}>{steps[step].sub}</div>
        <div style={{background:"rgba(201,169,110,.1)",border:"1px solid rgba(201,169,110,.2)",borderRadius:12,padding:"14px 16px",marginBottom:18}}>
          <div style={{fontSize:11,color:P.gold,marginBottom:3}}>💡 Cómo funciona</div>
          <div style={{fontSize:12,color:"#fff",lineHeight:1.6}}>{steps[step].hint}</div>
        </div>
        <button onClick={()=>{window.open(steps[step].url,"_blank");setStep(step+1);}} style={{width:"100%",padding:"14px",background:GOLD,color:"#0D0D0D",border:"none",borderRadius:12,fontSize:14,fontWeight:800,cursor:"pointer",fontFamily:"-apple-system,sans-serif",marginBottom:9}}>{steps[step].btn}</button>
        <button onClick={onClose} style={{width:"100%",padding:"11px",background:"transparent",color:P.muted,border:`1px solid ${P.border}`,borderRadius:12,fontSize:13,cursor:"pointer",fontFamily:"-apple-system,sans-serif"}}>{t.cancel}</button>
      </>:<div style={{textAlign:"center",padding:"16px 0"}}>
        <div style={{width:64,height:64,background:GOLD,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",fontSize:28}}>✓</div>
        <div style={{fontSize:20,fontWeight:900,color:"#fff",marginBottom:6}}>{t.pkgDone}</div>
        <div style={{fontSize:13,color:P.sub,marginBottom:5}}>{t.pkgBooked}</div>
        <div style={{fontSize:26,fontWeight:700,color:P.gold,marginBottom:22}}>{total}€</div>
        <button onClick={onClose} style={{width:"100%",padding:"13px",background:GOLD,color:"#0D0D0D",border:"none",borderRadius:12,fontSize:14,fontWeight:800,cursor:"pointer",fontFamily:"-apple-system,sans-serif"}}>{t.close}</button>
      </div>}
    </div>
  </div>;
}

function MyTrips({user,onClose,onLoad}){
  const[trips,setTrips]=useState([]);
  const[loading,setLoading]=useState(true);
  const t_=T["es"];
  useEffect(()=>{if(!user)return;supabase.from("trips").select("*").eq("user_id",user.id).order("created_at",{ascending:false}).then(({data})=>{setTrips(data||[]);setLoading(false);});},[user]);
  async function del(id){await supabase.from("trips").delete().eq("id",id);setTrips(prev=>prev.filter(t=>t.id!==id));}
  return<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.85)",zIndex:1000,display:"flex",alignItems:"flex-end",justifyContent:"center",backdropFilter:"blur(12px)"}} onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
    <div style={{background:"#1C1C1E",borderRadius:"24px 24px 0 0",width:"100%",maxWidth:580,maxHeight:"80vh",display:"flex",flexDirection:"column"}}>
      <div style={{padding:"18px 20px",borderBottom:`1px solid ${P.border}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div><div style={{fontSize:18,fontWeight:900,color:"#fff"}}>✈️ {t_.myTrips}</div><div style={{fontSize:11,color:P.muted,marginTop:2}}>{trips.length} viaje{trips.length!==1?"s":""}</div></div>
        <button onClick={onClose} style={{background:"#2C2C2E",border:"none",color:P.muted,borderRadius:"50%",width:30,height:30,cursor:"pointer",fontSize:15,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"10px"}}>
        {loading&&<div style={{textAlign:"center",padding:"40px",color:P.muted}}>Cargando...</div>}
        {!loading&&trips.length===0&&<div style={{textAlign:"center",padding:"40px"}}><div style={{fontSize:36,marginBottom:10}}>🗺️</div><div style={{fontSize:14,color:P.muted}}>{t_.noTrips}</div></div>}
        {trips.map(trip=><div key={trip.id} style={{background:"#252525",borderRadius:13,padding:"13px",marginBottom:8,display:"flex",gap:12,alignItems:"center"}}>
          <div style={{width:48,height:48,borderRadius:10,overflow:"hidden",flexShrink:0,background:"#333"}}><img src={getDestImg(trip.destination)} alt={trip.destination} style={{width:"100%",height:"100%",objectFit:"cover"}}/></div>
          <div style={{flex:1,minWidth:0}}><div style={{fontSize:14,fontWeight:700,color:"#fff"}}>{trip.destination}</div><div style={{fontSize:11,color:P.muted}}>{trip.origin||"?"} · {trip.budget||"?"}€</div><div style={{fontSize:10,color:"#48484A",marginTop:2}}>{new Date(trip.created_at).toLocaleDateString()}</div></div>
          <div style={{display:"flex",gap:6}}>
            <button onClick={()=>{onLoad(trip);onClose();}} style={{background:GOLD,color:"#0D0D0D",border:"none",borderRadius:7,padding:"6px 11px",fontSize:11,fontWeight:700,cursor:"pointer"}}>Ver</button>
            <button onClick={()=>del(trip.id)} style={{background:"rgba(224,90,78,.15)",color:"#E05A4E",border:"1px solid rgba(224,90,78,.3)",borderRadius:7,padding:"6px 11px",fontSize:11,fontWeight:700,cursor:"pointer"}}>🗑</button>
          </div>
        </div>)}
      </div>
    </div>
  </div>;
}

function GuideModal({place,plan,lang,onClose}){
  const t=T[lang||"es"];
  const[story,setStory]=useState("");
  const[loading,setLoading]=useState(true);
  const[speaking,setSpeaking]=useState(false);
  const audioRef=useRef(null);
  useEffect(()=>{
    callAI(`Eres Sofia, guia turistica experta. ${t.lp} Habla en primera persona. Maximo 2 frases emocionantes.`,`Cuenta algo fascinante sobre: ${place.name} en ${plan?.destination||"este lugar"}.`,200)
      .then(txt=>{setStory(txt);setLoading(false);setSpeaking(true);speakText(txt).then(a=>{audioRef.current=a;if(a)a.onended=()=>setSpeaking(false);else setSpeaking(false);});})
      .catch(()=>setLoading(false));
    return()=>{if(audioRef.current){audioRef.current.pause();audioRef.current.src="";}};
  },[]);
  function replay(){if(audioRef.current){audioRef.current.pause();}setSpeaking(true);speakText(story).then(a=>{audioRef.current=a;if(a)a.onended=()=>setSpeaking(false);else setSpeaking(false);});}
  return<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.92)",zIndex:2000,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-end"}}>
    <div style={{position:"absolute",inset:0,overflow:"hidden"}}><WikiImg name={place.name} style={{opacity:.3}}/><div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.95) 40%,rgba(0,0,0,.3) 100%)"}}/></div>
    <div style={{position:"relative",width:"100%",maxWidth:480,padding:"0 18px 48px",zIndex:1}}>
      <div style={{display:"flex",alignItems:"flex-end",gap:14,marginBottom:18}}>
        <div style={{position:"relative",flexShrink:0}}><div style={{width:68,height:68,borderRadius:"50%",overflow:"hidden",border:`3px solid ${speaking?"#22C55E":P.gold}`,transition:"border-color .3s"}}><img src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&q=80" alt="Sofia" style={{width:"100%",height:"100%",objectFit:"cover"}}/></div>{speaking&&<div style={{position:"absolute",bottom:2,right:2,width:14,height:14,background:"#22C55E",borderRadius:"50%",border:"2px solid #0D0D0D",animation:"pulse 1s ease infinite"}}/>}</div>
        <div><div style={{fontSize:17,fontWeight:900,color:"#fff"}}>Sofia</div><div style={{fontSize:11,color:P.gold}}>{t.sofiaGuide}{place.name}</div></div>
        <button onClick={onClose} style={{marginLeft:"auto",background:"rgba(255,255,255,.1)",border:"none",color:"#fff",borderRadius:"50%",width:34,height:34,cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
      </div>
      <div style={{background:"rgba(0,0,0,.6)",backdropFilter:"blur(20px)",borderRadius:18,padding:"18px",border:`1px solid ${P.goldBorder}`,marginBottom:14,minHeight:80}}>
        {loading?<div style={{display:"flex",gap:5,justifyContent:"center",padding:"16px 0"}}>{[0,1,2].map(i=><div key={i} style={{width:7,height:7,background:P.gold,borderRadius:"50%",animation:`dot .8s ${i*.2}s ease-in-out infinite`}}/>)}</div>:<p style={{margin:0,fontSize:14,color:"#fff",lineHeight:1.7,fontStyle:"italic"}}>"{story}"</p>}
      </div>
      <div style={{display:"flex",gap:9}}>
        <button onClick={replay} disabled={loading||!story} style={{flex:1,padding:"12px",background:GOLD,color:"#0D0D0D",border:"none",borderRadius:11,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"-apple-system,sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:7}}>{speaking?"🔊 Hablando...":"▶️ Escuchar de nuevo"}</button>
        <button onClick={onClose} style={{padding:"12px 16px",background:"rgba(255,255,255,.1)",color:"#fff",border:"1px solid rgba(255,255,255,.2)",borderRadius:11,fontSize:13,cursor:"pointer"}}>{t.close}</button>
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
  async function announce(text){if(audioRef.current)audioRef.current.pause();setSpeaking(true);const a=await speakText(text);audioRef.current=a;if(a)a.onended=()=>setSpeaking(false);setLog(prev=>[{text,time:new Date().toLocaleTimeString()},...prev.slice(0,3)]);}
  useEffect(()=>{
    if(!active||!userPos||!places.length)return;
    const sorted=places.map(p=>({...p,dist:hav(userPos.lat,userPos.lng,p.lat||0,p.lng||0)})).filter(p=>p.lat&&p.lng).sort((a,b)=>a.dist-b.dist);
    if(!sorted.length)return;
    const near=sorted[0];
    if(near.dist<150&&near.name!==lastRef.current){
      lastRef.current=near.name;
      const next=sorted[1];
      callAI(`Eres Sofia, audioguia. ${t.lp} Max 2 frases cortas.`,`El turista llega a ${near.name} en ${city}.`,150)
        .then(txt=>{let msg=txt;if(next&&next.dist<600){const br=bearing(userPos.lat,userPos.lng,next.lat,next.lng);const dir=dirName(br,lang==="es");const dist=Math.round(next.dist);msg+=` ${next.name} está a ${dist} metros hacia el ${dir}.`;}announce(msg);})
        .catch(()=>{});
    }
  },[userPos,active,places]);
  return<div style={{position:"fixed",inset:0,background:"#0D0D0D",zIndex:1100,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"24px"}}>
    <button onClick={onClose} style={{position:"absolute",top:20,right:20,background:"#2C2C2E",border:"none",color:"#fff",borderRadius:"50%",width:34,height:34,cursor:"pointer",fontSize:15,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
    <div style={{width:90,height:90,borderRadius:"50%",overflow:"hidden",border:`3px solid ${speaking?"#22C55E":P.gold}`,boxShadow:`0 0 ${speaking?40:20}px ${speaking?"rgba(34,197,94,.5)":"rgba(201,169,110,.3)"}`,marginBottom:20,transition:"all .3s"}}><img src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&q=80" alt="Sofia" style={{width:"100%",height:"100%",objectFit:"cover"}}/></div>
    <div style={{fontSize:20,fontWeight:900,color:"#fff",marginBottom:3}}>Sofia</div>
    <div style={{fontSize:12,color:P.gold,marginBottom:28}}>{t.sofiaGuide}{city}</div>
    <div style={{background:"#1C1C1E",borderRadius:18,padding:"18px 22px",width:"100%",maxWidth:320,marginBottom:22,textAlign:"center",minHeight:80,display:"flex",alignItems:"center",justifyContent:"center"}}>
      {speaking?<div><div style={{display:"flex",gap:4,justifyContent:"center",marginBottom:8}}>{[0,1,2,3,4].map(i=><div key={i} style={{width:3,background:"#22C55E",borderRadius:2,animation:`sw .6s ${i*.1}s ease-in-out infinite`}}/>)}</div><div style={{fontSize:12,color:"#22C55E",fontWeight:600}}>{t.sofiaSpeaking}</div></div>:active?<div style={{fontSize:12,color:P.sub}}>{t.sofiaWalking}</div>:<div><div style={{fontSize:24,marginBottom:6}}>🎧</div><div style={{fontSize:12,color:P.sub}}>{t.sofiaPut}</div></div>}
    </div>
    {log.length>0&&<div style={{width:"100%",maxWidth:320,marginBottom:18}}>{log.map((l,i)=><div key={i} style={{background:"#1C1C1E",borderRadius:9,padding:"8px 12px",marginBottom:5,opacity:1-i*.2}}><div style={{fontSize:9,color:"#48484A",marginBottom:2}}>{l.time}</div><div style={{fontSize:11,color:P.sub,lineHeight:1.4}}>{l.text.slice(0,90)}...</div></div>)}</div>}
    <button onClick={()=>setActive(!active)} style={{background:active?"rgba(224,90,78,.2)":GOLD,color:active?"#E05A4E":"#0D0D0D",border:active?"1px solid rgba(224,90,78,.4)":"none",borderRadius:50,padding:"15px 36px",fontSize:15,fontWeight:800,cursor:"pointer",fontFamily:"-apple-system,sans-serif"}}>{active?t.stopGuide:t.startGuide}</button>
    <style>{`@keyframes sw{0%,100%{height:6px}50%{height:20px}}`}</style>
  </div>;
}

function ExploreMode({lang,onClose}){
  const t=T[lang||"es"];
  const CITIES=["Bangkok","Madrid","Roma","Paris","Tokyo","Barcelona","London","Berlin","Amsterdam","Lisboa","Dubai","Singapore","New York","Buenos Aires","Istanbul","Athens","Prague","Vienna","Budapest","Bali","Hong Kong","Seoul","Sydney","Cape Town","Cairo","Mumbai","Rio de Janeiro","Mexico City","Vancouver","Toronto"];
  const[city,setCity]=useState("");
  const[sugs,setSugs]=useState([]);
  const[places,setPlaces]=useState([]);
  const[loading,setLoading]=useState(false);
  const[selPlace,setSelPlace]=useState(null);
  const[userPos,setUserPos]=useState(null);
  const[gps,setGps]=useState(false);
  const[showMap,setShowMap]=useState(false);
  const[audioGuide,setAudioGuide]=useState(false);
  const[activeMap,setActiveMap]=useState(null);
  const lastRef=useRef(null);
  const leafReady=useLeaflet();

  function handleInput(v){setCity(v);if(v.length>1)setSugs(CITIES.filter(c=>c.toLowerCase().startsWith(v.toLowerCase())).slice(0,6));else setSugs([]);}

  function enableGPS(){
    if(!navigator.geolocation)return;setGps(true);
    navigator.geolocation.watchPosition(p=>{
      const pos={lat:p.coords.latitude,lng:p.coords.longitude};setUserPos(pos);
      if(places.length){const n=places.find(pl=>pl.lat&&pl.lng&&hav(pos.lat,pos.lng,pl.lat,pl.lng)<200);if(n&&n.name!==lastRef.current){lastRef.current=n.name;setSelPlace(n);}}
    },()=>{},{enableHighAccuracy:true,maximumAge:3000});
  }

  async function search(q){
    const query=q||city;if(!query.trim())return;
    setCity(query);setSugs([]);setLoading(true);setPlaces([]);setSelPlace(null);setShowMap(false);
    try{
      const raw=await callAI(
        'You are a local guide. Reply ONLY a valid JSON array. No text before or after. No backticks. Start with [ end with ]. Each item: {"name":"...","type":"temple","description":"2 sentences about history and importance","curiosity":"1 fascinating fact","lat":13.7,"lng":100.5}',
        "Give me the 8 most interesting monuments, temples, churches, parks, statues and museums in "+query+". Real GPS coordinates required. JSON array only.",
        1200
      );
      const parsed=parseJSON(raw);
      if(parsed&&Array.isArray(parsed)&&parsed.length>0){setPlaces(parsed);setShowMap(true);}
      else{alert(t.errorMsg);}
    }catch(e){alert(t.errorTitle+": "+e.message);}
    setLoading(false);
  }

  const typeIcon=tp=>({church:"⛪",park:"🌳",museum:"🏛️",statue:"🗿",monument:"🏛️",temple:"🕌",building:"🏢",palace:"🏰"})[tp]||"📍";

  return<div style={{position:"fixed",inset:0,background:"#0D0D0D",zIndex:1000,display:"flex",flexDirection:"column"}}>
    <div style={{background:"rgba(13,13,13,.96)",backdropFilter:"blur(20px)",borderBottom:`1px solid ${P.border}`,padding:"11px 15px",display:"flex",alignItems:"center",gap:9,flexShrink:0}}>
      <button onClick={onClose} style={{background:"#2C2C2E",border:"none",color:"#fff",borderRadius:"50%",width:32,height:32,cursor:"pointer",fontSize:15,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>←</button>
      <div style={{flex:1}}><div style={{fontSize:15,fontWeight:900,color:"#fff"}}>{t.exploreTitle}</div><div style={{fontSize:10,color:P.gold}}>{t.exploreSub}</div></div>
      {gps&&<div style={{background:"rgba(34,197,94,.15)",border:"1px solid rgba(34,197,94,.3)",color:"#22C55E",borderRadius:7,padding:"3px 8px",fontSize:10,fontWeight:600}}>📍 GPS</div>}
    </div>

    <div style={{padding:"11px 13px",borderBottom:`1px solid ${P.border}`,flexShrink:0,position:"relative",zIndex:10}}>
      <div style={{display:"flex",gap:7}}>
        <div style={{flex:1,position:"relative"}}>
          <input value={city} onChange={e=>handleInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&search()} placeholder={t.explorePh} style={{width:"100%",background:"#2C2C2E",border:"1.5px solid #3A3A3C",borderRadius:10,color:"#fff",fontSize:13,padding:"10px 12px",outline:"none",fontFamily:"-apple-system,sans-serif",boxSizing:"border-box"}} onFocus={e=>e.target.style.borderColor=P.gold} onBlur={e=>{e.target.style.borderColor="#3A3A3C";setTimeout(()=>setSugs([]),200);}}/>
          {sugs.length>0&&<div style={{position:"absolute",top:"100%",left:0,right:0,background:"#1C1C1E",border:`1px solid ${P.border2}`,borderRadius:10,overflow:"hidden",zIndex:100,marginTop:3,boxShadow:"0 8px 24px rgba(0,0,0,.6)"}}>
            {sugs.map((s,i)=><button key={i} onClick={()=>search(s)} style={{width:"100%",background:"transparent",border:"none",borderBottom:i<sugs.length-1?`1px solid ${P.border}`:"none",padding:"10px 13px",color:"#fff",fontSize:12,cursor:"pointer",textAlign:"left",fontFamily:"-apple-system,sans-serif",display:"flex",alignItems:"center",gap:8}} onMouseEnter={e=>e.currentTarget.style.background="#2C2C2E"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>🌍 {s}</button>)}
          </div>}
        </div>
        <button onClick={()=>search()} disabled={!city.trim()||loading} style={{background:GOLD,color:"#0D0D0D",border:"none",borderRadius:10,padding:"10px 14px",fontSize:12,fontWeight:700,cursor:"pointer",flexShrink:0,opacity:!city.trim()||loading?.5:1}}>{loading?<Spin size={14} color="#0D0D0D"/>:t.exploreSearch}</button>
      </div>
      {places.length>0&&<div style={{display:"flex",gap:6,marginTop:8}}>
        {!gps&&<button onClick={enableGPS} style={{flex:1,background:"rgba(59,130,246,.12)",border:"1px solid rgba(59,130,246,.25)",color:"#60A5FA",borderRadius:8,padding:"7px",fontSize:10,fontWeight:600,cursor:"pointer"}}>{t.activateGPS}</button>}
        <button onClick={()=>setShowMap(!showMap)} style={{flex:1,background:showMap?"rgba(201,169,110,.2)":"rgba(201,169,110,.08)",border:`1px solid ${P.goldBorder}`,color:P.gold,borderRadius:8,padding:"7px",fontSize:10,fontWeight:600,cursor:"pointer"}}>{showMap?t.hideMap:t.showMap}</button>
        <button onClick={()=>setAudioGuide(true)} style={{flex:1,background:"rgba(34,197,94,.1)",border:"1px solid rgba(34,197,94,.25)",color:"#22C55E",borderRadius:8,padding:"7px",fontSize:10,fontWeight:600,cursor:"pointer"}}>{t.audioguide}</button>
      </div>}
    </div>

    {showMap&&leafReady&&places.length>0&&<div style={{height:200,flexShrink:0,borderBottom:`1px solid ${P.border}`}}><TravelMap places={places.map(p=>({...p,type:"place"}))} active={activeMap} onSelect={i=>{setActiveMap(i);setSelPlace(places[i]);}} userPos={userPos} height={200}/></div>}

    {loading&&<div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:12}}><div style={{fontSize:36,animation:"float 2s ease-in-out infinite"}}>🔍</div><div style={{color:P.gold,fontWeight:600,fontSize:13}}>{t.exploreLoading}</div></div>}

    {!loading&&places.length===0&&<div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:10,padding:"20px",textAlign:"center"}}>
      <div style={{fontSize:44}}>🌍</div>
      <div style={{fontSize:16,fontWeight:700,color:"#fff"}}>{t.exploreEmpty}</div>
      <div style={{fontSize:12,color:P.muted,maxWidth:260}}>{t.exploreTip}</div>
      <div style={{display:"flex",gap:7,flexWrap:"wrap",justifyContent:"center",marginTop:8}}>
        {["Bangkok","Roma","Barcelona","París","Tokio"].map(c=><button key={c} onClick={()=>search(c)} style={{background:"rgba(201,169,110,.1)",border:`1px solid ${P.goldBorder}`,color:P.gold,borderRadius:18,padding:"6px 12px",fontSize:11,cursor:"pointer",fontFamily:"-apple-system,sans-serif"}}>🌍 {c}</button>)}
      </div>
    </div>}

    {!loading&&places.length>0&&<div style={{flex:1,overflowY:"auto",padding:"10px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
      {places.map((p,i)=><div key={i} onClick={()=>setSelPlace(p)} style={{background:"#1C1C1E",border:`1px solid ${selPlace?.name===p.name?P.gold:P.border}`,borderRadius:12,overflow:"hidden",cursor:"pointer",transition:"all .2s"}}>
        <div style={{height:90,background:"#252525",position:"relative",overflow:"hidden"}}><WikiImg name={p.name}/><div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.65),transparent)"}}/><div style={{position:"absolute",bottom:5,left:7,fontSize:14}}>{typeIcon(p.type)}</div></div>
        <div style={{padding:"8px 9px"}}><div style={{fontSize:11,fontWeight:700,color:"#fff",marginBottom:2,lineHeight:1.3}}>{p.name}</div><div style={{fontSize:9,color:P.muted,lineHeight:1.4,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{p.description}</div><div style={{fontSize:9,color:P.gold,fontWeight:600,marginTop:4}}>Sofia te cuenta →</div></div>
      </div>)}
    </div>}

    {audioGuide&&<AudioGuide places={places} userPos={userPos} lang={lang} city={city} onClose={()=>setAudioGuide(false)}/>}
    {selPlace&&<GuideModal place={selPlace} plan={{destination:city}} lang={lang} onClose={()=>setSelPlace(null)}/>}
  </div>;
}

function MarcoGuide({plan,places,userPos,lang,onClose}){
  const t=T[lang||"es"];
  const[msgs,setMsgs]=useState([{r:"a",txt:t.guideHi,mood:"happy"}]);
  const[inp,setInp]=useState("");
  const[load,setLoad]=useState(false);
  const endRef=useRef(null);
  useEffect(()=>{endRef.current?.scrollIntoView({behavior:"smooth"});},[msgs]);
  async function send(){
    if(!inp.trim()||load)return;
    const q=inp.trim();setInp("");setMsgs(prev=>[...prev,{r:"u",txt:q}]);setLoad(true);
    const ctx=plan?`Destino: ${plan.destination}.`:"";
    try{const reply=await callAI(`Eres Marco, guia turistico amigable. ${t.lp} ${ctx} Max 2 frases.`,q,200);setMsgs(prev=>[...prev,{r:"a",txt:reply}]);}
    catch{setMsgs(prev=>[...prev,{r:"a",txt:"Error. Intenta de nuevo."}]);}
    setLoad(false);
  }
  return<div style={{position:"fixed",bottom:88,right:18,width:300,background:"#1C1C1E",border:`1px solid ${P.border}`,borderRadius:20,boxShadow:"0 20px 60px rgba(0,0,0,.7)",zIndex:500,display:"flex",flexDirection:"column",maxHeight:"55vh",overflow:"hidden"}}>
    <div style={{background:"#1E1E20",padding:"12px 14px",borderRadius:"20px 20px 0 0",display:"flex",alignItems:"center",gap:9,borderBottom:`1px solid ${P.border}`}}>
      <div style={{width:36,height:36,borderRadius:"50%",background:GOLD,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>🧑‍🌾</div>
      <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:"#fff"}}>Marco</div><div style={{fontSize:10,color:P.gold}}>AI Guide · {plan?.destination||"..."}</div></div>
      <button onClick={onClose} style={{background:"#2C2C2E",border:"none",color:P.muted,borderRadius:7,width:25,height:25,cursor:"pointer",fontSize:13,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
    </div>
    <div style={{flex:1,overflowY:"auto",padding:"9px",display:"flex",flexDirection:"column",gap:7}}>
      {msgs.map((m,i)=><div key={i} style={{display:"flex",gap:6,alignItems:"flex-end",flexDirection:m.r==="u"?"row-reverse":"row"}}>
        {m.r==="a"&&<div style={{width:22,height:22,borderRadius:"50%",background:GOLD,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,flexShrink:0}}>🧑‍🌾</div>}
        <div style={{background:m.r==="u"?GOLD:"#2C2C2E",color:m.r==="u"?"#0D0D0D":"#fff",borderRadius:m.r==="u"?"13px 13px 3px 13px":"13px 13px 13px 3px",padding:"8px 11px",fontSize:12,lineHeight:1.5,maxWidth:"77%"}}>{m.txt}</div>
      </div>)}
      {load&&<div style={{display:"flex",gap:5,padding:"6px 11px",background:"#2C2C2E",borderRadius:"13px 13px 13px 3px",width:"fit-content"}}>{[0,1,2].map(i=><div key={i} style={{width:5,height:5,background:P.gold,borderRadius:"50%",animation:`dot .8s ${i*.2}s ease-in-out infinite`}}/>)}</div>}
      <div ref={endRef}/>
    </div>
    <div style={{padding:"8px",borderTop:`1px solid ${P.border}`,display:"flex",gap:6}}>
      <input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder={t.guidePh} style={{flex:1,background:"#2C2C2E",border:`1px solid ${P.border}`,borderRadius:8,padding:"8px 10px",fontSize:11,color:"#fff",outline:"none",fontFamily:"-apple-system,sans-serif"}} onFocus={e=>e.target.style.borderColor=P.gold} onBlur={e=>e.target.style.borderColor=P.border}/>
      <button onClick={send} disabled={!inp.trim()||load} style={{background:GOLD,border:"none",borderRadius:8,width:34,height:34,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,opacity:!inp.trim()||load?.5:1}}>↑</button>
    </div>
  </div>;
}

function DateInput({start,end,onChange,t}){
  const today=new Date().toISOString().split("T")[0];
  const s={background:"#2C2C2E",border:"1.5px solid #3A3A3C",borderRadius:10,color:"#fff",padding:"10px 12px",fontSize:12,fontFamily:"-apple-system,sans-serif",colorScheme:"dark",outline:"none",width:"100%",boxSizing:"border-box",cursor:"pointer"};
  return<div style={{display:"flex",gap:9,flexWrap:"wrap"}}>
    {[{label:t.arrival,field:"start",min:today,val:start},{label:t.departure,field:"end",min:start||today,val:end}].map(({label,field,min,val})=><div key={field} style={{flex:1,minWidth:110}}>
      <div style={{fontSize:9,fontWeight:600,color:P.muted,letterSpacing:".05em",textTransform:"uppercase",marginBottom:4}}>{label}</div>
      <input type="date" min={min} value={val} onChange={e=>onChange(field,e.target.value)} style={s} onFocus={e=>e.target.style.borderColor=P.gold} onBlur={e=>e.target.style.borderColor="#3A3A3C"}/>
    </div>)}
  </div>;
}

const Sk=({w="100%",h=14,r=8,mb=0})=><div style={{width:w,height:h,borderRadius:r,background:`linear-gradient(90deg,${P.card2} 25%,${P.card3} 50%,${P.card2} 75%)`,backgroundSize:"200% 100%",animation:"shimmer 1.4s infinite",marginBottom:mb,flexShrink:0}}/>;

export default function App(){
  const[lang,setLang]=useState("es");
  const t=T[lang];

  const[user,setUser]=useState(null);
  const[authOpen,setAuthOpen]=useState(false);
  const[guideOpen,setGuideOpen]=useState(false);
  const[exploreOpen,setExploreOpen]=useState(false);
  const[myTripsOpen,setMyTripsOpen]=useState(false);
  const[bookingOpen,setBookingOpen]=useState(false);
  const[toast,setToast]=useState(null);
  const[userPos,setUserPos]=useState(null);
  const[nearbyModal,setNearbyModal]=useState(null);
  const lastNearRef=useRef(null);

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
  const leafReady=useLeaflet();
  const days=diffDays(start,end);
  const nights=days?days-1:plan?.days||5;

  useEffect(()=>{supabase.auth.getSession().then(({data:{session}})=>setUser(session?.user||null));const{data:{subscription}}=supabase.auth.onAuthStateChange((_,s)=>setUser(s?.user||null));return()=>subscription.unsubscribe();},[]);

  useEffect(()=>{
    if(!navigator.geolocation||!plan)return;
    const id=navigator.geolocation.watchPosition(p=>{
      const pos={lat:p.coords.latitude,lng:p.coords.longitude};setUserPos(pos);
      if(places.length){const n=places.find(pl=>pl.lat&&pl.lng&&hav(pos.lat,pos.lng,pl.lat,pl.lng)<150);if(n&&n.name!==lastNearRef.current){lastNearRef.current=n.name;setNearbyModal(n);}}
    },()=>{},{enableHighAccuracy:true,maximumAge:5000});
    return()=>navigator.geolocation.clearWatch(id);
  },[plan,places]);

  function showToast(msg){setToast(msg);setTimeout(()=>setToast(null),2500);}

  function buildPlaces(p,hs,rs){const out=[];p?.map_places?.forEach(x=>{if(x.lat&&x.lng)out.push({...x,type:"place"});});hs?.forEach(h=>{if(h.lat&&h.lng)out.push({...h,type:"hotel"});});rs?.forEach(r=>{if(r.lat&&r.lng)out.push({...r,type:"restaurant"});});return out;}

  async function generate(){
    if(!dest.trim())return;
    setApiErr(null);setLoading(true);setPlan(null);setFlights([]);setHotels([]);setRests([]);setWeather(null);setSelF(null);setSelH(null);setPlaces([]);
    const lp=t.lp;const dctx=start&&end?`Dates: ${start} to ${end} (${days} days). Travelers: ${travelers}.`:"";
    const pct=STYLES[tStyle||"comfort"].pct;const bNum=budget?parseInt(budget):800;const hBudget=Math.round(bNum*pct/(nights||5));
    const types=tripTypes.length?tripTypes.join(", "):"culture";
    setLoadStep(0);
    try{
      const raw=await callAI(
        `Expert travel planner. ${lp} ${dctx} YOU MUST reply with ONLY a raw JSON object. NO backticks. NO markdown. Start with { end with }. Format: {"destination":"city, country","days":5,"budget":"1000€","summary":"2 sentences","map_places":[{"name":"...","lat":0.0,"lng":0.0,"description":"..."}],"itinerary":[{"day":"Day 1 - Name","theme":"...","morning":"...","afternoon":"...","evening":"...","transport":"..."}],"tips":["..."],"lat":0.0,"lng":0.0}`,
        `${dest}${budget?" · "+budget+"€":""}${dctx?" · "+dctx:""} Trip type: ${types}.`,
        4000
      );
      const planData=parseJSON(raw);
      if(!planData||!planData.destination)throw new Error("Invalid plan data");
      setPlan(planData);setLoading(false);
      const destination=planData.destination;

      setLoadStep(1);
      const [r1,r2,r3]=await Promise.all([
        callAI(`3 realistic flights from ${origin||"Madrid"} to ${destination}. ${lp} ONLY raw JSON array: [{"airline":"...","departure":"HH:MM","arrival":"HH:MM","duration":"XhYm","stops":0,"price":XXX}]`,"Flights",700),
        callAI(`3 hotels in ${destination}, ~${hBudget}€/night, ${tStyle||"comfort"} style. ${lp} ONLY raw JSON array: [{"name":"...","stars":3,"neighborhood":"...","description":"...","highlights":["..."],"price_per_night":XX,"lat":0.0,"lng":0.0}]`,"Hotels",1000),
        callAI(`5 restaurants in ${destination}. Style: ${types}. ${lp} ONLY raw JSON array: [{"name":"...","cuisine":"...","rating":4.2,"price_range":"€€","description":"...","neighborhood":"...","lat":0.0,"lng":0.0}]`,"Restaurants",900),
      ]);

      setLoadStep(2);
      const fl=parseJSON(r1);const hs=parseJSON(r2);const rs=parseJSON(r3);
      if(fl?.length){setFlights(fl);setSelF(0);}
      if(hs?.length){const sorted=tStyle==="luxury"?hs.sort((a,b)=>b.price_per_night-a.price_per_night):hs.sort((a,b)=>a.price_per_night-b.price_per_night);setHotels(sorted);setSelH(0);}
      if(rs?.length)setRests(rs);
      setPlaces(buildPlaces(planData,hs||[],rs||[]));

      setLoadStep(3);
      if(planData.lat&&planData.lng&&start){const wx=await fetchWeather(planData.lat,planData.lng,start);setWeather(wx);}
      setLoadStep(-1);
    }catch(e){setLoading(false);setLoadStep(-1);setApiErr(t.errorMsg+" ("+e.message+")");}
  }

  async function saveTrip(){
    if(!plan||!user){setAuthOpen(true);return;}
    try{await supabase.from("trips").insert({user_id:user.id,destination:plan.destination,origin,budget,plan});showToast(t.savedOk);}
    catch(e){console.error(e);}
  }

  function share(){
    if(!plan)return;
    const txt=`✈️ ${plan.destination} · ${plan.days} días · ${plan.budget}\nhttps://trippio.travel`;
    if(navigator.share)navigator.share({title:`Trippio - ${plan.destination}`,text:txt}).catch(()=>{});
    else{navigator.clipboard?.writeText(txt);showToast(t.shareCopied);}
  }

  function reset(){setPlan(null);setFlights([]);setHotels([]);setRests([]);setWeather(null);setSelF(null);setSelH(null);setPlaces([]);setApiErr(null);setDest("");setBudget("");setStart("");setEnd("");setTravelers(1);setStep(0);setTripTypes([]);setTStyle(null);setGuideOpen(false);setUserPos(null);}

  const fSel=selF!=null?flights[selF]:null;
  const hSel=selH!=null?hotels[selH]:null;

  const CSS=`
    @keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
    @keyframes up{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
    @keyframes pop{0%{opacity:0;transform:scale(.9)}100%{opacity:1;transform:scale(1)}}
    @keyframes pulse{0%,100%{opacity:.4;transform:scale(.78)}50%{opacity:1;transform:scale(1)}}
    @keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
    @keyframes dot{0%,80%,100%{transform:scale(.8);opacity:.5}40%{transform:scale(1.2);opacity:1}}
    .fa{animation:up .4s cubic-bezier(.16,1,.3,1) both}
    .fa2{animation:up .4s .06s cubic-bezier(.16,1,.3,1) both}
    .fa3{animation:up .4s .12s cubic-bezier(.16,1,.3,1) both}
    .pa{animation:pop .4s cubic-bezier(.16,1,.3,1) both}
    .pa2{animation:pop .4s .06s cubic-bezier(.16,1,.3,1) both}
    .pa3{animation:pop .4s .12s cubic-bezier(.16,1,.3,1) both}
    .pa4{animation:pop .4s .18s cubic-bezier(.16,1,.3,1) both}
    .hv{transition:transform .2s,border-color .2s}.hv:hover{transform:translateY(-3px)}
    input:focus,textarea:focus{outline:none!important}
    ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#3A3A3C;border-radius:2px}
    *{-webkit-font-smoothing:antialiased}
    button,input,select{font-family:-apple-system,sans-serif}
    .grid2{display:grid;grid-template-columns:1fr 280px;gap:20px;align-items:start}
    @media(max-width:800px){.grid2{grid-template-columns:1fr}}
  `;

  return<div style={{minHeight:"100vh",background:P.black,color:P.white,fontFamily:"-apple-system,'SF Pro Display',sans-serif"}}>
    <style>{CSS}</style>

    {/* NAV */}
    <nav style={{background:"rgba(13,13,13,.96)",backdropFilter:"blur(20px)",borderBottom:`1px solid ${P.border}`,padding:"0 16px",height:54,display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:200}}>
      <div style={{display:"flex",alignItems:"center",gap:9}}><Logo size={28}/><div><div style={{fontSize:15,fontWeight:700,color:P.white}}>Trippio</div><div style={{fontSize:7,color:P.gold,letterSpacing:".12em",textTransform:"uppercase",opacity:.8}}>AI Travel</div></div></div>
      <div style={{display:"flex",gap:6,alignItems:"center"}}>
        <LangSel lang={lang} setLang={setLang}/>
        <button onClick={()=>setExploreOpen(true)} style={{background:"rgba(201,169,110,.12)",border:`1px solid ${P.goldBorder}`,color:P.gold,borderRadius:8,padding:"5px 10px",fontSize:11,cursor:"pointer",fontWeight:600}}>{t.exploreBtn}</button>
        {plan&&<button onClick={share} style={{background:P.card2,border:`1px solid ${P.border}`,color:P.sub,borderRadius:8,padding:"5px 10px",fontSize:11,cursor:"pointer",fontWeight:600}}>↑ {t.shareBtn}</button>}
        {plan&&<button onClick={saveTrip} style={{background:P.goldDim,border:`1px solid ${P.goldBorder}`,color:P.gold,borderRadius:8,padding:"5px 10px",fontSize:11,cursor:"pointer",fontWeight:600}}>{t.saveBtn}</button>}
        {plan&&<Btn size="sm" outline color={P.muted} onClick={reset}>{t.newSearch}</Btn>}
        {user&&<button onClick={()=>setMyTripsOpen(true)} style={{background:P.card2,border:`1px solid ${P.border}`,color:P.sub,borderRadius:8,padding:"5px 10px",fontSize:11,cursor:"pointer",fontWeight:600}}>{t.myTrips}</button>}
        {!user?<button onClick={()=>setAuthOpen(true)} style={{background:GOLD,color:"#0D0D0D",border:"none",borderRadius:8,padding:"6px 12px",fontSize:11,fontWeight:700,cursor:"pointer"}}>{t.loginBtn}</button>:<button onClick={()=>supabase.auth.signOut()} style={{background:P.card2,border:`1px solid ${P.border}`,color:P.muted,borderRadius:8,padding:"6px 12px",fontSize:11,fontWeight:600,cursor:"pointer"}}>👤 {t.logoutBtn}</button>}
      </div>
    </nav>

    {/* MODALS */}
    {authOpen&&<AuthModal onClose={()=>setAuthOpen(false)} onAuth={u=>setUser(u)}/>}
    {exploreOpen&&<ExploreMode lang={lang} onClose={()=>setExploreOpen(false)}/>}
    {myTripsOpen&&user&&<MyTrips user={user} onClose={()=>setMyTripsOpen(false)} onLoad={trip=>{setPlan(trip.plan);setOrigin(trip.origin||"");setDest(trip.destination||"");setBudget(trip.budget||"");setMyTripsOpen(false);}}/>}
    {bookingOpen&&fSel&&hSel&&<BookingFlow flight={fSel} hotel={hSel} dest={plan?.destination} travelers={travelers} nights={nights} t={t} onClose={()=>setBookingOpen(false)}/>}
    {plan&&guideOpen&&<MarcoGuide plan={plan} places={places} userPos={userPos} lang={lang} onClose={()=>setGuideOpen(false)}/>}
    {plan&&!guideOpen&&<button onClick={()=>setGuideOpen(true)} style={{position:"fixed",bottom:18,right:18,width:60,height:60,background:"#1E1E20",border:`2px solid ${P.goldBorder}`,borderRadius:"50%",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 8px 32px rgba(0,0,0,.5)",zIndex:499,fontSize:24}}>🧑‍🌾</button>}
    {nearbyModal&&<GuideModal place={nearbyModal} plan={plan} lang={lang} onClose={()=>setNearbyModal(null)}/>}
    {toast&&<div style={{position:"fixed",bottom:28,left:"50%",transform:"translateX(-50%)",background:P.card2,border:`1px solid ${P.goldBorder}`,color:P.gold,borderRadius:10,padding:"10px 18px",fontSize:12,fontWeight:600,zIndex:999,whiteSpace:"nowrap"}}>✓ {toast}</div>}

    <main style={{maxWidth:1060,margin:"0 auto",padding:"0 16px 100px"}}>

      {apiErr&&<div style={{background:"rgba(224,90,78,.12)",border:"1px solid rgba(224,90,78,.3)",borderRadius:11,padding:"13px 16px",margin:"18px 0",display:"flex",gap:10,alignItems:"center"}}><span style={{fontSize:18}}>⚠️</span><div style={{flex:1}}><div style={{fontSize:12,fontWeight:700,color:"#E05A4E",marginBottom:2}}>{t.errorTitle}</div><div style={{fontSize:11,color:P.sub}}>{apiErr}</div></div><button onClick={()=>setApiErr(null)} style={{background:"none",border:"none",color:P.muted,cursor:"pointer",fontSize:16}}>✕</button></div>}

      {/* ONBOARDING */}
      {!plan&&!loading&&<div style={{maxWidth:560,margin:"0 auto",padding:"48px 0 36px"}}>
        <div style={{display:"flex",justifyContent:"center",gap:6,marginBottom:28}} className="fa">
          {[0,1,2].map(s=><div key={s} style={{height:3,borderRadius:2,background:s<=step?P.gold:P.border,width:s===step?36:16,transition:"all .4s"}}/>)}
        </div>

        {step===0&&<>
          <div style={{textAlign:"center",marginBottom:24}} className="fa">
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:11,marginBottom:18}}><Logo size={48}/><div style={{textAlign:"left"}}><div style={{fontSize:32,fontWeight:700,color:P.white,lineHeight:1}}>Trippio</div><div style={{fontSize:9,color:P.gold,letterSpacing:".15em",textTransform:"uppercase",marginTop:2}}>Your trip. One click.</div></div></div>
            <h1 style={{fontSize:"clamp(24px,5vw,40px)",fontWeight:700,lineHeight:1.1,margin:"0 0 1px",color:P.white}} className="fa2">{t.h1}</h1>
            <h1 style={{fontSize:"clamp(24px,5vw,40px)",fontWeight:700,lineHeight:1.1,margin:"0 0 12px",color:P.gold}} className="fa3">{t.h2}</h1>
            <p style={{fontSize:13,color:"rgba(235,235,245,.5)",margin:"0 0 22px",lineHeight:1.7}}>{t.sub}</p>
          </div>
          <div style={{fontSize:18,fontWeight:800,color:P.white,marginBottom:3}}>{t.tripType}</div>
          <p style={{fontSize:12,color:P.muted,marginBottom:16}}>{t.pickOne}</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:18}}>
            {Object.entries(TRIP_TYPES).map(([k,icon])=>{const sel=tripTypes.includes(k);return<button key={k} onClick={()=>toggle(k)} style={{background:sel?P.goldDim:P.card,border:`1.5px solid ${sel?P.goldBorder:P.border}`,borderRadius:12,padding:"13px 7px",cursor:"pointer",textAlign:"center",transition:"all .2s",transform:sel?"translateY(-2px)":"none",position:"relative"}}>
              {sel&&<div style={{position:"absolute",top:6,right:6,width:14,height:14,background:P.gold,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,color:"#0D0D0D",fontWeight:900}}>✓</div>}
              <div style={{fontSize:20,marginBottom:4}}>{icon}</div>
              <div style={{fontSize:9,fontWeight:700,color:sel?P.gold:P.white}}>{t.tripNames[k]}</div>
            </button>;})}
          </div>
          <div style={{display:"flex",justifyContent:"flex-end"}}><Btn onClick={()=>setStep(1)} disabled={tripTypes.length===0}>{t.nextBtn}</Btn></div>
        </>}

        {step===1&&<>
          <div style={{fontSize:18,fontWeight:900,color:"#fff",marginBottom:3}}>{t.styleQ}</div>
          <p style={{fontSize:12,color:P.muted,marginBottom:16}}>{t.formTitle}</p>
          <div style={{display:"flex",flexDirection:"column",gap:9,marginBottom:18}}>
            {Object.entries(STYLES).map(([k,s])=>{const sel=tStyle===k;return<button key={k} onClick={()=>setTStyle(k)} style={{background:sel?P.goldDim:P.card,border:`1px solid ${sel?P.goldBorder:P.border}`,borderRadius:14,padding:"13px 15px",cursor:"pointer",textAlign:"left",transition:"all .2s",display:"flex",alignItems:"center",gap:11}}>
              <div style={{width:38,height:38,background:sel?P.goldDim:P.card3,border:`1px solid ${sel?P.goldBorder:P.border}`,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0}}>{s.icon}</div>
              <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:sel?P.gold:P.white,marginBottom:1}}>{t.styleNames[k]}</div><div style={{fontSize:11,color:P.muted}}>{t.styleDesc[k]}</div></div>
              {sel&&<span style={{color:P.gold,fontSize:18,fontWeight:900}}>✓</span>}
            </button>;})}
          </div>
          <div style={{display:"flex",gap:8,justifyContent:"space-between"}}><Btn outline color={P.muted} onClick={()=>setStep(0)}>{t.backBtn}</Btn><Btn onClick={()=>setStep(2)} disabled={!tStyle}>{t.nextBtn}</Btn></div>
        </>}

        {step===2&&<div className="fa">
          <div style={{display:"flex",gap:6,marginBottom:16,flexWrap:"wrap"}}>
            {tripTypes.map(k=><span key={k} style={{background:P.goldDim,color:P.gold,border:`1px solid ${P.goldBorder}`,borderRadius:6,padding:"3px 9px",fontSize:10,fontWeight:600}}>{TRIP_TYPES[k]} {t.tripNames[k]}</span>)}
            {tStyle&&<span style={{background:GOLD,color:"#fff",borderRadius:8,padding:"4px 11px",fontSize:11,fontWeight:800}}>{STYLES[tStyle].icon} {t.styleNames[tStyle]}</span>}
          </div>
          <div style={{background:P.card,borderRadius:16,padding:"20px 22px",boxShadow:"0 20px 60px rgba(0,0,0,.7)",border:`1px solid ${P.border}`}}>
            <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:14}}>
              {[{l:`✈️ ${t.originL}`,ph:t.originPh,v:origin,sv:setOrigin},{l:`🌍 ${t.destL}`,ph:t.destPh,v:dest,sv:setDest},{l:`💰 ${t.budgetL}`,ph:t.budgetPh,v:budget,sv:setBudget,type:"number"}].map(({l,ph,v,sv,type})=><div key={l}>
                <div style={{fontSize:9,fontWeight:700,color:"rgba(235,235,245,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:4}}>{l}</div>
                <input value={v} onChange={e=>sv(e.target.value)} placeholder={ph} type={type||"text"} style={{width:"100%",background:"#2C2C2E",border:"1.5px solid #3A3A3C",borderRadius:10,color:"#fff",fontSize:13,padding:"10px 12px",boxSizing:"border-box",outline:"none"}} onFocus={e=>e.target.style.borderColor=P.gold} onBlur={e=>e.target.style.borderColor="#3A3A3C"}/>
              </div>)}
            </div>
            <div style={{height:"0.5px",background:"rgba(255,255,255,.07)",margin:"13px 0"}}/>
            <div style={{marginBottom:13}}><DateInput start={start} end={end} onChange={(f,v)=>{if(f==="start"){setStart(v);if(end&&v>end)setEnd("");}else setEnd(v);}} t={t}/></div>
            <div style={{marginBottom:13}}>
              <div style={{fontSize:9,fontWeight:700,color:"rgba(235,235,245,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:6}}>{t.travelers}</div>
              <div style={{display:"flex",alignItems:"center",gap:11}}>
                {[{op:()=>setTravelers(Math.max(1,travelers-1)),label:"−"},{op:()=>setTravelers(Math.min(8,travelers+1)),label:"+"}].map((btn,i)=><button key={i} onClick={btn.op} style={{width:30,height:30,background:"#2C2C2E",border:"1.5px solid #3A3A3C",borderRadius:"50%",cursor:"pointer",fontSize:17,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>{btn.label}</button>).reduce((acc,el,i)=>[...acc,el,i===0&&<span key="n" style={{fontSize:15,fontWeight:800,minWidth:18,textAlign:"center"}}>{travelers}</span>],[])}
                <span style={{fontSize:11,color:P.muted}}>{travelers===1?t.t1:t.tN(travelers)}</span>
              </div>
            </div>
            {days&&days>0&&<div style={{display:"flex",alignItems:"center",gap:6,marginBottom:12,padding:"8px 12px",background:P.goldDim,borderRadius:8,border:`1px solid ${P.goldBorder}`}}><span style={{width:5,height:5,background:P.gold,borderRadius:"50%",animation:"pulse 1.6s ease infinite",display:"inline-block"}}/><span style={{fontSize:10,color:P.gold,fontWeight:600}}>{days} días · {fmt(start,{day:"numeric",month:"long"},lang==="es"?"es-ES":"en-GB")} → {fmt(end,{day:"numeric",month:"long",year:"numeric"},lang==="es"?"es-ES":"en-GB")}</span></div>}
            <Btn full size="lg" onClick={generate} disabled={!dest.trim()}>{t.searchBtn}</Btn>
          </div>
          <div style={{marginTop:9}}><Btn outline color={P.muted} size="sm" onClick={()=>setStep(1)}>{t.backBtn}</Btn></div>
        </div>}
      </div>}

      {/* LOADING */}
      {loading&&!plan&&<div style={{maxWidth:440,margin:"48px auto 0",padding:"0 16px"}} className="fa">
        <div style={{textAlign:"center",marginBottom:22}}>
          <div style={{margin:"0 auto 16px",width:60,display:"flex",justifyContent:"center",animation:"float 3s ease-in-out infinite"}}><Logo size={60}/></div>
          <h2 style={{fontSize:19,fontWeight:800,margin:"0 0 4px"}}>{t.loadTitle}</h2>
          <p style={{fontSize:11,color:P.muted,margin:"0 0 3px"}}>{t.loadSub}</p>
          <p style={{fontSize:11,color:P.gold,fontWeight:600,margin:0}}>{t.loadWait}</p>
        </div>
        <div style={{background:P.card,borderRadius:14,padding:"6px 14px 8px",border:`1px solid ${P.border}`,marginBottom:18}}>
          {[t.step1,t.step2,t.step3,t.step4,t.step5,t.step6].map((label,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 0",opacity:loadStep>=i?1:.3,transition:"opacity .3s",borderBottom:i<5?`1px solid ${P.border}`:"none"}}>
            <div style={{width:26,height:26,borderRadius:"50%",background:loadStep>i?P.goldDim:loadStep===i?P.goldDim:P.card3,border:`1px solid ${loadStep>=i?P.goldBorder:P.border}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              {loadStep>i?<span style={{color:P.gold,fontSize:11,fontWeight:700}}>✓</span>:loadStep===i?<Spin size={12} color={P.gold}/>:<span style={{fontSize:10}}>{"🗺✈🏨🍽🌤✅"[i]}</span>}
            </div>
            <span style={{fontSize:11,fontWeight:loadStep>=i?600:400,color:loadStep>=i?P.white:P.muted}}>{label}</span>
          </div>)}
        </div>
        <Sk w="100%" h={64} r={12} mb={8}/><Sk w="100%" h={64} r={12}/>
      </div>}

      {/* RESULTS */}
      {plan&&<div className="fa">
        {/* Hero */}
        <div style={{position:"relative",height:280,borderRadius:"0 0 24px 24px",overflow:"hidden",marginBottom:22,boxShadow:"0 16px 48px rgba(0,0,0,.7)"}}>
          <img src={getDestImg(plan.destination)} alt={plan.destination} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.85) 0%,rgba(0,0,0,.3) 50%,transparent 75%)"}}/>
          <div style={{position:"absolute",top:13,right:13,background:"rgba(0,0,0,.7)",backdropFilter:"blur(12px)",border:`1px solid ${P.goldBorder}`,borderRadius:12,padding:"8px 12px",display:"flex",alignItems:"center",gap:8,cursor:"pointer"}} onClick={()=>setGuideOpen(true)}>
            <div style={{width:30,height:30,borderRadius:"50%",background:GOLD,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>🧑‍🌾</div>
            <div><div style={{fontSize:11,fontWeight:700,color:P.gold}}>Marco</div><div style={{fontSize:9,color:P.sub}}>Tu guía IA</div></div>
          </div>
          {userPos&&<div style={{position:"absolute",top:13,left:13,background:"rgba(59,130,246,.2)",border:"1px solid rgba(59,130,246,.3)",borderRadius:8,padding:"4px 9px",fontSize:10,fontWeight:600,color:"#60A5FA"}}>📍 GPS activo</div>}
          <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"18px 20px"}}>
            <div style={{fontSize:"clamp(26px,5vw,46px)",fontWeight:900,color:"#fff",letterSpacing:"-.04em",lineHeight:1.0,marginBottom:9}}>{plan.destination}</div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {[t.days(plan.days),plan.budget,start&&end?`${fmt(start,null,lang==="es"?"es-ES":"en-GB")} → ${fmt(end,null,lang==="es"?"es-ES":"en-GB")}`:null,travelers===1?t.t1:t.tN(travelers)].filter(Boolean).map((v,i)=><span key={i} style={{background:i===0?P.goldDim:"rgba(255,255,255,.06)",color:i===0?P.gold:P.sub,border:`1px solid ${i===0?P.goldBorder:"rgba(255,255,255,.1)"}`,borderRadius:16,padding:"2px 10px",fontSize:9,fontWeight:i===0?600:400}}>{v}</span>)}
            </div>
          </div>
        </div>

        <div className="grid2">
          <div>
            {/* Weather */}
            {weather&&start&&<div style={{marginBottom:24}} className="pa4">
              <SHdr icon="🌤" title={t.weatherT} sub={`${t.days(7)} · ${fmt(start,{month:"long"},lang==="es"?"es-ES":"en-GB")}`}/>
              <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:2}}>
                {weather.temperature_2m_max.slice(0,7).map((maxT,i)=>{const d=new Date(start+"T12:00:00");d.setDate(d.getDate()+i);const rain=weather.precipitation_probability_max[i];return<div key={i} style={{background:P.card,border:`1px solid ${P.border}`,borderRadius:10,padding:"10px 8px",minWidth:68,textAlign:"center",flexShrink:0}}>
                  <div style={{fontSize:8,color:P.muted,marginBottom:4,fontWeight:600}}>{d.toLocaleDateString(lang==="es"?"es-ES":"en-GB",{weekday:"short"})}</div>
                  <div style={{fontSize:22,marginBottom:4}}>{wxI(weather.weathercode[i])}</div>
                  <div style={{fontSize:12,fontWeight:700,color:P.white}}>{Math.round(maxT)}°</div>
                  <div style={{fontSize:9,color:P.muted,marginBottom:4}}>{Math.round(weather.temperature_2m_min[i])}°</div>
                  <div style={{fontSize:8,color:rain>50?P.gold:P.muted}}>💧{rain}%</div>
                </div>;})}
              </div>
            </div>}

            {/* Flights */}
            {flights.length>0&&<div style={{marginBottom:24}} className="pa">
              <SHdr icon="✈️" title={t.flightsT} sub={`${origin||"Madrid"} → ${plan.destination} · ${travelers===1?t.t1:t.tN(travelers)}`}/>
              {flights.map((fl,i)=><div key={i} onClick={()=>setSelF(i)} className="hv" style={{background:selF===i?P.goldDim:"#1C1C1E",border:`1px solid ${selF===i?P.goldBorder:P.border}`,borderRadius:18,padding:"16px 18px",marginBottom:8,cursor:"pointer",transition:"all .2s"}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
                  <div style={{display:"flex",alignItems:"center",gap:11}}>
                    <div style={{width:40,height:40,background:selF===i?P.goldDim:P.card3,border:`1px solid ${selF===i?P.goldBorder:P.border}`,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>✈️</div>
                    <div><div style={{fontSize:14,fontWeight:700,color:"#fff",marginBottom:1}}>{fl.airline}</div><div style={{fontSize:11,color:P.muted,marginBottom:2}}>{fl.departure} → {fl.arrival} · {fl.duration}</div><span style={{background:"rgba(201,169,110,.2)",color:P.gold,borderRadius:6,padding:"2px 8px",fontSize:9,fontWeight:700}}>{fl.stops===0?t.direct:t.stops(fl.stops)}</span></div>
                  </div>
                  <div style={{textAlign:"right"}}><div style={{fontSize:22,fontWeight:700,color:selF===i?P.gold:P.white}}>{fl.price}€</div><div style={{fontSize:9,color:P.muted,marginBottom:5}}>{t.pp}</div><button onClick={e=>{e.stopPropagation();window.open(`https://www.skyscanner.es/transporte/vuelos/?query=${encodeURIComponent(plan.destination)}`,"_blank");}} style={{background:GOLD,color:"#0D0D0D",border:"none",borderRadius:6,padding:"4px 10px",fontSize:10,fontWeight:700,cursor:"pointer"}}>{t.bookFlight}</button></div>
                </div>
              </div>)}
            </div>}

            {/* Hotels */}
            {hotels.length>0&&<div style={{marginBottom:24}} className="pa2">
              <SHdr icon="🏨" title={t.hotelsT} sub={`${nights} ${lang==="es"?"noches":"nights"}`}/>
              {hotels.map((h,i)=><div key={i} onClick={()=>setSelH(i)} className="hv" style={{background:selH===i?P.goldDim:"#1C1C1E",border:`1px solid ${selH===i?P.goldBorder:P.border}`,borderRadius:18,overflow:"hidden",marginBottom:8,cursor:"pointer",transition:"all .2s"}}>
                <div style={{display:"flex",height:110}}>
                  <div style={{width:110,flexShrink:0,overflow:"hidden"}}><img src={HOTEL_IMGS[i%HOTEL_IMGS.length]} alt={h.name} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"}/></div>
                  <div style={{flex:1,padding:"12px 14px",display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
                    <div><div style={{display:"flex",justifyContent:"space-between",gap:6,marginBottom:2}}><div style={{fontSize:13,fontWeight:700,color:"#fff",lineHeight:1.2}}>{h.name}</div><div style={{textAlign:"right",flexShrink:0}}><div style={{fontSize:18,fontWeight:700,color:selH===i?P.gold:P.white}}>{h.price_per_night}€</div><div style={{fontSize:8,color:P.muted}}>{t.pn}</div></div></div><div style={{display:"flex",alignItems:"center",gap:5,marginBottom:3}}><Stars n={h.stars||3} sz={8}/><span style={{fontSize:9,color:P.muted}}>📍 {h.neighborhood}</span></div><p style={{fontSize:10,color:P.muted,margin:0,lineHeight:1.4,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{h.description}</p></div>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:4}}><span style={{fontSize:10,color:selH===i?P.gold:P.muted,fontWeight:600}}>{h.price_per_night*nights}€ total</span><button onClick={e=>{e.stopPropagation();window.open(`https://www.booking.com/search.html?ss=${encodeURIComponent(h.name)}`, "_blank");}} style={{background:GOLD,color:"#0D0D0D",border:"none",borderRadius:6,padding:"3px 9px",fontSize:10,fontWeight:700,cursor:"pointer"}}>{t.bookHotel}</button></div>
                  </div>
                </div>
              </div>)}
            </div>}

            {/* Map */}
            {leafReady&&places.length>0&&<div id="mapsec" style={{marginBottom:24}} className="pa3">
              <SHdr icon="🗺️" title={t.mapT} sub={`${places.length} lugares`}/>
              <TravelMap places={places} active={activeMap} onSelect={setActiveMap} userPos={userPos} height={320}/>
            </div>}

            {/* Restaurants */}
            {rests.length>0&&<div style={{marginBottom:24}} className="pa4">
              <SHdr icon="🍽️" title={t.restsT} sub={plan.destination}/>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {rests.map((r,i)=><div key={i} className="hv" style={{background:"#1C1C1E",border:`1px solid ${P.border}`,borderRadius:16,overflow:"hidden",flex:"1 1 170px",minWidth:0,transition:"all .25s"}}>
                  <div style={{height:100,overflow:"hidden",position:"relative"}}><img src={REST_IMGS[i%REST_IMGS.length]} alt={r.name} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"}/><div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.7),transparent)"}}/>{r.price_range&&<div style={{position:"absolute",top:6,right:6,background:"rgba(0,0,0,.65)",color:"#fff",borderRadius:6,padding:"2px 6px",fontSize:8,fontWeight:700}}>{r.price_range}</div>}</div>
                  <div style={{padding:"10px 11px"}}><div style={{fontSize:11,fontWeight:700,color:"#fff",marginBottom:2}}>{r.name}</div><div style={{display:"flex",alignItems:"center",gap:4,marginBottom:6}}><Stars n={r.rating||4} sz={8}/><span style={{fontSize:8,color:P.muted}}>{r.cuisine}</span></div><button onClick={()=>window.open(`https://www.google.com/search?q=${encodeURIComponent(r.name+" "+plan.destination)}`,"_blank")} style={{background:GOLD,color:"#0D0D0D",border:"none",borderRadius:6,padding:"4px 9px",fontSize:9,fontWeight:700,cursor:"pointer",width:"100%"}}>{t.bookRest}</button></div>
                </div>)}
              </div>
            </div>}

            {/* Tours */}
            <div style={{marginBottom:24}} className="pa">
              <SHdr icon="🎟️" title={t.toursT} sub={plan.destination}/>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {[{name:lang==="es"?"Visita guiada":"Guided tour",icon:"🗺️"},{name:lang==="es"?"Tour gastronómico":"Food tour",icon:"🍽️"},{name:lang==="es"?"Excursión de día":"Day trip",icon:"🚌"},{name:lang==="es"?"Experiencia local":"Local experience",icon:"🤝"},{name:lang==="es"?"Aventura":"Adventure",icon:"🏔️"}].map((tour,i)=><button key={i} onClick={()=>window.open(`https://www.getyourguide.es/s/?partner_id=YYAW5I0&q=${encodeURIComponent((plan?.destination||"")+" "+tour.name)}`,"_blank")} style={{background:P.card,border:`1px solid ${P.border}`,borderRadius:11,padding:"11px 13px",cursor:"pointer",textAlign:"left",flex:"1 1 140px",transition:"all .2s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=P.gold;e.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor=P.border;e.currentTarget.style.transform="none";}}>
                  <div style={{fontSize:16,marginBottom:4}}>{tour.icon}</div>
                  <div style={{fontSize:11,fontWeight:600,color:"#fff",marginBottom:2}}>{tour.name}</div>
                  <div style={{fontSize:9,color:P.gold,fontWeight:600}}>{t.bookTour} ↗</div>
                </button>)}
              </div>
            </div>

            {/* Transport */}
            <div style={{marginBottom:24}} className="pa">
              <SHdr icon="🚗" title={t.transportT} sub={plan.destination}/>
              <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
                {[{name:"Uber",icon:"🚗",url:`https://m.uber.com/ul/?dropoff[formatted_address]=${encodeURIComponent(plan.destination)}`},{name:"Cabify",icon:"🟣",url:"https://cabify.com/"},{name:"Metro",icon:"🚇",url:`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(plan.destination)}&travelmode=transit`},{name:"Bike",icon:"🚲",url:`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(plan.destination)}&travelmode=bicycling`}].map(lk=><a key={lk.name} href={lk.url} target="_blank" rel="noopener noreferrer" style={{background:"#1C1C1E",border:`1px solid ${P.border}`,borderRadius:12,padding:"11px 13px",textDecoration:"none",display:"flex",alignItems:"center",gap:8,flex:"1 1 120px",transition:"all .2s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=P.goldBorder;e.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor=P.border;e.currentTarget.style.transform="none";}}>
                  <span style={{fontSize:18}}>{lk.icon}</span><span style={{fontSize:12,fontWeight:700,color:"#fff"}}>{lk.name}</span><span style={{marginLeft:"auto",color:P.muted,fontSize:11}}>↗</span>
                </a>)}
              </div>
            </div>

            {/* Itinerary */}
            {plan.itinerary?.length>0&&<div style={{marginBottom:24}} className="pa">
              <SHdr icon="📅" title={t.itinT} sub={`${plan.itinerary.length} ${lang==="es"?"días":"days"}`}/>
              {plan.itinerary.map((day,i)=><DayCard key={i} day={day} i={i} t={t}/>)}
            </div>}
          </div>

          {/* Sidebar */}
          <div style={{position:"sticky",top:62}}>
            {(fSel||hSel)&&<div style={{background:"#1E1E20",borderRadius:18,padding:"18px",boxShadow:"0 12px 40px rgba(0,0,0,.5)",border:"0.5px solid rgba(255,255,255,.07)",marginBottom:12}}>
              <div style={{fontSize:13,fontWeight:900,marginBottom:12,color:"#fff"}}>{t.pkgTitle}</div>
              {fSel&&<div style={{display:"flex",justifyContent:"space-between",marginBottom:7,fontSize:11}}><span style={{color:P.sub}}>✈️ {fSel.airline} × {travelers}</span><span style={{fontWeight:700,color:"#fff"}}>{fSel.price*travelers}€</span></div>}
              {hSel&&nights&&<div style={{display:"flex",justifyContent:"space-between",marginBottom:7,fontSize:11}}><span style={{color:P.sub}}>🏨 {hSel.name} × {nights}n</span><span style={{fontWeight:700,color:"#fff"}}>{hSel.price_per_night*nights}€</span></div>}
              <div style={{height:"0.5px",background:"rgba(255,255,255,.07)",margin:"10px 0"}}/>
              {(()=>{const fT=fSel?fSel.price*travelers:0;const hT=hSel?hSel.price_per_night*nights:0;const tax=Math.round((fT+hT)*.10);const total=fT+hT+tax;return<>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:7,fontSize:11}}><span style={{color:P.muted}}>🧾 {t.taxes}</span><span style={{fontWeight:700,color:P.muted}}>{tax}€</span></div>
                <div style={{background:P.goldDim,borderRadius:10,padding:"11px 13px",margin:"10px 0 12px",border:`1px solid ${P.goldBorder}`}}><div style={{fontSize:8,fontWeight:600,color:P.gold,textTransform:"uppercase",letterSpacing:".1em",marginBottom:2}}>{t.total}</div><span style={{fontSize:26,fontWeight:700,color:P.gold}}>{total}€</span></div>
                <button onClick={()=>setBookingOpen(true)} style={{width:"100%",padding:"12px",background:GOLD,color:"#0D0D0D",border:"none",borderRadius:10,fontSize:12,fontWeight:800,cursor:"pointer",fontFamily:"-apple-system,sans-serif",marginBottom:6}}>{t.bookPkg}</button>
                <div style={{display:"flex",gap:6,marginBottom:6}}>
                  <button onClick={()=>window.open(`https://www.skyscanner.es/transporte/vuelos/?query=${encodeURIComponent(plan.destination)}`,"_blank")} style={{flex:1,padding:"7px",background:"transparent",color:P.gold,border:`1px solid ${P.goldBorder}`,borderRadius:8,fontSize:10,fontWeight:700,cursor:"pointer"}}>✈️ {t.onlyFlight}</button>
                  <button onClick={()=>window.open(`https://www.booking.com/search.html?ss=${encodeURIComponent(plan.destination)}`,"_blank")} style={{flex:1,padding:"7px",background:"transparent",color:P.gold,border:`1px solid ${P.goldBorder}`,borderRadius:8,fontSize:10,fontWeight:700,cursor:"pointer"}}>🏨 {t.onlyHotel}</button>
                </div>
                <div style={{fontSize:8,color:"#48484A",textAlign:"center"}}>Demo · Precios orientativos</div>
              </>;})()}
            </div>}

            {plan.tips?.length>0&&<div style={{background:P.card,borderRadius:13,padding:"14px",marginBottom:12,border:`1px solid ${P.border}`}}>
              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:10}}><div style={{width:24,height:24,background:P.goldDim,border:`1px solid ${P.goldBorder}`,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12}}>💡</div><span style={{fontSize:12,fontWeight:800}}>{t.tipsT}</span></div>
              {plan.tips.slice(0,4).map((tip,i)=><div key={i} style={{display:"flex",gap:6,marginBottom:8}}><span style={{width:4,height:4,background:P.gold,borderRadius:"50%",flexShrink:0,marginTop:5}}/><p style={{margin:0,fontSize:10,color:P.muted,lineHeight:1.6}}>{tip}</p></div>)}
            </div>}
          </div>
        </div>
      </div>}
    </main>
  </div>;
}
