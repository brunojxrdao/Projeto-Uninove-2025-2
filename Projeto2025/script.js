const artworks = [
    {
        id: 1,
        titulo: "O Lavrador de Café",
        artista: "Cândido Portinari",
        ano: "1939",
        imagem: "imagens/rosa_e_azul.jpg",
        descricao: "Uma das obras mais emblemáticas de Portinari, retrata a dignidade do trabalhador rural brasileiro. A pintura revela a preocupação social do artista e sua técnica refinada, combinando realismo e expressionismo para criar uma imagem poderosa da identidade nacional brasileira."
    },
    {
        id: 2,
        titulo: "Abaporu",
        artista: "Tarsila do Amaral",
        ano: "1928",
        imagem: "imagens/Abaporu.jpg",
        descricao: "Obra fundamental do movimento antropofágico brasileiro, o Abaporu representa a busca por uma identidade artística nacional. A figura distorcida e o colorido tropical marcam o início de uma nova fase na arte brasileira, influenciando gerações de artistas."
    },
    {
        id: 3,
        titulo: "Operários",
        artista: "Tarsila do Amaral",
        ano: "1933",
        imagem: "imagens/Operarios.jpg",
        descricao: "Retrato da diversidade étnica do povo brasileiro, esta obra marca a fase social de Tarsila. A composição mostra rostos de diferentes origens, refletindo a consciência social da artista durante um período de transformações políticas no país."
    },
    {
        id: 4,
        titulo: "Mestiço",
        artista: "Cândido Portinari",
        ano: "1934",
        imagem: "imagens/candido_portinari-818x1024.jpg",
        descricao: "Uma reflexão profunda sobre a identidade racial brasileira, esta obra demonstra a sensibilidade de Portinari para questões sociais. O retrato revela a complexidade da formação étnica nacional através de uma técnica pictórica refinada e expressiva."
    },
    {
        id: 5,
        titulo: "A Canoa Sobre o Epte",
        artista: "Claude Monet",
        ano: "1890",
        imagem: "imagens/canoa.jpg",
        descricao: "A obra se destaca pelo enquadramento inovador, similar à fotografia e gravuras japonesas, com a canoa cortada nas bordas da tela, e pela forte sensação de movimento, criada pelas pinceladas vívidas e a representação da água com suas plantas ondulantes."
    },
    {
        id: 6,
        titulo: "Tropical",
        artista: "Anita Malfatti",
        ano: "1917",
        imagem: "imagens/Tropical-oleo-sobre-tela1917-imagem-para-o-site.jpg",
        descricao: "Obra pioneira do modernismo brasileiro, representa a ruptura com os padrões acadêmicos tradicionais. Malfatti introduz elementos expressionistas na arte nacional, influenciando toda uma geração de artistas e marcando o início da arte moderna no Brasil."
    },
    {
        id: 7,
        titulo: "Autorretrato",
        artista: "Di Cavalcanti",
        ano: "1940",
        imagem: "imagens/autoretrato.jpg",
        descricao: "Reflexão introspectiva do artista sobre sua própria identidade, este autorretrato revela a personalidade marcante de Di Cavalcanti. A obra combina elementos do modernismo brasileiro com influências europeias, criando uma síntese única de estilos."
    },
    {
        id: 8,
        titulo: "Samba",
        artista: "Di Cavalcanti",
        ano: "1925",
        imagem: "imagens/83-Di-Cavalcanti-–Samba---1.jpg",
        descricao: "Celebração da cultura popular brasileira, esta obra captura a energia e o movimento do samba. Di Cavalcanti retrata a alegria e a sensualidade da dança nacional, estabelecendo uma iconografia visual que se tornou símbolo da brasilidade na arte."
    }
];

const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loading').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loading').style.display = 'none';
        }, 800);
    }, 2000);
});

const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

function generateGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    galleryGrid.innerHTML = '';

    artworks.forEach(artwork => {
        const card = document.createElement('div');
        card.className = 'artwork-card fade-in';
        card.innerHTML = `
            <div class="artwork-image" style="background-image: url('${artwork.imagem}')">
                <div class="artwork-overlay">
                    <div class="view-btn"></div>
                </div>
            </div>
            <div class="artwork-info">
                <h3 class="artwork-title">${artwork.titulo}</h3>
                <div class="artwork-artist">${artwork.artista}</div>
                <div class="artwork-year">${artwork.ano}</div>
                <p class="artwork-description">${artwork.descricao.substring(0, 500)}
            </div>
        `;

        card.addEventListener('click', () => openModal(artwork));
        galleryGrid.appendChild(card);
    });
}

const modal = document.getElementById('modal');
const modalClose = document.getElementById('modal-close');

function openModal(artwork) {
    document.getElementById('modal-image').style.backgroundImage = url('${artwork.imagem}');
    document.getElementById('modal-title').textContent = artwork.titulo;
    document.getElementById('modal-artist').textContent = artwork.artista;
    document.getElementById('modal-year').textContent = artwork.ano;
    document.getElementById('modal-description').textContent = artwork.descricao;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const increment = target / 100;
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 20);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
    });
});

document.addEventListener('DOMContentLoaded', function() {
    generateGallery();

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    document.querySelectorAll('.timeline-item').forEach(el => {
        observer.observe(el);
    });

    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
});