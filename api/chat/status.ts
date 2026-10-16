import{handleChat}from'../../worker/chat.mjs';
export async function GET(request:Request){return handleChat(request,process.env);}
