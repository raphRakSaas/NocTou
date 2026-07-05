function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
      <path d="M16.365 1.43c0 1.14-.42 2.06-1.11 2.79-.75.8-1.98 1.42-2.98 1.34-.13-1.1.43-2.24 1.1-2.94.75-.79 2.06-1.38 2.99-1.19zM20.5 17.24c-.4.93-.87 1.83-1.5 2.66-.85 1.13-1.73 2.26-3.11 2.28-1.35.03-1.79-.8-3.33-.8-1.55 0-2.03.78-3.31.83-1.34.05-2.36-1.22-3.22-2.34-1.75-2.29-3.1-6.47-1.29-9.3.9-1.4 2.5-2.29 4.24-2.32 1.3-.02 2.53.87 3.32.87.79 0 2.28-1.08 3.85-.92.66.03 2.5.27 3.68 2.02-.1.06-2.2 1.28-2.17 3.82.03 3.03 2.66 4.04 2.69 4.06-.02.08-.42 1.44-1.35 2.14z" />
    </svg>
  );
}

function PlayStoreIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
      <path d="M3.6 2.2c-.4.2-.6.6-.6 1.1v17.4c0 .5.2.9.6 1.1l9.9-9.8-9.9-9.8zm13.2 8.3l2.7-1.5c.6-.4 1-1 1-1.7s-.4-1.3-1-1.7L16.3 4l-3.1 3.1 3.6 3.4zm-3.6 3.6l3.1 3.1 2.9-1.6c.6-.4 1-1 1-1.7s-.4-1.3-1-1.7l-2.9-1.6-3.1 3.5zM4.3 21.6c.2.1.5.1.7 0l9.2-5.1-3.1-3.1-6.8 8.2zm.7-19.3c-.2-.1-.5-.1-.7 0l6.8 8.2 3.1-3.1-9.2-5.1z" />
    </svg>
  );
}

interface StoreBadgeProps {
  icon: React.ReactNode;
  platformLabel: string;
  statusLabel: string;
}

function StoreBadge({ icon, platformLabel, statusLabel }: StoreBadgeProps) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-5 py-3 text-left shadow-sm">
      <span className="text-accent">{icon}</span>
      <div>
        <p className="text-[11px] font-medium uppercase tracking-wide text-muted">
          {statusLabel}
        </p>
        <p className="text-sm font-semibold text-foreground">{platformLabel}</p>
      </div>
    </div>
  );
}

export function DownloadButtons() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <StoreBadge
        icon={<AppleIcon />}
        platformLabel="App Store"
        statusLabel="Bientôt disponible"
      />
      <StoreBadge
        icon={<PlayStoreIcon />}
        platformLabel="Google Play"
        statusLabel="Bientôt disponible"
      />
    </div>
  );
}
