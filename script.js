// =====================
//  PAGE 1 -> PAGE 2  (Age-gate)
// =====================
(function () {
  'use strict';

  function showHero() {
    var gate = document.getElementById('agegate');
    var hero = document.getElementById('page2-hero');
    if (gate) gate.classList.add('is-hidden');
    if (hero) hero.classList.remove('is-hidden');
    document.body.classList.add('is-passed');
    try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (_) {}
  }

  function passAgeGate(e) {
    if (e && e.preventDefault) e.preventDefault();
    try { sessionStorage.setItem('ldr_agegate_passed', '1'); } catch (_) {}
    showHero();
  }

  // Expose en secours si besoin
  window.__passAgeGate = passAgeGate;

  function bindAgeGate() {
    // Si déjà passé pendant la session, ne pas ré-afficher
    try {
      if (sessionStorage.getItem('ldr_agegate_passed') === '1') {
        showHero();
        return;
      }
    } catch (_) {}

    var btn = document.getElementById('btnYes');
    if (btn) {
      btn.type = 'button';
      btn.addEventListener('click', passAgeGate);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindAgeGate);
  } else {
    bindAgeGate();
  }
})();


// =====================
//  FLOW (arborescence du quiz)
// =====================
// =====================
// FLOW (arborescence du quiz) — corrigé (intitulés alignés avec recipe.html)
// =====================
window.FLOW = {
  // ----- Q1
  q1: { id:"q1", title:"Cocktail avec ou sans alcool ?", options:[
    { label:"Sans alcool", value:"sans" },
    { label:"Avec alcool", value:"avec" }
  ], next:(v)=> (v==="sans" ? "q2_sans" : "q2_avec") },

  // ----- SANS -----
  q2_sans:{ id:"q2_sans", title:"Difficulté de la préparation ?", options:[
    { label:"Facile / rapide", value:"facile" },
    { label:"Élaborée", value:"elab" }
  ], next:(v)=> (v==="facile" ? "q3_sans_facile" : "q3_sans_elab") },

  q3_sans_facile:{ id:"q3_sans_facile", title:"Quel profil aromatique ?", options:[
    { label:"Acidulé / Agrume", value:"agrume" },
    { label:"Sucré / fruité",  value:"sucre" },
    { label:"Herbacé",         value:"herbace" },
    { label:"Épicé",           value:"epice" }
  ], resultMap:{
    agrume:"Tangy Tonic",
    sucre:"Virgin Bellini",
    herbace:"Virgin To",
    epice:"Ginger Lime"
  }},

  q3_sans_elab:{ id:"q3_sans_elab", title:"Quel profil aromatique ?", options:[
    { label:"Acidulé / Agrume", value:"agrume" },
    { label:"Sucré / fruité",  value:"sucre" },
    { label:"Herbacé",         value:"herbace" },
    { label:"Épicé",           value:"epice" }
  ], resultMap:{
    agrume:"Pa-no-ma",
    sucre:"Med Orchard",
    herbace:"Cucumber Collins",
    epice:"Ginger Spice"
  }},

  // ----- AVEC -----
  q2_avec:{ id:"q2_avec", title:"Difficulté de la préparation ?", options:[
    { label:"Facile / rapide", value:"facile" },
    { label:"Élaborée", value:"elab" }
  ], next:(v)=> (v==="facile" ? "q3_avec_facile" : "q3_avec_elab") },

  // AVEC + FACILE
  q3_avec_facile:{ id:"q3_avec_facile", title:"Quel profil aromatique ?", options:[
    { label:"Acidulé / Agrume", value:"agrume" },
    { label:"Sucré / fruité",  value:"sucre" },
    { label:"Herbacé",         value:"herbace" },
    { label:"Torréfié",        value:"torrefie" },
    { label:"Épicé",           value:"epice" }
  ], nextMap:{
    agrume:   { next:"q4_base_agrume_facile" },
    sucre:    { next:"q4_base_sucre_facile" },
    herbace:  { next:"q4_base_herbace_facile" },
    torrefie: { next:"q4_base_torrifie_facile" },
    epice:    { next:"q4_base_epice_facile" }
  }},

  // FACILE → AGRUME
  q4_base_agrume_facile:{ id:"q4_base_agrume_facile", title:"Base spiritueuse ?", options:[
    { label:"Gin", value:"gin" },
    { label:"Vodka", value:"vodka" },
    { label:"Whisky", value:"whisky" },
    { label:"Spiritueux à base de rhum", value:"rhum_base" }
  ], resultMap:{
    vodka:"Vodka Gimlet",
    gin:"Gimlet",
    whisky:"Whisky Sour",
    rhum_base:"Daiquiri"
  }},

  // FACILE → SUCRÉ
  q4_base_sucre_facile:{ id:"q4_base_sucre_facile", title:"Base spiritueuse ?", options:[
    { label:"Gin", value:"gin" },
    { label:"Whisky", value:"whisky" },
    { label:"Spiritueux à base de rhum", value:"rhum_base" }
  ], resultMap:{
    whisky:"Godfather",
    gin:"Pink Lady",
    rhum_base:"Cuba Libre"
  }},

  // FACILE → HERBACÉ
  q4_base_herbace_facile:{ id:"q4_base_herbace_facile", title:"Base spiritueuse ?", options:[
    { label:"Gin", value:"gin" },
    { label:"Whisky", value:"whisky" },
    { label:"Spiritueux à base de rhum", value:"rhum_base" }
  ], resultMap:{
    whisky:"Johnnie & Lemon",
    gin:"Gin Tonic",
    rhum_base:"Mojito"
  }},

  // FACILE → TORRÉFIÉ
  q4_base_torrifie_facile:{ id:"q4_base_torrifie_facile", title:"Base spiritueuse ?", options:[
    { label:"Whisky", value:"whisky" },
    { label:"Vodka", value:"vodka" }
  ], resultMap:{
    whisky:"Irish Coffee",
    vodka:"Espresso Martini"
  }},

  // FACILE → ÉPICÉ
  q4_base_epice_facile:{ id:"q4_base_epice_facile", title:"Base spiritueuse ?", options:[
    { label:"Rhum", value:"rhum" },
    { label:"Vodka", value:"vodka" },
    { label:"Whisky", value:"whisky" },
    { label:"Spiritueux à base de rhum", value:"rhum_base" }
  ], resultMap:{
    vodka:"Dutch Mule",
    rhum:"Dark & Stormy",
    whisky:"Irish Spice",
    rhum_base:"Ginger Spice"
  }},

  // AVEC + ÉLABORÉ
  q3_avec_elab:{ id:"q3_avec_elab", title:"Quel profil aromatique ?", options:[
    { label:"Acidulé / Agrume", value:"agrume" },
    { label:"Sucré / fruité",  value:"sucre" },
    { label:"Herbacé",         value:"herbace" },
    { label:"Torréfié",        value:"torrefie" },
    { label:"Épicé",           value:"epice" },
    { label:"Onctueux",        value:"onctueux" }
  ], nextMap:{
    agrume:{ next:"q4_base_agrume_elab" },
    sucre:{ next:"q4_base_sucre_elab" },
    herbace:{ next:"q4_base_herbace_elab" },
    torrefie:{ next:"q4_base_torrifie_elab" },
    epice:{ next:"q4_base_epice_elab" },
    onctueux:{ next:"q4_onctueux" }
  }},

  // ÉLAB → AGRUME (avec Q5)
  q4_base_agrume_elab:{ id:"q4_base_agrume_elab", title:"Base spiritueuse ?", options:[
    { label:"Gin", value:"gin" },
    { label:"Vodka", value:"vodka" },
    { label:"Whisky", value:"whisky" },
    { label:"Tequila", value:"tequila" }
  ], nextMap:{
    vodka:{ result:"Grapefruit Sour" },
    gin:{ next:"q5_gin_agrume" },
    whisky:{ result:"Penicillin" },
    tequila:{ next:"q5_tequila_agrume" }
  }},

  q5_gin_agrume:{ id:"q5_gin_agrume", title:"Plutôt Orange de Séville ou Pamplemousse ?", options:[
    { label:"Orange de Séville", value:"sevilla" },
    { label:"Pamplemousse", value:"pamplemousse" }
  ], resultMap:{
    sevilla:"Sevilla Spritz",
    pamplemousse:"Pink Grapefruit Collins"
  }},

  q5_tequila_agrume:{ id:"q5_tequila_agrume", title:"Plutôt Citron vert ou Pamplemousse ?", options:[
    { label:"Citron vert", value:"citron" },
    { label:"Pamplemousse", value:"pamplemousse" }
  ], resultMap:{
    citron:"Margarita",
    pamplemousse:"Paloma"
  }},

  // ÉLAB → SUCRÉ (avec Q5 Rhum)
  q4_base_sucre_elab:{ id:"q4_base_sucre_elab", title:"Base spiritueuse ?", options:[
    { label:"Gin", value:"gin" },
    { label:"Vodka", value:"vodka" },
    { label:"Whisky", value:"whisky" },
    { label:"Tequila", value:"tequila" },
    { label:"Spiritueux à base de rhum", value:"rhum_base" },
    { label:"Rhum", value:"rhum" },
    { label:"Pimm's", value:"pimms" },
  ], nextMap:{
    vodka:{ result:"Cosmopolitan" },
    gin:{ result:"Berry Fizz" },
    whisky:{ result:"Bramble" },
    tequila:{ result:"El Diablo" },
    pimms:{ result:"Pimm’s lemonade" },
    rhum_base:{ result:"Hurrican"},
    rhum:{ result:"Mai Tai"},
  }},

  // ÉLAB → HERBACÉ
  q4_base_herbace_elab:{ id:"q4_base_herbace_elab", title:"Base spiritueuse ?", options:[
    { label:"Gin", value:"gin" },
    { label:"Vodka", value:"vodka" },
    { label:"Whisky", value:"whisky" },
    { label:"Spiritueux à base de rhum", value:"rhum_base" }
  ], resultMap:{
    vodka:"Cucumber Dutch Mule",
    gin:"South side",
    whisky:"Apple and Mint Julep",
    rhum_base:"Mojito"
  }},

  // ÉLAB → TORRÉFIÉ
  q4_base_torrifie_elab:{ id:"q4_base_torrifie_elab", title:"Base spiritueuse ?", options:[
    { label:"Vodka", value:"vodka" },
    { label:"Bourbon Américain", value:"bourbon" },
    { label:"Whiskey Irlandais", value:"whiskey" },
    { label:"Rhum", value:"rhum" }
  ], resultMap:{
    vodka:"Espresso Martini",
    bourbon:"Black Manhattan",
    whiskey:"Nutty Irishman",
    rhum:"Guayaba"
  }},

  // ÉLAB → ÉPICÉ
  q4_base_epice_elab:{ id:"q4_base_epice_elab", title:"Base spiritueuse ?", options:[
    { label:"Vodka", value:"vodka" },
    { label:"Whisky", value:"whisky" },
    { label:"Tequila", value:"tequila" }
  ], resultMap:{
    whisky:"Boulevardier",
    vodka:"Bloody Mary",
    tequila:"Spicy Margarita"
  }},

  // ÉLAB → ONCTUEUX
  q4_onctueux:{ id:"q4_onctueux", title:"Sous-profil onctueux ?", options:[
    { label:"Acidulé / Agrume", value:"agrume" },
    { label:"Sucré / fruité",  value:"sucre" },
    { label:"Herbacé",         value:"herbace" },
    { label:"Torréfié",        value:"torrefie" },
    { label:"Épicé",           value:"epice" }
  ], nextMap:{
    agrume:{ result:"Whisky Sour" },
    herbace:{ result:"Matcha Latte" },
    epice:{ result:"Spicy Martini" },
    torrefie:{ result:"Irish Coffee" },
    sucre:{ next:"q5_onct_sucre_temp" }
  }},

  q5_onct_sucre_temp:{ id:"q5_onct_sucre_temp", title:"Température ?", options:[
    { label:"Froid", value:"froid" },
    { label:"Chaud", value:"chaud" },
    { label:"Torréfié", value:"torrefie" }
  ], resultMap:{
    froid:"Pistachio Martini",
    chaud:"Latte Speculos",
    torrefie:"Irish Coffee"
  }}
};
// =====================
//  DATA — charge cocktails.json (depuis l’Excel)
// =====================
const RecipeStore = (function(){
  const norm = (s='') => s.normalize('NFD').replace(/[\u0300-\u036f]/g,'')
                        .toLowerCase().replace(/\s+/g,' ').trim();
  let rows = [];

  async function load(){
    try{
      const res = await fetch('cocktails.json', { cache:'no-store' });
      if (!res.ok) throw new Error('cocktails.json introuvable');
      const json = await res.json();
      rows = Array.isArray(json) ? json : (json.rows || json.data || []);
      console.info(`[RecipeStore] ${rows.length} lignes chargées depuis cocktails.json`);
    }catch(err){
      console.warn('[RecipeStore] Échec de chargement :', err.message);
      rows = [];
    }
  }

  function getByNomOriginal(name){
    if (!name) return null;
    const key = norm(name);
    for (const r of rows){
      const n = r.nom_original || r.name_original || r.nom || r.cocktail || r.name;
      if (!n) continue;
      if (norm(String(n)) === key){
        return {
          title: String(n),
          ingredients: String(r.ingredients || r.ingrédients || r.ingredient || ''),
          preparation: String(r.preparation || r.préparation || r.method || r.méthode || r.instructions || '')
        };
      }
    }
    return null;
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', load);
  else load();

  return { getByNomOriginal };
})();


// =====================
//  APP (moteur du quiz)
// =====================
(function(){
  'use strict';

  const state = { current:'q1', answers:{}, history:[] };
  // --- helpers état (mémoire de session) ---
  function saveQuizState(){
    try { sessionStorage.setItem('ldr_quiz_state', JSON.stringify(state)); } catch(_){}
  }
  function loadQuizState(){
    try { const raw = sessionStorage.getItem('ldr_quiz_state'); return raw ? JSON.parse(raw) : null; } catch(_){ return null; }
  }
  function clearQuizState(){
    try { sessionStorage.removeItem('ldr_quiz_state'); } catch(_){}
  }

  const shell     = document.getElementById('quiz');
  const panel     = shell.querySelector('.panel');
  const titleEl   = shell.querySelector('.title');
  const optionsEl = shell.querySelector('.options');
  const ctaBtn    = shell.querySelector('.cta');
  const backBtn   = shell.querySelector('.back');

  const getStep = (id) => window.FLOW[id];
  const clear   = (el) => { while (el.firstChild) el.removeChild(el.firstChild); };

  function renderStep(stepId, opts){
    const step = getStep(stepId);
    if(!step){ return renderError(`Étape inconnue: ${stepId}`); }

    if (opts && opts.reset){ state.answers = {}; state.history = []; clearQuizState(); }

    state.current = stepId;
    ctaBtn.disabled = true;
    ctaBtn.setAttribute('aria-disabled','true');

    titleEl.textContent = step.title;

    clear(optionsEl);
    optionsEl.setAttribute('role','group');
    optionsEl.setAttribute('aria-labelledby','quiz-title');

    step.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option';
      btn.type = 'button';
      btn.dataset.value = opt.value;
      btn.setAttribute('aria-pressed','false');
      btn.innerHTML = `<span class="icon" aria-hidden="true">🍹</span><span>${opt.label}</span>`;

      btn.addEventListener('click', () => selectOption(btn, step));
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); }
      });

      optionsEl.appendChild(btn);

      if (state.answers[step.id] === opt.value){
        btn.classList.add('is-selected');
        btn.setAttribute('aria-pressed','true');
        ctaBtn.disabled = false;
        ctaBtn.removeAttribute('aria-disabled');
      }

      if (idx === 0) btn.focus();
    });

    ctaBtn.onclick = () => {
      const value = state.answers[step.id];
      if (!value) return;

      if (step.resultMap && step.resultMap[value]) return renderResult(step.resultMap[value]);

      if (step.nextMap && step.nextMap[value]){
        const node = step.nextMap[value];
        if (node.result) return renderResult(node.result);
        if (node.next)   return goTo(node.next);
      }

      if (typeof step.next === 'function'){
        const nextId = step.next(value);
        return goTo(nextId);
      }

      renderError('Flux non défini pour ce choix.');
    };

    backBtn.onclick = (e) => {
      e.preventDefault();
      if (state.history.length > 1){
        state.history.pop();
        const prev = state.history[state.history.length - 1];
        renderStep(prev);
      } else {
        document.getElementById('quiz')?.classList.add('is-hidden');
        document.getElementById('page2-hero')?.classList.remove('is-hidden');
        try { window.scrollTo({ top: 0, behavior:'smooth' }); } catch(_){}
      }
    };

    if (state.history[state.history.length-1] !== stepId){
      state.history.push(stepId);
    }

    panel.setAttribute('data-anim','in');
  }

  function selectOption(btn, step){
    optionsEl.querySelectorAll('.option').forEach(b=>{
      b.classList.remove('is-selected'); b.setAttribute('aria-pressed','false');
    });
    btn.classList.add('is-selected');
    btn.setAttribute('aria-pressed','true');

    const value = btn.dataset.value;
    state.answers[step.id] = value;

    ctaBtn.disabled = false;
    ctaBtn.removeAttribute('aria-disabled');
    ctaBtn.focus();
  }

  function goTo(nextId){
    if (!nextId) return renderError('Étape suivante manquante.');
    renderStep(nextId);
  }

  // ======== ÉCRAN DE RÉSULTAT ========
  function renderResult(name){
    saveQuizState(); // <— mémorise la question courante + les réponses
    window.location.href = 'recipe.html?name=' + encodeURIComponent(name);
  }

  function renderError(msg){
    titleEl.textContent = "Erreur";
    clear(optionsEl);
    const p = document.createElement('p');
    p.textContent = msg;
    optionsEl.appendChild(p);
    ctaBtn.disabled = true;
  }

  // Expose (optionnel) pour déclencher depuis ailleurs
  window.quizRenderStep = renderStep;

  // ======== Wiring du bouton GO! et du hash #quiz ========
  document.addEventListener('DOMContentLoaded', () => {
    const go = document.getElementById('goNext');
        if (go) {
      go.addEventListener('click', (e) => {
        e.preventDefault();
        clearQuizState(); // <— on repart de zéro si l’utilisateur clique GO
        document.getElementById('page2-hero')?.classList.add('is-hidden');
        document.getElementById('quiz')?.classList.remove('is-hidden');
        renderStep('q1', { reset: true });
        try { history.replaceState(null, '', '#quiz'); } catch(_){}
      });
    }

       // Si l’URL contient #quiz, tenter une restauration
    if (location.hash === '#quiz') {
      document.getElementById('page2-hero')?.classList.add('is-hidden');
      document.getElementById('quiz')?.classList.remove('is-hidden');

      const saved = loadQuizState();
      if (saved && saved.current) {
        // On restaure intégralement l’état
        state.current = saved.current;
        state.answers = saved.answers || {};
        state.history = Array.isArray(saved.history) ? saved.history : ['q1'];
        renderStep(state.current);
      } else {
        renderStep('q1', { reset: true });
      }
    }
  });
})();