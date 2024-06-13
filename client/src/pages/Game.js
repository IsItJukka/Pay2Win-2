import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FilterTable from "../components/FilterTable";
import { fetchGoodsByGameId } from "../http/goodAPI";

const Game = () => {
    const { gameId } = useParams();
    const [goods, setGoods] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [priceFrom, setPriceFrom] = useState("");
    const [priceTo, setPriceTo] = useState("");

    useEffect(() => {
        const loadGoods = async () => {
            try {
                const loadedGoods = await fetchGoodsByGameId(gameId);
                setGoods(loadedGoods);
            } catch (error) {
                console.error("Error loading goods:", error);
            }
        };
        loadGoods();
    }, [gameId]);

    const filteredGoods = goods.filter((product) => {
        const matchesDescription = product.good_name
            .toLowerCase()
            .includes(searchText.toLowerCase());
        const matchesPriceFrom =
            priceFrom === "" || product.good_price >= parseFloat(priceFrom);
        const matchesPriceTo =
            priceTo === "" || product.good_price <= parseFloat(priceTo);
        return matchesDescription && matchesPriceFrom && matchesPriceTo;
    });

    return (
        <FilterTable
            goods={filteredGoods}
            searchText={searchText}
            setSearchText={setSearchText}
            priceFrom={priceFrom}
            setPriceFrom={setPriceFrom}
            priceTo={priceTo}
            setPriceTo={setPriceTo}
        />
    );
};

export default Game;
