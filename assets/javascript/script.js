const carouselsContainer = document.querySelector("#container-carrousels")

function downloadPDF() {
  console.log("BAIXANDO PDF...");

  const path = "/files/imobal.pdf";
  const link = document.createElement("a");
  link.href = window.origin + path;
  link.download = "imobal-catalogo.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  console.log("PDF BAIXADO!");
}

const produtos = [{
  srcImage: './assets/images/room.jpg',
  alt: 'Imagem de um quarto',
  title: 'Quarto Preto, Ébano e Cinza Médio',
  srcPdfDownload: '/files/imobal.pdf'
}, {
  srcImage: './assets/images/chair.jpg',
  alt: 'Imagem de um quarto',
  title: 'Quarto Preto, Ébano e Cinza Médio',
  srcPdfDownload: '/files/imobal.pdf'
}, {
  srcImage: './assets/images/kitchen.jpg',
  alt: 'Imagem de um quarto',
  title: 'Quarto Preto, Ébano e Cinza Médio',
  srcPdfDownload: '/files/imobal.pdf'
}]

const carrousels = [produtos, produtos, produtos]


function populateProducts(productsCarousel, carouselListItensElement, caroulseIndicatorsElement, idCarousel) {
  productsCarousel.forEach((product, index) => {
    const carouselItem = document.createElement("div");
    carouselItem.classList.add("carousel-item")

    const indicator = document.createElement("li")
    indicator.setAttribute('data-target', '#' + idCarousel)
    indicator.setAttribute('data-slide-to', index.toString())

    if (index === 0) {
      indicator.classList.add("active")
      carouselItem.classList.add("active")
    }

    const imageCarousel = document.createElement("img");
    imageCarousel.classList.add("img-carousel")
    imageCarousel.src = product.srcImage;
    imageCarousel.alt = product.alt;
    imageCarousel.title = product.title;

    const carouselCaption = document.createElement('div');
    carouselCaption.classList.add("carousel-caption", "d-none", "d-md-block", "carousel-info")

    carouselCaption.innerHTML = `
       <h5>${product.title}</h5>
       <button type="button" onclick="downloadPDF('${product.srcPdfDownload}');">Baixar catalogo</button>
    `

    carouselItem.appendChild(imageCarousel)
    carouselItem.appendChild(carouselCaption)

    carouselListItensElement.appendChild(carouselItem)
    caroulseIndicatorsElement.appendChild(indicator)

  })
}

function renderCarousel() {
  carrousels.forEach((products, index) => {
    const idCarouselProducts = "carouselProducts-" + index;
    const carouselContainer = document.createElement("div");
    carouselContainer.classList.add("carousel", "slide");
    carouselContainer.setAttribute("id", idCarouselProducts);
    carouselContainer.setAttribute("data-ride", "carousel");

    const listIndicators = document.createElement("ol");
    listIndicators.classList.add("carousel-indicators");

    const carouselItens = document.createElement("div");
    carouselItens.classList.add("carousel-inner")

    const buttonPrev = createButtonControlCarousel("prev", idCarouselProducts);
    const buttonNext = createButtonControlCarousel("next", idCarouselProducts);

    populateProducts(products, carouselItens, listIndicators, idCarouselProducts)

    carouselContainer.appendChild(listIndicators);
    carouselContainer.appendChild(carouselItens);
    carouselContainer.appendChild(buttonPrev);
    carouselContainer.appendChild(buttonNext);

    carouselsContainer.appendChild(carouselContainer);
  })
}

function createButtonControlCarousel(direction, idCarousel) {
  const buttonControll = document.createElement("a");
  buttonControll.classList.add("carousel-control-" + direction);
  buttonControll.setAttribute("href", "#" + idCarousel);
  buttonControll.setAttribute("role", "button");
  buttonControll.setAttribute("data-slide", direction);

  const icon = document.createElement("span");
  icon.classList.add(`carousel-control-${direction}-icon`);
  icon.setAttribute("aria-hidden", "true");

  const text = document.createElement("span");
  text.classList.add("sr-only");
  text.innerHTML = direction === "prev" ? "Anterior" : "Próximo";

  buttonControll.appendChild(icon)
  buttonControll.appendChild(text)

  return buttonControll;
}

renderCarousel();