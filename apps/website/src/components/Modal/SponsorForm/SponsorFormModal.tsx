'use client';
import { faUser, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Button from '../../ui/Button/Button';
import styles from './sponsorformmodal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalLayout from '../Layout/ModalLayout';

function SponsorFormModal({
  isOpen,
  open,
  close
}: {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}) {
  return (
    <ModalLayout isOpen={isOpen} open={open} close={close} width='500px'>
      <div className={styles.modal}>
        <div className={styles.formSection}>
          <div className={styles.header}>Sponsor a Giveaway</div>

          <p className={styles.descriptionText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>

          <div className={styles.inputContainer}>
            <div className={styles.inputGroup}>
              <div className={styles.inputLabel}>
                <FontAwesomeIcon className={styles.icon} icon={faUser} />
                <div className={styles.labelText}>Twitter Username</div>
              </div>
              <input type='text' placeholder='Twitter Username' className={styles.inputField} />
            </div>
          </div>

          <Button rightIcon={faChevronRight} color='#fff' variant='gradient'>
            Submit
          </Button>
        </div>
      </div>
    </ModalLayout>
  );
}

export default SponsorFormModal;
