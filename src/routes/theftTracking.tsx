import type { RouteObject } from "react-router-dom";
import { ROUTES } from "./const";
import { lazy } from "react";
const  TheftTracking =lazy(()=> import("@pages/theftTracking"))
const IdentityVerification = lazy(()=> import("@pages/identityVerification"))
export const TheftTrackingRoutes:RouteObject = {
children:[
    {
        path: ROUTES.THEFT_TRACKING,
        element: <TheftTracking />,
    },
     {
        path: ROUTES.IDENTITY_VERIFICATION,
        element: <IdentityVerification />,
    },

]
}
