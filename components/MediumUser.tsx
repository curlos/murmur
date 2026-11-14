import { collection, DocumentData, getDocs, query, where } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { authModalState } from '../atoms/atom';
import { db } from '../firebase';
import { useFollow } from '../utils/useFollow';
import { HiBadgeCheck } from 'react-icons/hi';

interface Props {
  userID: string,
  user: DocumentData,
}

/**
 * @description - Renders basic information about a user which includes their profile pic, name, username, and their bio. Meant to be viewed in a list of users where you would see basic information about all these users such as when you check the followers of an account.
 * @returns {React.FC}
 */
const MediumUser = ({ userID, user }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [followed, setFollowed] = useState(false);
  const [_authModalOpen, setAuthModalOpen] = useRecoilState(authModalState);

  // Check if current user is following this user (efficient single document check)
  useEffect(() => {
    if (session?.user?.uid && userID) {
      const checkFollowStatus = async () => {
        try {
          const followDoc = await getDocs(query(
            collection(db, 'users', userID, 'followers'),
            where('followedBy', '==', session.user.uid)
          ));
          setFollowed(!followDoc.empty);
        } catch (error) {
          console.error('Error checking follow status:', error);
          setFollowed(false);
        }
      };
      checkFollowStatus();
    } else {
      setFollowed(false);
    }
  }, [userID, session?.user?.uid]);

  /**
   *
   * @returns
   */
  const handleFollow = useFollow({ session, followed, db, userID });

  const handleFollowClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!session) {
      setAuthModalOpen(true);
      return;
    }

    // Update follow state immediately for better UX (optimistic update)
    const newFollowedState = !followed;
    setFollowed(newFollowedState);

    try {
      await handleFollow();
    } catch (error) {
      console.error('Error updating follow:', error);
      // Revert follow state on error
      setFollowed(followed);
    }
  };

  const renderFollowButton = () => {
    return (
      !session || userID !== session.user.uid ? (
        <button type="button" className="font-semibold text-sm px-4 py-2 text-black bg-white rounded-full" onClick={handleFollowClick}>{followed ? 'Following' : 'Follow'}</button>
      ) : (
        // If the user is not found (meaning their account has been deleted), then don't render anything.
        null
      )
    )
  }

  return (
    user ? (
        // The whole row is clickable with a mouse; the name is the real link for keyboard and screen reader users.
        <div className="p-3 flex justify-between items-center text-base cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => router.push(`/profile/${user.tag}`)}>
            <div className="flex gap-2">
              <img src={user.profilePic} alt="" className="rounded-full h-[55px] w-[55px] object-cover cursor-pointer" />

              <div>
                <Link href={`/profile/${user.tag}`}>
                  <a className="flex items-center font-semibold cursor-pointer hover:underline" onClick={(e) => e.stopPropagation()}>
                    <span className="truncate max-w-[200px]">{user.name}</span>
                    <HiBadgeCheck className="h-[18px] w-[18px] ml-[2px] text-lightblue-500" title="Verified" />
                  </a>
                </Link>
                <div className="text-gray-700 dark:text-gray-400">@{user.tag}</div>
                <div className="truncate max-w-[230px] sm:max-w-[300px] md:max-w-[400px]">{user.bio}</div>

                <div className="pt-2 flex sm:hidden">
                  {renderFollowButton()}
                </div>
              </div>
            </div>

            <div className="hidden sm:block">
              {renderFollowButton()}
            </div>
        </div>
      ) : null
  );
};

export default MediumUser;