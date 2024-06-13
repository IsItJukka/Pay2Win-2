import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";
export const checkToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
        return jwtDecode(token);
    } else {
        return null;
    }
};

export const checkAuthOnReload = async () => {
    const tokenData = checkToken();
    if (tokenData) {
        return tokenData;
    } else {
        const { data } = await $authHost.get("api/user/auth");
        localStorage.setItem("token", data.token);
        return jwtDecode(data.token);
    }
};

export const registration = async (login, email, password) => {
    const { data } = await $host.post("api/user/registration", {
        login,
        email,
        password,
        role: 1,
    });
    localStorage.setItem("token", data.token);

    return jwtDecode(data.token);
};

export const addBalance = async (userId, amount) => {
    try {
        const { data } = await $authHost.post("api/user/add-balance", {
            userId,
            amount,
        });
        localStorage.setItem("token", data.token);
        return { token: data.token, balance: data.balance };
    } catch (error) {
        throw error;
    }
};

export const login = async (email, password) => {
    const { data } = await $host.post("api/user/login", { email, password });
    localStorage.setItem("token", data.token);
    return jwtDecode(data.token);
};

export const check = async () => {
    const { data } = await $authHost.get("api/user/auth");
    localStorage.setItem("token", data.token);

    return jwtDecode(data.token);
};

export const fetchDropInfo = async () => {
    const tokenData = checkToken();
    if (tokenData) {
        const { data } = await $host.get(`api/user/${tokenData.id}`);
        return data;
    } else {
        throw new Error("User is not authenticated");
    }
};

export const fetchUserInfoById = async (id) => {
    try {
        const { data } = await $host.get(`api/user/${id}`);
        return data;
    } catch (error) {
        throw error;
    }
};

export const updateUserProfile = async (id, updateData) => {
    try {
        const { data } = await $authHost.put(`api/user/${id}`, updateData);
        return data;
    } catch (error) {
        throw error;
    }
};

export const fetchUserGoodsById = async (userId) => {
    try {
        const { data } = await $host.get(`api/good/user/${userId}`);
        return data;
    } catch (error) {
        throw error;
    }
};

export const fetchUserPurchases = async () => {
    try {
        const { data } = await $authHost.get("api/user/purchases");
        return data;
    } catch (error) {
        throw error;
    }
};

export const fetchUserSells = async () => {
    try {
        const { data } = await $authHost.get("api/user/sells");
        return data;
    } catch (error) {
        throw error;
    }
};

export const blockUser = async (userId) => {
    try {
        const { data } = await $authHost.put(`api/user/block/${userId}`);
        return data;
    } catch (error) {
        throw error;
    }
};

export const isUserBlocked = async (userId) => {
    try {
        const { data } = await $authHost.get(`api/user/is-blocked/${userId}`);
        return data;
    } catch (error) {
        throw error;
    }
};

export const unblockUser = async (userId) => {
    try {
        const { data } = await $authHost.put(`api/user/unblock/${userId}`);
        return data;
    } catch (error) {
        throw error;
    }
};

export const grantTechSupport = async (userId) => {
    try {
        const { data } = await $authHost.put(
            `api/user/grant-tech-support/${userId}`
        );
        return data;
    } catch (error) {
        throw error;
    }
};

export const revokeTechSupport = async (userId) => {
    try {
        const { data } = await $authHost.put(
            `api/user/revoke-tech-support/${userId}`
        );
        return data;
    } catch (error) {
        throw error;
    }
};
