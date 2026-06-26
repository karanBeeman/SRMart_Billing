// utils/receiptPrinter.js

export async function printReceipt(invoice) {
    const printWindow = window.open("", "_blank", "width=350,height=700");

    if (!printWindow) {
        throw new Error("Unable to open print window");
    }

    const style = printWindow.document.createElement("style");
    style.textContent = `
        body {
            font-family: monospace;
            width: 300px;
            margin: 0 auto;
            padding: 10px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        td {
            padding: 2px 0;
        }
    `;

    printWindow.document.head.appendChild(style);

    const container = printWindow.document.createElement("div");
    container.innerHTML = buildReceiptBody(invoice);

    printWindow.document.body.appendChild(container);

    printWindow.onload = () => {
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    };
}
