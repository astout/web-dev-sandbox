import useDevice from '@/lib/useDevice'

const displayProperty = (p) => {
  if (typeof p === 'function') {
    return p()
  }
  if (typeof p === 'string') {
    return p
  }
  return JSON.stringify(p)
}

export default function DeviceInfoTable() {
  const device = useDevice()
  return (
    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div
          className="
            shadow
            overflow-hidden
            border-b border-gray-900
            sm:rounded-lg"
        >
          <table className="min-w-full divide-y divide-gray-900">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th
                  scope="col"
                  className="
                    px-6
                    py-3
                    text-left text-xs
                    font-medium
                    uppercase
                    tracking-wider
                  "
                >
                  Attribute
                </th>
                <th
                  scope="col"
                  className="
                    px-6
                    py-3
                    text-left text-xs
                    font-medium
                    uppercase
                    tracking-wider
                  "
                >
                  Value
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-900">
              {Object.entries(device).map(([k, v]) => {
                return (
                  <tr key={k} className="text-sm font-medium text-white bg-gray-500">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div>{k}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{displayProperty(v)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
