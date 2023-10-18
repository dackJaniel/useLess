// *********
// FORM VALIDATION
// *********

const form = document.getElementById("registerNewAuthor");
const formElements = form.querySelectorAll("input");
const labels = form.querySelectorAll("label");
const submit = form.querySelector("#submit");
const massage = form.querySelector(".massage");

function validationType(event) {
  const inputType = event.target.type;
  const inputValue = event.target.value;
  let validateConfig;
  switch (inputType) {
    case "text":
      validateConfig = {
        minLength: 3,
        maxLength: 15,
        regEx: /^[a-zA-Z ]+$/,
        required: true,
        errorTxt: "min 3 Zeichen, max 15 Zeichen",
      };
      validate(validateConfig, inputValue, event);
      break;
    case "email":
      validateConfig = {
        regEx: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        required: true,
        errorTxt: "Valide E-Mail-Adresse eingeben",
      };
      validate(validateConfig, inputValue, event);
      break;
    case "tel":
      validateConfig = {
        regEx: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
        errorTxt: "Valide Telefonnummer eingeben",
      };
      validate(validateConfig, inputValue, event);
      break;
    default:
      console.log(`Der Input Type "${inputType}" wird nicht geprüft.`);
      break;
  }
}

function validate(configs, value, event) {
  let configResult = [];
  for (let config in configs) {
    switch (config) {
      case "minLength":
        configResult.push(configs.minLength <= value.trim().length);
        break;
      case "maxLength":
        configResult.push(configs.maxLength >= value.trim().length);
        break;
      case "regEx":
        configResult.push(configs.regEx.test(value));
        break;
      case "required":
        configResult.push(value.trim().length != "");
        break;
    }
  }
  let errTxt = "";
  if (configs.errorTxt === "") {
    errTxt = "Etwas ist schief gelaufen.";
  } else {
    errTxt = configs.errorTxt;
  }
  printResult(configResult, event, errTxt);
}

function printResult(validResults, event, errTxt) {
  const label = event.target.parentElement;
  const small = label.querySelector("small");
  for (result of validResults) {
    if (result === false) {
      label.classList.remove("success");
      label.classList.add("misstake");
      small.innerText = errTxt;
      break;
    } else {
      label.classList.remove("misstake");
      label.classList.add("success");
      small.innerText = "Alles OK";
    }
  }
}

function isRequired(label) {
  switch (label) {
    case "name":
      return true;
    case "lastname":
      return true;
    case "email":
      return true;
    case "tel":
      return false;
    case "search":
      return true;
    case "dataSec":
      return true;
    case "newsletter":
      return false;
    default:
      return false;
  }
}

function checkRequired() {
  let valid = [];
  Array.from(labels);
  labels.forEach((label) => {
    const input = label.querySelector("input");
    const select = label.querySelector("select");
    let small = label.querySelector("small");
    let isReq = isRequired(label.htmlFor);

    if (input != null) {
      if (
        isReq &&
        (input.value === "" ||
          (input.type === "checkbox" && input.checked === false))
      ) {
        label.classList.remove("success");
        label.classList.add("misstake");
        small.innerText = "Dieses Feld ist ein Pflichtfeld";
        valid.push(false);
      } else {
        label.classList.remove("misstake");
        label.classList.add("success");
        small.innerText = "";
        valid.push(true);
      }
    } else {
      if (isReq && select.value === "") {
        label.classList.remove("success");
        label.classList.add("misstake");
        small.innerText = "Dieses Feld ist ein Pflichtfeld";
        valid.push(false);
      } else {
        label.classList.remove("misstake");
        label.classList.add("success");
        small.innerText = "";
        valid.push(true);
      }
    }
  });
  if (!valid.includes(false)) {
    // redirect
    massage.classList.remove("massage-miss");
    massage.classList.add("massage-success");
    massage.innerHTML =
      "Vielen Dank für dein Interesse. Wir melden uns bei dir.";
  } else {
    // misstakes
    massage.classList.remove("massage-success");
    massage.classList.add("massage-miss");
    massage.innerHTML =
      "Es ist ein Fehler aufgetreten. Bitte prüfe die Felder.";
  }
}

for (let formElement of formElements) {
  formElement.addEventListener("focusout", (e) => validationType(e));
}

submit.addEventListener("click", checkRequired);
