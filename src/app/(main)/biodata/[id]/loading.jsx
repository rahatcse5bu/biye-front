import BioDetailsSkeleton from '@/components/BioDetailsSkeleton/BioDetailsSkeleton';

// TODO: shown instantly on navigation while the biodata is fetched, so the click gives feedback.
export default function Loading() {
  return <BioDetailsSkeleton withHeader />;
}
