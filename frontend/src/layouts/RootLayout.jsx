import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-base-200">
      <Header />

      <main className="mx-auto w-full max-w-6xl flex-1 p-4 sm:p-6">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default RootLayout;