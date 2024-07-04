import Layout from '@/components/Layout/Layout';
import PageHeader from '@/components/PageHeader/PageHeader';
import classes from './tasks.module.scss';
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
          buttonText: 'Like',
          shadowColor: '#123123'
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
          buttonText: 'Like',
          shadowColor: '#123123'
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
          buttonText: 'Like',
          shadowColor: '#123123'
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
          buttonText: 'Watch',
          shadowColor: '#123123'
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
          buttonText: 'Follow',
          shadowColor: '#123123'
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
          buttonText: 'Follow',
          shadowColor: '#123123'
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
          buttonText: 'Join',
          shadowColor: '#123123'
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
          buttonText: 'Register',
          shadowColor: '#123123'
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

  return (
    <Layout title='Tasks'>
      <PageHeader title='Tasks' />
      <div className={classes.mainWrapper}>
        {data.map((data) => {
          return (
            <div key={data.id} className={classes.tasksTypeWrapper}>
              <div className={classes.headerWrapper}>
                <Image src={header} className={classes.headerAcc} alt='Header Acc' width={50} />
                <span className={classes.tasksHeader}>{data.type}</span>
              </div>
              <div className={classes.tasksWrapper}>
                {data.tasks.map((task) => {
                  return (
                    <div
                      key={task.id}
                      className={`${classes.taskWrapper} ${task.done ? classes.doneOpacity : ''}`}
                    >
                      <div className={classes.taskLogoWrapper}>
                        <Image
                          src={handleGetLogo(task.type)}
                          className={classes.logoImage}
                          alt={task.type}
                          width={80}
                          height={20}
                          style={{ objectFit: 'contain' }}
                        />
                      </div>
                      <div className={classes.taskContent}>
                        <div className={classes.taskTitle}>{task.title}</div>
                        <div className={classes.taskDescription}>{task.description}</div>
                      </div>
                      <div className={classes.actionWrapper}>
                        <div className={classes.rewardWrapper}>
                          <Image
                            src={coinBackground}
                            className={classes.coinBackground}
                            alt='Coin background'
                            width={120}
                          />
                          <Image src={coin} className={classes.coinImage} alt='Coin' width={20} />
                          <div className={classes.reward}>{task.reward}</div>
                        </div>
                        {task.done ? (
                          <div className={classes.doneWrapper}>
                            <Image
                              src={done}
                              className={classes.doneAcc}
                              alt='Done acc'
                              width={30}
                            />
                            <FontAwesomeIcon icon={faCheck} className={classes.checkIcon} />
                            <span className={classes.doneText}>Done</span>
                          </div>
                        ) : (
                          <Button width={90} rightIcon={faChevronRight}>
                            <span className={classes.taskButtonText}>{task.buttonText ?? ''}</span>
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
