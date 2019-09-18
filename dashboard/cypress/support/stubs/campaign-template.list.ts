import { TemplateInterface } from '../../../src/app/core/interfaces/campaign/templateInterface';
import { CampaignStatusEnum } from '../../../src/app/core/enums/campaign/campaign-status.enum';
import { IncentiveUnitEnum } from '../../../src/app/core/enums/campaign/incentive-unit.enum';
import { TripClassEnum } from '../../../src/app/core/enums/trip/trip-class.enum';
import { campaignStubs } from './campaign.list';

export const campaignTemplateStubs: TemplateInterface[] = [
  {
    template_id: '5d6930724f56e6e1d0654542',
    status: CampaignStatusEnum.TEMPLATE,
    name: 'Encourager le covoiturage',
    description: 'Cras quis nulla commodo, aliquam lectus sed, blandit augue.',
    rules: {
      weekday: [0, 1, 2, 3, 4, 5, 6],
      time: [
        {
          start: '08:00',
          end: '19:00',
        },
      ],
      range: [0, 100],
      ranks: [TripClassEnum.A, TripClassEnum.B],
      onlyAdult: false,
      forDriver: true,
      forPassenger: true,
      forTrip: false,
      operatorIds: [],
    },
    start: null,
    end: null,
    max_trips: null,
    max_amount: null,
    amount_unit: IncentiveUnitEnum.EUR,
    restrictions: [],
    formula_expression: '',
    formulas: [],
    expertMode: false,
  },
  {
    template_id: '5d69319a9763dc801ea78de7',
    status: CampaignStatusEnum.TEMPLATE,
    name: 'Limiter le trafic en semaine',
    description: 'Fusce vehicula dolor arcu, sit amet blandit dolor mollis.',
    rules: {
      weekday: [0, 1, 2, 3, 4],
      time: [
        {
          start: '06:00',
          end: '09:00',
        },
        {
          start: '16:00',
          end: '19:00',
        },
      ],
      range: [0, 15],
      ranks: [TripClassEnum.A, TripClassEnum.B, TripClassEnum.C],
      onlyAdult: false,
      forDriver: true,
      forPassenger: true,
      forTrip: false,
      operatorIds: [],
    },
    start: null,
    end: null,
    max_trips: null,
    max_amount: null,
    amount_unit: IncentiveUnitEnum.EUR,
    restrictions: [],
    formula_expression: '',
    formulas: [],
    expertMode: false,
  },
  {
    template_id: '3',
    status: CampaignStatusEnum.TEMPLATE,
    name: 'Limiter la pollution',
    description: 'Cras quis nulla commodo, aliquam lectus sed, blandit augue.',
    rules: {
      weekday: [0],
      time: [],
      range: [0, 15],
      ranks: [],
      onlyAdult: false,
      forDriver: true,
      forPassenger: true,
      forTrip: false,
      operatorIds: [],
    },
    start: null,
    end: null,
    max_trips: null,
    max_amount: null,
    amount_unit: IncentiveUnitEnum.EUR,
    restrictions: [],
    formula_expression: '',
    formulas: [],
    expertMode: false,
  },
];

export function stubCampaignTemplateList() {
  cy.route({
    method: 'POST',
    url: '/rpc?methods=campaign:listTemplates',
    response: (data) => ({
      payload: {
        data: [
          {
            id: 1568215196898,
            jsonrpc: '2.0',
            result: campaignTemplateStubs,
          },
        ],
      },
    }),
  });
}