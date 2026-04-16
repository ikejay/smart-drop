import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { template: "%s | Admin — SmartDrop", default: "Admin — SmartDrop" },
};

/**
 * Admin shell layout.
 * Route protection is handled by middleware.ts (checks for admin session).
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-zinc-50">
      {/* Sidebar — TODO: extract to <AdminSidebar /> */}
      <aside className="w-64 bg-zinc-900 text-white flex-shrink-0 hidden md:flex flex-col p-6 gap-2">
        <p className="font-bold text-lg mb-6">SmartDrop Admin</p>
        <nav className="flex flex-col gap-1">
          {[
            { href: "/admin/dashboard", label: "Dashboard" },
            { href: "/admin/orders",    label: "Orders" },
            { href: "/admin/products",  label: "Products" },
            { href: "/admin/suppliers", label: "Suppliers" },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="px-3 py-2 rounded-lg text-sm hover:bg-zinc-800 transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b border-zinc-200 bg-white flex items-center px-6 shrink-0">
          <p className="text-sm text-zinc-500">Admin Panel</p>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
