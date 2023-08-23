import { AuthSession } from './AuthSession';
import './globals.css';

export const metadata = {
  title: { default: 'VanilLog' },
  description: { default: 'VanilLog post page' },
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthSession>{children}</AuthSession>
      </body>
    </html>
  );
}
