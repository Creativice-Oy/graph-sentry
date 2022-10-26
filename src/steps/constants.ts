import {
  RelationshipClass,
  StepEntityMetadata,
  StepRelationshipMetadata,
} from '@jupiterone/integration-sdk-core';

export const Steps = {
  ORGANIZATIONS: 'fetch-organization',
  TEAMS: 'fetch-teams',
  TEAMS_ASSIGNED_PROJECT: 'fetch-teams-assignments',
  PROJECTS: 'fetch-projects',
  USERS: 'fetch-members',
  USER_MEMBERSHIP: 'fetch-teams-members',
  ISSUES: 'fetch-project-issues',
  EVENTS: 'fetch-project-events',
};

export const Entities: Record<
  'ORGANIZATION' | 'TEAM' | 'PROJECT' | 'MEMBER' | 'ISSUE' | 'EVENT',
  StepEntityMetadata
> = {
  ORGANIZATION: {
    resourceName: 'Organization',
    _type: 'sentry_organization',
    _class: ['Account'],
  },
  TEAM: {
    resourceName: 'Team',
    _type: 'sentry_team',
    _class: ['UserGroup'],
  },
  PROJECT: {
    resourceName: 'Project',
    _type: 'sentry_project',
    _class: ['Project'],
  },
  MEMBER: {
    resourceName: 'Member',
    _type: 'sentry_member',
    _class: ['User'],
  },
  ISSUE: {
    resourceName: 'Issue',
    _type: 'sentry_issue',
    _class: ['Problem'],
  },
  EVENT: {
    resourceName: 'Event',
    _type: 'sentry_event',
    _class: ['Incident'],
  },
};

export const Relationships: Record<
  | 'ORGANIZATION_HAS_TEAM'
  | 'ORGANIZATION_HAS_PROJECT'
  | 'ORGANIZATION_HAS_USER'
  | 'TEAM_ASSIGNED_PROJECT'
  | 'PROJECT_HAS_ISSUE'
  | 'PROJECT_HAS_EVENT'
  | 'TEAM_HAS_USER',
  StepRelationshipMetadata
> = {
  ORGANIZATION_HAS_TEAM: {
    _type: 'sentry_organization_has_team',
    sourceType: Entities.ORGANIZATION._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.TEAM._type,
  },
  ORGANIZATION_HAS_PROJECT: {
    _type: 'sentry_organization_has_project',
    sourceType: Entities.ORGANIZATION._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.PROJECT._type,
  },
  ORGANIZATION_HAS_USER: {
    _type: 'sentry_organization_has_member',
    sourceType: Entities.ORGANIZATION._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.MEMBER._type,
  },
  TEAM_ASSIGNED_PROJECT: {
    _type: 'sentry_team_assigned_project',
    sourceType: Entities.TEAM._type,
    _class: RelationshipClass.ASSIGNED,
    targetType: Entities.PROJECT._type,
  },
  TEAM_HAS_USER: {
    _type: 'sentry_team_has_member',
    sourceType: Entities.TEAM._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.MEMBER._type,
  },
  PROJECT_HAS_EVENT: {
    _type: 'sentry_project_has_event',
    sourceType: Entities.PROJECT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.EVENT._type,
  },
  PROJECT_HAS_ISSUE: {
    _type: 'sentry_project_has_issue',
    sourceType: Entities.PROJECT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.ISSUE._type,
  },
};
