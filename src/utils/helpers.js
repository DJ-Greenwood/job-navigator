export const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
};

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
};

export const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
};