'use client'
import Loading from '@/components/common/loading/page';
import NavbarTemp from '@/components/common/navbar';
import { Iticket, Ticket, UTicket } from '@/model/ticket/ticket';
import {
  generateDateTime,
} from "@/util/utility-func";
import { Badge, Box, Button, Card, Container, Grid, Image, MediaQuery, Modal, Select, SelectItem, Table, Text, Textarea, TextInput, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Home() {
  const theme = useMantineTheme();
  const [ticket, setTicket] = useState<Ticket[]>();
  const [opened, { open, close }] = useDisclosure(false);
  const [openedEdit, { open: openedit, close: closeedit }] = useDisclosure(false);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [detail, setDetail] = useState({
    id: 0,
    title: "",
    description: "",
    contact: "",
    status: ""
  })

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setDetail({
      ...detail,
      [name]: value,
    })
  }
  const states: SelectItem[] = [
    { value: 'pending', label: 'Pending' },
    { value: 'accepted', label: 'Accepted' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'rejected', label: 'Rejected' }
  ];


  const rowsPending = ticket && ticket.map((element) => {
    if (element.status === "pending") {
      return (
        <React.Fragment key={element.id}>
          <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
            <tr key={element.id}>
              <td>{element.id}</td>
              <td>
                <Box w={110}>
                  <Text truncate>{element.title}</Text>
                </Box>
              </td>
              <td>
                <Box w={150}>
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
                <button onClick={() => showEdit(element)}>
                  <Image src='/see.png' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '25px', height: '25px' }}></Image>
                </button>
              </td>
            </tr>
          </MediaQuery>
          <MediaQuery largerThan="md" styles={{ display: 'none' }}>
            <tr key={element.id}>
              <td>{element.id}</td>
              <td>
                <Box w={{ base: 80, sm: 140 }}>
                  <Text truncate lineClamp={2}>{element.title}</Text>
                </Box>
              </td>
              <td>
                <Badge variant="filled" color="yellow">{element.status}</Badge>
              </td>
              <td>
                <button onClick={() => showEdit(element)}>
                  <Image src='/see.png' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '25px', height: '25px' }}></Image>
                </button>
              </td>
            </tr>
          </MediaQuery>
        </React.Fragment>
      );
    }
  });
  const rowsAccept = ticket && ticket.map((element) => {
    if (element.status === "accepted") {
      return (
        <React.Fragment key={element.id}>
          <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
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
                <button onClick={() => showEdit(element)}>
                  <Image src='/see.png' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '25px', height: '25px' }}></Image>
                </button>
              </td>
            </tr>
          </MediaQuery>
          <MediaQuery largerThan="md" styles={{ display: 'none' }}>
            <tr key={element.id}>
              <td>{element.id}</td>
              <td>
                <Box w={{ base: 80, sm: 140 }}>
                  <Text truncate>{element.title}</Text>
                </Box>
              </td>
              <td><Badge variant="filled" color="indigo">{element.status}</Badge></td>
              <td>
                <button onClick={() => showEdit(element)}>
                  <Image src='/see.png' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '25px', height: '25px' }}></Image>
                </button>
              </td>
            </tr>
          </MediaQuery>
        </React.Fragment>
      );
    }
  });
  const rowsresolved = ticket && ticket.map((element) => {
    if (element.status === "resolved") {
      return (
        <React.Fragment key={element.id}>
          <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
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
                <button onClick={() => showEdit(element)}>
                  <Image src='/see.png' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '25px', height: '25px' }}></Image>
                </button>
              </td>
            </tr>
          </MediaQuery>
          <MediaQuery largerThan="md" styles={{ display: 'none' }}>
            <tr key={element.id}>
              <td>{element.id}</td>
              <td>
                <Box w={{ base: 80, sm: 140 }}>
                  <Text truncate >{element.title}</Text>
                </Box>
              </td>
              <td><Badge variant="filled" color="green">{element.status}</Badge></td>
              <td>
                <button onClick={() => showEdit(element)}>
                  <Image src='/see.png' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '25px', height: '25px' }}></Image>
                </button>
              </td>
            </tr>
          </MediaQuery>
        </React.Fragment>
      );
    }
  });
  const rowsreject = ticket && ticket.map((element) => {
    if (element.status === "rejected") {
      return (
        <React.Fragment key={element.id}>
          <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
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
                <button onClick={() => showEdit(element)}>
                  <Image src='/see.png' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '25px', height: '25px' }}></Image>
                </button>
              </td>
            </tr>
          </MediaQuery>
          <MediaQuery largerThan="md" styles={{ display: 'none' }}>
            <tr key={element.id}>
              <td>{element.id}</td>
              <td>
                <Box w={{ base: 80, sm: 140 }}>
                  <Text truncate >{element.title}</Text>
                </Box>
              </td>
              <td><Badge variant="filled" color="red">{element.status}</Badge></td>
              <td>
                <button onClick={() => showEdit(element)}>
                  <Image src='/see.png' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '25px', height: '25px' }}></Image>
                </button>
              </td>
            </tr>
          </MediaQuery>
        </React.Fragment>
      );
    }
  });
  const showEdit = async (ticket: Ticket) => {
    GetTicketById(ticket);
    openedit();
  }
  const GetHello = async () => {
    const response = await axios.get('/api/ticket');
    if (!response.data.code) {
      setTicket(response.data.result);
    }
  }
  const GetTicketById = async (ticket: Ticket) => {
    setDetail(ticket);
  }
  const saveTicket = async () => {
    const ticket: Iticket = {
      title: detail.title,
      description: detail.description,
      contact: detail.contact,
      status: "pending"
    }
    try {
      await axios.post('/api/ticket/', ticket);
      setDetail({
        id: 0,
        title: "",
        description: "",
        contact: "",
        status: ""
      })
      await GetHello();
      close();

    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  }
  const UpdateTicket = async () => {
    const formatDate = generateDateTime();
    const ticket: UTicket = {
      title: detail.title,
      description: detail.description,
      contact: detail.contact,
      update_Timestamp: formatDate,
      status: detail.status
    }
    try {
      console.log(ticket)
      await axios.put(`/api/ticket/${detail.id}`, ticket);
      await GetHello();
      closeedit();
      setDetail({
        id: 0,
        title: "",
        description: "",
        contact: "",
        status: ""
      })
    } catch (error) {
      console.error("Error updating ticket:", error);
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
          <Container size="80%" >
            <Button onClick={open} my={20} >
              Create Ticket
            </Button>
            <Modal opened={opened} onClose={close} title="Create Ticket" centered>
              <TextInput
                name='title'
                placeholder="Title"
                label="Title"
                mb={10}
                withAsterisk
                onChange={onChange}
              />
              <Textarea
                name='description'
                placeholder="Description"
                label="Description"
                withAsterisk
                autosize
                mb={10}
                minRows={2}
                maxRows={4}
                onChange={onChange}
              />
              <TextInput
                name='contact'
                placeholder="example@dolphin.com"
                label="Contact"
                withAsterisk
                mb={10}
                onChange={onChange}
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
                name="title"
                placeholder="Title"
                label="Title"
                value={detail.title}
                mb={10}
                variant='filled'
                onChange={onChange}
              />
              <Textarea
                name='description'
                placeholder="Description"
                label="Description"
                autosize
                mb={10}
                minRows={2}
                maxRows={4}
                variant='filled'
                value={detail.description}
                onChange={onChange}
              />
              <TextInput
                name='contact'
                placeholder="Contact"
                label="Contact"
                mb={10}
                variant='filled'
                value={detail.contact}
                onChange={onChange}
              />
              <Select
                name='status'
                label="Update Status"
                value={detail.status}
                data={states}
                onChange={(value) => onChange({ target: { name: 'status', value } })}
              />
              <Button mt={15} onClick={UpdateTicket}>
                SAVE
              </Button>
            </Modal>
            <Grid grow gutter="lg" columns={12} style={{ display: 'flex', justifyContent: 'center' }}>
              <Grid.Col lg={12} xl={5}>
                <Card shadow="sm" m={5} radius="lg" withBorder>
                  <Text ml={20} fw={900} mb={5} fz="xl" variant="gradient"
                    gradient={{ from: 'orange', to: 'yellow', deg: 90 }}
                    sx={{ fontFamily: 'Greycliff CF, sans-serif' }}>PENDING</Text>
                  <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
                    <Container h={{ md: "20vh", xl: "30vh" }} style={{ overflowY: "auto" }}>
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
                    </Container>
                  </MediaQuery>

                  <MediaQuery largerThan="md" styles={{ display: 'none' }}>
                    <Container h="20vh" style={{ overflowY: "auto" }}>
                      <Table mt={15} highlightOnHover withColumnBorders style={{ fontFamily: 'Noto Sans Thai' }}>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>status</th>
                            <th>view</th>
                          </tr>
                        </thead>
                        <tbody>{rowsPending}</tbody>
                      </Table>
                    </Container>
                  </MediaQuery>
                </Card>
              </Grid.Col>

              <Grid.Col lg={12} xl={5}>
                <Card shadow="sm" padding="lg" radius="lg" withBorder>
                  <Text ml={20} fw={900} fz="xl" variant="gradient"
                    gradient={{ from: 'blue', to: 'purple', deg: 90 }}
                    sx={{ fontFamily: 'Greycliff CF, sans-serif' }}>ACCEPTED</Text>

                  <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
                    <Container h={{ md: "20vh", xl: "30vh" }} style={{ overflowY: "auto" }}>
                      <Table mt={15} highlightOnHover withColumnBorders>
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
                      </Table>
                    </Container>
                  </MediaQuery>
                  <MediaQuery largerThan="md" styles={{ display: 'none' }}>
                    <Container h="20vh" style={{ overflowY: "auto" }}>
                      <Table mt={15} highlightOnHover withColumnBorders>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>status</th>
                            <th>view</th>
                          </tr>
                        </thead>
                        <tbody>{rowsAccept}</tbody>
                      </Table>
                    </Container>
                  </MediaQuery>
                </Card>
              </Grid.Col>

              <Grid.Col lg={12} xl={5}>
                <Card shadow="sm" padding="lg" radius="lg" withBorder>
                  <Text ml={20} fw={900} fz="xl" variant="gradient"
                    gradient={{ from: 'green', to: 'blue', deg: 90 }}
                    sx={{ fontFamily: 'Greycliff CF, sans-serif' }}>RESOLVED</Text>

                  <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
                    <Container h={{ md: "20vh", xl: "30vh" }} style={{ overflowY: "auto" }}>
                      <Table mt={15} highlightOnHover withColumnBorders>
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
                      </Table>
                    </Container>
                  </MediaQuery>
                  <MediaQuery largerThan="md" styles={{ display: 'none' }}>
                    <Container h="20vh" style={{ overflowY: "auto" }}>
                      <Table mt={15} highlightOnHover withColumnBorders>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>status</th>
                            <th>view</th>
                          </tr>
                        </thead>
                        <tbody>{rowsresolved}</tbody>
                      </Table>
                    </Container>
                  </MediaQuery>
                </Card>
              </Grid.Col>

              <Grid.Col lg={12} xl={5}>
                <Card shadow="sm" padding="lg" radius="lg" withBorder>
                  <Text ml={20} fw={900} fz="xl" variant="gradient"
                    gradient={{ from: 'red', to: 'black', deg: 175 }}
                    sx={{ fontFamily: 'Greycliff CF, sans-serif' }}>REJECTED</Text>
                  <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
                    <Container h={{ md: "20vh", xl: "30vh" }} style={{ overflowY: "auto" }}>
                      <Table mt={15} highlightOnHover withColumnBorders>
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
                      </Table>
                    </Container>
                  </MediaQuery>
                  <MediaQuery largerThan="md" styles={{ display: 'none' }}>
                    <Container h="20vh" style={{ overflowY: "auto" }}>
                      <Table mt={15} highlightOnHover withColumnBorders>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>status</th>
                            <th>view</th>
                          </tr>
                        </thead>
                        <tbody>{rowsreject}</tbody>
                      </Table>
                    </Container>
                  </MediaQuery>
                </Card>
              </Grid.Col>
            </Grid>
          </Container>
        </>
      </NavbarTemp>
    );
}
