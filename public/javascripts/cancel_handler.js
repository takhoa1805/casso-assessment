document.addEventListener('DOMContentLoaded',async()=>{
    const urlParams = new URLSearchParams(window.location.search);
    // Access a specific parameter by its name
    const value = urlParams.get('id');
    // console.log(value);
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