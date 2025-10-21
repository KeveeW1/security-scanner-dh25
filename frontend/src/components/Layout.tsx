import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-black">
      <main className="bg-black">{children}</main>
    </div>
  );
};

export default Layout;
