const elGridListBtn = getElem('.grid__list-btn');
const elGridCardBtn = getElem('.grid__grid-btn');


// Render heder
const elTemplate = getElem('#template').content
let elCardList = getElem('.card__list');


function renderHouses(arr, element){
    element.innerHTML = null
    
    arr.forEach(home =>{
        const cloneTemplate = elTemplate.cloneNode(true);
        
        const elCards = document.querySelectorAll('.card', cloneTemplate);
        elCards.forEach(card =>{
            elGridListBtn.addEventListener('click', ()=> {
                card.classList.add('card-active')
                card.classList.remove('card')
            })
            
            elGridCardBtn.addEventListener('click', ()=> {
                card.classList.remove('card-active')
                card.classList.add('card')
            })
        })
        
        let elCardImg = getElem('.card-img', cloneTemplate).src = home.img 
        let elCArdTitle = getElem('.card-title', cloneTemplate).textContent = home.title
        let elCardAddress = getElem('.card-date', cloneTemplate).textContent = home.address
        let elCardPrice = getElem('.card-cost', cloneTemplate).textContent = home.price + ' $'
        let elCardBtn = getElem('.card-button', cloneTemplate)
        
        elCardBtn.addEventListener('click', () =>{
            elCardBtn.classList.toggle('card-button--active')
        })
        
        element.appendChild(cloneTemplate)
    })
}
renderHouses(homes, elCardList)


// search filter 
const elForm = getElem('#filter__form');

let elSearch = getElem('#search');
let elSelectTip = getElem('#select-tip');
let elSelectCost = getElem('#cost');
let elSelectRoom = getElem('#room');
let elSelectArea = getElem('#area');
let elSelectFloor = getElem('#floor');
let selectRoom = [];
let selectTip = [];
let selectCost = [];
let selectArea = [];
let selectFloor = [];


function renderSearch(array, element){
    array.forEach(arr =>{
        
        //filtr function 
        
        function filters(array, element){
            array.forEach(numberRoom =>{
                if(!element.includes(numberRoom)){
                    element.push(numberRoom)
                }
            })
        }
        filters(arr.numberOfRooms, selectRoom)
        filters(arr.type, selectTip)
        filters(arr.price, selectCost)
        filters(arr.square, selectArea)
        filters(arr.floor, selectFloor)
    })
    // renderFilter 
    
    function  renderFilters(array, element){
        array.sort((a, b) => a - b)
        array.forEach(room =>{
            let newoption = creatElem('option');
            newoption.value = room;
            newoption.textContent = room;
            element.appendChild(newoption)
        })
    }
    renderFilters(selectTip, elSelectTip)
    renderFilters(selectCost, elSelectCost)
    renderFilters(selectArea, elSelectArea)
    renderFilters(selectRoom, elSelectRoom)
    renderFilters(selectFloor, elSelectFloor)
}
renderSearch(homes, elSelectRoom);


const elSearchInput = getElem('#search');
let overHouse = []
let roomArr = []

elSearchInput.addEventListener('keyup', (e)=>{
    e.preventDefault()
    let searchValue = elSearch.value.trim()
    
    let regex = new RegExp(searchValue, 'gi')
    
    roomArr = homes.filter(home => home.title.match(regex))
    

    if(!searchValue == ''){
        overHouse = roomArr
    }
    
    renderHouses(overHouse, elCardList)
})

const elFilterForm = getElem('#filter__form')

elFilterForm.addEventListener('change', ()=>{
    if(!elSelectTip.value === 'hammasi'){
        overHouse = roomArr.filter(home => home.type.includes(elSelectTip.value))
        console.log(roomArr)
    }
    renderHouses(overHouse, elCardList)
})