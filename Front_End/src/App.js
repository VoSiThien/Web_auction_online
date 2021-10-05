import { createTheme, ThemeProvider } from '@material-ui/core';
// import {  } from 'react';
// import 'react-toastify/dist/ReactToastify.css';
import { Route, Switch } from 'react-router-dom'; //Redirect
import { Suspense, useEffect } from 'react';
import { useDispatch, } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { langActions } from './reducers/lang';
import { authActions } from './reducers/auth';
import { ToastContainer } from 'react-toastify';
import { ProtectedRoute } from './components/Common/ProtectedRoute';
import { routes } from './config/routes';
import PageNotFound from './pages/404NotFound';
import Loading from './components/Loading/Loading';
import { CheckRole } from './components/Common/CheckRole';
import { mainColor } from './utils/colors';
//authentication route

const theme = createTheme({
  palette: {
    primary: {
      main: mainColor,
      contrastText: '#fff',
    },
  },
});

function App() {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  useEffect(() => {
    const existingLang = localStorage.getItem('lang');
    if (!existingLang || (existingLang !== 'vn' && existingLang !== 'en')) return;

    dispatch(langActions.updateLang(existingLang));

    i18n.changeLanguage(existingLang);
  }, [i18n, dispatch]);

  useEffect(() => {
    try {
      const userLocal = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));
      const accessToken = localStorage.getItem('accessToken');
      if (!userLocal || !accessToken) return;
      dispatch(
        authActions.loginVerified({
          user: userLocal,
          accessToken,
        })
      );
    } catch (err) { }
  }, [dispatch]);


  return (
    <ThemeProvider theme={theme}>
      <ToastContainer
        autoClose={5000}
        closeOnClick
        position="top-right"
      />
      <Suspense fallback={<Loading />}>
        <Switch>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                render={(props) => {
                  if (route.protected) {
                    return (
                      <ProtectedRoute {...props}>
                        <CheckRole roles={route.roles}>
                          <route.component {...route.props} />
                        </CheckRole>
                      </ProtectedRoute>
                    );
                  }
                  return (
                    <CheckRole roles={route.roles}>
                      <route.component {...props} {...route.props} />
                    </CheckRole>
                  );
                }}
              />
            );
          })}

          {/* <Route
            path="/admin"
            render={(props) => {
              return (
                <ProtectedRoute {...props} roles={['ADM']}>
                  <AdminTemplate>
                    <Switch>
                      {adminRoutes.map((route, index) => {
                        return (
                          <Route
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            render={(props) => {
                              return (
                                <CheckRole roles={route.roles}>
                                  <route.component {...props} {...route.props} />
                                </CheckRole>
                              );
                            }}
                          />
                        );
                      })}
                    </Switch>
                  </AdminTemplate>
                </ProtectedRoute>
              );
            }}
          /> */}

          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;