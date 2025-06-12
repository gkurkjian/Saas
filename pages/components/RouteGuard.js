import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated } from '../lib/authenticateUser'; // custom auth checker (returns true if token exists and valid)

const PUBLIC_PATHS = ['/login', '/', '/_error', '/404']; // pages that don't require authentication

export default function RouteGuard(props) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false); // tracks if user is authorized to view current page

    useEffect(() => {
        // on initial page load - run authentication check
        authCheck(router.pathname);

        // on every route change - run authentication check
        router.events.on('routeChangeComplete', authCheck);

        // cleanup the event listener on unmount
        return () => {
            router.events.off('routeChangeComplete', authCheck);
        };
    }, []);

    function authCheck(url) {
        // remove any query parameters (like "?id=123")
        // we only care about the main path (like "/vehicles") for authentication
        const path = url.split('?')[0];

        // if the user is not authenticated and tries to access a protected route
        if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
            setAuthorized(false); // hide the page content
            router.push("/"); // redirect to home page
        } else {
            setAuthorized(true); // allow access and render page content
        }
    }

    return (
      <>
        {/* only render children if user is authorized */}
        {authorized && props.children}
      </>
    )
}
