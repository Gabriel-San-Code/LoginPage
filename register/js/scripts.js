class Validator {

    constructor() {
        this.validations = [
            'data-required',
            'data-min-length',
            'data-max-length',
            'data-only-letters',
            'data-email-validate',
            'data-equal',
            'data-password-validate'
        ]
    }

    //iniciar validacao de todos os campos 
    validate(form) {

        //resgata todas as validacoes 
        let currentValidations = document.querySelectorAll('form .error-validation');

        if(currentValidations.length > 0) {
            this.cleanValidations(currentValidations);
        }

        //pega os inputs
        let inputs = form.getElementsByTagName('input');

        //HTMLCollection -> Array 
        let inputsArray = [...inputs];


        //loop nos inputs e validacao ao que for encontrado
        inputsArray.forEach(function(input) {

            //loop em validacoes existentes
            for(let i = 0; this.validations.length > i; i++){
                //verifica validacao atual no input
                if(input.getAttribute(this.validations[i]) != null){

                    //transformando string em metodo
                    let method = this.validations[i].replace('data-','').replace('-','');

                    // valor do input 
                    let value = input.getAttribute(this.validations[i]);

                    //invocar metodo
                    this[method](input, value);

                }
            }

        }, this)

    }

    //verifica se um input e requerido
    required(input) {
    
        let inputValue = input.value;
    
        if(inputValue === '') {
            let errorMessage = `Este campo é obrigatório`
            this.printMessage(input, errorMessage);
        }
    }

    //verifica se um input tem um numero minimo de caracteres
    minlength(input, minValue) {

        let inputLenght = input.value.length;

        let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;

        if (inputLenght < minValue) {
            this.printMessage(input, errorMessage);
        }
    }


    //verifica se um inptu tem caracteres a mais que o permitido
    maxlength(input, maxValue) {

        let inputLength = input.value.length;

        let errorMessage = `O campo precisa não pode ter mais de ${maxValue} caracteres`;

        if(inputLength > maxValue){
            this.printMessage(input ,errorMessage);
        }
    }

    //valida senha
    passwordvalidate(input){

        let charArr = input.value.split("");

        let uppercases = 0;
        let numbers = 0;

        for(let i = 0; charArr.length > i; i++) {
            if(charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))){
                uppercases ++;
            } else if(!isNaN(parseInt(charArr[i]))){
                numbers++;
            }
        }

        if(uppercases === 0 || numbers === 0) {
            let errorMessage = `A senha precisa de um caractere maiúsculo e um número`;

            this.printMessage(input, errorMessage);
        }

    }
    
    //validacao de email
    emailvalidate(input){
        
        //padrao email@email.com(.br)
        let regEx = /\S+@\S+\.\S+/;

        let email = input.value;
        
        let errorMessage = `E-mail deve ser no padrão "email@email.com" `;

        if(!regEx.test(email)) {
            this.printMessage(input, errorMessage);
        }
    }

    //valida se campo possio apenas letras
    onlyletters(input) {
        let regEx = /\^[A-Za-z]+$/;

        let inputValue = input.value;

        let errorMessage = `Este campo não aceita números ou caracteres especiais`;

        if(!regEx.test(inputValue)) {
            this.printMessage(input, errorMessage);
        }
    }

    //verifica se dois campos são iguais
    equal(input, inputName) {

        let inputToCompare = document.getElementsByName(inputName)[0];

        let errorMessage = `Este campo precisa ser igual à ${inputName}`;

        if(input.value != inputToCompare.value){
            this.printMessage(input, errorMessage);
        }
    }

    //imprimir mensagens de erro na tela
    printMessage(input, msg){

        //verifica quantidade de erros 
        let errorsQty = input.parentNode.querySelector('.error-validation');

        if(errorsQty === null){

            let template = document.querySelector('.error-validation').cloneNode(true);
    
            template.textContent = msg;
    
            let inputParent = input.parentNode;
    
            template.classList.remove('template');
    
            inputParent.appendChild(template);
        }

    }

    //limpa validacoes da tela
    cleanValidations(validations){
        validations.forEach(e => e.remove());
    }
}

// Resgate de elementos do HTML
let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");


//Instancia e inicia Validador
let validator = new Validator();

// evento que dispara validacoes 

submit.addEventListener('click', function(e){
    
    e.preventDefault();
     
    validator.validate(form);

});