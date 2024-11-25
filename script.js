$(document).ready(function() {
    $('#mobile_btn').on('click', function() {
        $('#mobile_menu').toggleClass('active');
        $('#mobile_btn').find('i').toggleClass('fa-x');
    });
});

const carousels = document.querySelectorAll(".carousel");

carousels.forEach(carousel => {
    const leftArrow = carousel.parentElement.querySelector("#left");
    const rightArrow = carousel.parentElement.querySelector("#right");
    const firstImg = carousel.querySelector("img");

    let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

    // Função para exibir/ocultar as setas conforme o scroll do carrossel
    const showHideIcons = () => {
        let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
        leftArrow.style.display = carousel.scrollLeft == 0 ? "none" : "block";
        rightArrow.style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
    };

    // Função para mover o carrossel com base na direção (esquerda ou direita)
    const moveCarousel = (direction) => {
        let firstImgWidth = firstImg.clientWidth + 14; // Largura da imagem com o espaçamento
        let visibleImgs = Math.floor(carousel.clientWidth / firstImgWidth); // Número de imagens visíveis no carrossel
        let pageWidth = firstImgWidth * visibleImgs; // Largura de uma página (conjunto de imagens visíveis)

        carousel.scrollLeft += direction === 'left' ? -pageWidth : pageWidth;
        setTimeout(() => showHideIcons(), 60); // Atualiza as setas após o clique
    };

    // Eventos para as setas de navegação (Desktop e Mobile)
    const arrowClickHandler = (e) => {
        e.preventDefault(); // Impede qualquer comportamento padrão de rolagem
        moveCarousel(e.target.id === "left" ? "left" : "right");
    };

    leftArrow.addEventListener("click", arrowClickHandler);
    rightArrow.addEventListener("click", arrowClickHandler);

    // Funções para manipular o drag (arraste)
    const dragStart = (e) => {
        isDragStart = true;
        prevPageX = e.pageX || e.touches[0].pageX;
        prevScrollLeft = carousel.scrollLeft;
    };

    const dragging = (e) => {
        if (!isDragStart) return;
        e.preventDefault();
        isDragging = true;
        carousel.classList.add("dragging");
        positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
        carousel.scrollLeft = prevScrollLeft - positionDiff;
        showHideIcons();
    };

    const dragStop = () => {
        isDragStart = false;
        carousel.classList.remove("dragging");

        if (!isDragging) return;
        isDragging = false;
        // Chama a função para ajustar o scroll após o arrasto
        autoSlide();
    };

    // Função de auto-scroll após o arrasto
    const autoSlide = () => {
        positionDiff = Math.abs(positionDiff);
        let firstImgWidth = firstImg.clientWidth + 14;
        let valDifference = firstImgWidth - positionDiff;

        if (carousel.scrollLeft > prevScrollLeft) {
            return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
        }
        carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    };

    // Função de arraste para dispositivos móveis e desktop
    const startTouch = (e) => {
        dragStart(e);
    };

    const moveTouch = (e) => {
        dragging(e);
    };

    const endTouch = () => {
        dragStop();
    };

    // Eventos de arraste para desktop (mouse)
    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    carousel.addEventListener("mouseup", dragStop);
    carousel.addEventListener("mouseleave", dragStop);

    // Eventos de toque para dispositivos móveis (touch)
    carousel.addEventListener("touchstart", startTouch);
    carousel.addEventListener("touchmove", moveTouch);
    carousel.addEventListener("touchend", endTouch);
    carousel.addEventListener("touchcancel", endTouch);

    // Exibe as setas corretamente no início
    showHideIcons();

    // As setas também devem ser funcionais no celular (touch)
    leftArrow.addEventListener("touchstart", (e) => {
        e.preventDefault();  // Impede o comportamento padrão de rolagem
        moveCarousel('left');
    });

    rightArrow.addEventListener("touchstart", (e) => {
        e.preventDefault();  // Impede o comportamento padrão de rolagem
        moveCarousel('right');
    });
});
