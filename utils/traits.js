export const getTrait = ({ metadata, type }) =>
  metadata?.attributes?.find(({ trait_type }) =>
    trait_type.toLowerCase().includes(type)
  );

export const getPunkTrait = ({ metadata }) =>
  getTrait({ metadata, type: "punk id" });
export const getWavelengthTrait = ({ metadata }) =>
  getTrait({ metadata, type: "wavelength" });
export const getAdditionalWavelengthTrait = ({ metadata }) =>
  getTrait({ metadata, type: "additional wavelength" });
export const getLifecycleTrait = ({ metadata }) =>
  getTrait({ metadata, type: "lifecycle" });
export const getAfterlifeTrait = ({ metadata }) =>
  getTrait({ metadata, type: "afterlife" });
export const getEvolutionTrait = ({ metadata }) =>
  getTrait({ metadata, type: "evolution" });
export const getWhitelistTrait = ({ metadata }) =>
  getTrait({ metadata, type: "whitelist" });
export const getSignatureEditionTrait = ({ metadata }) =>
  getTrait({ metadata, type: "signature edition" });
