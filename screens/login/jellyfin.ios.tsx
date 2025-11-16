import {
  Button,
  Form,
  Host,
  HStack,
  Image,
  Section,
  Spacer,
  Text,
  VStack,
} from "@expo/ui/swift-ui";
import { frame } from "@expo/ui/swift-ui/modifiers";
import { useTheme } from "@react-navigation/core";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { getItem, setItem } from "expo-secure-store";
import { Alert, StyleSheet, TextInput } from "react-native";
import { KeyboardController } from "react-native-keyboard-controller";
import { z } from "zod";

import { store } from "@/const/keys";
import { postAuthJellyfinMutation } from "@/http/gen/@tanstack/react-query.gen";
import { client } from "@/http/gen/client.gen";

const loginFormSchema = z.object({
  serverUrl: z.url(),
  username: z.string(),
  password: z.string(),
});

export default function LoginJellyfinScreen() {
  const queryClient = useQueryClient();
  const { colors, fonts } = useTheme();

  const { mutate } = useMutation({
    ...postAuthJellyfinMutation(),
    onMutate: ({ meta }) => {
      const { serverUrl } = meta as { serverUrl: string };
      setItem(store.serverUrl, serverUrl);
      client.setConfig({ baseUrl: `${serverUrl}/api/v1` });
    },
    onSuccess: () => {
      queryClient.removeQueries();
      router.dismissTo("/");
    },
    onError: () => {
      Alert.alert("Verification Failed", "Check your details and try again.");
    },
  });

  const form = useForm({
    defaultValues: { serverUrl: getItem(store.serverUrl) ?? "", username: "", password: "" },
    validators: { onSubmit: loginFormSchema },
    async onSubmit({ value: { serverUrl, username, password } }) {
      await KeyboardController.dismiss();
      mutate({ body: { username, password }, meta: { serverUrl } });
    },
    onSubmitInvalid({ value, formApi }) {
      if (Object.values(value).every((field) => field === "")) {
        return Alert.alert("You must enter your details to continue.");
      }
      if (formApi.state.errors.length > 0) {
        return Alert.alert("Verify your details are correct and try again.");
      }
    },
  });

  function handleRedirect() {
    router.replace("/login/local");
  }

  return (
    <Host style={styles.container}>
      <Form>
        <Section
          header={<Spacer />}
          footer={
            <VStack spacing={12}>
              <Spacer minLength={16} />

              <form.Subscribe>
                {({ isSubmitting }) => (
                  <Button
                    disabled={isSubmitting}
                    controlSize="large"
                    variant="glassProminent"
                    onPress={form.handleSubmit}
                  >
                    <HStack spacing={8} modifiers={[frame({ maxWidth: Infinity })]}>
                      <Image systemName="iphone.and.arrow.right.inward" size={18} />
                      <Text>Sign In</Text>
                    </HStack>
                  </Button>
                )}
              </form.Subscribe>

              <form.Subscribe>
                {({ isSubmitting }) => (
                  <Button
                    disabled={isSubmitting}
                    controlSize="large"
                    variant="glass"
                    onPress={handleRedirect}
                  >
                    <HStack spacing={8} modifiers={[frame({ maxWidth: Infinity })]}>
                      <Image systemName="wifi" size={18} />
                      <Text>Login with Seerr</Text>
                    </HStack>
                  </Button>
                )}
              </form.Subscribe>
            </VStack>
          }
        >
          <form.Field name="serverUrl">
            {(field) => (
              <TextInput
                autoCorrect={false}
                autoCapitalize="none"
                numberOfLines={1}
                keyboardType="url"
                placeholder="Server URL"
                defaultValue={field.state.value}
                onBlur={field.handleBlur}
                onChangeText={field.handleChange}
                style={{ ...styles.body, ...fonts.regular, color: colors.text }}
              />
            )}
          </form.Field>
          <form.Field name="username">
            {(field) => (
              <TextInput
                autoCorrect={false}
                autoCapitalize="none"
                numberOfLines={1}
                keyboardType="email-address"
                placeholder="Username"
                defaultValue={field.state.value}
                onBlur={field.handleBlur}
                onChangeText={field.handleChange}
                style={{ ...styles.body, ...fonts.regular, color: colors.text }}
              />
            )}
          </form.Field>
          <form.Field name="password">
            {(field) => (
              <TextInput
                autoCorrect={false}
                autoCapitalize="none"
                numberOfLines={1}
                secureTextEntry
                placeholder="Password"
                defaultValue={field.state.value}
                onBlur={field.handleBlur}
                onChangeText={field.handleChange}
                style={{ ...styles.body, ...fonts.regular, color: colors.text }}
              />
            )}
          </form.Field>
        </Section>
      </Form>
    </Host>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  body: { fontSize: 17, lineHeight: 22 },
});
