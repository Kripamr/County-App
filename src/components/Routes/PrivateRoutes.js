import { Switch, Route } from 'react-router-dom';
import ProtectedLayout from "../Layout/ProtectedLayout";
import ProfilePage from '../../pages/ProfilePage';
import HomePage from '../../pages/HomePage';
import StartingPage from '../../pages/StartingPage';
import FavouritePage from '../../pages/FavouritePage';

const PrivateRoutes = () => {
    return (
        <ProtectedLayout>
            <Switch>
                <Route path='/app' exact>
                    <StartingPage />
                </Route>
                <Route path='/app/home' exact>
                    <HomePage />
                </Route>
                <Route path='/app/profile'>
                    <ProfilePage />
                </Route>
                <Route path='/app/favourites'>
                    <FavouritePage />
                </Route>
            </Switch>
        </ProtectedLayout>
    )
}

export default PrivateRoutes;