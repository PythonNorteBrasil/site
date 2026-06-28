declare namespace JSX {
  interface IntrinsicElements {
    "pretalx-schedule": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        "event-url"?: string;
        locale?: string;
        format?: string;
        style?: React.CSSProperties;
      },
      HTMLElement
    >;
  }
}
