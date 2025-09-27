import type { RouteObject } from "react-router-dom";
import { ROUTES } from "./const";
import { lazy } from "react";
const  CycleParking =lazy(()=> import("@pages/cycleParking"))
export const CycleParkingRoute:RouteObject = {
children:[
    {
        path:ROUTES.CYCLEPARK,
        element:<CycleParking />
    },
]
}
