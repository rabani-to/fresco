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
    <div className="[&_section]:flex [&_section]:gap-1 [&_section]:flex-col">
      <section className="border-b pb-4 mb-4">
        {statuses.map((status) => {
          return (
            <b key={`arg-${status}`}>
              {status}: {prettifyProp(props[status])}
            </b>
          )
        })}
      </section>

      <section className="border-b pb-4 mb-4">
        {other.map((key) => {
          return (
            <b key={`arg-${key}`}>
              {key}: {prettifyProp(props[key])}
            </b>
          )
        })}
      </section>

      <section className="border-b pb-4 mb-4">
        {Object.keys(CONFIG).map((key) => {
          if (key.startsWith("on") || key === "children") return null

          return (
            <b key={`arg-config-${key}`}>
              {key}: {prettifyProp(CONFIG[key])}
            </b>
          )
        })}
      </section>

      <section className={`${DATA || "hidden"}`}>
        {Object.keys(formatData?.(DATA || {}) || {}).map((key) => {
          return (
            <b key={`arg-data-${key}`}>
              {key}: {DATA ? prettifyProp(DATA[key]) : null}
            </b>
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

  return (
    <span
      className={`${color} min-w-[2rem] inline-flex justify-center p-1 px-2 border rounded-full text-[85%]`}
    >
      {String(prop === undefined || prop === "" ? `undefined` : prop)}
    </span>
  )
}

export default PropTable
