import wixPaymentProviderBackend from "wix-payment-provider-backend";
import { ok, badRequest } from "wix-http-functions";
import { createHmac } from 'crypto';

// An endpoint for receiving updates about transactions.
export async function post_btcpayTrxWebHook(request) {

  const req = await request.body.json();

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
          wixTransactionId: req.metadata.wixTxId
        };

  switch (req.type) {
    case "InvoiceReceivedPayment":
    case "InvoiceProcessing":
      trx.reasonCode = 5009;
      break;
    case "InvoicePaymentSettled":
      trx.pluginTransactionId = req.invoiceId + "|" + req.metadata.currency + "|" + req.paymentMethod;
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

  	 fetch("https://webhook.site/bd7c682d-51e3-41b5-a7ab-830cab2bd00c", {
        method: 'post',
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(trx)
    });
  
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

 /* let ret = {
    keyValue:key,
    msg:message,
    sign:signature,
    hash:hashString
  }

        fetch("https://webhook.site/e1e5683c-2f89-4542-968a-2d3e97dbf76b", {
        method: 'post',
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(ret)
    });*/


  return hashString === signature;
}
