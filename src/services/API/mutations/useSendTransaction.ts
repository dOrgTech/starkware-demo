import { useMutation } from "react-query"
import { httpClient } from "../utils"

export interface TransactionArgs {
  contractAddress: string;
  function: string;
  data: any[]
}

interface TransactionResult {
  txId: number
}

export const useSendTransaction = () => {
  return useMutation<TransactionResult, Error, TransactionArgs>(async (args) => {
    //TODO
    return httpClient.post("", args)
  })
}