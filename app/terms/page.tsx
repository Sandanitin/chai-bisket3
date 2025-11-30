import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-[#050302] text-[#f5eddc] py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full border border-[#2d1a11] overflow-hidden">
                            <Image src="/images/logo.jpg" alt="Chai Bisket" width={48} height={48} className="object-cover" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#f5eddc]/60">Chai Bisket</p>
                            <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#f5eddc]">Terms of Use</h1>
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
                        <h2 className="text-xl font-semibold text-[#f5eddc] mb-3">1. Acceptance of Terms</h2>
                        <p>
                            By accessing and using the Chai Bisket website and services, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-[#f5eddc] mb-3">2. Use of Service</h2>
                        <p>
                            Our website allows you to browse our menu, place orders for pickup or delivery, and learn about our catering services. You agree to use these services only for lawful purposes and in accordance with these Terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-[#f5eddc] mb-3">3. Ordering and Payment</h2>
                        <p>
                            When you place an order, you agree to provide accurate and complete information. All prices are subject to change without notice. We reserve the right to refuse or cancel any order for any reason.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-[#f5eddc] mb-3">4. Intellectual Property</h2>
                        <p>
                            The content, design, and logos on this website are the property of Chai Bisket and are protected by copyright and other intellectual property laws. You may not use, reproduce, or distribute any content without our prior written permission.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-[#f5eddc] mb-3">5. Limitation of Liability</h2>
                        <p>
                            Chai Bisket shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of our website or services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-[#f5eddc] mb-3">6. Changes to Terms</h2>
                        <p>
                            We reserve the right to modify these Terms of Use at any time. Your continued use of the website after any changes indicates your acceptance of the new terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-[#f5eddc] mb-3">7. Contact Us</h2>
                        <p>
                            If you have any questions about these Terms, please contact us at support@chaibisket.com.
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
