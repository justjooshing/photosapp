import { useNavigation } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";

import { Button, H1, H2, H3, LegalText } from "@/tamagui/variants";

const PrivacyPolicy = () => {
  const { goBack } = useNavigation();
  return (
    <ScrollView style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
      <Button variant="secondary" onPress={goBack}>
        Back
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
      <H3>Google Account Information:</H3>
      <ul>
        <li>
          <LegalText>Google User ID</LegalText>
        </li>
        <li>
          <LegalText>Email Address</LegalText>
        </li>
        <li>
          <LegalText>Profile Picture</LegalText>
        </li>
      </ul>
      <H3>Google Photos Information:</H3>
      <ul>
        <li>
          <LegalText>Google Photo ID</LegalText>
        </li>
        <li>
          <LegalText>Creation Date</LegalText>
        </li>
        <li>
          <LegalText>Size</LegalText>
        </li>
        <li>
          <LegalText>Base URL</LegalText>
        </li>
        <li>
          <LegalText>Product URL</LegalText>
        </li>
        <li>
          <LegalText>MIME Type</LegalText>
        </li>
      </ul>

      <H2>How We Use Your Information</H2>
      <H3>Access and Display Photos:</H3>
      <ul>
        <li>
          <LegalText>
            To access your Google Photos and present them to you within the app.
          </LegalText>
        </li>
        <li>
          <LegalText>
            To allow for filtering and sorting of your photos based on different
            criteria.
          </LegalText>
        </li>
      </ul>
      <H3>User Experience and Statistics:</H3>
      <ul>
        <li>
          <LegalText>
            To present usage statistics such as the percentage of photos sorted
            and the amount of data saved.
          </LegalText>
        </li>
      </ul>

      <H2>Advertising</H2>
      <LegalText>
        We may include ads in the app in the future.{" "}
        <LegalText style={{ fontWeight: "bold" }}>
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
        <LegalText style={{ fontWeight: "bold" }}>
          justjooshing@gmail.com
        </LegalText>
        .
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
        at{" "}
        <LegalText style={{ fontWeight: "bold" }}>
          justjooshing@gmail.com
        </LegalText>
        .
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
