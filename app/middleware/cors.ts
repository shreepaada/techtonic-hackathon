// middleware/cors.ts

import Cors from 'cors';
import type { NextApiResponse, NextApiRequest } from 'next';

// Initialize the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function initMiddleware(middleware: any) {
  return (req: NextApiRequest, res: NextApiResponse) =>
    new Promise<void>((resolve, reject) => {
      middleware(req, res, (result: any) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await initMiddleware(cors)(req, res);

  // Rest of the API logic
  res.status(200).json({ message: 'Hello from CORS-enabled Next.js API!' });
}
