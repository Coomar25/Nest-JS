import { access } from 'fs';
import { PrismaService } from 'src/prisma/prisma.service';

export const config = {
  TOKEN: {
    access: {
      secret: process.env.TOKEN_ACCESS_SECRET,
      expiresIn: '1h',
    },
    refresh: {
      secret: process.env.TOKEN_REFRESH_SECRET,
      expiresIn: '7d',
    },
  },
  MAILER: {
    service: 'gmail',
    auth: {
      user: process.env.APP_EMAIL,
      pass: process.env.APP_EMAIL_PASSWORD,
    },
  },
  PRISMA_CLIENT: PrismaService,
};
