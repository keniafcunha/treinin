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
    admin:{ /* Kenia: roxo/lilás pastel + azul bebê pastel (sem rosa) */
        primary:"#a98ee6",
        secondary:"#89c8f5",
        dark:"#6b52ae",
        soft:"#efe9fc",
        softAlt:"#e6f3fd",
        border:"#ddd3f5",
        track:"#e5effb",
        ink:"#2a2638",
        muted:"#746e88",
        shadow:"0 8px 28px rgba(139, 120, 210, 0.12)",
        heroGrad:"linear-gradient(135deg, #b79ff0 0%, #8bc9f6 100%)",
        bg:"linear-gradient(160deg, #f4efff 0%, #eaf5ff 100%)",
        meta:"#b79ff0"
    },
    friend:{ /* Naty: rosa pastel + laranja pastel */
        primary:"#f08ab5",
        secondary:"#f7a976",
        dark:"#c85874",
        soft:"#fdebf2",
        softAlt:"#fff1e6",
        border:"#f4d5df",
        track:"#fce9e2",
        ink:"#36282a",
        muted:"#8a7478",
        shadow:"0 8px 28px rgba(235, 138, 155, 0.13)",
        heroGrad:"linear-gradient(135deg, #f59ec2 0%, #f8b07c 100%)",
        bg:"linear-gradient(160deg, #fff2f7 0%, #fff4ea 100%)",
        meta:"#f59ec2"
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
    prefs:{rest:60,autoRest:false,waterGoal:2000}
});

/* Garante que dados antigos (sem água) continuem funcionando */
function ensureState(){
    if(!state.history)state.history=[];
    if(!state.water)state.water={};
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
    const t=THEMES[profile]||THEMES.admin,
        root=document.documentElement;

    root.style.setProperty("--primary",t.primary);
    root.style.setProperty("--secondary",t.secondary);
    root.style.setProperty("--accent-dark",t.dark);
    root.style.setProperty("--soft",t.soft);
    root.style.setProperty("--soft-alt",t.softAlt);
    root.style.setProperty("--border",t.border);
    root.style.setProperty("--track",t.track);
    root.style.setProperty("--ink",t.ink);
    root.style.setProperty("--muted",t.muted);
    root.style.setProperty("--shadow",t.shadow);
    root.style.setProperty("--hero-grad",t.heroGrad);
    root.style.setProperty("--bg-grad",t.bg);

    let meta=document.querySelector('meta[name="theme-color"]');
    if(!meta){
        meta=document.createElement("meta");
        meta.name="theme-color";
        document.head.appendChild(meta);
    }
    meta.content=t.meta;

    document.body.dataset.theme=profile;
}

function updateProfileUI(){
    const name=profileNames[activeProfile]||"Kenia";

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

    timer.seconds=timer.left=state.prefs.rest||60;
    $("autoRest").checked=!!state.prefs.autoRest;

    updateProfileUI();
    $("profilePicker").classList.add("hidden");
    render();
}

document.querySelectorAll("[data-profile]").forEach(b=>
    b.onclick=()=>selectProfile(b.dataset.profile)
);

$("profileSwitchHome").onclick=
$("profileSwitchButton").onclick=openProfilePicker;

function renderHome(){
    let idx=todayIndex(),
        w=state.workouts[idx];

    $("todayWorkout").textContent=w.title;

    $("todayMeta").textContent=w.exercises.length?
        `${w.exercises.length} exercícios • ${w.muscle}`:
        "Dia de descanso e recuperação";

    $("todayLabel").textContent=new Date().toLocaleDateString(
        "pt-BR",
        {weekday:"long",day:"numeric",month:"long"}
    );

    $("startToday").textContent=w.exercises.length?
        "♡ Iniciar treino":
        "♡ Dia de recuperação";

    $("startToday").onclick=()=>w.exercises.length?
        startWorkout(w.id):
        toast("Aproveite seu dia de recuperação ♡");

    let completed=state.history.filter(h=>
        sameWeek(new Date(h.date),new Date())
    ).length;

    $("weekCount").textContent=`${Math.min(completed,6)}/6 concluídos`;

    $("weekStrip").innerHTML=SHORT.map((d,i)=>
        `<div class="week-day ${i===idx?"today":""} ${state.history.some(h=>new Date(h.date).toDateString()===dayDate(i).toDateString())?"done":""}">${d}<b>${i+1}</b>${i===6?"♡":""}</div>`
    ).join("");

    $("totalSessions").textContent=state.history.length;

    $("totalSets").textContent=state.history.reduce(
        (n,h)=>n+h.sets.filter(s=>s.done).length,
        0
    );
}

function dayDate(i){
    let d=new Date(),
        diff=(i+1)-(d.getDay()||7);
    d.setDate(d.getDate()+diff);
    return d;
}

function sameWeek(a,b){
    return a.getFullYear()===b.getFullYear()&&
        Math.abs((a-b)/86400000)<7;
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
                <div class="exercise-icon">♧</div>
                <div class="exercise-info">
                    <b>${esc(e.name)}</b>
                    <small>${esc(e.muscle)} • ${esc(e.equipment)} • ${e.sets} × ${esc(e.reps)}</small>
                </div>
                <button class="star ${e.favorite?"on":""}" data-fav="${e.id}">${e.favorite?"♥":"♡"}</button>
            `;
            inner.append(row);
        });

        list.append(card);
    });

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
                    <span>✓ ${completedSets} séries concluídas</span>
                    <span>◷ ${duration} min</span>
                </div>
                <div class="history-progress"><div style="width:${percent}%"></div></div>
                <small>${percent}% concluído</small>
            </div>
        `;
    }).join("");

    list.querySelectorAll("[data-delete-history]").forEach(button=>{
        button.onclick=()=>deleteHistory(button.dataset.deleteHistory);
    });
}

function deleteHistory(id){
    const workout=state.history.find(h=>h.id===id);
    if(!workout)return;

    if(!confirm(`Deseja excluir o registro "${workout.title||"Treino"}" do histórico?`))return;

    const previousHistory=state.history;
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

    let ex=allExercises();

    $("progressExercise").innerHTML=[...new Set(ex.map(e=>e.name))].map(n=>
        `<option>${esc(n)}</option>`
    ).join("");

    drawChart();

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

function drawChart(){
    let canvas=$("progressChart"),
        ctx=canvas.getContext("2d"),
        name=$("progressExercise").value,
        theme=THEMES[activeProfile]||THEMES.admin;

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

const waterTotal=key=>(state.water[key]||[]).reduce((a,b)=>a+b,0);

/* Cria a aba "Água" e o botão do menu automaticamente */
function ensureWaterUI(){
    if($("water"))return;

    const ref=$("history")||document.querySelector(".page");
    if(!ref)return;

    const sec=document.createElement("section");
    sec.id="water";
    sec.className="page";
    sec.innerHTML=`
        <div class="water-card">
            <p class="water-title">💧 Hidratação de hoje</p>
            <div class="water-glass">
                <div class="water-fill" id="waterFill"></div>
                <span id="waterPct">0%</span>
            </div>
            <h2 class="water-total"><span id="waterTotal">0</span> ml</h2>
            <small id="waterGoalText"></small>
            <div class="water-quick">
                <button type="button" data-water="200">+200 ml</button>
                <button type="button" data-water="300">+300 ml</button>
                <button type="button" data-water="500">+500 ml</button>
                <button type="button" data-water="1000">+1 L</button>
            </div>
            <div class="water-custom">
                <input type="number" id="waterCustom" min="1" max="5000" step="50" placeholder="Outra quantidade (ml)">
                <button type="button" id="waterAddCustom">Adicionar</button>
            </div>
            <div class="water-actions">
                <button type="button" id="waterUndo">↶ Desfazer último</button>
                <button type="button" id="waterGoalBtn">🎯 Alterar meta</button>
            </div>
        </div>
        <div class="water-card">
            <p class="water-title">Últimos 7 dias</p>
            <div class="water-week" id="waterWeek"></div>
        </div>
    `;
    ref.parentElement.appendChild(sec);

    const css=document.createElement("style");
    css.id="themeAndWaterStyles";
    css.textContent=`
        body{background:var(--bg-grad) fixed !important}
        .nav.active{color:var(--accent-dark) !important}
        .start-small,#startToday{background:linear-gradient(135deg,var(--primary),var(--secondary)) !important;color:#fff !important;border-color:transparent !important}
        .star.on{color:var(--primary) !important}
        .week-day.today{border-color:var(--primary) !important}
        .week-day.done{background:var(--soft) !important}
        .exercise-icon{background:var(--soft-alt) !important;color:var(--accent-dark) !important}
        #sessionProgress,.bar{background:linear-gradient(90deg,var(--primary),var(--secondary)) !important}
        .history-progress{background:var(--track) !important}
        .history-progress>div{background:linear-gradient(90deg,var(--primary),var(--secondary)) !important}
        .delete-history{background:var(--soft) !important;color:var(--accent-dark) !important}

        .water-card{background:#fff;border:1px solid var(--border);border-radius:22px;padding:18px;margin:14px 0;text-align:center;box-shadow:var(--shadow)}
        .water-title{margin:0 0 12px;font-weight:700;color:var(--accent-dark)}
        .water-glass{position:relative;width:130px;height:160px;margin:0 auto 12px;border:3px solid var(--primary);border-radius:6px 6px 34px 34px;overflow:hidden;background:var(--soft-alt)}
        .water-fill{position:absolute;left:0;right:0;bottom:0;height:0;background:linear-gradient(180deg,var(--secondary),var(--primary));transition:height .6s ease}
        .water-glass span{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:1.5em;font-weight:800;color:var(--accent-dark);text-shadow:0 0 6px #fff}
        .water-total{margin:4px 0;color:var(--accent-dark)}
        .water-quick{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin:14px 0 10px}
        .water-card button{border:0;border-radius:14px;padding:12px;font-weight:700;cursor:pointer;background:var(--soft);color:var(--accent-dark)}
        .water-quick button,#waterAddCustom{background:linear-gradient(135deg,var(--primary),var(--secondary));color:#fff}
        .water-custom{display:flex;gap:8px;margin-bottom:10px}
        .water-custom input{flex:1;min-width:0;border:1px solid var(--border);border-radius:14px;padding:12px;font-size:1em}
        .water-actions{display:flex;gap:8px}
        .water-actions button{flex:1}
        .water-week{display:flex;align-items:flex-end;justify-content:space-between;gap:6px;height:130px}
        .water-day{flex:1;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;height:100%;font-size:.72em}
        .water-day .col{width:100%;max-width:30px;height:90px;display:flex;align-items:flex-end;background:var(--track);border-radius:8px;overflow:hidden;margin-bottom:4px}
        .water-day .col i{display:block;width:100%;background:linear-gradient(180deg,var(--secondary),var(--primary));border-radius:8px}
        .water-day.goal .col{outline:2px solid var(--secondary)}
    `;
    document.head.appendChild(css);

    /* Botão no menu inferior */
    const refNav=[...document.querySelectorAll(".nav")].pop();
    if(refNav){
        const b=refNav.cloneNode(true);
        b.dataset.page="water";
        b.classList.remove("active");
        const kids=b.children;
        if(kids.length>=2){
            kids[0].textContent="💧";
            kids[kids.length-1].textContent="Água";
        }else{
            b.textContent="💧 Água";
        }
        b.onclick=()=>page("water");
        refNav.parentElement.appendChild(b);
    }

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
    toast(waterTotal(key)>=goal?"Meta de hoje batida! 💧🎉":`+${ml} ml 💧`);
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
}

function render(){
    renderHome();
    if($("workouts").classList.contains("active"))renderWorkouts();
    if($("history").classList.contains("active"))renderHistory();
    if($("progress").classList.contains("active"))renderProgress();
    if($("water")&&$("water").classList.contains("active"))renderWater();
}

/* =========================================
   SESSÃO DE TREINO
   ========================================= */

function startWorkout(id){
    let w=state.workouts.find(x=>x.id===id);
    if(!w||!w.exercises.length)return;

    session={
        workoutId:id,
        title:w.title,
        day:w.day,
        index:0,
        start:Date.now(),
        logs:{}
    };

    w.exercises.forEach(e=>
        session.logs[e.id]=Array.from({length:e.sets},()=>({weight:"",reps:"",done:false}))
    );

    page("session");
    renderSession();
}

function renderSession(){
    let w=state.workouts.find(x=>x.id===session.workoutId);

    let e=w.exercises[session.index],
        logs=session.logs[e.id];

    $("sessionDay").textContent=session.day.toUpperCase();
    $("sessionTitle").textContent=session.title;
    $("sessionCount").textContent=`Exercício ${session.index+1} de ${w.exercises.length}`;
    $("sessionProgress").style.width=((session.index+1)/w.exercises.length*100)+"%";

    $("exerciseSession").innerHTML=`
        <div class="session-exercise">
            <small>${esc(e.muscle)}</small>
            <h3>${esc(e.name)}</h3>
            <p class="exercise-meta">${esc(e.equipment)} • ${e.sets} séries • ${esc(e.reps)} repetições</p>

            <div class="set-row">
                <label>Série</label>
                <label>Carga (kg)</label>
                <label>Reps</label>
                <span></span>
            </div>

            ${logs.map((s,i)=>`
                <div class="set-row ${s.done?"done":""}">
                    <label>${i+1}</label>
                    <input type="number" min="0" step="0.5" placeholder="0" value="${esc(s.weight)}" data-weight="${i}">
                    <input type="number" min="0" placeholder="—" value="${esc(s.reps)}" data-reps="${i}">
                    <input type="checkbox" ${s.done?"checked":""} data-done="${i}">
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

    $("exerciseSession").querySelectorAll("[data-done]").forEach(el=>
        el.onchange=()=>{
            let i=+el.dataset.done;
            logs[i].done=el.checked;
            el.closest(".set-row").classList.toggle("done",el.checked);
            if(el.checked&&state.prefs.autoRest)startTimer(state.prefs.rest);
        }
    );

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

    let sets=w.exercises.flatMap(e=>
        session.logs[e.id].map(s=>({...s,name:e.name,exerciseId:e.id}))
    );

    let done=sets.filter(s=>s.done).length;

    state.history.push({
        id:uid(),
        date:new Date().toISOString(),
        title:w.title,
        day:w.day,
        duration:Date.now()-session.start,
        exerciseCount:w.exercises.length,
        sets,
        percent:Math.round(done/Math.max(1,sets.length)*100)
    });

    session=null;

    save().then(()=>{
        page("history");
        toast("Treino salvo no histórico ♡");
    });
}

$("exitSession").onclick=()=>{
    if(confirm("Sair do treino? O registro desta sessão não será adicionado ao histórico.")){
        session=null;
        page("workouts");
    }
};

/* FILTROS */

["search","fDay","fMuscle","fWorkout","fEquip","fStatus"].forEach(id=>
    $(id).addEventListener(id==="search"?"input":"change",renderWorkouts)
);

$("clearFilters").onclick=()=>{
    ["search","fDay","fMuscle","fWorkout","fEquip","fStatus"].forEach(id=>$(id).value="");
    renderWorkouts();
};

/* ADICIONAR EXERCÍCIO */

$("addExercise").onclick=()=>{
    if(activeProfile!=="admin"){
        toast("Somente a administradora pode alterar a ficha.");
        return;
    }

    let name=prompt("Nome do exercício:");
    if(!name)return;

    let day=prompt(
        "Dia (Segunda-feira, Terça-feira, Quarta-feira, Quinta-feira, Sexta-feira ou Sábado):",
        "Segunda-feira"
    );

    let w=state.workouts.find(x=>x.day.toLowerCase()===day?.toLowerCase());

    if(!w){
        toast("Dia não encontrado");
        return;
    }

    let muscle=prompt("Grupo muscular:","Musculação")||"Musculação";
    let equipment=prompt("Equipamento:","Peso livre")||"Peso livre";
    let sets=Math.max(1,+prompt("Número de séries:","3")||3);
    let reps=prompt("Repetições:","12 a 15")||"12 a 15";

    w.exercises.push({id:uid(),name,muscle,equipment,sets,reps,favorite:false,custom:true});

    save().then(renderWorkouts);
    toast("Exercício adicionado");
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

    if(confirm("Restaurar a ficha original? Seu histórico e o registro de água serão preservados.")){
        let hist=state.history,
            water=state.water,
            goal=state.prefs.waterGoal;

        state=initial();
        state.history=hist;
        state.water=water;
        state.prefs.waterGoal=goal||2000;

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
