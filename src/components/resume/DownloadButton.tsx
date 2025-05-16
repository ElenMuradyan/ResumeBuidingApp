import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumePDF from "./ResumePDF";
import { resume } from "@/features/resume/types";
import { themeType } from "@/types/resumeThemeTypes";
import MagicButton from "../ui/magic-button";

const DownloadButton = ({ data, themeColors }: { data: resume, themeColors: themeType}) => (
  <PDFDownloadLink
    document={<ResumePDF themeColors={themeColors} data={data} />}
    fileName="resume.pdf"
  >
    {({ loading }) => (
      <MagicButton text={loading ? "Generating..." : "Download PDF"}/>
    )}
  </PDFDownloadLink>
);

export default DownloadButton;