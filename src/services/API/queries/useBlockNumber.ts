import { useQuery } from "react-query"
import { httpClient } from '../utils';

export const useBlockNumber = () => {
  return useQuery<number, Error>("blockNumber", async () => {
    //TODO
    const { data } = await httpClient.get("");
    return data
  })
}