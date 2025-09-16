import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import RegisterPage from './pages/register.jsx';
import UserPage from './pages/user.jsx';
import HomePage from './pages/home.jsx';
import LoginPage from './pages/login.jsx';
import { AuthProvider } from './components/context/auth.context.jsx';
import AllProducts from './pages/AllProducts.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import { store } from './util/store';
import { Provider } from 'react-redux';



const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "/user",
                element: <UserPage />
            },
            {
                path: "/products",
                element: <AllProducts />
            },
            {
                path: "/products/:id",
                element: <ProductDetail />
            }
        ]
    },
    {
        path: "/register",
        element: <RegisterPage />
    },

    {
        path: "/login",
        element: <LoginPage />
    },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </Provider>
    </React.StrictMode>,
)