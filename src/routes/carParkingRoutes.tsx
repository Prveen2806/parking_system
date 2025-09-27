import type { RouteObject } from "react-router-dom";
import { ROUTES } from "./const";
import { lazy } from "react";
const  CarParking =lazy(()=> import("@pages/carParking"))
export const CarParkingRoute:RouteObject = {
children:[
    {
        path:ROUTES.CARPARK,
        element:<CarParking />
    },
]
}
