import { SITE_URL } from '@/lib/seo';
import Swal from 'sweetalert2';
import axiosInstance from '../utils/axios';
import { Toast } from '../utils/toast';

// TODO: resolves true while redirecting to bKash, false (after an error toast) if it couldn't start.
export default async function BkashCreatePaymentAPICall(
  amount,
  bio_user = '',
  purpose = 'buy_package',
  pathname = '/',
  { overlay = false } = {}
) {
  let url = `${SITE_URL}/pay${
    bio_user
      ? `?bio_user=${bio_user}&purpose=${purpose}&pathname=${pathname}`
      : `?purpose=${purpose}&pathname=${pathname}`
  }`;

  // TODO: overlay is for flows with no button left on screen to show a spinner.
  if (overlay) {
    Swal.fire({
      title: 'বিকাশ পেমেন্ট পেজে নেওয়া হচ্ছে...',
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => Swal.showLoading(),
    });
  }

  try {
    const response = await axiosInstance.post('/bkash/create', {
      amount: amount,
      callbackURL: url,
    });
    if (response?.data?.bkashURL) {
      // TODO: Back from bKash can restore this page from cache with the overlay still open.
      if (overlay) {
        window.addEventListener('pageshow', (event) => event.persisted && Swal.close(), { once: true });
      }
      window.location.href = response.data.bkashURL;
      return true;
    }
  } catch (error) {
    console.log('An error occurred:', error);
  }

  if (overlay) Swal.close();
  Toast.errorToast('বিকাশ পেমেন্ট শুরু করা যায়নি। আবার চেষ্টা করুন।');
  return false;
}
export function BkashExecutePaymentAPICall(paymentID) {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post('/bkash/execute', {
        paymentID: paymentID,
      })
      .then((response) => {
        // console.log('Data was successfully sent.', response.data);
        resolve(response.data); // Resolve the promise with the response data
      })
      .catch((error) => {
        console.log('An error occurred:', error);
        reject(error); // Reject the promise with the error
      });
  });
}

export const BkashCallAfterPay = async (data) => {
  const response = await axiosInstance.post('/bkash/after-pay', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export function BkashQueryPaymentAPICall(paymentID) {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post('/bkash/query', {
        paymentID: paymentID,
      })
      .then((response) => {
        //console.log('Data was successfully sent.', response.data);
        resolve(response.data); // Resolve the promise with the response data
      })
      .catch((error) => {
        console.log('An error occurred:', error);
        reject(error); // Reject the promise with the error
      });
  });
}

export function BkashRefundPaymentAPICall(paymentID, trxID, amount) {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post('/bkash/refund', {
        paymentID: paymentID,
        trxID: trxID,
        amount: amount,
        sku: 'test',
        reason: 'test',
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log('An error occurred:', error);
        reject(error);
      });
  });
}
