function convertToPostfix() {
    const infixExpression = document.getElementById('infixExpression').value;
    const postfixResult = infixToPostfix(infixExpression);
    document.getElementById('postfixResult').value = postfixResult;
}

function infixToPostfix(infix) {
    const precedence = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
        '^': 3
    };

    const isOperator = (char) => ['+', '-', '*', '/', '^'].includes(char);
    const isOperand = (char) => char.match(/[a-zA-Z0-9]/);

    let stack = [];
    let postfix = '';

    for (let char of infix) {
        if (isOperand(char)) {
            postfix += char;
        } else if (char === '(') {
            stack.push(char);
        } else if (char === ')') {
            while (stack.length && stack[stack.length - 1] !== '(') {
                postfix += stack.pop();
            }
            stack.pop(); // Remove '(' from the stack
        } else if (isOperator(char)) {
            while (stack.length && precedence[char] <= precedence[stack[stack.length - 1]]) {
                postfix += stack.pop();
            }
            stack.push(char);
        }
    }

    while (stack.length) {
        postfix += stack.pop();
    }

    return postfix;
}
