import { PubSub } from 'apollo-server';

import * as EVENT_SUBSCRIPTIONS from './event';

export const SUBSCRIPTIONS = {
  EVENT: EVENT_SUBSCRIPTIONS,
};

export default new PubSub();