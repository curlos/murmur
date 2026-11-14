import React from 'react';
import Head from 'next/head';
import { useRecoilState } from 'recoil';
import { colorThemeState, newTweetModalState, searchModalState, editProfileModalState, sidenavState, authModalState, editInteractionSettingsModalState } from '../../atoms/atom';
import Sidebar from '../Sidebar';
import Widgets from '../Widgets';
import MobileBottomNavBar from '../MobileBottomNavBar';
import { NewTweetModal } from '../NewTweetModal';
import { SearchModal } from '../SearchModal';
import SidenavDrawer from '../SidenavDrawer';
import { AuthModal } from '../AuthModal';
import { EditInteractionSettingsModal } from '../EditInteractionSettingsModal';
import { TweetSentAlert } from '../TweetSentAlert';

const SITE_DESCRIPTION = 'Murmur is a social platform for short posts: follow people, reply, repost, and keep up with the news in real time.';

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
  showWidgets?: boolean;
  setIsEditing?: (editing: boolean) => void;
}

const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  title = 'Murmur',
  showWidgets = true,
  setIsEditing
}) => {
  const [isOpen, _setIsOpen] = useRecoilState(newTweetModalState);
  const [theme, _setTheme] = useRecoilState(colorThemeState);
  const [isSearchModalOpen, _setIsSearchModalOpen] = useRecoilState(searchModalState);
  const [isSidenavOpen, _setIsSidenavOpen] = useRecoilState(sidenavState);
  const [isAuthModalOpen, _setIsAuthModalOpen] = useRecoilState(authModalState);
  const [isEditInteractionSettingsModalOpen, _setIsEditInteractionSettingsModalOpen] = useRecoilState(editInteractionSettingsModalState);

  return (
    <div className={theme}>
      <div className="bg-white text-black dark:bg-black dark:text-white min-h-screen min-w-screen">
        <div className={`max-w-7xl mx-auto`}>
          <Head>
            <title>{title}</title>
            <link rel="icon" href="/assets/murmur-logo.svg" />
            {/* Link preview info (shown when the site is shared on LinkedIn, Slack, iMessage, etc.) */}
            <meta name="description" content={SITE_DESCRIPTION} />
            <meta property="og:site_name" content="Murmur" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={SITE_DESCRIPTION} />
            <meta property="og:image" content="https://murmur-social-media.vercel.app/assets/og-image.png" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta name="twitter:card" content="summary_large_image" />
          </Head>

          {/* Lets keyboard users jump past the sidebar straight to the page content. */}
          <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-lightblue-500 focus:text-white focus:px-4 focus:py-2 focus:rounded-full">
            Skip to main content
          </a>
          {showWidgets && (
            <a href="#search-and-news" className="hidden lg:block sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-lightblue-500 focus:text-white focus:px-4 focus:py-2 focus:rounded-full">
              Skip to search and news
            </a>
          )}

          <div className={`bg-white text-black dark:bg-black dark:text-white min-h-screen flex`}>
            <Sidebar />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            {showWidgets && <Widgets />}

            {isOpen && <NewTweetModal setIsEditing={setIsEditing} />}
            {isSearchModalOpen && <SearchModal />}
            {isSidenavOpen && <SidenavDrawer />}
            {isAuthModalOpen && <AuthModal />}
            {isEditInteractionSettingsModalOpen && <EditInteractionSettingsModal />}

            <TweetSentAlert />
            <MobileBottomNavBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;