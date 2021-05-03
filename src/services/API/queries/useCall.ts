import { useQuery } from "react-query"
import { httpClient } from "../utils"

export interface CallArgs {
  contractAddress: string;
  function: string;
  data: any[]
}

interface CallResult {
  data: any
}

export const useCall = (args: CallArgs) => {
  return useQuery<CallResult, Error>(["call", args], async () => {
    //TODO
    const { data } = await httpClient.get("")

    return data;
  })
}