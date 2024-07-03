import Layout from '@/components/Layout/Layout';
import PageHeader from '@/components/PageHeader/PageHeader';
import classes from './tasks.module.scss';
import Image from 'next/image';
import header from '../../images/tasks/tasks-header.png';

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
                    <div key={task.id} className={classes.taskWrapper}>
                      <div className={classes.taskLogo}></div>
                      <div className={classes.taskContent}>
                        <div className={classes.taskTitle}>{task.title}</div>
                        <div className={classes.taskDescription}>{task.description}</div>
                      </div>
                      <div className={classes.taskButton}></div>
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
