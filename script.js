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
window.FLOW = {
  q1: { id:"q1", title:"Cocktail avec ou sans alcool ?", options:[
    { label:"Sans alcool", value:"sans" },
    { label:"Avec alcool", value:"avec" }
  ], next:(v)=> (v==="sans" ? "q2_sans" : "q2_avec") },

  // ----- SANS -----
  q2_sans:{ id:"q2_sans", title:"Difficulté de la préparation ?", options:[
    { label:"Facile / rapide", value:"facile" },
    { label:"Élaborée (+3 ingrédients)", value:"elab" }
  ], next:(v)=> (v==="facile" ? "q3_sans_facile" : "q3_sans_elab") },

  q3_sans_facile:{ id:"q3_sans_facile", title:"Quel profil aromatique ?", options:[
    { label:"Acidulé / Agrume", value:"agrume" },
    { label:"Sucré / fruité",  value:"sucre" },
    { label:"Herbacé",         value:"herbace" },
    { label:"Épicé",           value:"epice" }
  ], resultMap:{ agrume:"Tangy Tonic", sucre:"Virgin Bellini", herbace:"Virgin To", epice:"Ginger Lime" } },

  q3_sans_elab:{ id:"q3_sans_elab", title:"Quel profil aromatique ?", options:[
    { label:"Acidulé / Agrume", value:"agrume" },
    { label:"Sucré / fruité",  value:"sucre" },
    { label:"Herbacé",         value:"herbace" },
    { label:"Épicé",           value:"epice" }
  ], resultMap:{ agrume:"Pa-no-ma", sucre:"Med Orchard", herbace:"Cucumber Collins", epice:"Ginger Spice" } },

  // ----- AVEC -----
  q2_avec:{ id:"q2_avec", title:"Difficulté de la préparation ?", options:[
    { label:"Facile / rapide", value:"facile" },
    { label:"Élaborée (+3 ingrédients)", value:"elab" }
  ], next:(v)=> (v==="facile" ? "q3_avec_facile" : "q3_avec_elab") },

  // AVEC + FACILE
  q3_avec_facile:{ id:"q3_avec_facile", title:"Quel profil aromatique ?", options:[
    { label:"Acidulé / Agrume", value:"agrume" },
    { label:"Sucré / fruité",  value:"sucre" },
    { label:"Herbacé",         value:"herbace" },
    { label:"Torréfié",        value:"torrefie" },
    { label:"Épicé",           value:"epice" }
  ], nextMap:{
    agrume:{ result:"Sevilla Spritz" },
    sucre:{ result:"Tropical Fizz" },
    herbace:{ next:"q4_base_herbace_facile" },
    torrefie:{ result:"Espresso Martini" },
    epice:{ next:"q4_base_epice_facile" }
  }},

  q4_base_herbace_facile:{ id:"q4_base_herbace_facile", title:"Base spiritueuse ?", options:[
    { label:"Gin", value:"gin" },
    { label:"Vodka", value:"vodka" }
  ], resultMap:{ gin:"Gin To", vodka:"Martini" } },

  q4_base_epice_facile:{ id:"q4_base_epice_facile", title:"Base spiritueuse ?", options:[
    { label:"Whisky", value:"whisky" },
    { label:"Spiritueux à base de rhum", value:"rhum" },
    { label:"Vodka", value:"vodka" }
  ], resultMap:{ whisky:"Irish Spice", rhum:"Ginger Spice", vodka:"Dutch Mule" } },

  // AVEC + ELAB
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
    torrefie:{ result:"Guayaba" },
    epice:{ result:"Boulevardier" },
    onctueux:{ next:"q4_onctueux" }
  }},

  q4_base_agrume_elab:{ id:"q4_base_agrume_elab", title:"Base spiritueuse ?", options:[
    { label:"Gin", value:"gin" },
    { label:"Vodka", value:"vodka" },
    { label:"Spiritueux à base de rhum", value:"rhum" },
    { label:"Tequila", value:"tequila" }
  ], resultMap:{ gin:"Pink Citrus Collins", vodka:"Grapefruit Sour", rhum:"Hurrican", tequila:"Margarita" } },

  q4_base_sucre_elab:{ id:"q4_base_sucre_elab", title:"Base spiritueuse ?", options:[
    { label:"Gin", value:"gin" },
    { label:"Vodka", value:"vodka" },
    { label:"Spiritueux à base de rhum", value:"rhum" },
    { label:"Liqueur", value:"liqueur" }
  ], resultMap:{ gin:"Berry Fizz", vodka:"Cosmopolitan", rhum:"Mai Tai", liqueur:"Pimm’s Lemonade" } },

  q4_base_herbace_elab:{ id:"q4_base_herbace_elab", title:"Base spiritueuse ?", options:[
    { label:"Spiritueux à base de rhum", value:"rhum" },
    { label:"Gin", value:"gin" }
  ], resultMap:{ gin:"South Side", rhum:"Mojito" } },

  q4_onctueux:{ id:"q4_onctueux", title:"Sous-profil onctueux ?", options:[
    { label:"Acidulé / Agrume", value:"agrume" },
    { label:"Sucré / fruité",  value:"sucre" },
    { label:"Herbacé",         value:"herbace" },
    { label:"Torréfié",        value:"torrefie" },
    { label:"Épicé",           value:"epice" }
  ], nextMap:{
    agrume:{ result:"Whisky Sour" },
    herbace:{ result:"Matcha Latte" },
    epice:{ result:"Spicy Martini Chai Latte" },
    torrefie:{ result:"Irish Coffee" },
    sucre:{ next:"q5_onct_sucre_temp" }
  }},

  q5_onct_sucre_temp:{ id:"q5_onct_sucre_temp", title:"Température ?", options:[
    { label:"Froid", value:"froid" },
    { label:"Chaud", value:"chaud" },
    { label:"Torréfié", value:"torrefie" }
  ], resultMap:{ froid:"Pistachio Martini", chaud:"Latte Speculos", torrefie:"Irish Coffee" } }
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

    if (opts && opts.reset){ state.answers = {}; state.history = []; }

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
    // Redirection vers la page recette avec le nom en query string
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
        document.getElementById('page2-hero')?.classList.add('is-hidden');
        document.getElementById('quiz')?.classList.remove('is-hidden');
        renderStep('q1', { reset: true });
        // Optionnel : garder le hash pour pouvoir revenir directement au quiz
        try { history.replaceState(null, '', '#quiz'); } catch(_){}
      });
    }

    // Si l’URL contient #quiz (ex: retour depuis la recette avec index.html#quiz)
    if (location.hash === '#quiz') {
      document.getElementById('page2-hero')?.classList.add('is-hidden');
      document.getElementById('quiz')?.classList.remove('is-hidden');
      renderStep('q1', { reset: true });
    }
  });
})();