import type { Metadata } from "next";
import ContactForm from "../../components/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Aidan Barends",
  description:
    "Get in touch with Aidan Barends for job opportunities, collaborations, or questions about his projects.",
  openGraph: {
    title: "Contact | Aidan Barends",
    description:
      "Get in touch with Aidan Barends for job opportunities, collaborations, or questions about his projects.",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactForm />;
}