import { useQuery } from "react-query"
import { httpClient } from "../utils"

export interface StorageArgs {
  contractAddress: string;
  key: string;
}

interface StorageResult {
  value: any
}

export const useStorageAt = (args: StorageArgs) => {
  return useQuery<StorageResult, Error>(["storageAt", args], async () => {
    //TODO
    const { data } = await httpClient.get("")

    return data
  })
}