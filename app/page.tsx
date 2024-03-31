'use client'
import { Text, Table, Badge, Button, Modal, TextInput, Container, Select, SelectItem, useMantineTheme, Image, Grid, Textarea, Card, Box, MediaQuery } from '@mantine/core';
import NavbarTemp from '@/components/common/navbar';
import { useEffect, useState } from 'react';
import { createTicket, getTicket, getTicketById, updateTicket } from '@/app/api/ticket/ticket'
import { Iticket, Ticket, UTicket } from '@/model/ticket/ticket';
import { useDisclosure } from '@mantine/hooks';
import Loading from '@/components/common/loading/page';
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
          <td>
            <Box w={110}>
              <Text truncate lineClamp={2}>{element.title}</Text>
            </Box>
          </td>
          <td>
            <Box w={180}>
              <Text truncate>{element.contact}</Text>
            </Box>
          </td>
          <td>
            <Box>
              {new Date(element.Create_Timestamp).toLocaleString()}
            </Box>
          </td>
          <td>
              <Badge variant="filled" color="yellow">{element.status}</Badge>
          </td>
          <td>
            <button onClick={() => showEdit(element.id)}>
              <Image src='/see.png' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '25px', height: '25px' }}></Image>
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
          <td>
            <Box w={60}>
              <Text truncate>{element.title}</Text>
            </Box>
          </td>

          <td>
            <Box w={100}>
              <Text truncate>{element.contact}</Text>
            </Box>
          </td>
          <td>{new Date(element.Create_Timestamp).toLocaleString()}</td>
          <td>{element.Update_Timestamp && new Date(element.Update_Timestamp).toLocaleString()}</td>
          <td><Badge variant="filled" color="indigo">{element.status}</Badge></td>
          <td>
            <button onClick={() => showEdit(element.id)}>
              <Image src='/see.png' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '25px', height: '25px' }}></Image>
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
          <td>
            <Box w={60}>
              <Text truncate >{element.title}</Text>
            </Box>
          </td>

          <td>
            <Box w={100}>
              <Text truncate>{element.contact}</Text>
            </Box>
          </td>
          <td>{new Date(element.Create_Timestamp).toLocaleString()}</td>
          <td>{element.Update_Timestamp && new Date(element.Update_Timestamp).toLocaleString()}</td>
          <td><Badge variant="filled" color="green">{element.status}</Badge></td>
          <td>
            <button onClick={() => showEdit(element.id)}>
              <Image src='/see.png' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '25px', height: '25px' }}></Image>
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
          <td>
            <Box w={60}>
              <Text truncate>{element.title}</Text>
            </Box>
          </td>
          <td>
            <Box w={100}>
              <Text truncate>{element.contact}</Text>
            </Box>
          </td>
          <td>{new Date(element.Create_Timestamp).toLocaleString()}</td>
          <td>{element.Update_Timestamp && new Date(element.Update_Timestamp).toLocaleString()}</td>
          <td><Badge variant="filled" color="red">{element.status}</Badge></td>
          <td>
            <button onClick={() => showEdit(element.id)}>
              <Image src='/see.png' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '25px', height: '25px' }}></Image>
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
          <Container size="95%">
            <Button onClick={open} my={20} >
              Create Ticket
            </Button>
            <Modal opened={opened} onClose={close} title="Create Ticket" centered>
              <TextInput
                placeholder="Title"
                label="Title"
                mb={10}
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
                mb={10}
                minRows={2}
                maxRows={4}
                onChange={(evnet) => {
                  setDescription(evnet.target.value)
                }}
              />
              <TextInput
                placeholder="example@dolphin.com"
                label="Contact"
                withAsterisk
                mb={10}
                onChange={(evnet) => {
                  setContact(evnet.target.value)
                }}
              />
              <Button mt={15} onClick={saveTicket}>
                SAVE
              </Button>
            </Modal>
            <Modal opened={openedEdit} onClose={closeedit} title="Detail Ticket"
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
                value={title}
                mb={10}
                // disabled
                variant='filled'
              // bg="white"
              // onChange={(evnet) => {
              //   setTitle(evnet.target.value)
              // }}
              />
              <Textarea
                placeholder="Description"
                label="Description"
                autosize
                mb={10}
                minRows={2}
                maxRows={4}
                variant='filled'
                value={description}
              // onChange={(event) => {
              //   setDescription(event.target.value)
              // }}
              />
              <TextInput
                placeholder="Contact"
                label="Contact"
                mb={10}
                variant='filled'
                value={contact}
              // onChange={(evnet) => {
              //   setContact(evnet.target.value)
              // }}
              />
              <Select
                label="Update Status"
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
            <Grid grow gutter="lg" columns={12} style={{ display: 'flex', justifyContent: 'center' }}>
              <Grid.Col lg={12} xl={5}>
                <Card shadow="sm" padding="lg" radius="lg" withBorder>
                  <Text ml={20} fw={900} mb={5} fz="xl" variant="gradient"
                    gradient={{ from: 'orange', to: 'yellow', deg: 90 }}
                    sx={{ fontFamily: 'Greycliff CF, sans-serif' }}>PENDING</Text>
                  <Container h={{ md:"10vh", lg: "20vh", xl: "30vh" }} style={{ overflowY: "auto" }}>
                  <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
                    <Table mt={15} highlightOnHover withColumnBorders style={{ fontFamily: 'Noto Sans Thai' }}>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Title</th>
                          <th>Contact</th>
                          <th>Create Time</th>
                          <th>status</th>
                          <th>view</th>
                        </tr>
                      </thead>
                      <tbody>{rowsPending}</tbody>
                    </Table>
                  </MediaQuery>
                  
                  {/* <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                  
                  </MediaQuery> */}
                    </Container>
                </Card>
              </Grid.Col>

              <Grid.Col lg={12} xl={5}>
                <Card shadow="sm" padding="lg" radius="lg" withBorder>
                  <Text ml={20} fw={900} fz="xl" variant="gradient"
                    gradient={{ from: 'blue', to: 'purple', deg: 90 }}
                    sx={{ fontFamily: 'Greycliff CF, sans-serif' }}>ACCEPTED</Text>
                  <Container h={{ lg: "20vh", xl: "30vh" }} style={{ overflowY: "auto" }}>
                    {/* <Table mt={15} highlightOnHover withColumnBorders>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Title</th>
                          <th>Contact</th>
                          <th>Create Time</th>
                          <th>Update Time</th>
                          <th>status</th>
                          <th>view</th>
                        </tr>
                      </thead>
                      <tbody>{rowsAccept}</tbody>
                    </Table> */}
                  </Container>
                </Card>
              </Grid.Col>

              <Grid.Col lg={12} xl={5}>
                <Card shadow="sm" padding="lg" radius="lg" withBorder>
                  <Text ml={20} fw={900} fz="xl" variant="gradient"
                    gradient={{ from: 'green', to: 'blue', deg: 90 }}
                    sx={{ fontFamily: 'Greycliff CF, sans-serif' }}>RESOLVED</Text>
                  <Container h={{ lg: "20vh", xl: "30vh" }} style={{ overflowY: "auto" }}>
                    {/* <Table mt={15} highlightOnHover withColumnBorders>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Title</th>
                          <th>Contact</th>
                          <th>Create Time</th>
                          <th>Update Time</th>
                          <th>status</th>
                          <th>view</th>
                        </tr>
                      </thead>
                      <tbody>{rowsresolved}</tbody>
                    </Table> */}
                  </Container>
                </Card>
              </Grid.Col>

              <Grid.Col lg={12} xl={5}>
                <Card shadow="sm" padding="lg" radius="lg" withBorder>
                  <Text ml={20} fw={900} fz="xl" variant="gradient"
                    gradient={{ from: 'red', to: 'black', deg: 175 }}
                    sx={{ fontFamily: 'Greycliff CF, sans-serif' }}>REJECTED</Text>
                  <Container h={{ lg: "10vh", xl: "30vh" }} style={{ overflowY: "auto" }}>
                    {/* <Table mt={15} highlightOnHover withColumnBorders>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Title</th>
                          <th>Contact</th>
                          <th>Create Time</th>
                          <th>Update Time</th>
                          <th>status</th>
                          <th>view</th>
                        </tr>
                      </thead>
                      <tbody>{rowsreject}</tbody>
                    </Table> */}
                  </Container>
                </Card>
              </Grid.Col>
            </Grid>
          </Container>
        </>
      </NavbarTemp>
    );
}
