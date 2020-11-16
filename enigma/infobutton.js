const overlay = document.getElementById("modal-overlay");

document.getElementById("info-button").addEventListener("click", ()=>{
    const modal = document.querySelector("#modal");
    openModal(modal);
});

document.getElementById("modal-overlay").addEventListener("click", ()=>{
    const modal = document.querySelector("#modal");
    closeModal(modal);
})

document.getElementById("close-button").addEventListener("click", ()=>{
    const modal = document.querySelector("#modal");
    closeModal(modal);
})

function openModal(modal){
    if (modal == null){
        return;
    }else{
        modal.classList.add("active");
        overlay.classList.add("active");
    }
}

function closeModal(modal){
    if (modal == null){
        return;
    }else{
        modal.classList.remove("active");
        overlay.classList.remove("active");
    }
}