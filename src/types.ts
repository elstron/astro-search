export interface UserConfig {
  exclude?: {
    directories?: string[];
    pages?: string[];
  }
}

export type ExcludeConfig = Required<{
  directories: string[];
  pages: string[];
}>


export type PageItem = {
  title: string;
  description: string;
  url: string;
  image?: string;
}
