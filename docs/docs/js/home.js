// endereço base da API do WordPress da ACBrasil
const API_WP = 'https://acbrasil.org.br/cms/wp-json/wp/v2';

// busca os valores do dólar, euro e selic para mostrar no ticker
function carregarIndicadores() {
  // busca dólar e euro na AwesomeAPI
  fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL')
    .then(function (res) { return res.json(); })
    .then(function (dados) {
      const dolar = dados['USDBRL'];
      const euro  = dados['EURBRL'];

      // atualiza o valor do dólar na tela
      const elDolar = document.getElementById('valor-dolar');
      const elVarDolar = document.getElementById('var-dolar');
      if (elDolar && dolar) {
        elDolar.textContent = 'R$ ' + parseFloat(dolar.bid).toFixed(2).replace('.', ',');
        const pctDolar = parseFloat(dolar.pctChange);
        // mostra a variação com seta para cima ou para baixo
        elVarDolar.textContent = (pctDolar >= 0 ? '▲' : '▼') + ' ' + Math.abs(pctDolar).toFixed(2).replace('.', ',') + '%';
        elVarDolar.className = 'ticker-variacao ' + (pctDolar >= 0 ? 'positiva' : 'negativa');
      }

      // atualiza o valor do euro na tela
      const elEuro = document.getElementById('valor-euro');
      const elVarEuro = document.getElementById('var-euro');
      if (elEuro && euro) {
        elEuro.textContent = 'R$ ' + parseFloat(euro.bid).toFixed(2).replace('.', ',');
        const pctEuro = parseFloat(euro.pctChange);
        elVarEuro.textContent = (pctEuro >= 0 ? '▲' : '▼') + ' ' + Math.abs(pctEuro).toFixed(2).replace('.', ',') + '%';
        elVarEuro.className = 'ticker-variacao ' + (pctEuro >= 0 ? 'positiva' : 'negativa');
      }
    })
    .catch(function () {
      // se der erro, mostra "indisponível"
      const el = document.getElementById('valor-dolar');
      if (el) el.textContent = 'indisponível';
    });

  // busca a taxa Selic no Banco Central do Brasil
  fetch('https://api.bcb.gov.br/dados/serie/bcdata.sgs.1178/dados/ultimos/1?formato=json')
    .then(function (res) { return res.json(); })
    .then(function (dados) {
      const elSelic = document.getElementById('valor-selic');
      if (elSelic && dados && dados[0]) {
        elSelic.textContent = parseFloat(dados[0].valor).toFixed(2).replace('.', ',') + '% a.a.';
      }
    })
    .catch(function () {
      const el = document.getElementById('valor-selic');
      if (el) el.textContent = 'indisponível';
    });
}

// carrega os 3 artigos mais recentes do WordPress
function carregarArtigosRecentes() {
  const container = document.querySelector('.cards-artigos');
  if (!container) return;

  container.innerHTML = '<p class="carregando">Carregando artigos...</p>';

  fetch(API_WP + '/posts?per_page=3&_embed')
    .then(function (res) { return res.json(); })
    .then(function (artigos) {
      container.innerHTML = '';
      if (!artigos.length) {
        container.innerHTML = '<p style="color:#999">Nenhum artigo encontrado.</p>';
        return;
      }
      // cria um card para cada artigo retornado
      artigos.forEach(function (artigo) {
        container.appendChild(criarCardArtigo(artigo));
      });
    })
    .catch(function () {
      // se a API falhar, mostra exemplos estáticos
      container.innerHTML = '';
      const exemplos = [
        { titulo: 'Governança Corporativa no Brasil', excerpt: 'A importância da governança para empresas brasileiras de todos os portes.', data: '10/04/2025', autor: 'ACBrasil', link: 'artigos.html' },
        { titulo: 'O Papel do Conselheiro Moderno', excerpt: 'Como os conselheiros de administração estão se adaptando ao novo cenário.', data: '05/03/2025', autor: 'ACBrasil', link: 'artigos.html' },
        { titulo: 'ESG e Sustentabilidade Empresarial', excerpt: 'Práticas ESG já são exigência de grandes investidores no mercado atual.', data: '20/02/2025', autor: 'ACBrasil', link: 'artigos.html' }
      ];
      exemplos.forEach(function (ex, i) {
        const card = document.createElement('div');
        card.className = 'card-artigo';
        card.innerHTML =
          '<img src="https://picsum.photos/400/220?random=' + i + '" alt="' + ex.titulo + '">' +
          '<div class="card-conteudo">' +
          '<span class="tag tag-governanca">Governança</span>' +
          '<h3>' + ex.titulo + '</h3>' +
          '<p>' + ex.excerpt + '</p>' +
          '<div class="card-rodape">' +
          '<div class="meta-info">' +
          '<span>&#128197; ' + ex.data + '</span>' +
          '<span>&#128100; ' + ex.autor + '</span>' +
          '</div>' +
          '<a href="' + ex.link + '" class="btn-ler-mais pequeno">Ler mais &#8250;</a>' +
          '</div></div>';
        container.appendChild(card);
      });
    });
}

// carrega mais 3 artigos para a seção "Em Destaque" (pula os 3 primeiros)
function carregarEmDestaque() {
  const container = document.querySelector('.cards-destaque');
  if (!container) return;

  container.innerHTML = '<p class="carregando">Carregando destaques...</p>';

  fetch(API_WP + '/posts?per_page=3&offset=3&_embed')
    .then(function (res) { return res.json(); })
    .then(function (artigos) {
      container.innerHTML = '';
      if (!artigos.length) {
        container.innerHTML = '<p style="color:#999">Nenhum destaque encontrado.</p>';
        return;
      }
      artigos.forEach(function (artigo) {
        container.appendChild(criarCardArtigo(artigo));
      });
    })
    .catch(function () {
      // fallback com exemplos caso a API não responda
      container.innerHTML = '';
      const exemplos = [
        { titulo: 'Conselhos Consultivos em Startups', excerpt: 'Como estruturar um conselho consultivo eficiente para empresas emergentes.', data: '15/01/2025', autor: 'ACBrasil', link: 'artigos.html' },
        { titulo: 'Diversidade nos Conselhos de Administração', excerpt: 'Estudos mostram que diversidade melhora a performance corporativa.', data: '08/12/2024', autor: 'ACBrasil', link: 'artigos.html' },
        { titulo: 'Regulação e Compliance para Conselheiros', excerpt: 'O que os conselheiros precisam saber sobre as novas normas regulatórias.', data: '30/11/2024', autor: 'ACBrasil', link: 'artigos.html' }
      ];
      exemplos.forEach(function (ex, i) {
        const card = document.createElement('div');
        card.className = 'card-artigo';
        card.innerHTML =
          '<img src="https://picsum.photos/400/220?random=' + (i + 10) + '" alt="' + ex.titulo + '">' +
          '<div class="card-conteudo">' +
          '<span class="tag tag-esg">ESG</span>' +
          '<h3>' + ex.titulo + '</h3>' +
          '<p>' + ex.excerpt + '</p>' +
          '<div class="card-rodape">' +
          '<div class="meta-info">' +
          '<span>&#128197; ' + ex.data + '</span>' +
          '<span>&#128100; ' + ex.autor + '</span>' +
          '</div>' +
          '<a href="' + ex.link + '" class="btn-ler-mais pequeno">Ler mais &#8250;</a>' +
          '</div></div>';
        container.appendChild(card);
      });
    });
}

// monta o HTML de um card de artigo a partir dos dados da API
function criarCardArtigo(artigo) {
  // tenta pegar a imagem destacada do artigo, se não tiver usa uma aleatória
  let imagemUrl = 'https://picsum.photos/400/220?random=' + artigo.id;
  if (artigo._embedded &&
      artigo._embedded['wp:featuredmedia'] &&
      artigo._embedded['wp:featuredmedia'][0] &&
      artigo._embedded['wp:featuredmedia'][0].source_url) {
    imagemUrl = artigo._embedded['wp:featuredmedia'][0].source_url;
  }

  // pega o nome do autor, ou usa "ACBrasil" como padrão
  let autor = 'ACBrasil';
  if (artigo._embedded && artigo._embedded.author && artigo._embedded.author[0]) {
    autor = artigo._embedded.author[0].name;
  }

  // formata a data em português
  const data = new Date(artigo.date);
  const dataFormatada = data.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });

  // remove as tags HTML do resumo do artigo
  const divTemp = document.createElement('div');
  divTemp.innerHTML = artigo.excerpt ? artigo.excerpt.rendered : '';
  let excerptTexto = divTemp.textContent.trim().substring(0, 120);
  if (divTemp.textContent.trim().length > 120) excerptTexto += '...';

  divTemp.innerHTML = artigo.title ? artigo.title.rendered : 'Sem título';
  const titulo = divTemp.textContent;

  // cria o elemento do card e insere o conteúdo
  const card = document.createElement('div');
  card.className = 'card-artigo';
  card.innerHTML =
    '<img src="' + imagemUrl + '" alt="' + titulo + '" onerror="this.src=\'https://picsum.photos/400/220?random=' + artigo.id + '\'">' +
    '<div class="card-conteudo">' +
    '<span class="tag tag-governanca">Governança</span>' +
    '<h3>' + titulo + '</h3>' +
    '<p>' + excerptTexto + '</p>' +
    '<div class="card-rodape">' +
    '<div class="meta-info">' +
    '<span>&#128197; ' + dataFormatada + '</span>' +
    '<span>&#128100; ' + autor + '</span>' +
    '</div>' +
    '<a href="' + artigo.link + '" target="_blank" class="btn-ler-mais pequeno">Ler mais &#8250;</a>' +
    '</div></div>';

  return card;
}

// quando a página terminar de carregar, chama as três funções
document.addEventListener('DOMContentLoaded', function () {
  carregarIndicadores();
  carregarArtigosRecentes();
  carregarEmDestaque();
});
