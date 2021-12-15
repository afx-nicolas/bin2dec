const binaryInput = document.querySelector("#binary");
const decimalInput = document.querySelector("#decimal");
const convertButton = document.querySelector(".convert-btn");

let currentPage;

window.addEventListener("load", clearFields);

function scrollPage(page = currentPage) {
  const vpHeight = window.innerHeight;
  currentPage = page;
  if (vpHeight > 720) {
    window.scrollTo(0, vpHeight * currentPage);
  } else {
    if (currentPage == 1) window.scrollTo(0, 800);
    else window.scrollTo(0, 0);
  }
}

window.addEventListener("resize", () => {
  const vpWidth = window.innerWidth;
  if (vpWidth > 450) scrollPage(currentPage);
});

function clearFields() {
  binaryInput.value = "";
  decimalInput.value = "";
}

function convertFields(input) {
  let binary = ["0", "0", "0", "0", "0", "0", "0", "0"];
  let decimal = 0;

  for (let x = 0; x < input.length; x++) {
    binary[7 - x] = input[input.length - 1 - x];
  }

  binaryInput.value = binary.join("");

  for (let i = 0; i < binary.length; i++) {
    if (binary[i] == "1") {
      decimal += 2 ** (7 - i);
    }
  }

  decimalInput.value = decimal;
}

function checkField() {
  const input = binaryInput.value.split("");

  input.length == 0 ? clearFields() : convertFields(input);
}

function validateBinaryInput(event) {
  event.preventDefault();
  const splitInput = binaryInput.value.split("");
  let i = 0;
  let isValid = true;
  if (splitInput.length > 8) {
    isValid = false;
  } else {
    while (i < splitInput.length) {
      if (splitInput[i] == "0") i++;
      else if (splitInput[i] == "1") i++;
      else {
        isValid = false;
        break;
      }
    }
  }

  isValid ? checkField() : clearFields();
}
