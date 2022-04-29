export interface Post {
    id: string;
    title: string;
    content: string;
    created_date?: number;
    image?: string;
    author?: string;
    authorImage?: string;
    category?: string;
}