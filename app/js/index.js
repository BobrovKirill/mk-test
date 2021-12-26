window.onload = function () {
  const requiredList = document.querySelectorAll('.form__input');
	const form = document.querySelector('.form')
	const closeFormButton = document.querySelector('.form__close')
	const openFormButton = document.querySelector('.page-form__btn')
	const formButton = document.querySelector('.form__btn')
	const inputCheckbox = document.querySelector('.form__input-checkbox')

  requiredList.forEach((el) => {
    el.addEventListener('input', ({ target }) => {
      const input = target;
			const formItem = input.closest('.form__item')
        chectInput(input, input.getAttribute('name'), formItem);
        chectButtonForm();
    });
  });
	document.querySelector('.form__input-checkbox').addEventListener('change', chectButtonForm)
	
  function chectButtonForm() {
    if (document.querySelectorAll('.done').length === document.querySelectorAll('.form__input').length & inputCheckbox.checked === true) {
      formButton.classList.add('active');
			formButton.removeAttribute('disabled')
    } else {
      formButton.classList.remove('active');
			formButton.setAttribute('disabled','disabled')
    }
  }

  function chectInput(input, attribute, formItem) {
    if (isValidate(input.value, attribute)) {
      input.classList.add('done');
			input.classList.remove('error');
			attribute != "password" ? formItem.querySelector('.form__item-error').classList.remove('error') : null
    } else {
      input.classList.remove('done');
			input.classList.add('error');
			attribute != "password" ? formItem.querySelector('.form__item-error').classList.add('error') : null
    }
  }

	function isValidate(value, attribute) {
		if (attribute === 'email') {
			return /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(value);
		} else if (attribute === 'name'){
			return /^[A-Z]+([a-zA-Z]{1,40})([0-9]{1,40})_{1,40}/.test(value);
		} else if (attribute === 'password'){
			passwordValidate(value)
			return /(?=^.{6,32}$)((?=.*\d)|(?=.*\W+))(?=.*[A-Z])(?=.*[a-z]).*$/.test(value);
		} else if (attribute === 'passwordConfirm'){
			return document.querySelector('input[name="password"]').value === document.querySelector('input[name="passwordConfirm"]').value
		}
	}
	function passwordValidate(value) {
		let lengthTest = /^.{6,32}/.test(value)
		let numberTest = /(\d)/.test(value)
		let uppercaseTest = /[A-Z]/.test(value)
		controlPasswordValidate(document.querySelector('.length'), lengthTest)
		controlPasswordValidate(document.querySelector('.num'), numberTest)
		controlPasswordValidate(document.querySelector('.Up'), uppercaseTest)
	}
	
	function controlPasswordValidate (item, confirm) {
		if (confirm) {
			item.classList.remove('fail')
			item.classList.add('succeed')
		} else {
			item.classList.remove('succeed')
			item.classList.add('fail')
		}
	}
	
	closeFormButton.addEventListener('click', function (){
		form.classList.remove('visable')
		form.classList.add('hiden')
		form.reset()
		document.querySelectorAll('.form__info-text').forEach(e => {
			e.classList.remove('succeed')
			e.classList.remove('fail')
		})

	})
	openFormButton.addEventListener('click', function (){
		form.classList.add('visable')
		form.classList.remove('hiden')
	})

	
	form.addEventListener('submit', sendForm)
	
	function sendForm(e) {
		e.preventDefault()

		const formData = new FormData(form)
		const formDataJson = JSON.stringify(Object.fromEntries(formData))
		console.log(formDataJson)

		form.classList.remove('visable')
		form.classList.add('hiden')

		form.reset()

		openFormButton.classList.add('not-activ')		
		openFormButton.setAttribute('disabled','disabled')

	}
}
