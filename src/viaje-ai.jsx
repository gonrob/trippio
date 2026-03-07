import { useState, useEffect, useRef } from "react";

/* ── Design tokens — Trippio Elegant Palette ────────────────────────────────
   Three colours only:
   · #0D0D0D  deep black (background)
   · #C9A96E  warm gold  (accent — the ONE colour)
   · #FFFFFF  white      (text)
   Supporting: warm greys #1A1A1A #252525 #2E2E2E #6B6B6B #A0A0A0
────────────────────────────────────────────────────────────────────────────── */
const P = {
  black:  "#0D0D0D",
  card:   "#141414",
  card2:  "#1A1A1A",
  card3:  "#252525",
  border: "#2A2A2A",
  border2:"#333333",
  muted:  "#6B6B6B",
  sub:    "#A0A0A0",
  white:  "#FFFFFF",
  gold:   "#C9A96E",
  goldDim:"rgba(201,169,110,.18)",
  goldBorder:"rgba(201,169,110,.25)",
  goldGlow:"rgba(201,169,110,.35)",
};
/* Keep iOS aliased to P so existing references still work */
const iOS = {
  blue:P.gold, teal:P.gold, green:P.gold, orange:P.gold,
  red:"#E05A4E", pink:P.gold, purple:P.gold, indigo:P.gold,
  yellow:P.gold, mint:P.gold, cyan:P.gold,
  bg:P.black, card:P.card2, card2:P.card3,
  label:P.white, label2:"rgba(255,255,255,.75)", fill:P.muted,
  sep:P.border, sep2:P.border2,
};
/* Single gradient — gold shimmer */
const GOLD_GRAD = `linear-gradient(135deg,#C9A96E,#E8C98A)`;
const GOLD_GRAD2= `linear-gradient(135deg,#B8935A,#C9A96E)`;
/* G kept for compatibility — everything maps to gold or neutral */
const G = {
  blue:GOLD_GRAD, teal:GOLD_GRAD, green:GOLD_GRAD, orange:GOLD_GRAD,
  pink:GOLD_GRAD, purple:GOLD_GRAD, indigo:GOLD_GRAD,
  sunset:GOLD_GRAD, ocean:GOLD_GRAD, aurora:GOLD_GRAD,
  candy:GOLD_GRAD, gold:GOLD_GRAD, earth:GOLD_GRAD,
  adventure:GOLD_GRAD, culture:GOLD_GRAD2, relax:GOLD_GRAD, gastro:GOLD_GRAD,
};

/* ── Trippio Logo SVG ───────────────────────────────────────────────────────── */
// Concept: a paper plane (origami / travel symbol) — single clean geometric shape
// inside a thin circle. Timeless. Unmistakably "travel". Nothing else.
function TrippioLogo({size=34}){
  const s=size;
  // Normalised to 100×100 viewBox then scaled
  // Paper plane: sharp triangular silhouette pointing top-right at ~40°
  // Body: main triangle. Tail: folded lower wing. Clean, architectural.
  return(
    <svg width={s} height={s} viewBox="0 0 100 100" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{flexShrink:0,filter:`drop-shadow(0 ${s*0.06}px ${s*0.18}px rgba(201,169,110,0.4))`}}>
      <defs>
        <linearGradient id="lg" x1="15%" y1="15%" x2="85%" y2="85%">
          <stop offset="0%" stopColor="#E8C98A"/>
          <stop offset="100%" stopColor="#B8935A"/>
        </linearGradient>
      </defs>
      {/* Outer ring — thin, elegant */}
      <circle cx="50" cy="50" r="45" stroke="url(#lg)" strokeWidth="2.5" opacity="0.6"/>
      {/* Paper plane body — pointing upper-right */}
      {/* Main body triangle */}
      <path
        d="M 24 72 L 68 20 L 76 54 Z"
        fill="url(#lg)"
        opacity="0.95"
      />
      {/* Folded under-wing — lower left triangle, slightly darker */}
      <path
        d="M 24 72 L 76 54 L 52 68 Z"
        fill="#B8935A"
        opacity="0.7"
      />
      {/* Spine line — subtle fold line from nose to tail */}
      <line x1="24" y1="72" x2="76" y2="54" stroke="#0D0D0D" strokeWidth="1" opacity="0.3"/>
    </svg>
  );
}

/* ── Travel style config ────────────────────────────────────────────────────── */
const TRIP_TYPES = {
  adventure:{ icon:"🏔️", grad:GOLD_GRAD,  col:P.gold, budgetMult:0.7 },
  culture:  { icon:"🏛️", grad:GOLD_GRAD2, col:P.gold, budgetMult:1.0 },
  beach:    { icon:"🏖️", grad:GOLD_GRAD,  col:P.gold, budgetMult:1.1 },
  gastro:   { icon:"🍜", grad:GOLD_GRAD,  col:P.gold, budgetMult:1.1 },
  nature:   { icon:"🌿", grad:GOLD_GRAD2, col:P.gold, budgetMult:0.8 },
  city:     { icon:"🏙️", grad:GOLD_GRAD,  col:P.gold, budgetMult:1.0 },
  wellness: { icon:"🧘", grad:GOLD_GRAD2, col:P.gold, budgetMult:1.3 },
  nightlife:{ icon:"🎉", grad:GOLD_GRAD,  col:P.gold, budgetMult:1.0 },
  retreat:  { icon:"🌀", grad:GOLD_GRAD2, col:P.gold, budgetMult:1.4 },
};
const TRAVELER_STYLES = {
  backpacker:{ icon:"🎒", grad:GOLD_GRAD,  col:P.gold, hotelStars:"1",   hotelBudgetPct:0.15 },
  comfort:   { icon:"🛎️", grad:GOLD_GRAD2, col:P.gold, hotelStars:"2-3", hotelBudgetPct:0.35 },
  luxury:    { icon:"💎", grad:GOLD_GRAD,  col:P.gold, hotelStars:"4-5", hotelBudgetPct:0.60 },
};

/* ── Translations ───────────────────────────────────────────────────────────── */
const T = {
  es:{
    flag:"🇪🇸",name:"Español",locale:"es-ES",langPrompt:"Responde en español.",
    navSub:"Planifica con IA",newSearch:"Nueva búsqueda",bookNav:"Reservar →",
    badge:"Trippio · Vuelos + Hoteles + Clima",
    h1a:"Tu próximo viaje,",h1b:"en un clic.",
    sub:"Elige tu estilo, destino y presupuesto. La IA construye todo al instante.",
    // onboarding
    stepTripType:"¿Qué tipo de viaje buscas?",
    stepTripTypeSub:"Elige uno o varios — combínalos a tu gusto",
    selectedLabel:"Elegido:",
    stepTravelerStyle:"¿Cómo prefieres viajar?",
    stepDetails:"Cuéntanos más",
    tripTypes:{ adventure:"Aventura", culture:"Cultura", beach:"Playa", gastro:"Gastronomía", nature:"Naturaleza", city:"Ciudad", wellness:"Bienestar", nightlife:"Vida Nocturna", retreat:"Retiro Espiritual" },
    tripDescs:{ adventure:"Senderismo, deportes extremos, naturaleza salvaje", culture:"Museos, historia, arquitectura, arte", beach:"Playas, sol, deportes acuáticos", gastro:"Restaurantes, mercados, experiencias culinarias", nature:"Parques, senderismo, fauna silvestre", city:"Barrios, tiendas, vida urbana", wellness:"Spas, yoga, desconexión total", nightlife:"Bares, clubs, conciertos, festivales", retreat:"Yoga, meditación, ayahuasca, desintoxicación digital" },
    travelerStyles:{ backpacker:"Mochilero", comfort:"Confort", luxury:"Lujo" },
    travelerDescs:{ backpacker:"Hostels y alojamientos 1★, transporte local, experiencia auténtica", comfort:"Hoteles 2-3★, vuelos directos, buen equilibrio calidad-precio", luxury:"Hoteles 4-5★, business class, experiencias VIP" },
    whereQ:"¿A dónde quieres ir?",arrival:"Llegada",departure:"Salida",
    travelersL:"Viajeros",traveler1:"1 viajero",travelersN:n=>`${n} viajeros`,
    searchBtn:"Buscar mi viaje ✦",nextBtn:"Siguiente →",backBtn2:"← Atrás",
    examples:["Tokio · 5 días · 1000€","Roma · 7 días · 1500€","Bangkok · 3 días · 600€","Nueva York · 5 días · 2000€"],
    loadTitle:"Preparando tu aventura…",loadSub:"Buscando las mejores opciones para ti",
    steps:["Creando itinerario personalizado","Buscando vuelos","Buscando hoteles","Restaurantes locales","Transporte & Clima","¡Todo listo!"],
    flightsT:"Vuelos disponibles",flightsSub:(d,n)=>`Madrid → ${d} · ${n} viajero${n>1?"s":""}`,
    direct:"✈ Directo",stops:n=>`${n} escala${n>1?"s":""}`,perPerson:"por persona",selBadge:"Seleccionado ✓",
    hotelsT:"Hoteles recomendados",hotelsSub:n=>`${n} noches · Selecciona tu alojamiento`,
    perNight:"/ noche",mapBtn:"🗺 Mapa",totalNights:(n,p)=>`${p*n}€ total`,
    mapT:"Mapa del viaje",mapSub:"Hoteles · Restaurantes · Lugares de interés",
    restsT:"Dónde comer",restsSub:"Los mejores restaurantes seleccionados por IA",
    vegT:"Opciones vegetarianas y veganas",vegSub:"Restaurantes plant-based seleccionados",
    vegBadge:"Vegetariano",veganBadge:"Vegano",
    itinT:"Itinerario día a día",itinSub:"Tu plan personalizado",
    morning:"☀️ Mañana",afternoon:"🌤 Tarde",evening:"🌙 Noche",transport:"🚇 Transporte",
    tipsT:"Tips del viaje",
    transportT:"Transporte en destino",transportSub:"Opciones de movilidad local",
    weatherT:"Previsión meteorológica",weatherSub:"Durante tu viaje",
    promoT:"Promociones & Descuentos",promoSub:"Ofertas activas en tu destino",
    pkgT:"Resumen del paquete",taxes:"Tasas e impuestos",totalL:"Total estimado",
    bookBtn:"🔒 Reservar paquete →",demoNote:"Demo · No se realizan cargos reales",bookedL:"¡Reservado!",
    modalT:"Confirmar reserva",processing:"Procesando…",doneT:"¡Reserva confirmada! 🎉",
    summaryL:"Resumen",continueBtn:"Continuar →",travelerT:"Datos del viajero principal",
    nameL:"Nombre completo",namePh:"María García",emailL:"Email",emailPh:"maria@email.com",
    phoneL:"Teléfono",phonePh:"+34 600 000 000",backBtn:"← Volver",payBtn:"Pago →",
    cardL:"Número de tarjeta",expiryL:"Caducidad",cvvL:"CVV",
    secureNote:"Pago 100% seguro · SSL cifrado (demo)",
    payConfirm:t=>`🔒 Pagar ${t}€`,
    successT:d=>`¡Todo listo para ${d}!`,successSub:"Tu vuelo y hotel están confirmados.",
    flightConf:"VUELO CONFIRMADO",hotelConf:"HOTEL CONFIRMADO",
    processingT:"Confirmando tu reserva…",processingSub:"Por favor no cierres esta ventana",
    bookedBannerT:"¡Reserva confirmada!",bookedBannerSub:(a,h,n)=>`${a} + ${h} · ${n} noches`,
    days:n=>`${n} días`,nights:n=>`${n} noches`,
    pkgSave:"🎁 Ahorra un 8% reservando el paquete completo",
    demoSmall:"Precios orientativos · Modo demo",
    uberBtn:"Abrir Uber",grabBtn:"Abrir Grab",cabifyBtn:"Abrir Cabify",
    affiliateT:"Reserva con nuestros socios",affiliateSub:"Comisión incluida · Sin coste extra para ti",
    weatherFeel:"Sensación",weatherWind:"Viento",weatherHumidity:"Humedad",
    promoDiscount:"descuento",promoCode:"Código",
    shareBtn:"Compartir",shareCopied:"Enlace copiado",errorTitle:"Algo salió mal",errorMsg:"Error al generar. Inténtalo de nuevo.",
    retreatT:"Retiros espirituales",retreatSub:"Centros de yoga, meditación y medicina ancestral",
    retreatTypes:{yoga:"Yoga",meditation:"Meditación",ayahuasca:"Ayahuasca",breathwork:"Respiración",sound:"Sonidos",digital:"Detox Digital",shamanic:"Chamanismo",silent:"Silencio"},
    retreatDuration:"duración",retreatLevel:"nivel",retreatPrice:"precio total",retreatSpots:"plazas",retreatBook:"Solicitar plaza →",retreatBadge:"Retiro verificado",
  },
  en:{
    flag:"🇬🇧",name:"English",locale:"en-GB",langPrompt:"Respond in English.",
    navSub:"AI Travel Planner",newSearch:"New search",bookNav:"Book →",
    badge:"AI Planner · Flights + Hotels",
    h1a:"Your next trip,",h1b:"in one click.",
    sub:"Choose your style, destination and budget. AI builds everything instantly.",
    stepTripType:"What kind of trip are you looking for?",
    stepTripTypeSub:"Choose one or more — mix and match",
    selectedLabel:"Selected:",
    stepTravelerStyle:"How do you prefer to travel?",
    stepDetails:"Tell us more",
    tripTypes:{ adventure:"Adventure", culture:"Culture", beach:"Beach", gastro:"Gastronomy", nature:"Nature", city:"City Break", wellness:"Wellness", nightlife:"Nightlife", retreat:"Spiritual Retreat" },
    tripDescs:{ adventure:"Hiking, extreme sports, wild nature", culture:"Museums, history, architecture, art", beach:"Beaches, sun, water sports", gastro:"Restaurants, markets, culinary experiences", nature:"Parks, hiking, wildlife", city:"Neighbourhoods, shopping, urban life", wellness:"Spas, yoga, total disconnection", nightlife:"Bars, clubs, concerts, festivals", retreat:"Yoga, meditation, ayahuasca, digital detox" },
    travelerStyles:{ backpacker:"Backpacker", comfort:"Comfort", luxury:"Luxury" },
    travelerDescs:{ backpacker:"Hostels & 1★ guesthouses, local transport, authentic experience", comfort:"2-3★ hotels, direct flights, great value balance", luxury:"4-5★ hotels, business class, VIP experiences" },
    whereQ:"Where do you want to go?",arrival:"Check-in",departure:"Check-out",
    travelersL:"Travelers",traveler1:"1 traveler",travelersN:n=>`${n} travelers`,
    searchBtn:"Find my trip ✦",nextBtn:"Next →",backBtn2:"← Back",
    examples:["Tokyo · 5 days · €1000","Rome · 7 days · €1500","Bangkok · 3 days · €600","New York · 5 days · €2000"],
    loadTitle:"Preparing your adventure…",loadSub:"Searching the best options for you",
    steps:["Creating itinerary","Searching flights","Finding hotels","Local restaurants","Transport & Weather","All ready!"],
    flightsT:"Available flights",flightsSub:(d,n)=>`Madrid → ${d} · ${n} traveler${n>1?"s":""}`,
    direct:"✈ Direct",stops:n=>`${n} stop${n>1?"s":""}`,perPerson:"per person",selBadge:"Selected ✓",
    hotelsT:"Recommended hotels",hotelsSub:n=>`${n} nights · Choose your accommodation`,
    perNight:"/ night",mapBtn:"🗺 Map",totalNights:(n,p)=>`€${p*n} total`,
    mapT:"Trip map",mapSub:"Hotels · Restaurants · Points of interest",
    restsT:"Where to eat",restsSub:"Best restaurants selected by AI",
    vegT:"Vegetarian & vegan options",vegSub:"Plant-based restaurants selected by AI",
    vegBadge:"Vegetarian",veganBadge:"Vegan",
    itinT:"Day by day itinerary",itinSub:"Your personalized plan",
    morning:"☀️ Morning",afternoon:"🌤 Afternoon",evening:"🌙 Evening",transport:"🚇 Transport",
    tipsT:"Travel tips",
    transportT:"Transport at destination",transportSub:"Local mobility options",
    weatherT:"Weather forecast",weatherSub:"During your trip",
    promoT:"Promotions & Discounts",promoSub:"Active deals at your destination",
    pkgT:"Package summary",taxes:"Taxes & fees",totalL:"Estimated total",
    bookBtn:"🔒 Book package →",demoNote:"Demo · No real charges apply",bookedL:"Booked!",
    modalT:"Confirm booking",processing:"Processing…",doneT:"Booking confirmed! 🎉",
    summaryL:"Summary",continueBtn:"Continue →",travelerT:"Lead traveler details",
    nameL:"Full name",namePh:"John Smith",emailL:"Email",emailPh:"john@email.com",
    phoneL:"Phone",phonePh:"+44 7700 000000",backBtn:"← Back",payBtn:"Payment →",
    cardL:"Card number",expiryL:"Expiry",cvvL:"CVV",
    secureNote:"100% secure payment · SSL encrypted (demo)",
    payConfirm:t=>`🔒 Pay €${t}`,
    successT:d=>`All set for ${d}!`,successSub:"Your flight and hotel are confirmed.",
    flightConf:"FLIGHT CONFIRMED",hotelConf:"HOTEL CONFIRMED",
    processingT:"Confirming your booking…",processingSub:"Please don't close this window",
    bookedBannerT:"Booking confirmed!",bookedBannerSub:(a,h,n)=>`${a} + ${h} · ${n} nights`,
    days:n=>`${n} days`,nights:n=>`${n} nights`,
    pkgSave:"🎁 Save 8% booking the full package",
    demoSmall:"Estimated prices · Demo mode",
    uberBtn:"Open Uber",grabBtn:"Open Grab",cabifyBtn:"Open Cabify",
    affiliateT:"Book with our partners",affiliateSub:"Commission included · No extra cost for you",
    weatherFeel:"Feels like",weatherWind:"Wind",weatherHumidity:"Humidity",
    promoDiscount:"off",promoCode:"Code",
    shareBtn:"Share",shareCopied:"Link copied to clipboard",errorTitle:"Something went wrong",errorMsg:"Error generating itinerary. Please try again.",
    retreatT:"Spiritual retreats",retreatSub:"Yoga, meditation & ancestral medicine centres",
    retreatTypes:{yoga:"Yoga",meditation:"Meditation",ayahuasca:"Ayahuasca",breathwork:"Breathwork",sound:"Sound Bath",digital:"Digital Detox",shamanic:"Shamanic",silent:"Silent Retreat"},
    retreatDuration:"duration",retreatLevel:"level",retreatPrice:"total price",retreatSpots:"spots left",retreatBook:"Request a spot →",retreatBadge:"Verified retreat",
  },
  fr:{
    flag:"🇫🇷",name:"Français",locale:"fr-FR",langPrompt:"Réponds en français.",
    navSub:"Planificateur IA",newSearch:"Nouvelle recherche",bookNav:"Réserver →",
    badge:"Trippio · Vols + Hôtels + Météo",
    h1a:"Votre prochain voyage,",h1b:"en un clic.",
    sub:"Choisissez votre style, destination et budget. L'IA construit tout instantanément.",
    stepTripType:"Quel type de voyage recherchez-vous ?",
    stepTripTypeSub:"Choisissez un ou plusieurs — combinez à votre guise",
    selectedLabel:"Sélectionné :",
    stepTravelerStyle:"Comment préférez-vous voyager ?",
    stepDetails:"Dites-nous en plus",
    tripTypes:{ adventure:"Aventure", culture:"Culture", beach:"Plage", gastro:"Gastronomie", nature:"Nature", city:"Citybreak", wellness:"Bien-être", nightlife:"Vie Nocturne", retreat:"Retraite Spirituelle" },
    tripDescs:{ adventure:"Randonnée, sports extrêmes, nature sauvage", culture:"Musées, histoire, architecture, art", beach:"Plages, soleil, sports nautiques", gastro:"Restaurants, marchés, expériences culinaires", nature:"Parcs, randonnée, faune", city:"Quartiers, shopping, vie urbaine", wellness:"Spas, yoga, déconnexion totale", nightlife:"Bars, clubs, concerts, festivals", retreat:"Yoga, méditation, ayahuasca, détox numérique" },
    travelerStyles:{ backpacker:"Routard", comfort:"Confort", luxury:"Luxe" },
    travelerDescs:{ backpacker:"Auberges & hôtels 1★, transports locaux, expérience authentique", comfort:"Hôtels 2-3★, vols directs, bon rapport qualité-prix", luxury:"Hôtels 4-5★, classe affaires, expériences VIP" },
    whereQ:"Où voulez-vous aller ?",arrival:"Arrivée",departure:"Départ",
    travelersL:"Voyageurs",traveler1:"1 voyageur",travelersN:n=>`${n} voyageurs`,
    searchBtn:"Trouver mon voyage ✦",nextBtn:"Suivant →",backBtn2:"← Retour",
    examples:["Tokyo · 5 jours · 1000€","Rome · 7 jours · 1500€","Bangkok · 3 jours · 600€","New York · 5 jours · 2000€"],
    loadTitle:"Préparation de votre aventure…",loadSub:"Recherche des meilleures options",
    steps:["Création de l'itinéraire","Recherche de vols","Recherche d'hôtels","Restaurants locaux","Transport & Météo","Tout est prêt !"],
    flightsT:"Vols disponibles",flightsSub:(d,n)=>`Madrid → ${d} · ${n} voyageur${n>1?"s":""}`,
    direct:"✈ Direct",stops:n=>`${n} escale${n>1?"s":""}`,perPerson:"par personne",selBadge:"Sélectionné ✓",
    hotelsT:"Hôtels recommandés",hotelsSub:n=>`${n} nuits · Choisissez votre hébergement`,
    perNight:"/ nuit",mapBtn:"🗺 Carte",totalNights:(n,p)=>`${p*n}€ total`,
    mapT:"Carte du voyage",mapSub:"Hôtels · Restaurants · Points d'intérêt",
    restsT:"Où manger",restsSub:"Meilleurs restaurants sélectionnés par IA",
    vegT:"Options végétariennes et véganes",vegSub:"Restaurants plant-based sélectionnés",
    vegBadge:"Végétarien",veganBadge:"Végan",
    itinT:"Itinéraire jour par jour",itinSub:"Votre plan personnalisé",
    morning:"☀️ Matin",afternoon:"🌤 Après-midi",evening:"🌙 Soir",transport:"🚇 Transport",
    tipsT:"Conseils voyage",
    transportT:"Transport à destination",transportSub:"Options de mobilité locale",
    weatherT:"Prévisions météo",weatherSub:"Pendant votre voyage",
    promoT:"Promotions & Réductions",promoSub:"Offres actives à votre destination",
    pkgT:"Résumé du forfait",taxes:"Taxes et frais",totalL:"Total estimé",
    bookBtn:"🔒 Réserver le forfait →",demoNote:"Démo · Aucun frais réel",bookedL:"Réservé !",
    modalT:"Confirmer la réservation",processing:"Traitement en cours…",doneT:"Réservation confirmée ! 🎉",
    summaryL:"Résumé",continueBtn:"Continuer →",travelerT:"Coordonnées du voyageur principal",
    nameL:"Nom complet",namePh:"Marie Dupont",emailL:"E-mail",emailPh:"marie@email.com",
    phoneL:"Téléphone",phonePh:"+33 6 00 00 00 00",backBtn:"← Retour",payBtn:"Paiement →",
    cardL:"Numéro de carte",expiryL:"Expiration",cvvL:"CVV",
    secureNote:"Paiement 100% sécurisé · SSL chiffré (démo)",
    payConfirm:t=>`🔒 Payer ${t}€`,
    successT:d=>`Tout est prêt pour ${d} !`,successSub:"Votre vol et hôtel sont confirmés.",
    flightConf:"VOL CONFIRMÉ",hotelConf:"HÔTEL CONFIRMÉ",
    processingT:"Confirmation de votre réservation…",processingSub:"Veuillez ne pas fermer cette fenêtre",
    bookedBannerT:"Réservation confirmée !",bookedBannerSub:(a,h,n)=>`${a} + ${h} · ${n} nuits`,
    days:n=>`${n} jours`,nights:n=>`${n} nuits`,
    pkgSave:"🎁 Économisez 8% en réservant le forfait",
    demoSmall:"Prix indicatifs · Mode démo",
    uberBtn:"Ouvrir Uber",grabBtn:"Ouvrir Grab",cabifyBtn:"Ouvrir Cabify",
    affiliateT:"Réservez avec nos partenaires",affiliateSub:"Commission incluse · Aucun coût supplémentaire",
    weatherFeel:"Ressenti",weatherWind:"Vent",weatherHumidity:"Humidité",
    promoDiscount:"réduction",promoCode:"Code",
    shareBtn:"Partager",shareCopied:"Lien copié",errorTitle:"Une erreur est survenue",errorMsg:"Erreur lors de la génération. Veuillez réessayer.",
    retreatT:"Retraites spirituelles",retreatSub:"Centres de yoga, méditation et médecine ancestrale",
    retreatTypes:{yoga:"Yoga",meditation:"Méditation",ayahuasca:"Ayahuasca",breathwork:"Respiration",sound:"Bain Sonore",digital:"Détox Numérique",shamanic:"Chamanique",silent:"Retraite Silence"},
    retreatDuration:"durée",retreatLevel:"niveau",retreatPrice:"prix total",retreatSpots:"places",retreatBook:"Demander une place →",retreatBadge:"Retraite vérifiée",
  },
};

/* ── Image arrays ──────────────────────────────────────────────────────────── */
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
const VEG_IMGS=["https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80","https://images.unsplash.com/photo-1540914124281-342587941389?w=500&q=80","https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&q=80","https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=500&q=80","https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=500&q=80","https://images.unsplash.com/photo-1547592180-85f173990554?w=500&q=80"];

/* ── Helpers ───────────────────────────────────────────────────────────────── */
function getImg(dest=""){const d=dest.toLowerCase();for(const[k,v]of Object.entries(DEST_IMGS))if(d.includes(k))return v;return DEST_IMGS.default;}
const diffDays=(a,b)=>(!a||!b)?null:Math.round((new Date(b+"T12:00:00")-new Date(a+"T12:00:00"))/86400000)+1;
const fmtDate=(s,o,loc)=>!s?"":new Date(s+"T12:00:00").toLocaleDateString(loc||"es-ES",o||{day:"numeric",month:"short"});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));

/* ── Weather hook (Open-Meteo, 100% free, no key) ───────────────────────────── */
async function fetchWeather(lat,lon,startDate){
  try{
    const url=`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weathercode,windspeed_10m_max&timezone=auto&start_date=${startDate}&forecast_days=7`;
    const r=await fetch(url);
    const d=await r.json();
    return d.daily;
  }catch{return null;}
}

const WX_ICONS={0:"☀️",1:"🌤",2:"⛅",3:"☁️",45:"🌫",48:"🌫",51:"🌦",53:"🌧",55:"🌧",61:"🌧",63:"🌧",65:"🌧",71:"❄️",73:"❄️",75:"❄️",80:"🌦",81:"🌧",82:"⛈️",95:"⛈️",96:"⛈️",99:"⛈️"};
const wxIcon=c=>WX_ICONS[c]||"🌡";

/* ── Transport deeplinks ────────────────────────────────────────────────────── */
function getTransportLinks(dest="",lat=null,lon=null){
  const d=encodeURIComponent(dest);
  const isAsia=lat&&lon&&(lat>-10&&lat<55&&lon>60&&lon<150);
  return[
    {id:"uber",  name:"Uber",   icon:"🚗", color:"#000000", grad:"linear-gradient(135deg,#1a1a1a,#333)",  available:true,  url:`https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[formatted_address]=${d}`, desc:"Ride-hailing"},
    {id:"grab",  name:"Grab",   icon:"🟢", color:"#00B14F", grad:"linear-gradient(135deg,#00B14F,#00913F)",available:isAsia,url:`https://grab.onelink.me/2695613898?af_dp=grab%3A%2F%2Fopen%3FscreenType%3DTRANSPORT&af_force_deeplink=true`,desc:"Best in SE Asia"},
    {id:"cabify",name:"Cabify", icon:"🟣", color:"#7C3AED", grad:"linear-gradient(135deg,#7C3AED,#6D28D9)",available:true, url:`https://cabify.com/`,desc:"Spain & LatAm"},
    {id:"metro", name:"Metro",  icon:"🚇", color:P.sub,  grad:GOLD_GRAD2, available:true, url:`https://www.google.com/maps/dir/?api=1&destination=${d}&travelmode=transit`,desc:"Public transit"},
    {id:"bike",  name:"Bike",   icon:"🚲", color:P.gold, grad:GOLD_GRAD,available:true, url:`https://www.google.com/maps/dir/?api=1&destination=${d}&travelmode=bicycling`,desc:"Cycling"},
  ];
}

/* ── Affiliate partner links ────────────────────────────────────────────────── */
const AFFILIATE_LINKS=[
  {name:"Booking.com",icon:"🏨",color:"#003580",grad:"linear-gradient(135deg,#003580,#0057B8)",desc:"Hotels & Stays",url:"https://www.booking.com/affiliate-program/v2/index.html",cta:"Earn ~€50/booking"},
  {name:"Skyscanner", icon:"✈️",color:"#0770E3",grad:"linear-gradient(135deg,#0770E3,#0557B0)",desc:"Flights",        url:"https://www.partners.skyscanner.net/",cta:"CPA per flight"},
  {name:"GetYourGuide",icon:"🎟️",color:"#FF5533",grad:"linear-gradient(135deg,#FF5533,#CC3311)",desc:"Tours & Activities",url:"https://partner.getyourguide.com/",cta:"8% commission"},
  {name:"Rentalcars",icon:"🚗",color:"#FF6600",grad:"linear-gradient(135deg,#FF6600,#CC5200)",desc:"Car rental",    url:"https://www.rentalcars.com/en/partners/",cta:"Up to 6% CPA"},
];

/* ── Leaflet ────────────────────────────────────────────────────────────────── */
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
      const isA=active===i,isH=p.type==="hotel",isR=p.type==="restaurant",isV=p.type==="veg";
      const col=P.gold;
      const em=isH?"🏨":isR?"🍽️":isV?"🌿":"◆";
      const sz=isA?44:34;
      const html=`<div style="width:${sz}px;height:${sz}px;background:${isA?col:"#2C2C2E"};border:2.5px solid ${col};border-radius:${isH?"12px":"50%"};display:flex;align-items:center;justify-content:center;font-size:${isA?18:13}px;box-shadow:${isA?`0 4px 16px ${col}99`:"0 2px 8px rgba(0,0,0,.4)"};cursor:pointer;transition:all .2s">${isA?em:i+1}</div>`;
      const icon=L.divIcon({className:"",html,iconSize:[sz,sz],iconAnchor:[sz/2,sz/2]});
      const mk=L.marker([p.lat,p.lng],{icon}).addTo(map)
        .bindPopup(`<div style="font-family:-apple-system,sans-serif;min-width:150px"><b style="font-size:13px">${em} ${p.name}</b>${p.desc?`<p style="font-size:11px;color:#555;margin:4px 0 0;line-height:1.4">${p.desc}</p>`:""}</div>`,{className:"ios-pop"})
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
      <style>{`.ios-pop .leaflet-popup-content-wrapper{background:#1C1C1E!important;border:1px solid #3A3A3C!important;border-radius:14px!important;box-shadow:0 8px 32px rgba(0,0,0,.5)!important}.ios-pop .leaflet-popup-tip{background:#1C1C1E!important}.leaflet-popup-close-button{color:#666!important}.leaflet-control-zoom{border:none!important;border-radius:12px!important;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.4)!important}.leaflet-control-zoom a{background:#1C1C1E!important;color:#fff!important;border:none!important}.leaflet-control-zoom a:hover{background:#2C2C2E!important}`}</style>
    </div>
  );
}

/* ── Micro components ──────────────────────────────────────────────────────── */
function Spin({size=22,color}){return<div style={{width:size,height:size,border:`2.5px solid rgba(255,255,255,.1)`,borderTop:`2.5px solid ${color||iOS.blue}`,borderRadius:"50%",animation:"spin .7s linear infinite",flexShrink:0}}/>;}
const Stars=({n=4,sz=11})=><span>{[1,2,3,4,5].map(i=><span key={i} style={{color:i<=n?P.gold:P.border2,fontSize:sz}}>★</span>)}</span>;
const Dot=({color})=><span style={{width:7,height:7,background:color||iOS.green,borderRadius:"50%",animation:"pulse 1.6s ease infinite",boxShadow:`0 0 6px ${color||iOS.green}`,display:"inline-block"}}/>;

function IBtn({children,onClick,disabled,grad,color,size="md",outline,full,white,style:extraStyle}){
  const[hov,setHov]=useState(false);
  const g=grad||GOLD_GRAD;
  const pad=size==="sm"?"8px 16px":size==="lg"?"16px 28px":"11px 22px";
  const fz=size==="sm"?12:size==="lg"?16:14;
  let bg,col,border,shadow;
  if(white){bg=hov?"rgba(255,255,255,.9)":"rgba(255,255,255,.95)";col=color||iOS.blue;border="none";shadow=hov?"0 6px 20px rgba(0,0,0,.3)":"0 2px 8px rgba(0,0,0,.2)";}
  else if(outline){bg=hov?(color||iOS.blue)+"18":"transparent";col=color||iOS.blue;border=`1.5px solid ${color||iOS.blue}`;shadow="none";}
  else{bg=g;col="#fff";border="none";shadow=hov?`0 8px 24px rgba(0,0,0,.4)`:`0 3px 12px rgba(0,0,0,.3)`;}
  return(
    <button onClick={onClick} disabled={disabled} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{background:bg,color:col,border,borderRadius:14,padding:pad,fontSize:fz,fontWeight:700,cursor:disabled?"not-allowed":"pointer",fontFamily:"-apple-system,sans-serif",letterSpacing:"-.01em",display:"inline-flex",alignItems:"center",justifyContent:"center",gap:7,opacity:disabled?.4:1,transition:"all .2s cubic-bezier(.16,1,.3,1)",boxShadow:shadow,width:full?"100%":undefined,transform:hov&&!disabled?"translateY(-2px)":"none",...extraStyle}}>
      {children}
    </button>
  );
}

function SectionHdr({icon,title,sub,color,right}){
  const c=color||iOS.blue;
  return(
    <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:18,gap:10,flexWrap:"wrap"}}>
      <div style={{display:"flex",alignItems:"center",gap:12}}>
        <div style={{width:40,height:40,background:P.card3,border:`1px solid ${P.border2}`,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{icon}</div>
        <div>
          <div style={{fontSize:18,fontWeight:700,letterSpacing:"-.02em",color:P.white}}>{title}</div>
          {sub&&<div style={{fontSize:12,color:"rgba(235,235,245,.45)",marginTop:2}}>{sub}</div>}
        </div>
      </div>
      {right}
    </div>
  );
}

/* ── Language Selector ─────────────────────────────────────────────────────── */
function LangSelector({lang,setLang}){
  const[open,setOpen]=useState(false);
  const cur=T[lang];
  return(
    <div style={{position:"relative"}}>
      <button onClick={()=>setOpen(!open)} style={{background:"#2C2C2E",border:"0.5px solid #3A3A3C",borderRadius:10,padding:"6px 12px",display:"flex",alignItems:"center",gap:6,cursor:"pointer",color:"#fff",fontSize:13,fontWeight:600,fontFamily:"-apple-system,sans-serif"}}>
        <span style={{fontSize:16}}>{cur.flag}</span><span>{lang.toUpperCase()}</span>
        <span style={{fontSize:9,color:iOS.fill,transform:open?"rotate(180deg)":"none",transition:".2s"}}>▾</span>
      </button>
      {open&&(
        <div style={{position:"absolute",right:0,top:"calc(100% + 6px)",background:"#1C1C1E",border:"0.5px solid #3A3A3C",borderRadius:14,overflow:"hidden",zIndex:999,boxShadow:"0 12px 40px rgba(0,0,0,.7)",minWidth:150}}>
          {Object.values(T).map(l=>(
            <button key={l.flag} onClick={()=>{setLang(Object.keys(T).find(k=>T[k]===l));setOpen(false);}}
              style={{width:"100%",background:T[lang]===l?"#2C2C2E":"transparent",border:"none",padding:"11px 16px",display:"flex",alignItems:"center",gap:10,cursor:"pointer",color:T[lang]===l?iOS.blue:"#fff",fontSize:14,fontFamily:"-apple-system,sans-serif",fontWeight:T[lang]===l?700:400,textAlign:"left"}}
              onMouseEnter={e=>e.currentTarget.style.background="#2C2C2E"}
              onMouseLeave={e=>e.currentTarget.style.background=T[lang]===l?"#2C2C2E":"transparent"}>
              <span style={{fontSize:20}}>{l.flag}</span><span>{l.name}</span>
              {T[lang]===l&&<span style={{marginLeft:"auto",color:iOS.blue,fontSize:12}}>✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Onboarding: Trip Type Step ─────────────────────────────────────────────── */
function TripTypeStep({t,value,onChange}){
  // value is now an array, onChange toggles
  const keys=Object.keys(TRIP_TYPES);
  return(
    <div className="fade">
      <div style={{fontSize:22,fontWeight:800,color:P.white,marginBottom:4,letterSpacing:"-.03em"}}>{t.stepTripType}</div>
      <p style={{fontSize:13,color:P.muted,marginBottom:20,lineHeight:1.5}}>{t.stepTripTypeSub||"Elige uno o varios"}</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}} className="trip-grid">
        {keys.map(k=>{
          const tt=TRIP_TYPES[k];
          const sel=value.includes(k);
          return(
            <button key={k} onClick={()=>onChange(k)}
              style={{background:sel?P.goldDim:P.card,border:`1.5px solid ${sel?P.goldBorder:P.border}`,borderRadius:16,padding:"16px 10px",cursor:"pointer",textAlign:"center",transition:"all .22s cubic-bezier(.16,1,.3,1)",boxShadow:sel?`0 4px 18px rgba(0,0,0,.4)`:"none",transform:sel?"translateY(-2px)":"none",position:"relative"}}>
              {sel&&<div style={{position:"absolute",top:8,right:8,width:18,height:18,background:P.gold,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:P.black,fontWeight:900,lineHeight:1}}>✓</div>}
              <div style={{fontSize:26,marginBottom:8}}>{tt.icon}</div>
              <div style={{fontSize:12,fontWeight:700,color:sel?P.gold:P.white,lineHeight:1.2}}>{t.tripTypes[k]}</div>
            </button>
          );
        })}
      </div>
      {value.length>0&&(
        <div style={{marginTop:14,display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
          <span style={{fontSize:11,color:P.muted}}>{t.selectedLabel||"Seleccionado:"}</span>
          {value.map(k=>(
            <span key={k} style={{background:P.goldDim,color:P.gold,border:`1px solid ${P.goldBorder}`,borderRadius:20,padding:"3px 10px",fontSize:11,fontWeight:600,display:"inline-flex",alignItems:"center",gap:4}}>
              {TRIP_TYPES[k].icon} {t.tripTypes[k]}
              <span onClick={e=>{e.stopPropagation();onChange(k);}} style={{marginLeft:2,cursor:"pointer",color:P.muted,fontWeight:900,fontSize:12,lineHeight:1}}>×</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Onboarding: Traveler Style Step ────────────────────────────────────────── */
function TravelerStyleStep({t,value,onChange}){
  const keys=Object.keys(TRAVELER_STYLES);
  const styleData={
    backpacker:{perks:["Hostels & alojamientos 1★","Street food & mercados locales","Transporte público","Máxima cultura, mínimo presupuesto"]},
    comfort:{perks:["Hoteles 2-3 estrellas","Restaurantes seleccionados","Vuelos directos","Equilibrio calidad-precio"]},
    luxury:{perks:["Hoteles 4-5★ & boutique","Restaurantes gastronómicos","Business class","Transfers privados & VIP"]},
  };
  return(
    <div className="fade">
      <div style={{fontSize:22,fontWeight:900,color:"#fff",marginBottom:6,letterSpacing:"-.03em"}}>{t.stepTravelerStyle}</div>
      <p style={{fontSize:14,color:iOS.fill,marginBottom:20}}>{t.stepDetails}</p>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {keys.map(k=>{
          const ts=TRAVELER_STYLES[k];
          const sel=value===k;
          return(
            <button key={k} onClick={()=>onChange(k)}
              style={{background:sel?P.goldDim:P.card,border:`1px solid ${sel?P.goldBorder:P.border}`,borderRadius:18,padding:"16px 18px",cursor:"pointer",textAlign:"left",transition:"all .25s cubic-bezier(.16,1,.3,1)",boxShadow:sel?`0 4px 20px rgba(0,0,0,.5)`:"none",display:"flex",alignItems:"center",gap:14}}>
              <div style={{width:44,height:44,background:sel?P.goldDim:P.card3,border:`1px solid ${sel?P.goldBorder:P.border}`,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0,transition:"all .2s"}}>{ts.icon}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:15,fontWeight:700,color:sel?P.gold:P.white,marginBottom:3}}>{t.travelerStyles[k]}</div>
                <div style={{fontSize:12,color:iOS.fill,lineHeight:1.4,marginBottom:sel?8:0}}>{t.travelerDescs[k]}</div>
                {sel&&<div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:6}}>{styleData[k].perks.map((p,i)=><span key={i} style={{background:P.goldDim,color:P.gold,border:`1px solid ${P.goldBorder}`,borderRadius:5,padding:"2px 8px",fontSize:10,fontWeight:500}}>✓ {p}</span>)}</div>}
              </div>
              {sel&&<span style={{color:ts.col,fontSize:22,fontWeight:900}}>✓</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Flight Card ────────────────────────────────────────────────────────────── */
function FlightCard({flight,selected,onSelect,t}){
  const[hov,setHov]=useState(false);
  return(
    <div onClick={onSelect} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} className="hov"
      style={{background:selected?P.goldDim:"#1C1C1E",border:`1px solid ${selected?P.goldBorder:hov?P.border2:P.border}`,borderRadius:22,padding:"20px 22px",marginBottom:12,cursor:"pointer",transition:"all .2s",boxShadow:selected?`0 0 0 2px ${P.goldBorder},0 8px 24px rgba(0,0,0,.4)`:"0 2px 12px rgba(0,0,0,.3)"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <div style={{width:46,height:46,background:selected?P.goldDim:P.card3,border:`1px solid ${selected?P.goldBorder:P.border}`,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,transition:"all .25s"}}>✈️</div>
          <div>
            <div style={{fontSize:16,fontWeight:700,color:"#fff",marginBottom:3}}>{flight.airline}</div>
            <div style={{fontSize:13,color:iOS.fill,marginBottom:4}}>{flight.departure} → {flight.arrival} · {flight.duration}</div>
            <span style={{background:flight.stops===0?iOS.green+"22":iOS.orange+"22",color:flight.stops===0?iOS.green:iOS.orange,borderRadius:8,padding:"3px 10px",fontSize:11,fontWeight:700}}>
              {flight.stops===0?(t?.direct||"✈ Direct"):(t?.stops?.(flight.stops)||`${flight.stops} stop${flight.stops>1?"s":""}`)}
            </span>
          </div>
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{fontSize:26,fontWeight:700,color:selected?P.gold:P.white,letterSpacing:"-.03em"}}>{flight.price}€</div>
          <div style={{fontSize:11,color:iOS.fill}}>{t?.perPerson||"per person"}</div>
          {selected&&<div style={{marginTop:5,background:P.goldDim,color:P.gold,border:`1px solid ${P.goldBorder}`,borderRadius:6,padding:"3px 10px",fontSize:10,fontWeight:600,display:"inline-block"}}>{t?.selBadge||"Selected ✓"}</div>}
        </div>
      </div>
    </div>
  );
}

/* ── Hotel Card ─────────────────────────────────────────────────────────────── */
function HotelCard({hotel,selected,onSelect,nights,onMap,t,travelerStyle}){
  const[hov,setHov]=useState(false);
  const ts=TRAVELER_STYLES[travelerStyle||"comfort"];
  return(
    <div onClick={onSelect} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} className="hov"
      style={{background:selected?P.goldDim:"#1C1C1E",border:`1px solid ${selected?P.goldBorder:hov?P.border2:P.border}`,borderRadius:22,overflow:"hidden",marginBottom:12,cursor:"pointer",transition:"all .2s",boxShadow:selected?`0 0 0 2px ${P.goldBorder},0 8px 24px rgba(0,0,0,.4)`:"0 2px 12px rgba(0,0,0,.3)"}}>
      <div style={{display:"flex",height:130}}>
        <div style={{width:130,flexShrink:0,position:"relative",overflow:"hidden"}}>
          <img src={HOTEL_IMGS[(hotel._imgIdx||0)%HOTEL_IMGS.length]} alt={hotel.name} style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform .3s",transform:hov?"scale(1.06)":"scale(1)"}} onError={e=>e.target.style.display="none"}/>
          {selected&&<div style={{position:"absolute",top:8,right:8,width:22,height:22,background:P.goldDim,border:`1px solid ${P.goldBorder}`,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:P.gold,fontWeight:700}}>✓</div>}
          {travelerStyle&&<div style={{position:"absolute",bottom:6,left:6,background:P.goldDim,borderRadius:5,padding:"2px 6px",fontSize:9,fontWeight:600,color:P.gold}}>{ts.icon}</div>}
        </div>
        <div style={{flex:1,padding:"14px 16px",display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8,marginBottom:4}}>
              <div style={{fontSize:15,fontWeight:700,color:"#fff",lineHeight:1.2}}>{hotel.name}</div>
              <div style={{textAlign:"right",flexShrink:0}}>
                <div style={{fontSize:20,fontWeight:700,color:selected?P.gold:P.white,letterSpacing:"-.02em"}}>{hotel.price_per_night}€</div>
                <div style={{fontSize:10,color:P.muted}}>{t?.perNight||"/ night"}</div>
              </div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:5}}>
              <Stars n={hotel.stars||4} sz={10}/><span style={{fontSize:11,color:iOS.fill}}>📍 {hotel.neighborhood}</span>
            </div>
            <p style={{fontSize:12,color:iOS.fill,margin:0,lineHeight:1.45,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{hotel.description}</p>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:6}}>
            <div style={{display:"flex",gap:5}}>
              {hotel.highlights?.slice(0,2).map((h,i)=><span key={i} style={{background:P.card3,color:P.muted,borderRadius:5,padding:"2px 7px",fontSize:9}}>· {h}</span>)}
            </div>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              {onMap&&<button onClick={e=>{e.stopPropagation();onMap();}} style={{background:"none",border:`1px solid ${iOS.sep2}`,color:iOS.fill,borderRadius:8,padding:"3px 9px",fontSize:10,cursor:"pointer"}}>{t?.mapBtn||"🗺 Map"}</button>}
              {nights&&<span style={{fontSize:12,color:selected?P.gold:P.muted,fontWeight:600}}>{t?.totalNights?.(nights,hotel.price_per_night)||`${hotel.price_per_night*nights}€`}</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Restaurant Card ────────────────────────────────────────────────────────── */
function RestCard({rest,idx,vegMode,t}){
  const[hov,setHov]=useState(false);
  const imgs=vegMode?VEG_IMGS:REST_IMGS;
  const isVegan=vegMode&&rest.diet==="vegan";
  const accentCol=vegMode?P.gold:P.gold;
  const accentGrad=GOLD_GRAD;
  return(
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} className="hov"
      style={{background:"#1C1C1E",border:`1.5px solid ${hov?accentCol+"66":"#2C2C2E"}`,borderRadius:20,overflow:"hidden",flex:"1 1 190px",minWidth:0,transition:"all .25s cubic-bezier(.16,1,.3,1)",boxShadow:hov?`0 12px 36px rgba(0,0,0,.5),0 0 0 1px ${accentCol}22`:"0 2px 10px rgba(0,0,0,.25)"}}>
      <div style={{height:120,overflow:"hidden",position:"relative"}}>
        <img src={imgs[idx%imgs.length]} alt={rest.name} style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform .35s",transform:hov?"scale(1.08)":"scale(1)"}} onError={e=>e.target.style.display="none"}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.7),transparent)"}}/>
        {rest.price_range&&<div style={{position:"absolute",top:8,right:8,background:"rgba(0,0,0,.65)",backdropFilter:"blur(8px)",color:"#fff",borderRadius:8,padding:"2px 8px",fontSize:10,fontWeight:700}}>{rest.price_range}</div>}
        {vegMode&&rest.diet&&(
          <div style={{position:"absolute",top:8,left:8,background:accentGrad,color:"#fff",borderRadius:8,padding:"3px 9px",fontSize:10,fontWeight:800,boxShadow:`0 3px 10px ${accentCol}66`}}>
            {isVegan?(t?.veganBadge||"Vegan")+" 🌱":(t?.vegBadge||"Vegetarian")+" 🥦"}
          </div>
        )}
      </div>
      <div style={{padding:"13px 14px"}}>
        <div style={{fontSize:13,fontWeight:700,color:"#fff",marginBottom:3,lineHeight:1.2}}>{rest.name}</div>
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
          <Stars n={rest.rating||4}/><span style={{fontSize:10,color:P.muted}}>{rest.cuisine}</span>
        </div>
        {vegMode&&rest.signature_dish&&<div style={{fontSize:10,color:accentCol,fontWeight:600,marginBottom:5}}>⭐ {rest.signature_dish}</div>}
        <p style={{fontSize:11,color:iOS.fill,margin:0,lineHeight:1.5,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{rest.description}</p>
      </div>
    </div>
  );
}

/* ── Weather Section ────────────────────────────────────────────────────────── */
function WeatherSection({weather,startDate,t,locale}){
  if(!weather?.temperature_2m_max?.length)return null;
  const days=weather.temperature_2m_max.slice(0,7);
  return(
    <div style={{marginBottom:32}} className="pop4">
      <SectionHdr icon="🌤" title={t.weatherT} sub={t.weatherSub} color={iOS.cyan}/>
      <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:4}}>
        {days.map((maxT,i)=>{
          const d=new Date(startDate+"T12:00:00");d.setDate(d.getDate()+i);
          const code=weather.weathercode[i];
          const minT=weather.temperature_2m_min[i];
          const rain=weather.precipitation_probability_max[i];
          const wind=weather.windspeed_10m_max[i];
          const isRainy=rain>50;
          return(
            <div key={i} style={{background:P.card,border:`1px solid ${P.border}`,borderRadius:12,padding:"14px 12px",minWidth:80,textAlign:"center",flexShrink:0}}>
              <div style={{fontSize:10,color:P.muted,marginBottom:6,fontWeight:600}}>
                {d.toLocaleDateString(locale||"es-ES",{weekday:"short"})}
              </div>
              <div style={{fontSize:28,marginBottom:6}}>{wxIcon(code)}</div>
              <div style={{fontSize:14,fontWeight:700,color:P.white}}>{Math.round(maxT)}°</div>
              <div style={{fontSize:11,color:iOS.fill,marginBottom:6}}>{Math.round(minT)}°</div>
              <div style={{fontSize:10,color:isRainy?P.gold:P.muted}}>💧{rain}%</div>
              {wind>30&&<div style={{fontSize:10,color:P.sub,marginTop:3}}>💨{Math.round(wind)}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Transport Section ──────────────────────────────────────────────────────── */
function TransportSection({dest,lat,lon,t}){
  const links=getTransportLinks(dest,lat,lon);
  return(
    <div style={{marginBottom:32}} className="pop5">
      <SectionHdr icon="🚗" title={t.transportT} sub={t.transportSub} color={iOS.indigo}/>
      <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
        {links.map(lk=>(
          <a key={lk.id} href={lk.url} target="_blank" rel="noopener noreferrer"
            style={{background:"#1C1C1E",border:`1.5px solid ${lk.available?"#2C2C2E":"#1C1C1E"}`,borderRadius:16,padding:"14px 16px",textDecoration:"none",display:"flex",alignItems:"center",gap:12,flex:"1 1 140px",opacity:lk.available?1:.4,transition:"all .2s",boxShadow:"0 2px 10px rgba(0,0,0,.2)"}}
            onMouseEnter={e=>{if(lk.available){e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.borderColor=P.goldBorder;e.currentTarget.style.boxShadow=`0 8px 24px rgba(0,0,0,.4)`;}}}
            onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.borderColor="#2C2C2E";e.currentTarget.style.boxShadow="0 2px 10px rgba(0,0,0,.2)";}}>
            <div style={{width:34,height:34,background:P.card3,border:`1px solid ${P.border2}`,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{lk.icon}</div>
            <div>
              <div style={{fontSize:14,fontWeight:700,color:"#fff"}}>{lk.name}</div>
              <div style={{fontSize:11,color:iOS.fill}}>{lk.desc}</div>
            </div>
            <span style={{marginLeft:"auto",color:iOS.fill,fontSize:14}}>↗</span>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ── Promotions Section ─────────────────────────────────────────────────────── */
function PromoSection({promos,t}){
  if(!promos?.length)return null;
  const cols=[P.gold,P.gold,P.gold,P.gold,P.gold];
  return(
    <div style={{marginBottom:32}} className="pop">
      <SectionHdr icon="🎟️" title={t.promoT} sub={t.promoSub} color={iOS.pink}/>
      <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
        {promos.map((p,i)=>(
          <div key={i} style={{background:P.card,border:`1px solid ${P.border}`,borderRadius:18,padding:"16px 18px",flex:"1 1 200px",minWidth:0}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
              <div style={{fontSize:22}}>{p.icon||"🎫"}</div>
              <div style={{background:P.goldDim,color:P.gold,border:`1px solid ${P.goldBorder}`,borderRadius:5,padding:"3px 10px",fontSize:11,fontWeight:700}}>-{p.discount}%</div>
            </div>
            <div style={{fontSize:13,fontWeight:600,color:P.white,marginBottom:4}}>{p.title}</div>
            <div style={{fontSize:12,color:P.muted,lineHeight:1.5,marginBottom:8}}>{p.description}</div>
            {p.code&&<div style={{background:"#2C2C2E",borderRadius:8,padding:"5px 10px",display:"inline-flex",alignItems:"center",gap:6}}>
              <span style={{fontSize:10,color:P.muted}}>{t.promoCode}:</span>
              <span style={{fontSize:12,fontWeight:700,color:P.gold,fontFamily:"monospace"}}>{p.code}</span>
            </div>}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Retreat Section ────────────────────────────────────────────────────────── */
const RETREAT_TYPE_META={
  yoga:      {icon:"🧘",color:"#8B7CF8"},
  meditation:{icon:"🌸",color:"#C9A96E"},
  ayahuasca: {icon:"🌀",color:"#7ECBA1"},
  breathwork:{icon:"💨",color:"#64B8E8"},
  sound:     {icon:"🎵",color:"#F4A261"},
  digital:   {icon:"📵",color:"#A0A0A0"},
  shamanic:  {icon:"🪶",color:"#D4956A"},
  silent:    {icon:"🤫",color:"#9DB4C0"},
};
const LEVEL_COLOR={beginner:P.gold,intermediate:"#7ECBA1",advanced:"#E05A4E"};

function RetreatCard({retreat,t}){
  const[open,setOpen]=useState(false);
  const meta=RETREAT_TYPE_META[retreat.type]||{icon:"🌿",color:P.gold};
  return(
    <div style={{background:P.card,border:`1px solid ${P.border}`,borderRadius:20,overflow:"hidden",transition:"all .25s cubic-bezier(.16,1,.3,1)",boxShadow:open?"0 8px 32px rgba(0,0,0,.5)":"0 2px 10px rgba(0,0,0,.3)"}}>
      {/* Header */}
      <button onClick={()=>setOpen(!open)} style={{width:"100%",background:"none",border:"none",cursor:"pointer",padding:"18px 20px",display:"flex",gap:14,alignItems:"flex-start",textAlign:"left"}}>
        {/* Type icon */}
        <div style={{width:48,height:48,background:`${meta.color}22`,border:`1px solid ${meta.color}44`,borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>
          {meta.icon}
        </div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:4}}>
            <span style={{fontSize:15,fontWeight:700,color:P.white}}>{retreat.name}</span>
            <span style={{background:P.goldDim,color:P.gold,border:`1px solid ${P.goldBorder}`,borderRadius:5,padding:"2px 8px",fontSize:9,fontWeight:700,letterSpacing:".05em",textTransform:"uppercase"}}>{t.retreatBadge||"Retiro verificado"}</span>
          </div>
          <div style={{fontSize:11,color:P.muted,marginBottom:8}}>{retreat.center}</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {/* type badge */}
            <span style={{background:`${meta.color}18`,color:meta.color,border:`1px solid ${meta.color}44`,borderRadius:20,padding:"3px 10px",fontSize:10,fontWeight:600}}>
              {meta.icon} {t.retreatTypes?.[retreat.type]||retreat.type}
            </span>
            {/* duration */}
            <span style={{background:P.card3,color:P.sub,border:`1px solid ${P.border}`,borderRadius:20,padding:"3px 10px",fontSize:10}}>
              📅 {retreat.duration_days}d
            </span>
            {/* level */}
            <span style={{background:`${LEVEL_COLOR[retreat.level]||P.gold}18`,color:LEVEL_COLOR[retreat.level]||P.gold,border:`1px solid ${LEVEL_COLOR[retreat.level]||P.gold}44`,borderRadius:20,padding:"3px 10px",fontSize:10,fontWeight:600}}>
              {retreat.level==="beginner"?"🌱":retreat.level==="advanced"?"🔥":"⚡"} {retreat.level}
            </span>
          </div>
        </div>
        {/* Price + chevron */}
        <div style={{textAlign:"right",flexShrink:0}}>
          <div style={{fontSize:20,fontWeight:700,color:P.gold,letterSpacing:"-.03em"}}>{retreat.price_total}€</div>
          <div style={{fontSize:10,color:P.muted,marginBottom:8}}>{t.retreatPrice||"precio total"}</div>
          <span style={{color:P.muted,fontSize:16,display:"block",transition:".2s",transform:open?"rotate(90deg)":"none"}}>›</span>
        </div>
      </button>

      {/* Expanded body */}
      {open&&(
        <div style={{padding:"0 20px 20px",animation:"up .3s cubic-bezier(.16,1,.3,1) both"}} className="fade">
          <div style={{height:"0.5px",background:P.border,marginBottom:16}}/>
          {/* Description */}
          <p style={{fontSize:13,color:P.sub,lineHeight:1.65,margin:"0 0 16px"}}>{retreat.description}</p>
          {/* Facilitator */}
          {retreat.facilitator&&(
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
              <div style={{width:30,height:30,background:P.goldDim,border:`1px solid ${P.goldBorder}`,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>🧑‍🏫</div>
              <div>
                <div style={{fontSize:10,color:P.muted,textTransform:"uppercase",letterSpacing:".05em"}}>Facilitador</div>
                <div style={{fontSize:13,fontWeight:600,color:P.white}}>{retreat.facilitator}</div>
              </div>
            </div>
          )}
          {/* Highlights */}
          {retreat.highlights?.length>0&&(
            <div style={{marginBottom:14}}>
              <div style={{fontSize:10,fontWeight:700,color:P.muted,textTransform:"uppercase",letterSpacing:".08em",marginBottom:8}}>Highlights</div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                {retreat.highlights.map((h,i)=>(
                  <span key={i} style={{background:P.card3,color:P.sub,border:`1px solid ${P.border}`,borderRadius:6,padding:"4px 10px",fontSize:11}}>✦ {h}</span>
                ))}
              </div>
            </div>
          )}
          {/* Includes */}
          {retreat.includes?.length>0&&(
            <div style={{background:P.goldDim,border:`1px solid ${P.goldBorder}`,borderRadius:12,padding:"12px 14px",marginBottom:14}}>
              <div style={{fontSize:10,fontWeight:700,color:P.gold,textTransform:"uppercase",letterSpacing:".08em",marginBottom:8}}>Incluido</div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                {retreat.includes.map((inc,i)=>(
                  <span key={i} style={{background:"rgba(201,169,110,.12)",color:P.gold,borderRadius:5,padding:"3px 8px",fontSize:10,fontWeight:500}}>✓ {inc}</span>
                ))}
              </div>
            </div>
          )}
          {/* Footer row */}
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
            {retreat.spots_left&&(
              <span style={{fontSize:12,color:"#E05A4E",fontWeight:600}}>🔴 Solo {retreat.spots_left} {t.retreatSpots||"plazas"}</span>
            )}
            <button style={{background:GOLD_GRAD,color:P.black,border:"none",borderRadius:12,padding:"10px 20px",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"-apple-system,sans-serif",marginLeft:"auto"}}>
              {t.retreatBook||"Solicitar plaza →"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function RetreatSection({retreats,t,isRetreatTrip}){
  if(!retreats?.length)return null;
  return(
    <div style={{marginBottom:32}} className="pop">
      <SectionHdr
        icon="🌀"
        title={t.retreatT||"Retiros espirituales"}
        sub={t.retreatSub||"Centros de yoga, meditación y medicina ancestral"}
        color="#8B7CF8"
        right={isRetreatTrip&&(
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {["🧘 Yoga","🌀 Meditación","🪶 Ayahuasca"].map(b=>(
              <span key={b} style={{background:P.goldDim,color:P.gold,border:`1px solid ${P.goldBorder}`,borderRadius:20,padding:"3px 12px",fontSize:10,fontWeight:600}}>{b}</span>
            ))}
          </div>
        )}
      />
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {retreats.map((r,i)=><RetreatCard key={i} retreat={r} t={t}/>)}
      </div>
    </div>
  );
}

/* ── Promo Section ───────────────────────────────────────────────────────────── */
function AffiliatePanel({t}){
  const[open,setOpen]=useState(false);
  return(
    <div style={{background:P.card,borderRadius:14,padding:"18px",marginTop:14,border:`1px solid ${P.border}`}}>
      <button onClick={()=>setOpen(!open)} style={{width:"100%",background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:10,color:"#fff",fontFamily:"-apple-system,sans-serif"}}>
        <div style={{width:28,height:28,background:P.goldDim,border:`1px solid ${P.goldBorder}`,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,boxShadow:`0 3px 10px ${iOS.yellow}44`}}>💰</div>
        <div style={{flex:1,textAlign:"left"}}>
          <div style={{fontSize:13,fontWeight:600,color:P.white}}>{t.affiliateT}</div>
          <div style={{fontSize:11,color:iOS.fill}}>{t.affiliateSub}</div>
        </div>
        <span style={{color:iOS.fill,fontSize:16,transform:open?"rotate(180deg)":"none",transition:".2s"}}>▾</span>
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
                <div style={{fontSize:11,color:iOS.fill}}>{al.desc}</div>
              </div>
              <span style={{fontSize:10,fontWeight:600,color:P.gold,background:P.goldDim,border:`1px solid ${P.goldBorder}`,borderRadius:5,padding:"3px 8px"}}>{al.cta}</span>
            </a>
          ))}
          <p style={{fontSize:10,color:P.muted,margin:0,textAlign:"center",lineHeight:1.5}}>💡 Regístrate gratis en estas plataformas. Cuando un usuario reserva a través de tu link, recibes comisión directa.</p>
        </div>
      )}
    </div>
  );
}

/* ── Package Summary ────────────────────────────────────────────────────────── */
function PkgSummary({flight,hotel,nights,travelers,t,fmtPrice:fmt}){  const fP=fmt||(x=>`${x}€`);
  if(!flight&&!hotel)return null;
  const fT=flight?flight.price*(travelers||1):0;
  const hT=hotel?hotel.price_per_night*(nights||5):0;
  const tax=Math.round((fT+hT)*.10);
  const total=fT+hT+tax;
  return(
    <div style={{background:"linear-gradient(145deg,#1E1E20,#181818)",borderRadius:24,padding:22,boxShadow:"0 12px 40px rgba(0,0,0,.5),0 1px 0 rgba(255,255,255,.06) inset",position:"sticky",top:72,border:"0.5px solid rgba(255,255,255,.07)"}}>
      <div style={{fontSize:15,fontWeight:900,marginBottom:16,color:"#fff"}}>{t.pkgT}</div>
      {flight&&<SRow icon="✈️" label={`${flight.airline} × ${travelers||1}`} val={fP(fT)}/>}
      {hotel&&nights&&<SRow icon="🏨" label={`${hotel.name} × ${nights}n`} val={fP(hT)}/>}
      <div style={{height:"0.5px",background:"rgba(255,255,255,.07)",margin:"12px 0"}}/>
      <SRow icon="🧾" label={t.taxes} val={fP(tax)} muted/>
      <div style={{background:P.goldDim,borderRadius:12,padding:"14px 16px",margin:"14px 0 16px",border:`1px solid ${P.goldBorder}`}}>
        <div style={{fontSize:10,fontWeight:600,color:P.gold,textTransform:"uppercase",letterSpacing:".1em",marginBottom:4,opacity:.7}}>{t.totalL}</div>
        <span style={{fontSize:30,fontWeight:700,color:P.gold,letterSpacing:"-.04em"}}>{fP(total)}</span>
      </div>
      {flight&&hotel&&<div style={{background:P.goldDim,border:`1px solid ${P.goldBorder}`,borderRadius:12,padding:"10px 14px",marginBottom:14,display:"flex",gap:8,alignItems:"center"}}><span style={{fontSize:14}}>🎁</span><span style={{fontSize:11,color:P.gold,fontWeight:500}}>{t.pkgSave}</span></div>}
      <div style={{fontSize:10,color:"#48484A",textAlign:"center"}}>{t.demoSmall}</div>
    </div>
  );
}
function SRow({icon,label,val,muted}){
  return(
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10,fontSize:13}}>
      <span style={{color:muted?iOS.fill:iOS.label2}}>{icon} {label}</span>
      <span style={{fontWeight:700,color:muted?iOS.fill:"#fff"}}>{val}</span>
    </div>
  );
}

/* ── Booking Modal ──────────────────────────────────────────────────────────── */
function BookModal({flight,hotel,nights,travelers,dest,lang,onClose,onDone}){
  const t=T[lang||"es"];
  const[step,setStep]=useState(0);
  const[form,setForm]=useState({name:"",email:"",phone:"",card:"",expiry:"",cvv:""});
  const fT=flight?flight.price*(travelers||1):0;
  const hT=hotel?hotel.price_per_night*(nights||5):0;
  const tax=Math.round((fT+hT)*.10);
  const total=fT+hT+tax;
  const inp=()=>({width:"100%",padding:"13px 16px",border:"1.5px solid #3A3A3C",borderRadius:14,fontSize:15,fontFamily:"-apple-system,sans-serif",color:"#fff",background:"#2C2C2E",boxSizing:"border-box",outline:"none"});
  async function pay(){setStep(3);await sleep(2200);setStep(4);setTimeout(()=>{onDone();},2800);}
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.6)",zIndex:999,display:"flex",alignItems:"flex-end",justifyContent:"center",backdropFilter:"blur(12px)"}} onClick={e=>{if(e.target===e.currentTarget&&step<3)onClose();}}>
      <div className="modal-inner" style={{background:"#1C1C1E",borderRadius:"28px 28px 0 0",width:"100%",maxWidth:520,maxHeight:"92vh",overflow:"auto",boxShadow:"0 -8px 60px rgba(0,0,0,.6)",fontFamily:"-apple-system,sans-serif",border:"0.5px solid rgba(255,255,255,.06)"}}>
        <div style={{display:"flex",justifyContent:"center",padding:"14px 0 6px"}}><div style={{width:40,height:5,background:"#3A3A3C",borderRadius:3}}/></div>
        <div style={{padding:"6px 24px 40px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22}}>
            <div style={{fontSize:20,fontWeight:800,color:"#fff",letterSpacing:"-.02em"}}>{step===4?t.doneT:step===3?t.processing:t.modalT}</div>
            {step<3&&<button onClick={onClose} style={{background:"#2C2C2E",border:"none",borderRadius:"50%",width:30,height:30,cursor:"pointer",fontSize:16,color:iOS.fill,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>}
          </div>
          {step===4&&(
            <div style={{textAlign:"center",padding:"10px 0 20px"}}>
              <div style={{width:80,height:80,background:GOLD_GRAD,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px",fontSize:36,boxShadow:`0 8px 32px ${P.goldGlow}`}}>✓</div>
              <div style={{fontSize:22,fontWeight:900,color:"#fff",marginBottom:8}}>{t.successT(dest)}</div>
              <p style={{color:iOS.fill,fontSize:14,lineHeight:1.7,marginBottom:24}}>{t.successSub}</p>
              {[flight&&{g:GOLD_GRAD,icon:"✈️",lbl:t.flightConf,sub:`${flight.airline} · ${flight.departure}`},hotel&&{g:GOLD_GRAD,icon:"🏨",lbl:t.hotelConf,sub:`${hotel.name} · ${nights}n`}].filter(Boolean).map((r,i)=>(
                <div key={i} style={{background:iOS.card2,borderRadius:16,padding:"14px 18px",display:"flex",gap:14,alignItems:"center",textAlign:"left",marginBottom:10}}>
                  <span style={{fontSize:28}}>{r.icon}</span>
                  <div><div style={{fontSize:11,fontWeight:800,color:iOS.teal,letterSpacing:".06em"}}>{r.lbl}</div><div style={{fontSize:14,color:"#fff",marginTop:2}}>{r.sub}</div></div>
                </div>
              ))}
            </div>
          )}
          {step===3&&(
            <div style={{textAlign:"center",padding:"40px 0"}}>
              <div style={{width:56,height:56,background:P.goldDim,border:`1px solid ${P.goldBorder}`,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px"}}><Spin size={28} color="#fff"/></div>
              <div style={{fontSize:16,fontWeight:700,color:"#fff",marginBottom:6}}>{t.processingT}</div>
              <p style={{fontSize:13,color:iOS.fill}}>{t.processingSub}</p>
            </div>
          )}
          {step===0&&(
            <>
              <div style={{background:iOS.card2,borderRadius:18,padding:"18px 20px",marginBottom:22}}>
                {[flight&&{icon:"✈️",label:`${flight.airline}×${travelers||1}`,val:`${fT}€`},hotel&&{icon:"🏨",label:`${hotel.name}×${nights}n`,val:`${hT}€`},{icon:"🧾",label:t.taxes,val:`${tax}€`}].filter(Boolean).map((r,i)=><SRow key={i} icon={r.icon} label={r.label} val={r.val}/>)}
                <div style={{height:"0.5px",background:"rgba(255,255,255,.07)",margin:"10px 0"}}/>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline"}}>
                  <span style={{fontSize:15,fontWeight:800,color:"#fff"}}>{t.totalL}</span>
                  <span style={{fontSize:26,fontWeight:700,color:P.gold}}>{total}€</span>
                </div>
              </div>
              <IBtn full size="lg" style={{background:GOLD_GRAD,color:P.black,fontWeight:700}} onClick={()=>setStep(1)}>{t.continueBtn}</IBtn>
            </>
          )}
          {step===1&&(
            <>
              <div style={{fontSize:15,fontWeight:700,color:"#fff",marginBottom:14}}>{t.travelerT}</div>
              {[{label:t.nameL,key:"name",ph:t.namePh},{label:t.emailL,key:"email",ph:t.emailPh},{label:t.phoneL,key:"phone",ph:t.phonePh}].map(({label,key,ph})=>(
                <div key={key} style={{marginBottom:14}}>
                  <div style={{fontSize:11,fontWeight:600,color:iOS.fill,marginBottom:6,textTransform:"uppercase",letterSpacing:".05em"}}>{label}</div>
                  <input value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})} placeholder={ph} style={inp()} onFocus={e=>e.target.style.borderColor=P.gold} onBlur={e=>e.target.style.borderColor="#3A3A3C"}/>
                </div>
              ))}
              <div style={{display:"flex",gap:10,marginTop:6}}>
                <IBtn outline color={iOS.fill} onClick={()=>setStep(0)}>{t.backBtn}</IBtn>
                <IBtn full style={{background:GOLD_GRAD,color:P.black,fontWeight:700}} onClick={()=>{window.open("https://www.booking.com/search.html?ss="+encodeURIComponent(dest||"hotel"),"_blank");window.open("https://www.skyscanner.es/vuelos/"+encodeURIComponent(dest||""),"_blank");onDone();}} disabled={!form.name||!form.email}>{t.payBtn}</IBtn>
              </div>
            </>
          )}
          {step===2&&(
            <>
              <div style={{background:`linear-gradient(135deg,${iOS.blue}18,${iOS.teal}08)`,borderRadius:14,padding:"12px 16px",marginBottom:16,display:"flex",gap:8,alignItems:"center"}}>
                <span style={{fontSize:18}}>🔒</span><span style={{fontSize:13,color:iOS.blue,fontWeight:600}}>{t.secureNote}</span>
              </div>
              <div style={{marginBottom:14}}>
                <div style={{fontSize:11,fontWeight:600,color:iOS.fill,marginBottom:6,textTransform:"uppercase",letterSpacing:".05em"}}>{t.cardL}</div>
                <input value={form.card} onChange={e=>setForm({...form,card:e.target.value})} placeholder="1234 5678 9012 3456" style={inp()} onFocus={e=>e.target.style.borderColor=P.gold} onBlur={e=>e.target.style.borderColor="#3A3A3C"}/>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:20}}>
                {[{label:t.expiryL,key:"expiry",ph:"MM/AA"},{label:t.cvvL,key:"cvv",ph:"123"}].map(({label,key,ph})=>(
                  <div key={key}>
                    <div style={{fontSize:11,fontWeight:600,color:iOS.fill,marginBottom:6,textTransform:"uppercase",letterSpacing:".05em"}}>{label}</div>
                    <input value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})} placeholder={ph} style={inp()} onFocus={e=>e.target.style.borderColor=P.gold} onBlur={e=>e.target.style.borderColor="#3A3A3C"}/>
                  </div>
                ))}
              </div>
              <IBtn full size="lg" style={{background:GOLD_GRAD,color:P.black,fontWeight:700}} onClick={pay} disabled={!form.card}>{t.payConfirm(total)}</IBtn>
              <div style={{marginTop:10}}><IBtn full outline color={iOS.fill} onClick={()=>setStep(1)}>{t.backBtn}</IBtn></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Skeleton loaders ───────────────────────────────────────────────────────── */
const Sk=({w="100%",h=14,r=8,mb=0})=>(
  <div style={{width:w,height:h,borderRadius:r,background:`linear-gradient(90deg,${P.card2} 25%,${P.card3} 50%,${P.card2} 75%)`,backgroundSize:"200% 100%",animation:"shimmer 1.4s infinite",marginBottom:mb,flexShrink:0}}/>
);
function SkeletonFlightCard(){
  return(
    <div style={{background:P.card,border:`1px solid ${P.border}`,borderRadius:20,padding:"18px 20px",marginBottom:12}}>
      <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:12}}>
        <Sk w={40} h={40} r={12}/>
        <div style={{flex:1}}><Sk w="55%" h={14} mb={6}/><Sk w="35%" h={11}/></div>
        <Sk w={60} h={28} r={10}/>
      </div>
      <div style={{display:"flex",gap:8}}><Sk w={70} h={22} r={8}/><Sk w={90} h={22} r={8}/></div>
    </div>
  );
}
function SkeletonHotelCard(){
  return(
    <div style={{background:P.card,border:`1px solid ${P.border}`,borderRadius:20,overflow:"hidden",marginBottom:12}}>
      <Sk w="100%" h={160} r={0} mb={0}/>
      <div style={{padding:"16px 18px"}}>
        <Sk w="60%" h={16} mb={8}/><Sk w="80%" h={12} mb={6}/><Sk w="40%" h={12} mb={12}/>
        <div style={{display:"flex",gap:6}}><Sk w={80} h={22} r={8}/><Sk w={100} h={22} r={8}/></div>
      </div>
    </div>
  );
}
function SkeletonRestCard(){
  return(
    <div style={{background:P.card,border:`1px solid ${P.border}`,borderRadius:18,overflow:"hidden",marginBottom:10}}>
      <Sk w="100%" h={120} r={0} mb={0}/>
      <div style={{padding:"12px 14px"}}><Sk w="50%" h={14} mb={6}/><Sk w="70%" h={11}/></div>
    </div>
  );
}

/* ── Day Card (itinerary) ───────────────────────────────────────────────────── */
function DayCard({day,i,t}){
  const[open,setOpen]=useState(i===0);
  const col=P.gold;
  return(
    <div style={{background:"linear-gradient(145deg,#1C1C1E,#181818)",border:`1.5px solid ${open?col+"66":"#2C2C2E"}`,borderRadius:20,marginBottom:10,overflow:"hidden",boxShadow:open?`0 8px 28px ${col}28`:"0 2px 10px rgba(0,0,0,.2)",transition:"all .3s cubic-bezier(.16,1,.3,1)"}}>
      <button onClick={()=>setOpen(!open)} style={{width:"100%",background:"none",border:"none",padding:"17px 20px",cursor:"pointer",display:"flex",alignItems:"center",gap:14}}>
        <div style={{width:36,height:36,background:open?P.goldDim:P.card3,border:`1px solid ${open?P.goldBorder:P.border}`,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,fontWeight:900,color:open?P.gold:P.muted,flexShrink:0,transition:"all .2s"}}>{i+1}</div>
        <div style={{flex:1,textAlign:"left"}}>
          <div style={{fontSize:15,fontWeight:700,color:"#fff",letterSpacing:"-.01em"}}>{day.day.replace(/^(Día|Day|Jour) \d+ [-–] /,"")}</div>
          {day.theme&&<div style={{fontSize:12,color:iOS.fill,marginTop:2}}>{day.theme}</div>}
        </div>
        <span style={{color:iOS.fill,fontSize:20,transform:open?"rotate(90deg)":"none",transition:".2s"}}>›</span>
      </button>
      {open&&(
        <div style={{padding:"2px 18px 18px",borderTop:`0.5px solid rgba(255,255,255,.06)`}}>
          {[{k:"morning",l:t.morning,c:P.gold},{k:"afternoon",l:t.afternoon,c:P.sub},{k:"evening",l:t.evening,c:P.gold},{k:"transport",l:t.transport,c:P.muted}].map(({k,l,c})=>day[k]&&(
            <div key={k} style={{marginTop:14}}>
              <div style={{fontSize:11,fontWeight:700,color:c,textTransform:"uppercase",letterSpacing:".06em",marginBottom:5}}>{l}</div>
              <p style={{margin:0,fontSize:13,color:iOS.label2,lineHeight:1.7}}>{day[k]}</p>
            </div>
          ))}
          {day.budget&&<div style={{marginTop:12,display:"inline-flex",alignItems:"center",gap:6,background:"#2C2C2E",borderRadius:10,padding:"5px 12px"}}><span>💰</span><span style={{fontSize:12,color:iOS.fill,fontWeight:500}}>{day.budget}</span></div>}
        </div>
      )}
    </div>
  );
}

/* ── DateInput ──────────────────────────────────────────────────────────────── */
function DateInput({start,end,onChange,t}){
  const today=new Date().toISOString().split("T")[0];
  const base={background:"#2C2C2E",border:"1.5px solid #3A3A3C",borderRadius:14,color:"#fff",padding:"12px 14px",fontSize:14,fontFamily:"-apple-system,sans-serif",colorScheme:"dark",outline:"none",width:"100%",boxSizing:"border-box",cursor:"pointer",transition:"border-color .18s"};
  return(
    <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
      {[{label:t.arrival,field:"start",min:today,val:start},{label:t.departure,field:"end",min:start||today,val:end}].map(({label,field,min,val})=>(
        <div key={field} style={{flex:1,minWidth:130}}>
          <div style={{fontSize:11,fontWeight:600,color:iOS.fill,letterSpacing:".05em",textTransform:"uppercase",marginBottom:6}}>{label}</div>
          <input type="date" min={min} value={val} onChange={e=>onChange(field,e.target.value)} style={base} onFocus={e=>e.target.style.borderColor=P.gold} onBlur={e=>e.target.style.borderColor="#3A3A3C"}/>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   MAIN APP
══════════════════════════════════════════════════════════════════════════════ */
export default function ViajeIA(){
  /* ── Language ── */
  const[lang,setLang]=useState("es");
  const t=T[lang];
  const locale=t.locale;

  /* ── Onboarding state ── */
  const[onboardStep,setOnboardStep]=useState(0);
  const[tripTypes,setTripTypes]=useState([]);
  const[travelerStyle,setTravelerStyle]=useState(null);
  const toggleTripType=k=>setTripTypes(prev=>prev.includes(k)?prev.filter(x=>x!==k):[...prev,k]);

  /* ── Search state ── */
  const[input,setInput]=useState("");
  const[start,setStart]=useState("");
  const[end,setEnd]=useState("");
  const[travelers,setTravelers]=useState(1);
  const[currency,setCurrency]=useState("EUR");

  /* ── Results ── */
  const[loading,setLoading]=useState(false);
  const[loadStep,setLoadStep]=useState(-1);
  const[apiError,setApiError]=useState(null);
  const[plan,setPlan]=useState(null);
  const[flights,setFlights]=useState([]);
  const[hotels,setHotels]=useState([]);
  const[rests,setRests]=useState([]);
  const[vegRests,setVegRests]=useState([]);
  const[promos,setPromos]=useState([]);
  const[retreats,setRetreats]=useState([]);
  const[weather,setWeather]=useState(null);
  const[selF,setSelF]=useState(null);
  const[selH,setSelH]=useState(null);
  const[mapPlaces,setMapPlaces]=useState([]);
  const[activeMap,setActiveMap]=useState(null);
  const[booking,setBooking]=useState(false);
  const[booked,setBooked]=useState(false);
  const[exIdx,setExIdx]=useState(0);
  const[shareToast,setShareToast]=useState(false);
  const leafReady=useLeaflet();
  const days=diffDays(start,end);
  const nights=days?days-1:plan?.days||5;

  /* ── Currency formatting ── */
  const CURRENCIES={EUR:{sym:"€",rate:1},USD:{sym:"$",rate:1.08},GBP:{sym:"£",rate:0.86},JPY:{sym:"¥",rate:163}};
  const fmtPrice=(eur)=>{
    const c=CURRENCIES[currency]||CURRENCIES.EUR;
    const v=Math.round(eur*c.rate);
    return currency==="JPY"?`${c.sym}${(v*100).toLocaleString()}`:currency==="USD"||currency==="GBP"?`${c.sym}${v}` :`${v}${c.sym}`;
  };

  /* ── Share trip ── */
  function shareTrip(){
    if(!plan)return;
    const text=`✈️ ${plan.destination} · ${plan.days} días · ${plan.budget}\n🌐 Planificado con Trippio AI`;
    if(navigator.share){navigator.share({title:`Trippio — ${plan.destination}`,text,url:window.location.href}).catch(()=>{});}
    else{navigator.clipboard?.writeText(text+"\n"+window.location.href);setShareToast(true);setTimeout(()=>setShareToast(false),2500);}
  }

  useEffect(()=>{const i=setInterval(()=>setExIdx(x=>(x+1)%t.examples.length),3400);return()=>clearInterval(i);},[lang]);

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

  async function generate(){
    if(!input.trim())return;
    setApiError(null);
    setLoading(true);setPlan(null);setFlights([]);setHotels([]);setRests([]);setVegRests([]);setPromos([]);setRetreats([]);setWeather(null);setSelF(null);setSelH(null);setMapPlaces([]);setBooked(false);
    const dctx=start&&end?`Dates: ${start} to ${end} (${days} days). Travelers: ${travelers}.`:"";
    const lp=t.langPrompt;
    const ttCfg=TRIP_TYPES[tripTypes[0]||"culture"];
    const tsCfg=TRAVELER_STYLES[travelerStyle||"comfort"];
    const tripTypesStr=tripTypes.length?tripTypes.map(k=>`${k} (${t.tripTypes?.[k]||k})`).join(', '):'culture';
    const styleCtx=`Trip styles: ${tripTypesStr}. Traveler profile: ${travelerStyle||'comfort'} (${t.travelerStyles?.[travelerStyle||'comfort']||''}). Hotel stars: ${tsCfg.hotelStars}. Blend ALL trip styles into every recommendation.`;

    setLoadStep(0);
    const sys1=`Expert travel planner. ${lp} Reply ONLY with valid raw JSON, no backticks. ${dctx} ${styleCtx}
{"destination":"city, country","days":N,"budget":"X€","summary":"2 sentences","budget_breakdown":"...","transport_overview":"...","map_places":[{"name":"...","lat":0.0,"lng":0.0,"description":"..."}],"itinerary":[{"day":"Day N - Name","theme":"...","morning":"...","afternoon":"...","evening":"...","transport":"...","budget":"~X€"}],"tips":["..."],"lat":0.0,"lng":0.0}
Include 8-10 map_places with real precise GPS. Also include destination lat/lng at root level.`;
    let planData=null;
    try{
      const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":import.meta.env.VITE_ANTHROPIC_KEY,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:3500,system:sys1,messages:[{role:"user",content:input+(dctx?"\n\n"+dctx:"")}]})});
      const d=await r.json();
      planData=JSON.parse((d.content||[]).map(b=>b.text||"").join("").replace(/```json|```/g,"").trim());
      setPlan(planData);
    }catch(e){setLoading(false);setLoadStep(-1);setApiError(t.errorMsg||"Error al generar el itinerario. Inténtalo de nuevo.");return;}

    const dest=planData.destination;
    const bm=input.match(/(\d+)\s*[€$£]/);
    const budget=bm?parseInt(bm[1]):800;
    const nightsN=nights||planData.days||5;
    const hotelBudget=Math.round(budget*tsCfg.hotelBudgetPct/nightsN);

    setLoadStep(1);
    const isRetreat=tripTypes.includes("retreat");
    const[r1,r2,r3,r4,r5,r6]=await Promise.all([
      // Flights
      fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":import.meta.env.VITE_ANTHROPIC_KEY,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1200,system:`Generate 3 realistic fictional flights Madrid→${dest}. ${lp} Reply ONLY raw JSON array, no backticks.
[{"airline":"...","departure":"HH:MM","arrival":"HH:MM","duration":"XhYm","stops":0,"price":XXX,"class":"${travelerStyle==="luxury"?"Business":"Economy"}"}]
Vary airlines. ~${Math.round(budget*.35)}€/person. ${travelerStyle==="luxury"?"Include premium options.":""}`,messages:[{role:"user",content:`Flights to ${dest}`}]})}),
      // Hotels
      fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":import.meta.env.VITE_ANTHROPIC_KEY,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1800,system:`Hotel expert. ${lp} Reply ONLY raw JSON array, no backticks.
[{"name":"...","category":"...","stars":${tsCfg.hotelStars},"neighborhood":"...","description":"...","highlights":["..."],"price_per_night":XX,"lat":0.0,"lng":0.0}]
3 real ${tsCfg.hotelStars}-star hotels in ${dest}. ~${hotelBudget}€/night. Trip types: ${tripTypesStr}.`,messages:[{role:"user",content:`Hotels in ${dest}`}]})}),
      // Restaurants
      fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":import.meta.env.VITE_ANTHROPIC_KEY,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1600,system:`Restaurant expert. ${lp} Reply ONLY raw JSON array, no backticks.
[{"name":"...","cuisine":"...","rating":4.2,"price_range":"€€","description":"...","neighborhood":"...","lat":0.0,"lng":0.0}]
6 real restaurants in ${dest} matching ${tripTypesStr} trip styles. ${travelerStyle==="backpacker"?"Focus on local street food.":travelerStyle==="luxury"?"Include fine dining.":""} No vegetarian/vegan only places.`,messages:[{role:"user",content:`Restaurants in ${dest}`}]})}),
      // Veg restaurants
      fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":import.meta.env.VITE_ANTHROPIC_KEY,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1400,system:`Vegetarian and vegan restaurant expert. ${lp} Reply ONLY raw JSON array, no backticks.
[{"name":"...","cuisine":"...","diet":"vegetarian|vegan","rating":4.2,"price_range":"€€","description":"...","neighborhood":"...","lat":0.0,"lng":0.0,"signature_dish":"..."}]
4-5 real vegetarian or vegan restaurants in ${dest}. Mix types.`,messages:[{role:"user",content:`Veg restaurants in ${dest}`}]})}),
      // Promotions & discounts
      fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":import.meta.env.VITE_ANTHROPIC_KEY,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:800,system:`Travel promotions expert. ${lp} Reply ONLY raw JSON array, no backticks.
[{"title":"...","icon":"emoji","description":"...","discount":10,"code":"PROMO123","type":"theater|restaurant|museum|transport|hotel"}]
4-5 realistic promotional offers for ${dest} matching ${tripTypesStr} travel. Include theater/show deals, restaurant discounts, museum passes, transport cards. Make discount codes realistic.`,messages:[{role:"user",content:`Promotions in ${dest}`}]})}),
      // Spiritual retreats (always generated, enriched when retreat type selected)
      fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":import.meta.env.VITE_ANTHROPIC_KEY,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1600,system:`Spiritual retreat and wellness expert. ${lp} Reply ONLY raw JSON array, no backticks.
[{"name":"...","type":"yoga|meditation|ayahuasca|breathwork|sound|digital|shamanic|silent","center":"...","description":"...","duration_days":N,"level":"beginner|intermediate|advanced","price_total":XXX,"spots_left":N,"highlights":["..."],"includes":["..."],"facilitator":"...","neighborhood":"...","lat":0.0,"lng":0.0}]
${isRetreat?"Generate 4 rich detailed":"Generate 2 brief"} spiritual retreats near ${dest}. ${isRetreat?"Mix types: yoga retreat, meditation, ayahuasca ceremony, breathwork, sound healing, digital detox, shamanic. Include real-sounding center names, authentic facilitators, realistic prices (100-3000€), specific highlights and what's included.":"Include at least 1 yoga and 1 meditation option."} Trip context: ${tripTypesStr}.`,messages:[{role:"user",content:`Spiritual retreats near ${dest}`}]})}),
    ]);

    setLoadStep(2);
    let fl=[],hs=[],rs=[],vrs=[],prs=[],rts=[];
    try{const d=await r1.json();fl=JSON.parse((d.content||[]).map(b=>b.text||"").join("").replace(/```json|```/g,"").trim());}catch{}
    try{const d=await r2.json();hs=JSON.parse((d.content||[]).map(b=>b.text||"").join("").replace(/```json|```/g,"").trim()).map((h,i)=>({...h,_imgIdx:i}));}catch{}
    try{const d=await r3.json();rs=JSON.parse((d.content||[]).map(b=>b.text||"").join("").replace(/```json|```/g,"").trim());}catch{}
    try{const d=await r4.json();vrs=JSON.parse((d.content||[]).map(b=>b.text||"").join("").replace(/```json|```/g,"").trim());}catch{}
    try{const d=await r5.json();prs=JSON.parse((d.content||[]).map(b=>b.text||"").join("").replace(/```json|```/g,"").trim());}catch{}
    try{const d=await r6.json();rts=JSON.parse((d.content||[]).map(b=>b.text||"").join("").replace(/```json|```/g,"").trim());}catch{}

    setLoadStep(3);await sleep(200);
    setFlights(fl);setHotels(hs);setRests(rs);setVegRests(vrs);setPromos(prs);setRetreats(rts);
    if(fl.length)setSelF(0);if(hs.length)setSelH(0);
    setMapPlaces(buildPlaces(planData,hs,rs,vrs));

    // Weather (Open-Meteo, free, no key needed)
    setLoadStep(4);
    const lat=planData.lat||planData.map_places?.[0]?.lat;
    const lon=planData.lng||planData.map_places?.[0]?.lng;
    if(lat&&lon&&start){
      const wx=await fetchWeather(lat,lon,start);
      setWeather(wx);
    }

    setLoadStep(5);await sleep(200);
    setLoading(false);setLoadStep(-1);
  }

  function reset(){
    setPlan(null);setFlights([]);setHotels([]);setRests([]);setVegRests([]);setPromos([]);setRetreats([]);setWeather(null);
    setSelF(null);setSelH(null);setMapPlaces([]);setBooked(false);setApiError(null);
    setInput("");setStart("");setEnd("");setTravelers(1);
    setOnboardStep(0);setTripTypes([]);setTravelerStyle(null);
  }

  const flightSel=selF!=null?flights[selF]:null;
  const hotelSel=selH!=null?hotels[selH]:null;
  const destLat=plan?.lat||plan?.map_places?.[0]?.lat;
  const destLon=plan?.lng||plan?.map_places?.[0]?.lng;

  /* ── Render ── */
  return(
    <div style={{minHeight:"100vh",background:P.black,color:P.white,fontFamily:"-apple-system,'SF Pro Rounded',sans-serif",WebkitFontSmoothing:"antialiased"}}>
      <style>{`
        @keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
        @keyframes up{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pop{0%{opacity:0;transform:scale(.86) translateY(12px)}100%{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes pulse{0%,100%{opacity:.4;transform:scale(.78)}50%{opacity:1;transform:scale(1)}}
        @keyframes floatUp{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}

        /* ── Trip type grid: 4 cols desktop → 2 cols mobile ── */
        .trip-grid { grid-template-columns: repeat(4,1fr) !important; }
        @media(max-width:600px){ .trip-grid { grid-template-columns: repeat(2,1fr) !important; } }

        /* ── Results layout: sidebar collapses on mobile ── */
        .results-layout { display:grid; grid-template-columns:1fr 320px; gap:28px; align-items:start; }
        @media(max-width:860px){ .results-layout { grid-template-columns:1fr; } }
        @media(max-width:860px){ .sidebar-sticky { position:static !important; } }

        /* ── Cards grid: 2-col on tablet → 1-col mobile ── */
        .cards-grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
        @media(max-width:600px){ .cards-grid-2 { grid-template-columns:1fr; } }

        /* ── Restaurant grid: 3-col → 2-col → 1-col ── */
        .cards-grid-3 { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }
        @media(max-width:860px){ .cards-grid-3 { grid-template-columns:repeat(2,1fr); } }
        @media(max-width:500px){ .cards-grid-3 { grid-template-columns:1fr; } }

        /* ── Nav: shrink on mobile ── */
        @media(max-width:500px){
          .nav-logo-sub { display:none; }
          .nav-currency { display:none; }
        }

        /* ── Hero: shorter on mobile ── */
        @media(max-width:600px){ .hero-img { height:220px !important; } }

        /* ── Weather scroll ── */
        .wx-scroll { display:flex; gap:10px; overflow-x:auto; padding-bottom:8px; scrollbar-width:none; }
        .wx-scroll::-webkit-scrollbar { display:none; }

        /* ── Promo grid: 2-col → 1-col ── */
        .promo-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:12px; }
        @media(max-width:500px){ .promo-grid { grid-template-columns:1fr; } }

        /* ── Transport grid: 3-col → scrollable row on mobile ── */
        .transport-grid { display:flex; flex-wrap:wrap; gap:10px; }
        @media(max-width:480px){ .transport-grid { flex-wrap:nowrap; overflow-x:auto; padding-bottom:6px; scrollbar-width:none; } }
        @media(max-width:480px){ .transport-grid::-webkit-scrollbar { display:none; } }

        /* ── Booking modal bottom sheet ── */
        @media(max-width:600px){ .modal-inner { max-height:96vh !important; border-radius:20px 20px 0 0 !important; } }
        .modal-inner { width:100%; max-width:520px; }

        /* ── Touch targets ── */
        @media(max-width:600px){ button { min-height:44px; } }

        /* ── Text scale ── */
        @media(max-width:400px){ html { font-size:14px; } }

        .fade{animation:up .45s cubic-bezier(.16,1,.3,1) both}
        .fade2{animation:up .45s .08s cubic-bezier(.16,1,.3,1) both}
        .fade3{animation:up .45s .16s cubic-bezier(.16,1,.3,1) both}
        .fade4{animation:up .45s .24s cubic-bezier(.16,1,.3,1) both}
        .pop{animation:pop .5s cubic-bezier(.16,1,.3,1) both}
        .hov{transition:transform .2s,box-shadow .2s}
        .hov:hover{transform:translateY(-3px)}
        .fade {animation:up  .55s cubic-bezier(.16,1,.3,1) both}
        .fade2{animation:up  .55s cubic-bezier(.16,1,.3,1) .09s both}
        .fade3{animation:up  .55s cubic-bezier(.16,1,.3,1) .18s both}
        .fade4{animation:up  .55s cubic-bezier(.16,1,.3,1) .27s both}
        .fade5{animation:up  .55s cubic-bezier(.16,1,.3,1) .36s both}
        .pop {animation:pop  .5s  cubic-bezier(.16,1,.3,1) both}
        .pop2{animation:pop  .5s  cubic-bezier(.16,1,.3,1) .08s both}
        .pop3{animation:pop  .5s  cubic-bezier(.16,1,.3,1) .16s both}
        .pop4{animation:pop  .5s  cubic-bezier(.16,1,.3,1) .24s both}
        .pop5{animation:pop  .5s  cubic-bezier(.16,1,.3,1) .32s both}
        .hov{transition:transform .28s cubic-bezier(.16,1,.3,1),box-shadow .28s,border-color .2s}
        .hov:hover{transform:translateY(-4px)}
        textarea:focus,input:focus{outline:none!important}
        textarea::placeholder{color:#48484A}
        input[type=date]::-webkit-calendar-picker-indicator{filter:invert(.55);cursor:pointer}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-thumb{background:#3A3A3C;border-radius:2px}
        *{-webkit-font-smoothing:antialiased}
        button,input,textarea,select{font-family:-apple-system,sans-serif}
        :root{-webkit-tap-highlight-color:transparent;tap-highlight-color:transparent}
      `}</style>

      {/* ── NAV ── */}
      <nav style={{background:"rgba(13,13,13,.96)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",borderBottom:`1px solid ${P.border}`,padding:"0 22px",height:60,display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:200}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <TrippioLogo size={32}/>
          <div style={{lineHeight:1}}>
            <div style={{fontSize:17,fontWeight:700,letterSpacing:"-.03em",color:P.white}}>Trippio</div>
            <div className="nav-logo-sub" style={{fontSize:9,color:P.gold,letterSpacing:".12em",textTransform:"uppercase",marginTop:1,opacity:.8}}>AI Travel</div>
          </div>
          {tripTypes.length>0&&travelerStyle&&!plan&&!loading&&(
            <div style={{display:"flex",gap:4,marginLeft:8,flexWrap:"wrap"}}>
              {tripTypes.slice(0,2).map(k=><span key={k} style={{background:P.goldDim,color:P.gold,border:`1px solid ${P.goldBorder}`,borderRadius:6,padding:"3px 8px",fontSize:10,fontWeight:600}}>{TRIP_TYPES[k].icon} {t.tripTypes[k]}</span>)}
              {tripTypes.length>2&&<span style={{background:P.card3,color:P.muted,border:`1px solid ${P.border}`,borderRadius:6,padding:"3px 8px",fontSize:10}}>+{tripTypes.length-2}</span>}
            </div>
          )}
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          {/* Currency selector */}
          <select value={currency} onChange={e=>setCurrency(e.target.value)}
            className="nav-currency" style={{background:P.card2,border:`1px solid ${P.border}`,color:P.sub,borderRadius:8,padding:"5px 8px",fontSize:11,fontFamily:"-apple-system,sans-serif",cursor:"pointer",outline:"none",fontWeight:600}}>
            {Object.entries(CURRENCIES).map(([k,v])=><option key={k} value={k}>{v.sym} {k}</option>)}
          </select>
          <LangSelector lang={lang} setLang={setLang}/>
          {plan&&!loading&&<button onClick={shareTrip} style={{background:P.card2,border:`1px solid ${P.border}`,color:P.sub,borderRadius:8,padding:"6px 12px",fontSize:12,cursor:"pointer",fontFamily:"-apple-system,sans-serif",fontWeight:600,display:"flex",alignItems:"center",gap:5}}>↑ {t.shareBtn||"Share"}</button>}
          {plan&&!loading&&flightSel&&hotelSel&&!booked&&<IBtn size="sm" outline color={P.gold} onClick={()=>setBooking(true)}>{t.bookNav}</IBtn>}
          {plan&&!loading&&<IBtn size="sm" outline color={P.muted} onClick={reset}>{t.newSearch}</IBtn>}
        </div>
      </nav>

      {booking&&<BookModal flight={flightSel} hotel={hotelSel} nights={nights} travelers={travelers} dest={plan?.destination} lang={lang} onClose={()=>setBooking(false)} onDone={()=>{setBooking(false);setBooked(true);}}/>}

      <main style={{maxWidth:1100,margin:"0 auto",padding:"0 20px 100px"}}>

        {/* ── Share toast ── */}
        {shareToast&&(
          <div style={{position:"fixed",bottom:32,left:"50%",transform:"translateX(-50%)",background:P.card2,border:`1px solid ${P.goldBorder}`,color:P.gold,borderRadius:12,padding:"12px 22px",fontSize:13,fontWeight:600,zIndex:999,boxShadow:"0 8px 32px rgba(0,0,0,.6)",animation:"up .3s cubic-bezier(.16,1,.3,1)"}}>
            ✓ {t.shareCopied||"Enlace copiado al portapapeles"}
          </div>
        )}

        {/* ── API Error banner ── */}
        {apiError&&!loading&&(
          <div style={{background:"rgba(224,90,78,.12)",border:"1px solid rgba(224,90,78,.3)",borderRadius:14,padding:"16px 20px",margin:"24px 0",display:"flex",alignItems:"center",gap:14}} className="fade">
            <span style={{fontSize:22}}>⚠️</span>
            <div style={{flex:1}}>
              <div style={{fontSize:14,fontWeight:700,color:"#E05A4E",marginBottom:3}}>{t.errorTitle||"Algo salió mal"}</div>
              <div style={{fontSize:12,color:P.sub}}>{apiError}</div>
            </div>
            <button onClick={()=>setApiError(null)} style={{background:"none",border:"none",color:P.muted,cursor:"pointer",fontSize:18,padding:"0 4px"}}>✕</button>
          </div>
        )}

        {/* ══ HERO / ONBOARDING ══ */}
        {!plan&&!loading&&(
          <div style={{maxWidth:640,margin:"0 auto",padding:"60px 0 40px"}}>
            {/* Step indicator */}
            <div style={{display:"flex",justifyContent:"center",gap:8,marginBottom:32}} className="fade">
              {[0,1,2].map(s=>(
                <div key={s} style={{height:4,borderRadius:2,transition:"all .4s cubic-bezier(.16,1,.3,1)",background:s<onboardStep?P.gold:s===onboardStep?P.gold:P.border,width:s===onboardStep?40:20}}/>
              ))}
            </div>

            {onboardStep===0&&(
              <>
                <div style={{textAlign:"center",marginBottom:28}} className="fade">
                  {/* Brand mark */}
                  <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:14,marginBottom:22}} className="fade">
                    <TrippioLogo size={56}/>
                    <div style={{textAlign:"left"}}>
                      <div style={{fontSize:36,fontWeight:700,letterSpacing:"-.04em",color:P.white,lineHeight:1}}>Trippio</div>
                      <div style={{fontSize:11,color:P.gold,letterSpacing:".15em",textTransform:"uppercase",marginTop:4}}>Your trip. One click.</div>
                    </div>
                  </div>
                  <div style={{display:"inline-flex",alignItems:"center",gap:7,background:"linear-gradient(135deg,#1C1C1E,#2C2C2E)",border:"0.5px solid rgba(255,255,255,.12)",borderRadius:100,padding:"7px 18px",marginBottom:20,boxShadow:"0 4px 20px rgba(0,0,0,.5)"}}>
                    <span style={{width:6,height:6,background:P.gold,borderRadius:"50%",display:"inline-block",flexShrink:0}}/><span style={{fontSize:11,fontWeight:500,color:P.sub,letterSpacing:".04em"}}>{t.badge}</span>
                  </div>
                  <h1 style={{fontSize:"clamp(28px,5vw,46px)",fontWeight:700,lineHeight:1.1,margin:"0 0 2px",letterSpacing:"-.04em",color:P.white}} className="fade2">{t.h1a}</h1>
                  <h1 style={{fontSize:"clamp(28px,5vw,46px)",fontWeight:700,lineHeight:1.1,margin:"0 0 16px",color:P.gold,letterSpacing:"-.04em"}} className="fade3">{t.h1b}</h1>
                  <p style={{fontSize:15,color:"rgba(235,235,245,.5)",margin:"0 0 28px",lineHeight:1.75,fontWeight:400}} className="fade4">{t.sub}</p>
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
                {/* Profile pills */}
                <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
                  {tripTypes.map(k=><span key={k} style={{background:P.goldDim,color:P.gold,border:`1px solid ${P.goldBorder}`,borderRadius:8,padding:"5px 12px",fontSize:12,fontWeight:600}}>{TRIP_TYPES[k].icon} {t.tripTypes[k]}</span>)}
                  <span style={{background:TRAVELER_STYLES[travelerStyle].grad,color:"#fff",borderRadius:10,padding:"6px 14px",fontSize:13,fontWeight:800}}>{TRAVELER_STYLES[travelerStyle].icon} {t.travelerStyles[travelerStyle]}</span>
                </div>
                <div style={{background:P.card,borderRadius:20,padding:"24px 26px",boxShadow:"0 20px 60px rgba(0,0,0,.7)",border:`1px solid ${P.border}`}}>
                  <div style={{fontSize:11,fontWeight:700,color:"rgba(235,235,245,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:10}}>{t.whereQ}</div>
                  <textarea value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&e.metaKey)generate();}} placeholder={t.examples[exIdx]} rows={2}
                    style={{width:"100%",background:"transparent",border:"none",color:"#fff",fontSize:19,lineHeight:1.6,resize:"none",boxSizing:"border-box",fontFamily:"-apple-system,sans-serif",fontWeight:600,letterSpacing:"-.01em"}}/>
                  <div style={{height:"0.5px",background:"rgba(255,255,255,.07)",margin:"16px 0"}}/>
                  <div style={{marginBottom:16}}><DateInput start={start} end={end} onChange={(f,v)=>{if(f==="start"){setStart(v);if(end&&v>end)setEnd("");}else setEnd(v);}} t={t}/></div>
                  <div style={{marginBottom:16}}>
                    <div style={{fontSize:11,fontWeight:700,color:"rgba(235,235,245,.4)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:8}}>{t.travelersL}</div>
                    <div style={{display:"flex",alignItems:"center",gap:14}}>
                      <button onClick={()=>setTravelers(Math.max(1,travelers-1))} style={{width:34,height:34,background:"#2C2C2E",border:"1.5px solid #3A3A3C",borderRadius:"50%",cursor:"pointer",fontSize:20,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>−</button>
                      <span style={{fontSize:17,fontWeight:800,minWidth:22,textAlign:"center"}}>{travelers}</span>
                      <button onClick={()=>setTravelers(Math.min(8,travelers+1))} style={{width:34,height:34,background:"#2C2C2E",border:"1.5px solid #3A3A3C",borderRadius:"50%",cursor:"pointer",fontSize:20,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>+</button>
                      <span style={{fontSize:13,color:iOS.fill}}>{travelers===1?t.traveler1:t.travelersN(travelers)}</span>
                    </div>
                  </div>
                  {days&&days>0&&(
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14,padding:"10px 14px",background:P.goldDim,borderRadius:10,border:`1px solid ${P.goldBorder}`}}>
                      <Dot color={iOS.blue}/>
                      <span style={{fontSize:12,color:P.gold,fontWeight:600}}>{days} {t.days(days).split(" ")[1]||"días"} · {fmtDate(start,{day:"numeric",month:"long"},locale)} – {fmtDate(end,{day:"numeric",month:"long",year:"numeric"},locale)}</span>
                    </div>
                  )}
                  <IBtn full size="lg" style={{background:GOLD_GRAD,color:P.black,fontWeight:800}} onClick={generate} disabled={!input.trim()}>{t.searchBtn}</IBtn>
                </div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center",marginTop:16}} className="fade4">
                  {t.examples.map((ex,i)=>(
                    <button key={i} onClick={()=>setInput(ex)}
                      style={{background:"rgba(255,255,255,.05)",border:"0.5px solid rgba(255,255,255,.1)",color:"rgba(235,235,245,.5)",borderRadius:100,padding:"8px 18px",fontSize:12,cursor:"pointer",fontFamily:"-apple-system,sans-serif",fontWeight:500,boxShadow:"0 2px 12px rgba(0,0,0,.3)",transition:"all .22s cubic-bezier(.16,1,.3,1)"}}
                      onMouseEnter={e=>{e.currentTarget.style.borderColor=P.goldBorder;e.currentTarget.style.color=P.gold;e.currentTarget.style.background=P.goldDim;}}
                      onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.08)";e.currentTarget.style.color=P.muted;e.currentTarget.style.background="transparent";}}>{ex}</button>
                  ))}
                </div>
                <div style={{marginTop:12,display:"flex",justifyContent:"flex-start"}}>
                  <IBtn outline color={P.muted} size="sm" onClick={()=>setOnboardStep(1)}>{t.backBtn2}</IBtn>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══ LOADING ══ */}
        {loading&&(
          <div style={{maxWidth:480,margin:"60px auto 0",padding:"0 20px"}} className="fade">
            {/* Logo + text */}
            <div style={{textAlign:"center",marginBottom:28}}>
              <div style={{margin:"0 auto 20px",animation:"floatUp 3s ease infinite",width:72,display:"flex",justifyContent:"center"}}>
                <TrippioLogo size={72}/>
              </div>
              <h2 style={{fontSize:22,fontWeight:800,margin:"0 0 6px",letterSpacing:"-.04em"}}>{t.loadTitle}</h2>
              <p style={{fontSize:13,color:P.muted,marginBottom:0}}>{t.loadSub}</p>
            </div>
            {/* Step progress */}
            <div style={{background:P.card,borderRadius:18,padding:"8px 18px 10px",border:`1px solid ${P.border}`,marginBottom:24}}>
              {t.steps.map((label,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"9px 0",opacity:loadStep>i?1:loadStep===i?1:.3,transition:"opacity .3s",borderBottom:i<t.steps.length-1?`1px solid ${P.border}`:"none"}}>
                  <div style={{width:30,height:30,borderRadius:"50%",background:loadStep>i?P.goldDim:loadStep===i?P.goldDim:P.card3,border:`1px solid ${loadStep>i?P.goldBorder:loadStep===i?P.goldBorder:P.border}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all .3s"}}>
                    {loadStep>i?<span style={{color:P.gold,fontSize:13,fontWeight:700}}>✓</span>:loadStep===i?<Spin size={14} color={P.gold}/>:<span style={{fontSize:12}}>{["🗺️","✈️","🏨","🍽️","🌤","✅"][i]}</span>}
                  </div>
                  <span style={{fontSize:13,fontWeight:loadStep>=i?600:400,color:loadStep>i?P.gold:loadStep===i?P.white:P.muted}}>{label}</span>
                </div>
              ))}
            </div>
            {/* Skeleton preview — appears after step 1 */}
            {loadStep>=1&&(
              <div style={{opacity:.6}} className="fade">
                <SkeletonFlightCard/><SkeletonFlightCard/>
              </div>
            )}
            {loadStep>=2&&(
              <div style={{opacity:.6}} className="fade">
                <div className="cards-grid-2" style={{}}>
                  <SkeletonHotelCard/><SkeletonHotelCard/>
                </div>
              </div>
            )}
            {loadStep>=3&&(
              <div style={{opacity:.6}} className="fade">
                <div className="cards-grid-3" style={{}}>
                  <SkeletonRestCard/><SkeletonRestCard/><SkeletonRestCard/>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══ RESULTS ══ */}
        {plan&&!loading&&(
          <div className="fade">
            {/* Hero image */}
            <div className="hero-img" style={{position:"relative",height:340,borderRadius:"0 0 32px 32px",overflow:"hidden",marginBottom:28,boxShadow:"0 16px 48px rgba(0,0,0,.7)"}}>
              <img src={getImg(plan.destination)} alt={plan.destination} style={{width:"100%",height:"100%",objectFit:"cover",transform:"scale(1.04)",transition:"transform 8s ease"}}/>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.85) 0%,rgba(0,0,0,.3) 50%,transparent 75%)"}}/>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(to right,rgba(0,0,0,.25),transparent)"}}/>
              {/* style badges */}
              {tripTypes.length>0&&travelerStyle&&(
                <div style={{position:"absolute",top:20,left:20,display:"flex",gap:6,flexWrap:"wrap"}}>
                  {tripTypes.map(k=><span key={k} style={{background:"rgba(0,0,0,.6)",color:P.gold,border:`1px solid ${P.goldBorder}`,borderRadius:6,padding:"4px 10px",fontSize:10,fontWeight:600,backdropFilter:"blur(8px)"}}>{TRIP_TYPES[k].icon} {t.tripTypes[k]}</span>)}
                  <span style={{background:"rgba(0,0,0,.55)",color:P.sub,border:"1px solid rgba(255,255,255,.12)",borderRadius:6,padding:"4px 10px",fontSize:10,fontWeight:500}}>{TRAVELER_STYLES[travelerStyle].icon} {t.travelerStyles[travelerStyle]}</span>
                </div>
              )}
              <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"24px 26px"}}>
                <div style={{fontSize:"clamp(30px,5vw,52px)",fontWeight:900,color:"#fff",letterSpacing:"-.04em",lineHeight:1.0,marginBottom:12,textShadow:"0 2px 20px rgba(0,0,0,.5)"}}>{plan.destination}</div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  {[t.days(plan.days),plan.budget,start&&end?`${fmtDate(start,null,locale)} → ${fmtDate(end,null,locale)}`:null,travelers===1?t.traveler1:t.travelersN(travelers)].filter(Boolean).map((v,i)=>(
                    <span key={i} style={{background:i===0?P.goldDim:"rgba(255,255,255,.06)",color:i===0?P.gold:P.sub,border:`1px solid ${i===0?P.goldBorder:"rgba(255,255,255,.1)"}`,borderRadius:20,padding:"4px 14px",fontSize:11,fontWeight:i===0?600:400,letterSpacing:".02em"}}>{v}</span>
                  ))}
                </div>
              </div>
            </div>

            {booked&&(
              <div style={{background:P.goldDim,border:`1px solid ${P.goldBorder}`,borderRadius:16,padding:"20px 24px",marginBottom:28,display:"flex",gap:16,alignItems:"center"}} className="pop">
                <span style={{fontSize:36}}>🎉</span>
                <div>
                  <div style={{fontSize:17,fontWeight:900,color:"#fff"}}>{t.bookedBannerT}</div>
                  <div style={{fontSize:13,color:"rgba(255,255,255,.9)",marginTop:3}}>{t.bookedBannerSub(flightSel?.airline,hotelSel?.name,nights)}</div>
                </div>
              </div>
            )}

            <div className="results-layout" style={{gap:22,alignItems:"start"}}>
              <div>
                {/* Weather */}
                {weather&&start&&<WeatherSection weather={weather} startDate={start} t={t} locale={locale}/>}

                {/* Flights */}
                {flights.length>0&&(
                  <div style={{marginBottom:32}} className="pop">
                    <SectionHdr icon="✈️" title={t.flightsT} sub={t.flightsSub(plan.destination,travelers)} color={iOS.blue}/>
                    {flights.map((fl,i)=><FlightCard key={i} flight={fl} selected={selF===i} onSelect={()=>setSelF(i)} t={t}/>)}
                  </div>
                )}

                {/* Hotels */}
                {hotels.length>0&&(
                  <div style={{marginBottom:32}} className="pop2">
                    <SectionHdr icon="🏨" title={t.hotelsT} sub={t.hotelsSub(nights)} color={iOS.teal}/>
                    {hotels.map((h,i)=><HotelCard key={i} hotel={h} selected={selH===i} onSelect={()=>setSelH(i)} nights={nights} onMap={h.lat&&h.lng?()=>flyToHotel(h):null} t={t} travelerStyle={travelerStyle}/>)}
                  </div>
                )}

                {/* Map */}
                {leafReady&&mapPlaces.length>0&&(
                  <div id="mapsec" style={{marginBottom:32}} className="pop3">
                    <SectionHdr icon="🗺️" title={t.mapT} sub={t.mapSub} color={iOS.indigo}/>
                    <TravelMap places={mapPlaces} active={activeMap} onSelect={setActiveMap}/>
                  </div>
                )}

                {/* Restaurants */}
                {rests.length>0&&(
                  <div style={{marginBottom:32}} className="pop4">
                    <SectionHdr icon="🍽️" title={t.restsT} sub={t.restsSub} color={iOS.orange}/>
                    <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>{rests.map((r,i)=><RestCard key={i} rest={r} idx={i} t={t}/>)}</div>
                  </div>
                )}

                {/* Veg restaurants */}
                {vegRests.length>0&&(
                  <div style={{marginBottom:32}} className="pop5">
                    <SectionHdr icon="🌿" title={t.vegT} sub={t.vegSub} color={iOS.green}
                      right={<div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                        <span style={{background:P.goldDim,color:P.gold,border:`1px solid ${P.goldBorder}`,borderRadius:20,padding:"3px 12px",fontSize:10,fontWeight:600}}>🌱 {t.veganBadge}</span>
                        <span style={{background:P.card3,color:P.sub,border:`1px solid ${P.border}`,borderRadius:20,padding:"3px 12px",fontSize:10,fontWeight:500}}>🥦 {t.vegBadge}</span>
                      </div>}
                    />
                    <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>{vegRests.map((r,i)=><RestCard key={i} rest={r} idx={i} vegMode t={t}/>)}</div>
                  </div>
                )}

                {/* Promotions */}
                {promos.length>0&&<PromoSection promos={promos} t={t}/>}

                {/* Spiritual Retreats */}
                {retreats.length>0&&<RetreatSection retreats={retreats} t={t} isRetreatTrip={tripTypes.includes("retreat")}/>}

                {/* Transport */}
                <TransportSection dest={plan.destination} lat={destLat} lon={destLon} t={t}/>

                {/* Itinerary */}
                {plan.itinerary?.length>0&&(
                  <div style={{marginBottom:32}} className="pop">
                    <SectionHdr icon="📅" title={t.itinT} sub={t.itinSub} color={iOS.purple}/>
                    {plan.itinerary.map((day,i)=><DayCard key={i} day={day} i={i} t={t}/>)}
                  </div>
                )}
              </div>

              {/* ── Sidebar ── */}
              <div className="sidebar-sticky" style={{position:"sticky",top:72}}>
                <PkgSummary flight={flightSel} hotel={hotelSel} nights={nights} travelers={travelers} t={t} fmtPrice={fmtPrice}/>
                {flightSel&&hotelSel&&!booked&&(
                  <div style={{marginTop:16}} className="pop">
                    <IBtn full size="lg" style={{background:GOLD_GRAD,color:P.black,fontWeight:700}} onClick={()=>setBooking(true)}>{t.bookBtn}</IBtn>
                    <div style={{fontSize:11,color:"#48484A",textAlign:"center",marginTop:10}}>{t.demoNote}</div>
                  </div>
                )}
                {booked&&<div style={{background:P.goldDim,border:`1px solid ${P.goldBorder}`,borderRadius:14,padding:"16px",textAlign:"center",marginTop:14}}><div style={{fontSize:24,marginBottom:5}}>✓</div><div style={{fontSize:13,fontWeight:700,color:P.gold}}>{t.bookedL}</div></div>}
                {plan.tips?.length>0&&(
                  <div style={{background:P.card,borderRadius:14,padding:"18px",marginTop:14,border:`1px solid ${P.border}`}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
                      <div style={{width:28,height:28,background:P.goldDim,border:`1px solid ${P.goldBorder}`,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>💡</div>
                      <span style={{fontSize:14,fontWeight:800,letterSpacing:"-.01em"}}>{t.tipsT}</span>
                    </div>
                    {plan.tips.slice(0,4).map((tip,i)=>(
                      <div key={i} style={{display:"flex",gap:8,marginBottom:10}}>
                        <span style={{width:6,height:6,background:[iOS.blue,iOS.orange,iOS.green,iOS.pink][i%4],borderRadius:"50%",flexShrink:0,marginTop:5}}/>
                        <p style={{margin:0,fontSize:12,color:iOS.fill,lineHeight:1.65}}>{tip}</p>
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
