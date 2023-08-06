import type {
  FrescoReadConfig,
  DefaultFrescoAtomsConfig,
  PropsWithChildren,
} from "../types"
import { useEffect } from "react"
import { useAccount, useBalance, useContractRead } from "wagmi"

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
  console.debug({ defaults })
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
