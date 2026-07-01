import axios from "axios";

const BASE_URL = 'http://192.168.113.105:8080/eLibrary_war/api';

export const endpoints = {
    // AUTH
    'login': '/login',
    'register': '/users',
    'profile': '/secure/profile',
    // DOCUMENTS
    'documents': '/documents',
    'latest-documents': '/documents/latest',
    'trend-documents': '/documents/trend',
    'document-detail': (id) => `/documents/${id}`,
    // CATEGORY
    'categories': '/categories',
    // PAYMENT
    'payments': '/payments',
    // REVIEWS
    'reviews': '/reviews',

};


export const authApis = (token) => {
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
};

export default axios.create({
    baseURL: BASE_URL
});