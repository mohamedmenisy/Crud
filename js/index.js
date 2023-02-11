$('#HomeClick').click(function(){
    $('#home').fadeOut(1500,()=>{
        $('#ProduInp').fadeIn(2000)
    })
})   
new WOW().init();

let productName=document.getElementById('Pname');
let productPrice=document.getElementById('Pprice');
let productCateg=document.getElementById('Pcategory');
let productdesc=document.getElementById('Pdesc');
let addBtn=document.getElementById('addProduct');
let UpdateProduct=document.getElementById('UpdateProduct');
let allInputs=document.getElementsByClassName('form-control');
let ShowProduct=document.getElementById('ShowProduct');
let addProductNow=document.getElementById('addProductNow');
let searchInp=document.getElementById('searchInput');
let globalindex=0;
let products=[]
if(JSON.parse(localStorage.getItem('productlist'))!=null){
    products= JSON.parse(localStorage.getItem('productlist'));
    displayProduct()
}


addBtn.onclick=function(){
    productPrice.classList.remove('is-valid')
    productCateg.classList.remove('is-valid')
    productName.classList.remove('is-valid')
    
        addProduct()
        displayProduct()
        clearForm()
        addBtn.disabled='true'
        UpdateProduct.disabled='true'
    }


function addProduct(){
 let   product={
        name:productName.value,
        price:productPrice.value,
        category:productCateg.value,

    }
    if(productName.value!=''&productPrice.value!=''&productCateg.value!=''){
        products.push(product)
        localStorage.setItem('productlist',JSON.stringify(products));
       
    }else{
        addBtn.disabled='true'
    }
  
}
function displayProduct(){
    let box=''
    for(let i=0 ;i<products.length;i++){
     box+=`<div class="col-md-3">
        <div class="iteeem b-dark shadow  p-4 text-center">
        <p class="text-white ">Product Number: <span class="text-danger">${i+1}</span> </p>
        <p class="text-white">Product Name: <span class="text-danger">${products[i].name}</span> </p>
        <p class="text-white">Product Price: <span class="text-danger">${products[i].price}</span> </p>
        <p class="text-white">Product Category: <span class="text-danger">${products[i].category}</span> </p>
        <div class="text-end ">
        <button class="btn btn-success" onclick="getinfo(${i})" >UpDate</button>
        <button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button>
        </div>
        </div>
        </div>`
    }
    document.getElementById('productRow').innerHTML=box
}
function deleteProduct(index){
    products.splice(index,1)
    displayProduct()
    localStorage.setItem('productlist',JSON.stringify(products));
}
function clearForm(){
for(let i=0;i<allInputs.length;i++){
    allInputs[i].value=''
}
}

searchInp.onkeyup=function(){
    let box=''
    for(let i=0 ;i<products.length;i++){
        if(products[i].name.toLowerCase().includes(searchInp.value.toLowerCase())){

            box+=`<div class="col-md-3">
            <div class="iteeem b-dark shadow rounded-3 p-4">
            <p class="text-white ">Product Number: <span class="text-danger">${i+1}</span> </p>
            <p class="text-white">Product Name: <span class="text-danger">${products[i].name}</span> </p>
            <p class="text-white">Product Price: <span class="text-danger">${products[i].price}</span> </p>
            <p class="text-white">Product Category: <span class="text-danger">${products[i].category}</span> </p>
            <div class="text-end ">
            <button class="btn btn-success" >UpDate</button>
            <button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button>
            </div>
            </div>
            </div>`

        }
    
    }
    document.getElementById('productRow').innerHTML=box
}

function getinfo(index){
    $('#elproduct').fadeOut(1000,()=>{
        $('#ProduInp').fadeIn(1000)
    })
    globalindex=index;
    UpdateProduct.removeAttribute('disabled') 
  let currentProduct=products[index];
  productName.value=currentProduct.name;
  productPrice.value=currentProduct.price;
  productCateg.value=currentProduct.category;
  
}

UpdateProduct.onclick=function(){
    $('#ProduInp').fadeOut(1000,()=>{
        $('#elproduct').fadeIn(1000)
    })
  
    update()
    displayProduct()
    clearForm()
    addBtn.disabled='true'
    UpdateProduct.disabled='true'
}
function update(){
    let   product={
        name:productName.value,
        price:productPrice.value,
        category:productCateg.value,
    }
    products[globalindex]=product
    localStorage.setItem('productlist',JSON.stringify(products));

}


productName.onchange=function(){
    let nameRejex=/^[A-Z][a-z1-9](.|\s)*$/;
    if(nameRejex.test(productName.value)){
        productName.classList.add('is-valid')
        productName.classList.remove('is-invalid') 
    }else{
        productName.classList.add('is-invalid')
        productName.classList.remove('is-valid')
        $('.one').fadeIn(3000,()=>{
            $('.one').fadeOut(3000)
        })
    }
}

productPrice.onchange=function(){
    let nameRejex=/^[1-9][0-9][0-9]?[0-9]?$|10000$/;
    if(nameRejex.test(productPrice.value)){
        productPrice.classList.add('is-valid')
        productPrice.classList.remove('is-invalid')
        
    }else{
        productPrice.classList.add('is-invalid')
        productPrice.classList.remove('is-valid')
        $('.two').fadeIn(3000,()=>{
            $('.two').fadeOut(3000)
        })
    }
}


productCateg.onchange=function(){
    let nameRejex=/^[A-Z][a-z](.|\s)*$/;
    if(nameRejex.test(productCateg.value)){
        productCateg.classList.add('is-valid')
        productCateg.classList.remove('is-invalid')
       
        addBtn.removeAttribute('disabled')
    }else{
        productCateg.classList.add('is-invalid')
        productCateg.classList.remove('is-valid')
        $('.threee').fadeIn(3000,()=>{
            $('.threee').fadeOut(3000)
        })
    }
}

ShowProduct.onclick=function(){
    $('#ProduInp').fadeOut(1000,()=>{
        $('#elproduct').fadeIn(1000)
    })
}

addProductNow.onclick=function(){
    $('#elproduct').fadeOut(1000,()=>{
        $('#ProduInp').fadeIn(1000)
        productPrice.classList.remove('is-valid')
        productCateg.classList.remove('is-valid')
        productName.classList.remove('is-valid')
    })
}


