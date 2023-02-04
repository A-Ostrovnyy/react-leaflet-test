import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RadiusFilterPage from "../pages/RadiusFilterPage/RadiusFilterPage";
import MarkersWithToolTipPage from "../pages/MarkersWithToolTipPage/MarkersWithToolTipPage";
import CitiesMarkerPage from "../pages/CitiesMarkerPage/CitiesMarkerPage";
import SingleMarkerPage from "../pages/SingleMarkerPage/SingleMarkerPage";
import HomePage from "../pages/HomePage/HomePage";
import { RoutePaths } from "./constants";

const router = createBrowserRouter([
  {
    path: RoutePaths.RadiusFilter,
    element: <RadiusFilterPage />,
  },
  {
    path: RoutePaths.MarkersWithTooltip,
    element: <MarkersWithToolTipPage />,
  },
  {
    path: RoutePaths.CitiesMarkers,
    element: <CitiesMarkerPage />,
  },
  {
    path: RoutePaths.SingleMarker,
    element: <SingleMarkerPage />,
  },
  {
    path: RoutePaths.Root,
    element: <HomePage />,
  },
]);

export const PageRoutes = () => {
  return <RouterProvider router={router} />;
};
