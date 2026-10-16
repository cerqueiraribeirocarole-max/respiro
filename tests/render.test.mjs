import test from 'node:test';import assert from 'node:assert/strict';import{build}from'esbuild';import React from'react';import{renderToStaticMarkup}from'react-dom/server';import{mkdir}from'node:fs/promises';
await mkdir('node_modules/.cache',{recursive:true});
await build({entryPoints:['src/Experience.tsx'],outfile:'node_modules/.cache/respiro-render.mjs',bundle:true,platform:'node',format:'esm',packages:'external',jsx:'automatic'});
globalThis.document={addEventListener(){}};
const{GameHome,Sanctuary,Breathing}=await import('../node_modules/.cache/respiro-render.mjs');
test('entrada renderiza jogos, demonstração interativa e acesso ao desafio sem depender de API',()=>{const html=renderToStaticMarkup(React.createElement(GameHome,{done:[0,6],start(){},open(){},dailyDone:false}));for(const name of ['Tudo no Lugar','Cores em Harmonia','Jardim Zen','Bolhas Satisfatórias','Organize a Cozinha'])assert.ok(html.includes(name));assert.equal((html.match(/aria-label="Estourar bolha de demonstração/g)||[]).length,12);assert.ok(html.includes('Descobrir meu desafio'));});
test('refúgio representa progresso real e estado inicial',()=>{const empty=renderToStaticMarkup(React.createElement(Sanctuary,{count:0}));assert.ok(empty.includes('primeiro momento'));const grown=renderToStaticMarkup(React.createElement(Sanctuary,{count:7}));assert.equal((grown.match(/class="earned-flower"/g)||[]).length,7);});
test('flor de ritmo inicia pausada com controle explícito',()=>{const html=renderToStaticMarkup(React.createElement(Breathing));assert.ok(html.includes('Acompanhar a flor'));assert.ok(!html.includes('class="breath-flower inhale"'));});

await build({entryPoints:['src/Activities.tsx'],outfile:'node_modules/.cache/respiro-activities.mjs',bundle:true,platform:'node',format:'esm',packages:'external',jsx:'automatic'});
const {WellnessHub,PaintStudio,RespiroChat}=await import('../node_modules/.cache/respiro-activities.mjs');
test('ateliê renderiza desenho, pintura e todas as sequências',()=>{const html=renderToStaticMarkup(React.createElement(WellnessHub,{onBack(){}}));for(const text of ['Desenhe com o dedo','Pinte uma mandala','Criar e desacelerar','Voltar para o agora','Uma pausa sensorial'])assert.ok(html.includes(text));});
test('mandala tem áreas acessíveis para pintar pelo teclado',()=>{const html=renderToStaticMarkup(React.createElement(PaintStudio));assert.equal((html.match(/role="button"/g)||[]).length,25);assert.ok(html.includes('Exportar mandala'));});
test('conversa declara explicitamente IA e uso do provedor',()=>{const html=renderToStaticMarkup(React.createElement(RespiroChat));assert.ok(html.includes('não com uma pessoa ou terapeuta'));assert.ok(html.includes('provedor de IA'));assert.ok(html.includes('disabled'));});
await build({entryPoints:['src/Auth.tsx'],outfile:'node_modules/.cache/respiro-auth-render.mjs',bundle:true,platform:'node',format:'esm',packages:'external',jsx:'automatic'});
globalThis.location={pathname:'/cadastro',search:'',hash:'',origin:'https://respiro.example'};
const{AuthPage,AccountPage}=await import('../node_modules/.cache/respiro-auth-render.mjs');
test('cadastro renderiza campos reais e controle de visibilidade da senha',()=>{const html=renderToStaticMarkup(React.createElement(AuthPage));assert.ok(html.includes('signup-name'));assert.ok(html.includes('type="email"'));assert.equal((html.match(/Mostrar senha/g)||[]).length,2);assert.ok(html.includes('Criar minha conta'));});
test('conta inicia verificando autenticação, sem liberar dados',()=>{const html=renderToStaticMarkup(React.createElement(AccountPage));assert.ok(html.includes('Consultando sua conta'));assert.ok(!html.includes('Salvar progresso nesta conta'));});
