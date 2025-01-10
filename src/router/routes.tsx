import { lazy } from 'react';
const Index = lazy(() => import('../pages/Index'));
const Error = lazy(() => import('../components/Error'));

const routes = [
    // {
    //     path: '/',
    //     element: <Index />,
    //     layout: 'default',
    // },
    {
        path: '*',
        element: <Error />,
        layout: 'blank',
    },
];

export { routes };
