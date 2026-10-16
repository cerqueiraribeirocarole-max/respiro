# RESPIRO — jogo e ateliê de pausas

React 19, TypeScript e Vite; Pointer Events, Canvas 2D, SVG e Web Audio. O frontend funciona sem cadastro. Publicação atual usa Worker ESM para servir os arquivos Vite e a API de conversa.

## Executar e validar

Node 22 ou superior. `npm ci`, `npm run dev` para atividades locais; a API não é servida pelo Vite dev. `npm run build` compila TypeScript, Vite e o Worker. `npm test` executa os testes de lógica, renderização React e contrato do chat. `node scripts/check-worker.mjs` valida o pacote. `node --experimental-vm-modules scripts/check-worker-runtime.mjs` valida a inicialização sem APIs Node.

## Disponível

- 60 fases: 12 por minijogo. Os IDs 0–29 permanecem compatíveis com os saves anteriores.
- Organização de mesa e cozinha com encaixe magnético e alternativa de toque; gradientes com desfazer; jardim livre persistente; bolhas.
- Desenho com dedo/mouse em canvas: pincel, borracha, oito cores, tamanho, simetria radial, desfazer/refazer, salvar e exportar PNG.
- Seis mandalas SVG com preenchimento por toque/teclado, desfazer, salvar e exportar SVG.
- Três sequências com três etapas cada. Todas podem ser puladas. Percepção opcional de ritmo antes/depois, sem pontuação clínica.
- Atenção ao presente em cinco passos opcionais, inspirada em práticas de grounding.
- Flor opcional com ritmos 4/4 e 4/6, sem retenção e sem esforço obrigatório.
- Oito paisagens sintetizadas combináveis, presets e volumes individuais: chuva, ondas, riacho, jardim sonoro, lareira, vento, ruído marrom e sinos. Sons interrompidos quando o aplicativo fica oculto.
- Desafio diário pela data de São Paulo, compartilhar resultado e refúgio com flores por fase inédita.
- Persistência local, PWA, cache offline do que foi acessado, controles de áudio, redução de movimento e foco de teclado em modais.

## Conversa com IA — integração preparada, ainda não ativada

Interface de mensagens e API `/api/chat` implementadas. Nenhum modelo foi chamado de verdade nesta sessão: não havia credencial nem modelo configurados. `/api/chat/status` devolve `available: false`; a interface informa indisponibilidade e desabilita envio. As respostas não são simuladas.

Configuração por segredos no servidor: `AI_GATEWAY_API_KEY`, `AI_MODEL` (ID atual do catálogo) e `RESPIRO_CHAT_ENABLED=true`. Não colocar chaves em código, chat ou variáveis `VITE_`. Configurar orçamento no provedor e testar uma chamada real antes de ativar para visitantes.

A API usa AI SDK 7 e Vercel AI Gateway. Exige mesma origem, valida conteúdo/tamanho/papéis, limita respostas, tem timeout e não registra o conteúdo das conversas. A conversa fica na memória da sessão do navegador e cada envio vai ao provedor; as políticas desse provedor continuam se aplicando. Consentimento explícito na interface. Sem diagnóstico, promessa clínica ou representação como terapeuta.

A limitação de frequência é básica por instância do Worker; antes de abrir a IA em escala, adicionar controle distribuído e limite de gastos no provedor. Não substitui suporte humano ou emergência. Testes da chamada usam um provedor substituído; isso verifica o contrato, não a qualidade clínica nem uma conexão real.

## Pesquisa e escopo de bem-estar

Referências acessíveis em `PESQUISA.md` e no próprio ateliê. Práticas de respiração confortável e percepção do ambiente inspiram as atividades. Estudos de mandalas e sons têm populações e resultados específicos; não validam este aplicativo como tratamento. Nenhum resultado contra ansiedade é garantido. Sons sintetizados não equivalem às intervenções de sons naturais estudadas.

## Limitações

Não houve automação de navegador, teste físico Android/iOS ou validação clínica. Canvas, áudio, instalação e sensação de interação ainda precisam de QA nesses ambientes. Não há painel administrativo remoto, sincronização, AdMob ou Billing ativos. Arte e paisagens sonoras são geradas em SVG/CSS/Web Audio, sem gravações ASMR profissionais.

A exportação de progresso das configurações inclui fases e jardim; desenho e mandalas têm exportações próprias. Limpar dados do navegador remove os trabalhos locais não exportados. Offline exige uma primeira visita; conversa de IA exigirá internet.

## Vercel

O frontend continua compatível com Vercel. `vercel.json` usa build Vite para evitar publicar o bundle Worker como arquivo estático. A API de conversa desta versão é do Worker; para Vercel é necessário adaptar as duas rotas e configurar as variáveis no projeto. Não foi feita publicação Vercel nesta sessão.

## Contas e Supabase (integração GitHub/Vercel)

Projeto Supabase separado: `xucgakskflfqfwgldqqe`, região São Paulo. Usuários e senhas são gerenciados exclusivamente pelo Supabase Auth; tabelas públicas têm apenas perfil e progresso privado com RLS. As credenciais publicáveis do projeto são identificadores de cliente e estão em `src/supabase-public.ts`; não há chave secret/service_role no frontend.

Rotas: `/cadastro`, `/entrar`, `/auth/confirm`, `/recuperar-senha`, `/nova-senha`, `/conta` e `/privacidade`. Login leva ao jogo por padrão. O redirecionamento `next` aceita só caminhos internos conhecidos. Recuperação exige sessão validada e o usuário escolhe a nova senha. Há controle de mostrar/ocultar senha.

Na conta, o usuário pode enviar seu progresso atual à nuvem ou restaurar a cópia salva. Não há sobrescrita automática entre dispositivos. Nome é salvo em `respiro_profiles`; fases e jardim em `respiro_saves`. Não enviamos desenhos, check-in de humor ou conversa da IA para estas tabelas.

Os modelos prontos estão em `supabase/templates/confirmation.html` e `recovery.html`, com prévia pública em `/email-preview.html`. Eles NÃO foram aplicados automaticamente ao serviço de envio: o conector disponível não oferece alteração das configurações Auth/SMTP. A aplicação no painel e a entrega real ainda precisam ser verificadas.

No Supabase, configurar Authentication > URL Configuration com a origem definitiva do Vercel como Site URL e permitir `/auth/confirm`, `/auth/callback` e `/nova-senha`. Aplicar os modelos em Authentication > Email Templates e configurar SMTP próprio para enviar a usuários fora da equipe. Sem isso, o serviço padrão restringe os destinatários e os links podem usar a URL padrão do projeto. Não desabilitar confirmação para contornar a configuração de e-mail.

O script `scripts/configure-supabase-auth.mjs` permite aplicar URLs e modelos com um token de gerenciamento fornecido por ambiente seguro; nunca lê ou grava o token em arquivo. Ele não foi executado nesta sessão e não configura SMTP. Não use uma chave de cliente no lugar do token de gerenciamento.

O repositório público não inclui a identidade da hospedagem Sites. Vercel usa build Vite e as rotas de API em `/api`; o pacote Worker continua disponível para a hospedagem original. Acesso direto ao projeto Vercel via conector encontrou erro 403 no escopo da equipe; o deploy via conexão Git depende da configuração já feita pelo proprietário.

Verificações desta integração: compilação TypeScript/Vite/Worker; testes de rotas seguras, senha, mensagens de erro e renderização de cadastro; consultas reais ao banco confirmaram RLS nas duas tabelas, oito políticas, zero concessões ao papel anônimo e apenas SELECT/INSERT/UPDATE/DELETE para authenticated. Não foi executado cadastro com envio real nem o clique de confirmação em uma caixa de e-mail.
