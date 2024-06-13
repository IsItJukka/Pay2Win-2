import { $authHost, $host } from "./index";

export const createGame = async (game) => {
    const { data } = await $authHost.post("api/game", game);
    return data;
};

export const fetchGame = async () => {
    const { data } = await $host.get("api/game");
    return data;
};

export const fetchOneGame = async (id) => {
    const { data } = await $host.get("api/game/" + id);
    return data;
};

export const getGamesCount = async () => {
    const response = await $host.get("api/game/count");
    return response.data;
};

export const searchGames = async (query) => {
    const { data } = await $host.get("api/game/search", { params: { query } });
    return data;
};
