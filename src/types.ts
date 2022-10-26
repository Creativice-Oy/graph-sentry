export interface SentryOrganization {
  id: string;
  name: string;
  slug: string;
}

export interface SentryTeam {
  id: string;
  name: string;
  slug: string;
  projects: SentryProject[];
}

export interface SentryProject {
  team: { id: string; slug: string; name: string };
  teams: { id: string; slug: string; name: string }[];
  id: string;
  name: string;
  slug: string;
  isBookmarked: boolean;
  isMember: boolean;
  hasAccess: boolean;
  dateCreated: string;
  eventProcessing: { symbolicationDegraded: boolean };
  features: string[];
  firstTransactionEvent: boolean;
  hasSessions: boolean;
  hasProfiles: boolean;
  platform: string;
  hasUserReports: boolean;
}

export interface SentryUser {
  id: string;
  name: string;
  email: string;
  role: string;
  dateCreated: string; // Date
  user?: {
    dateJoined: string; // Date
    has2fa: boolean;
    hasPasswordAuth: boolean;
    isActive: boolean;
    isManaged: boolean;
    isStaff: boolean;
    isSuperuser: boolean;
    lastActive: string; // Date
    lastLogin: string; // Date
  };
  projects?: SentryProject[];
}

export interface SentryProjectIssue {
  id: string;
  shortId: string;
  title: string;
  culprit: string;
  permalink: string;
  level: string;
  status: string;
  isPublic: boolean;
  platform: string;
  project: {
    id: string;
    name: string;
    slug: string;
    platform: string;
  };
  type: string;
  metadata: {
    value: string;
    type: string;
    filename: string;
    function: string;
    display_title_with_tree_label: boolean;
  };
  numComments: number;
  isBookmarked: boolean;
  isSubscribed: boolean;
  hasSeen: boolean;
  issueType: string;
  issueCategory: string;
  isUnhandled: boolean;
  count: string;
  userCount: number;
  firstSeen: string;
  lastSeen: string;
  stats: {
    [key: string]: number[][];
  };
}

export interface SentryProjectEvent {
  id: string;
  'event.type': string;
  groupID: string;
  eventID: string;
  projectID: string;
  message: string;
  title: string;
  location: string;
  culprit: string;
  user: {
    id: string;
    email: string;
    ip_address: string;
  };
  tags: {
    key: string;
    value: string;
  }[];
  platform: string;
  dateCreated: string;
}
