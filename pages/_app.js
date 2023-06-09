import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';


import { Analytics } from '@vercel/analytics/react';
 
import "bootstrap/dist/css/bootstrap.min.css";
import 'styles/globals.css';

import { userService } from 'services';
import { Nav, Alert } from 'components';


export default App;

function App({ Component, pageProps }) {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // on initial load - run auth check 
        authCheck(router.asPath);
        if (typeof window !== "undefined") {
            require("bootstrap/dist/js/bootstrap.bundle.min.js");
          }

        // on route change start - hide page content by setting authorized to false  
        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);

        // on route change complete - run auth check 
        router.events.on('routeChangeComplete', authCheck)

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }
    }, []);

    function authCheck(url) {
        // redirect to login page if accessing a private page and not logged in 
        setUser(userService.userValue);
        const publicPaths = ['/account/login', '/account/register'];
        const path = url.split('?')[0];
        if (!userService.userValue && !publicPaths.includes(path)) {
            setAuthorized(false);
            router.push({
                pathname: '/account/login',
                query: { returnUrl: router.asPath }
            });
        } else {
            setAuthorized(true);
        }
    }

    return (
        <>
            <Head>
                <title>Spa</title>
            </Head>

            <div className={`container-full ${user ? 'bg-light' : ''}`}>
                <Nav />
                <Alert />
                {authorized &&
                <>
                
                    <Component {...pageProps} />
                    <Analytics />
                
                </>
                }
            </div>
        </>
    );
}