"use client";

const contactInfo = [
  { label: "EMAIL", value: "dilguisonis@gmail.com", href: "mailto:dilguisonis@gmail.com" },
  { label: "GITHUB", value: "github.com/dilguisonis", href: "https://github.com/dilguisonis" },
  { label: "LINKEDIN", value: "in/danilo-ariel-ilguisonis", href: "https://linkedin.com/in/danilo-ariel-ilguisonis" },
];

export function ContactWindow() {
  return (
    <div className="space-y-3 text-xs sm:text-sm">
      <div className="text-text-muted">{">"} ./contact.sh</div>
      <div className="space-y-2">
        {contactInfo.map((contact) => (
          <div key={contact.label} className="flex flex-col sm:flex-row sm:gap-2">
            <span className="text-neon-amber w-20 shrink-0">{contact.label}:</span>
            <a
              href={contact.href}
              target={contact.href.startsWith("http") ? "_blank" : undefined}
              rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-neon-cyan hover:underline break-all"
            >
              {contact.value}
            </a>
          </div>
        ))}
      </div>
      <div className="text-text-muted mt-4">// Feel free to reach out!</div>
      <div className="text-neon-cyan">{">"} <span className="text-neon-green cursor-blink">_</span></div>
    </div>
  );
}
