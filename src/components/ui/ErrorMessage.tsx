interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div
      className="mx-auto max-w-md rounded-xl p-6 text-center"
      style={{
        background: "color-mix(in srgb, var(--danger) 6%, transparent)",
        border: "1px solid color-mix(in srgb, var(--danger) 20%, transparent)",
      }}
    >
      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 rounded-lg px-5 py-2 text-xs font-semibold uppercase tracking-widest transition-all"
          style={{
            background: "color-mix(in srgb, var(--danger) 12%, transparent)",
            border: "1px solid color-mix(in srgb, var(--danger) 25%, transparent)",
            color: "var(--danger)",
          }}
        >
          Try Again
        </button>
      )}
    </div>
  );
}
