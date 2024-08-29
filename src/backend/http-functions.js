import wixPaymentProviderBackend from "wix-payment-provider-backend";
import { ok, badRequest } from "wix-http-functions";
import { createHmac } from 'crypto';
import { getOrder } from 'wix-stores-backend';

// An endpoint for receiving updates about transactions.
export async function post_btcpayTrxWebHook(request) {

  const req = await request.body.json();
  try {
    // Récupérer la commande à partir de l'ID de la commande
    const order = await getOrder(10023);
    
    if (order) {
     await fetch("https://webhook.site/7d4e773f-5b68-48ec-a87a-b9e3406dff0a", {
        method: 'post',
        body: JSON.stringify(order)
    });
    } else {
     await fetch("https://webhook.site/7d4e773f-5b68-48ec-a87a-b9e3406dff0a", {
        method: 'post',
        body: JSON.stringify(req)
    }
  } catch (error) {
     await fetch("https://webhook.site/7d4e773f-5b68-48ec-a87a-b9e3406dff0a", {
        method: 'post',
        body: JSON.stringify(error)
  }
  return;

  const validTypes = ["InvoiceProcessing", "InvoiceSettled", "InvoiceReceivedPayment", "InvoicePaymentSettled", "InvoiceExpired", "InvoiceInvalid"];
  if (req.invoiceId.startsWith("__test__") || !validTypes.includes(req.type)) {
    return ok();
  }

  let rawBody =  await request.body.text();

  const headerBtcPaySecret = request.headers["btcpay-sig"].split('=')[1];
  if (!checkSecretKey(req.metadata.wixAdditionalId, rawBody, headerBtcPaySecret)) {
    return badRequest();
  }

  var trx = {
          wixTransactionId: req.metadata.wixTxId,
          pluginTransactionId: req.invoiceId + "|" + req.metadata.currency + "|" + req.metadata.buyerEmail
        };

  switch (req.type) {
    case "InvoiceReceivedPayment":
    case "InvoiceProcessing":
    case "InvoicePaymentSettled":
      trx.reasonCode = 5009;
      break;
    case "InvoiceExpired":
      trx.reasonCode = 3035;
      trx.errorCode = "Expired";
      trx.errorMessage = "An invoice expired";
      break;
    case "InvoiceInvalid":
      trx.reasonCode = 3000;
      trx.errorCode = "Invalid";
      trx.errorMessage = "An invoice became invalid";
      break;
  }
  
  await wixPaymentProviderBackend.submitEvent({
    event: {
      transaction: trx,
    },
  });
  return ok();
}

// An endpoint for receiving updates about refunds.
export async function post_updateRefund(request) {}

function checkSecretKey(key, message, signature) {
  const hmac = createHmac('sha256', key);
  hmac.update(message);
  const hashBytes = hmac.digest();

  let hashString = '';
  for (const byte of hashBytes) {
    hashString += ('0' + byte.toString(16)).slice(-2);
  }
  
  return hashString === signature;
}
