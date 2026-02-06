import { Theme } from "./theme";

export type Section = {
    id?: string;
    type: string;
    title?: string;
    content: Record<string, any>;
    order?: number;
}

export type Page = {
    pageId?: string;
    slug?: string;
    title?: string;
    description?: string;
    sections: Section[];
    theme?: Theme; // Optional theme configuration from backend
}
