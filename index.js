const loadData = async () => {
    const promise = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await promise.json();
    const categories = data.data;
    // console.log(categories)

    const tabsContainer = document.getElementById('tabs_Container')
    categories.forEach(category => {
        // console.log(category.category)
        const div = document.createElement('div');
        div.classList = `text-center bg-slate-200 text-black-400 text-lg px-5 py-2 rounded-lg hover:bg-red-600 `
        div.innerHTML = `
        <a onclick="loadCards('${category.category_id}')" class="tab hover:text-white ">${category.category}</a>
        `;
        tabsContainer.appendChild(div);

    });
}


const loadCards = async (categoryId) => {
    const promise2 = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await promise2.json();
    const cards = data.data;
    console.log(cards)

    if (cards.length === 0) {
        const cardsContainer = document.getElementById('cards_Container');
        cardsContainer.textContent = '';
        cardsContainer.classList = `min-h-[calc(100vh-200px)] flex justify-center items-center`
        // console.log(cardsContainer)

        cardsContainer.innerHTML = `
        <div class="max-w-[500px] mx-auto text-center">
                <div class="max-w-[100px] mx-auto">
                    <img src="./images/no_videos.png" alt="">
                </div>
                <p class="font-bold text-4xl mt-6">Oops!! Sorry, There is no content here</p>
            </div>
        `
    }
    else {
        const cardsContainer = document.getElementById('cards_Container');
        cardsContainer.textContent = '';
        cardsContainer.classList = `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 px-2`
        cards.forEach(card => {

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
                    
                    <div class="flex gap-4 items-center">
                    <h1 class="text-sm text-slate-400">${card?.authors[0]?.profile_name}</h1>
                   
                    </div>
                    <h1 class="text-sm text-slate-400">${card?.others?.views}</h1>
                </div>

            </div>



        </div>
            
            `
            cardsContainer.appendChild(cards2)
        });


        //  function sorting(){
        //     cards.sort((a, b) => {

        //         const viewsA = parseFloat(a.others.views.slice(0, -1)); // Convert views to a numeric value
        //         const viewsB = parseFloat(b.others.views.slice(0, -1)); // Convert views to a numeric value


        //         return viewsA - viewsB; // Sort in descending order

        //       });
        //  }

        //   console.log(cards);

    }

}






loadCards("1000")
loadData()