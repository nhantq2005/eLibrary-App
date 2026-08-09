import axios from "axios";

const BASE_URL = 'http://192.168.:8080/eLibrary_war_exploded/api';

export const endpoints = {
    // AUTH
    'login': '/login',
    'register': '/users',
    'profile': '/secure/profile',
    // USER
    'count-users': '/users/count',
    // DOCUMENTS
    'documents': '/documents',
    'add-document': '/secure/documents',
    'latest-documents': '/documents/latest',
    'trend-documents': '/documents/trend',
    'document-detail': (id) => `/documents/${id}`,
    'count-documents': '/documents/count',
    'delete-document': (id) => `/secure/documents/${id}`,
    
    // CATEGORY
    'categories': '/categories',
    // AUTHOR
    'authors': '/authors',
    // TAG
    'tags': '/tags',
    // PAYMENT
    'payments': '/payments',
    // REVIEWS
    'reviews': (documentId) => `/secure/documents/${documentId}/reviews`,
    'get-reviews': (documentId) => `/documents/${documentId}/reviews`,
    // BORROW
    'borrow':'/secure/borrows',
    'get-borrow':'/secure/borrows',
    'update-borrow-status': (borrowId) => `/secure/borrows/${borrowId}/status`,
    //BUY
    'buy':'/secure/buy',
    'get-buy':'/secure/buy',
    'update-buy-status': (buyId) => `/secure/buy/${buyId}/status`,
    // STATS
    'overdue-stats':'/stats/secure/overdue-documents',
    'category-stats':'/stats/secure/categories',
    'review-stats':'/stats/secure/reviews',
    'borrowing-stats':'/stats/secure/borrowing',
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