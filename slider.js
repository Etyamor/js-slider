class Slider {
    constructor(wrapper, pictures) {
        this.wrapper = wrapper;
        this.pictures = pictures;
        this.positionInd = 0;
        this.#renderSlides();
    }
    #renderSlides() {
        const imgList = document.createElement('ul');
        imgList.classList.add("image-list")
        imgList.setAttribute("id", "image-list");
        this.wrapper.appendChild(imgList);
        this.pictures.map((item, index) => {
            let itemImg =  `<li class="image-item${index === 0 ? ' active' : ''}" data-index="${index}">
                       <img class="slide-img" src="${item}" alt="image">
                       </li>`;

            imgList.innerHTML += itemImg;
        });
        return this;
    }
    makeButtons() {
        const buttonWrapper = document.createElement("div");
        buttonWrapper.classList.add("button-wrapper");
        buttonWrapper.append(this.#createButton(["btn", "left-btn", "fas", "fa-chevron-left"]));
        buttonWrapper.append(this.#createButton(["btn", "right-btn", "fas", "fa-chevron-right"]));
        this.wrapper.append(buttonWrapper);
        this.wrapper.querySelector(".right-btn").addEventListener("click", () => {this.positionInd++; this.moveToSlide(this.positionInd)});
        this.wrapper.querySelector(".left-btn").addEventListener("click", () => {this.positionInd--; this.moveToSlide(this.positionInd)});
        return this;
    }
    makeDots() {
        return this;
    }
    #createButton(btnClasses) {
        const button = document.createElement("button");
        const icon = document.createElement("i");
        button.classList.add(...btnClasses);
        button.appendChild(icon);
        return button;
    }
    moveToSlide(index) {
        const slides = this.wrapper.getElementsByClassName("image-item");
        const maxLength = slides.length;
        if (index > maxLength - 1) {
            index = 0;
        } else if (index < 0) {
            index = maxLength - 1;
        }
        this.positionInd = index;
        const currSlide = this.wrapper.getElementsByClassName("image-item active");
        currSlide[0].classList.remove('active');
        slides[this.positionInd].classList.add('active');
    }
}

const pictures = [
    'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg'
];

const wrapper = document.getElementById("container");
const firstSlider = new Slider(wrapper, pictures);
firstSlider.makeButtons().moveToSlide(2);

const wrapper1 = document.getElementById("container1");
const secondSlider = new Slider(wrapper1, pictures);
secondSlider.makeButtons();