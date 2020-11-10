const Rotors = {
    elements: {
        main: null,
        rotorsContainer: null,
        values: [0,0,0],
        encryption: [
            ['E','K','M','F','L','G','D','Q','V','Z','N','T','O','W','Y','H','X','U','S','P','A','I','B','R','C','J'],
            ['A','J','D','K','S','I','R','U','X','B','L','H','W','T','M','C','Q','G','Z','N','P','Y','F','V','O','E'],
            ['B','D','F','H','J','L','C','P','R','T','X','V','Z','N','Y','E','I','W','G','A','K','M','U','S','Q','O']
        ],
        reflector: [
            ['Y','R','U','H','Q','S','L','D','P','X','N','G','O','K','M','I','E','B','F','Z','C','W','V','J','A','T']
        ]
    },

    eventHandlers: {
        mute: true
    },

    init(){
        // Create main elements
        this.elements.main = document.createElement("div");
        this.elements.rotorsContainer = document.createElement("div");

        // Setup main elements
        this.elements.main.classList.add("rotorboard");
        this.elements.rotorsContainer.classList.add("rotors");
        this.elements.rotorsContainer.appendChild(this._createRotors());

        // Add to DOM
        this.elements.main.appendChild(this.elements.rotorsContainer);
        document.getElementById("enigma").appendChild(this.elements.main);
    },

    _createRotors(){
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < 3; i++){
            const rotor = document.createElement("div");
            rotor.classList.add("rotor");

            // Set the rotor text value
            rotor.textContent = String.fromCharCode(65+this.elements.values[i]);

            // Add id
            rotor.setAttribute("id", i);

            // Scroll rotors
            rotor.addEventListener("wheel", (event)=>{

                // Sound
                if (!this.eventHandlers.mute){
                    var audio = new Audio("audio/scroll.mp3");
                    audio.play();
                }                

                if (event.deltaY > 0){
                    this.elements.values[i] = (this.elements.values[i]+1)%26;
                }
                if (event.deltaY < 0){
                    this.elements.values[i] = (((this.elements.values[i]-1)%26)+26)%26;
                }                
                rotor.textContent = String.fromCharCode(65+this.elements.values[i]);
            });

            fragment.appendChild(rotor);
        }
        return fragment;
    }
}

window.addEventListener("DOMContentLoaded", function(){
    Rotors.init();
});
