import "./globals.css";

export const metadata = {
  title: "Computer ERP",
  description: "Laptop Repair ERP",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">{children}</body>
    </html>
  );
}
