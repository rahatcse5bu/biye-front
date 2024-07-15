import { useContext } from "react";
import BioContext from "../../contexts/BioContext";

const PersonalInfo = () => {
  const { bio } = useContext(BioContext);
  const personalInfo = bio?.personalInfo || null;
  const generalInfo = bio?.generalInfo || null;
  // console.log("personal-info~", personalInfo);

  return (
    <div className="w-auto border-t-2 rounded shadow single-bio-personal-info">
      <h5 className="my-3 text-2xl text-center card-title">ব্যক্তিগত তথ্য</h5>
      <table className="w-full table-auto">
        <tbody>
          {generalInfo?.gender === "মহিলা" ||
          generalInfo?.bio_type === "পাত্রীর বায়োডাটা" ? (
            <>
              <tr className="border-t border-b">
                <td className="w-1/2 px-4 py-2 text-left">
                  ঘরের বাহিরে সাধারণত কি ধরণের পোষাক পরেন?
                </td>
                <td className="w-1/2 px-4 py-2 text-left break--all border-l">
                  {personalInfo?.outside_clothings}
                </td>
              </tr>
              <tr className="border-b">
                <td className="w-1/2 px-4 py-2 text-left">
                  কবে থেকে নিকাব সহ পর্দা করছেন?
                </td>
                <td className="w-1/2 px-4 py-2 text-left break--all border-l">
                  {personalInfo?.porda_with_niqab_from}
                </td>
              </tr>
            </>
          ) : (
            <>
              <tr className="border-b">
                <td className="w-1/2 px-4 py-2 text-left">
                  সুন্নতি দাঁড়ি আছে (১ মুষ্টি)?
                </td>
                <td className="w-1/2 px-4 py-2 text-left border-l">
                  {personalInfo?.isBeard}
                </td>
              </tr>
              <tr className="border-b">
                <td className="w-1/2 px-4 py-2 text-left">
                  সুন্নতি দাঁড়ি কত বছর যাবত?
                </td>
                <td className="w-1/2 px-4 py-2 text-left border-l">
                  {personalInfo?.from_beard}
                </td>
              </tr>
              <tr className="border-b">
                <td className="w-1/2 px-4 py-2 text-left">
                  টাখনুর উপরে কাপড় পরেন?
                </td>
                <td className="w-1/2 px-4 py-2 text-left border-l">
                  {personalInfo?.isTakhnu}
                </td>
              </tr>

              <tr className="border-b">
                <td className="w-1/2 px-4 py-2 text-left">
                  প্রতিদিন পাঁচ ওয়াক্ত নামাজ জামায়াতে পড়েন কি?
                </td>
                <td className="w-1/2 px-4 py-2 text-left border-l">
                  {personalInfo?.isDailyFiveJamaat}
                </td>
              </tr>

              {/* <tr className="border-b">
								<td className="w-1/2 px-4 py-2 text-left">
									প্রতিদিন পাঁচ ওয়াক্ত কবে থেকে নিয়মিত জামায়াতে পড়ছেন?
								</td>
								<td className="w-1/2 px-4 py-2 text-left border-l">
									{personalInfo?.daily_five_jamaat_from}
								</td>
							</tr> */}
            </>
          )}
          {/* কবে থেকে পড়ছেন? */}
          <tr className="border-b">
            <td className="w-1/2 px-4 py-2 text-left">
              প্রতিদিন পাঁচ ওয়াক্ত নামাজ পড়েন কি?
            </td>
            <td className="w-1/2 px-4 py-2 text-left border-l">
              {personalInfo?.isDailyFive}
            </td>
          </tr>

          <tr className="border-b">
            <td className="w-1/2 px-4 py-2 text-left">
              সাধারণত সপ্তাহে কত ওয়াক্ত নামায আপনার কাযা হয়?
            </td>
            <td className="w-1/2 px-4 py-2 text-left border-l">
              {personalInfo?.qadha_weekly}
            </td>
          </tr>
          <tr className="border-b">
            <td className="w-1/2 px-4 py-2 text-left">
              মাহরাম/নন-মাহরাম(অনলাইন-অফলাইন) মেনে চলেন কি?
            </td>
            <td className="w-1/2 px-4 py-2 text-left break--all border-l">
              {personalInfo?.mahram_non_mahram}
            </td>
          </tr>
          <tr className="border-b">
            <td className="w-1/2 px-4 py-2 text-left">
              শুদ্ধভাবে কুরআন তিলওয়াত করতে পারেন?
            </td>
            <td className="w-1/2 px-4 py-2 text-left break--all border-l">
              {personalInfo?.quran_tilawat}
            </td>
          </tr>
          <tr className="border-b">
            <td className="w-1/2 px-4 py-2 text-left">কোন ফিকহ অনুসরণ করেন?</td>
            <td className="w-1/2 px-4 py-2 text-left break--all border-l">
              {personalInfo?.fiqh}
            </td>
          </tr>
          {personalInfo?.aqidah && (
            <tr className="border-b">
              <td className="w-1/2 px-4 py-2 text-left">
                কোন আকিদা অনুসরণ করেন?
              </td>
              <td className="w-1/2 px-4 py-2 text-left border-l">
                {" "}
                {personalInfo?.aqidah}
              </td>
            </tr>
          )}
          <tr className="border-b">
            <td className="w-1/2 px-4 py-2 text-left">
              নাটক / সিনেমা / সিরিয়াল / গান এসব দেখেন বা শুনেন?
            </td>
            <td className="w-1/2 px-4 py-2 text-left border-l">
              {personalInfo?.natok_cinema}
            </td>
          </tr>
          {personalInfo?.physical_problem && (
            <tr className="border-b">
              <td className="w-1/2 px-4 py-2 text-left">
                আপনার শারীরিক কোনো রোগ আছে?
              </td>
              <td className="w-1/2 px-4 py-2 text-left break--all border-l">
                {personalInfo?.physical_problem}
              </td>
            </tr>
          )}
          {personalInfo?.mental_problem && (
            <tr className="border-b">
              <td className="w-1/2 px-4 py-2 text-left">
                আপনার মানসিক কোনো রোগ আছে?{" "}
              </td>
              <td className="w-1/2 px-4 py-2 text-left border-l">
                {personalInfo?.mental_problem}
              </td>
            </tr>
          )}
          <tr className="border-b">
            <td className="w-1/2 px-4 py-2 text-left">
              দ্বীনের কোন বিশেষ মেহনতে যুক্ত আছেন?
            </td>
            <td className="w-1/2 px-4 py-2 text-left border-l">
              {personalInfo?.special_deeni_mehnot}
            </td>
          </tr>
          <tr className="border-b">
            <td className="w-1/2 px-4 py-2 text-left">
              মাজার সম্পর্কে আপনার ধারণা বা বিশ্বাস কি?
            </td>
            <td className="w-1/2 px-4 py-2 text-left break--all border-l">
              {personalInfo?.mazar}
            </td>
          </tr>
          <tr className="border-b">
            <td className="w-1/2 px-4 py-2 text-left">
              আপনার পছন্দের অন্তত ৩ টি ইসলামি বই এর নাম লিখুন
            </td>
            <td className="w-1/2 px-4 py-2 text-left break--all border-l">
              {personalInfo?.islamic_books}
            </td>
          </tr>
          <tr className="border-b">
            <td className="w-1/2 px-4 py-2 text-left">
              আপনার পছন্দের অন্তত ৩ জন আলেমের নাম লিখুন
            </td>
            <td className="w-1/2 px-4 py-2 text-left break--all border-l">
              {personalInfo?.islamic_scholars}
            </td>
          </tr>
          <tr className="border-b">
            <td className="w-1/2 px-4 py-2 text-left">
              কোনো নেশাদ্রব্য পান করেন?
            </td>
            <td className="w-1/2 px-4 py-2 text-left border-l">
              {personalInfo?.isNeshaDrobbo}
            </td>
          </tr>

          <tr className="border-b">
            <td className="w-1/2 px-4 py-2 text-left">
              মিলাদ ও কিয়াম সম্পর্কে আপনার ধারনা কি?
            </td>
            <td className="w-1/2 px-4 py-2 text-left break--all border-l">
              <p>{personalInfo?.about_milad_qiyam}</p>
            </td>
          </tr>
          <tr className="border-b">
            <td className="w-1/2 px-4 py-2 text-left">
              নিজের সম্পর্কে কিছু লিখুন
            </td>
            <td className="w-1/2 px-4 py-2 text-left break--all border-l">
              <p>{personalInfo?.about_me}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PersonalInfo;
