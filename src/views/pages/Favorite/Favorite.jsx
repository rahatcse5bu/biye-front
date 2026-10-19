/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import "./favorite.css";
import { Button } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { FaEye, FaTrash } from "react-icons/fa";
import { LikesServices } from "../../../services/favorites";
import { getToken } from "../../../utils/cookies";
import LoadingCircle from "../../../components/LoadingCircle/LoadingCircle";
import { formatDate, getDateMonthYear } from "../../../utils/date";
import { useNavigate } from "@/lib/navigation";
import { BioDataServices } from "../../../services/bioData";
import { useContext, useEffect } from "react";
import Swal from "sweetalert2";
import UserContext from "../../../contexts/UserContext";
import { convertToBengaliDigits as toBn } from "../../../utils/language";
import { Toast } from "../../../utils/toast";

const LikeItem = ({ item, index, favoriteByWho }) => {
  const navigate = useNavigate();

  // for token expire
  const { logOut } = useContext(UserContext);
  if (!getToken()?.token) {
    logOut();
    navigate("/");
  }
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
  const navigate = useNavigate();
  const { userInfo, setUserInfo, setUser } = useContext(UserContext);
  const { data, isLoading } = useQuery({
    queryKey: ["my-likes", getToken()?.token],
    queryFn: async () => {
      return await LikesServices.getMyLikesList(getToken()?.token);
    },
    retry: false,
  });
  const {
    data: favoritesByWho,
    isLoading: favoritesByWhoLoading,
    refetch: refetchFavoritesByWho,
  } = useQuery({
    queryKey: ["user-likes", userInfo?.data?._id],
    queryFn: async () => {
      return await LikesServices.getLikesListByUser(
        getToken()?.token,
        userInfo?.data?._id
      );
    },
    retry: false,
  });
  // TODO: put the new balance into shared state so every points display updates without a refetch.
  const applyBalance = (balance) => {
    const points = Number(balance);
    if (!Number.isFinite(points)) return;
    setUserInfo((current) =>
      current?.data ? { ...current, data: { ...current.data, points } } : current
    );
    setUser((current) => (current ? { ...current, points } : current));
  };

  const price = favoritesByWho?.price ?? 50;
  const unlockLikers = async () => {
    const balance = Number(userInfo?.data?.points) || 0;
    if (balance < price) {
      const { isConfirmed } = await Swal.fire({
        title: "পর্যাপ্ত পয়েন্ট নেই",
        html: `এই তালিকা দেখতে <b>${toBn(price)} পয়েন্ট</b> প্রয়োজন। আপনার আছে <b>${toBn(balance)} পয়েন্ট</b>।`,
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "পয়েন্ট কিনুন",
        cancelButtonText: "বাতিল",
        confirmButtonColor: "#0D7377",
      });
      if (isConfirmed) navigate("/points-package");
      return;
    }
    const result = await Swal.fire({
      title: "তালিকা আনলক করবেন?",
      html: `কারা আপনার বায়োডাটা পছন্দের তালিকায় রেখেছেন তা দেখতে <b>${toBn(price)} পয়েন্ট</b> খরচ হবে। একবার আনলক করলে তালিকাটি সবসময় দেখতে পারবেন।`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: `${toBn(price)} পয়েন্ট দিয়ে দেখুন`,
      cancelButtonText: "বাতিল",
      confirmButtonColor: "#0D7377",
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
      preConfirm: async () => {
        try {
          return await LikesServices.unlockLikers();
        } catch (error) {
          Swal.showValidationMessage(error?.response?.data?.message || "আনলক করা যায়নি");
          return false;
        }
      },
    });
    if (!result.isConfirmed || !result.value?.success) return;
    applyBalance(result.value.points_balance);
    Toast.successToast("তালিকা আনলক হয়েছে");
    refetchFavoritesByWho();
  };

  // TODO: the dashboard links to #liked-by, which only exists once the page has loaded.
  useEffect(() => {
    if (isLoading || window.location.hash !== "#liked-by") return;
    document.getElementById("liked-by")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [isLoading]);

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
        <div id="liked-by" className="col right-sidebar-main my-bio-favs scroll-mt-24">
          <div className="w-auto border-t-2 rounded shadow my-favs-info">
            <h5 className="mt-3 text-2xl text-center card-title">
              আমার বায়োডাটা যারা পছন্দের তালিকায় রেখেছেঃ
            </h5>
            {favoritesByWho?.locked ? (
              <div className="flex flex-col items-center gap-3 px-4 pb-8 pt-2 text-center">
                <p className="text-gray-700">
                  <b>{toBn(favoritesByWho.count || 0)} জন</b> আপনার বায়োডাটা পছন্দের
                  তালিকায় রেখেছেন।
                </p>
                <p className="text-sm text-gray-500">
                  তারা কারা দেখতে একবার {toBn(price)} পয়েন্ট খরচ করুন — এরপর তালিকাটি
                  সবসময় দেখতে পারবেন।
                </p>
                <button
                  type="button"
                  onClick={unlockLikers}
                  disabled={!favoritesByWho.count}
                  className="rounded-full bg-[#0D7377] px-5 py-2 font-semibold text-white hover:bg-[#0F8287] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0D7377]/40 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  তালিকা দেখুন ({toBn(price)} পয়েন্ট)
                </button>
                {!favoritesByWho.count && (
                  <p className="text-xs text-gray-400">
                    এখনো কেউ আপনার বায়োডাটা পছন্দের তালিকায় রাখেননি।
                  </p>
                )}
              </div>
            ) : (
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
                    <tr>
                      <td colSpan={9} className="py-4">
                        <LoadingCircle />
                      </td>
                    </tr>
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
              {!favoritesByWhoLoading && !favoritesByWho?.data?.length && (
                <p className="py-6 text-center text-sm text-gray-500">
                  এখনো কেউ আপনার বায়োডাটা পছন্দের তালিকায় রাখেননি।
                </p>
              )}
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favorite;
