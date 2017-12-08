import {AbstractControl} from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
       let password = AC.get('new_password').value; // to get value in input tag
       let confirmPassword = AC.get('confirm_password').value; // to get value in input tag
        if(password != confirmPassword) {
            console.log('false');
            AC.get('confirm_password').setErrors( {MatchPassword: true} )
        } else {
            console.log('true');
            return null
        }
    }

    static PasswordStrength(AC: AbstractControl){
        let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        let mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

        let password = AC.get('new_password').value; // to get value in input tag
        if(strongRegex.test(password)) {
            AC.get('strength').setValue("strong");
        } else if(mediumRegex.test(password)) {
            AC.get('strength').setValue("medium");
        } else {
            AC.get('strength').setValue("low");
        }
    }
}