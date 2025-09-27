// src/pages/contact.tsx

import React from 'react';
import Head from 'next/head';
import containerStyles from '../styles/Form.module.css';
import policyStyles from '../styles/Policy.module.css'; 
import embedStyles from '../styles/Embed.module.css'; 

const ContactPage: React.FC = () => {
  const serviceName = "学内図書シェア";

  return (
    <>
      <Head>
        <title>お問い合わせ - {serviceName}</title>
      </Head>

      <div className={containerStyles.container}>
        <h2 className={policyStyles.policyTitle}>お問い合わせ</h2>

        <p className={policyStyles.policyText} style={{ textAlign: 'center', marginBottom: '2rem' }}>
          サービスに関するご質問、ご意見、不具合報告などは、以下のフォームよりお送りください。
        </p>

        <div className={embedStyles.formEmbedContainer}>
          <iframe
             src="https://docs.google.com/forms/d/e/1FAIpQLSdJtFBo6gM5VfF_cxwOQvxXbC0x3g2GoCrm7z3r8JFdJqMGGw/viewform?embedded=true"
             height="821"
             frameBorder="0"
             marginHeight={0}
             marginWidth={0}
             className={embedStyles.googleFormEmbed} 
             title="お問い合わせフォーム" 
          >
             読み込んでいます…
          </iframe>
          </div>

        <p className={policyStyles.policyText} style={{ textAlign: 'center', fontSize: '0.9rem', marginTop: '2rem' }}>
          ※お問い合わせの内容によっては、返信に時間がかかる場合や、返信いたしかねる場合がございます。あらかじめご了承ください。
        </p>

      </div>
    </>
  );
};

export default ContactPage;