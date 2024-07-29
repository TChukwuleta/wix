import * as paymentProvider from 'interfaces-psp-v1-payment-service-provider';

/** @returns {import('interfaces-psp-v1-payment-service-provider').PaymentServiceProviderConfig} */
export function getConfig() {
return {
  title: 'Bitcoin payments',
  paymentMethods: [{
    hostedPage: {
      title: 'Bitcoin Payments with BTCPay',
      billingAddressMandatoryFields: [],
      logos: {
        white: {
          svg: 'https://logosandtypes.com/wp-content/uploads/2024/02/btcpay.svg',
          png: 'https://avatars.githubusercontent.com/u/31132886?s=200&v=4'
        },
        colored: {
          svg: 'https://logosandtypes.com/wp-content/uploads/2024/02/btcpay.svg',
          png: 'https://avatars.githubusercontent.com/u/31132886?s=200&v=4'
        }
      }
    }
  }],
  credentialsFields: [{
    simpleField: {
      name: 'btcpayUrl',
      label: 'BTCPay Url'
    }
  }, 
  {
    simpleField: {
      name: 'apiKey',
      label: 'API Key'
    }
  },
    {
    simpleField: {
      name: 'storeId',
      label: 'Store ID'
    }
  },
    {
    simpleField: {
      name: 'webhookSecret',
      label: 'Webhook Secret'
    }
  }]
}}
