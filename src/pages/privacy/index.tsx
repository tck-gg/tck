/* eslint-disable react/no-unescaped-entities */

import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader/PageHeader';

import classes from './privacy.module.scss';

function Privacy() {
  return (
    <Layout title='Privacy Policy'>
      <div className={classes.root}>
        <PageHeader title='Privacy Policy' />
        <p className={classes.effectiveDate}>Effective Date: May 29, 2023</p>

        <p>
          This Privacy Policy ("Policy") describes how TCK ("we," "us," or "our") collects, uses,
          and protects the personal information of users ("you" or "users") who visit and interact
          with our affiliate website ("Website") related to gambling services. We are committed to
          ensuring the privacy and security of your personal information. By using our Website, you
          consent to the terms and practices outlined in this Policy.
        </p>

        <p className={classes.sectionHeader}>Information We Collect</p>
        <p>
          1.1. Personal Information: When you visit our Website, we may collect personal information
          such as your name, email address, postal address, telephone number, date of birth, and any
          other information voluntarily provided by you.
        </p>
        <p>
          1.2. Non-Personal Information: We may also collect non-personal information, including but
          not limited to browser type, operating system, IP address, and website usage data through
          the use of cookies or similar technologies.
        </p>

        <p className={classes.sectionHeader}>Use of Collected Information</p>
        <p>2.1. Personal Information: We may use the personal information we collect to:</p>
        <div className={classes.list}>
          <li>a) Provide you with access to the Website and its features;</li>
          <li>b) Process and manage your inquiries or requests;</li>
          <li>c) Customize your experience on the Website;</li>
          <li>
            d) Send you promotional materials, newsletters, and other communications related to our
            services or those of our trusted partners, provided you have opted in to receive such
            communications;
          </li>
          <li>
            e) Perform data analysis, research, and improve our services, content, and marketing
            efforts;
          </li>
          <li>f) Comply with legal obligations and enforce our terms and conditions.</li>
        </div>
        <p>
          2.2. Non-Personal Information: We may use non-personal information for analytical
          purposes, to track user trends, and to improve our Website's functionality and user
          experience. This information may also be shared with third-party service providers for the
          purposes mentioned above.
        </p>

        <p className={classes.sectionHeader}>Cookies and Similar Technologies</p>
        <p>
          We use cookies and similar technologies to enhance your experience on our Website. Cookies
          are small text files that are placed on your device when you visit certain web pages. We
          use cookies to:
        </p>
        <div className={classes.list}>
          <li>a) Remember your preferences and enable certain features;</li>
          <li>b) Analyze usage patterns and trends;</li>
          <li>c) Track and measure advertising effectiveness.</li>
        </div>
        <p>
          You can manage cookies through your browser settings and opt-out of certain types of
          tracking. However, disabling cookies may limit your ability to use certain features on our
          Website.
        </p>

        <p className={classes.sectionHeader}>Information Sharing and Disclosure</p>
        <p>
          4.1. Third-Party Service Providers: We may engage trusted third-party service providers to
          assist us in operating our Website and providing services. These service providers may
          have access to your personal information but are obligated to maintain its confidentiality
          and use it only for the purposes for which it was provided.
        </p>
        <p>
          4.2. Legal Requirements: We may disclose your personal information if required by law or
          in response to a valid legal request. We may also disclose personal information to enforce
          our rights, protect our property, or safeguard the rights, safety, or security of our
          users or others.
        </p>

        <p className={classes.sectionHeader}>Data Security</p>
        <p>
          We implement reasonable security measures to protect your personal information from
          unauthorized access, disclosure, alteration, or destruction. However, no method of
          transmission over the Internet or electronic storage is 100% secure, and we cannot
          guarantee absolute security.
        </p>

        <p className={classes.sectionHeader}>Children's Privacy</p>
        <p>
          Our Website is not intended for individuals under the age of 18 or the legal gambling age
          in your jurisdiction. We do not knowingly collect or solicit personal information from
          minors. If you are a parent or guardian and believe your child has provided personal
          information on our Website, please contact us immediately.
        </p>

        <p className={classes.sectionHeader}>Third-Party Links</p>
        <p>
          Our Website may contain links to third-party websites or services. This Policy does not
          cover the privacy practices of these websites. We encourage you to review the privacy
          policies of these third-party sites before providing any personal information.
        </p>

        <p className={classes.sectionHeader}>Updates to this Policy</p>
        <p>
          We reserve the right to update or modify this Policy at any time without prior notice. Any
          changes will be effective immediately upon posting of the revised Policy on our Website.
          Your continued use of the Website after the changes indicates your acceptance of the
          revised Policy.
        </p>

        <p className={classes.sectionHeader}>Contact Us</p>
        <p>
          If you have any questions or concerns about this Policy or our privacy practices, please
          contact us at{' '}
          <a href='mailto:contact@tck.gg' target='_blank'>
            contact@tck.gg
          </a>
          .
        </p>

        <p className={classes.sectionHeader}>Additional Notes</p>
        <p>
          Please note that this Privacy Policy applies solely to the information collected by our
          Website and does not apply to any third-party websites or services that may be linked to
          or referenced on our Website.
        </p>
      </div>
    </Layout>
  );
}

export default Privacy;
