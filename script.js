// ---------- estado (tudo em memória, no navegador) ----------
let atletas = [
  {nome:"João Silva", idade:22, posicao:"Atacante", clube:"Nexus FC"},
  {nome:"Pedro Alves", idade:19, posicao:"Meio-campo", clube:"Nexus FC"},
  {nome:"Carlos Mendes", idade:26, posicao:"Zagueiro", clube:"Nexus FC"},
  {nome:"Rafael Souza", idade:24, posicao:"Lateral", clube:"Nexus FC"},
];
let partidas = [
  {data:"21/09/2026", adversario:"Rival FC", campeonato:"Estadual", video:"Processado"},
  {data:"14/09/2026", adversario:"União AC", campeonato:"Estadual", video:"Processado"},
];
let desempenho = [
  {atleta:"João Silva", vel:31.2, dist:9840},
  {atleta:"Pedro Alves", vel:28.9, dist:10230},
  {atleta:"Carlos Mendes", vel:24.1, dist:8460},
];
const eventos = [
  {t:"12:34", tipo:"DESORGANIZAÇÃO TÁTICA", desc:"Linha defensiva aberta durante contra-ataque adversário.", conf:"92% · IA"},
  {t:"27:02", tipo:"PRESSÃO ALTA FALHA", desc:"Superioridade numérica adversária no meio-campo.", conf:"81% · IA"},
  {t:"58:41", tipo:"DESORGANIZAÇÃO TÁTICA", desc:"Dispersão elevada do time após escanteio.", conf:"87% · IA"},
];

const esc = t => { const d=document.createElement('div'); d.textContent=t??''; return d.innerHTML; };
const vazia = (n,txt) => `<tr><td colspan="${n}" class="celula-vazia">${txt}</td></tr>`;

function render(){
  document.getElementById('tb-atletas').innerHTML = atletas.length ? atletas.map((a,i)=>`
    <tr><td>${esc(a.nome)}</td><td>${a.idade}</td><td>${esc(a.posicao)}</td><td>${esc(a.clube)}</td>
    <td><button class="btn-remover" onclick="removerAtleta(${i})">✕</button></td></tr>`).join('')
    : vazia(5,'Nenhum atleta cadastrado ainda.');

  document.getElementById('tb-partidas').innerHTML = partidas.length ? partidas.map((p,i)=>`
    <tr><td>${esc(p.data)}</td><td>${esc(p.adversario)}</td><td>${esc(p.campeonato)}</td><td>${esc(p.video)}</td>
    <td><button class="btn-remover" onclick="removerPartida(${i})">✕</button></td></tr>`).join('')
    : vazia(5,'Nenhuma partida registrada ainda.');

  document.getElementById('tb-desempenho').innerHTML = desempenho.length ? desempenho.map((d,i)=>`
    <tr><td>${esc(d.atleta)}</td>
    <td><input class="num-editavel" type="number" step="0.1" value="${d.vel}" onchange="editarDesempenho(${i},'vel',this.value)"> km/h</td>
    <td><input class="num-editavel" type="number" step="1" value="${d.dist}" onchange="editarDesempenho(${i},'dist',this.value)"> m</td>
    <td><button class="btn-remover" onclick="removerDesempenho(${i})">✕</button></td></tr>`).join('')
    : vazia(4,'Nenhum registro de desempenho ainda.');

  document.getElementById('lista-eventos').innerHTML = eventos.map(e=>`
    <div class="evento-linha"><div class="evento-hora">${e.t}</div>
    <div class="evento-corpo"><strong>${e.tipo}</strong><p>${e.desc} — confiança ${e.conf}</p></div></div>`).join('');

  document.getElementById('m-atletas').textContent = atletas.length;
  document.getElementById('m-partidas').textContent = partidas.length;
  document.getElementById('m-eventos').textContent = eventos.length;
  document.getElementById('m-vel').textContent = desempenho.length
    ? (desempenho.reduce((s,d)=>s+Number(d.vel),0)/desempenho.length).toFixed(1) : '0';

  buscarScouting();
}

function gerarHeatmap(){
  let html='';
  for(let i=0;i<140;i++){ const it=Math.random()*Math.random(); html+=`<div class="heatmap-celula" style="background:rgba(47,111,237,${it.toFixed(2)})"></div>`; }
  document.getElementById('heatmap').innerHTML = html;
}

function buscarScouting(){
  const pos = (document.getElementById('s-posicao')?.value||'').trim().toLowerCase();
  const idadeMin = Number(document.getElementById('s-idade')?.value||0);
  const resultados = atletas.filter(a =>
    (!pos || a.posicao.toLowerCase().includes(pos)) && a.idade >= idadeMin
  ).map(a=>{
    const regs = desempenho.filter(d=>d.atleta===a.nome);
    const vel = regs.length ? (regs.reduce((s,d)=>s+Number(d.vel),0)/regs.length).toFixed(1) : null;
    return {...a, vel};
  });
  document.getElementById('tb-scouting').innerHTML = resultados.length ? resultados.map(r=>`
    <tr><td>${esc(r.nome)}</td><td>${r.idade}</td><td>${esc(r.posicao)}</td><td>${r.vel?r.vel+' km/h':'—'}</td></tr>`).join('')
    : vazia(4,'Nenhum atleta encontrado para esses filtros.');
}

function removerAtleta(i){ atletas.splice(i,1); render(); mostrarToast('Atleta removido.'); }
function removerPartida(i){ partidas.splice(i,1); render(); mostrarToast('Partida removida.'); }
function removerDesempenho(i){ desempenho.splice(i,1); render(); mostrarToast('Registro removido.'); }
function editarDesempenho(i,campo,valor){ desempenho[i][campo]=Number(valor); render(); mostrarToast('Registro atualizado.'); }

document.getElementById('form-atleta').addEventListener('submit', e=>{
  e.preventDefault();
  atletas.push({nome:document.getElementById('a-nome').value.trim(), idade:Number(document.getElementById('a-idade').value),
    posicao:document.getElementById('a-posicao').value.trim(), clube:document.getElementById('a-clube').value.trim()});
  e.target.reset(); render(); mostrarToast('Atleta cadastrado com sucesso.');
});
document.getElementById('form-partida').addEventListener('submit', e=>{
  e.preventDefault();
  const arq = document.getElementById('p-video').files[0];
  partidas.push({data:document.getElementById('p-data').value.trim(), adversario:document.getElementById('p-adversario').value.trim(),
    campeonato:document.getElementById('p-campeonato').value.trim(), video: arq?'Em processamento':'Aguardando vídeo'});
  e.target.reset(); render(); mostrarToast('Partida registrada com sucesso.');
});
document.getElementById('form-desempenho').addEventListener('submit', e=>{
  e.preventDefault();
  desempenho.push({atleta:document.getElementById('d-atleta').value.trim(), vel:Number(document.getElementById('d-vel').value),
    dist:Number(document.getElementById('d-dist').value)});
  e.target.reset(); render(); mostrarToast('Registro adicionado.');
});
document.getElementById('form-scouting').addEventListener('submit', e=>{ e.preventDefault(); buscarScouting(); mostrarToast('Busca atualizada.'); });

// ---------- função (papel) ----------
let papel='gestor';
document.querySelectorAll('.funcao-card').forEach(c=>c.addEventListener('click',()=>{
  document.querySelectorAll('.funcao-card').forEach(x=>x.classList.remove('ativo'));
  c.classList.add('ativo'); papel=c.dataset.papel;
}));

// ---------- login ----------
document.getElementById('form-login').addEventListener('submit', e=>{
  e.preventDefault();
  const email = document.getElementById('input-email').value.trim();
  const erro = document.getElementById('erro-login');
  if(!email || !email.includes('@')){ erro.classList.add('mostrar'); return; }
  erro.classList.remove('mostrar');
  document.getElementById('topo-email').textContent = email;
  const badge = document.getElementById('badge-papel');
  badge.textContent = papel; badge.className = 'badge ' + (papel==='gestor'?'badge-gestor':'badge-operador');
  document.body.classList.toggle('papel-gestor', papel==='gestor');
  if(papel==='operador') trocarPagina('visao-geral');
  document.getElementById('login').style.display='none';
  document.getElementById('app').classList.add('ativo');
  gerarHeatmap();
});

// ---------- navegação ----------
function trocarPagina(nome){
  document.querySelectorAll('.nav-item[data-pagina]').forEach(b=>b.classList.toggle('ativo', b.dataset.pagina===nome));
  document.querySelectorAll('.pagina[data-pagina]').forEach(p=>p.classList.toggle('ativa', p.dataset.pagina===nome));
  document.getElementById('sidebar').classList.remove('aberta');
}
document.querySelectorAll('.nav-item[data-pagina]').forEach(b=>b.addEventListener('click',()=>trocarPagina(b.dataset.pagina)));
document.getElementById('btn-sair').addEventListener('click',()=>{
  document.getElementById('app').classList.remove('ativo');
  document.getElementById('login').style.display='grid';
  document.getElementById('input-email').value='';
});
document.getElementById('btn-menu').addEventListener('click',()=>document.getElementById('sidebar').classList.toggle('aberta'));

// ---------- toast ----------
let toastTO;
function mostrarToast(msg){
  const t=document.getElementById('toast'); t.textContent='✦ '+msg; t.classList.add('mostrar');
  clearTimeout(toastTO); toastTO=setTimeout(()=>t.classList.remove('mostrar'),3000);
}

render();
