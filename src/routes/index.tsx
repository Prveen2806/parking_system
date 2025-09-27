import ErrorBoundary from "@components/ErrorBoundary";
import MainLayout from "@layout/index";
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "@pages/dashboard";
import { CycleParkingRoute } from "./cycleParkingRoutes";
import { TheftTrackingRoutes } from "./theftTracking";
import { CarParkingRoute } from "./carParkingRoutes";
import { BikeParkingRoute } from "./bikeParkingRoutes";
import { MinibusParkingRoute } from "./minibusParkingRoutes";
import { CargoParkingRoute } from "./cargoParkingRoutes";
import { ValetManagementRoute } from "./valetManagementRoutes";
import { RegisterUsersRoute } from "./registerUsers";

export default createBrowserRouter([
    {
        element:<MainLayout/>,
        errorElement: <ErrorBoundary />,
        children:[
            {
                path: "/",
                element: <Dashboard/>,
            },
            {
                path:"dashboard",
                 element: <Dashboard/>,
            },
            CycleParkingRoute,
            CarParkingRoute,
            BikeParkingRoute,
            MinibusParkingRoute,
            CargoParkingRoute,
            TheftTrackingRoutes,
            ValetManagementRoute,
            RegisterUsersRoute
        ]
    }
]);