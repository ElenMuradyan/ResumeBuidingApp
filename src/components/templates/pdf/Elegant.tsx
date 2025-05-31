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

  export default function ElegantTemplatePDF({
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
        backgroundColor: background,
        color: text,
        fontFamily: "Roboto",
        fontSize: 10,
        padding: 20,
        flexDirection: "row",
      },
      leftColumn: {
        width: "33%",
        paddingRight: 10,
        borderRightWidth: 1,
        borderRightColor: accent,
      },
      rightColumn: {
        width: "67%",
        paddingLeft: 10,
      },
      profileImage: {
        width: 96,
        height: 96,
        borderRadius: 48,
        borderWidth: 1,
        borderColor: accent,
        alignSelf: "center",
        marginBottom: 12,
        shadowColor: "#00000040", // subtle shadow
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      name: {
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 4,
      },
      profession: {
        fontSize: 10,
        color: accent,
        textAlign: "center",
        marginBottom: 12,
      },
      sectionTitle: {
        fontSize: 12,
        fontWeight: "bold",
        color: accent,
        marginBottom: 6,
      },
      contactInfo: {
        fontSize: 10,
        marginBottom: 12,
        lineHeight: 1.2,
      },
      skillsList: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 4,
      },
      skillItem: {
        borderWidth: 1,
        borderColor: accent,
        borderRadius: 3,
        paddingHorizontal: 6,
        paddingVertical: 2,
        fontSize: 10,
        marginBottom: 4,
      },
      socialLink: {
        fontSize: 10,
        color: accent,
        marginBottom: 4,
        textDecoration: "underline",
      },
      section: {
        marginBottom: 16,
      },
      workItem: {
        marginBottom: 12,
      },
      workPosition: {
        fontWeight: "bold",
        fontSize: 11,
        marginBottom: 2,
      },
      workDuration: {
        fontSize: 9,
        color: accent,
        marginBottom: 4,
      },
      workDescription: {
        fontSize: 10,
        lineHeight: 1.2,
      },
      projectItem: {
        marginBottom: 12,
      },
      projectName: {
        fontWeight: "bold",
        fontSize: 11,
        marginBottom: 2,
      },
      projectTechStack: {
        fontSize: 9,
        color: accent,
        marginBottom: 4,
      },
      projectDescription: {
        fontSize: 10,
        marginBottom: 4,
      },
      projectLink: {
        fontSize: 9,
        color: accent,
        textDecoration: "underline",
      },
      educationItem: {
        marginBottom: 8,
      },
      educationCourse: {
        fontWeight: "bold",
        fontSize: 11,
        marginBottom: 2,
      },
      educationDetails: {
        fontSize: 9,
        color: accent,
      },
    });
  
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          {/* LEFT COLUMN */}
          <View style={styles.leftColumn}>
            {ProfileSection?.imgUrl && (
              <Image src={ProfileSection.imgUrl} style={styles.profileImage} />
            )}
  
            <Text style={styles.name}>
              {ProfileSection?.firstName} {ProfileSection?.lastName}
            </Text>
            <Text style={styles.profession}>{ProfileSection?.profession}</Text>
  
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Contact</Text>
              <Text style={styles.contactInfo}>{ProfileSection?.address}</Text>
              <Text style={styles.contactInfo}>{ProfileSection?.phoneNumber}</Text>
            </View>
  
            {SkillsSection?.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Skills</Text>
                <View style={styles.skillsList}>
                  {SkillsSection.map((skill, i) => (
                    <Text key={i} style={styles.skillItem}>
                      {skill}
                    </Text>
                  ))}
                </View>
              </View>
            )}
  
            {SocialSection && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Social</Text>
                {SocialSection.linkedin && (
                  <Link src={SocialSection.linkedin} style={styles.socialLink} >
                    LinkedIn
                  </Link>
                )}
                {SocialSection.facebook && (
                  <Link src={SocialSection.facebook} style={styles.socialLink} >
                    Facebook
                  </Link>
                )}
                {SocialSection.instagram && (
                  <Link src={SocialSection.instagram} style={styles.socialLink} >
                    Instagram
                  </Link>
                )}
                {SocialSection.twitter && (
                  <Link src={SocialSection.twitter} style={styles.socialLink} >
                    Twitter
                  </Link>
                )}
              </View>
            )}
          </View>
  
          {/* RIGHT COLUMN */}
          <View style={styles.rightColumn}>
            {ProfileSection?.summary && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Profile</Text>
                <Text>{ProfileSection.summary}</Text>
              </View>
            )}
  
            {ExperienceSection?.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Work Experience</Text>
                {ExperienceSection.map((exp, i) => (
                  <View key={i} style={styles.workItem}>
                    <Text style={styles.workPosition}>
                      {exp.position} — {exp.company}
                    </Text>
                    <Text style={styles.workDuration}>{exp.duration}</Text>
                    <Text style={styles.workDescription}>{exp.description}</Text>
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
                    <Text style={styles.projectDescription}>{proj.description}</Text>
                    <Link src={proj.link} style={styles.projectLink}>
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
  