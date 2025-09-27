import type { RouteObject } from "react-router-dom";
import { ROUTES } from "./const";
import { lazy } from "react";

const MinibusParking = lazy(() => import("@pages/minibusParking"));

export const MinibusParkingRoute: RouteObject = {
  children: [
    {
      path: ROUTES.MINIBUSPARK,
      element: <MinibusParking />
    },
  ]
};
