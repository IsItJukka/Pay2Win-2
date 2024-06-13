import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UserStore from "./store/UserStore";
import GoodStore from "./store/GoodStore";
import GameStore from "./store/GameStore";
import ReviewStore from "./store/ReviewStore";

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Context.Provider
        value={{
            user: new UserStore(),
            good: new GoodStore(),
            game: new GameStore(),
            review: new ReviewStore(),
        }}
    >
        <App />
    </Context.Provider>
);
