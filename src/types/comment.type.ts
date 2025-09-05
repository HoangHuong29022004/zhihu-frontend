export interface IComment {
  id: string;
  content: string;
  createdAt: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  replies: IReply[];
}

export interface IReply {
  id: string;
  content: string;
  createdAt: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  replies: IReply[];
}

export type TAddCommentRequest = {
  content: string;
  comicId: string;
  parentId?: string;
};
