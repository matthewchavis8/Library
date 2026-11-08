import HandNote from "./HandNote";

type Props = {
  note: string;
  title: React.ReactNode;
  children?: React.ReactNode;
};

export default function PageHeader({ note, title, children }: Props) {
  return (
    <header className="mx-auto max-w-6xl px-4 pt-14 pb-10 sm:px-6 sm:pt-20 sm:pb-14 lg:px-8">
      <HandNote>{note}</HandNote>
      <h1 className="mt-5 text-5xl leading-[1.02] font-normal sm:text-6xl lg:text-7xl">
        {title}
      </h1>
      {children && (
        <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
          {children}
        </p>
      )}
    </header>
  );
}
