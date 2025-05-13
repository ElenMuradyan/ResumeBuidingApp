import { Rule } from "antd/es/form";
import { isValidPhoneNumber } from "libphonenumber-js";

export const PhoneNumberValidation = (rule: Rule, value: string) => {
    if (!value) {
        return Promise.reject();
    }else if (!isValidPhoneNumber(value)) {
       return Promise.reject('Please enter a valid phone number with a country code.');
    }
  
    return Promise.resolve();
  };