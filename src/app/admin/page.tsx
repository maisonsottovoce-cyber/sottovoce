// Admin dashboard — requires a server runtime (Vercel/Node).
// Renders a static placeholder on GitHub Pages.
export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="body-copy text-muted">
        Admin requires a server runtime. Deploy to Vercel to use the admin panel.
      </p>
    </div>
  );
}
