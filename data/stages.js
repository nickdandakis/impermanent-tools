import { addWeeks } from "date-fns";

import { getLifecycleTrait, getEvolutionTrait } from "../utils/traits";

export const revealDate = new Date("2021-09-24T16:00:00Z"); // Sep 24, 2021, 12:00 EST

const stages = [
  {
    index: 0,
    heading: "Stage 1 (pre-decision period)",
    body: () => "",
    startsAt: revealDate,
    endsAt: addWeeks(revealDate, 4),
    canHold: () => true,
    canBurn: () => false,
    canEvolve: () => false,
    canSell: () => true,
    onHold: ({ metadata }) => metadata,
    onBurn: ({ metadata }) => metadata,
    onEvolve: ({ metadata }) => metadata,
    onSell: ({ metadata }) => metadata,
  },
  {
    index: 1,
    heading: "Stage 1 (decision period)",
    body: ({ metadata }) => {
      const lifecycleTrait = getLifecycleTrait({ metadata });

      return (() => {
        switch (Number(lifecycleTrait.value)) {
          case 1:
            return "Your Lifecycle 1 ID can be burnt, to be reborn as an Afterlife ID. Your original ID is gone forever, but you redeem a new AL ID avatar and whitelist access*";
          case 2:
            return "During this period, Lifecycle 2 IDs can choose to evolve to Stage 2.";
          case 3:
            return "During this period, Lifecycle 3 IDs can choose to evolve to Stage 2.";
          default:
            return "";
        }
      })();
    },
    startsAt: addWeeks(revealDate, 4),
    endsAt: addWeeks(revealDate, 8),
    canHold: () => true,
    canBurn: ({ metadata }) => {
      const lifecycleTrait = getLifecycleTrait({ metadata });
      return Number(lifecycleTrait.value) === 1;
    },
    canEvolve: ({ metadata }) => {
      const lifecycleTrait = getLifecycleTrait({ metadata });

      return (
        Number(lifecycleTrait.value) === 2 || Number(lifecycleTrait.value) === 3
      );
    },
    canSell: () => true,
    onHold: ({ metadata }) => metadata,
    onBurn: ({ metadata }) => ({
      ...metadata,
      name: `Afterlife ID #${metadata.id}`,
      attributes: [
        ...metadata.attributes.filter(
          ({ trait_type }) => !trait_type.toLowerCase().includes("wavelength")
        ),
        {
          trait_type: "Afterlife",
          value: 1,
        },
        {
          trait_type: "Wavelength",
          value: "NEW!!!",
        },
        {
          trait_type: "Whitelist",
          value: "3333 series*",
        },
      ],
    }),
    onEvolve: ({ metadata }) => ({
      ...metadata,
      name: `Evolved ID #${metadata.id}`,
      attributes: [
        ...metadata.attributes.filter(
          ({ trait_type }) => !trait_type.toLowerCase().includes("evolution")
        ),
        {
          trait_type: "Evolution",
          value: 2,
        },
        {
          trait_type: "Additional Wavelength",
          value: "NEW!!!",
        },
      ],
    }),
    onSell: ({ metadata }) => metadata,
  },
  {
    index: 2,
    heading: "Stage 2 (pre-decision period)",
    body: ({ metadata }) => {
      const lifecycleTrait = getLifecycleTrait({ metadata });

      return (() => {
        switch (Number(lifecycleTrait.value)) {
          case 1:
            return "Afterlife ID 1 Reveal";
          case 2:
            return "Evolved L2 Reveal — L2 IDs are now fully evolved (if holder chose to evolve)";
          case 3:
            return "Lifecycle 3 ID Reveal for those who evolved (this is the L3 in Stage 2 of its evolution). L3s in Stage 2 have one more evolution stage.";
          default:
            return "";
        }
      })();
    },
    startsAt: addWeeks(revealDate, 8),
    endsAt: addWeeks(revealDate, 12),
    canHold: () => true,
    canBurn: () => false,
    canEvolve: () => false,
    canSell: () => true,
    onHold: ({ metadata }) => metadata,
    onBurn: ({ metadata }) => metadata,
    onEvolve: ({ metadata }) => metadata,
    onSell: ({ metadata }) => metadata,
  },
  {
    index: 3,
    heading: "Stage 2 (decision period)",
    body: ({ metadata }) => {
      const lifecycleTrait = getLifecycleTrait({ metadata });

      return (() => {
        switch (Number(lifecycleTrait.value)) {
          case 1:
            return "";
          case 2:
            return "Fully evolved Lifecycle 2 ID can be burnt, to be reborn as an Afterlife ID 2. Your original ID is gone forever, but you receive a new AL ID and whitelist*.";
          case 3:
            return "During this period, Lifecycle 3 IDs that evolved in the first Stage can be evolved to Stage 3.";
          default:
            return "";
        }
      })();
    },
    startsAt: addWeeks(revealDate, 12),
    endsAt: addWeeks(revealDate, 16),
    canHold: () => true,
    canBurn: ({ metadata }) => {
      const lifecycleTrait = getLifecycleTrait({ metadata });
      const evolutionTrait = getEvolutionTrait({ metadata });
      return (
        Number(lifecycleTrait.value) === 2 &&
        Number(evolutionTrait?.value) === 2
      );
    },
    canEvolve: ({ metadata }) => {
      const lifecycleTrait = getLifecycleTrait({ metadata });
      const evolutionTrait = getEvolutionTrait({ metadata });
      return (
        Number(lifecycleTrait.value) === 3 &&
        Number(evolutionTrait?.value) === 2
      );
    },
    canSell: () => true,
    onHold: ({ metadata }) => metadata,
    onBurn: ({ metadata }) => ({
      ...metadata,
      name: `Afterlife ID #${metadata.id}`,
      attributes: [
        ...metadata.attributes.filter(
          ({ trait_type }) => !trait_type.toLowerCase().includes("wavelength")
        ),
        {
          trait_type: "Afterlife",
          value: 2,
        },
        {
          trait_type: "Wavelength",
          value: "NEW!!!",
        },
        {
          trait_type: "Whitelist",
          value: "3333 & 2222",
        },
      ],
    }),
    onEvolve: ({ metadata }) => ({
      ...metadata,
      name: `Evolved ID #${metadata.id}`,
      attributes: [
        ...metadata.attributes.filter(
          ({ trait_type }) => !trait_type.toLowerCase().includes("evolution")
        ),
        {
          trait_type: "Evolution",
          value: 3,
        },
        {
          trait_type: "Additional Wavelength",
          value: "NEW!!!",
        },
      ],
    }),
    onSell: ({ metadata }) => metadata,
  },
  {
    index: 4,
    heading: "Stage 3 (pre-decision period)",
    body: ({ metadata }) => {
      const lifecycleTrait = getLifecycleTrait({ metadata });

      return (() => {
        switch (Number(lifecycleTrait.value)) {
          case 1:
            return "";
          case 2:
            return "";
          case 3:
            return "Lifecycle 3 ID Reveal for those who evolved. L3s are fully evolved.";
          default:
            return "";
        }
      })();
    },
    startsAt: addWeeks(revealDate, 16),
    endsAt: addWeeks(revealDate, 20),
    canHold: () => true,
    canBurn: () => false,
    canEvolve: () => false,
    canSell: () => true,
    onHold: ({ metadata }) => metadata,
    onBurn: ({ metadata }) => metadata,
    onEvolve: ({ metadata }) => metadata,
    onSell: ({ metadata }) => metadata,
  },
  {
    index: 5,
    heading: "Stage 3 (decision period)",
    body: ({ metadata }) => {
      const lifecycleTrait = getLifecycleTrait({ metadata });

      return (() => {
        switch (Number(lifecycleTrait.value)) {
          case 1:
            return "";
          case 2:
            return "";
          case 3:
            return "Fully evolved Lifecycle 3 IDs can be burnt, to redeem an Afterlife ID 3.";
          default:
            return "";
        }
      })();
    },
    startsAt: addWeeks(revealDate, 20),
    endsAt: addWeeks(revealDate, 24),
    canHold: () => true,
    canBurn: ({ metadata }) => {
      const lifecycleTrait = getLifecycleTrait({ metadata });
      const evolutionTrait = getEvolutionTrait({ metadata });
      return (
        Number(lifecycleTrait.value) === 3 &&
        Number(evolutionTrait?.value) === 3
      );
    },
    canEvolve: () => false,
    canSell: () => true,
    onHold: ({ metadata }) => metadata,
    onBurn: ({ metadata }) => ({
      ...metadata,
      name: `Afterlife ID #${metadata.id}`,
      attributes: [
        ...metadata.attributes.filter(
          ({ trait_type }) => !trait_type.toLowerCase().includes("wavelength")
        ),
        {
          trait_type: "Afterlife",
          value: 3,
        },
        {
          trait_type: "Wavelength",
          value: "NEW!!!",
        },
        {
          trait_type: "Whitelist",
          value: "3333 & 2222 & 1111",
        },
      ],
    }),
    onEvolve: ({ metadata }) => metadata,
    onSell: ({ metadata }) => metadata,
  },
  {
    index: 6,
    heading: "Finale",
    body: ({ metadata }) => {
      const lifecycleTrait = getLifecycleTrait({ metadata });

      return (() => {
        switch (Number(lifecycleTrait.value)) {
          case 1:
            return "";
          case 2:
            return "";
          case 3:
            return "Afterlife ID 3 Reveal";
          default:
            return "";
        }
      })();
    },
    startsAt: addWeeks(revealDate, 24),
    endsAt: addWeeks(revealDate, 28),
    canHold: () => false,
    canBurn: () => false,
    canEvolve: () => false,
    canSell: () => false,
    onHold: ({ metadata }) => metadata,
    onBurn: ({ metadata }) => metadata,
    onEvolve: ({ metadata }) => metadata,
    onSell: ({ metadata }) => metadata,
  },
];

export default stages;
