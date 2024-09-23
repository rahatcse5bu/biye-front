/* eslint-disable react/prop-types */
import { Dialog, DialogBody } from '@material-tailwind/react';
import Textarea from '../Textarea/Textarea';
import { useState } from 'react';
import { BioChoiceDataServices } from '../../services/bioChoiceData';
import { getToken } from '../../utils/cookies';
import { Toast } from '../../utils/toast';
import { getErrorMessage } from '../../utils/error';
import LoadingCircle from '../LoadingCircle/LoadingCircle';
import { Colors } from '../../constants/colors';

export function FeedbackModal({
  title,
  open,
  setOpen,
  user,
  refetch,
  feedbackData,
  purchase,
}) {
  const [loading, setLoading] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [feedback, setFeedback] = useState('');
  const [edit, setEdit] = useState(false);
  // const { userInfo } = useContext(UserContext);
  // console.log("user", user);
  // console.log("userInfo~~", userInfo);

  // create feedback
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await BioChoiceDataServices.updateBioChoiceData(
        { user, feedback },
        getToken().token,
        'feedback'
      );
      if (response?.success === true) {
        Toast.successToast('আপনার ফিডব্যাক সেভ করা হয়েছে।');
        await refetch();
      }
    } catch (error) {
      const msg = getErrorMessage(error);
      Toast.errorToast(msg);
    } finally {
      setOpen(false);
      setLoading(false);
      setEdit(false);
    }
  };
  // console.log({ id });
  return (
    <>
      <Dialog size="lg" open={open} handler={handleOpen}>
        <h1 className="text-lg">{title}</h1>

        <DialogBody>
          {(feedbackData || purchase) && !edit ? (
            <div>
              {feedbackData ? (
                <p
                  style={{ color: Colors.siteGlobal }}
                  className="mb-5 text-xl font-semibold"
                >
                  {feedbackData}
                </p>
              ) : (
                purchase && (
                  <p className="mb-5 text-xl font-semibold text-red-500">
                    There is no feedback
                  </p>
                )
              )}

              <button
                onClick={handleOpen}
                className="px-4  text-white bg-green-800 rounded-md hover:bg-green-600"
              >
                Ok
              </button>
              {user && (
                <button
                  onClick={() => {
                    setEdit(true);
                    setFeedback(feedbackData);
                  }}
                  className="px-4  text-white bg-purple-600 rounded-md hover:bg-purple-800 ml-2"
                >
                  Edit
                </button>
              )}
            </div>
          ) : (
            <form action="" onSubmit={submitHandler}>
              <Textarea
                value={feedback}
                setValue={setFeedback}
                title="আপনি ফিডব্যাক দেন তার বায়োডাটা সম্পর্কে"
              />
              <div className="flex justify-between my-5">
                <button
                  onClick={handleOpen}
                  className="px-4 py-1 text-white bg-red-800 rounded-md hover:bg-red-600"
                >
                  Cancel
                </button>
                <button className="px-4 py-1 text-white bg-green-800 rounded-md hover:bg-green-600">
                  {loading ? <LoadingCircle /> : 'Add Feedback'}
                </button>
              </div>
            </form>
          )}
        </DialogBody>
      </Dialog>
    </>
  );
}

// <DialogFooter>
// 					<Button
// 						variant="text"
// 						color="red"
// 						onClick={handleOpen}
// 						className="mr-1"
// 					>
// 						<span>Cancel</span>
// 					</Button>
// 					<Button variant="gradient" color="green" onClick={handleOpen}>
// 						<span>Ok</span>
// 					</Button>
// 				</DialogFooter>
