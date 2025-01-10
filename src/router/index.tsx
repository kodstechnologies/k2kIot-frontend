import React from 'react';
import { useSelector } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import BlankLayout from '../components/Layouts/BlankLayout';
import DefaultLayout from '../components/Layouts/DefaultLayout';

import { routes } from './routes';
import adminRoutes from './AdminRoutes';
import guestRoutes from './GuestRoutes';
import { selectIsAuthenticated, selectUserType } from '../store/auth/AuthSlice';

// Function to wrap routes with layouts dynamically
const getRoutesWithLayout = (routes: any) => {
    return routes.map((route: any) => {
        let LayoutComponent;

        switch (route.layout) {
            case 'blank':
                LayoutComponent = BlankLayout;
                break;
            // Uncomment and customize if additional layouts are required
            // case 'admin':
            //     LayoutComponent = AdminLayout;
            //     break;
            default:
                LayoutComponent = DefaultLayout;
                break;
        }

        return {
            ...route,
            element: <LayoutComponent>{route.element}</LayoutComponent>,
        };
    });
};

const AppRouter: React.FC = () => {
    // Fetch values from Redux state
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const userType = useSelector(selectUserType);
    const user = useSelector((state: any) => state.auth.user); // Fetch user object directly

    // Debug: Log the user and other states
    console.log("Is Authenticated:", isAuthenticated);
    console.log("User Type:", user.userType);
    console.log("User Object:", user);

    let combinedRoutes;

    if (!isAuthenticated) {
        // Guest routes for unauthenticated users
        combinedRoutes = getRoutesWithLayout([...routes, ...guestRoutes]);
    } else {
        // Authenticated routes based on user type
        switch (user.userType) {
            case 'Admin':
                combinedRoutes = getRoutesWithLayout([...routes, ...adminRoutes]);
                break;
            default:
                combinedRoutes = getRoutesWithLayout([...routes]);
                break;
        }
    }

    // Create the router instance dynamically
    const router = createBrowserRouter(combinedRoutes);

    return (
        <>
            {/* Debug display: Remove in production */}
            {/* <div>
                <h4>Current User: {user?.fullName || 'Guest User'}</h4>
                <p>Email: {user?.email || 'Not Available'}</p>
            </div> */}
            <RouterProvider router={router} />
        </>
    );
};

export default AppRouter;
