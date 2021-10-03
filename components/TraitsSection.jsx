import {
  IMPERMANENT_DIGITAL_CONTRACT_ID,
  CRYPTO_PUNKS_CONTRACT_ID,
  OPENSEA_IMPERMANENT_DIGITAL_LIFECYCLE_FILTER_URL,
  OPENSEA_IMPERMANENT_DIGITAL_WAVELENGTH_FILTER_URL,
  OPENSEA_IMPERMANENT_DIGITAL_SIGNATURE_FILTER_URL,
} from '../data/constants';
import {
  getPunkTrait,
  getWavelengthTrait,
  getLifecycleTrait,
  getAfterlifeTrait,
  getEvolutionTrait,
  getAdditionalWavelengthTrait,
  getSignatureEditionTrait,
  getWhitelistTrait,
} from '../utils/traits';

function TraitsSection({ metadata, isReversed = false }) {
  const traitPunk = getPunkTrait({ metadata });
  const traitWavelength = getWavelengthTrait({ metadata });
  const traitAdditionalWavelength = getAdditionalWavelengthTrait({ metadata });
  const traitLifecycle = getLifecycleTrait({ metadata });
  const traitEvolution = getEvolutionTrait({ metadata });
  const traitAfterlife = getAfterlifeTrait({ metadata });
  const traitWhitelist = getWhitelistTrait({ metadata });
  const traitSignatureEdition = getSignatureEditionTrait({ metadata });

  return (
    <div className="traits-section">
      <div className="column">
        {traitPunk ? (
          <a
            href={`https://opensea.io/assets/${CRYPTO_PUNKS_CONTRACT_ID}/${traitPunk.value}`}
            target="_blank"
          >
            Punk #{traitPunk.value}
          </a>
        ) : metadata && (
          <span>
            No&nbsp;
            {isReversed ? 'Impermanent Digital' : 'CryptoPunk'}
            &nbsp;available
          </span>
        )}
      </div>
      <div className="column">
        {metadata?.id && !isReversed && (
          <a
            href={`https://opensea.io/assets/${IMPERMANENT_DIGITAL_CONTRACT_ID}/${metadata.id}`}
            target="_blank"
          >
            ID #{metadata.id}
          </a>
        )}
        {traitWavelength && (
          <a
            href={`${OPENSEA_IMPERMANENT_DIGITAL_WAVELENGTH_FILTER_URL}${traitWavelength.value}`}
            target="_blank"
          >
            Wavelength: {traitWavelength.value}
          </a>
        )}
        {traitAdditionalWavelength && (
          <span>
            Wavelength: {traitAdditionalWavelength.value}
          </span>
        )}
        {traitLifecycle && (
          <a
            href={`${OPENSEA_IMPERMANENT_DIGITAL_LIFECYCLE_FILTER_URL}${traitLifecycle.value}`}
            target="_blank"
          >
            Lifecycle: {traitLifecycle.value}
          </a>
        )}
        {traitEvolution && (
          <span>
            Evolution: {traitEvolution.value}
          </span>
        )}
        {traitAfterlife && (
          <span>
            Afterlife: {traitAfterlife.value}
          </span>
        )}
        {traitWhitelist && (
          <span>
            Whitelist: {traitWhitelist.value}
          </span>
        )}
        {traitSignatureEdition && (
          <a
            href={OPENSEA_IMPERMANENT_DIGITAL_SIGNATURE_FILTER_URL}
            target="_blank"
          >
            Signature Edition: {traitSignatureEdition.value}
          </a>
        )}
      </div>
      <style jsx>{`
        .traits-section {
          display: flex;
          flex-flow: row wrap;
          text-align: left;
          padding-top: 20px;
        }

        .traits-section > * {
          flex: 1 1 50%;
          max-width: 50%;
        }

        .column {
          display: flex;
          flex-flow: column;
          justify-content: flex-between;
        }

        .column + .column {
          text-align: right;
        }

        .column > * {
          padding-bottom: 10px;
        }

        @media (max-width: 500px) {
          .traits-section {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
}

export default TraitsSection;
