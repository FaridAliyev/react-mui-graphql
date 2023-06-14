import { lazy, Suspense } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import browserHistory from 'utils/browser-utils';

const AppLayout = lazy(() => import('views/layout/app'));

const Routes: React.FC = () => {
    return (
        <Router history={browserHistory}>
            <Suspense fallback={<></>}>
                <Switch>
                    <Route path="/" component={AppLayout} />
                </Switch>
            </Suspense>
        </Router>
    );
};

export default Routes;
