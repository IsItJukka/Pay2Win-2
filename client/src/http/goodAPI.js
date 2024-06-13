import { $authHost, $host } from "./index";

export const createGood = async (good) => {
    const { data } = await $authHost.post(`api/good/add-good`, good);
    return data;
};

export const fetchGoodsByGameId = async (gameId) => {
    const { data } = await $host.get(`api/good/${gameId}`);
    return data;
};

export const fetchOffer = async (goodId) => {
    const { data } = await $host.get(`api/good/offer/${goodId}`);
    return data;
};

export const hideGood = async (goodId) => {
    const { data } = await $authHost.put(`api/good/hide/${goodId}`);
    return data;
};

export const publishGood = async (goodId) => {
    const { data } = await $authHost.put(`api/good/publish/${goodId}`);
    return data;
};

export const purchaseGood = async (goodId) => {
    const { data } = await $authHost.post(`api/good/purchase/${goodId}`);
    return data;
};

export const getPurchaseData = async (goodId) => {
    const { data } = await $authHost.get(`api/good/purchase/${goodId}`);
    return data;
};
