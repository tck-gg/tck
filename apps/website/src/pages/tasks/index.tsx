import Layout from '@/components/Layout/Layout';
import PageHeader from '@/components/PageHeader/PageHeader';
import styles from './tasks.module.scss';
import Image from 'next/image';
import header from '../../images/tasks/tasks-header.png';
import done from '../../images/tasks/done.png';
import coinBackground from '../../images/tasks/coin-background.png';
import youtube from '../../images/tasks/youtube.png';
import tiktok from '../../images/tasks/tiktok.png';
import instagram from '../../images/tasks/instagram.png';
import kick from '../../images/tasks/kick.png';
import x from '../../images/tasks/x.png';
import discord from '../../images/tasks/discord.png';
import stake from '../../images/tasks/stake.png';
import coin from '../../images/coin.png';
import Button from '@/components/ui/Button/Button';
import { faChevronRight, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Tasks() {
  const data = [
    {
      id: 1,
      type: 'Daily Tasks',
      remainingTime: '15:30:49',
      tasks: [
        {
          id: 1,
          done: false,
          type: 'Youtube',
          title: 'Like Youtube Video',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          reward: 250000,
          url: 'https://google.com',
          buttonText: 'Like'
        },
        {
          id: 2,
          done: false,
          type: 'Tiktok',
          title: 'Like Tiktok Video',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          reward: 250000,
          url: 'https://google.com',
          buttonText: 'Like'
        },
        {
          id: 3,
          done: false,
          type: 'Instagram',
          title: 'Like Instagram Video',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          reward: 250000,
          url: 'https://google.com',
          buttonText: 'Like'
        },
        {
          id: 4,
          done: true,
          type: 'Kick',
          title: 'Watch Livestream',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          reward: 250000,
          url: 'https://google.com',
          buttonText: 'Watch'
        }
      ]
    },
    {
      id: 2,
      type: 'Tasks',
      remainingTime: '15:30:49',
      tasks: [
        {
          id: 1,
          done: false,
          type: 'X',
          title: 'Follow @TCKgg on X',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          reward: 250000,
          url: 'https://google.com',
          buttonText: 'Follow'
        },
        {
          id: 2,
          done: false,
          type: 'X',
          title: 'Follow @TCKTwitch on X',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          reward: 250000,
          url: 'https://google.com',
          buttonText: 'Follow'
        },
        {
          id: 3,
          done: false,
          type: 'Discord',
          title: "Join TCK's Discord ",
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          reward: 250000,
          url: 'https://google.com',
          buttonText: 'Join'
        },
        {
          id: 4,
          done: true,
          type: 'Stake',
          title: 'Register on Stake',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          reward: 250000,
          url: 'https://google.com',
          buttonText: 'Register'
        }
      ]
    }
  ];

  const handleGetLogo = (type: string) => {
    switch (type.toLowerCase()) {
      case 'youtube':
        return youtube;
      case 'tiktok':
        return tiktok;
      case 'instagram':
        return instagram;
      case 'kick':
        return kick;
      case 'x':
        return x;
      case 'discord':
        return discord;
      case 'stake':
        return stake;
      default:
        return youtube;
    }
  };
  const handleGetShadowHexcode = (type: string) => {
    switch (type.toLowerCase()) {
      case 'youtube':
        return '#CD3234';
      case 'tiktok':
        return '#B8B8B8';
      case 'instagram':
        return '#ED0192';
      case 'kick':
        return '#2B8011';
      case 'x':
        return '#B8B8B8';
      case 'discord':
        return '#5865F2';
      case 'stake':
        return '#B8B8B8';
      default:
        return '#FFFFFF';
    }
  };

  return (
    <Layout title='Tasks'>
      <PageHeader title='Tasks' />
      <div className={styles.mainWrapper}>
        {data.map((data) => {
          return (
            <div key={data.id} className={styles.tasksTypeWrapper}>
              <div className={styles.headerWrapper}>
                <Image src={header} className={styles.headerAcc} alt='Header Acc' width={50} />
                <span className={styles.tasksHeader}>{data.type}</span>
              </div>
              <div className={styles.tasksWrapper}>
                {data.tasks.map((task) => {
                  return (
                    <div
                      key={task.id}
                      className={`${styles.taskWrapper} ${task.done ? styles.doneOpacity : ''}`}
                    >
                      <div className={styles.taskLogoWrapper}>
                        <div
                          className={styles.shadow}
                          style={{
                            background: `radial-gradient(circle, ${handleGetShadowHexcode(
                              task.type
                            )}99 0%, #00000000 50%)`
                          }}
                        ></div>
                        <Image
                          src={handleGetLogo(task.type)}
                          className={styles.logoImage}
                          alt={task.type}
                          width={90}
                          height={20}
                          style={{ objectFit: 'contain' }}
                        />
                      </div>
                      <div className={styles.taskContent}>
                        <div className={styles.taskTitle}>{task.title}</div>
                        <div className={styles.taskDescription}>{task.description}</div>
                      </div>
                      <div className={styles.actionWrapper}>
                        <div className={styles.rewardWrapper}>
                          <Image
                            src={coinBackground}
                            className={styles.coinBackground}
                            alt='Coin background'
                            width={120}
                          />
                          <Image src={coin} className={styles.coinImage} alt='Coin' width={20} />
                          <div className={styles.reward}>{task.reward}</div>
                        </div>
                        {task.done ? (
                          <div className={styles.doneWrapper}>
                            <Image
                              src={done}
                              className={styles.doneAcc}
                              alt='Done acc'
                              width={30}
                            />
                            <FontAwesomeIcon icon={faCheck} className={styles.checkIcon} />
                            <span className={styles.doneText}>Done</span>
                          </div>
                        ) : (
                          <Button width={90} rightIcon={faChevronRight}>
                            <span className={styles.taskButtonText}>{task.buttonText ?? ''}</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

export default Tasks;
