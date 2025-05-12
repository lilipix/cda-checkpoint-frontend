import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export function PageLayout() {
  return (
    <body className="min-h-screen">
      <Header />
      <main>
        <Outlet />
      </main>
    </body>
  );
}
