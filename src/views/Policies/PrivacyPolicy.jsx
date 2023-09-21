import React, { useContext, useEffect } from "react";
import styles from "./Policy.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../../context/globalContext";

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  const { section } = useParams();
  const dataContext = useContext(GlobalContext);
  const {
    refFAQS,
    refFAQS1,
    refFAQS2,
    refFAQS3,
    refFAQS4,
    refFAQS5,
    refPrivacyPolicy,
    refRefundPolicy,
    refShippingPolicy,
    refTermsCond,
  } = dataContext;

  useEffect(() => {
    if (section === "privacy-policy") {
      refPrivacyPolicy.current.scrollIntoView({ behavior: "smooth" });
      refPrivacyPolicy.current.open = true;
    }
    if (section === "refund-policy") {
      refRefundPolicy.current.scrollIntoView({ behavior: "smooth" });
      refRefundPolicy.current.open = true;
    }
    if (section === "shipping-policy") {
      refShippingPolicy.current.scrollIntoView({ behavior: "smooth" });
      refShippingPolicy.current.open = true;
    }
    if (section === "terms") {
      refTermsCond.current.scrollIntoView({ behavior: "smooth" });
      refTermsCond.current.open = true;
    }
    if (section.includes("faq")) {
      refFAQS.current.open = true;
      if (section === "faq-1") {
        refFAQS1.current.scrollIntoView({ behavior: "smooth" });
      } else if (section === "faq-2") {
        refFAQS2.current.scrollIntoView({ behavior: "smooth" });
      } else if (section === "faq-3") {
        refFAQS3.current.scrollIntoView({ behavior: "smooth" });
      } else if (section === "faq-4") {
        refFAQS4.current.scrollIntoView({ behavior: "smooth" });
      } else if (section === "faq-5") {
        refFAQS5.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [section]);

  return (
    <div className={styles.wrapper}>
      <h1>Policies & FAQ</h1>
      <div className={styles.faqsDiv}>
        <details className={styles.faqsDet} ref={refFAQS}>
          <summary>FAQ</summary>
          <div className={styles.faqs}>
            <div ref={refFAQS1}>
              <h2>How do I create an account?</h2>
              <p>
                In order to create an account just follow this link and follow
                the steps! <Link to="/signUp">Create account</Link>
              </p>
            </div>
            <div ref={refFAQS2}>
              <h2>How do I make a purchase?</h2>
              <p>
                In order to make a purchase you must have an account, if you
                don't have one please see the section above. Once created, add
                any item to your cart, and click checkout. From there just
                follow the steps provided!
              </p>
            </div>
            <div ref={refFAQS3}>
              <h2>Can I reset my password?</h2>
              <p>
                If you forgot your password please follow this link and enter
                your email, you'll receive an email from us, just follow the
                instructions provided!
              </p>
              <p>
                If you have access to your account but just want to reset your
                password, just go to '<b>My Account</b> - <b>Password</b>'
              </p>
            </div>
            <div ref={refFAQS4}>
              <h2>Can I delete my account?</h2>
              <p>
                You will be able to delete your account by going to '
                <b>My Account</b> - <b>Delete Account</b>', please remember this
                action is permanent and it can't be undone.
              </p>
            </div>
            <div ref={refFAQS5}>
              <h2>How do I see my orders?</h2>
              <p>
                You will be able to see your orders by going into '
                <b>My Account</b> - <b>Orders</b>'.
              </p>
            </div>
          </div>
        </details>
      </div>
      <div className={styles.privacyPolicyDiv}>
        <details className={styles.privacyPolicyDet} ref={refPrivacyPolicy}>
          <summary>Privacy Policy</summary>
          <div className={styles.privacyPolicy}>
            <section>
              <h2>Introduction</h2>
              <p>
                Welcome to Rivelle. We are committed to protecting your personal
                information and your right to privacy.
              </p>
            </section>

            <section>
              <h2>Information We Collect</h2>
              <p>
                We may collect personal information that you provide voluntarily
                when using our website, including [list the types of
                information, such as name, email address, etc.]. We may also
                automatically collect certain information when you visit our
                website.
              </p>
            </section>

            <section>
              <h2>How We Use Your Information</h2>
              <p>
                We use the information we collect to [describe how you will use
                the collected information, such as improving the website,
                providing services, etc.].
              </p>
            </section>

            <section>
              <h2>Disclosure of Your Information</h2>
              <p>
                We may disclose your personal information to [describe who you
                may share the information with, such as third-party service
                providers, affiliates, etc.] for [describe the purpose of
                disclosure, such as processing payments, providing customer
                support, etc.].
              </p>
            </section>

            <section>
              <h2>Your Choices</h2>
              <p>
                You have the right to [describe user rights, such as access,
                update, delete personal information]. You can opt-out of
                [describe any specific data processing activities, such as
                receiving marketing emails].
              </p>
            </section>

            <section>
              <h2>Security</h2>
              <p>
                We take appropriate security measures to protect your personal
                information. However, no method of transmission over the
                internet is 100% secure.
              </p>
            </section>

            <section>
              <h2>Changes to This Privacy Policy</h2>
              <p>
                We may update our privacy policy from time to time. Any changes
                will be posted on this page.
              </p>
            </section>

            <section>
              <h2>Contact Us</h2>
              <p>
                If you have any questions about our privacy policy, please
                contact us at [provide contact information].
              </p>
            </section>

            <section>
              <p>This privacy policy was last updated on Aug 10, 2023.</p>
            </section>
          </div>
        </details>
      </div>
      <div className={styles.refundPolicyDiv}>
        <details className={styles.refundPolicyDet} ref={refRefundPolicy}>
          <summary>Refund Policy</summary>
          <div className={styles.refundPolicy}>
            <section>
              <h2>Refund Eligibility</h2>
              <p>
                We are committed to providing the best user experience. If you
                are not satisfied with your purchase from Soul Music, you may be
                eligible for a refund. To be eligible for a refund, please
                review the following conditions:
              </p>
              <ul>
                <li>
                  The refund request must be made within 30 days from the date
                  of purchase.
                </li>
                <li>
                  The purchase must have been made directly through our website.
                </li>
                <li>
                  The product or service for which you are requesting a refund
                  must be in its original condition and not have been used
                  excessively.
                </li>
              </ul>
            </section>

            <section>
              <h2>How to Request a Refund</h2>
              <p>To request a refund, please follow these steps:</p>
              <ol>
                <li>
                  Contact our customer support team at <b>henrifyb@gmail.com</b>{" "}
                  and provide your order details.
                </li>
                <li>Explain the reason for your refund request.</li>
                <li>
                  Our team will review your request and respond within 24hs.
                </li>
                <li>
                  If your refund request is approved, we will process the refund
                  to the original payment method used for the purchase.
                </li>
              </ol>
            </section>

            <section>
              <h2>Contact Us</h2>
              <p>
                If you have any questions or concerns about our refund policy,
                please contact our customer support team at [customer support
                email or phone number].
              </p>
            </section>

            <section>
              <p>This refund policy was last updated on Aug 10, 2023.</p>
            </section>
          </div>
        </details>
      </div>
      <div className={styles.shippingPolicyDiv} ref={refShippingPolicy}>
        <details className={styles.shippingPolicyDet}>
          <summary>Shipping Policy</summary>
          <div className={styles.shippingPolicy}>
            <section>
              <h2>Shipping Information</h2>
              <p>
                We are excited to provide you with the best possible experience
                when it comes to shipping your orders. Below you'll find
                important information about our shipping process:
              </p>
            </section>

            <section>
              <h2>Processing Time</h2>
              <p>
                Your order will typically be processed and shipped within 10
                business days from the date of purchase.
              </p>
            </section>

            <section>
              <h2>Shipping Methods</h2>
              <p>
                We offer a range of shipping options to ensure your order
                reaches you in a timely and convenient manner. Shipping methods
                available include:
              </p>
              <ul>
                <li>
                  Standard Shipping: Estimated delivery time of 5 - 7 business
                  days.
                </li>
                <li>
                  Express Shipping: Estimated delivery time of 3 - 5 business
                  days.
                </li>
                <li>
                  Premium Shipping: Estimated delivery time of 1 business days.
                </li>
              </ul>
            </section>

            <section>
              <h2>Shipping Costs</h2>
              <p>
                Shipping costs will vary based on your selected shipping method,
                order value, and destination. The exact shipping cost will be
                calculated and displayed during the checkout process.
              </p>
            </section>

            <section>
              <h2>Order Tracking</h2>
              <p>
                Once your order is shipped, you will receive a confirmation
                email with tracking information. You can use this information to
                track the status and estimated delivery date of your order.
              </p>
            </section>

            <section>
              <h2>Contact Us</h2>
              <p>
                If you have any questions or concerns about our shipping policy,
                please contact our customer support team at [customer support
                email or phone number].
              </p>
            </section>

            <section>
              <p>This shipping policy was last updated on Aug 10, 2023.</p>
            </section>
          </div>
        </details>
      </div>
      <div className={styles.termsAndConditionsDiv}>
        <details className={styles.termsAndConditionsDet} ref={refTermsCond}>
          <summary>Terms & Conditions</summary>
          <div className={styles.termsAndConditions}>
            <p>
              Welcome to Your Website! These terms and conditions outline the
              rules and regulations for the use of our website.
            </p>

            <h2>Acceptance of Terms</h2>
            <p>
              By accessing or using our website, you agree to be bound by these
              Terms and Conditions and all applicable laws and regulations.
            </p>

            <h2>Intellectual Property</h2>
            <p>
              The content on our website, including text, images, audio, and
              video, is protected by intellectual property rights. You may not
              reproduce, distribute, modify, or create derivative works based on
              our content without our explicit permission.
            </p>

            <h2>User Accounts</h2>
            <p>
              You may need to create an account to access certain features. You
              are responsible for maintaining the confidentiality of your
              account information and for all activities that occur under your
              account.
            </p>

            <h2>Prohibited Activities</h2>
            <p>
              You agree not to: (a) Violate any laws; (b) Post unauthorized or
              unsolicited advertising; (c) Impersonate others; (d) Interfere
              with the website's functionality.
            </p>

            <h2>Termination</h2>
            <p>
              We may suspend or terminate your account if you violate these
              Terms and Conditions. You can also stop using the service at any
              time.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              We are not liable for any indirect, incidental, special,
              consequential, or punitive damages arising out of your use of our
              website.
            </p>

            <h2>Changes to Terms</h2>
            <p>
              We may modify or update these Terms and Conditions. It's your
              responsibility to review them periodically.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have questions about these Terms and Conditions, contact us
              at <a href="mailto:henrifyb@gmail.com">henrifyb@gmail.com</a>.
            </p>

            <p>These Terms and Conditions were last updated on Aug 10, 2023.</p>
          </div>
        </details>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
