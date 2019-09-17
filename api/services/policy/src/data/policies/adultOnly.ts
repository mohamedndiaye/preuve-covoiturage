import { RetributionRuleInterface } from '@pdc/provider-schema';

export const adultOnly: RetributionRuleInterface = {
  slug: 'adult_only',
  description: "La politique n'est applicable qu'aux personnes majeurs",
  schema: {
    type: 'boolean',
    const: true,
  },
  formula: '',
};
