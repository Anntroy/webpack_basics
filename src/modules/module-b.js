export const getImage = (num, img) => {
  switch (num) {
    case 1: 
  }
}

export class ChangeImage {

  constructor() {
    this.imageContainer = document.getElementById("imageContainer");
  }

  changeImage(className) {
    this.imageContainer.classList.add(className);

    // $(".bg").css("background-image", "url('/css/images/css.jpg')");

    console.log(this.imageContainer);
  }
}
