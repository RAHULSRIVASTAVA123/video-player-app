import "../styles/skeleton.css";

const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-thumb" />
      <div className="skeleton-text" />
      <div className="skeleton-text small" />
    </div>
  );
};

export default SkeletonCard;