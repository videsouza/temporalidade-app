# Design do Aplicativo - Consulta de Temporalidade

## Visão Geral

Aplicativo móvel para consulta rápida e intuitiva de temporalidade de documentos. O usuário busca por código do documento e visualiza os tipos documentais associados com suas respectivas temporalidades.

---

## Telas do Aplicativo

### 1. **Tela de Busca (Home)**
- **Propósito**: Permitir que o usuário busque documentos por código
- **Conteúdo Principal**:
  - Campo de entrada de texto (SearchBar) para digitar o código do documento
  - Ícone de busca ou botão "Pesquisar"
  - Histórico de buscas recentes (opcional, abaixo do campo)
  - Mensagem de orientação: "Digite o código do documento (ex: 1.0.01.00.13)"

### 2. **Tela de Resultados**
- **Propósito**: Exibir todos os tipos documentais e temporalidades associados a um código
- **Conteúdo Principal**:
  - Cabeçalho com o código pesquisado
  - Lista de cards, cada um contendo:
    - **Tipo**: O tipo documental específico
    - **Temporalidade**: O valor da temporalidade (número ou texto de observação)
  - Botão "Voltar" ou gesto de swipe para retornar à busca
  - Se nenhum resultado encontrado: mensagem "Código não encontrado"

### 3. **Tela de Vazio (No Results)**
- **Propósito**: Comunicar quando nenhum documento é encontrado
- **Conteúdo Principal**:
  - Ícone de documento não encontrado
  - Mensagem: "Nenhum documento encontrado para o código: [código]"
  - Botão "Tentar Novamente" que retorna ao campo de busca

---

## Fluxo de Usuário Principal

1. **Usuário abre o app** → Tela de Busca
2. **Usuário digita o código** (ex: "1.0.01.00.13") → Busca em tempo real ou ao pressionar "Pesquisar"
3. **Sistema encontra resultados** → Exibe Tela de Resultados com todos os tipos e temporalidades
4. **Usuário visualiza informações** → Pode copiar código ou temporalidade (opcional)
5. **Usuário retorna** → Toca "Voltar" ou usa gesto de swipe para nova busca

---

## Escolhas de Design

### Cores
- **Cor Primária**: `#0a7ea4` (azul profissional) - Usado em botões, links e destaques
- **Fundo**: `#ffffff` (branco em modo claro) / `#151718` (cinza escuro em modo escuro)
- **Texto Principal**: `#11181C` (cinza escuro em modo claro) / `#ECEDEE` (cinza claro em modo escuro)
- **Texto Secundário**: `#687076` (cinza médio)
- **Cards/Superfícies**: `#f5f5f5` (cinza claro em modo claro) / `#1e2022` (cinza mais escuro em modo escuro)
- **Bordas**: `#E5E7EB` (cinza muito claro em modo claro) / `#334155` (cinza em modo escuro)

### Tipografia
- **Títulos**: Font size 24-28px, weight 700 (bold)
- **Subtítulos**: Font size 16-18px, weight 600 (semibold)
- **Corpo**: Font size 14-16px, weight 400 (regular)
- **Labels**: Font size 12-14px, weight 500 (medium)

### Componentes Principais
- **SearchBar**: Campo de entrada com ícone de lupa, placeholder "Digite o código..."
- **Card de Resultado**: Contém tipo documental e temporalidade, com borda sutil e sombra leve
- **Botão Primário**: Fundo azul, texto branco, com feedback visual ao pressionar (escala 0.97)
- **Botão Secundário**: Fundo transparente, texto azul, borda azul

### Espaçamento
- **Padding interno**: 16px (padrão)
- **Margin entre cards**: 12px
- **Gap entre elementos**: 8-16px

### Orientação
- **Modo Portrait**: 9:16 (padrão para mobile)
- **Uso com uma mão**: Todos os elementos interativos estão acessíveis na parte inferior da tela

---

## Comportamentos e Interações

### Busca
- Busca em tempo real conforme o usuário digita (debounce de 300ms)
- Suporta busca parcial (ex: "1.0" encontra todos os códigos que começam com "1.0")
- Case-insensitive

### Feedback Visual
- Ao pressionar um botão: escala 0.97 + haptic feedback leve
- Ao carregar resultados: indicador de carregamento (spinner)
- Ao não encontrar: mensagem clara em cor de aviso

### Acessibilidade
- Todos os textos com contraste adequado (WCAG AA)
- Ícones acompanhados de rótulos de texto
- Tamanho mínimo de toque: 44x44pt

---

## Dados Estruturados

Cada documento possui:
- **COD**: Código único (ex: "1.0.01.00.13")
- **TIPO**: Tipo documental específico (ex: "Formulário")
- **TEMP**: Temporalidade em anos ou observação (ex: "1", "Permanente", "5 anos")

Um código pode ter múltiplos tipos associados, cada um com sua própria temporalidade.

---

## Próximos Passos

1. Implementar tela de busca com campo de entrada
2. Integrar dados JSON com lógica de filtro
3. Criar componente de card para exibir resultados
4. Adicionar tratamento de erros e estados vazios
5. Gerar logo e configurar branding
6. Testar fluxo completo end-to-end
