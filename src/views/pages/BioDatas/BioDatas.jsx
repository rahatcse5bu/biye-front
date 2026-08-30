import BioDatasGrid from '../../../components/BioDatasGrid/BioDatasGrid';
import { SideBar } from '../../../components/SideBar/SideBar';
import { useContext, useEffect, useRef } from 'react';
import BioContext from '../../../contexts/BioContext';
import { FaXmark } from 'react-icons/fa6';
import LoadingCircle from '../../../components/LoadingCircle/LoadingCircle';
import { useFilter } from '../../../contexts/useFilter';
import PromptFilter from '../../../components/PromptFilter/PromptFilter';
import ChatAgent from '../../../components/ChatAgent/ChatAgent';

const getVisibleUserStatus = () =>
  process.env.NODE_ENV === 'development' ? 'in review' : 'active';

const BioDatas = () => {
  const { bioLoading, setQuery, setFilterFields } = useContext(BioContext);
  const { sideBarDisplay, setSideBarDisplay } = useFilter();
  const filterDialogRef = useRef(null);
  const previousFocusRef = useRef(null);

  const handlePromptApply = (filters) => {
    setQuery((prev) => ({ ...prev, ...filters, page: 1 }));
    setFilterFields((prev) => ({ ...prev, ...filters }));
  };

  const handlePromptClear = () => {
    const userStatus = getVisibleUserStatus();
    setQuery({ page: 1, limit: 12, user_status: userStatus });
    setFilterFields({ user_status: userStatus });
  };

  useEffect(() => {
    const userStatus = getVisibleUserStatus();

    setQuery((prev) => ({ ...prev, user_status: userStatus }));
    setFilterFields((prev) => ({ ...prev, user_status: userStatus }));
  }, [setFilterFields, setQuery]);

  useEffect(() => {
    if (!sideBarDisplay) return undefined;

    const desktopMedia = window.matchMedia('(min-width: 1024px)');
    if (desktopMedia.matches) {
      setSideBarDisplay(false);
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    previousFocusRef.current = document.activeElement;
    document.body.style.overflow = 'hidden';

    const focusDialog = window.requestAnimationFrame(() => {
      filterDialogRef.current
        ?.querySelector('button, select, input, textarea, [href]')
        ?.focus();
    });

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSideBarDisplay(false);
        return;
      }

      if (event.key !== 'Tab' || !filterDialogRef.current) return;

      const focusableElements = Array.from(
        filterDialogRef.current.querySelectorAll(
          'button:not([disabled]), select:not([disabled]), input:not([disabled]), textarea:not([disabled]), [href]'
        )
      );
      if (!focusableElements.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    const handleBreakpointChange = (event) => {
      if (event.matches) setSideBarDisplay(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    desktopMedia.addEventListener('change', handleBreakpointChange);

    return () => {
      window.cancelAnimationFrame(focusDialog);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      desktopMedia.removeEventListener('change', handleBreakpointChange);
      previousFocusRef.current?.focus?.();
      previousFocusRef.current = null;
    };
  }, [setSideBarDisplay, sideBarDisplay]);

  return (
    <main className="min-h-[100dvh] bg-gray-50 pb-4 lg:pb-8">
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[1440px] px-3 py-3 sm:px-5 sm:py-4 lg:px-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-3 shadow-sm sm:p-4">
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-900/10 text-lg text-brand-900">
                ✦
              </span>
              <div>
                <h1 className="text-base font-bold text-gray-900 sm:text-lg">
                  পছন্দের বায়োডাটা খুঁজুন
                </h1>
                <p className="text-xs text-gray-500 sm:text-sm">
                  সহজ বাংলায় আপনার পছন্দ লিখুন
                </p>
              </div>
            </div>
            <PromptFilter
              onApply={handlePromptApply}
              onClear={handlePromptClear}
            />
          </div>
        </div>
      </div>

      <div className="relative mx-auto flex max-w-[1440px] items-start gap-5 px-0 sm:px-2 lg:px-6 lg:py-5">
        {sideBarDisplay && (
          <button
            type="button"
            className="fixed inset-0 z-[1100] bg-black/45 backdrop-blur-[1px] lg:hidden"
            onClick={() => setSideBarDisplay(false)}
            aria-label="ফিল্টার বন্ধ করুন"
            tabIndex={-1}
          />
        )}

        <div
          ref={filterDialogRef}
          className={`bottom-[calc(4.75rem+env(safe-area-inset-bottom))] left-3 right-3 top-3 z-[1110] overflow-hidden rounded-3xl bg-white shadow-2xl lg:sticky lg:bottom-auto lg:left-auto lg:right-auto lg:top-20 lg:z-auto lg:block lg:h-[calc(100dvh-6rem)] lg:w-80 lg:shrink-0 lg:rounded-none lg:bg-transparent lg:shadow-none ${
            sideBarDisplay ? 'fixed' : 'hidden'
          }`}
          role={sideBarDisplay ? 'dialog' : undefined}
          aria-modal={sideBarDisplay ? 'true' : undefined}
          aria-label="বায়োডাটা ফিল্টার"
        >
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 lg:hidden">
            <div>
              <p className="font-bold text-gray-900">ফিল্টার</p>
              <p className="text-xs text-gray-500">আপনার পছন্দ নির্বাচন করুন</p>
            </div>
            <button
              type="button"
              onClick={() => setSideBarDisplay(false)}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-gray-700 transition-colors hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-900"
              aria-label="ফিল্টার বন্ধ করুন"
            >
              <FaXmark className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="h-[calc(100%_-_69px)] lg:h-full">
            <SideBar />
          </div>
        </div>

        <section className="min-w-0 flex-1" aria-label="বায়োডাটা তালিকা">
          {bioLoading ? (
            <LoadingCircle classes="min-h-[60dvh] flex items-center" />
          ) : (
            <BioDatasGrid setSideBarDisplay={setSideBarDisplay} />
          )}
        </section>
      </div>

      <ChatAgent onApply={handlePromptApply} />
    </main>
  );
};

export default BioDatas;
