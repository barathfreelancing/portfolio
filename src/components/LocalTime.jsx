import { useEffect, useState } from 'react';
import { site } from '../data/site';

const format = (date) =>
  new Intl.DateTimeFormat('en-IN', { timeZone: site.timeZone, hour: 'numeric', minute: '2-digit' }).format(date);

// The owner's local time, so a visitor in another time zone knows when a reply is likely.
export default function LocalTime() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <time dateTime={now.toISOString()}>
      {format(now)} in {site.timeZoneLabel}
    </time>
  );
}
