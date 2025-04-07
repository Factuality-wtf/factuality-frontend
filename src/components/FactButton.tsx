type FactButtonProps = {
  onClick: () => void;
  loading: boolean;
};

export default function FactButton({ onClick, loading }: FactButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="w-[15rem] rounded-md bg-primary hover:bg-darken-90 py-2 px-4 border border-transparent text-center text-lg text-background hover:text-text font-semibold uppercase transition-all shadow-md hover:shadow-lg"
    >
      {loading ? "loading..." : "get fact"}
    </button>
  );
}
