// Gera uma cor aleatória no formato HEX
function generateRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Gera uma paleta aleatória
function generatePalette() {
  for (let i = 1; i <= 5; i++) {
    const colorDiv = document.getElementById(`color${i}`);
    const hexCode = generateRandomColor();
    colorDiv.style.backgroundColor = hexCode;
    document.getElementById(`hex${i}`).textContent = hexCode;
  }
}

// Copia o código hexadecimal para a área de transferência
function copyToClipboard(elementId) {
  const hexCode = document.getElementById(elementId).textContent;
  navigator.clipboard.writeText(hexCode);
}

// Extrai as cores predominantes de uma imagem usando Color Thief
function generatePaletteFromImage(image) {
  const colorThief = new ColorThief();
  if (image.complete) {
    const palette = colorThief.getPalette(image, 5); // Obtém 5 cores
    applyPalette(palette);
  } else {
    image.onload = function () {
      const palette = colorThief.getPalette(image, 5);
      applyPalette(palette);
    };
  }
}

// Aplica uma paleta (aleatória ou extraída de imagem) aos cartões
function applyPalette(palette) {
  palette.forEach((color, index) => {
    const colorDiv = document.getElementById(`color${index + 1}`);
    const rgb = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    colorDiv.style.backgroundColor = rgb;

    // Converte RGB para HEX
    const hex = `#${color.map((c) => c.toString(16).padStart(2, "0")).join("")}`;
    document.getElementById(`hex${index + 1}`).textContent = hex;
  });
}

// Lida com o upload da imagem
document.getElementById("imageInput").addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.src = e.target.result;

      // Aguarda a imagem carregar e extrai as cores
      img.onload = function () {
        generatePaletteFromImage(img);
      };
    };
    reader.readAsDataURL(file);
  }
});

// Botão de gerar paleta aleatória
document.getElementById("generate").addEventListener("click", generatePalette);

// Gera uma paleta aleatória ao carregar a página
generatePalette();