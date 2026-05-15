// seleciona os elementos do menu
const btnHamburger = document.querySelector('.btn-hamburger');
const nav = document.querySelector('nav');
const pesquisa = document.querySelector('.pesquisa');

// abre e fecha o menu hambúrguer no mobile
if (btnHamburger) {
  btnHamburger.addEventListener('click', function () {
    nav.classList.toggle('aberto');
    // muda o ícone de ☰ para ✕ dependendo do estado do menu
    btnHamburger.innerHTML = nav.classList.contains('aberto') ? '&#10005;' : '&#9776;';
  });

  // fecha o menu quando o usuário clica em qualquer link
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('aberto');
      btnHamburger.innerHTML = '&#9776;';
    });
  });
}

// redireciona para a página de artigos ao pressionar Enter na pesquisa
if (pesquisa) {
  pesquisa.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      const termo = pesquisa.value.trim();
      // só faz a busca se tiver texto digitado
      if (termo) {
        window.location.href = 'artigos.html?q=' + encodeURIComponent(termo);
      }
    }
  });
}
