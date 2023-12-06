import { Comment } from "./comment";

export interface Post2 {
    id: number;
    title: string;
    content: string;
    authorId: number;
    comments:Comment[];
}