## 📌 Sobre o Projeto

Sistema de e-commerce completo com integração via WhatsApp para finalização de compras. O projeto oferece:

- **Catálogo de produtos** com filtros e busca
- **Carrinho de compras** persistente (local/Supabase)
- **Checkout via WhatsApp** - envia pedido formatado diretamente para o vendedor
- **Autenticação segura** via Supabase Auth

## 🛠 Tecnologias Utilizadas

### Frontend
| Tecnologia | Justificativa |
|------------|---------------|
| React + TypeScript | Tipagem estática e componentes reutilizáveis |
| Vite | Build tool rápida para desenvolvimento moderno |
| Tailwind CSS | Estilização utilitária e responsiva |
| Supabase JS | Backend-as-a-Service (Auth + Database) |
| React Hook Form | Validação de formulários eficiente |

### Backend
| Tecnologia | Função |
|------------|--------|
| Supabase | Banco de dados PostgreSQL + Autenticação |
| Supabase Storage | Armazenamento de imagens dos produtos |

Todas as tecnologias escolhidas seguem os requesitos de obrigatoriedade do projeto.

## 🤖 IA Utilizada

| Ferramenta | Contribuição |
|------------|--------------|
| ChatGPT-4 | - Geração de boilerplate<br>- Sugestões de arquitetura<br>- Resolução de bugs complexos<br>- Geração de dados para popular o banco de dados. |
| Deepseek | - Refatoração de código<br>- Documentação<br>- Sugestões de melhoria de UI |

**Divisão de código:**
- 60% gerado/assistido por IA
- 40% escrito manualmente (lógica crítica e integrações)

## 🚀 Como Rodar o Projeto - Localmente

### Pré-requisitos
- Node.js v18+
- Conta no Supabase

### Passo a Passo

1. **Clone o repositório**
   ```bash
   git clone https://github.com/laisqueiroz/stg-catalog-challenge

2. **Instale as dependências**
  ```bash
  npm install

3. **Configure as variáveis de ambiente**
  Altere o arquivo .env na raiz com as informações do seu supabase: 
  ```bash
  VITE_SUPABASE_URL=seu-url-supabase
  VITE_SUPABASE_ANON_KEY=sua-chave-anonima

Essas informações você encontra no painel do supabase.

4. **Inicie o servidor de desenvolvimento**
  ```bash
  npm run dev

5. **Acesse no navegador**
  http://localhost:5173

### Checklist de Funcionalidades

# FUNCIONALIDADES PRINCIPAIS

Autenticação (Supabase):

✅ Tela de login e registro
✅ Autenticação via email/senha
✅ Logout funcional
✅ Proteção de rotas (usuários não logados não finalizam a compra)
❌ Recuperação de senha (opcional, mas será um diferencial)

Catálogo de Produtos:

✅ Listagem de produtos com imagem, nome, preço e descrição
✅ Busca/filtro por nome do produto
✅ Visualização detalhada do produto (modal ou página)
✅ Adicionar produto ao carrinho
✅ Visualizar carrinho com produtos selecionados
✅ Interface responsiva (desktop e mobile)

Finalização via WhatsApp:

✅ Botão "Finalizar Pedido" no carrinho
✅ Gerar mensagem formatada com os produtos
✅ Redirecionar para wa.me do link com pedido
✅ Limpar carrinho após envio

# DIFERENCIAIS (OPCIONAL - PONTOS EXTRAS)

Funcionalidades Bônus:

❌ Histórico de pedidos do usuário
✅ Filtros avançados (categoria, faixa de preço)
❌ Sistema de cupons de desconto
❌ Lista de desejos além do carrinho
❌ Avaliações e comentários dos produtos
❌ Dark mode toggle
❌ PWA (Progressive Web App)

Técnico:

✅ Context API para gerenciamento de estado global
✅ Custom hooks bem estruturados
❌ Testes unitários (Jest/Testing Library)
❌ Error boundary para tratamento de erros
❌ SEO otimizado (se Next.js)
❌ Performance otimizada (lazy loading, memoization)
❌ Internacionalização (i18n)

UX/UI:

✅ Animações suaves (Framer Motion)
❌ Skeleton loading durante carregamentos
❌ Toast notifications para feedback
❌ Breadcrumbs para navegação
✅ Infinite scroll ou paginação
❌ Busca com sugestões/autocomplete

### Links 

Deploy: https://stg-catalog-challenge-x2r0.onrender.com