export const ROUTE_NAMES = {
    HOME: '/',
    ABOUT: '/about',
    RESUMES: '/resumes',
    LOGIN:'/sign-in',
    REGISTER:'/sign-up',
}

export const navbarItems = [ 'HOME', 'ABOUT', 'RESUMES' ]
   
export const regexpValidation = /^(?=.*\d)(?=.*[!@#$%^&*]).{6,16}$/;

export const FIRESTORE_PATH_NAMES = {
    REGISTERED_USERS: 'registered_users',
}