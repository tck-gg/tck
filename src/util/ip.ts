import { NextApiRequest } from 'next';

/**
 * Get's the IP address from a Next API route.
 * @param request The `NextApiRequest` object.
 * @returns The IP of the client. If the IP is unknown, it returns `"Unknown"`.
 */
export function getIp(request: NextApiRequest): string {
  let ip = request.headers['x-real-ip'] as string;
  const forwardedFor = request.headers['x-forwarded-for'] as string;

  if (!ip && forwardedFor) {
    ip = forwardedFor?.split(',').at(0) ?? 'Unknown';
  }
  return ip.includes('::') ? 'Unknown' : ip;
}
