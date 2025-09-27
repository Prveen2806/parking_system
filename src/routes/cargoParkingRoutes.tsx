import type { RouteObject } from "react-router-dom";
import { ROUTES } from "./const";
import { lazy } from "react";

const CargoParking = lazy(() => import("@pages/cargoParking"));

export const CargoParkingRoute: RouteObject = {
  children: [
    {
      path: ROUTES.CARGOPARK,
      element: <CargoParking />
    },
  ]
};
