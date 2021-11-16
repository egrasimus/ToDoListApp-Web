        document.addEventListener('DOMContentLoaded', function () {
            var pass1 = document.querySelector('#POST-password')
                , pass2 = document.querySelector('#POST-password-repeat')
            pass1.addEventListener('input', function () {
                this.value != pass2.value ? pass2.setCustomValidity('Пароли не совпадают!') : pass2.setCustomValidity('')
            })
            pass2.addEventListener('input', function (e) {
                this.value != pass1.value ? this.setCustomValidity('Пароли не совпадают!') : this.setCustomValidity('')
            })
        })
