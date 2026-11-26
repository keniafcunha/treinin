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
    let month=new Date().getMonth();

    $("monthlyCount").textContent=
        state.history.filter(h=>new Date(h.date).getMonth()===month).length;

    let sets=state.history.flatMap(h=>h.sets.filter(s=>s.done&&+s.weight>0));

    $("bestSet").textContent=sets.length?Math.max(...sets.map(s=>+s.weight)):"—";

    const g={},addG=(k,n)=>{(g[k]=g[k]||new Set()).add(n);},
        wlabel=t=>String(t||"Outros").replace(/^\s*Treino\s*\d+\s*[:\-–—]\s*/i,"").trim()||"Outros";

    state.workouts.forEach(w=>w.exercises.forEach(e=>addG(wlabel(w.title),e.name)));
    state.history.forEach(h=>(h.sets||[]).forEach(s=>addG(wlabel(h.title),s.name)));

    progressGroups=g;

    const oldG=$("progressGroup").value;
    $("progressGroup").innerHTML=Object.keys(g).map(k=>`<option>${esc(k)}</option>`).join("");
    if(g[oldG])$("progressGroup").value=oldG;

    fillProgressExercises();

    let weekly=Array.from({length:7},(_,i)=>
        state.history.filter(h=>{
            let d=new Date(h.date);
            return Math.floor((Date.now()-d.getTime())/604800000)===i;
        }).length
    ).reverse();

    $("weeklyBars").innerHTML=weekly.map((v,i)=>
        `<div class="bar-item">
            <div class="bar" style="height:${Math.max(4,v*18)}px"></div>
            ${7-i} sem.
        </div>`
    ).join("");
}

let progressGroups={};

function fillProgressExercises(){
    const names=[...(progressGroups[$("progressGroup").value]||[])],
        old=$("progressExercise").value;

    $("progressExercise").innerHTML=names.map(n=>`<option>${esc(n)}</option>`).join("");
    if(names.includes(old))$("progressExercise").value=old;
    drawChart();
}

$("progressGroup").onchange=fillProgressExercises;

function drawChart(){
    let canvas=$("progressChart"),
        ctx=canvas.getContext("2d"),
        name=$("progressExercise").value,
        theme=THEMES[activeProfile]||THEMES.friend;

    let records=state.history.flatMap(h=>
        h.sets.filter(s=>s.name===name&&s.done&&+s.weight>0).map(s=>({
            date:new Date(h.date),
            weight:+s.weight
        }))
    );

    let width=canvas.clientWidth||300,
        ratio=devicePixelRatio||1;

    canvas.width=width*ratio;
    canvas.height=220*ratio;

    ctx.scale(ratio,ratio);
    ctx.clearRect(0,0,width,220);

    if(!records.length){
        $("chartNote").textContent="Registre cargas durante seus treinos para acompanhar a evolução.";
        return;
    }

    let max=Math.max(...records.map(r=>r.weight)),
        min=Math.min(...records.map(r=>r.weight)),
        pad=28;

    ctx.strokeStyle=theme.border;
    ctx.lineWidth=1;
    ctx.beginPath();
    ctx.moveTo(pad,15);
    ctx.lineTo(pad,185);
    ctx.lineTo(width-10,185);
    ctx.stroke();

    ctx.strokeStyle=theme.primary;
    ctx.lineWidth=3;
    ctx.beginPath();

    records.forEach((r,i)=>{
        let x=pad+i*(width-pad-18)/Math.max(1,records.length-1),
            y=175-(r.weight-min)/(max-min||1)*135;
        if(i===0)ctx.moveTo(x,y);
        else ctx.lineTo(x,y);
    });

    ctx.stroke();

    records.forEach((r,i)=>{
        let x=pad+i*(width-pad-18)/Math.max(1,records.length-1),
            y=175-(r.weight-min)/(max-min||1)*135;
        ctx.fillStyle=theme.secondary;
        ctx.beginPath();
        ctx.arc(x,y,4.5,0,7);
        ctx.fill();
    });

    $("chartNote").textContent=`${records.length} registro(s) • melhor carga: ${max} kg`;
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
