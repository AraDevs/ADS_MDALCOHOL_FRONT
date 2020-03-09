import { InputControlConfig } from "@core/types";
import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { minLength } from '@shared/Validator';

@Injectable()
export class FormModel
{
    getModel(): Partial<InputControlConfig>[]
    {
        return [
            { key:'name', 
            fieldType:'Input', 
            type:'text', 
            id:'name', 
            validations: [Validators.required],
            validatorMessages: ['Sellers.FormValidator.Seller.Required'],
            validationNames: ['required'],
            cssClasses:'', 
            label:'Sellers.Form.Name' },

            {key:'seller_code', 
            fieldType:'Input', 
            type:'text', 
            id:'seller_code', 
            validations: [Validators.required, minLength(4)],
            validatorMessages: ['Sellers.FormValidator.Seller.Required', 'Sellers.FormValidator.Seller.MinLength'],
            validationNames: ['required','min'],
            cssClasses:'', 
            label:'Sellers.Form.SellerCode'},

            {key:'state', 
            fieldType:'Checkbox', 
            id:'state', 
            cssClasses:'',  
            label:'Sellers.Form.State', 
            defautlValue:true},
        ];
    }
}