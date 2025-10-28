export const isAdminUser = () => {
    return localStorage.getItem('isAdmin') === 'true';
};

export const ADMIN_CREDENTIALS = {
    email: 'admin@gmail.com',
    password: 'admin123'
};

export const validateAdminCredentials = (email, password) => {
    return email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password;
};

export const setAdminToken = () => {
    localStorage.setItem('fa_token', 'admin_token');
    localStorage.setItem('isAdmin', 'true');
};

export const clearAdminToken = () => {
    localStorage.removeItem('isAdmin');
};