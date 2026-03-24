import { Scenario } from '../types';

export const featuredScenarios: Scenario[] = [
  {
    id: 'cyberpunk-heist',
    title: 'Neon Shadows',
    genre: 'Cyberpunk',
    description: 'A high-stakes data heist in the rain-slicked streets of Neo-Tokyo. You are a freelance operative hired to extract sensitive corporate secrets.',
    imageUrl: 'https://picsum.photos/seed/cyberpunk/800/600?blur=2',
    initialMessage: {
      narrative: "The neon glow of Neo-Tokyo bleeds through the rain-streaked window of your cramped apartment. Your comm-link buzzes, a secure channel opening. 'Operative,' a synthesized voice rasps, 'the target is the Kurokawa Tower. We need the prototype AI core extracted tonight. Payment is half a million creds, wired upon delivery.' A schematic of the tower's security grid flashes onto your retinal display.",
      suggestedActions: [
        "Review the security schematic for weak points.",
        "Ask the client about the opposition inside the tower.",
        "Grab your gear and head straight to Kurokawa Tower."
      ]
    }
  },
  {
    id: 'fantasy-quest',
    title: 'The Dragon\'s Tooth',
    genre: 'High Fantasy',
    description: 'An ancient artifact has been stolen from the royal vault. You must journey through the treacherous Whispering Woods to retrieve it before dark forces awaken.',
    imageUrl: 'https://picsum.photos/seed/fantasy/800/600?blur=2',
    initialMessage: {
      narrative: "The King's face is pale as he addresses you in the dimly lit throne room. 'The Dragon's Tooth is gone,' he whispers, his voice trembling. 'The thief fled towards the Whispering Woods. If the artifact is used to awaken the slumbering beast, our kingdom will burn.' He hands you a royal writ and a pouch of gold. 'You are our only hope. Go.'",
      suggestedActions: [
        "Ask the King for details about the thief.",
        "Request a horse and supplies for the journey.",
        "Leave immediately for the Whispering Woods."
      ]
    }
  },
  {
    id: 'sci-fi-exploration',
    title: 'Echoes of the Void',
    genre: 'Sci-Fi',
    description: 'You are the captain of a deep-space exploration vessel. A distress signal from an uncharted sector leads you to a derelict alien structure.',
    imageUrl: 'https://picsum.photos/seed/scifi/800/600?blur=2',
    initialMessage: {
      narrative: "The bridge of the *Stardust* is silent except for the rhythmic hum of the warp drive. Suddenly, the main console blares to life. 'Captain,' your science officer reports, 'we're receiving a distress signal. It's coming from an uncharted sector, and the signature... it's not human.' On the viewscreen, a massive, jagged alien structure drifts in the void, completely dark.",
      suggestedActions: [
        "Order a full sensor sweep of the alien structure.",
        "Attempt to establish communication with the source of the signal.",
        "Prepare an away team and head to the airlock."
      ]
    }
  },
];

export const galleryScenarios: Scenario[] = [
  ...featuredScenarios,
  {
    id: 'horror-mansion',
    title: 'The Blackwood Estate',
    genre: 'Horror',
    description: 'You inherited a sprawling, decaying mansion. But you soon realize you are not alone in its dark, winding halls.',
    imageUrl: 'https://picsum.photos/seed/horror/800/600?blur=2',
    initialMessage: {
      narrative: "The heavy oak doors of the Blackwood Estate groan shut behind you, sealing you inside. The air is thick with dust and the smell of old paper. As you stand in the grand foyer, a sudden, chilling draft sweeps past you, and a grandfather clock in the corner begins to chime, even though its hands are frozen at midnight. A faint scratching sound echoes from the floorboards above.",
      suggestedActions: [
        "Investigate the scratching sound upstairs.",
        "Look for a light switch or a candle in the foyer.",
        "Try to open the front doors and leave."
      ]
    }
  },
  {
    id: 'post-apocalyptic',
    title: 'Wasteland Drifter',
    genre: 'Post-Apocalyptic',
    description: 'Society has collapsed. You wander the irradiated ruins of the old world, scavenging for supplies and fending off raiders.',
    imageUrl: 'https://picsum.photos/seed/wasteland/800/600?blur=2',
    initialMessage: {
      narrative: "The harsh sun beats down on the cracked asphalt of what used to be Highway 66. Your canteen is almost empty, and the wind howls, carrying radioactive dust. In the distance, you spot the rusted husk of a gas station. As you approach, you notice fresh tire tracks leading to the back, and the faint smell of roasting meat wafts through the air.",
      suggestedActions: [
        "Sneak around to the back to see who's there.",
        "Call out to see if they are friendly.",
        "Hide and watch the gas station from a distance."
      ]
    }
  },
  {
    id: 'mystery-noir',
    title: 'Midnight in Chicago',
    genre: 'Noir Mystery',
    description: 'A private eye in 1930s Chicago. A dame walks into your office with a case that smells like trouble and cheap perfume.',
    imageUrl: 'https://picsum.photos/seed/noir/800/600?blur=2',
    initialMessage: {
      narrative: "The rain is coming down in sheets, drumming against the frosted glass of your office door. It opens, and a woman steps in, shaking off a wet trench coat. She's wearing a red dress and a look of sheer panic. 'Mr. Marlowe,' she says, her voice trembling, 'my husband is missing, and the police think I killed him. You have to help me.' She drops a blood-stained pocket watch on your desk.",
      suggestedActions: [
        "Examine the blood-stained pocket watch.",
        "Ask her to start from the beginning.",
        "Tell her you don't take cases involving the cops."
      ]
    }
  },
  {
    id: 'steampunk-adventure',
    title: 'The Clockwork City',
    genre: 'Steampunk',
    description: 'In a city powered by steam and gears, you uncover a conspiracy that threatens to tear the metropolis apart from the inside out.',
    imageUrl: 'https://picsum.photos/seed/steampunk/800/600?blur=2',
    initialMessage: {
      narrative: "The hiss of steam and the clatter of gears are the constant heartbeat of Aethelgard. You are in your workshop, tinkering with a brass automaton, when a frantic knock rattles your door. A young urchin bursts in, thrusting a brass cylinder into your hands. 'They're coming for it!' he gasps, before collapsing. The cylinder is ticking.",
      suggestedActions: [
        "Examine the ticking brass cylinder.",
        "Check on the collapsed urchin.",
        "Lock the workshop door and prepare for trouble."
      ]
    }
  },
  {
    id: 'superhero-origins',
    title: 'Awakening',
    genre: 'Superhero',
    description: 'After a freak accident, you discover you have extraordinary abilities. Now you must decide how to use them in a city plagued by crime.',
    imageUrl: 'https://picsum.photos/seed/superhero/800/600?blur=2',
    initialMessage: {
      narrative: "You wake up in a hospital bed, the memory of the explosion still ringing in your ears. The monitors beep steadily, but something is wrong. You can hear the heartbeat of the nurse three rooms down, and when you reach for the glass of water, it shatters before your fingers even touch it. You realize you are no longer normal.",
      suggestedActions: [
        "Try to control your new strength and pick up a piece of glass.",
        "Focus your hearing to listen to what the doctors are saying about you.",
        "Call for the nurse to see what happened."
      ]
    }
  }
];
