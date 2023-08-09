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
    <div>
      <section className="flex flex-col border-b pb-4 mb-4">
        {statuses.map((status) => {
          return (
            <b key={`arg-${status}`}>
              {status}: {String(props[status])}
            </b>
          )
        })}
      </section>

      <section className="flex flex-col border-b pb-4 mb-4">
        {other.map((key) => {
          return (
            <b key={`arg-${key}`}>
              {key}: {String(props[key])}
            </b>
          )
        })}
      </section>

      <section className="flex flex-col border-b pb-4 mb-4">
        {Object.keys(CONFIG).map((key) => {
          if (key.startsWith("on") || key === "children") return null

          return (
            <b key={`arg-config-${key}`}>
              {key}: {String(CONFIG[key])}
            </b>
          )
        })}
      </section>

      <section className={`flex flex-col ${DATA || "hidden"}`}>
        {Object.keys(formatData?.(DATA || {}) || {}).map((key) => {
          return (
            <b key={`arg-data-${key}`}>
              {key}: {DATA ? String(DATA[key]) : null}
            </b>
          )
        })}
      </section>
    </div>
  )
}

export default PropTable
