export const settings = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__submit",
    inactiveButtonClass: "modal__submit_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error"
  }
  

  // FINISH REFACTORING THIS HERE VALIDATION MY BOY
  const setEventListeners = (formEl, config) => {
     const inputList = Array.from(formEl.querySelectorAll(settings.inputSelector));
     const buttonEl = formEl.querySelector(settings.submitButtonSelector);
     toggleButtonState(inputList, buttonEl, config);
  
     inputList.forEach((inputElement) => {
       inputElement.addEventListener("input", function () {
        checkInputValidity(formEl, inputElement);
        toggleButtonState(inputList, buttonEl, config);
       });
     });
  };
  
  const hasInvalidInput = (inputList) => {
   return inputList.some((input) => {
    return !input.validity.valid;
   });
  };
  
  const toggleButtonState = (inputList, buttonEl, config) => {
   if (hasInvalidInput(inputList)){
   disableButton(buttonEl, config);
   } else {
   enableButton(buttonEl, config);
   }
  };
  
  export const disableButton = (buttonEl, settings) => {
    buttonEl.disabled = true;
    buttonEl.classList.add(settings.inactiveButtonClass);
  };
  
  const enableButton = (buttonEl, settings) => {
    buttonEl.disabled = false;
    buttonEl.classList.remove(settings.inactiveButtonClass);
  };
  
  export const resetValidation = (formEl, inputList) => {
    inputList.forEach((input) => {
      hideInputError(formEl, input);
      input.value = '';
    });
  };
  
  const checkInputValidity = (formEl, inputEl) => {
    if (!inputEl.validity.valid) {
      showInputError(formEl, inputEl, inputEl.validationMessage);
    } else {
      hideInputError(formEl, inputEl);
    }
    console.log(inputEl.validity);
  };
  
  const showInputError = (formEl, inputEl, errorMsg) => {
    const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
    errorMsgEl.textContent = errorMsg;
    inputEl.classList.add(settings.inputErrorClass);
  };
  
  const hideInputError = (formEl, inputEl) => {
    const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
    errorMsgEl.textContent = "";
    inputEl.classList.remove(settings.inputErrorClass);
  };
  
  export const enableValidation = (config) => {
     const formList = Array.from(document.querySelectorAll(config.formSelector));
     formList.forEach((formEl) => {
      setEventListeners(formEl, config);
     });
  };
  
  enableValidation(settings);
  