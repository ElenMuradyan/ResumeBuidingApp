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
  
  export default function SidebarLeftTemplatePDF({
    data,
    theme,
  }: {
    data: resume;
    theme: themeItems;
  }) {
    const {
      ProfileSection,
      ExperienceSection,
      EducationSection,
      SkillsSection,
      ProjectSection,
      SocialSection,
    } = data;
  
    const { background, text, accent } = theme;
  
    const styles = StyleSheet.create({
      page: {
        fontFamily: "Roboto",
        fontSize: 11,
        backgroundColor: background,
        color: text,
        padding: 20,
        flexDirection: "row",
      },
      sidebar: {
        width: "30%",
        backgroundColor: accent,
        color: background,
        padding: 16,
        alignItems: "center",
        textAlign: "center",
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
      },
      profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: background,
        marginBottom: 12,
      },
      name: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 4,
        lineHeight: 1.2,
      },
      profession: {
        fontSize: 11,
        marginBottom: 8,
      },
      contactInfo: {
        fontSize: 11,
        lineHeight: 1.2,
        marginBottom: 12,
      },
      socialIconsContainer: {
        flexDirection: "column",
        gap: 12,
        justifyContent: "center",
        marginBottom: 12,
      },
      socialLink: {
        color: background,
        fontSize: 14,
        textDecoration: "underline",
      },
      skillsContainer: {
        width: "100%",
        textAlign: "left",
        marginTop: 12,
      },
      skillsTitle: {
        fontWeight: "bold",
        fontSize: 14,
        borderBottomWidth: 1,
        borderBottomColor: background,
        paddingBottom: 4,
        marginBottom: 6,
        color: background,
      },
      skillItem: {
        fontSize: 11,
        marginBottom: 2,
        marginLeft: 12,
        listStyleType: "disc", // React PDF does not support list style natively, this is illustrative
      },
  
      mainContent: {
        width: "70%",
        paddingLeft: 16,
      },
      section: {
        marginBottom: 14,
      },
      sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: accent,
        marginBottom: 6,
      },
      text: {
        fontSize: 11,
        lineHeight: 1.3,
        color: text,
      },
      experienceItem: {
        marginBottom: 8,
      },
      experiencePosition: {
        fontSize: 12,
        fontWeight: "bold",
        marginBottom: 2,
        color: accent,
      },
      experienceDuration: {
        fontSize: 10,
        marginBottom: 4,
        color: "#666666",
      },
      projectItem: {
        marginBottom: 8,
      },
      projectName: {
        fontSize: 12,
        fontWeight: "bold",
        marginBottom: 2,
        color: accent,
      },
      projectTechStack: {
        fontSize: 10,
        marginBottom: 4,
        color: "#666666",
      },
      link: {
        fontSize: 10,
        textDecoration: "underline",
        color: accent,
      },
      educationItem: {
        marginBottom: 8,
      },
      educationCourse: {
        fontSize: 12,
        fontWeight: "bold",
        marginBottom: 2,
        color: accent,
      },
      educationDetails: {
        fontSize: 10,
        color: "#666666",
      },
    });
  
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Sidebar */}
          <View style={styles.sidebar}>
            {ProfileSection?.imgUrl && (
              <Image src={ProfileSection.imgUrl} style={styles.profileImage} />
            )}
            <Text style={styles.name}>
              {ProfileSection?.firstName} {ProfileSection?.lastName}
            </Text>
            <Text style={styles.profession}>{ProfileSection?.profession}</Text>
  
            <View style={styles.contactInfo}>
              <Text>{ProfileSection?.address}</Text>
              <Text>{ProfileSection?.phoneNumber}</Text>
            </View>
  
            {SocialSection && (
              <View style={styles.socialIconsContainer}>
                {SocialSection.linkedin && (
                  <Link
                    src={SocialSection.linkedin}
                    style={styles.socialLink}
                  >
                    LinkedIn
                  </Link>
                )}
                {SocialSection.facebook && (
                  <Link
                    src={SocialSection.facebook}
                    style={styles.socialLink}
                  >
                    Facebook
                  </Link>
                )}
                {SocialSection.instagram && (
                  <Link
                    src={SocialSection.instagram}
                    style={styles.socialLink}
                  >
                    Instagram
                  </Link>
                )}
                {SocialSection.twitter && (
                  <Link
                    src={SocialSection.twitter}
                    style={styles.socialLink}
                  >
                    Twitter
                  </Link>
                )}
              </View>
            )}
  
            {SkillsSection?.length > 0 && (
              <View style={styles.skillsContainer}>
                <Text style={styles.skillsTitle}>Skills</Text>
                {SkillsSection.map((skill, i) => (
                  <Text key={i} style={styles.skillItem}>
                    • {skill}
                  </Text>
                ))}
              </View>
            )}
          </View>
  
          {/* Main Content */}
          <View style={styles.mainContent}>
            {ProfileSection?.summary && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Summary</Text>
                <Text style={styles.text}>{ProfileSection.summary}</Text>
              </View>
            )}
  
            {ExperienceSection?.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Experience</Text>
                {ExperienceSection.map((exp, i) => (
                  <View key={i} style={styles.experienceItem}>
                    <Text style={styles.experiencePosition}>
                      {exp.position} — {exp.company}
                    </Text>
                    <Text style={styles.experienceDuration}>{exp.duration}</Text>
                    <Text style={styles.text}>{exp.description}</Text>
                  </View>
                ))}
              </View>
            )}
  
            {ProjectSection?.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Projects</Text>
                {ProjectSection.map((proj, i) => (
                  <View key={i} style={styles.projectItem}>
                    <Text style={styles.projectName}>{proj.projectName}</Text>
                    <Text style={styles.projectTechStack}>{proj.techStack}</Text>
                    <Text style={styles.text}>{proj.description}</Text>
                    <Link src={proj.link} style={styles.link}>
                      View Demo
                    </Link>
                  </View>
                ))}
              </View>
            )}
  
            {EducationSection?.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Education</Text>
                {EducationSection.map((edu, i) => (
                  <View key={i} style={styles.educationItem}>
                    <Text style={styles.educationCourse}>
                      {edu.courseName} — {edu.collegeSchool}
                    </Text>
                    <Text style={styles.educationDetails}>
                      {edu.completitionYear} | {edu.percentage}%
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </Page>
      </Document>
    );
  }
  