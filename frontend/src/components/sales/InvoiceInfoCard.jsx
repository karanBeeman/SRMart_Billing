import { getStatusStyle } from "../../utils/invoiceUtils";

function InvoiceInfoCard({ invoice, user }) {
    return (
        <div
            className="
                rounded-xl
                border
                bg-slate-900/40
                border-blue-500/20
                backdrop-blur-xl
                p-6
                h-fit
            "
        >
            <div className="grid grid-cols-[90px_1fr] gap-y-3">
                <span className="text-sm text-gray-300">Cashier</span>

                <span className="text-sm text-white">{user?.username}</span>

                <span className="text-sm text-gray-300">Bill No</span>

                <span className="text-lg font-bold text-white">
                    {invoice?.invoiceNumber}
                </span>

                <span className="text-sm text-gray-300">Status</span>

                <span
                    className={`
                        w-fit
                        rounded-full
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        ${getStatusStyle(invoice?.status)}
                    `}
                >
                    {invoice?.status}
                </span>

                <span className="text-sm text-gray-300">Date</span>

                <span className="text-sm text-white">
                    {invoice?.createdAt
                        ? new Date(invoice.createdAt).toLocaleString("en-IN")
                        : ""}
                </span>
            </div>
        </div>
    );
}

export default InvoiceInfoCard;
