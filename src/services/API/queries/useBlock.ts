import { useQuery } from "react-query"
import { HTTPClient } from "services/http"

export interface BlockArgs {
  blockNumber: string;
}

interface BlockResult {
  block: unknown
}

export const useBlock = (args: BlockArgs) => {
  return useQuery<BlockResult, Error>(["block", args], async () => {
    //TODO
    const httpClient = HTTPClient.create({ baseURL: "", timeout: 500, headers: {}})
    const { data } = await httpClient.get("")

    return data
  })
}