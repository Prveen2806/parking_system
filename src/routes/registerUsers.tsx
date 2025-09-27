import type { RouteObject } from "react-router-dom";
import { ROUTES } from "./const";
import { lazy } from "react";
const RegisteredUsers = lazy(() => import("@pages/valetManagement/usermanagement"));
export const RegisterUsersRoute: RouteObject = {
    children: [
        {
            path: ROUTES.REGISTER_USER,
            element: <RegisteredUsers />,
        },
    ]
}
