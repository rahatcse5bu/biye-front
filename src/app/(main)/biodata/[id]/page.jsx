import { cache } from "react";
import { notFound } from "next/navigation";
import BioData from "@/views/pages/BioData/BioData";
import { Link } from "@/lib/navigation";
import { createPageMetadata } from "@/lib/seo";

const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api/v1"
    : "https://biye-backend.vercel.app/api/v1";

const getBiodata = cache(async (id) => {
  if (!/^\d+$/.test(id)) return null;

  const response = await fetch(`${API_BASE_URL}/bio-data/${id}`, {
    next: { revalidate: 300 },
  });

  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`Unable to load biodata ${id}`);
  }

  const payload = await response.json();
  if (!payload?.success || !payload?.data?.generalInfo) return null;

  return {
    ...payload,
    is_unverified: false,
  };
});

export async function generateMetadata({ params }) {
  const { id } = await params;
  const biodata = await getBiodata(id);

  if (!biodata) {
    return {
      title: "বায়োডাটা পাওয়া যায়নি",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const generalInfo = biodata.data.generalInfo;
  const address = biodata.data.address;
  const biodataType = generalInfo.bio_type || "ম্যাট্রিমনি বায়োডাটা";
  const location = address?.zilla || address?.division;
  const title = `${biodataType} BID-${id}`;
  const description = [
    `BID-${id} নম্বর ${biodataType} দেখুন।`,
    generalInfo.marital_status
      ? `বৈবাহিক অবস্থা: ${generalInfo.marital_status}।`
      : "",
    location ? `এলাকা: ${location}।` : "",
    "বিয়ে বাংলাদেশি ম্যাট্রিমনিতে বিস্তারিত বায়োডাটা দেখুন।",
  ]
    .filter(Boolean)
    .join(" ");
  const metadata = createPageMetadata({
    title,
    description,
    path: `/biodata/${id}`,
  });
  const profilePhoto = generalInfo.photos?.[0];

  if (!profilePhoto) return metadata;

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      images: [
        {
          url: profilePhoto,
          alt: title,
        },
      ],
    },
  };
}

export default async function BioDataPage({ params }) {
  const { id } = await params;
  const biodata = await getBiodata(id);

  if (!biodata) notFound();

  const generalInfo = biodata.data.generalInfo;
  const address = biodata.data.address;
  const summary = [
    generalInfo.marital_status,
    address?.zilla || address?.division,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <>
      <header className="border-b border-gray-200 bg-[#F7F9F9]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="min-w-0">
            <nav
              className="flex items-center gap-2 text-sm"
              aria-label="বায়োডাটা নেভিগেশন"
            >
              <Link
                to="/biodatas"
                className="font-bold text-brand-900 transition-colors hover:text-[#0F8287] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900"
              >
                ← সকল বায়োডাটা
              </Link>
              <span className="text-gray-300" aria-hidden="true">
                /
              </span>
              <span className="font-semibold text-gray-500">BID-{id}</span>
            </nav>

            <h1 className="mt-2 truncate text-2xl font-bold text-gray-900 sm:text-3xl">
              {generalInfo.bio_type || "ম্যাট্রিমনি বায়োডাটা"}
            </h1>
            {summary && (
              <p className="mt-1.5 text-sm text-gray-600">{summary}</p>
            )}
          </div>

          <Link
            to="/biodata-submit"
            className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl bg-brand-900 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#0F8287] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900 focus-visible:ring-offset-2 md:self-center"
          >
            নিজের বায়োডাটা তৈরি করুন
          </Link>
        </div>
      </header>
      <BioData initialData={biodata} />
    </>
  );
}
