import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import Link from "next/link";
import { FC } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useGetMyRssEntriesQuery, useMyRssFeedSubscription } from "../../graphql/urql-codegen/code";
import { useSkipPagination } from "../../hooks/useSkipPagination";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.extend(advancedFormat);

export const RSSFeed: FC<{}> = ({}) => {
  const { skip, take, loadMore } = useSkipPagination(9);
  const [{ data }] = useGetMyRssEntriesQuery({ variables: { skip, take } });
  useMyRssFeedSubscription();
  return (
    <div id="rss-entries-infinite" className="container mx-auto mb-2 max-h-60 overflow-y-auto bg-white px-4 py-2">
      <InfiniteScroll
        dataLength={data?.getMyRssEntries.length ?? 0}
        next={loadMore}
        hasMore={(data?.getMyRssEntries.length ?? 1) % take === 0}
        loader={<></>}
        endMessage={<></>}
        scrollableTarget="rss-entries-infinite"
      >
        {data?.getMyRssEntries.map(({ title, link, time }, idx) => {
          const timeDjTz = dayjs(time).tz();
          return (
            <Link
              key={idx}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2 flex flex-grow cursor-pointer flex-col rounded border border-gray-300 p-2"
            >
              <div className="mb-1 flex justify-between">
                <h4 className="text-xs font-bold">{title}</h4>
                <p className={`time-anchor-${idx} whitespace-nowrap text-xs`}>{timeDjTz.fromNow()}</p>
                <Tooltip anchorSelect={`.time-anchor-${idx}`} place="top">
                  <p className="text-center">{timeDjTz.format("MM-DD-YYYY")}</p>
                  <p>{timeDjTz.format("hh:mm:ss A z")}</p>
                </Tooltip>
              </div>
            </Link>
          );
        })}
      </InfiniteScroll>
    </div>
  );
};
