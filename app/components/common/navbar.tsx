import { useState } from 'react';
import {
  AppShell,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from '@mantine/core';
import { ContentProps } from "@/model/layout/content";
import { redirect } from 'next/dist/server/api-utils';

export default function NavbarTemp(props: ContentProps) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
            // backgroundColor: 'red',
            background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[8],
            justifyContent: 'center',
            display: 'flex',
        },
      }}
      header={
        <Header height={{ base: 50, md: 70 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%'}}>
            <Text color='black'>helpdesk support ticket management application</Text>
          </div>
        </Header>
      }
    >
      <Text>{props.children}</Text>
    </AppShell>
  );
}