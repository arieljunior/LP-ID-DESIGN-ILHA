const downloadCatalogBtns = document.querySelectorAll('.btn-download-pdf');

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

downloadCatalogBtns.forEach((btn) => btn.addEventListener('click', downloadPDF));