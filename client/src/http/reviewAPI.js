import { $authHost, $host } from "./index";

export const createReview = async (review) => {
    const { data } = await $authHost.post("api/review", review);
    return data;
};

export const fetchReviewsBySellerId = async (sellerId) => {
    const { data } = await $host.get(`api/review/${sellerId}`);
    return data;
};

export const hasReview = async ({ good_id }) => {
    const { data } = await $host.get(`/api/review/hasReview`, {
        params: { good_id },
    });
    return data;
};
