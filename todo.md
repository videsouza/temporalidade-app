# Projeto TODO - Consulta de Temporalidade

## Funcionalidades Principais

- [x] Tela de busca com campo de entrada de código
- [x] Integração de dados JSON com lógica de filtro
- [x] Tela de resultados com lista de tipos e temporalidades
- [x] Tratamento de estado vazio (código não encontrado)
- [x] Busca em tempo real com debounce
- [x] Suporte a busca parcial (prefixo)
- [x] Histórico de buscas recentes

## Branding e Configuração

- [x] Gerar logo do aplicativo
- [x] Atualizar app.config.ts com nome e logo
- [x] Configurar cores do tema
- [ ] Testar modo claro/escuro

## Testes e Validação

- [ ] Testar fluxo de busca end-to-end
- [ ] Validar exibição de resultados
- [ ] Testar com códigos válidos e inválidos
- [ ] Verificar responsividade em diferentes tamanhos de tela
- [ ] Validar acessibilidade e contraste de cores

## Entrega

- [x] Remover visualização de testes
- [x] Criar tela de informações sobre o app
- [x] Adicionar aba "Sobre" com dados de contato
- [ ] Criar checkpoint final


## Funcionalidades Novas - Estrutura Expandida

- [x] Atualizar estrutura de dados para 5 colunas (COD, SERIE, TIPO, TEMP, OBS)
- [x] Exibir todas as informações na busca por código
- [x] Indicar campos vazios ao usuário
- [x] Implementar busca por palavras-chave
- [x] Seleção de colunas para busca por palavras-chave
- [x] Busca em qualquer lugar das colunas selecionadas


## Funcionalidades Especiais - Diários de Classe (5.3.02.01.12)

- [x] Criar tela especializada para Diários de Classe
- [x] Implementar seleção de tipo de educação (Infantil, Fundamental, EJA)
- [x] Implementar navegação por série/ano/fase dentro de cada tipo
- [x] Implementar cálculo automático de temporalidade
- [x] Adicionar link na tela de busca para acessar Diários de Classe
- [x] Criar testes para cálculo de temporalidade


## Refinamentos - Diários de Classe

- [x] Remover linha "Reter até o ano:" da tela de resultado
- [x] Agrupar níveis de Educação Infantil com mesma temporalidade

## Nova etapa - Categorias e busca por setores

- [x] Inspecionar a estrutura atual do app e a planilha `Setores.xlsx`.
- [x] Reorganizar a navegação em duas categorias: Busca de Temporalidade e Busca de Setores.
- [x] Implementar formatação automática do código numérico no campo de temporalidade.
- [x] Processar e integrar os dados de setores com busca por setor e campos relacionados.
- [x] Validar TypeScript, testes e o fluxo principal no preview.
