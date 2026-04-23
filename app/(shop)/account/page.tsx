export default function AccountPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Account</h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Manage your profile and preferences. Wire this page to{" "}
        <code className="rounded bg-zinc-100 px-1 text-xs dark:bg-zinc-900">authService</code>{" "}
        and your UI.
      </p>
    </div>
  );
}
