const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        mute: true
    },

    properties: {
        value: ""
    },

    init(){
        // Create main elements
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        // Setup main elements
        this.elements.main.classList.add("keyboard");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        // Add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.getElementById("enigma").appendChild(this.elements.main);

        // Use keyboard 
        document.querySelectorAll(".use-keyboard-input").forEach(element=>{
            this.open("", currentValue =>{
                element.value = currentValue;
            });
        });
    },

    _createKeys(){
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "q", "w", "e", "r", "t", "z", "u", "i", "o",
            "a", "s", "d", "f", "g", "h", "j", "k",
            "p", "y", "x", "c", "v", "b", "n", "m", "l"
        ];

        keyLayout.forEach(key =>{
            const keyElement = document.createElement("button");
            const insertLineBreak = ["o","k"].indexOf(key) !== -1;

            // Add attributes and classes
            keyElement.setAttribute("type","button");
            keyElement.classList.add("keyboard__key");

            keyElement.textContent = key.toUpperCase();

            keyElement.addEventListener("mousedown", ()=>{

                this._triggerEvent("oninput");     
                
                // Sound
                if (!this.eventHandlers.mute){
                    var audio = new Audio("audio/buttonPress.mp3");
                    audio.play();
                }

                // Update rotors
                Rotors.elements.values[2]++;
                for (let i = 2; i >= 0; i--){
                    if (Rotors.elements.values[i] > 25){
                        Rotors.elements.values[i] = 0;
                        if (i > 0){
                            Rotors.elements.values[i-1]++;
                        }
                    }
                }        
                
                const rotors = document.getElementsByClassName("rotor");
                var rotorPosition;
                for (let i = 0; i < rotors.length; i++){
                    rotorPosition = 65+Rotors.elements.values[i];
                    rotors[i].textContent = String.fromCharCode(rotorPosition);
                }

                // Encrypt input ---------------------

                // First rotor pass
                var encryptedPosition = key.toUpperCase().charCodeAt(0)-65;
                for (let i = 0; i < 3; i++){
                    encryptedPosition = ((encryptedPosition) + Rotors.elements.values[2-i])%26;
                    encryptedPosition = Rotors.elements.encryption[i][encryptedPosition];
                    encryptedPosition = ((((encryptedPosition.charCodeAt(0)-65)-(Rotors.elements.values[2-i]))%26)+26)%26;
                }

                // Reflect
                encryptedPosition = Rotors.elements.reflector[0][encryptedPosition].charCodeAt(0)-65;                

                // Second rotor pass
                for (let i = 0; i < 3; i++){
                    encryptedPosition = (encryptedPosition + Rotors.elements.values[i])%26;
                    encryptedPosition = Rotors.elements.encryption[2-i].indexOf(String.fromCharCode(encryptedPosition+65));                    
                    encryptedPosition = (((encryptedPosition - (Rotors.elements.values[i]))%26)+26)%26;
                }

                // Encrypt input end ---------------------

                this.properties.value = String.fromCharCode(encryptedPosition+65);

                // Update lights
                var changedLight = document.getElementById(this.properties.value);
                changedLight.classList.add("light__on");
                setTimeout(function(){
                    changedLight.classList.remove("light__on");
                }, 400)                
            });

            keyElement.addEventListener("mouseup", ()=>{
                // Sound
                if (!this.eventHandlers.mute){
                    var audio = new Audio("audio/buttonUnpress.mp3");
                    audio.play();
                }
            });

            fragment.appendChild(keyElement);

            if (insertLineBreak){
                fragment.appendChild(document.createElement("br"));
            }
        });
        
        return fragment;
    },

    _triggerEvent(handlerName){
        if (typeof this.eventHandlers[handlerName] == "function"){
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    open(initialValue, oninput){
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
    }
};

window.addEventListener("DOMContentLoaded", function(){
    Keyboard.init();
});