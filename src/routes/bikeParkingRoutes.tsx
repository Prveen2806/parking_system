import type { RouteObject } from "react-router-dom";
import { ROUTES } from "./const";
import { lazy } from "react";

const BikeParking = lazy(() => import("@pages/bikeParking"));

export const BikeParkingRoute: RouteObject = {
  children: [
    {
      path: ROUTES.BIKEPARK,
      element: <BikeParking />
    },
  ]
};
