document.getElementById("mute-button").addEventListener("click", ()=>{
    if (Rotors.eventHandlers.mute){
        Rotors.eventHandlers.mute = false;
        Keyboard.eventHandlers.mute = false;
        document.getElementById("mute-button").setAttribute("src","images/unmute.png");
    }else{
        Rotors.eventHandlers.mute = true;
        Keyboard.eventHandlers.mute = true;
        document.getElementById("mute-button").setAttribute("src","images/mute.png");
    }
});
