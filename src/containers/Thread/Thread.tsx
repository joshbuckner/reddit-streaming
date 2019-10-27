import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Thread.scss";
import Navigation from "../../components/Navigation/Navigation";
import Comment from "../../components/Comment/Comment";
import Loader from "../../components/Loader/Loader";
import ReplyTrunc from "../../components/ReplyTrunc/ReplyTrunc";
import { RedditComment } from "../../types";

const socket = new WebSocket("wss://reddit-streaming-server.herokuapp.com/ws");

interface Params {
  subreddit?: string;
  threadID?: string;
  threadSlug?: string;
}

const Thread: React.FC = () => {
  const [comments, setComments] = useState<RedditComment[]>([]);
  const [scrollLock, setScrollLock] = useState<boolean>(false);
  const { subreddit, threadID, threadSlug }: Params = useParams();

  useEffect(() => {
    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          subSlug: subreddit,
          threadID: threadID,
          threadSlug: threadSlug,
          commentID: threadID
        })
      );
    };
    return () => {
      socket.close();
    };
  }, [subreddit, threadID, threadSlug]);

  useEffect(() => {
    socket.onmessage = event => {
      const newComments = JSON.parse(event.data).data.children;
      setComments(newComments);
      if (scrollLock || comments.length === 0) {
        window.scrollTo(0, document.documentElement.scrollHeight);
      }
    };
  }, [comments, scrollLock]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        document.documentElement.scrollTop +
          document.documentElement.clientHeight ===
        document.documentElement.scrollHeight
      ) {
        setScrollLock(true);
      } else {
        setScrollLock(false);
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="thread">
      <Navigation />
      {comments.length > 0 ? (
        <section className="content">
          <div className="comments">
            {comments.map((comment: RedditComment, index: number) =>
              comment.kind !== "more" ? (
                <Comment
                  index={index}
                  key={comment.data.id}
                  body={comment.data.body_html}
                  author={comment.data.author}
                  created={comment.data.created_utc}
                  depth={comment.data.depth}
                  replies={comment.data.replies}
                />
              ) : (
                <ReplyTrunc
                  key={comment.data.id}
                  id={comment.data.id}
                  parentID={comment.data.parent_id}
                  depth={comment.data.depth}
                  count={comment.data.count}
                />
              )
            )}
          </div>
        </section>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Thread;
