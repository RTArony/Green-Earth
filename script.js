// all category load 
fetch("https://openapi.programming-hero.com/api/categories")
.then(res => res.json())
.then(data => catagoryNameDisplay(data.categories))

const catagoryNameDisplay = (categoryArray)=>{
    const parent= document.getElementById("category-name")
    for(let category of categoryArray){
        const newCategory= document.createElement('div');
        newCategory.innerHTML=`<p onClick="categoryPlantShow(${category.id})" class="text-xl my-2 text-center">${category.category_name}</p>`
        parent.appendChild(newCategory)
    }
    
}

// all plants load 
fetch("https://openapi.programming-hero.com/api/plants")
.then(res=> res.json())
.then(data=> PlantsShow(data.plants))

const PlantsShow = (plants)=> {
    const parent =document.getElementById("plants-section")
    parent.innerHTML=""
    for(const plant of plants){
        const plantCard=document.createElement('div')
        plantCard.innerHTML=`
                    <div class=" bg-white rounded-xl p-4 space-y-2">
                        <img class="h-100" src="${plant.image}" alt="">
                        <button onclick="loadPlantDetails(${plant.id})" class="font-bold text-xl">${plant.name}</button>
                        <p class="text-gray-500">${plant.description}</p>
                        <div class="flex justify-between items-center">
                            <p class="bg-[#DCFCE7] text-[#15803D] font-bold rounded-full p-2">${plant.category}</p>
                            <p class="font-bold">$<span>${plant.price}</span></p>
                        </div>
                        <button onclick="addTocart(${plant.price},'${plant.name}', ${plant.id})" class="bg-[#15803D] text-white font-semibold rounded-full p-2 w-full">Add to Cart</button>
                    </div>`
        parent.appendChild(plantCard)
    }
}


// category based plant show 
const categoryPlantShow=(id)=>{
    const url= `https://openapi.programming-hero.com/api/category/${id}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>PlantsShow(data.plants))
}

// all tree button work
document.getElementById("all-tree-btn").addEventListener("click", ()=>{
    fetch("https://openapi.programming-hero.com/api/plants")
    .then(res=> res.json())
    .then(data=> PlantsShow(data.plants))
})


// plats details with modal
const loadPlantDetails=(id)=>{
    fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then(res=>res.json())
    .then(data=>showPlantDetails(data.plants))
}

const showPlantDetails=(plant)=>{
    const parent=document.getElementById("tree-details")
    parent.innerHTML=`<p class="font-bold text-xl">Product id: <span>${plant.id}</span></p>
                    <img class="h-100" src="${plant.image}" alt="">
                    <button class="font-bold text-xl">${plant.name}</button>
                    <p class="text-gray-500">${plant.description}</p>
                    <div class="flex justify-between items-center">
                        <p class="bg-[#DCFCE7] text-[#15803D] font-bold rounded-full p-2">${plant.category}</p>
                        <p class="font-bold">$<span>${plant.price}</span></p>
                    </div>
                    <div class="modal-action">
                    <form method="dialog">
                        <!-- if there is a button in form, it will close the modal -->
                        <button class="btn">Close</button>
                    </form>
                    </div>`
    document.getElementById("my_modal_1").showModal()
}

let totalPrice=0
const addTocart=(price,name,id)=>{
    const parent =document.getElementById("cart-container")
    const newitem=document.createElement('div')
    newitem.innerHTML=`<div class="flex justify-between items-center bg-[#F0FDF4] m-3 p-2 rounded-lg">
                            <div>
                                <p class="font-bold text-xl">${name}</p>
                                <p class="text-gray-500 text-lg">$ ${price} </p>
                            </div>
                            <div>
                                <button id="cross-btn${id}" class="text-gray-500 text-xl">✕</button>
                            </div>
                        </div>`
    parent.appendChild(newitem)
    totalPrice += price
    const totalPriceShow = document.getElementById("total-price")
    totalPriceShow.innerText = totalPrice

    document.getElementById(`cross-btn${id}`).addEventListener("click",()=>{
        parent.removeChild(newitem)
        totalPrice -= price
        const totalPriceShow = document.getElementById("total-price")
        totalPriceShow.innerText = totalPrice
    })
}

