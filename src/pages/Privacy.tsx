import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: January 1, 2026</p>

        <div className="space-y-8 text-foreground/80 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p>
              Global Imports ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
            <p className="mb-3">
              We may collect information about you in a variety of ways. The information we may collect on the site
              includes:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Personal Data:</strong> Name, email address, phone number, shipping address, billing address
              </li>
              <li>
                <strong>Payment Information:</strong> Credit card details (processed securely by payment providers)
              </li>
              <li>
                <strong>Usage Data:</strong> Browser type, IP address, pages visited, time and date of visits
              </li>
              <li>
                <strong>Cookies:</strong> We use cookies to enhance your experience on our website
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
            <p className="mb-3">Global Imports uses the information we collect in the following ways:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>To process and fulfill your orders</li>
              <li>To send you promotional emails about new products and special offers</li>
              <li>To improve our website and customer service</li>
              <li>To prevent fraudulent transactions and other illegal activities</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Security of Your Information</h2>
            <p>
              We use administrative, technical, and physical security measures to protect your personal information.
              However, no method of transmission over the Internet or electronic storage is completely secure. While we
              strive to use commercially acceptable means to protect your personal information, we cannot guarantee
              absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Sharing Your Information</h2>
            <p className="mb-3">
              We do not sell, trade, or rent your personal information to others. We may share your information with:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Third-party service providers who assist us in operating our website and conducting business</li>
              <li>Law enforcement when required by law</li>
              <li>Business partners with your consent</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Your Privacy Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal data, including the right
              to access, correct, or delete your information. To exercise these rights, please contact us using the
              information provided below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. This Privacy Policy does not apply to these
              external sites, and we are not responsible for their privacy practices. We encourage you to review the
              privacy policies of any third-party sites before providing your information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or for other
              operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new
              Privacy Policy on this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">9. Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please contact us at:</p>
            <ul className="list-none mt-4 space-y-2">
              <li>Email: privacy@globalimports.com</li>
              <li>Phone: +91-11-XXXX-XXXX</li>
              <li>Address: New Delhi, India</li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Privacy
