
import { Switch, Route } from 'react-router-dom';
import PublicLayout from "../Layout/PublicLayout";
import AuthForm from "../Auth/AuthForm";

const PublicRoutes = () => {
    return (
        <PublicLayout>
            <Switch>
                <Route exact path='/' component={AuthForm} />
                {/* <Route component={NotFound} /> */}
            </Switch>
        </PublicLayout>
    )
}

export default PublicRoutes;