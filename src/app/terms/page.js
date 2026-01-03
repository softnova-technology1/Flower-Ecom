import FinalNav from "@/components/FinalNav";
import Footer from "@/components/Footer";
import styles from "@/styles/terms-policy.module.css";

export const metadata = {
  title: "Terms & Conditions | Dazzling Sky",
  description:
    "Terms and Conditions for orders, payments, cancellations and services of Dazzling Sky",
};

export default function TermsPage() {
  return (
    <>
      <FinalNav />
      <div className="pt-5">
        
      <section className={styles.wrapper}>
        <div className={styles.container}>
          <section className={styles.wrapper}>
            <h1 className={styles.title}>Terms and Conditions</h1>

            {/* 1. ORDERS AND CANCELLATIONS */}
            <h2>1. Orders and Cancellations</h2>

            <h3>Order Acceptance</h3>
            <p>
              To place an order with <strong>Dazzling Sky</strong>, customers
              must provide accurate personal details including name, contact
              information, delivery address, and valid payment details. Account
              creation is optional.
            </p>
            <p>
              Upon successful placement of an order, an order confirmation will
              be sent to the registered email address. If confirmation is not
              received, customers are advised to contact our support team.
            </p>
            <p>
              All orders are subject to acceptance, and Dazzling Sky reserves
              the right to refuse or cancel any order at its sole discretion. In
              such cases, any payment received will be refunded in full using
              the original payment method.
            </p>

            <h3>Order Timing</h3>
            <p>
              Customers may select their preferred delivery date during
              checkout. Same-day or next-day delivery availability is subject to
              location, order volume, and operational feasibility. Delivery
              slots are not guaranteed unless explicitly stated.
            </p>

            <h3>Order Modifications</h3>
            <p>
              Requests to modify orders, including delivery details or message
              cards, must be submitted at least <strong>48 hours</strong> prior
              to the scheduled delivery date.
            </p>
            <p>
              Changes requested after this period may not be accommodated,
              especially during peak seasons such as Valentine’s Day, Mother’s
              Day, festive periods, or public holidays.
            </p>

            <h3>Cancellations</h3>
            <p>
              Orders may be cancelled up to <strong>48 hours</strong> before the
              scheduled delivery date for a full refund.
            </p>
            <p>
              Orders cancelled after this period may not be eligible for a
              refund due to preparation and procurement of fresh flowers.
            </p>
            <p>
              Training class bookings are non-refundable once confirmed but may
              be rescheduled at Dazzling Sky’s discretion.
            </p>

            {/* 2. PAYMENTS */}
            <h2>2. Payments</h2>

            <h3>Accepted Payment Methods</h3>
            <p>Dazzling Sky accepts:</p>
            <ul>
              <li>
                PayNow and other secure digital scanner–based payment methods
                supported in Singapore
              </li>
            </ul>
            <p>
              Debit cards and credit cards are not accepted. All transactions
              are processed through secure and authorized digital payment
              platforms.
            </p>

            <h3>Payment Security</h3>
            <p>
              Dazzling Sky does not store, process, or have direct access to
              customers’ bank or payment details.
            </p>

            <h3>Payment Confirmation</h3>
            <p>
              Orders will be processed{" "}
              <strong>only after successful payment confirmation</strong>.
            </p>
            <p>
              In the event of a failed, pending, or reversed payment, the order
              may be automatically cancelled without prior notice.
            </p>

            {/* 3. PRICES */}
            <h2>3. Prices</h2>
            <p>
              All prices displayed are in{" "}
              <strong>Singapore Dollars (SGD)</strong>. Prices are inclusive of
              applicable Goods and Services Tax (GST) unless stated otherwise.
            </p>
            <p>
              Delivery charges, if applicable, will be clearly displayed during
              checkout.
            </p>
            <p>
              Dazzling Sky reserves the right to amend prices at any time
              without prior notice.
            </p>

            {/* 4. DELIVERY POLICY */}
            <h2>4. Delivery Policy</h2>

            <h3>Delivery Coverage</h3>
            <p>
              We currently deliver within Singapore only. Delivery to restricted
              areas, PO boxes, or inaccessible locations may not be possible.
            </p>

            <h3>Delivery Attempts</h3>
            <p>
              If delivery cannot be completed due to incorrect address details,
              recipient unavailability, or access restrictions, the order may be
              deemed delivered and no refund will be issued.
            </p>

            <h3>Delivery Delays</h3>
            <p>
              While we strive to deliver on the selected date, delays may occur
              due to traffic conditions, weather, or unforeseen operational
              issues. Such delays do not entitle customers to refunds.
            </p>

            <h3>Special Instructions</h3>
            <p>
              Delivery instructions are followed on a best-effort basis and
              cannot be guaranteed.
            </p>

            {/* 5. OUR PROMISE, RETURNS AND REFUNDS */}
            <h2>5. Our Promise, Returns and Refunds</h2>

            <h3>Quality Promise</h3>
            <p>
              Dazzling Sky is committed to delivering fresh, beautifully crafted
              bouquets and garlands. Flowers may be delivered in bud form to
              ensure longer vase life.
            </p>

            <h3>Freshness & Damage Claims</h3>
            <p>
              If flowers arrive damaged or not meeting quality expectations,
              customers must notify us within <strong>24 hours</strong> of
              delivery with clear photographic evidence.
            </p>
            <p>At our discretion, we may offer a replacement or refund.</p>

            <h3>Non-Delivery</h3>
            <p>
              In the rare event of non-delivery, customers must notify us within
              <strong> 48 hours</strong> of the scheduled delivery date to be
              eligible for a resolution.
            </p>

            <h3>Returns</h3>
            <p>
              Due to the perishable nature of flowers, returns are not accepted.
            </p>

            {/* 6. CREDITS, OFFERS AND PROMOTION CODES */}
            <h2>6. Credits, Offers and Promotion Codes</h2>
            <p>
              Promotion codes are subject to specific terms and validity
              periods. Only one promotion code may be used per order.
            </p>
            <p>
              Codes are non-transferable, non-refundable, and cannot be
              exchanged for cash.
            </p>
            <p>
              Dazzling Sky reserves the right to withdraw or modify promotions
              at any time.
            </p>
          </section>
        </div>
      </section>
      
      </div>
      <Footer />
    </>
  );
}
