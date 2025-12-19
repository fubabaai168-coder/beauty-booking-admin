import Link from "next/link";

// Mock data for services
const mockServices = [
  {
    id: 1,
    name: "基礎保養",
    category: "臉部保養",
    price: 1200,
    status: "啟用",
  },
  {
    id: 2,
    name: "深層清潔",
    category: "臉部保養",
    price: 1500,
    status: "啟用",
  },
  {
    id: 3,
    name: "美白療程",
    category: "臉部保養",
    price: 2000,
    status: "啟用",
  },
  {
    id: 4,
    name: "抗老緊緻",
    category: "臉部保養",
    price: 2500,
    status: "停用",
  },
];

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
        status === "啟用"
          ? "bg-green-100 text-green-800"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      {status}
    </span>
  );
}

export default function ServicesPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">服務項目</h1>
        <Link
          href="/admin/services/new"
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
        >
          新增服務
        </Link>
      </div>

      {/* Desktop 列表 */}
      <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-zinc-200">
          <thead className="bg-zinc-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                服務名稱
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                分類
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                價格
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                狀態
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-zinc-200">
            {mockServices.map((service) => (
              <tr key={service.id} className="hover:bg-zinc-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-900">
                  {service.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600">
                  {service.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900">
                  NT$ {service.price.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={service.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Link
                    href={`/admin/services/${service.id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    編輯
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile 列表 */}
      <div className="block md:hidden space-y-4">
        {mockServices.map((service) => (
          <div key={service.id} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-sm font-semibold text-zinc-900">{service.name}</h3>
                <p className="text-xs text-zinc-600 mt-1">{service.category}</p>
              </div>
              <StatusBadge status={service.status} />
            </div>
            <div className="space-y-2 text-sm mb-4">
              <div>
                <span className="text-zinc-600">價格：</span>
                <span className="text-zinc-900 ml-2 font-medium">
                  NT$ {service.price.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="pt-4 border-t border-zinc-200">
              <Link
                href={`/admin/services/${service.id}`}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                編輯 →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
