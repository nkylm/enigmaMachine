const Lightboard = {
    elements: {
        main: null,
        lightsContainer: null,
        lights: []
    },

    init(){
        // Create main elements
        this.elements.main = document.createElement("div");
        this.elements.lightsContainer = document.createElement("div");

        // Setup main elements
        this.elements.main.classList.add("lightboard");
        this.elements.lightsContainer.classList.add("lightboard__lights");
        this.elements.lightsContainer.appendChild(this._createLights());

        // Add to DOM
        this.elements.main.appendChild(this.elements.lightsContainer);
        document.getElementById("enigma").appendChild(this.elements.main);
    },

    _createLights(){
        const fragment = document.createDocumentFragment();
        const lightLayout = [
            "q", "w", "e", "r", "t", "z", "u", "i", "o",
            "a", "s", "d", "f", "g", "h", "j", "k",
            "p", "y", "x", "c", "v", "b", "n", "m", "l"
        ];

        lightLayout.forEach(light =>{
            const lightElement = document.createElement("div");
            const insertLineBreak = ["o","k"].indexOf(light) !== -1;

            // Add attributes and classes
            lightElement.classList.add("lightboard__light");
            lightElement.setAttribute("id", light.toUpperCase());

            lightElement.textContent = light.toUpperCase();

            fragment.appendChild(lightElement);

            if (insertLineBreak){
                fragment.appendChild(document.createElement("br"));
            }
        });
        
        return fragment;
    }
}

window.addEventListener("DOMContentLoaded", function(){
    Lightboard.init();
});