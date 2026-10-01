
document.addEventListener("DOMContentLoaded", () => {
    // Elementos principais
    const searchForm = document.querySelector(".search-form");
    const searchInput = searchForm?.querySelector('input[name="q"]');
    const movieCards = document.querySelectorAll(".movie-card");
    const seriesCards = document.querySelectorAll(".series-card");

    // 1. Pesquisa
    if (searchForm && searchInput) {
        searchForm.addEventListener("submit", (event) => {
            const query = searchInput.value.trim();

            if (!query) {
                event.preventDefault();
                searchInput.focus();
                searchInput.setCustomValidity("Digite um título para pesquisar.");
                searchInput.reportValidity();
                return;
            }

            searchInput.setCustomValidity("");
            // O formulário GET envia a pesquisa para o Flask.
            // A busca real será implementada no backend.
        });

        searchInput.addEventListener("input", () => {
            searchInput.setCustomValidity("");
        });
    }

    // 2. Efeito visual nos cards
    const cards = [...movieCards, ...seriesCards];

    cards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
            card.classList.add("is-hovered");
        });

        card.addEventListener("mouseleave", () => {
            card.classList.remove("is-hovered");
        });
    });

    // 3. Ano automático no rodapé
    const yearElement = document.querySelector("#current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // 4. Rolagem suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");
            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    // 5. Indicação visual de carregamento ao pesquisar
    if (searchForm) {
        searchForm.addEventListener("submit", () => {
            if (searchInput?.value.trim()) {
                const submitButton = searchForm.querySelector(
                    'button[type="submit"]'
                );

                if (submitButton) {
                    submitButton.classList.add("is-loading");
                    submitButton.setAttribute("aria-busy", "true");
                }
            }
        });
    }
});