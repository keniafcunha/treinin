const DAYS=[
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
    "Domingo"
];

(async()=>{
    bindWater();
    bindWeight();

    try{
        await openDB();

        try{
            activeProfile=
                localStorage.getItem("meuTreinoPerfilAtivo") ||
                "admin";
        }catch(e){
            activeProfile="admin";
        }

        await load();
    }catch(e){
        toast("Armazenamento local indisponível");
    }

    ensureState();

    timer.seconds=
        timer.left=
        state.prefs.rest || 60;

    updateProfileUI();
    render();
    openProfilePicker();

    if(
        "serviceWorker" in navigator &&
        location.protocol !== "file:"
    ){
        const hadController=
            !!navigator.serviceWorker.controller;

        navigator.serviceWorker.addEventListener(
            "controllerchange",
            ()=>{
                if(hadController){
                    location.reload();
                }
            }
        );

        navigator.serviceWorker
            .register("service-worker.js")
            .catch(()=>{});
    }
})();
