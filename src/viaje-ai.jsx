import { useState, useEffect, useRef } from "react";
import { supabase } from "./supabase.js";

const P = {
  black:"#0D0D0D",card:"#141414",card2:"#1A1A1A",card3:"#252525",
  border:"#2A2A2A",border2:"#333333",muted:"#6B6B6B",sub:"#A0A0A0",
  white:"#FFFFFF",gold:"#C9A96E",goldDim:"rgba(201,169,110,.18)",
  goldBorder:"rgba(201,169,110,.25)",goldGlow:"rgba(201,169,110,.35)",
};
const iOS={
  blue:P.gold,teal:P.gold,green:P.gold,orange:P.gold,red:"#E05A4E",
  pink:P.gold,purple:P.gold,indigo:P.gold,yellow:P.gold,mint:P.gold,cyan:P.gold,
  bg:P.black,card:P.card2,card2:P.card3,label:P.white,
  label2:"rgba(255,255,255,.75)",fill:P.muted,sep:P.border,sep2:P.border2,
};
const GOLD_GRAD="linear-gradient(135deg,#C9A96E,#E8C98A)";
const GOLD_GRAD2="linear-gradient(135deg,#B8935A,#C9A96E)";

function TrippioLogo({size=34}){
  return(
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{flexShrink:0,filter:`drop-shadow(0 ${size*.06}px ${size*.18}px rgba(201,169,110,0.4))`}}>
      <defs><linearGradient id="lg" x1="15%" y1="15%" x2="85%" y2="85%">
        <stop offset="0%" stopColor="#E8C98A"/><stop offset="100%" stopColor="#B8935A"/>
      </linearGradient></defs>
      <circle cx="50" cy="50" r="45" stroke="url(#lg)" strokeWidth="2.5" opacity="0.6"/>
      <path d="M 24 72 L 68 20 L 76 54 Z" fill="url(#lg)" opacity="0.95"/>
      <path d="M 24 72 L 76 54 L 52 68 Z" fill="#B8935A" opacity="0.7"/>
      <line x1="24" y1="72" x2="76" y2="54" stroke="#0D0D0D" strokeWidth="1" opacity="0.3"/>
    </svg>
  );
}

const TRIP_TYPES={
  adventure:{icon:"🏔️",grad:GOLD_GRAD,col:P.gold,budgetMult:0.7},
  culture:{icon:"🏛️",grad:GOLD_GRAD2,col:P.gold,budgetMult:1.0},
  beach:{icon:"🏖️",grad:GOLD_GRAD,col:P.gold,budgetMult:1.1},
  gastro:{icon:"🍜",grad:GOLD_GRAD,col:P.gold,budgetMult:1.1},
  nature:{icon:"🌿",grad:GOLD_GRAD2,col:P.gold,budgetMult:0.8},
  city:{icon:"🏙️",grad:GOLD_GRAD,col:P.gold,budgetMult:1.0},
  wellness:{icon:"🧘",grad:GOLD_GRAD2,col:P.gold,budgetMult:1.3},
  nightlife:{icon:"🎉",grad:GOLD_GRAD,col:P.gold,budgetMult:1.0},
  retreat:{icon:"🌀",grad:GOLD_GRAD2,col:P.gold,budgetMult:1.4},
};
const TRAVELER_STYLES={
  backpacker:{icon:"🎒",grad:GOLD_GRAD,col:P.gold,hotelStars:"1",hotelBudgetPct:0.15},
  comfort:{icon:"🛎️",grad:GOLD_GRAD2,col:P.gold,hotelStars:"2-3",hotelBudgetPct:0.35},
  luxury:{icon:"💎",grad:GOLD_GRAD,col:P.gold,hotelStars:"4-5",hotelBudgetPct:0.60},
};

const T={
  es:{
    flag:"🇪🇸",name:"Español",locale:"es-ES",langPrompt:"Responde en español.",
    newSearch:"Nueva búsqueda",bookNav:"Reservar →",
    badge:"Trippio · Vuelos + Hoteles + Clima",
    h1a:"Tu próximo viaje,",h1b:"en un clic.",
    sub:"Elige tu estilo, destino y presupuesto. La IA construye todo al instante.",
    stepTripType:"¿Qué tipo de viaje buscas?",
    stepTripTypeSub:"Elige uno o varios",
    selectedLabel:"Elegido:",
    stepTravelerStyle:"¿Cómo prefieres viajar?",
    stepDetails:"Cuéntanos más",
    tripTypes:{adventure:"Aventura",culture:"Cultura",beach:"Playa",gastro:"Gastronomía",nature:"Naturaleza",city:"Ciudad",wellness:"Bienestar",nightlife:"Vida Nocturna",retreat:"Retiro Espiritual"},
    travelerStyles:{backpacker:"Mochilero",comfort:"Confort",luxury:"Lujo"},
    travelerDescs:{backpacker:"Hostels 1★, transporte local, experiencia auténtica",comfort:"Hoteles 2-3★, vuelos directos, buen equilibrio",luxury:"Hoteles 4-5★, business class, experiencias VIP"},
    originL:"Origen",destinationL:"Destino",budgetL:"Presupuesto (€)",
    originPh:"Madrid, España",destinationPh:"Tokio, París, Bangkok...",budgetPh:"1000",
    arrival:"Llegada",departure:"Salida",
    travelersL:"Viajeros",traveler1:"1 viajero",travelersN:n=>`${n} viajeros`,
    searchBtn:"Buscar mi viaje ✦",nextBtn:"Siguiente →",backBtn2:"← Atrás",
    loadTitle:"Preparando tu aventura…",loadSub:"Buscando las mejores opciones para ti",
    steps:["Creando itinerario","Buscando vuelos","Buscando hoteles","Restaurantes","Clima","¡Listo!"],
    flightsT:"Vuelos disponibles",flightsSub:(d,n,o)=>`${o||"Madrid"} → ${d} · ${n} viajero${n>1?"s":""}`,
    direct:"✈ Directo",stops:n=>`${n} escala${n>1?"s":""}`,perPerson:"por persona",selBadge:"Seleccionado ✓",
    hotelsT:"Hoteles recomendados",hotelsSub:n=>`${n} noches`,
    perNight:"/ noche",mapBtn:"🗺 Mapa",totalNights:(n,p)=>`${p*n}€ total`,
    mapT:"Mapa del viaje",mapSub:"Hoteles · Restaurantes · Lugares de interés",
    restsT:"Dónde comer",restsSub:"Los mejores restaurantes seleccionados por IA",
    vegT:"Opciones vegetarianas",vegSub:"Restaurantes plant-based",
    vegBadge:"Vegetariano",veganBadge:"Vegano",
    itinT:"Itinerario día a día",itinSub:"Tu plan personalizado",
    morning:"☀️ Mañana",afternoon:"🌤 Tarde",evening:"🌙 Noche",transport:"🚇 Transporte",
    tipsT:"Tips del viaje",
    transportT:"Transporte en destino",transportSub:"Opciones de movilidad local",
    weatherT:"Previsión meteorológica",weatherSub:"Durante tu viaje",
    promoT:"Promociones & Descuentos",promoSub:"Ofertas activas en tu destino",
    pkgT:"Resumen del paquete",taxes:"Tasas e impuestos",totalL:"Total estimado",
    bookBtn:"🔒 Reservar paquete →",
    bookFlightBtn:"✈️ Reservar vuelo",bookHotelBtn:"🏨 Reservar hotel",
    bookRestBtn:"🍽️ Reservar mesa",bookTourBtn:"🎟️ Reservar tour",
    demoNote:"Demo · No se realizan cargos reales",bookedL:"¡Reservado!",
    modalT:"Confirmar reserva",processing:"Procesando…",doneT:"¡Reserva confirmada! 🎉",
    continueBtn:"Continuar →",payBtn:"Reservar →",
    bookedBannerT:"¡Reserva confirmada!",bookedBannerSub:(a,h,n)=>`${a} + ${h} · ${n} noches`,
    days:n=>`${n} días`,nights:n=>`${n} noches`,
    pkgSave:"🎁 Ahorra un 8% reservando el paquete completo",
    demoSmall:"Precios orientativos · Modo demo",
    affiliateT:"Reserva con nuestros socios",affiliateSub:"Comisión incluida · Sin coste extra",
    weatherFeel:"Sensación",weatherWind:"Viento",
    promoCode:"Código",
    shareBtn:"Compartir",shareCopied:"Enlace copiado",
    errorTitle:"Algo salió mal",errorMsg:"Error al generar. Inténtalo de nuevo.",
    retreatT:"Retiros espirituales",retreatSub:"Yoga, meditación y medicina ancestral",
    retreatTypes:{yoga:"Yoga",meditation:"Meditación",ayahuasca:"Ayahuasca",breathwork:"Respiración",sound:"Sonidos",digital:"Detox Digital",shamanic:"Chamanismo",silent:"Silencio"},
    retreatBook:"Solicitar plaza →",retreatBadge:"Retiro verificado",
    loginBtn:"Entrar",logoutBtn:"Salir",myTripsBtn:"Mis viajes",saveTrip:"Guardar viaje",
  },
  en:{
    flag:"🇬🇧",name:"English",locale:"en-GB",langPrompt:"Respond in English.",
    newSearch:"New search",bookNav:"Book →",
    badge:"AI Planner · Flights + Hotels",
    h1a:"Your next trip,",h1b:"in one click.",
    sub:"Choose your style, destination and budget. AI builds everything instantly.",
    stepTripType:"What kind of trip?",stepTripTypeSub:"Choose one or more",
    selectedLabel:"Selected:",stepTravelerStyle:"How do you travel?",stepDetails:"Tell us more",
    tripTypes:{adventure:"Adventure",culture:"Culture",beach:"Beach",gastro:"Gastronomy",nature:"Nature",city:"City Break",wellness:"Wellness",nightlife:"Nightlife",retreat:"Spiritual Retreat"},
    travelerStyles:{backpacker:"Backpacker",comfort:"Comfort",luxury:"Luxury"},
    travelerDescs:{backpacker:"Hostels & 1★, local transport, authentic experience",comfort:"2-3★ hotels, direct flights, great value",luxury:"4-5★ hotels, business class, VIP experiences"},
    originL:"Origin",destinationL:"Destination",budgetL:"Budget (€)",
    originPh:"London, UK",destinationPh:"Tokyo, Paris, Bangkok...",budgetPh:"1000",
    arrival:"Check-in",departure:"Check-out",
    travelersL:"Travelers",traveler1:"1 traveler",travelersN:n=>`${n} travelers`,
    searchBtn:"Find my trip ✦",nextBtn:"Next →",backBtn2:"← Back",
    loadTitle:"Preparing your adventure…",loadSub:"Searching the best options for you",
    steps:["Creating itinerary","Searching flights","Finding hotels","Restaurants","Weather","All ready!"],
    flightsT:"Available flights",flightsSub:(d,n,o)=>`${o||"Madrid"} → ${d} · ${n} traveler${n>1?"s":""}`,
    direct:"✈ Direct",stops:n=>`${n} stop${n>1?"s":""}`,perPerson:"per person",selBadge:"Selected ✓",
    hotelsT:"Recommended hotels",hotelsSub:n=>`${n} nights`,
    perNight:"/ night",mapBtn:"🗺 Map",totalNights:(n,p)=>`€${p*n} total`,
    mapT:"Trip map",mapSub:"Hotels · Restaurants · Points of interest",
    restsT:"Where to eat",restsSub:"Best restaurants selected by AI",
    vegT:"Vegetarian options",vegSub:"Plant-based restaurants",
    vegBadge:"Vegetarian",veganBadge:"Vegan",
    itinT:"Day by day itinerary",itinSub:"Your personalized plan",
    morning:"☀️ Morning",afternoon:"🌤 Afternoon",evening:"🌙 Evening",transport:"🚇 Transport",
    tipsT:"Travel tips",
    transportT:"Transport at destination",transportSub:"Local mobility options",
    weatherT:"Weather forecast",weatherSub:"During your trip",
    promoT:"Promotions & Discounts",promoSub:"Active deals at your destination",
    pkgT:"Package summary",taxes:"Taxes & fees",totalL:"Estimated total",
    bookBtn:"🔒 Book package →",
    bookFlightBtn:"✈️ Book flight",bookHotelBtn:"🏨 Book hotel",
    bookRestBtn:"🍽️ Book table",bookTourBtn:"🎟️ Book tour",
    demoNote:"Demo · No real charges apply",bookedL:"Booked!",
    modalT:"Confirm booking",processing:"Processing…",doneT:"Booking confirmed! 🎉",
    continueBtn:"Continue →",payBtn:"Book →",
    bookedBannerT:"Booking confirmed!",bookedBannerSub:(a,h,n)=>`${a} + ${h} · ${n} nights`,
    days:n=>`${n} days`,nights:n=>`${n} nights`,
    pkgSave:"🎁 Save 8% booking the full package",
    demoSmall:"Estimated prices · Demo mode",
    affiliateT:"Book with our partners",affiliateSub:"Commission included · No extra cost",
    weatherFeel:"Feels like",weatherWind:"Wind",
    promoCode:"Code",
    shareBtn:"Share",shareCopied:"Link copied",
    errorTitle:"Something went wrong",errorMsg:"Error generating itinerary. Please try again.",
    retreatT:"Spiritual retreats",retreatSub:"Yoga, meditation & ancestral medicine",
    retreatTypes:{yoga:"Yoga",meditation:"Meditation",ayahuasca:"Ayahuasca",breathwork:"Breathwork",sound:"Sound Bath",digital:"Digital Detox",shamanic:"Shamanic",silent:"Silent Retreat"},
    retreatBook:"Request a spot →",retreatBadge:"Verified retreat",
    loginBtn:"Sign in",logoutBtn:"Sign out",myTripsBtn:"My trips",saveTrip:"Save trip",
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
const HOTEL_IMGS=["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=80","https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=500&q=80","https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&q=80","https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500&q=80","https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=500&q=80","https://images.unsplash.com/photo-1590490360182-c33d57733427?w=500&q=80"];
const REST_IMGS=["https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&q=80","https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=80","https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500&q=80","https://images.unsplash.com/photo-1544148103-0773bf10d330?w=500&q=80","https://images.unsplash.com/photo-1559339352-11d035aa65de?w=500&q=80","https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=500&q=80"];
const VEG_IMGS=["https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80","https://images.unsplash.com/photo-1540914124281-342587941389?w=500&q=80","https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&q=80","https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=500&q=80"];

function getImg(dest=""){const d=dest.toLowerCase();for(const[k,v]of Object.entries(DEST_IMGS))if(d.includes(k))return v;return DEST_IMGS.default;}
const diffDays=(a,b)=>(!a||!b)?null:Math.round((new Date(b+"T12:00:00")-new Date(a+"T12:00:00"))/86400000)+1;
const fmtDate=(s,o,loc)=>!s?"":new Date(s+"T12:00:00").toLocaleDateString(loc||"es-ES",o||{day:"numeric",month:"short"});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));

async function fetchWeather(lat,lon,startDate){
  try{
    const url=`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weathercode,windspeed_10m_max&timezone=auto&start_date=${startDate}&forecast_days=7`;
    const r=await fetch(url);const d=await r.json();return d.daily;
  }catch{return null;}
}

const WX_ICONS={0:"☀️",1:"🌤",2:"⛅",3:"☁️",45:"🌫",51:"🌦",53:"🌧",61:"🌧",71:"❄️",80:"🌦",95:"⛈️"};
const wxIcon=c=>WX_ICONS[c]||"🌡";

function getTransportLinks(dest="",lat=null,lon=null){
  const d=encodeURIComponent(dest);
  const isAsia=lat&&lon&&(lat>-10&&lat<55&&lon>60&&lon<150);
  return[
    {id:"uber",name:"Uber",icon:"🚗",available:true,url:`https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[formatted_address]=${d}`,desc:"Ride-hailing"},
    {id:"grab",name:"Grab",icon:"🟢",available:isAsia,url:`https://grab.onelink.me/2695613898`,desc:"Best in SE Asia"},
    {id:"cabify",name:"Cabify",icon:"🟣",available:true,url:`https://cabify.com/`,desc:"Spain & LatAm"},
    {id:"metro",name:"Metro",icon:"🚇",available:true,url:`https://www.google.com/maps/dir/?api=1&destination=${d}&travelmode=transit`,desc:"Public transit"},
    {id:"bike",name:"Bike",icon:"🚲",available:true,url:`https://www.google.com/maps/dir/?api=1&destination=${d}&travelmode=bicycling`,desc:"Cycling"},
  ];
}

const AFFILIATE_LINKS=[
  {name:"Booking.com",icon:"🏨",grad:"linear-gradient(135deg,#003580,#0057B8)",desc:"Hotels & Stays",url:"https://www.booking.com",cta:"~€50/booking"},
  {name:"Skyscanner",icon:"✈️",grad:"linear-gradient(135deg,#0770E3,#0557B0)",desc:"Flights",url:"https://www.skyscanner.es",cta:"CPA per flight"},
  {name:"GetYourGuide",icon:"🎟️",grad:"linear-gradient(135deg,#FF5533,#CC3311)",desc:"Tours & Activities",url:"https://www.getyourguide.es",cta:"8% commission"},
  {name:"Rentalcars",icon:"🚗",grad:"linear-gradient(135deg,#FF6600,#CC5200)",desc:"Car rental",url:"https://www.rentalcars.com",cta:"Up to 6% CPA"},
];

function useLeaflet(){
  const[r,setR]=useState(!!window.L);
  useEffect(()=>{
    if(window.L){setR(true);return;}
    const css=document.createElement("link");css.rel="stylesheet";css.href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";document.head.appendChild(css);
    const js=document.createElement("script");js.src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";js.onload=()=>setR(true);document.head.appendChild(js);
  },[]);return r;
}

function TravelMap({places,active,onSelect}){
  const nodeRef=useRef(null),lRef=useRef(null),mRef=useRef([]);
  useEffect(()=>{
    if(!nodeRef.current||lRef.current)return;
    const L=window.L;if(!L)return;
    const map=L.map(nodeRef.current,{zoomControl:false,attributionControl:false});
    L.control.zoom({position:"bottomright"}).addTo(map);
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",{maxZoom:19}).addTo(map);
    lRef.current=map;return()=>{map.remove();lRef.current=null;};
  },[]);
  useEffect(()=>{
    const L=window.L,map=lRef.current;
    if(!L||!map||!places?.length)return;
    mRef.current.forEach(m=>m.remove());mRef.current=[];
    const bounds=[];
    places.forEach((p,i)=>{
      if(!p.lat||!p.lng)return;
      const isA=active===i,isH=p.type==="hotel";
      const em=isH?"🏨":p.type==="restaurant"?"🍽️":p.type==="veg"?"🌿":"◆";
      const sz=isA?44:34;
      const html=`<div style="width:${sz}px;height:${sz}px;background:${isA?P.gold:"#2C2C2E"};border:2.5px solid ${P.gold};border-radius:${isH?"12px":"50%"};display:flex;align-items:center;justify-content:center;font-size:${isA?18:13}px;cursor:pointer">${isA?em:i+1}</div>`;
      const icon=L.divIcon({className:"",html,iconSize:[sz,sz],iconAnchor:[sz/2,sz/2]});
      const mk=L.marker([p.lat,p.lng],{icon}).addTo(map)
        .bindPopup(`<div style="font-family:-apple-system,sans-serif;min-width:150px"><b>${em} ${p.name}</b>${p.desc?`<p style="font-size:11px;color:#555;margin:4px 0 0">${p.desc}</p>`:""}</div>`,{className:"ios-pop"})
        .on("click",()=>onSelect(i));
      mRef.current.push(mk);bounds.push([p.lat,p.lng]);
    });
    if(bounds.length)map.fitBounds(bounds,{padding:[44,44],maxZoom:14,animate:true});
  },[places]);
  useEffect(()=>{
    const map=lRef.current;if(!map||active==null||!places?.[active])return;
    const p=places[active];if(p.lat&&p.lng){map.flyTo([p.lat,p.lng],15,{animate:true,duration:1});mRef.current[active]?.openPopup();}
  },[active]);
  return(
    <div style={{borderRadius:20,overflow:"hidden",boxShadow:"0 8px 32px rgba(0,0,0,.4)"}}>
      <div ref={nodeRef} style={{height:320}}/>
      <style>{`.ios-pop .leaflet-popup-content-wrapper{background:#1C1C1E!important;border:1px solid #3A3A3C!important;border-radius:14px!important}.ios-pop .leaflet-popup-tip{background:#1C1C1E!important}.leaflet-control-zoom{border:none!important;border-radius:12px!important;overflow:hidden}.leaflet-control-zoom a{background:#1C1C1E!important;color:#fff!important;border:none!important}`}</style>
    </div>
  );
}

function Spin({size=22,color}){return<div style={{width:size,height:size,border:`2.5px solid rgba(255,255,255,.1)`,borderTop:`2.5px solid ${color||P.gold}`,borderRadius:"50%",animation:"spin .7s linear infinite",flexShrink:0}}/>;}
const Stars=({n=4,sz=11})=><span>{[1,2,3,4,5].map(i=><span key={i} style={{color:i<=n?P.gold:P.border2,fontSize:sz}}>★</span>)}</span>;
const Dot=({color})=><span style={{width:7,height:7,background:color||P.gold,borderRadius:"50%",animation:"pulse 1.6s ease infinite",display:"inline-block"}}/>;

function IBtn({children,onClick,disabled,grad,color,size="md",outline,full,style:ex}){
  const[hov,setHov]=useState(false);
  const pad=size==="sm"?"8px 16px":size==="lg"?"16px 28px":"11px 22px";
  const fz=size==="sm"?12:size==="lg"?16:14;
  let bg,col,border;
  if(outline){bg=hov?(color||P.gold)+"18":"transparent";col=color||P.gold;border=`1.5px solid ${color||P.gold}`;}
  else{bg=grad||GOLD_GRAD;col="#fff";border="none";}
  return(
    <button onClick={onClick} disabled={disabled} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{background:bg,color:col,border,borderRadius:14,padding:pad,fontSize:fz,fontWeight:700,cursor:disabled?"not-allowed":"pointer",fontFamily:"-apple-system,sans-serif",display:"inline-flex",alignItems:"center",justifyContent:"center",gap:7,opacity:disabled?.4:1,transition:"all .2s",width:full?"100%":undefined,transform:hov&&!disabled?"translateY(-2px)":"none",...ex}}>
      {children}
    </button>
  );
}

function SectionHdr({icon,title,sub,right}){
  return(
    <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:18,gap:10,flexWrap:"wrap"}}>
      <div style={{display:"flex",alignItems:"center",gap:12}}>
        <div style={{width:40,height:40,background:P.card3,border:`1px solid ${P.border2}`,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{icon}</div>
        <div>
          <div style={{fontSize:18,fontWeight:700,color:P.white}}>{title}</div>
          {sub&&<div style={{fontSize:12,color:"rgba(235,235,245,.45)",marginTop:2}}>{sub}</div>}
        </div>
      </div>
      {right}
    </div>
  );
}

function LangSelector({lang,setLang}){
  const[open,setOpen]=useState(false);
  return(
    <div style={{position:"relative"}}>
      <button onClick={()=>setOpen(!open)} style={{background:"#2C2C2E",border:"0.5px solid #3A3A3C",borderRadius:10,padding:"6px 12px",display:"flex",alignItems:"center",gap:6,cursor:"pointer",color:"#fff",fontSize:13,fontWeight:600,fontFamily:"-apple-system,sans-serif"}}>
        <span style={{fontSize:16}}>{T[lang].flag}</span><span>{lang.toUpperCase()}</span>
        <span style={{fontSize:9,color:P.muted}}>▾</span>
      </button>
      {open&&(
        <div style={{position:"absolute",right:0,top:"calc(100% + 6px)",background:"#1C1C1E",border:"0.5px solid #3A3A3C",borderRadius:14,overflow:"hidden",zIndex:999,boxShadow:"0 12px 40px rgba(0,0,0,.7)",minWidth:150}}>
          {Object.entries(T).map(([k,l])=>(
            <button key={k} onClick={()=>{setLang(k);setOpen(false);}}
              style={{width:"100%",background:lang===k?"#2C2C2E":"transparent",border:"none",padding:"11px 16px",display:"flex",alignItems:"center",gap:10,cursor:"pointer",color:lang===k?P.gold:"#fff",fontSize:14,fontFamily:"-apple-system,sans-serif",fontWeight:lang===k?700:400,textAlign:"left"}}>
              <span style={{fontSize:20}}>{l.flag}</span><span>{l.name}</span>
              {lang===k&&<span style={{marginLeft:"auto",fontSize:12}}>✓</span>}
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
  const[password,setPassword]=useState("");
  const[loading,setLoading]=useState(false);
  const[error,setError]=useState(null);
  const[success,setSuccess]=useState(null);

  async function handleSubmit(){
    setLoading(true);setError(null);setSuccess(null);
    try{
      if(mode==="register"){
        const{error:e}=await supabase.auth.signUp({email,password});
        if(e)throw e;
        setSuccess("Cuenta creada. Revisa tu email para confirmar.");
      }else{
        const{data,error:e}=await supabase.auth.signInWithPassword({email,password});
        if(e)throw e;
        onAuth(data.user);onClose();
      }
    }catch(e){setError(e.message);}
    setLoading(false);
  }

  const inp={width:"100%",padding:"13px 16px",border:"1.5px solid #3A3A3C",borderRadius:14,fontSize:15,fontFamily:"-apple-system,sans-serif",color:"#fff",background:"#2C2C2E",boxSizing:"border-box",outline:"none"};
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.75)",zIndex:1000,display:"flex",alignItems:"flex-end",justifyContent:"center",backdropFilter:"blur(12px)"}} onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div style={{background:"#1C1C1E",borderRadius:"28px 28px 0 0",width:"100%",maxWidth:480,padding:"24px 28px 48px",boxShadow:"0 -8px 60px rgba(0,0,0,.6)"}}>
        <div style={{width:40,height:5,background:"#3A3A3C",borderRadius:3,margin:"0 auto 24px"}}/>
        <div style={{fontSize:24,fontWeight:900,color:"#fff",marginBottom:6}}>{mode==="login"?"Bienvenido de nuevo":"Crea tu cuenta"}</div>
        <p style={{fontSize:14,color:"#6B6B6B",marginBottom:24}}>{mode==="login"?"Accede para guardar tus viajes":"Guarda y comparte tus viajes"}</p>
        <button onClick={()=>supabase.auth.signInWithOAuth({provider:"google",options:{redirectTo:window.location.origin}})} style={{width:"100%",background:"#2C2C2E",border:"1.5px solid #3A3A3C",borderRadius:14,padding:"13px 16px",color:"#fff",fontSize:15,fontWeight:600,cursor:"pointer",fontFamily:"-apple-system,sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:16}}>
          🔍 Continuar con Google
        </button>
        <div style={{display:"flex",alignItems:"center",gap:12,margin:"16px 0"}}>
          <div style={{flex:1,height:"0.5px",background:"#3A3A3C"}}/><span style={{fontSize:12,color:"#6B6B6B"}}>o con email</span><div style={{flex:1,height:"0.5px",background:"#3A3A3C"}}/>
        </div>
        <div style={{marginBottom:12}}><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="tu@email.com" type="email" style={inp} onFocus={e=>e.target.style.borderColor=P.gold} onBlur={e=>e.target.style.borderColor="#3A3A3C"}/></div>
        <div style={{marginBottom:20}}><input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Contrasena" type="password" style={inp} onFocus={e=>e.target.style.borderColor=P.gold} onBlur={e=>e.target.style.borderColor="#3A3A3C"} onKeyDown={e=>e.key==="Enter"&&handleSubmit()}/></div>
        {error&&<div style={{background:"rgba(224,90,78,.12)",border:"1px solid rgba(224,90,78,.3)",borderRadius:10,padding:"10px 14px",fontSize:13,color:"#E05A4E",marginBottom:14}}>{error}</div>}
        {success&&<div style={{background:"rgba(201,169,110,.12)",border:"1px solid rgba(201,169,110,.3)",borderRadius:10,padding:"10px 14px",fontSize:13,color:P.gold,marginBottom:14}}>{success}</div>}
        <button onClick={handleSubmit} disabled={loading||!email||!password} style={{width:"100%",padding:"15px",background:loading?"#333":GOLD_GRAD,color:loading?"#888":"#0D0D0D",border:"none",borderRadius:14,fontSize:16,fontWeight:800,cursor:"pointer",fontFamily:"-apple-system,sans-serif",marginBottom:14,opacity:(!email||!password)?0.5:1}}>
          {loading?"...":(mode==="login"?"Iniciar sesion":"Crear cuenta")}
        </button>
        <button onClick={()=>{setMode(mode==="login"?"register":"login");setError(null);setSuccess(null);}} style={{width:"100%",background:"none",border:"none",color:"#6B6B6B",fontSize:14,cursor:"pointer",fontFamily:"-apple-system,sans-serif"}}>
          {mode==="login"?"No tienes cuenta? Registrate":"Ya tienes cuenta? Inicia sesion"}
        </button>
      </div>
    </div>
  );
}

function TripTypeStep({t,value,onChange}){
  return(
    <div className="fade">
      <div style={{fontSize:22,fontWeight:800,color:P.white,marginBottom:4}}>{t.stepTripType}</div>
      <p style={{fontSize:13,color:P.muted,marginBottom:20}}>{t.stepTripTypeSub}</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
        {Object.entries(TRIP_TYPES).map(([k,tt])=>{
          const sel=value.includes(k);
          return(
            <button key={k} onClick={()=>onChange(k)} style={{background:sel?P.goldDim:P.card,border:`1.5px solid ${sel?P.goldBorder:P.border}`,borderRadius:16,padding:"16px 10px",cursor:"pointer",textAlign:"center",transition:"all .22s",transform:sel?"translateY(-2px)":"none",position:"relative"}}>
              {sel&&<div style={{position:"absolute",top:8,right:8,width:18,height:18,background:P.gold,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:P.black,fontWeight:900}}>✓</div>}
              <div style={{fontSize:24,marginBottom:6}}>{tt.icon}</div>
              <div style={{fontSize:11,fontWeight:700,color:sel?P.gold:P.white}}>{t.tripTypes[k]}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TravelerStyleStep({t,value,onChange}){
  return(
    <div className="fade">
      <div style={{fontSize:22,fontWeight:900,color:"#fff",marginBottom:6}}>{t.stepTravelerStyle}</div>
      <p style={{fontSize:14,color:P.muted,marginBottom:20}}>{t.stepDetails}</p>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {Object.entries(TRAVELER_STYLES).map(([k,ts])=>{
          const sel=value===k;
          return(
            <button key={k} onClick={()=>onChange(k)} style={{background:sel?P.goldDim:P.card,border:`1px solid ${sel?P.goldBorder:P.border}`,borderRadius:18,padding:"16px 18px",cursor:"pointer",textAlign:"left",transition:"all .25s",display:"flex",alignItems:"center",gap:14}}>
              <div style={{width:44,height:44,background:sel?P.goldDim:P.card3,border:`1px solid ${sel?P.goldBorder:P.border}`,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{ts.icon}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:15,fontWeight:700,color:sel?P.gold:P.white,marginBottom:3}}>{t.travelerStyles[k]}</div>
                <div style={{fontSize:12,color:P.muted}}>{t.travelerDescs[k]}</div>
              </div>
              {sel&&<span style={{color:P.gold,fontSize:22,fontWeight:900}}>✓</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FlightCard({flight,selected,onSelect,t,onBook}){
  return(
    <div onClick={onSelect} className="hov" style={{background:selected?P.goldDim:"#1C1C1E",border:`1px solid ${selected?P.goldBorder:P.border}`,borderRadius:22,padding:"20px 22px",marginBottom:12,cursor:"pointer",transition:"all .2s"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <div style={{width:46,height:46,background:selected?P.goldDim:P.card3,border:`1px solid ${selected?P.goldBorder:P.border}`,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>✈️</div>
          <div>
            <div style={{fontSize:16,fontWeight:700,color:"#fff",marginBottom:3}}>{flight.airline}</div>
            <div style={{fontSize:13,color:P.muted,marginBottom:4}}>{flight.departure} → {flight.arrival} · {flight.duration}</div>
            <span style={{background:flight.stops===0?"rgba(201,169,110,.2)":"rgba(201,169,110,.1)",color:P.gold,borderRadius:8,padding:"3px 10px",fontSize:11,fontWeight:700}}>
              {flight.stops===0?(t.direct||"✈ Direct"):(t.stops(flight.stops))}
            </span>
          </div>
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{fontSize:26,fontWeight:700,color:selected?P.gold:P.white}}>{flight.price}€</div>
          <div style={{fontSize:11,color:P.muted,marginBottom:6}}>{t.perPerson}</div>
          <button onClick={e=>{e.stopPropagation();onBook(flight);}} style={{background:GOLD_GRAD,color:"#0D0D0D",border:"none",borderRadius:8,padding:"6px 14px",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"-apple-system,sans-serif"}}>
            {t.bookFlightBtn}
          </button>
        </div>
      </div>
    </div>
  );
}

function HotelCard({hotel,selected,onSelect,nights,onMap,t,travelerStyle,onBook}){
  const[hov,setHov]=useState(false);
  return(
    <div onClick={onSelect} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} className="hov"
      style={{background:selected?P.goldDim:"#1C1C1E",border:`1px solid ${selected?P.goldBorder:hov?P.border2:P.border}`,borderRadius:22,overflow:"hidden",marginBottom:12,cursor:"pointer",transition:"all .2s"}}>
      <div style={{display:"flex",height:130}}>
        <div style={{width:130,flexShrink:0,position:"relative",overflow:"hidden"}}>
          <img src={HOTEL_IMGS[(hotel._imgIdx||0)%HOTEL_IMGS.length]} alt={hotel.name} style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform .3s",transform:hov?"scale(1.06)":"scale(1)"}} onError={e=>e.target.style.display="none"}/>
          {selected&&<div style={{position:"absolute",top:8,right:8,width:22,height:22,background:P.goldDim,border:`1px solid ${P.goldBorder}`,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:P.gold,fontWeight:700}}>✓</div>}
        </div>
        <div style={{flex:1,padding:"14px 16px",display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8,marginBottom:4}}>
              <div style={{fontSize:15,fontWeight:700,color:"#fff",lineHeight:1.2}}>{hotel.name}</div>
              <div style={{textAlign:"right",flexShrink:0}}>
                <div style={{fontSize:20,fontWeight:700,color:selected?P.gold:P.white}}>{hotel.price_per_night}€</div>
                <div style={{fontSize:10,color:P.muted}}>{t.perNight}</div>
              </div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:5}}>
              <Stars n={hotel.stars||4} sz={10}/><span style={{fontSize:11,color:P.muted}}>📍 {hotel.neighborhood}</span>
            </div>
            <p style={{fontSize:12,color:P.muted,margin:0,lineHeight:1.45,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{hotel.description}</p>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:6}}>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              {onMap&&<button onClick={e=>{e.stopPropagation();onMap();}} style={{background:"none",border:`1px solid ${P.border2}`,color:P.muted,borderRadius:8,padding:"3px 9px",fontSize:10,cursor:"pointer"}}>{t.mapBtn}</button>}
              {nights&&<span style={{fontSize:12,color:selected?P.gold:P.muted,fontWeight:600}}>{hotel.price_per_night*nights}€</span>}
            </div>
            <button onClick={e=>{e.stopPropagation();onBook(hotel);}} style={{background:GOLD_GRAD,color:"#0D0D0D",border:"none",borderRadius:8,padding:"5px 12px",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"-apple-system,sans-serif"}}>
              {t.bookHotelBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function RestCard({rest,idx,vegMode,t,onBook}){
  const[hov,setHov]=useState(false);
  const imgs=vegMode?VEG_IMGS:REST_IMGS;
  return(
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} className="hov"
      style={{background:"#1C1C1E",border:`1.5px solid ${hov?P.goldBorder:P.border}`,borderRadius:20,overflow:"hidden",flex:"1 1 190px",minWidth:0,transition:"all .25s"}}>
      <div style={{height:120,overflow:"hidden",position:"relative"}}>
        <img src={imgs[idx%imgs.length]} alt={rest.name} style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform .35s",transform:hov?"scale(1.08)":"scale(1)"}} onError={e=>e.target.style.display="none"}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.7),transparent)"}}/>
        {rest.price_range&&<div style={{position:"absolute",top:8,right:8,background:"rgba(0,0,0,.65)",color:"#fff",borderRadius:8,padding:"2px 8px",fontSize:10,fontWeight:700}}>{rest.price_range}</div>}
      </div>
      <div style={{padding:"13px 14px"}}>
        <div style={{fontSize:13,fontWeight:700,color:"#fff",marginBottom:3}}>{rest.name}</div>
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
          <Stars n={rest.rating||4}/><span style={{fontSize:10,color:P.muted}}>{rest.cuisine}</span>
        </div>
        <button onClick={()=>onBook(rest)} style={{background:GOLD_GRAD,color:"#0D0D0D",border:"none",borderRadius:8,padding:"5px 12px",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"-apple-system,sans-serif",width:"100%"}}>
          {t.bookRestBtn}
        </button>
      </div>
    </div>
  );
}

function WeatherSection({weather,startDate,t,locale}){
  if(!weather?.temperature_2m_max?.length)return null;
  return(
    <div style={{marginBottom:32}} className="pop4">
      <SectionHdr icon="🌤" title={t.weatherT} sub={t.weatherSub}/>
      <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:4}}>
        {weather.temperature_2m_max.slice(0,7).map((maxT,i)=>{
          const d=new Date(startDate+"T12:00:00");d.setDate(d.getDate()+i);
          const rain=weather.precipitation_probability_max[i];
          return(
            <div key={i} style={{background:P.card,border:`1px solid ${P.border}`,borderRadius:12,padding:"14px 12px",minWidth:80,textAlign:"center",flexShrink:0}}>
              <div style={{fontSize:10,color:P.muted,marginBottom:6,fontWeight:600}}>{d.toLocaleDateString(locale||"es-ES",{weekday:"short"})}</div>
              <div style={{fontSize:28,marginBottom:6}}>{wxIcon(weather.weathercode[i])}</div>
              <div style={{fontSize:14,fontWeight:700,color:P.white}}>{Math.round(maxT)}°</div>
              <div style={{fontSize:11,color:P.muted,marginBottom:6}}>{Math.round(weather.temperature_2m_min[i])}°</div>
              <div style={{fontSize:10,color:rain>50?P.gold:P.muted}}>💧{rain}%</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TransportSection({dest,lat,lon,t}){
  const links=getTransportLinks(dest,lat,lon);
  return(
    <div style={{marginBottom:32}} className="pop5">
      <SectionHdr icon="🚗" title={t.transportT} sub={t.transportSub}/>
      <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
        {links.map(lk=>(
          <a key={lk.id} href={lk.url} target="_blank" rel="noopener noreferrer"
            style={{background:"#1C1C1E",border:`1.5px solid ${P.border}`,borderRadius:16,padding:"14px 16px",textDecoration:"none",display:"flex",alignItems:"center",gap:12,flex:"1 1 140px",opacity:lk.available?1:.4,transition:"all .2s"}}
            onMouseEnter={e=>{if(lk.available){e.currentTarget.style.borderColor=P.goldBorder;e.currentTarget.style.transform="translateY(-3px)";}}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=P.border;e.currentTarget.style.transform="none";}}>
            <div style={{width:34,height:34,background:P.card3,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{lk.icon}</div>
            <div><div style={{fontSize:14,fontWeight:700,color:"#fff"}}>{lk.name}</div><div style={{fontSize:11,color:P.muted}}>{lk.desc}</div></div>
            <span style={{marginLeft:"auto",color:P.muted,fontSize:14}}>↗</span>
          </a>
        ))}
      </div>
    </div>
  );
}

function PromoSection({promos,t}){
  if(!promos?.length)return null;
  return(
    <div style={{marginBottom:32}} className="pop">
      <SectionHdr icon="🎟️" title={t.promoT} sub={t.promoSub}/>
      <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
        {promos.map((p,i)=>(
          <div key={i} style={{background:P.card,border:`1px solid ${P.border}`,borderRadius:18,padding:"16px 18px",flex:"1 1 200px",minWidth:0}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
              <div style={{fontSize:22}}>{p.icon||"🎫"}</div>
              <div style={{background:P.goldDim,color:P.gold,border:`1px solid ${P.goldBorder}`,borderRadius:5,padding:"3px 10px",fontSize:11,fontWeight:700}}>-{p.discount}%</div>
            </div>
            <div style={{fontSize:13,fontWeight:600,color:P.white,marginBottom:4}}>{p.title}</div>
            <div style={{fontSize:12,color:P.muted,marginBottom:8}}>{p.description}</div>
            {p.code&&<div style={{background:"#2C2C2E",borderRadius:8,padding:"5px 10px",display:"inline-flex",gap:6}}>
              <span style={{fontSize:10,color:P.muted}}>{t.promoCode}:</span>
              <span style={{fontSize:12,fontWeight:700,color:P.gold,fontFamily:"monospace"}}>{p.code}</span>
            </div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function AffiliatePanel({t}){
  const[open,setOpen]=useState(false);
  return(
    <div style={{background:P.card,borderRadius:14,padding:"18px",marginTop:14,border:`1px solid ${P.border}`}}>
      <button onClick={()=>setOpen(!open)} style={{width:"100%",background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:10,color:"#fff",fontFamily:"-apple-system,sans-serif"}}>
        <div style={{width:28,height:28,background:P.goldDim,border:`1px solid ${P.goldBorder}`,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>💰</div>
        <div style={{flex:1,textAlign:"left"}}>
          <div style={{fontSize:13,fontWeight:600,color:P.white}}>{t.affiliateT}</div>
          <div style={{fontSize:11,color:P.muted}}>{t.affiliateSub}</div>
        </div>
        <span style={{color:P.muted,fontSize:16,transform:open?"rotate(180deg)":"none",transition:".2s"}}>▾</span>
      </button>
      {open&&(
        <div style={{marginTop:14,display:"flex",flexDirection:"column",gap:10}}>
          {AFFILIATE_LINKS.map((al,i)=>(
            <a key={i} href={al.url} target="_blank" rel="noopener noreferrer"
              style={{background:"#2C2C2E",borderRadius:12,padding:"12px 14px",textDecoration:"none",display:"flex",alignItems:"center",gap:12,transition:"all .2s"}}
              onMouseEnter={e=>{e.currentTarget.style.background="#38383A";e.currentTarget.style.transform="translateX(3px)";}}
              onMouseLeave={e=>{e.currentTarget.style.background="#2C2C2E";e.currentTarget.style.transform="none";}}>
              <div style={{width:32,height:32,background:al.grad,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{al.icon}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:700,color:"#fff"}}>{al.name}</div>
                <div style={{fontSize:11,color:P.muted}}>{al.desc}</div>
              </div>
              <span style={{fontSize:10,fontWeight:600,color:P.gold,background:P.goldDim,border:`1px solid ${P.goldBorder}`,borderRadius:5,padding:"3px 8px"}}>{al.cta}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function PkgSummary({flight,hotel,nights,travelers,t}){
  if(!flight&&!hotel)return null;
  const fT=flight?flight.price*(travelers||1):0;
  const hT=hotel?hotel.price_per_night*(nights||5):0;
  const tax=Math.round((fT+hT)*.10);
  const total=fT+hT+tax;
  return(
    <div style={{background:"linear-gradient(145deg,#1E1E20,#181818)",borderRadius:24,padding:22,boxShadow:"0 12px 40px rgba(0,0,0,.5)",border:"0.5px solid rgba(255,255,255,.07)"}}>
      <div style={{fontSize:15,fontWeight:900,marginBottom:16,color:"#fff"}}>{t.pkgT}</div>
      {flight&&<div style={{display:"flex",justifyContent:"space-between",marginBottom:10,fontSize:13}}><span style={{color:P.sub}}>✈️ {flight.airline} × {travelers||1}</span><span style={{fontWeight:700,color:"#fff"}}>{fT}€</span></div>}
      {hotel&&nights&&<div style={{display:"flex",justifyContent:"space-between",marginBottom:10,fontSize:13}}><span style={{color:P.sub}}>🏨 {hotel.name} × {nights}n</span><span style={{fontWeight:700,color:"#fff"}}>{hT}€</span></div>}
      <div style={{height:"0.5px",background:"rgba(255,255,255,.07)",margin:"12px 0"}}/>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:10,fontSize:13}}><span style={{color:P.muted}}>🧾 {t.taxes}</span><span style={{fontWeight:700,color:P.muted}}>{tax}€</span></div>
      <div style={{background:P.goldDim,borderRadius:12,padding:"14px 16px",margin:"14px 0 16px",border:`1px solid ${P.goldBorder}`}}>
        <div style={{fontSize:10,fontWeight:600,color:P.gold,textTransform:"uppercase",letterSpacing:".1em",marginBottom:4}}>{t.totalL}</div>
        <span style={{fontSize:30,fontWeight:700,color:P.gold}}>{total}€</span>
      </div>
      <div style={{fontSize:10,color:"#48484A",textAlign:"center"}}>{t.demoSmall}</div>
    </div>
  );
}

function BookModal({item,type,dest,lang,onClose}){
  const t=T[lang||"es"];
  const url=type==="flight"?`https://www.skyscanner.es/transporte/vuelos/${encodeURIComponent(dest||"")}/`:
    type==="hotel"?`https://www.booking.com/search.html?ss=${encodeURIComponent(item?.name||dest||"")}`:
    type==="restaurant"?`https://www.google.com/search?q=${encodeURIComponent((item?.name||"")+" "+dest+" reservar")}`:
    `https://www.getyourguide.es/s/?q=${encodeURIComponent(dest||"")}`;

  useEffect(()=>{window.open(url,"_blank");onClose();},[]);
  return null;
}

function DayCard({day,i,t}){
  const[open,setOpen]=useState(i===0);
  return(
    <div style={{background:"linear-gradient(145deg,#1C1C1E,#181818)",border:`1.5px solid ${open?P.goldBorder:"#2C2C2E"}`,borderRadius:20,marginBottom:10,overflow:"hidden",transition:"all .3s"}}>
      <button onClick={()=>setOpen(!open)} style={{width:"100%",background:"none",border:"none",padding:"17px 20px",cursor:"pointer",display:"flex",alignItems:"center",gap:14}}>
        <div style={{width:36,height:36,background:open?P.goldDim:P.card3,border:`1px solid ${open?P.goldBorder:P.border}`,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,fontWeight:900,color:open?P.gold:P.muted,flexShrink:0}}>{i+1}</div>
        <div style={{flex:1,textAlign:"left"}}>
          <div style={{fontSize:15,fontWeight:700,color:"#fff"}}>{day.day.replace(/^(Día|Day|Jour) \d+ [-–] /,"")}</div>
          {day.theme&&<div style={{fontSize:12,color:P.muted,marginTop:2}}>{day.theme}</div>}
        </div>
        <span style={{color:P.muted,fontSize:20,transform:open?"rotate(90deg)":"none",transition:".2s"}}>›</span>
      </button>
      {open&&(
        <div style={{padding:"2px 18px 18px",borderTop:"0.5px solid rgba(255,255,255,.06)"}}>
          {[{k:"morning",l:t.morning},{k:"afternoon",l:t.afternoon},{k:"evening",l:t.evening},{k:"transport",l:t.transport}].map(({k,l})=>day[k]&&(
            <div key={k} style={{marginTop:14}}>
              <div style={{fontSize:11,fontWeight:700,color:P.gold,textTransform:"uppercase",letterSpacing:".06em",marginBottom:5}}>{l}</div>
              <p style={{margin:0,fontSize:13,color:"rgba(255,255,255,.75)",lineHeight:1.7}}>{day[k]}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DateInput({start,end,onChange,t}){
  const today=new Date().toISOString().split("T")[0];
  const base={background:"#2C2C2E",border:"1.5px solid #3A3A3C",borderRadius:14,color:"#fff",padding:"12px 14px",fontSize:14,fontFamily:"-apple-system,sans-serif",colorScheme:"dark",outline:"none",width:"100%",boxSizing:"border-box",cursor:"pointer"};
  return(
    <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
      {[{label:t.arrival,field:"start",min:today,val:start},{label:t.departure,field:"end",min:start||today,val:end}].map(({label,field,min,val})=>(
        <div key={field} style={{flex:1,minWidth:130}}>
          <div style={{fontSize:11,fontWeight:600,color:P.muted,letterSpacing:".05em",textTransform:"uppercase",marginBottom:6}}>{label}</div>
          <input type="date" min={min} value={val} onChange={e=>onChange(field,e.target.value)} style={base} onFocus={e=>e.target.style.borderColor=P.gold} onBlur={e=>e.target.style.borderColor="#3A3A3C"}/>
        </div>
      ))}
    </div>
  );
}

const Sk=({w="100%",h=14,r=8,mb=0})=>(
  <div style={{width:w,height:h,borderRadius:r,background:`linear-gradient(90deg,${P.card2} 25%,${P.card3} 50%,${P.card2} 75%)`,backgroundSize:"200% 100%",animation:"shimmer 1.4s infinite",marginBottom:mb,flexShrink:0}}/>
);

export default function ViajeIA(){
  const[lang,setLang]=useState("es");
  const t=T[lang];
  const locale=t.locale;

  const[user,setUser]=useState(null);
  const[authOpen,setAuthOpen]=useState(false);

  const[onboardStep,setOnboardStep]=useState(0);
  const[tripTypes,setTripTypes]=useState([]);
  const[travelerStyle,setTravelerStyle]=useState(null);
  const toggleTripType=k=>setTripTypes(prev=>prev.includes(k)?prev.filter(x=>x!==k):[...prev,k]);

  const[origin,setOrigin]=useState("Madrid, España");
  const[destination,setDestination]=useState("");
  const[budget,setBudget]=useState("");
  const[start,setStart]=useState("");
  const[end,setEnd]=useState("");
  const[travelers,setTravelers]=useState(1);

  const[loading,setLoading]=useState(false);
  const[loadStep,setLoadStep]=useState(-1);
  const[apiError,setApiError]=useState(null);
  const[plan,setPlan]=useState(null);
  const[flights,setFlights]=useState([]);
  const[hotels,setHotels]=useState([]);
  const[rests,setRests]=useState([]);
  const[vegRests,setVegRests]=useState([]);
  const[promos,setPromos]=useState([]);
  const[weather,setWeather]=useState(null);
  const[selF,setSelF]=useState(null);
  const[selH,setSelH]=useState(null);
  const[mapPlaces,setMapPlaces]=useState([]);
  const[activeMap,setActiveMap]=useState(null);
  const[shareToast,setShareToast]=useState(false);
  const[bookItem,setBookItem]=useState(null);
  const leafReady=useLeaflet();
  const days=diffDays(start,end);
  const nights=days?days-1:plan?.days||5;

  useEffect(()=>{
    supabase.auth.getSession().then(({data:{session}})=>setUser(session?.user||null));
    const{data:{subscription}}=supabase.auth.onAuthStateChange((_,session)=>setUser(session?.user||null));
    return()=>subscription.unsubscribe();
  },[]);

  function shareTrip(){
    if(!plan)return;
    const text=`✈️ ${plan.destination} · ${plan.days} dias · ${plan.budget}\n🌐 Planificado con Trippio AI`;
    if(navigator.share){navigator.share({title:`Trippio - ${plan.destination}`,text,url:window.location.href}).catch(()=>{});}
    else{navigator.clipboard?.writeText(text+"\n"+window.location.href);setShareToast(true);setTimeout(()=>setShareToast(false),2500);}
  }

  function buildPlaces(p,hs,rs,vrs){
    const out=[];
    p.map_places?.forEach(x=>{if(x.lat&&x.lng)out.push({name:x.name,lat:+x.lat,lng:+x.lng,desc:x.description,type:"place"});});
    hs.forEach(h=>{if(h.lat&&h.lng)out.push({name:h.name,lat:+h.lat,lng:+h.lng,desc:h.description,type:"hotel"});});
    rs.forEach(r=>{if(r.lat&&r.lng)out.push({name:r.name,lat:+r.lat,lng:+r.lng,desc:r.description,type:"restaurant"});});
    vrs.forEach(r=>{if(r.lat&&r.lng)out.push({name:r.name,lat:+r.lat,lng:+r.lng,desc:r.description,type:"veg"});});
    return out;
  }

  function flyToHotel(h){
    const i=mapPlaces.findIndex(p=>p.name===h.name&&p.type==="hotel");
    if(i>=0){setActiveMap(i);document.getElementById("mapsec")?.scrollIntoView({behavior:"smooth",block:"center"});}
  }

  const parseJ=async r=>{
    try{const d=await r.json();return JSON.parse((d.content||[]).map(b=>b.text||"").join("").replace(/```json|```/g,"").trim());}
    catch{return[];}
  };

  async function generate(){
    if(!destination.trim())return;
    setApiError(null);
    setLoading(true);setPlan(null);setFlights([]);setHotels([]);setRests([]);setVegRests([]);setPromos([]);setWeather(null);setSelF(null);setSelH(null);setMapPlaces([]);
    const dctx=start&&end?`Dates: ${start} to ${end} (${days} days). Travelers: ${travelers}.`:"";
    const lp=t.langPrompt;
    const tsCfg=TRAVELER_STYLES[travelerStyle||"comfort"];
    const tripTypesStr=tripTypes.length?tripTypes.map(k=>k).join(", "):"culture";
    const budgetNum=budget?parseInt(budget):800;

    setLoadStep(0);
    const sys1=`Expert travel planner. ${lp} Reply ONLY valid raw JSON, no backticks, no markdown. ${dctx}
Return: {"destination":"city, country","days":N,"budget":"X€","summary":"2 sentences","map_places":[{"name":"...","lat":0.0,"lng":0.0,"description":"..."}],"itinerary":[{"day":"Day N - Name","theme":"...","morning":"...","afternoon":"...","evening":"...","transport":"...","budget":"~X€"}],"tips":["..."],"lat":0.0,"lng":0.0}
Include 6-8 map_places with real GPS coords. Include destination lat/lng at root.`;

    let planData=null;
    try{
      const r=await fetch("/api/anthropic",{method:"POST",headers:{"Content-Type":"application/json","anthropic-version":"2023-06-01"},body:JSON.stringify({model:"claude-haiku-4-5-20251001",max_tokens:3000,system:sys1,messages:[{role:"user",content:`${destination}${budget?" · "+budget+"€":""}${dctx?" · "+dctx:""}`}]})});
      const d=await r.json();
      planData=JSON.parse((d.content||[]).map(b=>b.text||"").join("").replace(/```json|```/g,"").trim());
      setPlan(planData);
      setLoading(false);
    }catch(e){
      setLoading(false);setLoadStep(-1);
      setApiError(t.errorMsg);return;
    }

    const dest=planData.destination;
    const hotelBudget=Math.round(budgetNum*tsCfg.hotelBudgetPct/(nights||5));

    setLoadStep(1);
    const[r1,r2,r3,r4,r5]=await Promise.all([
      fetch("/api/anthropic",{method:"POST",headers:{"Content-Type":"application/json","anthropic-version":"2023-06-01"},body:JSON.stringify({model:"claude-haiku-4-5-20251001",max_tokens:1000,system:`Generate 3 flights ${origin||"Madrid"}→${dest}. ${lp} Reply ONLY raw JSON array.\n[{"airline":"...","departure":"HH:MM","arrival":"HH:MM","duration":"XhYm","stops":0,"price":XXX}]`,messages:[{role:"user",content:`Flights to ${dest}`}]})}),
      fetch("/api/anthropic",{method:"POST",headers:{"Content-Type":"application/json","anthropic-version":"2023-06-01"},body:JSON.stringify({model:"claude-haiku-4-5-20251001",max_tokens:1500,system:`Hotel expert. ${lp} Reply ONLY raw JSON array.\n[{"name":"...","stars":${tsCfg.hotelStars.split("-")[0]},"neighborhood":"...","description":"...","highlights":["..."],"price_per_night":XX,"lat":0.0,"lng":0.0}]\n3 ${tsCfg.hotelStars}-star hotels in ${dest}. ~${hotelBudget}€/night.`,messages:[{role:"user",content:`Hotels in ${dest}`}]})}),
      fetch("/api/anthropic",{method:"POST",headers:{"Content-Type":"application/json","anthropic-version":"2023-06-01"},body:JSON.stringify({model:"claude-haiku-4-5-20251001",max_tokens:1200,system:`Restaurant expert. ${lp} Reply ONLY raw JSON array.\n[{"name":"...","cuisine":"...","rating":4.2,"price_range":"€€","description":"...","neighborhood":"...","lat":0.0,"lng":0.0}]\n5 restaurants in ${dest}. Trip style: ${tripTypesStr}.`,messages:[{role:"user",content:`Restaurants in ${dest}`}]})}),
      fetch("/api/anthropic",{method:"POST",headers:{"Content-Type":"application/json","anthropic-version":"2023-06-01"},body:JSON.stringify({model:"claude-haiku-4-5-20251001",max_tokens:800,system:`Veg restaurant expert. ${lp} Reply ONLY raw JSON array.\n[{"name":"...","cuisine":"...","diet":"vegetarian|vegan","rating":4.2,"price_range":"€€","description":"...","neighborhood":"...","lat":0.0,"lng":0.0}]\n3 vegetarian restaurants in ${dest}.`,messages:[{role:"user",content:`Veg restaurants in ${dest}`}]})}),
      fetch("/api/anthropic",{method:"POST",headers:{"Content-Type":"application/json","anthropic-version":"2023-06-01"},body:JSON.stringify({model:"claude-haiku-4-5-20251001",max_tokens:600,system:`Travel promotions. ${lp} Reply ONLY raw JSON array.\n[{"title":"...","icon":"emoji","description":"...","discount":10,"code":"PROMO123"}]\n3 promotional offers for ${dest}.`,messages:[{role:"user",content:`Promotions in ${dest}`}]})}),
    ]);

    setLoadStep(2);
    let hs=[],rs=[],vrs=[];

    parseJ(r1).then(fl=>{
      if(fl.length){setFlights(fl);setSelF(0);}
    });
    parseJ(r2).then(h=>{
      const sorted=travelerStyle==="luxury"?h.sort((a,b)=>b.price_per_night-a.price_per_night):h.sort((a,b)=>a.price_per_night-b.price_per_night);
      hs=sorted.map((x,i)=>({...x,_imgIdx:i}));
      if(hs.length){setHotels(hs);setSelH(0);setMapPlaces(buildPlaces(planData,hs,rs,vrs));}
    });
    parseJ(r3).then(r=>{rs=r;if(rs.length){setRests(rs);setMapPlaces(buildPlaces(planData,hs,rs,vrs));}});
    parseJ(r4).then(v=>{vrs=v;if(vrs.length)setVegRests(vrs);});
    parseJ(r5).then(p=>{if(p.length)setPromos(p);});

    setLoadStep(3);
    const lat=planData.lat||planData.map_places?.[0]?.lat;
    const lon=planData.lng||planData.map_places?.[0]?.lng;
    if(lat&&lon&&start){
      const wx=await fetchWeather(lat,lon,start);
      setWeather(wx);
    }
    setLoadStep(-1);
  }

  function reset(){
    setPlan(null);setFlights([]);setHotels([]);setRests([]);setVegRests([]);setPromos([]);setWeather(null);
    setSelF(null);setSelH(null);setMapPlaces([]);setApiError(null);
    setDestination("");setBudget("");setStart("");setEnd("");setTravelers(1);
    setOnboardStep(0);setTripTypes([]);setTravelerStyle(null);
  }

  const flightSel=selF!=null?flights[selF]:null;
  const hotelSel=selH!=null?hotels[selH]:null;
  const destLat=plan?.lat;const destLon=plan?.lng;

  return(
    <div style={{minHeight:"100vh",background:P.black,color:P.white,fontFamily:"-apple-system,'SF Pro Rounded',sans-serif"}}>
      <style>{`
        @keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
        @keyframes up{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pop{0%{opacity:0;transform:scale(.9)}100%{opacity:1;transform:scale(1)}}
        @keyframes pulse{0%,100%{opacity:.4;transform:scale(.78)}50%{opacity:1;transform:scale(1)}}
        @keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
        .fade{animation:up .45s cubic-bezier(.16,1,.3,1) both}
        .fade2{animation:up .45s .08s cubic-bezier(.16,1,.3,1) both}
        .fade3{animation:up .45s .16s cubic-bezier(.16,1,.3,1) both}
        .fade4{animation:up .45s .24s cubic-bezier(.16,1,.3,1) both}
        .pop{animation:pop .5s cubic-bezier(.16,1,.3,1) both}
        .pop2{animation:pop .5s .08s cubic-bezier(.16,1,.3,1) both}
        .pop3{animation:pop .5s .16s cubic-bezier(.16,1,.3,1) both}
        .pop4{animation:pop .5s .24s cubic-bezier(.16,1,.3,1) both}
        .pop5{animation:pop .5s .32s cubic-bezier(.16,1,.3,1) both}
        .hov{transition:transform .2s,box-shadow .2s}
        .hov:hover{transform:translateY(-3px)}
        .results-layout{display:grid;grid-template-columns:1fr 300px;gap:28px;align-items:start}
        @media(max-width:860px){.results-layout{grid-template-columns:1fr}}
        @media(max-width:500px){.nav-sub{display:none}}
        textarea:focus,input:focus{outline:none!important}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-thumb{background:#3A3A3C;border-radius:2px}
        *{-webkit-font-smoothing:antialiased}
        button,input,select{font-family:-apple-system,sans-serif}
      `}</style>

      {/* NAV */}
      <nav style={{background:"rgba(13,13,13,.96)",backdropFilter:"blur(20px)",borderBottom:`1px solid ${P.border}`,padding:"0 22px",height:60,display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:200}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <TrippioLogo size={32}/>
          <div style={{lineHeight:1}}>
            <div style={{fontSize:17,fontWeight:700,color:P.white}}>Trippio</div>
            <div className="nav-sub" style={{fontSize:9,color:P.gold,letterSpacing:".12em",textTransform:"uppercase",marginTop:1,opacity:.8}}>AI Travel</div>
          </div>
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <LangSelector lang={lang} setLang={setLang}/>
          {plan&&<button onClick={shareTrip} style={{background:P.card2,border:`1px solid ${P.border}`,color:P.sub,borderRadius:8,padding:"6px 12px",fontSize:12,cursor:"pointer",fontWeight:600}}>↑ {t.shareBtn||"Share"}</button>}
          {plan&&<IBtn size="sm" outline color={P.muted} onClick={reset}>{t.newSearch}</IBtn>}
          {!user
            ?<button onClick={()=>setAuthOpen(true)} style={{background:GOLD_GRAD,color:"#0D0D0D",border:"none",borderRadius:10,padding:"7px 14px",fontSize:12,fontWeight:700,cursor:"pointer"}}>{t.loginBtn}</button>
            :<button onClick={()=>supabase.auth.signOut()} style={{background:P.card2,border:`1px solid ${P.border}`,color:P.muted,borderRadius:10,padding:"7px 14px",fontSize:12,fontWeight:600,cursor:"pointer"}}>👤 {t.logoutBtn}</button>
          }
        </div>
      </nav>

      {authOpen&&<AuthModal onClose={()=>setAuthOpen(false)} onAuth={u=>setUser(u)}/>}
      {bookItem&&<BookModal item={bookItem.item} type={bookItem.type} dest={plan?.destination} lang={lang} onClose={()=>setBookItem(null)}/>}

      {shareToast&&(
        <div style={{position:"fixed",bottom:32,left:"50%",transform:"translateX(-50%)",background:P.card2,border:`1px solid ${P.goldBorder}`,color:P.gold,borderRadius:12,padding:"12px 22px",fontSize:13,fontWeight:600,zIndex:999}}>
          ✓ {t.shareCopied}
        </div>
      )}

      <main style={{maxWidth:1100,margin:"0 auto",padding:"0 20px 100px"}}>

        {apiError&&(
          <div style={{background:"rgba(224,90,78,.12)",border:"1px solid rgba(224,90,78,.3)",borderRadius:14,padding:"16px 20px",margin:"24px 0",display:"flex",alignItems:"center",gap:14}}>
            <span style={{fontSize:22}}>⚠️</span>
            <div style={{flex:1}}>
              <div style={{fontSize:14,fontWeight:700,color:"#E05A4E",marginBottom:3}}>{t.errorTitle}</div>
              <div style={{fontSize:12,color:P.sub}}>{apiError}</div>
            </div>
            <button onClick={()=>setApiError(null)} style={{background:"none",border:"none",color:P.muted,cursor:"pointer",fontSize:18}}>✕</button>
          </div>
        )}

        {/* ONBOARDING */}
        {!plan&&!loading&&(
          <div style={{maxWidth:600,margin:"0 auto",padding:"60px 0 40px"}}>
            <div style={{display:"flex",justifyContent:"center",gap:8,marginBottom:32}} className="fade">
              {[0,1,2].map(s=>(
                <div key={s} style={{height:4,borderRadius:2,background:s<=onboardStep?P.gold:P.border,width:s===onboardStep?40:20,transition:"all .4s"}}/>
              ))}
            </div>

            {onboardStep===0&&(
              <>
                <div style={{textAlign:"center",marginBottom:28}} className="fade">
                  <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:14,marginBottom:22}}>
                    <TrippioLogo size={56}/>
                    <div style={{textAlign:"left"}}>
                      <div style={{fontSize:36,fontWeight:700,color:P.white,lineHeight:1}}>Trippio</div>
                      <div style={{fontSize:11,color:P.gold,letterSpacing:".15em",textTransform:"uppercase",marginTop:4}}>Your trip. One click.</div>
                    </div>
                  </div>
                  <h1 style={{fontSize:"clamp(28px,5vw,46px)",fontWeight:700,lineHeight:1.1,margin:"0 0 2px",color:P.white}} className="fade2">{t.h1a}</h1>
                  <h1 style={{fontSize:"clamp(28px,5vw,46px)",fontWeight:700,lineHeight:1.1,margin:"0 0 16px",color:P.gold}} className="fade3">{t.h1b}</h1>
                  <p style={{fontSize:15,color:"rgba(235,235,245,.5)",margin:"0 0 28px",lineHeight:1.75}} className="fade4">{t.sub}</p>
                </div>
                <TripTypeStep t={t} value={tripTypes} onChange={toggleTripType}/>
                <div style={{marginTop:20,display:"flex",justifyContent:"flex-end"}}>
                  <IBtn style={{background:GOLD_GRAD,color:P.black,fontWeight:700}} onClick={()=>setOnboardStep(1)} disabled={tripTypes.length===0}>{t.nextBtn}</IBtn>
                </div>
              </>
            )}

            {onboardStep===1&&(
              <>
                <TravelerStyleStep t={t} value={travelerStyle} onChange={setTravelerStyle}/>
                <div style={{marginTop:20,display:"flex",gap:10,justifyContent:"space-between"}}>
                  <IBtn outline color={P.muted} onClick={()=>setOnboardStep(0)}>{t.backBtn2}</IBtn>
                  <IBtn style={{background:GOLD_GRAD,color:P.black,fontWeight:700}} onClick={()=>setOnboardStep(2)} disabled={!travelerStyle}>{t.nextBtn}</IBtn>
                </div>
              </>
            )}

            {onboardStep===2&&(
              <div className="fade">
                <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
                  {tripTypes.map(k=><span key={k} style={{background:P.goldDim,color:P.gold,border:`1px solid ${P.goldBorder}`,borderRadius:8,padding:"5px 12px",fontSize:12,fontWeight:600}}>{TRIP_TYPES[k].icon} {t.tripTypes[k]}</span>)}
                  {travelerStyle&&<span style={{background:GOLD_GRAD,color:"#fff",borderRadius:10,padding:"6px 14px",fontSize:13,fontWeight:800}}>{TRAVELER_STYLES[travelerStyle].icon} {t.travelerStyles[travelerStyle]}</span>}
                </div>
                <div style={{background:P.card,borderRadius:20,padding:"24px 26px",boxShadow:"0 20px 60px rgba(0,0,0,.7)",border:`1px solid ${P.border}`}}>
                  {/* Form fields */}
                  <div style={{display:"flex",flexDirection:"column",gap:14,marginBottom:16}}>
                    <div>
                      <div style={{fontSize:11,fontWeight:700,color:"rgba(235,235,245,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:6}}>✈️ {t.originL}</div>
                      <input value={origin} onChange={e=>setOrigin(e.target.value)} placeholder={t.originPh}
                        style={{width:"100%",background:"#2C2C2E",border:"1.5px solid #3A3A3C",borderRadius:12,color:"#fff",fontSize:15,padding:"12px 14px",boxSizing:"border-box",outline:"none"}}
                        onFocus={e=>e.target.style.borderColor=P.gold} onBlur={e=>e.target.style.borderColor="#3A3A3C"}/>
                    </div>
                    <div>
                      <div style={{fontSize:11,fontWeight:700,color:"rgba(235,235,245,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:6}}>🌍 {t.destinationL}</div>
                      <input value={destination} onChange={e=>setDestination(e.target.value)} placeholder={t.destinationPh}
                        style={{width:"100%",background:"#2C2C2E",border:"1.5px solid #3A3A3C",borderRadius:12,color:"#fff",fontSize:15,padding:"12px 14px",boxSizing:"border-box",outline:"none"}}
                        onFocus={e=>e.target.style.borderColor=P.gold} onBlur={e=>e.target.style.borderColor="#3A3A3C"}/>
                    </div>
                    <div>
                      <div style={{fontSize:11,fontWeight:700,color:"rgba(235,235,245,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:6}}>💰 {t.budgetL}</div>
                      <input value={budget} onChange={e=>setBudget(e.target.value)} placeholder={t.budgetPh} type="number" min="100"
                        style={{width:"100%",background:"#2C2C2E",border:"1.5px solid #3A3A3C",borderRadius:12,color:"#fff",fontSize:15,padding:"12px 14px",boxSizing:"border-box",outline:"none"}}
                        onFocus={e=>e.target.style.borderColor=P.gold} onBlur={e=>e.target.style.borderColor="#3A3A3C"}/>
                    </div>
                  </div>
                  <div style={{height:"0.5px",background:"rgba(255,255,255,.07)",margin:"16px 0"}}/>
                  <div style={{marginBottom:16}}><DateInput start={start} end={end} onChange={(f,v)=>{if(f==="start"){setStart(v);if(end&&v>end)setEnd("");}else setEnd(v);}} t={t}/></div>
                  <div style={{marginBottom:16}}>
                    <div style={{fontSize:11,fontWeight:700,color:"rgba(235,235,245,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:8}}>{t.travelersL}</div>
                    <div style={{display:"flex",alignItems:"center",gap:14}}>
                      <button onClick={()=>setTravelers(Math.max(1,travelers-1))} style={{width:34,height:34,background:"#2C2C2E",border:"1.5px solid #3A3A3C",borderRadius:"50%",cursor:"pointer",fontSize:20,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>−</button>
                      <span style={{fontSize:17,fontWeight:800,minWidth:22,textAlign:"center"}}>{travelers}</span>
                      <button onClick={()=>setTravelers(Math.min(8,travelers+1))} style={{width:34,height:34,background:"#2C2C2E",border:"1.5px solid #3A3A3C",borderRadius:"50%",cursor:"pointer",fontSize:20,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>+</button>
                      <span style={{fontSize:13,color:P.muted}}>{travelers===1?t.traveler1:t.travelersN(travelers)}</span>
                    </div>
                  </div>
                  {days&&days>0&&(
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14,padding:"10px 14px",background:P.goldDim,borderRadius:10,border:`1px solid ${P.goldBorder}`}}>
                      <Dot/><span style={{fontSize:12,color:P.gold,fontWeight:600}}>{days} dias · {fmtDate(start,{day:"numeric",month:"long"},locale)} - {fmtDate(end,{day:"numeric",month:"long",year:"numeric"},locale)}</span>
                    </div>
                  )}
                  <IBtn full size="lg" style={{background:GOLD_GRAD,color:P.black,fontWeight:800}} onClick={generate} disabled={!destination.trim()}>{t.searchBtn}</IBtn>
                </div>
                <div style={{marginTop:12,display:"flex",justifyContent:"flex-start"}}>
                  <IBtn outline color={P.muted} size="sm" onClick={()=>setOnboardStep(1)}>{t.backBtn2}</IBtn>
                </div>
              </div>
            )}
          </div>
        )}

        {/* LOADING */}
        {loading&&!plan&&(
          <div style={{maxWidth:480,margin:"60px auto 0",padding:"0 20px"}} className="fade">
            <div style={{textAlign:"center",marginBottom:28}}>
              <div style={{margin:"0 auto 20px",width:72,display:"flex",justifyContent:"center"}}>
                <TrippioLogo size={72}/>
              </div>
              <h2 style={{fontSize:22,fontWeight:800,margin:"0 0 6px"}}>{t.loadTitle}</h2>
              <p style={{fontSize:13,color:P.muted}}>{t.loadSub}</p>
            </div>
            <div style={{background:P.card,borderRadius:18,padding:"8px 18px 10px",border:`1px solid ${P.border}`,marginBottom:24}}>
              {t.steps.map((label,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"9px 0",opacity:loadStep>=i?1:.3,transition:"opacity .3s",borderBottom:i<t.steps.length-1?`1px solid ${P.border}`:"none"}}>
                  <div style={{width:30,height:30,borderRadius:"50%",background:loadStep>i?P.goldDim:loadStep===i?P.goldDim:P.card3,border:`1px solid ${loadStep>=i?P.goldBorder:P.border}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    {loadStep>i?<span style={{color:P.gold,fontSize:13,fontWeight:700}}>✓</span>:loadStep===i?<Spin size={14} color={P.gold}/>:<span style={{fontSize:12}}>{["🗺️","✈️","🏨","🍽️","🌤","✅"][i]}</span>}
                  </div>
                  <span style={{fontSize:13,fontWeight:loadStep>=i?600:400,color:loadStep>=i?P.white:P.muted}}>{label}</span>
                </div>
              ))}
            </div>
            <div style={{opacity:.6}}><Sk w="100%" h={80} r={16} mb={12}/><Sk w="100%" h={80} r={16}/></div>
          </div>
        )}

        {/* RESULTS */}
        {plan&&(
          <div className="fade">
            <div style={{position:"relative",height:320,borderRadius:"0 0 32px 32px",overflow:"hidden",marginBottom:28,boxShadow:"0 16px 48px rgba(0,0,0,.7)"}}>
              <img src={getImg(plan.destination)} alt={plan.destination} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.85) 0%,rgba(0,0,0,.3) 50%,transparent 75%)"}}/>
              <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"24px 26px"}}>
                <div style={{fontSize:"clamp(30px,5vw,52px)",fontWeight:900,color:"#fff",letterSpacing:"-.04em",lineHeight:1.0,marginBottom:12}}>{plan.destination}</div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  {[t.days(plan.days),plan.budget,start&&end?`${fmtDate(start,null,locale)} → ${fmtDate(end,null,locale)}`:null,travelers===1?t.traveler1:t.travelersN(travelers)].filter(Boolean).map((v,i)=>(
                    <span key={i} style={{background:i===0?P.goldDim:"rgba(255,255,255,.06)",color:i===0?P.gold:P.sub,border:`1px solid ${i===0?P.goldBorder:"rgba(255,255,255,.1)"}`,borderRadius:20,padding:"4px 14px",fontSize:11,fontWeight:i===0?600:400}}>{v}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="results-layout" style={{gap:22,alignItems:"start"}}>
              <div>
                {weather&&start&&<WeatherSection weather={weather} startDate={start} t={t} locale={locale}/>}

                {flights.length>0&&(
                  <div style={{marginBottom:32}} className="pop">
                    <SectionHdr icon="✈️" title={t.flightsT} sub={t.flightsSub(plan.destination,travelers,origin)}/>
                    {flights.map((fl,i)=><FlightCard key={i} flight={fl} selected={selF===i} onSelect={()=>setSelF(i)} t={t} onBook={item=>setBookItem({item,type:"flight"})}/>)}
                  </div>
                )}

                {hotels.length>0&&(
                  <div style={{marginBottom:32}} className="pop2">
                    <SectionHdr icon="🏨" title={t.hotelsT} sub={t.hotelsSub(nights)}/>
                    {hotels.map((h,i)=><HotelCard key={i} hotel={h} selected={selH===i} onSelect={()=>setSelH(i)} nights={nights} onMap={h.lat&&h.lng?()=>flyToHotel(h):null} t={t} travelerStyle={travelerStyle} onBook={item=>setBookItem({item,type:"hotel"})}/>)}
                  </div>
                )}

                {leafReady&&mapPlaces.length>0&&(
                  <div id="mapsec" style={{marginBottom:32}} className="pop3">
                    <SectionHdr icon="🗺️" title={t.mapT} sub={t.mapSub}/>
                    <TravelMap places={mapPlaces} active={activeMap} onSelect={setActiveMap}/>
                  </div>
                )}

                {rests.length>0&&(
                  <div style={{marginBottom:32}} className="pop4">
                    <SectionHdr icon="🍽️" title={t.restsT} sub={t.restsSub}/>
                    <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>{rests.map((r,i)=><RestCard key={i} rest={r} idx={i} t={t} onBook={item=>setBookItem({item,type:"restaurant"})}/>)}</div>
                  </div>
                )}

                {vegRests.length>0&&(
                  <div style={{marginBottom:32}} className="pop5">
                    <SectionHdr icon="🌿" title={t.vegT} sub={t.vegSub}/>
                    <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>{vegRests.map((r,i)=><RestCard key={i} rest={r} idx={i} vegMode t={t} onBook={item=>setBookItem({item,type:"restaurant"})}/>)}</div>
                  </div>
                )}

                {promos.length>0&&<PromoSection promos={promos} t={t}/>}

                <TransportSection dest={plan.destination} lat={destLat} lon={destLon} t={t}/>

                {plan.itinerary?.length>0&&(
                  <div style={{marginBottom:32}} className="pop">
                    <SectionHdr icon="📅" title={t.itinT} sub={t.itinSub}/>
                    {plan.itinerary.map((day,i)=><DayCard key={i} day={day} i={i} t={t}/>)}
                  </div>
                )}
              </div>

              <div style={{position:"sticky",top:72}}>
                <PkgSummary flight={flightSel} hotel={hotelSel} nights={nights} travelers={travelers} t={t}/>
                {flightSel&&hotelSel&&(
                  <div style={{marginTop:16}}>
                    <IBtn full size="lg" style={{background:GOLD_GRAD,color:P.black,fontWeight:700}} onClick={()=>setBookItem({item:{flightSel,hotelSel},type:"package"})}>{t.bookBtn}</IBtn>
                    <div style={{fontSize:11,color:"#48484A",textAlign:"center",marginTop:10}}>{t.demoNote}</div>
                  </div>
                )}
                {plan.tips?.length>0&&(
                  <div style={{background:P.card,borderRadius:14,padding:"18px",marginTop:14,border:`1px solid ${P.border}`}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
                      <div style={{width:28,height:28,background:P.goldDim,border:`1px solid ${P.goldBorder}`,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>💡</div>
                      <span style={{fontSize:14,fontWeight:800}}>{t.tipsT}</span>
                    </div>
                    {plan.tips.slice(0,4).map((tip,i)=>(
                      <div key={i} style={{display:"flex",gap:8,marginBottom:10}}>
                        <span style={{width:6,height:6,background:P.gold,borderRadius:"50%",flexShrink:0,marginTop:5}}/>
                        <p style={{margin:0,fontSize:12,color:P.muted,lineHeight:1.65}}>{tip}</p>
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
