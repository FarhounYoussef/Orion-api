import moment from 'moment';
import crypto from 'crypto';

export const getOrderMail = async ({
  commande,
  client,
  preview64,
}) => ({
  templateId: 1,
  to: [
    {
      email: client.email,
      fullname: `${client.firstname} ${client.lastname}`,
    },
  ],
  subject: 'Orion: YOUR NIGHT SKY',
  params: {
    NOM: client.firstname,
    PRENOM: client.lastname,
    TIME_LIMIT: '15',
    TOTAL_PRICE: `${commande.price} MAD`,
    ORDER_NUM: commande.ref,
    ORDER_DATE: moment(commande.createdAt).format('YYYY-MM-DD'),
    IMAGE_PREVIEW: preview64,
  },
});

export const getDraftOrderMail = async ({
  commande,
  client,
  preview64,
}) => {
  return {
    templateId: 2,
    to: [
      {
        email: client.email,
        fullname: `${client.firstname} ${client.lastname}`,
      },
    ],
    subject: 'Orion: YOUR NIGHT SKY',
    params: {
      NOM: client.firstname,
      PRENOM: client.lastname,
      IMAGE_PREVIEW: preview64,
      EDIT_URL: `${process.env.WEB_URL}/map?ref=${commande.ref}`,
    },
  };
};

const iv = crypto.randomBytes(16);

export const encrypt = (text) => {
  const cipher = crypto.createCipheriv(
    'aes-256-ctr',
    process.env.REF_SECRET_KEY,
    iv,
  );

  const encrypted = Buffer.concat([
    cipher.update(text),
    cipher.final(),
  ]);

  return {
    iv: iv.toString('hex'),
    content: encrypted.toString('hex'),
  };
};

export const decrypt = (hash) => {
  const decipher = crypto.createDecipheriv(
    'algorithm',
    process.env.REF_SECRET_KEY,
    Buffer.from(hash.iv, 'hex'),
  );

  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, 'hex')),
    decipher.final(),
  ]);

  return decrpyted.toString();
};
