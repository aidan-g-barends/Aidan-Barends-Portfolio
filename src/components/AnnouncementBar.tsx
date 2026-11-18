// Slim scrolling banner above the navbar, like the announcement bar on a shop.
// Reuses the .marquee styles from globals.css, so no extra CSS or JavaScript.
const messages = [
  "Open to junior developer roles",
  "Kite & Code is taking on new clients",
  "Websites and online stores built properly",
  "Based in Langebaan, working across South Africa",
];

export default function AnnouncementBar() {
  return (
    <div className="bg-accent text-background">
      <div className="marquee overflow-hidden py-2">
        <div className="marquee-track">
          {/* Two copies so the loop is seamless; the second is hidden from screen readers */}
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1 ? true : undefined}
              className="flex shrink-0 items-center gap-8 pr-8"
            >
              {messages.map((message) => (
                <li
                  key={message}
                  className="flex items-center gap-8 whitespace-nowrap text-xs font-medium tracking-wide"
                >
                  {message}
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-background/60" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
