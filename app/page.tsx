'use client'
import { Text, Stack, Table, Badge, Button, Modal, TextInput, Container, Select, SelectItem, useMantineTheme, Image, Grid, Textarea } from '@mantine/core';
import NavbarTemp from '@/app/components/common/navbar';
import { useEffect, useState } from 'react';
import { createTicket, getHello, getTicket, getTicketById, updateTicket } from '@/app/api/ticket/ticket'
import { Iticket, Ticket, UTicket } from '@/model/ticket/ticket';
import { useDisclosure } from '@mantine/hooks';
import Loading from './components/common/loading/page';
import {
  generateDateTime,
} from "@/util/utility-func";

export default function Home() {
  const theme = useMantineTheme();
  const [ticket, setTicket] = useState<Ticket[]>();
  const [ticketEdit, setTicketEdit] = useState<Ticket>();
  const [opened, { open, close }] = useDisclosure(false);
  const [openedEdit, { open: openedit, close: closeedit }] = useDisclosure(false);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [tid, settid] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const states: SelectItem[] = [
    { value: 'pending', label: 'Pending' },
    { value: 'accepted', label: 'Accepted' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'rejected', label: 'Rejected' }
  ];


  const rowsPending = ticket && ticket.map((element) => {
    if (element.status === "pending") {
      return (
        <tr key={element.id}>
          <td>{element.id}</td>
          <td>{element.title}</td>
          <td>{element.contact}</td>
          <td>{new Date(element.Create_Timestamp).toLocaleString()}</td>
          <td><Badge color="yellow">{element.status}</Badge></td>
          <td>
            <button onClick={() => showEdit(element.id)}>
              <Image src='/edit.jpg' style={{ display: 'flex', justifyContent: 'center', width: '20px', height: '20px' }}></Image>
            </button>
          </td>
        </tr>
      );
    }
  });
  const rowsAccept = ticket && ticket.map((element) => {
    if (element.status === "accepted") {
      return (
        <tr key={element.id}>
          <td>{element.id}</td>
          <td>{element.title}</td>
          <td>{element.contact}</td>
          <td>{new Date(element.Create_Timestamp).toLocaleString()}</td>
          <td><Badge color="indigo">{element.status}</Badge></td>
          <td>
            <button onClick={() => showEdit(element.id)}>
              <Image src='/edit.jpg' style={{ display: 'flex', justifyContent: 'center', width: '20px', height: '20px' }}></Image>
            </button>
          </td>
        </tr>
      );
    }
  });
  const rowsresolved = ticket && ticket.map((element) => {
    if (element.status === "resolved") {
      return (
        <tr key={element.id}>
          <td>{element.id}</td>
          <td>{element.title}</td>
          <td>{element.contact}</td>
          <td>{new Date(element.Create_Timestamp).toLocaleString()}</td>
          <td><Badge color="green">{element.status}</Badge></td>
          <td>
            <button onClick={() => showEdit(element.id)}>
              <Image src='/edit.jpg' style={{ display: 'flex', justifyContent: 'center', width: '20px', height: '20px' }}></Image>
            </button>
          </td>
        </tr>
      );
    }
  });
  const rowsreject = ticket && ticket.map((element) => {
    if (element.status === "rejected") {
      return (
        <tr key={element.id}>
          <td>{element.id}</td>
          <td>{element.title}</td>
          <td>{element.contact}</td>
          <td>{new Date(element.Create_Timestamp).toLocaleString()}</td>
          <td><Badge color="red">{element.status}</Badge></td>
          <td>
            <button onClick={() => showEdit(element.id)}>
              <Image src='/edit.jpg' style={{ display: 'flex', justifyContent: 'center', width: '20px', height: '20px' }}></Image>
            </button>
          </td>
        </tr>
      );
    }
  });
  const showEdit = async (id: number) => {
    GetTicketById(id);
    openedit();
  }
  const GetHello = async () => {
    const response = await getTicket();
    setTicket(response);
  }
  const GetTicketById = async (id: number) => {
    await getTicketById(id).then((response) => {
      setTicketEdit(response);
      settid(response.id);
      setContact(response.contact);
      setTitle(response.title);
      setDescription(response.description);
      setStatus(response.status);
    })
  }
  const saveTicket = async () => {
    const ticket: Iticket = {
      title: title,
      description: description,
      contact: contact,
      status: "pending"
    }
    try {
      await createTicket(ticket);
      await GetHello();
      close();
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  }

  const UpdateTicket = async () => {
    const formatDate = generateDateTime();
    const ticket: UTicket = {
      id: tid,
      title: title,
      description: description,
      contact: contact,
      update_Timestamp: formatDate,
      status: status
    }
    try {
      await updateTicket(ticket);
      await GetHello();
      closeedit();
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  }

  useEffect(() => {
    GetHello();
    setLoading(false);
  }, [])

  if (isLoading) return <Loading />;
  else
    return (
      <NavbarTemp>
        <>
          <Button onClick={open} >
            Add Ticket
          </Button>
          <Modal opened={opened} onClose={close} title="Add Ticket" centered>
            <TextInput
              placeholder="Title"
              label="Title"
              withAsterisk
              onChange={(evnet) => {
                setTitle(evnet.target.value)
              }}
            />
            <Textarea
              placeholder="Description"
              label="Description"
              withAsterisk
              autosize
              minRows={2}
              maxRows={4}
              onChange={(evnet) => {
                setDescription(evnet.target.value)
              }}
            />
            <TextInput
              placeholder="Contact"
              label="Contact"
              withAsterisk
              onChange={(evnet) => {
                setContact(evnet.target.value)
              }}
            />
            <Button mt={15} onClick={saveTicket}>
              SAVE
            </Button>
          </Modal>
          <Modal opened={openedEdit} onClose={closeedit} title="edit Ticket"
            overlayProps={{
              color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
              opacity: 0.55,
              blur: 3,
            }}
            centered
          >
            <TextInput
              placeholder="Title"
              label="Title"
              withAsterisk
              value={title}
              onChange={(evnet) => {
                setTitle(evnet.target.value)
              }}
            />
            <Textarea
              placeholder="Description"
              label="Description"
              withAsterisk
              autosize
              minRows={2}
              maxRows={4}
              value={description}
              onChange={(event) => {
                setDescription(event.target.value)
              }}
            />
            <TextInput
              placeholder="Contact"
              label="Contact"
              withAsterisk
              value={contact}
              onChange={(evnet) => {
                setContact(evnet.target.value)
              }}
            />
            <Select
              label="Status"
              placeholder={ticketEdit?.status}
              value={status}
              data={states}
              onChange={(selectedStatus) => {
                if (typeof selectedStatus === 'string') {
                  setStatus(selectedStatus);
                }
              }}
            />
            <Button mt={15} onClick={UpdateTicket}>
              SAVE
            </Button>
          </Modal>
          <Grid grow gutter="xl" columns={12} style={{ display: 'flex', justifyContent: 'center' }}>
            <Grid.Col lg={12} xl={5}>
              <Text>PENDING</Text>
              <Container h={{ lg: "20vh", xl: "30vh" }} style={{ overflow: "auto" }}>
                <Table withBorder>
                  <thead>
                    <tr>
                      <th>Ticket Id</th>
                      <th>Title</th>
                      <th>Contact</th>
                      <th>Create Time</th>
                      <th>status</th>
                      <th>edit</th>
                    </tr>
                  </thead>
                  <tbody>{rowsPending}</tbody>
                </Table>
              </Container>
            </Grid.Col>

            <Grid.Col lg={12} xl={5}>
              <Text>ACCEPTED</Text>
              <Container h={{ lg: "20vh", xl: "30vh" }} style={{ overflow: "auto" }}>
                <Table withBorder>
                  <thead>
                    <tr>
                      <th>Ticket Id</th>
                      <th>Title</th>
                      <th>Contact</th>
                      <th>Create Time</th>
                      <th>status</th>
                      <th>edit</th>
                    </tr>
                  </thead>
                  <tbody>{rowsAccept}</tbody>
                </Table>
              </Container>
            </Grid.Col>

            <Grid.Col lg={12} xl={5}>
              <Text>RESOLVED</Text>
              <Container h={{ lg: "20vh", xl: "30vh" }} style={{ overflow: "auto" }}>
                <Table withBorder>
                  <thead>
                    <tr>
                      <th>Ticket Id</th>
                      <th>Title</th>
                      <th>Contact</th>
                      <th>Create Time</th>
                      <th>status</th>
                      <th>edit</th>
                    </tr>
                  </thead>
                  <tbody>{rowsresolved}</tbody>
                </Table>
              </Container>
            </Grid.Col>

            <Grid.Col lg={12} xl={5}>
              <Text>REJECTED</Text>
              <Container h={{ lg: "10vh", xl: "30vh" }} style={{ overflow: "auto" }}>
                <Table withBorder>
                  <thead>
                    <tr>
                      <th>Ticket Id</th>
                      <th>Title</th>
                      <th>Contact</th>
                      <th>Create Time</th>
                      <th>status</th>
                      <th>edit</th>
                    </tr>
                  </thead>
                  <tbody>{rowsreject}</tbody>
                </Table>
              </Container>
            </Grid.Col>
          </Grid>
        </>
      </NavbarTemp>
    );
}
