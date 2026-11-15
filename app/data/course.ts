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

export const courseModules: CourseModule[] = [
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
            url: "https://www.youtube.com/watch?v=H8W9oMNSuwo&list=PLxbwE86jKRgMpuZuLBivzlM8s2Dk5lXBQ&index=1",
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
            url: "https://www.youtube.com/watch?v=ieTH5lVhNaY&list=PLxbwE86jKRgMpuZuLBivzlM8s2Dk5lXBQ&index=4",
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
        title: "The OSI reference model",
        duration: "8 min",
        summary:
          "The seven-layer OSI model provides a shared framework for describing networking functions and diagnosing problems.",
        keyConcept:
          "Each layer has a distinct role, from transmitting signals at the physical layer to supporting applications at the top.",
        objectives: [
          "Name the seven OSI layers in order.",
          "Use the layers to describe where a network function or fault may occur.",
        ],
        term: "Encapsulation",
        definition:
          "The process of adding protocol information as data moves down the network layers.",
      },
      {
        title: "TCP/IP and encapsulation",
        duration: "8 min",
        summary:
          "The TCP/IP model describes the protocol layers used for communication across modern IP networks.",
        keyConcept:
          "Application data is packaged with transport, IP, and link-layer information as it travels toward its destination.",
        objectives: [
          "Recognize the TCP/IP model's main layers.",
          "Describe how data is encapsulated and decapsulated.",
        ],
        term: "Protocol",
        definition:
          "A set of agreed rules that allows networked systems to communicate.",
        notes: {
          introduction:
            "The TCP/IP model organizes network communication into layers with distinct responsibilities. Each layer uses the service below it and provides a service to the layer above it. This lesson uses the common five-layer teaching view.",
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
    ],
  },
  {
    title: "Ethernet & Switching",
    description:
      "Learn how local Ethernet networks carry frames and how switches organize and forward LAN traffic.",
    lessons: [
      {
        title: "Ethernet frames",
        duration: "7 min",
        summary:
          "Ethernet defines common wired LAN communication, including frame structure and link behavior.",
        keyConcept:
          "A frame carries a payload and link-layer addressing information across a local network segment.",
        objectives: [
          "Describe the purpose of an Ethernet frame.",
          "Distinguish a frame from an IP packet.",
        ],
        term: "Frame",
        definition:
          "A data-link layer unit used to deliver information across a local network link.",
      },
      {
        title: "MAC addresses and switching",
        duration: "8 min",
        summary:
          "Switches learn source MAC addresses and use their address tables to forward frames within a LAN.",
        keyConcept:
          "A switch forwards known unicast traffic toward the port associated with the destination MAC address.",
        objectives: [
          "Explain how a switch learns MAC addresses.",
          "Describe what happens when the destination address is unknown.",
        ],
        term: "MAC address",
        definition:
          "A link-layer address used to identify a network interface on a local network.",
      },
      {
        title: "VLANs",
        duration: "8 min",
        summary:
          "Virtual LANs divide a switched network into separate logical broadcast domains.",
        keyConcept:
          "Devices in different VLANs need a Layer 3 device to communicate with one another.",
        objectives: [
          "Explain why networks use VLANs.",
          "Recognize access ports and VLAN membership.",
        ],
        term: "VLAN",
        definition:
          "A logical Layer 2 network that separates broadcast traffic on a switched network.",
      },
      {
        title: "Trunks and inter-VLAN routing",
        duration: "9 min",
        summary:
          "Trunk links carry multiple VLANs between network devices, while routing enables communication between VLANs.",
        keyConcept:
          "IEEE 802.1Q tags identify VLAN traffic on a trunk; a router or Layer 3 switch routes between subnets.",
        objectives: [
          "Describe the purpose of an 802.1Q trunk.",
          "Compare router-on-a-stick with Layer 3 switching.",
        ],
        term: "802.1Q",
        definition:
          "The Ethernet standard commonly used to identify VLAN traffic on trunk links.",
      },
    ],
  },
  {
    title: "IPv4 Addressing & Subnetting",
    description:
      "Understand IPv4 addresses, prefixes, and the process of dividing address space into subnets.",
    lessons: [
      {
        title: "IPv4 address structure",
        duration: "7 min",
        summary:
          "IPv4 uses 32-bit addresses, usually written as four decimal octets, to identify network interfaces.",
        keyConcept:
          "An IPv4 prefix identifies the network portion of an address; the remaining bits identify hosts within that subnet.",
        objectives: [
          "Read an IPv4 address in dotted-decimal notation.",
          "Explain the network and host portions of an address.",
        ],
        term: "IPv4 address",
        definition:
          "A 32-bit logical address assigned to an interface on an IPv4 network.",
      },
      {
        title: "Subnet masks and CIDR",
        duration: "8 min",
        summary:
          "A subnet mask or CIDR prefix length identifies which bits in an IPv4 address belong to the network.",
        keyConcept:
          "A prefix such as /24 means the first 24 bits identify the network, leaving the remaining bits for host addressing.",
        objectives: [
          "Interpret CIDR prefix notation.",
          "Relate a prefix length to a subnet mask.",
        ],
        term: "CIDR prefix",
        definition:
          "The number of leading bits used to identify a network, written after a slash.",
      },
      {
        title: "Subnetting and host ranges",
        duration: "10 min",
        summary:
          "Subnetting divides an address block into smaller networks sized for different groups of devices.",
        keyConcept:
          "The prefix length determines the size of a subnet and how many addresses are available for hosts.",
        objectives: [
          "Find a subnet's network and broadcast addresses.",
          "Determine the usable host range for common subnet sizes.",
        ],
        term: "Subnet",
        definition:
          "A logical subdivision of an IP network that shares a common network prefix.",
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
