import DashboardContainer from "../components/DashboardContainer";

import StatsSection from "../components/StatsSection";
import RevenuePanel from "../components/RevenuePanel";
import QuickActions from "../components/QuickActions";
import InvoiceTable from "../components/InvoiceTable";

function DashboardPage() {
    return (
        <DashboardContainer>
            <div className="mb-8">
                <h2
                    className="
                        text-white
                        text-3xl
                        font-bold
                        mb-2
                    "
                >
                    Billing Dashboard
                </h2>

                <p className="text-gray-200">
                    Manage invoices, customers and sales.
                </p>
            </div>

            <StatsSection />

            <div
                className="
                    grid
                    grid-cols-1
                    xl:grid-cols-3
                    gap-6
                "
            >
                <RevenuePanel />

                <QuickActions />
            </div>

            <InvoiceTable />
        </DashboardContainer>
    );
}

export default DashboardPage;
