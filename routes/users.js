const express = require('express');
const router = express.Router();
const PayOS = require('@payos/node');


/* GET users listing. */
router.post('/pay', async (req, res, next)=> {
  const body ={
    orderCode: Number(String(Date.now()).slice(-6)),
    amount: 10000,
    description: 'Processing on order',
    returnUrl: `${process.env.DOMAIN}/success`,
    cancelUrl: `${process.env.DOMAIN}/fail`
  }
  
  try{
    const payOS = new PayOS(process.env.PAYOS_CLIENT_ID, 
                      process.env.PAYOS_API_KEY, 
                      process.env.PAYOS_CHECKSUM_KEY);

    const paymentLinkResponse = await payOS.createPaymentLink(body);
    res.redirect(paymentLinkResponse.checkoutUrl);
  } catch(error) {
    console.log("Error happens: " + error);
    res.send("Error happens: " + error);
  }


});

module.exports = router;
