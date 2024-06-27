import { useNavigation, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, SectionList, ScrollView } from "react-native";

import { Button, H1, H2, H3, LegalText } from "@/config/tamagui/variants";

const PrivacyPolicy = () => {
  const { goBack, canGoBack } = useNavigation();
  const { push } = useRouter();

  const handleBack = () => {
    if (canGoBack()) goBack();
    else push("/");
  };

  const informationWeCollectSections = [
    {
      title: "Google Account Information",
      data: ["Google User ID", "Email Address", "Profile Picture"],
    },
    {
      title: "Google Photos Information",
      data: [
        "Google Photo ID",
        "Creation Date",
        "Size",
        "Base URL",
        "Product URL",
        "MIME Type",
      ],
    },
  ];

  const howWeUseSections = [
    {
      title: "Access and Display Photos:",
      data: [
        "To access your Google Photos and present them to you within the app.",
        "To allow for filtering and sorting of your photos based on different criteria.",
      ],
    },
    {
      title: "User Experience and Statistics:",
      data: [
        " To present usage statistics such as the percentage of photos sorted and the amount of data saved.",
      ],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Button variant="secondary" onPress={handleBack}>
        <Button.Text>Back</Button.Text>
      </Button>
      <H1>Privacy Policy for PicPurge</H1>
      <LegalText>Effective Date: 07/06/2024</LegalText>

      <H2>Introduction</H2>
      <LegalText>
        Welcome to PicPurge ("we," "our," or "us"). This Privacy Policy explains
        how we collect, use, disclose, and safeguard your information when you
        use our app to sort through your photos stored on your Google Photos
        account. By using the app, you agree to the collection and use of
        information in accordance with this policy.
      </LegalText>

      <H2>Information We Collect</H2>
      <LegalText>
        When you use our app, we collect the following information about your
        Google account:
      </LegalText>
      <SectionList
        sections={informationWeCollectSections}
        renderItem={({ item }) => <LegalText>- {item}</LegalText>}
        renderSectionHeader={({ section }) => <H3>{section.title}</H3>}
      />

      <H2>How We Use Your Information</H2>
      <SectionList
        sections={howWeUseSections}
        renderItem={({ item }) => <LegalText>- {item}</LegalText>}
        renderSectionHeader={({ section }) => <H3>{section.title}</H3>}
      />

      <H2>Advertising</H2>
      <LegalText>
        We may include ads in the app in the future.{" "}
        <LegalText style={styles.bold}>
          However, we will never use your personal data for advertising
          purposes.
        </LegalText>{" "}
        Your personal data is solely used to provide you with the app's
        functionality and enhance your user experience.
      </LegalText>

      <H2>Data Security</H2>
      <LegalText>
        We are committed to protecting your information. We implement a variety
        of security measures to maintain the safety of your personal
        information.
      </LegalText>

      <H2>Sharing Your Information</H2>
      <LegalText>
        We do not sell, trade, or otherwise transfer your personal information
        to outside parties. This does not include trusted third parties who
        assist us in operating our app, conducting our business, or servicing
        you, so long as those parties agree to keep this information
        confidential.
      </LegalText>

      <H2>Account Deletion</H2>
      <LegalText>
        You can permanently delete your account at any time from within the app
        or by emailing us at{" "}
        <LegalText style={styles.bold}>justjooshing@gmail.com</LegalText>.
      </LegalText>

      <H2>Your Consent</H2>
      <LegalText>
        By using our app, you consent to our Privacy Policy.
      </LegalText>

      <H2>Changes to Our Privacy Policy</H2>
      <LegalText>
        We may update our Privacy Policy from time to time. We will notify you
        of any changes by posting the new Privacy Policy on this page. You are
        advised to review this Privacy Policy periodically for any changes.
        Changes to this Privacy Policy are effective when they are posted on
        this page.
      </LegalText>

      <H2>Contact Us</H2>
      <LegalText>
        If you have any questions about this Privacy Policy, please contact us
        at <LegalText style={styles.bold}>justjooshing@gmail.com</LegalText>.
      </LegalText>

      <LegalText>
        PicPurge is committed to ensuring that your privacy is protected. Should
        we ask you to provide certain information by which you can be identified
        when using this app, then you can be assured that it will only be used
        in accordance with this Privacy Policy.
      </LegalText>

      <LegalText>Thank you for using PicPurge.</LegalText>
    </ScrollView>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingBottom: 20 },
  bold: { fontWeight: "bold" },
});
