# 🎨 Interface e Usabilidade (IHC) — GreenER

> **Critérios da Rubrica:** IHC01, IHC02, IHC03, IHC04, IHC05, IHC06  
> **Repositório:** [abpundefined/3DSM-ABP-UNDEFINED](https://github.com/abpundefined/3DSM-ABP-UNDEFINED)  
> **Equipe:** Undefined  
> **Link do Protótipo no Figma:** [Acessar Projeto no Figma](https://www.figma.com/design/SEU_LINK_3DSM) *(Substituir pelo link oficial do time)*  

---

## 👥 1. Identificação de Usuários e Tarefas (IHC01)

Para orientar o design da interface e a hierarquia visual das informações, foram definidas duas **Personas** principais representativas dos usuários da plataforma:

### 👤 Persona 1: Beatriz Menezes — Gestora de TI e Sustentabilidade (ESG)
* **Perfil:** 38 anos, diretora de tecnologia responsável pelo cumprimento de metas ESG e descarbonização de TI.
* **Necessidades:**
  - Acompanhar se a organização está dentro do orçamento de emissões de carbono corporativo.
  - Relatórios consolidados de emissão mensal e trimestral em formato claro e exportável.
  - Identificar quais aplicações em nuvem mais oneram a pegada de carbono da empresa.
* **Tarefas Prioritárias na Plataforma:**
  1. Visualizar o total agregado de emissões de $CO_2e$ e consumo em kWh no painel principal.
  2. Consultar o **Ranking de Impacto** para descobrir os 3 serviços mais poluentes do mês.
  3. Comparar dois serviços equivalentes para justificar migração para data centers mais sustentáveis.

---

### 👤 Persona 2: Lucas Ferreira — Engenheiro de Operações e DevOps
* **Perfil:** 27 anos, engenheiro de confiabilidade (SRE) responsável pela disponibilidade e eficiência de microsserviços.
* **Necessidades:**
  - Monitoramento contínuo em tempo real do status das aplicações.
  - Rápida identificação de anomalias (serviços caídos ou que pararam de enviar telemetria).
  - Configuração de intervalos de coleta e limites de tolerância a falhas.
* **Tarefas Prioritárias na Plataforma:**
  1. Acompanhar a lista de serviços ativos, indisponíveis e sem métricas no dashboard operacional.
  2. Inspecionar o gráfico histórico de CPU, memória e energia de um serviço com incidente recente.
  3. Acessar a área autenticada para reconfigurar a periodicidade das coletas.

---

## 📱 2. Protótipos e Fluxos de Navegação (IHC02)

O fluxo da aplicação foi estruturado de forma intuitiva, permitindo que as decisões críticas sejam tomadas com no máximo dois cliques a partir do dashboard principal:

```mermaid
flowchart TD
    Dashboard["📊 Dashboard Principal (Totais ESG & Lista)"]
    ServiceDetail["🔍 Detalhe do Serviço (Gráficos Históricos)"]
    RankingPage["🏆 Ranking de Impacto (Mais Poluentes)"]
    ComparePage["⚖️ Comparação Lado a Lado"]
    MapPage["🗺️ Mapa Geográfico de Distribuição"]
    AdminLogin["🔐 Login Administrativo"]
    AdminSettings["⚙️ Configurações de Monitoramento"]

    Dashboard --> ServiceDetail
    Dashboard --> RankingPage
    Dashboard --> ComparePage
    Dashboard --> MapPage
    Dashboard --> AdminLogin
    AdminLogin --> AdminSettings
```

### 🖼️ Telas Planejadas e Prototipadas no Figma:
1. **Dashboard Geral:** Exibição dos cards de totais (Energia em kWh e Carbono em kgCO₂e), barra de busca de serviços e tabela com status em tempo real.
2. **Visualização em Mapa:** Mapa-múndi interativo com pontos georreferenciados coloridos e com ícones informativos.
3. **Módulo de Comparação:** Seleção múltipla de serviços com gráficos sobrepostos de intensidade de carbono.
4. **Painel de Configuração:** Formulário limpo e restrito via autenticação JWT para ajuste de rotinas.

---

## 🏷️ 3. Clareza de Indicadores, Unidades e Acessibilidade (IHC03)

O GreenER foi projetado sob fortes diretrizes de acessibilidade e transparência de dados (**RNF02**):

- **Unidades Explícitas:** Nenhum número é exibido sem unidade de medida formal associada (ex: `14.85 kWh`, `354.2 gCO₂e`, `1.25 PUE`).
- **Data e Hora de Atualização:** A interface exibe no topo o timestamp preciso da última coleta realizada (`Última sincronização: 01/10/2026 às 15:42:10`).
- **Acessibilidade de Estados (Não depende apenas de cor):**
  - 🟢 **Ativo:** Acompanhado pelo ícone de check `✓` e texto explicativo `"Operacional"`.
  - 🔴 **Indisponível:** Acompanhado pelo ícone de alerta `⚠` e texto explícito `"Falha de Conexão"`.
  - 🟡 **Sem Métricas:** Acompanhado pelo ícone de interrogação `?` e texto `"Sem Telemetria"`.
- **Modo Alto Contraste:** Relação de contraste entre texto e fundo superior a `4.5:1` conforme diretrizes WCAG 2.1 AA.

---

## ⚡ 4. Responsividade e Estados de Feedback (IHC04)

- **Feedback de Carregamento:** Utilização de componentes de *Skeleton Loading* durante as requisições à API, evitando quebras visuais de layout.
- **Empty States:** Telas sem dados (ex: busca sem resultados ou ausência de coletas no período) apresentam ilustrações dedicadas e instruções claras de como proceder.
- **Tratamento Amigável de Erros:** Quando uma API externa falha, a interface exibe um banner informativo explicativo (ex: *"A API de Carbon Intensity está temporariamente indisponível; exibindo estimativa com base na média regional brasileira"*), sem interromper a navegação.
- **Mobile First e Flexbox:** O layout adapta-se fluidamente de monitores ultrawide (1440px+) até smartphones compactos (360px).

---

## 🧪 5. Avaliação de Usabilidade (IHC05)

### 5.1. Avaliação heurística dos protótipos — registro inicial

**Atividade:** [PBI-23 — Protótipos e avaliação de usabilidade](https://github.com/abpundefined/3DSM-ABP-UNDEFINED/issues/23).  
**Responsável:** Thales Cambraia Dias.  
**Situação:** avaliação heurística realizada; documentação em consolidação.  
**Data da avaliação:** a registrar pelo responsável.  
**Protótipo:** [GreenER no Figma](https://www.figma.com/design/rnEO8oYXAzDEnUbBt2NWwu/GreenER-Figma).

#### Objetivo e método

Verificar a clareza e a organização das telas usando princípios de usabilidade, como feedback, consistência e controle do usuário.

**Telas avaliadas:** dashboard sem dados e com dados demonstrativos, gráficos, lista de serviços e acesso administrativo.

#### Evidências visíveis nos protótipos

As observações das capturas abaixo devem ser confirmadas com as anotações da avaliação realizada pelo responsável.

| Heurística de Nielsen | Evidência visível |
| --- | --- |
| H1 — Visibilidade do estado do sistema | Mensagem “Aguardando primeira coleta”, identificação dos dados fictícios e indicação de atualização simulada. |
| H2 — Correspondência com o mundo real | Rótulos de energia e emissões, unidades kWh e kgCO₂e e explicações dos indicadores no estado vazio. |
| H3 — Controle e liberdade do usuário | Opções “Voltar ao dashboard” e “Voltar ao estado vazio”; funcionamento a conferir no protótipo navegável. |
| H4 — Consistência e padrões | Identidade visual verde, cabeçalho e apresentação dos cards seguem um padrão entre as telas. |
| H8 — Design estético e minimalista | Totais ambientais aparecem em destaque, com gráficos e lista de serviços agrupados em blocos. |

#### Ajustes sugeridos para confirmação

- **Acesso administrativo (H1/H5):** a tela informa que não permite entrar, mas exibe o botão “Entrar”. Avaliar desabilitar a ação ou identificá-la como demonstração.
- **Leitura:** conferir a legibilidade dos textos menores e o contraste. As capturas não comprovam uma relação de contraste específica.

São sugestões a confirmar; a aplicação dos ajustes ainda não está documentada.

#### Pendências para concluir o registro

- Informar a data real e os resultados da avaliação.
- Anexar evidências dos achados confirmados e dos ajustes, preferencialmente antes/depois.
- Justificar quando um ajuste não for necessário.

O teste com usuários da Sprint 3 continua planejado. Este registro não apresenta resultados de participantes ou questionário SUS.

**Referência:** [10 heurísticas de usabilidade de Jakob Nielsen — Nielsen Norman Group](https://www.nngroup.com/articles/ten-usability-heuristics/).

### 5.2. Plano de teste com usuários — previsto para Sprint 3

O teste de usabilidade está planejado para o início da Sprint 3 com **5 usuários reais** (estudantes e profissionais de TI).

#### 📋 Roteiro de teste proposto

1. **Tarefa 1:** localizar o serviço que consumiu a maior quantidade de energia nas últimas 24 horas.
2. **Tarefa 2:** selecionar dois serviços e comparar suas emissões de CO₂e.
3. **Tarefa 3:** identificar se existe algum serviço fora do ar e qual sua região de hospedagem.

#### Métricas previstas

- Taxa de sucesso na conclusão das tarefas sem assistência.
- Tempo de execução por tarefa.
- Questionário SUS (System Usability Scale) ao final do teste.

---

## 🚀 6. Melhorias Decorrentes da Avaliação (IHC06)

As sugestões da avaliação heurística estão registradas na seção 5.1. Após sua confirmação, os ajustes serão acompanhados na atividade #23.

Para cada melhoria, deverão ser registrados:

- Problema identificado e heurística relacionada.
- Ajuste proposto.
- Situação do ajuste: pendente, implementado ou validado.
- Evidências da interface antes e depois da alteração.

Até o momento, a aplicação das sugestões da avaliação heurística não está documentada.

Após os testes com usuários previstos para a Sprint 3, os problemas identificados também serão registrados em issues do GitHub e acompanhados até sua correção e validação.
