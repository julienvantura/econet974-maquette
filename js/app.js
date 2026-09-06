(function(){
  "use strict";
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ----- Données services ----- */
  var IMGS = {
    mops: "assets/img/mops.jpg",
    commercial: "assets/img/commercial.jpg",
    medical: "assets/img/medical.jpg",
    copro: "assets/img/copro.jpg",
    chantier: "assets/img/chantier.jpg",
    verts: "assets/img/verts.jpg",
    tri: "assets/img/tri.jpg",
    bailleurs: "assets/img/bailleurs.jpg",
    collectivites: "assets/img/collectivites.jpg"
  };
  var SERVICES = [
    { slug:"nettoyage-commercial", name:"Nettoyage commercial", img:"commercial", tag:"Le plus demandé",
      short:"Bureaux, espaces de travail et boutiques - sols, vitres, mobilier, sanitaires.",
      lead:"Nettoyage quotidien ou périodique de vos bureaux, espaces de travail et boutiques : sols, vitres, mobilier, sanitaires et espaces communs, aux horaires qui respectent votre activité.",
      freq:"Quotidien, hebdomadaire ou ponctuel", pub:"Entreprises, commerces, professions libérales",
      checks:["Sols, vitres, mobilier, sanitaires et espaces communs","Produits écolabellisés inclus, sans surcoût","Horaires adaptés : tôt le matin, soir, week-end","Interventions ponctuelles et évènementielles","Réassort des consommables (savon, papier…)","Interlocuteur unique et contrôles qualité"] },
    { slug:"milieux-medicalises", name:"Milieux médicalisés", img:"medical", tag:"Protocoles stricts",
      short:"Désinfection approfondie des cabinets, maisons de santé et laboratoires.",
      lead:"Nettoyage et désinfection approfondie des cabinets médicaux, maisons de santé, services hospitaliers et laboratoires, dans le strict respect des normes d'hygiène du secteur.",
      freq:"Quotidien ou pluri-hebdomadaire", pub:"Cabinets, maisons de santé, laboratoires",
      checks:["Désinfectants homologués secteur médical","Protocoles d'hygiène stricts (bionettoyage)","Salles de consultation, blocs et espaces communs","Gestion des déchets biomédicaux en filière agréée","Personnel formé à l'hygiène hospitalière","Traçabilité des interventions"] },
    { slug:"residentiel-coproprietes", name:"Résidentiel & copropriétés", img:"copro", tag:"Discrétion totale",
      short:"Halls, escaliers, ascenseurs, vitres et parkings de vos résidences.",
      lead:"Entretien des parties communes de vos copropriétés et résidences, d'habitation comme touristiques : halls, escaliers, ascenseurs, vitres et parkings.",
      freq:"Passages réguliers programmés", pub:"Syndics, copropriétés, résidences touristiques",
      checks:["Halls, escaliers, ascenseurs, vitres, parkings","Interventions discrètes, gêne minimale","Entretien des équipements (portes auto, ascenseurs)","Sortie et nettoyage des bacs poubelles","Signalement des anomalies constatées","Reporting au syndic ou au gestionnaire"] },
    { slug:"post-chantier-industriel", name:"Post-chantier & industriel", img:"chantier", tag:"Remise à neuf",
      short:"Remise en état après travaux, entretien d'usines et d'ateliers.",
      lead:"Mise en état des lieux après travaux et entretien des installations industrielles : élimination des poussières et résidus, sols et surfaces spécifiques, matériaux délicats.",
      freq:"Ponctuel ou contrat d'entretien", pub:"BTP, promoteurs, industriels, artisans",
      checks:["Dépoussiérage complet après travaux","Autolaveuses et nettoyage vapeur","Sols et murs en matériaux délicats","Évacuation et tri des déchets de chantier","Équipes formées aux équipements spécifiques","Livraison propre, dans les délais"] },
    { slug:"espaces-verts", name:"Entretien des espaces verts", img:"verts", tag:"Écoresponsable",
      short:"Taille, tonte, désherbage et soin de vos extérieurs.",
      lead:"Taille des haies, tonte des pelouses, désherbage et entretien complet des espaces verts, pour les entreprises, copropriétés et particuliers.",
      freq:"Passages saisonniers ou réguliers", pub:"Entreprises, copropriétés, particuliers",
      checks:["Taille de haies et d'arbustes","Tonte et soin des pelouses","Désherbage sans produits chimiques agressifs","Outils électriques peu bruyants","Techniques inspirées de la permaculture","Évacuation et valorisation des déchets verts"] },
    { slug:"valorisation-dechets", name:"Valorisation des déchets", img:"tri", tag:"Économie circulaire",
      short:"Bennes, bacs de tri sélectif et cendriers : vos déchets deviennent des ressources.",
      lead:"Facilitez la gestion de vos déchets : bennes pour les volumes importants, bacs de tri sélectif dans vos locaux, cendriers extérieurs - et une vraie filière de valorisation derrière.",
      freq:"Mise en place + collecte régulière", pub:"Entreprises, chantiers, copropriétés, collectivités",
      checks:["Mise à disposition de bennes","Installation de bacs de tri sélectif","Cendriers extérieurs contre les mégots","Collecte et pesée par flux de déchets","Filières de recyclage réunionnaises agréées","Reporting pour vos bilans RSE"] },
    { slug:"bailleurs-particuliers", name:"Bailleurs & particuliers", img:"bailleurs", tag:"Clé en main",
      short:"Fin de location, remise en état, grand ménage ou entretien régulier.",
      lead:"Nettoyage de fin de location et remise en état complète des logements avant l'arrivée ou après le départ des locataires - ou entretien régulier à votre rythme.",
      freq:"Ponctuel ou régulier, à votre rythme", pub:"Bailleurs privés, agences, particuliers",
      checks:["Nettoyage complet de fin de location","Remise en état entre deux locataires","Grand ménage ponctuel en profondeur","Entretien régulier adapté à votre rythme","Vitres, sols, cuisine, sanitaires","État des lieux facilité, photos à l'appui"] },
    { slug:"collectivites", name:"Collectivités", img:"collectivites", tag:"Marchés publics",
      short:"Mairies, écoles, crèches, gymnases et équipements publics.",
      lead:"Nettoyage des bâtiments publics - mairies, écoles, crèches, bibliothèques, salles polyvalentes - et entretien des infrastructures sportives, avec des produits adaptés à la santé des plus jeunes.",
      freq:"Contrats annuels ou marchés publics", pub:"Mairies, intercommunalités, établissements publics",
      checks:["Écoles et crèches : produits adaptés aux enfants","Salles de classe, réfectoires, sanitaires","Gymnases, vestiaires et terrains sportifs","Désinfection des zones à fort passage","Mémoire technique pour vos marchés publics","Équipes stables et identifiées"] }
  ];

  /* ----- Injection cartes services ----- */
  function cardHTML(s){
    return '<a class="scard rv" href="#/services/' + s.slug + '">' +
      '<span class="ph"><img loading="lazy" src="' + IMGS[s.img] + '" alt="' + s.name + '"><span class="tag">' + s.tag + '</span></span>' +
      '<span class="bd"><h3>' + s.name + '</h3><p>' + s.short + '</p>' +
      '<span class="more">Découvrir <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></span></a>';
  }
  document.getElementById("home-services").innerHTML = SERVICES.map(cardHTML).join("");
  document.getElementById("all-services").innerHTML = SERVICES.map(cardHTML).join("");
  document.getElementById("foot-services").innerHTML = SERVICES.map(function(s){
    return '<li><a href="#/services/' + s.slug + '">' + s.name + '</a></li>';
  }).join("");
  document.getElementById("need-chips").innerHTML = SERVICES.map(function(s){
    return '<button class="chip" data-need="' + s.name + '">' + s.name + '</button>';
  }).join("");

  /* ----- Router ----- */
  var pages = document.querySelectorAll(".page");
  var toast = document.getElementById("toast"), toastTmr;
  function notify(msg){
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTmr);
    toastTmr = setTimeout(function(){ toast.classList.remove("show"); }, 3600);
  }
  function setNav(key){
    document.querySelectorAll("[data-nav]").forEach(function(a){
      a.classList.toggle("on", a.dataset.nav === key);
    });
  }
  function fillService(slug){
    var s = SERVICES.find(function(x){ return x.slug === slug; }) || SERVICES[0];
    document.getElementById("sd-crumb").textContent = s.name;
    document.getElementById("sd-title").textContent = s.name;
    document.getElementById("sd-lead").textContent = s.lead;
    var ph = document.getElementById("sd-photo");
    ph.src = IMGS[s.img]; ph.alt = s.name;
    document.getElementById("sd-freq").textContent = s.freq;
    document.getElementById("sd-public").textContent = s.pub;
    document.getElementById("sd-checks").innerHTML = s.checks.map(function(c){
      return '<li><span class="ck"><svg viewBox="0 0 24 24"><path d="m5 13 4 4L19 7"/></svg></span>' + c + '</li>';
    }).join("");
    document.getElementById("sd-others").innerHTML = SERVICES.filter(function(x){ return x.slug !== slug; })
      .map(function(x){ return '<a href="#/services/' + x.slug + '">' + x.name + '</a>'; }).join("");
    return s.name + " - Nettoyage à La Réunion · EcoNet 974";
  }
  function route(){
    var h = location.hash.replace(/^#\/?/, "");
    var seg = h.split("/").filter(Boolean);
    var key = "home", navKey = "home", title = null;
    if (seg[0] === "services" && seg[1]) { key = "service"; navKey = "services"; title = fillService(seg[1]); }
    else if (seg[0] === "services") { key = "services"; navKey = "services"; }
    else if (seg[0] === "engagements") { key = "engagements"; navKey = "engagements"; }
    else if (seg[0] === "a-propos") { key = "apropos"; navKey = "apropos"; }
    else if (seg[0] === "devis") { key = "devis"; navKey = ""; }
    else if (seg[0] === "rdv") { key = "rdv"; navKey = "rdv"; }
    else if (seg[0] === "admin") { key = "admin"; navKey = ""; }
    else if (seg[0] === "espace-client") { key = "client"; navKey = ""; }
    else if (seg[0] === "contact") { key = "contact"; navKey = "contact"; }
    else if (seg[0] === "mentions-legales") { key = "mentions"; navKey = ""; }
    var page = null;
    pages.forEach(function(p){
      var on = p.dataset.page === key;
      p.classList.toggle("on", on);
      if (on) page = p;
    });
    setNav(navKey);
    document.title = title || page.dataset.title;
    document.documentElement.style.scrollBehavior = "auto";
    scrollTo(0, 0);
    document.documentElement.style.scrollBehavior = "";
    observePage(page);
    closeMenu();
    pageHook(key);
  }
  addEventListener("hashchange", route);

  /* ----- Reveal on scroll ----- */
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, {threshold:.14, rootMargin:"0px 0px -30px 0px"});
  function observePage(page){
    page.querySelectorAll(".rv:not(.in)").forEach(function(el){ io.observe(el); });
  }

  /* ----- Header ombre ----- */
  var hdr = document.getElementById("hdr");
  addEventListener("scroll", function(){ hdr.classList.toggle("scrolled", scrollY > 8); }, {passive:true});

  /* ----- Menu mobile ----- */
  var mnav = document.getElementById("mnav");
  function closeMenu(){ mnav.classList.remove("open"); mnav.setAttribute("aria-hidden","true"); }
  document.getElementById("burger").addEventListener("click", function(){
    mnav.classList.add("open"); mnav.setAttribute("aria-hidden","false");
  });
  document.getElementById("mclose").addEventListener("click", closeMenu);
  document.getElementById("mveil").addEventListener("click", closeMenu);

  /* ----- Bulles hero ----- */
  if (!reduced) {
    var bw = document.getElementById("bubbles");
    for (var i = 0; i < 14; i++) {
      var b = document.createElement("span");
      b.className = "bub";
      var s = 8 + Math.random() * 26;
      b.style.width = b.style.height = s + "px";
      b.style.left = Math.random() * 100 + "%";
      b.style.animationDuration = (14 + Math.random() * 18) + "s";
      b.style.animationDelay = (-Math.random() * 20) + "s";
      bw.appendChild(b);
    }
  }

  /* ----- Compteurs ----- */
  var cio = new IntersectionObserver(function(es){
    es.forEach(function(e){
      if (!e.isIntersecting) return;
      cio.unobserve(e.target);
      var el = e.target, target = +el.dataset.count, t0 = null;
      if (reduced) { el.textContent = target; return; }
      requestAnimationFrame(function step(ts){
        if (!t0) t0 = ts;
        var k = Math.min(1, (ts - t0) / 1500);
        k = 1 - Math.pow(1 - k, 3);
        el.textContent = Math.round(target * k);
        if (k < 1) requestAnimationFrame(step);
      });
    });
  }, {threshold:.7});
  document.querySelectorAll("[data-count]").forEach(function(el){ cio.observe(el); });

  /* ----- Avant / après ----- */
  var ba = document.getElementById("ba");
  function baMove(clientX){
    var r = ba.getBoundingClientRect();
    var x = Math.max(0.04, Math.min(0.96, (clientX - r.left) / r.width));
    ba.style.setProperty("--cut", (x * 100) + "%");
  }
  ba.addEventListener("pointerdown", function(e){
    ba.setPointerCapture(e.pointerId);
    baMove(e.clientX);
    function mv(e2){ baMove(e2.clientX); }
    function up(){ ba.removeEventListener("pointermove", mv); ba.removeEventListener("pointerup", up); }
    ba.addEventListener("pointermove", mv);
    ba.addEventListener("pointerup", up);
  });

  /* ----- Wizard devis ----- */
  var wiz = { step:1, who:null, needs:[], freq:null };
  var steps = document.querySelectorAll(".wstep");
  function showStep(n){
    wiz.step = n;
    steps.forEach(function(s){ s.classList.toggle("on", +s.dataset.step === n); });
    document.getElementById("wiz-n").textContent = "Étape " + n + "/4";
    document.getElementById("wiz-fill").style.width = (n * 25) + "%";
    if (n === 4) {
      document.getElementById("recap").innerHTML =
        '<div><span>Profil</span><b>' + (wiz.who || "-") + '</b></div>' +
        '<div><span>Besoin</span><b>' + (wiz.needs.join(", ") || "-") + '</b></div>' +
        '<div><span>Commune</span><b>' + document.getElementById("d-commune").value + '</b></div>' +
        '<div><span>Surface</span><b>' + document.getElementById("d-surface").value + '</b></div>' +
        '<div><span>Fréquence</span><b>' + (wiz.freq || "À définir") + '</b></div>';
    }
  }
  document.getElementById("who-grid").addEventListener("click", function(e){
    var opt = e.target.closest(".opt");
    if (!opt) return;
    this.querySelectorAll(".opt").forEach(function(o){ o.classList.remove("sel"); });
    opt.classList.add("sel");
    wiz.who = opt.dataset.who;
    setTimeout(function(){ showStep(2); }, 260);
  });
  document.getElementById("need-chips").addEventListener("click", function(e){
    var c = e.target.closest(".chip");
    if (!c) return;
    c.classList.toggle("sel");
    var v = c.dataset.need;
    var i = wiz.needs.indexOf(v);
    if (i >= 0) wiz.needs.splice(i, 1); else wiz.needs.push(v);
  });
  document.getElementById("freq-chips").addEventListener("click", function(e){
    var c = e.target.closest(".chip");
    if (!c) return;
    this.querySelectorAll(".chip").forEach(function(x){ x.classList.remove("sel"); });
    c.classList.add("sel");
    wiz.freq = c.dataset.freq;
  });
  document.querySelectorAll("[data-next]").forEach(function(b){
    b.addEventListener("click", function(){
      if (wiz.step === 2 && !wiz.needs.length) { notify("Sélectionnez au moins une prestation 🙂"); return; }
      showStep(Math.min(4, wiz.step + 1));
    });
  });
  document.querySelectorAll("[data-back]").forEach(function(b){
    b.addEventListener("click", function(){ showStep(Math.max(1, wiz.step - 1)); });
  });
  document.getElementById("wiz-send").addEventListener("click", function(){
    var nom = document.getElementById("d-nom").value.trim();
    var tel = document.getElementById("d-tel").value.trim();
    if (!nom || !tel) { notify("Indiquez au moins votre nom et votre téléphone."); return; }
    notify("Maquette de démonstration - sur le site final, votre demande partirait directement chez EcoNet ✅");
  });

  /* ═════════ Agenda / RDV + Espace pro ═════════ */
  var AG_KEY = "econet_rdv_v1", AG_SYNC = "econet_sync_v1";
  function pad2(n){ return String(n).padStart(2, "0"); }
  function isoD(d){ return d.getFullYear() + "-" + pad2(d.getMonth()+1) + "-" + pad2(d.getDate()); }
  function monday(d){ var x = new Date(d); x.setDate(x.getDate() - (x.getDay()+6)%7); x.setHours(0,0,0,0); return x; }
  function fmtD(iso){ var p = iso.split("-"); return p[2] + "/" + p[1]; }
  var DAYN = ["dim","lun","mar","mer","jeu","ven","sam"];
  var MOISN = ["janv","févr","mars","avr","mai","juin","juil","août","sept","oct","nov","déc"];
  var HOURS = [8, 9, 10, 11, 14, 15, 16, 17];

  function seedData(){
    var mon = monday(new Date());
    function d(off){ var x = new Date(mon); x.setDate(x.getDate()+off); return isoD(x); }
    return { bookings: [
      {id:"s1", d:d(0), t:"09:00", service:"Nettoyage commercial", name:"SARL Horizon Bureaux", tel:"0692 11 22 33", commune:"Saint-Denis", status:"confirme"},
      {id:"s2", d:d(0), t:"14:00", service:"Résidentiel & copropriétés", name:"Syndic Les Filaos", tel:"0692 44 55 66", commune:"Sainte-Marie", status:"confirme"},
      {id:"s3", d:d(1), t:"10:00", service:"Milieux médicalisés", name:"Cabinet dentaire Grondin", tel:"0692 77 88 99", commune:"Saint-Denis", status:"confirme"},
      {id:"s4", d:d(1), t:"15:00", service:"Collectivités", name:"Mairie annexe - gymnase", tel:"0262 45 67 89", commune:"Le Port", status:"attente"},
      {id:"s5", d:d(2), t:"08:00", service:"Post-chantier & industriel", name:"Villa Ermitage (livraison)", tel:"0693 12 34 56", commune:"Saint-Paul", status:"confirme"},
      {id:"s6", d:d(2), t:"10:00", service:"Résidentiel & copropriétés", name:"Résidence Les Alizés", tel:"0692 10 20 30", commune:"Saint-Denis", status:"confirme"},
      {id:"s7", d:d(2), t:"10:00", service:"Milieux médicalisés", name:"Dr Hoarau (saisie téléphone)", tel:"0693 99 88 77", commune:"Sainte-Suzanne", status:"attente"},
      {id:"s8", d:d(3), t:"11:00", service:"Entretien des espaces verts", name:"Copropriété Grand Baie", tel:"0692 55 44 33", commune:"Saint-Paul", status:"confirme"},
      {id:"s9", d:d(4), t:"09:00", service:"Bailleurs & particuliers", name:"Fin de location - T3", tel:"0693 65 43 21", commune:"Saint-Pierre", status:"attente"},
      {id:"s10", d:d(5), t:"08:00", service:"Nettoyage commercial", name:"Boutique Cœur de Ville", tel:"0692 24 68 10", commune:"Saint-Denis", status:"confirme"},
      {id:"s11", d:d(7), t:"10:00", service:"Collectivités", name:"École Les Badamiers", tel:"0262 33 22 11", commune:"La Possession", status:"confirme"},
      {id:"s12", d:d(9), t:"14:00", service:"Valorisation des déchets", name:"Zone artisanale - bennes", tel:"0693 31 41 59", commune:"Le Port", status:"confirme"}
    ]};
  }
  var agMem = null;
  function agRead(){
    if (agMem) return agMem;
    try { var raw = localStorage.getItem(AG_KEY); if (raw) { agMem = JSON.parse(raw); return agMem; } } catch(e){}
    agMem = seedData();
    try { localStorage.setItem(AG_KEY, JSON.stringify(agMem)); } catch(e){}
    return agMem;
  }
  function agWrite(data){
    agMem = data;
    try { localStorage.setItem(AG_KEY, JSON.stringify(data)); } catch(e){}
    agRender();
  }
  function actifs(){ return agRead().bookings.filter(function(b){ return b.status !== "refuse"; }); }
  function isTaken(d, t){ return actifs().some(function(b){ return b.d === d && b.t === t; }); }
  function syncState(){ try { return JSON.parse(localStorage.getItem(AG_SYNC)) || {}; } catch(e){ return {}; } }

  /* ----- Page RDV (client) ----- */
  var rdvSel = { service: SERVICES[0].name, d: null, t: null };
  function nextDays(){
    var out = [], x = new Date();
    while (out.length < 12) { if (x.getDay() !== 0) out.push(new Date(x)); x = new Date(x); x.setDate(x.getDate()+1); }
    return out;
  }
  function renderRdv(){
    var page = document.querySelector('[data-page="rdv"]');
    if (!page || !page.classList.contains("on")) return;
    document.getElementById("r-service").innerHTML = SERVICES.map(function(s){
      return '<button class="chip' + (rdvSel.service === s.name ? " sel" : "") + '" data-rs="' + s.name + '">' + s.name + '</button>';
    }).join("");
    var days = nextDays();
    if (!rdvSel.d) rdvSel.d = isoD(days[0]);
    document.getElementById("r-days").innerHTML = days.map(function(dt){
      var di = isoD(dt);
      return '<button class="day-chip' + (rdvSel.d === di ? " sel" : "") + '" data-rd="' + di + '"><span>' + DAYN[dt.getDay()] + '</span><b>' + dt.getDate() + '</b><span>' + MOISN[dt.getMonth()] + '</span></button>';
    }).join("");
    document.getElementById("r-slots").innerHTML = HOURS.map(function(h){
      var t = pad2(h) + ":00", taken = isTaken(rdvSel.d, t), sel = rdvSel.t === t;
      return '<button class="slot' + (taken ? " taken" : "") + (sel ? " sel" : "") + '" data-rt="' + t + '"' + (taken ? " disabled" : "") + '>' + t + '<small>' + (taken ? "Occupé" : (sel ? "Choisi" : "Libre")) + '</small></button>';
    }).join("");
  }
  var rdvCard = document.getElementById("rdv-card");
  rdvCard.addEventListener("click", function(e){
    var el;
    if ((el = e.target.closest("[data-rs]"))) { rdvSel.service = el.dataset.rs; renderRdv(); }
    else if ((el = e.target.closest("[data-rd]"))) { rdvSel.d = el.dataset.rd; rdvSel.t = null; renderRdv(); }
    else if ((el = e.target.closest("[data-rt]")) && !el.disabled) { rdvSel.t = el.dataset.rt; renderRdv(); }
  });
  document.getElementById("r-send").addEventListener("click", function(){
    var nom = document.getElementById("r-nom").value.trim();
    var tel = document.getElementById("r-tel").value.trim();
    if (!rdvSel.t) { notify("Choisissez d'abord un créneau disponible 🙂"); return; }
    if (!nom || !tel) { notify("Indiquez votre nom et votre téléphone."); return; }
    if (isTaken(rdvSel.d, rdvSel.t)) { notify("Ce créneau vient d'être réservé - choisissez-en un autre."); rdvSel.t = null; renderRdv(); return; }
    var data = agRead();
    var b = { id: "u" + Date.now(), d: rdvSel.d, t: rdvSel.t, service: rdvSel.service, name: nom, tel: tel,
              commune: document.getElementById("r-commune").value, status: "attente", src: "site" };
    data.bookings.push(b);
    agWrite(data);
    document.getElementById("rdv-recap").innerHTML =
      '<div><span>Prestation</span><b>' + b.service + '</b></div>' +
      '<div><span>Date</span><b>' + fmtD(b.d) + ' à ' + b.t + '</b></div>' +
      '<div><span>Commune</span><b>' + b.commune + '</b></div>' +
      '<div><span>Statut</span><b style="color:#8A5E10">En attente de confirmation</b></div>';
    document.getElementById("rdv-flow").style.display = "none";
    document.getElementById("rdv-done").style.display = "";
  });
  document.getElementById("r-again").addEventListener("click", function(){
    rdvSel.t = null;
    document.getElementById("rdv-flow").style.display = "";
    document.getElementById("rdv-done").style.display = "none";
    renderRdv();
  });

  /* ----- Espace pro ----- */
  var adminWeek = 0;
  function isAuthed(){ try { return sessionStorage.getItem("econet_admin") === "1"; } catch(e){ return false; } }
  function renderAdmin(){
    var page = document.querySelector('[data-page="admin"]');
    if (!page || !page.classList.contains("on")) return;
    var authed = isAuthed();
    document.getElementById("pin-gate").style.display = authed ? "none" : "";
    document.getElementById("admin-app").style.display = authed ? "" : "none";
    if (!authed) return;
    var list = actifs();
    var conf = list.filter(function(b){ return b.status === "confirme"; });
    var pend = list.filter(function(b){ return b.status === "attente"; });
    function hasConflict(b){
      return list.some(function(x){ return x.id !== b.id && x.d === b.d && x.t === b.t && x.status === "confirme"; });
    }
    var nbConf = pend.filter(hasConflict).length;
    var mon = monday(new Date()); mon.setDate(mon.getDate() + 7 * adminWeek);
    var wkEnd = new Date(mon); wkEnd.setDate(wkEnd.getDate() + 5);
    var wkIds = [];
    for (var i = 0; i < 6; i++) { var x = new Date(mon); x.setDate(x.getDate()+i); wkIds.push(isoD(x)); }
    var wkConf = conf.filter(function(b){ return wkIds.indexOf(b.d) >= 0; });
    var occ = Math.round(100 * wkConf.length / (6 * HOURS.length));
    document.getElementById("a-stats").innerHTML =
      '<div class="astat"><div class="v">' + conf.length + '</div><div class="l">RDV confirmés</div></div>' +
      '<div class="astat' + (pend.length ? " warn" : "") + '"><div class="v">' + pend.length + '</div><div class="l">En attente</div></div>' +
      '<div class="astat' + (nbConf ? " bad" : "") + '"><div class="v">' + nbConf + '</div><div class="l">Conflit' + (nbConf > 1 ? "s" : "") + ' à résoudre</div></div>' +
      '<div class="astat"><div class="v">' + occ + '<span style="font-size:16px">%</span></div><div class="l">Occupation semaine</div></div>';
    document.getElementById("a-pending-count").textContent = pend.length;
    document.getElementById("a-pending").innerHTML = pend.length ? pend.map(function(b){
      var cfl = hasConflict(b);
      var other = cfl ? list.find(function(x){ return x.id !== b.id && x.d === b.d && x.t === b.t && x.status === "confirme"; }) : null;
      return '<div class="demand' + (cfl ? " conflict" : "") + '">' +
        '<div class="d-top"><b>' + b.name + '</b><span class="when">' + fmtD(b.d) + ' · ' + b.t + '</span></div>' +
        '<div class="d-meta">' + b.service + ' - ' + b.commune + ' · ' + b.tel + '</div>' +
        (cfl ? '<span class="badge-conf">⚠ Conflit - créneau déjà confirmé pour ' + other.name + '</span>' : '') +
        '<div class="d-actions">' +
        '<button class="abtn ok" data-conf="' + b.id + '"' + (cfl ? ' disabled title="Résolvez le conflit d\'abord"' : '') + '>Confirmer</button>' +
        '<button class="abtn no" data-ref="' + b.id + '">' + (cfl ? "Proposer un autre créneau" : "Refuser") + '</button>' +
        '</div></div>';
    }).join("") : '<p style="color:var(--faint);font-size:14px">Aucune demande en attente - tout est traité ✅</p>';
    var lbl = "Semaine du " + fmtD(isoD(mon)) + " au " + fmtD(isoD(wkEnd));
    document.getElementById("a-wlbl").textContent = adminWeek === 0 ? lbl + " (courante)" : lbl;
    var html = '<div></div>';
    for (var dcol = 0; dcol < 6; dcol++) {
      var dt = new Date(mon); dt.setDate(dt.getDate()+dcol);
      html += '<div class="dayhead">' + DAYN[dt.getDay()] + '<b>' + fmtD(isoD(dt)) + '</b></div>';
    }
    html += '<div>';
    for (var h = 8; h < 18; h++) html += '<div class="hcell">' + h + 'h</div>';
    html += '</div>';
    for (var dcol2 = 0; dcol2 < 6; dcol2++) {
      var di = wkIds[dcol2];
      html += '<div class="daycol">';
      list.filter(function(b){ return b.d === di; }).forEach(function(b){
        var top = (parseInt(b.t, 10) - 8) * 44 + 2;
        var cls = b.status === "confirme" ? "ok" : (hasConflict(b) ? "cfl" : "att");
        html += '<div class="plan-block ' + cls + '" style="top:' + top + 'px" data-info="' + b.name + ' - ' + b.service + ' (' + b.t + ', ' + b.commune + ')">' + b.t + ' ' + b.name + '<small>' + b.service + '</small></div>';
      });
      html += '</div>';
    }
    document.getElementById("a-plan").innerHTML = html;
    document.querySelectorAll("[data-sync]").forEach(function(sw){
      var st = syncState(), on = !!st[sw.dataset.sync];
      sw.classList.toggle("on", on);
      var lab = document.querySelector('[data-sync-state="' + sw.dataset.sync + '"]');
      if (lab) {
        if (sw.dataset.sync === "n") { lab.textContent = on ? "Activées ✓ (démo)" : "Désactivées"; }
        else { lab.textContent = on ? "Synchronisé ✓ (démo)" : "Non connecté"; }
        lab.classList.toggle("on", on);
      }
    });
    renderClients();
    renderDevisAdmin();
    applyView();
  }
  function pinTry(){
    if (document.getElementById("pin-input").value === "9744") {
      try { sessionStorage.setItem("econet_admin", "1"); } catch(e){}
      renderAdmin();
      notify("Bienvenue dans votre espace pro 👋");
    } else {
      notify("Code incorrect - pour la démo : 9744");
    }
  }
  document.getElementById("pin-go").addEventListener("click", pinTry);
  document.getElementById("pin-input").addEventListener("keydown", function(e){ if (e.key === "Enter") pinTry(); });
  document.getElementById("admin-app").addEventListener("click", function(e){
    var el;
    if ((el = e.target.closest("[data-conf]"))) {
      if (el.disabled) return;
      var data = agRead();
      var b = data.bookings.find(function(x){ return x.id === el.dataset.conf; });
      if (b) { b.status = "confirme"; agWrite(data); notify("RDV confirmé - le client est prévenu par SMS/e-mail (démo) ✅"); }
    } else if ((el = e.target.closest("[data-ref]"))) {
      var data2 = agRead();
      var b2 = data2.bookings.find(function(x){ return x.id === el.dataset.ref; });
      if (b2) { b2.status = "refuse"; agWrite(data2); notify("Créneau libéré - le client est invité à en choisir un autre (démo)"); }
    } else if ((el = e.target.closest("[data-sync]"))) {
      var st = syncState();
      st[el.dataset.sync] = !st[el.dataset.sync];
      try { localStorage.setItem(AG_SYNC, JSON.stringify(st)); } catch(e2){}
      renderAdmin();
    } else if ((el = e.target.closest(".plan-block"))) {
      notify(el.dataset.info);
    }
  });
  document.getElementById("a-prev").addEventListener("click", function(){ adminWeek--; renderAdmin(); });
  document.getElementById("a-next").addEventListener("click", function(){ adminWeek++; renderAdmin(); });
  document.getElementById("a-reset").addEventListener("click", function(){
    try { localStorage.removeItem(AG_KEY); } catch(e){}
    agMem = null; adminWeek = 0;
    agRender();
    notify("Démo réinitialisée - agenda d'exemple rechargé");
  });

  /* live entre onglets : le storage event = notifications en direct */
  addEventListener("storage", function(e){
    if (e.key !== AG_KEY || !e.newValue) return;
    var before = agMem ? agMem.bookings.filter(function(b){ return b.status !== "refuse"; }).length : 0;
    try { agMem = JSON.parse(e.newValue); } catch(err){ return; }
    var now = agMem.bookings.filter(function(b){ return b.status !== "refuse"; });
    var adminOn = document.querySelector('[data-page="admin"]').classList.contains("on");
    if (adminOn && isAuthed() && now.length > before) {
      var nb = agMem.bookings[agMem.bookings.length - 1];
      notify("🔔 Nouvelle demande de RDV - " + nb.name + " · " + fmtD(nb.d) + " à " + nb.t);
    }
    agRender();
  });
  function agRender(){ renderRdv(); renderAdmin(); }
  function pageHook(key){
    if (key === "client") renderClient();
    if (key === "rdv") renderRdv();
    if (key === "admin") renderAdmin();
  }

  /* ═════════ Thème clair / sombre ═════════ */
  (function(){
    var KEY = "econet_theme", root = document.documentElement;
    var SUN = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M4.9 4.9l1.7 1.7M17.4 17.4l1.7 1.7M19.1 4.9l-1.7 1.7M6.6 17.4l-1.7 1.7"/></svg>';
    var MOON = '<svg viewBox="0 0 24 24"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z"/></svg>';
    function apply(t){
      root.setAttribute("data-theme", t);
      root.style.colorScheme = t;
      document.querySelectorAll("[data-themebtn]").forEach(function(b){
        b.innerHTML = t === "dark" ? SUN : MOON;
        b.setAttribute("aria-label", t === "dark" ? "Passer en mode clair" : "Passer en mode sombre");
      });
    }
    var saved = null;
    try { saved = localStorage.getItem(KEY); } catch(e){}
    var init = saved || "light";
    apply(init);
    document.querySelectorAll("[data-themebtn]").forEach(function(b){
      b.addEventListener("click", function(){
        var t = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        apply(t);
        try { localStorage.setItem(KEY, t); } catch(e){}
      });
    });
  })();

  /* ═════════ Portail multi-clients + back-office à vues ═════════ */
  var PT_KEY = "econet_portal_v2";
  function eur(n){ return n.toFixed(2).replace(".", ",") + " €"; }
  function fmtD2(iso){ var p = iso.split("-"); return p[2] + "/" + p[1] + "/" + p[0]; }
  function initiales(name){
    return name.replace(/[-·]/g, " ").split(/\s+/).filter(function(w){ return w.length > 2 || /^[A-Z0-9]/.test(w); })
      .slice(0, 2).map(function(w){ return w[0]; }).join("").toUpperCase();
  }
  function portalSeed(){
    var today = new Date();
    function dOff(off){ var x = new Date(today); x.setDate(x.getDate() + off); return isoD(x); }
    return { clients: [
      { id: "alizes", name: "Résidence Les Alizés", contact: "M. Lebreton (syndic)", site: "12 rue des Filaos, Saint-Denis · contrat annuel",
        devis: [
          { id: "DEV-2026-041", titre: "Entretien des parties communes - contrat annuel", date: dOff(-24), statut: "accepte",
            lignes: [["Entretien hebdomadaire hall, escaliers, ascenseur (46 sem.)", 46, 120], ["Vitrerie trimestrielle", 4, 180], ["Sortie et nettoyage des bacs (hebdo)", 46, 25]] },
          { id: "DEV-2026-052", titre: "Remise en état du parking souterrain", date: dOff(-6), statut: "attente",
            lignes: [["Décapage mécanique des sols (680 m²)", 1, 890], ["Évacuation des encombrants + tri", 1, 240]] }
        ],
        factures: [
          { id: "FAC-2026-118", titre: "Entretien - août 2026", montant: 612.40, statut: "payee", date: dOff(-32) },
          { id: "FAC-2026-131", titre: "Entretien - septembre 2026", montant: 612.40, statut: "due", echeance: dOff(9) }
        ],
        planning: [
          { d: dOff(1), t: "06:00", dur: "2 h", titre: "Entretien hebdomadaire - hall A & escaliers", rec: "Hebdomadaire" },
          { d: dOff(4), t: "09:00", dur: "3 h", titre: "Vitrerie - façade & entrée", rec: "Trimestriel" },
          { d: dOff(8), t: "06:00", dur: "2 h", titre: "Entretien hebdomadaire - hall A & escaliers", rec: "Hebdomadaire" }
        ],
        photos: [["copro", "Hall A - après remise en état"], ["chantier", "Parking - décapage en cours"], ["mops", "Entretien hebdomadaire en cours"], ["tri", "Local poubelles - tri sélectif installé"]],
        messages: [
          { from: "econet", txt: "Bonjour M. Lebreton ! L'intervention vitrerie est confirmée vendredi 9 h. L'équipe passera par l'entrée de service.", at: "Hier 14:32" },
          { from: "client", txt: "Parfait, le gardien sera prévenu. Pouvez-vous aussi regarder la tache dans l'ascenseur B ?", at: "Hier 15:04" },
          { from: "econet", txt: "C'est noté - on la traite vendredi, sans supplément 👍", at: "Hier 15:11" }
        ] },
      { id: "grondin", name: "Cabinet dentaire Grondin", contact: "Dr Grondin", site: "Saint-Denis · bionettoyage 3×/sem.",
        devis: [
          { id: "DEV-2026-048", titre: "Bionettoyage du cabinet - contrat annuel", date: dOff(-15), statut: "accepte",
            lignes: [["Bionettoyage 3 passages/semaine (46 sem.)", 138, 45]] }
        ],
        factures: [{ id: "FAC-2026-125", titre: "Bionettoyage - août 2026", montant: 517.50, statut: "payee", date: dOff(-20) }],
        planning: [{ d: dOff(2), t: "07:00", dur: "1 h 30", titre: "Bionettoyage du cabinet", rec: "3×/semaine" }],
        photos: [["medical", "Salle de soins - après bionettoyage"]],
        messages: [{ from: "client", txt: "Pouvez-vous décaler le passage de jeudi à 6 h 30 ?", at: "Hier 09:12" }] },
      { id: "mairie", name: "Mairie annexe - Le Port", contact: "Service technique", site: "Le Port · gymnase + école",
        devis: [
          { id: "DEV-2026-051", titre: "Remise en état du gymnase", date: dOff(-4), statut: "attente",
            lignes: [["Décapage et métallisation du sol sportif", 1, 1450]] }
        ],
        factures: [],
        planning: [{ d: dOff(6), t: "08:00", dur: "4 h", titre: "Visite technique du gymnase", rec: "Ponctuel" }],
        photos: [["collectivites", "Couloir de l'école - entretien"]],
        messages: [] },
      { id: "horizon", name: "SARL Horizon Bureaux", contact: "Mme Payet", site: "Sainte-Marie · bureaux 2×/sem.",
        devis: [],
        factures: [{ id: "FAC-2026-129", titre: "Entretien bureaux - août 2026", montant: 389.90, statut: "due", echeance: dOff(3) }],
        planning: [{ d: dOff(1), t: "18:30", dur: "1 h 30", titre: "Entretien des bureaux", rec: "2×/semaine" }],
        photos: [["commercial", "Open space - entretien du soir"]],
        messages: [] }
    ]};
  }
  var ptMem = null;
  function ptRead(){
    if (ptMem) return ptMem;
    try { var raw = localStorage.getItem(PT_KEY); if (raw) { ptMem = JSON.parse(raw); return ptMem; } } catch(e){}
    ptMem = portalSeed();
    try { localStorage.setItem(PT_KEY, JSON.stringify(ptMem)); } catch(e){}
    return ptMem;
  }
  function ptWrite(data){
    ptMem = data;
    try { localStorage.setItem(PT_KEY, JSON.stringify(data)); } catch(e){}
    renderClient(); renderClients(); renderDevisAdmin();
  }
  function ptClientById(id){ return ptRead().clients.find(function(c){ return c.id === id; }); }
  function ptClient(){ return ptClientById("alizes"); }
  function devisOwner(id){
    var cls = ptRead().clients;
    for (var i = 0; i < cls.length; i++) {
      var d = cls[i].devis.find(function(x){ return x.id === id; });
      if (d) return { d: d, cl: cls[i] };
    }
    return null;
  }
  function allDevis(){
    var out = [];
    ptRead().clients.forEach(function(c){ c.devis.forEach(function(d){ out.push({ d: d, cl: c }); }); });
    return out;
  }
  function devisTotals(lignes){
    var ht = 0;
    lignes.forEach(function(l){ ht += (+l[1] || 0) * (+l[2] || 0); });
    var tva = ht * 0.085;
    return { ht: ht, tva: tva, ttc: ht + tva };
  }
  function phSrc(ph){ return ph[0] && ph[0].indexOf("data:") === 0 ? ph[0] : IMGS[ph[0]]; }

  /* ----- modal devis ----- */
  var mv = document.getElementById("mv");
  function openDevis(id){
    var o = devisOwner(id);
    if (!o) return;
    var d = o.d, t = devisTotals(d.lignes);
    var rows = d.lignes.map(function(l){
      return "<tr><td>" + l[0] + "</td><td class='num'>" + l[1] + "</td><td class='num'>" + eur(+l[2]) + "</td><td class='num'>" + eur(l[1]*l[2]) + "</td></tr>";
    }).join("");
    document.getElementById("mv-body").innerHTML =
      "<p class='eyebrow'>Devis " + d.id + " · " + fmtD2(d.date) + " · " + o.cl.name + "</p>" +
      "<h2 style='font-size:22px;margin-top:10px'>" + d.titre + "</h2>" +
      "<table class='dv-table'><thead><tr><th>Désignation</th><th style='text-align:right'>Qté</th><th style='text-align:right'>PU HT</th><th style='text-align:right'>Total HT</th></tr></thead><tbody>" + rows + "</tbody></table>" +
      "<div class='dv-tot'><div><span>Total HT</span><b>" + eur(t.ht) + "</b></div>" +
      "<div><span>TVA 8,5 % (La Réunion)</span><b>" + eur(t.tva) + "</b></div>" +
      "<div class='ttc'><span>Total TTC</span><b>" + eur(t.ttc) + "</b></div></div>" +
      (d.statut === "attente"
        ? "<div style='display:flex;gap:10px;flex-wrap:wrap'><button class='btn btn-p' style='flex:1' data-accept='" + d.id + "'>Accepter le devis</button><button class='btn btn-o' data-pdf='" + d.id + "'>Télécharger le PDF</button></div><p class='admin-note' style='text-align:center'>Signature électronique sur le site final - ceci est une démo.</p>"
        : "<div style='display:flex;gap:12px;align-items:center;flex-wrap:wrap'><span class='st-chip ok'>Devis accepté</span><button class='btn btn-o' data-pdf='" + d.id + "'>Télécharger le PDF</button></div>");
    mv.hidden = false;
  }
  document.getElementById("mv-x").addEventListener("click", function(){ mv.hidden = true; });
  mv.addEventListener("click", function(e){ if (e.target === mv) mv.hidden = true; });
  document.getElementById("mv-body").addEventListener("click", function(e){
    var el = e.target.closest("[data-accept]");
    if (!el) return;
    var o = devisOwner(el.dataset.accept);
    if (o) { o.d.statut = "accepte"; ptWrite(ptRead()); mv.hidden = true; notify("Devis accepté - EcoNet est prévenu et planifie l'intervention (démo) ✅"); }
  });

  /* ----- espace client (compte démo : Les Alizés) ----- */
  function clAuthed(){ try { return sessionStorage.getItem("econet_client") === "1"; } catch(e){ return false; } }
  function renderClient(){
    var page = document.querySelector('[data-page="client"]');
    if (!page || !page.classList.contains("on")) return;
    var ok = clAuthed();
    document.getElementById("cl-gate").style.display = ok ? "none" : "";
    document.getElementById("cl-app").style.display = ok ? "" : "none";
    if (!ok) return;
    var c = ptClient();
    document.getElementById("cl-name").textContent = "Bonjour, " + c.name + " 👋";
    document.getElementById("cl-site").textContent = c.contact + " · " + c.site;
    var due = c.factures.find(function(f){ return f.statut === "due"; });
    document.getElementById("cl-remind").innerHTML = due
      ? "<div class='cl-remind'>⏰ Rappel : la facture <b>&nbsp;" + due.id + "&nbsp;</b> (" + eur(due.montant) + ") arrive à échéance le <b>&nbsp;" + fmtD2(due.echeance) + "</b>.</div>"
      : "";
    document.getElementById("cl-plan-n").textContent = c.planning.length;
    document.getElementById("cl-plan").innerHTML = c.planning.map(function(i){
      var dt = i.d.split("-");
      return "<div class='plan-item'><div class='pd'><b>" + dt[2] + "</b><span>" + MOISN[+dt[1]-1] + "</span></div>" +
        "<div class='pi-t'><b>" + i.titre + "</b><span>" + i.t + " · " + i.dur + "</span></div>" +
        "<span class='rec'>" + i.rec + "</span></div>";
    }).join("");
    var att = c.devis.filter(function(d){ return d.statut === "attente"; }).length;
    document.getElementById("cl-devis-n").textContent = att ? att + " à signer" : c.devis.length;
    document.getElementById("cl-devis").innerHTML = c.devis.map(function(d){
      var t = devisTotals(d.lignes);
      return "<div class='doc-row'><span class='dr-t'><b>" + d.titre + "</b><span>" + d.id + " · " + fmtD2(d.date) + "</span></span>" +
        "<span class='dr-m'>" + eur(t.ttc) + "</span>" +
        "<span class='st-chip " + (d.statut === "accepte" ? "ok'>Accepté" : "wait'>À signer") + "</span>" +
        "<span class='doc-act' data-devis='" + d.id + "'>Voir le devis</span>" +
        "<span class='doc-act' data-pdf='" + d.id + "'>PDF ⬇</span></div>";
    }).join("");
    document.getElementById("cl-fact").innerHTML = c.factures.map(function(f){
      return "<div class='doc-row'><span class='dr-t'><b>" + f.titre + "</b><span>" + f.id + "</span></span>" +
        "<span class='dr-m'>" + eur(f.montant) + "</span>" +
        "<span class='st-chip " + (f.statut === "payee" ? "ok'>Payée" : "due'>Échéance " + fmtD2(f.echeance)) + "</span>" +
        (f.statut === "due" ? "<span class='doc-act' data-pay='" + f.id + "'>Payer en ligne</span>" : "") + "</div>";
    }).join("");
    document.getElementById("cl-photos").innerHTML = c.photos.map(function(ph){
      return "<figure><img src='" + phSrc(ph) + "' alt='" + ph[1] + "'><figcaption>" + ph[1] + "</figcaption></figure>";
    }).join("");
    var chat = document.getElementById("cl-chat");
    chat.innerHTML = c.messages.map(function(m){
      return "<div class='msg " + m.from + "'>" + m.txt + "<small>" + (m.from === "econet" ? "EcoNet · " : "Vous · ") + m.at + "</small></div>";
    }).join("");
    chat.scrollTop = chat.scrollHeight;
  }
  document.getElementById("cl-go").addEventListener("click", clTry);
  document.getElementById("cl-pin").addEventListener("keydown", function(e){ if (e.key === "Enter") clTry(); });
  function clTry(){
    if (document.getElementById("cl-pin").value === "2024") {
      try { sessionStorage.setItem("econet_client", "1"); } catch(e){}
      renderClient();
      notify("Bienvenue dans votre espace, M. Lebreton 👋");
    } else {
      notify("Code incorrect - pour la démo : 2024");
    }
  }
  document.getElementById("cl-app").addEventListener("click", function(e){
    var el;
    if ((el = e.target.closest("[data-devis]"))) openDevis(el.dataset.devis);
    else if ((el = e.target.closest("[data-pay]"))) notify("Paiement en ligne branché à la mise en production (CB / prélèvement) - démo");
  });
  document.getElementById("cl-send").addEventListener("click", function(){
    var inp = document.getElementById("cl-msg");
    var txt = inp.value.trim();
    if (!txt) return;
    var c = ptClient();
    c.messages.push({ from: "client", txt: txt, at: "À l'instant" });
    inp.value = "";
    ptWrite(ptRead());
  });

  /* ----- back-office : vues ----- */
  var AV = "dash";
  try { AV = sessionStorage.getItem("econet_av") || "dash"; } catch(e){}
  function applyView(){
    document.querySelectorAll("#admin-app .aview").forEach(function(v){ v.hidden = v.dataset.view !== AV; });
    document.querySelectorAll("#admin-app .av-tab").forEach(function(b){ b.classList.toggle("on", b.dataset.av === AV); });
  }
  document.getElementById("admin-app").addEventListener("click", function(e){
    var tab = e.target.closest(".av-tab");
    if (tab) {
      AV = tab.dataset.av;
      try { sessionStorage.setItem("econet_av", AV); } catch(err){}
      applyView();
    }
  });

  /* ----- vue Clients : portefeuille + fiche ----- */
  var FICHE_ID = null;
  function renderClients(){
    var list = document.getElementById("cl-list");
    if (!list) return;
    var p = ptRead();
    document.getElementById("cl-count").textContent = p.clients.length;
    list.innerHTML = p.clients.map(function(c){
      var att = c.devis.filter(function(d){ return d.statut === "attente"; }).length;
      var due = c.factures.filter(function(f){ return f.statut === "due"; }).length;
      var aRepondre = c.messages.length && c.messages[c.messages.length - 1].from === "client";
      return "<button class='client-row' data-fiche='" + c.id + "'>" +
        "<span class='av'>" + initiales(c.name) + "</span>" +
        "<span class='cr-t'><b>" + c.name + "</b><span>" + c.contact + " · " + c.site + "</span></span>" +
        "<span class='cr-badges'>" +
        (att ? "<span class='st-chip wait'>" + att + " devis à signer</span>" : "") +
        (due ? "<span class='st-chip due'>" + due + " facture" + (due > 1 ? "s" : "") + " à encaisser</span>" : "") +
        (aRepondre ? "<span class='st-chip ok'>💬 à répondre</span>" : "") +
        "</span><span class='cr-go'>›</span></button>";
    }).join("");
    document.getElementById("cl-listwrap").hidden = !!FICHE_ID;
    document.getElementById("fc-detail").hidden = !FICHE_ID;
    if (FICHE_ID) renderFiche(FICHE_ID);
  }
  function renderFiche(cid){
    var c = ptClientById(cid);
    if (!c) { FICHE_ID = null; return; }
    document.getElementById("fc-detail").dataset.cid = cid;
    document.getElementById("fc-name").textContent = c.name;
    document.getElementById("fc-photos").innerHTML = c.photos.map(function(ph, i){
      return "<figure><img src='" + phSrc(ph) + "' alt=''><figcaption>" + ph[1] + "</figcaption><button class='ph-del' data-delphoto='" + i + "' aria-label='Retirer la photo'>✕</button></figure>";
    }).join("") || "<p class='admin-note'>Aucune photo pour l'instant.</p>";
    document.getElementById("fc-fact").innerHTML = c.factures.map(function(f, i){
      return "<div class='doc-row'><span class='dr-t'><b>" + f.titre + "</b><span>" + f.id + "</span></span>" +
        "<span class='dr-m'>" + eur(f.montant) + "</span>" +
        "<span class='st-chip " + (f.statut === "payee" ? "ok'>Payée" : "due'>Échéance " + fmtD2(f.echeance)) + "</span>" +
        (f.statut === "due" ? "<span class='doc-act' data-payer='" + i + "'>Marquer payée</span>" : "") + "</div>";
    }).join("") || "<p class='admin-note'>Aucune facture.</p>";
    var chat = document.getElementById("fc-chat");
    chat.innerHTML = c.messages.map(function(m){
      return "<div class='msg " + (m.from === "econet" ? "client" : "econet") + "'>" + m.txt +
        "<small>" + (m.from === "econet" ? "Vous (EcoNet) · " : c.contact + " · ") + m.at + "</small></div>";
    }).join("") || "<p class='admin-note'>Aucun échange pour l'instant.</p>";
    chat.scrollTop = chat.scrollHeight;
  }
  function ficheClient(){ return ptClientById(document.getElementById("fc-detail").dataset.cid); }
  document.getElementById("admin-app").addEventListener("click", function(e){
    var el;
    if ((el = e.target.closest("[data-fiche]"))) { FICHE_ID = el.dataset.fiche; renderClients(); }
    else if (e.target.closest("#fc-back")) { FICHE_ID = null; renderClients(); }
    else if ((el = e.target.closest("[data-delphoto]"))) {
      var c = ficheClient();
      c.photos.splice(+el.dataset.delphoto, 1);
      ptWrite(ptRead());
      notify("Photo retirée de l'espace client");
    } else if ((el = e.target.closest("[data-payer]"))) {
      var c2 = ficheClient();
      c2.factures[+el.dataset.payer].statut = "payee";
      ptWrite(ptRead());
      notify("Facture marquée payée ✅");
    }
  });
  document.getElementById("fc-send").addEventListener("click", function(){
    var inp = document.getElementById("fc-msg");
    var txt = inp.value.trim();
    if (!txt) return;
    ficheClient().messages.push({ from: "econet", txt: txt, at: "À l'instant" });
    inp.value = "";
    ptWrite(ptRead());
    notify("Réponse envoyée au client ✅");
  });
  document.getElementById("fc-msg").addEventListener("keydown", function(e){
    if (e.key === "Enter") document.getElementById("fc-send").click();
  });
  document.getElementById("fc-fact-add").addEventListener("click", function(){
    var titre = document.getElementById("fc-f-titre").value.trim();
    var montant = parseFloat(String(document.getElementById("fc-f-montant").value).replace(",", "."));
    if (!titre || !(montant > 0)) { notify("Indiquez l'objet et le montant de la facture."); return; }
    var ech = new Date(); ech.setDate(ech.getDate() + 30);
    var totalFact = 0;
    ptRead().clients.forEach(function(c){ totalFact += c.factures.length; });
    ficheClient().factures.push({ id: "FAC-2026-" + (140 + totalFact), titre: titre, montant: montant, statut: "due", echeance: isoD(ech) });
    ptWrite(ptRead());
    document.getElementById("fc-f-titre").value = "";
    document.getElementById("fc-f-montant").value = "";
    notify("Facture émise - visible dans l'espace client, avec rappel d'échéance ✅");
  });
  var fcFile = document.getElementById("fc-photo-file");
  fcFile.addEventListener("change", function(){
    var f = fcFile.files && fcFile.files[0];
    if (!f) return;
    var rd = new FileReader();
    rd.onload = function(){
      var img = new Image();
      img.onload = function(){
        var MAX = 800;
        var k = Math.min(1, MAX / Math.max(img.width, img.height));
        var c = document.createElement("canvas");
        c.width = Math.round(img.width * k);
        c.height = Math.round(img.height * k);
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        var url = c.toDataURL("image/jpeg", 0.72);
        var cap = (document.getElementById("fc-photo-cap").value || "").trim() || ("Photo du " + fmtD2(isoD(new Date())));
        ficheClient().photos.push([url, cap]);
        try { ptWrite(ptRead()); notify("Photo ajoutée - visible dans l'espace client 📷"); }
        catch(e){ notify("Stockage local plein : supprimez une photo avant d'en ajouter (limite de la démo)."); }
        document.getElementById("fc-photo-cap").value = "";
        fcFile.value = "";
      };
      img.src = rd.result;
    };
    rd.readAsDataURL(f);
  });

  /* ----- vue Devis : créateur multi-clients + liste globale ----- */
  function dvLineHTML(des, q, pu){
    return "<div class='dv-line'><input class='dv-des' placeholder='Désignation' value=\"" + (des || "") + "\">" +
      "<input class='dv-q' type='number' min='1' value='" + (q || 1) + "'>" +
      "<input class='dv-pu' type='number' min='0' step='0.5' placeholder='€' value='" + (pu || "") + "'>" +
      "<button class='rm' aria-label='Supprimer la ligne'>✕</button></div>";
  }
  function dvLines(){
    return Array.prototype.map.call(document.querySelectorAll("#dv-lines .dv-line"), function(row){
      return [row.querySelector(".dv-des").value.trim(), +row.querySelector(".dv-q").value || 0, +row.querySelector(".dv-pu").value || 0];
    }).filter(function(l){ return l[0] && l[1] > 0 && l[2] > 0; });
  }
  function dvTotalsRender(){
    var t = devisTotals(dvLines());
    document.getElementById("dv-tot").innerHTML =
      "<div><span>Total HT</span><b>" + eur(t.ht) + "</b></div>" +
      "<div><span>TVA 8,5 %</span><b>" + eur(t.tva) + "</b></div>" +
      "<div class='ttc'><span>Total TTC</span><b>" + eur(t.ttc) + "</b></div>";
  }
  function renderDevisAdmin(){
    var list = document.getElementById("dv-list");
    if (!list) return;
    var sel = document.getElementById("dv-client");
    var cur = sel.value;
    sel.innerHTML = ptRead().clients.map(function(c){
      return "<option value='" + c.id + "'>" + c.name + "</option>";
    }).join("");
    if (cur) sel.value = cur;
    list.innerHTML = allDevis().map(function(o){
      var t = devisTotals(o.d.lignes);
      return "<div class='doc-row'><span class='dr-t'><b>" + o.d.titre + "</b><span>" + o.d.id + " · " + o.cl.name + "</span></span>" +
        "<span class='dr-m'>" + eur(t.ttc) + "</span>" +
        "<span class='st-chip " + (o.d.statut === "accepte" ? "ok'>Accepté" : "wait'>En attente") + "</span>" +
        "<span class='doc-act' data-pdf='" + o.d.id + "'>PDF ⬇</span></div>";
    }).join("");
  }
  var dvWrap = document.getElementById("dv-lines");
  dvWrap.innerHTML = dvLineHTML("", 1, "");
  dvTotalsRender();
  document.getElementById("dv-add").addEventListener("click", function(){
    dvWrap.insertAdjacentHTML("beforeend", dvLineHTML("", 1, ""));
  });
  dvWrap.addEventListener("input", dvTotalsRender);
  dvWrap.addEventListener("click", function(e){
    if (e.target.closest(".rm") && dvWrap.children.length > 1) { e.target.closest(".dv-line").remove(); dvTotalsRender(); }
  });
  document.getElementById("dv-send").addEventListener("click", function(){
    var titre = document.getElementById("dv-titre").value.trim();
    var lignes = dvLines();
    var cl = ptClientById(document.getElementById("dv-client").value);
    if (!titre) { notify("Donnez un objet au devis."); return; }
    if (!lignes.length) { notify("Ajoutez au moins une ligne complète (désignation, quantité, prix)."); return; }
    if (!cl) { notify("Sélectionnez un client."); return; }
    cl.devis.push({ id: "DEV-2026-0" + (53 + allDevis().length), titre: titre, date: isoD(new Date()), statut: "attente", lignes: lignes });
    ptWrite(ptRead());
    document.getElementById("dv-titre").value = "";
    dvWrap.innerHTML = dvLineHTML("", 1, "");
    dvTotalsRender();
    notify("Devis envoyé à " + cl.name + " - visible dans son espace client ✅");
  });

  /* sync live du portail entre onglets */
  addEventListener("storage", function(e){
    if (e.key !== PT_KEY || !e.newValue) return;
    function totalMsgs(p){ var n = 0; (p && p.clients || []).forEach(function(c){ n += c.messages.length; }); return n; }
    var before = totalMsgs(ptMem);
    try { ptMem = JSON.parse(e.newValue); } catch(err){ return; }
    var adminOn2 = document.querySelector('[data-page="admin"]').classList.contains("on");
    if (adminOn2 && totalMsgs(ptMem) > before) notify("💬 Nouveau message client dans le portefeuille");
    renderClient(); renderClients(); renderDevisAdmin();
  });

  /* ----- PDF du devis (jsPDF + capability downloads) ----- */
  function logoJpeg(){
    try {
      var img = document.querySelector(".logo-link img");
      if (!img || !img.naturalWidth) return null;
      var c = document.createElement("canvas");
      c.width = img.naturalWidth; c.height = img.naturalHeight;
      var x = c.getContext("2d");
      x.fillStyle = "#EFF6E4";
      x.fillRect(0, 0, c.width, c.height);
      x.drawImage(img, 0, 0);
      var k = Math.round(c.width * 0.13);
      x.fillStyle = "#EFF6E4";
      x.fillRect(0, 0, k, k);
      x.fillRect(c.width - k, 0, k, k);
      x.fillRect(0, c.height - k, k, k);
      x.fillRect(c.width - k, c.height - k, k, k);
      return c.toDataURL("image/jpeg", 0.92);
    } catch(e){ return null; }
  }
  function devisPDF(d, cl){
    var JS = window.jspdf && window.jspdf.jsPDF;
    if (!JS) return null;
    var doc = new JS({ unit: "mm", format: "a4" });
    var GREEN = [125,182,63], GDARK = [63,122,46], INK = [27,42,33], MUT = [92,112,98], PALE = [239,246,228], LINE = [211,224,203];
    var W = 210, ML = 18, MR = 192;

    /* bandeau */
    doc.setFillColor(PALE[0],PALE[1],PALE[2]);
    doc.rect(0, 0, W, 44, "F");
    var lj = logoJpeg();
    if (lj) doc.addImage(lj, "JPEG", ML, 8, 28, 28);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(INK[0],INK[1],INK[2]);
    doc.setFontSize(27);
    doc.text("DEVIS", MR, 19, {align:"right"});
    doc.setFontSize(10.5);
    doc.setTextColor(MUT[0],MUT[1],MUT[2]);
    doc.setFont("helvetica", "normal");
    doc.text(d.id + "  ·  émis le " + fmtD2(d.date), MR, 26, {align:"right"});
    doc.text("Valable 30 jours", MR, 31.5, {align:"right"});

    /* émetteur */
    var y = 56;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11.5);
    doc.setTextColor(INK[0],INK[1],INK[2]);
    doc.text("EcoNet 974", ML, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(MUT[0],MUT[1],MUT[2]);
    doc.text(["Nettoyage professionnel écoresponsable", "Sylvain Dalleau - Directeur", "0693 85 68 99 · econet974@gmail.com", "Île de La Réunion"], ML, y + 6, {lineHeightFactor: 1.5});

    /* client */
    doc.setFillColor(231,244,251);
    doc.roundedRect(112, 48, 80, 33, 3, 3, "F");
    doc.setFontSize(8);
    doc.setTextColor(10,111,163);
    doc.setFont("helvetica", "bold");
    doc.text("ADRESSÉ À", 118, 55);
    doc.setFontSize(10.5);
    doc.setTextColor(INK[0],INK[1],INK[2]);
    doc.text(cl.name, 118, 61.5);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(MUT[0],MUT[1],MUT[2]);
    doc.text(doc.splitTextToSize(cl.contact + "\n" + cl.site, 68), 118, 67, {lineHeightFactor: 1.45});

    /* objet */
    y = 92;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(INK[0],INK[1],INK[2]);
    doc.text(doc.splitTextToSize("Objet : " + d.titre, 174), ML, y);

    /* tableau */
    y += 10;
    var C = { des: ML, q: 128, pu: 158, tot: MR };
    doc.setFillColor(GREEN[0],GREEN[1],GREEN[2]);
    doc.rect(ML - 2, y - 5.5, 178, 8.5, "F");
    doc.setTextColor(255,255,255);
    doc.setFontSize(8.5);
    doc.text("DÉSIGNATION", C.des + 1, y);
    doc.text("QTÉ", C.q, y, {align:"right"});
    doc.text("PU HT", C.pu, y, {align:"right"});
    doc.text("TOTAL HT", C.tot, y, {align:"right"});
    y += 8;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    d.lignes.forEach(function(l, i){
      var lines = doc.splitTextToSize(String(l[0]), 100);
      var rh = Math.max(8, lines.length * 4.6 + 3.5);
      if (i % 2 === 1) {
        doc.setFillColor(250,252,247);
        doc.rect(ML - 2, y - 4.5, 178, rh, "F");
      }
      doc.setTextColor(INK[0],INK[1],INK[2]);
      doc.text(lines, C.des + 1, y);
      doc.setTextColor(MUT[0],MUT[1],MUT[2]);
      doc.text(String(l[1]), C.q, y, {align:"right"});
      doc.text(eur(+l[2]), C.pu, y, {align:"right"});
      doc.setTextColor(INK[0],INK[1],INK[2]);
      doc.text(eur(l[1] * l[2]), C.tot, y, {align:"right"});
      y += rh;
      doc.setDrawColor(LINE[0],LINE[1],LINE[2]);
      doc.setLineWidth(.25);
      doc.line(ML - 2, y - 4.2, MR, y - 4.2);
    });

    /* totaux */
    var t = devisTotals(d.lignes);
    y += 4;
    doc.setFillColor(250,252,247);
    doc.roundedRect(118, y - 4, 74, 26, 2.5, 2.5, "F");
    doc.setFontSize(9.5);
    doc.setTextColor(MUT[0],MUT[1],MUT[2]);
    doc.text("Total HT", 123, y + 2);
    doc.text(eur(t.ht), 187, y + 2, {align:"right"});
    doc.text("TVA 8,5 % (La Réunion)", 123, y + 8);
    doc.text(eur(t.tva), 187, y + 8, {align:"right"});
    doc.setDrawColor(LINE[0],LINE[1],LINE[2]);
    doc.line(123, y + 11.5, 187, y + 11.5);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11.5);
    doc.setTextColor(GDARK[0],GDARK[1],GDARK[2]);
    doc.text("Total TTC", 123, y + 18);
    doc.text(eur(t.ttc), 187, y + 18, {align:"right"});

    /* conditions + pied */
    y += 34;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.2);
    doc.setTextColor(MUT[0],MUT[1],MUT[2]);
    doc.text(doc.splitTextToSize("Conditions : devis gratuit et sans engagement. Acompte de 30 % à la commande, solde à 30 jours. Produits écolabellisés inclus. Assurance responsabilité civile professionnelle. Bon pour accord : signature précédée de la mention « lu et approuvé ».", 174), ML, y, {lineHeightFactor: 1.5});
    doc.setFillColor(PALE[0],PALE[1],PALE[2]);
    doc.rect(0, 281, W, 16, "F");
    doc.setFontSize(8.5);
    doc.setTextColor(GDARK[0],GDARK[1],GDARK[2]);
    doc.setFont("helvetica", "bold");
    doc.text("EcoNet 974 - Le propre, naturellement.", W / 2, 287.5, {align:"center"});
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.2);
    doc.setTextColor(MUT[0],MUT[1],MUT[2]);
    doc.text("Document de démonstration - maquette VANTURA · contenus d'exemple · SIRET et mentions à compléter", W / 2, 292.5, {align:"center"});
    return doc;
  }
  window.__pdfTest = function(){
    var c0 = ptRead().clients[0];
    var doc = devisPDF(c0.devis[0], c0);
    return doc ? doc.output("arraybuffer") : null;
  };
  var pdfBusy = false;
  function downloadDevis(id){
    if (pdfBusy) return;
    var o = devisOwner(id);
    if (!o) return;
    var d = o.d;
    var doc = devisPDF(d, o.cl);
    if (!doc) { notify("Génération PDF indisponible (bibliothèque non chargée)."); return; }
    var blob = doc.output("blob");
    var filename = d.id + ".pdf";
    pdfBusy = true;
    (async function(){
      try {
        if (window.claude && typeof window.claude.use === "function") {
          var dl = await window.claude.use("downloads");
          if (dl) {
            try {
              await dl.save({ filename: filename, data: blob });
              notify("Devis " + d.id + " enregistré en PDF ✅");
            } catch(err) {
              if (err && err.code === "declined") notify("Téléchargement annulé.");
              else if (err && err.code === "rate_limited") notify("Une demande est déjà ouverte - réessayez dans un instant.");
              else notify("Téléchargement indisponible dans cette vue.");
            }
          } else {
            notify("Téléchargement indisponible dans cette vue.");
          }
        } else {
          var a = document.createElement("a");
          a.href = URL.createObjectURL(blob);
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          a.remove();
          setTimeout(function(){ URL.revokeObjectURL(a.href); }, 4000);
          notify("Devis " + d.id + " téléchargé en PDF ✅");
        }
      } finally { pdfBusy = false; }
    })();
  }
  document.addEventListener("click", function(e){
    var el = e.target.closest("[data-pdf]");
    if (el) downloadDevis(el.dataset.pdf);
  });

  /* sync live du portail entre onglets */
  addEventListener("storage", function(e){
    if (e.key !== PT_KEY || !e.newValue) return;
    var beforeMsg = ptMem ? ptMem.messages.length : 0;
    try { ptMem = JSON.parse(e.newValue); } catch(err){ return; }
    var adminOn2 = document.querySelector('[data-page="admin"]').classList.contains("on");
    if (adminOn2 && ptMem.messages.length > beforeMsg) {
      var lm = ptMem.messages[ptMem.messages.length - 1];
      if (lm.from === "client") notify("💬 Nouveau message client : « " + lm.txt.slice(0, 60) + (lm.txt.length > 60 ? "…" : "") + " »");
    }
    renderClient(); renderDevisAdmin(); renderFiche();
  });

  /* ═════════ Effet waouh : GSAP + intro raclette ═════════ */
  var startHero = function(){};
  var saneView = innerHeight > 320 && innerHeight < 1400;
  var G = window.gsap;
  if (G && window.ScrollTrigger && !reduced && saneView) {
    G.registerPlugin(window.ScrollTrigger);

    startHero = function(){
      var tl = G.timeline({defaults:{ease:"power3.out"}});
      tl.from(".hero .eyebrow",{y:24,opacity:0,duration:.5})
        .from(".hero h1",{y:44,opacity:0,duration:.7},"-=.3")
        .from(".hero-sub",{y:30,opacity:0,duration:.6},"-=.45")
        .from(".hero-cta .btn",{y:24,opacity:0,stagger:.09,duration:.5},"-=.4")
        .from(".hero-chips span",{y:14,opacity:0,stagger:.06,duration:.4},"-=.35")
        .from(".hero-visual",{scale:.92,opacity:0,duration:.8,ease:"back.out(1.4)"},"-=.75")
        .from(".float-card",{y:26,opacity:0,stagger:.12,duration:.5,clearProps:"all"},"-=.4");
      setTimeout(function(){
        G.set(".hero .eyebrow,.hero h1,.hero-sub,.hero-cta .btn,.hero-chips span,.hero-visual,.float-card",{clearProps:"opacity,transform,visibility"});
      }, 4500);
    };

    /* histoire épinglée (desktop) */
    G.matchMedia().add("(min-width: 901px) and (max-height: 1300px)", function(){
      var story = document.querySelector(".story");
      var chaps = G.utils.toArray(".chap");
      var dots = document.querySelectorAll(".story-dots i");
      story.classList.add("pinned");
      G.set(chaps, {autoAlpha:0, y:24});
      G.set(chaps[0], {autoAlpha:1, y:0});
      function setDot(i){ dots.forEach(function(d,k){ d.classList.toggle("on", k===i); }); }
      var tl = G.timeline({
        scrollTrigger:{
          trigger:".story", start:"top top", end:"+=190%", pin:true, scrub:.6,
          onUpdate:function(self){ setDot(Math.min(2, Math.floor(self.progress*3))); }
        }
      });
      tl.to(chaps[0],{autoAlpha:0,y:-24,duration:.35},"+=.55")
        .fromTo(chaps[1],{autoAlpha:0,y:24},{autoAlpha:1,y:0,duration:.35})
        .to(chaps[1],{autoAlpha:0,y:-24,duration:.35},"+=.55")
        .fromTo(chaps[2],{autoAlpha:0,y:24},{autoAlpha:1,y:0,duration:.35})
        .to({},{duration:.45});
      G.to(".story-photo img",{yPercent:-9,ease:"none",
        scrollTrigger:{trigger:".story",start:"top bottom",end:"bottom top",scrub:true}});
      return function(){ story.classList.remove("pinned"); G.set(chaps,{clearProps:"all"}); };
    });

    /* boutons magnétiques */
    if (matchMedia("(pointer:fine)").matches) {
      document.querySelectorAll(".btn-p").forEach(function(btn){
        btn.addEventListener("pointermove", function(e){
          var r = btn.getBoundingClientRect();
          G.to(btn,{x:(e.clientX-r.left-r.width/2)*.16, y:(e.clientY-r.top-r.height/2)*.28, duration:.3});
        });
        btn.addEventListener("pointerleave", function(){
          G.to(btn,{x:0,y:0,duration:.5,ease:"elastic.out(1,.45)"});
        });
      });
    }

    /* les pages du routeur changent la hauteur -> recalage des triggers */
    addEventListener("hashchange", function(){ setTimeout(function(){ window.ScrollTrigger.refresh(); }, 80); });
  }

  /* photo de la section histoire (réutilise l'image déjà embarquée) */
  var storyImg = document.getElementById("story-img");
  if (storyImg) storyImg.src = IMGS.commercial;

  /* étincelles au curseur dans le hero */
  var heroEl = document.querySelector(".hero"), lastSpk = 0;
  if (heroEl && !reduced && matchMedia("(pointer:fine)").matches) {
    heroEl.addEventListener("pointermove", function(e){
      var now = Date.now();
      if (now - lastSpk < 75) return;
      lastSpk = now;
      var s = document.createElement("span");
      s.className = "spk";
      var r = heroEl.getBoundingClientRect();
      s.style.left = (e.clientX - r.left + (Math.random()*16-8)) + "px";
      s.style.top = (e.clientY - r.top + (Math.random()*16-8)) + "px";
      heroEl.appendChild(s);
      setTimeout(function(){ s.remove(); }, 760);
    });
  }

  /* intro de nettoyage : passes de chiffon */
  (function(){
    var ld = document.getElementById("loader");
    if (!ld) { startHero(); return; }
    if (reduced || !saneView || location.hash.indexOf("admin") >= 0) { ld.remove(); setTimeout(startHero, 60); return; }
    var logo = document.querySelector(".logo-link img");
    if (logo) ld.querySelector(".ld-logo").src = logo.src;
    document.documentElement.classList.add("ld-lock");
    var stage = ld.querySelector(".ld-stage");
    for (var i = 0; i < 6; i++) {
      var b = document.createElement("span");
      b.className = "ld-bub";
      var s = 10 + Math.random()*22;
      b.style.width = b.style.height = s + "px";
      b.style.left = (18 + Math.random()*64) + "%";
      b.style.top = (16 + Math.random()*64) + "%";
      b.style.animationDelay = (2.0 + Math.random()*.6) + "s";
      stage.appendChild(b);
    }
    var doneCalled = false, raf = 0;
    function done(){
      if (doneCalled) return;
      doneCalled = true;
      cancelAnimationFrame(raf);
      ld.classList.add("ld-out");
      document.documentElement.classList.remove("ld-lock");
      setTimeout(function(){ ld.classList.add("ld-gone"); dispatchEvent(new Event("introdone")); }, 700);
      setTimeout(startHero, 250);
    }
    ld.querySelector(".ld-skip").addEventListener("click", done);

    var cv = document.getElementById("ldCanvas");
    var cloth = document.getElementById("ldCloth");
    if (!cv || !cloth || !cv.getContext) {
      ld.remove();
      document.documentElement.classList.remove("ld-lock");
      setTimeout(startHero, 60);
      return;
    }

    /* ----- moteur chiffon : la crasse est un canvas, le chiffon la gomme ----- */
    var ctx = cv.getContext("2d");
    var dpr = Math.min(1.5, window.devicePixelRatio || 1);
    var W = innerWidth, H = innerHeight;
    cv.width = Math.round(W * dpr);
    cv.height = Math.round(H * dpr);

    (function paintDirt(){
      var w = cv.width, h = cv.height;
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(226,224,214,0.94)";
      ctx.fillRect(0, 0, w, h);
      var g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, "rgba(120,108,86,0.20)");
      g.addColorStop(1, "rgba(94,84,64,0.34)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
      for (var i = 0; i < 420; i++) {
        var x = Math.random() * w, y = Math.random() * h, r = (1 + Math.random() * 4) * dpr;
        ctx.fillStyle = "rgba(70,60,44," + (0.04 + Math.random() * 0.10).toFixed(3) + ")";
        ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill();
      }
      ctx.strokeStyle = "rgba(80,70,52,0.08)";
      ctx.lineWidth = 6 * dpr;
      for (var s = 0; s < 8; s++) {
        var x0 = Math.random() * w, y0 = Math.random() * h;
        ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0 + w * 0.2, y0 + h * 0.06); ctx.stroke();
      }
    })();

    var BR_X = Math.max(110, W * 0.14) * dpr;
    var BR_Y = Math.max(120, H * 0.20) * dpr;
    function stamp(x, y){
      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      ctx.translate(x * dpr, y * dpr);
      ctx.scale(BR_X, BR_Y);
      var g = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
      g.addColorStop(0, "rgba(0,0,0,1)");
      g.addColorStop(0.72, "rgba(0,0,0,0.95)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(0, 0, 1, 0, 6.283); ctx.fill();
      ctx.restore();
    }
    function streak(x, y, ang){
      ctx.save();
      ctx.globalCompositeOperation = "source-over";
      ctx.translate(x * dpr, y * dpr);
      ctx.rotate(ang);
      ctx.fillStyle = "rgba(96,86,66,0.055)";
      ctx.fillRect(-70 * dpr, (Math.random() * 2 - 1) * 22 * dpr, 140 * dpr, 2.2 * dpr);
      ctx.restore();
    }

    var strokes = [
      { x0: -0.15 * W, y0: 0.12 * H, x1: 1.15 * W, y1: 0.24 * H, bow: -0.05 * H },
      { x0: 1.15 * W,  y0: 0.46 * H, x1: -0.15 * W, y1: 0.58 * H, bow: 0.05 * H },
      { x0: -0.15 * W, y0: 0.80 * H, x1: 1.15 * W, y1: 0.92 * H, bow: -0.04 * H }
    ];
    var T_START = 520, DUR = 520, LIFT = 90;
    var t0 = null, lastP = null, lastStreak = 0, flying = false;

    function qpoint(s, t){
      var cx = (s.x0 + s.x1) / 2, cy = (s.y0 + s.y1) / 2 + s.bow;
      var u = 1 - t;
      return {
        x: u * u * s.x0 + 2 * u * t * cx + t * t * s.x1,
        y: u * u * s.y0 + 2 * u * t * cy + t * t * s.y1
      };
    }
    function placeCloth(p, ang, lifted){
      cloth.style.transform = "translate(" + (p.x - 66) + "px," + (p.y - 48) + "px) rotate(" + ang + "deg)" + (lifted ? " scale(1.08)" : "");
    }
    function frame(ts){
      if (!t0) t0 = ts;
      var e = ts - t0 - T_START;
      if (e < 0) { raf = requestAnimationFrame(frame); return; }
      var seg = DUR + LIFT;
      var idx = Math.min(2, Math.floor(e / seg));
      var local = e - idx * seg;
      var s = strokes[idx];
      if (local <= DUR) {
        var t = Math.min(1, local / DUR);
        t = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        var p = qpoint(s, t);
        var ahead = qpoint(s, Math.min(1, t + 0.02));
        var ang = Math.atan2(ahead.y - p.y, ahead.x - p.x);
        placeCloth(p, ang * 57.3 * 0.25 + Math.sin(ts / 60) * 3, false);
        if (lastP) {
          var dx = p.x - lastP.x, dy = p.y - lastP.y;
          var d = Math.sqrt(dx * dx + dy * dy), steps = Math.max(1, Math.ceil(d / 14));
          for (var k = 1; k <= steps; k++) stamp(lastP.x + dx * k / steps, lastP.y + dy * k / steps);
          lastStreak += d;
          if (lastStreak > 46) { lastStreak = 0; streak(p.x, p.y, ang); }
        } else {
          stamp(p.x, p.y);
        }
        lastP = p;
      } else {
        lastP = null;
        var nxt = strokes[Math.min(2, idx + 1)];
        var lt = Math.min(1, (local - DUR) / LIFT);
        placeCloth({ x: s.x1 + (nxt.x0 - s.x1) * lt, y: s.y1 + (nxt.y0 - s.y1) * lt }, 0, true);
      }
      if (e >= 3 * seg - LIFT) {
        if (!flying) {
          flying = true;
          cloth.style.transition = "transform .3s cubic-bezier(.5,0,.8,.4), opacity .3s";
          cloth.style.opacity = "0";
          placeCloth({ x: W + 220, y: H + 180 }, 40, true);
          cv.style.transition = "opacity .28s";
          cv.style.opacity = "0";
          setTimeout(done, 1340);
        }
        return;
      }
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    setTimeout(done, 4700);
  })();

  /* ----- Guide de defilement ----- */
  (function(){
    var sd = document.getElementById("scrollDown");
    if (!sd) return;
    function headerOffset(){
      var hd = document.querySelector("header.site");
      return (hd ? hd.offsetHeight : 0) + 14;
    }
    function nextTarget(){
      var pg = document.querySelector(".page.on");
      if (!pg) return null;
      var y = scrollY + headerOffset() + 12;
      var kids = pg.children;
      for (var i = 0; i < kids.length; i++) {
        var top = kids[i].getBoundingClientRect().top + scrollY;
        if (top > y + 40 && kids[i].offsetHeight > 60) return kids[i];
      }
      return null;
    }
    function update(){
      var nearBottom = scrollY + innerHeight >= document.body.scrollHeight - 160;
      var ld = document.getElementById("loader");
      var intro = ld && !ld.classList.contains("ld-gone") && ld.parentNode;
      sd.classList.toggle("off", !nextTarget() || nearBottom || !!intro);
    }
    sd.addEventListener("click", function(){
      var t = nextTarget();
      if (t) scrollTo({ top: t.getBoundingClientRect().top + scrollY - headerOffset() + 6, behavior: "smooth" });
      setTimeout(update, 600);
    });
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update, { passive: true });
    addEventListener("hashchange", function(){ setTimeout(update, 150); });
    addEventListener("introdone", function(){ setTimeout(update, 200); });
    setTimeout(update, 500);
    setTimeout(update, 4500);
  })();

  /* ----- Init ----- */
  route();
})();
