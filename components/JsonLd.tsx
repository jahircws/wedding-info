export default function JsonLd({
  startDate,
  endDate,
  venueName,
  venueAddress,
}: {
  startDate: string;
  endDate: string;
  venueName: string;
  venueAddress: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Sara & Atef's Wedding",
    startDate,
    endDate,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: venueName,
      address: venueAddress,
    },
    description:
      "Sara Altamimi and Atef Merhej are getting married in Seville, Spain.",
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
