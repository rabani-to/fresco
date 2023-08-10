function PropTable<DataType = unknown>({
  props,
  config,
  formatData,
}: {
  props: Record<string, any>
  config?: Record<string, any>
  formatData?: (data: DataType) => Record<string, any>
}) {
  const keys = Object.keys(props)
  const { statuses, other } = keys.reduce(
    (obj, current) => {
      if (current === "data") return obj
      // early exit when reaching data prop

      const pileName = current.startsWith("is") ? "statuses" : "other"
      const pile = obj[pileName]
      return {
        ...obj,
        [pileName]: [...pile, current],
      }
    },
    {
      statuses: [],
      other: [],
    }
  )

  const DATA = props?.data
  const CONFIG = config || {}
  return (
    <div className="[&_section]:flex [&_section]:gap-2 [&_section]:flex-col font-medium text-[#363b3f] text-[0.9rem]">
      <section className="border-b pb-4 mb-4">
        {statuses.map((status) => {
          return (
            <div key={`arg-${status}`}>
              {status} {prettifyProp(props[status])}
            </div>
          )
        })}
      </section>

      <section className="border-b pb-4 mb-4">
        {other.map((key) => {
          return (
            <div key={`other-arg-${key}`}>
              {key} {prettifyProp(props[key])}
            </div>
          )
        })}
      </section>

      <section className="border-b pb-4 mb-4">
        {Object.keys(CONFIG).map((key) => {
          if (key.startsWith("on") || key === "children") return null

          return (
            <div key={`arg-config-${key}`}>
              {key} {prettifyProp(CONFIG[key])}
            </div>
          )
        })}
      </section>

      <section className={`${DATA || "hidden"}`}>
        {Object.keys(formatData?.(DATA || {}) || {}).map((key) => {
          return (
            <div key={`arg-data-${key}`}>
              {key} {DATA ? prettifyProp(DATA[key]) : null}
            </div>
          )
        })}
      </section>
    </div>
  )
}

const prettifyProp = (prop: any) => {
  let color = ""

  if (prop === true) color = "text-[#029cfd]"
  if (prop === false) color = "text-[#ff4785]"
  if ([undefined, null, ""].includes(prop)) color = "text-[#7b858c]"

  if (`${prop}`.includes("Error")) {
    return (
      <div className="text-red-600 font-semibold flex justify-center py-2 px-4 border border-[currentColor] rounded-2xl text-[86%]">
        {String(prop === undefined || prop === "" ? `undefined` : prop)}
      </div>
    )
  }

  return (
    <span
      className={`${color} ml-1 font-semibold min-w-[2rem] inline-flex justify-center py-0.5 px-2 border rounded-full text-[86%]`}
    >
      {String(prop === undefined || prop === "" ? `undefined` : prop)}
    </span>
  )
}

export default PropTable
