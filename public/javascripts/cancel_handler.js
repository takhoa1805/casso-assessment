document.addEventListener('DOMContentLoaded',()=>{
    const urlParams = new URLSearchParams(window.location.search);
    // Access a specific parameter by its name
    const value = urlParams.get('id');
    console.log(value);
    document.getElementById('order-code').innerHTML=`Order code: ${urlParams.get('orderCode')}`
    document.getElementById('status').innerHTML=`Status    : ${urlParams.get('status').toLowerCase()}`
    
})