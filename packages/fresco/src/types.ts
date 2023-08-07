export type { PropsWithChildren } from "react"

import type { useBalance, useContractRead } from "wagmi"

export type useBalanceReturnType = ReturnType<typeof useBalance>
export type useContractReadReturnType = ReturnType<typeof useContractRead>

export type DefaultFrescoAtomsConfig = {
  ERC20?: Partial<{ token: string; decimals: number }>
  abi?: Array<string>
  account?: `0x${string}`
  contractAddress?: string
  chainId?: number
}

export type FrescoReadConfig<DataType = any> = {
  account?: `0x${string}`
  token?: string
  chainId?: number
  decimals?: number
  enabled?: boolean
  /** `"block"` will set `wagmi.watch=true`. Not recommended for L2s, can hit rate-limit. */
  refetchInterval?: "block" | number
  onChangeStatus?: (data: any) => void
  onDataFetched?: (data: any) => void
  onError?: (error: Error) => void
  children: (prop: {
    data: DataType
    isSuccess: boolean
    isLoading: boolean
    isError: boolean
    error: Error | null
  }) => JSX.Element
}
