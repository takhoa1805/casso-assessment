const express = require('express');
const router = express.Router();
const PayOS = require('@payos/node');

// CREATE PAYMENT LINK AND NAVIGATE TO THAT PAGE
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


// GET PAYMENT INFORMATION
router.get('/pay/:id',async(req,res,next) =>{
  try{
    const id = req.params.id;
    const payOS = new PayOS(process.env.PAYOS_CLIENT_ID, 
      process.env.PAYOS_API_KEY, 
      process.env.PAYOS_CHECKSUM_KEY);

    const paymentLink = await payOS.getPaymentLinkInformation(id);

    
    return res.json(paymentLink);
  
  } catch(error){
    console.log(error);
  }
})

// RETURN AN ORDER ID'S STATUS
router.get('/verify/:id',async(req,res) =>{
  try{
    const id = req.params.id;
    const url = `https://api-merchant.payos.vn/v2/payment-requests/${id}`;

    if (!id){
      res.json({isValid:false})
    }

    fetch(`https://api-merchant.payos.vn/v2/payment-requests/${id}`,{
      method:'GET',
      headers:{
        "x-client-id":`${process.env.PAYOS_CLIENT_ID}`,
        "x-api-key":`${process.env.PAYOS_API_KEY}`
      }
    })    
      .then(response => response.json())
      .then(response => {
        return res.json({ status:response.data.status});
      })
      .catch(error=>{
        console.log("Error happens: "+error);
        return res.json({error:error});
      });


  } catch(error){
    console.log("Error happens: " + error);
  }
  
})


// VERIFY ORDER ID AND NAVIGATE TO DOWNLOAD LINK
router.get('/link/:id',async(req,res) =>{
  try{
    const id = req.params.id;

    if (!id){
      res.json({isValid:false})
    }

    fetch(`https://api-merchant.payos.vn/v2/payment-requests/${id}`,{
      method:'GET',
      headers:{
        "x-client-id":`${process.env.PAYOS_CLIENT_ID}`,
        "x-api-key":`${process.env.PAYOS_API_KEY}`
      }
    })    
      .then(response => response.json())
      .then(response => {

        if (!response.data.status){
          res.redirect('/');
          return;
        }

        if (response.data.status === 'PAID'){
          console.log("this is called");
          res.redirect("https://drive.google.com/file/d/1DaoW9CH7ri29mHZ5Qtxl6uMo-wH3X4ol/view");
          return;
        } else{
          res.redirect('/');
          return;
        };

      })
      .catch(error=>{
        console.log("Error happens: "+error);
        res.redirect('/');
        return res.json({error:error});
      });


  } catch(error){
    console.log("Error happens: " + error);
    res.redirect('/');
    return res.json({error:error});
  }
  
})
module.exports = router;
