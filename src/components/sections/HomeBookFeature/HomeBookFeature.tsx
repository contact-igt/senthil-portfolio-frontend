import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import styles from './HomeBookFeature.module.css';

const bookHighlights = [
  'Understand patient psychology, trust, and communication beyond clinical treatment.',
  'Learn practical lessons for doctors, hospital owners, and healthcare leaders.',
  'Apply behavioral insight to ethical practice growth, stronger teams, and better patient experience.',
];

export function HomeBookFeature() {
  return (
    <section id="book" className={styles.section} aria-labelledby="home-book-heading">
      <div className={styles.container}>
        <div className={styles.copy}>
          <span className={styles.eyebrow}>New Release</span>
          <h2 id="home-book-heading" className={styles.heading}>
            Psychology of Medical Practice
          </h2>
          <p className={styles.lead}>
            The business, behavioral, and leadership lessons medical schools rarely teach. Dr. Senthil brings together psychology, communication, patient behavior, and practice management into one practical guide for modern healthcare professionals.
          </p>
          <div className={styles.highlights}>
            {bookHighlights.map((item) => (
              <div className={styles.highlight} key={item}>
                <span className={styles.check} aria-hidden="true">
                  <Image
                    src="/images/success.png"
                    alt=""
                    width={26}
                    height={26}
                    className={styles.checkIcon}
                  />
                </span>
                <p>{item}</p>
              </div>
            ))}
          </div>

          <Button href="/book" variant="primary" size="lg" className={styles.cta}>
            Read More About the Book
          </Button>
        </div>

        <div className={styles.visual} aria-label="Psychology of Medical Practice book preview">
          <div className={styles.imageShell}>
            <Image
              src="/images/book2.png"
              alt="Psychology of Medical Practice book by Dr. Senthil Tamilarasan"
              fill
              sizes="(max-width: 900px) 90vw, 680px"
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeBookFeature;