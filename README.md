# BTCPay Server integration for Wix

This guide will show you how you can enable Bitcoin payments using BTCPay Server on your Wix store. At the time of writing it is not possible to package this into a Wix app, so you will need to follow the steps below and copy and paste the code into your Wix editor.

## Requirements
- You have a [Wix](https://wix.com) account and online store up and running
- You have a BTCPay Server version 1.10.0 or later, either [self-hosted](https://docs.btcpayserver.org/Deployment/) or [hosted by a third-party](https://docs.btcpayserver.org/Deployment/ThirdPartyHosting/)
- [You've a registered account on the instance](https://docs.btcpayserver.org/RegisterAccount/)
- [You've a BTCPay store on the instance](https://docs.btcpayserver.org/CreateStore/)
- [You've a wallet connected to your store](https://docs.btcpayserver.org/WalletSetup/) and/or [Lightning Network](https://docs.btcpayserver.org/LightningNetwork/) enabled or connected.

## Create a payment service provider plugin (PSPP) 

1. In your Wix site, open your Wix Editor.
2. At the top click on "Dev Mode" and the "Turn on Dev Mode" button to enable the developer mode.
![Dev Mode](./docs/images/01_wix_dev-mode.png)
3. Now on the left side, click on the `{ }` icon to open the code editor.
4. In the section "Service Plugins" click on the (+) sign and select "Payment"
![Add payment provider service plugin](./docs/images/02_wix_service-plugin-payment.png)
5. On the following screen, click "Start now"
![Start now](./docs/images/03_wix_ppsp-start-now.png)
6. On the legal terms page, check the terms and click "Accept"
![Accept terms](./docs/images/04_wix_ppsp-legal-notice.png)
7. Now enter the name of the plugin: "BTCPay" (you can use any name but this will make it easier to follow the guide). Then, click "Add & Edit Code":
![Add & Edit Code](./docs/images/05_wix_ppsp-name.png)
8. This created the directory "BTCPay" containing two files: `BTCPay.js` and `BTCPay-config.js` which is open in the editor. 
![BTCPay-config.js](./docs/images/06_wix_ppsp-btcpay-config.png)
9. Next steps are to copy the contents of those two files from our [Git repository](https://github.com/btcpayserver/wix). You can see the same data structure as on your wix editor. In the `BTCPay-config.js` file, paste the code from the same file on our Git repository: [BTCPay-config.js](https://github.com/btcpayserver/wix/blob/main/backend/service-plugins/payment-provider/BTCPay/BTCPay-config.js). Easiest to click the "Copy raw file" icon. 
![BTCPay-config.js](./docs/images/07_wix_gh-btcpay-config.png)
10. Make sure you delete example code on the `BTCPay-config.js` file in the wix editor before pasting the new code.
![BTCPay-config.js completed](./docs/images/08_wix_ppsp-btcpay-config-complete.png)
11. Now, open the `BTCPay.js` file in the wix editor and paste the code from our Git repository: [BTCPay.js](https://github.com/btcpayserver/wix/blob/main/backend/service-plugins/payment-provider/BTCPay/BTCPay.js). Do not forget to remove all the example code from the file before pasting the copied code.
![BTCPay.js](./docs/images/09_wix_gh-btcpay.png)
![BTCPay.js](./docs/images/10_wix_ppsp-btcpay.png)
12. Now we need to add the `http-functions.js` file to the `backend` directory. To do so, in the "backend" section of your editor click again on the (+) icon and select "Expose Site API" which creates the mentioned `http-functions.js` file. Note: If you already have that file present then you can skip this step.
![Create http-functions.js](./docs/images/11_wix_backend-expose-site-api.png)
13. Copy the code from our Git repository: [http-functions.js](https://github.com/btcpayserver/wix/blob/main/backend/http-functions.js). If you already had a http-functions.js file, make sure to add the code from the Git repository to the existing file add the copied code below the existing code. If not then make sure you delete all the example code before pasting the code from Github.
![http-functions.js](./docs/images/12_wix_backend-http-functions.png)
14. Now the code is done it is important to click on publish to save the changes and make the plugin available.

## Configure the payment service provider plugin (PSPP)
1. Go back to your site's dashboard. On the left menu click on "Settings", on that page click "Accept Payments"
![Settings](./docs/images/13_wix_settings.png)
![Accept Payments](./docs/images/14_wix_accept-payments.png)
2. On the following page, you should see "Bitcoin Payments with BTCPay" as payment provider. If not, try to refresh the page to clear the Wix cache. Click on "Connect"
![BTCPay](./docs/images/15_wix_list-btcpay.png)
3. 