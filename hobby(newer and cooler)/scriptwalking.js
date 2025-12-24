const kidContainer = document.getElementById('kid');
const img = kidContainer.querySelector('.sprite-img');
const clickText = document.getElementById('clickText');
const optionsContainer = document.getElementById('dialogueOptions');

const greeting = "HMy first hobby is walking, start exploring now!";
let typingInterval; 

kidContainer.addEventListener('click', () => {
    clearInterval(typingInterval); 
    kidContainer.style.pointerEvents = 'none'; 
    clickText.style.display = 'block';
    clickText.textContent = '';
    optionsContainer.innerHTML = '';
    optionsContainer.style.display = 'none';

    let i = 0;
    typingInterval = setInterval(() => {
        clickText.textContent += greeting[i];
        i++;
        if (i === greeting.length) {
            clearInterval(typingInterval);
            kidContainer.style.pointerEvents = 'auto'; 
            setTimeout(() => {
                clickText.style.display = 'none';
                showDialogueOptions();
            }, 1000);
        }
    }, 50);
});

function showDialogueOptions() {
    const options = [
        { text: "What can I even do here?", response: "Look at my pictures, walking stats, and try walking virtually whilst reading about walking!" },
        { text: "How do I walk?", response: "Use the key W to walk up, A to walk right, S to walk down, and D to walk left." },
        { text: "How do I navigate?", response: "Click on the different hobbies below to explore. P.S. Click on 'Hobby Jungle' to go back." }
    ];

    optionsContainer.innerHTML = ''
    optionsContainer.style.display = 'block';

    options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.textContent = option.text;
        optionElement.classList.add('dialogue-option');

        
        optionElement.addEventListener('click', (event) => {
            event.stopPropagation();
            typeResponse(option.response);
            optionsContainer.style.display = 'none';
        });

        optionsContainer.appendChild(optionElement);
    });
}

function typeResponse(responseText) {
    clearInterval(typingInterval); 
    kidContainer.style.pointerEvents = 'none'; 
    clickText.style.display = 'block';
    clickText.textContent = '';
    let i = 0;
    typingInterval = setInterval(() => {
        clickText.textContent += responseText[i];
        i++;
        if (i === responseText.length) {
            clearInterval(typingInterval);
            kidContainer.style.pointerEvents = 'auto'; 
        }
    }, 50);
}

document.addEventListener("DOMContentLoaded", () => {
    const character = document.querySelector(".character"); 
    let position = { x: 200, y: 200 };
    let currentDirection = null;
    let currentImageIndex = 0;
    const speed = 5;

    const walkingImages = {
        up: ["w1.png","w2.png","w3.png","w4.png","w5.png","w6.png","w7.png","w8.png","w9.png"],
        down: ["s1.png","s2.png","s3.png","s4.png","s5.png","s6.png","s7.png","s8.png","s9.png"],
        left: ["a1.png","a2.png","a3.png","a4.png","a5.png","a6.png","a7.png","a8.png","a9.png"],
        right: ["d1.png","d2.png","d3.png","d4.png","d5.png","d6.png","d7.png","d8.png","d9.png"]
    };

    const stillImage = "s1.png"; 


    function updateCharacter() {
        character.style.left = position.x + "px";
        character.style.top = position.y + "px";
    }

    function animateCharacter(direction) {
        const images = walkingImages[direction];
        character.style.backgroundImage = `url('${images[currentImageIndex]}')`;
        currentImageIndex = (currentImageIndex + 1) % images.length;
    }


    setInterval(() => {
        if (!currentDirection) return;
        if (currentDirection === "up") position.y -= speed;
        if (currentDirection === "down") position.y += speed;
        if (currentDirection === "left") position.x -= speed;
        if (currentDirection === "right") position.x += speed;

        updateCharacter();
        animateCharacter(currentDirection);
    }, 100); 


    document.addEventListener("keydown", (e) => {
        switch (e.key.toLowerCase()) {
            case "w": currentDirection = "up"; break;
            case "s": currentDirection = "down"; break;
            case "a": currentDirection = "left"; break;
            case "d": currentDirection = "right"; break;
        }
    });

    document.addEventListener("keyup", () => {
        currentDirection = null;
        character.style.backgroundImage = `url('${stillImage}')`;
    });


    updateCharacter();
});

Object.values(walkingImages).flat().forEach(src => {
    const img = new Image();
    img.src = src;
});

setInterval(() => {
    if (!currentDirection) return;
    position.x += currentDirection === "left" ? -speed : currentDirection === "right" ? speed : 0;
    position.y += currentDirection === "up" ? -speed : currentDirection === "down" ? speed : 0;

    updateCharacter();
    animateCharacter(currentDirection);
}, 120); 


function updateCharacter() {
    character.style.left = position.x + "px";
    character.style.top = position.y + "px";
}
