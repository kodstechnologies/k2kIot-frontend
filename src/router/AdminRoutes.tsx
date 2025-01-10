import { lazy } from 'react';
const Error = lazy(() => import('../components/Error'));
const Dashboard = lazy(() => import('../pages/Index'));
const NewDashboard = lazy(() => import('../pages/OverallDashboard'));

// const NewDashboard = lazy(() => import('../pages/OverallDashboard'));

const Faq = lazy(() => import('../pages/Faq'));
const Notification = lazy(() => import('@/pages/Apps/Notifications'));

import {
    QCCheckView,
    QCCheckCreate,
    WorkOrderView,
    WorkOrderCreate,
    WorkOrderDetail,
    ProductionPlanningView,
    ProductionPlanningCreate,
    JobOrderView,
    JobOrderCreate,
    ProductView,
    ProductCreate,
    PackingView,
    PackingCreate,
    DispatchView,
    DispatchCreate,
    DipatchInvoiceView,
    HelperClients,
    HelperClientCreate,
    HelperProjects,
    HelperProjectCreate,
    HelperPlants,
    HelperPlantCreate,
    HelperFactories,
    HelperFactoryCreate,
    HelperMachines,
    HelperMachineCreate,
    Helper1,
    Helper2
} from '../pages/Apps/Konkrete-Klinkers';

// User-specific components
const Users = lazy(() => import('@/pages/Apps/Users'));

const UsersProfile = lazy(() => import('@/pages/Apps/Users/Profile'));
const UsersAccountSettings = lazy(() => import('@/pages/Apps/Users/AccountSetting'));

const adminRoutes = [
    {
        path: '/',
        element: <Dashboard />,
        layout: 'admin',
    },
    {
        path: '/overallDashboard',
        element: <NewDashboard />,
        layout: 'admin',
    },
    {
        path: '/faq',
        element: <Faq />,
        layout: 'admin',
    },
    {
        path: '/notification',
        element: <Notification />,
        layout: 'admin',
    },
    // Work Order
    {
        path: '/konkrete-klinkers/work-order/view',
        element: <WorkOrderView />,
        layout: 'admin',
    },
    {
        path: '/konkrete-klinkers/work-order/create',
        element: <WorkOrderCreate />,
        layout: 'admin',
    },
    {
        path: '/konkrete-klinkers/work-order/detail',
        element: <WorkOrderDetail/>,
        layout: 'admin',
    },
    // Job Order
    {
        path: '/konkrete-klinkers/job-order/view',
        element: <JobOrderView />,
        layout: 'admin',
    },
    {
        path: '/konkrete-klinkers/job-order/create',
        element: <JobOrderCreate />,
        layout: 'admin',
    },
    // Daily Production Report
    {
        path: '/konkrete-klinkers/production-planning/view',
        element: <ProductionPlanningView />,
        layout: 'admin',
    },
    {
        path: '/konkrete-klinkers/production-planning/create',
        element: <ProductionPlanningCreate />,
        layout: 'admin',
    },
    // QC Check
    {
        path: '/konkrete-klinkers/qc-check/view',
        element: <QCCheckView />,
        layout: 'admin',
    },
    {
        path: '/konkrete-klinkers/qc-check/create',
        element: <QCCheckCreate />,
        layout: 'admin',
    },
      // Product
      {
        path: '/konkrete-klinkers/product',
        element: <ProductView />,
        layout: 'admin',
    },
    {
        path: '/konkrete-klinkers/product/create',
        element: <ProductCreate />,
        layout: 'admin',
    },
    // Packing
    {
        path: '/konkrete-klinkers/packing/view',
        element: <PackingView />,
        layout: 'admin',
    },
    {
        path: '/konkrete-klinkers/packing/create',
        element: <PackingCreate />,
        layout: 'admin',
    },
    // Dispatch
    {
        path: '/konkrete-klinkers/dispatch/view',
        element: <DispatchView />,
        layout: 'admin',
    },
    {
        path: '/konkrete-klinkers/dispatch/create',
        element: <DispatchCreate />,
        layout: 'admin',
    },
    {
        path: '/konkrete-klinkers/dispatch/invoice/view',
        element: <DipatchInvoiceView />,
        layout: 'admin',
    },

    //HELPERS CLIENTS
    // clients

    {
        path: '/clients',
        element: <HelperClients />,
        layout: 'admin',
    },
    {
        path: '/clients/create',
        element: <HelperClientCreate />,
        layout: 'admin',
    },
    {
        path: '/cients/edit/:id',
        element: <HelperClientCreate />,
        layout: 'admin',
    },

    // projects

    {
        path: '/projects',
        element: <HelperProjects />,
        layout: 'admin',
    },
    {
        path: '/projects/create',
        element: <HelperProjectCreate />,
        layout: 'admin',
    },
    {
        path: '/projects/edit/:id',
        element: <HelperProjectCreate />,
        layout: 'admin',
    },
    // projects

    {
        path: '/plants',
        element: <HelperPlants />,
        layout: 'admin',
    },
    {
        path: '/plants/create',
        element: <HelperPlantCreate />,
        layout: 'admin',
    },
    {
        path: '/plants/edit/:id',
        element: <HelperPlantCreate />,
        layout: 'admin',
    },

    // 
    {
        path: '/factories',
        element: <HelperFactories />,
        layout: 'admin',
    },
    {
        path: '/factory/create',
        element: <HelperFactoryCreate />,
        layout: 'admin',
    },
    {
        path: '/factories/edit/:id',
        element: <HelperFactoryCreate />,
        layout: 'admin',
    },

    // projects

    {
        path: '/machines',
        element: <HelperMachines />,
        layout: 'admin',
    },
    {
        path: '/machines/create',
        element: <HelperMachineCreate />,
        layout: 'admin',
    },
    {
        path: '/machines/edit/:id',
        element: <HelperMachineCreate />,
        layout: 'admin',
    },

    // User Routes
    {
        path: '/users',
        element: <Users />,
        layout: 'default',
    },
    {
        path: '/users/profile',
        element: <UsersProfile />,
        layout: 'default',
    },
    {
        path: '/users/edit',
        element: <UsersAccountSettings />,
        layout: 'default',
    },
    // Catch-all
    {
        path: '*',
        element: <Error />,
        layout: 'blank',
    },
];

export default adminRoutes;
