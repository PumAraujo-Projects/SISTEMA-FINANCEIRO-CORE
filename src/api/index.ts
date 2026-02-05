import app from "../vercel";

export default async function handler(req: any, res: any) {
  app(req, res);
}
