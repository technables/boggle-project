import React from "react";
import Home from './components/pages/home/Home';
import Board from './components/pages/Board/board';
import ScoreBoard from './components/pages/ScoreBoard/index';

//const Home = React.lazy(() => import("./components/pages/home/Home"));

export const defaultRoute = [{
    path: "/",
    exact: true,
    name: "Home",
    component: Home
}];

export const internalRoutes =  [
    {
        path: '/board',
        exact:true,
        name: "board",
        component: Board
    },
    {
        path: '/scoreboard',
        exact:true,
        name: "scoreboard",
        component: ScoreBoard
    }
];
