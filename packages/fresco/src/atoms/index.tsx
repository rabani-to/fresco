import { useEffect } from "react"
import { useAccount, useBalance, useContractRead } from "wagmi"

import type { PropsWithChildren } from "react"

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

export const ERC20 = {
  BalanceOf({
    account,
    children,
    enabled,
    onChangeStatus,
    refetchInterval,
    onDataFetched,
    onError,
    chainId,
    token,
  }: FrescoReadConfig<ReturnType<typeof useBalance>["data"]>) {
    const { address } = useAccount()
    const connectedAccount = account || address

    const result = useBalance({
      enabled,
      watch: refetchInterval === "block",
      address: connectedAccount,
      token: token as any,
      scopeKey: `BalanceOf.${token}.${account}.${chainId}`,
      chainId,
    })

    useResultTriggers(result, {
      onChangeStatus,
      onDataFetched,
      onError,
    })

    return children(formatResult(result))
  },
}

// isConfirmed: met min confirmations
// isFailedConfirm: invalid tx

export function FrescoAtomsConfig({
  defaults,
  children,
}: PropsWithChildren<{
  defaults?: DefaultFrescoAtomsConfig
}>) {
  return children as JSX.Element
}

function formatResult(result: ReturnType<typeof useContractRead>) {
  const { data, isFetched, error, isError, isSuccess, isFetching, isLoading } =
    result

  return {
    data: data as any,
    error,
    isError,
    isSuccess: isFetched && isSuccess,
    isLoading: isLoading || isFetching,
  }
}

const useResultTriggers = (
  result: ReturnType<typeof useContractRead>,
  {
    onChangeStatus,
    onDataFetched,
    onError,
  }: Pick<FrescoReadConfig, "onChangeStatus" | "onDataFetched" | "onError">
) => {
  const { status, data, error, isError } = result

  useEffect(() => {
    onChangeStatus?.(result)
  }, [status])

  useEffect(() => {
    if (data) onDataFetched?.(data)
  }, [data])

  useEffect(() => {
    if (error) onError?.(error)
  }, [isError])
}
