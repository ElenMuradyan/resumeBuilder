import { isValidPhoneNumber } from 'libphonenumber-js';

export const regexpValidation = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

export const FIRESTORE_PATH_NAMES = {
    REGISTER_USERS: 'registered_users',
};

export const ROUTE_CONSTANTS={
    LOGIN:'/login',
    REGISTER:'/register',
    CABINET:'/cabinet',
    MAIN:'/cabinet/main'
};

export const PhoneNumberValidation = (rule, value) => {
    if (!value) {
        return Promise.reject();
    }else if (!isValidPhoneNumber(value)) {
       return Promise.reject('Please enter a valid phone number with a country code.');
    }

    return Promise.resolve();
};
