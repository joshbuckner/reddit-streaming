import React from "react";
import "./ReplyTrunc.scss";

interface Props {
  depth: number;
  count?: number;
  id: string;
  parentID: string;
}

const Loader: React.FC<Props> = ({ depth, count, id, parentID }) => {
  return (
    <div className="reply-trunc" style={{ marginLeft: `${depth * 20}px` }}>
      <div
        className="more-replies"
        onClick={() =>
          console.log(`open replies for id:${id}, parentID:${parentID}`)
        }
      >
        {count === 1 ? "1 more reply" : `${count} more replies`}
      </div>
    </div>
  );
};

export default Loader;
