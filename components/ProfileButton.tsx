import React from "react";
import { DotsHorizontalIcon, LogoutIcon, UserIcon } from "@heroicons/react/outline";
import { Menu, Transition } from "@headlessui/react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { HiBadgeCheck } from "react-icons/hi";

interface ProfileButtonProps {
  onMenuItemClick?: () => void;
  // Always show the name, username and "..." (the desktop sidebar only shows them on extra-large screens, but the mobile drawer has room for them).
  showDetails?: boolean;
}

const ProfileButton = ({ onMenuItemClick, showDetails = false }: ProfileButtonProps) => {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session?.user) return null;

  return (
    <div className="flex items-center justify-between mt-3 w-100">
      <div className="relative w-full">
        <Menu>
          {({ open }) => (
            <>
              <Menu.Button className={`flex items-center space-x-2 w-full ${showDetails ? 'p-2' : 'xl:p-2'} rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 text-base`}>
                <img src={session.user.profilePic} alt={`${session.user.tag}'s profile pic`} className="rounded-full w-12 h-12 xl:w-[55px] xl:h-[55px] object-cover" />
                <div className={`${showDetails ? 'flex' : 'hidden xl:flex'} flex-col w-full`}>
                  <div className="flex items-center">
                    <div className="text-left truncate max-w-[150px]">{session.user.name}</div>
                    <HiBadgeCheck className="h-[18px] w-[18px] ml-[2px] text-lightblue-500" />
                  </div>
                  <div className="text-gray-500 break-word text-left">@{session.user.tag}</div>
                </div>
                <DotsHorizontalIcon className={`${showDetails ? 'block' : 'hidden xl:block'} h-5 w-5 flex-shrink-0 text-gray-700 dark:text-gray-400`} />
              </Menu.Button>

              <Transition
                show={open}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Menu.Items
                  static
                  className={`absolute -top-2 transform -translate-y-full left-0 ${showDetails ? 'w-full' : 'w-[200px] xl:w-full'} origin-bottom-left divide-y rounded-md shadow-gray-800 shadow-lg outline-none border border-[#C8B9B1] dark:border-gray-700 z-[100]`}
                >
                  <div className="p-1 bg-white dark:bg-black rounded-md">
                    <Menu.Item>
                      {({ active, close }) => (
                        <div
                          className={`${active ? 'bg-gray-100 dark:bg-gray-800' : 'bg-white dark:bg-black'} text-black dark:text-white w-full px-4 py-2 text-sm leading-5 text-left cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center space-x-2 rounded-md`}
                          onClick={() => {
                            close();
                            onMenuItemClick?.();
                            router.push(`/profile/${session.user.tag}`);
                          }}
                        >
                          <UserIcon className="h-4 w-4" />
                          <span>View Profile</span>
                        </div>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      {({ active, close }) => (
                        <div
                          className={`${active ? 'bg-gray-100 dark:bg-gray-800' : 'bg-white dark:bg-black'} text-red-600 dark:text-red-500 w-full px-4 py-2 text-sm leading-5 text-left cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center space-x-2 rounded-md`}
                          onClick={() => {
                            close();
                            onMenuItemClick?.();
                            signOut({ callbackUrl: 'http://localhost:3000/auth' });
                          }}
                        >
                          <LogoutIcon className="h-4 w-4" />
                          <span>Logout</span>
                        </div>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      </div>
    </div>
  );
};

export default ProfileButton;