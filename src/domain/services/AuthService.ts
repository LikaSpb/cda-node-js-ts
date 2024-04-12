import jwt from "jsonwebtoken";
import env from "../../config/env";

const { REFRESH_SECRET, JWT_SECRET } = env;

export class AuthService {
  private refreshTokenStore: Map<string, string> = new Map();

  // générer un JWT pour un user avec une durée de validité de 15 mn
  issueAccessToken(id: string): string {
    return jwt.sign({ userId: id }, JWT_SECRET, { expiresIn: "15m" });
  }

  issueRefreshToken(id: string): string {
    const refreshToken = jwt.sign({ userId: id }, REFRESH_SECRET, {
      expiresIn: "7d",
    });
    this.refreshTokenStore.set(id, refreshToken);
    return refreshToken;
  }

  refreshAccessToken(refreshToken: string): string | void {
    try {
      const payload = jwt.verify(
        refreshToken,
        REFRESH_SECRET
      ) as jwt.JwtPayload;
      const storedRefreshToken = this.refreshTokenStore.get(payload.userId);

      if (storedRefreshToken === refreshToken) {
        const newToken = this.issueAccessToken(payload.userId);
        this.refreshTokenStore.set(payload.userId, newToken);
        return newToken;
      } else {
        throw new Error("Invalid refresh token");
      }
    } catch (err) {
      throw new Error("Invalid refresh token");
    }
  }
}
