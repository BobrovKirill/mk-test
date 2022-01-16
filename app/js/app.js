window.onload = function () {
  const requiredList = document.querySelectorAll('.form__input');
  const form = document.querySelector('.page-form__form');
  const form2 = document.querySelector('.page-form__form2');
  const formList = document.querySelectorAll('form');
  const openFormButton = document.querySelector('.page-form__btn');
  const formButton = form.querySelector('.form__btn');
  const inputCheckbox = document.querySelector('.form__input-checkbox');
  const formDatas = [];

  //CONTROL VALIDATE FORM
  requiredList.forEach((el) => {
    el.addEventListener('input', ({ target }) => {
      const input = target;
      const formItem = input.closest('.form__item');
      chectInput(input, input.getAttribute('name'), formItem);
      chectButtonForm();
    });
  });
  //CONTROL CHECKBOX
  document
    .querySelector('.form__input-checkbox')
    .addEventListener('change', chectButtonForm);
  // CONTROL OPEN FORM BUTTON
  function chectButtonForm() {
    if (
      (document.querySelectorAll('.done').length ===
        document.querySelectorAll('.form__input').length) &
      (inputCheckbox.checked === true)
    ) {
      formButton.classList.add('active');
      formButton.removeAttribute('disabled');
    } else {
      formButton.classList.remove('active');
      formButton.setAttribute('disabled', 'disabled');
    }
  }
  //VALIDATE INPUTS
  function chectInput(input, attribute, formItem) {
    if (isValidate(input.value, attribute)) {
      input.classList.add('done');
      input.classList.remove('error');
      attribute != 'password'
        ? formItem.querySelector('.form__item-error').classList.remove('error')
        : null;
    } else {
      input.classList.remove('done');
      input.classList.add('error');
      attribute != 'password'
        ? formItem.querySelector('.form__item-error').classList.add('error')
        : null;
    }
  }
  //VALIDATE
  function isValidate(value, attribute) {
    if (attribute === 'email') {
      return /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(
        value
      );
    } else if (attribute === 'name') {
      return /^[a-zA-Z]+(_\d|\d_)+.*/.test(value);
    } else if (attribute === 'password') {
      passwordValidate(value);
      return /(?=^.{6,32}$)((?=.*\d)|(?=.*\W+))(?=.*[A-Z])(?=.*[a-z]).*$/.test(
        value
      );
    } else if (attribute === 'passwordConfirm') {
      return (
        document.querySelector('input[name="password"]').value ===
        document.querySelector('input[name="passwordConfirm"]').value
      );
    }
  }
  function passwordValidate(value) {
    let lengthTest = /^.{6,32}/.test(value);
    let numberTest = /(\d)/.test(value);
    let uppercaseTest = /[A-Z]/.test(value);
    controlPasswordValidate(document.querySelector('.length'), lengthTest);
    controlPasswordValidate(document.querySelector('.num'), numberTest);
    controlPasswordValidate(document.querySelector('.Up'), uppercaseTest);
  }
  //CONTROL PASSWORD VALIDE ITEMS
  function controlPasswordValidate(item, confirm) {
    if (confirm) {
      item.classList.remove('fail');
      item.classList.add('succeed');
    } else {
      item.classList.remove('succeed');
      item.classList.add('fail');
    }
  }
  // OPEN FORM BUTTON
  openFormButton.addEventListener('click', function (e) {
    form.classList.add('visable');
  });
  //CLEAR VALIDATE PASSWORD MARKERS
  function clearValidatePasswordItems() {
    document.querySelectorAll('.form__info-text').forEach((e) => {
      e.classList.remove('succeed');
      e.classList.remove('fail');
    });
  }
  // CLOSE FORMS BUTTONS
  document.querySelectorAll('.form__close').forEach((buttonClose) => {
    buttonClose.addEventListener('click', function () {
      if (buttonClose.closest('.page-form__form')) {
        form.classList.remove('visable');
        form.reset();
        clearValidatePasswordItems();
      } else if (buttonClose.closest('.page-form__form2')) {
        form2.classList.remove('visable');
        form2.reset();
        formDatas.length = 0;
      }
    });
  });

  // SUBMIT FOR FORMS
  formList.forEach((el) => {
    el.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(el);
      const formDataJson = Object.fromEntries(formData);
      formDatas.push(formDataJson);
      el.classList.remove('visable');
      el.reset();
      if (el.classList.contains('page-form__form')) {
        form2.classList.add('visable');
        clearValidatePasswordItems();
      } else if (el.classList.contains('page-form__form2')) {
        console.log(JSON.stringify(formDatas));
        el.classList.remove('visable');
        openFormButton.classList.add('not-activ');
        openFormButton.setAttribute('disabled', 'disabled');
      }
    });
  });
};
