import type { PropsWithChildren } from "react";
import Header from "./Header";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-gradient-to-br from-background to-muted">
      <Header />
      <main className="min-h-screen container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-muted text-center py-4">
        <div className="text-gray-400">
          <p className="text-sm text-gray-400 ">
            © {new Date().getFullYear()} My Application
          </p>
          <p className="text-sm text-gray-400">
            Built with{" "}
            <a
              href="https://reactjs.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              React
            </a>
            ,{" "}
            <a
              href="https://tailwindcss.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Tailwind CSS
            </a>
            ,{" "}
            <a
              href="https://vitejs.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Vite
            </a>
            ,{" "}
            <a
              href="https://tanstack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              TanStack
            </a>
            ,{" "}
            <a
              href="https://ui.shadcn.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              shadcn ui
            </a>
            ,{" "}
            <a
              href="hhttps://www.typescriptlang.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              TypeScript
            </a>
            ,{" "}
            <a
              href="https://recharts.org/en-US/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Recharts
            </a>{" "}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
