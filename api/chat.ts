import{handleChat}from'../worker/chat.mjs';
export async function POST(request:Request){return handleChat(request,process.env);}
