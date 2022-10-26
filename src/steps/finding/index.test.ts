import { executeStepWithDependencies } from '@jupiterone/integration-sdk-testing';
import { buildStepTestConfigForStep } from '../../../test/config';
import { Recording, setupSentryRecording } from '../../../test/recording';
import { Steps } from '../constants';

// See test/README.md for details
let recording: Recording;
afterEach(async () => {
  await recording.stop();
});

test('fetch-project-issues', async () => {
  recording = setupSentryRecording({
    directory: __dirname,
    name: 'fetch-project-issues',
  });

  const stepConfig = buildStepTestConfigForStep(Steps.ISSUES);
  const stepResult = await executeStepWithDependencies(stepConfig);
  expect(stepResult).toMatchStepMetadata(stepConfig);
});

test('fetch-project-events', async () => {
  recording = setupSentryRecording({
    directory: __dirname,
    name: 'fetch-project-events',
  });

  const stepConfig = buildStepTestConfigForStep(Steps.EVENTS);
  const stepResult = await executeStepWithDependencies(stepConfig);
  expect(stepResult).toMatchStepMetadata(stepConfig);
});
