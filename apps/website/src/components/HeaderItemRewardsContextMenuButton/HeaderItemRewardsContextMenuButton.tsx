import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import clsx from 'clsx';

import classes from './HeaderItemRewardsContextMenuButton.module.scss';

function HeaderItemRewardsContextMenuButton({
  children,
  href
}: {
  children: React.ReactNode | any;
  href: string;
}) {
  const router = useRouter();

  return (
    <div
      className={clsx(classes.root, router.pathname.includes(href) && classes.active)}
      onClick={() => {
        router.push(href);
      }}
    >
      {children}
      <FontAwesomeIcon icon={faChevronRight} />
    </div>
  );
}

export default HeaderItemRewardsContextMenuButton;
