const VERIFY_URL = `https://casso-assessment.onrender.com/users/verify`;

document.addEventListener('DOMContentLoaded',async()=>{
    // GET PARAMS 
    const urlParams = new URLSearchParams(window.location.search);

    // If there is no param
    if (urlParams.size === 0){
        window.alert("You are not authorized to access this page");
        window.location.href = '/';
        return;
    }

    // Check if orderid is valid
    if (!urlParams.get('id')){
        window.alert("Invalid access");
        window.location.href='/';
        return;
    }   else{
        try{
        const res = await fetch(`${VERIFY_URL}/${urlParams.get('id')}`,{
            method:'GET',
        });

        const data = await res.json();

        if (data.status !=='PAID'){
            window.alert("Invalid order");
            window.location.href='/';
            return;
        }

        }   catch(error){
            window.alert("Error happens");
            window.location.href='/';
            return;
        }

    }

    // Display information
    document.getElementById('order-code').innerHTML=`Order code: ${urlParams.get('orderCode')}`
    document.getElementById('status').innerHTML=`Status    : ${urlParams.get('status').toLowerCase()}`
    

})


// User hits  continue button in checkout page
var continue_btn = document.getElementById('continue-btn');
continue_btn.addEventListener('click',async()=>{
    const urlParams = new URLSearchParams(window.location.search);

    // Navigate to final verification and go to download page
    window.location.href = `/users/link/${urlParams.get('id')}`;

})

