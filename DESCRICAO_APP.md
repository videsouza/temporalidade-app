# Temporalidade - Aplicativo de Consulta de Documentos

## Visão Geral

O **Temporalidade** é um aplicativo móvel desenvolvido para facilitar a consulta rápida e eficiente da temporalidade de documentos. Permite que usuários busquem informações sobre prazos de retenção, conservação e descarte de documentos de forma intuitiva e acessível, diretamente de seus dispositivos móveis.

## Funcionalidades Principais

### 1. Busca por Código de Documento
Os usuários podem consultar a temporalidade digitando o código específico do documento. O aplicativo exibe instantaneamente:
- **Código**: Identificação única do documento
- **Série**: Classificação documental
- **Tipo**: Categoria específica do documento
- **Temporalidade**: Prazo de retenção (em anos, meses ou permanente)
- **Observações**: Notas adicionais e recomendações especiais

O aplicativo identifica automaticamente campos vazios e os indica claramente ao usuário, evitando confusões.

### 2. Busca por Palavras-chave
Para usuários que não conhecem o código exato, o aplicativo oferece busca por palavras-chave com seleção flexível de colunas:
- Busque em **Série**, **Tipo**, **Temporalidade** ou **Observações**
- Selecione quais colunas deseja pesquisar
- A busca funciona em qualquer parte do texto (busca parcial)
- Resultados aparecem instantaneamente com destaque das informações relevantes

### 3. Histórico de Buscas
O aplicativo armazena automaticamente as últimas 10 buscas realizadas:
- Acesso rápido a consultas anteriores
- Remova itens individuais do histórico
- Limpe todo o histórico com um clique
- Dados salvos localmente no dispositivo

### 4. Destaque de Observações Especiais
O aplicativo identifica automaticamente temporalidades especiais:
- **PERMANENTE**: Documentos com retenção indefinida
- **Referências especiais**: USE:, UTILIZAR, APROVAÇÃO, TCE
- Estas são destacadas visualmente em cor de aviso para chamar atenção

## Benefícios

- **Acessibilidade**: Disponível em qualquer lugar, a qualquer hora
- **Rapidez**: Busca em tempo real com resultados instantâneos
- **Precisão**: Acesso a base de dados completa com 238 registros
- **Facilidade de Uso**: Interface intuitiva e responsiva
- **Segurança**: Dados armazenados localmente no dispositivo
- **Flexibilidade**: Duas formas de busca (código e palavra-chave)

## Dados Disponíveis

O aplicativo contém informações sobre **238 documentos** organizados em:
- **230 códigos únicos** de documentação
- **77 tipos documentais** diferentes
- **19 valores de temporalidade** distintos
- **69 observações especiais** e recomendações

## Plataformas Suportadas

- iOS (iPhone e iPad)
- Android (smartphones e tablets)
- Web (navegadores modernos)

## Tecnologia

Desenvolvido com **React Native** e **Expo**, garantindo:
- Performance otimizada
- Interface responsiva e moderna
- Compatibilidade com múltiplas plataformas
- Atualizações frequentes e fáceis

## Casos de Uso

1. **Gestores de Documentos**: Verificar rapidamente prazos de retenção
2. **Arquivistas**: Consultar classificação e temporalidade de séries documentais
3. **Servidores Públicos**: Saber quanto tempo manter documentos antes de descarte
4. **Pesquisadores**: Acessar informações sobre organização documental
5. **Cidadãos**: Entender prazos de conservação de documentos pessoais

## Próximas Melhorias Planejadas

- Exportação de resultados em PDF
- Filtros avançados por temporalidade
- Sincronização com servidor para múltiplos dispositivos
- Integração com sistemas de gestão documental
