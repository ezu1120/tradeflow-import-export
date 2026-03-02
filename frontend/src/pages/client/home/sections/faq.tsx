"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0)

  const faqs = [
    {
      question: "How long does international shipping typically take?",
      answer:
        "Standard ocean freight takes 15-30 days depending on routes. Air freight takes 3-7 days. Express services are available for time-sensitive shipments. Custom timelines can be arranged based on your needs.",
    },
    {
      question: "What documents are required for export?",
      answer:
        "Essential documents include commercial invoice, bill of lading, packing list, export license (if applicable), and certificates of origin. Our team handles all documentation and ensures compliance with regulations.",
    },
    {
      question: "Do you handle customs clearance?",
      answer:
        "Yes, we provide complete customs clearance services including documentation preparation, duty calculations, and coordination with customs authorities to ensure smooth clearance.",
    },
    {
      question: "What is your insurance coverage?",
      answer:
        "All shipments include basic insurance coverage. Extended coverage options are available for high-value items. Coverage is typically up to 110% of shipment value with standard policies.",
    },
    {
      question: "Can I track my shipment in real-time?",
      answer:
        "All shipments come with real-time tracking. You can monitor your cargo from warehouse to delivery with live updates, GPS tracking, and instant notifications.",
    },
    {
      question: "What are your payment terms?",
      answer:
        "We offer flexible payment options including prepayment, payment on delivery, and credit terms for established partners. Monthly invoicing is available for regular shipments.",
    },
  ]

  return (
    <section id="faq" className="w-full py-16 md:py-24 bg-gradient-to-br from-gray-900 via-slate-900 to-slate-800 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.05),transparent_70%)]" />
      
      <div className="mx-auto max-w-3xl px-4 sm:px-6 relative z-10">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#d4af37]">FAQ</p>
          <h2 className="mt-3 text-balance text-3xl font-bold text-white md:text-4xl">Common Questions</h2>
          <p className="mt-4 text-slate-300">Find answers to frequently asked questions about our services</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-slate-700/50 rounded-lg overflow-hidden backdrop-blur-sm">
              <button
                onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                className="w-full px-6 py-4 text-left flex items-center justify-between bg-slate-800/50 hover:bg-slate-700/50 transition-colors"
              >
                <span className="font-semibold text-white">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-[#d4af37] transition-transform ${openIdx === idx ? "rotate-180" : ""}`}
                />
              </button>
              {openIdx === idx && (
                <div className="px-6 py-4 bg-slate-900/50 border-t border-slate-700/50 text-slate-300">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
