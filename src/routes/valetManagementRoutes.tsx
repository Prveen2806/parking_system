import type { RouteObject } from "react-router-dom";
import { ROUTES } from "./const";
import { lazy } from "react";
const ValetManagement = lazy(() => import("@pages/valetManagement"));
const VerificationPage = lazy(() => import("@pages/valetManagement/usermanagement/VerificationPage"));
export const ValetManagementRoute: RouteObject = {
    children: [
        {
            path: ROUTES.VALETMANAGEMENT,
            element: <ValetManagement />,
        },
        {
            path: ROUTES.VERIFY_USER,
            element: <VerificationPage />,
        }
    ]
}
