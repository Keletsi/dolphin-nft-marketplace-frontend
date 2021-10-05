import { Switch, BrowserRouter as Router } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { routes } from './router';
import { useAppSelector } from './hooks/reduxHooks';
import RouteFromPath from './router/RouteFromPath';
import useTranslation from './hooks/useTranslation';
import { CssBaseline } from '@material-ui/core';

export const App = () => {
  const { isAuthenticated } = useAppSelector(state => state.user);
  const t = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('global.pageTitle')}</title>
      </Helmet>

      <Router>
        <Switch>
          {routes.map(route => (
            <RouteFromPath key={`route-${route.path}`} authenticated={isAuthenticated} {...route} />
          ))}
        </Switch>
        <CssBaseline />
      </Router>
    </>
  );
};
