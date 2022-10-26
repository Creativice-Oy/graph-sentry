import {
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';
import { SentryProjectEvent, SentryProjectIssue } from '../../types';

import { Entities } from '../constants';

export function createIssueEntity(issue: SentryProjectIssue): Entity {
  return createIntegrationEntity({
    entityData: {
      source: issue,
      assign: {
        _key: `sentry-issue-${issue.id}`,
        _type: Entities.ISSUE._type,
        _class: Entities.ISSUE._class,
        name: issue.title,
        id: issue.id,
        shortId: issue.shortId,
        culprit: issue.culprit,
        webLink: issue.permalink,
        level: issue.level,
        status: issue.status,
        platform: issue.platform,
        projectId: issue.project.id,
        projectName: issue.project.name,
        projectSlug: issue.project.slug,
        projectPlatform: issue.project.platform,
        type: issue.type,
        metadataValue: issue.metadata.value,
        metadataType: issue.metadata.type,
        metadataFilename: issue.metadata.filename,
        metadataFunction: issue.metadata.function,
        numComments: issue.numComments,
        isBookmarked: issue.isBookmarked,
        isSubscribed: issue.isSubscribed,
        hasSeen: issue.hasSeen,
        issueType: issue.issueType,
        issueCategory: issue.issueCategory,
        isUnhandled: issue.isUnhandled,
        count: issue.count,
        userCount: issue.userCount,
        firstSeenOn: parseTimePropertyValue(issue.firstSeen),
        lastSeenOn: parseTimePropertyValue(issue.lastSeen),
        category: 'application',
        severity: 'informational',
        numericSeverity: 1,
        open: issue.isPublic,
      },
    },
  });
}

export function createEventEntity(event: SentryProjectEvent): Entity {
  const newEvent: Partial<SentryProjectEvent> = { ...event };
  const type = newEvent['event.type'];
  delete newEvent['event.type'];
  delete newEvent.tags;

  return createIntegrationEntity({
    entityData: {
      source: newEvent,
      assign: {
        _key: `sentry-event-${newEvent.id}`,
        _type: Entities.EVENT._type,
        _class: Entities.EVENT._class,
        id: newEvent.id,
        type,
        groupId: newEvent.groupID,
        eventId: newEvent.eventID,
        projectId: newEvent.projectID,
        message: newEvent.message,
        name: newEvent.title,
        location: newEvent.location,
        culprit: newEvent.culprit,
        userId: newEvent.user?.id,
        userEmail: newEvent.user?.email,
        userIpAddress: newEvent.user?.ip_address,
        platform: newEvent.platform,
        createdOn: parseTimePropertyValue(newEvent.dateCreated),
        category: 'General Incident',
        severity: type === 'error' ? 'critical' : 'minor',
        reportable: false,
      },
    },
  });
}
