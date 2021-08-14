import commandeResolvers from './commande';
import commandeHistoryResolvers from './commandeHistory';
import configResolvers from './config';
import priceResolvers from './price';
import userResolvers from './user';

export default [
  userResolvers,
  configResolvers,
  commandeResolvers,
  commandeHistoryResolvers,
  priceResolvers,
];
