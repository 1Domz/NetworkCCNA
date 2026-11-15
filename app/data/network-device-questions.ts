export type CourseIdentifyQuestion = {
  id: string;
  type: "identify";
  prompt: string;
  answer: string;
  acceptedAnswers?: string[];
  image?: {
    src: string;
    alt: string;
  };
};

export const networkDeviceQuestions: CourseIdentifyQuestion[] = [
  {
    id: "network-nodes",
    type: "identify",
    prompt:
      "A computer network is a digital telecommunications network which allows [...] to share resources.",
    answer: "nodes",
  },
  {
    id: "end-hosts",
    type: "identify",
    prompt: "[...] and [...] are also known as 'end hosts' or 'endpoints'.",
    answer: "Servers / clients",
    acceptedAnswers: [
      "servers/clients",
      "clients / servers",
      "clients/servers",
      "client and server",
      "clients and servers",
    ],
  },
  {
    id: "router-symbol",
    type: "identify",
    prompt: "What does this symbol represent?",
    answer: "Router",
    image: {
      src: "/anki/network-devices/router.jpg",
      alt: "Network diagram symbol for a router",
    },
  },
  {
    id: "switch-symbol",
    type: "identify",
    prompt: "What does this symbol represent?",
    answer: "Switch",
    image: {
      src: "/anki/network-devices/switch.jpg",
      alt: "Network diagram symbol for a switch",
    },
  },
  {
    id: "client-symbol",
    type: "identify",
    prompt: "What does this symbol represent?",
    answer: "Client",
    image: {
      src: "/anki/network-devices/client.jpg",
      alt: "Network diagram symbol for a client",
    },
  },
  {
    id: "server-symbol",
    type: "identify",
    prompt: "What does this symbol represent?",
    answer: "Server",
    image: {
      src: "/anki/network-devices/server.jpg",
      alt: "Network diagram symbol for a server",
    },
  },
  {
    id: "firewall-symbol",
    type: "identify",
    prompt: "What does this symbol represent?",
    answer: "Firewall",
    image: {
      src: "/anki/network-devices/firewall.jpg",
      alt: "Network diagram symbol for a firewall",
    },
  },
  {
    id: "client-definition",
    type: "identify",
    prompt:
      "A [...] is a device that accesses a service made available by a server.",
    answer: "client",
  },
  {
    id: "server-definition",
    type: "identify",
    prompt:
      "A [...] is a device that provides functions or services for clients.",
    answer: "server",
  },
  {
    id: "client-server-device",
    type: "identify",
    prompt: "Can a single device be both a client and a server?",
    answer: "Yes",
  },
  {
    id: "lan-definition",
    type: "identify",
    prompt: "What does LAN stand for?",
    answer: "Local Area Network",
    acceptedAnswers: ["LAN"],
  },
  {
    id: "switch-lan-connectivity",
    type: "identify",
    prompt: "A [...] provides connectivity to hosts within the same LAN.",
    answer: "switch",
  },
  {
    id: "switch-network-interfaces",
    type: "identify",
    prompt:
      "A [...] has many network interfaces for end hosts to connect to.",
    answer: "switch",
  },
  {
    id: "catalyst-device",
    type: "identify",
    prompt: "What kind of network device is a Cisco 'Catalyst'?",
    answer: "Switch",
  },
  {
    id: "isr-device",
    type: "identify",
    prompt: "What kind of network device is a Cisco ISR?",
    answer: "Router",
  },
  {
    id: "router-interface-count",
    type: "identify",
    prompt: "Routers have [...] network interfaces than switches.",
    answer: "fewer",
  },
  {
    id: "router-internet-traffic",
    type: "identify",
    prompt: "A [...] is used to send data over the Internet.",
    answer: "router",
  },
  {
    id: "firewall-rules",
    type: "identify",
    prompt:
      "A [...] monitors and controls network traffic based on configured rules.",
    answer: "firewall",
  },
  {
    id: "host-based-firewall",
    type: "identify",
    prompt:
      "[...] firewalls are software applications that filter traffic entering and exiting a host machine, like a PC.",
    answer: "Host-based",
    acceptedAnswers: ["host based"],
  },
  {
    id: "asa-device",
    type: "identify",
    prompt: "What kind of network device is a Cisco ASA?",
    answer: "Firewall",
  },
  {
    id: "firepower-device",
    type: "identify",
    prompt: "What kind of network device is a Cisco Firepower?",
    answer: "Firewall",
  },
  {
    id: "next-generation-firewall",
    type: "identify",
    prompt:
      "A firewall which combines a traditional firewall with more advanced filtering functionalities is known as a '[...] firewall'.",
    answer: "next-generation",
    acceptedAnswers: ["next generation"],
  },
];
