import './style.css';

function AriaLive({ mensagem }) {
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="aria-live-hidden"
    >
      {mensagem}
    </div>
  );
}


export default AriaLive;