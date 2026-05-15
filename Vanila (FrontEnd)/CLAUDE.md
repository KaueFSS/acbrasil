# CLAUDE.md — Projeto ACBrasil (Kauê)

## Contexto geral

Sou estudante de **2º período de Desenvolvimento Front-End**.
Estou num grupo de 4 pessoas fazendo um projeto para a faculdade.
O projeto é recriar e melhorar o site da **ACBrasil (Associação de Conselheiros do Brasil)**.

---

## As 2 entregas do professor

| Entrega | Tecnologia | Onde publica       | Prazo  |
|---------|------------|--------------------|--------|
| AC      | Vanilla (HTML, CSS, JS puro) | GitHub Pages | 15/05  |
| AP2     | React      | Vercel             | 12/05 (apresentação em sala) |

Os dois sites são o mesmo projeto, mas um em vanilla e outro em React.

---

## Meu grupo

Somos 4 pessoas. Cada um tem páginas/partes específicas:

- **Kauê (EU)** → Header, Nav, Home (index), Contato, Footer
- **Alice** → Página "O que Fazemos"
- **Julia** → Página "Quem Somos"
- **Caio** → Página "Artigos" e página "Associe-se"

---

## O que eu (Kauê) já tenho feito

- `Header` + `Nav` (vanilla e React)
- `index.html` / `Home.jsx` — Página Home completa
- `contato.html` / `Contato.jsx` — Página de Contato completa
- `Footer` (vanilla e React)

---

## Estrutura de pastas do projeto

### Vanilla
```
vanilla/
  index.html
  contato.html
  css/
    header.css
    footer.css
    home.css
    contato.css
  assets/
    logo.png
    artigo1.jpg
    artigo2.jpg
    artigo3.jpg
```

### React
```
react/
  src/
    components/
      Header.jsx
      Header.css
      Footer.jsx
      Footer.css
    pages/
      Home.jsx
      Home.css
      Contato.jsx
      Contato.css
    assets/
      logo.png
      artigo1.jpg ...
    App.jsx
    main.jsx
```

---

## Páginas do site e suas rotas (React)

| Página         | Rota             | Responsável |
|----------------|------------------|-------------|
| Home           | `/`              | Kauê        |
| Quem Somos     | `/quem-somos`    | Julia       |
| O que Fazemos  | `/o-que-fazemos` | Alice       |
| Artigos        | `/artigos`       | Caio        |
| Contato        | `/contato`       | Kauê        |
| Associe-se     | `/associe-se`    | Caio        |

---

## Design do site (cores e estilo)

O design foi feito no Figma pelo grupo. Seguir fielmente:

- **Fundo do header e footer:** `#0d1b3e` (azul escuro/navy)
- **Azul dos botões:** `#1a56db`
- **Amarelo (link ativo e destaques):** `#f5c518`
- **Fundo branco das páginas:** `#ffffff`
- **Texto nos inputs:** branco sobre `#1e2d50`
- **Borda do form de contato:** amarela `#f5c518`
- **Fonte:** Arial (padrão, sem Google Fonts complexas)

---

## Regras importantes de código

> Sou aluno de 2º período. O código deve ser **simples e didático**.

- ✅ HTML, CSS e JS básico — sem frameworks CSS (sem Tailwind, Bootstrap etc.)
- ✅ React simples — só o que foi ensinado: componentes, props, useState, useEffect, React Router
- ✅ Comentários em português explicando o que cada bloco faz
- ✅ CSS separado por arquivo (um CSS por página)
- ✅ Logo sempre via `<img src="assets/logo.png">` — nunca SVG inline
- ❌ Sem TypeScript
- ❌ Sem Context API, Redux ou coisas avançadas
- ❌ Sem animações complexas ou bibliotecas de animação
- ❌ Sem CSS-in-JS

---

## Partes dinâmicas (NÃO fazer ainda)

O professor vai ensinar como buscar dados da **API do WordPress** do site original.
Por enquanto essas partes ficam com conteúdo estático/placeholder:

- Carrossel de artigos recentes (Home)
- Seção "Em destaque" (Home)
- Lista de artigos (página Artigos)
- Quadro de membros/associados (Quem Somos)
- Newsletter

---

## Dependências do React

```bash
npm install react-router-dom
```

Só isso. Nenhuma outra biblioteca extra.

---

## Como rodar o projeto React

```bash
npm install
npm run dev
```

---

## Observações finais

- Sempre que criar ou editar algo, respeitar o design do Figma (cores acima)
- Não complicar o código — professor avalia se o aluno entendeu, não é perfeito
- Se uma parte for dinâmica (precisar de API), deixar comentário no código: `// TODO: buscar da API do WordPress`
- O Header aparece em todas as páginas — não repetir o CSS, só importar o mesmo arquivo
