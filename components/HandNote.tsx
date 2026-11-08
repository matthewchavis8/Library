import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  /** Little hand drawn mark that goes with the note */
  mark?: "underline" | "arrow-left" | "arrow-down" | "arrow-right" | "none";
  className?: string;
};

/** A short handwritten note, like something scribbled in the margin. */
export default function HandNote({
  children,
  mark = "underline",
  className,
}: Props) {
  return (
    <span
      className={cn(
        "relative inline-flex items-center gap-1.5 font-hand text-[1.35rem] leading-none text-accent",
        mark === "arrow-down" && "flex-col items-start",
        className,
      )}
    >
      {mark === "arrow-left" && <Arrow className="h-6 w-9 -scale-x-100" />}
      <span className="relative">
        {children}
        {mark === "underline" && (
          <svg
            aria-hidden
            viewBox="0 0 120 10"
            preserveAspectRatio="none"
            className="absolute -bottom-1.5 left-0 h-2 w-full"
          >
            <path
              d="M2 6.5C22 3 44 2.5 62 4.5S100 8 118 3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </span>
      {mark === "arrow-right" && <Arrow className="h-6 w-9" />}
      {mark === "arrow-down" && <Arrow className="mt-1 ml-8 h-8 w-12 rotate-[60deg]" />}
    </span>
  );
}

function Arrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 40 26"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2 18C10 6 22 4 35 12" />
      <path d="M27 6.5 35.5 12 28 18" />
    </svg>
  );
}
