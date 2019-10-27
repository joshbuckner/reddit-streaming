import React from "react";
import "./Comment.scss";
import Arrow from "../../assets/images/arrow.svg";
import { Replies } from "../../types";

interface Props {
  body: string;
  author: string;
  created: number;
  depth: number;
  replies: Replies;
  index: number;
}

const Comment: React.FC<Props> = ({
  index,
  body,
  author,
  created,
  depth,
  replies
}) => {
  const htmlDecode = (input: string) => {
    const e = document.createElement("div");
    e.innerHTML = input;
    if (
      !e.childNodes ||
      e.childNodes.length === 0 ||
      !e.childNodes[0].nodeValue
    ) {
      return "";
    }
    return e.childNodes[0].nodeValue;
  };

  return (
    <div>
      <div
        className="comment"
        style={{
          marginBottom: depth === 0 ? "4px" : "0",
          marginTop: depth > 0 ? "0" : "0"
        }}
      >
        <div className="comment__vote">
          <img className="vote-up" src={Arrow} alt="vote-up" />
          <img className="vote-down" src={Arrow} alt="vote-down" />
          <div className="comment__division"></div>
        </div>
        <div className="comment__block">
          <div className="comment__content">
            <div
              className="comment__header"
              style={{ justifyContent: depth > 0 ? "flex-start" : "" }}
            >
              <a
                className="comment__user"
                href={`https://www.reddit.com/user/${author}`}
              >
                {author}
              </a>
              <div
                className="comment__timestamp"
                style={{ marginLeft: depth > 0 ? "6px" : "" }}
              >
                {new Date(created * 1000).toLocaleTimeString()}
              </div>
            </div>
            <div
              className="comment__body"
              dangerouslySetInnerHTML={{ __html: htmlDecode(body) }}
            ></div>
          </div>
          {replies &&
            replies.data &&
            replies.data.children &&
            replies.data.children.map(reply => (
              <Comment
                index={index}
                key={reply.data.id}
                body={reply.data.body_html}
                author={reply.data.author}
                created={reply.data.created_utc}
                depth={reply.data.depth}
                replies={reply.data.replies}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Comment;
