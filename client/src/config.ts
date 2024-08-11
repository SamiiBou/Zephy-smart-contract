import { z } from "zod";
import { AlchemyGasManagerConfig } from "@alchemy/aa-alchemy";
import {
  SupportedAccountTypes,
  cookieStorage,
  createConfig,
} from "@alchemy/aa-alchemy/config";
import {
  SmartAccountClientOptsSchema,
  arbitrumSepolia,
  optimismSepolia
} from "@alchemy/aa-core";
import { QueryClient } from "@tanstack/react-query";

// NOTE: feel free to change the chain here!
export const chain = optimismSepolia;
export const config = createConfig({
  // this is for requests to the specific chain RPC
  rpcUrl: "/api/rpc/chain/" + chain.id,
  signerConnection: {
    // this is for Alchemy Signer requests
    rpcUrl: "/api/rpc/",
  },
  chain,
  ssr: true,
  storage: cookieStorage,
});

// provide a query client for use by the alchemy accounts provider
export const queryClient = new QueryClient();

// configure the account type we wish to use once
export const accountType: SupportedAccountTypes = "MultiOwnerModularAccount";

// setup the gas policy for sponsoring transactions
export const gasManagerConfig: AlchemyGasManagerConfig = {
  policyId: process.env.NEXT_PUBLIC_ALCHEMY_GAS_MANAGER_POLICY_ID!,
};

// additional options for our account client
type SmartAccountClientOptions = z.infer<typeof SmartAccountClientOptsSchema>;
export const accountClientOptions: Partial<SmartAccountClientOptions> = {
  txMaxRetries: 20,
};