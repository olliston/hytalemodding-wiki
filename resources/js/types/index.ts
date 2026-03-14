export type * from './auth';
export type * from './navigation';
export type * from './ui';
export type * from './dashboard';

import type { Auth } from './auth';

export type SharedMeta = {
  site_name: string;
  default_description: string;
  current_url: string;
  default_image: string;
};

export type SharedData = {
  name: string;
  auth: Auth;
  sidebarOpen: boolean;
  meta: SharedMeta;
  [key: string]: unknown;
};
