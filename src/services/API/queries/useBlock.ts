import { useQuery } from "react-query"
import { httpClient } from "../utils"

export interface BlockArgs {
  blockNumber: string;
}

interface BlockResult {
  block: any
}

export const useBlock = (args: BlockArgs) => {
  return useQuery<BlockResult, Error>(["block", args], async () => {
    //TODO
    const { data } = await httpClient.get("")

    return data
  })
}