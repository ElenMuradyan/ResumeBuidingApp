import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumePDF from "./ResumePDF";
import { resume } from "@/features/resume/types";

const DownloadButton = ({ data }: { data: resume }) => (
  <PDFDownloadLink
    document={<ResumePDF data={data} />}
    fileName="resume.pdf"
  >
    {({ loading }) => (
      <button className="bg-blue-600 text-white py-2 px-4 rounded">
        {loading ? "Generating..." : "Download PDF"}
      </button>
    )}
  </PDFDownloadLink>
);

export default DownloadButton;