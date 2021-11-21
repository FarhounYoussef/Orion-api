import SibApiV3Sdk from 'sib-api-v3-sdk';

const defaultClient = SibApiV3Sdk.ApiClient.instance;

const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.SEND_IN_BLUE_APIKEY;

const partnerKey = defaultClient.authentications['partner-key'];
partnerKey.apiKey = process.env.SEND_IN_BLUE_APIKEY;

const transactionalApi = new SibApiV3Sdk.TransactionalEmailsApi();

export const sendEmail = async ({
  to,
  params,
  subject,
  templateId,
}) => {
  const sendEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendEmail.to = to;
  sendEmail.params = params;
  sendEmail.subject = subject;
  sendEmail.templateId = templateId;

  const emailResult = await transactionalApi.sendTransacEmail(
    sendEmail,
  );
};
