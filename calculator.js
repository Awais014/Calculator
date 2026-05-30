let input = document.getElementById("inputBox");
let expression = "";

// Number buttons
document.querySelectorAll("[data-num]").forEach(button => {
    button.addEventListener("click", () => {
        expression += button.dataset.num;
        updateDisplay();
    });
});

// Operator buttons
document.querySelectorAll("[data-op]").forEach(button => {
    button.addEventListener("click", () => {
        const op = button.dataset.op;
        // Convert display operators to calculation operators
        const calcOp = op === "÷" ? "/" : op === "×" ? "*" : op === "−" ? "-" : op;
        expression += calcOp;
        updateDisplay();
    });
});

// Advanced functions
document.querySelectorAll("[data-func]").forEach(button => {
    button.addEventListener("click", () => {
        const func = button.dataset.func;
        handleFunction(func);
    });
});

// Action buttons
document.querySelectorAll("[data-action]").forEach(button => {
    button.addEventListener("click", () => {
        const action = button.dataset.action;
        if (action === "clear") {
            expression = "";
            updateDisplay();
        } else if (action === "delete") {
            expression = expression.slice(0, -1);
            updateDisplay();
        } else if (action === "equals") {
            calculate();
        }
    });
});

function handleFunction(func) {
    switch (func) {
        case "sqrt":
            if (expression) {
                try {
                    expression = Math.sqrt(parseFloat(expression)).toString();
                } catch (e) {
                    expression = "Error";
                }
            }
            break;
        case "pow":
            expression += "**";
            break;
        case "ln":
            if (expression) {
                try {
                    expression = Math.log(parseFloat(expression)).toString();
                } catch (e) {
                    expression = "Error";
                }
            }
            break;
        case "log":
            if (expression) {
                try {
                    expression = Math.log10(parseFloat(expression)).toString();
                } catch (e) {
                    expression = "Error";
                }
            }
            break;
        case "sin":
            if (expression) {
                try {
                    expression = Math.sin(parseFloat(expression) * Math.PI / 180).toString();
                } catch (e) {
                    expression = "Error";
                }
            }
            break;
        case "cos":
            if (expression) {
                try {
                    expression = Math.cos(parseFloat(expression) * Math.PI / 180).toString();
                } catch (e) {
                    expression = "Error";
                }
            }
            break;
        case "tan":
            if (expression) {
                try {
                    expression = Math.tan(parseFloat(expression) * Math.PI / 180).toString();
                } catch (e) {
                    expression = "Error";
                }
            }
            break;
        case "asin":
            if (expression) {
                try {
                    expression = (Math.asin(parseFloat(expression)) * 180 / Math.PI).toString();
                } catch (e) {
                    expression = "Error";
                }
            }
            break;
        case "acos":
            if (expression) {
                try {
                    expression = (Math.acos(parseFloat(expression)) * 180 / Math.PI).toString();
                } catch (e) {
                    expression = "Error";
                }
            }
            break;
        case "atan":
            if (expression) {
                try {
                    expression = (Math.atan(parseFloat(expression)) * 180 / Math.PI).toString();
                } catch (e) {
                    expression = "Error";
                }
            }
            break;
        case "pi":
            expression += Math.PI.toString();
            break;
        case "e":
            expression += Math.E.toString();
            break;
    }
    updateDisplay();
}

function calculate() {
    if (!expression) return;

    try {
        // Replace operators for safe evaluation
        let evalExpr = expression
            .replace(/×/g, "*")
            .replace(/÷/g, "/")
            .replace(/−/g, "-")
            .replace(/\*\*/g, "**");

        // Evaluate the expression
        let result = Function('"use strict"; return (' + evalExpr + ')')();

        // Format the result
        if (typeof result === "number") {
            // Round to 10 decimal places to avoid floating point errors
            result = Math.round(result * 10000000000) / 10000000000;
            expression = result.toString();
        } else {
            expression = "Error";
        }
    } catch (error) {
        expression = "Error";
    }

    updateDisplay();
}

function updateDisplay() {
    input.value = expression || "0";
}

// Keyboard support
document.addEventListener("keydown", (e) => {
    const key = e.key;

    // Number keys
    if (key >= "0" && key <= "9" || key === ".") {
        expression += key;
        updateDisplay();
    }
    // Operators
    else if (key === "+" || key === "-" || key === "*" || key === "/") {
        e.preventDefault();
        expression += key;
        updateDisplay();
    }
    // Enter for equals
    else if (key === "Enter") {
        e.preventDefault();
        calculate();
    }
    // Backspace for delete
    else if (key === "Backspace") {
        e.preventDefault();
        expression = expression.slice(0, -1);
        updateDisplay();
    }
    // Escape for clear
    else if (key === "Escape") {
        expression = "";
        updateDisplay();
    }
});

// Initialize display
updateDisplay();
