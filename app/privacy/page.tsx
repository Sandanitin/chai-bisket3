import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#050302] text-[#f5eddc] py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full border border-[#2d1a11] overflow-hidden">
              <Image
                src="/images/logo.jpg"
                alt="Chai Bisket"
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#f5eddc]/60">
                Chai Bisket
              </p>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#f5eddc]">
                Privacy Policy
              </h1>
            </div>
          </div>
          <Button
            variant="outline"
            asChild
            className="flex items-center gap-2 border-[#2d1a11] text-[#f5eddc] hover:bg-[#120a07]"
          >
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="bg-[#120a07] rounded-2xl shadow-sm border border-[#2d1a11] p-8 space-y-6 text-[#f5eddc]/80 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-[#f5eddc] mb-3">
              1. Information We Collect
            </h2>
            <p>
              We collect information you provide directly to us, such as when
              you place an order, sign up for our newsletter, or contact us.
              This may include your name, email address, phone number, and
              payment information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#f5eddc] mb-3">
              2. How We Use Your Information
            </h2>
            <p>
              We use the information we collect to process your orders,
              communicate with you, improve our services, and send you
              promotional messages (if you have opted in).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#f5eddc] mb-3">
              3. Information Sharing
            </h2>
            <p>
              We do not sell or rent your personal information to third parties.
              We may share your information with service providers who assist us
              in operating our website and conducting our business, such as
              payment processors.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#f5eddc] mb-3">
              4. Data Security
            </h2>
            <p>
              We take reasonable measures to protect your personal information
              from unauthorized access, use, or disclosure. However, no method
              of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#f5eddc] mb-3">
              5. Cookies
            </h2>
            <p>
              We use cookies to enhance your experience on our website. You can
              choose to disable cookies in your browser settings, but this may
              affect the functionality of our site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#f5eddc] mb-3">
              6. Your Rights
            </h2>
            <p>
              You have the right to access, correct, or delete your personal
              information. Please contact us if you wish to exercise these
              rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#f5eddc] mb-3">
              7. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at Support@chaibisketeats.com.
            </p>
          </section>

          <div className="pt-6 text-sm text-[#f5eddc]/50">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
}
