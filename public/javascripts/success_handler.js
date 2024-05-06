document.addEventListener('DOMContentLoaded',async()=>{
    const urlParams = new URLSearchParams(window.location.search);
    // Access a specific parameter by its name
    document.getElementById('order-code').innerHTML=`Order code: ${urlParams.get('orderCode')}`
    document.getElementById('status').innerHTML=`Status    : ${urlParams.get('status').toLowerCase()}`
    
    try{
        const res = await fetch(`http://localhost:3000/users/pay/${urlParams.get('id')}`,
            {
                method:'GET',
            }
        );

        const data = await res.json();
        console.log(data);

    }   catch(error){
        console.log(error);
    }


})


// User hits  continue button in checkout page
var continue_btn = document.getElementById('continue-btn');
continue_btn.addEventListener('click',async()=>{
    console.log("Continue button is pressed");

    const urlParams = new URLSearchParams(window.location.search);

    

    window.location.href = "https://drive.google.com/file/d/1DaoW9CH7ri29mHZ5Qtxl6uMo-wH3X4ol/view";

})

