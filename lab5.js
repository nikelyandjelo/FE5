const body = document.querySelector('body');
let valid = 1;
let errArray = [];
let answers = [];
const answerEl = document.createElement('div');
const task1 = document.getElementById('task1');

const clear = () => {
    while (answerEl.firstChild) {
        return answerEl.removeChild(answerEl.firstChild);
    }
    if (task1.querySelector('.answerEl')) {
        return task1.removeChild(answerEl);
    } 
    errArray.forEach(errorField => {
        const field = document.getElementById(errorField);
        field.style.border = '2px gray solid';
    });
    valid = 1;
    errArray = [];
    answers = [];
}

const submit = () => {
    document.getElementById('button')
    clear();

    regexCheck('name', 'ПІБ', /^[A-ZА-Я][a-zA-ZА-Яа-я]+ [A-ZА-Я]\.[A-ZА-Я]\.$/);
    regexCheck('group', 'Група', /^[A-ZА-ЯІЇЄ]{2}-\d{2}$/);
    regexCheck('card', 'ID-card', /^[A-Z]{2} №\d{6}$/);
    regexCheck('birth', 'Дата народження', /^\d{2}.\d{2}.\d{4}$/,checkDate);
    regexCheck('email', 'E-mail', /^\w+@\w+\.com$/);

    if (valid) {
        answers.forEach(answer => answerEl.appendChild(answer));
        task1.appendChild(answerEl);
    } else {
        errArray.forEach(errorField => {
        const field = document.getElementById(errorField);
        field.style.border = '2px red solid';
        field.style.background = 'rgba(255, 142, 142, 0.3)'
    });
    }
}

const regexCheck = (type, text, regex, additionalCheck = () => true) => {
    const valueFromElement = document.getElementById(type).value;

    if (regex.test(valueFromElement) && additionalCheck(valueFromElement)) {
        const answer = document.createElement('h3');
        answer.innerHTML = `${text}: ` + valueFromElement;
        answers.push(answer);
    } else {
    valid *= 0;
    errArray.push(type);
    }
}
const checkDate = (value) => {
    const arrDate = value.split('.');
    arrDate[1] -= 1;
    const dateNew = new Date(arrDate[2], arrDate[1], arrDate[0]);
    if (new Date(Date.now()) < dateNew) {
        return false;
    }
    return (dateNew.getFullYear() === Number(arrDate[2])) 
        && (dateNew.getDate() === Number(arrDate[0]));
}
const randomBg = (element) => {
    element.style.background = randomStyle();
}
const clearBg = (element) => {
    element.style.background = '#FFF';
}
const random = () => {
    return Math.floor(Math.random() * 255);
}
const randomStyle = () => {
    return 'rgb(' + random() + ',' + random() + ',' + random() + ')';
}


const VERSION = 8;
const SIZE = 6;
for (let row = 0; row < SIZE; row++) {
    const rowElement = document.createElement('tr');
    for (let data = 0; data < SIZE; data++) {
        const index = String(data + 1 + (row * SIZE));
        const dataElement = document.createElement('td');
        dataElement.innerHTML = index;
        dataElement.id = index;
        rowElement.appendChild(dataElement);
        body.appendChild(rowElement);
    }
}
const clickCell = (element) => {
    element.style.background = document.getElementById('color_input').value;
}
const dblClickCell = () => {
    const startColumn = VERSION % SIZE;
    for (let j = startColumn; j <= SIZE; j += 2) {
        for (let i = 0; i < SIZE; i++) {
            const currentElement = document.getElementById(String(j + i * SIZE));
            currentElement.style.background =
            document.getElementById('color_input').value;
        }
    }
}
const elementByVERSION = document.getElementById(String(VERSION));

elementByVERSION.onmouseover = () => {
    randomBg(elementByVERSION);
};
elementByVERSION.onmouseup = () => {
    clickCell(elementByVERSION);
};
elementByVERSION.ondblclick = () => {
    dblClickCell();
}