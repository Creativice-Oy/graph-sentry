import { accessSteps } from './access';
import { organizationSteps } from './account';
import { findingSteps } from './finding';

const integrationSteps = [
  ...organizationSteps,
  ...accessSteps,
  ...findingSteps,
];

export { integrationSteps };
