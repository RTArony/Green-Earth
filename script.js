// all category load 
fetch("https://openapi.programming-hero.com/api/categories")
.then(res => res.json())
.then(data => catagoryNameDisplay(data.categories))

const catagoryNameDisplay = (categoryArray)=>{
    const parent= document.getElementById("category-name")
    for(let category of categoryArray){
        const newCategory= document.createElement('div');
        newCategory.innerHTML=`<p class="text-xl my-2 text-center">${category.category_name}</p>`
        parent.appendChild(newCategory)
    }
}


// all plants load 
fetch("https://openapi.programming-hero.com/api/plants")
.then(res=> res.json())
.then(data=> allPlantsShow(data.plants))

const allPlantsShow = (plants)=> {
    const parent =document.getElementById("plants-section")
    parent.innerHTML=""
    for(const plant of plants){
        console.log(plant)
        const plantCard=document.createElement('div')
        plantCard.innerHTML=`
                    <div class=" bg-white rounded-xl p-4 space-y-2">
                        <img class="h-100" src="${plant.image}" alt="">
                        <h3 class="font-bold text-xl">${plant.name}</h3>
                        <p class="text-gray-500">${plant.description}</p>
                        <div class="flex justify-between items-center">
                            <p class="bg-[#DCFCE7] text-[#15803D] font-bold rounded-full p-2">${plant.category}</p>
                            <p class="font-bold">$<span>${plant.price}</span></p>
                        </div>
                        <button class="bg-[#15803D] text-white font-semibold rounded-full p-2 w-full">Add to Cart</button>
                    </div>`
        parent.appendChild(plantCard)
    }
}