export default function Card({ children, title }) {
  return (
    <div>
      {title && <h2>{title}</h2>}
      <div>{children}</div>
    </div>
  );
}
