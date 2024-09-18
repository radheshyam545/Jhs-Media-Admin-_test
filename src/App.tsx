import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import Auth from './pages/SignIn/auth';
import SiteSetting from './pages/Setting/site_setting/siteSetting';
import Home from './pages/Home';
import About from './pages/AboutUs';
import Work from './pages/Work';
import Connect from './pages/connect';
import Media from './pages/media';
import ContactUS from './pages/ContactUS';
import Terms_conditions from './pages/Terms&Conditions';
import PrivacyPolicy from './pages/PrivacyPolicy';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const isAuthRoute = pathname.startsWith('/auth');

  return loading ? (
    <Loader />
  ) : (
    isAuthRoute ? (
      <Routes>
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Routes>
    ) : (
      <DefaultLayout>
        <Routes>
          <Route
            index
            element={
              <>
                <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <ECommerce />
              </>
            }
          />
          <Route
            path="/home"
            element={
              <>
                <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Home />
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <About />
              </>
            }
          />
          <Route
            path="/forms/form-elements"
            element={
              <>
                <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <FormElements />
              </>
            }
          />
          <Route
            path="/forms/form-layout"
            element={
              <>
                <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <FormLayout />
              </>
            }
          />
          <Route
            path="/work"
            element={
              <>
                <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Work />
              </>
            }
          />
          <Route
            path="/connect"
            element={
              <>
                <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Connect />
              </>
            }
          />
          <Route
            path="/chart"
            element={
              <>
                <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Chart />
              </>
            }
          />
          <Route
            path="/media"
            element={
              <>
                <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Media />
              </>
            }
          />
          <Route
            path="/contactus"
            element={
              <>
                <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <ContactUS />
              </>
            }
          />
          <Route
            path="/terms&conditions"
            element={
              <>
                <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Terms_conditions />
              </>
            }
          />
          <Route
            path="/privacypolicy"
            element={
              <>
                <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <PrivacyPolicy />
              </>
            }
          />
          <Route
            path="/ui/alerts"
            element={
              <>
                <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Alerts />
              </>
            }
          />
          <Route
            path="/ui/buttons"
            element={
              <>
                <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Buttons />
              </>
            }
          />
          <Route
            path="/site_setting"
            element={
              <>
                <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <SiteSetting />
              </>
            }
          />
          <Route path="*" element={<Navigate to="/auth/login" replace />} />
        </Routes>
      </DefaultLayout>
    )
  );
}

export default App;
