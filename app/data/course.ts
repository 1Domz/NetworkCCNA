import { buildGroupedCourseModules } from "./course-groups";

export type CourseLesson = {
  title: string;
  duration: string;
  summary: string;
  keyConcept: string;
  objectives: string[];
  term: string;
  definition: string;
  notes?: LessonNotes;
};

export type LessonNotes = {
  heading?: string;
  introduction: string;
  reference?: {
    label: string;
    url: string;
  };
  references?: {
    label: string;
    url: string;
  }[];
  layers?: {
    name: string;
    responsibility: string;
    examples: string;
    dataUnit: string;
  }[];
  sections: {
    title: string;
    paragraphs: string[];
    points?: string[];
  }[];
};

export type CourseModule = {
  title: string;
  description: string;
  lessons: CourseLesson[];
};

const sourceCourseModules: CourseModule[] = [
  {
    title: "Networking Fundamentals",
    description:
      "Build a foundation in network devices, Ethernet connections, and the models used to explain communication.",
    lessons: [
      {
        title: "Network devices",
        duration: "7 min",
        summary:
          "Learn how clients, servers, switches, routers, and firewalls work together to connect devices, carry data, and protect networks.",
        keyConcept:
          "Clients and servers use network services; switches connect devices in a LAN, routers move traffic between networks, and firewalls apply security rules.",
        objectives: [
          "Identify network nodes, clients, servers, switches, routers, and firewalls.",
          "Explain how switches, routers, and firewalls differ using a simple network path.",
        ],
        term: "Default gateway",
        definition:
          "The router a host uses to reach destinations outside its local IP network.",
        notes: {
          heading: "Network devices",
          introduction:
            "A computer network is two or more connected nodes that can exchange information or share resources. Devices connect with cables or wirelessly. End hosts create or use information; intermediary devices connect devices and networks and help traffic reach its destination.",
          reference: {
            label: "Jeremy's IT Lab — Free CCNA: Network Devices (Day 1)",
            url: "https://www.youtube.com/watch?v=H8W9oMNSuwo",
          },
          sections: [
            {
              title: "What is a network?",
              paragraphs: [
                "Even two computers connected directly can form a simple network and share information when configured to communicate. A home, school, or office network adds more devices and often uses switches and routers to connect them.",
                "Think of the connection like a path between two desks: one child can pass a note to the other. A computer network provides a path for digital messages and shared resources such as files or a printer.",
              ],
              points: [
                "A node is any device that participates in the network.",
                "The Internet is a large collection of interconnected networks.",
              ],
            },
            {
              title: "Clients and servers are both network nodes",
              paragraphs: [
                "A node is any device that participates in a network. A client is a device or program that requests or uses a service; a server provides a service or resource to clients. A single device can act as a client for one service and a server for another.",
                "For example, when a tablet requests a web page, the tablet is the client and the computer hosting the site is the server. Servers and clients are both end hosts, also called endpoints.",
              ],
              points: [
                "Examples of clients include computers, phones, and tablets.",
                "Servers can provide web pages, files, printing, or other shared services.",
                "A network lets endpoints communicate and share resources, such as a printer or documents.",
              ],
            },
            {
              title: "Switches connect devices within a LAN",
              paragraphs: [
                "A switch provides connectivity for end hosts in the same local area network (LAN). Its physical ports are where wired devices connect. Many enterprise switches have 24 or more ports, while smaller models may have fewer.",
                "In a school or office, a switch lets computers and printers on the local network communicate. A basic Layer 2 switch forwards frames within its LAN; connecting separate IP networks is the router's job. Some multilayer switches can also perform routing.",
              ],
              points: [
                "Switches typically offer many host-facing interfaces.",
                "A classroom switch can connect student computers and a shared printer.",
                "Cisco Catalyst is a family of switches; the exact model determines its capabilities.",
              ],
            },
            {
              title: "Routers connect different networks",
              paragraphs: [
                "A router forwards IP packets between separate networks toward their destination. A host normally sends traffic for a remote network to its default gateway, which is usually the router interface on the local network.",
                "A branch-to-branch path might carry traffic from a PC to a local switch, through a router and a wide-area network, then through a remote router and switch to a server. A home router similarly connects a home LAN to an Internet service provider. Router interface counts vary by model, though routers commonly have fewer host-facing ports than access switches.",
              ],
              points: [
                "The local switch handles communication within the LAN; routers move traffic between LANs.",
                "A router chooses a next hop based on the destination network and its routing information.",
                "Cisco ISR refers to a family of integrated services routers.",
              ],
            },
            {
              title: "Firewalls enforce traffic rules",
              paragraphs: [
                "A firewall monitors network traffic and allows or blocks it according to configured security rules. A network firewall can be placed at a boundary between networks; a host-based firewall is software on an individual computer that filters traffic entering or leaving that host.",
                "In a branch-to-branch connection, firewalls can inspect traffic as it crosses network boundaries. Next-generation firewalls add more advanced filtering and inspection capabilities. Firewalls reduce risk, but they do not guarantee complete security.",
              ],
              points: [
                "A network firewall is like a guard checking visitors at a building entrance.",
                "A host-based firewall is like a lock protecting one room inside the building.",
                "Cisco ASA and Firepower are firewall product families.",
              ],
            },
            {
              title: "Put the devices together",
              paragraphs: [
                "Imagine a computer sending a request to a server in another branch. The client creates the request, the local switch carries it across the LAN, and the default gateway router forwards it toward the remote network. Firewalls apply their rules along the path. At the destination, the remote router and switch deliver the traffic to the server.",
                "A simple way to remember the roles: clients ask, servers provide, switches connect devices locally, routers connect networks, and firewalls filter traffic.",
              ],
            },
          ],
        },
      },
      {
        title: "Interfaces and cables",
        duration: "10 min",
        summary:
          "Learn the Ethernet interface, copper, and fiber basics that let network devices connect and exchange data.",
        keyConcept:
          "Ethernet standards define link speeds and media; the right copper or fiber cable depends on the interfaces, distance, and environment.",
        objectives: [
          "Identify common Ethernet rates, RJ45 interfaces, and copper cable types.",
          "Explain when straight-through, crossover, or fiber connections are used.",
          "Compare multimode and single-mode fiber at a high level.",
        ],
        term: "Auto MDI-X",
        definition:
          "An Ethernet feature that automatically detects and adjusts transmit and receive pair assignments on a copper link.",
        notes: {
          heading: "Interfaces and cables",
          introduction:
            "An interface is the point where a device connects to a network. Ethernet links use copper or fiber, and each physical connection must match the interface, signaling standard, and required distance. The notes below summarize the main ideas from Jeremy's IT Lab Day 2 lesson.",
          reference: {
            label: "Jeremy's IT Lab — Free CCNA: Interfaces and Cables (Day 2)",
            url: "https://www.youtube.com/watch?v=ieTH5lVhNaY",
          },
          sections: [
            {
              title: "Ethernet interfaces and rates",
              paragraphs: [
                "A common copper Ethernet cable has an eight-contact RJ45 plug at each end. Ethernet link speeds are measured in bits per second (bps), not bytes per second. One byte contains eight bits; networking rate prefixes such as kilo, mega, giga, and tera use decimal multiples.",
                "The IEEE 802.3 standards describe Ethernet. Names such as 1000BASE-T indicate a nominal rate of 1000 megabits per second and the physical medium or signaling method. Copper twisted-pair Ethernet commonly supports channel lengths up to 100 meters when the cable and installation meet the required category.",
              ],
              points: [
                "Common rates include 10 Mbps, 100 Mbps, 1 Gbps, and 10 Gbps.",
                "10BASE-T and 100BASE-T use two wire pairs; 1000BASE-T and 10GBASE-T use all four pairs.",
                "Actual throughput can be lower than a link's nominal rate because of protocol overhead and other conditions.",
              ],
            },
            {
              title: "UTP copper cable",
              paragraphs: [
                "Unshielded twisted-pair (UTP) cable contains pairs of insulated copper wires twisted together. The twists help reduce electromagnetic interference and crosstalk between pairs. Copper is practical and widely used for short device-to-switch connections, but its performance depends on cable quality, installation, and distance.",
                "For 10BASE-T and 100BASE-T, the transmit and receive data pairs use pins 1-2 and 3-6. Gigabit and faster twisted-pair Ethernet use all four pairs. Because copper carries electrical signals, it can be more affected by electromagnetic interference than fiber and may emit signals outside the cable.",
              ],
              points: [
                "Use the cable category required by the Ethernet speed and installation.",
                "Keep copper runs within the standard's channel-length limit and away from strong interference sources where practical.",
                "A link's performance depends on both end interfaces and the cable between them.",
              ],
            },
            {
              title: "Straight-through, crossover, and Auto MDI-X",
              paragraphs: [
                "Historically, a straight-through cable kept the same pin assignment at both ends and was used between unlike Ethernet interfaces, such as a PC and a switch. A crossover cable swapped the transmit and receive pair assignments and was traditionally used between like interfaces, such as two switches.",
                "Auto MDI-X detects the needed transmit and receive arrangement automatically, so compatible modern interfaces can generally establish a link without choosing a cable based on device type. Always follow the device and course requirements, especially when working with older equipment or fixed-speed lab scenarios.",
              ],
              points: [
                "Without Auto MDI-X, PC-to-switch and router-to-switch links traditionally use straight-through cables.",
                "Without Auto MDI-X, switch-to-switch and router-to-router links traditionally use crossover cables.",
                "Fast Ethernet device roles traditionally determine transmit and receive pins; gigabit links use all four pairs.",
              ],
            },
            {
              title: "Fiber-optic connections",
              paragraphs: [
                "Fiber carries data as light and is useful for longer links, high bandwidth, and environments where electrical interference is a concern. Switches and routers often use a removable SFP-family transceiver to connect the interface to the selected fiber type and wavelength.",
                "Multimode fiber has a larger core and supports multiple light paths; it is commonly used for shorter building links. Single-mode fiber has a much smaller core and is commonly selected for longer distances. A transceiver's specification, fiber type, wavelength, and link budget determine the supported range, so check the hardware documentation rather than assuming every optic reaches the same distance.",
              ],
              points: [
                "10GBASE-SR is a short-reach multimode optic; supported distance varies with the multimode fiber grade.",
                "10GBASE-LR is specified for links up to 10 km over single-mode fiber.",
                "10GBASE-ER is commonly specified for up to 40 km over single-mode fiber; confirm the exact transceiver and fiber requirements.",
                "1000BASE-LX typically supports longer distances on single-mode fiber than on multimode fiber.",
              ],
            },
          ],
        },
      },
      {
        title: "TCP/IP and encapsulation",
        duration: "15 min",
        summary:
          "Explore the TCP/IP layers, Internet standards, protocol data units, and how encapsulation carries data across networks.",
        keyConcept:
          "Application data is packaged with transport, IP, and link-layer information as it travels toward its destination.",
        objectives: [
          "Recognize the TCP/IP layers and the responsibilities of each.",
          "Identify the PDU and payload terms used at different layers.",
          "Describe how data is encapsulated and decapsulated.",
        ],
        term: "Protocol",
        definition:
          "A set of agreed rules that allows networked systems to communicate.",
        notes: {
          introduction:
            "The TCP/IP model organizes network communication into layers with distinct responsibilities. Each layer uses the service below it and provides a service to the layer above it. This lesson uses the common five-layer teaching view.",
          reference: {
            label: "Jeremy's IT Lab — How the TCP/IP Model Actually Works (Day 3)",
            url: "https://www.youtube.com/watch?v=yM-XNq9ADlI",
          },
          layers: [
            {
              name: "Application",
              responsibility:
                "Provides network services and formats data for applications.",
              examples: "HTTP, DNS, SMTP",
              dataUnit: "Data",
            },
            {
              name: "Transport",
              responsibility:
                "Delivers data between application processes and uses port numbers to identify services.",
              examples: "TCP, UDP",
              dataUnit: "Segment (TCP) or datagram (UDP)",
            },
            {
              name: "Internet",
              responsibility:
                "Uses IP addressing and routing to move packets between networks.",
              examples: "IPv4, IPv6",
              dataUnit: "Packet",
            },
            {
              name: "Link",
              responsibility:
                "Uses local-link addressing to deliver a frame toward the next hop.",
              examples: "Ethernet, Wi-Fi",
              dataUnit: "Frame",
            },
            {
              name: "Physical",
              responsibility:
                "Carries bits as electrical, optical, or radio signals; includes the media and signaling characteristics.",
              examples: "Copper cable, fiber, radio",
              dataUnit: "Bits",
            },
          ],
          sections: [
            {
              title: "Protocols, standards, and organizations",
              paragraphs: [
                "A protocol defines rules for communication. A standard is an agreed specification that helps equipment and software from different vendors work together.",
                "IEEE develops LAN standards such as Ethernet (802.3) and Wi-Fi (802.11). The IETF develops Internet protocols and publishes them as RFCs.",
              ],
              points: [
                "Devices can interoperate when they implement compatible protocols and standards.",
                "A local Wi-Fi connection and an Internet IP connection rely on standards from different organizations.",
              ],
            },
            {
              title: "A brief history of TCP/IP",
              paragraphs: [
                "ARPANET began in 1969 and initially used NCP. Work by Vint Cerf and Bob Kahn on TCP and IP led to ARPANET's transition to TCP/IP on January 1, 1983. Open specifications helped the protocol suite spread across different systems and vendors.",
              ],
            },
            {
              title: "Why networking is layered",
              paragraphs: [
                "Layering divides communication into jobs. Each layer relies on the service directly below it and provides a service to the layer above it. This separation makes the overall system easier to understand and maintain.",
                "The layers cooperate, but their responsibilities are distinct. A change to one technology, such as using Wi-Fi instead of Ethernet for local access, does not normally require changing the application protocol.",
              ],
              points: [
                "Adjacent-layer interaction describes how neighboring layers exchange services.",
                "Same-layer interaction describes how matching protocols on two devices interpret corresponding protocol information.",
                "Even when peer layers communicate logically, data still travels down the sender's stack and up the receiver's stack.",
              ],
            },
            {
              title: "Encapsulation, PDUs, and payloads",
              paragraphs: [
                "As data moves down the sender's stack, each layer adds control information. The transport layer adds its header, the Internet layer adds an IP header, and the Link layer adds local-delivery information such as a frame header and error-detection trailer. The Physical layer sends the resulting bits.",
                "A protocol data unit (PDU) is the name for the data handled at a layer. The data carried inside a layer's PDU is its payload. At the destination, the receiving device processes and removes the encapsulation in reverse order; this is called decapsulation.",
              ],
              points: [
                "Transport: a TCP segment or UDP datagram.",
                "Internet: an IP packet.",
                "Link: a frame carrying the packet across one local link.",
                "Physical: bits carried as signals.",
              ],
            },
            {
              title: "TCP and UDP",
              paragraphs: [
                "TCP establishes a connection and provides ordered, reliable delivery using acknowledgments and retransmission. UDP sends datagrams without those delivery guarantees, leaving more responsibility to the application.",
                "Transport-layer port numbers help a host deliver received data to the correct application service. For example, HTTP commonly uses port 80 and HTTPS commonly uses port 443.",
              ],
            },
            {
              title: "Following a web request",
              paragraphs: [
                "When a browser requests a web page, HTTP or HTTPS defines the application message. Transport information identifies the destination service, IP addressing carries the packet toward the server, and the local link delivers a frame to the next hop.",
                "The frame is only for the current link. A router removes it and builds a new frame for the next link, while the packet's end-to-end IP destination remains the server.",
              ],
            },
            {
              title: "TCP/IP and OSI layer views",
              paragraphs: [
                "The TCP/IP suite is widely used in real networks, while the seven-layer OSI model remains a common reference for learning and troubleshooting.",
                "Networking references group related functions differently. A four-layer TCP/IP view combines Link and Physical into Network Access; the five-layer teaching view separates them. In that five-layer view, Application groups functions often associated with the OSI Application, Presentation, and Session layers.",
              ],
            },
            {
              title: "A simple delivery analogy",
              paragraphs: [
                "Think of sending a letter: its message is the application data, the recipient resembles a transport port, the street address resembles an IP address, and the local delivery step resembles a link-layer frame. Roads and vehicles represent the physical medium.",
                "The analogy also shows how a delivery route can change while the message stays the same, just as a network can change its local path without changing the application data.",
              ],
            },
          ],
        },
      },
      {
        title: "Intro to the CLI",
        duration: "12 min",
        summary:
          "Connect to Cisco devices through the console, navigate IOS command modes, inspect configurations, and save changes safely.",
        keyConcept:
          "Cisco IOS separates user, privileged, and configuration modes; save the running configuration to startup-config to preserve changes after a restart.",
        objectives: [
          "Recognize common console settings and Cisco IOS prompt modes.",
          "Use help, show, configuration, and save commands at the appropriate prompt.",
          "Distinguish password obfuscation from stronger secret hashing.",
        ],
        term: "Privileged EXEC mode",
        definition:
          "Cisco IOS command mode, entered with enable, that provides access to privileged monitoring and configuration commands.",
        notes: {
          heading: "Intro to the CLI",
          introduction:
            "The command-line interface (CLI) lets an administrator inspect and configure a Cisco device. A console connection provides local management access, while IOS modes control which commands are available.",
          reference: {
            label: "Jeremy's IT Lab — Free CCNA course playlist",
            url: "https://www.youtube.com/playlist?list=PLxbwE86jKRgMpuZuLBivzlM8s2Dk5lXBQ",
          },
          sections: [
            {
              title: "Connect through the console",
              paragraphs: [
                "Cisco devices commonly provide a USB console port, an RJ-45 console port, or both. An RJ-45 console connection traditionally uses a rollover cable and terminal-emulator software.",
                "A common default terminal profile is 9600 bits per second, 8 data bits, no parity, 1 stop bit, and no flow control (9600 8N1). The device or lab instructions may specify different settings.",
              ],
              points: [
                "Console access is useful before a network interface has been configured.",
                "The console is a management connection, not an Ethernet data link.",
              ],
            },
            {
              title: "Navigate IOS command modes",
              paragraphs: [
                "User EXEC mode is the initial, limited prompt and typically ends in >. Enter enable to reach privileged EXEC mode, whose prompt ends in #. From privileged EXEC mode, configure terminal enters global configuration mode, shown with (config)#.",
                "Use ? to request context-sensitive help. The exit command leaves the current mode. From configuration mode, the do keyword runs an EXEC command such as do show running-config without leaving configuration mode.",
              ],
              points: [
                "User EXEC: Router>",
                "Privileged EXEC: Router#",
                "Global configuration: Router(config)#",
                "Use no before a configuration command to negate or remove that setting.",
              ],
            },
            {
              title: "View and save configuration",
              paragraphs: [
                "The running-config is the active configuration in memory. The startup-config is the saved configuration loaded when the device boots. Changes to the running configuration do not automatically become the startup configuration.",
                "Use show running-config and show startup-config to inspect them. To preserve current changes across a restart, copy running-config startup-config is the explicit command; write memory and write are common IOS shortcuts.",
              ],
            },
            {
              title: "Protect privileged access",
              paragraphs: [
                "Use enable secret to configure the privileged EXEC secret; on classic IOS this is stored using a one-way hash rather than as plaintext. The older enable password command is less secure and should not be preferred when enable secret is available.",
                "The service password-encryption command applies reversible type 7 obfuscation to eligible plaintext passwords. It is not strong encryption. Removing the command does not automatically turn existing type 7 strings back into plaintext.",
              ],
              points: [
                "Treat type 7 as obfuscation, not a secure password-storage method.",
                "Classic IOS commonly identifies the legacy MD5-based enable secret as type 5; newer platforms may support stronger hash types.",
              ],
            },
          ],
        },
      },
    ],
  },
  {
    title: "Ethernet & IPv4 Foundations",
    description:
      "Learn Ethernet frame and switching fundamentals, then build a foundation in IPv4 addressing.",
    lessons: [
      {
        title: "Ethernet LAN Switching (Part 1)",
        duration: "15 min",
        summary:
          "Study Ethernet frame fields, MAC addressing, EtherTypes, and how switches learn and forward traffic.",
        keyConcept:
          "Switches learn source MAC addresses and use the destination address to forward known traffic, flooding unknown unicast frames within the VLAN.",
        objectives: [
          "Recognize Ethernet frame fields, sizes, and common EtherType values.",
          "Explain MAC address structure and hexadecimal notation.",
          "Describe source learning, forwarding, flooding, and MAC aging.",
        ],
        term: "MAC address",
        definition:
          "A 48-bit link-layer address used to identify an Ethernet interface on a local network.",
        notes: {
          heading: "Ethernet LAN Switching (Part 1)",
          introduction:
            "Ethernet frames carry data over a local link. Switches examine their Layer 2 headers to learn where devices are located and to forward traffic within a VLAN.",
          reference: {
            label: "Jeremy's IT Lab — Free CCNA course playlist",
            url: "https://www.youtube.com/playlist?list=PLxbwE86jKRgMpuZuLBivzlM8s2Dk5lXBQ",
          },
          sections: [
            {
              title: "Ethernet frame structure",
              paragraphs: [
                "The preamble (7 bytes) helps synchronize reception, followed by the 1-byte Start Frame Delimiter (SFD). The header then contains destination MAC, source MAC, and a 2-byte Type/Length field. A 4-byte Frame Check Sequence (FCS) is carried in the trailer.",
                "The preamble and SFD are transmitted before the frame itself. Excluding them, the Ethernet header and FCS total 18 bytes. The FCS uses a cyclic redundancy check (CRC) to help detect corruption.",
              ],
              points: [
                "Preamble: 10101010 repeated; SFD: 10101011.",
                "The Type/Length field values up to 1500 represent length; values from 1536 identify an EtherType.",
                "IPv4 uses EtherType 0x0800; IPv6 uses 0x86DD.",
              ],
            },
            {
              title: "MAC addresses and hexadecimal",
              paragraphs: [
                "A standard Ethernet MAC address is 48 bits (6 bytes), usually written as 12 hexadecimal digits. The first 3 bytes are the Organizationally Unique Identifier (OUI). A factory-assigned address is also called a burned-in address (BIA).",
                "Hexadecimal digits represent values from 0 through 15: A is 10, B is 11, C is 12, D is 13, E is 14, and F is 15. A unicast destination identifies one interface.",
              ],
            },
            {
              title: "How switches learn and forward",
              paragraphs: [
                "A switch learns a source MAC address and the interface where it arrived, adding or refreshing a dynamic entry in its MAC address table. It then checks the destination MAC to decide where to forward the frame.",
                "For a known destination, the switch forwards toward the learned interface. When a unicast destination is unknown, it floods the frame out other forwarding ports in the same VLAN, except the port where it arrived. Dynamic entries commonly age out after five minutes of inactivity.",
              ],
              points: [
                "show mac address-table displays learned entries.",
                "clear mac address-table dynamic clears dynamic entries.",
              ],
            },
          ],
        },
      },
      {
        title: "Ethernet LAN Switching (Part 2)",
        duration: "10 min",
        summary:
          "Review Ethernet frame sizing, ARP, the ARP cache, and useful switch commands for inspecting or clearing learned entries.",
        keyConcept:
          "ARP resolves local IPv4 addresses to MAC addresses; requests are normally broadcast and replies are normally unicast.",
        objectives: [
          "Recall Ethernet minimum frame and payload sizes.",
          "Describe an ARP request/reply exchange and recognize its broadcast address.",
          "Use commands to inspect or clear ARP and MAC address tables.",
        ],
        term: "ARP",
        definition:
          "A protocol that discovers the MAC address associated with an IPv4 address on the local link.",
        notes: {
          heading: "Ethernet LAN Switching (Part 2)",
          introduction:
            "Ethernet relies on local-link addressing to deliver frames. ARP lets an IPv4 host discover the destination MAC address it needs before sending traffic on the LAN.",
          reference: {
            label: "Jeremy's IT Lab — Free CCNA course playlist",
            url: "https://www.youtube.com/playlist?list=PLxbwE86jKRgMpuZuLBivzlM8s2Dk5lXBQ",
          },
          sections: [
            {
              title: "Frame size and ARP",
              paragraphs: [
                "A standard Ethernet frame is at least 64 bytes, including its 14-byte header and 4-byte FCS. With an 18-byte header-plus-trailer, the minimum payload is 46 bytes. These sizes exclude the preamble and SFD.",
                "When a host knows a local IPv4 destination but not its MAC address, it sends an ARP request in a broadcast frame. The device using that IPv4 address normally responds with a unicast ARP reply. The Ethernet broadcast address is FF:FF:FF:FF:FF:FF, and ARP uses EtherType 0x0806.",
              ],
              points: [
                "ARP request: broadcast to discover a local IPv4-to-MAC mapping.",
                "ARP reply: normally unicast back to the requester.",
                "Ping uses ICMP Echo Request and Echo Reply messages.",
              ],
            },
            {
              title: "Inspect address tables",
              paragraphs: [
                "Hosts cache recently learned neighbor mappings. Use arp -a on Windows, macOS, or Linux to display the host's ARP cache. On Cisco IOS, show arp displays the ARP table.",
                "On a Cisco switch, show mac address-table displays learned Layer 2 entries. Dynamic entries can be cleared globally or by address or interface; they are also removed through aging after inactivity.",
              ],
              points: [
                "show mac address-table",
                "clear mac address-table dynamic",
                "clear mac address-table dynamic address <mac-address>",
                "clear mac address-table dynamic interface <interface-id>",
              ],
            },
          ],
        },
      },
      {
        title: "IPv4 Addresses (Part 1)",
        duration: "12 min",
        summary:
          "Review IPv4 address structure, historical address classes, loopback, and the relationship between prefixes and masks.",
        keyConcept:
          "IPv4 is a 32-bit address divided into a network prefix and host bits; CIDR replaced the historical classful boundaries.",
        objectives: [
          "Convert between IPv4 octets and their basic binary ranges.",
          "Recognize historical address classes and special-use ranges.",
          "Relate classful default prefixes to subnet masks.",
        ],
        term: "Octet",
        definition:
          "An 8-bit group used to represent one of the four decimal sections of an IPv4 address.",
        notes: {
          heading: "IPv4 Addresses (Part 1)",
          introduction:
            "An IPv4 address contains 32 bits, written as four 8-bit octets in dotted-decimal form. Historical classful rules classified addresses by their first bits, but modern networks use classless prefixes.",
          reference: {
            label: "Jeremy's IT Lab — Free CCNA course playlist",
            url: "https://www.youtube.com/playlist?list=PLxbwE86jKRgMpuZuLBivzlM8s2Dk5lXBQ",
          },
          sections: [
            {
              title: "IPv4 addresses and octets",
              paragraphs: [
                "Each IPv4 address has four octets and is 32 bits long. An 8-bit octet ranges from 0 to 255; for example, eight 1 bits equal 255.",
                "The network prefix identifies the subnet, while the remaining host bits identify addresses within it. When all host bits are zero, the value is the network address; when all host bits are one, it is the subnet broadcast address.",
              ],
            },
            {
              title: "Historical address classes",
              paragraphs: [
                "Class A, B, and C were historically identified by leading-bit patterns 0, 10, and 110, with first-octet ranges 0–127, 128–191, and 192–223. Their traditional default prefixes were /8, /16, and /24.",
                "Class D (224–239) is used for multicast, while Class E (240–255) is reserved for experimental purposes. The 127.0.0.0/8 range is used for loopback testing on the local device.",
              ],
              points: [
                "Class A default mask: 255.0.0.0 (/8).",
                "Class B default mask: 255.255.0.0 (/16).",
                "Class C default mask: 255.255.255.0 (/24).",
                "Classful addressing is obsolete; CIDR allows more flexible prefix lengths.",
              ],
            },
          ],
        },
      },
      {
        title: "IPv4 Addresses (Part 2)",
        duration: "13 min",
        summary:
          "Calculate typical host capacity and learn to inspect interface state, assign an address, and label interfaces in IOS.",
        keyConcept:
          "Interface state combines physical and line-protocol status; an interface must be configured and enabled for network-layer communication.",
        objectives: [
          "Calculate typical usable hosts from a subnet's host-bit count.",
          "Interpret the Status and Protocol columns in show ip interface brief.",
          "Configure an interface address and description.",
        ],
        term: "Administratively down",
        definition:
          "An interface state indicating that it has been disabled by configuration rather than being physically disconnected.",
        notes: {
          heading: "IPv4 Addresses (Part 2)",
          introduction:
            "IPv4 addressing works together with interface configuration. A device needs an address and mask on the correct interface, and that interface must be operational for the address to be useful.",
          reference: {
            label: "Jeremy's IT Lab — Free CCNA course playlist",
            url: "https://www.youtube.com/playlist?list=PLxbwE86jKRgMpuZuLBivzlM8s2Dk5lXBQ",
          },
          sections: [
            {
              title: "Estimate subnet capacity",
              paragraphs: [
                "For a typical IPv4 subnet, the host capacity is 2^h - 2, where h is the number of host bits. The subtraction excludes the network and broadcast addresses; special prefixes such as /31 and /32 have distinct uses.",
                "With classful defaults, /8 has 24 host bits, /16 has 16, and /24 has 8. This yields 16,777,214, 65,534, and 254 typical usable host addresses, respectively. CIDR replaced fixed classful allocation in modern networks.",
              ],
            },
            {
              title: "Read interface state",
              paragraphs: [
                "show ip interface brief gives a compact status summary. Status reflects the physical Layer 1 condition; Protocol reflects the Layer 2 line-protocol condition. An interface configured with shutdown is reported as administratively down.",
                "Many router interfaces are disabled by default and must be enabled with no shutdown. Cisco switch access ports are typically enabled by default, though configuration and platform behavior should always be checked.",
              ],
            },
            {
              title: "Configure and describe an interface",
              paragraphs: [
                "From interface configuration mode, use ip address <address> <subnet-mask> to assign an IPv4 address. The description command adds a human-readable label that can document the connected device or purpose.",
              ],
              points: [
                "show interfaces description lists configured interface descriptions.",
                "Check both Status and Protocol when diagnosing an interface that is not working.",
              ],
            },
          ],
        },
      },
    ],
  },
  {
    title: "IPv4 & Device Interfaces",
    description:
      "Configure and inspect network interfaces, and understand the key fields in an IPv4 packet.",
    lessons: [
      {
        title: "Switch Interfaces",
        duration: "12 min",
        summary:
          "Configure interface speed and duplex, understand hubs and collision domains, and interpret common Ethernet error counters.",
        keyConcept:
          "Duplex settings determine whether an interface can send and receive simultaneously; hubs share a collision domain, while switches separate collision domains by port.",
        objectives: [
          "Recognize default interface settings and configure speed or duplex.",
          "Explain collision domains and CSMA/CD in the context of hubs.",
          "Interpret common interface error counters.",
        ],
        term: "Full duplex",
        definition:
          "An interface mode that allows transmission and reception at the same time.",
        notes: {
          heading: "Switch Interfaces",
          introduction:
            "Ethernet interface settings affect link operation and troubleshooting. Modern switch links commonly negotiate speed and duplex automatically, while older or shared-media scenarios help explain collisions and error counters.",
          reference: {
            label: "Jeremy's IT Lab — Free CCNA course playlist",
            url: "https://www.youtube.com/playlist?list=PLxbwE86jKRgMpuZuLBivzlM8s2Dk5lXBQ",
          },
          sections: [
            {
              title: "Interface state and negotiation",
              paragraphs: [
                "Many router interfaces begin administratively down/down; switch ports are commonly enabled and show up/up when connected to an active device or down/down when no link is present. Verify the actual device and configuration rather than assuming defaults.",
                "Ethernet interfaces commonly use automatic speed and duplex negotiation. The speed and duplex interface commands can set fixed values, and interface range applies configuration to multiple ports.",
              ],
            },
            {
              title: "Duplex, hubs, and collisions",
              paragraphs: [
                "Full duplex supports simultaneous transmission and reception. Half duplex does not. A traditional hub operates at OSI Layer 1, repeats signals to all ports, and places connected devices in the same collision domain; hub-connected Ethernet uses half duplex and CSMA/CD.",
                "A switch creates a separate collision domain for each port, allowing full-duplex links when both ends support and agree on the mode.",
              ],
              points: [
                "CSMA/CD means Carrier Sense Multiple Access with Collision Detection.",
                "A duplex mismatch can cause performance problems and interface errors.",
              ],
            },
            {
              title: "Read interface error counters",
              paragraphs: [
                "The show interfaces output includes counters that help narrow down physical and link problems. Runts are undersized frames, giants are oversized frames, and CRC errors indicate received frames that failed the FCS check. Frame errors indicate malformed frames.",
                "Input errors summarize several receive-side errors; output errors count transmit-side failures. Consider cabling, negotiation, and the connected device when interpreting these counters.",
              ],
            },
          ],
        },
      },
      {
        title: "IPv4 Header",
        duration: "14 min",
        summary:
          "Read the IPv4 header fields that describe packet length, fragmentation, lifetime, service handling, and the encapsulated protocol.",
        keyConcept:
          "Routers use IPv4 header information such as destination address, TTL, and fragmentation flags to forward or process packets.",
        objectives: [
          "Identify the main IPv4 header fields and their purposes.",
          "Explain the role of MTU, fragmentation, and TTL.",
          "Recognize protocol numbers for TCP, UDP, ICMP, and OSPF.",
        ],
        term: "Time to Live (TTL)",
        definition:
          "An IPv4 header field that is decremented by routers to limit packet lifetime and prevent routing loops.",
        notes: {
          heading: "IPv4 Header",
          introduction:
            "An IPv4 packet carries a variable-length header followed by its payload. The header includes addressing and control information used by routers and receiving hosts.",
          reference: {
            label: "Jeremy's IT Lab — Free CCNA course playlist",
            url: "https://www.youtube.com/playlist?list=PLxbwE86jKRgMpuZuLBivzlM8s2Dk5lXBQ",
          },
          sections: [
            {
              title: "Header length and service fields",
              paragraphs: [
                "The Version field identifies IPv4 with value 4. Internet Header Length (IHL) counts 4-byte words: a minimum value of 5 means a 20-byte header, and the maximum value of 15 allows a 60-byte header including options.",
                "The differentiated-services field contains a 6-bit DSCP value used for per-hop traffic treatment and a 2-bit ECN value that can signal congestion. Total Length is 16 bits and includes the IPv4 header and data; its range is 20 through 65,535 bytes.",
              ],
            },
            {
              title: "Fragmentation and MTU",
              paragraphs: [
                "The Identification field groups fragments from the same original packet. The Flags field includes a reserved bit, Don't Fragment (DF), and More Fragments (MF). Fragment Offset locates a fragment within the original packet.",
                "A packet larger than an outgoing link's Maximum Transmission Unit (MTU) may be fragmented if allowed; if DF is set, a router cannot fragment it and may discard it while reporting the problem. A common Ethernet IP MTU is 1500 bytes.",
              ],
            },
            {
              title: "Lifetime, protocol, and addressing",
              paragraphs: [
                "Time to Live (TTL) is an 8-bit field decremented by routers. A packet is discarded when its TTL reaches zero, preventing it from circulating indefinitely. An initial value of 64 is common but is not a universal requirement.",
                "The Protocol field identifies the encapsulated payload: TCP is 6, UDP is 17, ICMP is 1, and OSPF is 89. Source and destination IPv4 address fields are each 32 bits. The Header Checksum detects errors in the IPv4 header; it does not protect the payload.",
              ],
            },
          ],
        },
      },
      {
        title: "Routing Fundamentals and Static Routes",
        duration: "16 min",
        summary:
          "Read a routing table, compare connected, local, static, and dynamic routes, and configure a basic static or default route.",
        keyConcept:
          "Routers forward using the most specific matching route; static routes are configured manually and a default route matches otherwise-unmatched destinations.",
        objectives: [
          "Interpret common route codes and identify next hops.",
          "Explain longest-prefix matching and what happens when no route matches.",
          "Recognize static-route and default-route command formats.",
        ],
        term: "Longest-prefix match",
        definition:
          "The route-selection rule that prefers the matching route with the greatest number of leading network bits.",
        notes: {
          heading: "Routing Fundamentals and Static Routes",
          introduction:
            "Routers use routing tables to select a next hop for each packet. Routes can be connected, local, static, or learned dynamically, and the most specific matching destination prefix wins.",
          reference: {
            label: "Jeremy's IT Lab — Free CCNA course playlist",
            url: "https://www.youtube.com/playlist?list=PLxbwE86jKRgMpuZuLBivzlM8s2Dk5lXBQ",
          },
          sections: [
            {
              title: "Read a routing table",
              paragraphs: [
                "Use show ip route to display the IPv4 routing table. Connected routes represent directly attached networks and are marked C; local routes represent the router's own interface addresses and are marked L. A local route uses a /32 prefix, while a connected route uses the interface's subnet prefix.",
                "When an interface is configured and operational, the router can install a connected route and a local route. A next hop is the next router along the path toward a remote destination.",
              ],
            },
            {
              title: "Choose the best route",
              paragraphs: [
                "When multiple routes match a destination, a router uses longest-prefix matching: it selects the matching route with the greatest prefix length. If no route matches and no default route exists, the packet is dropped.",
                "A static route is entered manually. A dynamic route is learned through a routing protocol that shares network reachability information between routers.",
              ],
            },
            {
              title: "Configure static and default routes",
              paragraphs: [
                "The IOS ip route command specifies the destination network, mask, and next-hop IP address, outgoing interface, or both. Specifying only an exit interface can make a route appear directly connected, especially on multi-access networks; a next hop is often needed to identify the actual router.",
                "The default route 0.0.0.0/0 is the least specific IPv4 route and is often used to direct Internet-bound traffic. A host sends off-subnet traffic to its default gateway. A router needs a route for the destination network, not a separate route for every intermediate network.",
              ],
              points: [
                "Static routes are marked S in Cisco routing-table output.",
                "An asterisk (*) marks a candidate default route.",
                "“Gateway of last resort is not set” means no default route is available.",
              ],
            },
          ],
        },
      },
      {
        title: "VLSM and address planning",
        duration: "9 min",
        summary:
          "Variable Length Subnet Masking lets a network use different subnet sizes to better match its addressing needs.",
        keyConcept:
          "Plan the largest address requirements first, then allocate non-overlapping prefixes to smaller networks.",
        objectives: [
          "Explain how VLSM supports efficient address allocation.",
          "Plan subnet ranges without overlapping address space.",
        ],
        term: "VLSM",
        definition:
          "A subnetting approach that uses different prefix lengths within one address block.",
      },
    ],
  },
  {
    title: "IPv6 Addressing",
    description:
      "Explore IPv6 notation, address types, and the ways hosts discover and configure IPv6 networks.",
    lessons: [
      {
        title: "IPv6 notation",
        duration: "7 min",
        summary:
          "IPv6 uses 128-bit addresses written as hexadecimal groups separated by colons.",
        keyConcept:
          "Leading zeros can be omitted, and one consecutive run of zero groups can be compressed with a double colon.",
        objectives: [
          "Recognize the standard IPv6 address format.",
          "Apply the common zero-compression rules.",
        ],
        term: "IPv6 address",
        definition:
          "A 128-bit logical address used to identify an interface on an IPv6 network.",
      },
      {
        title: "IPv6 address types",
        duration: "8 min",
        summary:
          "IPv6 uses address scopes and types such as global unicast, unique local, link-local, and multicast.",
        keyConcept:
          "IPv6 uses multicast for group communication and does not use broadcast addresses.",
        objectives: [
          "Recognize common IPv6 address types and their purposes.",
          "Distinguish unicast, multicast, and anycast communication.",
        ],
        term: "Link-local address",
        definition:
          "An IPv6 address used for communication on a local link and not routed beyond it.",
      },
      {
        title: "SLAAC and DHCPv6",
        duration: "8 min",
        summary:
          "IPv6 hosts can learn addressing information through router advertisements, DHCPv6, or a combination of methods.",
        keyConcept:
          "Router advertisements help hosts learn a prefix and network settings; DHCPv6 can provide additional configuration.",
        objectives: [
          "Compare SLAAC and DHCPv6 at a high level.",
          "Explain the role of router advertisements.",
        ],
        term: "SLAAC",
        definition:
          "Stateless Address Autoconfiguration, which allows IPv6 hosts to configure addresses using router advertisements.",
      },
      {
        title: "Neighbor Discovery and ICMPv6",
        duration: "8 min",
        summary:
          "IPv6 Neighbor Discovery uses ICMPv6 messages for local-link functions such as discovering routers and neighbors.",
        keyConcept:
          "Neighbor Discovery supports tasks that include address resolution and router discovery on an IPv6 link.",
        objectives: [
          "Describe the role of ICMPv6 in IPv6 networks.",
          "Recognize common Neighbor Discovery functions.",
        ],
        term: "Neighbor Discovery",
        definition:
          "An IPv6 protocol suite for discovering and maintaining information about devices on a local link.",
      },
    ],
  },
  {
    title: "Routing & IP Connectivity",
    description:
      "Follow how routers select paths and learn the fundamentals of static routing and OSPF.",
    lessons: [
      {
        title: "Routers and default gateways",
        duration: "7 min",
        summary:
          "Routers connect IP networks and forward packets toward remote destinations.",
        keyConcept:
          "A host sends traffic for a remote network to its configured default gateway.",
        objectives: [
          "Distinguish routing from Layer 2 switching.",
          "Trace how a host sends traffic beyond its local subnet.",
        ],
        term: "Default gateway",
        definition:
          "The router a host sends traffic to when the destination is outside its local subnet.",
      },
      {
        title: "Routing tables and route selection",
        duration: "8 min",
        summary:
          "Routers consult routing tables to find a path for each packet's destination network.",
        keyConcept:
          "When several routes match, routers prefer the most specific matching prefix before comparing route sources.",
        objectives: [
          "Identify destination, next hop, and outgoing interface information.",
          "Explain longest-prefix match in simple terms.",
        ],
        term: "Next hop",
        definition:
          "The next router or interface to which a packet is forwarded on its route.",
      },
      {
        title: "Static routes",
        duration: "8 min",
        summary:
          "Static routes are manually configured paths used to reach remote networks or define a default route.",
        keyConcept:
          "Static routes are predictable and simple, but administrators must update them when network paths change.",
        objectives: [
          "Describe when a static route can be useful.",
          "Understand the purpose of a default route.",
        ],
        term: "Static route",
        definition:
          "A route manually configured by an administrator instead of learned dynamically.",
      },
      {
        title: "OSPF fundamentals",
        duration: "9 min",
        summary:
          "OSPF is a link-state routing protocol that allows routers in an area to share topology information and calculate paths.",
        keyConcept:
          "Routers use OSPF to exchange link-state information and build a consistent view of the network topology.",
        objectives: [
          "Explain why dynamic routing protocols are used.",
          "Recognize OSPF's role in sharing route information.",
        ],
        term: "OSPF",
        definition:
          "Open Shortest Path First, a link-state interior gateway routing protocol.",
      },
    ],
  },
  {
    title: "Network Services",
    description:
      "Study the common services that provide address configuration, name resolution, translation, and network operations.",
    lessons: [
      {
        title: "DHCP address configuration",
        duration: "7 min",
        summary:
          "DHCP provides clients with IP configuration such as an address, subnet mask, default gateway, and DNS server.",
        keyConcept:
          "A DHCP lease assigns settings to a client for a limited time, reducing manual setup and address conflicts.",
        objectives: [
          "List common settings delivered by DHCP.",
          "Describe the purpose of a DHCP scope and lease.",
        ],
        term: "DHCP lease",
        definition:
          "A time-limited assignment of network configuration made by a DHCP server.",
      },
      {
        title: "DNS name resolution",
        duration: "7 min",
        summary:
          "DNS translates domain names into records, including IP addresses that clients can use to reach services.",
        keyConcept:
          "A client asks a resolver to look up DNS records rather than needing to remember server IP addresses.",
        objectives: [
          "Follow the high-level steps of a DNS lookup.",
          "Recognize common address record types.",
        ],
        term: "DNS resolver",
        definition:
          "A service that looks up DNS information on behalf of a client.",
      },
      {
        title: "NAT and PAT",
        duration: "8 min",
        summary:
          "Network Address Translation changes IP address information as traffic passes through a network device.",
        keyConcept:
          "PAT allows many private hosts to share a public IPv4 address by tracking transport-layer ports.",
        objectives: [
          "Explain the basic purpose of NAT.",
          "Distinguish one-to-one translation from port address translation.",
        ],
        term: "PAT",
        definition:
          "Port Address Translation, which maps multiple private connections to a public address using port numbers.",
      },
      {
        title: "Time, logging, and monitoring",
        duration: "8 min",
        summary:
          "Services such as NTP, syslog, and SNMP help synchronize devices, collect events, and monitor network health.",
        keyConcept:
          "Consistent time and centralized logs make it easier to correlate events across multiple network devices.",
        objectives: [
          "Describe what NTP, syslog, and SNMP are used for.",
          "Explain why centralized monitoring helps operations.",
        ],
        term: "Syslog",
        definition:
          "A standard method for sending event messages from network devices to a logging service.",
      },
    ],
  },
  {
    title: "Wireless Networking",
    description:
      "Understand wireless LAN components, radio behavior, configuration, and basic Wi-Fi protection.",
    lessons: [
      {
        title: "Wireless LAN components",
        duration: "7 min",
        summary:
          "Wireless clients connect through access points, which bridge Wi-Fi traffic to the wired network.",
        keyConcept:
          "A basic service set describes an access point and the wireless clients associated with it.",
        objectives: [
          "Identify access points, wireless clients, and controllers.",
          "Describe how wireless clients join a WLAN.",
        ],
        term: "Access point",
        definition:
          "A network device that provides wireless clients access to a local area network.",
      },
      {
        title: "Bands, channels, and coverage",
        duration: "8 min",
        summary:
          "Wi-Fi uses radio frequency bands and channels; distance, obstacles, and interference affect signal quality.",
        keyConcept:
          "Channel planning and access point placement can reduce interference and improve coverage.",
        objectives: [
          "Compare common Wi-Fi bands and channels.",
          "Identify conditions that can weaken a wireless signal.",
        ],
        term: "Channel",
        definition:
          "A portion of radio spectrum used by a wireless network to communicate.",
      },
      {
        title: "WLAN configuration",
        duration: "8 min",
        summary:
          "Wireless networks are configured with a network name, security settings, and radio parameters.",
        keyConcept:
          "The SSID identifies a WLAN to users, while the security configuration controls how clients authenticate and protect traffic.",
        objectives: [
          "Explain the purpose of an SSID.",
          "Recognize the settings used to configure a WLAN.",
        ],
        term: "SSID",
        definition:
          "The name used to identify a wireless local area network.",
      },
      {
        title: "Wireless security",
        duration: "8 min",
        summary:
          "Wi-Fi security protects network access and helps keep wireless traffic private.",
        keyConcept:
          "Use current encryption standards, strong credentials, and supported firmware to protect wireless networks.",
        objectives: [
          "Explain why wireless authentication and encryption matter.",
          "Recognize the importance of strong credentials and updates.",
        ],
        term: "WPA3",
        definition:
          "A Wi-Fi security generation that improves authentication and encryption protections.",
      },
    ],
  },
  {
    title: "Security Fundamentals",
    description:
      "Explore core security goals and the controls used to protect network devices, users, and traffic.",
    lessons: [
      {
        title: "Security principles and threats",
        duration: "7 min",
        summary:
          "Network security aims to protect information and services from unauthorized access, change, or disruption.",
        keyConcept:
          "Confidentiality, integrity, and availability are foundational goals for designing security controls.",
        objectives: [
          "Explain confidentiality, integrity, and availability.",
          "Recognize common categories of network threats.",
        ],
        term: "CIA triad",
        definition:
          "A model describing confidentiality, integrity, and availability as core security goals.",
      },
      {
        title: "Access control lists",
        duration: "9 min",
        summary:
          "Access control lists use ordered rules to permit or deny selected network traffic.",
        keyConcept:
          "ACLs should be designed and placed carefully because rule order and the implicit deny affect the final result.",
        objectives: [
          "Describe how an ACL filters traffic.",
          "Understand why rule order and verification matter.",
        ],
        term: "Access control list",
        definition:
          "An ordered set of rules used to allow or deny traffic based on specified criteria.",
      },
      {
        title: "Port security and access",
        duration: "8 min",
        summary:
          "Switch and user-access controls can limit which devices or users connect to the network.",
        keyConcept:
          "Controls such as port security and 802.1X help enforce access policies at the network edge.",
        objectives: [
          "Explain the goal of switch port security.",
          "Recognize the role of 802.1X authentication.",
        ],
        term: "802.1X",
        definition:
          "A standard for port-based network access control and authentication.",
      },
      {
        title: "Securing network devices",
        duration: "8 min",
        summary:
          "Device hardening reduces risk by limiting management access and keeping configurations and software maintained.",
        keyConcept:
          "Use secure management protocols, unique credentials, least privilege, and timely updates.",
        objectives: [
          "Identify basic network-device hardening practices.",
          "Explain least privilege and secure management access.",
        ],
        term: "Least privilege",
        definition:
          "The practice of granting only the access necessary to perform a task.",
      },
    ],
  },
  {
    title: "Network Operations",
    description:
      "Learn how LAN control protocols, link aggregation, redundancy, and service quality support reliable networks.",
    lessons: [
      {
        title: "Spanning Tree Protocol",
        duration: "8 min",
        summary:
          "Spanning Tree Protocol prevents Layer 2 loops when switches have redundant links.",
        keyConcept:
          "STP selectively blocks redundant paths while keeping them available as backups if the active topology changes.",
        objectives: [
          "Explain why Layer 2 loops are harmful.",
          "Describe how STP maintains a loop-free topology.",
        ],
        term: "STP",
        definition:
          "Spanning Tree Protocol, used to prevent switching loops in bridged networks.",
      },
      {
        title: "EtherChannel",
        duration: "7 min",
        summary:
          "EtherChannel combines multiple physical Ethernet links into one logical link between devices.",
        keyConcept:
          "A link aggregation group can increase available bandwidth and provide resilience when a member link fails.",
        objectives: [
          "Describe the purpose of link aggregation.",
          "Recognize the benefits of grouping compatible switch links.",
        ],
        term: "EtherChannel",
        definition:
          "A logical link formed by bundling multiple physical Ethernet connections.",
      },
      {
        title: "High availability and FHRP",
        duration: "8 min",
        summary:
          "First-hop redundancy protocols provide a resilient default gateway for hosts on a LAN.",
        keyConcept:
          "A virtual gateway address can remain available when the router currently forwarding traffic fails.",
        objectives: [
          "Explain why default gateway redundancy is useful.",
          "Describe the general role of a first-hop redundancy protocol.",
        ],
        term: "FHRP",
        definition:
          "A first-hop redundancy protocol that helps provide resilient gateway services to hosts.",
      },
      {
        title: "Quality of service",
        duration: "8 min",
        summary:
          "Quality of Service techniques classify and manage traffic when network resources are limited.",
        keyConcept:
          "QoS can prioritize delay-sensitive traffic, but it does not create additional bandwidth.",
        objectives: [
          "Explain why networks use QoS policies.",
          "Recognize traffic classification and prioritization concepts.",
        ],
        term: "QoS",
        definition:
          "Quality of Service, a set of techniques for managing traffic treatment across a network.",
      },
    ],
  },
  {
    title: "Automation & Troubleshooting",
    description:
      "Develop a repeatable troubleshooting process and learn how automation is changing network management.",
    lessons: [
      {
        title: "A systematic troubleshooting process",
        duration: "7 min",
        summary:
          "A structured process helps isolate network issues, test likely causes, and verify a fix.",
        keyConcept:
          "Gather evidence, identify the scope, test one hypothesis at a time, and document the result.",
        objectives: [
          "Describe a repeatable troubleshooting workflow.",
          "Use evidence to narrow down a fault before making changes.",
        ],
        term: "Baseline",
        definition:
          "A record of normal network behavior used to recognize and investigate changes.",
      },
      {
        title: "Connectivity diagnostic tools",
        duration: "8 min",
        summary:
          "Common utilities help test reachability, inspect host configuration, check name resolution, and trace packet paths.",
        keyConcept:
          "Choose a tool that tests the suspected layer or service instead of relying on one command for every problem.",
        objectives: [
          "Recognize the uses of ping, traceroute, and nslookup.",
          "Inspect basic local IP configuration.",
        ],
        term: "Traceroute",
        definition:
          "A diagnostic tool that displays network hops toward a destination.",
      },
      {
        title: "Common connectivity problems",
        duration: "8 min",
        summary:
          "Addressing errors, failed links, incorrect routes, DNS issues, and blocked services can all prevent connectivity.",
        keyConcept:
          "Work from the local connection outward: check link status, IP settings, gateway reachability, DNS, then the application.",
        objectives: [
          "Separate name-resolution failures from reachability failures.",
          "Use test results to narrow the fault location.",
        ],
        term: "Packet loss",
        definition:
          "The failure of packets to reach their destination, which can degrade or interrupt network services.",
      },
      {
        title: "Automation and programmability",
        duration: "9 min",
        summary:
          "Network automation uses software and APIs to configure, monitor, and manage network devices consistently.",
        keyConcept:
          "Automation can reduce repetitive manual work, but it still requires validation, access controls, and careful change management.",
        objectives: [
          "Describe the purpose of network automation.",
          "Recognize APIs, controllers, and structured data as common concepts.",
        ],
        term: "API",
        definition:
          "An application programming interface that allows software systems to exchange requests and data.",
      },
    ],
  },
];

export const courseModules = buildGroupedCourseModules(sourceCourseModules);
