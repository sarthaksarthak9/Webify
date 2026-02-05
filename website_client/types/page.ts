import { Theme } from "./theme";

export type Section = {
    type: string;
    props: Record<string, any>;
}

export type Page = {
    pageId?: string;
    slug?: string;
    title?: string;
    description?: string;
    sections: Section[];
    theme?: Theme; // Optional theme configuration from backend
}
