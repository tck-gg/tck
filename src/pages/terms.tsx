/* eslint-disable react/no-unescaped-entities */

import PageHeader from '@/components/PageHeader/PageHeader';
import Layout from '@/components/Layout';

import classes from '../styles/legal.module.scss';

function Terms() {
  return (
    <Layout title='Terms of Service'>
      <div className={classes.root}>
        <PageHeader title='Terms of Service' />
        <p className={classes.effectiveDate}>Effective Date: May 29, 2023</p>

        <p>
          These Terms of Service ("Terms") govern your use of TCK ("we," "us," or "our") as an
          affiliate website related to gambling services. By accessing or using our website
          ("Website"), you agree to comply with these Terms. If you do not agree with any part of
          these Terms, please refrain from using our Website.
        </p>

        <p className={classes.sectionHeader}>Eligibility</p>
        <p>
          1.1. You must be of legal age in your jurisdiction to use our Website. By using our
          Website, you represent and warrant that you are of legal age to engage in online gambling
          activities.
        </p>

        <p className={classes.sectionHeader}>User Conduct</p>
        <p>
          2.1. Compliance with Laws: You agree to comply with all applicable laws, regulations, and
          restrictions regarding online gambling activities in your jurisdiction. It is your
          responsibility to ensure that your use of our Website is legal.
        </p>

        <p>
          2.2. Prohibited Activities: You agree not to engage in any of the following prohibited
          activities:
        </p>

        <div className={classes.list}>
          <li>a) Using our Website for any unlawful, fraudulent, or unauthorized purposes;</li>
          <li>b) Interfering with or disrupting the functionality of the Website;</li>
          <li>
            c) Attempting to gain unauthorized access to any part of the Website or its related
            systems or networks;
          </li>
          <li>
            d) Uploading, transmitting, or distributing any viruses, malware, or other harmful
            computer code;
          </li>
          <li>
            e) Engaging in any activity that could damage, disable, overburden, or impair the
            Website or its servers;
          </li>
          <li>
            f) Impersonating any person or entity or misrepresenting your affiliation with any
            person or entity.
          </li>
        </div>

        <p className={classes.sectionHeader}>Intellectual Property</p>
        <p>
          3.1. Ownership: All content and materials available on the Website, including but not
          limited to text, graphics, logos, images, and software, are the property of TCK or its
          licensors and are protected by applicable intellectual property laws.
        </p>

        <p>
          3.2. Limited License: We grant you a limited, non-exclusive, non-transferable license to
          access and use the Website for personal, non-commercial purposes, in accordance with these
          Terms. You may not reproduce, distribute, modify, transmit, or publicly display any
          content from the Website without our prior written consent.
        </p>

        <p className={classes.sectionHeader}>Disclaimer of Liability</p>
        <p>
          4.1. Website Content: The information provided on our Website is for informational
          purposes only. We strive to ensure the accuracy and reliability of the content; however,
          we make no guarantees regarding the completeness, accuracy, timeliness, or reliability of
          any information displayed on the Website. You acknowledge and agree that any reliance on
          such information is at your own risk.
        </p>

        <p>
          4.2. Third-Party Websites: Our Website may contain links or references to third-party
          websites or services that are not owned or controlled by us. We do not endorse, guarantee,
          or assume responsibility for the content, services, or practices of any third-party
          websites. Your interactions with third-party websites are solely between you and the third
          party.
        </p>

        <p className={classes.sectionHeader}>Limitation of Liability</p>
        <p>
          5.1. To the fullest extent permitted by applicable law, we shall not be liable for any
          direct, indirect, incidental, consequential, or exemplary damages arising out of or in
          connection with your use of the Website or any transactions or activities related to
          online gambling. This includes, but is not limited to, damages for loss of profits,
          goodwill, data, or other intangible losses.
        </p>

        <p className={classes.sectionHeader}>Indemnification</p>
        <p>
          6.1. You agree to indemnify and hold TCK, its affiliates, partners, and employees harmless
          from any claims, losses, damages, liabilities, or expenses, including reasonable
          attorneys' fees, arising out of or in connection with your use of the Website, violation
          of these Terms, or infringement of any rights of a third party.
        </p>

        <p className={classes.sectionHeader}>Termination</p>
        <p>
          7.1. We reserve the right to suspend or terminate your access to the Website, in whole or
          in part, at any time and without prior notice.
        </p>
      </div>
    </Layout>
  );
}

export default Terms;
