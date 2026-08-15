export function refreshTokenKey(userId: string, jti: string): string {
  return `refresh-token:${userId}:${jti}`;
}

export function refreshTokenPattern(userId: string): string {
  return `refresh-token:${userId}:*`;
}

export function tokenVersionKey(userId: string): string {
  return `token-version:${userId}`;
}
