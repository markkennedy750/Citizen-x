import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../constants";

const TermsAndConditions = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.headerText}>
          Citizen X App – Terms and Conditions
        </Text>
        <Text style={styles.subHeaderText}>
          Last Updated: 1st of October 2024
        </Text>

        <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
        <Text style={styles.paragraph}>
          By creating an account and using the CitizenX app, you acknowledge
          that you have read, understood, and agree to be bound by these Terms
          and Conditions, as well as our Privacy Policy.
        </Text>

        <Text style={styles.sectionTitle}>2. User Registration</Text>
        <Text style={styles.paragraph}>
          To use the CitizenX app, you must complete the registration process by
          providing accurate information. You are responsible for maintaining
          the confidentiality of your account credentials and for all activities
          conducted under your account.
        </Text>

        <Text style={styles.sectionTitle}>3. Use of the Platform</Text>
        <Text style={styles.paragraph}>
          CitizenX is designed to allow users to report incidents, share views,
          and engage in community development. You agree to use the platform for
          lawful purposes and to avoid submitting any content that:
          {"\n\n"}• Violates any law or regulation
          {"\n"}• Is harmful, abusive, defamatory, or otherwise inappropriate
          {"\n"}• Infringes on the intellectual property rights of others
          {"\n\n"}CitizenX reserves the right to remove or block any content
          that violates these terms.
        </Text>

        <Text style={styles.sectionTitle}>4. Reporting</Text>
        <Text style={styles.paragraph}>
          When submitting reports or follow-ups on CitizenX, users must ensure
          that the information provided is accurate to the best of their
          knowledge. False or misleading reports may result in account
          suspension or termination.
        </Text>

        <Text style={styles.sectionTitle}>5. Reward Points System</Text>
        <Text style={styles.paragraph}>
          CitizenX provides users with a Reward Points for various activities
          within the app. The accumulation and redemption of tokens and points
          are subject to the terms outlined in our Token and Points Policy.
          Tokens and points have no monetary value and cannot be exchanged for
          cash.
        </Text>

        <Text style={styles.sectionTitle}>6. Data Privacy</Text>
        <Text style={styles.paragraph}>
          By registering, you agree to the collection, storage, and use of your
          data in accordance with our Privacy Policy. CitizenX uses your data to
          improve the platform and ensure a personalized user experience. We are
          committed to protecting your privacy and ensuring that your data is
          not shared with unauthorized third parties.
        </Text>

        <Text style={styles.sectionTitle}>7. Intellectual Property</Text>
        <Text style={styles.paragraph}>
          All content provided by CitizenX, including but not limited to text,
          graphics, logos, icons, and software, is the intellectual property of
          CitizenX or its licensors. You may not copy, distribute, or otherwise
          use this content without prior written permission.
        </Text>

        <Text style={styles.sectionTitle}>8. Account Termination</Text>
        <Text style={styles.paragraph}>
          CitizenX reserves the right to suspend or terminate your account at
          any time, with or without notice, for any violation of these Terms and
          Conditions or for any other reason at our sole discretion.
        </Text>

        <Text style={styles.sectionTitle}>9. Limitation of Liability</Text>
        <Text style={styles.paragraph}>
          CitizenX is not responsible for any direct, indirect, incidental, or
          consequential damages arising from the use or inability to use the
          platform. This includes but is not limited to any loss or damage
          resulting from errors, omissions, interruptions, or inaccuracies in
          the content.
        </Text>

        <Text style={styles.sectionTitle}>10. Changes to the Terms</Text>
        <Text style={styles.paragraph}>
          We reserve the right to modify these Terms and Conditions at any time.
          Any changes will be posted on the app and become effective upon
          posting. It is your responsibility to review these terms regularly.
        </Text>

        <Text style={styles.sectionTitle}>11. Governing Law</Text>
        <Text style={styles.paragraph}>
          These Terms and Conditions are governed by the laws of Nigeria without
          regard to its conflict of laws principles. Any legal disputes shall be
          resolved in the courts.
        </Text>

        <Text style={styles.sectionTitle}>12. Contact Us</Text>
        <Text style={styles.paragraph}>
          If you have any questions or concerns regarding these Terms and
          Conditions, please contact us at admin@citizenx.ng.
        </Text>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default TermsAndConditions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContainer: {
    padding: 15,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
    color: COLORS.primary,
  },
  subHeaderText: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 20,
    color: COLORS.gray,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    color: COLORS.black,
  },
  paragraph: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.darkGray,
    marginBottom: 20,
    lineHeight: 22,
  },
  backButton: {
    alignSelf: "center",
    marginTop: 20,
    padding: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: "600",
  },
});
