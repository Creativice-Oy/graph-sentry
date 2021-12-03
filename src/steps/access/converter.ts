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

export function createSentryProjectEntity(project: SentryProject) {
  return createIntegrationEntity({
    entityData: {
      source: project,
      assign: {
        _key: `sentry-project-${project.id}`,
        _type: Entities.PROJECT._type,
        _class: Entities.PROJECT._class,
        name: project.name,
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
        mfaEnabled: user.user.has2fa,
        active: user.user.isActive === true,
        isManaged: user.user.isManaged === true,
        isStaff: user.user.isStaff === true,
        isSuperuser: user.user.isSuperuser === true,
        dateJoined: parseTimePropertyValue(user.user.dateJoined),
        lastActive: parseTimePropertyValue(user.user.lastActive),
        lastLogin: parseTimePropertyValue(user.user.lastLogin),
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
