import "../styles/global.css";
import "../styles/variables.css";
import { PlayerProvider } from "@/context/PlayerContext";
import Sidebar from "@/components/layout/Sidebar";
import PlayerBar from "@/components/layout/PlayerBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PlayerProvider>
          <div className="appLayout">
            <aside className="sidebarArea">
              <Sidebar />
            </aside>
            <main className="mainContent">{children}</main>
            <PlayerBar />
          </div>
        </PlayerProvider>
      </body>
    </html>
  );
}
