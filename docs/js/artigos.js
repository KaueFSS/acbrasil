// endereço da API do WordPress
const API_WP = 'https://acbrasil.org.br/cms/wp-json/wp/v2';

// quantos artigos carregar por vez
const POR_PAGINA = 9;

// controla a paginação e a ordenação
let paginaAtual = 1;
let totalPaginas = 1;
let ordemAtual = 'desc'; // 'desc' = mais recentes, 'asc' = mais antigos

// busca os artigos na API e coloca na tela
function carregarArtigos(pagina, termoBusca, ordem) {
  // atualiza a ordem se foi passada como argumento
  if (ordem !== undefined) ordemAtual = ordem;

  const grid = document.querySelector('.grid-artigos');
  const btnCarregar = document.querySelector('.btn-carregar-mais');

  if (!grid) return;

  // monta a URL com os parâmetros de busca, página e ordenação
  let url = API_WP + '/posts?per_page=' + POR_PAGINA + '&page=' + pagina
    + '&order=' + ordemAtual + '&orderby=date&_embed';

  // adiciona o termo de busca na URL se tiver
  if (termoBusca) {
    url += '&search=' + encodeURIComponent(termoBusca);
  }

  fetch(url)
    .then(function (res) {
      // pega o total de páginas do cabeçalho da resposta
      const totalHeader = res.headers.get('X-WP-TotalPages');
      if (totalHeader) totalPaginas = parseInt(totalHeader);
      return res.json();
    })
    .then(function (artigos) {
      // limpa o grid se for a primeira página
      if (pagina === 1) grid.innerHTML = '';

      // mostra mensagem se não encontrou nada
      if (!artigos.length && pagina === 1) {
        grid.innerHTML = '<p style="text-align:center;padding:40px;color:#999;grid-column:1/-1">Nenhum artigo encontrado.</p>';
        grid.style.visibility = 'visible';
        if (btnCarregar) btnCarregar.style.display = 'none';
        return;
      }

      // cria um card para cada artigo e adiciona no grid
      artigos.forEach(function (artigo) {
        grid.appendChild(criarCard(artigo));
      });

      // atualiza o artigo em destaque com o primeiro resultado
      if (pagina === 1 && artigos[0]) atualizarDestaque(artigos[0]);

      // mostra o grid depois de carregar
      grid.style.visibility = 'visible';

      // controla o botão "carregar mais"
      if (btnCarregar) {
        btnCarregar.style.display = pagina >= totalPaginas ? 'none' : 'flex';
        paginaAtual = pagina;
      }
    })
    .catch(function () {
      // se der erro na API, ainda mostra o grid (com os cards estáticos)
      grid.style.visibility = 'visible';
      if (btnCarregar) btnCarregar.style.display = 'none';
    });
}

// atualiza a seção de destaque com os dados do primeiro artigo
function atualizarDestaque(artigo) {
  const destaqueConteudo = document.querySelector('.destaque-conteudo');
  const destaqueImagem = document.querySelector('.destaque-imagem img');

  if (!destaqueConteudo) return;

  // tenta pegar a imagem destacada, se não tiver usa uma aleatória
  let imagemUrl = 'https://picsum.photos/600/400?random=' + artigo.id;
  if (artigo._embedded &&
      artigo._embedded['wp:featuredmedia'] &&
      artigo._embedded['wp:featuredmedia'][0] &&
      artigo._embedded['wp:featuredmedia'][0].source_url) {
    imagemUrl = artigo._embedded['wp:featuredmedia'][0].source_url;
  }

  // nome do autor
  let autor = 'ACBrasil';
  if (artigo._embedded && artigo._embedded.author && artigo._embedded.author[0]) {
    autor = artigo._embedded.author[0].name;
  }

  // formata a data em português
  const data = new Date(artigo.date);
  const dataFormatada = data.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });

  // remove as tags HTML do resumo
  const divTemp = document.createElement('div');
  divTemp.innerHTML = artigo.excerpt ? artigo.excerpt.rendered : '';
  let excerpt = divTemp.textContent.trim().substring(0, 250);
  if (divTemp.textContent.trim().length > 250) excerpt += '...';

  divTemp.innerHTML = artigo.title ? artigo.title.rendered : 'Sem título';
  const titulo = divTemp.textContent;

  // atualiza a imagem do destaque
  if (destaqueImagem) {
    destaqueImagem.src = imagemUrl;
    destaqueImagem.alt = titulo;
  }

  // monta o HTML do bloco de destaque
  destaqueConteudo.innerHTML =
    '<span class="tag tag-governanca">Governança</span>' +
    '<h2>' + titulo + '</h2>' +
    '<p>' + excerpt + '</p>' +
    '<div class="destaque-meta">' +
    '<span><i class="fa-regular fa-calendar"></i> ' + dataFormatada + '</span>' +
    '<span><i class="fa-regular fa-user"></i> ' + autor + '</span>' +
    '</div>' +
    '<a href="' + artigo.link + '" target="_blank" class="btn-ler-mais">Ler artigo completo <i class="fa-solid fa-arrow-right"></i></a>';
}

// cria o elemento HTML de um card de artigo
function criarCard(artigo) {
  // imagem: usa a destacada do WP ou uma aleatória
  let imagemUrl = 'https://picsum.photos/400/220?random=' + artigo.id;
  if (artigo._embedded &&
      artigo._embedded['wp:featuredmedia'] &&
      artigo._embedded['wp:featuredmedia'][0] &&
      artigo._embedded['wp:featuredmedia'][0].source_url) {
    imagemUrl = artigo._embedded['wp:featuredmedia'][0].source_url;
  }

  // autor do artigo
  let autor = 'ACBrasil';
  if (artigo._embedded && artigo._embedded.author && artigo._embedded.author[0]) {
    autor = artigo._embedded.author[0].name;
  }

  const dataFormatada = new Date(artigo.date).toLocaleDateString('pt-BR');

  // extrai o texto do resumo sem HTML
  const divTemp = document.createElement('div');
  divTemp.innerHTML = artigo.excerpt ? artigo.excerpt.rendered : '';
  let excerpt = divTemp.textContent.trim().substring(0, 100);
  if (divTemp.textContent.trim().length > 100) excerpt += '...';

  divTemp.innerHTML = artigo.title ? artigo.title.rendered : 'Sem título';
  const titulo = divTemp.textContent;

  // monta o card completo
  const card = document.createElement('div');
  card.className = 'card-artigo';
  card.innerHTML =
    '<div class="card-img-wrapper">' +
    '<img src="' + imagemUrl + '" alt="' + titulo + '" onerror="this.src=\'https://picsum.photos/400/220?random=' + artigo.id + '\'">' +
    '<span class="tag tag-governanca">Governança</span>' +
    '</div>' +
    '<div class="card-conteudo">' +
    '<h3>' + titulo + '</h3>' +
    '<p>' + excerpt + '</p>' +
    '<div class="card-rodape">' +
    '<div class="meta-info">' +
    '<span><i class="fa-regular fa-calendar"></i> ' + dataFormatada + '</span>' +
    '<span><i class="fa-regular fa-clock"></i> 5 min</span>' +
    '</div>' +
    '<a href="' + artigo.link + '" target="_blank" class="btn-ler-mais pequeno">Ler <i class="fa-solid fa-arrow-right"></i></a>' +
    '</div></div>';

  return card;
}

// quando a página carregar, inicializa tudo
document.addEventListener('DOMContentLoaded', function () {
  const inputBusca = document.getElementById('input-busca');
  const btnCarregar = document.querySelector('.btn-carregar-mais');

  // verifica se veio algum termo de busca pela URL (?q=...)
  const params = new URLSearchParams(window.location.search);
  const termoDaURL = params.get('q') || '';

  // preenche o campo de busca se veio termo pela URL
  if (inputBusca && termoDaURL) {
    inputBusca.value = termoDaURL;
  }

  // carrega os artigos ao abrir a página
  carregarArtigos(1, termoDaURL, 'desc');

  // botão "carregar mais" — busca a próxima página
  if (btnCarregar) {
    btnCarregar.addEventListener('click', function () {
      const termo = inputBusca ? inputBusca.value.trim() : '';
      carregarArtigos(paginaAtual + 1, termo);
    });
  }
});
