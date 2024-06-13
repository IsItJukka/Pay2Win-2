import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import GameList from "../components/GameList";
import { fetchGame } from "../http/gameAPI";
import "../styles/App.css";

const Shop = observer(() => {
    const { game } = useContext(Context);

    useEffect(() => {
        fetchGame()
            .then((data) => {
                game.setGames(data);
            })
            .catch((error) => {
                console.error("Ошибка при получении игр:", error);
            });
    }, [game]);

    return (
        <div className="container">
            <div className="games-container">
                <GameList />
            </div>
        </div>
    );
});

export default Shop;
