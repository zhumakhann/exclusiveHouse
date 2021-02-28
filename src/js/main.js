const houses = [{
        id: 1,
        price: 211591200,
        block: 'B',
        square: 214.14,
        image: 'plan-1.png',
        image3D: 'plan-13D.png',
        roomNum: 7,
        options: [{
                type: 'Terrain',
                cls: 'terass',
                descr: 'С террасой'
            },
            {
                type: 'Base',
                cls: 'base',
                descr: 'С цоколем'
            },
        ],
    },
    {
        id: 2,
        price: 231591200,
        block: 'C',
        square: 230.14,
        image: 'plan-1.png',
        image3D: 'plan-13D.png',
        roomNum: 2,
        options: [{
                type: 'Terrain',
                cls: 'terass',
                descr: 'С террасой'
            },
            {
                type: 'Land',
                cls: 'tree',
                descr: 'С участком'
            },
        ],
    },
    {
        id: 3,
        price: 181591200,
        block: 'A',
        square: 168.14,
        image: 'plan-1.png',
        image3D: 'plan-13D.png',
        roomNum: 5,
        options: [{
                type: 'Land',
                cls: 'tree',
                descr: 'С участком'
            },
            {
                type: 'Base',
                cls: 'base',
                descr: 'С цоколем'
            },
        ],
    },
    {
        id: 4,
        price: 181591200,
        block: 'A',
        square: 168.14,
        image: 'plan-1.png',
        image3D: 'plan-13D.png',
        roomNum: 4,
        options: [{
                type: 'Terrain',
                cls: 'terass',
                descr: 'С террасой'
            },
            {
                type: 'Land',
                cls: 'tree',
                descr: 'С участком'
            },
            {
                type: 'Base',
                cls: 'base',
                descr: 'С цоколем'
            },
        ],
    },
    {
        id: 5,
        price: 181591200,
        block: 'E',
        square: 168.14,
        image: 'plan-1.png',
        image3D: 'plan-13D.png',
        roomNum: 1,
        options: [{
                type: 'Terrain',
                cls: 'terass',
                descr: 'С террасой'
            },
            {
                type: 'Land',
                cls: 'tree',
                descr: 'С участком'
            },
            {
                type: 'Base',
                cls: 'base',
                descr: 'С цоколем'
            },
        ],
    },
]

let filterItems = []
let activeFilters = []
const filterNum = document.querySelector('.plan__aside-item__list-num'),
    filterSqr = document.querySelector('.plan__aside-item__list-sqr'),
    filters = document.querySelectorAll('.plan__aside'),
    popupOpen = document.querySelectorAll('.popup-open'),
    popup = document.querySelector('.popup'),
    popupClose = popup.querySelector('.popup__close'),
    changeBgButton = document.querySelectorAll('.change-bg-button'),
    tabBtn = document.querySelectorAll('.tab-btn'),
    planSlider = document.querySelector('.plan__slider'),
    header = document.querySelector('.header'),
    headerBurger = header.querySelector('.header__burger');

const generateOptions = (options) => {
    return options.map(option => {
        return `
        <p class="options__item ${option.cls}">${option.descr}</p>
        `
    })
}
const filterTemplate = (filter, type) => {
    if (type === 'sqr') {
        return `
            <li class="buttons__item plan__aside-item__list-item">
                <button class="buttons__item__item plan__aside-item__list-item__button">
                    <span>${filter}</span>м <sup>2</sup>
                </button>
            </li>
        `
    } else {
        return `
        <li class="buttons__item plan__aside-item__list-item">
            <button class="plan__aside-item__list-item__button">
               <span>${filter}</span>
            </button>
        </li>
        `
    }
}
const changeBgButtonClickHandler = (e) => {
    console.log(e.target);
    const parent = e.target.closest('section');
    const imgList = parent.querySelectorAll('.change-bg-list img');
    const buttons = parent.querySelectorAll('.change-bg-button');
    const selectedBtn = e.target.closest('.change-bg-button');
    let currentIndex;
    buttons.forEach((btn, i) => {
        btn.parentNode.classList.remove('buttons__item--active')
        btn === selectedBtn ? currentIndex = i : ''
    })
    imgList.forEach(img => {
        img.classList.remove('active')
    })
    imgList[currentIndex].classList.add('active');
    buttons[currentIndex].parentNode.classList.add('buttons__item--active');
}
const generateFilters = (parent, filter, type) => {
    let filters = houses.map(item => {
        return item[filter]
    })
    filters = [...new Set(filters)]
    filters.sort((a, b) => a - b)
    let fragment = '';
    filters.forEach(item => {
        fragment += filterTemplate(item, type);
    })
    parent.innerHTML = fragment
}
const generateCheckbox = (arr) => {
    let fragment = ''
    const options = arr.map(check => check.options);
    let checkboxes = []
    options.map(check => {
        return check.map(option => checkboxes.push([option.cls, option.descr]))
    })
    checkboxes = Array.from(new Set(checkboxes.map(JSON.stringify)), JSON.parse)
    console.log(checkboxes);
    checkboxes.forEach((check, i) => {
        fragment += `
                <li class="buttons__item plan__aside-item__list-item">
                    <div class="check">
                        <input type="checkbox" class="check__input" id="${check}-${i}" data-key="${check[0]}">
                        <label for="${check}-${i}" class="check__label">${check[1]}</label>
                    </div>
                </li>
            `
    })
    const parent = document.querySelector('.plan__aside-item__list-check');
    parent.innerHTML = fragment;
}
const layoutTemplate = item => {
    const optionsTemplate = generateOptions(item.options);
    return `
    <div class="swiper-slide plan__content-item" id="${item.id}">
        <div class="plan__content-item__wrapper">
            <ul class="plan__content-item__content">
                <li class="plan__content-item__content-item">
                    <p class="plan__content-item__content-item__title">Площадь</p>
                    <p class="plan__content-item__content-item__value">${item.square} м2</p>
                </li>
                <li class="plan__content-item__content-item">
                    <p class="plan__content-item__content-item__title">Блок</p>
                    <p class="plan__content-item__content-item__value">${item.block}</p>
                </li>
                <li class="plan__content-item__content-item">
                    <p class="plan__content-item__content-item__title">Цена</p>
                    <p class="plan__content-item__content-item__value">${item.price.toLocaleString('ru', 'RU')} ₸</p>
                </li>
                <li class="plan__content-item__content-item options">
                    ${optionsTemplate}
                </li>
            </ul>
            <div class="plan__content-item__img">
                <img class="active" src="images/${item.image}" alt="img">
                <img src="images/${item.image3D}" alt="img">
            </div>
        </div>
        <ul class="plan__content-item__bottom">
            <li class="plan__content-item__bottom-item">
                <p class="plan__content-item__bottom-item__text">
                    Понравилась квартира?
                </p>
                <button class="main-button plan__content-item__bottom-item__button red popup-open">
                    Заказать звонок
                </button>
            </li>
            <li class="plan__content-item__bottom-item">
                <button class="plan__content-item__bottom-item__button">
                    Скачать планировку
                </button>
            </li>
        </ul>
        <div class="plan__content-item__toggle">
            <span class="plan__content-item__toggle-text">2D</span>
            <label class="plan__content-item__toggle-label" for="item-${item.id}">
              <input class="plan__content-item__toggle-checkbox" type="checkbox" id="item-${item.id}">
              <div class="plan__content-item__toggle-button"></div>
            </label>
            <span class="plan__content-item__toggle-text">3D</span>
        </div>
    </div>
    `
}
const layoutClickHandler = e => {
    console.log(e.target);
    if(e.target.closest('.plan__content-item__toggle')){
        const parent = e.target.closest('.plan__content-item');
        const check = parent.querySelector('.plan__content-item__toggle-checkbox').checked;
        const images = parent.querySelectorAll('.plan__content-item__img img');
        images.forEach(img => img.classList.remove('active'))
        if(check){
            images[1].classList.add('active')
        }else{
            images[0].classList.add('active')
        }
    }
}
const generateLayout = (arr = []) => {
    let fragment = '';
    arr.forEach(house => {
        fragment += layoutTemplate(house)
    });
    const parent = document.querySelector('.plan__content');
    const slider = document.querySelector('.swiper-container');
    console.log(slider);
    parent.innerHTML = fragment
    const layouts = new Swiper(planSlider, {
        // Optional parameters
        slidesPerView: 1,
        spaceBetween: 20,
    });
            
}
const tabClickHandler = (e) => {
    const parent = e.target.closest('section');
    const tabs = parent.querySelectorAll('.tab-items__item');
    const tabBtns = parent.querySelectorAll('.tab-btn');
    let currentIndex;
    tabBtns.forEach((btn, i) => {
        btn.parentNode.classList.remove('buttons__item--active')
        btn === e.target ? currentIndex = i : ''
    })
    tabs.forEach(tab => {
        tab.classList.remove('contacts__map-item--active')
    })
    tabs[currentIndex].classList.add('contacts__map-item--active');
    tabBtns[currentIndex].parentNode.classList.add('buttons__item--active');
}
const filterClickHandler = (e) => {
    if (e.target.closest('.plan__aside-item__list') && !e.target.closest('.plan__aside-item__list').classList.contains('plan__aside-item__list-check')) {
        if (e.target.closest('.plan__aside-item__list-item__button')) {
            const item = e.target.closest('.plan__aside-item__list-item');
            if (item.classList.contains('buttons__item--active')) {
                item.classList.remove('buttons__item--active')
            } else {
                item.classList.add('buttons__item--active')
            }
            const parent = e.target.closest('.plan__aside');
            const activeButtons = parent.querySelectorAll('.buttons__item--active span');
            console.log(activeButtons);
            activeButtons.forEach(item => {
                activeFilters.push(+item.textContent);
            })
            console.log(activeFilters);
            filterHouses(activeFilters)
        }
    } else if (e.target.closest('.plan__aside-item__list').classList.contains('plan__aside-item__list-check')) {
        const inputs = document.querySelectorAll('.check__input');
        const activeInputs = []
        inputs.forEach(input => {
            if (input.checked) {
                const parent = input.closest('.check');
                const value = parent.querySelector('label').textContent;
                activeInputs.push(value)
            }
        })
        console.log(activeInputs);
        filterHouses(activeInputs, 'check')
    }
}
const filterHouses = (arr, type) => {
    let filteredHouses = [];
    arr.forEach(item => {
        return houses.forEach(house => {
            if (type === 'check') {
                //  = []
                const options = house.options.map(option => option.descr);
                options.includes(item) && !filteredHouses.includes(house) && filteredHouses.push(house)

            } else {
                (house.roomNum === item || house.square === item) && filteredHouses.push(house)

            }
        })
    })
    filteredHouses.length < 1 ? generateLayout(houses) : generateLayout(filteredHouses)
    console.log(filteredHouses);
}
const handleScroll = () => {
    
    if (window.scrollY > 0) {
        header.classList.add('active');
    } else {
        header.classList.remove('active');

    }
}
document.addEventListener('DOMContentLoaded', () => {
    generateFilters(filterNum, 'roomNum')
    generateFilters(filterSqr, 'square', 'sqr')
    generateLayout(houses)
    generateCheckbox(houses)
    changeBgButton.forEach(button => {
        console.log(button);
        button.addEventListener('click', (e) => changeBgButtonClickHandler(e))
    })
    tabBtn.forEach(btn => {
        btn.addEventListener('click', (e) => tabClickHandler(e))
    })
    popupOpen.forEach(button => {
        button.addEventListener('click', () => {
            popup.classList.add('popup--active');
        })
    })
    headerBurger.addEventListener('click', () => {
        const nav = header.querySelector('.header__nav')
        const contactsBtn = header.querySelector('.header__contacts-button')
        header.classList.toggle('active-navbar');
        nav.classList.toggle('active');
        contactsBtn.classList.toggle('active');
        headerBurger.classList.toggle('active');
    })
    planSlider.addEventListener('click', (e) => layoutClickHandler(e))
    popupClose.addEventListener('click', () => {
            popup.classList.remove('popup--active');
        })
    const gallerySlider = new Swiper('.gallery-slider', {
        // Optional parameters
        loop: false,
        slidesPerView: 1.5,
        spaceBetween: 80,
        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (index + 1) + '</span>';
              },
        },
    });
    const otherSlider = new Swiper('.other-slider', {
        // Optional parameters
        loop: false,
        slidesPerView: 3.5,
        spaceBetween: 80,
    });
    window.addEventListener('scroll', handleScroll)
    filters.forEach(filter => {
        filter.addEventListener('click', (e) => filterClickHandler(e))
    })

})