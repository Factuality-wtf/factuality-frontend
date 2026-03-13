import './styles.css';

type FactButtonProps = {
  onClick: () => void;
  loading: boolean;
};

export default function FactButton({ onClick, loading }: FactButtonProps) {
  return (
    <button onClick={onClick} disabled={loading} className="btn cursor-pointer">
      {loading ? <span className="btn_loading"></span> : 'get fact'}
    </button>
  );
}
