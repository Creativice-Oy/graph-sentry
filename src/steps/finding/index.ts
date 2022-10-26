import {
  createDirectRelationship,
  getRawData,
  IntegrationStep,
  IntegrationStepExecutionContext,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';

import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { SentryProject } from '../../types';
import { Entities, Relationships, Steps } from '../constants';
import { createEventEntity, createIssueEntity } from './converter';

export async function fetchProjectIssues({
  instance,
  logger,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  await jobState.iterateEntities(
    { _type: Entities.PROJECT._type },
    async (projectEntity) => {
      const project = getRawData<SentryProject & { organizationSlug: string }>(
        projectEntity,
      );

      if (!project) {
        logger.warn(`Can not get raw data for entity ${projectEntity._key}`);
        return;
      }

      await apiClient.iterateProjectIssues(
        project?.organizationSlug,
        project?.slug,
        async (issue) => {
          const issueEntity = await jobState.addEntity(
            createIssueEntity(issue),
          );

          await jobState.addRelationship(
            createDirectRelationship({
              _class: RelationshipClass.HAS,
              from: projectEntity,
              to: issueEntity,
            }),
          );
        },
      );
    },
  );
}

export async function fetchProjectEvents({
  instance,
  logger,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  await jobState.iterateEntities(
    { _type: Entities.PROJECT._type },
    async (projectEntity) => {
      const project = getRawData<SentryProject & { organizationSlug: string }>(
        projectEntity,
      );

      if (!project) {
        logger.warn(`Can not get raw data for entity ${projectEntity._key}`);
        return;
      }

      await apiClient.iterateProjectEvents(
        project?.organizationSlug,
        project?.slug,
        async (event) => {
          const eventEntity = await jobState.addEntity(
            createEventEntity(event),
          );

          await jobState.addRelationship(
            createDirectRelationship({
              _class: RelationshipClass.HAS,
              from: projectEntity,
              to: eventEntity,
            }),
          );
        },
      );
    },
  );
}

export const findingSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.ISSUES,
    name: 'Fetch Project Issues',
    entities: [Entities.ISSUE],
    relationships: [Relationships.PROJECT_HAS_ISSUE],
    dependsOn: [Steps.PROJECTS],
    executionHandler: fetchProjectIssues,
  },
  {
    id: Steps.EVENTS,
    name: 'Fetch Project Events',
    entities: [Entities.EVENT],
    relationships: [Relationships.PROJECT_HAS_EVENT],
    dependsOn: [Steps.PROJECTS],
    executionHandler: fetchProjectEvents,
  },
];
