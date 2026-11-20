const SectionHeading = ({ tag, title, text }) => {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
        {tag}
      </span>

      <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
        {title}
      </h2>

      {text && <p className="mt-3 text-muted-foreground">{text}</p>}
    </div>
  );
};
export default SectionHeading;
