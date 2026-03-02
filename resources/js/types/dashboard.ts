export interface DashboardStats {
  ownedModsCount: number;
  collaborativeModsCount: number;
  totalPagesCount: number;
  publicViewsCount: number;
  latestMods: ModInfo[];
}

export interface ModInfo {
  slug: string;
  name: string;
  description: string;
  pages_count: number;
  collaborators_count: number;
  updated_at: Date;
  latest_pages: PageInfo[];
}

export interface PageInfo {
  title: string;
  slug: string;
  updated_at: Date;
}
