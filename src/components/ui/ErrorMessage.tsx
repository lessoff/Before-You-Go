interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div
      className="mx-auto max-w-md rounded-2xl p-6 text-center"
      style={{ background: "#f43f5e10", border: "1px solid #f43f5e30" }}
    >
      <p className="text-base font-medium text-rose-300">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 rounded-xl px-5 py-2 text-sm font-semibold text-white transition-all"
          style={{ background: "#f43f5e22", border: "1px solid #f43f5e40" }}
        >
          Try Again
        </button>
      )}
    </div>
  );
}
