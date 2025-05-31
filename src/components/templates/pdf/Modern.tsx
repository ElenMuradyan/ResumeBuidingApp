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
  
  export default function ModernTemplatePDF({
    data,
    theme,
  }: {
    data: resume;
    theme: themeItems;
  }) {
    const {
      ProfileSection,
      ProjectSection,
      ExperienceSection,
      SkillsSection,
      SocialSection,
      EducationSection,
    } = data;
  
    const { background, text, accent } = theme;
  
    const styles = StyleSheet.create({
      page: {
        fontFamily: "Roboto",
        fontSize: 11,
        backgroundColor: background,
        color: text,
        padding: 20,
      },
      header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: accent,
        borderBottomStyle: "solid",
        marginBottom: 15,
      },
      profileImage: {
        width: 48,
        height: 48,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: "white",
      },
      nameSection: {
        flexDirection: "column",
      },
      name: {
        fontSize: 16,
        fontWeight: "bold",
        color: accent,
      },
      profession: {
        fontSize: 10,
        color: "#999999",
      },
      section: {
        marginBottom: 12,
      },
      sectionHeading: {
        fontSize: 13,
        fontWeight: "bold",
        color: accent,
        borderBottomWidth: 1,
        borderBottomColor: accent,
        borderBottomStyle: "solid",
        paddingBottom: 4,
      },
      text: {
        marginTop: 4,
        lineHeight: 1.3,
        color: text,
      },
      experienceItem: {
        marginTop: 6,
      },
      experiencePosition: {
        fontWeight: "bold",
        color: accent,
      },
      experienceDuration: {
        fontSize: 9,
        color: "#666666",
        marginBottom: 2,
      },
      skillsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 6,
        gap: 6,
      },
      skillTag: {
        borderWidth: 1,
        borderColor: "#ccc",
        paddingVertical: 2,
        paddingHorizontal: 6,
        borderRadius: 3,
        fontSize: 9,
        backgroundColor: "#f8f8f8",
        color: "#333333",
      },
      educationItem: {
        marginTop: 6,
      },
      educationCourse: {
        fontWeight: "bold",
        color: accent,
      },
      educationDetails: {
        fontSize: 9,
        color: "#666666",
      },
      projectItem: {
        marginTop: 6,
      },
      projectName: {
        fontWeight: "bold",
        color: accent,
      },
      projectTechStack: {
        fontSize: 9,
        color: "#666666",
        marginBottom: 2,
      },
      link: {
        fontSize: 9,
        color: accent,
        textDecoration: "underline",
        marginTop: 2,
      },
      socialSection: {
        marginTop: 10,
      },
      socialLinks: {
        flexDirection: "row",
        gap: 12,
        flexWrap: "wrap",
        marginTop: 6,
        color: accent,
        fontSize: 10,
      },
    });
  
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Header */}
          <View style={styles.header}>
            {ProfileSection?.imgUrl && (
              <Image src={ProfileSection.imgUrl} style={styles.profileImage} />
            )}
            <View style={styles.nameSection}>
              <Text style={styles.name}>
                {ProfileSection?.firstName} {ProfileSection?.lastName}
              </Text>
              <Text style={styles.profession}>{ProfileSection?.profession}</Text>
            </View>
          </View>
  
          {/* Summary */}
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Summary</Text>
            <Text style={styles.text}>{ProfileSection?.summary}</Text>
          </View>
  
          {/* Experience */}
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Experience</Text>
            {ExperienceSection?.map((item, i) => (
              <View key={i} style={styles.experienceItem}>
                <Text style={styles.experiencePosition}>
                  {item.position} at {item.company}
                </Text>
                <Text style={styles.experienceDuration}>{item.duration}</Text>
                <Text style={styles.text}>{item.description}</Text>
              </View>
            ))}
          </View>
  
          {/* Skills */}
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Skills</Text>
            <View style={styles.skillsContainer}>
              {SkillsSection?.map((skill, i) => (
                <Text key={i} style={styles.skillTag}>
                  {skill}
                </Text>
              ))}
            </View>
          </View>
  
          {/* Education */}
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Education</Text>
            {EducationSection?.map((edu, i) => (
              <View key={i} style={styles.educationItem}>
                <Text style={styles.educationCourse}>
                  {edu.courseName} - {edu.collegeSchool}
                </Text>
                <Text style={styles.educationDetails}>
                  {edu.completitionYear} | {edu.percentage}
                </Text>
              </View>
            ))}
          </View>
  
          {/* Projects */}
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Projects</Text>
            {ProjectSection?.map((project, i) => (
              <View key={i} style={styles.projectItem}>
                <Text style={styles.projectName}>{project.projectName}</Text>
                <Text style={styles.projectTechStack}>{project.techStack}</Text>
                <Text style={styles.text}>{project.description}</Text>
                <Link src={project.link} style={styles.link}>
                  View Demo
                </Link>
              </View>
            ))}
          </View>
  
          {/* Social */}
          {SocialSection && (
            <View style={styles.socialSection}>
              <Text style={styles.sectionHeading}>Social</Text>
              <View style={styles.socialLinks}>
                {SocialSection.instagram && (
                  <Link src={SocialSection.instagram}>Instagram</Link>
                )}
                {SocialSection.linkedin && (
                  <Link src={SocialSection.linkedin}>LinkedIn</Link>
                )}
                {SocialSection.facebook && (
                  <Link src={SocialSection.facebook}>Facebook</Link>
                )}
                {SocialSection.twitter && (
                  <Link src={SocialSection.twitter}>Twitter</Link>
                )}
              </View>
            </View>
          )}
        </Page>
      </Document>
    );
  }
  