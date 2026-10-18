import type { Metadata } from "next";
import { ContactEmail } from "@/components/ContactEmail";

export const metadata: Metadata = {
  title: "Contact | the bumblebee's",
  description: "Get in touch with the bumblebee's by email."
};

/**
 * Centers `/contact` content in the space between the header and footer.
 * Example: Reveal email shows the address with a space replacing @ beneath the heading.
 */
export default function ContactPage() {
  return (
    <main className="section-band contact-page">
      <h1 className="section-page-title">Contact</h1>
      <ContactEmail />
    </main>
  );
}
