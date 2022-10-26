import {
  createIntegrationEntity,
  createDirectRelationship,
  Entity,
  RelationshipClass,
  Relationship,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';

import { Entities } from '../constants';
import { SentryTeam, SentryProject, SentryUser } from '../../types';

export function createSentryTeamEntity(team: SentryTeam) {
  return createIntegrationEntity({
    entityData: {
      source: team,
      assign: {
        _key: `sentry-team-${team.id}`,
        _type: Entities.TEAM._type,
        _class: Entities.TEAM._class,
        name: team.name,
        slug: team.slug,
      },
    },
  });
}

export function createSentryProjectEntity(
  organizationSlug: string,
  project: SentryProject,
) {
  return createIntegrationEntity({
    entityData: {
      source: { ...project, organizationSlug },
      assign: {
        _key: `sentry-project-${project.id}`,
        _type: Entities.PROJECT._type,
        _class: Entities.PROJECT._class,
        id: project.id,
        name: project.name,
        slug: project.slug,
        isBookmarked: project.isBookmarked,
        isMember: project.isMember,
        hasAccess: project.hasAccess,
        createdOn: parseTimePropertyValue(project.dateCreated),
        eventProcessingSymbolicationDegraded:
          project.eventProcessing.symbolicationDegraded,
        features: project.features,
        firstTransactionEvent: project.firstTransactionEvent,
        hasSessions: project.hasSessions,
        hasProfiles: project.hasProfiles,
        platform: project.platform,
        hasUserReports: project.hasUserReports,
        organization: organizationSlug,
      },
    },
  });
}

export function createSentryUserEntity(user: SentryUser) {
  return createIntegrationEntity({
    entityData: {
      source: user,
      assign: {
        _key: `sentry-user-${user.id}`,
        _type: Entities.MEMBER._type,
        _class: Entities.MEMBER._class,
        createdOn: parseTimePropertyValue(user.dateCreated),
        username: user.email,
        role: user.role,
        mfaEnabled: user.user ? user.user.has2fa === true : false,
        active: user.user ? user.user.isActive === true : false,
        isManaged: user.user ? user.user.isManaged === true : false,
        isStaff: user.user ? user.user.isStaff === true : false,
        isSuperuser: user.user ? user.user.isSuperuser === true : false,
        dateJoined: user.user
          ? parseTimePropertyValue(user.user.dateJoined)
          : 0,
        lastActive: user.user
          ? parseTimePropertyValue(user.user.lastActive)
          : 0,
        lastLogin: user.user ? parseTimePropertyValue(user.user.lastLogin) : 0,
      },
    },
  });
}

export function createSentryTeamRelationship(
  organization: Entity,
  team: Entity,
): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.HAS,
    from: organization,
    to: team,
  });
}

export function createSentryProjectRelationship(
  organization: Entity,
  project: Entity,
): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.HAS,
    from: organization,
    to: project,
  });
}

export function createSentryUserRelationship(
  entity: Entity,
  user: Entity,
): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.HAS,
    from: entity,
    to: user,
  });
}

export function createSentryTeamAssignedProjectRelationship(
  team: Entity,
  project: Entity,
): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.ASSIGNED,
    from: team,
    to: project,
  });
}
