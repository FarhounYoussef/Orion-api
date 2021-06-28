import userResolvers from './user';
import commandeResolvers from './commande';
import commandeHistoryResolvers from './commandeHistory';
import configResolvers from './config';

export default [
    userResolvers,
    configResolvers,
    commandeResolvers,
    commandeHistoryResolvers,
];
