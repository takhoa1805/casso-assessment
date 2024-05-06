const express = require('express');
const router = express.Router();
const PayOS = require('@payos/node');


/* GET users listing. */
router.post('/pay', async (req, res, next)=> {
  const body ={
    "orderCode": Number(String(Date.now()).slice(-6)),
    "amount": 10000,
    "description": 'Processing on order',
    "returnUrl": `${process.env.DOMAIN}/success`,
    "cancelUrl": `${process.env.DOMAIN}/cancel`,
    "buyerName": "Nguyen Van A",
    "buyerEmail": "buyer-email@gmail.com",
    "buyerPhone": "090xxxxxxx",
  }
  console.log(process.env.DOMAIN);
  
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


router.get('/pay/:id',async(req,res,next) =>{
  try{
    const id = req.params.id;
    const payOS = new PayOS(process.env.PAYOS_CLIENT_ID, 
      process.env.PAYOS_API_KEY, 
      process.env.PAYOS_CHECKSUM_KEY);

    const paymentLink = await payOS.getPaymentLinkInformation(id);

    console.log("this is order id: " + paymentLink); 
    
    return res.json(paymentLink);
  
  } catch(error){
    console.log(error);
  }
})

router.post('/receive-hook',async(req,res) => {
  console.log(req.body);
  return res.send("Hello world");
})


router.post('/verification/:id',async(req,res) =>{
  const id = req.params.id;
  const payOS = new PayOS(process.env.PAYOS_CLIENT_ID, 
    process.env.PAYOS_API_KEY, 
    process.env.PAYOS_CHECKSUM_KEY);
  
  const webhookUrl = 'https://casso-assessment.onrender.com/users/receive-hook';

  try{

  } catch(error){
    console.error(error);
    return res.json({
      error: -1,
      message: "failed",
      data: null,
    });
  }
  
})

module.exports = router;
