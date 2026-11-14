import { PhotographIcon } from "@heroicons/react/solid";
import moment from "moment";
import Link from "next/link";
import { BsPencilFill } from "react-icons/bs";
import { FaRetweet } from "react-icons/fa";
import { HiBadgeCheck } from "react-icons/hi";
import ParentTweet from "../ParentTweet";
import { TweetDropdown } from "../TweetDropdown";
import TweetActions from "./TweetActions";
import { useRouter } from "next/router";
import { getWordBreakClass } from "../../utils/textHelpers";
import { onEnterOrSpace } from "../../utils/a11y";

const SmallTweet = ({
  retweetedBy,
  session,
  author,
  showParentTweetConnectingLine,
  tweet,
  editedTweet,
  pastTweet,
  id,
  authorId,
  deleteTweet,
  parentTweet,
  parentTweetAuthor,
  isQuoteTweet,
  replyingToDeletedTweet,
  handleImageClick,
  likesCount,
  retweetsCount,
  bookmarksCount,
  repliesCount,
  liked,
  retweeted,
  bookmarked,
  setLiked,
  setRetweeted,
  setBookmarked,
  tweetID,
}) => {
  const router = useRouter();

  const handleClick = (e) => {
    if (!pastTweet) {
      e.stopPropagation();
      router.push(`/post/${tweetID}`);
    }
  };

  return (
    <div onClick={handleClick} className={!pastTweet ? 'cursor-pointer' : ''}>
      {/* Check if the tweet was retweeted by a user and display a message at the top if they did like: "Cristiano Ronaldo retweeted" */}
      <div className="text-gray-500 text-sm">
        {retweetedBy ? (
          <div className="font-semibold ml-[63px]">
            <Link href={`/profile/${retweetedBy.tag}`}>
              <a className="flex hover:underline" onClick={(e) => e.stopPropagation()}>
                <FaRetweet className="h-[18px] w-[18px] mr-2 mb-2" aria-hidden="true" />
                <span className="truncate max-w-[200px]">
                  {session && session.user && retweetedBy.tag === session.user.tag
                    ? "You reposted"
                    : `${retweetedBy.name} reposted`}
                </span>
              </a>
            </Link>
          </div>
        ) : null}
      </div>
      <div className="flex relative">
        {/* Profile pic */}
        <div className="mr-2 relative">
          <Link href={`/profile/${author.tag}`}>
            <a onClick={(e) => e.stopPropagation()}>
              <img
                src={author.profilePic}
                alt={`${author.tag}'s profile pic`}
                className="rounded-full h-[55px] w-[55px] object-cover max-w-none cursor-pointer"
              />
            </a>
          </Link>
          {showParentTweetConnectingLine && (
            <div className="absolute left-1/2 transform -translate-x-1/2 top-[55px] bottom-[-24px] w-0.5 bg-gray-400 dark:bg-gray-600"></div>
          )}
        </div>

        <div className="flex flex-col justify-between w-full">
          <TweetTopGeneralInfo {...{ author, tweet, editedTweet, pastTweet, id, authorId, deleteTweet }} />

          <div className="pb-1">
            {parentTweet && parentTweetAuthor && !isQuoteTweet && (
              <div className="text-[15px] text-gray-500">
                Replying to
                <Link href={`/profile/${parentTweetAuthor.tag}`}>
                  <a className="ml-1 text-lightblue-500 dark:text-lightblue-400 cursor-pointer underline" onClick={(e) => e.stopPropagation()}>
                    @{parentTweetAuthor.tag}
                  </a>
                </Link>
              </div>
            )}

            {replyingToDeletedTweet && (
              <div className="text-xl w-full">
                <div className="text-[15px] text-gray-500">
                  <span>Replying to</span>
                  <span className="ml-1 text-lightblue-500 dark:text-lightblue-400">@deleted</span>
                </div>
              </div>
            )}

            <div
              className={`${pastTweet ? " text-gray-500" : ""} ${getWordBreakClass(tweet.text)}`}
              style={{ whiteSpace: "pre-line" }}
            >
              {tweet.text}
            </div>
            
            <TweetImages {...{ tweet, handleImageClick }} />
          </div>

          {isQuoteTweet && tweet.parentTweet && (
            <div className="mt-3">
              <ParentTweet tweetBeingRepliedToId={tweet.parentTweet} isQuoteTweet={true} />
            </div>
          )}

          {/* Action buttons */}
          <TweetActions
            id={id}
            likesCount={likesCount}
            retweetsCount={retweetsCount}
            bookmarksCount={bookmarksCount}
            repliesCount={repliesCount}
            liked={liked}
            retweeted={retweeted}
            bookmarked={bookmarked}
            session={session}
            pastTweet={pastTweet}
            tweet={tweet}
            tweetAuthorId={authorId}
            onLikeChange={setLiked}
            onRetweetChange={setRetweeted}
            onBookmarkChange={setBookmarked}
          />
        </div>
      </div>
    </div>
  );
};

const TweetTopGeneralInfo = ({ author, tweet, editedTweet, pastTweet, id, authorId, deleteTweet }) => {
  return (
    <div className="flex justify-between w-full">
      <div className="lg:flex items-center">
        <div className="flex">
          <Link href={`/profile/${author.tag}`}>
            <a className="block cursor-pointer hover:underline font-bold truncate max-w-[200px]" onClick={(e) => e.stopPropagation()}>{author.name}</a>
          </Link>
          <HiBadgeCheck className="h-[18px] w-[18px] ml-[2px] mt-[2px] mr-[2px] text-lightblue-500" title="Verified" />
        </div>
        <Link href={`/profile/${author.tag}`}>
          <a className="block text-gray-500 cursor-pointer hover:underline" onClick={(e) => e.stopPropagation()}>@{author.tag}</a>
        </Link>
        <div className="hidden lg:block text-gray-500 mx-1 font-bold">·</div>
        {/* The timestamp links to the post, so keyboard users have a way to open it (the rest of the card is mouse-only). */}
        {tweet.timestamp && tweet.timestamp.seconds && (
          pastTweet ? (
            <div className="text-gray-500">{moment(tweet.timestamp.seconds * 1000).fromNow()}</div>
          ) : (
            <Link href={`/post/${id}`}>
              <a className="block text-gray-500 hover:underline" onClick={(e) => e.stopPropagation()}>{moment(tweet.timestamp.seconds * 1000).fromNow()}</a>
            </Link>
          )
        )}

        {/* Shows the pencil if the tweet has been edited. */}
        {editedTweet && <div className="hidden lg:block text-gray-500 mx-1 font-bold">·</div>}
        {editedTweet && <BsPencilFill className="h-[18px] w-[18px] ml-[2px] text-gray-500" title="Edited" />}
      </div>

      {/* Dropdown - Hidden for past tweets */}
      {!pastTweet && (
        <TweetDropdown
          tweet={{
            ...tweet,
            tweetId: id,
          }}
          author={author}
          authorId={authorId}
          deleteTweet={deleteTweet}
        />
      )}
    </div>
  )
}

const TweetImages = ({ tweet, handleImageClick }) => {
  return tweet.images && tweet.images.length > 0 && (
    <div className="pt-3">
      {tweet.images.length === 1 ? (
        <img
          src={tweet.images[0]}
          className="rounded-2xl max-h-[500px] w-full object-contain border border-gray-400 dark:border-gray-700 cursor-pointer hover:opacity-90 transition-opacity"
          role="button"
          tabIndex={0}
          aria-label="View image 1"
          onClick={(e) => handleImageClick(e, 0)}
          onKeyDown={onEnterOrSpace((e) => handleImageClick(e, 0))}
        />
      ) : tweet.images.length === 2 ? (
        <div className="grid grid-cols-2 gap-2">
          {tweet.images.map((image, index) => (
            <img
              key={index}
              src={image}
              className={`w-full aspect-[1/1] object-cover border border-gray-400 dark:border-gray-700 cursor-pointer hover:opacity-90 transition-opacity ${
                index === 0 ? "rounded-l-2xl" : "rounded-r-2xl"
              }`}
              role="button"
              tabIndex={0}
              aria-label={`View image ${index + 1}`}
              onClick={(e) => handleImageClick(e, index)}
              onKeyDown={onEnterOrSpace((e) => handleImageClick(e, index))}
            />
          ))}
        </div>
      ) : tweet.images.length === 3 ? (
        <div className="grid grid-cols-2 gap-2">
          <img
            src={tweet.images[0]}
            className="rounded-l-2xl w-full h-full aspect-[6/2] object-cover border border-gray-400 dark:border-gray-700 cursor-pointer hover:opacity-90 transition-opacity"
            role="button"
            tabIndex={0}
            aria-label="View image 1"
            onClick={(e) => handleImageClick(e, 0)}
            onKeyDown={onEnterOrSpace((e) => handleImageClick(e, 0))}
          />
          <div className="flex flex-col gap-2">
            <img
              src={tweet.images[1]}
              className="rounded-tr-2xl w-full aspect-[3/2] object-cover border border-gray-400 dark:border-gray-700 cursor-pointer hover:opacity-90 transition-opacity"
              role="button"
              tabIndex={0}
              aria-label="View image 2"
              onClick={(e) => handleImageClick(e, 1)}
              onKeyDown={onEnterOrSpace((e) => handleImageClick(e, 1))}
            />
            <img
              src={tweet.images[2]}
              className="rounded-br-2xl w-full aspect-[3/2] object-cover border border-gray-400 dark:border-gray-700 cursor-pointer hover:opacity-90 transition-opacity"
              role="button"
              tabIndex={0}
              aria-label="View image 3"
              onClick={(e) => handleImageClick(e, 2)}
              onKeyDown={onEnterOrSpace((e) => handleImageClick(e, 2))}
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {tweet.images.slice(0, 4).map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                className={`w-full aspect-[3/2] object-cover border border-gray-400 dark:border-gray-700 cursor-pointer hover:opacity-90 transition-opacity ${
                  index === 0
                    ? "rounded-tl-2xl"
                    : index === 1
                      ? "rounded-tr-2xl"
                      : index === 2
                        ? "rounded-bl-2xl"
                        : "rounded-br-2xl"
                }`}
                role="button"
                tabIndex={0}
                aria-label={`View image ${index + 1}`}
                onClick={(e) => handleImageClick(e, index)}
                onKeyDown={onEnterOrSpace((e) => handleImageClick(e, index))}
              />
              {index === 3 && tweet.images.length > 4 && (
                <button type="button" aria-label={`View all ${tweet.images.length} images`}
                  className={`absolute bottom-3 right-3 bg-gray-900 hover:bg-black rounded-lg px-4 py-2 cursor-pointer transition-all flex items-center gap-2 border border-gray-400 dark:border-gray-700`}
                  onClick={(e) => handleImageClick(e, 0)}
                >
                  <PhotographIcon className="h-5 w-5 text-white" />
                  <span className="text-white text-lg font-bold">+{tweet.images.length - 4}</span>
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SmallTweet;