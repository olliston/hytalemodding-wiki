import { Link } from '@inertiajs/react';

import AppFooter from '@/components/app-footer';
import SeoMeta from '@/components/SeoMeta';
import { home } from '@/routes';

export default function PrivacyPolicy() {
  return (
    <>
      <SeoMeta
        title="Privacy Policy"
        description="Read how HytaleModding collects, uses, and protects your information."
      />

      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-12 md:py-16">
          <Link
            href={home()}
            className="text-sm font-medium text-primary transition-opacity hover:opacity-80"
          >
            Back to Home
          </Link>

          <article className="mt-6 space-y-8">
            <header className="space-y-3">
              <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Privacy Policy
              </h1>
              <p className="text-sm text-muted-foreground">
                Last updated: March 14, 2026
              </p>
              <p className="text-muted-foreground">
                This Privacy Policy describes how HytaleModding
                (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;)
                collects, uses, stores, and discloses information about you when
                you access or use our platform, website, and related services
                (collectively, the &ldquo;Service&rdquo;). By using the Service,
                you acknowledge that you have read and understood this policy.
                If you do not agree, please discontinue use immediately.
              </p>
            </header>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">
                1. Information We Collect
              </h2>
              <p className="text-muted-foreground">
                We collect information in the following categories:
              </p>
              <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                <li>
                  <span className="font-medium text-foreground">
                    Account Data:
                  </span>{' '}
                  When you register, we collect your username, email address,
                  and hashed password. Optional profile fields (display name,
                  avatar, biography) are collected only if you choose to provide
                  them.
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    Content Data:
                  </span>{' '}
                  Documentation pages, wiki edits, file uploads, comments, and
                  other content you create or contribute to the platform.
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    Usage &amp; Technical Data:
                  </span>{' '}
                  IP addresses, browser type, operating system, referring URLs,
                  page view timestamps, session identifiers, and error logs
                  collected automatically as you interact with the Service.
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    Cookies &amp; Similar Technologies:
                  </span>{' '}
                  We use strictly necessary session cookies to authenticate
                  users and maintain session state. We do not use third-party
                  advertising or tracking cookies.
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    Communications:
                  </span>{' '}
                  If you contact us for support or submit feedback, we retain
                  the content of that correspondence.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">
                2. How We Use Your Information
              </h2>
              <p className="text-muted-foreground">
                We process your information only for the following purposes:
              </p>
              <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                <li>
                  Providing, operating, and maintaining the Service and its
                  features.
                </li>
                <li>Authenticating your identity and securing your account.</li>
                <li>
                  Enabling collaboration features such as mod teams,
                  invitations, and shared documentation.
                </li>
                <li>
                  Sending transactional emails (e.g., email verification,
                  password resets, and collaboration invitations). We do not
                  send unsolicited marketing emails.
                </li>
                <li>
                  Monitoring platform integrity, detecting abuse, and enforcing
                  our Terms of Service.
                </li>
                <li>
                  Generating aggregated, anonymised analytics to understand
                  platform usage and guide product decisions.
                </li>
                <li>
                  Complying with applicable laws, regulations, and legal
                  processes.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">
                3. Legal Bases for Processing
              </h2>
              <p className="text-muted-foreground">
                Where applicable law requires a legal basis for processing
                personal data (including under the GDPR), we rely on the
                following:
              </p>
              <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                <li>
                  <span className="font-medium text-foreground">
                    Contract performance
                  </span>{' '}
                  — to provide the Service you have signed up for.
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    Legitimate interests
                  </span>{' '}
                  — for platform security, fraud prevention, and improving the
                  Service, where those interests are not overridden by your
                  rights.
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    Legal obligation
                  </span>{' '}
                  — to comply with applicable law or respond to lawful requests.
                </li>
                <li>
                  <span className="font-medium text-foreground">Consent</span> —
                  where you have given explicit consent, which you may withdraw
                  at any time.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">
                4. Data Sharing and Disclosure
              </h2>
              <p className="text-muted-foreground">
                We do not sell, rent, or trade your personal information. We may
                share data only in the following limited circumstances:
              </p>
              <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                <li>
                  <span className="font-medium text-foreground">
                    Service Providers:
                  </span>{' '}
                  Trusted vendors who process data on our behalf under strict
                  contractual confidentiality obligations (e.g., hosting
                  infrastructure, transactional email providers). They are
                  prohibited from using your data for any purpose beyond
                  providing services to us.
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    Public Content:
                  </span>{' '}
                  Documentation, wiki pages, and other content you publish
                  publicly is accessible to all visitors. Your username may be
                  attributed to your contributions.
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    Legal Requirements:
                  </span>{' '}
                  We may disclose information if required to do so by law, court
                  order, or governmental authority, or to protect the rights,
                  property, or safety of HytaleModding, our users, or the
                  public.
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    Business Transfers:
                  </span>{' '}
                  In the event of a merger, acquisition, or sale of assets, user
                  data may be transferred. We will provide notice before your
                  data is transferred and becomes subject to a different privacy
                  policy.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">5. Data Retention</h2>
              <p className="text-muted-foreground">
                We retain your personal data for as long as your account remains
                active or as necessary to fulfil the purposes described in this
                policy. Specific retention periods include:
              </p>
              <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                <li>
                  Account data is retained until you request deletion or your
                  account is terminated.
                </li>
                <li>
                  Server and access logs are retained for up to 90 days for
                  security and debugging purposes, then automatically purged.
                </li>
                <li>
                  Aggregated, anonymised analytics data may be retained
                  indefinitely as it cannot be used to identify you.
                </li>
                <li>
                  Backup copies may persist for up to 30 days after deletion
                  requests are processed.
                </li>
              </ul>
              <p className="text-muted-foreground">
                Upon account deletion, we will delete or anonymise your personal
                data unless we are required to retain it by law.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">6. Data Security</h2>
              <p className="text-muted-foreground">
                We implement industry-standard technical and organisational
                measures to protect your data, including encrypted data
                transmission (TLS/HTTPS), hashed password storage using bcrypt,
                access controls limiting data access to authorised personnel
                only, and regular security reviews. However, no method of
                transmission or storage is 100% secure. You are responsible for
                maintaining the confidentiality of your credentials and should
                notify us immediately of any suspected unauthorised access.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">
                7. Your Rights and Choices
              </h2>
              <p className="text-muted-foreground">
                Depending on your jurisdiction, you may have the following
                rights regarding your personal data:
              </p>
              <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                <li>
                  <span className="font-medium text-foreground">Access:</span>{' '}
                  Request a copy of the personal data we hold about you.
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    Rectification:
                  </span>{' '}
                  Correct inaccurate or incomplete data via your account
                  settings or by contacting us.
                </li>
                <li>
                  <span className="font-medium text-foreground">Erasure:</span>{' '}
                  Request deletion of your personal data, subject to legal
                  retention obligations.
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    Restriction:
                  </span>{' '}
                  Request that we restrict processing of your data in certain
                  circumstances.
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    Portability:
                  </span>{' '}
                  Receive your data in a structured, machine-readable format.
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    Objection:
                  </span>{' '}
                  Object to processing based on legitimate interests.
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    Withdraw Consent:
                  </span>{' '}
                  Where processing is based on consent, withdraw it at any time
                  without affecting the lawfulness of prior processing.
                </li>
              </ul>
              <p className="text-muted-foreground">
                To exercise any of these rights, contact us through our official
                community channels. We will respond within 30 days. We may need
                to verify your identity before fulfilling a request.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">
                8. Children&apos;s Privacy
              </h2>
              <p className="text-muted-foreground">
                The Service is not directed to children under the age of 13 (or
                16 where required by applicable law). We do not knowingly
                collect personal information from children. If we learn that we
                have inadvertently collected data from a child without
                verifiable parental consent, we will delete it promptly. If you
                believe we have collected data from a child, please contact us
                immediately.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">
                9. Changes to This Policy
              </h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. When we
                make material changes, we will update the &ldquo;Last
                updated&rdquo; date at the top of this page and, where
                appropriate, notify you via email or a prominent notice on the
                platform. Your continued use of the Service after changes take
                effect constitutes acceptance of the revised policy.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">10. Contact</h2>
              <p className="text-muted-foreground">
                If you have questions, concerns, or requests regarding this
                Privacy Policy or our data practices, please contact us at
                hello@hytalemodding.dev.
              </p>
            </section>
          </article>
        </main>

        <AppFooter />
      </div>
    </>
  );
}
