/* ==========================================================================
   DESARROLLADO POR MSFWEB - SCRIPTS UNIFICADOS 100% CORREGIDOS (2026)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. ACCORDION / DESPLEGABLE DE PREGUNTAS FRECUENTES (FAQ)
    const faqTriggers = document.querySelectorAll('.faq-trigger');

    faqTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const currentItem = trigger.parentElement;
            const currentPanel = trigger.nextElementSibling;

            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== currentItem && item.classList.contains('active')) {
                    item.classList.remove('active');
                    item.querySelector('.faq-panel').style.maxHeight = '0';
                }
            });

            if (currentItem.classList.contains('active')) {
                currentItem.classList.remove('active');
                currentPanel.style.maxHeight = '0';
            } else {
                currentItem.classList.add('active');
                currentPanel.style.maxHeight = currentPanel.scrollHeight + 'px';
            }
        });
    });


    // 2. LOGICA DE LOS CARRUSELES Y LIGHTBOX (PANTALLA COMPLETA)
    const lightbox = document.getElementById("lightbox-modal");
    
    if (lightbox) {
        const lightboxTrack = lightbox.querySelector(".lightbox-track");
        const lightboxClose = lightbox.querySelector(".lightbox-close");
        const lightboxPrev = lightbox.querySelector(".lightbox-prev");
        const lightboxNext = lightbox.querySelector(".lightbox-next");
        const containers = document.querySelectorAll(".carousel-container");

        containers.forEach(container => {
            const track = container.querySelector(".carousel-track");
            const prevArrow = container.querySelector(".prev-arrow");
            const nextArrow = container.querySelector(".next-arrow");
            if (!track) return; // Si no hay carrusel en esta página, salta a la siguiente

            const images = track.querySelectorAll("img");

            if (nextArrow && prevArrow) {
                nextArrow.addEventListener("click", (e) => {
                    e.stopPropagation();
                    track.scrollLeft += track.offsetWidth;
                });
                prevArrow.addEventListener("click", (e) => {
                    e.stopPropagation();
                    track.scrollLeft -= track.offsetWidth;
                });
            }

            images.forEach((img, index) => {
                img.style.cursor = "pointer";
                img.addEventListener("click", () => {
                    openLightbox(images, index);
                });
            });

            // Arrastre con mouse / táctil (LÍNEA CORREGIDA AQUÍ)
            let isDown = false, startX, scrollLeft;
            track.addEventListener("mousedown", (e) => {
                isDown = true; track.style.scrollBehavior = "auto";
                startX = e.pageX - track.offsetLeft; scrollLeft = track.scrollLeft;
            });
            track.addEventListener("mouseleave", () => { if (!isDown) return; isDown = false; track.style.scrollBehavior = "smooth"; });
            track.addEventListener("mouseup", () => { isDown = false; track.style.scrollBehavior = "smooth"; });
            track.addEventListener("mousemove", (e) => {
                if (!isDown) return; e.preventDefault();
                const x = e.pageX - track.offsetLeft;
                track.scrollLeft = scrollLeft - (x - startX) * 1.5;
            });
        });

        function openLightbox(imageContainer, activeIndex) {
            if(!lightboxTrack) return;
            lightboxTrack.innerHTML = "";
            imageContainer.forEach(img => {
                const newImg = document.createElement("img");
                newImg.src = img.src;
                lightboxTrack.appendChild(newImg);
            });

            lightbox.style.display = "flex";
            setTimeout(() => {
                lightboxTrack.scrollLeft = lightboxTrack.offsetWidth * activeIndex;
            }, 50);
        }

        if(lightboxNext) lightboxNext.addEventListener("click", () => { lightboxTrack.scrollLeft += lightboxTrack.offsetWidth; });
        if(lightboxPrev) lightboxPrev.addEventListener("click", () => { lightboxTrack.scrollLeft -= lightboxTrack.offsetWidth; });
        if(lightboxClose) lightboxClose.addEventListener("click", () => { lightbox.style.display = "none"; });
        
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox || e.target === lightboxTrack) {
                lightbox.style.display = "none";
            }
        });
    }


// 3. LÓGICA DEL LECTOR DE NOTAS DEL BLOG (RESOLUCIÓN FINAL)
    const blogModal = document.getElementById("blog-modal");
    
    if (blogModal) {
        const blogReaderBody = blogModal.querySelector(".blog-reader-body");
        const blogReaderClose = blogModal.querySelector(".blog-reader-close");
        const readMoreButtons = document.querySelectorAll(".btn-read-more");

        readMoreButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                e.preventDefault(); 
                
                // Buscamos la tarjeta contenedora padre (venga de donde venga)
                const parentCard = button.parentElement;
                
                // Buscamos el bloque oculto usando la ruta directa
                const fullTextContainer = parentCard.querySelector(".blog-full-text");
                
                if (fullTextContainer) {
                    // Clonamos el contenido, abrimos el modal y bloqueamos el scroll de fondo
                    blogReaderBody.innerHTML = fullTextContainer.innerHTML;
                    blogModal.style.display = "flex";
                    document.body.style.overflow = "hidden";
                } else {
                    alert("HTML Desalineado: No encontré la clase '.blog-full-text' dentro de esta tarjeta.");
                }
            });
        });

        function closeBlogModal() {
            blogModal.style.display = "none";
            document.body.style.overflow = "auto"; // Devuelve el scroll a la normalidad
        }

        if (blogReaderClose) {
            blogReaderClose.addEventListener("click", closeBlogModal);
        }
        
        blogModal.addEventListener("click", (e) => {
            if (e.target === blogModal) {
                closeBlogModal();
            }
        });
    }

});