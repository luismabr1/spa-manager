import { useState, useEffect } from 'react';

import { NavLink } from '.';
import { userService } from 'services';

export { Nav };

function Nav() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const subscription = userService.user.subscribe(x => setUser(x));
        return () => subscription.unsubscribe();
    }, []);

    // only show nav when logged in
    if (!user) return null;

    return (
        <nav className="navbar navbar-expand-xl navbar-dark bg-dark px-3">
            <a className="navbar-brand" href="#">Spa Manager</a>
  {/*           <button className="navbar-toggler" type="button" data-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button> */}
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle Navigation">

            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav mr-auto">

                                <NavLink href="/" exact className="nav-item nav-link">Home</NavLink>
                                <NavLink href="/users" className="nav-item nav-link">Users</NavLink>
                                <NavLink href="/clientes" className="nav-item nav-link">Clientes</NavLink>
                                <button onClick={userService.logout} className="nav-item nav-link btn btn-link">Logout</button>

                  </ul>
          </div>
        </nav>


    );
}