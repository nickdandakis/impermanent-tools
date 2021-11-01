import { useQuery } from "react-query";
import { request, gql } from "graphql-request";

import { IMPERMANENT_DIGITAL_CONTRACT_ID, BURN_ID } from "../data/constants";
import { ZORA_INDEXER_BASE_URL } from "../constants";
import {
  IMPERMANENT_DIGITAL_AGGREGATIONS_WAVELENGTH_QUERY_KEY,
  IMPERMANENT_DIGITAL_AGGREGATIONS_LIFECYCLE_QUERY_KEY,
  IMPERMANENT_DIGITAL_AGGREGATIONS_EVOLUTION_QUERY_KEY,
} from "./queryKeys";

export const useAggregationsWavelength = ({ wavelength }) =>
  useQuery(
    [IMPERMANENT_DIGITAL_AGGREGATIONS_WAVELENGTH_QUERY_KEY, wavelength],
    () =>
      request(
        ZORA_INDEXER_BASE_URL,
        gql`
      query AggregationsByWavelength($wavelength: String!) {
        countBurned: Token_aggregate (
          where: {
            address: { _ilike: "${IMPERMANENT_DIGITAL_CONTRACT_ID}" }
            metadata: { json: { _contains: { attributes: [{ trait_type: "Wavelength", value: $wavelength }]}}}
            owner: { _eq: "${BURN_ID}"}
          }
          order_by: { tokenId: asc }
        ) {
          aggregate {
            count
          }
        }

        countUntouched: Token_aggregate (
          where: {
            address: { _ilike: "${IMPERMANENT_DIGITAL_CONTRACT_ID}" }
            metadata: { json: { _contains: { attributes: [{ trait_type: "Wavelength", value: $wavelength }]}}}
            owner: { _neq: "${BURN_ID}"}
          }
          order_by: { tokenId: asc }
        ) {
          aggregate {
            count
          }
        }

        countAll: Token_aggregate (
          where: {
            address: { _ilike: "${IMPERMANENT_DIGITAL_CONTRACT_ID}" }
            metadata: { json: { _contains: { attributes: [{ trait_type: "Wavelength", value: $wavelength }]}}}
          }
          order_by: { tokenId: asc }
        ) {
          aggregate {
            count
          }
        }
      }
    `,
        {
          wavelength,
        }
      ),
    {
      staleTime: 5 * 60 * 1000, // 5mins
    }
  );

export const useAggregationsLifecycle = ({ lifecycle }) =>
  useQuery(
    [IMPERMANENT_DIGITAL_AGGREGATIONS_LIFECYCLE_QUERY_KEY, lifecycle],
    () =>
      request(
        ZORA_INDEXER_BASE_URL,
        gql`
      query AggregationsLifecycle($lifecycle: String!) {
        countBurned: Token_aggregate (
          where: {
            address: { _ilike: "${IMPERMANENT_DIGITAL_CONTRACT_ID}" }
            metadata: { json: { _contains: { attributes: [{ trait_type: "Lifecycle Trait", value: $lifecycle }]}}}
            owner: { _eq: "${BURN_ID}"}
          }
          order_by: { tokenId: asc }
        ) {
          aggregate {
            count
          }
        }
        countUntouched: Token_aggregate (
          where: {
            address: { _ilike: "${IMPERMANENT_DIGITAL_CONTRACT_ID}" }
            metadata: { json: { _contains: { attributes: [{ trait_type: "Lifecycle Trait", value: $lifecycle }]}}}
            owner: { _neq: "${BURN_ID}"}
          }
          order_by: { tokenId: asc }
        ) {
          aggregate {
            count
          }
        }
        countAll: Token_aggregate (
          where: {
            address: { _ilike: "${IMPERMANENT_DIGITAL_CONTRACT_ID}" }
            metadata: { json: { _contains: { attributes: [{ trait_type: "Lifecycle Trait", value: $lifecycle }]}}}
          }
          order_by: { tokenId: asc }
        ) {
          aggregate {
            count
          }
        }
      }
    `,
        {
          lifecycle,
        }
      ),
    {
      staleTime: 5 * 60 * 1000, // 5mins
    }
  );

export const useAggregationsEvolution = ({ lifecycle, evolution }) =>
  useQuery(
    [
      IMPERMANENT_DIGITAL_AGGREGATIONS_EVOLUTION_QUERY_KEY,
      lifecycle,
      evolution,
    ],
    () =>
      request(
        ZORA_INDEXER_BASE_URL,
        gql`
      query AggregationsEvolution($evolution: String!, $lifecycle: String!) {
        countEvolved: Token_aggregate (
          where: {
            address: { _ilike: "${IMPERMANENT_DIGITAL_CONTRACT_ID}" }
            metadata: { json: { _contains: { attributes: [
              { trait_type: "Evolution Stage", value: $evolution }
              { trait_type: "Lifecycle Trait", value: $lifecycle }
            ]}}}
          }
          order_by: { tokenId: asc }
        ) {
          aggregate {
            count
          }
        }
        countAll: Token_aggregate (
          where: {
            address: { _ilike: "${IMPERMANENT_DIGITAL_CONTRACT_ID}" }
            metadata: { json: { _contains: { attributes: [
              { trait_type: "Lifecycle Trait", value: $lifecycle }
            ]}}}
          }
          order_by: { tokenId: asc }
        ) {
          aggregate {
            count
          }
        }
      }
    `,
        {
          lifecycle,
          evolution,
        }
      ),
    {
      staleTime: 5 * 60 * 1000, // 5mins
    }
  );
