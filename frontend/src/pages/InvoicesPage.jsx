import { useState } from "react";
import { Search, CalendarDays, Eye, Printer } from "lucide-react";

import ReceiptPreviewModal from "../components/sales/ReceiptPreviewModal";
import invoiceManagementService from "../services/invoiceManagementService";
import { toast } from "react-toastify";

import DashboardContainer from "../components/DashboardContainer";
import useInvoiceManagement from "../hooks/useInvoiceManagement";

function InvoicesPage() {
    const {
        invoiceNumber,
        setInvoiceNumber,

        fromDate,
        setFromDate,

        toDate,
        setToDate,

        invoices,

        loading,

        handleSearch,
    } = useInvoiceManagement();

    const [showReceipt, setShowReceipt] = useState(false);
    const [receipt, setReceipt] = useState(null);

    const handleClosePreview = () => {
        setShowReceipt(false);
    };

    const handleViewReceipt = async (invoiceNumber) => {
        try {
            const response =
                await invoiceManagementService.getReceipt(invoiceNumber);

            setReceipt(response);

            setShowReceipt(true);
        } catch (error) {
            console.error(error);
            toast.error("Unable to load receipt");
        }
    };

    if (loading) {
        return (
            <DashboardContainer>
                <div className="text-center text-white">Loading...</div>
            </DashboardContainer>
        );
    }
    return (
        <DashboardContainer>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-4xl font-bold text-white">
                        Invoice History
                    </h1>

                    <p className="text-gray-400 mt-2">
                        Search completed invoices and reprint receipts.
                    </p>
                </div>

                {/* Search Card */}
                <div
                    className="
                        bg-slate-900/40
                        backdrop-blur-xl
                        border
                        border-blue-500/20
                        rounded-2xl
                        p-6
                    "
                >
                    <div className="grid grid-cols-5 gap-4">
                        {/* Invoice Search */}
                        <div className="col-span-2">
                            <label className="text-sm text-gray-400 mb-2 block">
                                Invoice Number
                            </label>

                            <div className="relative">
                                <Search
                                    size={18}
                                    className="
                                        absolute
                                        left-4
                                        top-1/2
                                        -translate-y-1/2
                                        text-cyan-400
                                    "
                                />

                                <input
                                    value={invoiceNumber}
                                    onChange={(e) =>
                                        setInvoiceNumber(e.target.value)
                                    }
                                    placeholder="Search invoice..."
                                    className="
                                        w-full
                                        pl-12
                                        pr-4
                                        py-3
                                        rounded-xl
                                        bg-white/10
                                        border
                                        border-white/10
                                        text-white
                                        outline-none
                                        focus:border-cyan-400
                                    "
                                />
                            </div>
                        </div>

                        {/* From */}
                        <div>
                            <label className="text-sm text-gray-400 mb-2 block">
                                From
                            </label>

                            <div className="relative">
                                <CalendarDays
                                    size={18}
                                    className="
                                        absolute
                                        left-4
                                        top-1/2
                                        -translate-y-1/2
                                        text-cyan-400
                                    "
                                />

                                <input
                                    type="date"
                                    value={fromDate}
                                    onChange={(e) =>
                                        setFromDate(e.target.value)
                                    }
                                    className="
                                        w-full
                                        pl-12
                                        pr-4
                                        py-3
                                        rounded-xl
                                        bg-white/10
                                        border
                                        border-white/10
                                        text-white
                                    "
                                />
                            </div>
                        </div>

                        {/* To */}
                        <div>
                            <label className="text-sm text-gray-400 mb-2 block">
                                To
                            </label>

                            <div className="relative">
                                <CalendarDays
                                    size={18}
                                    className="
                                        absolute
                                        left-4
                                        top-1/2
                                        -translate-y-1/2
                                        text-cyan-400
                                    "
                                />

                                <input
                                    type="date"
                                    value={toDate}
                                    onChange={(e) => setToDate(e.target.value)}
                                    className="
                                        w-full
                                        pl-12
                                        pr-4
                                        py-3
                                        rounded-xl
                                        bg-white/10
                                        border
                                        border-white/10
                                        text-white
                                    "
                                />
                            </div>
                        </div>

                        {/* Search Button */}
                        <div className="flex items-end">
                            <button
                                onClick={handleSearch}
                                className="
                                    w-full
                                    py-3
                                    rounded-xl
                                    bg-blue-600
                                    hover:bg-blue-700
                                    text-white
                                    font-semibold
                                    transition
                                "
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>

                {/* Invoice Table */}
                <div
                    className="
                        bg-slate-900/40
                        backdrop-blur-xl
                        border
                        border-blue-500/20
                        rounded-2xl
                        overflow-hidden
                    "
                >
                    <table className="w-full">
                        <thead
                            className="
                                bg-white/5
                                text-gray-300
                            "
                        >
                            <tr>
                                <th className="text-left px-6 py-4">Invoice</th>
                                <th className="text-left">Date</th>
                                <th className="text-left">Cashier</th>
                                <th className="text-right">Amount</th>
                                <th className="text-center">Status</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {invoices.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="py-12 text-center text-gray-400"
                                    >
                                        No invoices found
                                    </td>
                                </tr>
                            ) : (
                                invoices.map((invoice) => (
                                    <tr
                                        key={invoice.invoiceNumber}
                                        className="
                                        border-t
                                        border-white/10
                                        hover:bg-white/5
                                        transition
                                    "
                                    >
                                        <td className="px-6 py-5 font-semibold text-cyan-300">
                                            {invoice.invoiceNumber}
                                        </td>

                                        <td className="text-gray-300">
                                            {new Date(
                                                invoice.updatedAt
                                            ).toLocaleString("en-IN")}
                                        </td>

                                        <td className="text-white">
                                            {invoice.updatedBy}
                                        </td>

                                        <td className="text-right text-green-400 font-semibold">
                                            ₹
                                            {Number(
                                                invoice.totalAmount ?? 0
                                            ).toFixed(2)}
                                        </td>

                                        <td className="text-center">
                                            <span
                                                className="
                                                px-3
                                                py-1
                                                rounded-full
                                                bg-green-500/20
                                                text-green-400
                                                text-xs
                                                font-semibold
                                            "
                                            >
                                                {invoice.status}
                                            </span>
                                        </td>

                                        <td className="py-4">
                                            <div className="flex justify-center gap-3">
                                                <button
                                                    onClick={() =>
                                                        handleViewReceipt(
                                                            invoice.invoiceNumber
                                                        )
                                                    }
                                                    className="
        p-2
        rounded-xl
        bg-cyan-500/10
        hover:bg-cyan-500/20
        text-cyan-400
        transition
    "
                                                >
                                                    <Eye size={18} />
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        handleViewReceipt(
                                                            invoice.invoiceNumber
                                                        )
                                                    }
                                                    className="
        p-2
        rounded-xl
        bg-green-500/10
        hover:bg-green-500/20
        text-green-400
        transition
    "
                                                >
                                                    <Printer size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <ReceiptPreviewModal
                open={showReceipt}
                receipt={receipt}
                onClose={handleClosePreview}
            />
        </DashboardContainer>
    );
}

export default InvoicesPage;
