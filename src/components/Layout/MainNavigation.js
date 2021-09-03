import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  let history = useHistory();
  const logout = () => {
    localStorage.removeItem('loggedInUser');
    history.push('/');
  }
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {/* <li>
            <Link to='/'>Login</Link>
          </li> */}
          <li>
            <Link to='/app/home'>Home</Link>
          </li>
          <li>
            <Link to='/app/profile'>Profile</Link>
          </li>
          <li>
            <Link to='/app/favourites'>Favourites</Link>
          </li>
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
