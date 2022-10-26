import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const findingSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: /api/0/projects/{orgSlug}/{projectSlug}/issues/
     * PATTERN: Fetch Child Entites
     */
    id: 'fetch-project-issues',
    name: 'Fetch Project Issues',
    entities: [
      {
        resourceName: 'Issue',
        _type: 'sentry_issue',
        _class: ['Problem'],
      },
    ],
    relationships: [
      {
        _type: 'sentry_project_has_issue',
        sourceType: 'sentry_project',
        _class: RelationshipClass.HAS,
        targetType: 'sentry_issue',
      },
    ],
    dependsOn: ['fetch-projects'],
    implemented: true,
  },
  {
    /**
     * ENDPOINT: /api/0/projects/{orgSlug}/{projectSlug}/events/
     * PATTERN: Fetch Child Entites
     */
    id: 'fetch-project-events',
    name: 'Fetch Project Events',
    entities: [
      {
        resourceName: 'Event',
        _type: 'sentry_event',
        _class: ['Incident'],
      },
    ],
    relationships: [
      {
        _type: 'sentry_project_has_event',
        sourceType: 'sentry_project',
        _class: RelationshipClass.HAS,
        targetType: 'sentry_event',
      },
    ],
    dependsOn: ['fetch-projects'],
    implemented: true,
  },
];
