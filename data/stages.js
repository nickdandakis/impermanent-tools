import { addWeeks } from "date-fns";

import { getLifecycleTrait, getEvolutionTrait } from "../utils/traits";

export const revealDate = new Date("2021-09-24T16:00:00Z"); // Sep 24, 2021, 12:00 EST

const stages = [
  {
    label: "Pre-Stage 1",
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
    label: "Stage 1",
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
        ...metadata.attributes,
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
    label: "Pre-Stage 2",
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
    label: "Stage 2",
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
        ...metadata.attributes,
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
    label: "Pre-Stage 3",
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
    label: "Stage 3",
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
];

export default stages;
