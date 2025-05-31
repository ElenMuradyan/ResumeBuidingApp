import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image,
    Link,
    Font
  } from "@react-pdf/renderer";
  import { resume } from "@/features/resume/types";
  import { themeItems } from "@/lib/constants";
  
  Font.register({
    family: 'Roboto',
    src: '/Fonts/roboto.ttf',
    });
  
  export default function CenteredCreativeTemplatePDF({
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
        backgroundColor: background,
        color: text,
        fontFamily: 'Roboto',
        fontSize: 11,
        padding: 20,
        textAlign: "center",
      },
      profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: accent,
        marginBottom: 8,
        alignSelf: "center",
      },
      name: {
        fontSize: 20,
        fontWeight: "bold",
        lineHeight: 1.1,
        marginBottom: 4,
      },
      profession: {
        fontSize: 11,
        color: accent,
        marginBottom: 6,
      },
      contactInfo: {
        fontSize: 11,
        lineHeight: 1.3,
        marginBottom: 12,
      },
      socialLinks: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 12,
        color: accent,
        marginBottom: 12,
      },
      socialLinkText: {
        color: accent,
        textDecoration: "underline",
        fontSize: 14,
      },
      summary: {
        fontSize: 11,
        marginBottom: 16,
        lineHeight: 1.3,
        textAlign: "center",
      },
      section: {
        marginBottom: 20,
        textAlign: "left",
      },
      sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: accent,
        marginBottom: 8,
        textAlign: "center",
      },
      skillsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 6,
      },
      skillBadge: {
        borderWidth: 1,
        borderColor: accent,
        borderRadius: 15,
        paddingHorizontal: 8,
        paddingVertical: 2,
        fontSize: 11,
        color: text,
      },
      experienceItem: {
        marginBottom: 12,
      },
      experiencePosition: {
        fontSize: 12,
        fontWeight: "bold",
        marginBottom: 2,
        color: text,
      },
      experienceDuration: {
        fontSize: 10,
        marginBottom: 4,
        color: accent,
        textAlign: "left",
      },
      experienceDescription: {
        fontSize: 11,
        lineHeight: 1.3,
        textAlign: "left",
        color: text,
      },
      projectItem: {
        marginBottom: 12,
      },
      projectName: {
        fontSize: 12,
        fontWeight: "bold",
        marginBottom: 2,
        color: text,
      },
      projectTechStack: {
        fontSize: 10,
        marginBottom: 4,
        color: accent,
        textAlign: "left",
      },
      projectDescription: {
        fontSize: 11,
        lineHeight: 1.3,
        marginBottom: 4,
        textAlign: "left",
        color: text,
      },
      projectLink: {
        fontSize: 10,
        color: accent,
        textDecoration: "underline",
        textAlign: "left",
      },
      educationItem: {
        marginBottom: 12,
      },
      educationCourse: {
        fontSize: 12,
        fontWeight: "bold",
        marginBottom: 2,
        color: text,
      },
      educationDetails: {
        fontSize: 10,
        color: accent,
        textAlign: "left",
      },
    });
  
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Profile Section */}
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
            <View style={styles.socialLinks}>
              {SocialSection.linkedin && (
                <Link src={SocialSection.linkedin} style={styles.socialLinkText}>
                  LinkedIn
                </Link>
              )}
              {SocialSection.facebook && (
                <Link src={SocialSection.facebook} style={styles.socialLinkText}>
                  Facebook
                </Link>
              )}
              {SocialSection.instagram && (
                <Link src={SocialSection.instagram} style={styles.socialLinkText}>
                  Instagram
                </Link>
              )}
              {SocialSection.twitter && (
                <Link src={SocialSection.twitter} style={styles.socialLinkText}>
                  Twitter
                </Link>
              )}
            </View>
          )}
  
          {ProfileSection?.summary && (
            <Text style={styles.summary}>{ProfileSection.summary}</Text>
          )}
  
          {/* Skills */}
          {SkillsSection?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Skills</Text>
              <View style={styles.skillsContainer}>
                {SkillsSection.map((skill, i) => (
                  <Text key={i} style={styles.skillBadge}>
                    {skill}
                  </Text>
                ))}
              </View>
            </View>
          )}
  
          {/* Experience */}
          {ExperienceSection?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Experience</Text>
              {ExperienceSection.map((exp, i) => (
                <View key={i} style={styles.experienceItem}>
                  <Text style={styles.experiencePosition}>
                    {exp.position} — {exp.company}
                  </Text>
                  <Text style={styles.experienceDuration}>{exp.duration}</Text>
                  <Text style={styles.experienceDescription}>{exp.description}</Text>
                </View>
              ))}
            </View>
          )}
  
          {/* Projects */}
          {ProjectSection?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Projects</Text>
              {ProjectSection.map((proj, i) => (
                <View key={i} style={styles.projectItem}>
                  <Text style={styles.projectName}>{proj.projectName}</Text>
                  <Text style={styles.projectTechStack}>{proj.techStack}</Text>
                  <Text style={styles.projectDescription}>{proj.description}</Text>
                  <Link src={proj.link} style={styles.projectLink}>
                    View Demo
                  </Link>
                </View>
              ))}
            </View>
          )}
  
          {/* Education */}
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
        </Page>
      </Document>
    );
  }
  