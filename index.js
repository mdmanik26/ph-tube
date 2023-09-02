const loadData = async () => {
    const promise = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await promise.json();
    const categories = data.data;
    

    const tabsContainer = document.getElementById('tabs_Container')
    categories.forEach(category => {
        
        const div = document.createElement('div');
        div.classList = `text-center bg-slate-200 text-black-400 text-lg px-5 py-2 rounded-lg hover:bg-red-600 `
        div.innerHTML = `
        <a onclick="loadCards('${category.category_id}')" class="tab hover:text-white ">${category.category}</a>
        `;
        tabsContainer.appendChild(div);

    });
}


let dataForSort = null;

const loadCards = async (categoryId) => {
    const promise2 = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await promise2.json();
    const cards = data.data;
    
    dataForSort = cards



    if (dataForSort.length > 0 ) {

        const cardsContainer = document.getElementById('cards_Container');
        cardsContainer.textContent = '';
        cardsContainer.classList = `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 px-2`

        dataForSort.forEach(card => {

            const totalSeconds = card.others.posted_date;
            const hours = Math.floor(totalSeconds / 3600)
            const minutes = Math.floor((totalSeconds % 3600) / 60)

            const cards2 = document.createElement('div');
            cards2.innerHTML = `
            
            <div class="card mx-auto">

            <div class="relative rounded-lg">
                <img class="rounded-lg w-[410px] h-[200px] md:w-[380px]  md:h-[200px] lg:w-[360px]  lg:h-[200px]" src="${card.thumbnail}"
                    alt="" />

               
 <p class="bg-black px-2  rounded-lg absolute right-2 bottom-2 text-sm text-white">
 ${card?.others?.posted_date == '' ? '' : hours + 'hrs ' + minutes + ' min ago'}</p>
                
            </div>

            <div class="flex gap-3 my-4 px-2">

                <div class="w-10 h-10 rounded-full border overflow-hidden">
                    <img class="h-full w-full" src="${card?.authors[0]?.profile_picture}" alt="" />
                </div>

                <div class="space-y-2 py-1">
                    <h1 class="text-base font-bold">${card?.title}</h1>
                    
                    <div class="flex gap-2 items-center">
                    <h1 class="text-sm text-slate-400">${card?.authors[0]?.profile_name}</h1>
                    <h1 class="text-sm text-slate-400">${card?.authors[0]?.verified == '' || card?.authors[0]?.verified == false ? '' : `<svg  xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <g clip-path="url(#clip0_13_960)">
                      <path d="M19.375 10.0001C19.375 10.8001 18.3922 11.4595 18.1953 12.197C17.9922 12.9595 18.5063 14.022 18.1203 14.6892C17.7281 15.3673 16.5484 15.4486 15.9984 15.9986C15.4484 16.5486 15.3672 17.7282 14.6891 18.1204C14.0219 18.5064 12.9594 17.9923 12.1969 18.1954C11.4594 18.3923 10.8 19.3751 10 19.3751C9.2 19.3751 8.54062 18.3923 7.80312 18.1954C7.04062 17.9923 5.97813 18.5064 5.31094 18.1204C4.63281 17.7282 4.55156 16.5486 4.00156 15.9986C3.45156 15.4486 2.27187 15.3673 1.87969 14.6892C1.49375 14.022 2.00781 12.9595 1.80469 12.197C1.60781 11.4595 0.625 10.8001 0.625 10.0001C0.625 9.20012 1.60781 8.54075 1.80469 7.80325C2.00781 7.04075 1.49375 5.97825 1.87969 5.31106C2.27187 4.63293 3.45156 4.55168 4.00156 4.00168C4.55156 3.45168 4.63281 2.272 5.31094 1.87981C5.97813 1.49387 7.04062 2.00793 7.80312 1.80481C8.54062 1.60793 9.2 0.625122 10 0.625122C10.8 0.625122 11.4594 1.60793 12.1969 1.80481C12.9594 2.00793 14.0219 1.49387 14.6891 1.87981C15.3672 2.272 15.4484 3.45168 15.9984 4.00168C16.5484 4.55168 17.7281 4.63293 18.1203 5.31106C18.5063 5.97825 17.9922 7.04075 18.1953 7.80325C18.3922 8.54075 19.375 9.20012 19.375 10.0001Z" fill="#2568EF"/>
                      <path d="M12.7094 7.20637L9.14065 10.7751L7.29065 8.92669C6.88909 8.52512 6.23752 8.52512 5.83596 8.92669C5.4344 9.32825 5.4344 9.97981 5.83596 10.3814L8.43127 12.9767C8.8219 13.3673 9.45627 13.3673 9.8469 12.9767L14.1625 8.66106C14.5641 8.2595 14.5641 7.60794 14.1625 7.20637C13.761 6.80481 13.111 6.80481 12.7094 7.20637Z" fill="#FFFCEE"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_13_960">
                        <rect width="20" height="20" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>`}</h1>
                   
                    </div>
                    <h1 class="text-sm text-slate-400">${card?.others?.views}</h1>
                </div>

            </div>



        </div>
            
            `

            cardsContainer.appendChild(cards2)


        });
    }
    else {
        const cardsContainer = document.getElementById('cards_Container');
        cardsContainer.textContent = '';
        cardsContainer.classList = `min-h-[calc(100vh-200px)] flex justify-center items-center`
        
        cardsContainer.innerHTML = `
        <div class="max-w-[500px] mx-auto text-center">
                <div class="max-w-[100px] mx-auto">
                    <img src="./images/no_videos.png" alt="">
                </div>
                <p class="font-bold text-4xl mt-6">Oops!! Sorry, There is no content here</p>
            </div>
        `
}
}

const sortHandler = () => {

    dataForSort.sort((a, b) => {
        const A = parseFloat(a.others.views.slice(0, -1));
        const B = parseFloat(b.others.views.slice(0, -1));

        return B - A;


    });
    if (dataForSort.length > 0 ) {

        const cardsContainer = document.getElementById('cards_Container');
        cardsContainer.textContent = '';
        cardsContainer.classList = `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 px-2`

        dataForSort.forEach(card => {

            const totalSeconds = card.others.posted_date;
            const hours = Math.floor(totalSeconds / 3600)
            const minutes = Math.floor((totalSeconds % 3600) / 60)

            const cards2 = document.createElement('div');
            cards2.innerHTML = `
            
            <div class="card mx-auto">

            <div class="relative rounded-lg">
                <img class="rounded-lg w-[410px] h-[200px] md:w-[380px]  md:h-[200px] lg:w-[360px]  lg:h-[200px]" src="${card.thumbnail}"
                    alt="" />

               
 <p class="bg-black px-2  rounded-lg absolute right-2 bottom-2 text-sm text-white">
 ${card?.others?.posted_date == '' ? '' : hours + 'hrs ' + minutes + ' min ago'}</p>
                
            </div>

            <div class="flex gap-3 my-4 px-2">

                <div class="w-10 h-10 rounded-full border overflow-hidden">
                    <img class="h-full w-full" src="${card?.authors[0]?.profile_picture}" alt="" />
                </div>

                <div class="space-y-2 py-1">
                    <h1 class="text-base font-bold">${card?.title}</h1>
                    
                    <div class="flex gap-2 items-center">
                    <h1 class="text-sm text-slate-400">${card?.authors[0]?.profile_name}</h1>
                    <h1 class="text-sm text-slate-400">${card?.authors[0]?.verified == '' || card?.authors[0]?.verified == false ? '' : `<svg  xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <g clip-path="url(#clip0_13_960)">
                      <path d="M19.375 10.0001C19.375 10.8001 18.3922 11.4595 18.1953 12.197C17.9922 12.9595 18.5063 14.022 18.1203 14.6892C17.7281 15.3673 16.5484 15.4486 15.9984 15.9986C15.4484 16.5486 15.3672 17.7282 14.6891 18.1204C14.0219 18.5064 12.9594 17.9923 12.1969 18.1954C11.4594 18.3923 10.8 19.3751 10 19.3751C9.2 19.3751 8.54062 18.3923 7.80312 18.1954C7.04062 17.9923 5.97813 18.5064 5.31094 18.1204C4.63281 17.7282 4.55156 16.5486 4.00156 15.9986C3.45156 15.4486 2.27187 15.3673 1.87969 14.6892C1.49375 14.022 2.00781 12.9595 1.80469 12.197C1.60781 11.4595 0.625 10.8001 0.625 10.0001C0.625 9.20012 1.60781 8.54075 1.80469 7.80325C2.00781 7.04075 1.49375 5.97825 1.87969 5.31106C2.27187 4.63293 3.45156 4.55168 4.00156 4.00168C4.55156 3.45168 4.63281 2.272 5.31094 1.87981C5.97813 1.49387 7.04062 2.00793 7.80312 1.80481C8.54062 1.60793 9.2 0.625122 10 0.625122C10.8 0.625122 11.4594 1.60793 12.1969 1.80481C12.9594 2.00793 14.0219 1.49387 14.6891 1.87981C15.3672 2.272 15.4484 3.45168 15.9984 4.00168C16.5484 4.55168 17.7281 4.63293 18.1203 5.31106C18.5063 5.97825 17.9922 7.04075 18.1953 7.80325C18.3922 8.54075 19.375 9.20012 19.375 10.0001Z" fill="#2568EF"/>
                      <path d="M12.7094 7.20637L9.14065 10.7751L7.29065 8.92669C6.88909 8.52512 6.23752 8.52512 5.83596 8.92669C5.4344 9.32825 5.4344 9.97981 5.83596 10.3814L8.43127 12.9767C8.8219 13.3673 9.45627 13.3673 9.8469 12.9767L14.1625 8.66106C14.5641 8.2595 14.5641 7.60794 14.1625 7.20637C13.761 6.80481 13.111 6.80481 12.7094 7.20637Z" fill="#FFFCEE"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_13_960">
                        <rect width="20" height="20" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>`}</h1>
                   
                    </div>
                    <h1 class="text-sm text-slate-400">${card?.others?.views}</h1>
                </div>

            </div>



        </div>
            
            `

            cardsContainer.appendChild(cards2)


        });
    }
    else {
        const cardsContainer = document.getElementById('cards_Container');
        cardsContainer.textContent = '';
        cardsContainer.classList = `min-h-[calc(100vh-200px)] flex justify-center items-center`
        

        cardsContainer.innerHTML = `
        <div class="max-w-[500px] mx-auto text-center">
                <div class="max-w-[100px] mx-auto">
                    <img src="./images/no_videos.png" alt="">
                </div>
                <p class="font-bold text-4xl mt-6">Oops!! Sorry, There is no content here</p>
            </div>
        `
}
    console.log(dataForSort)

}








loadCards("1000")
loadData()
