const carouselsContainer = document.querySelector("#container-carrousels")
const btnsWhatsapp = document.querySelectorAll(".whatsapp-call");
const ENCODED_MESSAGE_BUTTON_WHATSAPP = encodeURIComponent('Olá, vim através do site e gostaria de fazer um orçamento')

var map = L.map('map').setView([-22.804461, -43.206986], 40);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
var marker = L.marker([-22.804461, -43.206986]).addTo(map);
// marker.bindPopup("ID Design Ilha").openPopup();
marker.bindPopup(`ID Design Ilha - <a
                  href="https://www.google.com/maps/place/ID+Design+M%C3%B3veis+e+Projetos+de+Interiores+%7C+Moveis+Planejados+%7C+Cozinha+Planejada+%7C+Decora%C3%A7%C3%A3o+%7C+Design+%7C+Ilha+do+Governador/@-22.8041196,-43.209782,17z/data=!4m6!3m5!1s0x9979d2c22338fd:0xc1db67f9e4f4c892!8m2!3d-22.8041196!4d-43.2072071!16s%2Fg%2F11w25_7rkp?entry=ttu&g_ep=EgoyMDI0MDgyMS4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank">Clique aqui</a> para abrir no Google Maps`).openPopup();

function onMapClick(e) {
  console.log("You clicked the map at " + e.latlng.toString());
}

map.on('click', onMapClick);

btnsWhatsapp.forEach(btnWpp => {
  btnWpp.addEventListener('click', () => {
    window.open(`https://api.whatsapp.com/send/?phone=5521968193994&text=${ENCODED_MESSAGE_BUTTON_WHATSAPP}&type=phone_number&app_absent=0`, '_blank')
  })
})

function downloadPDF() {
  const path = "/files/imobal.pdf";
  const link = document.createElement("a");
  link.href = window.origin + path;
  link.download = "imobal-catalogo.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
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