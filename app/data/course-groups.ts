import type {
  CourseLesson,
  CourseModule,
  LessonNotes,
} from "./course";

type VideoReference = NonNullable<LessonNotes["references"]>[number];

type LessonSpec = Omit<CourseLesson, "notes"> & {
  introduction: string;
  references: VideoReference[];
  sections: LessonNotes["sections"];
};

function video(label: string, id: string): VideoReference {
  return {
    label: `Jeremy's IT Lab — ${label}`,
    url: `https://www.youtube.com/watch?v=${id}`,
  };
}

function lesson(spec: LessonSpec): CourseLesson {
  const { introduction, references, sections, ...content } = spec;
  return {
    ...content,
    notes: {
      heading: spec.title,
      introduction,
      references,
      sections,
    },
  };
}

function sourceLesson(
  sourceModules: CourseModule[],
  title: string,
): CourseLesson {
  const found = sourceModules
    .flatMap((module) => module.lessons)
    .find((candidate) => candidate.title === title);
  if (!found) {
    throw new Error(`Missing source lesson: ${title}`);
  }
  return found;
}

function setReferences(
  source: CourseLesson,
  references: VideoReference[],
): CourseLesson {
  if (!source.notes) {
    throw new Error(`Lesson has no detailed notes: ${source.title}`);
  }
  const notes = { ...source.notes, references };
  delete notes.reference;
  return { ...source, notes };
}

function combineSourceLessons(
  title: string,
  lessons: CourseLesson[],
  content: Pick<
    CourseLesson,
    "duration" | "summary" | "keyConcept" | "objectives" | "term" | "definition"
  >,
  references: VideoReference[],
): CourseLesson {
  const notes = lessons.map((item) => item.notes);
  if (notes.some((item) => item === undefined)) {
    throw new Error(`Cannot combine lessons without detailed notes: ${title}`);
  }
  return {
    title,
    ...content,
    notes: {
      heading: title,
      introduction: notes.map((item) => item?.introduction ?? "").join(" "),
      references,
      sections: notes.flatMap((item) => item?.sections ?? []),
    },
  };
}

export function buildGroupedCourseModules(
  sourceModules: CourseModule[],
): CourseModule[] {
  const source = (title: string) => sourceLesson(sourceModules, title);
  const originalCli = source("Intro to the CLI");
  const ethernetSwitching = combineSourceLessons(
    "Ethernet LAN Switching",
    [
      source("Ethernet LAN Switching (Part 1)"),
      source("Ethernet LAN Switching (Part 2)"),
    ],
    {
      duration: "25 min",
      summary:
        "Understand Ethernet frame structure, MAC address learning, switching behavior, ARP, and useful address-table commands.",
      keyConcept:
        "Switches learn source MAC addresses and forward frames within a VLAN; ARP discovers the local MAC address for an IPv4 neighbor.",
      objectives: [
        "Explain Ethernet frame fields, MAC addresses, and EtherTypes.",
        "Describe switch learning, forwarding, flooding, and aging.",
        "Trace an ARP request and reply and inspect neighbor tables.",
      ],
      term: "Address Resolution Protocol (ARP)",
      definition:
        "A protocol that maps an IPv4 address to a link-layer address on the local network.",
    },
    [
      video("Ethernet LAN Switching (Part 1) — Day 5", "u2n762WG0Vo"),
      video("Ethernet LAN Switching (Part 2) — Day 6", "5q1pqdmdPjo"),
    ],
  );
  const ipv4Addressing = combineSourceLessons(
    "IPv4 Addressing",
    [
      source("IPv4 Addresses (Part 1)"),
      source("IPv4 Addresses (Part 2)"),
    ],
    {
      duration: "25 min",
      summary:
        "Review IPv4 address structure, historical classes, prefixes, host capacity, and basic interface configuration.",
      keyConcept:
        "An IPv4 prefix separates network bits from host bits; CIDR provides flexible prefixes, while interface status and configuration determine whether an address is usable.",
      objectives: [
        "Interpret IPv4 octets, classful ranges, and special-purpose addresses.",
        "Relate prefix lengths to masks and typical host capacity.",
        "Read interface status and configure IPv4 addresses in IOS.",
      ],
      term: "CIDR prefix",
      definition:
        "The number of leading bits used to identify an IPv4 network, written after a slash.",
    },
    [
      video("IPv4 Addressing (Part 1) — Day 7", "3ROdsfEUuhs"),
      video("IPv4 Addressing (Part 2) — Day 8", "FiAatRd84XI"),
    ],
  );

  const dayFour = setReferences(originalCli, [
    video("Intro to the CLI — Day 4", "IYbtai7Nu2g"),
  ]);
  const switchInterfaces = setReferences(source("Switch Interfaces"), [
    video("Switch Interfaces — Day 9", "cCqluocfQe0"),
  ]);
  const ipv4Header = setReferences(source("IPv4 Header"), [
    video("IPv4 Header — Day 10", "aQB22y4liXA"),
  ]);
  const routing = setReferences(
    source("Routing Fundamentals and Static Routes"),
    [
      video("Routing Fundamentals — Day 11, Part 1", "aHwAm8GYbn8"),
      video("Static Routing — Day 11, Part 2", "YCv4-_sMvYE"),
    ],
  );

  const lifeOfPacket = lesson({
    title: "The Life of a Packet",
    duration: "14 min",
    summary:
      "Trace how a packet is encapsulated, forwarded across routers, and delivered to an application on a remote host.",
    keyConcept:
      "IP addresses identify the end hosts, while each Ethernet frame carries the packet to the next hop on one local link.",
    objectives: [
      "Trace a local and remote destination through a host's forwarding decision.",
      "Explain how routers replace link-layer frames while forwarding an IP packet.",
      "Relate ARP, the default gateway, route lookup, and TTL to packet delivery.",
    ],
    term: "Next hop",
    definition:
      "The next router or directly connected destination to which a packet is forwarded.",
    introduction:
      "Following one packet across a network connects the ideas of addressing, switching, routing, and encapsulation. The IP packet is carried inside a new local-link frame at each routed hop.",
    references: [
      video("The Life of a Packet — Day 12", "4YrYV2io3as"),
    ],
    sections: [
      {
        title: "Decide whether the destination is local",
        paragraphs: [
          "A host compares the destination address with its own address and subnet mask. If the destination is on the local subnet, the host resolves that destination's MAC address; if it is remote, the host resolves the MAC address of its configured default gateway.",
          "The host then builds an IP packet with the remote endpoint addresses and places it inside an Ethernet frame addressed to the local next hop. The switch forwards the frame using its MAC address table.",
        ],
        points: [
          "ARP resolves a local IPv4 next-hop address to a MAC address.",
          "A host needs a valid address, mask, and gateway to reach remote networks.",
        ],
      },
      {
        title: "Forward across routers",
        paragraphs: [
          "A router removes the incoming link-layer header, examines the destination IP address, and selects a route. It decreases TTL, chooses an outgoing interface and next hop, then encapsulates the packet in a frame appropriate for the next link.",
          "The source and destination IP addresses normally remain end-to-end, while the source and destination MAC addresses change at every routed Ethernet hop. At the final LAN, the last router delivers a frame to the destination host.",
        ],
        points: [
          "Switches forward frames within a Layer 2 network; routers forward packets between IP networks.",
          "The receiving host decapsulates the packet and delivers transport data to the application identified by its port.",
        ],
      },
    ],
  });

  const subnetting = lesson({
    title: "Subnetting and VLSM",
    duration: "35 min",
    summary:
      "Plan IPv4 subnets by calculating network boundaries, broadcast addresses, host ranges, and appropriately sized prefixes.",
    keyConcept:
      "Subnetting borrows host bits to create smaller networks; VLSM assigns different prefix lengths to match different network sizes.",
    objectives: [
      "Calculate subnet sizes and usable host ranges from a prefix.",
      "Find network and broadcast addresses using binary or block-size methods.",
      "Allocate non-overlapping VLSM subnets, starting with the largest requirement.",
    ],
    term: "Variable Length Subnet Masking (VLSM)",
    definition:
      "An addressing method that uses different prefix lengths within one larger address block.",
    introduction:
      "Subnetting divides an address block into smaller networks. A consistent method helps avoid overlapping ranges and makes the most of limited IPv4 space.",
    references: [
      video("Subnetting (Part 1) — Day 13", "bQ8sdpGQu8c"),
      video("Subnetting (Part 2) — Day 14", "IGhd-0di0Qo"),
      video("Subnetting (Part 3: VLSM) — Day 15", "z-JqCedc9EI"),
    ],
    sections: [
      {
        title: "Find subnet boundaries",
        paragraphs: [
          "A prefix length counts network bits; the remaining bits are available for host addresses. A typical subnet with h host bits has 2^h total addresses and 2^h - 2 usable host addresses, excluding its network and broadcast addresses.",
          "To find a subnet boundary, identify the mask octet where the prefix stops, calculate the block size, and locate the multiple containing the address. The first address is the network ID and the final address is the broadcast address.",
        ],
        points: [
          "For /26, the block size in the final octet is 64.",
          "Typical usable host ranges begin one address after the network ID and end one address before the broadcast.",
          "Special cases such as /31 point-to-point links and /32 host routes have different uses.",
        ],
      },
      {
        title: "Plan VLSM allocations",
        paragraphs: [
          "VLSM uses subnet sizes that fit each LAN or point-to-point link instead of assigning the same size everywhere. Determine the required host capacity, choose the smallest suitable prefix, and allocate a correctly aligned block.",
          "Allocate the largest subnet first, then continue with smaller requirements from the remaining address space. Verify that every subnet starts on a valid boundary and that no ranges overlap.",
        ],
      },
    ],
  });

  const vlans = lesson({
    title: "VLANs",
    duration: "25 min",
    summary:
      "Separate a switched LAN into logical broadcast domains and carry multiple VLANs between switches with 802.1Q trunks.",
    keyConcept:
      "A VLAN is a Layer 2 broadcast domain; communication between different VLANs requires Layer 3 routing.",
    objectives: [
      "Explain access-port membership and VLAN separation.",
      "Describe 802.1Q trunking and native VLAN behavior.",
      "Recognize how router-on-a-stick or a Layer 3 switch routes between VLANs.",
    ],
    term: "VLAN",
    definition:
      "A logical Layer 2 network that separates broadcast traffic on a switched network.",
    introduction:
      "VLANs let an organization separate users and devices logically without requiring a separate physical switch for every group. Switch configuration determines which VLAN each access port belongs to.",
    references: [
      video("VLANs (Part 1) — Day 16", "cjFzOnm6u1g"),
      video("VLANs (Part 3) — Day 18", "OkPB028l2eE"),
    ],
    sections: [
      {
        title: "VLAN membership and broadcast domains",
        paragraphs: [
          "An access port normally belongs to one data VLAN. Broadcast frames are forwarded within that VLAN, so separating departments into different VLANs limits the Layer 2 broadcast domain and creates logical boundaries.",
          "Devices in different VLANs are in different IP subnets and need a router or Layer 3 switch to communicate. Create and name VLANs consistently, then assign the appropriate access ports.",
        ],
      },
      {
        title: "Trunks and inter-VLAN routing",
        paragraphs: [
          "An 802.1Q trunk carries traffic for multiple VLANs over one link by adding a VLAN tag to most frames. The native VLAN is carried untagged by default, so both ends should agree on native VLAN settings and the allowed VLAN list.",
          "Router-on-a-stick uses router subinterfaces on a trunk; a multilayer switch can route between VLAN interfaces directly. In either design, the endpoint's default gateway is the Layer 3 interface for its VLAN.",
        ],
      },
    ],
  });

  const dtpVtp = lesson({
    title: "DTP and VTP",
    duration: "15 min",
    summary:
      "Review Cisco trunk negotiation and VLAN database distribution, including the operational risks of automatic negotiation.",
    keyConcept:
      "DTP negotiates trunk links, while VTP advertises VLAN database information within a configured domain.",
    objectives: [
      "Distinguish DTP trunk negotiation from manual trunk configuration.",
      "Recognize common switchport negotiation modes.",
      "Explain VTP domains, modes, and revision-number risks.",
    ],
    term: "Dynamic Trunking Protocol (DTP)",
    definition:
      "A Cisco protocol that can negotiate whether an Ethernet link operates as a trunk.",
    introduction:
      "Switch-to-switch links can be configured manually or negotiated. VLAN database distribution is a separate function from trunk formation and should be planned carefully.",
    references: [video("DTP/VTP — Day 19", "JtQV_0Sjszg")],
    sections: [
      {
        title: "DTP trunk negotiation",
        paragraphs: [
          "DTP can negotiate trunking between compatible Cisco switch ports. Dynamic desirable actively attempts to form a trunk, while dynamic auto waits for the neighbor. An access-mode port does not negotiate a trunk.",
          "For predictable production designs, configure trunking intentionally and disable negotiation where appropriate. Ensure both endpoints agree on trunk mode, allowed VLANs, and native VLAN.",
        ],
      },
      {
        title: "VTP VLAN database distribution",
        paragraphs: [
          "VTP can distribute VLAN database changes between switches in the same VTP domain. Server, client, and transparent modes differ in how they create, accept, and forward VLAN information.",
          "A VTP revision number can cause an unintended VLAN database to overwrite another when a switch joins a domain. Verify domain, mode, version, and revision before connecting devices or changing production configurations.",
        ],
      },
    ],
  });

  const spanningTree = lesson({
    title: "Spanning Tree Protocol",
    duration: "30 min",
    summary:
      "Prevent Layer 2 loops by electing a root bridge and selecting a loop-free set of forwarding paths.",
    keyConcept:
      "STP uses bridge IDs, path costs, and port roles to block redundant paths while keeping them available as backups.",
    objectives: [
      "Explain why redundant Layer 2 links can create loops.",
      "Describe root-bridge election and root, designated, and alternate port roles.",
      "Interpret the purpose of BPDUs and topology changes.",
    ],
    term: "Root bridge",
    definition:
      "The switch elected as the reference point for spanning-tree path calculations in a Layer 2 topology.",
    introduction:
      "Redundant switch links improve availability but can create loops that multiply broadcasts and destabilize MAC learning. Spanning Tree Protocol coordinates switches to maintain a loop-free forwarding topology.",
    references: [
      video("Spanning Tree Protocol (Part 1) — Day 20", "j-bK-EFt9cY"),
      video("Spanning Tree Protocol (Part 2) — Day 21", "nWpldCc8msY"),
    ],
    sections: [
      {
        title: "Elect the root and choose paths",
        paragraphs: [
          "Switches exchange Bridge Protocol Data Units (BPDUs) containing bridge and path information. The switch with the lowest bridge ID becomes the root bridge; other switches calculate their best path toward it using path cost.",
          "Each non-root switch selects a root port. On each segment, a designated port forwards toward that segment. Redundant paths that would form a loop are placed in a non-forwarding role.",
        ],
      },
      {
        title: "Maintain a stable Layer 2 topology",
        paragraphs: [
          "Classic STP progresses through states before a port forwards, allowing switches to avoid temporary loops while the topology converges. Changes such as a link failure can trigger a recalculation and topology-change handling.",
          "An intentional root placement and consistent link design make forwarding behavior predictable. Verify root bridge, port roles, and port states when diagnosing unexpected paths.",
        ],
        points: [
          "A loop can cause broadcast storms, duplicate frames, and MAC-table instability.",
          "STP blocks redundant paths logically; it does not remove the physical links.",
        ],
      },
    ],
  });

  const spanningTreeProtection = lesson({
    title: "STP Edge and Guard Features",
    duration: "20 min",
    summary:
      "Use PortFast and spanning-tree guard features to protect access ports and prevent unexpected switches or links from changing the topology.",
    keyConcept:
      "Edge-port acceleration and guard features have different purposes; apply each only to interfaces whose role is understood.",
    objectives: [
      "Explain PortFast and the conditions for using it.",
      "Compare BPDU Guard, BPDU Filter, Root Guard, and Loop Guard.",
      "Identify the operational risk of applying protections to the wrong interface.",
    ],
    term: "BPDU Guard",
    definition:
      "A spanning-tree protection feature that disables an edge port if it receives a BPDU.",
    introduction:
      "STP protection features address different failure and security scenarios. They should be selected based on the interface's intended role rather than enabled indiscriminately.",
    references: [
      video("PortFast — Day 21 STP Toolkit, Part 1", "zqzppl4LOwk"),
      video("BPDU Guard and BPDU Filter — Day 21 STP Toolkit, Part 2", "jfC_AeJnuhY"),
      video("Root Guard — Day 21 STP Toolkit, Part 3", "2XE_PgkvSic"),
      video("Loop Guard — Day 21 STP Toolkit, Part 4", "uJ5_Klha0ig"),
    ],
    sections: [
      {
        title: "Protect host-facing edge ports",
        paragraphs: [
          "PortFast allows a host-facing access port to move to forwarding more quickly instead of waiting through the normal listening and learning progression. It is intended for endpoint connections, not links to other switches.",
          "BPDU Guard protects an edge port by shutting it down if a BPDU arrives, which can reveal an unexpected switch. BPDU Filter suppresses BPDUs and can remove loop protection, so its use requires particular care.",
        ],
      },
      {
        title: "Protect the root and redundant paths",
        paragraphs: [
          "Root Guard prevents a port from accepting superior BPDUs that would move the root bridge to an unintended part of the network. Loop Guard helps prevent a blocked redundant port from incorrectly transitioning to forwarding when BPDUs stop arriving.",
          "These features are not interchangeable. Apply them according to the topology, document the intended behavior, and verify the resulting port state after configuration.",
        ],
      },
    ],
  });

  const rapidStp = lesson({
    title: "Rapid Spanning Tree Protocol",
    duration: "12 min",
    summary:
      "Learn how RSTP improves convergence while retaining a loop-free Layer 2 topology.",
    keyConcept:
      "RSTP uses explicit port roles and rapid synchronization mechanisms to restore forwarding more quickly than classic STP.",
    objectives: [
      "Recognize RSTP port roles and states.",
      "Explain edge ports and alternate paths.",
      "Describe how proposal/agreement helps establish forwarding safely.",
    ],
    term: "Rapid Spanning Tree Protocol (RSTP)",
    definition:
      "An updated spanning-tree protocol that provides faster convergence while preventing Layer 2 loops.",
    introduction:
      "RSTP preserves the spanning-tree goal of a loop-free topology while reducing the time required to use an alternate path after a change.",
    references: [video("Rapid Spanning Tree Protocol — Day 22", "EpazNsLlPps")],
    sections: [
      {
        title: "Roles, states, and edge ports",
        paragraphs: [
          "RSTP identifies root, designated, alternate, and backup port roles. Its discarding, learning, and forwarding states describe whether a port forwards user traffic while still allowing topology information to be processed.",
          "An edge port connects to an endpoint and can forward quickly. If it receives a BPDU, it is no longer behaving like a simple host-facing edge and should be investigated.",
        ],
      },
      {
        title: "Rapid transition",
        paragraphs: [
          "RSTP uses proposal-and-agreement behavior between switches to synchronize a path before moving it to forwarding. Alternate ports provide a ready path toward the root if the current root port fails.",
          "RSTP is interoperable with classic STP, but mixed operation can affect convergence. Confirm the spanning-tree mode and port roles during troubleshooting.",
        ],
      },
    ],
  });

  const etherChannel = lesson({
    title: "EtherChannel",
    duration: "12 min",
    summary:
      "Bundle multiple compatible Ethernet links into one logical channel for increased aggregate capacity and link redundancy.",
    keyConcept:
      "EtherChannel presents several physical links as one logical interface, but member ports must have compatible settings and negotiation.",
    objectives: [
      "Explain EtherChannel load distribution and redundancy.",
      "Compare LACP, PAgP, and static channel modes.",
      "Recognize configuration mismatches that prevent a bundle from forming.",
    ],
    term: "EtherChannel",
    definition:
      "A logical link formed by bundling multiple physical Ethernet links between devices.",
    introduction:
      "EtherChannel simplifies a set of parallel physical links into a single logical connection. Traffic is distributed across member links according to a hashing method rather than by splitting every frame.",
    references: [video("EtherChannel — Day 23", "xuo69Joy_Nc")],
    sections: [
      {
        title: "Channel negotiation",
        paragraphs: [
          "LACP is an IEEE standard; active initiates negotiation and passive responds. PAgP is Cisco-proprietary, with desirable initiating and auto responding. Static mode forms a channel without negotiation and requires careful matching configuration.",
          "The two endpoints must agree on compatible speed, duplex, trunk or access mode, VLAN settings, and channel protocol. Inconsistent member ports can prevent the bundle from forming or cause links to be suspended.",
        ],
      },
      {
        title: "Verify and troubleshoot",
        paragraphs: [
          "The port-channel interface is the logical interface to configure and monitor. Link aggregation can provide more aggregate capacity and resilience, but a single flow is commonly hashed to one member link.",
          "Check the channel summary, member-port status, protocol, and switchport settings on both ends when a bundle does not operate as expected.",
        ],
      },
    ],
  });

  const dynamicRouting = lesson({
    title: "Dynamic Routing",
    duration: "12 min",
    summary:
      "Understand how routing protocols exchange reachability information and update routers when network paths change.",
    keyConcept:
      "Dynamic routing protocols let routers learn and maintain routes automatically, using protocol-specific metrics and rules.",
    objectives: [
      "Compare static and dynamic route management.",
      "Distinguish broad routing-protocol families and their uses.",
      "Explain the role of metrics and convergence.",
    ],
    term: "Routing protocol",
    definition:
      "A set of rules routers use to exchange reachability information and select routes.",
    introduction:
      "Static routes are explicitly configured; dynamic protocols exchange route information and adapt to topology changes. Protocol choice depends on network size, design, and administrative requirements.",
    references: [video("Dynamic Routing — Day 24", "xSTgb8JLkvs")],
    sections: [
      {
        title: "Routing within and between organizations",
        paragraphs: [
          "Interior gateway protocols operate within an autonomous system. Exterior gateway routing exchanges reachability between autonomous systems on the Internet. Common interior protocol approaches include distance-vector, link-state, and advanced distance-vector designs.",
          "Protocols use metrics to compare paths, but metric definitions differ. Administrative distance is a separate local preference used by a router when routes to the same prefix are learned from different sources.",
        ],
      },
      {
        title: "Convergence and route maintenance",
        paragraphs: [
          "Routers exchange updates or topology information, calculate best paths, and install selected routes in their routing tables. Convergence describes the period in which routers update their view after a topology change.",
          "A stable design uses appropriate protocol settings, summarizes where suitable, and verifies neighbor relationships and route sources rather than assuming that a learned route is correct.",
        ],
      },
    ],
  });

  const ripEigrp = lesson({
    title: "RIP and EIGRP",
    duration: "18 min",
    summary:
      "Compare RIP's hop-count metric with EIGRP's neighbor and topology-based route calculation.",
    keyConcept:
      "RIP selects routes by hop count, while EIGRP uses a composite metric and DUAL to maintain loop-free paths.",
    objectives: [
      "Recognize RIPv2's hop-count limit and periodic updates.",
      "Explain EIGRP neighbors, metrics, and successor routes.",
      "Distinguish route metric from administrative distance.",
    ],
    term: "Successor",
    definition:
      "The best next-hop route selected by EIGRP for reaching a destination.",
    introduction:
      "RIP and EIGRP are interior routing protocols with different design goals and path-selection methods. Understanding their metrics clarifies why they may choose different routes.",
    references: [video("RIP and EIGRP — Day 25", "N8PiZDld6Zc")],
    sections: [
      {
        title: "RIP",
        paragraphs: [
          "RIPv2 is a distance-vector protocol that uses hop count as its metric, supports classless prefixes, and sends periodic route updates. A hop count of 16 represents an unreachable destination, limiting a usable path to 15 hops.",
          "RIPv2 can use authentication and multicast updates. It is straightforward for small or study networks, but its limited metric and periodic behavior make it unsuitable for many larger designs.",
        ],
      },
      {
        title: "EIGRP",
        paragraphs: [
          "EIGRP forms neighbor relationships and uses the Diffusing Update Algorithm (DUAL) to calculate loop-free paths. Its composite metric commonly considers bandwidth and delay; configuration must be consistent enough for neighbors to form.",
          "A successor is the best route, while a feasible successor is a qualifying backup. Verify neighbors, topology entries, and installed routes to diagnose reachability problems.",
        ],
      },
    ],
  });

  const ospf = lesson({
    title: "OSPF",
    duration: "45 min",
    summary:
      "Build a foundation in OSPF neighbor formation, link-state information, areas, path cost, and route installation.",
    keyConcept:
      "OSPF routers exchange link-state advertisements, build a link-state database, and run SPF to calculate paths.",
    objectives: [
      "Explain router IDs, neighbors, areas, LSAs, and the link-state database.",
      "Describe how OSPF cost influences path selection.",
      "Recognize DR/BDR elections on multiaccess networks.",
    ],
    term: "Link-state database (LSDB)",
    definition:
      "The collection of OSPF link-state information from which routers calculate a topology view.",
    introduction:
      "OSPF is a link-state interior gateway protocol. Routers in an area build a consistent topology database and independently calculate shortest paths.",
    references: [
      video("OSPF Part 1 — Day 26", "pvuaoJ9YzoI"),
      video("OSPF Part 2 — Day 27", "VtzfTA21ht0"),
      video("OSPF Part 3 — Day 28", "3ew26ujkiDI"),
    ],
    sections: [
      {
        title: "Neighbors and areas",
        paragraphs: [
          "OSPF routers exchange Hello packets to discover and maintain neighbors. Router IDs identify OSPF speakers. Neighbor formation depends on compatible settings such as area, timers, network type, and authentication where configured.",
          "Areas limit the scope of link-state information. Area 0 is the backbone for a multi-area design, and area border routers connect the backbone to other areas.",
        ],
      },
      {
        title: "Topology calculation and route selection",
        paragraphs: [
          "Routers flood link-state advertisements, synchronize their LSDB, and run the Shortest Path First algorithm. OSPF cost, commonly based on interface bandwidth, contributes to the selected path.",
          "On broadcast multiaccess networks, a designated router and backup designated router reduce the number of adjacencies. Check neighbors, the LSDB, interface settings, and route table when troubleshooting.",
        ],
      },
    ],
  });

  const fhrp = lesson({
    title: "First Hop Redundancy Protocols",
    duration: "12 min",
    summary:
      "Provide hosts with a resilient default gateway by presenting a virtual router address across multiple physical routers.",
    keyConcept:
      "An FHRP group coordinates routers so hosts can keep using one virtual default-gateway address during a failure.",
    objectives: [
      "Explain active/standby or active/virtual-router roles.",
      "Recognize HSRP, VRRP, and GLBP.",
      "Describe how a virtual IP and MAC support gateway redundancy.",
    ],
    term: "First Hop Redundancy Protocol (FHRP)",
    definition:
      "A protocol that provides a resilient default gateway using multiple routers and a shared virtual address.",
    introduction:
      "A host typically has one default gateway. If that gateway fails, a first-hop redundancy protocol can allow another router to take over without changing the host's configuration.",
    references: [
      video("First Hop Redundancy Protocols — Day 29", "43WnpwQMolo"),
    ],
    sections: [
      {
        title: "Virtual gateway operation",
        paragraphs: [
          "Routers in an FHRP group share a virtual IP address and virtual MAC address used by hosts. One router forwards traffic while another monitors the group and can assume the role if needed.",
          "HSRP is Cisco-developed, VRRP is an open standard, and GLBP can distribute host traffic across multiple gateways. Their elections, terminology, and load-sharing behavior differ.",
        ],
      },
      {
        title: "Design and verify",
        paragraphs: [
          "Configure matching group parameters, virtual addresses, priorities, and preemption behavior as required by the design. Ensure the virtual address is in the host subnet and is not assigned to a physical interface.",
          "Verify group state, active router, standby peers, and interface tracking. Gateway redundancy does not replace redundant upstream paths or routing.",
        ],
      },
    ],
  });

  const tcpUdp = lesson({
    title: "TCP and UDP",
    duration: "14 min",
    summary:
      "Compare transport-layer delivery, ports, connection setup, reliability, and common protocol behavior.",
    keyConcept:
      "TCP provides connection-oriented reliable byte-stream delivery, while UDP sends connectionless datagrams with less transport overhead.",
    objectives: [
      "Compare TCP and UDP delivery characteristics.",
      "Explain ports, sockets, and TCP's handshake.",
      "Recognize acknowledgments, sequence numbers, and flow control.",
    ],
    term: "Port number",
    definition:
      "A transport-layer identifier used to deliver data to the correct application service on a host.",
    introduction:
      "Transport protocols provide process-to-process communication above IP. Ports identify application endpoints, while TCP and UDP offer different delivery properties.",
    references: [video("TCP and UDP — Day 30", "LIEACBqlntY")],
    sections: [
      {
        title: "TCP reliability and connection setup",
        paragraphs: [
          "TCP establishes a connection with a three-way handshake, uses sequence numbers and acknowledgments, and retransmits missing data. Its ordered byte stream and flow control help applications transfer data reliably.",
          "A TCP connection is identified by endpoint IP addresses and port numbers. Common services use well-known ports, but a service's port alone does not guarantee that the application is reachable.",
        ],
      },
      {
        title: "UDP datagrams",
        paragraphs: [
          "UDP sends independent datagrams without establishing a transport connection or guaranteeing delivery, order, or retransmission. Applications choose UDP when they prefer lower overhead or implement their own reliability behavior.",
          "DNS queries, voice, and real-time media commonly use UDP, though application behavior varies. Firewalls and network devices can handle TCP and UDP ports separately.",
        ],
      },
    ],
  });

  const ipv6 = lesson({
    title: "IPv6 Addressing and Configuration",
    duration: "40 min",
    summary:
      "Read and configure IPv6 addresses, understand common address scopes, and learn how hosts discover and configure IPv6 networks.",
    keyConcept:
      "IPv6 uses 128-bit addresses, link-local communication, multicast, and Neighbor Discovery instead of IPv4 broadcast and ARP.",
    objectives: [
      "Apply IPv6 zero-compression and recognize common address types.",
      "Compare SLAAC and DHCPv6 configuration.",
      "Explain Neighbor Discovery and router advertisements.",
    ],
    term: "Link-local address",
    definition:
      "An IPv6 address used for communication on a local link and not routed beyond that link.",
    introduction:
      "IPv6 expands the address space and changes several familiar IPv4 mechanisms. Hosts use link-local communication for local discovery and can learn global addressing information from router advertisements.",
    references: [
      video("IPv6 Part 1 — Day 31", "ZNuXyOXae5U"),
      video("IPv6 Part 2 — Day 32", "BrTMMOXFhDU"),
      video("IPv6 Part 3 — Day 33", "rwkHfsWQwy8"),
    ],
    sections: [
      {
        title: "Notation and address types",
        paragraphs: [
          "An IPv6 address contains 128 bits written as eight hexadecimal groups. Leading zeros within a group can be omitted, and one consecutive run of zero groups can be compressed with ::.",
          "Global unicast addresses are routable, unique-local addresses are intended for private internal use, link-local addresses support communication on the local link, and multicast addresses identify groups. IPv6 does not use broadcast.",
        ],
      },
      {
        title: "Host configuration and Neighbor Discovery",
        paragraphs: [
          "SLAAC lets a host form an address using information in router advertisements. DHCPv6 can provide additional or stateful configuration, and networks may combine these methods.",
          "ICMPv6 Neighbor Discovery replaces several IPv4 local-link functions, including address resolution and router discovery. Duplicate Address Detection helps a host check whether an address is already in use.",
        ],
      },
    ],
  });

  const acls = lesson({
    title: "Access Control Lists",
    duration: "25 min",
    summary:
      "Filter IPv4 traffic with ordered ACL entries and apply standard or extended rules in the appropriate direction.",
    keyConcept:
      "ACLs evaluate entries from top to bottom and stop at the first match; unmatched traffic reaches an implicit deny.",
    objectives: [
      "Compare standard and extended ACL matching criteria.",
      "Interpret wildcard masks and permit/deny order.",
      "Choose appropriate ACL placement and interface direction.",
    ],
    term: "Wildcard mask",
    definition:
      "A bit mask used by Cisco ACLs to indicate which address bits must match and which are ignored.",
    introduction:
      "An ACL is an ordered set of permit and deny rules. Correct matching, placement, direction, and a final implicit deny determine what traffic is allowed.",
    references: [
      video("Standard ACLs — Day 34", "z023_eRUtSo"),
      video("Extended ACLs — Day 35", "dUttKY_CNXE"),
    ],
    sections: [
      {
        title: "Standard and extended matching",
        paragraphs: [
          "Standard ACLs primarily match source IPv4 addresses. Extended ACLs can match source and destination addresses, IP protocols, and TCP/UDP ports, allowing more specific traffic policies.",
          "Wildcard masks use 0 bits for positions that must match and 1 bits for positions to ignore. The keyword any matches all addresses; host can specify one address.",
        ],
      },
      {
        title: "Order, placement, and verification",
        paragraphs: [
          "ACL entries are checked in order and the first matching statement determines the result. An implicit deny at the end blocks traffic not explicitly permitted, so rule ordering and completeness matter.",
          "Standard ACLs are often placed closer to the destination, while extended ACLs are often placed closer to the source to stop unwanted traffic early. Verify the ACL contents, interface attachment, direction, and hit counters.",
        ],
      },
    ],
  });

  const discovery = lesson({
    title: "CDP and LLDP",
    duration: "10 min",
    summary:
      "Discover neighboring network devices and inspect their advertised identities, interfaces, and capabilities.",
    keyConcept:
      "CDP is Cisco-proprietary and LLDP is vendor-neutral; both provide Layer 2 neighbor information.",
    objectives: [
      "Compare CDP and LLDP.",
      "Use neighbor information to map connected devices.",
      "Recognize privacy and security considerations when advertising device details.",
    ],
    term: "Link Layer Discovery Protocol (LLDP)",
    definition:
      "A vendor-neutral protocol for advertising device and interface information to directly connected neighbors.",
    introduction:
      "Neighbor-discovery protocols help document a network by showing information about directly connected devices. They do not replace routing or prove end-to-end reachability.",
    references: [video("CDP and LLDP — Day 36", "_hnMZBzXRRk")],
    sections: [
      {
        title: "Neighbor information",
        paragraphs: [
          "CDP and LLDP can advertise a device identifier, local and remote port, platform, capabilities, and management address. This is useful for inventory and troubleshooting physical connections.",
          "CDP is specific to Cisco equipment, while LLDP is an open standard supported across vendors. Devices must have the protocol enabled on the relevant interfaces to exchange information.",
        ],
      },
      {
        title: "Commands and safe use",
        paragraphs: [
          "Use the appropriate show neighbor command to inspect discovered devices and detailed output to view capabilities and addresses. Check both local and remote interface fields before changing cabling.",
          "Neighbor advertisements expose topology details. Disable discovery on untrusted or externally facing interfaces when required by the security design.",
        ],
      },
    ],
  });

  const networkServices = lesson({
    title: "NTP, DNS, and DHCP",
    duration: "30 min",
    summary:
      "Review time synchronization, name resolution, and automatic IPv4 configuration for network hosts.",
    keyConcept:
      "NTP provides a common time reference, DNS resolves names, and DHCP leases host configuration.",
    objectives: [
      "Explain how NTP synchronizes device clocks.",
      "Trace a DNS lookup and recognize common record types.",
      "Describe DHCP address assignment and relay behavior.",
    ],
    term: "DHCP lease",
    definition:
      "A time-limited assignment of IP configuration provided to a client by a DHCP server.",
    introduction:
      "These services make networks easier to use and operate: clocks can be correlated, users can resolve names, and hosts can receive configuration automatically.",
    references: [
      video("NTP — Day 37", "qGJaJx7OfUo"),
      video("DNS — Day 38", "4C6eeQes4cs"),
      video("DHCP — Day 39", "hzkleGAC2_Y"),
    ],
    sections: [
      {
        title: "Time and name services",
        paragraphs: [
          "NTP synchronizes clocks across devices using a hierarchy of time sources. Consistent time improves log correlation, certificate validation, and troubleshooting.",
          "DNS lets clients query a resolver for records such as A and AAAA addresses, aliases, and mail exchangers. A resolver may answer from cache or query other DNS servers.",
        ],
      },
      {
        title: "DHCP address assignment",
        paragraphs: [
          "A DHCP server provides settings such as an IPv4 address, subnet mask, default gateway, DNS servers, and lease duration. The common DORA sequence is Discover, Offer, Request, and Acknowledge.",
          "A DHCP relay forwards client broadcasts across a routed boundary to a server. Scope size, exclusions, reservations, and relay configuration must match the network design.",
        ],
      },
    ],
  });

  const monitoring = lesson({
    title: "SNMP, Syslog, and SSH",
    duration: "30 min",
    summary:
      "Monitor devices, centralize event messages, and administer network equipment through encrypted remote access.",
    keyConcept:
      "SNMP collects management data, Syslog centralizes event messages, and SSH protects remote command-line sessions.",
    objectives: [
      "Compare SNMP polling and notifications.",
      "Recognize Syslog severity levels and centralized logging.",
      "Explain why SSH is preferred over Telnet for administration.",
    ],
    term: "Simple Network Management Protocol (SNMP)",
    definition:
      "A protocol used by network-management systems to monitor and manage devices.",
    introduction:
      "Operational visibility depends on collecting structured metrics, preserving event logs, and managing devices through authenticated encrypted channels.",
    references: [
      video("SNMP — Day 40", "HXu0Ifj0oWU"),
      video("Syslog — Day 41", "RaQPSKQ4J5A"),
      video("SSH — Day 42", "AvgYqI2qSD4"),
    ],
    sections: [
      {
        title: "Monitoring and logs",
        paragraphs: [
          "An SNMP manager communicates with agents on managed devices. Polling retrieves values from a management information base, while traps or informs notify the manager of events. SNMPv3 adds authentication and privacy protections.",
          "Syslog messages include a facility and severity that help classify events. Centralized logging preserves a timeline even if a device fails or its local buffer overwrites older entries.",
        ],
      },
      {
        title: "Secure administration",
        paragraphs: [
          "SSH encrypts a remote CLI session and supports authentication. Telnet sends session data without encryption and should not be used for sensitive administration.",
          "Restrict management access to trusted networks, use strong authentication, and monitor successful and failed login events.",
        ],
      },
    ],
  });

  const fileTransfer = lesson({
    title: "FTP and TFTP",
    duration: "10 min",
    summary:
      "Compare common file-transfer protocols used to move configuration and software files in network environments.",
    keyConcept:
      "FTP provides a richer file-transfer session, while TFTP is a lightweight UDP-based protocol with fewer features.",
    objectives: [
      "Compare FTP and TFTP transport and capabilities.",
      "Recognize their typical use in device-management workflows.",
      "Choose secure alternatives when credentials or files cross untrusted networks.",
    ],
    term: "Trivial File Transfer Protocol (TFTP)",
    definition:
      "A simple UDP-based file-transfer protocol with limited features and no built-in authentication.",
    introduction:
      "Network devices may transfer configuration, images, or backups using file-transfer services. Protocol choice affects security, reliability, and operational requirements.",
    references: [video("FTP and TFTP — Day 43", "50hcfsoBf4Q")],
    sections: [
      {
        title: "Protocol differences",
        paragraphs: [
          "FTP uses TCP and supports a control connection and data transfers. Traditional FTP does not encrypt credentials or content, so secure variants or protected tunnels should be used across untrusted networks.",
          "TFTP uses UDP and has a small feature set, with no built-in authentication. It is commonly used in controlled management networks for simple transfers such as device boot files.",
        ],
      },
      {
        title: "Operational safeguards",
        paragraphs: [
          "Before copying files, verify the server address, filename, available storage, and image compatibility. Keep backups and check integrity after transfer.",
          "Limit access to transfer servers and avoid exposing unauthenticated services outside the management network.",
        ],
      },
    ],
  });

  const nat = lesson({
    title: "Network Address Translation",
    duration: "25 min",
    summary:
      "Translate IPv4 addresses and ports at network boundaries using static NAT, dynamic NAT, and PAT.",
    keyConcept:
      "NAT changes address information as packets cross a configured boundary; PAT lets many inside hosts share a public address using port numbers.",
    objectives: [
      "Compare static NAT, dynamic NAT, and PAT.",
      "Distinguish inside-local and inside-global addresses.",
      "Explain translation entries and their effect on end-to-end addressing.",
    ],
    term: "Port Address Translation (PAT)",
    definition:
      "A form of NAT that uses transport-layer port numbers to map multiple private hosts to one public IPv4 address.",
    introduction:
      "NAT modifies IPv4 address information as traffic crosses a router. It is widely used for address conservation, but it does not replace a firewall or provide complete security by itself.",
    references: [
      video("NAT (Part 1) — Day 44", "2TZCfTgopeg"),
      video("NAT (Part 2) — Day 45", "kILDNs4KjYE"),
    ],
    sections: [
      {
        title: "Translation types",
        paragraphs: [
          "Static NAT creates a fixed one-to-one mapping. Dynamic NAT allocates addresses from a pool. PAT, also called NAT overload, maps many inside addresses to one or more outside addresses using unique transport ports.",
          "Inside-local describes an inside host's address as used on the internal network; inside-global is the translated address representing it externally. Interface roles identify the inside and outside of the translation boundary.",
        ],
      },
      {
        title: "Verify translations",
        paragraphs: [
          "A translation table records active mappings. Verify inside/outside interface designation, translation rules, pool availability, and routing when connections fail.",
          "NAT can complicate protocols that embed addresses in payloads and can affect troubleshooting. Use security controls separately to decide which traffic is allowed.",
        ],
      },
    ],
  });

  const qos = lesson({
    title: "Quality of Service",
    duration: "25 min",
    summary:
      "Prioritize and manage traffic during congestion using classification, marking, queuing, shaping, and policing.",
    keyConcept:
      "QoS does not create bandwidth; it classifies traffic and controls how congestion and limited capacity are handled.",
    objectives: [
      "Describe classification and marking with DSCP.",
      "Compare queuing, shaping, and policing.",
      "Explain why end-to-end QoS policy must be consistent.",
    ],
    term: "Differentiated Services Code Point (DSCP)",
    definition:
      "A field value used to classify packets for differentiated forwarding treatment.",
    introduction:
      "QoS helps networks meet application requirements when links become congested. A policy identifies traffic classes and applies a deliberate treatment to each class.",
    references: [
      video("QoS (Part 1) — Day 46", "H6FKJMiiL6E"),
      video("QoS (Part 2) — Day 47", "4vurfhVjcMM"),
    ],
    sections: [
      {
        title: "Classify and mark",
        paragraphs: [
          "Classification identifies traffic using attributes such as addresses, ports, protocols, or existing markings. Marking sets values such as DSCP so downstream devices can apply a consistent policy.",
          "Choose classes based on business and application needs. Trust markings only at appropriate network boundaries and avoid allowing endpoints to assign privileged treatment without policy.",
        ],
      },
      {
        title: "Manage congestion and rate",
        paragraphs: [
          "Queuing and scheduling determine which packets are sent first during congestion. Shaping buffers traffic to smooth a transmission rate, while policing enforces a rate by dropping or remarking excess traffic.",
          "QoS behavior should be designed end to end and verified at each hop. A marking alone does not guarantee priority unless devices are configured to act on it.",
        ],
      },
    ],
  });

  const security = lesson({
    title: "Security Fundamentals and Port Security",
    duration: "22 min",
    summary:
      "Apply foundational security principles and control which endpoint MAC addresses may use a switch access port.",
    keyConcept:
      "Defense in depth combines policies, secure management, and technical controls; port security limits learned source MAC addresses on an access port.",
    objectives: [
      "Recognize common security goals, threats, and mitigation layers.",
      "Explain port-security limits, sticky learning, and violation actions.",
      "Use least privilege and secure management practices.",
    ],
    term: "Port security",
    definition:
      "A switch feature that restricts which source MAC addresses are allowed on a switch port.",
    introduction:
      "Network security reduces risk through layered controls. Access-port protections can limit unauthorized devices, but they must be configured and monitored as part of a broader policy.",
    references: [
      video("Security Fundamentals — Day 48", "VvFuieyTTSw"),
      video("Port Security — Day 49", "sHN3jOJIido"),
    ],
    sections: [
      {
        title: "Security principles",
        paragraphs: [
          "Confidentiality, integrity, and availability are common security goals. Threats include unauthorized access, malware, misconfiguration, denial of service, and physical compromise.",
          "Use defense in depth: secure device access, restrict unnecessary services, apply updates, protect management networks, back up configurations, and monitor logs.",
        ],
      },
      {
        title: "Port-security behavior",
        paragraphs: [
          "Port security can limit the number of secure MAC addresses on an interface and optionally learn them dynamically or with sticky learning. A violation occurs when an unauthorized source exceeds the configured policy.",
          "Violation actions such as protect, restrict, or shutdown differ in visibility and operational impact. Apply port security to appropriate access ports, account for legitimate endpoint changes, and monitor violation counters.",
        ],
      },
    ],
  });

  const accessProtection = lesson({
    title: "DHCP Snooping and Dynamic ARP Inspection",
    duration: "20 min",
    summary:
      "Protect switched networks from rogue DHCP servers and certain ARP spoofing attacks using trusted interfaces and binding information.",
    keyConcept:
      "DHCP snooping builds a binding table, and Dynamic ARP Inspection can validate ARP messages against trusted bindings.",
    objectives: [
      "Distinguish trusted and untrusted switch ports for DHCP snooping.",
      "Explain how the DHCP snooping binding table is used.",
      "Describe how DAI validates ARP packets.",
    ],
    term: "Dynamic ARP Inspection (DAI)",
    definition:
      "A switch security feature that validates ARP packets to help prevent ARP spoofing on a VLAN.",
    introduction:
      "These Layer 2 protections rely on correct trust boundaries. Incorrectly trusting an edge port or leaving legitimate uplinks untrusted can weaken security or disrupt clients.",
    references: [
      video("DHCP Snooping — Day 50", "qYYeg2kz1yE"),
      video("Dynamic ARP Inspection — Day 51", "HwbTKaIvL6s"),
    ],
    sections: [
      {
        title: "DHCP snooping",
        paragraphs: [
          "DHCP snooping inspects DHCP messages and blocks server responses arriving on untrusted ports. Trusted ports are normally links toward authorized DHCP servers; client-facing access ports remain untrusted.",
          "The switch can record address, MAC, VLAN, and interface information in a binding table. Verify VLAN activation, trust placement, rate limits, and bindings when clients fail to obtain an address.",
        ],
      },
      {
        title: "Dynamic ARP Inspection",
        paragraphs: [
          "DAI checks ARP messages on untrusted ports against DHCP snooping bindings or configured ARP ACLs. Invalid or inconsistent messages can be dropped, reducing certain man-in-the-middle risks.",
          "Enable the required features on the correct VLANs and ensure static hosts have an appropriate validation method. Monitor drop counters and logs to distinguish attacks from configuration errors.",
        ],
      },
    ],
  });

  const architectures = lesson({
    title: "LAN and WAN Architectures",
    duration: "20 min",
    summary:
      "Compare campus LAN design roles and common WAN connectivity choices for linking sites and services.",
    keyConcept:
      "Architecture organizes network functions and links around availability, scale, security, and operational requirements.",
    objectives: [
      "Explain common access, distribution, and core roles.",
      "Compare campus and wide-area network requirements.",
      "Recognize common WAN services and overlay options.",
    ],
    term: "Wide Area Network (WAN)",
    definition:
      "A network that connects geographically separated sites or networks.",
    introduction:
      "Network architecture describes how components are arranged to meet performance, availability, scale, and cost goals. LAN and WAN designs solve different parts of that problem.",
    references: [
      video("LAN Architectures — Day 52", "PvyEcLhmNBk"),
      video("WAN Architectures — Day 53", "BW3fQgdf4-w"),
    ],
    sections: [
      {
        title: "Campus LAN design",
        paragraphs: [
          "A hierarchical campus design commonly separates access, distribution, and core functions. Access connects endpoints, distribution aggregates access and applies policy, and the core provides resilient high-speed transport.",
          "Small networks may combine roles, while larger environments benefit from modular designs. Redundant links, gateways, and devices should be planned with spanning tree and routing behavior in mind.",
        ],
      },
      {
        title: "WAN connectivity",
        paragraphs: [
          "WANs connect remote sites using provider services, Internet connectivity, private circuits, or encrypted overlays. Requirements include throughput, latency, availability, security, and service-level expectations.",
          "Compare cost and operational complexity as well as technical capability. A WAN design should account for routing, failover, addressing, and how traffic reaches cloud or data-center services.",
        ],
      },
    ],
  });

  const virtualization = lesson({
    title: "Virtualization, Cloud, Containers, and VRF",
    duration: "25 min",
    summary:
      "Understand virtual machines, cloud service models, containers, and virtual routing contexts.",
    keyConcept:
      "Virtualization abstracts compute or network resources; VRFs maintain separate routing tables on shared infrastructure.",
    objectives: [
      "Compare virtual machines and containers.",
      "Recognize IaaS, PaaS, and SaaS service models.",
      "Explain how VRFs separate routing contexts.",
    ],
    term: "Virtual Routing and Forwarding (VRF)",
    definition:
      "A technology that maintains multiple separate routing tables on one router or Layer 3 switch.",
    introduction:
      "Virtualization lets multiple logical environments share physical resources. The same abstraction idea applies to compute, cloud services, containers, and network routing.",
    references: [
      video("Virtualization and Cloud — Day 54, Part 1", "_S3greGajJA"),
      video("Containers — Day 54, Part 2", "K731pAS22Aw"),
      video("VRF — Day 54, Part 3", "Ge4644KUvh4"),
    ],
    sections: [
      {
        title: "Compute and cloud models",
        paragraphs: [
          "A hypervisor runs virtual machines with separate operating systems on shared hardware. Containers package applications and dependencies while sharing a host operating-system kernel, making them lighter but not identical to virtual machines.",
          "IaaS offers virtualized infrastructure, PaaS provides a managed application platform, and SaaS delivers a complete application service. Responsibility is shared differently across these models.",
        ],
      },
      {
        title: "Separate routing with VRFs",
        paragraphs: [
          "A VRF maintains an independent routing table and forwarding context. Multiple customers or services can reuse overlapping address space while remaining logically separated on the same physical device.",
          "Interfaces and routes must be assigned to the intended VRF. Verify the correct routing table when checking reachability, because a route in one VRF is not automatically visible in another.",
        ],
      },
    ],
  });

  const wirelessArchitecture = lesson({
    title: "Wireless Fundamentals and Architectures",
    duration: "20 min",
    summary:
      "Review radio basics, wireless LAN components, centralized and autonomous designs, and client roaming.",
    keyConcept:
      "Wireless performance depends on radio conditions and channel planning; architecture determines how access points are managed.",
    objectives: [
      "Recognize frequency bands, channels, interference, and coverage tradeoffs.",
      "Compare autonomous access points with controller-based designs.",
      "Explain the role of APs, WLAN controllers, and CAPWAP.",
    ],
    term: "Wireless LAN controller (WLC)",
    definition:
      "A device or service that centrally manages wireless access points and WLAN policies.",
    introduction:
      "A WLAN provides network access using radio rather than a dedicated cable to each client. The design must account for both RF behavior and how access points are configured and managed.",
    references: [
      video("Wireless Fundamentals — Day 55", "zuYiktLqNYQ"),
      video("Wireless Architectures — Day 56", "uX1h0F6wpBY"),
    ],
    sections: [
      {
        title: "Radio and coverage",
        paragraphs: [
          "Wireless bands differ in range, capacity, and susceptibility to interference. Channel selection, transmit power, antenna placement, building materials, and neighboring networks affect performance.",
          "More access points do not automatically improve service if cells overlap poorly or channels interfere. Plan for coverage and capacity, and validate the RF environment.",
        ],
      },
      {
        title: "WLAN components and management",
        paragraphs: [
          "An access point bridges wireless clients to the wired network. A controller-based architecture centralizes configuration and policy; CAPWAP can carry control and, depending on design, client data between APs and the controller.",
          "Roaming allows a client to move between access points while maintaining service. SSID, security, VLAN mapping, and controller policy must remain compatible across the coverage area.",
        ],
      },
    ],
  });

  const wirelessSecurity = lesson({
    title: "Wireless Security and Configuration",
    duration: "20 min",
    summary:
      "Configure WLAN access and protect wireless clients with appropriate authentication, encryption, and radio settings.",
    keyConcept:
      "Strong WLAN security combines modern encryption and authentication with sound SSID, channel, and access-point configuration.",
    objectives: [
      "Compare personal and enterprise wireless authentication.",
      "Recognize the purpose of WPA2/WPA3 and 802.1X.",
      "Plan basic SSID, band, channel, and access controls.",
    ],
    term: "802.1X",
    definition:
      "A port-based network access-control standard commonly used with enterprise wireless authentication.",
    introduction:
      "Wireless security protects data over a shared radio medium and controls which users or devices can join a WLAN. Configuration must be consistent across access points and clients.",
    references: [
      video("Wireless Security — Day 57", "wHXKo9So5y8"),
      video("Wireless Configuration — Day 58", "r9o6GFI87go"),
    ],
    sections: [
      {
        title: "Authentication and encryption",
        paragraphs: [
          "Personal WLANs commonly use a pre-shared key, while enterprise WLANs use 802.1X with an authentication service and per-user credentials. WPA2 and WPA3 are security protocols; choose the strongest mode supported by clients and policy.",
          "Avoid weak shared passwords and obsolete encryption. Protect management interfaces, update firmware, and separate guest access from trusted internal resources.",
        ],
      },
      {
        title: "Configure and validate a WLAN",
        paragraphs: [
          "An SSID identifies a WLAN, while its security policy, VLAN mapping, radio band, channel, and access-point settings determine how clients connect and where their traffic goes.",
          "Test association, authentication, address assignment, gateway access, and roaming. Diagnose RF interference separately from credential, VLAN, DHCP, or upstream routing problems.",
        ],
      },
    ],
  });

  const automation = lesson({
    title: "Network Automation and AI",
    duration: "20 min",
    summary:
      "Explore controller-based management, APIs, automation workflows, and the role of AI and machine learning in network operations.",
    keyConcept:
      "Automation applies repeatable logic through software interfaces, while validation and change controls remain essential.",
    objectives: [
      "Compare manual configuration with automated workflows.",
      "Recognize APIs, controllers, telemetry, and intent-based networking.",
      "Describe realistic uses and limitations of AI/ML in operations.",
    ],
    term: "Network automation",
    definition:
      "The use of software and repeatable workflows to configure, monitor, or operate network infrastructure.",
    introduction:
      "Automation helps apply consistent changes and collect information at scale. It does not remove the need for design, testing, authorization, or rollback planning.",
    references: [
      video("Introduction to Network Automation — Day 59, Part 1", "4tsBgMCPVuc"),
      video("AI and Machine Learning — Day 59, Part 2", "Fn_kAv35W5A"),
    ],
    sections: [
      {
        title: "Repeatable network workflows",
        paragraphs: [
          "An automated workflow can collect device state, compare it with an intended configuration, apply approved changes, and verify the result. APIs and controllers provide programmatic interfaces to network functions.",
          "Use version control, test environments, least-privilege credentials, logging, staged rollout, and rollback procedures. Automation can spread a mistake quickly if validation is missing.",
        ],
      },
      {
        title: "AI and machine learning",
        paragraphs: [
          "Machine-learning systems can analyze large data sets for patterns such as anomalies or likely faults. AI can assist with summarization and operations, but its output requires verification and context.",
          "Protect sensitive telemetry and configuration data. Treat recommendations as decision support rather than an unquestioned authority, especially for changes affecting production networks.",
        ],
      },
    ],
  });

  const dataFormatsApis = lesson({
    title: "Data Formats and REST APIs",
    duration: "25 min",
    summary:
      "Read structured data and understand how REST APIs expose network resources through HTTP methods and authentication.",
    keyConcept:
      "Automation systems exchange structured data through APIs; clients must handle methods, status codes, and authentication correctly.",
    objectives: [
      "Recognize JSON, XML, and YAML data structures.",
      "Explain REST resources, HTTP methods, and status codes.",
      "Compare common API authentication approaches.",
    ],
    term: "Representational State Transfer (REST)",
    definition:
      "An architectural style for accessing resources through stateless web requests.",
    introduction:
      "Network automation often uses APIs to retrieve state or make configuration changes. Structured formats represent the request and response data exchanged by the client and service.",
    references: [
      video("JSON, XML, and YAML — Day 60", "nohde2-QNJ4"),
      video("REST APIs — Day 61, Part 1", "Luei0p-2h10"),
      video("REST API Authentication — Day 61, Part 2", "bmqr_xpt6sc"),
    ],
    sections: [
      {
        title: "Structured data",
        paragraphs: [
          "JSON represents objects and arrays using braces, brackets, strings, numbers, booleans, and null. XML represents nested elements and attributes. YAML uses indentation and is often used for human-edited configuration.",
          "Correct syntax and data types matter. Validate structured data before sending it to an API, and protect secrets rather than storing credentials in plain text.",
        ],
      },
      {
        title: "REST requests and authentication",
        paragraphs: [
          "A REST client addresses a resource with a URI and uses HTTP methods such as GET, POST, PUT, PATCH, and DELETE. Responses include status codes and may contain structured data.",
          "APIs can use basic authentication, tokens, or OAuth-based mechanisms. Use HTTPS, least-privilege credentials, secure token storage, and appropriate handling for errors and rate limits.",
        ],
      },
    ],
  });

  const sdn = lesson({
    title: "Software-Defined Networking",
    duration: "12 min",
    summary:
      "Separate network control and forwarding responsibilities and understand the role of controllers and programmable interfaces.",
    keyConcept:
      "SDN centralizes or abstracts control decisions while devices continue forwarding traffic according to installed state.",
    objectives: [
      "Compare the control plane and data plane.",
      "Describe controller northbound and southbound interfaces.",
      "Explain benefits and tradeoffs of software-defined control.",
    ],
    term: "Control plane",
    definition:
      "The network functions that determine how traffic should be forwarded and maintain forwarding state.",
    introduction:
      "Software-defined networking changes how network control is organized and programmed. It does not eliminate the physical forwarding devices or the need for resilient design.",
    references: [video("Software-Defined Networking — Day 62", "7HhWCeXDTpA")],
    sections: [
      {
        title: "Planes and controller interfaces",
        paragraphs: [
          "The data plane forwards packets or frames, while the control plane determines paths and maintains forwarding information. An SDN controller can coordinate policies across multiple devices.",
          "Northbound interfaces connect applications or orchestration systems to the controller; southbound interfaces communicate controller decisions to network devices. APIs and protocols depend on the implementation.",
        ],
      },
      {
        title: "Benefits and tradeoffs",
        paragraphs: [
          "Programmable control can improve consistency, visibility, and policy deployment. Central coordination also creates dependencies on controller availability, security, and accurate state.",
          "A resilient SDN design includes secure APIs, controller redundancy, device fallback behavior, and clear boundaries between centralized and local decisions.",
        ],
      },
    ],
  });

  const infrastructureAsCode = lesson({
    title: "Infrastructure as Code",
    duration: "18 min",
    summary:
      "Compare configuration-management tools and declarative provisioning for consistent infrastructure changes.",
    keyConcept:
      "Infrastructure as Code defines desired state in reusable files and tools, then validates and applies changes repeatably.",
    objectives: [
      "Compare Ansible, Puppet, Chef, and Terraform at a high level.",
      "Explain declarative state, idempotency, and state tracking.",
      "Identify safeguards for automated infrastructure changes.",
    ],
    term: "Idempotency",
    definition:
      "A property where repeating an operation produces the same intended state rather than applying the change repeatedly.",
    introduction:
      "Infrastructure as Code applies software-engineering practices to network and compute infrastructure. Tools differ in execution model, state management, and supported providers.",
    references: [
      video("Ansible, Puppet, and Chef — Day 63, Part 1", "Kog9gHTjALI"),
      video("Terraform — Day 63, Part 2", "VAwUaffejWU"),
    ],
    sections: [
      {
        title: "Configuration management and provisioning",
        paragraphs: [
          "Ansible commonly uses agentless SSH or APIs and playbooks; Puppet and Chef commonly use agent-based or client-server configuration management. Terraform focuses on provisioning and tracking infrastructure resources through providers and state.",
          "Declarative tools describe a desired outcome, while imperative steps specify actions. Idempotent operations can be safely repeated when they are designed and tested correctly.",
        ],
      },
      {
        title: "Safe change workflow",
        paragraphs: [
          "Store code in version control, review changes, plan or preview their effects, and apply them with scoped credentials. Protect state files and secrets because they may contain sensitive infrastructure details.",
          "Use staged rollouts, validation, logging, backups, and rollback procedures. A successful tool run should still be followed by checking the actual network state.",
        ],
      },
    ],
  });

  return [
    {
      title: "Networking Fundamentals",
      description:
        "Build a foundation in network devices, Ethernet connections, TCP/IP, and Cisco device management.",
      lessons: [
        source("Network devices"),
        source("Interfaces and cables"),
        source("TCP/IP and encapsulation"),
        dayFour,
      ],
    },
    {
      title: "Ethernet and IPv4 Foundations",
      description:
        "Study Ethernet switching, IPv4 addressing, interface operation, and packet structure.",
      lessons: [
        ethernetSwitching,
        ipv4Addressing,
        switchInterfaces,
        ipv4Header,
      ],
    },
    {
      title: "Routing and Addressing",
      description:
        "Trace packet delivery, plan IPv4 subnets, and separate switched networks with VLANs.",
      lessons: [routing, lifeOfPacket, subnetting, vlans],
    },
    {
      title: "Layer 2 Resilience",
      description:
        "Control trunk negotiation, prevent switching loops, and protect spanning-tree topologies.",
      lessons: [dtpVtp, spanningTree, spanningTreeProtection, rapidStp],
    },
    {
      title: "Routing Protocols",
      description:
        "Bundle links and learn how dynamic routing protocols exchange and select routes.",
      lessons: [etherChannel, dynamicRouting, ripEigrp, ospf],
    },
    {
      title: "IP Services and Security",
      description:
        "Provide resilient gateways, understand transport and IPv6, and filter traffic with ACLs.",
      lessons: [fhrp, tcpUdp, ipv6, acls],
    },
    {
      title: "Network Operations",
      description:
        "Discover neighbors, provide common network services, monitor devices, and transfer files.",
      lessons: [discovery, networkServices, monitoring, fileTransfer],
    },
    {
      title: "Network Security and Performance",
      description:
        "Translate addresses, manage congestion, and protect switching access and neighbor protocols.",
      lessons: [nat, qos, security, accessProtection],
    },
    {
      title: "Architecture and Wireless",
      description:
        "Explore LAN/WAN design, virtualized infrastructure, and secure wireless networks.",
      lessons: [
        architectures,
        virtualization,
        wirelessArchitecture,
        wirelessSecurity,
      ],
    },
    {
      title: "Automation and Programmability",
      description:
        "Use structured data, APIs, controllers, and code-driven workflows to manage networks.",
      lessons: [automation, dataFormatsApis, sdn, infrastructureAsCode],
    },
  ];
}
