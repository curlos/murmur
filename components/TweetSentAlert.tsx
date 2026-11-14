import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { tweetSentAlertState } from '../atoms/atom';

export const TweetSentAlert: React.FC = () => {
  const [alertState, setAlertState] = useRecoilState(tweetSentAlertState);
  const router = useRouter();

  useEffect(() => {
    if (alertState.isVisible) {
      const timer = setTimeout(() => {
        setAlertState({
          isVisible: false,
          tweetId: '',
          message: 'Your post was sent'
        });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [alertState.isVisible, setAlertState]);

  const handleViewClick = () => {
    if (alertState.tweetId) {
      router.push(`/post/${alertState.tweetId}`);
    }
    setAlertState({
      isVisible: false,
      tweetId: '',
      message: 'Your post was sent'
    });
  };

  // The "status" container is always rendered so screen readers announce the message as soon as it appears.
  return (
    <div role="status" aria-live="polite" className="fixed left-4 bottom-20 lg:bottom-4 z-50">
      {alertState.isVisible && (
        <div className="animate-slide-in-left bg-lightblue-500 text-white px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm drop-shadow-lg flex items-center gap-3 max-w-xs">
          <div className="flex-shrink-0">
            <CheckCircleIcon className="w-5 h-5" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{alertState.message}</p>
          </div>
          {alertState.tweetId && (
            <button
              type="button"
              onClick={handleViewClick}
              className="bg-white text-lightblue-500 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              View
            </button>
          )}
        </div>
      )}
    </div>
  );
};