import { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

const HomePage = lazy(() => import('views/home'));

const AppRouter: React.FC = () => {
    return (
        <Switch>
            <Route exact path="/" component={HomePage} />
        </Switch>
    );
};
export default AppRouter;
