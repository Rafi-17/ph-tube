const handleCategory=async()=>{
    const res=await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data=await res.json();
    
    const category=data.data;
    loadTabs(category);
}

const loadTabs=(category)=>{
    const tabContainer=document.getElementById('tab-container');
    category.forEach(category=>{
        const div=document.createElement('div');
        div.innerHTML=`
        <a onclick="handleLoadCategory('${category.category_id}')" class="tab bg-[#25252533] px-4 rounded-sm">${category.category}</a>
        `;
        tabContainer.appendChild(div);
    })
}

const handleLoadCategory=async(categoryId)=>{
    const res=await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data=await res.json();
    const vacantContainer=document.getElementById('vacant-container');
    const cardContainer=document.getElementById('card-container');
    vacantContainer.innerHTML='';
    cardContainer.innerHTML='';
    let hrs,mins,dateNotNull;
    let arr=data.data;
    if(arr.length===0){
        const div=document.createElement('div');
        div.innerHTML=`
        <img class="mx-auto" src="images/Icon.png" alt="">
        <h3 class="font-bold text-3xl mt-4">Oops!! Sorry, There is no <br> content here</h3>
        `;
        vacantContainer.appendChild(div);
    }
    arr.forEach((info)=>{
        const div=document.createElement('div');
        let isVerified=info.authors[0].verified;
        let postDate=info.others.posted_date;
        if(postDate!=''){
            hrs=parseInt(postDate/3600);
            mins=parseInt((postDate%3600)/60);
            dateNotNull=true;
        }
        else{
            dateNotNull=false;
        }
        div.innerHTML=`
        <div class="card1">
                    <img class="w-96 h-56" src=${info.thumbnail} alt="">             
                    <p class="bg-black text-white relative w-max rounded-sm text-center px-2 bottom-6 left-64 text-[10px]">${dateNotNull ? `${hrs}hrs ${mins}min ago` : ''}</p>
                    <div class="flex mt-5">
                        <div>
                            <div class="avatar">
                                <div class="rounded-full w-14">
                                    <img class="" src=${info.authors[0].profile_picture} alt="">
                                </div>
                            </div>
                        </div>
                        <div class="my-auto ml-3 mt-2">
                            <h3 class="font-bold">${info.title}</h3>
                            <div class="flex">
                                <p class="text-[#171717B2] text-sm mr-1">${info.authors[0].profile_name}</p>
                                <p>${isVerified ? '<img src="images/verified.png" alt=""></img>' : ''}</p>
                                
                                
                                
                            </div>
                            <p class="text-[#171717B2] text-sm">${info.others.views} views</p>
                        </div>
                    </div>
                </div>
        `;
        cardContainer.appendChild(div);
    })
}




const handleBlog=()=>{
    window.location.href="blog.html";
}

handleCategory();
handleLoadCategory('1000',false);
