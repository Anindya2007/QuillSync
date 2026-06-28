export default function FeatureCard({
  icon,
  title,
  description,
}) {
  return (
    <div
      className="
        bg-white/80
        backdrop-blur-md
        border border-white/40
        rounded-2xl
        p-8
        h-full
        shadow-lg
        hover:shadow-2xl
        hover:-translate-y-2
        transition-all
        duration-300
      "
    >
      <div className="text-5xl mb-6">
        {icon}
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-3">
        {title}
      </h3>

      <p className="text-gray-600 leading-7">
        {description}
      </p>
    </div>
  );
}