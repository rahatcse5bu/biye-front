/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import "./favorite.css";
import { Button } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { FaEye, FaTrash } from "react-icons/fa";
import { LikesServices } from "../../services/favorites";
import { getToken } from "../../utils/cookies";
import LoadingCircle from "../../components/LoadingCircle/LoadingCircle";
import { formatDate, getDateMonthYear } from "../../utils/date";
import { useNavigate } from "react-router-dom";
import { BioDataServices } from "../../services/bioData";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

const LikeItem = ({ item, index, favoriteByWho }) => {
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["bio-data", "stat", item?.bio_user],
    queryFn: async () => {
      return await BioDataServices.getBioDataStatistics(item?.bio_user);
    },
    retry: false,
    enabled: !!item?.bio_user,
  });
  const total =
    data?.results.approved + data?.results.pending + data?.results.rejected;

  // console.log("favorite-item", data);
  const viewButtonHandler = () => {
    navigate(`/biodata/${item.bio_id}`);
  };
  return (
    <tr className="border-b">
      <td className="px-4 py-2 text-center border-l w-1/9">{index + 1}</td>
      <td className="px-4 py-2 text-center border-l w-1/9">{item?.bio_id}</td>
      <td className="px-4 py-2 text-center border-l w-1/9">
        {formatDate(getDateMonthYear(item?.date_of_birth))}
      </td>
      <td className="px-4 py-2 text-center border-l w-1/9">
        {item?.permanent_address}
      </td>
      <td className="px-4 py-2 text-center border-l w-1/9">{total}</td>
      <td className="px-4 py-2 text-center border-l w-1/9">
        {data?.results.approvedPercentage}%
      </td>
      <td className="px-4 py-2 text-center border-l w-1/9">
        {data?.results.rejectedPercentage}%
      </td>
      <td className="px-4 py-2 text-center border-l w-1/9">
        {data?.results.pending}
      </td>
      <td className="px-4 py-2 text-center border-l w-1/9">
        <Button onClick={viewButtonHandler} color="green" className="mr-2">
          <FaEye size={12} />
        </Button>
      </td>
    </tr>
  );
};

const Favorite = () => {
  const { userInfo } = useContext(UserContext);
  const { data, isLoading } = useQuery({
    queryKey: ["my-likes", getToken().token],
    queryFn: async () => {
      return await LikesServices.getMyLikesList(getToken().token);
    },
    retry: false,
  });
  const { data: favoritesByWho, isLoading: favoritesByWhoLoading } = useQuery({
    queryKey: ["user-likes", userInfo?.data?._id],
    queryFn: async () => {
      return await LikesServices.getLikesListByUser(
        getToken().token,
        userInfo?.data?._id
      );
    },
    retry: false,
  });
  if (isLoading) {
    return <LoadingCircle />;
  }
  // console.log(userInfo);
  console.log("favorites-by-who~", favoritesByWho);

  // console.log("likes~", data);
  return (
    <div className="py-12 mx-auto ">
      <div className="">
        {/*<!-- End of Left Sidebar -->*/}
        <div className="col right-sidebar-main my-favs">
          <div className="w-auto border-t-2 rounded shadow my-favs-info">
            <h5 className="my-3 text-2xl text-center card-title">
              আমার পছন্দসমুহ
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
                    return <LikeItem item={item} index={index} key={index} />;
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
              আমার বায়োডাটা যারা পছন্দের তালিকায় রেখেছেঃ
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
                  {favoritesByWhoLoading ? (
                    <LoadingCircle />
                  ) : (
                    favoritesByWho?.data?.map((item, index) => {
                      return (
                        <LikeItem
                          favoriteByWho={true}
                          item={item}
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

export default Favorite;
