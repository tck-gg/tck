/* eslint-disable react-hooks/exhaustive-deps */

import { Checkbox, Table } from '@mantine/core';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { UserAction } from 'database';
import dateformat from 'dateformat';
import { useCookies } from 'react-cookie';

function getUrl() {
  if (process.env.NODE_ENV === 'production') {
    if (!window.location.hostname.includes('localhost')) {
      return 'https://tck.gg';
    }
    return 'http://localhost:8007';
  }
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:8000';
  }
  return '';
}

function AccountActivity({ username }: { username: string }) {
  const [cookie, setCookie] = useCookies(['authorization']);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [rows, setRows] = useState<JSX.Element[]>([]);
  const [shouldShowLogins, setShouldShowLogins] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const response = await axios.get(`${getUrl()}/api/v1/user/activity`, {
        params: {
          username
        },
        headers: {
          authorization: cookie.authorization
        }
      });

      const fetched = response.data;
      if (fetched.length > 0) {
        setRows(
          fetched
            .filter((action: UserAction) => {
              if (shouldShowLogins) {
                return true;
              }
              return action.action !== 'ACCOUNT_LOGIN';
            })
            .map((action: UserAction) => {
              return (
                <tr key={action.id}>
                  <td>{dateformat(action.timestamp, 'yyyy-mm-dd, HH:MM:ss')}</td>
                  <td>{action.action}</td>
                  <td>{action.ip}</td>
                  <td>{action.description}</td>
                </tr>
              );
            })
        );
      }

      setIsLoading(false);
    })();
  }, [username, shouldShowLogins]);

  return !isLoading ? (
    <>
      <Checkbox
        label='Show logins'
        checked={shouldShowLogins}
        onChange={(event) => {
          setShouldShowLogins(event.currentTarget.checked);
        }}
        mb='sm'
      />
      <Table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Activity</th>
            <th>IP</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  ) : (
    <p>Loading...</p>
  );
}

export default AccountActivity;
