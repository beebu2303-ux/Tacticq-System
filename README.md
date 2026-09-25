# TacticQ

Site estático (HTML + CSS + JS puro, sem frameworks e sem backend) da
plataforma TacticQ. Todos os dados (atletas, partidas, desempenho)
ficam na memória da página: cadastrar, remover e editar números
funciona de verdade enquanto a aba estiver aberta, mas nada é salvo
permanentemente — ao recarregar a página, os dados voltam ao estado
inicial definido em `script.js`.

## Arquivos

```
index.html    → estrutura da página (login + painel)
style.css     → todo o visual (tema escuro, cards, tabelas, responsivo)
script.js     → dados iniciais + toda a interação (login, cadastro, edição, navegação)
servidor.py   → opcional: sobe um servidor local para abrir sem duplo-clique
requirements.txt → sem dependências reais (servidor.py só usa a biblioteca padrão do Python)
```

## Como abrir

**Opção 1 — mais simples:** dê duplo-clique em `index.html`. Funciona na
maioria dos navegadores, mas alguns bloqueiam a fonte carregada do
Google Fonts quando o arquivo é aberto direto do disco (protocolo
`file://`).

**Opção 2 — com Python (recomendado):**

```bash
python3 servidor.py
```

Abre automaticamente `http://localhost:8080` no navegador. Requer
apenas Python 3 — nenhuma biblioteca externa.

## O que cada tela faz

| Página | Comportamento |
|---|---|
| Login | Valida o e-mail e guarda a função escolhida (Gestor ou Operador) para a sessão da aba |
| Visão Geral | Cards com contagens reais de atletas, partidas, eventos e velocidade média |
| Atletas | Cadastra e remove atletas — a tabela atualiza na hora |
| Partidas | Registra e remove partidas |
| Desempenho | Os campos de velocidade e distância na tabela são editáveis diretamente; também é possível adicionar novos registros |
| Análises de IA | Lista de eventos táticos de exemplo |
| Scouting | Filtra o elenco cadastrado por posição e idade mínima, cruzando com os dados de desempenho (só aparece para quem entra como Gestor) |

## Personalizando

- **Dados iniciais**: edite os arrays no topo de `script.js`
  (`atletas`, `partidas`, `desempenho`, `eventos`).
- **Cores**: estão centralizadas nas variáveis CSS no topo de
  `style.css` (bloco `:root`).
- **Textos/seções**: estão em `index.html`, organizados por
  comentários (`<!-- LOGIN -->`, `<!-- APP -->` etc.).

## Próximo passo possível

Como tudo vive só na memória da aba, os dados não persistem entre
sessões. Se um dia for necessário guardar os dados de verdade, o
caminho é conectar `script.js` a uma API real (banco de dados) no
lugar dos arrays fixos.
