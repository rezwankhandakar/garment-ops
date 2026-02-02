import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import AddProduct from "../Pages/AddProduct";
import AllProducts from "../Pages/AllProducts";
import PrivateRoutes from "./PrivateRoutes";
import DashboardLayout from "../Layout/DashboardLayout";
import ProductDetails from "../Pages/ProductDetails";
import BookingPage from "../Pages/BookingPage";
import ManageUsers from "../Pages/ManageUsers";
export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                index: true,
                path: "/",
                Component: Home
            },
            {
                path: 'register',
                Component: Register
            },
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'add-product',
                Component: AddProduct
            },
            {
                path: 'all-products',
                Component: AllProducts
            },
            {
                path: "/products/:id",
                element: (
                    <PrivateRoutes>
                        <ProductDetails />
                    </PrivateRoutes>
                )
            },
            {
                path: "/booking/:id",
                element: (
                    <PrivateRoutes>
                        <BookingPage />
                    </PrivateRoutes>
                )
            }

        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes>,
        children: [
           {
            path: 'manage-users',
            Component: ManageUsers
           }
        ]
    },
    
])