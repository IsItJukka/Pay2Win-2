import {
    ADMIN_ROUTE,
    GAME_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE,
    PROFILE_ROUTE,
    ADD_GOOD_ROUTE,
    OFFER_ROUTE,
    PURCHASE_ROUTE,
    SELLS_ROUTE,
    BALANCE_ROUTE,
} from "./utils/consts";
import Admin from "./pages/Admin";
import Shop from "./pages/Shop";
import Game from "./pages/Game";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import CreateGood from "./pages/CreateGood";
import Offer from "./pages/Offer";
import PurchaseTable from "./pages/PurchaseTable";
import SellsTable from "./pages/SellsTable";
import Balance from "./pages/Balance";
import { Component } from "react";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin,
        roles: [2, 3],
    },
    {
        path: ADD_GOOD_ROUTE,
        Component: CreateGood,
        roles: [1, 2, 3],
    },
    {
        path: PURCHASE_ROUTE,
        Component: PurchaseTable,
        roles: [1, 2, 3],
    },
    {
        path: SELLS_ROUTE,
        Component: SellsTable,
        roles: [1, 2, 3],
    },
    {
        path: BALANCE_ROUTE,
        Component: Balance,
        roles: [1, 2, 3],
    },
];

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop,
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth,
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth,
    },
    {
        path: PROFILE_ROUTE + "/:id",
        Component: Profile,
    },
    {
        path: GAME_ROUTE + "/:gameId",
        Component: Game,
    },
    {
        path: OFFER_ROUTE + "/:goodId",
        Component: Offer,
    },
];
