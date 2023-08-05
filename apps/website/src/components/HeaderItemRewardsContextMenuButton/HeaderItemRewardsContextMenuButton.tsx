import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import clsx from 'clsx';

import { useRewardsContextMenu } from '@/hooks/rewards-context-menu';

import classes from './HeaderItemRewardsContextMenuButton.module.scss';

function HeaderItemRewardsContextMenuButton({
  children,
  href,
  onClick
}: {
  children: React.ReactNode | any;
  href: string;
  onClick: () => void;
}) {
  const router = useRouter();

  return (
    <div
      className={clsx(classes.root, router.pathname.includes(href) && classes.active)}
      onClick={onClick}
    >
      {children}
      <FontAwesomeIcon icon={faChevronRight} />
    </div>
  );
}

export default HeaderItemRewardsContextMenuButton;
