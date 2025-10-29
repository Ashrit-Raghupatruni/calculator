const result = document.getElementById('res');
let currentInput = '';
let previousInput = '';
let operation = null;

const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (button.classList.contains('number')) {
            if (value === '.' && currentInput.includes('.')) return;
            currentInput += value;
            result.value = currentInput;
        } else if (button.classList.contains('operator')) {
            if (currentInput !== '') {
                if (previousInput !== '' && operation) {
                    calculate();
                }
                previousInput = currentInput;
                operation = value;
                currentInput = '';
            }
        } else if (button.classList.contains('equals')) {
            if (previousInput !== '' && operation && currentInput !== '') {
                calculate();
            }
        } else if (button.classList.contains('clear')) {
            currentInput = '';
            previousInput = '';
            operation = null;
            result.value = '';
        } else if (button.classList.contains('backspace')) {
            currentInput = currentInput.slice(0, -1);
            result.value = currentInput;
        }
    });
});

function calculate() {
    let resultValue;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    switch (operation) {
        case '+':
            resultValue = prev + curr;
            break;
        case '-':
            resultValue = prev - curr;
            break;
        case '×':
            resultValue = prev * curr;
            break;
        case '/':
            if (curr === 0) {
                resultValue = 'Error';
            } else {
                resultValue = prev / curr;
            }
            break;
        case '%':
            resultValue = prev % curr;
            break;
        default:
            return;
    }

    result.value = resultValue;
    currentInput = resultValue.toString();
    previousInput = '';
    operation = null;
}