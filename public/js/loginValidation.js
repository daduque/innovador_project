//validation for the login form

//wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    //get the form element
    let loginForm = document.getElementById('loginForm');
    let errorsSection = document.getElementById('errors');
    //add a submit event listener
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        errorsSection.innerHTML = '';
        errorsSection.hidden = false;
        
        let loginInputs = Array.from(loginForm.elements);
        
        loginInputs.pop();
        let message = '';
        let errorsCount = [];
        loginInputs.forEach((input, index) => {
            
            if(input.value.trim() === '' || input.value === null || input.value === undefined){
                errorsCount[index] = 1;
                errorsSection.innerHTML += '<p class="my-1">your '+ input.name + ' is required</p>';
                input.classList.add('is-invalid');
            }else if(input.name === 'email' ){
                let emailPattern = /\S+@\S+\.\S+/;
                if(!emailPattern.test(input.value) || input.value.length < 5 || input.value.length > 50){
                    errorsCount[index] = 1;
                    errorsSection.innerHTML += '<p class="my-1">your email is invalid</p>';
                }else{
                    message += '<p class="my-1">your '+ input.name + ' is: '+ input.value + '</p>';
                }
            }else if(input.name === 'password' ){
                let passwordPattern = /^(?!.* )(?=.*[a-zA-Z0-9]).{8,30}$/;
                if(!passwordPattern.test(input.value)){
                    errorsCount[index] = 1;
                    errorsSection.innerHTML += '<p class="my-1">your password is invalid</p>';
                }else{
                    message += '<p class="my-1">your '+ input.name + ' is: '+ input.value + '</p>';
                }
            }

            if(!errorsCount[index]){
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
            }else{
                input.classList.remove('is-valid');
                input.classList.add('is-invalid');
            }

            if(errorsCount.length === 0 && index === loginInputs.length - 1){
                errorsSection.innerHTML += message;
                errorsSection.classList.remove('alert-danger');
                errorsSection.classList.add('alert-success');

                loginForm.submit();
            }
        });
    });
});