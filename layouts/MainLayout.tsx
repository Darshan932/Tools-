import { ReactNode, useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useRouter } from 'next/router';

type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  const router = useRouter();
  const [isAdminPage, setIsAdminPage] = useState(false);
  
  useEffect(() => {
    // Check if current page is in admin section
    setIsAdminPage(router.pathname.startsWith('/admin'));
  }, [router.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Skip header/footer for admin pages */}
        {isAdminPage ? (
          children
        ) : (
          <div className="container py-8">
            {children}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}