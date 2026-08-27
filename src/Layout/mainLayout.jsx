'use client';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-[100dvh] pb-[calc(64px+env(safe-area-inset-bottom))] lg:pb-0">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
