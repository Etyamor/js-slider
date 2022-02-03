const pictures = [
    'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg'
];

const wrapper = document.getElementById("container");
renderSlides(pictures);

function renderSlides (pictures) {
    const imgList = document.createElement('ul');
    imgList.classList.add("image-list")
    imgList.setAttribute("id", "image-list");
    wrapper.appendChild(imgList);

    pictures.map((item, index) => {
       let itemImg =  `<li class="image-item ${index === 0 ? 'active' : '' }" data-index= ${index}>
                       <img class="slide-img" src= ${item} alt="image">
                       </li>`;

         imgList.innerHTML += itemImg;
    });

    wrapButtons();
}

function wrapButtons () {
    const buttonWrapper = document.createElement("div");
    buttonWrapper.classList.add("button-wrapper");
    buttonWrapper.append(createButton(["btn", "left-btn", "fas", "fa-chevron-left"]));
    buttonWrapper.append(createButton(["btn", "right-btn", "fas", "fa-chevron-right"]));
    wrapper.append(buttonWrapper);
}

function createButton (btnClass) {
    const button = document.createElement("button");
    const icon = document.createElement("i");
    button.classList.add(...btnClass);
    button.appendChild(icon);
    return button;
}


 let positionInd = 1;


function switchSlides() {
    const slides = document.getElementsByClassName("image-item");
    const maxLength = slides.length;

    if (positionInd > maxLength) {
        positionInd = 1;
    } else if (positionInd < 1) {
        positionInd = maxLength;
    }

    const currSlide = document.getElementsByClassName("image-item active");
    currSlide[0].classList.remove('active');
    slides[positionInd -1].classList.add('active');
}

document.querySelector( ".right-btn").addEventListener("click", () => switchSlides(positionInd++));
document.querySelector( ".left-btn").addEventListener("click", () => switchSlides(positionInd--));






