/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { FaEye } from "react-icons/fa";
import { DisLikesServices } from "../../services/unfavorites";
import { getToken } from "../../utils/cookies";
import LoadingCircle from "../../components/LoadingCircle/LoadingCircle";
import { formatDate, getDateMonthYear } from "../../utils/date";
import { useNavigate } from "react-router-dom";
import "./UnFavorite.css";
const DisLikeItem = ({ item, index, unFavoritesByWho }) => {
  const navigate = useNavigate();

  // console.log("favorite-item", data);
  const viewButtonHandler = () => {
    navigate(`/biodata/${unFavoritesByWho ? item?.user_id : item.bio_id}`);
  };
  return (
    <tr className="border-b">
      <td className="px-4 py-2 text-center border-l w-1/9">{index + 1}</td>
      <td className="px-4 py-2 text-center border-l w-1/9">
        {unFavoritesByWho ? item?.user_id : item?.bio_id}
      </td>
      <td className="px-4 py-2 text-center border-l w-1/9">
        {formatDate(getDateMonthYear(item?.date_of_birth))}
      </td>
      <td className="px-4 py-2 text-center border-l w-1/9">
        {item?.permanent_address}
      </td>
      <td className="px-4 py-2 text-center border-l w-1/9">
        {item?.total_count}
      </td>
      <td className="px-4 py-2 text-center border-l w-1/9">
        {(item?.approval_rate * 1).toFixed(2)}%
      </td>
      <td className="px-4 py-2 text-center border-l w-1/9">
        {(item?.rejection_rate * 1).toFixed(2)}%
      </td>
      <td className="px-4 py-2 text-center border-l w-1/9">
        {item?.total_pending}
      </td>
      <td className="px-4 py-2 text-center border-l w-1/9">
        <Button
          onClick={viewButtonHandler}
          color="green"
          size="xs"
          className="mr-2"
        >
          <FaEye size={12} />
        </Button>
      </td>
    </tr>
  );
};

const UnFavorite = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["dis-likes", "user", "all"],
    queryFn: async () => {
      return await DisLikesServices.getUserDisLikesList(getToken().token);
    },
    retry: false,
  });
  const { data: unFavoritesByWho, isLoading: unFavoritesByWhoLoading } =
    useQuery({
      queryKey: ["dis-likes-who"],
      queryFn: async () => {
        return await DisLikesServices.getUserDisLikesByWhoList(
          getToken().token
        );
      },
      retry: false,
    });
  if (isLoading) {
    return <LoadingCircle />;
  }
  // console.log("likes~", data);
  // console.log("dislikes-by-who~", unFavoritesByWho);
  return (
    <div className="py-12 mx-auto ">
      <div className="">
        {/*<!-- End of Left Sidebar -->*/}
        <div className="col right-sidebar-main my-favs">
          <div className="w-auto border-t-2 rounded shadow my-favs-info">
            <h5 className="my-3 text-2xl text-center card-title">
              আমার অপছন্দসমুহ
            </h5>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-t border-b">
                    <th className="px-4 py-2 text-center w-1/9">SL</th>
                    <th className="px-4 py-2 text-center w-1/9">বায়োডাটা নং</th>
                    <th className="px-4 py-2 text-center w-1/9">জন্ম তারিখ</th>
                    <th className="px-4 py-2 text-center w-1/9">ঠিকানা</th>
                    <th className="px-4 py-2 text-center w-1/9">
                      টোটাল পেয়েছে
                    </th>
                    <th className="px-4 py-2 text-center w-1/9">
                      অ্যাপ্রুভাল রেট
                    </th>
                    <th className="px-4 py-2 text-center w-1/9">রিজেকশন রেট</th>
                    <th className="px-4 py-2 text-center w-1/9">
                      পেইন্ডিং সংখ্যা
                    </th>
                    <th className="px-4 py-2 text-center w-1/9">অপশন</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data?.map((item, index) => {
                    return (
                      <DisLikeItem item={item} index={index} key={index} />
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="h-8"></div>
        <div className="col right-sidebar-main my-bio-favs">
          <div className="w-auto border-t-2 rounded shadow my-favs-info">
            <h5 className="mt-3 text-2xl text-center card-title">
              আমার বায়োডাটা যারা অপছন্দের তালিকায় রেখেছেঃ
            </h5>
            <h6 className="pb-4 text-xs">
              এটি প্রিমিয়াম ফিচার! এই তথ্য দেখতে হলে আপনাকে ৫০ পয়েন্ট খরচ করতে
              হবে!!!
            </h6>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-t border-b">
                    <th className="px-4 py-2 text-center w-1/9">SL</th>
                    <th className="px-4 py-2 text-center w-1/9">বায়োডাটা নং</th>
                    <th className="px-4 py-2 text-center w-1/9">জন্ম তারিখ</th>
                    <th className="px-4 py-2 text-center w-1/9">ঠিকানা</th>
                    <th className="px-4 py-2 text-center w-1/9">
                      টোটাল পেয়েছে
                    </th>
                    <th className="px-4 py-2 text-center w-1/9">
                      অ্যাপ্রুভাল রেট
                    </th>
                    <th className="px-4 py-2 text-center w-1/9">রিজেকশন রেট</th>
                    <th className="px-4 py-2 text-center w-1/9">
                      পেইন্ডিং সংখ্যা
                    </th>
                    <th className="px-4 py-2 text-center w-1/9">অপশন</th>
                  </tr>
                </thead>
                <tbody>
                  {unFavoritesByWhoLoading ? (
                    <LoadingCircle />
                  ) : (
                    unFavoritesByWho?.data?.map((item, index) => {
                      return (
                        <DisLikeItem
                          item={item}
                          unFavoritesByWho={true}
                          index={index}
                          key={index}
                        />
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnFavorite;
