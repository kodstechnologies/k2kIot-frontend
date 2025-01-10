import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client'

// Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css';

// Tailwind css
import './tailwind.css';

// i18n (needs to be bundled)
import './i18n';

import { MantineProvider } from '@mantine/core';
// Router
import { RouterProvider } from 'react-router-dom';
import AppRouter from './router/index';

// Redux
import { Provider } from 'react-redux';
import store ,{persistor} from './store/index';

import { PersistGate } from 'redux-persist/integration/react'; // PersistGate

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
     <Suspense fallback={  <span className="animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-primary border-r-primary rounded-full w-14 h-14 inline-block align-middle m-auto mb-10"></span>}>
        <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{
                    colorScheme: 'light', 
                }}
            >
            <Provider store={store}>
                {/* <RouterProvider router={AppRouter} /> */}
                <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
                    <AppRouter />
                </PersistGate>

            </Provider>
            </MantineProvider>
        </Suspense>
    </React.StrictMode>
);

//WORKING POINTS ON THE FRONTEND:

//need to send the user data in all the pages. ~ done
//create the user page to show the permission part.
//create the crud operation

//bring all the icons from the centralize page. too much lines are getting consumed in the frontend

//remove all the static datas as soon as possible to make the codebase less in all the pages.

//should we send the user details through each api or send the with each response. will it help on reducing the api calls,
//as the admin changes the permission at any point, so the user check should happen everytime.
//create the  basic of all the module to show.
//send the otp to email post login or registation , notifications.
//user permission page
//flow of approval for the konkrete klinkers



