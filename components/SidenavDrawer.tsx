import React, { useEffect, useRef, useState } from "react";
import {
  UserIcon,
  LogoutIcon,
  LoginIcon,
  CogIcon,
  NewspaperIcon
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { useRecoilState, useRecoilValue } from "recoil";
import { sidenavState, colorThemeState } from "../atoms/atom";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { FiBookmark } from 'react-icons/fi';
import ProfileButton from "./ProfileButton";

/**
 * @description - Renders the sidebar (only on MOBILE) that shows the most common pages a user could go to as well as actions they could take such as "Home", "Search", "Bookmarks", "Profile", "Logout", "New Tweet" and information about them such as their profile pic, name and username. The desktop equivalent is the "Sidebar" component.
 * @returns {React.FC}
 */
const SidenavDrawer = () => {

  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(sidenavState);
  const theme = useRecoilValue(colorThemeState);
  const [_activeLink, setActiveLink] = useState('home');
  const router = useRouter();
  const drawerRef = useRef<HTMLElement>(null);

  // Move keyboard focus into the drawer when it opens and let "Escape" close it.
  useEffect(() => {
    if (!isOpen) return;
    drawerRef.current?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  useEffect(() => {
    if (router.pathname.startsWith('/bookmarks')) {
      setActiveLink('bookmarks');
    } else if (router.pathname.startsWith('/profile')) {
      setActiveLink('profile');
    } else {
      setActiveLink('home');
    }
  }, [router.pathname]);

  return (
    <div className={`${theme} ${!isOpen ? 'hidden' : ''} sm:hidden fixed z-50 w-screen max-w-full h-screen bg-gray-500 bg-opacity-40`} onClick={() => setIsOpen(false)}>
      <aside ref={drawerRef} tabIndex={-1} role="dialog" aria-label="Menu" className={`outline-none transform z-50 top-0 right-0 bg-white text-black dark:bg-black dark:text-white fixed h-full ease-in-out transition-all duration-1000 ${isOpen ? 'translate-x-0' : 'translate-x-full'} w-10/12 xl:w-10/12`} onClick={(e) => e.stopPropagation()}>
        <div className="p-5 text-2xl font-medium flex flex-col justify-between h-screen">
          <div className="space-y-2">
            <Link href="/">
              <a className="flex items-center gap-4 cursor-pointer" onClick={() => setIsOpen(false)}>
                <FaHome className="h-7 w-7" />
                Home
              </a>
            </Link>

            <Link href="/news">
              <a className="flex items-center gap-4 cursor-pointer" onClick={() => setIsOpen(false)}>
                <NewspaperIcon className="h-7 w-7" />
                News
              </a>
            </Link>

            {/* Only show if the user is logged in. */}
            {session && session.user && (
              <Link href="/bookmarks">
                <a className="flex items-center gap-4 cursor-pointer" onClick={() => setIsOpen(false)}>
                  <FiBookmark className="h-7 w-7" />
                  Bookmarks
                </a>
              </Link>
            )}


            {/* Only show if the user is logged in. */}
            {session && session.user && (
              <Link href={`/profile/${session.user.tag}`}>
                <a className="flex items-center gap-4 cursor-pointer" onClick={() => setIsOpen(false)}>
                  <UserIcon className="h-7 w-7" />
                  Profile
                </a>
              </Link>
            )}

            {/* Only show if the user is logged in. */}
            {session && session.user && (
              <button type="button" className={`flex items-center gap-4 cursor-pointer`} onClick={() => {
                signOut({ callbackUrl: 'http://localhost:3000/auth' });
                setIsOpen(false);
              }}>
                <LogoutIcon className="h-[30px] w-[30px]" />
                <span className="text-black dark:text-white">Logout</span>
              </button>
            )}

            {/* Only show if the user is NOT logged in. */}
            {!session && (
              <Link href="/auth">
                <a className="flex items-center gap-4 cursor-pointer" onClick={() => setIsOpen(false)}>
                  <LoginIcon className="h-7 w-7" />
                  Login
                </a>
              </Link>
            )}

            {/* Only show if the user is NOT logged in. */}
            {!session && (
              <Link href="/auth?sign-up=true">
                <a className="flex items-center gap-4 cursor-pointer" onClick={() => setIsOpen(false)}>
                  <UserIcon className="h-7 w-7" />
                  Sign Up
                </a>
              </Link>
            )}

            {/* Settings - show for both logged in and non-logged in users */}
            <Link href="/settings">
              <a className="flex items-center gap-4 cursor-pointer" onClick={() => setIsOpen(false)}>
                <CogIcon className="h-7 w-7" />
                Settings
              </a>
            </Link>
          </div>

          <ProfileButton showDetails onMenuItemClick={() => setIsOpen(false)} />

        </div>

      </aside>
    </div>
  );
};

export default SidenavDrawer;
