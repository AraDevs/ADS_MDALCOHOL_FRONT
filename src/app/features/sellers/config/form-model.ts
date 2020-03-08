import { InputControlConfig } from "@core/types";
import { Injectable } from '@angular/core';

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
            cssClasses:'', 
            label:'Sellers.Form.Name' },

            {key:'seller_code', 
            fieldType:'Input', 
            type:'text', 
            id:'seller_code', 
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