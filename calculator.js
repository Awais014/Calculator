let input = document.getElementById("inputBox");
let buttons = document.querySelectorAll("button");

let expression = "";

buttons.forEach(button => {
    button.addEventListener("click", () => {
        let btn = button.innerText;

        if (btn === "AC") {
            expression = "";
            input.value = "";
        } else if (btn === "DEL") {
            expression = expression.slice(0, -1);
            input.value = expression;
        } else if (btn === "=") {
            try {
                // Replace custom functions with real Math equivalents
                let evalExpr = expression
                    .replace(/√/g, "Math.sqrt")
                    .replace(/sin⁻¹/g, "Math.asin")
                    .replace(/cos⁻¹/g, "Math.acos")
                    .replace(/tan⁻¹/g, "Math.atan")
                    .replace(/sin/g, "Math.sin")
                    .replace(/cos/g, "Math.cos")
                    .replace(/tan/g, "Math.tan")
                    .replace(/ln/g, "Math.log")
                    .replace(/e/g, "Math.E")
                    .replace(/π/g, "Math.PI");
                    
                expression = eval(evalExpr);
                input.value = expression;
            } catch (error) {
                input.value = "Error";
                expression = "";
            }
        } else if (btn === "^") {
            expression += "**";
            input.value = expression;
        } else {
            expression += btn;
            input.value = expression;
        }
    });
});
