const kidContainer = document.getElementById('kid');
const img = kidContainer.querySelector('.sprite-img');
const clickText = document.getElementById('clickText');
const optionsContainer = document.getElementById('dialogueOptions');

const greeting = "Hello, welcome to Hobby Jungle!";
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
        { text: "Who are you?", response: "I'm El! I like doing cool stuffs to kill time. Having nice people around makes me happy. My interests are medicine, machinery, and different sorts of arts, have fun exploring!" },
        { text: "What is this place?", response: "This is Hobby Jungle, where I share my favorite hobbies!" },
        { text: "How do I navigate?", response: "Click on the different hobbies below to explore, go check them out!" }
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

