import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home';
import BioDatas from '../pages/BioDatas/BioDatas';
import MainLayout from '../Layout/mainLayout';
import BioData from '../pages/BioData/BioData';
import { Signup } from '../pages/Signup/Signup';
import { Login } from '../pages/Login/Login';
import UserLayout from '../Layout/userLayout';
import EditBiodata from '../pages/EditBiodata/Editbiodata';
import DashBoard from '../pages/DashBoard/DashBoard';
import BioLikes from '../pages/BioLikes/BioLikes';
import MyReports from '../pages/MyReports/MyReports';
import MyPurchases from '../pages/MyPurchases/MyPurchases';
import BioRequests from '../pages/BioRequests/BioRequests';
import PaymentAndRefund from '../pages/PyamentAndRefund/PyamentAndRefund';
import SendForm from '../pages/SendForm/SendForm';
import AboutUs from '../pages/AboutUs/AboutUs';
import Reports from '../pages/Reports/Reports';
import Settings from '../pages/Settings/Settings';
import PrivacyPolicy from '../pages/PrivacyPolicy/PrivacyPolicy';
import TermsAndConditions from '../pages/TermsAndConditions/TermsAndConditions';
import Instructions from '../pages/Instructions/Instructions';
import BioQuestions from '../components/BioQuestions/BioQuestions';
import Payments from '../pages/Payments/Payments';
import RefundPolicy from '../pages/RefundPolicy/RefundPolicy';
import Faq from '../pages/Faq/Faq';
import ContactUs from '../pages/ContactUs/ContactUs';
import BioDisLikes from '../pages/BioDisLIkes/BioDisLikes';
import MyReactions from '../pages/MyReactions/MyReactions';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';
import AfterPay from '../pages/AfterPay/AfterPay';
import PayFail from '../pages/PayFail/PayFail';
import PaySuccess from '../pages/PaySuccess/PaySuccess';
import NotFound from '../pages/NotFound/NotFound';
import Refund from '../pages/Refund/Refund';
import RefundSuccess from '../pages/RefundSuccess/RefundSuccess';
import RefundFail from '../pages/RefundFail/RefundFail';
import PrivateRoute from './PrivateRoute';
import ErrorPage from '../components/ErrorBoundary/ErrorPage';
import Shortlist from '../pages/Shortlist/Shortlist';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/biodata/:id',
        element: <BioData />,
      },
      {
        path: '/biodatas',
        element: <BioDatas />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/send-form/:bio_user',
        element: <SendForm />,
      },
      {
        path: '/about-us',
        element: <AboutUs />,
      },
      {
        path: '/reports',
        element: <Reports />,
      },
      {
        path: '/send-form',
        element: (
          <PrivateRoute>
            <SendForm />
          </PrivateRoute>
        ),
      },
      {
        path: '/privacy-policy',
        element: <PrivacyPolicy />,
      },
      {
        path: '/terms-and-condition',
        element: <TermsAndConditions />,
      },
      {
        path: '/biodata-submit',
        element: <Instructions />,
      },
      {
        path: '/refund-policy',
        element: <RefundPolicy />,
      },
      {
        path: '/points-package',
        element: <Payments />,
      },
      {
        path: '/refund-policy',
        element: <RefundPolicy />,
      },
      {
        path: '/faq',
        element: <Faq />,
      },
      {
        path: '/contact-us',
        element: <ContactUs />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: '/pay',
        element: (
          <PrivateRoute>
            <AfterPay />
          </PrivateRoute>
        ),
      },
      {
        path: '/pay/fail',
        element: (
          <PrivateRoute>
            <PayFail />
          </PrivateRoute>
        ),
      },
      // {
      // 	path: "/admin/refund/:paymentId/:tnxId",
      // 	element: <Refund />,
      // },
      {
        path: '/admin/refund/',
        element: (
          <PrivateRoute>
            <Refund />
          </PrivateRoute>
        ),
      },
      {
        path: '/pay/success',
        element: (
          <PrivateRoute>
            <PaySuccess />
          </PrivateRoute>
        ),
      },
      {
        path: '/refund/success',
        element: (
          <PrivateRoute>
            <RefundSuccess />
          </PrivateRoute>
        ),
      },
      {
        path: '/refund/fail',
        element: (
          <PrivateRoute>
            <RefundFail />
          </PrivateRoute>
        ),
      },
      {
        path: '/user/account',
        element: <UserLayout />,
        children: [
          {
            path: '/user/account/edit-biodata',
            element: (
              <PrivateRoute>
                <EditBiodata />
              </PrivateRoute>
            ),
          },
          {
            path: '/user/account/preview-biodata/:id',
            element: (
              <PrivateRoute>
                <BioData />
              </PrivateRoute>
            ),
          },
          {
            path: '/user/account/dashboard',
            element: (
              <PrivateRoute>
                <DashBoard />
              </PrivateRoute>
            ),
          },
          {
            path: '/user/account/bio-questions',
            element: (
              <PrivateRoute>
                <BioQuestions />
              </PrivateRoute>
            ),
          },
          {
            path: '/user/account/dislikes',
            element: (
              <PrivateRoute>
                <BioDisLikes />
              </PrivateRoute>
            ),
          },
          {
            path: '/user/account/likes',
            element: (
              <PrivateRoute>
                <BioLikes />
              </PrivateRoute>
            ),
          },
          {
            path: '/user/account/shortlist',
            element: (
              <PrivateRoute>
                <Shortlist />
              </PrivateRoute>
            ),
          },
          {
            path: '/user/account/reactions',
            element: (
              <PrivateRoute>
                <MyReactions />
              </PrivateRoute>
            ),
          },
          {
            path: '/user/account/purchases',
            element: (
              <PrivateRoute>
                <MyPurchases />
              </PrivateRoute>
            ),
          },
          {
            path: '/user/account/bio-requests',
            element: (
              <PrivateRoute>
                <BioRequests />
              </PrivateRoute>
            ),
          },
          {
            path: '/user/account/payment-and-refund',
            element: (
              <PrivateRoute>
                <PaymentAndRefund />
              </PrivateRoute>
            ),
          },
          {
            path: '/user/account/myreports',
            element: (
              <PrivateRoute>
                <MyReports />
              </PrivateRoute>
            ),
          },
          {
            path: '/user/account/settings',
            element: <Settings />,
          },
        ],
      },
    ],
  },
  {
    path: '/error-page',
    element: <ErrorPage />,
  },

  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
