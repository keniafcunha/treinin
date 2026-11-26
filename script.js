const DAYS=["Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado","Domingo"],SHORT=["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"];

const seed=[
["Segunda-feira","Treino 1: Quadríceps","Quadríceps",[
["Hack Squat","Quadríceps","Hack squat",3,"12 a 15"],["Leg Press","Quadríceps","Leg press",3,"12 a 15"],["Agachamento Smith","Quadríceps","Smith",3,"12 a 15"],["Afundo","Quadríceps/Glúteos","Peso livre",3,"12 a 15"],["Cadeira Extensora","Quadríceps","Máquina",3,"12 a 15"],["Cadeira Adutora","Adutores","Máquina",3,"12 a 15"],["Prancha alta com elevação de joelho","Abdominal","Peso corporal",3,"30 a 45 s"]]],
["Terça-feira","Treino 2: Costas","Costas",[
["Remada Curvada","Costas","Barra",3,"12 a 15"],["Remada Baixa","Costas","Cabo",3,"12 a 15"],["Puxada Alta Frente","Costas","Polia",3,"12 a 15"],["Pulldown Neutro","Costas","Polia",3,"12 a 15"],["Remada Unilateral","Costas","Halter",3,"12 a 15"],["Face Pull","Costas/Deltoide posterior","Cabo",3,"15 a 20"],["Prancha lateral","Abdominal","Peso corporal",3,"30 a 45 s por lado"]]],
["Quarta-feira","Treino 3: Posteriores","Posteriores",[
["Stiff","Posteriores/Glúteos","Barra ou halteres",3,"12 a 15"],["Agachamento Búlgaro","Posteriores/Glúteos","Halteres",3,"12 a 15"],["Prensa Unilateral","Quadríceps/Posteriores","Leg press",3,"12 a 15"],["Mesa Flexora","Posteriores","Máquina",3,"12 a 15"],["Flexora Sentada","Posteriores","Máquina",3,"12 a 15"],["Panturrilha em Pé","Panturrilhas","Máquina",4,"15 a 20"],["Elevação de pernas suspensa","Abdominal","Barra",3,"12 a 15"]]],
["Quinta-feira","Treino 4: Ombro e Peito","Ombro e Peito",[
["Supino Inclinado","Peito","Halteres ou máquina",3,"12 a 15"],["Desenvolvimento com Halteres","Ombros","Halteres",3,"12 a 15"],["Voador","Peito","Máquina",3,"12 a 15"],["Crucifixo","Peito","Halteres",3,"12 a 15"],["Elevação Lateral","Ombros","Halteres",3,"12 a 15"],["Elevação Frontal","Ombros","Halteres",3,"12 a 15"],["Prancha lateral com elevação de quadril","Abdominal","Peso corporal",3,"30 a 45 s por lado"]]],
["Sexta-feira","Treino 5: Glúteos","Glúteos",[
["Hip Thrust","Glúteos","Barra ou máquina",3,"12 a 15"],["Agachamento Búlgaro","Glúteos","Halteres",3,"12 a 15"],["Elevação Pélvica Unilateral","Glúteos","Peso corporal/halter",3,"12 a 15"],["Glúteo no Cabo","Glúteos","Cabo",3,"12 a 15"],["Coice no Cabo","Glúteos","Cabo",3,"12 a 15"],["Cadeira Abdutora","Glúteos/Abdutores","Máquina",3,"12 a 15"],["Crunch","Abdominal","Peso corporal",3,"20 a 30"]]],
["Sábado","Treino 6: Bíceps e Tríceps","Bíceps e Tríceps",[
["Rosca Direta","Bíceps","Barra",3,"12 a 15"],["Tríceps na Polia","Tríceps","Polia",3,"12 a 15"],["Rosca Martelo","Bíceps","Halteres",3,"12 a 15"],["Tríceps Francês","Tríceps","Halter",3,"12 a 15"],["Rosca Concentrada","Bíceps","Halter",3,"12 a 15"],["Tríceps Coice","Tríceps","Halter",3,"12 a 15"],["Prancha com toque no ombro","Abdominal","Peso corporal",3,"30 a 45 s"]]],
["Domingo","Descanso / Recuperação","Recuperação",[]]
];

/* =========================================
   TEMAS POR PERFIL
   ========================================= */
const THEMES={
    admin:{ /* Kenia: lilás + azul bebê */
        primary:"#b79ce8",
        secondary:"#8ecbf0",
        dark:"#7a5cc0",
        soft:"#efe8fb",
        border:"#d9ccf0",
        track:"#e6eefb",
        bg:"linear-gradient(160deg,#f3edff 0%,#eaf5ff 100%)",
        meta:"#b79ce8"
    },
    friend:{ /* Naty: rosa + pêssego */
        primary:"#d878a5",
        secondary:"#ffa987",
        dark:"#b3447c",
        soft:"#fde8f1",
        border:"#e9c9d9",
        track:"#f4e5ec",
        bg:"linear-gradient(160deg,#fff0f6 0%,#e6faf6 100%)",
        meta:"#d878a5"
    }
};

const uid=()=>Math.random().toString(36).slice(2,10);

const initial=()=>({
    workouts:seed.map((w,wi)=>({
        id:"w"+wi,
        day:w[0],
        title:w[1],
        muscle:w[2],
        exercises:w[3].map((e,i)=>({
            id:"e"+wi+"_"+i,
            name:e[0],
            muscle:e[1],
            equipment:e[2],
            sets:e[3],
            reps:e[4],
            favorite:false,
            custom:false
        }))
    })),
    history:[],
    water:{},
    weight:{},
    measures:{},
    deleted:[],
    prefs:{rest:60,autoRest:false,waterGoal:2000}
});

/* Garante que dados antigos (sem água) continuem funcionando */
function ensureState(){
    if(!state.history)state.history=[];
    if(!state.water)state.water={};
    if(!state.weight)state.weight={};
    if(!state.measures)state.measures={};
    if(!state.deleted)state.deleted=[];
    if(!state.prefs)state.prefs={rest:60,autoRest:false};
    if(!state.prefs.waterGoal)state.prefs.waterGoal=2000;
}

let db,
    state=initial(),
    session=null,
    activeProfile="admin",
    timer={seconds:60,left:60,running:false,end:0},
    timerInterval=null;

function openDB(){
    return new Promise((res,rej)=>{
        let r=indexedDB.open("MeuTreinoRosa",1);
        r.onupgradeneeded=()=>{r.result.createObjectStore("data");};
        r.onsuccess=()=>{db=r.result;res();};
        r.onerror=()=>rej(r.error);
    });
}

function save(){
    if(viewing)return Promise.resolve();
    ownState=state;
    state.updatedAt=Date.now();

    if(activeProfile==="admin"){
        const s=fsig(state.workouts);
        if(s!==fichaSig){fichaSig=s;idbPut("ficha_at",Date.now());}
    }

    return saveLocal().then(()=>{pushSoon();});
}

function saveLocal(){
    return new Promise((res,rej)=>{
        let tx=db.transaction("data","readwrite"),
            store=tx.objectStore("data");
        store.put(state,"state_"+activeProfile);
        store.put(state.workouts,"shared_workouts");
        tx.oncomplete=res;
        tx.onerror=()=>rej(tx.error);
    });
}

function load(){
    return new Promise(res=>{
        try{
            const tx=db.transaction("data","readonly"),
                store=tx.objectStore("data"),
                profileReq=store.get("state_"+activeProfile),
                legacyReq=store.get("state"),
                sharedReq=store.get("shared_workouts");

            tx.oncomplete=()=>{
                state=profileReq.result||
                    (activeProfile==="admin"?legacyReq.result:null)||
                    initial();

                if(sharedReq.result){
                    state.workouts=sharedReq.result;
                }else{
                    const wtx=db.transaction("data","readwrite");
                    wtx.objectStore("data").put(state.workouts,"shared_workouts");
                }

                ensureState();
                res();
            };

            tx.onerror=()=>{state=initial();res();};
        }catch(e){
            state=initial();
            res();
        }
    });
}

const $=id=>document.getElementById(id);

const allExercises=()=>state.workouts.flatMap(w=>
    w.exercises.map(e=>({
        ...e,
        workoutId:w.id,
        workout:w.title,
        day:w.day,
        workoutMuscle:w.muscle
    }))
);

function toast(s){
    $("toast").textContent=s;
    $("toast").classList.add("show");
    setTimeout(()=>$("toast").classList.remove("show"),2300);
}

function page(name){
    document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
    $(name).classList.add("active");
    document.querySelectorAll(".nav").forEach(n=>
        n.classList.toggle("active",n.dataset.page===name)
    );
    if(name!=="session")render();
}

document.querySelectorAll(".nav").forEach(b=>
    b.onclick=()=>page(b.dataset.page)
);

const todayIndex=()=>{
    let d=new Date().getDay();
    return d===0?6:d-1;
};

const profileNames={admin:"Kenia",friend:"Naty"};

/* =========================================
   APLICAR TEMA DO PERFIL
   ========================================= */
function applyTheme(profile){
    const t=THEMES[profile]||THEMES.friend;

    document.body.dataset.theme=profile;

    let meta=document.querySelector('meta[name="theme-color"]');
    if(!meta){
        meta=document.createElement("meta");
        meta.name="theme-color";
        document.head.appendChild(meta);
    }
    meta.content=t.meta;
}

function updateProfileUI(){
    const name=profileNames[activeProfile]||"Naty";

    applyTheme(activeProfile);

    if($("activeProfileLabel"))$("activeProfileLabel").textContent=name;
    if($("profileNameTitle"))$("profileNameTitle").textContent=name;
    if($("profileRoleText"))
        $("profileRoleText").textContent=
            (activeProfile==="admin"?"Administradora":"Usuária")+
            " • dados salvos neste aparelho";
    if($("addExercise"))
        $("addExercise").style.display=activeProfile==="admin"?"":"none";
    if($("resetData"))
        $("resetData").style.display=activeProfile==="admin"?"":"none";
}

function openProfilePicker(){
    $("profilePicker").classList.remove("hidden");
}

async function selectProfile(profile){
    if(session){
        toast("Finalize ou saia do treino antes de trocar de perfil.");
        return;
    }

    activeProfile=profile==="friend"?"friend":"admin";

    try{localStorage.setItem("meuTreinoPerfilAtivo",activeProfile);}catch(e){}

    await load();
    ownState=state;
    viewing=false;
    fichaSig=fsig(state.workouts);
    pollN=0;

    timer.seconds=timer.left=state.prefs.rest||60;
    $("autoRest").checked=!!state.prefs.autoRest;

    updateProfileUI();
    $("profilePicker").classList.add("hidden");
    updateViewBar();
    render();
    syncNow();
}

document.querySelectorAll("[data-profile]").forEach(b=>
    b.onclick=()=>selectProfile(b.dataset.profile)
);

$("profileSwitchHome").onclick=openProfilePicker;

/* ----- semanas ----- */
const wkStart=d=>{const x=new Date(d);x.setHours(0,0,0,0);x.setDate(x.getDate()-((x.getDay()+6)%7));return x;};
const fmtDM=d=>d.toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"});
let weekOffset=0,pickedWorkout=null,pickedFor="";

const sameW=(h,w)=>h.workoutId?h.workoutId===w.id:h.title===w.title;
function inWeek(h,start){
    const d=new Date(h.date),e=new Date(start);
    e.setDate(e.getDate()+7);
    return d>=start&&d<e;
}
function bestEntry(w,start){
    return state.history.filter(h=>sameW(h,w)&&inWeek(h,start))
        .sort((a,b)=>(b.percent||0)-(a.percent||0))[0];
}

function renderHome(){
    const t=todayIndex(),cur=wkStart(new Date()),todayStr=new Date().toDateString();

    if(pickedFor!==todayStr||!state.workouts.some(x=>x.id===pickedWorkout)){
        pickedWorkout=state.workouts[t].id;
        pickedFor=todayStr;
    }

    $("workoutPicker").innerHTML=state.workouts.map((x,i)=>
        `<option value="${esc(x.id)}">${DAYS[i]}${i===t?" (hoje)":i===(t+1)%7?" (amanhã)":""} • ${esc(x.title)}</option>`
    ).join("");
    $("workoutPicker").value=pickedWorkout;

    const idx=state.workouts.findIndex(x=>x.id===pickedWorkout),
        w=state.workouts[idx];

    document.querySelector(".hero .eyebrow").textContent=idx===t?"TREINO DO DIA":"TREINO ESCOLHIDO";
    $("todayWorkout").textContent=w.title;
    $("todayMeta").textContent=w.exercises.length?
        `${DAYS[idx]} • ${w.exercises.length} exercícios • ${w.muscle}`:
        "Dia de descanso e recuperação";

    $("todayLabel").textContent=new Date().toLocaleDateString(
        "pt-BR",
        {weekday:"long",day:"numeric",month:"long"}
    );

    const entry=bestEntry(w,cur),
        paid=!!entry&&(entry.percent||0)>=100,
        partial=!!entry&&!paid&&(entry.percent||0)>0,
        btn=$("startToday");

    btn.classList.toggle("paid",paid);

    if(!w.exercises.length){
        btn.textContent="♡ Dia de recuperação";
        btn.onclick=()=>toast("Aproveite seu dia de recuperação ♡");
    }else if(paid){
        btn.textContent="👍 Treino pago";
        btn.onclick=()=>toast("Treino concluído! Escolha outro treino acima se quiser.");
    }else if(partial){
        btn.textContent=`♡ Continuar treino (${entry.percent}%)`;
        btn.onclick=()=>startWorkout(w.id,entry.id);
    }else{
        btn.textContent="♡ Iniciar treino";
        btn.onclick=()=>startWorkout(w.id);
    }

    /* filtro de semana */
    let opts="";
    for(let i=0;i<=26;i++){
        const s=new Date(cur);s.setDate(s.getDate()-7*i);
        const e=new Date(s);e.setDate(e.getDate()+6);
        opts+=`<option value="${i}">${i===0?"Esta semana":i===1?"Semana passada":i+" semanas atrás"} • ${fmtDM(s)} a ${fmtDM(e)}</option>`;
    }
    $("weekSelect").innerHTML=opts;
    $("weekSelect").value=weekOffset;

    const start=new Date(cur);
    start.setDate(start.getDate()-7*weekOffset);

    let doneCount=0,strip="";
    SHORT.forEach((d,i)=>{
        const day=new Date(start);day.setDate(day.getDate()+i);
        const wo=state.workouts[i],
            en=wo&&wo.exercises.length?bestEntry(wo,start):null,
            done=!!en&&(en.percent||0)>=100,
            part=!!en&&!done&&(en.percent||0)>0;
        if(done&&i<6)doneCount++;
        strip+=`<div class="week-day ${weekOffset===0&&i===t?"today":""} ${done?"done":""} ${part?"part":""}">${d}<b>${day.getDate()}</b><span class="wk">${done?"✓":part?"◐":i===6?"♡":""}</span></div>`;
    });

    $("weekStrip").innerHTML=strip;
    $("weekCount").textContent=`${doneCount}/6 concluídos`;
    $("totalSessions").textContent=state.history.filter(h=>(h.percent||0)>=100).length;
}

function options(id,values){
    let el=$(id),
        old=el.value;

    el.innerHTML=el.options[0].outerHTML+
        values.filter(Boolean).sort().map(v=>`<option>${esc(v)}</option>`).join("");

    if([...el.options].some(o=>o.value===old))el.value=old;
}

function renderFilters(){
    options("fDay",DAYS);
    options("fMuscle",[...new Set(allExercises().map(e=>e.muscle))]);
    options("fWorkout",state.workouts.map(w=>w.title));
    options("fEquip",[...new Set(allExercises().map(e=>e.equipment))]);
}

function matches(e){
    let q=$("search").value.toLowerCase(),
        day=$("fDay").value,
        m=$("fMuscle").value,
        w=$("fWorkout").value,
        eq=$("fEquip").value,
        s=$("fStatus").value;

    let done=!!(
        session&&
        session.workoutId===e.workoutId&&
        session.logs[e.id]?.some(x=>x.done)
    );

    return (!q||[e.name,e.muscle,e.equipment].join(" ").toLowerCase().includes(q))
        &&(!day||e.day===day)
        &&(!m||e.muscle.includes(m))
        &&(!w||e.workout===w)
        &&(!eq||e.equipment===eq)
        &&(!s||(s==="fav"?e.favorite:s==="custom"?e.custom:s==="done"?done:!done));
}

function renderWorkouts(){
    renderFilters();

    let list=$("workoutList"),
        ex=allExercises().filter(matches);

    $("filterInfo").textContent=
        `${ex.length} exercício(s) • filtros ativos: ${
            [$("fDay").value,$("fMuscle").value,$("fWorkout").value,$("fEquip").value,$("fStatus").value].filter(Boolean).length
        }`;

    list.innerHTML="";

    state.workouts.forEach(w=>{
        let es=ex.filter(e=>e.workoutId===w.id);
        if(!es.length)return;

        let card=document.createElement("div");
        card.className="workout-card";

        card.innerHTML=`
            <div class="workout-head">
                <div>
                    <h3>${esc(w.title)}</h3>
                    <p>${w.day} • ${w.muscle}</p>
                </div>
                <button class="start-small" data-start="${w.id}">Iniciar</button>
            </div>
            <div class="exercise-list"></div>
        `;

        let inner=card.querySelector(".exercise-list");

        es.forEach(e=>{
            let row=document.createElement("div");
            row.className="exercise-row";
            row.innerHTML=`
                <div class="exercise-icon">${DUMBBELL}</div>
                <div class="exercise-info">
                    <b>${esc(e.name)}</b>
                    <small>${esc(e.muscle)} • ${esc(e.equipment)} • ${e.sets} × ${esc(e.reps)}</small>
                </div>
                ${activeProfile==="admin"?`<button class="edit-ex" data-edit="${esc(e.id)}" aria-label="Editar exercício">✎</button>`:""}
                <button class="star ${e.favorite?"on":""}" data-fav="${e.id}">${e.favorite?"♥":"♡"}</button>
            `;
            inner.append(row);
        });

        list.append(card);
    });

    list.querySelectorAll("[data-edit]").forEach(b=>
        b.onclick=()=>openEx(b.dataset.edit)
    );

    list.querySelectorAll("[data-start]").forEach(b=>
        b.onclick=()=>startWorkout(b.dataset.start)
    );

    list.querySelectorAll("[data-fav]").forEach(b=>
        b.onclick=()=>{
            let e=findExercise(b.dataset.fav);
            e.favorite=!e.favorite;
            save().then(render);
            toast(e.favorite?"Adicionado aos favoritos":"Removido dos favoritos");
        }
    );
}

function findExercise(id){
    return allExercises().find(e=>e.id===id);
}

/* =========================================
   HISTÓRICO DE TREINOS
   ========================================= */

function renderHistory(){
    let list=$("historyList")||$("historyListContainer")||$("historyRecords")||$("historyContent");

    if(!list){
        const pageEl=$("history");
        if(!pageEl)return;
        list=document.createElement("div");
        list.id="historyList";
        pageEl.appendChild(list);
    }

    if(!state.history.length){
        list.innerHTML=`
            <div class="history-empty">
                <p>♡</p>
                <h3>Nenhum treino registrado</h3>
                <small>Seus treinos concluídos aparecerão aqui.</small>
            </div>
        `;
        return;
    }

    const history=[...state.history].sort((a,b)=>new Date(b.date)-new Date(a.date));

    list.innerHTML=history.map(h=>{
        const date=new Date(h.date),
            duration=Math.floor((h.duration||0)/60000),
            sets=h.sets||[],
            completedSets=sets.filter(s=>s.done).length,
            skippedSets=sets.filter(s=>s.skipped).length,
            percent=Number.isFinite(+h.percent)?Math.max(0,Math.min(100,+h.percent)):0;

        return `
            <div class="history-card">
                <div class="history-head">
                    <div>
                        <h3>${esc(h.title||"Treino")}</h3>
                        <p>${date.toLocaleDateString("pt-BR")} • ${esc(h.day||"")}</p>
                    </div>
                    <button type="button" class="delete-history" data-delete-history="${esc(h.id)}" title="Excluir treino" aria-label="Excluir treino">🗑</button>
                </div>
                <div class="history-info">
                    <span>♡ ${h.exerciseCount||0} exercícios</span>
                    <span>✓ ${completedSets} séries feitas</span>${skippedSets?`<span>✕ ${skippedSets} não realizadas</span>`:""}
                    <span>◷ ${duration} min</span>
                </div>
                <div class="history-progress"><div style="width:${percent}%"></div></div>
                <small>${percent}% concluído</small>
                <div class="history-actions"><button type="button" class="soft" data-continue="${esc(h.id)}">${percent>=100?"✎ Editar treino":"▶ Continuar treino"}</button></div>
            </div>
        `;
    }).join("");

    list.querySelectorAll("[data-continue]").forEach(button=>{
        button.onclick=()=>{
            const h=state.history.find(x=>x.id===button.dataset.continue);
            const w=h&&(state.workouts.find(x=>x.id===h.workoutId)||state.workouts.find(x=>x.title===h.title));
            if(!w||!w.exercises.length){toast("Este treino não existe mais na ficha.");return;}
            startWorkout(w.id,h.id);
        };
    });

    list.querySelectorAll("[data-delete-history]").forEach(button=>{
        button.onclick=()=>deleteHistory(button.dataset.deleteHistory);
    });
}

function deleteHistory(id){
    const workout=state.history.find(h=>h.id===id);
    if(!workout)return;

    if(!confirm(`Deseja excluir o registro "${workout.title||"Treino"}" do histórico?`))return;

    const previousHistory=state.history;
    (state.deleted=state.deleted||[]).push(id);
    state.history=state.history.filter(h=>h.id!==id);

    save().then(()=>{
        render();
        toast("Treino excluído do histórico ♡");
    }).catch(()=>{
        state.history=previousHistory;
        render();
        toast("Não foi possível excluir o treino.");
    });
}

/* =========================================
   PROGRESSO E GRÁFICOS
   ========================================= */

function renderProgress(){
    document.querySelectorAll("#progPeriod button").forEach(b=>b.classList.toggle("on",b.dataset.p===progPeriod));
    document.querySelectorAll("#progMetric button").forEach(b=>b.classList.toggle("on",b.dataset.m===progMetric));

    const win=progWindow(),W=aggregate(win.start,win.weeks);

    renderAlerts();
    renderKpis(win,W);
    renderHeat();
    drawWeeklyChart(W);
    drawVolumeChart(W);
    renderMuscle(win);
    renderPRs();

    /* evolução por exercício: treino do dia -> exercício */
    const g={},addG=(k,n)=>{(g[k]=g[k]||new Set()).add(n);};
    state.workouts.forEach(w=>w.exercises.forEach(e=>addG(wlabel(w.title),e.name)));
    state.history.forEach(h=>(h.sets||[]).forEach(s=>addG(wlabel(h.title),s.name)));
    progressGroups=g;

    const oldG=$("progressGroup").value;
    $("progressGroup").innerHTML=Object.keys(g).map(k=>`<option>${esc(k)}</option>`).join("");
    if(g[oldG])$("progressGroup").value=oldG;

    fillProgressExercises();
}

/* ----- utilidades ----- */
let progPeriod="4",progMetric="carga",progressGroups={};

const wlabel=t=>String(t||"Outros").replace(/^\s*Treino\s*\d+\s*[:\-–—]\s*/i,"").trim()||"Outros";
const num=v=>{const n=parseFloat(String(v).replace(",","."));return Number.isFinite(n)?n:0;};
const est1rm=(w,r)=>r>0?w*(1+Math.min(r,12)/30):w;
const hDate=h=>new Date(h.date);
const fmtInt=v=>Math.round(v).toLocaleString("pt-BR");
const fmt1=v=>(Math.round(v*10)/10).toLocaleString("pt-BR",{minimumFractionDigits:1,maximumFractionDigits:1});
const fmtVol=v=>v>=10000?(v/1000).toLocaleString("pt-BR",{maximumFractionDigits:1})+" t":fmtInt(v)+" kg";
const plannedPerWeek=()=>state.workouts.filter(w=>w.exercises.length).length||6;
const plannedUpToToday=()=>state.workouts.slice(0,todayIndex()+1).filter(w=>w.exercises.length).length;
const themeNow=()=>THEMES[activeProfile]||THEMES.friend;

function progWindow(){
    const cur=wkStart(new Date());
    let weeks;
    if(progPeriod==="all"){
        const first=state.history.reduce((m,h)=>Math.min(m,hDate(h).getTime()),Infinity);
        weeks=Number.isFinite(first)?Math.min(52,Math.max(4,Math.round((cur-wkStart(first))/604800000)+1)):4;
    }else weeks=+progPeriod;
    const start=new Date(cur);
    start.setDate(start.getDate()-7*(weeks-1));
    return {weeks,start,cur};
}

function aggregate(start,weeks){
    const W=Array.from({length:weeks},(_,i)=>{
        const s=new Date(start);s.setDate(s.getDate()+7*i);
        return {start:s,done:0,part:0,volume:0,sets:0,skipped:0,time:0};
    });
    state.history.forEach(h=>{
        const i=Math.round((wkStart(hDate(h))-start)/604800000);
        if(i<0||i>=weeks)return;
        const w=W[i],p=h.percent||0;
        if(p>=100){w.done++;w.time+=h.duration||0;}
        else if(p>0)w.part++;
        (h.sets||[]).forEach(s=>{
            if(s.done){w.sets++;w.volume+=num(s.weight)*num(s.reps);}
            else if(s.skipped)w.skipped++;
        });
    });
    return W;
}

function exSessions(name){
    return state.history.map(h=>{
        const ss=(h.sets||[]).filter(s=>s.name===name&&s.done&&num(s.weight)>0);
        if(!ss.length)return null;
        return {
            date:hDate(h),
            maxW:Math.max(...ss.map(s=>num(s.weight))),
            rm:Math.max(...ss.map(s=>est1rm(num(s.weight),num(s.reps)))),
            vol:ss.reduce((a,s)=>a+num(s.weight)*num(s.reps),0)
        };
    }).filter(Boolean).sort((a,b)=>a.date-b.date);
}

function weightedNames(){
    const n=new Set();
    state.history.forEach(h=>(h.sets||[]).forEach(s=>{if(s.done&&num(s.weight)>0)n.add(s.name);}));
    return [...n];
}

function muscleCounts(from){
    const byId={},byName={};
    allExercises().forEach(e=>{byId[e.id]=grp(e.muscle);byName[e.name]=grp(e.muscle);});
    const c={};
    state.history.forEach(h=>{
        if(hDate(h)<from)return;
        (h.sets||[]).forEach(s=>{
            if(!s.done)return;
            const m=s.muscle?grp(s.muscle):(byId[s.exerciseId]||byName[s.name]||"Outros");
            c[m]=(c[m]||0)+1;
        });
    });
    return c;
}

function weeklyStreak(){
    const cur=wkStart(new Date()),start=new Date(cur);
    start.setDate(start.getDate()-7*51);
    const W=aggregate(start,52);
    let n=0,i=51;
    if(W[i].done<3)i--;
    while(i>=0&&W[i].done>=3){n++;i--;}
    return n;
}

/* ----- alertas e insights ----- */
function buildAlerts(){
    const A=[],H=state.history;

    if(!H.length)return [{lvl:"info",ic:"✿",t:"Comece a registrar",x:"Finalize seu primeiro treino para liberar indicadores, gráficos e alertas."}];

    const today=new Date();today.setHours(0,0,0,0);
    const dayMs=86400000;

    /* dias sem treinar */
    const last=Math.max(...H.map(h=>new Date(h.updatedAt||h.date).getTime()));
    const ld=new Date(last);ld.setHours(0,0,0,0);
    const days=Math.round((today-ld)/dayMs);
    if(days>=7)A.push({lvl:"bad",ic:"⏰",t:`${days} dias sem treinar`,x:"Retome hoje com o treino do dia. Mesmo um treino mais curto já mantém o hábito."});
    else if(days>=4)A.push({lvl:"warn",ic:"⏰",t:`${days} dias sem treinar`,x:"Falta pouco para perder o ritmo. Escolha um treino na tela inicial."});

    /* ritmo da semana */
    const t=todayIndex(),cur=wkStart(new Date());
    const expected=state.workouts.slice(0,t).filter(w=>w.exercises.length).length;
    const doneWeek=H.filter(h=>(h.percent||0)>=100&&inWeek(h,cur)).length;
    if(expected-doneWeek>=2)A.push({lvl:"warn",ic:"📅",t:`${expected-doneWeek} treinos atrás da semana`,x:`Você concluiu ${doneWeek} de ${expected} treinos que já deveriam ter acontecido esta semana.`});
    else if(t>=3&&doneWeek>=expected&&doneWeek>0)A.push({lvl:"good",ic:"✅",t:"Semana em dia",x:`${doneWeek} treino(s) concluído(s) até agora.`});

    /* aderência nas últimas 4 semanas */
    const s4=new Date(cur);s4.setDate(s4.getDate()-21);
    const W4=aggregate(s4,4),d4=W4.reduce((a,w)=>a+w.done,0),
        pl4=plannedPerWeek()*3+plannedUpToToday(),adh=pl4?Math.min(100,Math.round(d4/pl4*100)):0;
    if(adh<60)A.push({lvl:"warn",ic:"📉",t:`Aderência de ${adh}% nas últimas 4 semanas`,x:`${d4} de ${pl4} treinos planejados. Se a ficha está pesada, a administradora pode ajustar os dias.`});
    else if(adh>=85)A.push({lvl:"good",ic:"🔥",t:`Aderência de ${adh}% nas últimas 4 semanas`,x:"Constância excelente. É ela que gera resultado."});

    /* séries não realizadas */
    const sk=W4.reduce((a,w)=>a+w.skipped,0),dn=W4.reduce((a,w)=>a+w.sets,0);
    if(sk+dn>=10&&sk/(sk+dn)>=0.2){
        const cnt={};
        H.filter(h=>hDate(h)>=s4).forEach(h=>(h.sets||[]).forEach(s=>{if(s.skipped)cnt[s.name]=(cnt[s.name]||0)+1;}));
        const top=Object.entries(cnt).sort((a,b)=>b[1]-a[1]).slice(0,2).map(e=>`${e[0]} (${e[1]})`).join(", ");
        A.push({lvl:"warn",ic:"✕",t:`${Math.round(sk/(sk+dn)*100)}% das séries ficaram sem realizar`,x:top?`Mais puladas: ${top}. Vale revisar carga, equipamento ou ordem dos exercícios.`:"Vale revisar carga e duração dos treinos."});
    }

    /* recordes, queda de carga e estagnação */
    const prs=[],drops=[],stag=[],inFicha=new Set(allExercises().map(e=>e.name));
    weightedNames().forEach(name=>{
        const S=exSessions(name),n=S.length;
        if(n<2)return;
        const lastS=S[n-1],ageDays=(today-lastS.date)/dayMs;
        const prevMax=Math.max(...S.slice(0,n-1).map(s=>s.maxW));
        if(lastS.maxW>prevMax&&ageDays<=7)prs.push(`${name} ${fmt1(lastS.maxW)} kg`);
        if(ageDays<=14&&lastS.maxW<S[n-2].maxW*0.9)drops.push(`${name}: ${fmt1(S[n-2].maxW)} → ${fmt1(lastS.maxW)} kg`);
        if(n>=4&&ageDays<=21&&inFicha.has(name)){
            let run=-1,idx=-1;
            S.forEach((s,i)=>{if(s.maxW>run){run=s.maxW;idx=i;}});
            const st=n-1-idx;
            if(st>=3)stag.push({name,st,w:run});
        }
    });
    if(prs.length)A.push({lvl:"good",ic:"🏆",t:prs.length>1?`${prs.length} novos recordes de carga`:"Novo recorde de carga",x:prs.slice(0,3).join(" • ")+(prs.length>3?` e mais ${prs.length-3}`:"")});
    if(drops.length)A.push({lvl:"warn",ic:"↘",t:"Carga menor que no treino anterior",x:drops.slice(0,3).join(" • ")+". Pode ser cansaço, sono ou técnica; observe nos próximos treinos."});
    if(stag.length){
        stag.sort((a,b)=>b.st-a.st);
        A.push({lvl:"info",ic:"⏸",t:"Cargas estagnadas",x:stag.slice(0,3).map(s=>`${s.name} (${fmt1(s.w)} kg, ${s.st} treinos)`).join(" • ")+". Tente +1 a 2 kg ou mais repetições."});
    }

    /* grupos musculares sem estímulo (14 dias) */
    const first=Math.min(...H.map(h=>hDate(h).getTime()));
    if(today-first>14*dayMs&&days<14){
        const d14=new Date(today);d14.setDate(d14.getDate()-14);
        const mc=muscleCounts(d14),
            miss=[...new Set(allExercises().map(e=>grp(e.muscle)))].filter(m=>!mc[m]);
        if(miss.length)A.push({lvl:"warn",ic:"🎯",t:"Grupos sem treino há 14 dias",x:miss.slice(0,4).join(", ")+(miss.length>4?` e mais ${miss.length-4}`:"")+"."});
    }

    /* água (últimos 7 dias) */
    const goal=state.prefs.waterGoal||2000;
    let wsum=0,wdays=0;
    for(let i=0;i<7;i++){
        const d=new Date(today);d.setDate(d.getDate()-i);
        const v=waterTotal(waterKey(d));
        if(v>0)wdays++;
        wsum+=v;
    }
    if(wdays>0){
        const avg=wsum/7;
        if(avg<goal*0.7)A.push({lvl:"warn",ic:"💧",t:"Hidratação abaixo da meta",x:`Média de ${fmt1(avg/1000)} L/dia nos últimos 7 dias (meta ${fmt1(goal/1000)} L). Use o lembrete na aba Água.`});
        else if(avg>=goal)A.push({lvl:"good",ic:"💧",t:"Meta de água batida",x:`Média de ${fmt1(avg/1000)} L/dia nos últimos 7 dias.`});
    }

    /* medidas semanais */
    const md=Object.keys(state.measures||{}).sort();
    if(md.length){
        const d=Math.round((today-keyToDate(md[md.length-1]))/dayMs);
        if(d>=8)A.push({lvl:"info",ic:"📏",t:"Hora de medir de novo",x:`Última medição há ${d} dias. A evolução fica mais clara com registro semanal.`});
    }

    /* sequência */
    const st=weeklyStreak();
    if(st>=2)A.push({lvl:"good",ic:"🔥",t:`${st} semanas seguidas treinando`,x:"Semanas com 3 ou mais treinos concluídos."});

    const order={bad:0,warn:1,info:2,good:3};
    A.sort((a,b)=>order[a.lvl]-order[b.lvl]);
    return A.slice(0,8);
}

function renderAlerts(){
    $("progAlerts").innerHTML=buildAlerts().map(a=>
        `<div class="alert ${a.lvl}"><span class="ai">${a.ic}</span><div><b>${esc(a.t)}</b><p>${esc(a.x)}</p></div></div>`
    ).join("");
}

/* ----- indicadores ----- */
function deltaTxt(cur,prev,unit){
    if(prev==null)return "";
    if(!prev&&!cur)return "";
    if(!prev)return `<em class="up">▲ novo</em>`;
    const p=Math.round((cur-prev)/prev*100);
    if(p===0)return `<em>= igual ao período anterior</em>`;
    return `<em class="${p>0?"up":"dn"}">${p>0?"▲":"▼"} ${Math.abs(p)}%${unit||""} vs período anterior</em>`;
}

function renderKpis(win,W){
    const per=plannedPerWeek(),sum=(a,k)=>a.reduce((s,w)=>s+w[k],0),
        plan=a=>a.reduce((s,w)=>s+(w.start.getTime()===win.cur.getTime()?plannedUpToToday():per),0);

    let P=null;
    if(progPeriod!=="all"&&state.history.some(h=>hDate(h)<win.start)){
        const ps=new Date(win.start);ps.setDate(ps.getDate()-7*win.weeks);
        P=aggregate(ps,win.weeks);
    }

    const done=sum(W,"done"),pl=plan(W),adh=pl?Math.min(100,Math.round(done/pl*100)):0,
        padh=P?Math.min(100,Math.round(sum(P,"done")/(per*win.weeks)*100)):null,
        vol=sum(W,"volume"),sets=sum(W,"sets"),sk=sum(W,"skipped"),
        avgMin=done?Math.round(sum(W,"time")/done/60000):0;

    const wk=Object.keys(state.weight||{}).sort().filter(k=>progPeriod==="all"||keyToDate(k)>=win.start);
    let pesoV="—",pesoS="Sem registros no período";
    if(wk.length){
        const a=state.weight[wk[0]],b=state.weight[wk[wk.length-1]],goal=state.prefs.weightGoal;
        pesoV=fmt1(b)+" kg";
        pesoS=wk.length>1?`${b-a<0?"▼":b-a>0?"▲":"="} ${fmt1(Math.abs(b-a))} kg no período`:"Registre mais vezes para ver a tendência";
        if(goal)pesoS+=` • meta ${fmt1(goal)} kg`;
    }

    const today=new Date();today.setHours(0,0,0,0);
    let ws=0;
    for(let i=0;i<7;i++){const d=new Date(today);d.setDate(d.getDate()-i);ws+=waterTotal(waterKey(d));}
    const goalW=state.prefs.waterGoal||2000;

    const K=[
        ["Treinos concluídos",done,deltaTxt(done,P?sum(P,"done"):null)],
        ["Aderência ao plano",adh+"%",P?`<em class="${adh>=padh?"up":"dn"}">${adh>=padh?"▲":"▼"} ${Math.abs(adh-padh)} pontos vs anterior</em>`:`<em>${done} de ${pl} planejados</em>`],
        ["Volume total",fmtVol(vol),deltaTxt(vol,P?sum(P,"volume"):null)],
        ["Séries feitas",sets,sk?`<em class="dn">✕ ${sk} não realizada(s)</em>`:deltaTxt(sets,P?sum(P,"sets"):null)],
        ["Tempo médio / treino",avgMin?avgMin+" min":"—","<em>só treinos concluídos</em>"],
        ["Sequência",weeklyStreak()+" sem.","<em>semanas com 3+ treinos</em>"],
        ["Peso",pesoV,`<em>${pesoS}</em>`],
        ["Água (média 7 dias)",fmt1(ws/7/1000)+" L",`<em>meta ${fmt1(goalW/1000)} L/dia</em>`]
    ];

    $("progKpis").innerHTML=K.map(k=>`<article class="kpi"><span class="kl">${k[0]}</span><strong>${k[1]}</strong>${k[2]}</article>`).join("");
}

/* ----- mapa de constância (12 semanas) ----- */
function renderHeat(){
    const cur=wkStart(new Date()),weeks=12,start=new Date(cur);
    start.setDate(start.getDate()-7*(weeks-1));

    const map={};
    state.history.forEach(h=>{
        const k=waterKey(hDate(h)),v=(h.percent||0)>=100?2:(h.percent||0)>0?1:0;
        map[k]=Math.max(map[k]||0,v);
    });

    const now=new Date(),todayK=waterKey(now);
    let cells="";
    for(let w=0;w<weeks;w++)for(let d=0;d<7;d++){
        const day=new Date(start);day.setDate(day.getDate()+w*7+d);
        const k=waterKey(day),
            cls=day>now&&k!==todayK?"fut":map[k]===2?"l2":map[k]===1?"l1":"l0";
        cells+=`<i class="hc ${cls} ${k===todayK?"today":""}" title="${day.toLocaleDateString("pt-BR")}"></i>`;
    }

    $("progHeat").innerHTML=`<div class="heat-days">${["S","T","Q","Q","S","S","D"].map(x=>`<i>${x}</i>`).join("")}</div><div class="heat">${cells}</div>`;
}

/* ----- gráficos ----- */
function cvSize(id,W,H){
    const c=$(id),r=devicePixelRatio||1,x=c.getContext("2d");
    c.style.width=W+"px";c.style.height=H+"px";
    c.width=W*r;c.height=H*r;
    x.setTransform(r,0,0,r,0,0);
    x.clearRect(0,0,W,H);
    return x;
}

function weekLabels(W,x,pad,bw,H){
    const k=Math.ceil(W.length/6);
    x.fillStyle="#887780";x.font="10px sans-serif";x.textAlign="center";
    W.forEach((a,i)=>{
        if(i%k===0||i===W.length-1)x.fillText(fmtDM(a.start),pad+i*bw+bw/2,H-8);
    });
}

function drawWeeklyChart(W){
    const w=$("chWeekly").clientWidth||320,H=190,x=cvSize("chWeekly",w,H),th=themeNow(),
        pad=30,top=18,base=H-24,planned=plannedPerWeek(),
        max=Math.max(planned,...W.map(a=>a.done+a.part))+1,
        y=v=>base-v/max*(base-top),bw=(w-pad-6)/W.length;

    x.strokeStyle=th.border;x.lineWidth=1;
    x.beginPath();x.moveTo(pad,top-6);x.lineTo(pad,base);x.lineTo(w-4,base);x.stroke();

    x.fillStyle="#887780";x.font="10px sans-serif";x.textAlign="right";
    x.fillText("0",pad-5,base);x.fillText(String(max-1),pad-5,y(max-1)+3);

    x.setLineDash([4,4]);x.strokeStyle=th.dark;x.beginPath();
    x.moveTo(pad,y(planned));x.lineTo(w-4,y(planned));x.stroke();x.setLineDash([]);
    x.fillStyle=th.dark;x.textAlign="left";x.fillText("meta "+planned,pad+4,y(planned)-4);

    W.forEach((a,i)=>{
        const bx=pad+i*bw+bw*0.15,bwid=bw*0.7;
        x.fillStyle=th.primary;
        x.fillRect(bx,y(a.done),bwid,base-y(a.done));
        if(a.part){x.fillStyle=th.secondary+"99";x.fillRect(bx,y(a.done+a.part),bwid,y(a.done)-y(a.done+a.part));}
        if(bw>=16&&a.done){x.fillStyle="#332a30";x.textAlign="center";x.fillText(a.done,bx+bwid/2,y(a.done+a.part)-4);}
    });

    weekLabels(W,x,pad,bw,H);
}

function drawVolumeChart(W){
    const w=$("chVolume").clientWidth||320,H=190,x=cvSize("chVolume",w,H),th=themeNow(),
        pad=40,top=20,base=H-24,vals=W.map(a=>a.volume),mx=Math.max(...vals);

    if(!mx){
        x.fillStyle="#887780";x.font="13px sans-serif";x.textAlign="center";
        x.fillText("Registre cargas e repetições para ver o volume.",w/2,H/2);
        return;
    }

    const y=v=>base-v/(mx*1.15)*(base-top),bw=(w-pad-8)/W.length,
        px=i=>pad+i*bw+bw/2;

    x.strokeStyle=th.border;x.lineWidth=1;
    x.beginPath();x.moveTo(pad,top-6);x.lineTo(pad,base);x.lineTo(w-4,base);x.stroke();
    x.fillStyle="#887780";x.font="10px sans-serif";x.textAlign="right";
    x.fillText("0",pad-5,base);x.fillText(fmtInt(mx),pad-5,y(mx)+3);

    x.beginPath();x.moveTo(px(0),base);
    vals.forEach((v,i)=>x.lineTo(px(i),y(v)));
    x.lineTo(px(vals.length-1),base);x.closePath();
    x.fillStyle=th.secondary+"55";x.fill();

    x.strokeStyle=th.dark;x.lineWidth=3;x.lineJoin="round";x.beginPath();
    vals.forEach((v,i)=>i?x.lineTo(px(i),y(v)):x.moveTo(px(i),y(v)));x.stroke();

    vals.forEach((v,i)=>{
        x.fillStyle=th.dark;x.beginPath();x.arc(px(i),y(v),W.length>14?2.5:4.5,0,7);x.fill();
    });

    const li=vals.length-1;
    x.fillStyle="#332a30";x.textAlign="center";x.fillText(fmtInt(vals[li]),Math.min(px(li),w-18),y(vals[li])-9);

    weekLabels(W,x,pad,bw,H);
}

/* ----- séries por grupo muscular ----- */
function renderMuscle(win){
    const c=muscleCounts(win.start),
        all=[...new Set([...allExercises().map(e=>grp(e.muscle)),...Object.keys(c)])],
        rows=all.map(m=>({m,avg:(c[m]||0)/win.weeks})).sort((a,b)=>b.avg-a.avg);

    if(!rows.some(r=>r.avg>0)){
        $("progMuscle").innerHTML=`<p class="muted">Conclua séries nos treinos para ver a distribuição por músculo.</p>`;
        return;
    }

    const mx=Math.max(24,...rows.map(r=>r.avg))*1.05;

    $("progMuscle").innerHTML=rows.map(r=>{
        const cls=r.avg===0?"zero":r.avg<10?"low":r.avg<=20?"ok":"high",
            txt=r.avg===0?"sem séries":r.avg<10?"abaixo":r.avg<=20?"ideal":"alto";
        return `<div class="mrow"><div class="mhead"><b>${esc(r.m)}</b><span class="${cls}">${fmt1(r.avg)}/sem • ${txt}</span></div>
            <div class="mtrack"><div class="mband" style="left:${10/mx*100}%;width:${10/mx*100}%"></div><div class="mfill ${cls}" style="width:${Math.max(r.avg>0?2:0,r.avg/mx*100)}%"></div></div></div>`;
    }).join("");
}

/* ----- recordes ----- */
function renderPRs(){
    const best={};
    state.history.forEach(h=>(h.sets||[]).forEach(s=>{
        if(!s.done||num(s.weight)<=0)return;
        const rm=est1rm(num(s.weight),num(s.reps)),b=best[s.name];
        if(!b||rm>b.rm)best[s.name]={name:s.name,rm,w:num(s.weight),r:num(s.reps),date:hDate(h)};
    }));

    const list=Object.values(best).sort((a,b)=>b.date-a.date).slice(0,8);

    if(!list.length){
        $("progPRs").innerHTML=`<p class="muted">Registre cargas durante os treinos para ver seus recordes.</p>`;
        return;
    }

    const now=Date.now();
    $("progPRs").innerHTML=list.map(p=>
        `<div class="pr"><div><b>${esc(p.name)}</b><span>${fmt1(p.w)} kg${p.r?` × ${p.r}`:""}${p.r?` • 1RM est. ≈ ${fmt1(p.rm)} kg`:""}</span></div>
        <div class="pr-d">${fmtDM(p.date)}${now-p.date<14*86400000?"<i>NOVO</i>":""}</div></div>`
    ).join("")+`<p class="muted" style="margin:8px 0 0">1RM estimado: fórmula de Epley (carga × (1 + reps/30)).</p>`;
}

/* ----- evolução por exercício ----- */
function fillProgressExercises(){
    const names=[...(progressGroups[$("progressGroup").value]||[])],
        old=$("progressExercise").value;

    $("progressExercise").innerHTML=names.map(n=>`<option>${esc(n)}</option>`).join("");
    if(names.includes(old))$("progressExercise").value=old;
    drawChart();
}

$("progressGroup").onchange=fillProgressExercises;

$("progPeriod").onclick=e=>{
    const b=e.target.closest("button");
    if(!b)return;
    progPeriod=b.dataset.p;
    renderProgress();
};

$("progMetric").onclick=e=>{
    const b=e.target.closest("button");
    if(!b)return;
    progMetric=b.dataset.m;
    document.querySelectorAll("#progMetric button").forEach(x=>x.classList.toggle("on",x===b));
    drawChart();
};

function drawChart(){
    const name=$("progressExercise").value,th=themeNow(),wrap=$("chWrap"),
        key={carga:"maxW",rm:"rm",vol:"vol"}[progMetric],
        label={carga:"Carga máxima",rm:"1RM estimado",vol:"Volume"}[progMetric],
        all=name?exSessions(name):[];

    let run=-Infinity;
    all.forEach((s,i)=>{s.pr=i>0&&s[key]>run+1e-9;run=Math.max(run,s[key]);});

    const win=progWindow(),
        pts=progPeriod==="all"?all:all.filter(s=>s.date>=win.start),
        step=50,pad=38,H=220,
        W=Math.max(wrap.clientWidth||300,pad+pts.length*step+10),
        x=cvSize("progressChart",W,H);

    if(!pts.length){
        $("chartNote").textContent=name?"Sem cargas registradas neste período para este exercício.":"Escolha um exercício.";
        return;
    }

    const vs=pts.map(p=>p[key]),mn=Math.min(...vs),mx=Math.max(...vs),sp=(mx-mn)||Math.max(2,mx*0.1),
        lo=Math.max(0,mn-sp*0.3),hi=mx+sp*0.3,top=22,base=H-34,
        y=v=>base-(v-lo)/(hi-lo)*(base-top),px=i=>pad+step*(i+.5);

    x.strokeStyle=th.border;x.lineWidth=1;
    x.beginPath();x.moveTo(pad,top-8);x.lineTo(pad,base);x.lineTo(W-6,base);x.stroke();

    const f=v=>progMetric==="vol"?fmtInt(v):fmt1(v);
    x.font="10px sans-serif";x.fillStyle="#887780";x.textAlign="right";
    x.fillText(f(hi),pad-4,top);x.fillText(f(lo),pad-4,base);
    x.textAlign="center";
    pts.forEach((p,i)=>x.fillText(fmtDM(p.date),px(i),H-14));

    x.strokeStyle=th.dark;x.lineWidth=3;x.lineJoin="round";x.beginPath();
    pts.forEach((p,i)=>i?x.lineTo(px(i),y(p[key])):x.moveTo(px(i),y(p[key])));x.stroke();

    pts.forEach((p,i)=>{
        if(p.pr){x.strokeStyle="#e3a03a";x.lineWidth=3;x.beginPath();x.arc(px(i),y(p[key]),8,0,7);x.stroke();}
        x.fillStyle=th.dark;x.beginPath();x.arc(px(i),y(p[key]),4.5,0,7);x.fill();
        x.fillStyle="#332a30";x.fillText(f(p[key]),px(i),y(p[key])-13);
    });

    wrap.scrollLeft=wrap.scrollWidth;

    /* leitura automática */
    const first=vs[0],lastV=vs[vs.length-1],d=lastV-first,
        parts=[`${label}: ${f(first)} → ${f(lastV)} kg (${d>0?"+":d<0?"−":""}${f(Math.abs(d))}) em ${pts.length} treino(s)`];

    const n=all.length;
    if(n>=2){
        const S=all;let r=-1,idx=-1;
        S.forEach((s,i)=>{if(s.maxW>r){r=s.maxW;idx=i;}});
        const st=n-1-idx;
        if(S[n-1].pr&&progMetric!=="vol")parts.push("🏆 último treino foi recorde");
        if(n>=4&&st>=3)parts.push(`⚠ sem aumento de carga há ${st} treinos`);
        if(S[n-1].maxW<S[n-2].maxW*0.9)parts.push("↘ carga caiu no último treino");
    }
    $("chartNote").textContent=parts.join(" • ")+"  (anel dourado = recorde)";
}

/* =========================================
   ÁGUA 💧
   ========================================= */

const waterKey=(d=new Date())=>
    `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;

/* ----- lembretes de água ----- */
const remCfg=()=>state.prefs.waterRem||(state.prefs.waterRem={on:false,every:60,from:"08:00",to:"22:00"});
let remLast=Date.now();

function fillRem(){
    const c=remCfg();
    $("remOn").checked=!!c.on;
    $("remEvery").value=String(c.every);
    $("remFrom").value=c.from;
    $("remTo").value=c.to;
    $("remNote").textContent=
        !("Notification"in window)?"Este aparelho não permite notificações; o aviso aparecerá dentro do app.":
        Notification.permission==="denied"?"As notificações estão bloqueadas nas configurações do navegador; o aviso aparecerá só dentro do app.":
        "O aviso funciona enquanto o app estiver aberto ou em segundo plano. Com o app totalmente fechado, o celular pode não avisar.";
}

function bindRem(){
    const upd=()=>{
        const c=remCfg();
        c.on=$("remOn").checked;
        c.every=+$("remEvery").value;
        c.from=$("remFrom").value||"08:00";
        c.to=$("remTo").value||"22:00";
        remLast=Date.now();
        save();
    };

    $("remOn").onchange=async()=>{
        if($("remOn").checked&&"Notification"in window&&Notification.permission==="default"){
            try{await Notification.requestPermission();}catch(e){}
        }
        upd();fillRem();
        toast($("remOn").checked?"Lembrete de água ligado 💧":"Lembrete desligado");
    };

    ["remEvery","remFrom","remTo"].forEach(id=>$(id).onchange=upd);

    $("remTest").onclick=async()=>{
        if("Notification"in window&&Notification.permission==="default"){
            try{await Notification.requestPermission();}catch(e){}
            fillRem();
        }
        remFire();
    };
}

async function remFire(){
    const msg="Hora de beber água 💧";
    toast(msg);
    if("vibrate"in navigator)navigator.vibrate([300,150,300]);

    if("Notification"in window&&Notification.permission==="granted"){
        try{
            const reg=navigator.serviceWorker&&await navigator.serviceWorker.getRegistration();
            if(reg)reg.showNotification("Meu Treino",{body:msg,icon:"icon-192.png",tag:"agua",renotify:true,vibrate:[300,150,300]});
            else new Notification("Meu Treino",{body:msg});
        }catch(e){}
    }
}

function remTick(){
    const c=state.prefs.waterRem;
    if(!c||!c.on)return;

    const n=new Date(),hm=n.getHours()*60+n.getMinutes(),
        tm=s=>{const p=String(s).split(":");return +p[0]*60+(+p[1]||0);};

    if(hm<tm(c.from)||hm>tm(c.to))return;
    if(Date.now()-remLast<c.every*60000)return;
    if(waterTotal(waterKey())>=(state.prefs.waterGoal||2000))return;

    remLast=Date.now();
    remFire();
}

setInterval(remTick,30000);
document.addEventListener("visibilitychange",()=>{if(!document.hidden)remTick();});

const waterTotal=key=>(state.water[key]||[]).reduce((a,b)=>a+b,0);

/* Liga os botões da aba Água (o HTML está no index.html) */
function bindWater(){
    if(!$("water"))return;

    document.querySelectorAll("[data-water]").forEach(b=>
        b.onclick=()=>addWater(+b.dataset.water)
    );

    $("waterAddCustom").onclick=()=>{
        addWater(+$("waterCustom").value);
        $("waterCustom").value="";
    };

    $("waterUndo").onclick=()=>{
        const key=waterKey(),
            list=state.water[key]||[];

        if(!list.length){toast("Nada para desfazer");return;}

        const removed=list.pop();
        if(!list.length)delete state.water[key];

        save().then(renderWater);
        toast(`-${removed} ml removidos`);
    };

    $("waterGoalBtn").onclick=()=>{
        const v=+prompt("Meta diária de água (ml):",state.prefs.waterGoal||2000);
        if(!(v>=500&&v<=10000)){
            if(v)toast("Informe uma meta entre 500 e 10000 ml");
            return;
        }
        state.prefs.waterGoal=Math.round(v);
        save().then(renderWater);
        toast("Meta atualizada 🎯");
    };
}

function addWater(ml){
    ml=Math.round(+ml);

    if(!(ml>0)||ml>5000){
        toast("Informe uma quantidade entre 1 e 5000 ml");
        return;
    }

    const key=waterKey();
    (state.water[key]=state.water[key]||[]).push(ml);

    save().then(renderWater);

    const goal=state.prefs.waterGoal||2000;
    toast(waterTotal(key)>=goal?"Meta de hoje batida! 🎉":`+${ml} ml registrados`);
}

function renderWater(){
    if(!$("water"))return;

    const goal=state.prefs.waterGoal||2000,
        total=waterTotal(waterKey()),
        pct=Math.round(total/goal*100);

    $("waterTotal").textContent=total;
    $("waterPct").textContent=pct+"%";
    $("waterFill").style.height=Math.min(100,pct)+"%";

    $("waterGoalText").textContent=total>=goal?
        `Meta de ${goal} ml atingida! 🎉`:
        `Faltam ${goal-total} ml para a meta de ${goal} ml`;

    let html="";

    for(let i=6;i>=0;i--){
        const d=new Date();
        d.setDate(d.getDate()-i);

        const t=waterTotal(waterKey(d)),
            h=Math.min(100,Math.round(t/goal*100));

        html+=`
            <div class="water-day ${t>=goal?"goal":""}" title="${t} ml">
                <div class="col"><i style="height:${h}%"></i></div>
                ${SHORT[(d.getDay()+6)%7]}
                <b>${t>=1000?(t/1000).toFixed(1)+"L":t}</b>
            </div>
        `;
    }

    $("waterWeek").innerHTML=html;
    fillRem();
}

/* =========================================
   PESO ⚖
   ========================================= */

const fmtKg=v=>(Math.round(v*10)/10).toLocaleString("pt-BR",{minimumFractionDigits:1,maximumFractionDigits:1});
const parseKg=t=>parseFloat(String(t).replace(",","."));
const keyToDate=k=>{const p=k.split("-");return new Date(+p[0],+p[1]-1,+p[2]);};
const keyBR=k=>keyToDate(k).toLocaleDateString("pt-BR");

let weightSel=null,
    weightView=(()=>{const d=new Date();return {y:d.getFullYear(),m:d.getMonth()};})();

function bindWeight(){
    if(!$("weight"))return;

    weightSel=waterKey();

    $("weightPrev").onclick=()=>{
        weightView.m--;
        if(weightView.m<0){weightView.m=11;weightView.y--;}
        renderWeight();
    };

    $("weightNext").onclick=()=>{
        const now=new Date();
        if(weightView.y===now.getFullYear()&&weightView.m>=now.getMonth())return;
        weightView.m++;
        if(weightView.m>11){weightView.m=0;weightView.y++;}
        renderWeight();
    };

    $("weightCal").onclick=ev=>{
        const b=ev.target.closest("[data-day]");
        if(!b||b.disabled)return;
        weightSel=b.dataset.day;
        renderWeight();
    };

    $("weightSave").onclick=()=>{
        const v=parseKg($("weightInput").value);

        if(!(v>=20&&v<=400)){
            toast("Informe um peso válido (ex.: 62,5)");
            return;
        }

        state.weight[weightSel]=Math.round(v*10)/10;
        save().then(renderWeight);
        toast(`Peso de ${keyBR(weightSel)} salvo ♡`);
    };

    $("weightRemove").onclick=()=>{
        if(state.weight[weightSel]==null){toast("Não há peso neste dia");return;}
        delete state.weight[weightSel];
        save().then(renderWeight);
        toast("Registro removido");
    };

    $("weightGoalBtn").onclick=()=>{
        const cur=state.prefs.weightGoal;
        const raw=prompt("Meta de peso (kg):",cur?fmtKg(cur):"");
        if(raw===null)return;

        if(raw.trim()===""){
            delete state.prefs.weightGoal;
        }else{
            const v=parseKg(raw);
            if(!(v>=20&&v<=400)){toast("Informe uma meta válida (ex.: 58,0)");return;}
            state.prefs.weightGoal=Math.round(v*10)/10;
        }

        save().then(renderWeight);
        toast("Meta de peso atualizada");
    };
}

function renderWeight(){
    if(!$("weight"))return;

    const keys=Object.keys(state.weight).sort(),
        goal=state.prefs.weightGoal;

    /* ----- resumo e meta ----- */
    if(!keys.length){
        $("weightCurrent").textContent="—";
        $("weightSince").textContent="Registre seu peso no calendário abaixo.";
        $("weightGoalText").textContent=goal?`Meta: ${fmtKg(goal)} kg`:"Defina uma meta para acompanhar.";
        $("weightBar").style.width="0%";
    }else{
        const first=keys[0],
            last=keys[keys.length-1],
            start=state.weight[first],
            cur=state.weight[last],
            diff=cur-start;

        $("weightCurrent").textContent=fmtKg(cur);

        $("weightSince").textContent=keys.length>1?
            `${diff>0?"+":diff<0?"−":""}${fmtKg(Math.abs(diff))} kg desde ${keyBR(first)}`:
            `Primeiro registro em ${keyBR(first)}`;

        if(!goal){
            $("weightGoalText").textContent="Defina uma meta para ver quanto falta.";
            $("weightBar").style.width="0%";
        }else{
            const left=cur-goal,
                total=Math.abs(start-goal),
                moved=start>goal?start-cur:cur-start;

            let pct=total<0.05?(Math.abs(left)<0.05?100:0):Math.round(Math.max(0,Math.min(1,moved/total))*100);

            if(Math.abs(left)<0.05){
                $("weightGoalText").textContent=`Meta de ${fmtKg(goal)} kg atingida! 🎉`;
                pct=100;
            }else{
                $("weightGoalText").textContent=
                    `Faltam ${fmtKg(Math.abs(left))} kg para a meta de ${fmtKg(goal)} kg`;
            }

            $("weightBar").style.width=pct+"%";
        }
    }

    /* ----- calendário ----- */
    const {y,m}=weightView,
        now=new Date(),
        todayKey=waterKey(now),
        offset=(new Date(y,m,1).getDay()+6)%7,
        days=new Date(y,m+1,0).getDate();

    $("weightMonth").textContent=
        new Date(y,m,1).toLocaleDateString("pt-BR",{month:"long",year:"numeric"});

    $("weightNext").disabled=(y===now.getFullYear()&&m>=now.getMonth());

    let html=["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"].map(d=>`<em>${d}</em>`).join("");

    for(let i=0;i<offset;i++)html+="<span></span>";

    for(let d=1;d<=days;d++){
        const k=waterKey(new Date(y,m,d)),
            w=state.weight[k],
            future=k>todayKey;

        html+=`<button type="button" class="cal-day ${w!=null?"has":""} ${k===weightSel?"sel":""} ${k===todayKey?"today":""}" data-day="${k}" ${future?"disabled":""}>
            <b>${d}</b><i>${w!=null?fmtKg(w):""}</i>
        </button>`;
    }

    $("weightCal").innerHTML=html;

    /* ----- dia selecionado ----- */
    $("weightDayLabel").textContent=
        weightSel===todayKey?"Hoje • "+keyBR(weightSel):keyBR(weightSel);

    $("weightInput").value=state.weight[weightSel]!=null?fmtKg(state.weight[weightSel]):"";

    drawWeightChart();
    renderMeasures();
}

function drawWeightChart(){
    const wrap=$("wChartWrap"),cv=$("weightChart"),ctx=cv.getContext("2d"),
        keys=Object.keys(state.weight).sort(),goal=state.prefs.weightGoal,
        th=THEMES[activeProfile]||THEMES.friend,
        H=220,ratio=devicePixelRatio||1,step=46,pad=36;

    const W=Math.max(wrap.clientWidth||300,pad+keys.length*step+10);
    cv.style.width=W+"px";
    cv.width=W*ratio;
    cv.height=H*ratio;
    ctx.setTransform(ratio,0,0,ratio,0,0);
    ctx.clearRect(0,0,W,H);

    if(!keys.length){
        $("weightChartNote").textContent="Registre seu peso no calendário para ver o gráfico.";
        return;
    }

    const vals=keys.map(k=>state.weight[k]),
        all=goal?[...vals,goal]:vals,
        lo=Math.min(...all)-2,hi=Math.max(...all)+2,
        top=20,base=H-34,
        y=v=>base-(v-lo)/(hi-lo)*(base-top);

    ctx.strokeStyle=th.border;
    ctx.lineWidth=1;
    ctx.beginPath();
    ctx.moveTo(pad,top-6);ctx.lineTo(pad,base);ctx.lineTo(W-6,base);
    ctx.stroke();

    ctx.font="10px sans-serif";
    ctx.fillStyle="#887780";
    ctx.textAlign="right";
    ctx.fillText(fmtKg(hi),pad-4,top);
    ctx.fillText(fmtKg(lo),pad-4,base);
    ctx.textAlign="center";

    keys.forEach((k,i)=>{
        const x=pad+step*(i+.5);
        if(goal){
            ctx.fillStyle=th.secondary+"99";
            ctx.fillRect(x-12,y(goal),24,base-y(goal));
        }
        ctx.fillStyle="#887780";
        ctx.fillText(k.slice(8)+"/"+k.slice(5,7),x,H-18);
    });

    ctx.strokeStyle=th.dark;
    ctx.lineWidth=3;
    ctx.lineJoin="round";
    ctx.beginPath();
    keys.forEach((k,i)=>{
        const x=pad+step*(i+.5),yy=y(state.weight[k]);
        i?ctx.lineTo(x,yy):ctx.moveTo(x,yy);
    });
    ctx.stroke();

    keys.forEach((k,i)=>{
        const x=pad+step*(i+.5),yy=y(state.weight[k]);
        ctx.fillStyle=th.dark;
        ctx.beginPath();ctx.arc(x,yy,4.5,0,7);ctx.fill();
        ctx.fillStyle="#332a30";
        ctx.fillText(fmtKg(state.weight[k]),x,yy-9);
    });

    $("weightChartNote").textContent=
        `${goal?`Colunas = meta (${fmtKg(goal)} kg) • `:""}Linha = peso registrado • ${keys.length} registro(s)`;

    wrap.scrollLeft=wrap.scrollWidth;
}

function render(){
    renderHome();
    if($("workouts").classList.contains("active"))renderWorkouts();
    if($("history").classList.contains("active"))renderHistory();
    if($("progress").classList.contains("active"))renderProgress();
    if($("water")&&$("water").classList.contains("active"))renderWater();
    if($("weight")&&$("weight").classList.contains("active"))renderWeight();
}

/* =========================================
   SESSÃO DE TREINO
   ========================================= */

function startWorkout(id,fromId){
    let w=state.workouts.find(x=>x.id===id);
    if(!w||!w.exercises.length)return;

    let h=fromId?state.history.find(x=>x.id===fromId):null;

    if(!h&&!fromId){
        const e=bestEntry(w,wkStart(new Date()));
        if(e&&(e.percent||0)<100&&confirm(`Você já começou este treino (${e.percent}% feito).\n\nOK = continuar de onde parou\nCancelar = começar do zero`))h=e;
    }

    session={
        workoutId:id,
        title:w.title,
        day:w.day,
        index:0,
        start:Date.now(),
        logs:{},
        historyId:h?h.id:null,
        prevDuration:h?(h.duration||0):0,
        extraSets:[]
    };

    w.exercises.forEach(e=>{
        const saved=h?(h.sets||[]).filter(s=>s.exerciseId===e.id):[];
        session.logs[e.id]=Array.from({length:Math.max(e.sets,saved.length)},(_,i)=>
            saved[i]?{weight:saved[i].weight,reps:saved[i].reps,done:!!saved[i].done,skipped:!!saved[i].skipped}:{weight:"",reps:"",done:false,skipped:false}
        );
    });

    if(h){
        const ids=new Set(w.exercises.map(e=>e.id));
        session.extraSets=(h.sets||[]).filter(s=>!ids.has(s.exerciseId));
        const first=w.exercises.findIndex(e=>session.logs[e.id].some(s=>!s.done));
        session.index=Math.max(0,first);
    }

    page("session");
    renderSession();
}

function sessionStatus(){
    if(!session)return;
    const w=state.workouts.find(x=>x.id===session.workoutId);
    let total=0,marked=0;
    w.exercises.forEach(e=>(session.logs[e.id]||[]).forEach(s=>{total++;if(s.done||s.skipped)marked++;}));
    (session.extraSets||[]).forEach(s=>{total++;if(s.done||s.skipped)marked++;});
    $("sessionCount").textContent=`Exercício ${session.index+1} de ${w.exercises.length} • séries marcadas ${marked}/${total}`+(marked>=total&&total?" • treino completo ✓":"");
    $("sessionProgress").style.width=(total?marked/total*100:0)+"%";
}

function renderSession(){
    let w=state.workouts.find(x=>x.id===session.workoutId);

    let e=w.exercises[session.index],
        logs=session.logs[e.id];

    $("sessionDay").textContent=session.day.toUpperCase();
    $("sessionTitle").textContent=session.title;

    $("exerciseSession").innerHTML=`
        <div class="session-exercise">
            <small>${esc(e.muscle)}</small>
            <h3>${esc(e.name)}</h3>
            <p class="exercise-meta">${esc(e.equipment)} • ${e.sets} séries • ${esc(e.reps)} repetições</p>

            <div class="set-row">
                <label>Série</label>
                <label>Carga (kg)</label>
                <label>Reps</label>
                <span class="set-head"><i>✓</i><i>✕</i></span>
            </div>

            ${logs.map((s,i)=>`
                <div class="set-row ${s.done?"done":s.skipped?"skipped":""}">
                    <label>${i+1}</label>
                    <input type="number" min="0" step="0.5" placeholder="0" value="${esc(s.weight)}" data-weight="${i}">
                    <input type="number" min="0" placeholder="—" value="${esc(s.reps)}" data-reps="${i}">
                    <div class="set-btns"><button type="button" class="sb ok ${s.done?"on":""}" data-done="${i}" aria-label="Feito" title="Feito">${s.done?"✓":""}</button><button type="button" class="sb no ${s.skipped?"on":""}" data-skip="${i}" aria-label="Não realizado" title="Não realizado">${s.skipped?"✕":""}</button></div>
                </div>
            `).join("")}

            <button class="soft" style="width:100%;margin-top:10px" id="finishSession">✓ Finalizar treino</button>
        </div>
    `;

    $("prevExercise").disabled=session.index===0;

    $("nextExercise").textContent=
        session.index===w.exercises.length-1?"Concluir →":"Próximo →";

    $("exerciseSession").querySelectorAll("[data-weight]").forEach(el=>
        el.oninput=()=>logs[+el.dataset.weight].weight=el.value
    );

    $("exerciseSession").querySelectorAll("[data-reps]").forEach(el=>
        el.oninput=()=>logs[+el.dataset.reps].reps=el.value
    );

    const paint=el=>{
        const i=+(el.dataset.done||el.dataset.skip),row=el.closest(".set-row"),s=logs[i];
        row.classList.toggle("done",!!s.done);
        row.classList.toggle("skipped",!!s.skipped);
        const ok=row.querySelector(".ok"),no=row.querySelector(".no");
        ok.classList.toggle("on",!!s.done);ok.textContent=s.done?"✓":"";
        no.classList.toggle("on",!!s.skipped);no.textContent=s.skipped?"✕":"";
        sessionStatus();
    };

    $("exerciseSession").querySelectorAll("[data-done]").forEach(el=>
        el.onclick=()=>{
            const s=logs[+el.dataset.done];
            s.done=!s.done;
            if(s.done)s.skipped=false;
            paint(el);
            if(s.done&&state.prefs.autoRest)startTimer(state.prefs.rest);
        }
    );

    $("exerciseSession").querySelectorAll("[data-skip]").forEach(el=>
        el.onclick=()=>{
            const s=logs[+el.dataset.skip];
            s.skipped=!s.skipped;
            if(s.skipped)s.done=false;
            paint(el);
        }
    );

    sessionStatus();

    $("finishSession").onclick=finishSession;
}

$("prevExercise").onclick=()=>{
    if(session.index>0){
        session.index--;
        renderSession();
    }
};

$("nextExercise").onclick=()=>{
    let w=state.workouts.find(x=>x.id===session.workoutId);

    if(session.index<w.exercises.length-1){
        session.index++;
        renderSession();
    }else{
        finishSession();
    }
};

function finishSession(){
    if(!session)return;

    let w=state.workouts.find(x=>x.id===session.workoutId);

    let sets=[
        ...w.exercises.flatMap(e=>
            session.logs[e.id].map(s=>({...s,name:e.name,muscle:e.muscle,exerciseId:e.id}))
        ),
        ...session.extraSets
    ];

    let done=sets.filter(s=>s.done||s.skipped).length,
        percent=Math.round(done/Math.max(1,sets.length)*100),
        duration=(session.prevDuration||0)+Date.now()-session.start,
        old=session.historyId?state.history.find(x=>x.id===session.historyId):null;

    if(old){
        Object.assign(old,{
            title:w.title,day:w.day,workoutId:w.id,duration,
            exerciseCount:w.exercises.length,sets,percent,updatedAt:Date.now()
        });
    }else{
        state.history.push({
            id:uid(),
            date:new Date().toISOString(),
            workoutId:w.id,
            title:w.title,
            day:w.day,
            duration,
            exerciseCount:w.exercises.length,
            sets,
            percent
        });
    }

    session=null;

    save().then(()=>{
        page("history");
        toast(percent>=100?"Treino pago! 👍":"Progresso salvo — você pode continuar depois ♡");
    });
}

$("exitSession").onclick=()=>{
    const any=Object.values(session.logs).some(l=>l.some(s=>s.done||s.weight||s.reps));

    if(any&&confirm("Salvar o que você já fez para continuar depois (de tarde ou à noite)?\n\nOK = salvar e sair\nCancelar = mais opções")){
        finishSession();
        return;
    }

    if(any&&!confirm("Sair SEM salvar? O que foi preenchido nesta sessão será perdido."))return;

    session=null;
    page("workouts");
};

/* FILTROS */

["search","fDay","fMuscle","fWorkout","fEquip","fStatus"].forEach(id=>
    $(id).addEventListener(id==="search"?"input":"change",renderWorkouts)
);

$("clearFilters").onclick=()=>{
    ["search","fDay","fMuscle","fWorkout","fEquip","fStatus"].forEach(id=>$(id).value="");
    renderWorkouts();
};

/* EDITAR FICHA (somente administradora) */

const grp=m=>String(m||"Outros").split("/")[0].trim()||"Outros";
let exEditing=null;

function openEx(id){
    if(activeProfile!=="admin"){toast("Somente a administradora pode alterar a ficha.");return;}
    exEditing=id;
    const e=id==="new"?null:findExercise(id);

    $("exTitle").textContent=e?"Editar exercício":"Novo exercício";
    $("exWorkout").innerHTML=state.workouts.map(w=>
        `<option value="${esc(w.id)}">${esc(w.day)} • ${esc(w.title)}</option>`
    ).join("");
    $("exWorkout").value=e?e.workoutId:pickedWorkout||state.workouts[0].id;
    $("exName").value=e?e.name:"";
    $("exMuscle").value=e?e.muscle:"";
    $("exEquip").value=e?e.equipment:"";
    $("exSets").value=e?e.sets:3;
    $("exReps").value=e?e.reps:"12 a 15";
    $("muscleList").innerHTML=[...new Set(allExercises().map(x=>grp(x.muscle)))].sort().map(m=>`<option value="${esc(m)}">`).join("");
    $("exDelete").style.display=e?"":"none";
    $("exModal").classList.remove("hidden");
}

const closeEx=()=>$("exModal").classList.add("hidden");
$("exClose").onclick=closeEx;
$("addExercise").onclick=()=>openEx("new");

$("exSave").onclick=()=>{
    const name=$("exName").value.trim();
    if(!name){toast("Informe o nome do exercício");return;}

    const data={
        name,
        muscle:$("exMuscle").value.trim()||"Musculação",
        equipment:$("exEquip").value.trim()||"Peso livre",
        sets:Math.max(1,Math.min(10,+$("exSets").value||3)),
        reps:$("exReps").value.trim()||"12 a 15"
    };

    const target=state.workouts.find(w=>w.id===$("exWorkout").value);

    if(exEditing==="new"){
        target.exercises.push({id:uid(),...data,favorite:false,custom:true});
    }else{
        const from=state.workouts.find(w=>w.exercises.some(x=>x.id===exEditing)),
            ex=from.exercises.find(x=>x.id===exEditing);
        Object.assign(ex,data);
        if(from!==target){
            from.exercises=from.exercises.filter(x=>x!==ex);
            target.exercises.push(ex);
        }
    }

    save().then(()=>{closeEx();render();toast("Ficha atualizada ♡");});
};

$("exDelete").onclick=()=>{
    if(!confirm("Remover este exercício da ficha? O histórico já registrado continua guardado."))return;
    state.workouts.forEach(w=>w.exercises=w.exercises.filter(x=>x.id!==exEditing));
    save().then(()=>{closeEx();render();toast("Exercício removido da ficha");});
};

/* GRÁFICO */

$("progressExercise").onchange=drawChart;

/* EXPORTAR BACKUP */

$("exportData").onclick=()=>{
    let blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"});
    let a=document.createElement("a");
    a.href=URL.createObjectURL(blob);
    a.download="meu-treino-"+activeProfile+"-backup.json";
    a.click();
    URL.revokeObjectURL(a.href);
};

/* IMPORTAR BACKUP */

$("importData").onchange=async ev=>{
    let f=ev.target.files[0];
    if(!f)return;

    try{
        let data=JSON.parse(await f.text());

        if(!data.workouts||!data.history)throw Error();

        if(confirm("Importar backup e substituir a ficha e os dados atuais?")){
            state=data;
            ensureState();
            await save();
            render();
            toast("Backup restaurado");
        }
    }catch(e){
        alert("Arquivo JSON inválido.");
    }

    ev.target.value="";
};

/* RESTAURAR FICHA ORIGINAL */

$("resetData").onclick=()=>{
    if(activeProfile!=="admin"){
        toast("Somente a administradora pode restaurar a ficha.");
        return;
    }

    if(confirm("Restaurar a ficha original? Seu histórico, água e peso serão preservados.")){
        let del=state.deleted,
            hist=state.history,
            water=state.water,
            weight=state.weight,
            meas=state.measures,
            wGoal=state.prefs.weightGoal,
            goal=state.prefs.waterGoal;

        state=initial();
        state.deleted=del||[];
        state.history=hist;
        state.water=water;
        state.prefs.waterGoal=goal||2000;
        state.weight=weight||{};
        state.measures=meas||{};
        if(wGoal)state.prefs.weightGoal=wGoal;

        save().then(render);
        toast("Ficha original restaurada");
    }
};

/* CRONÔMETRO */

function showTimer(){
    $("timerModal").classList.remove("hidden");
    updateTimer();
}

function updateTimer(){
    $("timerDisplay").textContent=
        `${String(Math.floor(timer.left/60)).padStart(2,"0")}:${String(timer.left%60).padStart(2,"0")}`;
    $("timerStart").textContent=timer.running?"Pausar":"Iniciar";
}

function startTimer(sec=timer.left){
    timer.left=Math.max(0,sec);
    timer.running=true;
    timer.end=Date.now()+timer.left*1000;

    if(timerInterval)clearInterval(timerInterval);

    timerInterval=setInterval(()=>{
        timer.left=Math.max(0,Math.ceil((timer.end-Date.now())/1000));
        updateTimer();

        if(timer.left<=0){
            clearInterval(timerInterval);
            timer.running=false;
            timerInterval=null;
            timerDone();
        }
    },250);

    updateTimer();
}

function timerDone(){
    timer.running=false;
    updateTimer();
    toast("Descanso concluído! ♡");
    if("vibrate"in navigator)navigator.vibrate([200,100,200]);
}

function stopTimer(){
    if(timerInterval)clearInterval(timerInterval);
    timerInterval=null;
    timer.running=false;
}

$("sessionTimer").onclick=showTimer;

$("closeTimer").onclick=()=>$("timerModal").classList.add("hidden");

$("timerStart").onclick=()=>{
    timer.running?(stopTimer(),updateTimer()):startTimer();
};

$("timerReset").onclick=()=>{
    stopTimer();
    timer.left=timer.seconds;
    updateTimer();
};

$("timerPlus").onclick=()=>{
    timer.left+=15;
    timer.seconds+=15;
    if(timer.running)timer.end+=15000;
    updateTimer();
};

$("timerMinus").onclick=()=>{
    timer.left=Math.max(0,timer.left-15);
    timer.seconds=Math.max(15,timer.seconds-15);
    if(timer.running)timer.end-=15000;
    updateTimer();
};

document.querySelectorAll("[data-time]").forEach(b=>
    b.onclick=()=>{
        stopTimer();
        timer.seconds=timer.left=+b.dataset.time;
        state.prefs.rest=timer.seconds;
        save();
        updateTimer();
    }
);

$("autoRest").checked=state.prefs.autoRest;

$("autoRest").onchange=()=>{
    state.prefs.autoRest=$("autoRest").checked;
    save();
};

/* ESTILIZAÇÃO DO HISTÓRICO */

(function addHistoryDeleteStyles(){
    if(document.getElementById("historyDeleteStyles"))return;

    const style=document.createElement("style");
    style.id="historyDeleteStyles";
    style.textContent=`
        .history-head{display:flex;justify-content:space-between;align-items:center;gap:12px}
        .delete-history{flex:0 0 38px;width:38px;height:38px;border:0;border-radius:10px;background:var(--softer);color:var(--deep);font-size:17px;cursor:pointer;transition:transform .2s,background .2s}
        .delete-history:hover{transform:scale(1.05)}
        .history-info{display:flex;flex-wrap:wrap;gap:10px;margin:10px 0;font-size:.85em}
        .history-progress{height:6px;overflow:hidden;border-radius:99px;background:var(--track);margin:8px 0}
        .history-progress>div{height:100%;border-radius:99px;background:linear-gradient(90deg,var(--pink),var(--accent))}
        .history-empty{text-align:center;padding:28px 16px;color:inherit}
    `;
    document.head.appendChild(style);
})();

/* FUNÇÃO DE SEGURANÇA PARA TEXTOS */

function esc(s){
    return String(s??"").replace(/[&<>"']/g,c=>({
        "&":"&amp;",
        "<":"&lt;",
        ">":"&gt;",
        '"':"&quot;",
        "'":"&#39;"
    }[c]));
}

/* =========================================
   MEDIDAS CORPORAIS 📏
   ========================================= */

const MFIELDS=[
    {g:"Tronco",items:[
        ["pescoco","Pescoço","abaixo do pomo de adão"],
        ["ombros","Ombros","contorno na parte mais larga"],
        ["torax","Tórax / busto","altura dos mamilos, sem apertar"],
        ["cintura","Cintura","parte mais estreita do tronco"],
        ["abdomen","Abdômen","na altura do umbigo"],
        ["quadril","Quadril","parte mais larga do bumbum"]
    ]},
    {g:"Braços",items:[
        ["bracoD","Braço direito","meio do braço, relaxado"],
        ["bracoE","Braço esquerdo","meio do braço, relaxado"],
        ["antebracoD","Antebraço direito","parte mais grossa"],
        ["antebracoE","Antebraço esquerdo","parte mais grossa"]
    ]},
    {g:"Pernas",items:[
        ["coxaD","Coxa direita","parte mais grossa, perto do quadril"],
        ["coxaE","Coxa esquerda","parte mais grossa, perto do quadril"],
        ["panturrilhaD","Panturrilha direita","parte mais grossa"],
        ["panturrilhaE","Panturrilha esquerda","parte mais grossa"]
    ]},
    {g:"Composição (opcional)",items:[
        ["gordura","% de gordura","se você tiver bioimpedância ou adipômetro"]
    ]}
];

const MALL=MFIELDS.flatMap(g=>g.items),
    mLabel=k=>(MALL.find(x=>x[0]===k)||[k,k])[1],
    mUnit=k=>k==="gordura"?"%":"cm";

let measSel=null,measToken="";

function measOk(k,v){
    return k==="gordura"?(v>=2&&v<=70):(v>=5&&v<=300);
}

function bindMeasures(){
    if(!$("measForm"))return;

    measSel=waterKey();
    $("measDate").max=measSel;
    $("measDate").value=measSel;

    $("measForm").innerHTML=MFIELDS.map(g=>`
        <h4>${esc(g.g)}</h4>
        <div class="meas-grid">${g.items.map(i=>`
            <label class="fl">${esc(i[1])} (${mUnit(i[0])})<span class="tip">${esc(i[2])}</span>
                <input type="text" inputmode="decimal" id="m_${i[0]}" placeholder="ex.: 70,5">
            </label>`).join("")}
        </div>`).join("");

    $("measDate").onchange=()=>{
        if(!$("measDate").value)return;
        measSel=$("measDate").value>waterKey()?waterKey():$("measDate").value;
        $("measDate").value=measSel;
        measToken="";
        renderMeasures();
    };

    $("measSave").onclick=()=>{
        const entry={};
        let bad=null;

        MALL.forEach(i=>{
            const raw=$("m_"+i[0]).value.trim();
            if(!raw)return;
            const v=parseKg(raw);
            if(!measOk(i[0],v))bad=bad||i[1];
            else entry[i[0]]=Math.round(v*10)/10;
        });

        if(bad){toast(`Valor inválido em: ${bad}`);return;}
        if(!Object.keys(entry).length){toast("Preencha pelo menos uma medida");return;}

        state.measures[measSel]=entry;
        measToken="";
        save().then(renderMeasures);
        toast(`Medidas de ${keyBR(measSel)} salvas ♡`);
    };

    $("measRemove").onclick=()=>{
        if(!state.measures[measSel]){toast("Não há medidas nesta data");return;}
        if(!confirm(`Remover as medidas de ${keyBR(measSel)}?`))return;
        delete state.measures[measSel];
        measToken="";
        save().then(renderMeasures);
        toast("Registro removido");
    };

    $("measCopy").onclick=()=>{
        const prev=Object.keys(state.measures).sort().filter(k=>k<measSel).pop()||
            Object.keys(state.measures).sort().filter(k=>k!==measSel).pop();
        if(!prev){toast("Ainda não há medidas anteriores");return;}
        MALL.forEach(i=>{
            const v=state.measures[prev][i[0]];
            $("m_"+i[0]).value=v!=null?fmtKg(v):"";
        });
        toast(`Valores de ${keyBR(prev)} copiados — ajuste e salve`);
    };

    $("measField").onchange=drawMeasChart;

    $("measHistory").onclick=ev=>{
        const b=ev.target.closest("[data-mdate]");
        if(!b)return;
        measSel=b.dataset.mdate;
        $("measDate").value=measSel;
        measToken="";
        renderMeasures();
        $("measForm").scrollIntoView({behavior:"smooth",block:"start"});
    };
}

function renderMeasures(){
    if(!$("measForm"))return;

    const dates=Object.keys(state.measures).sort(),
        todayKey=waterKey();

    /* status semanal */
    if(!dates.length){
        $("measStatus").textContent="Nenhuma medição ainda. Faça a primeira hoje e repita a cada 7 dias.";
    }else{
        const last=dates[dates.length-1],
            days=Math.round((keyToDate(todayKey)-keyToDate(last))/86400000),
            next=keyToDate(last);
        next.setDate(next.getDate()+7);

        $("measStatus").textContent=days>=7?
            `Última medição em ${keyBR(last)} (há ${days} dias). Já passou de 1 semana: hora de medir de novo!`:
            `Última medição em ${keyBR(last)}. Próxima sugerida: ${next.toLocaleDateString("pt-BR")} (em ${7-days} dia(s)). ${dates.length} registro(s) no total.`;
    }

    /* formulário (só recarrega quando muda a data ou os dados) */
    const token=activeProfile+"|"+measSel+"|"+JSON.stringify(state.measures[measSel]||null);
    if(token!==measToken){
        measToken=token;
        $("measDate").value=measSel;
        MALL.forEach(i=>{
            const v=(state.measures[measSel]||{})[i[0]];
            $("m_"+i[0]).value=v!=null?fmtKg(v):"";
        });
    }

    /* seletor de medida para o gráfico */
    const withData=MALL.filter(i=>dates.some(d=>state.measures[d][i[0]]!=null)),
        old=$("measField").value;

    $("measField").innerHTML=withData.length?
        withData.map(i=>`<option value="${i[0]}">${esc(i[1])} (${mUnit(i[0])})</option>`).join(""):
        `<option value="">Sem medidas ainda</option>`;

    if(withData.some(i=>i[0]===old))$("measField").value=old;
    else if(withData.some(i=>i[0]==="cintura"))$("measField").value="cintura";

    drawMeasChart();

    /* comparativo */
    if(!withData.length){
        $("measTable").innerHTML=`<p class="muted">Salve a primeira medição para ver o comparativo.</p>`;
    }else{
        const delta=(a,b,k)=>{
            if(a==null||b==null)return "—";
            const d=Math.round((a-b)*10)/10;
            if(d===0)return "0";
            return `<span class="${d<0?"dn":"up"}">${d<0?"▼":"▲"} ${fmtKg(Math.abs(d))}</span>`;
        };

        $("measTable").innerHTML=`<table class="meas-table">
            <tr><th>Medida</th><th>Primeira</th><th>Anterior</th><th>Atual</th><th>vs anterior</th><th>vs primeira</th></tr>
            ${withData.map(i=>{
                const vals=dates.filter(d=>state.measures[d][i[0]]!=null).map(d=>state.measures[d][i[0]]),
                    first=vals[0],cur=vals[vals.length-1],prev=vals.length>1?vals[vals.length-2]:null;
                return `<tr><td>${esc(i[1])}</td><td>${fmtKg(first)}</td><td>${prev!=null?fmtKg(prev):"—"}</td><td><b>${fmtKg(cur)}</b></td><td>${delta(cur,prev)}</td><td>${vals.length>1?delta(cur,first):"—"}</td></tr>`;
            }).join("")}
        </table>`;
    }

    /* histórico semanal */
    $("measHistory").innerHTML=dates.length?
        [...dates].reverse().map(d=>{
            const m=state.measures[d],
                sum=["cintura","abdomen","quadril"].filter(k=>m[k]!=null).map(k=>`${mLabel(k)} ${fmtKg(m[k])}`).join(" • ");
            return `<div class="meas-item"><div><b>${keyToDate(d).toLocaleDateString("pt-BR",{weekday:"short",day:"2-digit",month:"2-digit",year:"numeric"})}</b><span>${Object.keys(m).length} medida(s)${sum?" • "+esc(sum):""}</span></div><button type="button" class="soft" data-mdate="${d}">✎ Ver / editar</button></div>`;
        }).join(""):
        `<p class="muted">Nenhum registro ainda.</p>`;
}

function drawMeasChart(){
    const k=$("measField").value,wrap=$("measChartWrap"),cv=$("measChart"),ctx=cv.getContext("2d"),
        th=THEMES[activeProfile]||THEMES.friend,H=200,ratio=devicePixelRatio||1,step=56,pad=38;

    const pts=Object.keys(state.measures).sort()
        .filter(d=>k&&state.measures[d][k]!=null)
        .map(d=>({d,v:state.measures[d][k]}));

    const W=Math.max(wrap.clientWidth||300,pad+pts.length*step+10);
    cv.style.width=W+"px";
    cv.width=W*ratio;
    cv.height=H*ratio;
    ctx.setTransform(ratio,0,0,ratio,0,0);
    ctx.clearRect(0,0,W,H);

    if(!pts.length){
        $("measChartNote").textContent="Salve suas medidas para ver a evolução semana a semana.";
        return;
    }

    const vs=pts.map(p=>p.v),mn=Math.min(...vs),mx=Math.max(...vs),sp=(mx-mn)||2,
        lo=mn-sp*.3,hi=mx+sp*.3,top=22,base=H-32,
        y=v=>base-(v-lo)/(hi-lo)*(base-top);

    ctx.strokeStyle=th.border;ctx.lineWidth=1;
    ctx.beginPath();ctx.moveTo(pad,top-8);ctx.lineTo(pad,base);ctx.lineTo(W-6,base);ctx.stroke();

    ctx.font="10px sans-serif";ctx.fillStyle="#887780";
    ctx.textAlign="right";
    ctx.fillText(fmtKg(hi),pad-4,top);
    ctx.fillText(fmtKg(lo),pad-4,base);
    ctx.textAlign="center";

    pts.forEach((p,i)=>ctx.fillText(p.d.slice(8)+"/"+p.d.slice(5,7),pad+step*(i+.5),H-14));

    ctx.strokeStyle=th.dark;ctx.lineWidth=3;ctx.lineJoin="round";
    ctx.beginPath();
    pts.forEach((p,i)=>{const x=pad+step*(i+.5);i?ctx.lineTo(x,y(p.v)):ctx.moveTo(x,y(p.v));});
    ctx.stroke();

    pts.forEach((p,i)=>{
        const x=pad+step*(i+.5);
        ctx.fillStyle=th.dark;
        ctx.beginPath();ctx.arc(x,y(p.v),4.5,0,7);ctx.fill();
        ctx.fillStyle="#332a30";
        ctx.fillText(fmtKg(p.v),x,y(p.v)-9);
    });

    const diff=Math.round((vs[vs.length-1]-vs[0])*10)/10;
    $("measChartNote").textContent=
        `${pts.length} registro(s)`+(pts.length>1?` • ${diff>0?"+":diff<0?"−":""}${fmtKg(Math.abs(diff))} ${mUnit(k)} desde ${keyBR(pts[0].d)}`:"");

    wrap.scrollLeft=wrap.scrollWidth;
}

/* =========================================
   SINCRONIZAÇÃO ENTRE APARELHOS ☁
   (Firebase Firestore via REST, consulta a cada ~5 s)
   ========================================= */

/* Preencha aqui UMA vez (vale para todos os aparelhos que receberem este arquivo),
   ou deixe vazio e preencha na tela: Início > Opções e backup > Sincronização. */
const CLOUD_DEFAULT={projectId:"meutreino-f0fd4",apiKey:"AIzaSyCzHYIrNrbYLOfUdTc_XijOcGGzx3WbfrI",secret:"treino-kn-7h3q9x2m"};

function cloudCfg(){
    try{
        const c=JSON.parse(localStorage.getItem("meuTreinoCloud")||"null");
        if(c&&c.projectId&&c.apiKey&&c.secret)return c;
    }catch(e){}
    return CLOUD_DEFAULT;
}
const cloudOn=()=>{const c=cloudCfg();return !!(c.projectId&&c.apiKey&&/^[A-Za-z0-9_-]{8,}$/.test(c.secret||""));};

let ownState=null,viewing=false,syncing=false,syncAgain=false,pollN=0,pendingRender=false,
    fichaSig="",pushTimer=null,badgeText="";

const otherKey=()=>activeProfile==="admin"?"friend":"admin";
const otherName=()=>profileNames[otherKey()]||"Naty";

/* JSON com chaves ordenadas: dois aparelhos geram o mesmo texto para os mesmos dados */
function stable(o){
    if(Array.isArray(o))return "["+o.map(stable).join(",")+"]";
    if(o&&typeof o==="object")
        return "{"+Object.keys(o).sort().filter(k=>o[k]!==undefined).map(k=>JSON.stringify(k)+":"+stable(o[k])).join(",")+"}";
    const s=JSON.stringify(o);
    return s===undefined?"null":s;
}

const histSort=(a,b)=>String(a.date).localeCompare(String(b.date))||String(a.id).localeCompare(String(b.id));

function payload(s){
    return {
        history:[...(s.history||[])].sort(histSort),
        water:s.water||{},
        weight:s.weight||{},
        measures:s.measures||{},
        prefs:s.prefs||{},
        deleted:[...new Set(s.deleted||[])].sort(),
        updatedAt:s.updatedAt||0
    };
}

/* Mescla os dados remotos dentro do objeto local, sem perder nada que só existe aqui */
function mergeInto(t,r){
    if(!r)return false;
    const sig=()=>stable([t.history,t.water,t.weight,t.measures,t.prefs,t.deleted,t.updatedAt]);
    const before=sig();

    const del=[...new Set([...(t.deleted||[]),...(r.deleted||[])])].sort();
    t.deleted=del;

    const m=new Map();
    (t.history||[]).forEach(h=>m.set(h.id,h));
    (r.history||[]).forEach(h=>{
        const a=m.get(h.id);
        if(!a||(h.updatedAt||0)>(a.updatedAt||0))m.set(h.id,h);
    });
    const ds=new Set(del);
    t.history=[...m.values()].filter(h=>!ds.has(h.id)).sort(histSort);

    if((r.updatedAt||0)>(t.updatedAt||0)){
        ["water","weight","measures","prefs"].forEach(k=>{if(r[k])t[k]=r[k];});
        t.updatedAt=r.updatedAt;
    }
    return sig()!==before;
}

/* ----- IndexedDB ----- */
function idbGet(k){
    return new Promise(res=>{
        try{
            const r=db.transaction("data","readonly").objectStore("data").get(k);
            r.onsuccess=()=>res(r.result);
            r.onerror=()=>res(undefined);
        }catch(e){res(undefined);}
    });
}
function idbPut(k,v){
    return new Promise(res=>{
        try{
            const tx=db.transaction("data","readwrite");
            tx.objectStore("data").put(v,k);
            tx.oncomplete=()=>res();
            tx.onerror=()=>res();
        }catch(e){res();}
    });
}
async function readProfile(p){
    return (await idbGet("state_"+p))||(p==="admin"?await idbGet("state"):null)||null;
}

/* ----- Firestore (REST) ----- */
function fsUrl(name){
    const c=cloudCfg();
    return `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(c.projectId)}/databases/(default)/documents/treino_${encodeURIComponent(c.secret)}/${name}?key=${encodeURIComponent(c.apiKey)}`;
}
async function fsFetch(url,opt){
    const ctl=new AbortController(),t=setTimeout(()=>ctl.abort(),9000);
    try{return await fetch(url,{...(opt||{}),signal:ctl.signal});}
    finally{clearTimeout(t);}
}
async function cloudGet(name){
    const r=await fsFetch(fsUrl(name));
    if(r.status===404)return null;
    if(!r.ok)throw new Error("HTTP "+r.status);
    const j=await r.json(),raw=j.fields&&j.fields.json&&j.fields.json.stringValue;
    return raw?{raw,obj:JSON.parse(raw)}:null;
}
async function cloudPut(name,raw){
    const r=await fsFetch(fsUrl(name)+"&updateMask.fieldPaths=json",{
        method:"PATCH",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({fields:{json:{stringValue:raw}}})
    });
    if(!r.ok)throw new Error("HTTP "+r.status);
}

/* ----- ficha (compartilhada; só a administradora publica) ----- */
const fsig=w=>stable((w||[]).map(x=>({...x,exercises:(x.exercises||[]).map(({favorite,...r})=>r)})));

async function applyFicha(o){
    const favs={};
    (ownState.workouts||[]).forEach(w=>w.exercises.forEach(e=>favs[e.id]=e.favorite));
    const w=o.workouts.map(x=>({...x,exercises:x.exercises.map(e=>({...e,favorite:!!favs[e.id]}))}));

    ownState.workouts=w;
    if(state!==ownState)state.workouts=w;
    fichaSig=fsig(w);

    await idbPut("shared_workouts",w);
    await idbPut("ficha_at",o.at);
    await idbPut("state_"+activeProfile,ownState);
}

/* ----- ciclo de sincronização ----- */
function setBadge(t){
    badgeText=t;
    if($("syncBadge"))$("syncBadge").textContent=t;
    if($("cloudStatus"))$("cloudStatus").textContent=t;
}

async function syncNow(){
    if(!cloudOn()||!db||!ownState){setBadge(cloudOn()?"☁ aguardando":"☁ sincronização desligada");return;}
    if(syncing){syncAgain=true;return;}
    syncing=true;

    let changed=false;

    try{
        const me=activeProfile,ot=otherKey();

        /* 1) meus dados */
        const rOwn=await cloudGet("perfil_"+me);
        if(rOwn&&mergeInto(ownState,rOwn.obj)){
            changed=true;
            await idbPut("state_"+me,ownState);
        }
        const rawOwn=stable(payload(ownState));
        if(!rOwn||rOwn.raw!==rawOwn)await cloudPut("perfil_"+me,rawOwn);

        /* 2) dados da outra pessoa (só leitura) */
        const rOt=await cloudGet("perfil_"+ot);
        let os=viewing?state:await readProfile(ot);

        if(rOt){
            if(!os){os=initial();os.workouts=ownState.workouts;}
            if(mergeInto(os,rOt.obj)){
                changed=true;
                await idbPut("state_"+ot,os);
            }
        }else if(os&&((os.history||[]).length||Object.keys(os.weight||{}).length)){
            await cloudPut("perfil_"+ot,stable(payload(os)));
        }

        /* 3) ficha (a cada 6 consultas) */
        if(pollN%6===0){
            const rf=await cloudGet("ficha"),at=(await idbGet("ficha_at"))||0;
            if(rf&&rf.obj.at>at&&!session){
                await applyFicha(rf.obj);
                changed=true;
            }else if(me==="admin"&&(!rf||at>rf.obj.at)){
                const at2=at||Date.now();
                if(!at)await idbPut("ficha_at",at2);
                await cloudPut("ficha",stable({at:at2,workouts:ownState.workouts}));
            }
        }
        pollN++;

        setBadge("☁ Sincronizado às "+new Date().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",second:"2-digit"}));
        if(changed)refreshUI();
    }catch(e){
        setBadge(navigator.onLine===false?"☁ sem internet — dados guardados no aparelho":"☁ erro ao sincronizar ("+(e&&e.message||"rede")+")");
    }finally{
        syncing=false;
        if(syncAgain){syncAgain=false;setTimeout(syncNow,300);}
    }
}

function pushSoon(){
    if(!cloudOn())return;
    clearTimeout(pushTimer);
    pushTimer=setTimeout(syncNow,700);
}

function refreshUI(){
    const a=document.activeElement;
    if(session||(a&&/^(INPUT|TEXTAREA)$/.test(a.tagName))||!$("profilePicker").classList.contains("hidden")){
        pendingRender=true;
        return;
    }
    pendingRender=false;
    render();
}

setInterval(()=>{
    if(document.hidden)return;
    if(pendingRender)refreshUI();
    syncNow();
},5000);
document.addEventListener("visibilitychange",()=>{if(!document.hidden){pollN=0;syncNow();}});
window.addEventListener("online",()=>{pollN=0;syncNow();});
window.addEventListener("focus",()=>syncNow());

/* ----- ver os dados da outra pessoa ----- */
async function setView(mode){
    const wantOther=mode==="other";

    if(wantOther&&session){toast("Finalize ou saia do treino primeiro.");return;}

    if(wantOther){
        const s=(await readProfile(otherKey()))||initial();
        s.workouts=ownState.workouts;
        state=s;
        viewing=true;
        ensureState();
        syncNow();
    }else{
        viewing=false;
        state=ownState;
    }

    updateViewBar();
    render();
}

function updateViewBar(){
    if(!$("viewBar"))return;
    $("viewOtherBtn").textContent="Dados da "+otherName();
    $("viewBar").querySelectorAll("[data-view]").forEach(b=>
        b.classList.toggle("on",(b.dataset.view==="other")===viewing)
    );
    $("viewNote").hidden=!viewing;
    $("viewNote").textContent="Visualizando os dados de "+otherName()+" (somente leitura)";
    document.body.classList.toggle("viewing",viewing);
    if(badgeText)setBadge(badgeText);
    else setBadge(cloudOn()?"☁ conectando…":"☁ sincronização desligada");
}

function bindCloud(){
    $("viewBar").querySelectorAll("[data-view]").forEach(b=>b.onclick=()=>setView(b.dataset.view));

    const c=cloudCfg();
    $("cloudProject").value=c.projectId||"";
    $("cloudKey").value=c.apiKey||"";
    $("cloudSecret").value=c.secret||"";

    $("cloudSave").onclick=()=>{
        const cfg={
            projectId:$("cloudProject").value.trim(),
            apiKey:$("cloudKey").value.trim(),
            secret:$("cloudSecret").value.trim()
        };
        if(!cfg.projectId||!cfg.apiKey){toast("Preencha o ID do projeto e a chave da API");return;}
        if(!/^[A-Za-z0-9_-]{8,}$/.test(cfg.secret)){toast("O código secreto precisa ter 8+ letras/números (sem espaços)");return;}
        try{localStorage.setItem("meuTreinoCloud",JSON.stringify(cfg));}catch(e){}
        pollN=0;
        setBadge("☁ conectando…");
        syncNow();
        toast("Sincronização ligada ☁");
    };

    $("cloudOff").onclick=()=>{
        try{localStorage.removeItem("meuTreinoCloud");}catch(e){}
        setBadge(cloudOn()?"☁ usando configuração do app":"☁ sincronização desligada");
        toast("Sincronização desligada neste aparelho");
    };

    updateViewBar();
}

const DUMBBELL='<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11"/></svg>';

/* INICIALIZAÇÃO DO APLICATIVO */

(async()=>{
    bindWater();
    bindWeight();
    bindRem();
    bindMeasures();

    $("workoutPicker").onchange=()=>{pickedWorkout=$("workoutPicker").value;renderHome();};
    $("weekSelect").onchange=()=>{weekOffset=+$("weekSelect").value;renderHome();};
    $("weekPrev").onclick=()=>{weekOffset=Math.min(26,weekOffset+1);renderHome();};
    $("weekNext").onclick=()=>{weekOffset=Math.max(0,weekOffset-1);renderHome();};

    if(navigator.storage&&navigator.storage.persist)navigator.storage.persist().catch(()=>{});

    try{
        await openDB();

        try{
            activeProfile=localStorage.getItem("meuTreinoPerfilAtivo")||"admin";
        }catch(e){
            activeProfile="admin";
        }

        await load();
        ownState=state;
        fichaSig=fsig(state.workouts);
    }catch(e){
        toast("Armazenamento local indisponível");
    }

    ensureState();

    timer.seconds=timer.left=state.prefs.rest||60;

    ownState=state;
    updateProfileUI();
    bindCloud();
    render();
    openProfilePicker();
    syncNow();

    if("serviceWorker"in navigator&&location.protocol!=="file:"){
        const hadController=!!navigator.serviceWorker.controller;
        navigator.serviceWorker.addEventListener("controllerchange",()=>{if(hadController)location.reload();});
        navigator.serviceWorker.register("service-worker.js").catch(()=>{});
    }
})();
