
const kidContainer = document.getElementById('kid');
const img = kidContainer.querySelector('.sprite-img');
const clickText = document.getElementById('clickText');
const optionsContainer = document.getElementById('dialogueOptions');

const greeting = "My second hobby is painting, start exploring now!";
let typingInterval;
let typingActive = false; // Track typing state
let optionsAdded = false;

kidContainer.addEventListener('click', () => {
    if (typingActive) return; // Safety check

    typingActive = true;
    kidContainer.style.pointerEvents = 'none'; // ✅ Disable clicks
    img.src = 'sprite(clicked).png';
    clickText.style.display = 'block';
    clickText.textContent = '';
    optionsContainer.innerHTML = '';
    optionsContainer.style.display = 'none';
    optionsAdded = false;

    let i = 0;
    typingInterval = setInterval(() => {
        clickText.textContent += greeting[i];
        i++;
        if (i === greeting.length) {
            clearInterval(typingInterval);
            typingActive = false;
            kidContainer.style.pointerEvents = 'auto'; // ✅ Re-enable clicks
            setTimeout(() => {
                clickText.style.display = 'none';
                showDialogueOptions();
            }, 1000);
        }
    }, 50);
});

function showDialogueOptions() {
    if (optionsAdded) return;
    optionsAdded = true;

    const options = [
        { text: "What can I even do here?", response: "Look around, observe my paintings, or draw your own! There's a section for that BTW." },
        { text: "Any fun facts about painting?", response: "Click on my paintings and you'll see!" },
        { text: "How do I navigate?", response: "Click on the different hobbies below to explore. P.S. Click on 'Hobby Jungle' to go back." }
    ];

    optionsContainer.style.display = 'block';

    options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.textContent = option.text;
        optionElement.classList.add('dialogue-option');

        optionElement.addEventListener('click', (event) => {
            event.stopPropagation();
            clearInterval(typingInterval);
            typingActive = false;
            typeResponse(option.response);
            optionsContainer.style.display = 'none';
        });

        optionsContainer.appendChild(optionElement);
    });
}

function typeResponse(responseText) {
    clickText.style.display = 'block';
    clickText.textContent = '';
    let i = 0;

    typingActive = true;
    typingInterval = setInterval(() => {
        clickText.textContent += responseText[i];
        i++;
        if (i === responseText.length) {
            clearInterval(typingInterval);
            typingActive = false; 
        }
    }, 50);
}



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



const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');

let painting = false;
let brushColor = document.getElementById('colorPicker').value;
let brushSize = parseInt(document.getElementById('brushSize').value);
let isEraser = false;


const brushBtn = document.getElementById('brushBtn');
const eraserBtn = document.getElementById('eraserBtn');


canvas.addEventListener('mousedown', startPaint);
canvas.addEventListener('mouseup', stopPaint);
canvas.addEventListener('mousemove', draw);


canvas.addEventListener('touchstart', startTouch, { passive: false });
canvas.addEventListener('touchend', stopPaint);
canvas.addEventListener('touchmove', drawTouch, { passive: false });


document.getElementById('colorPicker').addEventListener('input', e => {
    brushColor = e.target.value;
    setBrushMode();
});
document.getElementById('brushSize').addEventListener('input', e => brushSize = parseInt(e.target.value));
brushBtn.addEventListener('click', setBrushMode);
eraserBtn.addEventListener('click', setEraserMode);
document.getElementById('clearCanvas').addEventListener('click', () => ctx.clearRect(0, 0, canvas.width, canvas.height));
document.getElementById('saveCanvas').addEventListener('click', saveImage);

function setBrushMode() {
    isEraser = false;
    brushBtn.classList.add('active');
    eraserBtn.classList.remove('active');
}

function setEraserMode() {
    isEraser = true;
    eraserBtn.classList.add('active');
    brushBtn.classList.remove('active');
}

function startPaint(e) {
    painting = true;
    draw(e);
}

function stopPaint() {
    painting = false;
    ctx.beginPath();
}

function draw(e) {
    if (!painting) return;

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = isEraser ? '#EFEFEF' : brushColor;

    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
}


function startTouch(e) {
    painting = true;
    drawTouch(e);
}

function drawTouch(e) {
    if (!painting) return;
    e.preventDefault();
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = isEraser ? '#EFEFEF' : brushColor;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}


function saveImage() {

    const bgColor = '#EFEFEF';
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');

    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    tempCtx.fillStyle = bgColor;
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    tempCtx.drawImage(canvas, 0, 0);

    const link = document.createElement('a');
    link.download = 'my_drawing.png';
    link.href = tempCanvas.toDataURL('image/png');
    link.click();
}

