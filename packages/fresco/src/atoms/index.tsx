import type {
  FrescoReadConfig,
  DefaultFrescoAtomsConfig,
  PropsWithChildren,
  useBalanceReturnType,
} from "../types"
import { useEffect } from "react"
import { useAccount, useBalance, useContractRead, useToken } from "wagmi"
import { formatUnits } from "viem"

export const ERC20 = {
  BalanceOf({
    account,
    children,
    enabled,
    refetchInterval,
    chainId,
    token,
    ...triggers
  }: FrescoReadConfig<useBalanceReturnType["data"]>) {
    const connectedAccount = useInternalAccount(account)
    const result = useResultTriggers(
      useBalance({
        enabled,
        watch: refetchInterval === "block",
        address: connectedAccount,
        token: token as any,
        scopeKey: `BalanceOf.${token}.${account}.${chainId}`,
        chainId,
      }),
      triggers
    )

    return children(formatResult(result, (data) => data))
  },
  AllowanceOf({
    account,
    children,
    enabled,
    refetchInterval,
    chainId,
    token,
    spender,
    ...triggers
  }: FrescoReadConfig<
    useBalanceReturnType["data"],
    {
      spender: string
    }
  >) {
    const connectedAccount = useInternalAccount(account)
    const { data: tokenData } = useToken({
      address: token,
      chainId,
    })

    const result = useResultTriggers(
      useContractRead({
        enabled,
        watch: refetchInterval === "block",
        account: connectedAccount,
        address: token,
        abi: [
          // owner, spender
          "function allowance(address, address) external view returns (uint256)",
        ],
        args: [connectedAccount, spender],
        scopeKey: `AllowanceOf.${token}.${account}.${spender}.${chainId}`,
        chainId,
      }),
      triggers
    )

    return children(
      formatResult(
        result,
        (data) =>
          ({
            decimals: tokenData?.decimals,
            formatted: formatUnits(data || 0, tokenData?.decimals || 18),
            symbol: tokenData?.symbol,
            value: data || 0,
          } as useBalanceReturnType["data"])
      )
    )
  },
}

export function FrescoAtomsConfig({
  defaults,
  children,
}: PropsWithChildren<{
  defaults?: DefaultFrescoAtomsConfig
}>) {
  console.debug({ defaults, MESSAGE: "feature not available yet" })
  return children as JSX.Element
}

function formatResult(
  result: ReturnType<typeof useContractRead>,
  formatter: (data: any) => any
) {
  const { data, isFetched, error, isError, isSuccess, isFetching, isLoading } =
    result

  return {
    data: formatter(data),
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

  return result
}

const useInternalAccount = (givenAccount?: string) => {
  const { address: currentConneced } = useAccount()
  return givenAccount || (currentConneced as any)
}
