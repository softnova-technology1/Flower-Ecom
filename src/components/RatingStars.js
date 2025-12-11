// Simple rating stars component
export default function RatingStars({ rating, size = "medium" }) {
    const sizeClasses = {
        small: "text-sm",
        medium: "text-lg",
        large: "text-2xl",
    };

    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className={`flex items-center gap-1 ${sizeClasses[size]}`}>
            {[...Array(fullStars)].map((_, i) => (
                <span key={`full-${i}`} style={{ color: "#ffc107" }}>★</span>
            ))}
            {hasHalfStar && <span style={{ color: "#ffc107" }}>★</span>}
            {[...Array(emptyStars)].map((_, i) => (
                <span key={`empty-${i}`} style={{ color: "#e0e0e0" }}>★</span>
            ))}
        </div>
    );
}
