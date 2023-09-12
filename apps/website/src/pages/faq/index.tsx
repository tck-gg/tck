import Accordion from '@/components/ui/Accordion/Accordion';
import Layout from '@/components/Layout/Layout';
import PageHeader from '@/components/PageHeader/PageHeader';

import { FAQ_ITEMS } from '@/data/faq';

import classes from './faq.module.scss';

function Faq() {
  return (
    <Layout title='FAQ'>
      <PageHeader title='FAQ' />

      <div className={classes.accordionWrapper}>
        {FAQ_ITEMS.map((item) => {
          return (
            <Accordion
              key={item.question}
              title={item.question}
              content={
                <>
                  {item.answer.map((paragraph) => {
                    return <p key={paragraph}>{paragraph}</p>;
                  })}
                </>
              }
            />
          );
        })}
      </div>
    </Layout>
  );
}

export default Faq;
