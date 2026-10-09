import MainLayout from '@/Layout/mainLayout';
import NotFound from '@/views/pages/NotFound/NotFound';

export const metadata = {
  title: 'পৃষ্ঠাটি পাওয়া যায়নি',
  robots: { index: false, follow: true },
};

// TODO: root 404 sits outside (main), so wrap it to keep the header and footer.
export default function NotFoundPage() {
  return (
    <MainLayout>
      <NotFound />
    </MainLayout>
  );
}
