import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image,
    Link,
    Font,
  } from "@react-pdf/renderer";
import { resume } from "@/features/resume/types";  
import { themeItems } from "@/lib/constants";

  Font.register({
    family: 'Roboto',
    src: '/Fonts/roboto.ttf',
    });

export default function ClassicTemplatePDF ({data, theme }: {data: resume, theme: themeItems }) {
    const { ProfileSection, ProjectSection, ExperienceSection, SkillsSection, SocialSection, EducationSection } = data;
    const { background, text, accent } = theme;
    
    const styles = StyleSheet.create({
        page: {
          fontSize: 12,
          fontFamily: "Roboto",
          backgroundColor: 'white',
          color: 'black',
        },
        section: {
          margin: 20,
          marginBottom: 12,
          paddingBottom: 6,
          borderBottom: `1px solid ${accent}`,
        },
        heading: {
          fontSize: 16,
          fontWeight: "bold",
          marginBottom: 4,
          color: accent,
        },
        name: {
          fontSize: 20,
          fontWeight: "bold",
          color: accent,
        },
        image: {
          width: 80,
          height: 80,
          borderRadius: 40,
          marginRight: 10,
        },
        row: {
          padding: 20,
          flexDirection: "row",
          color: text,
          backgroundColor: background,
          alignItems: "center",
          marginBottom: 12,
        },
        link: {
          color: accent,
          textDecoration: "underline",
          fontSize: 12,
          marginTop: 2,
        },
      });
  
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Header */}
          <View style={styles.row}>
            {ProfileSection?.imgUrl && (
              <Image src={ProfileSection?.imgUrl} style={styles.image} />
            )}
            <View>
              <Text style={styles.name}>
                {ProfileSection?.firstName} {ProfileSection?.lastName}
              </Text>
              <Text>{ProfileSection?.profession}</Text>
            </View>
          </View>
  
          {/* Summary */}
          <View style={styles.section}>
            <Text style={styles.heading}>Summary</Text>
            <Text>{ProfileSection?.summary}</Text>
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
    )
}