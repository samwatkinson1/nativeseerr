import {
  Button,
  Form,
  Host,
  HStack,
  Image,
  Section,
  SecureField,
  Spacer,
  Text,
  TextField,
  VStack,
} from "@expo/ui/swift-ui";
import { frame } from "@expo/ui/swift-ui/modifiers";
import { router } from "expo-router";
import { StyleSheet } from "react-native";

export default function LoginLocalScreen() {
  function handleSubmit() {
    console.log("submit");
  }

  function handleRedirect() {
    router.replace("/login/jellyfin");
  }

  return (
    <Host style={styles.container}>
      <Form>
        <Section
          header={<Spacer />}
          footer={
            <VStack spacing={12}>
              <Spacer minLength={16} />

              <Button
                controlSize="large"
                variant="glassProminent"
                onPress={handleSubmit}
              >
                <HStack spacing={8} modifiers={[frame({ maxWidth: Infinity })]}>
                  <Image systemName="iphone.and.arrow.right.inward" size={18} />
                  <Text>Sign In</Text>
                </HStack>
              </Button>

              <Button
                controlSize="large"
                variant="glass"
                onPress={handleRedirect}
              >
                <HStack spacing={8} modifiers={[frame({ maxWidth: Infinity })]}>
                  <Image systemName="wifi" size={18} />
                  <Text>Login with Jellyfin</Text>
                </HStack>
              </Button>
            </VStack>
          }
        >
          <TextField
            autocorrection={false}
            allowNewlines={false}
            keyboardType="url"
            placeholder="Server URL"
            onChangeText={console.log}
          />
          <TextField
            autocorrection={false}
            allowNewlines={false}
            keyboardType="email-address"
            placeholder="Email Address / Username"
            onChangeText={console.log}
          />
          <SecureField placeholder="Password" onChangeText={console.log} />
        </Section>
      </Form>
    </Host>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
