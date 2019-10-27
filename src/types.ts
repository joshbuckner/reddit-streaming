export interface RedditComment {
  kind: Kind;
  data: CommentData;
}

export interface CommentData {
  id: string;
  parent_id: string;
  body: string;
  body_html: string;
  author: string;
  replies: Replies;
  depth: number;
  count?: number;
  created_utc: number;
  stickied: boolean;
}

export interface PurpleData {
  children: RedditComment[] | null;
}

export interface Replies {
  data: PurpleData;
}

export enum Kind {
  More = "more",
  T1 = "t1"
}
