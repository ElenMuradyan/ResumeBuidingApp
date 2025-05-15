import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image,
    Link,
  } from "@react-pdf/renderer";
  import { resume } from "@/features/resume/types";
  
  const styles = StyleSheet.create({
    page: { padding: 30, fontSize: 12, fontFamily: "Times-Roman" },
    section: { marginBottom: 12 },
    heading: { fontSize: 16, fontWeight: "bold", marginBottom: 4, borderBottom: 1 },
    name: { fontSize: 20, fontWeight: "bold" },
    image: { width: 80, height: 80, borderRadius: 40, marginRight: 10 },
    row: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
    link: { color: "blue", textDecoration: "underline" },
  });
  
const ResumePDF = ({ data }: { data: resume }) => {
    const {
      ProfileSection,
      ProjectSection,
      EducationSection,
      SkillsSection,
      SocialSection,
      ExperienceSection,
    } = data;
  
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Header */}
          <View style={styles.row}>
            {ProfileSection.imgUrl && (
              <Image src={ProfileSection.imgUrl} style={styles.image} />
            )}
            <View>
              <Text style={styles.name}>
                {ProfileSection.firstName} {ProfileSection.lastName}
              </Text>
              <Text>{ProfileSection.profession}</Text>
            </View>
          </View>
  
          {/* Summary */}
          <View style={styles.section}>
            <Text style={styles.heading}>Summary</Text>
            <Text>{ProfileSection.summary}</Text>
          </View>
  
          {/* Experience */}
          <View style={styles.section}>
            <Text style={styles.heading}>Experience</Text>
            {ExperienceSection?.map((item, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <Text>{item.position} at {item.company}</Text>
                <Text>{item.duration}</Text>
                <Text>{item.description}</Text>
              </View>
            ))}
          </View>
  
          {/* Skills */}
          <View style={styles.section}>
            <Text style={styles.heading}>Skills</Text>
            <Text>{SkillsSection?.join(", ")}</Text>
          </View>
  
          {/* Education */}
          <View style={styles.section}>
            <Text style={styles.heading}>Education</Text>
            {EducationSection?.map((edu, i) => (
              <View key={i}>
                <Text>{edu.courseName} - {edu.collegeSchool}</Text>
                <Text>{edu.completitionYear} | {edu.percentage}%</Text>
              </View>
            ))}
          </View>
  
          {/* Projects */}
          <View style={styles.section}>
            <Text style={styles.heading}>Projects</Text>
            {ProjectSection?.map((project, i) => (
              <View key={i}>
                <Text>{project.projectName}</Text>
                <Text>{project.techStack}</Text>
                <Text>{project.description}</Text>
                <Link style={styles.link} src={project.link}>View Demo</Link>
              </View>
            ))}
          </View>
  
          {/* Social */}
          <View style={styles.section}>
            <Text style={styles.heading}>Social</Text>
            {SocialSection?.instagram && <Link style={styles.link} src={SocialSection.instagram}>Instagram</Link>}
            {SocialSection?.linkedin && <Link style={styles.link} src={SocialSection.linkedin}>LinkedIn</Link>}
            {SocialSection?.facebook && <Link style={styles.link} src={SocialSection.facebook}>Facebook</Link>}
            {SocialSection?.twitter && <Link style={styles.link} src={SocialSection.twitter}>Twitter</Link>}
          </View>
        </Page>
      </Document>
    );
  };
  
  export default ResumePDF;
  