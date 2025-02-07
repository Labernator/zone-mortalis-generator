import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export const exportPdf = async (pdfName: string, showLoadingIndicator: (show: boolean) => void) => {
    showLoadingIndicator(true);
    const jsPdf = new jsPDF("landscape", "mm", "a4", true);
    let canvas: HTMLCanvasElement;
    const container = Array.from(document.querySelectorAll(".pdf-export")) as HTMLElement[];
    for (let i = 0; i < container.length; i++) {
        if (i > 0) {
            jsPdf.addPage();
        }
        canvas = await html2canvas(container[i], { scale: 2 });
        jsPdf.addImage(canvas.toDataURL("image/png", 0.5), "JPEG", 0, 0, jsPdf.internal.pageSize.getWidth(), jsPdf.internal.pageSize.getHeight(), undefined, "FAST");
    }
    jsPdf.save(pdfName);
    showLoadingIndicator(false);
};

export const PDFButton = ({showLoadingIndicator}:{showLoadingIndicator: (show: boolean) => void}) =>
    <button onClick={() => exportPdf("RandomTiles.pdf", showLoadingIndicator)}>Export PDF with 3 random boards</button>;
