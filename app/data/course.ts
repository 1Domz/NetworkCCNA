export type CourseLesson = {
  title: string;
  duration: string;
  summary: string;
  keyConcept: string;
  objectives: string[];
  term: string;
  definition: string;
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
      "Build a foundation in network devices, network layouts, and the models used to explain communication.",
    lessons: [
      {
        title: "Network devices",
        duration: "7 min",
        summary:
          "Hosts, switches, routers, access points, and firewalls each play different roles in moving or protecting network traffic.",
        keyConcept:
          "End devices create or consume data; intermediary devices connect networks and make forwarding decisions.",
        objectives: [
          "Identify common end devices and intermediary devices.",
          "Explain the basic roles of switches, routers, and access points.",
        ],
        term: "Default gateway",
        definition:
          "The router a host uses to reach destinations outside its local IP network.",
      },
      {
        title: "Network topologies",
        duration: "6 min",
        summary:
          "Topology describes how network devices and links are arranged, physically or logically.",
        keyConcept:
          "The chosen layout affects how devices communicate, how the network can grow, and how failures affect service.",
        objectives: [
          "Compare common star, mesh, and point-to-point layouts.",
          "Distinguish a physical topology from a logical topology.",
        ],
        term: "Topology",
        definition:
          "The physical or logical arrangement of devices and connections in a network.",
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
