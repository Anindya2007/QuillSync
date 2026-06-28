import FeatureCard from "./FeatureCard";

export default function Features() {
  return (
    <section className="bg-[#d8d6ff] pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-4xl font-bold text-center">
          Powerful Features
        </h2>

        <p className="text-center text-gray-600 mt-4 max-w-2xl mx-auto">
          Everything you need to collaborate, organize knowledge,
          and work efficiently with your team.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          <FeatureCard
            icon="🤝"
            title="Real-time Collaboration"
            description="Edit together with your team in real time."
          />

          <FeatureCard
            icon="📝"
            title="Rich Document Editing"
            description="Create beautiful documents with formatting and media."
          />

          <FeatureCard
            icon="📁"
            title="Organized Workspaces"
            description="Keep projects and documents neatly organized."
          />

          <FeatureCard
            icon="🕒"
            title="Version History"
            description="Restore previous versions whenever needed."
          />
        </div>

      </div>
    </section>
  );
}