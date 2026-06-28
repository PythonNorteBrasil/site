interface ProgramHeaderProps {
  title: string;
  description: string;
}

export function SectionHeader({ title, description }: ProgramHeaderProps) {
  return (
    <div className="text-center space-y-3 mb-8">
      <h1
        className="text-3xl md:text-5xl font-bold text-[#004B23]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h1>

      <div className="w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-[#004B23] to-[#FF6B00]" />

      <p className="text-[#4A5D4E] text-base md:text-lg max-w-3xl mx-auto">
        {description}
      </p>
    </div>
  );
}
