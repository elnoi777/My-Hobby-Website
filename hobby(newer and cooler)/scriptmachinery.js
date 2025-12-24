const kidContainer = document.getElementById('kid');
const img = kidContainer.querySelector('.sprite-img');
const clickText = document.getElementById('clickText');
const optionsContainer = document.getElementById('dialogueOptions');

const greeting = "My third hobby is machinery, start exploring now!";
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
        { text: "What can I even do here?", response: "Look around, look at my machine gallery, and play my clicking game." },
        { text: "Any fun facts about painting?", response: "Click on the images in the machine gallery and you'll see!" },
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

let energy = 0;
let rotation = 0;
let speed = 0;

const turbine = document.getElementById('turbine');
const barFill = document.getElementById('bar-fill');
const glow = document.getElementById('glow');
const btn = document.getElementById('clickBtn');


function gameLoop() {

    speed *= 0.96;
    energy -= 0.2;
    if (energy < 0) energy = 0;


    rotation += speed;
    turbine.style.transform = `rotate(${rotation}deg)`;

 
    barFill.style.width = energy + "%";


    glow.style.opacity = energy / 100;

    requestAnimationFrame(gameLoop);
}


btn.addEventListener('click', () => {
    speed += 8;
    energy += 10;
    if (energy > 100) energy = 100;
});

gameLoop();


document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
});


document.querySelectorAll('.gallery-info h3').forEach(title => {
    title.addEventListener('click', () => {
        const infoParagraph = title.nextElementSibling; 
        if (infoParagraph.style.display === 'none') {
            infoParagraph.style.display = 'block'; 
        } else {
            infoParagraph.style.display = 'none'; 
        }
    });
});


document.querySelectorAll('.gallery-info h3').forEach(title => {
    title.addEventListener('click', () => {
        const infoParagraph = title.nextElementSibling; 
        infoParagraph.classList.toggle('show'); t
    });
});


document.querySelectorAll('.gallery-info h3').forEach(title => {
    title.addEventListener('click', () => {
        const infoParagraph = title.nextElementSibling; 
        const arrow = title.querySelector('.arrow'); 

        infoParagraph.classList.toggle('show'); 
        arrow.classList.toggle('rotate'); 
    });
});


document.querySelectorAll('.gallery-info h3').forEach(title => {
    title.addEventListener('click', () => {
        const infoParagraph = title.nextElementSibling;
        const arrow = title.querySelector('.arrow');


        document.querySelectorAll('.gallery-info p.show').forEach(openParagraph => {
            if (openParagraph !== infoParagraph) {
                openParagraph.classList.remove('show');
            }
        });

        document.querySelectorAll('.arrow.rotate').forEach(openArrow => {
            if (openArrow !== arrow) {
                openArrow.classList.remove('rotate');
            }
        });

        
        infoParagraph.classList.toggle('show');
        if (arrow) arrow.classList.toggle('rotate');
    });
});


document.querySelectorAll('.gallery-info h3').forEach(title => {
    const arrow = title.querySelector('.arrow');
    const infoParagraph = title.nextElementSibling;

    
    title.addEventListener('click', () => {
        infoParagraph.classList.toggle('show');
        arrow.classList.toggle('rotate');
    });

    
    if (arrow) {
        arrow.addEventListener('click', (event) => {
            event.stopPropagation(); // 
            infoParagraph.classList.toggle('show');
            arrow.classList.toggle('rotate');
        });
    }
});
