import { Link } from '@inertiajs/react';

import AppFooter from '@/components/app-footer';
import SeoMeta from '@/components/SeoMeta';
import { home } from '@/routes';

export default function TermsOfService() {
  return (
    <>
      <SeoMeta
        title="Terms of Service"
        description="Review the terms and acceptable use rules for using HytaleModding."
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
                Terms of Service
              </h1>
              <p className="text-sm text-muted-foreground">
                Last updated: March 14, 2026
              </p>
              <p className="text-muted-foreground">
                These Terms of Service (&ldquo;Terms&rdquo;) constitute a
                legally binding agreement between you (&ldquo;you&rdquo; or
                &ldquo;user&rdquo;) and HytaleModding (&ldquo;we,&rdquo;
                &ldquo;us,&rdquo; or &ldquo;our&rdquo;) governing your access to
                and use of the HytaleModding platform, website, and all related
                services (collectively, the &ldquo;Service&rdquo;). By accessing
                or using the Service, you agree to be bound by these Terms. If
                you do not agree, you must not access or use the Service.
              </p>
            </header>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">1. Eligibility</h2>
              <p className="text-muted-foreground">
                You must be at least 13 years of age (or 16 where required by
                applicable law) to use the Service. By agreeing to these Terms,
                you represent and warrant that you meet this requirement and
                that you have the legal capacity to enter into a binding
                agreement. If you are using the Service on behalf of an
                organisation, you represent that you are authorised to bind that
                organisation to these Terms.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">2. Accounts</h2>
              <p className="text-muted-foreground">
                You are responsible for maintaining the confidentiality of your
                account credentials and for all activity that occurs under your
                account. You agree to notify us immediately of any unauthorised
                access or suspected security breach. We reserve the right to
                disable or terminate any account at our discretion if we believe
                these Terms have been violated. You may not create accounts
                using automated means, impersonate others, or register with
                false information.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">3. Acceptable Use</h2>
              <p className="text-muted-foreground">
                You agree to use the Service only for lawful purposes and in
                accordance with these Terms. You must not:
              </p>
              <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                <li>
                  Violate any applicable local, national, or international law
                  or regulation.
                </li>
                <li>
                  Infringe the intellectual property, privacy, or other rights
                  of any third party.
                </li>
                <li>
                  Upload, post, or distribute content that is unlawful,
                  defamatory, obscene, fraudulent, threatening, harassing, or
                  otherwise objectionable.
                </li>
                <li>
                  Introduce viruses, malware, or any other harmful code into the
                  Service.
                </li>
                <li>
                  Attempt to gain unauthorised access to any part of the
                  Service, its servers, or any connected systems.
                </li>
                <li>
                  Scrape, crawl, or extract data from the Service using
                  automated means without prior written permission.
                </li>
                <li>
                  Use the Service to send spam, unsolicited messages, or engage
                  in any form of automated abuse.
                </li>
                <li>
                  Interfere with or disrupt the integrity or performance of the
                  Service or the data contained therein.
                </li>
                <li>
                  Engage in any conduct that could damage, disable, overburden,
                  or impair the Service or the experience of other users.
                </li>
              </ul>
              <p className="text-muted-foreground">
                We reserve the right to investigate and take appropriate action,
                including removal of content, suspension, or termination of
                accounts, for any violation of these standards.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">4. User Content</h2>
              <p className="text-muted-foreground">
                You retain ownership of any documentation, files, or other
                content you submit to the Service (&ldquo;User Content&rdquo;).
                By submitting User Content, you grant HytaleModding a worldwide,
                non-exclusive, royalty-free licence to host, store, reproduce,
                display, and distribute that content solely as necessary to
                provide and operate the Service.
              </p>
              <p className="text-muted-foreground">
                You represent and warrant that: (a) you own or have the
                necessary rights to submit your User Content; (b) your User
                Content does not infringe any third-party rights; and (c) your
                User Content complies with these Terms and all applicable laws.
                You are solely responsible for your User Content and any
                consequences of posting or publishing it.
              </p>
              <p className="text-muted-foreground">
                We do not endorse or assume liability for any User Content. We
                reserve the right, but not the obligation, to review, edit, or
                remove any User Content at our sole discretion.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">
                5. Intellectual Property
              </h2>
              <p className="text-muted-foreground">
                The Service and its original content, features, and
                functionality (excluding User Content) are and remain the
                exclusive property of HytaleModding and its licensors. Our
                trademarks, logos, and service marks may not be used without our
                prior written permission. Nothing in these Terms grants you any
                right, title, or interest in the Service beyond the limited
                licence to use it as described herein.
              </p>
              <p className="text-muted-foreground">
                If you believe that content on the Service infringes your
                intellectual property rights, please contact us with a detailed
                notice, and we will investigate and take appropriate action.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">6. Termination</h2>
              <p className="text-muted-foreground">
                We may suspend or terminate your access to the Service
                immediately, without prior notice or liability, for any reason,
                including if you breach these Terms. Upon termination, your
                right to use the Service ceases immediately. Provisions of these
                Terms that by their nature should survive termination —
                including intellectual property rights, disclaimers,
                indemnification, and limitations of liability — will survive.
              </p>
              <p className="text-muted-foreground">
                You may terminate your account at any time. Termination does not
                relieve you of obligations incurred prior to termination.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">7. Disclaimers</h2>
              <p className="text-muted-foreground">
                THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS
                AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS
                OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF
                MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND
                NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE
                UNINTERRUPTED, ERROR-FREE, SECURE, OR FREE OF VIRUSES OR OTHER
                HARMFUL COMPONENTS. YOU USE THE SERVICE AT YOUR OWN RISK.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">
                8. Limitation of Liability
              </h2>
              <p className="text-muted-foreground">
                TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, HYTALEMODDING
                AND ITS OPERATORS, AFFILIATES, EMPLOYEES, AND LICENSORS SHALL
                NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
                CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES — INCLUDING LOSS
                OF PROFITS, DATA, GOODWILL, OR OTHER INTANGIBLE LOSSES — ARISING
                OUT OF OR IN CONNECTION WITH YOUR USE OF OR INABILITY TO USE THE
                SERVICE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH
                DAMAGES.
              </p>
              <p className="text-muted-foreground">
                IN NO EVENT WILL OUR TOTAL AGGREGATE LIABILITY FOR ALL CLAIMS
                RELATING TO THE SERVICE EXCEED THE GREATER OF THE AMOUNT YOU
                PAID US IN THE TWELVE MONTHS PRECEDING THE CLAIM OR $100 USD.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">9. Indemnification</h2>
              <p className="text-muted-foreground">
                You agree to defend, indemnify, and hold harmless HytaleModding
                and its operators, affiliates, employees, and licensors from and
                against any claims, liabilities, damages, losses, costs, and
                expenses (including reasonable legal fees) arising out of or
                relating to: (a) your use of the Service; (b) your User Content;
                (c) your violation of these Terms; or (d) your violation of any
                rights of a third party.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">
                10. Changes to the Service and Terms
              </h2>
              <p className="text-muted-foreground">
                We reserve the right to modify, suspend, or discontinue any part
                of the Service at any time without notice or liability. We may
                also update these Terms at any time. When we do, we will revise
                the &ldquo;Last updated&rdquo; date at the top of this page. For
                material changes, we will provide notice via email or a
                prominent platform announcement where practicable. Your
                continued use of the Service after updated Terms take effect
                constitutes your acceptance of the revised Terms. If you do not
                agree to the revised Terms, you must stop using the Service.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">
                11. Governing Law and Disputes
              </h2>
              <p className="text-muted-foreground">
                These Terms are governed by and construed in accordance with
                applicable law, without regard to conflict of law principles.
                Any disputes arising from or relating to these Terms or the
                Service shall first be attempted to be resolved through
                good-faith negotiation. If resolution cannot be reached
                informally, disputes shall be submitted to binding arbitration
                or the competent courts of the applicable jurisdiction, as
                determined by applicable law.
              </p>
              <p className="text-muted-foreground">
                You waive any right to participate in a class-action lawsuit or
                class-wide arbitration to the maximum extent permitted by
                applicable law.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">
                12. Severability and Entire Agreement
              </h2>
              <p className="text-muted-foreground">
                If any provision of these Terms is found to be unenforceable or
                invalid, that provision will be limited or eliminated to the
                minimum extent necessary, and the remaining provisions will
                continue in full force and effect. These Terms, together with
                our Privacy Policy, constitute the entire agreement between you
                and HytaleModding with respect to the Service and supersede all
                prior agreements.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">13. Contact</h2>
              <p className="text-muted-foreground">
                If you have questions or concerns about these Terms, please
                contact us at hello@hytalemodding.dev.
              </p>
            </section>
          </article>
        </main>

        <AppFooter />
      </div>
    </>
  );
}
