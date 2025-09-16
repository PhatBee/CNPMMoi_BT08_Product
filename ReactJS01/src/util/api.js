import axios from './axios.customize';

export const createUserApi = (name, email, password) => {
    const URL_API = "/v1/api/register";
    const data = {
        name, email, password
    }

    return axios.post(URL_API, data);
}

export const loginApi = (email, password) => {
    const URL_API = "/v1/api/login";
    const data = {
        email, password
    }

    return axios.post(URL_API, data);
}

export const getUserApi = () => {
    const URL_API = "/v1/api/user";
    return axios.get(URL_API);
}

export const fetchPage = async ({ category, page, limit }) => {
const URL_API = "/v1/api/products";
  const params = { category, page, limit };
  try {
    const res = await axios.get(URL_API, { params });
    console.log("Fetch products raw: ", res);
    console.log("Fetch products data: ", res.data);
    return res;
  } catch (err) {
    console.error("Fetch products error: ", err);
    return { products: [], page: 1, limit: 12, totalPages: 0, totalItems: 0 };
  }
};

export const searchProductsApi = async (filters) => {
    const URL_API = "/v1/api/products/search";
    try {
        const res = await axios.get(URL_API, { params: filters });
        console.log("Search products raw: ", res);
        console.log("Search products data: ", res.data);
        return res;
    } catch (err) {
        console.error("Search products error: ", err);
        return { products: [] };
    } 
};

export const getMeApi = async (token) => {
    const URL_API = "/v1/api/me";
    try {
        const res = await axios.get(URL_API, {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Get user raw: ", res);
        return res;
    } catch (err) {
        console.error("Get user error: ", err);
        return null;
    }
};

export const getCategoriesApi = async () => {
    const URL_API = "/v1/api/products/categories";
    try {
        const res = await axios.get(URL_API);
        console.log("Get categories raw: ", res);
        return res;
    } catch (err) {
        console.error("Get categories error: ", err);
        return [];
    }
};
