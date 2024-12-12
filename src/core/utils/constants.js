import { isValidPhoneNumber } from 'libphonenumber-js';

export const regexpValidation = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

export const FIRESTORE_PATH_NAMES = {
    REGISTER_USERS: 'registered_users',
    RESUMES: 'resumes',
};

export const ROUTE_CONSTANTS={
    LOGIN:'/login',
    REGISTER:'/register',
    CABINET:'/cabinet',
    MAIN:'/cabinet/main',
    WELCOMEPAGE: '/cabinet/start',
    RESUME: '/cabinet/main/resume/:id',
    RESUMES: '/cabinet/resumes',
    CREATED_RESUME: '/cabinet/resumes/:id'
};

export const STORAGE_PATH_NAMES = {
    RESUME_IMAGES: 'resume_images'
}

export const PhoneNumberValidation = (rule, value) => {
    if (!value) {
        return Promise.reject();
    }else if (!isValidPhoneNumber(value)) {
       return Promise.reject('Please enter a valid phone number with a country code.');
    }

    return Promise.resolve();
};

export const STYLES = {
    WHITE: 'white',
    FONTSIZE: 10,
    OPACITE: 'rgba(255, 255, 255, 0.636)',
    BLUE: '#1890ff',
    WRAPPERTITLECOLOR: 'rgba(0, 60, 255, 0.64)',
    MARGIN: 10
}