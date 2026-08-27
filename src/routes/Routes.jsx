import { createBrowserRouter } from '@/lib/navigation';
import Home from '../views/pages/Home/Home';
import BioDatas from '../views/pages/BioDatas/BioDatas';
import MainLayout from '../Layout/mainLayout';
import BioData from '../views/pages/BioData/BioData';
import { Signup } from '../views/Signup/Signup';
import { Login } from '../views/Login/Login';
import UserLayout from '../Layout/userLayout';
import EditBiodata from '../views/pages/EditBiodata/Editbiodata';
import DashBoard from '../views/pages/DashBoard/DashBoard';
import BioLikes from '../views/pages/BioLikes/BioLikes';
import MyReports from '../views/pages/MyReports/MyReports';
import MyPurchases from '../views/pages/MyPurchases/MyPurchases';
import BioRequests from '../views/pages/BioRequests/BioRequests';
import PaymentAndRefund from '../views/pages/PyamentAndRefund/PyamentAndRefund';
import SendForm from '../views/pages/SendForm/SendForm';
import AboutUs from '../views/pages/AboutUs/AboutUs';
import Reports from '../views/pages/Reports/Reports';
import Settings from '../views/pages/Settings/Settings';
import PrivacyPolicy from '../views/pages/PrivacyPolicy/PrivacyPolicy';
import TermsAndConditions from '../views/pages/TermsAndConditions/TermsAndConditions';
import Instructions from '../views/pages/Instructions/Instructions';
import BioQuestions from '../components/BioQuestions/BioQuestions';
import Payments from '../views/Payments/Payments';
import RefundPolicy from '../views/pages/RefundPolicy/RefundPolicy';
import Faq from '../views/pages/Faq/Faq';
import ContactUs from '../views/pages/ContactUs/ContactUs';
import BioDisLikes from '../views/pages/BioDisLIkes/BioDisLikes';
import MyReactions from '../views/pages/MyReactions/MyReactions';
import ForgotPassword from '../views/pages/ForgotPassword/ForgotPassword';
import AfterPay from '../views/pages/AfterPay/AfterPay';
import PayFail from '../views/pages/PayFail/PayFail';
import PaySuccess from '../views/pages/PaySuccess/PaySuccess';
import NotFound from '../views/pages/NotFound/NotFound';
import Refund from '../views/pages/Refund/Refund';
import RefundSuccess from '../views/pages/RefundSuccess/RefundSuccess';
import RefundFail from '../views/pages/RefundFail/RefundFail';
import PrivateRoute from './PrivateRoute';
import ErrorPage from '../components/ErrorBoundary/ErrorPage';
import Shortlist from '../views/pages/Shortlist/Shortlist';
import UnverifiedBioData from '../views/pages/UnverifiedBioData/UnverifiedBioData';

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
        path: '/biodata/unverified/:id',
        element: <UnverifiedBioData />,
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
